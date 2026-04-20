-- Resultado do aluno em cada simulado semanal
-- Rode este SQL no editor do Supabase para habilitar a experiência do aluno.

-- Drop da versão anterior (se existir), sem perder dados de outras tabelas
drop view if exists simulado_leaderboard;
drop table if exists simulado_resultados cascade;

create table simulado_resultados (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  simulado_id uuid references simulados_semanais(id) on delete cascade not null,
  temporada_id uuid references simulado_temporadas(id) on delete set null,
  respostas jsonb not null default '{}'::jsonb,
  acertos int not null default 0,
  total_questoes int not null default 0,
  redacao_notas jsonb,
  redacao_total int,
  created_at timestamptz default now(),
  unique (user_id, simulado_id)
);

alter table simulado_resultados enable row level security;

create policy "own results select" on simulado_resultados
  for select using (auth.uid() = user_id);

create policy "own results insert" on simulado_resultados
  for insert with check (auth.uid() = user_id);

create policy "own results update" on simulado_resultados
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- View pública do leaderboard: só campos não-sensíveis (sem respostas individuais).
create view simulado_leaderboard as
select
  r.simulado_id,
  r.temporada_id,
  r.user_id,
  r.acertos,
  r.total_questoes,
  r.redacao_total,
  r.created_at,
  p.apelido,
  p.nome_completo,
  p.avatar_url
from simulado_resultados r
join profiles p on p.id = r.user_id;

grant select on simulado_leaderboard to authenticated, anon;
