-- Migración 003 del chat de Max: la herramienta reportar_abuso usa la anon key (pública).
-- max_flag no lee ni escribe nada: solo devuelve un id único, así que exponerla no da acceso a datos.
-- El ban real (max_ban_session) sigue siendo solo de la service role, en la rama onSuccess.
-- Ejecutar SOLO este archivo, en una pestaña nueva del SQL Editor y sin texto seleccionado.

grant execute on function public.max_flag(text) to anon;

-- Comprobación: anon debe tener EXECUTE en max_flag y NO en las otras dos
select p.proname, has_function_privilege('anon', p.oid, 'execute') as anon_puede
from pg_proc p
where p.pronamespace = 'public'::regnamespace and p.proname like 'max\_%'
order by 1;
