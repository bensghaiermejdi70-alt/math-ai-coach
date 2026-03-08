export type Country = 'tunisie' | 'maroc' | 'france'
export type Level = 'bac' | 'universite'
export type Difficulty = 'facile' | 'moyen' | 'difficile' | 'bac'

export interface Chapter {
  id: string; num: string; title: string; trimestre?: number; semestre?: number
  tags: string[]; exerciseCount: number; examCount: number
}

export interface Programme { country: Country; level: Level; chapters: Chapter[] }
