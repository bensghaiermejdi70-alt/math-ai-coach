import * as ExamData from './exam-data'
import ExamensFrancePage from './ExamensContent'

export const metadata = {
  title: 'Annales Bac France 2021–2026 — Sujets & Corrigés | MathBac.AI',
  description: "Tous les sujets et corrigés officiels du Bac France 2021 à 2026 : Maths, Physique-Chimie, SVT, NSI, Philosophie, LLCER Anglais, SES. Épreuves anticipées de Première.",
}

export default function Page() {
  return <ExamensFrancePage data={{ ...ExamData }} />
}