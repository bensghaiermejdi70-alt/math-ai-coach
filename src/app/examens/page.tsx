'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

// ════════════════════════════════════════════════════════════════
//  SOURCE OFFICIELLE : bacweb.tn  (Centre National des Technologies)
//  Pattern URL vérifié :
//    http://www.bacweb.tn/bac/{year}/{session}/{dossier}/{fichier}.pdf
//
//  Sessions  : principale | controle
//  Dossiers  :
//    - math         → section Mathématiques
//    - sciences_ex  → section Sciences Expérimentales
//    - technique    → section Sciences Techniques
//    - informatique → section Informatique
//
//  Fichiers vérifiés par recherche directe sur bacweb.tn :
//    math/math.pdf               sujet Maths
//    math/info.pdf               sujet Informatique (section Maths)
//    sciences_ex/math_c.pdf      corrigé Maths Sc.Exp
//    technique/math.pdf          sujet Mathématiques (Sc. Techniques)
//    technique/info_c.pdf        corrigé Informatique Technique
//    informatique/algorithme.pdf sujet Algorithmes
//    informatique/algorithme_nr_c.pdf corrigé Algos
//    informatique/math_c.pdf     corrigé Maths Informatique
//    informatique/physique_c.pdf corrigé Physique Informatique
//
//  Source secondaire : reviserbac.tn
//    → utilisée pour les liens de redirection
//    → liens directs PDF quand disponibles
// ════════════════════════════════════════════════════════════════

const W = 'http://www.bacweb.tn/bac'
const RB = 'https://www.reviserbac.tn/sujets'

// Helper pour construire un lien bacweb.tn
const bw = (year: number, session: 'principale' | 'controle', folder: string, file: string) =>
  `${W}/${year}/${session}/${folder}/${file}`

// Helper pour construire un lien reviserbac.tn filtré
const rb = (section: string, matiere: string, annee: number, sess: string) =>
  `${RB}?section=${encodeURIComponent(section)}&matiere=${encodeURIComponent(matiere)}&annee=${annee}&session=${encodeURIComponent(sess)}`

// ── Types ────────────────────────────────────────────────────
type Session = {
  sujet?: string
  correction?: string
  label: string          // "Session Principale" | "Session de Contrôle"
  session: 'P' | 'C'
}
type AnneeLinks = { principale: Session; controle: Session }
type ExData = { titre: string; theme: string; pts: number }
type AnneeData = { year: number; exercices: ExData[]; note?: string }

// ════════════════════════════════════════════════════════════════
//  LIENS PDF — BAC MATHÉMATIQUES
//  Dossier : math/   Fichier sujet : math.pdf
//  Corrigé  : non disponible sur bacweb (section Maths directe)
// ════════════════════════════════════════════════════════════════
const mathsLinks: Record<number, AnneeLinks> = {
  2025: {
    principale: { label:'Session Principale', session:'P',
      sujet:      bw(2025,'principale','math','math.pdf'),
      correction: 'https://drive.google.com/file/d/11Cn4AL-b1TizkOY0CLr2HHTZwRW2Vhmr/preview' },
    controle:  { label:'Session de Contrôle', session:'C',
      sujet:      bw(2025,'controle','math','math.pdf'),
      correction: 'https://drive.google.com/file/d/1K2Y6Q9cXiDGMyUyHE-ekBKbJsAJ7ekjr/preview' },
  },
  2024: {
    principale: { label:'Session Principale', session:'P',
      sujet:      bw(2024,'principale','math','math.pdf'),
      correction: 'https://drive.google.com/file/d/1waRXFVzL7__XK2VnyYnGbj5NS2bt5SEj/preview' },
    controle:  { label:'Session de Contrôle', session:'C',
      sujet:      bw(2024,'controle','math','math.pdf'),
      correction: 'https://drive.google.com/file/d/1xwb7lEYkRdzeF210o7W4QohRQsDVKbd9/preview' },
  },
  2023: {
    principale: { label:'Session Principale', session:'P',
      sujet:      bw(2023,'principale','math','math.pdf'),
      correction: 'https://drive.google.com/file/d/18Oqt7p3wChXc_Q53fheWnCo5TqkMTsx6/preview' },
    controle:  { label:'Session de Contrôle', session:'C',
      sujet:      bw(2023,'controle','math','math.pdf'),
      correction: 'https://drive.google.com/file/d/18Cs5dtaRLma1g-V26Pj2vyYIx_Sy1PDn/preview' },
  },
  2022: {
    principale: { label:'Session Principale', session:'P',
      sujet:      bw(2022,'principale','math','math.pdf'),
      correction: 'https://drive.google.com/file/d/143l8ShhJJbhj5seuHqIcJm3Talr5SgX1/preview' },
    controle:  { label:'Session de Contrôle', session:'C',
      sujet:      bw(2022,'controle','math','math.pdf'),
      correction: 'https://drive.google.com/file/d/142KfvgsqMSPR2VvUKqZ8Sg7gb7F8wb-V/preview' },
  },
  2021: {
    principale: { label:'Session Principale', session:'P',
      sujet:      bw(2021,'principale','math','math.pdf'),
      correction: 'https://drive.google.com/file/d/1-S7aVzXfA3nCx2ksZuEeAMzfRgFhQ8Bm/preview' },
    controle:  { label:'Session de Contrôle', session:'C',
      sujet:      bw(2021,'controle','math','math.pdf'),
      correction: 'https://drive.google.com/file/d/1-UPBX57HC1zW1ilCQ8LfZKW0khTK_Y3e/preview' },
  },
  2020: {
    principale: { label:'Session Principale', session:'P',
      sujet:      bw(2020,'principale','math','math.pdf'),
      correction: 'https://drive.google.com/file/d/1lR4TMnfjilPbiZOz8o0uAez0tOUyAzym/preview' },
    controle:  { label:'Session de Contrôle', session:'C',
      sujet:      bw(2020,'controle','math','math.pdf'),
      correction: 'https://drive.google.com/file/d/10ud3C8wEh1xi4Hz9d4IsUJZ7Q0PB2pA7/preview' },
  },
  2019: {
    principale: { label:'Session Principale', session:'P',
      sujet:      bw(2019,'principale','math','math.pdf'),
      correction: 'https://drive.google.com/file/d/1j4gMfWAVL88mDwPFh1I4caWNqHc-dsKL/preview' },
    controle:  { label:'Session de Contrôle', session:'C',
      sujet:      bw(2019,'controle','math','math.pdf'),
      correction: 'https://drive.google.com/file/d/1uX23z6jox67O9ONqJedIh5Lm1qSrv3Un/preview' },
  },
  2018: {
    principale: { label:'Session Principale', session:'P',
      sujet:      bw(2018,'principale','math','math.pdf'),
      correction: 'https://drive.google.com/file/d/1l6xXu1ncwK6Ti5c_hyhr1dB4PATmeDse/preview' },
    controle:  { label:'Session de Contrôle', session:'C',
      sujet:      bw(2018,'controle','math','math.pdf'),
      correction: 'https://drive.google.com/file/d/1l8HDzJy6d2ZqEU6wJX8qzrWjzSIc2G6J/preview' },
  },
  2017: {
    principale: { label:'Session Principale', session:'P',
      sujet:      bw(2017,'principale','math','math.pdf'),
      correction: 'https://drive.google.com/file/d/1Dcn74AKd2OsiA1SZB0DD3tYrzSS37PBL/preview' },
    controle:  { label:'Session de Contrôle', session:'C',
      sujet:      bw(2017,'controle','math','math.pdf'),
      correction: 'https://drive.google.com/file/d/18O7Z4ASGEC5_H60y25X-qkazUn2WW-UB/preview' },
  },
  2016: {
    principale: { label:'Session Principale', session:'P',
      sujet:      bw(2016,'principale','math','math.pdf'),
      correction: 'https://drive.google.com/file/d/0B1eOU1dDIRvaV2V6UmttZjBVX2s/preview' },
    controle:  { label:'Session de Contrôle', session:'C',
      sujet:      bw(2016,'controle','math','math.pdf'),
      correction: 'https://drive.google.com/file/d/0B1eOU1dDIRvaNDUzeURFTlZOWWM/preview' },
  },
  2015: {
    principale: { label:'Session Principale', session:'P',
      sujet:      bw(2015,'principale','math','math.pdf'),
      correction: 'https://drive.google.com/file/d/0B1eOU1dDIRvaeVBVeUZtTWJxQWM/preview' },
    controle:  { label:'Session de Contrôle', session:'C',
      sujet:      bw(2015,'controle','math','math.pdf'),
      correction: 'https://drive.google.com/file/d/0B1eOU1dDIRvaR3hGTWF4Z1MyeTg/preview' },
  },
}

