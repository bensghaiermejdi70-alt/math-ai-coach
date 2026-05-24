-- Migration: Add per-subject quotas (matière) support
-- Run this in Supabase SQL Editor

-- 1. Add matiere column to user_quotas
ALTER TABLE user_quotas ADD COLUMN matiere TEXT NOT NULL DEFAULT 'mathematiques';

-- 2. Create new primary key with matiere
ALTER TABLE user_quotas DROP CONSTRAINT user_quotas_pkey;
ALTER TABLE user_quotas ADD PRIMARY KEY (user_id, week_start, matiere);

-- 3. Create unique index for the old constraint (fallback for legacy queries)
CREATE UNIQUE INDEX idx_user_quotas_legacy ON user_quotas(user_id, week_start) WHERE matiere = 'mathematiques';

-- 4. Create index for matiere lookups
CREATE INDEX idx_user_quotas_matiere ON user_quotas(user_id, matiere, week_start);

-- 5. Update trigger for increment_quota RPC to support matiere parameter
CREATE OR REPLACE FUNCTION increment_quota(
  p_user_id TEXT,
  p_matiere TEXT DEFAULT 'mathematiques',
  p_type TEXT
)
RETURNS void AS $$
DECLARE
  v_col_name TEXT;
  v_week_start TEXT;
BEGIN
  -- Get current week start
  v_week_start := to_char(
    (CURRENT_DATE - INTERVAL '1 day' * ((EXTRACT(DOW FROM CURRENT_DATE) - 1 + 7) % 7))::DATE,
    'YYYY-MM-DD'
  );

  -- Map type to column name
  v_col_name := CASE p_type
    WHEN 'chat' THEN 'chat_used'
    WHEN 'solver' THEN 'solver_used'
    WHEN 'simulations' THEN 'simulations_used'
    WHEN 'remediation' THEN 'remediation_used'
    WHEN 'analyses' THEN 'analyses_used'
    ELSE 'chat_used'
  END;

  -- Upsert the quota row
  INSERT INTO user_quotas (user_id, week_start, matiere, chat_used, solver_used, simulations_used, remediation_used, analyses_used)
  VALUES (
    p_user_id,
    v_week_start,
    p_matiere,
    CASE WHEN v_col_name = 'chat_used' THEN 1 ELSE 0 END,
    CASE WHEN v_col_name = 'solver_used' THEN 1 ELSE 0 END,
    CASE WHEN v_col_name = 'simulations_used' THEN 1 ELSE 0 END,
    CASE WHEN v_col_name = 'remediation_used' THEN 1 ELSE 0 END,
    CASE WHEN v_col_name = 'analyses_used' THEN 1 ELSE 0 END
  )
  ON CONFLICT (user_id, week_start, matiere) DO UPDATE SET
    chat_used = chat_used + CASE WHEN v_col_name = 'chat_used' THEN 1 ELSE 0 END,
    solver_used = solver_used + CASE WHEN v_col_name = 'solver_used' THEN 1 ELSE 0 END,
    simulations_used = simulations_used + CASE WHEN v_col_name = 'simulations_used' THEN 1 ELSE 0 END,
    remediation_used = remediation_used + CASE WHEN v_col_name = 'remediation_used' THEN 1 ELSE 0 END,
    analyses_used = analyses_used + CASE WHEN v_col_name = 'analyses_used' THEN 1 ELSE 0 END;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
