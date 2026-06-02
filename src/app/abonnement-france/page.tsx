'use client'
import { useState } from 'react'
import { useAuth } from '../../lib/auth/AuthContext'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'

// ══════════════════════════════════════════════════════════════════
// PAGE ABONNEMENT FRANCE — MathBac.AI
// Architecture : Sélecteur matière → Plans 19/29/199€ par matière
// Maths  : prod_UI2FexFokbGkTi / prod_UI2GFnMR7vOZEF / prod_UI2HyfGtGPC8K8
// Physique: prod_URAs0RBxU2aoXQ / prod_URB7NzLqwFyV5O / prod_URBBw1QH8sA2AM
// SVT/Anglais/Info : "Bientôt disponible"
// ══════════════════════════════════════════════════════════════════

// ── Types ────────────────────────────────────────────────────────
type MatiereKey = 'mathematiques' | 'physique' | 'svt' | 'anglais' | 'informatique' | 'francais'

interface Plan {
  id: string
  name: string
  icon: string
  price: number
  period: string
  description: string
  badge: string | null
  stripeUrl: string
  priceId: string
  productId: string
  quotas: { label: string; val: string }[]
  accentColor: string
  gradient: string
  shadowColor: string
}

// ── Matières ─────────────────────────────────────────────────────
const MATIERES: {
  key: MatiereKey
  icon: string
  label: string
  color: string
  border: string
  bg: string
  available: boolean
  accesPayant: string[]
  accesFree: string[]
  tagline: string
}[] = [
  {
    key: 'mathematiques',
    icon: '∑',
    label: 'Mathématiques',
    color: '#6366f1',
    border: 'rgba(99,102,241,0.45)',
    bg: 'rgba(99,102,241,0.08)',
    available: true,
    tagline: 'Analyse · Complexes · Probabilités · Géométrie · Isométries',
    accesPayant: ['Simulation Bac IA','Chat Professeur IA','Solveur étape/étape','Remédiation & Analyse'],
    accesFree: [
      'Cours CNP officiels (Terminale, Première, Seconde)',
      'Examens officiels du Bac + corrections détaillées',
      'Annales Maths France (APMEP, sujets officiels)',
      'Programme complet par section (Générale, STMG, Expertes)',
    ],
  },
  {
    key: 'physique',
    icon: '⚗',
    label: 'Physique-Chimie',
    color: '#06d6a0',
    border: 'rgba(6,214,160,0.45)',
    bg: 'rgba(6,214,160,0.08)',
    available: true,
    tagline: 'RC/RL/RLC · Mécanique · Ondes · Acide-Base · Oxydoréduction',
    accesPayant: ['Simulation Physique IA','Chat Professeur Physique','Solveur Physique-Chimie','Remédiation & Analyse'],
    accesFree: [
      'Cours Physique-Chimie officiels (Terminale, Première)',
      'Examens officiels Physique-Chimie + corrections',
      'Annales Physique-Chimie France (sujets officiels)',
      'Programme complet par section (Générale, STI2D, ST2S)',
    ],
  },
  {
    key: 'svt',
    icon: '🌱',
    label: 'SVT',
    color: '#22c55e',
    border: 'rgba(34,197,94,0.45)',
    bg: 'rgba(34,197,94,0.08)',
    available: true,
    tagline: 'Génétique · Évolution · Corps humain · Plantes · Géologie · Immunité',
    accesPayant: [
      'Simulation SVT IA (Terminale · Première · Seconde)',
      'Chat Professeur SVT',
      'Bac Blanc SVT France',
      'Remédiation & Corrections SVT',
      'Analyses performance SVT',
    ],
    accesFree: [
      'Cours SVT officiels (Terminale Spé, Première Spé, Seconde)',
      'Examens officiels SVT + corrections détaillées (2021–2025)',
      'Annales SVT France — Métropole J1 & J2 (sujets officiels vérifiés)',
      'Programme complet par section (Terminale · Première · Seconde)',
    ],
  },
  {
    key: 'anglais',
    icon: '🇬🇧',
    label: 'Anglais LLCER',
    color: '#f43f5e',
    border: 'rgba(244,63,94,0.45)',
    bg: 'rgba(244,63,94,0.08)',
    available: true,
    tagline: 'LLCER · 8 axes thématiques · Synthèse · Traduction · Simulation Bac',
    accesPayant: ['Simulation LLCER Anglais IA', 'Chat Professeur Anglais', 'Bac Blanc Anglais LLCER', 'Remédiation & Corrections Anglais', 'Analyses performance Anglais'],
    accesFree: [
      'Cours Anglais officiels (Terminale LLCER, Première, Seconde)',
      'Examens officiels LLCER Anglais + corrections détaillées',
      'Annales LLCER Anglais France (sujets officiels 2021–2025)',
      'Programme complet par section (8 axes thématiques)',
    ],
  },
  {
    key: 'informatique',
    icon: '💻',
    label: 'Informatique NSI',
    color: '#8b5cf6',
    border: 'rgba(139,92,246,0.45)',
    bg: 'rgba(139,92,246,0.08)',
    available: true,
    tagline: 'Algorithmique · Python · SQL · Réseaux · Architecture',
    accesPayant: ['Simulation NSI IA', 'Chat Professeur Informatique', 'Solveur Algo Python', 'Remédiation & Corrections NSI', 'Analyses performance NSI'],
    accesFree: [
      'Cours NSI officiels (Terminale, Première, Seconde SNT)',
      'Examens officiels NSI + corrections détaillées',
      'Annales NSI France (sujets officiels 2021–2025)',
      'Programme complet par section (Terminale NSI, Première NSI, SNT)',
    ],
  },
  {
    key: 'francais' as MatiereKey,
    icon: '📚',
    label: 'Français · Philosophie',
    color: '#ec4899',
    border: 'rgba(236,72,153,0.45)',
    bg: 'rgba(236,72,153,0.08)',
    available: true,
    tagline: 'Philosophie Terminale · EAF Première · Dissertation · Commentaire · Analyse linéaire · Grand Oral',
    accesPayant: [
      'Simulation Bac Blanc Français · Philosophie IA',
      'Chat Professeur Français · Philosophie',
      'Correction IA Commentaire & Dissertation',
      'Remédiation & Analyse performances',
      'Bac Blanc Français (mai–juin)',
    ],
    accesFree: [
      'Cours Philosophie Terminale (6 notions · 8 chapitres)',
      'Cours Français EAF Première (5 objets d\'étude · 100 exercices)',
      'Cours Français Seconde (4 objets d\'étude · 76 exercices)',
      'Annales Philosophie Bac France 2021–2025 (sujets officiels vérifiés)',
    ],
  },
]

