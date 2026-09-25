-- Migration 002 : journal du routage multi-modèles / test A/B (/api/llm)
-- À exécuter dans le SQL Editor de Supabase. Sans danger : n'affecte aucune table existante.

create table if not exists public.llm_ab_logs (
  id                 bigint generated always as identity primary key,
  created_at         timestamptz not null default now(),
  user_id            uuid,
  compare_id         uuid,                                   -- renseigné en mode comparaison (admin)
  arm                text not null check (arm in ('control','variant')),
  attempt            smallint not null default 1,            -- 2 = appel de repli sur Claude
  fallback           boolean not null default false,         -- la variante a échoué => servi par Claude
  note               text,                                   -- 'compare' | 'unsupported_input' | 'no_openai_key' ...
  provider           text not null,
  model              text not null,
  effort             text,
  quota_type         text not null,                          -- chat | solver | simulations
  matiere            text,
  stream             boolean not null default false,
  ok                 boolean not null,
  status             int,
  error              text,
  latency_ms         int,
  ttfb_ms            int,                                    -- streaming : délai avant le 1er texte
  input_tokens       int,
  output_tokens      int,                                    -- OpenAI : raisonnement inclus
  cached_tokens      int,
  cache_write_tokens int,
  reasoning_tokens   int,
  cost_usd           numeric(12,6),                          -- estimation d'après les tarifs de config.ts
  output_chars       int,
  stop_reason        text                                    -- 'max_tokens' = réponse tronquée
);

create index if not exists idx_llm_ab_logs_created on public.llm_ab_logs (created_at desc);
create index if not exists idx_llm_ab_logs_arm     on public.llm_ab_logs (quota_type, arm, created_at desc);

-- Écriture uniquement via la clé service_role (comme usage_logs) : RLS activée, aucune policy.
alter table public.llm_ab_logs enable row level security;

-- ─────────────────────────────────────────────────────────────────────────────
-- Requête d'analyse (à lancer après quelques jours de test) :
--
-- select quota_type, arm, provider, model,
--        count(*)                                                  as appels,
--        round(100.0 * avg((ok)::int), 1)                          as pct_ok,
--        round(100.0 * avg((fallback)::int), 1)                    as pct_repli,
--        round(100.0 * avg((stop_reason = 'max_tokens')::int), 1)  as pct_tronque,
--        percentile_cont(0.5)  within group (order by latency_ms)  as latence_p50_ms,
--        percentile_cont(0.95) within group (order by latency_ms)  as latence_p95_ms,
--        round(avg(cost_usd)::numeric, 5)                          as cout_moyen_usd
--   from public.llm_ab_logs
--  where note is distinct from 'compare' and attempt = 1 and note is distinct from 'unsupported_input'
--  group by 1,2,3,4
--  order by 1,2;