-- Migración 007 del chat de Max: plazos de conservación de la Política de privacidad (cláusula 06).
-- Ejecutar SOLO este archivo, sin texto seleccionado. La llama a diario el flujo Max-Retention de Flow.
-- Conversaciones: se borran a los 12 meses. Bans: la fila se borra 30 días después de vencer
-- (los 30 días permiten revisar un reclamo por un bloqueo; el bloqueo en sí dura 24 horas).

create or replace function public.max_purge_expired(p_months int default 12)
returns jsonb language plpgsql as $$
declare
  v_questions int;
  v_bans      int;
begin
  delete from public.chat_questions where created_at < now() - make_interval(months => greatest(p_months, 1));
  get diagnostics v_questions = row_count;
  delete from public.chat_bans where expires_at < now() - interval '30 days';
  get diagnostics v_bans = row_count;
  return jsonb_build_object('questions_deleted', v_questions, 'bans_deleted', v_bans);
end $$;
revoke execute on function public.max_purge_expired(int) from public, anon, authenticated;

-- Comprobación: debe devolver 0 y 0 (no hay datos tan viejos todavía)
select public.max_purge_expired(12);