// ── Plans par matière ─────────────────────────────────────────────
const PLANS_BY_MATIERE: Record<MatiereKey, Plan[]> = {
  mathematiques: [
    {
      id: 'mensuel',
      name: 'Abonnement Mensuel',
      icon: '📚',
      price: 19,
      period: 'mois',
      description: 'Hors période mai–juin · Résiliable à tout moment',
      badge: null,
      stripeUrl: 'https://buy.stripe.com/aFa9ASfRr4Ikgyo3y20gw0a',
      priceId: 'price_1TJSBJCwS8UwOtxy1Byt0mZx',
      productId: 'prod_UI2FexFokbGkTi',
      accentColor: '#6366f1',
      gradient: 'linear-gradient(135deg,#4f6ef7,#6366f1)',
      shadowColor: 'rgba(99,102,241,0.35)',
      quotas: [
        { label: 'Simulation Bac', val: '5 / sem' },
        { label: 'Chat IA Professeur', val: '20 / sem' },
        { label: 'Solveur étape/étape', val: '20 / sem' },
        { label: 'Remédiation IA', val: '10 / sem' },
        { label: 'Analyses performance', val: '5 / sem' },
        { label: 'Cours officiels', val: '♾️ Illimité' },
        { label: 'Bac Blanc', val: '❌ Non inclus' },
      ],
    },
    {
      id: 'sprint',
      name: 'Sprint Bac Maths',
      icon: '🚀',
      price: 29,
      period: 'mois',
      description: 'Mai–juin uniquement · Bac Blanc inclus',
      badge: '🔥 MAI – JUIN',
      stripeUrl: 'https://buy.stripe.com/bJe14mgVv7Uw1Du5Ga0gw0b',
      priceId: 'price_1TJSCMCwS8UwOtxyvocQR82P',
      productId: 'prod_UI2GFnMR7vOZEF',
      accentColor: '#f59e0b',
      gradient: 'linear-gradient(135deg,#f59e0b,#f97316)',
      shadowColor: 'rgba(245,158,11,0.35)',
      quotas: [
        { label: 'Simulation Bac', val: '10 / sem' },
        { label: 'Chat IA Professeur', val: '30 / sem' },
        { label: 'Solveur étape/étape', val: '♾️ Illimité' },
        { label: 'Remédiation IA', val: '20 / sem' },
        { label: 'Analyses performance', val: '10 / sem' },
        { label: 'Cours officiels', val: '♾️ Illimité' },
        { label: 'Bac Blanc', val: '✅ Inclus' },
      ],
    },
    {
      id: 'annuel',
      name: 'Abonnement Annuel',
      icon: '🎓',
      price: 199,
      period: 'an',
      description: 'Payé en une fois · Sprint mai–juin inclus',
      badge: '⭐ MEILLEURE VALEUR',
      stripeUrl: 'https://buy.stripe.com/dRm8wOdJjgr281SfgK0gw0c',
      priceId: 'price_1TJSD9CwS8UwOtxyqSxqxmna',
      productId: 'prod_UI2HyfGtGPC8K8',
      accentColor: '#6366f1',
      gradient: 'linear-gradient(135deg,#4f6ef7,#8b5cf6)',
      shadowColor: 'rgba(99,102,241,0.3)',
      quotas: [
        { label: 'Simulation Bac', val: '5→10 / sem' },
        { label: 'Chat IA Professeur', val: '20→30 / sem' },
        { label: 'Solveur étape/étape', val: '20/sem → ♾️' },
        { label: 'Remédiation IA', val: '10→20 / sem' },
        { label: 'Analyses performance', val: '5→10 / sem' },
        { label: 'Cours officiels', val: '♾️ Illimité' },
        { label: 'Bac Blanc (mai–juin)', val: '✅ Inclus' },
      ],
    },
  ],
  physique: [
    {
      id: 'mensuel',
      name: 'Abonnement Mensuel',
      icon: '⚗',
      price: 19,
      period: 'mois',
      description: 'Hors période mai–juin · Résiliable à tout moment',
      badge: null,
      stripeUrl: 'https://buy.stripe.com/dRm6oGax7a2E4PG5Ga0gw0d',
      priceId: 'price_1TSIX6CwS8UwOtxyutjyxEK3',
      productId: 'prod_URAs0RBxU2aoXQ',
      accentColor: '#06d6a0',
      gradient: 'linear-gradient(135deg,#06d6a0,#10b981)',
      shadowColor: 'rgba(6,214,160,0.35)',
      quotas: [
        { label: 'Simulation Physique', val: '10 / sem' },
        { label: 'Chat IA Physique', val: '20 / sem' },
        { label: 'Solveur Physique-Chimie', val: '20 / sem' },
        { label: 'Remédiation IA', val: '10 / sem' },
        { label: 'Analyses performance', val: '5 / sem' },
        { label: 'Cours Physique-Chimie', val: '♾️ Illimité' },
        { label: 'Bac Blanc Physique', val: '❌ Non inclus' },
      ],
    },
    {
      id: 'sprint',
      name: 'Sprint Bac Physique',
      icon: '🚀',
      price: 29,
      period: 'mois',
      description: 'Mai–juin uniquement · Bac Blanc Physique inclus',
      badge: '🔥 MAI – JUIN',
      stripeUrl: 'https://buy.stripe.com/5kQ7sKeNn4Ikfuk3y20gw0e',
      priceId: 'price_1TSIldCwS8UwOtxyDKYX2AbD',
      productId: 'prod_URB7NzLqwFyV5O',
      accentColor: '#f59e0b',
      gradient: 'linear-gradient(135deg,#f59e0b,#f97316)',
      shadowColor: 'rgba(245,158,11,0.35)',
      quotas: [
        { label: 'Simulation Physique', val: '5 / sem' },
        { label: 'Chat IA Physique', val: '30 / sem' },
        { label: 'Solveur Physique-Chimie', val: '♾️ Illimité' },
        { label: 'Remédiation IA', val: '20 / sem' },
        { label: 'Analyses performance', val: '10 / sem' },
        { label: 'Cours Physique-Chimie', val: '♾️ Illimité' },
        { label: 'Bac Blanc Physique', val: '✅ Inclus' },
      ],
    },
    {
      id: 'annuel',
      name: 'Abonnement Annuel',
      icon: '🎓',
      price: 199,
      period: 'an',
      description: 'Payé en une fois · Sprint mai–juin inclus',
      badge: '⭐ MEILLEURE VALEUR',
      stripeUrl: 'https://buy.stripe.com/5kQ6oG48Jb6Ifuk5Ga0gw0f',
      priceId: 'price_1TSIosCwS8UwOtxyxXOQZr6l',
      productId: 'prod_URBBw1QH8sA2AM',
      accentColor: '#06d6a0',
      gradient: 'linear-gradient(135deg,#06d6a0,#0891b2)',
      shadowColor: 'rgba(6,214,160,0.3)',
      quotas: [
        { label: 'Simulation Physique', val: '5→10 / sem' },
        { label: 'Chat IA Physique', val: '20→30 / sem' },
        { label: 'Solveur Physique-Chimie', val: '20/sem → ♾️' },
        { label: 'Remédiation IA', val: '10→20 / sem' },
        { label: 'Analyses performance', val: '5→10 / sem' },
        { label: 'Cours Physique-Chimie', val: '♾️ Illimité' },
        { label: 'Bac Blanc Physique (mai–juin)', val: '✅ Inclus' },
      ],
    },
  ],
  svt: [
    {
      id: 'mensuel',
      name: 'Abonnement Mensuel',
      icon: '🌱',
      price: 19,
      period: 'mois',
      description: 'Hors période mai–juin · Résiliable à tout moment',
      badge: null,
      stripeUrl: 'https://buy.stripe.com/bJe3cu34Fb6Ibe48Sm0gw0m',
      priceId: 'price_1TcsROCwS8UwOtxyf8QZUnHm',
      productId: 'prod_Uc6eAbIOCfjPWa',
      accentColor: '#22c55e',
      gradient: 'linear-gradient(135deg,#22c55e,#16a34a)',
      shadowColor: 'rgba(34,197,94,0.35)',
      quotas: [
        { label: 'Simulation SVT', val: '10 / sem' },
        { label: 'Chat IA SVT', val: '20 / sem' },
        { label: 'Bac Blanc SVT', val: '❌ Non inclus' },
        { label: 'Remédiation IA', val: '10 / sem' },
        { label: 'Analyses performance', val: '5 / sem' },
        { label: 'Cours SVT', val: '♾️ Illimité' },
        { label: 'Examens officiels SVT', val: '♾️ Illimité' },
      ],
    },
    {
      id: 'sprint',
      name: 'Sprint Bac SVT',
      icon: '🚀',
      price: 29,
      period: 'mois',
      description: 'Mai–juin uniquement · Bac Blanc SVT inclus',
      badge: '🔥 MAI – JUIN',
      stripeUrl: 'https://buy.stripe.com/fZubJ0gVv7Uwaa08Sm0gw0n',
      priceId: 'price_1TcsV2CwS8UwOtxybMN7xgAL',
      productId: 'prod_Uc6i8YDyTP8gS9',
      accentColor: '#f59e0b',
      gradient: 'linear-gradient(135deg,#f59e0b,#f97316)',
      shadowColor: 'rgba(245,158,11,0.35)',
      quotas: [
        { label: 'Simulation SVT', val: '5 / sem' },
        { label: 'Chat IA SVT', val: '30 / sem' },
        { label: 'Bac Blanc SVT', val: '✅ Inclus' },
        { label: 'Remédiation IA', val: '20 / sem' },
        { label: 'Analyses performance', val: '10 / sem' },
        { label: 'Cours SVT', val: '♾️ Illimité' },
        { label: 'Examens officiels SVT', val: '♾️ Illimité' },
      ],
    },
    {
      id: 'annuel',
      name: 'Abonnement Annuel',
      icon: '🎓',
      price: 199,
      period: 'an',
      description: 'Payé en une fois · Sprint mai–juin inclus',
      badge: '⭐ MEILLEURE VALEUR',
      stripeUrl: 'https://buy.stripe.com/7sY28qeNn6Qsci8c4y0gw0o',
      priceId: 'price_1TcsXbCwS8UwOtxyYnju6CRi',
      productId: 'prod_Uc6lGD5Di6yYz6',
      accentColor: '#22c55e',
      gradient: 'linear-gradient(135deg,#22c55e,#0891b2)',
      shadowColor: 'rgba(34,197,94,0.3)',
      quotas: [
        { label: 'Simulation SVT', val: '5→10 / sem' },
        { label: 'Chat IA SVT', val: '20→30 / sem' },
        { label: 'Bac Blanc SVT (mai–juin)', val: '✅ Inclus' },
        { label: 'Remédiation IA', val: '10→20 / sem' },
        { label: 'Analyses performance', val: '5→10 / sem' },
        { label: 'Cours SVT', val: '♾️ Illimité' },
        { label: 'Examens officiels SVT', val: '♾️ Illimité' },
      ],
    },
  ],
  anglais: [
    {
      id: 'mensuel',
      name: 'Abonnement Mensuel',
      icon: '🇬🇧',
      price: 19,
      period: 'mois',
      description: 'Hors période mai–juin · Résiliable à tout moment',
      badge: null,
      stripeUrl: 'https://buy.stripe.com/eVq14meNn4Ik0zq4C60gw0j',
      priceId: 'price_1TaUuVCwS8UwOtxyTxKreHFc',
      productId: 'prod_UZeCXis8KfEHOz',
      accentColor: '#f43f5e',
      gradient: 'linear-gradient(135deg,#f43f5e,#e11d48)',
      shadowColor: 'rgba(244,63,94,0.35)',
      quotas: [
        { label: 'Simulation LLCER Anglais', val: '5 / sem' },
        { label: 'Chat IA Professeur Anglais', val: '20 / sem' },
        { label: 'Correction IA Synthèse', val: '20 / sem' },
        { label: 'Remédiation IA Anglais', val: '10 / sem' },
        { label: 'Analyses performance', val: '5 / sem' },
        { label: 'Cours & Annales LLCER', val: '♾️ Illimité' },
        { label: 'Bac Blanc Anglais', val: '❌ Non inclus' },
      ],
    },
    {
      id: 'sprint',
      name: 'Sprint Bac Anglais',
      icon: '🚀',
      price: 29,
      period: 'mois',
      description: 'Mai–juin uniquement · Bac Blanc Anglais inclus',
      badge: '🔥 MAI – JUIN',
      stripeUrl: 'https://buy.stripe.com/3cIeVc8oZ3Eg1Du3y20gw0k',
      priceId: 'price_1TaUx5CwS8UwOtxyEQPrsBXR',
      productId: 'prod_UZeFEKRzSfcUL8',
      accentColor: '#f59e0b',
      gradient: 'linear-gradient(135deg,#f59e0b,#f97316)',
      shadowColor: 'rgba(245,158,11,0.35)',
      quotas: [
        { label: 'Simulation LLCER Anglais', val: '10 / sem' },
        { label: 'Chat IA Professeur Anglais', val: '30 / sem' },
        { label: 'Correction IA Synthèse', val: '♾️ Illimité' },
        { label: 'Remédiation IA Anglais', val: '20 / sem' },
        { label: 'Analyses performance', val: '10 / sem' },
        { label: 'Cours & Annales LLCER', val: '♾️ Illimité' },
        { label: 'Bac Blanc Anglais', val: '✅ Inclus' },
      ],
    },
    {
      id: 'annuel',
      name: 'Abonnement Annuel',
      icon: '🎓',
      price: 199,
      period: 'an',
      description: 'Payé en une fois · Sprint mai–juin inclus',
      badge: '⭐ MEILLEURE VALEUR',
      stripeUrl: 'https://buy.stripe.com/cNi8wO9t37Uw2Hyb0u0gw0l',
      priceId: 'price_1TaV0GCwS8UwOtxy2XO459vo',
      productId: 'prod_UZeIvIIWbQr5Xb',
      accentColor: '#f43f5e',
      gradient: 'linear-gradient(135deg,#f43f5e,#8b5cf6)',
      shadowColor: 'rgba(244,63,94,0.3)',
      quotas: [
        { label: 'Simulation LLCER Anglais', val: '5→10 / sem' },
        { label: 'Chat IA Professeur Anglais', val: '20→30 / sem' },
        { label: 'Correction IA Synthèse', val: '20/sem → ♾️' },
        { label: 'Remédiation IA Anglais', val: '10→20 / sem' },
        { label: 'Analyses performance', val: '5→10 / sem' },
        { label: 'Cours & Annales LLCER', val: '♾️ Illimité' },
        { label: 'Bac Blanc Anglais (mai–juin)', val: '✅ Inclus' },
      ],
    },
  ],
  informatique: [
    {
      id: 'mensuel',
      name: 'Abonnement Mensuel',
      icon: '💻',
      price: 19,
      period: 'mois',
      description: 'Hors période mai–juin · Résiliable à tout moment',
      badge: null,
      stripeUrl: 'https://buy.stripe.com/6oU00i0Wx8YAdmc2tY0gw0g',
      priceId: 'price_1TXlslCwS8UwOtxyBCXK1ntw',
      productId: 'prod_UWpXCJ4V3x24dd',
      accentColor: '#8b5cf6',
      gradient: 'linear-gradient(135deg,#8b5cf6,#7c3aed)',
      shadowColor: 'rgba(139,92,246,0.35)',
      quotas: [
        { label: 'Simulation NSI', val: '5 / sem' },
        { label: 'Chat IA Informatique', val: '20 / sem' },
        { label: 'Solveur Algo Python', val: '20 / sem' },
        { label: 'Remédiation IA', val: '10 / sem' },
        { label: 'Analyses performance', val: '5 / sem' },
        { label: 'Cours NSI officiels', val: '♾️ Illimité' },
        { label: 'Bac Blanc NSI', val: '❌ Non inclus' },
      ],
    },
    {
      id: 'sprint',
      name: 'Sprint Bac NSI',
      icon: '🚀',
      price: 29,
      period: 'mois',
      description: 'Mai–juin uniquement · Bac Blanc NSI inclus',
      badge: '🔥 MAI – JUIN',
      stripeUrl: 'https://buy.stripe.com/eVq7sKeNn5Modmc9Wq0gw0h',
      priceId: 'price_1TXly1CwS8UwOtxy2GPUFyQP',
      productId: 'prod_UWpdNScFsxwzkP',
      accentColor: '#f59e0b',
      gradient: 'linear-gradient(135deg,#f59e0b,#f97316)',
      shadowColor: 'rgba(245,158,11,0.35)',
      quotas: [
        { label: 'Simulation NSI', val: '10 / sem' },
        { label: 'Chat IA Informatique', val: '30 / sem' },
        { label: 'Solveur Algo Python', val: '♾️ Illimité' },
        { label: 'Remédiation IA', val: '20 / sem' },
        { label: 'Analyses performance', val: '10 / sem' },
        { label: 'Cours NSI officiels', val: '♾️ Illimité' },
        { label: 'Bac Blanc NSI', val: '✅ Inclus' },
      ],
    },
    {
      id: 'annuel',
      name: 'Abonnement Annuel',
      icon: '🎓',
      price: 199,
      period: 'an',
      description: 'Payé en une fois · Sprint mai–juin inclus',
      badge: '⭐ MEILLEURE VALEUR',
      stripeUrl: 'https://buy.stripe.com/eVq8wO34F6Qs4PG4C60gw0i',
      priceId: 'price_1TXm0rCwS8UwOtxyvSBkE7Vd',
      productId: 'prod_UWpgyTRUWsJXef',
      accentColor: '#8b5cf6',
      gradient: 'linear-gradient(135deg,#8b5cf6,#06b6d4)',
      shadowColor: 'rgba(139,92,246,0.3)',
      quotas: [
        { label: 'Simulation NSI', val: '5→10 / sem' },
        { label: 'Chat IA Informatique', val: '20→30 / sem' },
        { label: 'Solveur Algo Python', val: '20/sem → ♾️' },
        { label: 'Remédiation IA', val: '10→20 / sem' },
        { label: 'Analyses performance', val: '5→10 / sem' },
        { label: 'Cours NSI officiels', val: '♾️ Illimité' },
        { label: 'Bac Blanc NSI (mai–juin)', val: '✅ Inclus' },
      ],
    },
  ],
  francais: [
    {
      id: 'mensuel',
      name: 'Abonnement Mensuel',
      icon: '📚',
      price: 19,
      period: 'mois',
      description: 'Hors période mai–juin · Résiliable à tout moment',
      badge: null,
      stripeUrl: 'https://buy.stripe.com/aFa14m9t36Qsdmc0lQ0gw0p',
      priceId: 'price_1TdyBiCwS8UwOtxylDeBXcrH',
      productId: 'prod_UdEflqtk1G7HMw',
      accentColor: '#ec4899',
      gradient: 'linear-gradient(135deg,#ec4899,#db2777)',
      shadowColor: 'rgba(236,72,153,0.35)',
      quotas: [
        { label: 'Simulation Bac Français · Philo', val: '5 / sem' },
        { label: 'Chat IA Professeur Français',     val: '20 / sem' },
        { label: 'Correction IA Commentaire',       val: '20 / sem' },
        { label: 'Remédiation IA Français',         val: '10 / sem' },
        { label: 'Analyses performance',            val: '5 / sem' },
        { label: 'Cours Philosophie & Français',    val: '♾️ Illimité' },
        { label: 'Bac Blanc Français',              val: '❌ Non inclus' },
      ],
    },
    {
      id: 'sprint',
      name: 'Sprint Bac Français',
      icon: '🚀',
      price: 29,
      period: 'mois',
      description: 'Mai–juin uniquement · Bac Blanc Français inclus',
      badge: '🔥 MAI – JUIN',
      stripeUrl: 'https://buy.stripe.com/9B68wO9t37Uwci8b0u0gw0q',
      priceId: 'price_1TdyEuCwS8UwOtxyZS86m22l',
      productId: 'prod_UdEiqHV1GISihU',
      accentColor: '#f59e0b',
      gradient: 'linear-gradient(135deg,#f59e0b,#f97316)',
      shadowColor: 'rgba(245,158,11,0.35)',
      quotas: [
        { label: 'Simulation Bac Français · Philo', val: '10 / sem' },
        { label: 'Chat IA Professeur Français',     val: '30 / sem' },
        { label: 'Correction IA Commentaire',       val: '♾️ Illimité' },
        { label: 'Remédiation IA Français',         val: '20 / sem' },
        { label: 'Analyses performance',            val: '10 / sem' },
        { label: 'Cours Philosophie & Français',    val: '♾️ Illimité' },
        { label: 'Bac Blanc Français',              val: '✅ Inclus' },
      ],
    },
    {
      id: 'annuel',
      name: 'Abonnement Annuel',
      icon: '🎓',
      price: 199,
      period: 'an',
      description: 'Payé en une fois · Sprint mai–juin inclus',
      badge: '⭐ MEILLEURE VALEUR',
      stripeUrl: 'https://buy.stripe.com/5kQdR87kV8YAci83y20gw0r',
      priceId: 'price_1TdyHeCwS8UwOtxyevGTRFCs',
      productId: 'prod_UdElEV9RZzC2Ws',
      accentColor: '#ec4899',
      gradient: 'linear-gradient(135deg,#ec4899,#8b5cf6)',
      shadowColor: 'rgba(236,72,153,0.3)',
      quotas: [
        { label: 'Simulation Bac Français · Philo', val: '5→10 / sem' },
        { label: 'Chat IA Professeur Français',     val: '20→30 / sem' },
        { label: 'Correction IA Commentaire',       val: '20/sem → ♾️' },
        { label: 'Remédiation IA Français',         val: '10→20 / sem' },
        { label: 'Analyses performance',            val: '5→10 / sem' },
        { label: 'Cours Philosophie & Français',    val: '♾️ Illimité' },
        { label: 'Bac Blanc Français (mai–juin)',   val: '✅ Inclus' },
      ],
    },
  ],
}

