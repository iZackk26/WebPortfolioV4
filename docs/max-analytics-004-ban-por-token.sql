-- Migración 004 del chat de Max: ban por token de un solo uso, sin la rama onSuccess de Flow
-- (en producción esa rama no se ejecuta). Ejecutar SOLO este archivo, sin texto seleccionado.
--
-- Cada pregunta registrada recibe un token aleatorio que solo ve esa petición. Max lo pasa a la
-- herramienta reportar_abuso y Supabase banea al dueño del token. Un token vale una vez y por
-- 15 minutos: quien lo use solo puede banear al visitante que lo generó.

alter table public.chat_questions add column if not exists ban_token uuid default gen_random_uuid();
create unique index if not exists chat_questions_ban_token_idx on public.chat_questions (ban_token);

-- Paso 1 del flujo: ahora también devuelve el token de esta pregunta
create or replace function public.max_check_and_log(p_client_id text, p_message text, p_session_id text default null)
returns jsonb language plpgsql as $$
declare
  v_banned boolean;
  v_token  uuid;
begin
  if p_client_id is null or p_client_id !~ '^[0-9a-f]{64}$' then
    p_client_id := 'unknown';
  end if;
  select exists (
    select 1 from public.chat_bans where client_id = p_client_id and expires_at > now()
  ) into v_banned;
  insert into public.chat_questions (client_id, session_id, message, was_banned)
  values (p_client_id, nullif(p_session_id, ''), left(coalesce(p_message, ''), 2000), v_banned)
  returning ban_token into v_token;
  return jsonb_build_object('banned', v_banned, 'token', v_token);
end $$;
revoke execute on function public.max_check_and_log(text, text, text) from public, anon, authenticated;

-- Herramienta del agente (anon key): el token es la autorización
create or replace function public.max_ban_token(token uuid, reason text default null)
returns jsonb language plpgsql security definer set search_path = public as $$
declare
  v_client  text;
  v_hours   constant int := 24;
  v_expires timestamptz := now() + make_interval(hours => v_hours);
begin
  update chat_questions set ban_token = null
  where ban_token = token and created_at > now() - interval '15 minutes' and client_id <> 'unknown'
  returning client_id into v_client;
  if v_client is null then
    raise exception 'token inválido, usado o vencido';
  end if;
  insert into chat_bans (client_id, reason, expires_at)
  values (v_client, left(coalesce(nullif(reason, ''), 'sin motivo'), 500), v_expires);
  return jsonb_build_object('banned', true, 'hours', v_hours);
end $$;
revoke execute on function public.max_ban_token(uuid, text) from public, authenticated;
grant  execute on function public.max_ban_token(uuid, text) to anon;

-- Ya no se usan
drop function if exists public.max_flag(text);
drop function if exists public.max_ban_session(text, text);

-- Comprobación: anon solo puede ejecutar max_ban_token
select p.proname, has_function_privilege('anon', p.oid, 'execute') as anon_puede
from pg_proc p
where p.pronamespace = 'public'::regnamespace and p.proname like 'max\_%'
order by 1;
