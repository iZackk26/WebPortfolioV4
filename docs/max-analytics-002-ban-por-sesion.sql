-- Migración 002 del chat de Max: el ban pasa de header (max_ban) a sesión (max_ban_session).
-- Ejecutar una vez en el SQL Editor de Supabase, después de max-analytics.sql.
-- Motivo: el runtime de Flow no resuelve {{…}} en los headers de las herramientas.

drop function if exists public.max_ban(text);

-- Herramienta del agente: solo confirma el reporte. El id único evita que Flow deduplique
-- dos reportes distintos. El ban real lo hace max_ban_session en la rama onSuccess.
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

-- Solo la service role (Flow) puede llamarlas
revoke execute on function public.max_flag(text)              from public, anon, authenticated;
revoke execute on function public.max_ban_session(text, text) from public, anon, authenticated;