// ── Composant QuotaRow ────────────────────────────────────────────
function QuotaRow({ label, val }: { label: string; val: string }) {
  const isGood = val.includes('♾️') || val.includes('✅') || val.includes('Illimité') || val.includes('Inclus')
  const isBad  = val.includes('❌')
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      fontSize: 12, padding: '5px 0',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    }}>
      <span style={{ color: 'var(--text2)' }}>{label}</span>
      <span style={{
        fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 11, flexShrink: 0, marginLeft: 8,
        color: isBad ? '#ef4444' : isGood ? '#06d6a0' : 'var(--text)',
      }}>
        {val}
      </span>
    </div>
  )
}

// ── Composant PlanCard ────────────────────────────────────────────
function PlanCard({
  plan, user, isSprint,
}: {
  plan: Plan
  user: any
  isSprint: boolean
}) {
  const [loading, setLoading] = useState(false)

  const handleClick = () => {
    if (!plan.stripeUrl) {
      alert('Lien de paiement en cours de configuration. Contactez le support.')
      return
    }
    setLoading(true)
    const url = user?.email
      ? `${plan.stripeUrl}?prefilled_email=${encodeURIComponent(user.email)}`
      : plan.stripeUrl
    window.location.href = url
  }

  return (
    <div style={{
      position: 'relative',
      background: 'rgba(255,255,255,0.03)',
      border: plan.badge ? `2px solid ${plan.accentColor}60` : '1px solid rgba(255,255,255,0.1)',
      borderRadius: 20,
      padding: '28px 24px',
      boxShadow: plan.badge ? `0 0 40px ${plan.shadowColor}` : 'none',
      display: 'flex', flexDirection: 'column', gap: 0,
      backdropFilter: 'blur(10px)',
    }}>
      {/* Badge */}
      {plan.badge && (
        <div style={{
          position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)',
          background: isSprint ? 'linear-gradient(135deg,#f59e0b,#f97316)' : plan.gradient,
          color: isSprint ? '#0a0a1a' : 'white',
          fontSize: 10, fontWeight: 900, padding: '5px 18px', borderRadius: 20,
          letterSpacing: '0.06em', whiteSpace: 'nowrap',
        }}>
          {plan.badge}
        </div>
      )}

      {/* Header */}
      <div style={{ marginBottom: 16, marginTop: plan.badge ? 8 : 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <span style={{ fontSize: 22 }}>{plan.icon}</span>
          <span style={{
            fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18,
            color: isSprint ? '#fbbf24' : 'var(--text)',
          }}>
            {plan.name}
          </span>
        </div>
        <div style={{ fontSize: 11, color: 'var(--muted)' }}>{plan.description}</div>
      </div>

      {/* Prix */}
      <div style={{ marginBottom: 16 }}>
        <span style={{
          fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 48,
          color: isSprint ? '#fbbf24' : 'var(--text)',
        }}>
          {plan.price}
        </span>
        <span style={{ fontSize: 15, color: 'var(--muted)', marginLeft: 4 }}>€ / {plan.period}</span>
      </div>

      {/* Quotas */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0, marginBottom: 22 }}>
        {plan.quotas.map((q, i) => <QuotaRow key={i} label={q.label} val={q.val} />)}
      </div>

      {/* CTA */}
      <button
        onClick={handleClick}
        disabled={loading}
        style={{
          width: '100%', padding: '14px 0', borderRadius: 12, border: 'none',
          background: loading ? 'rgba(255,255,255,0.08)' : plan.gradient,
          color: isSprint ? '#0a0a1a' : 'white',
          fontSize: 14, fontWeight: 800, cursor: loading ? 'not-allowed' : 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          boxShadow: loading ? 'none' : `0 6px 24px ${plan.shadowColor}`,
          transition: 'all 0.2s',
        }}
      >
        {loading ? (
          <>
            <span style={{
              width: 14, height: 14, border: '2px solid rgba(255,255,255,0.3)',
              borderTopColor: 'white', borderRadius: '50%',
              animation: 'spin 0.7s linear infinite', display: 'inline-block',
            }} />
            Redirection…
          </>
        ) : (
          <>💳 Payer {plan.price} € / {plan.period} →</>
        )}
      </button>
      <div style={{ textAlign: 'center', marginTop: 8, fontSize: 11, color: 'var(--muted)' }}>
        🔒 Stripe · Annulable à tout moment
      </div>
    </div>
  )
}

