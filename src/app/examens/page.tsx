import * as ExamData from './exam-data'
import ExamensTunisiePage from './ExamensContent'

export const metadata = {
  title: 'Annales Bac Tunisie — Sujets & Corrigés officiels | MathBac.AI',
  description: "Tous les sujets et corrigés officiels du Bac tunisien (bacweb.tn) : Mathématiques, Sciences Expérimentales, Sciences Techniques, Informatique, SVT, Anglais, Français, Économie & Gestion. Sessions principale et contrôle.",
}

export default function Page() {
  return <ExamensTunisiePage data={{ ...ExamData }} />
}