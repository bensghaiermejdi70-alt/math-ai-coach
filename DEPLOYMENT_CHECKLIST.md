# ✅ CHECKLIST DÉPLOIEMENT - Quotas par Matière

## 🎯 Objectif
Activer les compteurs **indépendants par matière** pour chaque utilisateur

---

## 📋 CHECKLIST

### PHASE 1: Préparation (5 min)

- [ ] Lire `PROBLEM_SOLUTION_EXPLAINED.md` (comprendre le fix)
- [ ] Copier le SQL depuis `SUPABASE_MIGRATION_GUIDE.md`
- [ ] Préparer l'accès à Supabase Dashboard
- [ ] Backup la base (recommandé mais pas obligatoire)

### PHASE 2: Migration Supabase (5-10 min)

- [ ] Ouvrir https://app.supabase.com
- [ ] Sélectionner le projet math-ai-coach
- [ ] Aller à: **SQL Editor**
- [ ] Coller le SQL complet depuis `SUPABASE_MIGRATION_GUIDE.md`
- [ ] Cliquer **"Run"** ou Ctrl+Enter
- [ ] Vérifier: **Pas d'erreur** ✓
- [ ] Vérifier: **Table structure updated** ✓
  ```sql
  SELECT column_name FROM information_schema.columns 
  WHERE table_name = 'user_quotas' 
  ORDER BY ordinal_position;
  ```
  Chercher: `matiere` dans les colonnes

### PHASE 3: Vérifier Migration Supabase (2-3 min)

- [ ] Exécuter ce query de test:
  ```sql
  SELECT 
    table_name,
    constraint_type,
    constraint_name
  FROM information_schema.table_constraints
  WHERE table_name = 'user_quotas'
  LIMIT 5;
  ```
  Chercher: `PRIMARY KEY` avec (user_id, week_start, matiere)

- [ ] Vérifier les indexes:
  ```sql
  SELECT indexname FROM pg_indexes 
  WHERE tablename = 'user_quotas';
  ```
  Chercher: `idx_user_quotas_matiere`, `idx_user_quotas_week`

### PHASE 4: Code - Pages Restantes (20-30 min)

- [ ] `src/app/simulation/page.tsx`
  - [ ] Ajouter: `import { MatiereType } from '@/lib/types/monetisation'`
  - [ ] Ajouter: `let globalMatiere: MatiereType = 'mathematiques'` (avant components)
  - [ ] Dans `PhaseGenerating`: `globalMatiere = matiereActive`
  - [ ] Remplacer 9 occurrences: `askClaude(p, s, t)` → `askClaude(p, s, t, globalMatiere)`
  - [ ] **Vérifier:** Compile sans erreur: `npm run build`

- [ ] `src/app/simulation-france/page.tsx`
  - [ ] Même pattern que simulation.tsx

- [ ] `src/app/bac-blanc/page.tsx`
  - [ ] Même pattern

- [ ] `src/app/bac-blanc-france/page.tsx`
  - [ ] Même pattern

### PHASE 5: Build & Test Local (10 min)

- [ ] Terminal: `npm run build`
  - [ ] Vérifier: **No errors** ✓
  - [ ] Vérifier: **No warnings** (ignorable si acceptables)

- [ ] Terminal: `npm run dev`
  - [ ] Attendre: Build complet
  - [ ] Ouvrir: http://localhost:3000
  - [ ] Vérifier: App load OK

### PHASE 6: Tester Functionnalité (10-15 min)

#### Test 1: Quotas Séparés
- [ ] Login avec test account
- [ ] Vérifier que c'est abonné à Math seulement
- [ ] Aller: Solveur → Résoudre 1 équation
- [ ] Vérifier: Quota Math baisse (ex: 19/20)
- [ ] Vérifier: DevTools Network → payload contient `"matiere": "mathematiques"`

#### Test 2: 2 Abonnements
- [ ] Créer/modifier user avec 2 abonnements (Math + Physics)
- [ ] Aller: Solveur Math → Résoudre 1 équation
  - [ ] Vérifier: Math 19/20
  - [ ] Vérifier: Physics 20/20 (inchangé)
- [ ] Aller: Simulation Physics → Générer 1 examen
  - [ ] Vérifier: Physics 4/5
  - [ ] Vérifier: Math 19/20 (inchangé)

