-- Migración 006 del chat de Max: vistas de analítica. Ejecutar después de 005.
-- security_invoker: la vista respeta el RLS de la tabla, así la publishable key no ve nada por la API.
-- Las fechas se agrupan en hora de Costa Rica.

create or replace view public.max_v_consultas with (security_invoker = true) as
select id, created_at at time zone 'America/Costa_Rica' as fecha_cr, session_id, client_id,
       country, region, city, device, page, browser_lang, lang, intent, topic,
       message, answer, tokens_used, latency_ms, reported, was_banned
from public.chat_questions;

create or replace view public.max_v_diario with (security_invoker = true) as
select (created_at at time zone 'America/Costa_Rica')::date as dia,
       count(*)                                   as consultas,
       count(distinct client_id)                  as visitantes,
       count(distinct session_id)                 as sesiones,
       count(*) filter (where reported)           as reportes,
       count(*) filter (where was_banned)         as bloqueadas,
       round(avg(latency_ms))                     as latencia_ms_prom,
       sum(tokens_used)                           as tokens
from public.chat_questions group by 1 order by 1 desc;

create or replace view public.max_v_intenciones with (security_invoker = true) as
select coalesce(intent, 'sin_clasificar') as intencion, count(*) as consultas,
       round(100.0 * count(*) / sum(count(*)) over (), 1) as porcentaje,
       count(distinct client_id) as visitantes
from public.chat_questions where created_at > now() - interval '30 days'
group by 1 order by 2 desc;

create or replace view public.max_v_paises with (security_invoker = true) as
select coalesce(country, '??') as pais, city as ciudad, count(*) as consultas,
       count(distinct client_id) as visitantes, max(created_at) as ultima
from public.chat_questions where created_at > now() - interval '30 days'
group by 1, 2 order by 3 desc;

create or replace view public.max_v_temas with (security_invoker = true) as
select coalesce(topic, 'sin_tema') as tema, intent as intencion, count(*) as consultas
from public.chat_questions where created_at > now() - interval '30 days'
group by 1, 2 order by 3 desc;

create or replace view public.max_v_sesiones with (security_invoker = true) as
select session_id, min(client_id) as client_id, min(country) as pais, min(city) as ciudad,
       min(device) as dispositivo, min(created_at) as inicio, max(created_at) as fin,
       count(*) as mensajes, array_remove(array_agg(distinct intent), null) as intenciones,
       bool_or(reported) as reportada
from public.chat_questions where session_id is not null
group by session_id order by inicio desc;

create or replace view public.max_v_bans_activos with (security_invoker = true) as
select b.id, b.created_at, b.expires_at, b.reason, b.client_id,
       (select country from public.chat_questions q where q.client_id = b.client_id order by id desc limit 1) as pais
from public.chat_bans b where b.expires_at > now() order by b.created_at desc;

revoke all on public.max_v_consultas, public.max_v_diario, public.max_v_intenciones, public.max_v_paises,
              public.max_v_temas, public.max_v_sesiones, public.max_v_bans_activos from anon, authenticated;

-- Uso:  select * from max_v_diario;  select * from max_v_intenciones;  select * from max_v_sesiones limit 20;
-- Limpiar las filas de prueba (client_id de un solo carácter repetido):
--   delete from chat_questions where client_id ~ '^(.)\1{63}$';
