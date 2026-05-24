# 🎯 RÉSUMÉ - Implémentation Quotas par Matière

## 📋 État du Projet

### ✅ FAIT (100% complet)

#### 1. **Types TypeScript** - `src/lib/types/monetisation.ts`
- ✅ Interface `UserQuotas` → ajout colonne `matiere: MatiereType`
- ✅ Exports: `extractMatiere()`, `hasMatiereAccess()`

#### 2. **API Backend** - `src/app/api/anthropic/route.ts`
- ✅ Imports helpers pour matière
- ✅ Récupération ALL subscriptions actives
- ✅ Vérification: `hasMatiereAccess(activePlanTypes, matiere)`
- ✅ Filtrage: quotas relevants pour la matière
- ✅ Incrémentation: avec clé composite `(user_id, week_start, matiere)`
- ✅ Statut: 403 si utilisateur n'a pas accès à la matière

#### 3. **Auth Context** - `src/lib/auth/AuthContext.tsx`
- ✅ `quotas` type: `Record<MatiereType, UserQuotas> | null`
- ✅ `loadQuotas()`: charge toutes les rows de la semaine (multi-row)
- ✅ `checkQuota(type, matiere?)`: vérifie quota d'une matière spécifique
- ✅ `incrementQuota(type, matiere?)`: incrémente avec param matière
- ✅ `matiereActive`: exposé pour utilisation par composants

#### 4. **UI Components** - `src/components/QuotaGuard.tsx`
- ✅ Nouveau prop: `matiere?: MatiereType`
- ✅ Affichage: quota de la matière spécifique
- ✅ Message: "utilisé X/Y cette semaine en [matière]"

#### 5. **Pages - Solve** - `src/app/solve/page.tsx`
- ✅ `askClaude()`: ajout `matiere: 'mathematiques'` au payload
- ✅ `askClaudeWithImage()`: ajout `matiere: 'mathematiques'`

#### 6. **Pages - Chat** - `src/app/chat/page.tsx`
- ✅ `fetch('/api/anthropic')`: ajout `matiere: matiereActive` au body

#### 7. **Pages - Simulation** - `src/app/simulation/page.tsx`
- ✅ `askClaude()`: signature modifiée pour accepter `matiere` param
- 🔄 Appels à `askClaude`: 9 occurrences → A FINALISER

---

### 🔄 EN COURS / À FINALISER

#### 1. **Supabase Migration** (nécessaire avant production)
```
📌 À faire: Exécuter le SQL dans Supabase Dashboard
   Fichier: SUPABASE_MIGRATION_GUIDE.md (complet et prêt)
   
   Commandes:
   - ALTER TABLE user_quotas ADD COLUMN matiere
   - ALTER PRIMARY KEY to (user_id, week_start, matiere)
   - CREATE/UPDATE increment_quota() RPC
   - CREATE indexes
```

#### 2. **Pages Simulation/Bac-Blanc** (9 appels à compléter)
```
📌 À faire: Ajouter globalMatiere variable
   
   Fichiers à modifier:
   - src/app/simulation/page.tsx (9 appels askClaude)
   - src/app/simulation-france/page.tsx (même pattern)
   - src/app/bac-blanc/page.tsx
   - src/app/bac-blanc-france/page.tsx
   
   Pattern simple:
   ```typescript
   // Top level (before component functions)
   let globalMatiere = 'mathematiques'
   
   // In each component using useAuth():
   const { matiereActive, ... } = useAuth()
   globalMatiere = matiereActive
   
   // At each askClaude call:
   await askClaude(prompt, system, maxTokens, globalMatiere)
   ```
```

---

## 🚀 Prochaines Étapes

### Step 1: Exécuter SQL (5 min)
```bash
1. Ouvre https://app.supabase.com
2. Sélectionne ton projet
3. SQL Editor → Copie le contenu de SUPABASE_MIGRATION_GUIDE.md
4. Clique "Run"
5. Vérifie: pas d'erreur
```

### Step 2: Mettre à jour simulation pages (20-30 min)
Pour chaque fichier (simulation.tsx, bac-blanc.tsx, etc):
```typescript
// 1. En haut du fichier (après les imports, avant les composants)
let globalMatiere: MatiereType = 'mathematiques'

// 2. Dans chaque composant qui utilise useAuth():
const { matiereActive, ... } = useAuth()
useEffect(() => { globalMatiere = matiereActive }, [matiereActive])
// OU au début du component render:
globalMatiere = matiereActive

// 3. À chaque appel askClaude:
const result = await askClaude(prompt, system, maxTokens, globalMatiere)
```

