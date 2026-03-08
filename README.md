# 🧮 MathAI Coach — Frontend

Plateforme EdTech de mathématiques avec IA pour la **Tunisie**, le **Maroc** et la **France**.

## 🚀 Démarrage rapide

```bash
cd math-ai-coach/frontend
npm install
npm run dev
# → http://localhost:3000
```

> ⚠️ Le backend FastAPI doit tourner sur `http://localhost:8000`

---

## 📁 Structure du projet

```
src/
├── app/                        # Next.js 14 App Router
│   ├── page.tsx                # Accueil / Landing
│   ├── solve/page.tsx          # Solveur IA étape par étape
│   ├── chat/page.tsx           # Chat avec le Professeur IA
│   ├── examens/page.tsx        # 10 ans d'examens Bac + FST
│   ├── exercises/page.tsx      # Exercices filtrables
│   ├── profile/page.tsx        # Profil étudiant & progression
│   ├── professeur/page.tsx     # Espace professeur
│   ├── auth/                   # Login & Register
│   │
│   ├── bac/                    # Programme Bac Tunisie (4ème Maths)
│   │   ├── page.tsx            # Vue d'ensemble Bac
│   │   ├── trimestre1/
│   │   │   ├── limites/        # Limites & Continuité
│   │   │   ├── complexes/      # Nombres Complexes
│   │   │   └── suites/         # Suites Réelles
│   │   ├── trimestre2/
│   │   │   ├── derivees/       # Dérivabilité & Étude de fonctions
│   │   │   ├── logarithme/     # Fonction Logarithme
│   │   │   ├── exponentielle/  # Fonction Exponentielle
│   │   │   └── geometrie-espace/ # Géométrie dans l'Espace
│   │   └── trimestre3/
│   │       ├── integrales/     # Primitives & Intégrales
│   │       ├── equations-diff/ # Équations Différentielles
│   │       ├── probabilites/   # Probabilités & Var. Aléatoires
│   │       └── isometries/     # Isométries & Coniques
│   │
│   └── universite/             # Licence FST Tunisie
│       ├── page.tsx            # Vue d'ensemble FST
│       ├── analyse1/           # Analyse 1 (S1)
│       ├── algebre1/           # Algèbre 1 (S1)
│       ├── analyse2/           # Analyse 2 (S2)
│       ├── algebre-lineaire/   # Algèbre Linéaire (S2)
│       ├── analyse3/           # Analyse 3 (S3)
│       └── proba-stats/        # Probabilités & Stats (S3-S4)
│
├── components/
│   ├── layout/                 # Navbar, Footer, Sidebar
│   ├── ui/                     # Card, Button, Badge, Modal, Input...
│   ├── solver/                 # SolverInput, SolverResult, SolverHistory
│   ├── exercises/              # ExerciseCard, ExerciseForm, ExerciseCorrection
│   ├── dashboard/              # StatCard, ActivityFeed, WeeklyChart
│   └── chat/                   # ChatWindow
│
├── hooks/                      # useSolver, useExercises, useProgress
├── lib/                        # api.ts, helpers.ts
└── types/                      # index.ts (types TypeScript)
```

---

## 🎨 Design System

| Variable CSS | Valeur | Usage |
|---|---|---|
| `--bg` | `#07080f` | Fond principal |
| `--surface` | `#11142b` | Cards |
| `--accent` | `#4f6ef7` | Couleur principale |
| `--teal` | `#06d6a0` | Succès / Fort |
| `--gold` | `#f5c842` | Avertissement / Moyen |
| `--red` | `#ef4444` | Erreur / Faible |

**Fonts :** Syne (titres) · DM Sans (corps) · DM Mono (code/maths)

---

## 🔌 API Backend (FastAPI)

| Endpoint | Méthode | Description |
|---|---|---|
| `/api/solve` | POST | Résolution étape par étape |
| `/api/chat` | POST | Chat IA (Claude) |
| `/api/exercises` | GET | Liste exercices filtrables |
| `/api/exercises/check` | POST | Correction réponse étudiant |
| `/api/exams` | GET | Examens Bac / FST |
| `/api/profile` | GET | Profil utilisateur |
| `/api/progress` | GET | Progression par chapitre |

---

## 📚 Programmes couverts

### Bac Tunisie — 4ème Maths (11 chapitres)
- **T1 :** Limites & Continuité · Complexes · Suites
- **T2 :** Dérivées · Logarithme · Exponentielle · Géométrie Espace
- **T3 :** Intégrales · Éq. Diff · Probabilités · Isométries & Coniques

### Licence FST Tunisie (6 modules)
- **S1 :** Analyse 1 · Algèbre 1
- **S2 :** Analyse 2 · Algèbre Linéaire
- **S3 :** Analyse 3 · Probabilités & Statistiques

---

## 🛠️ Stack Technique

- **Frontend :** Next.js 14 · TypeScript · CSS Variables (no Tailwind runtime)
- **Backend :** FastAPI · SymPy · Claude API (Anthropic)
- **Base de données :** PostgreSQL
- **Déploiement :** Vercel (frontend) · Railway / Render (backend)

---

## 📦 Scripts disponibles

```bash
npm run dev        # Serveur de développement
npm run build      # Build production
npm run start      # Serveur production
npm run lint       # Lint ESLint
npm run type-check # Vérification TypeScript
```

---

## 👤 Cibles utilisateurs

| Profil | Fonctionnalités clés |
|---|---|
| **Étudiant Bac** | Programme T1→T3, solveur, chat IA, simulation examen |
| **Étudiant FST** | Modules S1→S4, partiels, exercices, solveur |
| **Professeur** | Génération exercices IA, suivi classe, export PDF |
