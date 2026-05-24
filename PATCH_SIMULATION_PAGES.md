// ============================================================
// PATCH HELPER: Simulation & Bac-Blanc Pages
// ============================================================
// 
// These are the EXACT changes needed for:
// - src/app/simulation/page.tsx
// - src/app/simulation-france/page.tsx
// - src/app/bac-blanc/page.tsx
// - src/app/bac-blanc-france/page.tsx
//
// STEPS:
// 1. Add import at top of file (if not present)
// 2. Add globalMatiere variable before component definitions
// 3. Update each component to set globalMatiere
// 4. Update each askClaude() call to pass globalMatiere
//
// ============================================================

// ─────────────────────────────────────────────────────────
// STEP 1: Add Import (usually already there)
// ─────────────────────────────────────────────────────────

import { MatiereType } from '@/lib/types/monetisation'

// ─────────────────────────────────────────────────────────
// STEP 2: Add Global Variable (BEFORE component functions)
// ─────────────────────────────────────────────────────────

// Track current subject globally for askClaude calls
let globalMatiere: MatiereType = 'mathematiques'

// ─────────────────────────────────────────────────────────
// STEP 3A: Update PhaseGenerating Component
// ─────────────────────────────────────────────────────────

function PhaseGenerating({ archives, customText, onDone }: {
  archives:Archive[]; customText:string; onDone:(exams:GeneratedExam[])=>void
}) {
  // ADD THIS AT THE TOP OF THE COMPONENT:
  const { isAdmin, isSprint, checkQuota, incrementQuota, quotas, quotaLimits, checkMatiereAccess, matiereActive} = useAuth()
  
  // SET GLOBAL MATIERE:
  globalMatiere = matiereActive

  // Rest of component stays the same...
}

// ─────────────────────────────────────────────────────────
// STEP 3B: Update PhaseExam Component
// ─────────────────────────────────────────────────────────

function PhaseExam({ exam, onDone }: { exam:GeneratedExam; onDone:(work:string,answers:string[]|null)=>void }) {
  // ADD THIS AT THE TOP:
  const { matiereActive } = useAuth()
  
  // SET GLOBAL MATIERE:
  globalMatiere = matiereActive

  // Rest stays same...
}

// ─────────────────────────────────────────────────────────
// STEP 3C: Update PhaseCorrection Component
// ─────────────────────────────────────────────────────────

function PhaseCorrection({ exam, studentWork, onDone }: {
  exam:GeneratedExam; studentWork:string; onDone:(fullCorrection:string)=>void
}) {
  // ADD THIS AT THE TOP:
  const { matiereActive } = useAuth()
  
  // SET GLOBAL MATIERE:
  globalMatiere = matiereActive

  // Rest stays same...
}

// ─────────────────────────────────────────────────────────
// STEP 4: Update ALL askClaude() Calls
// ─────────────────────────────────────────────────────────
//
// Find each line like: await askClaude(prompt, system, maxTokens)
// And change to: await askClaude(prompt, system, maxTokens, globalMatiere)
//
// Examples:

// BEFORE:
// const raw = await askClaude(prompt, system, 5000)

// AFTER:
// const raw = await askClaude(prompt, system, 5000, globalMatiere)

// ─────────────────────────────────────────────────────────

// Grep patterns to find all occurrences:
// - grep "askClaude(" src/app/simulation/page.tsx
// - Should find ~9 matches total per file

// Regex for find-replace (VS Code):
// Find: await askClaude\(([^,]+),\s*([^,]+),\s*(\d+)\)
// Replace: await askClaude($1, $2, $3, globalMatiere)

// OR manually search and replace each:
// Line 478: askClaude(prompt, system, 5000)
// Line 637: askClaude(prompt, system, 8000)
// Line 680: askClaude(prompt, system, 3000)
// Line 737: askClaude(prompt, system, 5000)
// Line 755: askClaude(prompt, system, ...)
// Line 779: askClaude(prompt, system, 800)
// Line 2128: askClaude(prompt, system, 6000)
// Line 3362: askClaude(prompt, sys, 2500)

// ═════════════════════════════════════════════════════════
// VERIFICATION CHECKLIST
// ═════════════════════════════════════════════════════════

/*
After making changes, verify:

□ globalMatiere variable declared at file top
□ All components that use useAuth() set globalMatiere
□ All askClaude() calls pass globalMatiere as 4th param
□ Code compiles (npm run build)
□ Test with 2 subject subscriptions
□ Math quota separate from Physics quota
□ Logs show correct matiere in API calls

If eslint complains about unused globalMatiere:
→ Add // eslint-disable-next-line no-unused-vars
→ Or use // @ts-ignore
*/

// ═════════════════════════════════════════════════════════
// QUICK TEST SCRIPT (run in browser console)
// ═════════════════════════════════════════════════════════

/*
// Check if matiere is being sent correctly:
// Open DevTools Network tab
// Filter: "anthropic"
// Look for requests
// In Request Body, verify:
// {
//   "type": "simulations",
//   "matiere": "mathematiques"  ← should be correct matière
// }

// Or add console log:
console.log('Using matiere:', globalMatiere)
*/

// ═════════════════════════════════════════════════════════