// ════════════════════════════════════════════════════════════════
//  LIENS PDF — BAC SCIENCES EXPÉRIMENTALES
//  Dossier : sciences_ex/  sujet: math.pdf  corrigé: math_c.pdf
//  Corrigés confirmés sur bacweb.tn (2016, 2018, 2022 vérifiés)
// ════════════════════════════════════════════════════════════════
const scExpLinks: Record<number, AnneeLinks> = {
  2025: {
    principale: { label:'Session Principale', session:'P',
      sujet:      bw(2025,'principale','sciences_ex','math.pdf'),
      correction: 'https://drive.google.com/file/d/1NT4Uj3h23Qo5ax5x2d1w2ViS1Cu_c3wl/preview' },
    controle:  { label:'Session de Contrôle', session:'C',
      sujet:      bw(2025,'controle','sciences_ex','math.pdf'),
      correction: 'https://drive.google.com/file/d/1V3N0NflK6KSXiAf37Te4jt0JbqAQc-c5/preview' },
  },
  2024: {
    principale: { label:'Session Principale', session:'P',
      sujet:      bw(2024,'principale','sciences_ex','math.pdf'),
      correction: 'https://drive.google.com/file/d/1x2wanxLoyDs3QLD6NFit13HdpSJ8OEn6/preview' },
    controle:  { label:'Session de Contrôle', session:'C',
      sujet:      bw(2024,'controle','sciences_ex','math.pdf'),
      correction: 'https://drive.google.com/file/d/1lhoFnEf-aciM3a9gfkIrpo_F8sdQwgTe/preview' },
  },
  2023: {
    principale: { label:'Session Principale', session:'P',
      sujet:      bw(2023,'principale','sciences_ex','math.pdf'),
      correction: 'https://drive.google.com/file/d/17FRhp_GzK5nfWMnKP11Kxo9-KcgR7o1r/preview' },
    controle:  { label:'Session de Contrôle', session:'C',
      sujet:      bw(2023,'controle','sciences_ex','math.pdf'),
      correction: 'https://drive.google.com/file/d/174i_NshFas7U8-Pf0WWftwrtYdG86ucf/preview' },
  },
  2022: {
    principale: { label:'Session Principale', session:'P',
      sujet:      bw(2022,'principale','sciences_ex','math.pdf'),
      correction: 'https://drive.google.com/file/d/149U4gP8CzJI-BGJokGm1kEyre3B5gjfo/preview' },
    controle:  { label:'Session de Contrôle', session:'C',
      sujet:      bw(2022,'controle','sciences_ex','math.pdf'),
      correction: 'https://drive.google.com/file/d/14IxxmUu2TPcY9vJGgdGLmDa1ALOBMs_o/preview' },
  },
  2021: {
    principale: { label:'Session Principale', session:'P',
      sujet:      bw(2021,'principale','sciences_ex','math.pdf'),
      correction: 'https://drive.google.com/file/d/1-V9zHRzG9tUBxNtVcccdCHJLo0-BBX7n/preview' },
    controle:  { label:'Session de Contrôle', session:'C',
      sujet:      bw(2021,'controle','sciences_ex','math.pdf'),
      correction: 'https://drive.google.com/file/d/1-ZJ-z-PtSZJ6KARhE__moHMKk-4l2JZZ/preview' },
  },
  2020: {
    principale: { label:'Session Principale', session:'P',
      sujet:      bw(2020,'principale','sciences_ex','math.pdf'),
      correction: 'https://drive.google.com/file/d/1lY7E_R2Xp-1C6jD7FGqSWJqwYhePufii/preview' },
    controle:  { label:'Session de Contrôle', session:'C',
      sujet:      bw(2020,'controle','sciences_ex','math.pdf'),
      correction: 'https://drive.google.com/file/d/1lqJq2B6iRZB_tdqP6rsL9VLRWdhRWDdG/preview' },
  },
  2019: {
    principale: { label:'Session Principale', session:'P',
      sujet:      bw(2019,'principale','sciences_ex','math.pdf'),
      correction: 'https://drive.google.com/file/d/1_ZiR5zCAyG7I33feFwZIhf1Mhpm8jOO6/preview' },
    controle:  { label:'Session de Contrôle', session:'C',
      sujet:      bw(2019,'controle','sciences_ex','math.pdf'),
      correction: 'https://drive.google.com/file/d/10fKrCFd4QNCyD5sJv3-KjJ6uFjIUhhci/preview' },
  },
  2018: {
    principale: { label:'Session Principale', session:'P',
      sujet:      bw(2018,'principale','sciences_ex','math.pdf'),
      correction: 'https://drive.google.com/file/d/1oWnt8UnGNPUIkRNsKdFKGIU2jLXAyaJe/preview' },
    controle:  { label:'Session de Contrôle', session:'C',
      sujet:      bw(2018,'controle','sciences_ex','math.pdf'),
      correction: 'https://drive.google.com/file/d/1Rk7RTj14CkMkstecVGxGM77AGTlsi0cy/preview' },
  },
  2017: {
    principale: { label:'Session Principale', session:'P',
      sujet:      bw(2017,'principale','sciences_ex','math.pdf'),
      correction: 'https://drive.google.com/file/d/1OEVmt8d3ZHoqnn_-kT_f5X0mXHW9bXj7/preview' },
    controle:  { label:'Session de Contrôle', session:'C',
      sujet:      bw(2017,'controle','sciences_ex','math.pdf'),
      correction: 'https://drive.google.com/file/d/1Ecz-VstOT42YfxHV0oXEeX7l3-BmcBhL/preview' },
  },
  2016: {
    principale: { label:'Session Principale', session:'P',
      sujet:      bw(2016,'principale','sciences_ex','math.pdf'),
      correction: 'https://drive.google.com/file/d/0B1eOU1dDIRvaSHhOX2xKVW9JZ28/preview' },
    controle:  { label:'Session de Contrôle', session:'C',
      sujet:      bw(2016,'controle','sciences_ex','math.pdf'),
      correction: 'https://drive.google.com/file/d/0B1eOU1dDIRvaZGhnMWRZTGdUaGM/preview' },
  },
  2015: {
    principale: { label:'Session Principale', session:'P',
      sujet:      bw(2015,'principale','sciences_ex','math.pdf'),
      correction: 'https://drive.google.com/file/d/0B1eOU1dDIRvaR1dZb2EwY3B5UFk/preview' },
    controle:  { label:'Session de Contrôle', session:'C',
      sujet:      bw(2015,'controle','sciences_ex','math.pdf'),
      correction: 'https://drive.google.com/file/d/0B1eOU1dDIRvaei1SUHNQaHVwSjQ/preview' },
  },
}

// ════════════════════════════════════════════════════════════════
//  LIENS PDF — BAC SCIENCES TECHNIQUES
//  Dossier : technique/  sujet maths: math.pdf
//  Corrections Drive = corrigés mathématiques officiels
// ════════════════════════════════════════════════════════════════
const scTechLinks: Record<number, AnneeLinks> = {
  2025: {
    principale: { label:'Session Principale', session:'P',
      sujet:      'https://drive.google.com/file/d/1JvWd8PQRsVKjjzS0V-AWsmEfvCAjb0-H/preview',
      correction: 'https://drive.google.com/file/d/1ATKUFzlVycZDZ42b9eEA5eWce70Npkx3/preview' },
    controle:  { label:'Session de Contrôle', session:'C',
      sujet:      'https://drive.google.com/file/d/1mYs9-VMy2lPdTe9r2ejXR1GwsqR9t_Gu/preview',
      correction: 'https://drive.google.com/file/d/1LtKCHn5pAJbmpnpCSpRpbKA6Mtilt4rR/preview' },
  },
  2024: {
    principale: { label:'Session Principale', session:'P',
      sujet:      bw(2024,'principale','technique','math.pdf'),
      correction: 'https://drive.google.com/file/d/1x39Yt0lXZOIEM7VqBn3AGcWDICAZu7yO/preview' },
    controle:  { label:'Session de Contrôle', session:'C',
      sujet:      bw(2024,'controle','technique','math.pdf'),
      correction: 'https://drive.google.com/file/d/1xtrP_8KODcgIwC3pt9oqnVSjT5A-QeAd/preview' },
  },
  2023: {
    principale: { label:'Session Principale', session:'P',
      sujet:      bw(2023,'principale','technique','math.pdf'),
      correction: 'https://drive.google.com/file/d/1ls0ybdDhHGkUn8moY6PX0MLyCECc1Ifg/preview' },
    controle:  { label:'Session de Contrôle', session:'C',
      sujet:      bw(2023,'controle','technique','math.pdf'),
      correction: 'https://drive.google.com/file/d/1lAkKycjj6pPmovk4MVst-KElxcaI6bbg/preview' },
  },
  2022: {
    principale: { label:'Session Principale', session:'P',
      sujet:      bw(2022,'principale','technique','math.pdf'),
      correction: 'https://drive.google.com/file/d/14Ob9GAhxqux19-5paNPapm8AqIXg4fw_/preview' },
    controle:  { label:'Session de Contrôle', session:'C',
      sujet:      bw(2022,'controle','technique','math.pdf'),
      correction: 'https://drive.google.com/file/d/14OxY89FCV6m3SFWD-W_rDnNg4gw0K9TV/preview' },
  },
  2021: {
    principale: { label:'Session Principale', session:'P',
      sujet:      bw(2021,'principale','technique','math.pdf'),
      correction: 'https://drive.google.com/file/d/1-n7CurpE4H2Jpdiy5LSgcIo4Jx-r80NX/preview' },
    controle:  { label:'Session de Contrôle', session:'C',
      sujet:      bw(2021,'controle','technique','math.pdf'),
      correction: undefined },
  },
  2020: {
    principale: { label:'Session Principale', session:'P',
      sujet:      bw(2020,'principale','technique','math.pdf'),
      correction: 'https://drive.google.com/file/d/1lR7UlQtIkkWzfSYlr8VuCwCgkhGh8ywO/preview' },
    controle:  { label:'Session de Contrôle', session:'C',
      sujet:      bw(2020,'controle','technique','math.pdf'),
      correction: 'https://drive.google.com/file/d/1lubj3JzErLG1cOiVZL2E2YWv1gcXARyi/preview' },
  },
  2019: {
    principale: { label:'Session Principale', session:'P',
      sujet:      bw(2019,'principale','technique','math.pdf'),
      correction: 'https://drive.google.com/file/d/1uPCL8AYTGo4zGQF3FC73iBms6CY-f4dI/preview' },
    controle:  { label:'Session de Contrôle', session:'C',
      sujet:      bw(2019,'controle','technique','math.pdf'),
      correction: 'https://drive.google.com/file/d/1Vo3TaBYPFKwBz5d9qPyD8BwO0KYYDJAW/preview' },
  },
  2018: {
    principale: { label:'Session Principale', session:'P',
      sujet:      bw(2018,'principale','technique','math.pdf'),
      correction: 'https://drive.google.com/file/d/1MFkebgV4g521EPzsZ1RqD6_baXXPEYE1/preview' },
    controle:  { label:'Session de Contrôle', session:'C',
      sujet:      bw(2018,'controle','technique','math.pdf'),
      correction: 'https://drive.google.com/file/d/1tww8wsCK_9M5xbGbhHCt-KIXGntcYVoP/preview' },
  },
  2017: {
    principale: { label:'Session Principale', session:'P',
      sujet:      bw(2017,'principale','technique','math.pdf'),
      correction: 'https://drive.google.com/file/d/1JnHOxz4nKFb18xIPRrIUGkEspaMQBGA6/preview' },
    controle:  { label:'Session de Contrôle', session:'C',
      sujet:      bw(2017,'controle','technique','math.pdf'),
      correction: 'https://drive.google.com/file/d/1DSAh75tAaZW6D9-KIvdqvDyTz3p4xkjo/preview' },
  },
  2016: {
    principale: { label:'Session Principale', session:'P',
      sujet:      bw(2016,'principale','technique','math.pdf'),
      correction: 'https://drive.google.com/file/d/0B1eOU1dDIRvaSnNpcjdtR3hIV1U/preview' },
    controle:  { label:'Session de Contrôle', session:'C',
      sujet:      bw(2016,'controle','technique','math.pdf'),
      correction: 'https://drive.google.com/file/d/0B1eOU1dDIRvadjdNV0VRV08zR0k/preview' },
  },
  2015: {
    principale: { label:'Session Principale', session:'P',
      sujet:      bw(2015,'principale','technique','math.pdf'),
      correction: 'https://drive.google.com/file/d/0B1eOU1dDIRvaMVZzTHpGWWIzOWc/preview' },
    controle:  { label:'Session de Contrôle', session:'C',
      sujet:      bw(2015,'controle','technique','math.pdf'),
      correction: 'https://drive.google.com/file/d/0B1eOU1dDIRvaNEV1YlZoS1czUU0/preview' },
  },
}

