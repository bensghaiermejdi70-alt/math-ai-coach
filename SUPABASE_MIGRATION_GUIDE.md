# ✅ SUPABASE MIGRATION - Quotas par Matière

## 📝 Étapes à Suivre

### 1. Exécuter le SQL dans Supabase Dashboard

**Accès:** https://app.supabase.com → Ton Projet → SQL Editor

**Copie-colle ce code complet:**

```sql
-- ========================================
-- MIGRATION: Add per-subject quotas
-- ========================================

-- Step 1: Add matiere column
ALTER TABLE user_quotas 
ADD COLUMN IF NOT EXISTS matiere TEXT NOT NULL DEFAULT 'mathematiques';

-- Step 2: Verify existing data before PK change
-- All rows will have matiere='mathematiques' by default

-- Step 3: Remove old primary key
ALTER TABLE user_quotas 
DROP CONSTRAINT IF EXISTS user_quotas_pkey;

-- Step 4: Create new primary key WITH matiere
ALTER TABLE user_quotas 
ADD CONSTRAINT user_quotas_pkey PRIMARY KEY (user_id, week_start, matiere);

-- Step 5: Create performance index
CREATE INDEX IF NOT EXISTS idx_user_quotas_matiere 
  ON user_quotas(user_id, matiere, week_start DESC);

-- Step 6: Create index for week queries
CREATE INDEX IF NOT EXISTS idx_user_quotas_week 
  ON user_quotas(user_id, week_start, matiere);

-- Step 7: Update increment_quota RPC function
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
  -- Calculate week start (Monday)
  v_week_start := to_char(
    (CURRENT_DATE - INTERVAL '1 day' * 
     ((EXTRACT(DOW FROM CURRENT_DATE) - 1 + 7) % 7))::DATE,
    'YYYY-MM-DD'
  );

  -- Map quota type to column name
  v_col_name := CASE p_type
    WHEN 'chat' THEN 'chat_used'
    WHEN 'solver' THEN 'solver_used'
    WHEN 'simulations' THEN 'simulations_used'
    WHEN 'remediation' THEN 'remediation_used'
    WHEN 'analyses' THEN 'analyses_used'
    ELSE 'chat_used'
  END;

  -- Upsert with new composite key
  INSERT INTO user_quotas 
    (user_id, week_start, matiere, chat_used, solver_used, simulations_used, remediation_used, analyses_used)
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

-- Step 8: Grant permissions to service role
GRANT EXECUTE ON FUNCTION increment_quota(TEXT, TEXT, TEXT) TO service_role;

-- Verification: Check structure
-- SELECT * FROM user_quotas LIMIT 5;
```

**Clique: "Run" ou Ctrl+Enter**

✅ Tu devrais voir "0 rows affected" pour les étapes sans données

---

### 2. Vérifier la Migration

**Après exécution, lance cette query:**

```sql
-- Vérifier la structure
\d user_quotas

-- Ou avec SELECT:
SELECT 
  table_name,
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'user_quotas'
ORDER BY ordinal_position;

-- Vérifier les indexes
SELECT indexname FROM pg_indexes 
WHERE tablename = 'user_quotas';
```

**Résultat attendu:**
```
user_quotas:
├─ id (uuid, pk)
├─ user_id (text)
├─ week_start (text)
├─ matiere (text) ← NEW!
├─ simulations_used (integer)
├─ chat_used (integer)
├─ solver_used (integer)
├─ remediation_used (integer)
└─ analyses_used (integer)

Primary Key: (user_id, week_start, matiere)
```

---

### 3. Test de Fonctionnement

**Scenario de test:**

```sql
-- Insert test data for 2 subjects
INSERT INTO user_quotas 
  (user_id, week_start, matiere, chat_used, solver_used, simulations_used)
VALUES
  ('test-user-123', '2026-05-05', 'mathematiques', 5, 3, 0),
  ('test-user-123', '2026-05-05', 'physique', 0, 0, 2);

-- Verify separate counts
SELECT user_id, week_start, matiere, solver_used, chat_used, simulations_used
FROM user_quotas
WHERE user_id = 'test-user-123'
  AND week_start = '2026-05-05';

-- Expected output:
-- test-user-123 | 2026-05-05 | mathematiques | 3 | 5 | 0
-- test-user-123 | 2026-05-05 | physique      | 0 | 0 | 2

-- Test increment RPC
SELECT increment_quota('test-user-123', 'mathematiques', 'solver');
SELECT increment_quota('test-user-123', 'physique', 'simulations');

-- Verify increments are separate
SELECT user_id, week_start, matiere, solver_used, simulations_used
FROM user_quotas
WHERE user_id = 'test-user-123'
  AND week_start = '2026-05-05'
ORDER BY matiere;

-- Expected output:
-- test-user-123 | 2026-05-05 | mathematiques | 4 | 0 ← math solver incremented
-- test-user-123 | 2026-05-05 | physique      | 0 | 3 ← physics sims incremented
```