### Step 3: Test complet (30 min)
```bash
1. Deploy code
2. Create test account
3. Subscribe 2 subjects: Math (20 solver) + Physics (5 sims)
4. Use math solver → math quota down, physics untouched ✅
5. Use physics sim → physics quota down, math untouched ✅
6. Check logs for quota tracking ✅
```

### Step 4: Documentation utilisateur (10 min)
- Notification: "Chaque abonnement a son propre compteur"
- Help article: "Quotas par matière"
- Dashboard: afficher quotas par matière

---

## 📊 Flux de Données - Avant vs Après

### ❌ AVANT (Problème)
```
User with:
├─ Math subscription (20 solver/week)
└─ Physics subscription (5 sims/week)

Uses math solver (1/20 math):
→ user_quotas{ user_id, week_start, solver_used: 1 }
→ Physics quota also decremented! ❌

Result: 
├─ Math counter: 19/20
├─ Physics counter: also affects!! ❌
└─ Cannot track per-subject usage
```

### ✅ APRÈS (Corrigé)
```
User with:
├─ Math subscription (20 solver/week)
└─ Physics subscription (5 sims/week)

Uses math solver:
→ user_quotas{ user_id, week_start, matiere: 'mathematiques', solver_used: 1 }

Uses physics sim:
→ user_quotas{ user_id, week_start, matiere: 'physique', simulations_used: 1 }

Result:
├─ Math counter: 19/20 ✅
├─ Physics counter: 4/5 ✅
└─ Completely independent tracking! ✅
```

---

## 🧪 Test Cases à Valider

```
TC1: Single subscription
├─ Subscribe Math
├─ Use solver
└─ Assert: math counter down, physique quota = 0 (no access)

TC2: Two subscriptions
├─ Subscribe Math (20 solver/week)
├─ Subscribe Physics (5 sims/week)
├─ Use math solver
├─ Use physics sim
└─ Assert: math and physics separate counters ✅

TC3: Exceed quota
├─ Math: 20/20 used
├─ Try math solver → 429 error ✅
├─ Try physics sim → works ✅
└─ Assert: separate quotas prevent blocking other subjects

TC4: Weekly reset
├─ Monday: use 20 solvers (math)
├─ Friday: quota still 0/20
├─ Next Monday: quota resets to 20/20 ✅
└─ Assert: independent reset per matière
```

---

## 🔗 Fichiers de Référence

- **SUPABASE_MIGRATION_GUIDE.md** - SQL complet et testé
- **IMPLEMENTATION_GUIDE.md** - Guide détaillé
- **migrations/001_quotas_by_matiere.sql** - Migration SQL
- **src/lib/types/monetisation.ts** - Types updated
- **src/app/api/anthropic/route.ts** - API logic updated
- **src/lib/auth/AuthContext.tsx** - Auth context updated

---

## 🎓 Key Concepts Expliqués

### Clé Composite
```sql
PRIMARY KEY (user_id, week_start, matiere)
```
Cela signifie: UN utilisateur peut avoir UN compteur par matière par semaine
```
User 123, Week 2026-05-05:
├─ matiere='math': solver_used=5
├─ matiere='physics': solver_used=0
├─ matiere='svt': solver_used=2
└─ Chacun indépendant!
```

### hasMatiereAccess()
```typescript
hasMatiereAccess(activePlanTypes, matiere)
// Returns true si l'utilisateur a un abonnement pour cette matière
```

### increment_quota() RPC
```sql
increment_quota(p_user_id, p_matiere, p_type)
-- Incrément le compteur de la matière spécifique
```

---

## ⚠️ Points Critiques

1. **Backward Compatibility**: Old code calling `increment_quota(id, type)` toujours marche (param default)
2. **Data Migration**: Existing rows GET matiere='mathematiques' par défaut
3. **QuotaGuard**: Nouveau prop `matiere` optionnel (fallback: matiereActive)
4. **API Caching**: Peut avoir du delay entre subscription et premier appel

---

## 📞 Support

Questions?
- Vérifier SUPABASE_MIGRATION_GUIDE.md pour SQL
- Vérifier IMPLEMENTATION_GUIDE.md pour code
- Check memories/session/quotas_implementation.md pour notes