// ════════════════════════════════════════════════════════════════
//  LIENS PDF — BAC ÉCONOMIE & GESTION
//  Dossier : eco_gestion/  sujet maths: math.pdf
//  Corrigés : Google Drive (mathsplustn.com)
// ════════════════════════════════════════════════════════════════
const ecoGestionLinks: Record<number, AnneeLinks> = {
  2025: {
    principale: { label:'Session Principale', session:'P',
      sujet:      'https://drive.google.com/file/d/16ZHD8M0B1rk63R71aDyxWJW9XnCRevYl/preview',
      correction: 'https://drive.google.com/file/d/1D5MZfhzCq7s6ttq_zzueljs476ZVfYyP/preview' },
    controle:  { label:'Session de Contrôle', session:'C',
      sujet:      'https://drive.google.com/file/d/1MMzeFFZy7QpnTKCjiZKTUp9U3BUrVXq_/preview',
      correction: 'https://drive.google.com/file/d/1kpNEml5gDzKgg00AbHjpiaD_Yv8PPBB2/preview' },
  },
  2024: {
    principale: { label:'Session Principale', session:'P',
      sujet:      bw(2024,'principale','economie_gestion','math.pdf'),
      correction: 'https://drive.google.com/file/d/1O_8HaHV3_MdN653Vw1rQI2LPcqGZ1MJf/preview' },
    controle:  { label:'Session de Contrôle', session:'C',
      sujet:      bw(2024,'controle','economie_gestion','math.pdf'),
      correction: 'https://drive.google.com/file/d/1rVC7lwkSUDDUZx7DGL8QLFoOEb0NSn0R/preview' },
  },
  2023: {
    principale: { label:'Session Principale', session:'P',
      sujet:      bw(2023,'principale','economie_gestion','math.pdf'),
      correction: 'https://drive.google.com/file/d/1_TN9wO8uxtaYU7ERMlBGQppu-Gj4ad1N/preview' },
    controle:  { label:'Session de Contrôle', session:'C',
      sujet:      bw(2023,'controle','economie_gestion','math.pdf'),
      correction: 'https://drive.google.com/file/d/1_TN9wO8uxtaYU7ERMlBGQppu-Gj4ad1N/preview' },
  },
  2022: {
    principale: { label:'Session Principale', session:'P',
      sujet:      bw(2022,'principale','economie_gestion','math.pdf'),
      correction: 'https://drive.google.com/file/d/14LgNe6BLuPQgsNY4EytOY-xYGlbHm3bu/preview' },
    controle:  { label:'Session de Contrôle', session:'C',
      sujet:      bw(2022,'controle','economie_gestion','math.pdf'),
      correction: 'https://drive.google.com/file/d/14LzFoF1WXy5uxhgxR-yqCbYWvk9iCoxh/preview' },
  },
  2021: {
    principale: { label:'Session Principale', session:'P',
      sujet:      bw(2021,'principale','economie_gestion','math.pdf'),
      correction: 'https://drive.google.com/file/d/1-h7Wk8PV0PmZBlWJ85kGawc0dvzXurUL/preview' },
    controle:  { label:'Session de Contrôle', session:'C',
      sujet:      bw(2021,'controle','economie_gestion','math.pdf'),
      correction: 'https://drive.google.com/file/d/1-f3wXh9Qyugh-LNPdUAKuXNSKqZ3C8UC/preview' },
  },
  2020: {
    principale: { label:'Session Principale', session:'P',
      sujet:      bw(2020,'principale','economie_gestion','math.pdf'),
      correction: 'https://drive.google.com/file/d/10pftwnV4Ev6D3Gy_FcjKoShhwQgyzkv9/preview' },
    controle:  { label:'Session de Contrôle', session:'C',
      sujet:      bw(2020,'controle','economie_gestion','math.pdf'),
      correction: 'https://drive.google.com/file/d/1_DUCaodJYraNsvvaIZBDlbNikhQuu_ah/preview' },
  },
  2019: {
    principale: { label:'Session Principale', session:'P',
      sujet:      bw(2019,'principale','economie_gestion','math.pdf'),
      correction: 'https://drive.google.com/file/d/1FW4CoraGSTIp1v5TnPuZtptM_g4B8_qF/preview' },
    controle:  { label:'Session de Contrôle', session:'C',
      sujet:      bw(2019,'controle','economie_gestion','math.pdf'),
      correction: 'https://drive.google.com/file/d/1LPHD2-xB4mfdlGYHFSUkFpHMWq-tbJkw/preview' },
  },
  2018: {
    principale: { label:'Session Principale', session:'P',
      sujet:      bw(2018,'principale','economie_gestion','math.pdf'),
      correction: 'https://drive.google.com/file/d/1fq8b5LadTeHypDTetD0QxGx6fc9kI_WD/preview' },
    controle:  { label:'Session de Contrôle', session:'C',
      sujet:      bw(2018,'controle','economie_gestion','math.pdf'),
      correction: 'https://drive.google.com/file/d/1aXCHypeqBDalpfGNNSDNveGuH9_WoSCP/preview' },
  },
  2017: {
    principale: { label:'Session Principale', session:'P',
      sujet:      bw(2017,'principale','economie_gestion','math.pdf'),
      correction: 'https://drive.google.com/file/d/1Oh7BuhJ1tAj6N5oW7ZppggPzBeOQ3iEB/preview' },
    controle:  { label:'Session de Contrôle', session:'C',
      sujet:      bw(2017,'controle','economie_gestion','math.pdf'),
      correction: 'https://drive.google.com/file/d/1i53Ok5_VsJ55-t0nt1hlEmT6zWsp_I-e/preview' },
  },
  2016: {
    principale: { label:'Session Principale', session:'P',
      sujet:      bw(2016,'principale','economie_gestion','math.pdf'),
      correction: 'https://drive.google.com/file/d/0B1eOU1dDIRvaUlhfaUhlMTE4MG8/preview' },
    controle:  { label:'Session de Contrôle', session:'C',
      sujet:      bw(2016,'controle','economie_gestion','math.pdf'),
      correction: 'https://drive.google.com/file/d/0B1eOU1dDIRvadXZZOWo1LVZIaFE/preview' },
  },
  2015: {
    principale: { label:'Session Principale', session:'P',
      sujet:      bw(2015,'principale','economie_gestion','math.pdf'),
      correction: 'https://drive.google.com/file/d/0B1eOU1dDIRvaZVphX3p0ajJXT0E/preview' },
    controle:  { label:'Session de Contrôle', session:'C',
      sujet:      bw(2015,'controle','economie_gestion','math.pdf'),
      correction: 'https://drive.google.com/file/d/0B1eOU1dDIRvacEN0bTE2dDU1S0E/preview' },
  },
}

// ════════════════════════════════════════════════════════════════
//  LIENS PDF — BAC INFORMATIQUE
//  Dossier : informatique/
//  Sujets confirmés :
//    algorithme.pdf  (2010, 2016 vérifiés)
//    algorithme_nr_c.pdf  corrigé algos (2022 vérifié)
//    math_c.pdf  corrigé maths info (2019, 2021 vérifiés)
//    physique_c.pdf  corrigé physique info (2021 vérifié)
// ════════════════════════════════════════════════════════════════
type InfoLinks = {
  principale: { math_sujet?: string; math_corr?: string; algo_sujet?: string; algo_corr?: string; bd_sujet?: string; bd_corr?: string }
  controle:   { math_sujet?: string; math_corr?: string; algo_sujet?: string; algo_corr?: string; bd_sujet?: string; bd_corr?: string }
}
const infoLinks: Record<number, InfoLinks> = {
  2025: {
    principale: {
      math_sujet: 'https://drive.google.com/file/d/1Ewz9mKnu8NLbVy1iYRP-QAOKIaBZlyhO/preview',
      math_corr:  'https://drive.google.com/file/d/1IBjYbhboqWucTM1YlpY_yTRifWpoGdm2/preview',
      algo_sujet: bw(2025,'principale','informatique','algorithme.pdf'),
      algo_corr:  bw(2025,'principale','informatique','algorithme_nr_c.pdf'),
      bd_sujet:   bw(2025,'principale','informatique','bd.pdf'),
      bd_corr:    bw(2025,'principale','informatique','bd_c.pdf'),
    },
    controle: {
      math_sujet: 'https://drive.google.com/file/d/1Y8uH_NiEurb1ALUX5ZGuIlyeriWVFFf2/preview',
      math_corr:  'https://drive.google.com/file/d/1tVODKqGPcFCi1ufp1IfUpd-Z_olnO3or/preview',
      algo_sujet: bw(2025,'controle','informatique','algorithme.pdf'),
      algo_corr:  bw(2025,'controle','informatique','algorithme_nr_c.pdf'),
      bd_sujet:   bw(2025,'controle','informatique','bd.pdf'),
    },
  },
  2024: {
    principale: {
      math_sujet: bw(2024,'principale','informatique','math.pdf'),
      algo_sujet: bw(2024,'principale','informatique','algorithme.pdf'),
      algo_corr:  bw(2024,'principale','informatique','algorithme_nr_c.pdf'),
      bd_sujet:   bw(2024,'principale','informatique','bd.pdf'),
      bd_corr:    bw(2024,'principale','informatique','bd_c.pdf'),
      math_corr:  'https://drive.google.com/file/d/19fNfBUNMOL1j0IVWQvexJEos8XmT1IBI/preview',
    },
    controle: {
      math_sujet: bw(2024,'controle','informatique','math.pdf'),
      algo_sujet: bw(2024,'controle','informatique','algorithme.pdf'),
      algo_corr:  bw(2024,'controle','informatique','algorithme_nr_c.pdf'),
      bd_sujet:   bw(2024,'controle','informatique','bd.pdf'),
      math_corr:  'https://drive.google.com/file/d/1saDJWbI-okTQddwvSnz1L8aqqDixqrcX/preview',
    },
  },
  2023: {
    principale: {
      math_sujet: bw(2023,'principale','informatique','math.pdf'),
      algo_sujet: bw(2023,'principale','informatique','algorithme.pdf'),
      algo_corr:  bw(2023,'principale','informatique','algorithme_nr_c.pdf'),
      bd_sujet:   bw(2023,'principale','informatique','bd.pdf'),
      bd_corr:    bw(2023,'principale','informatique','bd_c.pdf'),
      math_corr:  'https://drive.google.com/file/d/19XiR5gq-lLYq_-h4rFuLF1ZgRPmdblTO/preview',
    },
    controle: {
      math_sujet: bw(2023,'controle','informatique','math.pdf'),
      algo_sujet: bw(2023,'controle','informatique','algorithme.pdf'),
      algo_corr:  bw(2023,'controle','informatique','algorithme_nr_c.pdf'),
      bd_sujet:   bw(2023,'controle','informatique','bd.pdf'),
      math_corr:  'https://drive.google.com/file/d/11DsIHkxUmezQLfTNs3OEg_oSJ0gLum2h/preview',
    },
  },
  2022: {
    principale: {
      math_sujet: bw(2022,'principale','informatique','math.pdf'),
      algo_sujet: bw(2022,'principale','informatique','algorithme.pdf'),
      algo_corr:  bw(2022,'principale','informatique','algorithme_nr_c.pdf'),
      bd_sujet:   bw(2022,'principale','informatique','bd.pdf'),
      bd_corr:    bw(2022,'principale','informatique','bd_c.pdf'),
      math_corr:  'https://drive.google.com/file/d/1p5X6W8Rn4aICClqqWOOgq8KHQ_mdOFCq/preview',
    },
    controle: {
      math_sujet: bw(2022,'controle','informatique','math.pdf'),
      algo_sujet: bw(2022,'controle','informatique','algorithme.pdf'),
      algo_corr:  bw(2022,'controle','informatique','algorithme_nr_c.pdf'),
      bd_sujet:   bw(2022,'controle','informatique','math_c.pdf'),
      math_corr:  'https://drive.google.com/file/d/142j9Q7_aM4QnT1WfrtI4mfw-YYeJhBp3/preview',
    },
  },
  2021: {
    principale: {
      math_sujet: bw(2021,'principale','informatique','math.pdf'),
      algo_sujet: bw(2021,'principale','informatique','algorithme.pdf'),
      algo_corr:  bw(2021,'principale','informatique','algorithme_nr_c.pdf'),
      bd_sujet:   bw(2021,'principale','informatique','bd.pdf'),
      bd_corr:    bw(2021,'principale','informatique','bd_c.pdf'),
      math_corr:  'https://drive.google.com/file/d/10AOLJdUOvVRZqrbkr9VdM-L5OHagFn-A/preview',
    },
    controle: {
      math_sujet: bw(2021,'controle','informatique','math.pdf'),
      algo_sujet: bw(2021,'controle','informatique','algorithme.pdf'),
      algo_corr:  bw(2021,'controle','informatique','algorithme_nr_c.pdf'),
      bd_sujet:   bw(2021,'controle','informatique','bd.pdf'),
      math_corr:  'https://drive.google.com/file/d/106k8Qskna7Q_8XccLt-jLjo_5x0ZtRzF/preview',
    },
  },
  2020: {
    principale: {
      math_sujet: bw(2020,'principale','informatique','math.pdf'),
      algo_sujet: bw(2020,'principale','informatique','algorithme.pdf'),
      algo_corr:  bw(2020,'principale','informatique','algorithme_nr_c.pdf'),
      bd_sujet:   bw(2020,'principale','informatique','bd.pdf'),
      bd_corr:    bw(2020,'principale','informatique','bd_c.pdf'),
      math_corr:  'https://drive.google.com/file/d/11KQMWgr48YWt--gtllRI9lnpazWhJtCj/preview',
    },
    controle: {
      math_sujet: bw(2020,'controle','informatique','math.pdf'),
      algo_sujet: bw(2020,'controle','informatique','algorithme.pdf'),
      bd_sujet:   bw(2020,'controle','informatique','bd.pdf'),
      math_corr:  'https://drive.google.com/file/d/11O367Pf3zm1TJXRcvafUYynNTs5QKhBs/preview',
    },
  },
  2019: {
    principale: {
      math_sujet: bw(2019,'principale','informatique','math.pdf'),
      algo_sujet: bw(2019,'principale','informatique','algorithme.pdf'),
      algo_corr:  bw(2019,'principale','informatique','algorithme_nr_c.pdf'),
      bd_sujet:   bw(2019,'principale','informatique','bd.pdf'),
      math_corr:  'https://drive.google.com/file/d/1Oo1OyffA6NCzR8O1t3w6WB3QC98B2Tcx/preview',
    },
    controle: {
      math_sujet: bw(2019,'controle','informatique','math.pdf'),
      algo_sujet: bw(2019,'controle','informatique','algorithme.pdf'),
      bd_sujet:   bw(2019,'controle','informatique','bd.pdf'),
      math_corr:  'https://drive.google.com/file/d/1-5baL-udA49bG3XEnH89x9scVyOoX519/preview',
    },
  },
  2018: {
    principale: {
      math_sujet: bw(2018,'principale','informatique','math.pdf'),
      algo_sujet: bw(2018,'principale','informatique','algorithme.pdf'),
      algo_corr:  bw(2018,'principale','informatique','algorithme_nr_c.pdf'),
      bd_sujet:   bw(2018,'principale','informatique','bd.pdf'),
      math_corr:  'https://drive.google.com/file/d/1XmiDInrNkssOpc_MtMWLwCNf9yIfX5cU/preview',
    },
    controle: {
      math_sujet: bw(2018,'controle','informatique','math.pdf'),
      algo_sujet: bw(2018,'controle','informatique','algorithme.pdf'),
      bd_sujet:   bw(2018,'controle','informatique','bd.pdf'),
      math_corr:  'https://drive.google.com/file/d/1fRuvW4dvbQj_Nddoy4ogIrFbvPmjXKfP/preview',
    },
  },
  2017: {
    principale: {
      math_sujet: bw(2017,'principale','informatique','math.pdf'),
      algo_sujet: bw(2017,'principale','informatique','algorithme.pdf'),
      algo_corr:  bw(2017,'principale','informatique','algorithme_nr_c.pdf'),
      bd_sujet:   bw(2017,'principale','informatique','bd.pdf'),
      math_corr:  'https://drive.google.com/file/d/1NivH_LThBS2Ji2FWAQ2Or_EvAnTUOOXI/preview',
    },
    controle: {
      math_sujet: bw(2017,'controle','informatique','math.pdf'),
      algo_sujet: bw(2017,'controle','informatique','algorithme.pdf'),
      bd_sujet:   bw(2017,'controle','informatique','bd.pdf'),
      math_corr:  'https://drive.google.com/file/d/13Y151Ip-AZGssnWu2b-yFONNzGk1D8qB/preview',
    },
  },
  2016: {
    principale: {
      math_sujet: bw(2016,'principale','informatique','math.pdf'),
      algo_sujet: bw(2016,'principale','informatique','algorithme.pdf'),
      algo_corr:  bw(2016,'principale','informatique','algorithme_nr_c.pdf'),
      bd_sujet:   bw(2016,'principale','informatique','bd.pdf'),
      math_corr:  'https://drive.google.com/file/d/0B1eOU1dDIRvaQV9qRjI1U3Fwdmc/preview',
    },
    controle: {
      math_sujet: bw(2016,'controle','informatique','math.pdf'),
      algo_sujet: bw(2016,'controle','informatique','algorithme.pdf'),
      bd_sujet:   bw(2016,'controle','informatique','bd.pdf'),
      math_corr:  'https://drive.google.com/file/d/0B1eOU1dDIRvaYkZ3dFhnSk1ycTg/preview',
    },
  },
  2015: {
    principale: {
      math_sujet: bw(2015,'principale','informatique','math.pdf'),
      algo_sujet: bw(2015,'principale','informatique','algorithme.pdf'),
      algo_corr:  bw(2015,'principale','informatique','algorithme_nr_c.pdf'),
      bd_sujet:   bw(2015,'principale','informatique','bd.pdf'),
      math_corr:  'https://drive.google.com/file/d/0B1eOU1dDIRvaWVFvdjlqVFRqZ1k/preview',
    },
    controle: {
      math_sujet: bw(2015,'controle','informatique','math.pdf'),
      algo_sujet: bw(2015,'controle','informatique','algorithme.pdf'),
      bd_sujet:   bw(2015,'controle','informatique','bd.pdf'),
      math_corr:  'https://drive.google.com/file/d/0B1eOU1dDIRvaZ0I1S0R4alJDczQ/preview',
    },
  },
}

