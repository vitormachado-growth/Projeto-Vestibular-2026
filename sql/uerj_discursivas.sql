-- ════════════════════════════════════════════════════════════════════════
-- UERJ — Exame Discursivo (ED)
-- 4 tabelas:
--   uerj_discursivas           — uma por ano de aplicação
--   uerj_discursiva_questoes   — questões agrupadas por disciplina + ano
--   uerj_discursiva_redacao    — proposta de redação (uma por ano)
--   uerj_discursiva_resultados — tentativa do aluno (ano + 2 disciplinas)
-- ════════════════════════════════════════════════════════════════════════

drop table if exists uerj_discursiva_resultados cascade;
drop table if exists uerj_discursiva_redacao    cascade;
drop table if exists uerj_discursiva_questoes   cascade;
drop table if exists uerj_discursivas           cascade;

-- ── PROVA (uma por ano) ────────────────────────────────────────────────
create table uerj_discursivas (
  id          uuid primary key default gen_random_uuid(),
  ano         int  not null unique,
  titulo      text not null,                       -- ex: "UERJ 2024 — Exame Discursivo"
  data_aplicacao date,
  ativa       boolean default true,
  criado_em   timestamptz default now()
);

-- ── QUESTÕES (por disciplina + ano) ────────────────────────────────────
-- disciplina: 'biologia' | 'fisica' | 'geografia' | 'historia'
--           | 'lingua_portuguesa' | 'lingua_estrangeira'
--           | 'matematica' | 'quimica'
create table uerj_discursiva_questoes (
  id              uuid primary key default gen_random_uuid(),
  prova_id        uuid references uerj_discursivas(id) on delete cascade not null,
  disciplina      text not null,
  ordem           int  not null,
  enunciado       text not null,
  imagens         text[] default '{}',             -- URLs (opcional)
  padrao_resposta text not null,                   -- gabarito descritivo da banca
  unique (prova_id, disciplina, ordem)
);

create index on uerj_discursiva_questoes (prova_id, disciplina);

-- ── REDAÇÃO (uma por prova) ────────────────────────────────────────────
create table uerj_discursiva_redacao (
  id                  uuid primary key default gen_random_uuid(),
  prova_id            uuid references uerj_discursivas(id) on delete cascade not null unique,
  tema                text not null,
  textos_motivadores  text,                        -- pode ter quebras de linha + parágrafos longos
  comando             text,                        -- instrução de produção
  padrao_resposta     text                         -- expectativas da banca
);

-- ── RESULTADOS (tentativa do aluno) ────────────────────────────────────
-- disciplinas: array com as 2 disciplinas escolhidas pelo aluno (ex: ['biologia','quimica'])
-- respostas: jsonb { [questao_id]: { resposta, nota, feedback, pontos_positivos, pontos_faltantes, corrigida_em } }
create table uerj_discursiva_resultados (
  id                 uuid primary key default gen_random_uuid(),
  user_id            uuid references auth.users(id) on delete cascade not null,
  prova_id           uuid references uerj_discursivas(id) on delete cascade not null,
  disciplinas        text[] not null,
  iniciado_em        timestamptz default now(),
  finalizado_em      timestamptz,
  respostas          jsonb not null default '{}'::jsonb,
  redacao_resposta   text,
  redacao_nota       int,
  redacao_feedback   text,
  redacao_corrigida_em timestamptz,
  nota_total         numeric,                      -- preenchida pela função de correção
  created_at         timestamptz default now()
);

create index on uerj_discursiva_resultados (user_id, prova_id);

-- ════════════════════════════════════════════════════════════════════════
-- RLS
-- ════════════════════════════════════════════════════════════════════════

alter table uerj_discursivas           enable row level security;
alter table uerj_discursiva_questoes   enable row level security;
alter table uerj_discursiva_redacao    enable row level security;
alter table uerj_discursiva_resultados enable row level security;

-- Material de estudo: qualquer autenticado pode LER
create policy "ler provas"          on uerj_discursivas         for select using (auth.role() = 'authenticated');
create policy "ler questoes"        on uerj_discursiva_questoes for select using (auth.role() = 'authenticated');
create policy "ler redacao"         on uerj_discursiva_redacao  for select using (auth.role() = 'authenticated');

-- Admin (perfil com is_admin=true) pode INSERIR/EDITAR/REMOVER material
create policy "admin escreve provas" on uerj_discursivas
  for all using (
    exists (select 1 from profiles where id = auth.uid() and is_admin = true)
  ) with check (
    exists (select 1 from profiles where id = auth.uid() and is_admin = true)
  );

create policy "admin escreve questoes" on uerj_discursiva_questoes
  for all using (
    exists (select 1 from profiles where id = auth.uid() and is_admin = true)
  ) with check (
    exists (select 1 from profiles where id = auth.uid() and is_admin = true)
  );

create policy "admin escreve redacao" on uerj_discursiva_redacao
  for all using (
    exists (select 1 from profiles where id = auth.uid() and is_admin = true)
  ) with check (
    exists (select 1 from profiles where id = auth.uid() and is_admin = true)
  );

-- Resultados: cada aluno só vê / mexe nos próprios
create policy "ler próprios resultados"   on uerj_discursiva_resultados for select using (auth.uid() = user_id);
create policy "inserir próprio resultado" on uerj_discursiva_resultados for insert with check (auth.uid() = user_id);
create policy "atualizar próprio resultado" on uerj_discursiva_resultados for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
