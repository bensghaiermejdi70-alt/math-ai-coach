# 📋 EXPLICATION - Problème vs Solution

## 🔴 LE PROBLÈME (Ce que tu décrivais)

Tu as créé un test avec un utilisateur qui a:
- ✅ Abonnement Mathématiques
- ✅ Abonnement Physique

**Le Bug:**
- Utilisateur utilise le solveur en Mathématiques
- Le compteur **global** descend (par exemple 20→19)
- Mais ce compteur affectait **AUSSI** la Physique
- Résultat: les deux matières partagent le même compteur ❌

```
AVANT (bug):
┌─────────────────────────────────────────┐
│ Compteur GLOBAL: 20 utilisations/sem    │
├─────────────────────────────────────────┤
│ Solveur Math: 20/20 (global)            │
│ Solveur Physique: 20/20 (MÊME compteur) │
│ Simulation Math: 20/20 (MÊME)           │
│ Simulation Physique: 20/20 (MÊME)       │
└─────────────────────────────────────────┘

User: "Je vais résoudre 1 exo de math"
↓
┌─────────────────────────────────────────┐
│ Compteur GLOBAL: 19 utilisations/sem    │
├─────────────────────────────────────────┤
│ Solveur Math: 19/20 ← diminué           │
│ Solveur Physique: 19/20 ← AUSSI! ❌    │
│ Simulation Physique: aussi affecté ❌   │
└─────────────────────────────────────────┘
```

---

## ✅ LA SOLUTION (Ce qui a été fait)

Chaque **matière** a maintenant son **propre compteur**:

```
APRÈS (corrigé):
┌──────────────────────┬──────────────────────┐
│    MATHÉMATIQUES     │     PHYSIQUE-CHIMIE  │
├──────────────────────┼──────────────────────┤
│ Solveur: 20/20       │ Solveur: 20/20       │
│ Chat: 20/20          │ Chat: 20/20          │
│ Simulations: 5/5     │ Simulations: 5/5     │
└──────────────────────┴──────────────────────┘

User: "Je vais résoudre 1 exo de math"
↓
┌──────────────────────┬──────────────────────┐
│    MATHÉMATIQUES     │     PHYSIQUE-CHIMIE  │
├──────────────────────┼──────────────────────┤
│ Solveur: 19/20 ←     │ Solveur: 20/20 ✅   │
│ Chat: 20/20          │ Chat: 20/20          │
│ Simulations: 5/5     │ Simulations: 5/5     │
└──────────────────────┴──────────────────────┘

User: "Je vais générer 1 simulation physique"
↓
┌──────────────────────┬──────────────────────┐
│    MATHÉMATIQUES     │     PHYSIQUE-CHIMIE  │
├──────────────────────┼──────────────────────┤
│ Solveur: 19/20       │ Solveur: 20/20 ✅   │
│ Chat: 20/20          │ Chat: 20/20          │
│ Simulations: 5/5     │ Simulations: 4/5 ←   │
└──────────────────────┴──────────────────────┘
```

**Résultat:** Chaque matière a ses compteurs **complètement indépendants** ✅

---

## 🔧 COMMENT ÇA MARCHE TECHNIQUEMENT

### Avant: 1 Compteur Global
```
user_quotas table:
┌─────────────┬─────────────┬──────────────┬───────────┬──────────┐
│ user_id     │ week_start  │ solver_used  │ chat_used │ sims_used│
├─────────────┼─────────────┼──────────────┼───────────┼──────────┤
│ alice-123   │ 2026-05-05  │ 5            │ 10        │ 1        │
└─────────────┴─────────────┴──────────────┴───────────┴──────────┘

PK: (user_id, week_start)
↓ Impossible d'avoir 2 rows pour Alice cette semaine!
```

### Après: 1 Compteur par Matière
```
user_quotas table:
┌─────────────┬─────────────┬───────────────┬──────────────┬───────────┬──────────┐
│ user_id     │ week_start  │ matiere       │ solver_used  │ chat_used │ sims_used│
├─────────────┼─────────────┼───────────────┼──────────────┼───────────┼──────────┤
│ alice-123   │ 2026-05-05  │ mathematiques │ 5            │ 10        │ 1        │
│ alice-123   │ 2026-05-05  │ physique      │ 0            │ 0         │ 2        │
│ alice-123   │ 2026-05-05  │ svt           │ 0            │ 0         │ 0        │
└─────────────┴─────────────┴───────────────┴──────────────┴───────────┴──────────┘

PK: (user_id, week_start, matiere)
↓ Alice peut avoir 3 rows pour cette semaine (une par matière) ✅
```

