-- Métricas y bans del chat de Max (Supabase). Instalación desde cero (estado final). Si ya la tienes, aplica solo las migraciones 00x.
-- client_id = hash SHA-256 salado de la IP que calcula api/chat.ts; la IP real nunca llega aquí.

create table if not exists public.chat_questions (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  client_id   text not null,
  session_id  text,
  message     text not null,
  was_banned  boolean not null default false,
  ban_token   uuid unique default gen_random_uuid()
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

-- Consultas útiles
-- Preguntas recientes:  select created_at, message from chat_questions order by created_at desc limit 50;
-- Bans activos:         select * from chat_bans where expires_at > now();
-- Quitar un ban:        update chat_bans set expires_at = now() where id = <id>;