// ════════════════════════════════════════════════════════════════
//  DONNÉES EXERCICES — thèmes par année (résumé pédagogique)
// ════════════════════════════════════════════════════════════════
const BAC_MATHS_DATA: AnneeData[] = [
  { year:2025, note:'🆕', exercices:[
    {titre:'Exercice 1',theme:'Analyse — étude de fonction, dérivée, limites',pts:5},
    {titre:'Exercice 2',theme:'Nombres complexes — module, argument, transformations',pts:6},
    {titre:'Exercice 3',theme:'Probabilités — variable aléatoire, espérance',pts:3},
    {titre:'Exercice 4',theme:'Géométrie espace — isométries, plans, droites',pts:6},
  ]},
  { year:2024, note:'🔥', exercices:[
    {titre:'Exercice 1',theme:'Suites numériques — suite récurrente, monotonie, limite',pts:5},
    {titre:'Exercice 2',theme:'Nombres complexes — affixe, transformations géométriques',pts:6},
    {titre:'Exercice 3',theme:'Probabilités — loi discrète, espérance mathématique',pts:3},
    {titre:'Exercice 4',theme:'Géométrie espace — similitudes, sphère, plans',pts:6},
  ]},
  { year:2023, exercices:[
    {titre:'Exercice 1',theme:'Analyse — étude de fonction, ln et exponentielle',pts:5},
    {titre:'Exercice 2',theme:'Complexes — forme trigonométrique, De Moivre',pts:6},
    {titre:'Exercice 3',theme:'Probabilités — variable aléatoire discrète',pts:3},
    {titre:'Exercice 4',theme:'Isométries — déplacements, rotations dans le plan',pts:6},
  ]},
  { year:2022, exercices:[
    {titre:'Exercice 1',theme:'Suites — récurrente u_{n+1}=f(u_n), convergence',pts:5},
    {titre:'Exercice 2',theme:'Complexes — résolution dans ℂ, similitudes directes',pts:6},
    {titre:'Exercice 3',theme:'Probabilités — loi continue, espérance',pts:3},
    {titre:'Exercice 4',theme:'Géométrie espace — vecteurs, distance point-plan',pts:6},
  ]},
  { year:2021, exercices:[
    {titre:'Exercice 1',theme:'Primitives et intégrales — intégration par parties',pts:5},
    {titre:'Exercice 2',theme:'Complexes — racines nièmes de l\'unité, polygone',pts:6},
    {titre:'Exercice 3',theme:'Probabilités — loi normale, intervalle de confiance',pts:3},
    {titre:'Exercice 4',theme:'Similitudes — conservation angles, point fixe unique',pts:6},
  ]},
  { year:2020, exercices:[
    {titre:'Exercice 1',theme:'Équations différentielles — y\' + ay = b',pts:5},
    {titre:'Exercice 2',theme:'Complexes — module, argument, forme exponentielle',pts:6},
    {titre:'Exercice 3',theme:'Probabilités — loi binomiale B(n,p)',pts:3},
    {titre:'Exercice 4',theme:'Géométrie espace — droites, plans, perpendicularité',pts:6},
  ]},
  { year:2019, exercices:[
    {titre:'Exercice 1',theme:'Fonctions réciproques — arctan, arcsin, arccos',pts:5},
    {titre:'Exercice 2',theme:'Complexes — équation du 2nd degré dans ℂ',pts:6},
    {titre:'Exercice 3',theme:'Probabilités — loi de Poisson, approximation',pts:3},
    {titre:'Exercice 4',theme:'Antidéplacements — symétries glissées, compositions',pts:6},
  ]},
  { year:2018, exercices:[
    {titre:'Exercice 1',theme:'Logarithme népérien — inégalités, limites, asymptotes',pts:5},
    {titre:'Exercice 2',theme:'Complexes — racines carrées, triangle inscrit dans cercle',pts:6},
    {titre:'Exercice 3',theme:'Probabilités — espérance, variance, écart-type',pts:3},
    {titre:'Exercice 4',theme:'Géométrie espace — repère orthonormé, sphère, tétraèdre',pts:6},
  ]},
  { year:2017, exercices:[
    {titre:'Exercice 1',theme:'Suites — théorème des gendarmes, récurrence forte',pts:5},
    {titre:'Exercice 2',theme:'Complexes — angle géométrique, homothétie',pts:6},
    {titre:'Exercice 3',theme:'Probabilités — tirages successifs, arbre de probabilités',pts:3},
    {titre:'Exercice 4',theme:'Déplacements — isométries directes, composition',pts:6},
  ]},
  { year:2016, exercices:[
    {titre:'Exercice 1',theme:'Intégrales — changement de variable, valeur moyenne',pts:5},
    {titre:'Exercice 2',theme:'Complexes — De Moivre, forme trigonométrique',pts:6},
    {titre:'Exercice 3',theme:'Probabilités — conditionnelle, formule de Bayes',pts:3},
    {titre:'Exercice 4',theme:'Géométrie espace — produit scalaire, angles dièdres',pts:6},
  ]},
  { year:2015, exercices:[
    {titre:'Exercice 1',theme:'Dérivabilité — TAF, convexité, asymptotes obliques',pts:5},
    {titre:'Exercice 2',theme:'Complexes — racines nièmes, polygone régulier à n côtés',pts:6},
    {titre:'Exercice 3',theme:'Probabilités — loi binomiale, approximation de Poisson',pts:3},
    {titre:'Exercice 4',theme:'Similitudes directes — rapport, angle, point fixe unique',pts:6},
  ]},
]

