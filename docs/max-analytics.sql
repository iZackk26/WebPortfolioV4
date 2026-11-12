-- Métricas y bans del chat de Max (Supabase). Ejecutar una vez en el SQL Editor.
-- client_id = hash SHA-256 salado de la IP que calcula api/chat.ts; la IP real nunca llega aquí.

create table if not exists public.chat_questions (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  client_id   text not null,
  session_id  text,
  message     text not null,
  was_banned  boolean not null default false
);
create index if not exists chat_questions_created_idx on public.chat_questions (created_at desc);
create index if not exists chat_questions_client_idx  on public.chat_questions (client_id);

create table if not exists public.chat_bans (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  client_id   text not null,
  reason      text not null,
  expires_at  timestamptz not null
);
create index if not exists chat_bans_client_idx on public.chat_bans (client_id, expires_at desc);

-- Sin políticas: solo la service role (Flow) lee y escribe. La anon key no ve nada.
alter table public.chat_questions enable row level security;
alter table public.chat_bans      enable row level security;

-- Paso 1 del flujo: guarda la pregunta y dice si el visitante está baneado.
create or replace function public.max_check_and_log(p_client_id text, p_message text, p_session_id text default null)
returns jsonb language plpgsql as $$
declare
  v_banned boolean;
begin
  -- Sin hash válido (p. ej. el proxy aún no lo manda) se registra como 'unknown' y nunca se banea
  if p_client_id is null or p_client_id !~ '^[0-9a-f]{64}$' then
    p_client_id := 'unknown';
  end if;
  select exists (
    select 1 from public.chat_bans where client_id = p_client_id and expires_at > now()
  ) into v_banned;
  insert into public.chat_questions (client_id, session_id, message, was_banned)
  values (p_client_id, nullif(p_session_id, ''), left(coalesce(p_message, ''), 2000), v_banned);
  return jsonb_build_object('banned', v_banned);
end $$;

-- Herramienta del agente: solo confirma el reporte. Devuelve un id único para que Flow no
-- deduplique dos reportes distintos. El ban real lo hace max_ban_session en la rama onSuccess.
drop function if exists public.max_ban(text);
create or replace function public.max_flag(reason text)
returns jsonb language sql as $$
  select jsonb_build_object('flagged', true, 'flag_id', gen_random_uuid());
$$;

-- Rama onSuccess: banea al visitante de ESA sesión. El session_id lo pone el runtime de Flow,
-- nunca el modelo; el client_id sale de la última pregunta registrada con esa sesión.
create or replace function public.max_ban_session(p_session_id text, p_reason text default null)
returns jsonb language plpgsql as $$
declare
  v_client  text;
  v_hours   constant int := 24;
  v_expires timestamptz := now() + make_interval(hours => v_hours);
begin
  select client_id into v_client from public.chat_questions
  where session_id = p_session_id and client_id <> 'unknown'
  order by created_at desc limit 1;
  if v_client is null then
    raise exception 'sin client_id para la sesión %', p_session_id;
  end if;
  insert into public.chat_bans (client_id, reason, expires_at)
  values (v_client, left(coalesce(nullif(p_reason, ''), 'sin motivo'), 500), v_expires);
  return jsonb_build_object('banned', true, 'hours', v_hours, 'expires_at', v_expires, 'client_id', v_client);
end $$;

-- Las funciones solo las llama la service role
revoke execute on function public.max_check_and_log(text, text, text) from public, anon, authenticated;
revoke execute on function public.max_flag(text)                    from public, anon, authenticated;
revoke execute on function public.max_ban_session(text, text)       from public, anon, authenticated;

-- Consultas útiles
-- Preguntas recientes:  select created_at, message from chat_questions order by created_at desc limit 50;
-- Bans activos:         select * from chat_bans where expires_at > now();
-- Quitar un ban:        update chat_bans set expires_at = now() where id = <id>;
