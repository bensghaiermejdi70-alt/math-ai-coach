## GUIDE D'IMPLÉMENTATION - QUOTAS PAR MATIÈRE

### 1️⃣ MIGRATIONS SUPABASE (À exécuter dans SQL Editor)

Voir: `migrations/001_quotas_by_matiere.sql`

Cela va:
- Ajouter colonne `matiere` à `user_quotas`
- Modifier la clé primaire: `(user_id, week_start, matiere)`
- Créer indexes pour performance
- Mettre à jour la fonction RPC `increment_quota`

### 2️⃣ CHANGEMENTS CODE (DÉJÀ FAIT ✅)

#### ✅ Types - `src/lib/types/monetisation.ts`
- Interface `UserQuotas` → ajout `matiere: MatiereType`

#### ✅ API - `src/app/api/anthropic/route.ts`
- Imports: `extractMatiere`, `hasMatiereAccess`, `MatiereType`
- Logique: récupère tous les abonnements, filtre par matière
- Vérification: `hasMatiereAccess` + compteur par matière
- Incrémentation: inclut `matiere` dans l'upsert avec clé composite

#### ✅ Auth Context - `src/lib/auth/AuthContext.tsx`
- `quotas`: `UserQuotas` → `Record<MatiereType, UserQuotas>`
- `loadQuotas()`: charge ALL rows de la semaine (pas .single())
- `checkQuota(type, matiere?)`: accepte paramètre matière
- `incrementQuota(type, matiere?)`: passe matière à RPC

#### ✅ Componennts - `src/components/QuotaGuard.tsx`
- Props: `matiere?: MatiereType`
- Affiche: utilisé quota de la matière spécifique

#### ✅ Pages - Solve & Chat
- `askClaude()` / `fetch('/api/anthropic')`: ajout `matiere: 'mathematiques'`

### 3️⃣ À FAIRE - Autres pages (simulation, bac-blanc, etc)

Pour chaque page, ajouter `matiere` au payload:

#### `src/app/simulation/page.tsx` - COMPLEXE (9 appels)
```typescript
// Créer une ref globale pour matiereActive:
let globalMatiere = 'mathematiques'

// Dans PhaseGenerating/PhaseExam/etc, au début:
globalMatiere = matiereActive

// À chaque appel à askClaude, ajouter:
const result = await askClaude(prompt, system, maxTokens, globalMatiere)
```

Appels à modifier (9 total):
- L478: `generateOneExam()` → `askClaude(..., globalMatiere)`
- L637: `correctOneExercise()` → `askClaude(..., globalMatiere)`
- L680: `analyzeOneExerciseSim()` → `askClaude(..., globalMatiere)`
- L737: `analyzeStudentWork()` → `askClaude(..., globalMatiere)`
- L755: `correctRemediationExercise()` → `askClaude(..., globalMatiere)`
- L779: `estimateGrade()` → `askClaude(..., globalMatiere)`
- L2128: `PhaseGenerating` → `askClaude(..., globalMatiere)`
- L3362: `PhaseCorrection` → `askClaude(..., globalMatiere)`

#### `src/app/simulation-france/page.tsx`
- Même pattern que simulation.tsx

#### `src/app/bac-blanc/page.tsx`
- Même pattern

#### `src/app/bac-blanc-france/page.tsx`
- Même pattern

### 4️⃣ FLUX DE QUOTAS PAR MATIÈRE

```
User actions:
├─ Subscribe(math) → quota_math = full
├─ Subscribe(physics) → quota_physics = full
├─ Use Solver(math) → quota_math--
├─ Use Solver(physics) → quota_physics--  (stays full)
└─ Lundi → ALL reset
```

### 5️⃣ TESTER

```
Test case 1:
- User: subscriber à math (20 solver/week)
- Action: résoudre 1 problème math
- Result: math counter = 19/20, physics = 20/20

Test case 2:
- Subscribe physics après
- Action: générer 1 simulation physique
- Result: physics counter = 4/5, math unaffected

Test case 3:
- Hit math limit (20/20 used)
- Try math solver → 429 error ✅
- Try physics solver → works ✅
```

### 6️⃣ CHECKLIST AVANT PRODUCTION

- [ ] SQL migration exécuté en Supabase
- [ ] Test: create 2 subscriptions (math + physics)
- [ ] Test: check quotas separate par matière
- [ ] Test: verify increment works per-subject
- [ ] Test: simulator/chat send matiere in payload
- [ ] Test: bac-blanc pages send matiere
- [ ] Monitor: vérifier logs du quota par matière
- [ ] Documentation: expliquer aux users