const BAC_SC_EXP_DATA: AnneeData[] = [
  { year:2025, note:'🆕', exercices:[
    {titre:'Exercice 1',theme:'Analyse — étude de fonction, limites, dérivée',pts:5},
    {titre:'Exercice 2',theme:'Nombres complexes — forme algébrique, géométrie',pts:5},
    {titre:'Exercice 3',theme:'Probabilités — loi binomiale, espérance',pts:4},
    {titre:'Exercice 4',theme:'Géométrie dans l\'espace — repère, droites, plans',pts:6},
  ]},
  { year:2024, note:'🔥', exercices:[
    {titre:'Exercice 1',theme:'Suites numériques — récurrence, limite',pts:4},
    {titre:'Exercice 2',theme:'Étude de fonction — ln, ex, primitives, aire',pts:5},
    {titre:'Exercice 3',theme:'Nombres complexes — module, argument, image',pts:4},
    {titre:'Exercice 4',theme:'Probabilités — loi binomiale B(n,p)',pts:4},
    {titre:'Exercice 5',theme:'Géométrie espace — produit scalaire, plan, distance',pts:3},
  ]},
  { year:2023, exercices:[
    {titre:'Exercice 1',theme:'Continuité et limites — formes indéterminées, TVI',pts:4},
    {titre:'Exercice 2',theme:'Intégrales — intégration par parties, calcul d\'aire',pts:5},
    {titre:'Exercice 3',theme:'Complexes — racines carrées dans ℂ, géométrie',pts:4},
    {titre:'Exercice 4',theme:'Probabilités — variable aléatoire discrète, espérance',pts:4},
    {titre:'Exercice 5',theme:'Géométrie analytique — droite, distance, angles',pts:3},
  ]},
  { year:2022, exercices:[
    {titre:'Exercice 1',theme:'Suites — suite par récurrence, monotonie',pts:4},
    {titre:'Exercice 2',theme:'Fonctions — dérivée, tableau de variation complet',pts:5},
    {titre:'Exercice 3',theme:'Complexes — forme exponentielle, formule d\'Euler',pts:4},
    {titre:'Exercice 4',theme:'Probabilités totales — formule de Bayes, arbre',pts:4},
    {titre:'Exercice 5',theme:'Géométrie espace — droite, plan, distance',pts:3},
  ]},
  { year:2021, exercices:[
    {titre:'Exercice 1',theme:'Primitives et équations différentielles',pts:4},
    {titre:'Exercice 2',theme:'Étude de fonction — courbe, asymptotes, concavité',pts:5},
    {titre:'Exercice 3',theme:'Complexes — résolution, ensemble de points du plan',pts:4},
    {titre:'Exercice 4',theme:'Probabilités — loi normale N(μ,σ²)',pts:4},
    {titre:'Exercice 5',theme:'Produit vectoriel — volumes, angles entre plans',pts:3},
  ]},
  { year:2020, exercices:[
    {titre:'Exercice 1',theme:'Limites et continuité — TVI, prolongement par continuité',pts:4},
    {titre:'Exercice 2',theme:'Logarithme — étude complète, inégalités, asymptotes',pts:5},
    {titre:'Exercice 3',theme:'Complexes — racines nièmes de l\'unité, géométrie',pts:4},
    {titre:'Exercice 4',theme:'Probabilités — répétitions indépendantes de Bernoulli',pts:4},
    {titre:'Exercice 5',theme:'Géométrie espace — sphère, intersection avec plan',pts:3},
  ]},
  { year:2019, exercices:[
    {titre:'Exercice 1',theme:'Suites — monotonie, bornée, convergence, limite',pts:4},
    {titre:'Exercice 2',theme:'Dérivabilité — extrema locaux et globaux, convexité',pts:5},
    {titre:'Exercice 3',theme:'Complexes — forme algébrique et trigonométrique',pts:4},
    {titre:'Exercice 4',theme:'Probabilités — loi de Poisson',pts:4},
    {titre:'Exercice 5',theme:'Vecteurs espace — coplanéité, barycentre',pts:3},
  ]},
  { year:2018, exercices:[
    {titre:'Exercice 1',theme:'Fonctions réciproques — arctan, arcsin, étude',pts:4},
    {titre:'Exercice 2',theme:'Intégrales — calcul, inégalité d\'intégrale, aire',pts:5},
    {titre:'Exercice 3',theme:'Complexes — argument, module, résolution équation',pts:4},
    {titre:'Exercice 4',theme:'Probabilités — espérance, variance, écart-type',pts:4},
    {titre:'Exercice 5',theme:'Géométrie espace — plan perpendiculaire, projeté',pts:3},
  ]},
  { year:2017, exercices:[
    {titre:'Exercice 1',theme:'Suites — théorème des gendarmes, limite',pts:4},
    {titre:'Exercice 2',theme:'Exponentielle — croissance comparée, courbe, primitive',pts:5},
    {titre:'Exercice 3',theme:'Complexes — affixe, translations, rotations dans ℂ',pts:4},
    {titre:'Exercice 4',theme:'Probabilités — loi binomiale, approximation normale',pts:4},
    {titre:'Exercice 5',theme:'Géométrie analytique — cercle, tangente, angle',pts:3},
  ]},
  { year:2016, exercices:[
    {titre:'Exercice 1',theme:'Continuité — TVI, résolution f(x)=k, unicité',pts:4},
    {titre:'Exercice 2',theme:'Fonctions — étude complète, tableau de signe',pts:5},
    {titre:'Exercice 3',theme:'Complexes — racines cubiques de l\'unité, ω',pts:4},
    {titre:'Exercice 4',theme:'Probabilités — tirages avec et sans remise',pts:4},
    {titre:'Exercice 5',theme:'Géométrie espace — orthogonalité des plans',pts:3},
  ]},
  { year:2015, exercices:[
    {titre:'Exercice 1',theme:'Équations différentielles — y\' = ay + b, solution particulière',pts:4},
    {titre:'Exercice 2',theme:'Logarithme et exponentielle — inégalités classiques',pts:5},
    {titre:'Exercice 3',theme:'Complexes — De Moivre, angle inscrit dans cercle',pts:4},
    {titre:'Exercice 4',theme:'Probabilités — arbre de probabilités, Bayes',pts:4},
    {titre:'Exercice 5',theme:'Géométrie espace — coordonnées, repère orthonormé',pts:3},
  ]},
]

const BAC_SC_TECH_DATA: AnneeData[] = [
  { year:2025, note:'🆕', exercices:[
    {titre:'Exercice 1',theme:'Analyse — dérivée, variations, représentation graphique',pts:5},
    {titre:'Exercice 2',theme:'Suites numériques — arithmétique, géométrique',pts:5},
    {titre:'Exercice 3',theme:'Probabilités — dénombrement, loi de probabilité',pts:4},
    {titre:'Exercice 4',theme:'Arithmétique — PGCD, équations diophantiennes',pts:6},
  ]},
  { year:2024, note:'🔥', exercices:[
    {titre:'Exercice 1',theme:'Suites arithmético-géométriques, limite',pts:4},
    {titre:'Exercice 2',theme:'Étude de fonction — dérivée, extrema, tableau',pts:5},
    {titre:'Exercice 3',theme:'Arithmétique — PGCD, identité de Bézout, congruences ★',pts:4},
    {titre:'Exercice 4',theme:'Probabilités — loi binomiale, espérance',pts:4},
    {titre:'Exercice 5',theme:'Géométrie espace — vecteurs, plans, distance',pts:3},
  ]},
  { year:2023, exercices:[
    {titre:'Exercice 1',theme:'Continuité et limites — asymptotes, branches infinies',pts:4},
    {titre:'Exercice 2',theme:'Primitives et intégrales — calcul exact d\'aire',pts:5},
    {titre:'Exercice 3',theme:'Arithmétique — nombres premiers, théorème de Gauss ★',pts:4},
    {titre:'Exercice 4',theme:'Probabilités — espérance, variance',pts:4},
    {titre:'Exercice 5',theme:'Complexes — module, argument, résolution équation',pts:3},
  ]},
  { year:2022, exercices:[
    {titre:'Exercice 1',theme:'Suites — récurrence, convergence vers point fixe',pts:4},
    {titre:'Exercice 2',theme:'Dérivabilité — TAF, inégalités, démonstrations',pts:5},
    {titre:'Exercice 3',theme:'Arithmétique — algorithme d\'Euclide étendu, intro RSA ★',pts:4},
    {titre:'Exercice 4',theme:'Probabilités — probabilités conditionnelles, Bayes',pts:4},
    {titre:'Exercice 5',theme:'Géométrie espace — distance point-droite, projection',pts:3},
  ]},
  { year:2021, exercices:[
    {titre:'Exercice 1',theme:'Logarithme et exponentielle — étude, concavité',pts:4},
    {titre:'Exercice 2',theme:'Intégrales — intégration par parties, formule',pts:5},
    {titre:'Exercice 3',theme:'Arithmétique — congruences, équations diophantiennes ★',pts:4},
    {titre:'Exercice 4',theme:'Probabilités — loi de Bernoulli, répétitions',pts:4},
    {titre:'Exercice 5',theme:'Géométrie espace — sphère, plan tangent',pts:3},
  ]},
  { year:2020, exercices:[
    {titre:'Exercice 1',theme:'Suites — suites adjacentes, encadrement, limite',pts:4},
    {titre:'Exercice 2',theme:'Fonctions réciproques — arctan, arccos, étude',pts:5},
    {titre:'Exercice 3',theme:'Arithmétique — PGCD, Bézout, inverse modulo n ★',pts:4},
    {titre:'Exercice 4',theme:'Probabilités — loi de Poisson, approximation',pts:4},
    {titre:'Exercice 5',theme:'Complexes — racines nièmes, polygone régulier',pts:3},
  ]},
  { year:2019, exercices:[
    {titre:'Exercice 1',theme:'Continuité — prolongement par continuité, TVI strict',pts:4},
    {titre:'Exercice 2',theme:'Étude de fonction — courbe paramétrée, tangente',pts:5},
    {titre:'Exercice 3',theme:'Arithmétique — divisibilité, décomposition en facteurs ★',pts:4},
    {titre:'Exercice 4',theme:'Probabilités — tirages successifs, dénombrement',pts:4},
    {titre:'Exercice 5',theme:'Géométrie espace — tétraèdre régulier, volume',pts:3},
  ]},
  { year:2018, exercices:[
    {titre:'Exercice 1',theme:'Suites — u_{n+1}=f(u_n), point fixe attractif',pts:4},
    {titre:'Exercice 2',theme:'Dérivabilité — extrema globaux, optimisation',pts:5},
    {titre:'Exercice 3',theme:'Arithmétique — PGCD, PPCM, identité de Bézout ★',pts:4},
    {titre:'Exercice 4',theme:'Probabilités — arbre, probabilité conditionnelle',pts:4},
    {titre:'Exercice 5',theme:'Géométrie espace — produit vectoriel, volume',pts:3},
  ]},
  { year:2017, exercices:[
    {titre:'Exercice 1',theme:'Limites — formes indéterminées, règle de L\'Hôpital',pts:4},
    {titre:'Exercice 2',theme:'Primitives — changement de variable, primitives usuelles',pts:5},
    {titre:'Exercice 3',theme:'Arithmétique — congruences, petit théorème de Fermat ★',pts:4},
    {titre:'Exercice 4',theme:'Probabilités — espérance, loi binomiale, variance',pts:4},
    {titre:'Exercice 5',theme:'Complexes — forme exponentielle, argument',pts:3},
  ]},
  { year:2016, exercices:[
    {titre:'Exercice 1',theme:'Équations différentielles — y\'+ay=b, solution générale',pts:4},
    {titre:'Exercice 2',theme:'Logarithme — inégalités, étude de fonction, courbe',pts:5},
    {titre:'Exercice 3',theme:'Arithmétique — PGCD par algorithme d\'Euclide ★',pts:4},
    {titre:'Exercice 4',theme:'Probabilités — loi normale N(μ,σ²), utilisation table',pts:4},
    {titre:'Exercice 5',theme:'Géométrie espace — coplanéité, distance',pts:3},
  ]},
  { year:2015, exercices:[
    {titre:'Exercice 1',theme:'Suites — récurrence, bornée, monotone, convergence',pts:4},
    {titre:'Exercice 2',theme:'Exponentielle — croissance comparée, étude, courbe',pts:5},
    {titre:'Exercice 3',theme:'Arithmétique — décomposition facteurs premiers, PGCD ★',pts:4},
    {titre:'Exercice 4',theme:'Probabilités — tirages sans remise, dénombrement',pts:4},
    {titre:'Exercice 5',theme:'Géométrie espace — orthogonalité de plans, distance',pts:3},
  ]},
]

