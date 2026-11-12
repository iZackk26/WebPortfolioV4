-- Migración 005 del chat de Max: analítica completa de cada consulta.
-- Ejecutar SOLO este archivo, sin texto seleccionado. Después, 006 (vistas).
-- Origen: geolocalización de Vercel + hash de la IP (la IP real nunca se guarda).
-- Los parámetros llegan como text y se convierten aquí: ningún carácter del visitante rompe la llamada.

alter table public.chat_questions
  add column if not exists country     text,
  add column if not exists region      text,
  add column if not exists city        text,
  add column if not exists device      text,
  add column if not exists user_agent  text,
  add column if not exists page        text,
  add column if not exists browser_lang text,
  add column if not exists answer      text,
  add column if not exists tokens_used int,
  add column if not exists latency_ms  int,
  add column if not exists reported    boolean not null default false,
  add column if not exists intent      text,
  add column if not exists lang        text,
  add column if not exists topic       text,
  add column if not exists classified_at timestamptz;
create index if not exists chat_questions_pending_idx on public.chat_questions (id) where intent is null;

-- Paso 1 del flujo (reemplaza a max_check_and_log): registra la consulta con su contexto
create or replace function public.max_log_question(
  p_message text, p_client_id text default null, p_session_id text default null,
  p_country text default null, p_region text default null, p_city text default null,
  p_user_agent text default null, p_page text default null, p_browser_lang text default null)
returns jsonb language plpgsql as $$
declare
  v_client text := case when p_client_id ~ '^[0-9a-f]{64}$' then p_client_id else 'unknown' end;
  v_ua     text := left(nullif(p_user_agent, ''), 400);
  v_banned boolean;
  v_id     bigint;
  v_token  uuid;
begin
  select exists (select 1 from chat_bans where client_id = v_client and expires_at > now()) into v_banned;
  insert into chat_questions (client_id, session_id, message, was_banned, country, region, city,
                              device, user_agent, page, browser_lang)
  values (v_client, nullif(p_session_id, ''), left(coalesce(p_message, ''), 2000), v_banned,
          left(nullif(p_country, ''), 2), left(nullif(p_region, ''), 80), left(nullif(p_city, ''), 80),
          case when v_ua is null then null
               when v_ua ~* 'bot|crawl|spider|headless' then 'bot'
               when v_ua ~* 'ipad|tablet' then 'tablet'
               when v_ua ~* 'mobi|android|iphone' then 'mobile'
               else 'desktop' end,
          v_ua, left(nullif(p_page, ''), 200), left(nullif(p_browser_lang, ''), 40))
  returning id, ban_token into v_id, v_token;
  return jsonb_build_object('id', v_id, 'banned', v_banned, 'token', v_token);
end $$;

-- Paso 2 del flujo: guarda la respuesta de Max y sus métricas
create or replace function public.max_log_answer(
  p_id text, p_answer text, p_tokens text default null, p_latency_ms text default null, p_tools text default null)
returns jsonb language plpgsql as $$
begin
  update chat_questions set
    answer      = left(p_answer, 4000),
    tokens_used = case when p_tokens ~ '^\d+$' then p_tokens::int end,
    latency_ms  = case when p_latency_ms ~ '^\d+(\.\d+)?$' then round(p_latency_ms::numeric)::int end,
    reported    = coalesce(p_tools, '') ilike '%reportar_abuso%'
  where id = case when p_id ~ '^\d+$' then p_id::bigint end;
  return jsonb_build_object('ok', found);
end $$;

-- Clasificador por lotes: consultas sin intención (las más viejas primero)
create or replace function public.max_pending_intents(p_limit int default 40)
returns jsonb language sql stable as $$
  select coalesce(jsonb_agg(jsonb_build_object('id', id, 'message', left(message, 500)) order by id), '[]'::jsonb)
  from (select id, message from chat_questions where intent is null order by id limit p_limit) q;
$$;

-- Clasificador por lotes: guarda lo que devolvió el modelo (tolera ```json … ``` alrededor)
create or replace function public.max_save_intents(p_items text)
returns jsonb language plpgsql as $$
declare
  v_items jsonb;
  v_n     int;
  v_valid constant text[] := array['reclutamiento','cliente_potencial','colaboracion','proyectos',
                                   'perfil','contacto','saludo','fuera_de_tema','abuso','otro'];
begin
  v_items := regexp_replace(trim(p_items), '^```(json)?|```$', '', 'g')::jsonb;
  update chat_questions q set
    intent = case when x->>'intent' = any(v_valid) then x->>'intent' else 'otro' end,
    lang   = left(x->>'lang', 8),
    topic  = left(x->>'topic', 60),
    classified_at = now()
  from jsonb_array_elements(v_items) x
  where q.id = (x->>'id')::bigint and q.intent is null;
  get diagnostics v_n = row_count;
  return jsonb_build_object('updated', v_n);
end $$;

-- Solo la service role (Flow) puede llamarlas
revoke execute on function public.max_log_question(text, text, text, text, text, text, text, text, text) from public, anon, authenticated;
revoke execute on function public.max_log_answer(text, text, text, text, text) from public, anon, authenticated;
revoke execute on function public.max_pending_intents(int) from public, anon, authenticated;
revoke execute on function public.max_save_intents(text) from public, anon, authenticated;

-- Comprobación: anon solo debe poder ejecutar max_ban_token
select p.proname, has_function_privilege('anon', p.oid, 'execute') as anon_puede
from pg_proc p where p.pronamespace = 'public'::regnamespace and p.proname like 'max\_%' order by 1;