---

## 🚀 FLUX DU FIX

### 1. **Database** (Supabase)
```
Changement: user_quotas.matiere colonne ajoutée + PK modifiée
Résultat: Chaque user peut avoir une row par matière par semaine
```

### 2. **Backend API** (`/api/anthropic`)
```
Avant:
  - Vérifie 1 quota global
  - Décrimente le compteur global
  
Après:
  - Reçoit param `matiere` du client
  - Vérifie: user a accès à cette matière
  - Cherche la row pour (user_id, week, matiere)
  - Décrimente UNIQUEMENT cette matière ✅
```

### 3. **Frontend Context** (AuthContext)
```
Avant:
  - quotas: UserQuotas (1 seule row)
  - checkQuota() affiche global
  
Après:
  - quotas: Record<MatiereType, UserQuotas> (multiple rows)
  - checkQuota(type, matiere) vérifie la matière spécifique ✅
```

### 4. **Pages UI** (Solve, Chat, Simulation)
```
Avant:
  - Envoie pas de matière
  - Utilise quota global
  
Après:
  - Envoie matiere: 'mathematiques' au fetch
  - API route utilise cette info ✅
```

---

## 📊 EXEMPLE COMPLET

### Scénario de Test

**Setup:**
- Alice s'abonne à Math (20 solver/week)
- Alice s'abonne à Physics (5 sims/week)

**Timeline:**

```
Monday 09:00
Alice utilise Solveur Math
→ Body: { type: 'solver', matiere: 'mathematiques', ... }
→ API: vérif access ✓, quota math existe? non → crée
→ BD: INSERT user_quotas (alice, week, math) solver=1
→ Result: Math 1/20, Physics 5/5 ✓

Monday 10:00  
Alice utilise Chat Physique
→ Body: { type: 'chat', matiere: 'physique', ... }
→ API: vérif access ✓, quota physics existe? oui → update
→ BD: UPDATE user_quotas (alice, week, physics) chat=1
→ Result: Math 1/20, Physics chat=1/20 ✓

Monday 14:00
Alice génère Simulation Physique
→ Body: { type: 'simulations', matiere: 'physique', ... }
→ API: vérif access ✓, quota physics update
→ BD: UPDATE user_quotas (alice, week, physics) sims=1
→ Result: Math 1/20, Physics sims=1/5 ✓

Tuesday (next day)
Alice utilise Solveur Math (encore)
→ Math compteur continue: 2/20, Physics inchangé ✓

Friday
- Math: 15/20 (utilisé 5 fois)
- Physics sims: 3/5 (utilisé 2 fois)
- Physics chat: 12/20 (utilisé 8 fois)
→ Complètement indépendant ✅

Monday (next week)
→ Tous les compteurs réinitialisés ✓
```

---

## 🎯 RÉSULTAT FINAL

Pour l'utilisateur:
- ✅ Chaque matière a ses propres quotas
- ✅ Utiliser Math n'affecte pas Physics
- ✅ Renouvellement lundi pour chaque matière
- ✅ Meilleure flexibilité (abonner à 2-3 matières)
- ✅ Plus équitable (ne paie que ce qu'il utilise)

Pour le système:
- ✅ Suivi précis par matière
- ✅ Scaling: peut supporter 5+ matières
- ✅ Analytics: voir usage par sujet
- ✅ Monétization: vendre par matière

---

## 🧪 TEST À FAIRE

**Test 1: Quota Séparé**
```
1. Crée user avec 2 abonnements (math+physics)
2. Utilise 1 solver math
3. Vérifie: math quota baisse, physics inchangé ✅
```

**Test 2: Accès Refusé**
```
1. Crée user avec SEUL abonnement math
2. Essaie utiliser solver physique
3. Vérifie: 403 error "Pas d'accès à physique" ✅
```

**Test 3: Reset Hebdomadaire**
```
1. Quota math: 3/20 utilisé
2. Attendre lundi
3. Quota math: 20/20 (réinitialisé) ✅
4. Quota physics: conservé si pas encore lundi? (dépend timezone)
```

---

## 📞 QUESTIONS?

**Q: Ça va briser mon app?**
A: Non! Code ancien marche toujours (matiere a default value)

**Q: Faut upgrader les users existants?**
A: Non, leurs données ancienness restera intacte

**Q: Performance impact?**
A: Minimal, indexes créés sur matiere

**Q: Rollback possible?**
A: Oui, script SQL dans SUPABASE_MIGRATION_GUIDE.md