const BAC_INFO_DATA: AnneeData[] = [
  { year:2025, note:'🆕', exercices:[
    {titre:'Exercice 1',theme:'Analyse — étude de fonction, logarithme, exponentielle',pts:5},
    {titre:'Exercice 2',theme:'Arithmétique — congruences, divisibilité',pts:5},
    {titre:'Exercice 3',theme:'Probabilités — dénombrement, variable aléatoire',pts:4},
    {titre:'Exercice 4',theme:'Nombres complexes — transformations, affixes',pts:6},
  ]},
  { year:2024, note:'🔥', exercices:[
    {titre:'⚙️ Algorithmique',theme:'Tri rapide (Quick Sort), récursivité, complexité O(n log n)',pts:7},
    {titre:'🗄️ Bases de données',theme:'SQL avancé — jointures multiples, GROUP BY, sous-requêtes',pts:6},
    {titre:'📐 Mathématiques',theme:'Nombres complexes, probabilités, statistiques',pts:4},
    {titre:'🌐 STI (Web/Réseau)',theme:'HTML5/CSS3, JavaScript DOM, validation formulaire',pts:3},
  ]},
  { year:2023, exercices:[
    {titre:'⚙️ Algorithmique',theme:'Tri fusion (Merge Sort), arbres binaires de recherche ABR',pts:7},
    {titre:'🗄️ Bases de données',theme:'Modélisation E/A, normalisation 3FN, SQL DDL/DML',pts:6},
    {titre:'📐 Mathématiques',theme:'Arithmétique — PGCD, identité de Bézout, congruences',pts:4},
    {titre:'🌐 STI (Web/Réseau)',theme:'PHP côté serveur, sessions et cookies, traitement POST/GET',pts:3},
  ]},
  { year:2022, exercices:[
    {titre:'⚙️ Algorithmique',theme:'Listes chaînées — insertion en tête/queue, suppression nœud',pts:7},
    {titre:'🗄️ Bases de données',theme:'SQL SELECT imbriqué, sous-requêtes corrélées',pts:6},
    {titre:'📐 Mathématiques',theme:'Suites, dérivabilité, applications numériques',pts:4},
    {titre:'🌐 STI (Web/Réseau)',theme:'CSS3 flexbox, JavaScript et manipulation des événements DOM',pts:3},
  ]},
  { year:2021, exercices:[
    {titre:'⚙️ Algorithmique',theme:'Récursivité — Tours de Hanoï, analyse de la pile d\'appels',pts:7},
    {titre:'🗄️ Bases de données',theme:'Normalisation 1FN/2FN/3FN, modèle relationnel, clés',pts:6},
    {titre:'📐 Mathématiques',theme:'Complexes — affixe, vecteurs, géométrie de l\'espace',pts:4},
    {titre:'🌐 STI (Web/Réseau)',theme:'HTML5 sémantique + formulaires PHP, validation serveur',pts:3},
  ]},
  { year:2020, exercices:[
    {titre:'⚙️ Algorithmique',theme:'Tri par insertion, fichiers séquentiels Pascal et Python',pts:7},
    {titre:'🗄️ Bases de données',theme:'Modèle relationnel — clés primaires/étrangères, contraintes',pts:6},
    {titre:'📐 Mathématiques',theme:'Logarithme, primitives, probabilités conditionnelles',pts:4},
    {titre:'🌐 STI (Web/Réseau)',theme:'JavaScript — manipulation DOM, ajout/modification nœuds',pts:3},
  ]},
  { year:2019, exercices:[
    {titre:'⚙️ Algorithmique',theme:'Recherche dichotomique, tri bulles, comparaison complexités',pts:7},
    {titre:'🗄️ Bases de données',theme:'SQL DDL — CREATE TABLE, ALTER TABLE, contraintes intégrité',pts:6},
    {titre:'📐 Mathématiques',theme:'Exponentielle — croissance comparée, intégrales, calcul',pts:4},
    {titre:'🌐 STI (Web/Réseau)',theme:'PHP + MySQL PDO, requêtes préparées, anti-injection SQL',pts:3},
  ]},
  { year:2018, exercices:[
    {titre:'⚙️ Algorithmique',theme:'Enregistrements, fichiers séquentiels, accès direct Pascal',pts:7},
    {titre:'🗄️ Bases de données',theme:'INNER JOIN, LEFT JOIN, fonctions agrégat COUNT/AVG/SUM',pts:6},
    {titre:'📐 Mathématiques',theme:'Suites récurrentes — convergence, limite, démonstration',pts:4},
    {titre:'🌐 STI (Web/Réseau)',theme:'HTML/CSS — box model, sélecteurs CSS3, mise en page',pts:3},
  ]},
  { year:2017, exercices:[
    {titre:'⚙️ Algorithmique',theme:'Algorithmes arithmétiques — PGCD itératif, décomposition',pts:7},
    {titre:'🗄️ Bases de données',theme:'COUNT, SUM, AVG, HAVING, GROUP BY — requêtes complexes',pts:6},
    {titre:'📐 Mathématiques',theme:'Dérivées — étude complète de fonction, tableau de variation',pts:4},
    {titre:'🌐 STI (Web/Réseau)',theme:'JavaScript — validation formulaire côté client, regex',pts:3},
  ]},
  { year:2016, exercices:[
    {titre:'⚙️ Algorithmique',theme:'Tri sélection — analyse, trace d\'exécution, complexité O(n²)',pts:7},
    {titre:'🗄️ Bases de données',theme:'Modélisation — contraintes, tables de jonction N-M',pts:6},
    {titre:'📐 Mathématiques',theme:'Complexes, forme exponentielle, arithmétique de base',pts:4},
    {titre:'🌐 STI (Web/Réseau)',theme:'PHP — sessions, cookies, authentification utilisateur',pts:3},
  ]},
  { year:2015, exercices:[
    {titre:'⚙️ Algorithmique',theme:'Récursivité — factorielle, Fibonacci, PGCD, Tours de Hanoï',pts:7},
    {titre:'🗄️ Bases de données',theme:'SQL LMD complet — INSERT, UPDATE, DELETE, SELECT',pts:6},
    {titre:'📐 Mathématiques',theme:'Probabilités — arbre, conditionnelle, statistiques descriptives',pts:4},
    {titre:'🌐 STI (Web/Réseau)',theme:'HTML — structure sémantique, formulaires, liens hypertext',pts:3},
  ]},
]

const BAC_ECO_GESTION_DATA: AnneeData[] = [
  { year:2025, note:'🆕', exercices:[
    {titre:'Exercice 1',theme:'Analyse — étude de fonction, ln, dérivée',pts:5},
    {titre:'Exercice 2',theme:'Probabilités — loi discrète, espérance mathématique',pts:4},
    {titre:'Exercice 3',theme:'Matrices & Systèmes — résolution, applications',pts:5},
    {titre:'Exercice 4',theme:'Mathématiques Financières — intérêts, annuités',pts:6},
  ]},
  { year:2024, note:'🔥', exercices:[
    {titre:'Exercice 1',theme:'Probabilités — loi binomiale, espérance, variance',pts:4},
    {titre:'Exercice 2',theme:'Analyse — étude de fonction, dérivées, extrema',pts:5},
    {titre:'Exercice 3',theme:'Suites numériques — récurrence, convergence',pts:4},
    {titre:'Exercice 4',theme:'Mathématiques Financières — annuités, emprunt indivis',pts:4},
    {titre:'Exercice 5',theme:'Matrices — système linéaire, résolution par inverse',pts:3},
  ]},
  { year:2023, exercices:[
    {titre:'Exercice 1',theme:'Probabilités — probabilités conditionnelles, arbre',pts:4},
    {titre:'Exercice 2',theme:'Étude de fonction — ln, variation, asymptotes',pts:5},
    {titre:'Exercice 3',theme:'Statistiques — régression linéaire, corrélation',pts:4},
    {titre:'Exercice 4',theme:'Mathématiques Financières — intérêts composés, valeur actuelle',pts:4},
    {titre:'Exercice 5',theme:'Arithmétique — PGCD, Bézout, congruences',pts:3},
  ]},
  { year:2022, exercices:[
    {titre:'Exercice 1',theme:'Probabilités — loi discrète, espérance, Bayes',pts:4},
    {titre:'Exercice 2',theme:'Dérivabilité — extrema, convexité, tableau de variation',pts:5},
    {titre:'Exercice 3',theme:'Suites — suite géométrique, capital acquis',pts:4},
    {titre:'Exercice 4',theme:'Mathématiques Financières — amortissement, mensualités',pts:4},
    {titre:'Exercice 5',theme:'Matrices — opérations, déterminant, inverse',pts:3},
  ]},
  { year:2021, exercices:[
    {titre:'Exercice 1',theme:'Probabilités totales — partition, Bayes',pts:4},
    {titre:'Exercice 2',theme:'Fonctions — exponentielle, limites, primitives',pts:5},
    {titre:'Exercice 3',theme:'Statistiques — série à deux variables, ajustement',pts:4},
    {titre:'Exercice 4',theme:'Mathématiques Financières — annuités de fin de période',pts:4},
    {titre:'Exercice 5',theme:'Logique & Raisonnement — récurrence, implication',pts:3},
  ]},
  { year:2020, exercices:[
    {titre:'Exercice 1',theme:'Probabilités — variable aléatoire, binomiale',pts:4},
    {titre:'Exercice 2',theme:'Étude de fonction — logarithme, dérivées composées',pts:5},
    {titre:'Exercice 3',theme:'Suites — récurrente, convergence vers point fixe',pts:4},
    {titre:'Exercice 4',theme:'Mathématiques Financières — intérêts simples et composés',pts:4},
    {titre:'Exercice 5',theme:'Arithmétique — Euclide, Bézout, congruences modulo n',pts:3},
  ]},
  { year:2019, exercices:[
    {titre:'Exercice 1',theme:'Probabilités — tirages, conditionnelle, espérance',pts:4},
    {titre:'Exercice 2',theme:'Dérivabilité — étude complète, asymptote oblique',pts:5},
    {titre:'Exercice 3',theme:'Statistiques — covariance, corrélation, droite régression',pts:4},
    {titre:'Exercice 4',theme:'Mathématiques Financières — remboursement emprunt',pts:4},
    {titre:'Exercice 5',theme:'Matrices — résolution système 3×3 par Gauss-Jordan',pts:3},
  ]},
  { year:2018, exercices:[
    {titre:'Exercice 1',theme:'Probabilités — loi discrète, arbre pondéré',pts:4},
    {titre:'Exercice 2',theme:"Analyse — primitives, intégrales, calcul d'aire",pts:5},
    {titre:'Exercice 3',theme:'Suites — arithmétique, géométrique, applications',pts:4},
    {titre:'Exercice 4',theme:'Mathématiques Financières — valeur actuelle, annuités',pts:4},
    {titre:'Exercice 5',theme:'Logique — tables de vérité, raisonnement contraposé',pts:3},
  ]},
  { year:2017, exercices:[
    {titre:'Exercice 1',theme:"Probabilités — Bayes, indépendance d'événements",pts:4},
    {titre:'Exercice 2',theme:'Étude de fonction — ln et exponentielle combinées',pts:5},
    {titre:'Exercice 3',theme:'Statistiques — ajustement, prévision, résidus',pts:4},
    {titre:'Exercice 4',theme:'Mathématiques Financières — tableau amortissement',pts:4},
    {titre:'Exercice 5',theme:'Matrices — déterminant, inverse, application système',pts:3},
  ]},
  { year:2016, exercices:[
    {titre:'Exercice 1',theme:'Probabilités — loi binomiale, P(X≥k), espérance',pts:4},
    {titre:'Exercice 2',theme:'Dérivabilité — fonctions réciproques, arctan, dérivées',pts:5},
    {titre:'Exercice 3',theme:'Suites — termes consécutifs, limite, application financière',pts:4},
    {titre:'Exercice 4',theme:'Mathématiques Financières — intérêts composés continus',pts:4},
    {titre:'Exercice 5',theme:'Arithmétique — PGCD, PPCM, congruences, divisibilité',pts:3},
  ]},
  { year:2015, exercices:[
    {titre:'Exercice 1',theme:'Probabilités — conditionnelle, formule totale',pts:4},
    {titre:'Exercice 2',theme:'Analyse — limites, continuité, TVI, asymptotes',pts:5},
    {titre:'Exercice 3',theme:'Statistiques — deux séries, corrélation, régression',pts:4},
    {titre:'Exercice 4',theme:'Mathématiques Financières — annuités début de période',pts:4},
    {titre:'Exercice 5',theme:'Logique & Raisonnement — récurrence, contradiction',pts:3},
  ]},
]

