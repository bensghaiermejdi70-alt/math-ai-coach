# 🔧 PATCH POUR SIMULATION PAGES

## Pour: src/app/simulation/page.tsx

### CHANGEMENT 1: Après les imports (ligne ~47)
**TROUVER:**
```typescript
import { useAuth } from '@/lib/auth/AuthContext'

// ════════════════════════════════════════════════════════════════════
```

**REMPLACER PAR:**
```typescript
import { useAuth } from '@/lib/auth/AuthContext'
import { MatiereType } from '@/lib/types/monetisation'

// Track current subject for askClaude calls
let globalMatiere: MatiereType = 'mathematiques'

// ════════════════════════════════════════════════════════════════════
```

---

### CHANGEMENT 2: Fonction askClaude (ligne ~313)
**TROUVER:**
```typescript
async function askClaude(prompt: string, system: string, maxTokens = 4000, matiere = 'mathematiques'): Promise<string> {
  // Appel via route Next.js pour eviter les erreurs CORS
  const r = await fetch('/api/anthropic', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: maxTokens,
      system,
      messages: [{ role:'user', content:prompt }],
      type: 'simulations',
      matiere
    }),
  })
```

**REMPLACER PAR:**
```typescript
async function askClaude(prompt: string, system: string, maxTokens = 4000, matiere?: MatiereType): Promise<string> {
  // Appel via route Next.js pour eviter les erreurs CORS
  const m = matiere || globalMatiere
  const r = await fetch('/api/anthropic', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: maxTokens,
      system,
      messages: [{ role:'user', content:prompt }],
      type: 'simulations',
      matiere: m
    }),
  })
```

---

### CHANGEMENT 3: PhaseGenerating (ligne ~2468)
**AJOUTER APRÈS:**
```typescript
  const { isAdmin, isSprint, checkQuota, incrementQuota, quotas, quotaLimits, checkMatiereAccess, matiereActive} = useAuth()

// AJOUTE CETTE LIGNE:
  globalMatiere = matiereActive
```

---

### CHANGEMENT 4: PhaseExam (cherche la fonction)
**AJOUTER APRÈS:**
```typescript
function PhaseExam({ exam, onDone }: ...
```

**AJOUTE CES LIGNES:**
```typescript
  const { matiereActive } = useAuth()
  useEffect(() => { globalMatiere = matiereActive }, [matiereActive])
```

---

### CHANGEMENT 5: PhaseCorrection (cherche la fonction)
**AJOUTER APRÈS:**
```typescript
function PhaseCorrection({ exam, studentWork, onDone }: ...
```

**AJOUTE CES LIGNES:**
```typescript
  const { matiereActive } = useAuth()
  useEffect(() => { globalMatiere = matiereActive }, [matiereActive])
```

---

### CHANGEMENT 6: PhaseAnalysis (cherche la fonction)
**AJOUTER APRÈS:**
```typescript
function PhaseAnalysis({ exam, studentWork, correction, onDone }: ...
```

**AJOUTE CES LIGNES:**
```typescript
  const { matiereActive } = useAuth()
  useEffect(() => { globalMatiere = matiereActive }, [matiereActive])
```

---

### CHANGEMENT 7: Main export SimulationPage (cherche default export)
**AJOUTER APRÈS:**
```typescript
export default function SimulationPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { user, hasActiveSubscription, isAdmin, checkMatiereAccess, matiereActive } = useAuth()
```

**AJOUTE CETTE LIGNE:**
```typescript
  globalMatiere = matiereActive
```

---

## MÊME PATTERN POUR LES 3 AUTRES FICHIERS:
- `src/app/simulation-france/page.tsx` ← même changements
- `src/app/bac-blanc/page.tsx` ← même changements (cherche askClaude)
- `src/app/bac-blanc-france/page.tsx` ← même changements

**Parce que tous ces fichiers utiliseraient la même structure et les mêmes appels `askClaude()`**