---

### 4. Rollback (en cas de problème)

Si quelque chose va mal, voici le rollback:

```sql
-- Step 1: Drop new constraints
ALTER TABLE user_quotas 
DROP CONSTRAINT IF EXISTS user_quotas_pkey;

-- Step 2: Drop new indexes
DROP INDEX IF EXISTS idx_user_quotas_matiere;
DROP INDEX IF EXISTS idx_user_quotas_week;

-- Step 3: Restore old primary key (assumes you only have mathematiques)
DELETE FROM user_quotas WHERE matiere != 'mathematiques';

ALTER TABLE user_quotas 
ADD CONSTRAINT user_quotas_pkey PRIMARY KEY (user_id, week_start);

-- Step 4: Remove matiere column
ALTER TABLE user_quotas 
DROP COLUMN matiere;

-- Step 5: Restore old RPC function
CREATE OR REPLACE FUNCTION increment_quota(p_user_id TEXT, p_type TEXT)
RETURNS void AS $$
DECLARE
  v_col_name TEXT;
  v_week_start TEXT;
BEGIN
  v_week_start := to_char(
    (CURRENT_DATE - INTERVAL '1 day' * ((EXTRACT(DOW FROM CURRENT_DATE) - 1 + 7) % 7))::DATE,
    'YYYY-MM-DD'
  );
  
  v_col_name := CASE p_type
    WHEN 'chat' THEN 'chat_used'
    WHEN 'solver' THEN 'solver_used'
    WHEN 'simulations' THEN 'simulations_used'
    WHEN 'remediation' THEN 'remediation_used'
    WHEN 'analyses' THEN 'analyses_used'
    ELSE 'chat_used'
  END;

  INSERT INTO user_quotas (user_id, week_start, chat_used, solver_used, simulations_used, remediation_used, analyses_used)
  VALUES (p_user_id, v_week_start, 0, 0, 0, 0, 0)
  ON CONFLICT (user_id, week_start) DO UPDATE SET
    chat_used = CASE WHEN v_col_name = 'chat_used' THEN chat_used + 1 ELSE chat_used END,
    solver_used = CASE WHEN v_col_name = 'solver_used' THEN solver_used + 1 ELSE solver_used END,
    simulations_used = CASE WHEN v_col_name = 'simulations_used' THEN simulations_used + 1 ELSE simulations_used END,
    remediation_used = CASE WHEN v_col_name = 'remediation_used' THEN remediation_used + 1 ELSE remediation_used END,
    analyses_used = CASE WHEN v_col_name = 'analyses_used' THEN analyses_used + 1 ELSE analyses_used END;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

## 🎯 Checklist

- [ ] SQL exécuté dans Supabase
- [ ] Vérification structure OK
- [ ] Test insert + query réussi
- [ ] increment_quota fonctionne avec 3 params
- [ ] Code frontend déployé
- [ ] Test user avec 2 subscriptions:
  - [ ] Quota math à 20
  - [ ] Quota physique à 20
  - [ ] Utiliser math solver → math baisse à 19
  - [ ] Physique reste à 20 ✅
- [ ] Logs montrent matière correcte

---

## 📊 Résultat Attendu

Après la migration, chaque utilisateur aura des compteurs **séparés par matière**:

```
Week of 2026-05-05:
┌─────────────────┬───────────────┬─────────────────┐
│ Math            │ Physics       │ SVT             │
├─────────────────┼───────────────┼─────────────────┤
│ Chat: 5/20      │ Chat: 0/20    │ Chat: 0/3       │
│ Solver: 3/20    │ Solver: 0/20  │ Solver: 0/3     │
│ Sims: 0/5       │ Sims: 0/5     │ Sims: 0/5       │
└─────────────────┴───────────────┴─────────────────┘

User action: Use math solver
↓
│ Math            │ Physics       │ SVT             │
│ Solver: 2/20 ←  │ Solver: 0/20  │ Solver: 0/3     │

User action: Use physics simulator
↓
│ Math            │ Physics       │ SVT             │
│ Solver: 2/20    │ Sims: 4/5 ←   │ Sims: 0/5       │
```

---

## 🚨 Troubleshooting

**Q: Error "user_quotas_pkey already exists"**
A: La migration a déjà été exécutée. Vérifie avec:
```sql
SELECT * FROM information_schema.table_constraints 
WHERE table_name = 'user_quotas';
```

**Q: Ancien code appelle increment_quota avec 2 params**
A: C'est OK, le paramètre `p_matiere` a une valeur par défaut (`'mathematiques'`)

**Q: Duplicate key error au déploiement**
A: Rollback et vérifie qu'aucune row n'a 2x la même (user_id, week_start)