// ════════════════════════════════════════════════════════════════
//  CONFIG SECTIONS
// ════════════════════════════════════════════════════════════════
type SKey = 'maths' | 'sc-exp' | 'sc-tech' | 'info' | 'eco'
const SECTIONS = [
  { key:'maths' as SKey,    icon:'🧮', label:'Bac Maths',          color:'#4f6ef7', coeff:'Coeff. 4', data:BAC_MATHS_DATA,    links:mathsLinks,   desc:'Analyse · Algèbre · Isométries · Similitudes · Probabilités' },
  { key:'sc-exp' as SKey,   icon:'🔬', label:'Sciences Exp.',       color:'#06d6a0', coeff:'Coeff. 3', data:BAC_SC_EXP_DATA,   links:scExpLinks,   desc:'Analyse · Complexes · Probabilités · Géométrie espace' },
  { key:'sc-tech' as SKey,  icon:'⚙️', label:'Sciences Tech.',      color:'#f59e0b', coeff:'Coeff. 3', data:BAC_SC_TECH_DATA,  links:scTechLinks,  desc:'Sujet et Correction Mathématiques · Analyse · Arithmétique · Probabilités' },
  { key:'eco' as SKey,      icon:'💹', label:'Éco-Gestion',          color:'#10b981', coeff:'Coeff. 2', data:BAC_ECO_GESTION_DATA, links:ecoGestionLinks, desc:'Analyse · Probabilités · Matrices · Mathématiques Financières ★' },
  { key:'info' as SKey,     icon:'💻', label:'Informatique',         color:'#6366f1', coeff:'Coeff. 3', data:BAC_INFO_DATA,     links:infoLinks,    desc:'Mathématiques uniquement · Sujet + Correction officielle' },
]