#### Test 3: Accès Refusé
- [ ] Créer/modifier user avec SEUL abonnement Math
- [ ] Essayer: Outils Physique (Chat Physics, etc.)
- [ ] Vérifier: 403 error OU message "Pas d'accès"

#### Test 4: Logs
- [ ] Ouvrir browser DevTools → Console
- [ ] Utiliser solveur math
- [ ] Vérifier: Pas d'erreur JS
- [ ] Vérifier: Network request status 200 (pas 429)

### PHASE 7: Deployment (5-10 min)

- [ ] Merge code vers main/production branch
- [ ] Deploy: `git push origin main`
- [ ] CI/CD: Attendre build complet
- [ ] Vérifier: Production URL accessible

### PHASE 8: Post-Deploy Monitoring (10 min)

- [ ] Ouvrir: Production app
- [ ] Login test account
- [ ] Répéter Test 1-3 en production
- [ ] Vérifier: Pas d'erreurs dans logs
- [ ] Vérifier: Analytics/metrics mises à jour

### PHASE 9: Documentation & Communication (10 min)

- [ ] ✏️ Créer article "Quotas par Matière"
  - Expliquer: chaque matière = compteur indépendant
  - Exemple: abonné math + physics = quotas séparés
  - Mention: renouvellement lundi pour chaque matière

- [ ] 📧 Email utilisateurs clé:
  - "Nouvelle amélioration: quotas indépendants par matière"
  - "Votre abonnement physique ne consomme plus le quota math"

- [ ] 📊 Dashboard:
  - Afficher quotas par matière (pas juste global)

### PHASE 10: Validation Finale (5 min)

- [ ] ✅ Checkbox finale avant fermer:
  - [ ] SQL migration: OK
  - [ ] Code changes: OK
  - [ ] Build: No errors
  - [ ] Tests: Tous pass
  - [ ] Production: Accessible
  - [ ] Users notifiés

---

## 🚨 ROLLBACK (en cas de problème)

Si tu veux annuler:

1. **Database rollback** (Supabase SQL Editor):
   ```sql
   -- Voir script complet dans SUPABASE_MIGRATION_GUIDE.md
   -- Rollback section
   ```

2. **Code rollback**:
   ```bash
   git revert <commit-hash>
   npm run build
   deploy
   ```

3. **Test après rollback**:
   - [ ] Old quotas behavior back (shared global)
   - [ ] No errors

---

## 📞 TROUBLESHOOTING

| Problème | Solution |
|----------|----------|
| SQL error "constraint already exists" | Migration déjà exécutée, skip |
| "Cannot find matiere column" | SQL migration pas exécuté, refaire PHASE 2 |
| Build error "MatiereType not found" | Vérifier import: `import { MatiereType } from '@/lib/types/monetisation'` |
| 403 error pour matière abonnée | Vérifier: `hasMatiereAccess()` en `/api/anthropic`, check DB subscription |
| Quota pas décrément | Vérifier: payload inclut `matiere`, RPC appelé avec `matiere` param |
| Old data lost | Non, données conservées, juste ajout colonne avec default |
| Performance dégradée | Indexes créés, should be fine. Check DB metrics |

---

## 🎓 APRÈS LE DÉPLOIEMENT

- ✅ Monitor: Quota increments par matière
- ✅ Analytics: Usage patterns par sujet
- ✅ Support: Aider users avec questions quotas
- ✅ Iterate: Feedback users → improvements
- ✅ Document: Keep guides updated

---

## 📊 TIMELINE ESTIMÉ

| Phase | Durée | Cumul |
|-------|-------|-------|
| Préparation | 5 min | 5 min |
| Supabase | 10 min | 15 min |
| Code | 30 min | 45 min |
| Build & Test | 10 min | 55 min |
| Test Fonctionnel | 15 min | 70 min |
| Deploy | 10 min | 80 min |
| Monitoring | 10 min | 90 min |

**Total: ~1.5 heures** (including all testing)

---

## 📝 NOTES

- Garder ce checklist comme reference
- Copier messages de test réussis pour documentation
- Note les times réelles vs estimé pour learning
- Flag tous les bugs trouvés pour futur fixing

---

**Status: READY TO DEPLOY** ✅

Tous les fichiers sont préparés. Tu n'as qu'à suivre cette checklist dans l'ordre!