// ── Page principale ───────────────────────────────────────────────
export default function AbonnementFrancePage() {
  const { user, profile, hasActiveSubscription, daysRemaining } = useAuth()
  const [selectedMatiere, setSelectedMatiere] = useState<MatiereKey | null>(null)
  const [portalLoading, setPortalLoading] = useState(false)

  const handlePortal = async () => {
    if (!user?.id) return
    setPortalLoading(true)
    try {
      const res = await fetch('/api/stripe/portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id }),
      })
      const { url, error } = await res.json()
      if (url) window.location.href = url
      else alert(error || 'Erreur portail Stripe')
    } catch {
      alert('Erreur connexion portail')
    } finally {
      setPortalLoading(false)
    }
  }

  const matiereCourante = MATIERES.find(m => m.key === selectedMatiere)
  const plans = selectedMatiere ? PLANS_BY_MATIERE[selectedMatiere] : []

  return (
    <>
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>

        {/* ── HERO ── */}
        <section style={{
          textAlign: 'center',
          padding: '100px clamp(20px,5vw,60px) 40px',
          position: 'relative',
        }}>
          {/* Glow */}
          <div style={{
            position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
            width: 700, height: 350,
            background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          {/* Abonnement actif */}
          {hasActiveSubscription && profile && (
            <div style={{ marginBottom: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'rgba(6,214,160,0.1)', border: '1px solid rgba(6,214,160,0.3)',
                borderRadius: 100, padding: '6px 16px',
                fontFamily: 'var(--font-mono)', fontSize: 12, color: '#06d6a0',
              }}>
                ✅ Abonnement actif — {(profile as any).plan_type} · {daysRemaining ?? 0}j restants
              </div>
              {(profile as any)?.stripe_customer_id && (
                <button
                  onClick={handlePortal}
                  disabled={portalLoading}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '9px 20px', borderRadius: 12,
                    border: '1px solid rgba(59,130,246,0.3)',
                    background: 'rgba(59,130,246,0.08)',
                    color: '#60a5fa', fontSize: 13, fontWeight: 700,
                    cursor: 'pointer', transition: 'all 0.2s',
                  }}
                >
                  {portalLoading ? '⏳ Chargement...' : '⚙️ Gérer · Modifier · Annuler mon abonnement →'}
                </button>
              )}
            </div>
          )}

          {/* Badge France */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)',
            borderRadius: 100, padding: '5px 14px', fontSize: 12, color: '#60a5fa', marginBottom: 16,
          }}>
            🇫🇷 Programmes France · Paiement sécurisé Stripe
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)', fontWeight: 800,
            fontSize: 'clamp(28px,4vw,52px)', lineHeight: 1.1, marginBottom: 12,
          }}>
            Choisissez votre{' '}
            <span style={{
              background: 'linear-gradient(90deg,#60a5fa,#4f6ef7)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              matière
            </span>
          </h1>
          <p style={{ fontSize: 15, color: 'var(--text2)', maxWidth: 520, margin: '0 auto 8px' }}>
            Accès ciblé à votre matière · Même tarif · Contenu adapté
          </p>
          <p style={{ fontSize: 12, color: 'var(--muted)', maxWidth: 460, margin: '0 auto' }}>
            Paiement par carte bancaire via Stripe · Mensuel ou annuel · Annulable à tout moment
          </p>
        </section>

        <div className="container" style={{ maxWidth: 1160, paddingBottom: 80 }}>

          {/* ── Stripe badge ── */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 40 }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 50, padding: '8px 20px', fontSize: 12, color: 'var(--muted)',
            }}>
              <span style={{ fontSize: 16 }}>🔒</span>
              <span>Paiement 100% sécurisé via</span>
              <span style={{ fontWeight: 800, color: 'var(--text)' }}>Stripe</span>
              <span>· Visa · Mastercard · Amex</span>
            </div>
          </div>

          {/* ══ ÉTAPE 1 : Sélection de la matière ══ */}
          <div style={{ marginBottom: 48 }}>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)',
                borderRadius: 100, padding: '4px 14px', fontSize: 12,
                color: '#a5b4fc', marginBottom: 10,
              }}>
                Étape 1 sur 2
              </div>
              <h2 style={{
                fontFamily: 'var(--font-display)', fontWeight: 700,
                fontSize: 'clamp(20px,2.5vw,28px)', color: 'var(--text)',
              }}>
                Sélectionnez votre matière
              </h2>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 14, maxWidth: 1000, margin: '0 auto',
            }}>
              {MATIERES.map(mat => {
                const isSelected = selectedMatiere === mat.key
                return (
                  <button
                    key={mat.key}
                    onClick={() => mat.available && setSelectedMatiere(mat.key)}
                    style={{
                      position: 'relative',
                      background: isSelected
                        ? mat.bg
                        : 'rgba(255,255,255,0.025)',
                      border: isSelected
                        ? `2px solid ${mat.border}`
                        : '1px solid rgba(255,255,255,0.08)',
                      borderRadius: 16,
                      padding: '20px 16px',
                      cursor: mat.available ? 'pointer' : 'not-allowed',
                      opacity: mat.available ? 1 : 0.5,
                      transition: 'all 0.2s',
                      textAlign: 'left',
                      boxShadow: isSelected ? `0 0 24px ${mat.border}` : 'none',
                    }}
                  >
                    {/* Badge bientôt */}
                    {!mat.available && (
                      <div style={{
                        position: 'absolute', top: 8, right: 8,
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 20, padding: '2px 8px',
                        fontSize: 9, color: 'var(--muted)', fontWeight: 700,
                        letterSpacing: '0.05em',
                      }}>
                        BIENTÔT
                      </div>
                    )}

                    {/* Check */}
                    {isSelected && (
                      <div style={{
                        position: 'absolute', top: 10, right: 10,
                        width: 20, height: 20, borderRadius: '50%',
                        background: mat.color, display: 'flex',
                        alignItems: 'center', justifyContent: 'center',
                        fontSize: 11, color: 'white', fontWeight: 900,
                      }}>✓</div>
                    )}

                    <div style={{ fontSize: 28, marginBottom: 8, lineHeight: 1 }}>{mat.icon}</div>
                    <div style={{
                      fontFamily: 'var(--font-display)', fontWeight: 700,
                      fontSize: 15, color: isSelected ? mat.color : 'var(--text)',
                      marginBottom: 4,
                    }}>
                      {mat.label}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.5 }}>
                      {mat.tagline}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* ══ CARTE GRATUIT ══ */}
          {selectedMatiere && matiereCourante?.available && (
            <div style={{
              maxWidth: 800, margin: '0 auto 32px',
              background: 'rgba(255,255,255,0.025)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 16, padding: '20px 28px',
              display: 'flex', alignItems: 'center', gap: 20,
              flexWrap: 'wrap',
            }}>
              <div style={{ fontSize: 32 }}>🎁</div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontFamily: 'var(--font-display)', fontWeight: 700,
                  fontSize: 16, color: 'var(--text)', marginBottom: 4,
                }}>
                  🎁 Accès Gratuit — {matiereCourante.label}
                </div>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 8 }}>
                  Sans abonnement · Disponible immédiatement après inscription
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 16px' }}>
                  {matiereCourante.accesFree.map((item, i) => (
                    <span key={i} style={{ fontSize: 12, color: '#06d6a0', display: 'flex', alignItems: 'center', gap: 4 }}>
                      ✅ {item}
                    </span>
                  ))}
                </div>
              </div>
              <div style={{
                background: 'rgba(6,214,160,0.1)', border: '1px solid rgba(6,214,160,0.3)',
                borderRadius: 100, padding: '6px 16px',
                fontSize: 13, color: '#06d6a0', fontWeight: 700, whiteSpace: 'nowrap',
              }}>
                0 € / mois
              </div>
            </div>
          )}

          {/* ══ ÉTAPE 2 : Plans ══ */}
          {selectedMatiere && matiereCourante?.available && plans.length > 0 && (
            <div>
              <div style={{ textAlign: 'center', marginBottom: 28 }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: `${matiereCourante.bg}`,
                  border: `1px solid ${matiereCourante.border}`,
                  borderRadius: 100, padding: '4px 14px', fontSize: 12,
                  color: matiereCourante.color, marginBottom: 10,
                }}>
                  Étape 2 sur 2 · {matiereCourante.label}
                </div>
                <h2 style={{
                  fontFamily: 'var(--font-display)', fontWeight: 700,
                  fontSize: 'clamp(20px,2.5vw,28px)', color: 'var(--text)',
                }}>
                  Choisissez votre plan{' '}
                  <span style={{ color: matiereCourante.color }}>{matiereCourante.label}</span>
                </h2>
                <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 6 }}>
                  Accès aux fonctionnalités IA · Même tarif, contenu {matiereCourante.label} uniquement
                </p>
              </div>

              {/* Ce que l'abonnement débloque */}
              <div style={{
                maxWidth: 800, margin: '0 auto 28px',
                background: `${matiereCourante.bg}`,
                border: `1px solid ${matiereCourante.border}`,
                borderRadius: 14, padding: '16px 24px',
              }}>
                <div style={{
                  fontSize: 13, fontWeight: 700, color: matiereCourante.color, marginBottom: 10,
                }}>
                  🔓 Ce que l'abonnement {matiereCourante.label} débloque :
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 24px' }}>
                  {matiereCourante.accesPayant.map((item, i) => (
                    <span key={i} style={{
                      fontSize: 12, color: 'var(--text2)',
                      display: 'flex', alignItems: 'center', gap: 6,
                    }}>
                      <span style={{ color: matiereCourante.color, fontSize: 10 }}>▸</span>
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* 3 cartes plans */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 20, alignItems: 'start',
                maxWidth: 1000, margin: '0 auto',
              }}>
                {plans.map(plan => (
                  <PlanCard
                    key={plan.id}
                    plan={plan}
                    user={user}
                    isSprint={plan.id === 'sprint'}
                  />
                ))}
              </div>


            </div>
          )}

          {/* ══ Message "Bientôt disponible" ══ */}
          {selectedMatiere && matiereCourante && !matiereCourante.available && (
            <div style={{
              maxWidth: 600, margin: '0 auto',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 20, padding: '48px 40px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 56, marginBottom: 16 }}>🚀</div>
              <h3 style={{
                fontFamily: 'var(--font-display)', fontWeight: 800,
                fontSize: 24, color: 'var(--text)', marginBottom: 10,
              }}>
                {matiereCourante.label} — Bientôt disponible
              </h3>
              <p style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
                Nous travaillons activement sur le module <strong>{matiereCourante.label}</strong>.
                Revenez prochainement ou inscrivez-vous pour être notifié au lancement.
              </p>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: `${matiereCourante.bg}`,
                border: `1px solid ${matiereCourante.border}`,
                borderRadius: 100, padding: '8px 20px',
                fontSize: 13, color: matiereCourante.color, fontWeight: 700,
              }}>
                {matiereCourante.icon} {matiereCourante.label} arrive bientôt
              </div>
            </div>
          )}

          {/* ══ FAQ ══ */}
          {!selectedMatiere && (
            <section style={{ maxWidth: 700, margin: '48px auto 0' }}>
              <h2 style={{
                textAlign: 'center', marginBottom: 24,
                fontFamily: 'var(--font-display)', fontSize: 22,
              }}>
                Questions fréquentes
              </h2>
              {[
                {
                  q: 'Comment fonctionne le paiement Stripe ?',
                  a: 'Vous êtes redirigé vers la page de paiement sécurisée Stripe. Entrez vos coordonnées bancaires (Visa, Mastercard, Amex). Le paiement est traité immédiatement et votre abonnement est activé automatiquement.',
                },
                {
                  q: 'Mon abonnement Maths me donne-t-il accès à Physique ?',
                  a: 'Non — chaque abonnement est spécifique à une matière. Un abonnement Maths débloque Chat/Simulation/Solveur/Bac Blanc en Maths uniquement. Pour la Physique-Chimie, souscrivez un abonnement Physique séparé.',
                },
                {
                  q: 'Puis-je annuler mon abonnement ?',
                  a: "Oui, à tout moment depuis votre espace client Stripe (lien envoyé par email). L'annulation prend effet à la fin de la période en cours.",
                },
                {
                  q: "L'abonnement Annuel inclut-il le Sprint Bac ?",
                  a: "Oui ! L'abonnement annuel (199 €/an) inclut automatiquement le mode Sprint Bac en mai et juin, avec les quotas boostés et le Bac Blanc débloqué.",
                },
                {
                  q: 'Les cours et examens sont-ils gratuits ?',
                  a: "Oui ! Les cours CNP officiels et les examens avec corrections sont entièrement gratuits, sans abonnement. L'abonnement débloque uniquement les fonctionnalités IA (Chat, Simulation, Solveur, Bac Blanc IA).",
                },
              ].map((item, i) => (
                <details key={i} style={{ marginBottom: 10 }}>
                  <summary style={{
                    padding: '16px 20px',
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: 12, cursor: 'pointer',
                    fontWeight: 600, fontSize: 14, color: 'var(--text)',
                    userSelect: 'none', listStyle: 'none',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  }}>
                    {item.q}
                    <span style={{ color: 'var(--muted)', fontSize: 12, marginLeft: 12 }}>▼</span>
                  </summary>
                  <div style={{
                    padding: '14px 20px',
                    background: 'var(--bg2)',
                    border: '1px solid var(--border)', borderTop: 'none',
                    borderRadius: '0 0 12px 12px',
                    fontSize: 13, color: 'var(--text2)', lineHeight: 1.7,
                  }}>
                    {item.a}
                  </div>
                </details>
              ))}
            </section>
          )}

        </div>
      </main>
      <Footer />

      <style suppressHydrationWarning>{`
        @keyframes spin { to { transform: rotate(360deg) } }
        @media (max-width: 900px) {
          .plans-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}