// ════════════════════════════════════════════════════════════════
//  MODALE PDF — Google Docs Viewer (contourne les restrictions CORS/iframe)
// ════════════════════════════════════════════════════════════════
function PdfModal({ url, title, onClose }: { url:string; title:string; onClose:()=>void }) {
  useEffect(() => {
    const fn = (e:KeyboardEvent) => { if(e.key==='Escape') onClose() }
    document.addEventListener('keydown', fn)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', fn); document.body.style.overflow = '' }
  },[onClose])

  // Types d'URL supportés
  const isPdf     = url.endsWith('.pdf')
  const isGDrive  = url.includes('drive.google.com')
  const isViewable = isPdf || isGDrive

  // Pour les PDF bacweb, on passe par Google Docs Viewer
  const iframeSrc = isPdf
    ? `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`
    : url   // Google Drive /preview déjà prêt pour iframe

  // Lien de téléchargement : pour GDrive, convertir /preview → /view
  const downloadHref = isGDrive
    ? url.replace('/preview', '/view')
    : url

  const sourceLabel = isGDrive
    ? '📂 Correction · mathsplustn.com (Google Drive)'
    : '📋 Sujet · bacweb.tn (CNTE officiel)'

  return (
    <div onClick={onClose} style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.9)',zIndex:9999,display:'flex',flexDirection:'column'}}>
      {/* Barre */}
      <div onClick={e=>e.stopPropagation()} style={{display:'flex',alignItems:'center',gap:12,padding:'10px 18px',background:'#0d0d1a',borderBottom:'1px solid rgba(255,255,255,0.08)',flexShrink:0,flexWrap:'wrap'}}>
        <span style={{fontSize:18}}>{isGDrive ? '✅' : '📄'}</span>
        <div style={{flex:1,minWidth:0}}>
          <p style={{margin:'0 0 1px',fontWeight:700,fontSize:13,color:'white',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{title}</p>
          <p style={{margin:0,fontSize:10,color:'rgba(255,255,255,0.35)'}}>{sourceLabel}</p>
        </div>
        <div style={{display:'flex',gap:8,flexShrink:0}}>
          <a href={downloadHref} download={isPdf} target="_blank" rel="noreferrer"
            style={{padding:'6px 14px',background:'rgba(255,255,255,0.1)',color:'white',borderRadius:8,textDecoration:'none',fontSize:12,fontWeight:600,display:'flex',alignItems:'center',gap:5}}>
            ⬇ Télécharger
          </a>
          <a href={downloadHref} target="_blank" rel="noreferrer"
            style={{padding:'6px 14px',background:'rgba(79,110,247,0.3)',color:'white',borderRadius:8,textDecoration:'none',fontSize:12,fontWeight:600,display:'flex',alignItems:'center',gap:5}}>
            ↗ Ouvrir
          </a>
          <button onClick={onClose} style={{padding:'6px 14px',borderRadius:8,border:'1px solid rgba(255,255,255,0.2)',background:'transparent',color:'white',cursor:'pointer',fontSize:14,fontWeight:700}}>✕</button>
        </div>
      </div>
      {/* Viewer */}
      <div onClick={e=>e.stopPropagation()} style={{flex:1,background:'#1a1a2e',position:'relative'}}>
        {isViewable ? (
          <iframe src={iframeSrc} style={{width:'100%',height:'100%',border:'none'}} title={title} allow="autoplay" />
        ) : (
          <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'100%',gap:20,padding:40}}>
            <span style={{fontSize:56}}>📄</span>
            <h3 style={{color:'white',textAlign:'center',maxWidth:460}}>Document non prévisualisable</h3>
            <a href={url} target="_blank" rel="noreferrer"
              style={{display:'inline-flex',alignItems:'center',gap:10,padding:'14px 32px',background:'#4f6ef7',color:'white',borderRadius:14,textDecoration:'none',fontWeight:700,fontSize:16}}>
              Ouvrir le document →
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Mini bouton lien ─────────────────────────────────────────
function BtnLink({ label, url, color, onOpen }: { label:string; url?:string; color:string; onOpen:(u:string,t:string)=>void; }) {
  if (!url) return null
  return (
    <button onClick={() => onOpen(url, label)}
      style={{display:'inline-flex',alignItems:'center',gap:5,padding:'7px 14px',borderRadius:9,border:`1.5px solid ${color}50`,background:`${color}12`,color,cursor:'pointer',fontSize:12,fontWeight:700,transition:'all 0.15s',fontFamily:'var(--font-body)'}}
      onMouseEnter={e=>{e.currentTarget.style.background=`${color}26`;e.currentTarget.style.transform='translateY(-1px)'}}
      onMouseLeave={e=>{e.currentTarget.style.background=`${color}12`;e.currentTarget.style.transform='none'}}>
      {label}
    </button>
  )
}

// ════════════════════════════════════════════════════════════════
//  COMPOSANT SESSIONS — 2 sessions côte à côte
// ════════════════════════════════════════════════════════════════
function SessionsBlock({ year, secKey, color, links, infoL, onOpen }: {
  year: number; secKey: SKey; color: string;
  links?: AnneeLinks; infoL?: InfoLinks;
  onOpen: (url: string, title: string) => void
}) {
  const sessions = secKey === 'info'
    ? [
        { label:'📌 Session Principale', key:'principale' as const, border:'rgba(79,110,247,0.4)', bg:'rgba(79,110,247,0.06)' },
        { label:'🔄 Session de Contrôle', key:'controle' as const, border:'rgba(245,158,11,0.4)', bg:'rgba(245,158,11,0.06)' },
      ]
    : [
        { label:'📌 Session Principale', key:'principale' as const, border:'rgba(79,110,247,0.4)', bg:'rgba(79,110,247,0.06)' },
        { label:'🔄 Session de Contrôle', key:'controle' as const, border:'rgba(245,158,11,0.4)', bg:'rgba(245,158,11,0.06)' },
      ]

  return (
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:14,marginBottom:20}}>
      {sessions.map(s => {
        if (secKey === 'info') {
          const il = infoL?.[s.key]
          return (
            <div key={s.key} style={{background:s.bg,border:`1px solid ${s.border}`,borderRadius:14,padding:18}}>
              <p style={{margin:'0 0 12px',fontWeight:700,fontSize:13,color:'var(--text)'}}>{s.label} {year}</p>
              <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
                <BtnLink label="📐 Sujet Maths" url={il?.math_sujet} color={color} onOpen={(u)=>onOpen(u,`Sujet Mathématiques — Bac Informatique ${year} — ${s.label}`)} />
                <BtnLink label="✅ Correction Maths" url={il?.math_corr} color="#06d6a0" onOpen={(u)=>onOpen(u,`Correction Mathématiques — Bac Informatique ${year} — ${s.label}`)} />
              </div>
              {!il?.math_sujet && !il?.math_corr && (
                <p style={{margin:0,fontSize:12,color:'var(--muted)'}}>Session non disponible cette année</p>
              )}
            </div>
          )
        } else {
          const sess = links?.[s.key]
          return (
            <div key={s.key} style={{background:s.bg,border:`1px solid ${s.border}`,borderRadius:14,padding:18}}>
              <p style={{margin:'0 0 12px',fontWeight:700,fontSize:13,color:'var(--text)'}}>{s.label} {year}</p>
              <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
                <BtnLink
                  label={secKey === 'sc-tech' || secKey === 'eco' ? '📐 Sujet Maths' : '📄 Sujet'}
                  url={sess?.sujet} color={color}
                  onOpen={(u)=>onOpen(u,`Sujet Mathématiques — ${secKey === 'sc-tech' ? 'Bac Sciences Techniques' : secKey === 'eco' ? 'Bac Économie & Gestion' : ''} ${year} — ${s.label}`)}
                />
                <BtnLink
                  label={secKey === 'sc-tech' || secKey === 'eco' ? '✅ Correction Maths' : '✅ Correction'}
                  url={sess?.correction} color="#06d6a0"
                  onOpen={(u)=>onOpen(u,`Correction Mathématiques — ${secKey === 'sc-tech' ? 'Bac Sciences Techniques' : secKey === 'eco' ? 'Bac Économie & Gestion' : ''} ${year} — ${s.label}`)}
                />
              </div>
              {!sess?.sujet && !sess?.correction && (
                <p style={{margin:0,fontSize:12,color:'var(--muted)'}}>Session non disponible cette année</p>
              )}
            </div>
          )
        }
      })}
    </div>
  )
}

// ════════════════════════════════════════════════════════════════
//  PAGE PRINCIPALE
// ════════════════════════════════════════════════════════════════
export default function ExamensPage() {
  const router = useRouter()
  const [activeSec, setActiveSec] = useState<SKey>('maths')
  const [selectedYear, setSelectedYear] = useState<number|null>(null)
  const [modal, setModal] = useState<{url:string;title:string}|null>(null)

  const sec = SECTIONS.find(s=>s.key===activeSec)!
  const detail = sec.data.find(a=>a.year===selectedYear)
  const isInfo = activeSec==='info'
  const ptTotal = detail?.exercices.reduce((s,e)=>s+e.pts,0)??0

  // Redirige vers la vraie page Simulation IA
  const lancerSimulation = () => router.push(`/simulation?section=${activeSec}`)

  const openPdf = (url:string, title:string) => setModal({url,title})

  return (
    <>
      <Navbar/>
      {modal && <PdfModal url={modal.url} title={modal.title} onClose={()=>setModal(null)}/>}

      <main style={{position:'relative',zIndex:1,paddingTop:80}}>
        <div className="container" style={{paddingTop:40,paddingBottom:80}}>

          {/* HEADER */}
          <div style={{marginBottom:40}}>
            <span className="label">📋 Examens Officiels Bac Tunisie</span>
            <h1 style={{fontSize:'clamp(26px,4vw,46px)',marginBottom:14}}>
              11 Ans d'Examens Officiels<br />
              <span style={{color:'var(--accent)'}}>2 Sessions · Sujets + Corrections</span>
            </h1>
            <p style={{maxWidth:560,color:'var(--text2)',lineHeight:1.7,marginBottom:10}}>
              Chaque année comprend la <strong>session principale</strong> et la <strong>session de contrôle</strong>.<br/>
              Accès direct aux PDF officiels — lecture en ligne et téléchargement.
            </p>
            <div style={{display:'inline-flex',gap:10,alignItems:'center',padding:'8px 16px',background:'rgba(79,110,247,0.08)',border:'1px solid rgba(79,110,247,0.2)',borderRadius:10}}>
              <span style={{fontSize:14}}>🏛️</span>
              <span style={{fontSize:12,color:'var(--text2)'}}>Source officielle : <strong style={{color:'var(--accent)'}}>bacweb.tn</strong> (CNTE — Centre National des Technologies en Éducation)</span>
            </div>
          </div>

          {/* ONGLETS SECTIONS */}
          <div style={{display:'flex',gap:6,flexWrap:'wrap',marginBottom:32,background:'var(--surface)',border:'1px solid var(--border)',borderRadius:14,padding:6,width:'fit-content'}}>
            {SECTIONS.map(s=>(
              <button key={s.key} onClick={()=>{setActiveSec(s.key);setSelectedYear(null)}}
                style={{display:'flex',alignItems:'center',gap:6,padding:'9px 16px',borderRadius:10,border:'none',cursor:'pointer',fontFamily:'var(--font-body)',fontSize:13,fontWeight:600,transition:'all 0.2s',background:activeSec===s.key?s.color:'transparent',color:activeSec===s.key?'white':'var(--muted)',boxShadow:activeSec===s.key?`0 4px 16px ${s.color}45`:'none'}}>
                <span>{s.icon}</span>
                <span>{s.label}</span>
                <span style={{fontSize:10,background:activeSec===s.key?'rgba(255,255,255,0.22)':'var(--surface2)',padding:'1px 7px',borderRadius:8}}>{s.coeff}</span>
              </button>
            ))}
          </div>

          {/* BANNIÈRE SECTION */}
          <div style={{background:`linear-gradient(135deg,${sec.color}12,${sec.color}04)`,border:`1px solid ${sec.color}28`,borderRadius:16,padding:'18px 24px',marginBottom:24,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:12}}>
            <div style={{display:'flex',gap:14,alignItems:'center'}}>
              <span style={{fontSize:30}}>{sec.icon}</span>
              <div>
                <div style={{display:'flex',gap:8,alignItems:'center',flexWrap:'wrap',marginBottom:4}}>
                  <h2 style={{fontSize:18,margin:0}}>{sec.label}</h2>
                  <span style={{background:`${sec.color}22`,color:sec.color,fontSize:11,padding:'2px 10px',borderRadius:10,fontWeight:600}}>{sec.coeff}</span>
                </div>
                <p style={{fontSize:12,color:'var(--text2)',margin:0}}>{sec.desc}</p>
              </div>
            </div>
            <div style={{fontSize:12,color:'var(--muted)',textAlign:'right'}}>
              <div>📅 2015 → 2025 · 11 années</div>
              <div style={{marginTop:4}}>📌 Session principale + 🔄 Session contrôle</div>
            </div>
          </div>

          {/* SIMULATION IA — Lien vers /simulation */}
          <div style={{background:'linear-gradient(135deg,rgba(99,102,241,0.1),rgba(139,92,246,0.08))',border:'1px solid rgba(99,102,241,0.25)',borderRadius:14,padding:'16px 22px',marginBottom:28,display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:12}}>
            <div>
              <p style={{margin:0,fontWeight:700,fontSize:15}}>🎯 Simuler un Bac Complet — {sec.label}</p>
              <p style={{margin:'3px 0 0',fontSize:12,color:'var(--muted)'}}>🧠 IA · 10 examens originaux · correction détaillée · analyse des faiblesses · remédiation personnalisée</p>
            </div>
            <button
              onClick={lancerSimulation}
              className="btn btn-primary"
              style={{background:'linear-gradient(135deg,#6366f1,#8b5cf6)',border:'none',padding:'11px 22px',fontWeight:700,fontSize:14,cursor:'pointer',borderRadius:12,color:'white',boxShadow:'0 6px 20px rgba(99,102,241,0.45)',display:'flex',alignItems:'center',gap:8}}>
              🧠 Lancer la Simulation IA →
            </button>
          </div>

          {/* GRILLE ANNÉES */}
          <p style={{fontSize:12,color:'var(--muted)',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:14,fontWeight:600}}>
            Sélectionnez une année pour accéder aux 2 sessions
          </p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(145px,1fr))',gap:12,marginBottom:32}}>
            {sec.data.map(a=>{
              const sel = selectedYear===a.year
              return (
                <div key={a.year} onClick={()=>setSelectedYear(sel?null:a.year)}
                  style={{cursor:'pointer',textAlign:'center',padding:'18px 10px',background:sel?`${sec.color}18`:'var(--surface)',border:sel?`2px solid ${sec.color}`:'1px solid var(--border)',borderRadius:14,transition:'all 0.2s',boxShadow:sel?`0 6px 24px ${sec.color}30`:'none',transform:sel?'translateY(-3px)':'none'}}
                  onMouseEnter={e=>{if(!sel){e.currentTarget.style.borderColor=`${sec.color}70`;e.currentTarget.style.transform='translateY(-2px)'}}}
                  onMouseLeave={e=>{if(!sel){e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.transform='none'}}}>
                  <div style={{fontFamily:'var(--font-display)',fontWeight:800,fontSize:30,color:sel?sec.color:'var(--text)',marginBottom:6}}>{a.year}</div>
                  <div style={{display:'flex',gap:4,justifyContent:'center',flexWrap:'wrap',marginBottom:6}}>
                    <span style={{fontSize:9,background:'rgba(79,110,247,0.1)',color:'#4f6ef7',border:'1px solid rgba(79,110,247,0.25)',padding:'2px 6px',borderRadius:5,fontWeight:600}}>📌 Princ.</span>
                    <span style={{fontSize:9,background:'rgba(245,158,11,0.1)',color:'#f59e0b',border:'1px solid rgba(245,158,11,0.25)',padding:'2px 6px',borderRadius:5,fontWeight:600}}>🔄 Ctrl.</span>
                  </div>
                  {a.note && <div style={{fontSize:10,color:'#f5c842',fontWeight:700}}>{a.note} Nouveau</div>}
                </div>
              )
            })}
          </div>

          {/* DÉTAIL ANNÉE */}
          {detail && (
            <div style={{background:'var(--surface)',border:`2px solid ${sec.color}40`,borderRadius:20,padding:28,animation:'fadeInUp 0.25s ease both'}}>

              {/* En-tête */}
              <div style={{marginBottom:24}}>
                <div style={{display:'flex',gap:10,alignItems:'center',flexWrap:'wrap',marginBottom:8}}>
                  <span style={{fontSize:22}}>{sec.icon}</span>
                  <h3 style={{margin:0}}>Bac {sec.label} — {selectedYear}</h3>
                  <span style={{fontSize:11,background:'rgba(6,214,160,0.12)',color:'#06d6a0',border:'1px solid rgba(6,214,160,0.3)',padding:'3px 10px',borderRadius:10,fontWeight:600}}>
                    ✅ Sujets + Corrections disponibles
                  </span>
                </div>
                <p style={{fontSize:13,color:'var(--muted)',margin:0}}>
                  Barème total : <strong style={{color:'var(--text)'}}>{ptTotal}/20</strong>
                  {' · '}Source officielle : <strong>bacweb.tn (CNTE)</strong>
                  {' · '}Cliquez sur un bouton pour lire ou télécharger le PDF
                </p>
              </div>

              {/* SESSIONS — 2 blocs côte à côte */}
              <SessionsBlock
                year={selectedYear!}
                secKey={activeSec}
                color={sec.color}
                links={activeSec!=='info' ? (sec.links as Record<number,AnneeLinks>)[selectedYear!] : undefined}
                infoL={activeSec==='info' ? infoLinks[selectedYear!] : undefined}
                onOpen={openPdf}
              />

              {/* BARÈME EXERCICES */}
              <div style={{background:`${sec.color}08`,border:`1px solid ${sec.color}20`,borderRadius:12,padding:'14px 18px',marginBottom:20}}>
                <p style={{margin:'0 0 12px',fontSize:11,color:'var(--muted)',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.06em'}}>
                  📊 Contenu du sujet session principale
                </p>
                <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:10}}>
                  {detail.exercices.map((ex,i)=>(
                    <div key={i} style={{background:'var(--surface)',border:'1px solid var(--border)',borderLeft:`3px solid ${sec.color}`,borderRadius:10,padding:'12px 14px'}}>
                      <div style={{display:'flex',justifyContent:'space-between',marginBottom:6,alignItems:'flex-start',gap:8}}>
                        <span style={{fontWeight:700,fontSize:12,color:sec.color}}>{ex.titre}</span>
                        <span style={{fontFamily:'var(--font-mono)',fontSize:11,color:'#f5c842',background:'rgba(245,200,66,0.12)',padding:'1px 7px',borderRadius:6,fontWeight:700,flexShrink:0}}>{ex.pts} pts</span>
                      </div>
                      <p style={{fontSize:11,color:'var(--text2)',lineHeight:1.55,margin:0}}>{ex.theme}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Source */}
              <div style={{padding:'8px 14px',background:'var(--surface2)',borderRadius:10,fontSize:11,color:'var(--muted)',display:'flex',gap:12,flexWrap:'wrap',alignItems:'center'}}>
                <span>🏛️</span>
                <span>Source officielle :</span>
                <a href="http://www.bacweb.tn" target="_blank" rel="noreferrer" style={{color:'var(--accent)'}}>bacweb.tn (CNTE)</a>
                <span>·</span>
                <a href="https://www.reviserbac.tn/sujets" target="_blank" rel="noreferrer" style={{color:'var(--accent)'}}>reviserbac.tn</a>
                <span>·</span>
                <a href="https://www.sigmaths.net/bac.php" target="_blank" rel="noreferrer" style={{color:'var(--accent)'}}>sigmaths.net</a>
              </div>
            </div>
          )}

          {/* AUTRES SECTIONS */}
          <div style={{marginTop:52,paddingTop:36,borderTop:'1px solid var(--border)'}}>
            <p style={{fontSize:12,color:'var(--muted)',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:16,fontWeight:600}}>Autres sections</p>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:12}}>
              {SECTIONS.filter(s=>s.key!==activeSec).map(s=>(
                <button key={s.key} onClick={()=>{setActiveSec(s.key);setSelectedYear(null);window.scrollTo({top:0,behavior:'smooth'})}}
                  style={{display:'flex',gap:12,alignItems:'center',padding:16,background:'var(--surface)',border:'1px solid var(--border)',borderRadius:12,cursor:'pointer',textAlign:'left',transition:'all 0.2s',fontFamily:'var(--font-body)'}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=`${s.color}60`;e.currentTarget.style.transform='translateY(-2px)'}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.transform='none'}}>
                  <span style={{fontSize:26}}>{s.icon}</span>
                  <div>
                    <div style={{fontWeight:700,fontSize:13,color:'var(--text)'}}>{s.label}</div>
                    <div style={{fontSize:10,color:s.color,fontWeight:600,marginTop:2}}>{s.coeff} · 11 années · 2 sessions</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>
      </main>
      <Footer/>

      <style>{`
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}
        @keyframes fadeInUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
      `}</style>
    </>
  )
}


