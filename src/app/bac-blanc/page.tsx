'use client'
import { useState, useEffect, useRef, useCallback, Suspense } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { useAuth } from '@/lib/auth/AuthContext'

// ═══════════════════════════════════════════════════════════════════
// BAC BLANC — CONCOURS NATIONAL IA  (1er mai – 15 juin)
// Admin : bensghaiermejdi70@gmail.com — accès permanent, illimité
// Quotas gérés via Supabase AuthContext (plus localStorage)
// ═══════════════════════════════════════════════════════════════════

declare const Plotly: any

import { ADMIN_EMAIL } from '@/lib/types/monetisation'

const GOUVERNORATS = [
  'Ariana','Béja','Ben Arous','Bizerte','Gabès','Gafsa','Jendouba',
  'Kairouan','Kasserine','Kébili','Kef','Mahdia','Manouba','Médenine',
  'Monastir','Nabeul','Sfax','Sidi Bouzid','Siliana','Sousse',
  'Tataouine','Tozeur','Tunis','Zaghouan',
]

const SECTIONS = [
  { key:'maths',  label:'Mathématiques',          color:'#6366f1', icon:'∑', duration:240, coeff:4,
    themes:['Analyse & Suites','Nombres complexes','Probabilités','Géométrie espace','Isométries'] },
  { key:'scexp',  label:'Sciences Expérimentales', color:'#06d6a0', icon:'⚗', duration:180, coeff:3,
    themes:['Analyse','Complexes','Probabilités','Géométrie','Intégrales'] },
  { key:'sctech', label:'Sciences Techniques',     color:'#f59e0b', icon:'⚙', duration:180, coeff:3,
    themes:['Analyse','Arithmétique','Probabilités','Complexes','Géométrie'] },
  { key:'eco',    label:'Éco-Gestion',             color:'#10b981', icon:'💹', duration:120, coeff:2,
    themes:['Analyse & Suites','Probabilités','Matrices','Maths Financières','Logarithme'] },
  { key:'info',   label:'Informatique',            color:'#8b5cf6', icon:'⌨', duration:180, coeff:3,
    themes:['Algorithmique','Bases de données','Mathématiques','STI Web'] },
]

// ── Programme complet par jour — rotation sur 31 jours ────────────
// Chaque jour = thèmes précis différents pour chaque exercice
// Couvre TOUT le programme officiel sur 31 jours
const PROGRAMME_JOUR: Record<string, {
  ex1: { theme: string; sousTh: string; typeFunc?: string }
  ex2: { theme: string; sousTh: string }
  ex3: { theme: string; sousTh: string }
  ex4: { theme: string; sousTh: string }
}[]> = {
  maths: [
    { ex1:{theme:"Analyse",sousTh:"Étude de fonction exponentielle f(x)=ae^(bx)+c",typeFunc:"exp"}, ex2:{theme:"Complexes",sousTh:"Module, argument, forme trigonométrique"}, ex3:{theme:"Probabilités",sousTh:"Loi binomiale"}, ex4:{theme:"Géométrie espace",sousTh:"Vecteurs et coplanéité"} },
    { ex1:{theme:"Analyse",sousTh:"Étude de fonction logarithme f(x)=a·ln(bx+c)+d",typeFunc:"ln"}, ex2:{theme:"Complexes",sousTh:"Puissances et formule de Moivre"}, ex3:{theme:"Probabilités",sousTh:"Loi géométrique et espérance"}, ex4:{theme:"Isométries",sousTh:"Rotation et translation dans le plan"} },
    { ex1:{theme:"Analyse",sousTh:"Étude de fonction trigonométrique f(x)=a·sin(bx+c)",typeFunc:"sin"}, ex2:{theme:"Complexes",sousTh:"Racines n-ièmes de l'unité"}, ex3:{theme:"Suites",sousTh:"Suite arithmétique et somme"}, ex4:{theme:"Géométrie espace",sousTh:"Plans et droites dans l'espace"} },
    { ex1:{theme:"Analyse",sousTh:"Étude de fonction rationnelle f(x)=(ax+b)/(cx+d)",typeFunc:"rat"}, ex2:{theme:"Complexes",sousTh:"Transformations du plan complexe"}, ex3:{theme:"Suites",sousTh:"Suite géométrique et somme"}, ex4:{theme:"Géométrie espace",sousTh:"Sphère et distance"} },
    { ex1:{theme:"Analyse",sousTh:"Étude de fonction f(x)=(ax+b)e^(cx)",typeFunc:"poly_exp"}, ex2:{theme:"Complexes",sousTh:"Applications géométriques des complexes"}, ex3:{theme:"Probabilités",sousTh:"Probabilités conditionnelles et indépendance"}, ex4:{theme:"Isométries",sousTh:"Similitudes directes et indirectes"} },
    { ex1:{theme:"Analyse",sousTh:"Étude de fonction f(x)=a·ln(x)/x+b",typeFunc:"ln_div"}, ex2:{theme:"Complexes",sousTh:"Résolution d'équations dans ℂ"}, ex3:{theme:"Suites",sousTh:"Suite récurrente un+1=f(un)"}, ex4:{theme:"Géométrie espace",sousTh:"Angles dièdres et orthogonalité"} },
    { ex1:{theme:"Analyse",sousTh:"Étude de fonction f(x)=x²·e^(-x)",typeFunc:"poly2_exp"}, ex2:{theme:"Complexes",sousTh:"Interprétation géométrique des complexes"}, ex3:{theme:"Probabilités",sousTh:"Variable aléatoire et espérance"}, ex4:{theme:"Géométrie espace",sousTh:"Tétraèdre et pyramide"} },
    { ex1:{theme:"Analyse",sousTh:"Étude de fonction f(x)=x-2·√x",typeFunc:"racine"}, ex2:{theme:"Complexes",sousTh:"Exponentielle complexe et forme algébrique"}, ex3:{theme:"Suites",sousTh:"Convergence et limite d'une suite"}, ex4:{theme:"Isométries",sousTh:"Composition d'isométries"} },
    { ex1:{theme:"Analyse",sousTh:"Étude de f(x)=a·cos(x)+b·sin(x)",typeFunc:"cos_sin"}, ex2:{theme:"Complexes",sousTh:"Polynômes à coefficients complexes"}, ex3:{theme:"Probabilités",sousTh:"Loi de Poisson et approximation"}, ex4:{theme:"Géométrie espace",sousTh:"Projections et distances dans l'espace"} },
    { ex1:{theme:"Analyse",sousTh:"Étude de f(x)=ln(x²+a)",typeFunc:"ln_comp"}, ex2:{theme:"Complexes",sousTh:"Argument et inégalité triangulaire"}, ex3:{theme:"Suites",sousTh:"Suites monotones et suites adjacentes"}, ex4:{theme:"Géométrie espace",sousTh:"Perpendiculaires et parallèles"} },
    { ex1:{theme:"Analyse",sousTh:"Étude de f(x)=(x²-1)·e^x",typeFunc:"poly_exp2"}, ex2:{theme:"Complexes",sousTh:"Lieu géométrique dans ℂ"}, ex3:{theme:"Probabilités",sousTh:"Dénombrement et combinatoire"}, ex4:{theme:"Isométries",sousTh:"Homothéties et similitudes"} },
    { ex1:{theme:"Analyse",sousTh:"Étude de f(x)=1/(1+x²) et sa primitive",typeFunc:"arctan"}, ex2:{theme:"Complexes",sousTh:"Nombres complexes et trigonométrie"}, ex3:{theme:"Suites",sousTh:"Suites définies par récurrence — convergence"}, ex4:{theme:"Géométrie espace",sousTh:"Vecteurs dans l'espace et produit scalaire"} },
    { ex1:{theme:"Analyse",sousTh:"Étude de f(x)=xe^(-x²)",typeFunc:"gauss"}, ex2:{theme:"Complexes",sousTh:"Applications : rotations et similitudes"}, ex3:{theme:"Probabilités",sousTh:"Schéma de Bernoulli"}, ex4:{theme:"Géométrie espace",sousTh:"Cylindre et cône"} },
    { ex1:{theme:"Analyse",sousTh:"Étude de f(x)=ln(x+√(1+x²))",typeFunc:"ln_comp2"}, ex2:{theme:"Complexes",sousTh:"Racines carrées d'un complexe"}, ex3:{theme:"Suites",sousTh:"Encadrement et comparaison de suites"}, ex4:{theme:"Isométries",sousTh:"Frises et pavages"} },
    { ex1:{theme:"Analyse",sousTh:"Étude de f(x)=(x+a)·e^(x/b)",typeFunc:"exp_gen"}, ex2:{theme:"Complexes",sousTh:"Triangle dans ℂ : équilatéral, rectangle"}, ex3:{theme:"Probabilités",sousTh:"Probabilité totale et Bayes"}, ex4:{theme:"Géométrie espace",sousTh:"Sections planes d'un solide"} },
    { ex1:{theme:"Analyse",sousTh:"Intégration — calcul d'aire sous une courbe",typeFunc:"integrale"}, ex2:{theme:"Complexes",sousTh:"Résolution de systèmes dans ℂ"}, ex3:{theme:"Suites",sousTh:"Majoration et minoration"}, ex4:{theme:"Géométrie espace",sousTh:"Trièdre trirectangle"} },
    { ex1:{theme:"Analyse",sousTh:"Étude de f(x)=x·ln(x)",typeFunc:"x_ln"}, ex2:{theme:"Complexes",sousTh:"Forme exponentielle et rotation"}, ex3:{theme:"Probabilités",sousTh:"Variable aléatoire — variance et écart-type"}, ex4:{theme:"Isométries",sousTh:"Réflexions et glissements"} },
    { ex1:{theme:"Analyse",sousTh:"Étude de f(x)=e^x·sin(x)",typeFunc:"exp_sin"}, ex2:{theme:"Complexes",sousTh:"Inégalités dans ℂ — module"}, ex3:{theme:"Suites",sousTh:"Comparaison par récurrence"}, ex4:{theme:"Géométrie espace",sousTh:"Parallélépipède et cube"} },
    { ex1:{theme:"Analyse",sousTh:"Étude de f(x)=√(ax²+bx+c)",typeFunc:"racine_poly"}, ex2:{theme:"Complexes",sousTh:"Droites et cercles dans le plan complexe"}, ex3:{theme:"Probabilités",sousTh:"Loi normale et loi de Laplace-Gauss"}, ex4:{theme:"Isométries",sousTh:"Symétries axiales et centrales"} },
    { ex1:{theme:"Analyse",sousTh:"Étude de f(x)=(ax²+bx+c)·e^(-x)",typeFunc:"poly2_exp_neg"}, ex2:{theme:"Complexes",sousTh:"Équations du 2nd degré dans ℂ"}, ex3:{theme:"Suites",sousTh:"Suites et inégalités — récurrence"}, ex4:{theme:"Géométrie espace",sousTh:"Angles et distances — méthode vectorielle"} },
    { ex1:{theme:"Analyse",sousTh:"Étude de f(x)=ln(x)/√x",typeFunc:"ln_racine"}, ex2:{theme:"Complexes",sousTh:"Groupe des isométries directes — complexes"}, ex3:{theme:"Probabilités",sousTh:"Espérance conditionnelle"}, ex4:{theme:"Isométries",sousTh:"Similitudes — point fixe"} },
    { ex1:{theme:"Analyse",sousTh:"Étude de f(x)=(x-a)²·e^x",typeFunc:"poly_exp3"}, ex2:{theme:"Complexes",sousTh:"Applications : angles orientés dans ℂ"}, ex3:{theme:"Suites",sousTh:"Suite de Fibonacci et suites explicites"}, ex4:{theme:"Géométrie espace",sousTh:"Volume et aire de solides de révolution"} },
    { ex1:{theme:"Analyse",sousTh:"Étude de f(x)=a·tan(x)+b",typeFunc:"tan"}, ex2:{theme:"Complexes",sousTh:"Représentation géométrique — ensembles de points"}, ex3:{theme:"Probabilités",sousTh:"Simulations et fréquences"}, ex4:{theme:"Géométrie espace",sousTh:"Barycentres dans l'espace"} },
    { ex1:{theme:"Analyse",sousTh:"Équation différentielle y'+ay=b",typeFunc:"eq_diff"}, ex2:{theme:"Complexes",sousTh:"Complexes et trigonométrie — formule d'Euler"}, ex3:{theme:"Suites",sousTh:"Suite et point fixe — stabilité"}, ex4:{theme:"Isométries",sousTh:"Droite invariante par une isométrie"} },
    { ex1:{theme:"Analyse",sousTh:"Étude de f(x)=x/(x²+1)",typeFunc:"rat2"}, ex2:{theme:"Complexes",sousTh:"Image d'une droite ou cercle par f(z)=az+b"}, ex3:{theme:"Probabilités",sousTh:"Espérance et loi des grands nombres"}, ex4:{theme:"Géométrie espace",sousTh:"Repère dans l'espace — coordonnées"} },
    { ex1:{theme:"Analyse",sousTh:"Étude de f(x)=(ln x)²",typeFunc:"ln_carre"}, ex2:{theme:"Complexes",sousTh:"Décomposition — complexes"}, ex3:{theme:"Suites",sousTh:"Raisonnement par récurrence — applications"}, ex4:{theme:"Isométries",sousTh:"Composition de deux réflexions"} },
    { ex1:{theme:"Analyse",sousTh:"Étude de f(x)=e^x/(e^x+1)",typeFunc:"sigmoide"}, ex2:{theme:"Complexes",sousTh:"Résolution graphique dans le plan complexe"}, ex3:{theme:"Probabilités",sousTh:"Inégalité de Bienaymé-Tchebychev"}, ex4:{theme:"Géométrie espace",sousTh:"Droite et plan — positions relatives"} },
    { ex1:{theme:"Analyse",sousTh:"Étude de f(x)=sin(x)/x pour x≠0",typeFunc:"sinc"}, ex2:{theme:"Complexes",sousTh:"Complexes et géométrie — orthocentre"}, ex3:{theme:"Suites",sousTh:"Suites et algorithmes — calcul numérique"}, ex4:{theme:"Isométries",sousTh:"Homothétie-rotation et similitude directe"} },
    { ex1:{theme:"Analyse",sousTh:"Étude de f(x)=x·e^(1/x)",typeFunc:"exp_inv"}, ex2:{theme:"Complexes",sousTh:"Bilan complexes : module, argument, transformation"}, ex3:{theme:"Probabilités",sousTh:"Bilan probabilités : loi discrète et continue"}, ex4:{theme:"Géométrie espace",sousTh:"Bilan géométrie : droites, plans, distances"} },
    { ex1:{theme:"Analyse",sousTh:"Révision complète — f(x)=(x²-x+1)e^x",typeFunc:"revision"}, ex2:{theme:"Complexes",sousTh:"Révision : applications géométriques des complexes"}, ex3:{theme:"Suites",sousTh:"Révision suites : récurrence, convergence, limite"}, ex4:{theme:"Isométries",sousTh:"Révision isométries et similitudes"} },
    { ex1:{theme:"Analyse",sousTh:"Sujet final — f(x)=ln(1+e^x)",typeFunc:"softplus"}, ex2:{theme:"Complexes",sousTh:"Concours final complexes"}, ex3:{theme:"Probabilités",sousTh:"Concours final probabilités"}, ex4:{theme:"Géométrie espace",sousTh:"Concours final géométrie espace"} },
  ],
  scexp: [
    { ex1:{theme:"Analyse",sousTh:"f(x)=(2x-1)e^(-x)+1 — variation, limite, asymptote",typeFunc:"exp"}, ex2:{theme:"Complexes",sousTh:"Affixe, module, argument, forme trigonométrique"}, ex3:{theme:"Probabilités",sousTh:"Loi binomiale et espérance"}, ex4:{theme:"Géométrie",sousTh:"Vecteurs et produit scalaire"} },
    { ex1:{theme:"Analyse",sousTh:"f(x)=x·ln(x)-x — étude complète",typeFunc:"ln"}, ex2:{theme:"Complexes",sousTh:"Forme algébrique et opérations"}, ex3:{theme:"Intégrales",sousTh:"Calcul d'intégrales et primitives"}, ex4:{theme:"Géométrie",sousTh:"Droites et cercles dans le plan"} },
    { ex1:{theme:"Analyse",sousTh:"f(x)=2sin(x)+cos(2x) — étude sur [0,2π]",typeFunc:"trig"}, ex2:{theme:"Complexes",sousTh:"Résolution d'équation dans ℂ"}, ex3:{theme:"Probabilités",sousTh:"Probabilité conditionnelle et indépendance"}, ex4:{theme:"Géométrie",sousTh:"Triangle et droites remarquables"} },
    { ex1:{theme:"Analyse",sousTh:"f(x)=√(x²+1) — dérivée, variations",typeFunc:"racine"}, ex2:{theme:"Complexes",sousTh:"Racines n-ièmes et applications"}, ex3:{theme:"Intégrales",sousTh:"Intégrale définie — aire entre courbes"}, ex4:{theme:"Géométrie",sousTh:"Cercle — propriétés et équation"} },
    { ex1:{theme:"Analyse",sousTh:"f(x)=(x+1)e^(x-1) — tableau de variations complet",typeFunc:"poly_exp"}, ex2:{theme:"Complexes",sousTh:"Transformation du plan complexe"}, ex3:{theme:"Probabilités",sousTh:"Variable aléatoire discrète — loi et espérance"}, ex4:{theme:"Géométrie",sousTh:"Vecteurs et repère orthonormé"} },
    { ex1:{theme:"Analyse",sousTh:"f(x)=ln(x+1)/x — asymptotes, variations",typeFunc:"ln_rat"}, ex2:{theme:"Complexes",sousTh:"Applications géométriques : similitude"}, ex3:{theme:"Intégrales",sousTh:"Valeur moyenne d'une fonction"}, ex4:{theme:"Géométrie",sousTh:"Coniques — parabole et ellipse"} },
    { ex1:{theme:"Analyse",sousTh:"f(x)=x²·e^(-x/2)",typeFunc:"poly2_exp"}, ex2:{theme:"Complexes",sousTh:"Argument et inégalité triangulaire"}, ex3:{theme:"Probabilités",sousTh:"Loi normale centrée réduite"}, ex4:{theme:"Géométrie",sousTh:"Droites perpendiculaires et parallèles"} },
    { ex1:{theme:"Analyse",sousTh:"f(x)=e^x·cos(x) sur [-π,π]",typeFunc:"exp_cos"}, ex2:{theme:"Complexes",sousTh:"Forme exponentielle et formule d'Euler"}, ex3:{theme:"Intégrales",sousTh:"Intégration par parties"}, ex4:{theme:"Géométrie",sousTh:"Lieu géométrique"} },
    { ex1:{theme:"Analyse",sousTh:"f(x)=(3x-1)/(x²+1) — fonction rationnelle",typeFunc:"rat"}, ex2:{theme:"Complexes",sousTh:"Résolution graphique dans ℂ"}, ex3:{theme:"Probabilités",sousTh:"Dénombrement et arrangements"}, ex4:{theme:"Géométrie",sousTh:"Projection orthogonale"} },
    { ex1:{theme:"Analyse",sousTh:"f(x)=ln(e^x+1) — étude et représentation",typeFunc:"ln_exp"}, ex2:{theme:"Complexes",sousTh:"Triangle dans ℂ et propriétés"}, ex3:{theme:"Intégrales",sousTh:"Calcul de volume par intégration"}, ex4:{theme:"Géométrie",sousTh:"Angles inscrits dans un cercle"} },
    { ex1:{theme:"Analyse",sousTh:"Équation différentielle y'+y=e^x",typeFunc:"eq_diff"}, ex2:{theme:"Complexes",sousTh:"Image d'un cercle ou une droite"}, ex3:{theme:"Probabilités",sousTh:"Loi de Poisson"}, ex4:{theme:"Géométrie",sousTh:"Coordonnées polaires et cartésiennes"} },
    { ex1:{theme:"Analyse",sousTh:"f(x)=arcsin(x) ou arccos(x)",typeFunc:"arcsin"}, ex2:{theme:"Complexes",sousTh:"Conjugué et module — propriétés"}, ex3:{theme:"Intégrales",sousTh:"Sommes de Riemann et limite"}, ex4:{theme:"Géométrie",sousTh:"Parabole — propriété de la directrice"} },
    { ex1:{theme:"Analyse",sousTh:"f(x)=x^n·e^(-x) — généralisation",typeFunc:"xn_exp"}, ex2:{theme:"Complexes",sousTh:"Corps des complexes — structure algébrique"}, ex3:{theme:"Probabilités",sousTh:"Variance et écart-type"}, ex4:{theme:"Géométrie",sousTh:"Transformation plane — homothétie"} },
    { ex1:{theme:"Analyse",sousTh:"f(x)=(x-a)·ln(x)",typeFunc:"x_ln"}, ex2:{theme:"Complexes",sousTh:"Nombres complexes et trigonométrie"}, ex3:{theme:"Intégrales",sousTh:"Intégrale de fonctions trigonométriques"}, ex4:{theme:"Géométrie",sousTh:"Hexagone régulier et symétries"} },
    { ex1:{theme:"Analyse",sousTh:"f(x)=e^(-x²) — courbe de Gauss",typeFunc:"gauss"}, ex2:{theme:"Complexes",sousTh:"Racines du polynôme z^n=a"}, ex3:{theme:"Probabilités",sousTh:"Loi exponentielle et durée de vie"}, ex4:{theme:"Géométrie",sousTh:"Médiatrice, bissectrice — constructions"} },
    { ex1:{theme:"Analyse",sousTh:"Bilan analyse : f(x) mêlant exp et trig",typeFunc:"mix"}, ex2:{theme:"Complexes",sousTh:"Bilan complexes"}, ex3:{theme:"Intégrales",sousTh:"Bilan intégrales"}, ex4:{theme:"Géométrie",sousTh:"Bilan géométrie"} },
    { ex1:{theme:"Analyse",sousTh:"f(x)=sin(x)/(1+cos(x))",typeFunc:"trig2"}, ex2:{theme:"Complexes",sousTh:"Applications en physique — oscillations"}, ex3:{theme:"Probabilités",sousTh:"Statistiques — moyenne, médiane, mode"}, ex4:{theme:"Géométrie",sousTh:"Transformations isométriques"} },
    { ex1:{theme:"Analyse",sousTh:"f(x)=x^(1/3) — fonction puissance fractionnaire",typeFunc:"puissance"}, ex2:{theme:"Complexes",sousTh:"Plan complexe — ensembles de points"}, ex3:{theme:"Intégrales",sousTh:"Intégrale impropre et convergence"}, ex4:{theme:"Géométrie",sousTh:"Ellipse et hyperbole"} },
    { ex1:{theme:"Analyse",sousTh:"f(x)=(ax+b)/(cx²+d) — étude complète",typeFunc:"rat3"}, ex2:{theme:"Complexes",sousTh:"Complexes et géométrie analytique"}, ex3:{theme:"Probabilités",sousTh:"Bilan probabilités conditionnelles"}, ex4:{theme:"Géométrie",sousTh:"Droite et cercle — tangente"} },
    { ex1:{theme:"Analyse",sousTh:"f(x)=ln(x)·e^x — étude et représentation",typeFunc:"ln_exp2"}, ex2:{theme:"Complexes",sousTh:"Symétries dans ℂ"}, ex3:{theme:"Intégrales",sousTh:"Calcul d'intégrales définies"}, ex4:{theme:"Géométrie",sousTh:"Angle au centre et angle inscrit"} },
    { ex1:{theme:"Analyse",sousTh:"Révision type bac session principale",typeFunc:"rev1"}, ex2:{theme:"Complexes",sousTh:"Révision type bac complexes"}, ex3:{theme:"Probabilités",sousTh:"Révision type bac probabilités"}, ex4:{theme:"Géométrie",sousTh:"Révision type bac géométrie"} },
    { ex1:{theme:"Analyse",sousTh:"f(x)=cos(x)·ln(1+x²)",typeFunc:"trig_ln"}, ex2:{theme:"Complexes",sousTh:"Équations de degré 3 dans ℂ"}, ex3:{theme:"Intégrales",sousTh:"Volume de révolution"}, ex4:{theme:"Géométrie",sousTh:"Barycentres et propriétés"} },
    { ex1:{theme:"Analyse",sousTh:"f(x)=e^(sin x)",typeFunc:"exp_sin"}, ex2:{theme:"Complexes",sousTh:"Argument principal d'un complexe"}, ex3:{theme:"Probabilités",sousTh:"Loi hypergéométrique"}, ex4:{theme:"Géométrie",sousTh:"Construction à la règle et au compas"} },
    { ex1:{theme:"Analyse",sousTh:"f(x)=x/(x-1) — branches infinies",typeFunc:"rat4"}, ex2:{theme:"Complexes",sousTh:"Complexes et vecteurs — parallélogramme"}, ex3:{theme:"Intégrales",sousTh:"Méthode des rectangles et trapèzes"}, ex4:{theme:"Géométrie",sousTh:"Similitudes et rapports"} },
    { ex1:{theme:"Analyse",sousTh:"f(x)=(1+x)^α — étude générale",typeFunc:"puissance2"}, ex2:{theme:"Complexes",sousTh:"Résoudre |z-a|=|z-b| dans ℂ"}, ex3:{theme:"Probabilités",sousTh:"Variable aléatoire continue — densité"}, ex4:{theme:"Géométrie",sousTh:"Rotation — centre et angle"} },
    { ex1:{theme:"Analyse",sousTh:"f(x)=e^(-|x|) — valeur absolue",typeFunc:"exp_abs"}, ex2:{theme:"Complexes",sousTh:"Cercle de Moivre et applications"}, ex3:{theme:"Intégrales",sousTh:"Changement de variable"}, ex4:{theme:"Géométrie",sousTh:"Triangles semblables et rapport"} },
    { ex1:{theme:"Analyse",sousTh:"Fonction implicite et dérivation",typeFunc:"implicite"}, ex2:{theme:"Complexes",sousTh:"Nombre complexe et matrice 2x2"}, ex3:{theme:"Probabilités",sousTh:"Simulation de Monte-Carlo"}, ex4:{theme:"Géométrie",sousTh:"Inversion dans le plan"} },
    { ex1:{theme:"Analyse",sousTh:"f(x)=(x²-4)e^(-x/2) — étude complète",typeFunc:"poly2_exp_half"}, ex2:{theme:"Complexes",sousTh:"Complexes — résoudre sur ℝ et ℂ"}, ex3:{theme:"Intégrales",sousTh:"Intégrale et équation différentielle"}, ex4:{theme:"Géométrie",sousTh:"Théorème de Thalès et applications"} },
    { ex1:{theme:"Analyse",sousTh:"f(x)=x·arctan(x)-½·ln(1+x²)",typeFunc:"arctan_ln"}, ex2:{theme:"Complexes",sousTh:"Formulaire complexes — récapitulatif"}, ex3:{theme:"Probabilités",sousTh:"Convergence en probabilité"}, ex4:{theme:"Géométrie",sousTh:"Géométrie vectorielle — repère affine"} },
    { ex1:{theme:"Analyse",sousTh:"Sujet de concours final — fonction avec paramètre",typeFunc:"final"}, ex2:{theme:"Complexes",sousTh:"Concours final — complexes"}, ex3:{theme:"Probabilités",sousTh:"Concours final — probabilités"}, ex4:{theme:"Géométrie",sousTh:"Concours final — géométrie"} },
    { ex1:{theme:"Analyse",sousTh:"Révision générale toutes notions",typeFunc:"bilan"}, ex2:{theme:"Complexes",sousTh:"Révision générale complexes"}, ex3:{theme:"Intégrales",sousTh:"Révision générale intégrales"}, ex4:{theme:"Géométrie",sousTh:"Révision générale géométrie"} },
  ],
}


function getProgrammeJour(sectionKey: string, dayNum: number) {
  const prog = PROGRAMME_JOUR[sectionKey]
  if (!prog) return null
  const idx = (dayNum - 1) % prog.length  // 0-indexed, cyclique
  return prog[idx]
}

// ── Types ──────────────────────────────────────────────────────────
interface Candidat {
  nom: string; prenom: string; lycee: string
  gouvernorat: string; section: string; sectionKey: string
  email?: string
}

interface Exercise {
  num: number; title: string; theme: string; points: number
  statement: string; graph?: string
}

interface BacExam {
  id: string; day: number; date: string
  section: string; sectionKey: string
  duration: number; totalPoints: number
  exercises: Exercise[]
  // alias pour buildCorrectionHtml
  title: string; index?: number
}

interface AnalysisResult {
  estimatedScore: number; maxScore: number
  weakAreas: { theme:string; severity:'critical'|'moderate'|'good'; description:string; priority:number }[]
  strengths: string[]
  globalAdvice: string[]
  remediationExercises: {
    id:string; theme:string; difficulty:'introductory'|'standard'|'advanced'
    objective:string; statement:string; hint:string; officialCorrection:string; graph?:string
  }[]
}

interface RankingEntry {
  nom: string; prenom: string; lycee: string; gouvernorat: string
  section: string; sectionKey: string; score: number; maxScore: number
  day: number; date: string; ts: number
}

type Phase = 'inscription'|'generating'|'exam'|'correction'|'analysing'|'analysis'|'statistiques'

// ── LocalStorage helpers ──────────────────────────────────────────
function saveRanking(entry: RankingEntry) {
  try {
    const all: RankingEntry[] = JSON.parse(localStorage.getItem('bb_ranking')||'[]')
    all.push(entry)
    // garder les 500 derniers
    if (all.length > 500) all.splice(0, all.length - 500)
    localStorage.setItem('bb_ranking', JSON.stringify(all))
  } catch {}
}

function getRanking(): RankingEntry[] {
  try { return JSON.parse(localStorage.getItem('bb_ranking')||'[]') }
  catch { return [] }
}

function saveVisit() {
  try {
    const v = parseInt(localStorage.getItem('bb_visits')||'0') + 1
    localStorage.setItem('bb_visits', String(v))
  } catch {}
}

function getStats() {
  try {
    const ranking = getRanking()
    const visits = parseInt(localStorage.getItem('bb_visits')||'0')
    const byGov: Record<string,number> = {}
    const byDay: Record<number, RankingEntry[]> = {}
    ranking.forEach(r => {
      byGov[r.gouvernorat] = (byGov[r.gouvernorat]||0) + 1
      if (!byDay[r.day]) byDay[r.day] = []
      byDay[r.day].push(r)
    })
    return { visits, ranking, byGov, byDay, totalParticipants: ranking.length }
  } catch { return { visits:0, ranking:[], byGov:{}, byDay:{}, totalParticipants:0 } }
}

// ── API Claude ────────────────────────────────────────────────────
async function askClaude(prompt: string, system: string, maxTokens = 5000): Promise<string> {
  const r = await fetch('/api/anthropic', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514', max_tokens: maxTokens, system,
      messages: [{ role:'user', content:prompt }],
    }),
  })
  if (!r.ok) { const e = await r.json().catch(()=>({})); throw new Error(e.error||`HTTP ${r.status}`) }
  const d = await r.json()
  return d.content?.map((b:any)=>b.type==='text'?b.text:'').join('') || ''
}

function parseJSON<T>(raw: string, fallback: T): T {
  const cleaned = raw.replace(/```json\s*/g,'').replace(/```\s*/g,'').trim()
  try { return JSON.parse(cleaned) }
  catch {
    try {
      const blocks: string[] = []
      let rep = cleaned.replace(/\[GRAPH:\s*(\{(?:[^{}]|\{[^{}]*\})*\})\]/g, (_m:string, j:string) => {
        blocks.push(j); return `__G_${blocks.length-1}__`
      })
      const parsed = JSON.parse(rep)
      const ri = (s:string) => s.replace(/__G_(\d+)__/g, (_m:string,i:string)=>`[GRAPH: ${blocks[Number(i)]}]`)
      if (parsed?.exercises) parsed.exercises = parsed.exercises.map((ex:any)=>({...ex, statement:ex.statement?ri(ex.statement):ex.statement}))
      return parsed as T
    } catch { return fallback }
  }
}

// ── sanitizeExpr (identique simulation) ──────────────────────────
function sanitizeExpr(expr: string): string {
  let e = expr
    .replace(/x\^4/g,'x*x*x*x').replace(/x\^3/g,'x*x*x').replace(/x\^2/g,'x*x')
    .replace(/x\^(-?\d+)/g,(_,n)=>`Math.pow(x,${n})`)
    .replace(/\(([^)]+)\)\^(\d+)/g,(_,b,p)=>`Math.pow(${b},${p})`)
    .replace(/(\d)(x)/g,'$1*$2')
    .replace(/\bpi\b/gi,'Math.PI').replace(/π/g,'Math.PI')
  const fns:[RegExp,string][]=[
    [/(?<![a-zA-Z0-9_.])ln\s*\(/g,'Math.log('],
    [/(?<![a-zA-Z0-9_.])log\s*\(/g,'Math.log10('],
    [/(?<![a-zA-Z0-9_.])sin\s*\(/g,'Math.sin('],
    [/(?<![a-zA-Z0-9_.])cos\s*\(/g,'Math.cos('],
    [/(?<![a-zA-Z0-9_.])tan\s*\(/g,'Math.tan('],
    [/(?<![a-zA-Z0-9_.])sqrt\s*\(/g,'Math.sqrt('],
    [/(?<![a-zA-Z0-9_.])abs\s*\(/g,'Math.abs('],
    [/(?<![a-zA-Z0-9_.])exp\s*\(/g,'Math.exp('],
  ]
  for(const [re,repl] of fns) e=e.replace(re,repl)
  e=e.replace(/(?<![a-zA-Z0-9_.])e(?![a-zA-Z0-9_(])/g,'Math.E')
  return e
}

// ── graphToSvg (identique simulation) ─────────────────────────────
function graphToSvg(jsonStr: string): string {
  try {
    const sp = JSON.parse(jsonStr)
    const GC = ['#6366f1','#10b981','#f59e0b','#ec4899','#06b6d4']
    const esc2 = (s: string) => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    const proj3 = (p: any) => ({ x:(p.x||0)+((p.z)||0)*0.4, y:(p.y||0)+((p.z)||0)*0.3 })

    if (sp.type === 'function') {
      const FW=520,FH=260,FP=46
      const fxMin:number=sp.xMin??-5, fxMax:number=sp.xMax??5, FN=300
      const allFY:number[]=[]
      const fnData:(number[])[] = (sp.expressions as string[]||[]).map((expr:string)=>{
        const row:number[]=[]
        for(let i=0;i<=FN;i++){
          const x=fxMin+(i/FN)*(fxMax-fxMin)
          try{ const fn2=new Function('x','Math',`try{return(${sanitizeExpr(expr)})}catch(e){return null}`)
            const y:number|null=fn2(x,Math); if(y!==null&&isFinite(y)&&Math.abs(y)<1e5){row.push(y);allFY.push(y)}else row.push(NaN)
          }catch{row.push(NaN)}
        }; return row
      })
      const fyMin=(allFY.length?Math.min(...allFY.filter(isFinite)):-3)-0.5
      const fyMax=(allFY.length?Math.max(...allFY.filter(isFinite)):5)+0.5
      const ftx=(x:number)=>FP+((x-fxMin)/(fxMax-fxMin))*(FW-2*FP)
      const fty=(y:number)=>FH-FP-((y-fyMin)/(fyMax-fyMin))*(FH-2*FP)
      let fpaths='',fleg=''
      fnData.forEach((row,fi)=>{
        const fc=GC[fi%GC.length]; let fd=''
        for(let i=0;i<=FN;i++){const y=row[i],x=fxMin+(i/FN)*(fxMax-fxMin); if(!isNaN(y)&&isFinite(y))fd+=(fd===''?'M':'L')+ftx(x).toFixed(1)+','+fty(y).toFixed(1)+' '; else fd+=' '}
        fpaths+='<path d="'+fd+'" fill="none" stroke="'+fc+'" stroke-width="2.5"/>'
        const lbl=(sp.labels as string[])?.[fi]||(sp.expressions as string[])[fi]
        fleg+='<text x="'+(FP+fi*140)+'" y="15" fill="'+fc+'" font-size="11" font-family="monospace">'+esc2(lbl)+'</text>'
      })
      const fox=ftx(0).toFixed(1),foy=fty(0).toFixed(1)
      const fax='<line x1="'+FP+'" y1="'+foy+'" x2="'+(FW-FP)+'" y2="'+foy+'" stroke="#555" stroke-width="1.2"/>'
        +'<line x1="'+fox+'" y1="'+FP+'" x2="'+fox+'" y2="'+(FH-FP)+'" stroke="#555" stroke-width="1.2"/>'
        +'<text x="'+(FW-FP+6)+'" y="'+(Number(foy)+4)+'" fill="#888" font-size="12" font-style="italic">x</text>'
        +'<text x="'+(Number(fox)+5)+'" y="'+(FP-4)+'" fill="#888" font-size="12" font-style="italic">y</text>'
      const fttl=sp.title?'<text x="'+(FW/2)+'" y="'+(FH-4)+'" fill="#aaa" font-size="11" text-anchor="middle">'+esc2(String(sp.title))+'</text>':''
      return '<div style="margin:12px 0;border-radius:10px;overflow:hidden;border:1px solid rgba(99,102,241,0.3);display:inline-block">'
        +(fleg?'<svg width="'+FW+'" height="20" style="background:#0a0a18;display:block">'+fleg+'</svg>':'')
        +'<svg width="'+FW+'" height="'+FH+'" viewBox="0 0 '+FW+' '+FH+'" style="background:#0f0f1e;display:block">'+fax+fpaths+fttl+'</svg></div>'
    }

    if (sp.type === 'geometry') {
      const GW:number=sp.width||440, GH:number=sp.height||340, GP=44
      const gsh:any[]=sp.shapes||[]
      const allGX:number[]=[], allGY:number[]=[]
      const addPt=(p:any)=>{if(!p)return;const pp=proj3(p);allGX.push(pp.x);allGY.push(pp.y)}
      gsh.forEach((s:any)=>{
        if(s.points)(s.points as any[]).forEach(addPt)
        if(s.from)addPt(s.from); if(s.to)addPt(s.to)
        if(s.cx!==undefined){allGX.push(s.cx+(s.r||0));allGY.push(s.cy+(s.r||0));allGX.push(s.cx-(s.r||0));allGY.push(s.cy-(s.r||0))}
        if(s.x1!==undefined){allGX.push(s.x1,s.x2||0);allGY.push(s.y1||0,s.y2||0)}
        if(s.x!==undefined)addPt(s)
      })
      const gMg=1.5
      const gxMin=allGX.length?Math.min(...allGX)-gMg:-1, gxMax=allGX.length?Math.max(...allGX)+gMg:6
      const gyMin=allGY.length?Math.min(...allGY)-gMg:-1, gyMax=allGY.length?Math.max(...allGY)+gMg:5
      const gtx=(x:number)=>GP+((x-gxMin)/(gxMax-gxMin))*(GW-2*GP)
      const gty=(y:number)=>GH-GP-((y-gyMin)/(gyMax-gyMin))*(GH-2*GP)
      let gsvg=''; let gci=0
      for(const gs of gsh){
        const gc:string=gs.color||GC[gci++%GC.length]
        const gf:string=gs.fill||'none'
        if(gs.type==='grid'){
          for(let gx=Math.ceil(gxMin);gx<=gxMax;gx++)gsvg+='<line x1="'+gtx(gx).toFixed(1)+'" y1="'+GP+'" x2="'+gtx(gx).toFixed(1)+'" y2="'+(GH-GP)+'" stroke="#ffffff12" stroke-width="1"/>'
          for(let gy=Math.ceil(gyMin);gy<=gyMax;gy++)gsvg+='<line x1="'+GP+'" y1="'+gty(gy).toFixed(1)+'" x2="'+(GW-GP)+'" y2="'+gty(gy).toFixed(1)+'" stroke="#ffffff12" stroke-width="1"/>'
        }else if(gs.type==='axes'){
          gsvg+='<line x1="'+GP+'" y1="'+gty(0).toFixed(1)+'" x2="'+(GW-GP)+'" y2="'+gty(0).toFixed(1)+'" stroke="#ffffff55" stroke-width="1.5"/>'
            +'<line x1="'+gtx(0).toFixed(1)+'" y1="'+GP+'" x2="'+gtx(0).toFixed(1)+'" y2="'+(GH-GP)+'" stroke="#ffffff55" stroke-width="1.5"/>'
            +'<text x="'+(GW-GP+8)+'" y="'+(gty(0)+4).toFixed(1)+'" fill="#888" font-size="12" font-style="italic">x</text>'
            +'<text x="'+(gtx(0)+5).toFixed(1)+'" y="'+(GP-4)+'" fill="#888" font-size="12" font-style="italic">y</text>'
        }else if(gs.type==='triangle'&&gs.points){
          const gpts=(gs.points as any[]).map((p:any)=>gtx(p.x).toFixed(1)+','+gty(p.y).toFixed(1)).join(' ')
          gsvg+='<polygon points="'+gpts+'" fill="'+gf+'" stroke="'+gc+'" stroke-width="2"/>'
          for(const gp of gs.points as any[]){if(gp.label)gsvg+='<text x="'+(gtx(gp.x)+7).toFixed(1)+'" y="'+(gty(gp.y)-7).toFixed(1)+'" fill="'+gc+'" font-size="12" font-weight="bold">'+esc2(gp.label)+'</text>'}
        }else if(gs.type==='circle'&&gs.cx!==undefined){
          const gr:number=gs.r||1
          const gpr=Math.abs((gr/(gxMax-gxMin))*(GW-2*GP))
          gsvg+='<circle cx="'+gtx(gs.cx).toFixed(1)+'" cy="'+gty(gs.cy).toFixed(1)+'" r="'+gpr.toFixed(1)+'" fill="'+gf+'" stroke="'+gc+'" stroke-width="2"/>'
          if(gs.label)gsvg+='<text x="'+(gtx(gs.cx)+gpr+5).toFixed(1)+'" y="'+(gty(gs.cy)+4).toFixed(1)+'" fill="'+gc+'" font-size="11">'+esc2(gs.label)+'</text>'
        }else if((gs.type==='segment'||gs.type==='line')&&gs.x1!==undefined){
          const gd=(gs.dashed)?' stroke-dasharray="5,4"':''
          gsvg+='<line x1="'+gtx(gs.x1).toFixed(1)+'" y1="'+gty(gs.y1).toFixed(1)+'" x2="'+gtx(gs.x2).toFixed(1)+'" y2="'+gty(gs.y2).toFixed(1)+'" stroke="'+gc+'" stroke-width="2"'+gd+'/>'
          if(gs.label){const gmx=(gtx(gs.x1)+gtx(gs.x2))/2,gmy=(gty(gs.y1)+gty(gs.y2))/2;gsvg+='<text x="'+(gmx+5).toFixed(1)+'" y="'+(gmy-5).toFixed(1)+'" fill="'+gc+'" font-size="11">'+esc2(gs.label)+'</text>'}
        }else if(gs.type==='vector'&&gs.from&&gs.to){
          const gvx1=gtx(gs.from.x),gvy1=gty(gs.from.y),gvx2=gtx(gs.to.x),gvy2=gty(gs.to.y)
          const gang=Math.atan2(gvy2-gvy1,gvx2-gvx1),ga=9,gb2=0.5
          gsvg+='<line x1="'+gvx1.toFixed(1)+'" y1="'+gvy1.toFixed(1)+'" x2="'+gvx2.toFixed(1)+'" y2="'+gvy2.toFixed(1)+'" stroke="'+gc+'" stroke-width="2"/>'
            +'<polygon points="'+gvx2.toFixed(1)+','+gvy2.toFixed(1)+' '+(gvx2-ga*Math.cos(gang-gb2)).toFixed(1)+','+(gvy2-ga*Math.sin(gang-gb2)).toFixed(1)+' '+(gvx2-ga*Math.cos(gang+gb2)).toFixed(1)+','+(gvy2-ga*Math.sin(gang+gb2)).toFixed(1)+'" fill="'+gc+'"/>'
          if(gs.label)gsvg+='<text x="'+((gvx1+gvx2)/2+7).toFixed(1)+'" y="'+((gvy1+gvy2)/2-7).toFixed(1)+'" fill="'+gc+'" font-size="12" font-weight="bold">'+esc2(gs.label)+'</text>'
        }else if(gs.type==='point'||gs.type==='point3d'){
          const gpp=gs.type==='point3d'?proj3({x:gs.x||0,y:gs.y||0,z:gs.z||0}):{x:gs.cx||gs.x||0,y:gs.cy||gs.y||0}
          gsvg+='<circle cx="'+gtx(gpp.x).toFixed(1)+'" cy="'+gty(gpp.y).toFixed(1)+'" r="5" fill="'+gc+'"/>'
          if(gs.label)gsvg+='<text x="'+(gtx(gpp.x)+8).toFixed(1)+'" y="'+(gty(gpp.y)-8).toFixed(1)+'" fill="'+gc+'" font-size="12" font-weight="bold">'+esc2(gs.label)+'</text>'
        }
      }
      const gttl=sp.title?'<text x="'+(GW/2)+'" y="'+(GH-4)+'" fill="#aaa" font-size="11" text-anchor="middle">'+esc2(String(sp.title))+'</text>':''
      return '<div style="margin:12px 0;border-radius:10px;overflow:hidden;border:1px solid rgba(99,102,241,0.3);display:inline-block">'
        +'<svg width="'+GW+'" height="'+GH+'" viewBox="0 0 '+GW+' '+GH+'" style="background:#0f0f1e;display:block">'+gsvg+gttl+'</svg></div>'
    }
  }catch(_e){return ''}
  return ''
}

// ── textToHtml (identique simulation) ─────────────────────────────
function textToHtml(rawText: string): string {
  const esc = (s:string)=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
  const inline = (s:string)=>esc(s).replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/`(.+?)`/g,'<code>$1</code>')
  const line2html = (raw:string):string=>{
    const t=raw.trim()
    if(!t)return '<div class="spacer"></div>'
    if(t.startsWith('## '))return `<div class="ex-hdr">${inline(t.slice(3))}</div>`
    if(t.startsWith('### '))return `<div class="q-hdr">${inline(t.slice(4))}</div>`
    if(t.startsWith('> ')){const inner=t.replace(/^>\s*/,'');return inner.startsWith('**')?`<div class="result-box">${inline(inner)}</div>`:`<div class="tip-box">${inline(inner)}</div>`}
    if(t==='---')return '<hr>'
    if(/^\*\*(Concept|M.thode|Th.or.me|Rappel|D.finition)/i.test(t))return `<div class="concept">${inline(t)}</div>`
    if(/^\*\*(R.sultat|Conclusion)/i.test(t))return `<div class="result-inline">${inline(t)}</div>`
    if(/^\*\*(Bar.me|Bilan|Note)/i.test(t))return `<div class="bareme">${inline(t)}</div>`
    if(/^\*\*(Erreur|Pi.ge|Attention)/i.test(t))return `<div class="err">${inline(t)}</div>`
    if(/^\*\*(Point|Astuce|. retenir|Key)/i.test(t))return `<div class="tip-line">${inline(t)}</div>`
    if(/[✅❌💡]/.test(t))return `<div class="analysis">${inline(t)}</div>`
    if(/^[-•]\s*[Éé]tape\s*\d/i.test(t)||/^[Éé]tape\s*\d/i.test(t))return `<div class="step">${inline(t)}</div>`
    if(t.startsWith('- ')||t.startsWith('• '))return `<div class="bullet">${inline(t.slice(2))}</div>`
    return `<p>${inline(t)}</p>`
  }
  const GTAG='[GRAPH:'
  const parts:string[]=[]
  let gp=0
  while(gp<rawText.length){
    const gi=rawText.indexOf(GTAG,gp)
    if(gi===-1){parts.push(rawText.slice(gp).split('\n').map(line2html).join('\n'));break}
    if(gi>gp)parts.push(rawText.slice(gp,gi).split('\n').map(line2html).join('\n'))
    const jgs=rawText.indexOf('{',gi+GTAG.length)
    if(jgs===-1){parts.push(rawText.slice(gi).split('\n').map(line2html).join('\n'));break}
    let gd=0,gjj=jgs
    while(gjj<rawText.length){if(rawText[gjj]==='{')gd++;else if(rawText[gjj]==='}'){gd--;if(gd===0)break};gjj++}
    const gcb=rawText.indexOf(']',gjj)
    const svg=graphToSvg(rawText.slice(jgs,gjj+1))
    parts.push(svg||'<div style="padding:8px 14px;background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.2);border-radius:8px;font-size:11px;color:#fcd34d;margin:8px 0">📊 Figure mathématique</div>')
    gp=(gcb!==-1?gcb:gjj)+1
  }
  return parts.join('\n')
}

// ── buildCorrectionHtml (identique simulation) ────────────────────
function buildCorrectionHtml(exam: BacExam, correctionText: string, studentAnswers: string, candidat?: Candidat): string {
  const C = { ex:['#6366f1','#10b981','#f59e0b','#8b5cf6','#06b6d4'], exBg:['#1e1b4b','#052e16','#431407','#2e1065','#082f49'], exTx:['#a5b4fc','#6ee7b7','#fcd34d','#c4b5fd','#67e8f9'] }
  let exIdx = -1
  const esc = (s:string)=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
  const bodyHtml = textToHtml(correctionText)
  const answersHtml = studentAnswers.trim().length > 10
    ? `<details class="answers-block" open><summary>Réponses de l\'élève</summary><pre>${esc(studentAnswers)}</pre></details>` : ''
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');
    *{box-sizing:border-box;margin:0;padding:0} html{background:#0c0c1a}
    body{font-family:'Inter','Segoe UI',system-ui,sans-serif;background:#0c0c1a;color:#e2e8f0;font-size:13.5px;line-height:1.8;-webkit-print-color-adjust:exact;print-color-adjust:exact}
    .wrap{max-width:860px;margin:0 auto;padding:32px 40px 80px}
    .print-bar{position:sticky;top:0;z-index:99;background:#0c0c1a;border-bottom:1px solid rgba(255,255,255,.1);padding:10px 0 14px;margin-bottom:20px;display:flex;align-items:center;gap:12px}
    .print-btn{background:linear-gradient(135deg,#6366f1,#8b5cf6);color:white;border:none;border-radius:8px;padding:10px 24px;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit}
    .print-hint{font-size:11.5px;color:rgba(255,255,255,.4);max-width:500px;line-height:1.5}
    .doc-title{background:linear-gradient(135deg,#1e1b4b,#2e1065);border:1px solid #6366f1;border-radius:12px;padding:22px 28px;margin-bottom:28px;text-align:center}
    .doc-title h1{font-size:20px;font-weight:900;color:#fff;margin-bottom:6px}
    .doc-title .sub{color:#a5b4fc;font-size:12px}
    .ex-hdr{border-radius:8px;padding:14px 20px;margin:32px 0 16px;font-size:16px;font-weight:800;background:#1e1b4b;border-left:5px solid #6366f1;color:#a5b4fc;page-break-before:always}
    .ex-hdr:first-of-type{page-break-before:avoid}
    .q-hdr{border-radius:0 6px 6px 0;padding:8px 14px;margin:14px 0 8px;font-size:13px;font-weight:700;border-left:3px solid #6366f1;background:#1e1b4b88;color:#a5b4fc}
    .concept{background:#1e3254;border-left:3px solid #60a5fa;border-radius:0 6px 6px 0;padding:10px 14px;color:#bfdbfe;font-size:12.5px;margin:8px 0}
    .step{padding:5px 12px 5px 26px;margin:3px 0;color:#e2e8f0;font-size:12.5px;position:relative}
    .step::before{content:'→';position:absolute;left:8px;color:#6366f1;font-weight:900}
    .result-box{border:2px solid #10b981;background:#052e16;border-radius:8px;padding:12px 18px;margin:14px 0;color:#6ee7b7;font-weight:700;font-size:13.5px}
    .result-inline{background:#052e16;border:1px solid #10b981;border-radius:6px;padding:8px 14px;color:#6ee7b7;font-weight:700;margin:8px 0}
    .bareme{background:#2e1065;border-radius:6px;padding:7px 14px;color:#c4b5fd;font-size:12px;margin:6px 0}
    .err{background:#450a0a;border-left:3px solid #ef4444;border-radius:0 6px 6px 0;padding:8px 14px;color:#fca5a5;font-size:12px;margin:6px 0}
    .tip-line,.tip-box{background:#0c2340;border-left:3px solid #0ea5e9;border-radius:0 6px 6px 0;padding:8px 14px;color:#7dd3fc;font-size:12px;margin:6px 0}
    .analysis{background:rgba(255,255,255,.04);border-radius:5px;padding:5px 12px;margin:3px 0;font-size:12.5px}
    .bullet{padding:3px 0 3px 20px;color:#cbd5e1;font-size:12.5px;position:relative}
    .bullet::before{content:'›';position:absolute;left:6px;color:#6366f1;font-weight:700}
    p{color:#cbd5e1;font-size:12.5px;margin:4px 0} hr{border:0;border-top:1px solid rgba(255,255,255,.1);margin:14px 0}
    strong{color:#f1f5f9;font-weight:700} code{background:rgba(255,255,255,.1);padding:1px 6px;border-radius:4px;font-family:monospace;font-size:.9em}
    .spacer{height:6px}
    .answers-block{background:#1e3a5f;border:1px solid #3b82f6;border-radius:10px;padding:14px 18px;margin-bottom:24px}
    .answers-block summary{font-weight:700;color:#93c5fd;cursor:pointer;font-size:13px;margin-bottom:8px}
    .answers-block pre{white-space:pre-wrap;font-family:inherit;font-size:12px;color:#cbd5e1;line-height:1.7}
    .footer{margin-top:48px;padding-top:12px;border-top:1px solid rgba(255,255,255,.08);text-align:center;color:rgba(255,255,255,.25);font-size:10.5px}
    .enonce{background:#1a1a35;border:1px solid rgba(255,255,255,.1);border-left:4px solid #f59e0b;border-radius:8px;padding:16px 18px;margin-bottom:8px;font-size:13px;color:#e2e8f0;line-height:1.8}
    .enonce-text{background:#1a1a35;border:1px solid rgba(255,255,255,.1);border-left:4px solid #f59e0b;border-radius:8px;padding:12px 18px;margin-bottom:20px;white-space:pre-wrap;font-size:13px;color:#e2e8f0;line-height:1.8}
    .candidat-bar{background:linear-gradient(135deg,rgba(245,158,11,0.15),rgba(251,191,36,0.08));border:1px solid rgba(245,158,11,0.3);border-radius:10px;padding:14px 20px;margin-bottom:20px;font-size:13px;color:#fcd34d}
    @media print{.print-bar{display:none!important}.wrap{padding:12px 20px}div[style*="border-radius:10px"][style*="inline-block"]{page-break-inside:avoid}svg{max-width:100%!important}}
  `
  const candidatBar = candidat
    ? `<div class="candidat-bar">🏆 <strong>${esc(candidat.prenom+' '+candidat.nom)}</strong> · ${esc(candidat.lycee)} · ${esc(candidat.gouvernorat)} · ${esc(candidat.section)} · Bac Blanc Jour ${exam.day}</div>`
    : ''
  const enoncesHtml = exam.exercises.map(ex =>
    `<h3 style="color:#fbbf24;font-size:14px;margin:20px 0 8px">${esc(ex.title)} — ${ex.points} pts</h3>`
    +(ex.graph&&ex.graph!=='null' ? '<div class="enonce">'+graphToSvg(ex.graph.replace(/^\[GRAPH:\s*/,'').replace(/\]$/,''))+'</div>' : '')
    +'<div class="enonce-text">'+textToHtml(ex.statement)+'</div>'
  ).join('')
  return `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><title>Bac Blanc — ${esc(exam.title)}</title><style>${css}</style></head>
<body><div class="wrap">
<div class="print-bar"><button class="print-btn" onclick="window.print()">🖨 Imprimer / PDF</button>
<span class="print-hint">Boîte d'impression → <strong style="color:rgba(255,255,255,.6)">Enregistrer en PDF</strong> · Activez <strong style="color:rgba(255,255,255,.6)">Couleurs de fond</strong></span></div>
<div class="doc-title"><h1>🏆 Bac Blanc — ${esc(exam.section)} — Jour ${exam.day}</h1>
<div class="sub">Correction IA détaillée · ${exam.totalPoints} points · ${new Date().toLocaleDateString('fr-FR')}</div></div>
${candidatBar}
<details style="margin-bottom:20px"><summary style="cursor:pointer;color:#a5b4fc;font-weight:700;font-size:13px;padding:10px 0">📋 Voir les énoncés du sujet</summary><div style="margin-top:12px">${enoncesHtml}</div></details>
${answersHtml}${bodyHtml}
<div class="footer">MathBac.AI — Bac Blanc ${esc(exam.section)} Jour ${exam.day} — ${new Date().toLocaleDateString('fr-FR')}</div>
</div></body></html>`
}

function openCorrectionPdf(exam: BacExam, correctionText: string, studentAnswers: string, candidat?: Candidat) {
  const html = buildCorrectionHtml(exam, correctionText, studentAnswers, candidat)
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const win = window.open(url, '_blank')
  if (!win) { const a=document.createElement('a');a.href=url;a.download=`BacBlanc-J${exam.day}-${exam.sectionKey}.html`;a.click() }
  setTimeout(()=>URL.revokeObjectURL(url), 10000)
}

// ── extractFirstGraph ─────────────────────────────────────────────
function extractFirstGraph(text: string): string|null {
  const tag='[GRAPH:'; const idx=text.indexOf(tag); if(idx===-1)return null
  const jsonStart=text.indexOf('{',idx+tag.length); if(jsonStart===-1)return null
  let depth=0,j=jsonStart
  while(j<text.length){if(text[j]==='{')depth++;else if(text[j]==='}'){depth--;if(depth===0)break};j++}
  const cb=text.indexOf(']',j); if(cb===-1)return null
  return text.slice(idx,cb+1)
}

// ── parseGraphSegments ────────────────────────────────────────────
function parseGraphSegments(text:string):Array<{type:'text'|'graph';content:string}>{
  const result:Array<{type:'text'|'graph';content:string}>=[]
  let i=0; const tag='[GRAPH:'
  while(i<text.length){
    const idx=text.indexOf(tag,i)
    if(idx===-1){result.push({type:'text',content:text.slice(i)});break}
    if(idx>i)result.push({type:'text',content:text.slice(i,idx)})
    const jsonStart=text.indexOf('{',idx+tag.length); if(jsonStart===-1){result.push({type:'text',content:text.slice(idx)});break}
    let depth=0,j=jsonStart
    while(j<text.length){if(text[j]==='{')depth++;else if(text[j]==='}'){depth--;if(depth===0)break};j++}
    const closeBracket=text.indexOf(']',j)
    if(closeBracket===-1){result.push({type:'text',content:text.slice(idx)});break}
    result.push({type:'graph',content:text.slice(jsonStart,j+1)})
    i=closeBracket+1
  }
  return result
}

function useScript(src:string){
  const[loaded,setLoaded]=useState(false)
  useEffect(()=>{
    if(document.querySelector(`script[src="${src}"]`)){setLoaded(true);return}
    const s=document.createElement('script');s.src=src;s.async=true;s.onload=()=>setLoaded(true);document.head.appendChild(s)
  },[src])
  return loaded
}

// ── MathGraph (identique simulation) ─────────────────────────────
function MathGraph({spec}:{spec:any}){
  const ref=useRef<HTMLDivElement>(null)
  const plotlyLoaded=useScript('https://cdn.plot.ly/plotly-2.27.0.min.js')
  const[err,setErr]=useState('')
  useEffect(()=>{
    if(!plotlyLoaded||!ref.current||!spec?.expressions?.length)return
    try{
      const W=ref.current.clientWidth||340,H=220
      const x:number[]=[]
      const xMin=spec.xMin??-5,xMax=spec.xMax??5,steps=200
      for(let k=0;k<=steps;k++)x.push(xMin+k*(xMax-xMin)/steps)
      const colors=['#6366f1','#10b981','#f59e0b','#ec4899','#06b6d4']
      const traces=spec.expressions.map((expr:string,i:number)=>{
        const safe=sanitizeExpr(expr)
        const fn=new Function('x','Math',`try{return(${safe})}catch(e){return null}`)
        const y=x.map((v:number)=>{const r=fn(v,Math);return(r===null||!isFinite(r))?null:r})
        return{x,y,type:'scatter',mode:'lines',name:spec.labels?.[i]??`f${i+1}(x)`,line:{color:colors[i%colors.length],width:2.5},connectgaps:false}
      })
      const layout={paper_bgcolor:'rgba(0,0,0,0)',plot_bgcolor:'rgba(255,255,255,0.04)',font:{color:'#e2e8f0',size:11,family:'system-ui'},title:{text:spec.title||'',font:{size:12,color:'#a5b4fc'},x:0.5},xaxis:{gridcolor:'rgba(255,255,255,0.08)',zerolinecolor:'rgba(255,255,255,0.25)',title:spec.xLabel||'x',color:'#94a3b8'},yaxis:{gridcolor:'rgba(255,255,255,0.08)',zerolinecolor:'rgba(255,255,255,0.25)',title:spec.yLabel||'y',color:'#94a3b8'},margin:{l:42,r:12,t:spec.title?36:12,b:36},legend:{font:{size:10,color:'#94a3b8'},bgcolor:'rgba(0,0,0,0)'},width:W,height:H}
      ;(window as any).Plotly.newPlot(ref.current,traces,layout,{displayModeBar:false,responsive:true})
      setErr('')
    }catch(e:any){setErr(`Tracé impossible — ${spec.expressions?.[0]||''}`)}
  },[plotlyLoaded,spec])
  if(err)return <div style={{background:'rgba(239,68,68,0.1)',border:'1px solid rgba(239,68,68,0.3)',borderRadius:8,padding:'8px 12px',fontSize:12,color:'#fca5a5',margin:'8px 0'}}>{err}</div>
  return <div ref={ref} style={{width:'100%',borderRadius:8,overflow:'hidden',margin:'8px 0'}}/>
}

// ── GeoGraph (identique simulation) ──────────────────────────────
function GeoGraph({spec}:{spec:any}){
  const vbSize=220,scale=28,cx=50,cy=160
  const tx=(x:number)=>cx+x*scale, ty=(y:number)=>cy-y*scale
  const shapes=spec.shapes||[]
  const proj3=(p:{x:number,y:number,z?:number})=>({x:p.x+(p.z||0)*0.4,y:p.y+(p.z||0)*0.3})
  const els:any[]=[]
  shapes.forEach((s:any,si:number)=>{
    switch(s.type){
      case 'axes':
        els.push(<line key={`ax${si}`} x1={tx(-1.5)} y1={ty(0)} x2={tx(8)} y2={ty(0)} stroke="rgba(255,255,255,0.3)" strokeWidth={1}/>)
        els.push(<line key={`ay${si}`} x1={tx(0)} y1={ty(-1.5)} x2={tx(0)} y2={ty(7)} stroke="rgba(255,255,255,0.3)" strokeWidth={1}/>)
        els.push(<text key={`axl${si}`} x={tx(8)+4} y={ty(0)+4} fill="rgba(255,255,255,0.5)" fontSize={10}>x</text>)
        els.push(<text key={`ayl${si}`} x={tx(0)+4} y={ty(7)-4} fill="rgba(255,255,255,0.5)" fontSize={10}>y</text>)
        break
      case 'grid':{
        const st=s.step||1
        for(let gx=-1;gx<=8;gx+=st)els.push(<line key={`gx${si}_${gx}`} x1={tx(gx)} y1={ty(-1.5)} x2={tx(gx)} y2={ty(7)} stroke="rgba(255,255,255,0.05)" strokeWidth={0.5}/>)
        for(let gy=-1;gy<=7;gy+=st)els.push(<line key={`gy${si}_${gy}`} x1={tx(-1.5)} y1={ty(gy)} x2={tx(8)} y2={ty(gy)} stroke="rgba(255,255,255,0.05)" strokeWidth={0.5}/>)
        break}
      case 'triangle':{
        const pts=s.points||[]
        if(pts.length>=3){
          const d=pts.map((p:any,i:number)=>`${i===0?'M':'L'}${tx(p.x)},${ty(p.y)}`).join(' ')+'Z'
          els.push(<path key={`tri${si}`} d={d} fill={s.fill||'rgba(99,102,241,0.15)'} stroke={s.color||'#6366f1'} strokeWidth={1.5}/>)
          pts.forEach((p:any,i:number)=>{if(p.label)els.push(<text key={`trl${si}_${i}`} x={tx(p.x)+(p.x<1?-14:8)} y={ty(p.y)+(p.y<1?12:-6)} fill="#a5b4fc" fontSize={11} fontWeight={700}>{p.label}</text>)})
        }
        break}
      case 'circle':
        els.push(<circle key={`ci${si}`} cx={tx(s.cx||0)} cy={ty(s.cy||0)} r={(s.r||1)*scale} fill={s.fill||'rgba(99,102,241,0.1)'} stroke={s.color||'#6366f1'} strokeWidth={1.5}/>)
        if(s.label)els.push(<text key={`cil${si}`} x={tx(s.cx||0)+6} y={ty(s.cy||0)-6} fill="#a5b4fc" fontSize={11}>{s.label}</text>)
        break
      case 'segment':case 'line':
        els.push(<line key={`seg${si}`} x1={tx(s.x1||0)} y1={ty(s.y1||0)} x2={tx(s.x2||0)} y2={ty(s.y2||0)} stroke={s.color||'#6366f1'} strokeWidth={1.5} strokeDasharray={s.dashed?'4,3':undefined}/>)
        if(s.label){const mx=(tx(s.x1||0)+tx(s.x2||0))/2,my=(ty(s.y1||0)+ty(s.y2||0))/2;els.push(<text key={`segl${si}`} x={mx+4} y={my-4} fill="#94a3b8" fontSize={10}>{s.label}</text>)}
        break
      case 'vector':{
        const fx=tx(s.from?.x||0),fy=ty(s.from?.y||0),ttx2=tx(s.to?.x||0),tty2=ty(s.to?.y||0)
        const ang=Math.atan2(tty2-fy,ttx2-fx),aLen=8
        const ax1=ttx2-aLen*Math.cos(ang-0.4),ay1=tty2-aLen*Math.sin(ang-0.4)
        const ax2=ttx2-aLen*Math.cos(ang+0.4),ay2=tty2-aLen*Math.sin(ang+0.4)
        els.push(<line key={`vec${si}`} x1={fx} y1={fy} x2={ttx2} y2={tty2} stroke={s.color||'#10b981'} strokeWidth={2}/>)
        els.push(<polygon key={`veca${si}`} points={`${ttx2},${tty2} ${ax1},${ay1} ${ax2},${ay2}`} fill={s.color||'#10b981'}/>)
        if(s.label)els.push(<text key={`vecl${si}`} x={ttx2+6} y={tty2-6} fill={s.color||'#10b981'} fontSize={11} fontWeight={700}>{s.label}</text>)
        break}
      case 'point':{
        const px=tx(s.cx??s.x??0),py=ty(s.cy??s.y??0)
        els.push(<circle key={`pt${si}`} cx={px} cy={py} r={4} fill={s.color||'#f59e0b'}/>)
        if(s.label)els.push(<text key={`ptl${si}`} x={px+6} y={py-6} fill="#fbbf24" fontSize={11} fontWeight={700}>{s.label}</text>)
        break}
      default: break
    }
  })
  return(
    <div style={{margin:'8px 0',background:'rgba(255,255,255,0.03)',borderRadius:8,padding:6,textAlign:'center'}}>
      {spec.title&&<div style={{fontSize:11,color:'#a5b4fc',marginBottom:4,fontWeight:600}}>{spec.title}</div>}
      <svg viewBox={`0 0 ${vbSize} ${vbSize}`} style={{width:'100%',maxWidth:280,height:'auto'}}>{els}</svg>
    </div>
  )
}

function SmartGraph({spec}:{spec:any}){if(!spec?.type)return null;if(spec.type==='geometry')return <GeoGraph spec={spec}/>;return <MathGraph spec={spec}/>}

function TextWithGraphs({text}:{text:string}){
  if(!text)return null
  const segs=parseGraphSegments(text)
  return(
    <div>
      {segs.map((s,i)=>{
        if(s.type==='text')return <span key={i} style={{whiteSpace:'pre-wrap'}}>{s.content}</span>
        try{const spec=JSON.parse(s.content);return <SmartGraph key={i} spec={spec}/>}
        catch{return <span key={i} style={{color:'#ef4444',fontSize:11}}>[Graphique invalide]</span>}
      })}
    </div>
  )
}

// ── MD (identique simulation) ─────────────────────────────────────
function MD({text}:{text:string}){return <TextWithGraphs text={text}/>}

// ── PrimaryBtn (identique simulation) ────────────────────────────
function PrimaryBtn({onClick,disabled=false,loading=false,children,fullWidth=false}:{onClick:()=>void;disabled?:boolean;loading?:boolean;children:React.ReactNode;fullWidth?:boolean}){
  return(
    <button onClick={onClick} disabled={disabled||loading}
      style={{display:'inline-flex',alignItems:'center',justifyContent:'center',gap:10,padding:'14px 28px',borderRadius:14,border:'none',cursor:disabled?'not-allowed':'pointer',fontSize:14,fontWeight:700,letterSpacing:'0.02em',background:disabled?'rgba(255,255,255,0.07)':'linear-gradient(135deg,#6366f1,#8b5cf6)',color:disabled?'rgba(255,255,255,0.3)':'white',boxShadow:disabled?'none':'0 8px 24px rgba(99,102,241,0.45)',width:fullWidth?'100%':'auto',transition:'all 0.2s'}}>
      {loading&&<span style={{width:16,height:16,border:'2px solid rgba(255,255,255,0.3)',borderTopColor:'white',borderRadius:'50%',animation:'spin 0.7s linear infinite',flexShrink:0}}/>}
      {children}
    </button>
  )
}

// ── correctOneExercise (identique simulation) ─────────────────────
async function correctOneExercise(exercise: Exercise, totalPoints: number, studentWork: string, examTitle: string): Promise<string> {
  const system = `Tu es un professeur correcteur du Baccalaureat tunisien, specialiste en mathematiques.
Tu rediges des corrections EXHAUSTIVES, ULTRA-DETAILLEES et PEDAGOGIQUES.
Ne resume JAMAIS une etape. Developpe TOUT. L'eleve doit comprendre sans autre ressource.
Tu as suffisamment de tokens pour tout rediger. Ne t'arrete JAMAIS avant la fin. Ne dis JAMAIS "je vais resumer" ou "et ainsi de suite". Redige CHAQUE etape jusqu'au bout sans exception.
Utilise markdown : ### pour les parties, **gras** pour les resultats, > pour les points importants.

GRAPHIQUES MATHEMATIQUES — INSTRUCTIONS COMPLETES :

═══ TYPE 1 : COURBES DE FONCTIONS (Plotly) ═══
[GRAPH: {"type":"function","expressions":["2*x*x*x - 6*x*x + 3*x + 1","(6*x*x - 12*x + 3)/3"],"xMin":-2,"xMax":4,"labels":["f(x)","g(x)"],"title":"Courbes","xLabel":"x","yLabel":"y"}]
RÈGLES JS : JAMAIS x^2 → x*x | JAMAIS x^3 → x*x*x | JAMAIS 2x → 2*x | fractions : (num)/(den)

═══ TYPE 2 : FIGURES GÉOMÉTRIQUES (SVG) ═══
[GRAPH: {"type":"geometry","title":"Titre","shapes":[...]}]
FORMES DISPONIBLES : circle, triangle, polygon, segment, line, vector, angle, arc, point, axes, grid, dimension, median, altitude, bisector, function_on_geo
STRICTEMENT INTERDIT : "line3d", "point3d", "segment3d"

QUAND UTILISER (OBLIGATOIRE dans la correction) :
- Étude de fonction → [GRAPH: type "function"] courbe + points remarquables
- Géométrie plane → [GRAPH: type "geometry"] figure complète avec labels
- Complexes → [GRAPH: type "geometry"] plan complexe avec affixes
- Suites → [GRAPH: type "function"] courbe u_n + asymptote
- Place le [GRAPH: ...] juste APRÈS l'explication théorique, AVANT les calculs

NOTATION MATHEMATIQUE OBLIGATOIRE — REGLES ABSOLUES :
Utilise UNIQUEMENT ces notations Unicode — JAMAIS de LaTeX brut ($, \\frac, \\sqrt, ^, _) :

EXPOSANTS — RÈGLE ABSOLUE : toujours e^(expr) avec parenthèses :
  e^(x/2)  e^(-x)  e^(2x+1)  e^(-0.5x)
  JAMAIS : eˣ⁄²  e⁻ˣ  e^{x}  e^x/2
  f(x) = (3x-2)·e^(x/2) ← forme correcte
  Puissances de x : x²  x³  x⁴  xⁿ (Unicode superscript OK pour x seul)
  (3x-2)e^(-0,5x) → écrire exactement ainsi, avec parenthèses

INDICES (Unicode subscript uniquement) :
  uₙ  uₙ₊₁  u₀  vₙ  xₙ  aₙ  JAMAIS u_n ni u_{n+1}

DÉRIVÉES :
  f'(x)  f''(x)  g'(x)  JAMAIS f\'(x) ni f prime

FRACTIONS : écrire (a+b)/(c+d) ou notation en ligne — JAMAIS \\frac

RACINES : √x  √(x²+1)  ∛x — JAMAIS \\sqrt

VECTEURS : u⃗  v⃗  AB⃗  i⃗  j⃗  k⃗ — toujours avec ⃗ (U+20D7)
  Repère : (O ; i⃗, j⃗)  ou  (O ; i⃗, j⃗, k⃗)

COMPLEXES :
  z₁  z₂  z₃  (subscript Unicode)
  Module : |z|  Argument : arg(z)
  Forme exponentielle : r·eⁱᶿ  ou  r·e^(iθ)  JAMAIS r*e^(i*theta)
  z₁ = 2 + 2i√3  JAMAIS 2 + 2i*sqrt(3)

LOIS DE PROBABILITE :
  B(n ; p)  N(μ ; σ²)  JAMAIS N(mu,sigma^2)
  Espérance : E(X) = np   Variance : V(X) = np(1-p)

ENSEMBLES : ℝ  ℕ  ℤ  ℂ  ∈  ∉  ⊂  ∪  ∩  ∅  ∀  ∃

LOGIQUE : ⟹  ⟺  ¬

INEGALITES : ≤  ≥  ≠  ≈

INFINI : +∞  -∞  →

INTEGRALES : ∫ₐᵇ f(x)dx  ∫₀¹ xeˣdx

SOMMES : ∑ (k=1 à n)  JAMAIS \\sum_{k=1}^{n}

GREC : θ  λ  α  β  γ  δ  Δ  σ  π  ω  Ω  ε  μ`

  const withWork = studentWork.trim().length > 10
  const prompt = withWork
    ? `EXAMEN : ${examTitle}\nEXERCICE A CORRIGER : ${exercise.title} — ${exercise.points} points sur ${totalPoints}\n\nENONCE COMPLET :\n${exercise.statement}\n\nREPONSE DE L'ELEVE :\n${studentWork}\n\nRedige la correction COMPLETE de cet exercice. Structure :\n\n## ${exercise.title} — Correction detaillee (${exercise.points} pts)\n\n[Pour CHAQUE sous-question :]\n### Question X —\n**Concept utilise :** [Theoreme / formule / methode]\n**Resolution etape par etape :**\n- Etape 1 : [Action] → [Resultat]\n> **Resultat :** [Reponse finale]\n**Bareme question X :** [X] pts\n**Analyse reponse eleve :**\n✅ Correct : [ce qui est bien]\n❌ Incorrect : [ce qui est faux]\n💡 Conseil : [comment corriger]\n---\n> **Bilan ${exercise.title} :** [X]/${exercise.points} pts`
    : `EXAMEN : ${examTitle}\nEXERCICE : ${exercise.title} — ${exercise.points} points sur ${totalPoints}\n\nENONCE COMPLET :\n${exercise.statement}\n\nRedige la correction COMPLETE et EXHAUSTIVE. Structure :\n\n## ${exercise.title} — Correction complete (${exercise.points} pts)\n\n[Pour CHAQUE sous-question :]\n### Question X —\n**Concept et methode :** [Theoreme / formule — expliquer POURQUOI]\n**Demonstration complete :**\n- Etape 1 : [Action + justification] → [Calcul] = [Resultat]\n> **Resultat :** [Reponse finale]\n**Bareme :** [X] pts\n**Point pedagogique important :** [Generalisation]\n**Erreur classique :** [Piege frequent]\n---\n> **A retenir :** [Formules ou methodes cles]`

  return askClaude(prompt, system, 8000)
}

async function correctSingleExercise(exam: BacExam, exerciseIndex: number, studentWork: string): Promise<string> {
  const ex = exam.exercises[exerciseIndex]
  if (!ex) return ''
  return correctOneExercise(ex, exam.totalPoints, studentWork, exam.title)
}

// ── analyzeStudentWork (identique simulation) ─────────────────────
// Analyse UN exercice immédiatement après correction
async function analyzeOneExercise(
  exercise: Exercise,
  studentAnswer: string,
  correction: string,
  exIdx: number
): Promise<AnalysisResult> {
  const system = `Tu es un expert en remédiation mathématique. Analyse UN exercice de Bac Blanc.
RÉPONDS UNIQUEMENT EN JSON VALIDE.`
  const prompt = `Analyse cet exercice de Bac et génère une remédiation ciblée.

EXERCICE ${exIdx+1} : ${exercise.title} (${exercise.theme}, ${exercise.points} pts)
${exercise.statement.substring(0,250)}

RÉPONSE ÉLÈVE : ${studentAnswer||('(Aucune réponse)')}
CORRECTION : ${correction.substring(0,800)}

JSON requis :
{
  "estimatedScore": [0 à ${exercise.points}],
  "maxScore": ${exercise.points},
  "weakAreas": [{"theme":"${exercise.theme}","severity":"critical|moderate|good","description":"[Analyse précise]","priority":1}],
  "strengths": ["[Ce qui est bien]"],
  "globalAdvice": ["[Conseil ciblé sur ${exercise.theme}]","[Méthode à retenir]"],
  "remediationExercises": [
    {"id":"rem${exIdx}-1","theme":"${exercise.theme}","difficulty":"introductory","objective":"[Consolider la lacune]","statement":"Mini-exercice progressif sur ${exercise.theme}. 2-3 sous-questions. Minimum 60 mots.","hint":"[Indice méthodologique]","officialCorrection":"[Correction complète]"},
    {"id":"rem${exIdx}-2","theme":"${exercise.theme}","difficulty":"standard","objective":"[Approfondir]","statement":"Exercice standard sur ${exercise.theme}. Minimum 60 mots.","hint":"[Méthode]","officialCorrection":"[Correction]"}
  ]
}`
  const raw = await askClaude(prompt, system, 3000)
  return parseJSON<AnalysisResult>(raw, {
    estimatedScore:0, maxScore:exercise.points,
    weakAreas:[{theme:exercise.theme,severity:'moderate',description:'Analyse indisponible',priority:1}],
    strengths:[], globalAdvice:['Retravailler ce chapitre'],
    remediationExercises:[]
  })
}

async function analyzeStudentWork(exam: BacExam, studentWork: string, correction: string): Promise<AnalysisResult> {
  const system = `Tu es un expert en pédagogie mathématique et remédiation scolaire.\nTu analyses les travaux d'élèves et construis un plan d'amélioration personnalisé.\nNOTATION dans les exercices de remédiation : f'(x), √x, ∫, ℝ, eˣ, uₙ, z₁, u⃗, B(n;p), N(μ;σ²). JAMAIS ^ ni _ bruts.\nRÉPONDS UNIQUEMENT EN JSON VALIDE.`
  const prompt = `Analyse ce travail d'élève et génère un rapport de remédiation complet.\n\nSUJET :\n${exam.exercises.map(e=>`${e.title} (${e.theme}, ${e.points}pts) : ${e.statement.substring(0,200)}`).join('\n')}\n\nTRAVAIL ÉLÈVE :\n${studentWork || '(Aucune réponse fournie — analyser comme un élève non préparé)'}\n\nCORRECTION :\n${correction.substring(0,1200)}\n\nGénère ce JSON :\n{\n  "estimatedScore": [entre 0 et ${exam.totalPoints}, estimation réaliste],\n  "maxScore": ${exam.totalPoints},\n  "weakAreas": [\n    {"theme": "[Thème précis]","severity": "critical|moderate|good","description": "[Explication précise]","priority": [1=très urgent, 2=important, 3=secondaire]}\n  ],\n  "strengths": ["[Point fort 1]", "[Point fort 2]"],\n  "globalAdvice": ["[Conseil pratique et actionnable 1]", "[Conseil 2]", "[Conseil 3]"],\n  "remediationExercises": [\n    {"id": "rem-1","theme": "[Thème à travailler en priorité]","difficulty": "introductory|standard|advanced","objective": "[Ce que l\'élève va acquérir]","statement": "Mini-exercice complet et original avec données précises. 3 à 4 sous-questions. Minimum 80 mots.","hint": "Indication méthodologique pour commencer sans donner la réponse","officialCorrection": "Correction complète et développée, étape par étape"},\n    {"id": "rem-2","theme": "[2ème thème faible]","difficulty": "standard","objective": "...","statement": "...","hint": "...","officialCorrection": "..."},\n    {"id": "rem-3","theme": "[3ème thème faible]","difficulty": "introductory","objective": "...","statement": "...","hint": "...","officialCorrection": "..."}\n  ]\n}`
  const raw = await askClaude(prompt, system, 5000)
  return parseJSON<AnalysisResult>(raw, {
    estimatedScore:0, maxScore:exam.totalPoints,
    weakAreas:[{theme:'Général',severity:'moderate',description:'Analyse non disponible',priority:1}],
    strengths:[], globalAdvice:['Continuer à s\'entraîner régulièrement'],
    remediationExercises:[]
  })
}

// ── correctRemediationExercise (identique simulation) ─────────────
async function correctRemediationExercise(exercise: AnalysisResult['remediationExercises'][number], studentAnswer: string): Promise<string> {
  const system = `Tu es un tuteur mathématiques bienveillant mais exigeant.\nTu corriges les réponses d'élèves sur des exercices de remédiation.\nSois précis, encourageant, et identifie exactement ce qui manque.`
  return askClaude(
    `EXERCICE DE REMÉDIATION — ${exercise.theme}\nObjectif : ${exercise.objective}\n\nÉnoncé :\n${exercise.statement}\n\nRéponse de l\'élève :\n${studentAnswer || '(Aucune réponse)'}\n\nCorrection officielle :\n${exercise.officialCorrection}\n\nFournis :\n## Évaluation de la réponse\n[Ce qui est correct, ce qui est incomplet, ce qui est faux]\n\n## Correction commentée\n[Correction étape par étape avec explications]\n\n## Ce qu'il faut retenir\n[Règle, formule ou méthode clé — max 3 points essentiels]\n\n## Prochain pas\n[Une action concrète pour continuer à progresser sur ce thème]`,
    system, 2000
  )
}

// ── Génération examen Bac Blanc (distinct de simulation) ──────────
async function generateBacBlanc(candidat: Candidat, dayNum: number): Promise<BacExam> {
  const sec = SECTIONS.find(s=>s.key===candidat.sectionKey)!
  const today = new Date()
  const dateStr = `${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`
  const seed = `BAC_BLANC_CONCOURS_NATIONAL_JOUR_${dayNum}_${candidat.sectionKey}_${today.getFullYear()}`

  const system = `Tu es un auteur expert de sujets du Baccalauréat tunisien (programme CNP officiel).
Tu crées des sujets CONCOURS BAC BLANC originaux et officiels.
RÉPONDS UNIQUEMENT EN JSON VALIDE, sans backticks ni commentaires.

NOTATION MATHÉMATIQUE OBLIGATOIRE DANS LES ÉNONCÉS :

EXPOSANTS — écrire TOUJOURS avec e^(...) entre parenthèses :
  e^(x/2) et NON eˣ⁄² ni e^{x/2} ni e^x/2
  e^(-x) et NON e⁻ˣ
  e^(2x+1) et NON e²ˣ⁺¹
  f(x) = (3x-2)·e^(x/2) + 4 ← EXEMPLE CORRECT
  RÈGLE : toujours e^(expr) avec parenthèses autour de l'exposant entier

DÉRIVÉES :
  f'(x)  f''(x)  g'(x) — avec apostrophe droite

INDICES — écrire avec subscript Unicode :
  uₙ  uₙ₊₁  u₀  vₙ  xₙ — JAMAIS u_n ni u_{n+1}
  z₁  z₂  z₃ — JAMAIS z_1

VECTEURS — avec ⃗ Unicode (U+20D7) :
  u⃗  v⃗  w⃗  AB⃗  AC⃗  AD⃗ ← CORRECT
  Repère plan : (O ; i⃗, j⃗) ← CORRECT
  Repère espace : (O ; i⃗, j⃗, k⃗) ← CORRECT
  "Calculer les coordonnées des vecteurs AB⃗, AC⃗" ← CORRECT

RACINES : √x  √(2x+1)  ∛x — JAMAIS sqrt(x)
FRACTIONS : (a+b)/(c+d) — JAMAIS \frac
ENSEMBLES : ℝ  ℕ  ℤ  ℂ  ∈  ∉  ∪  ∩
GREC : θ  λ  α  β  γ  δ  Δ  σ  π  ω  ε  μ
LOIS : B(n ; p)  N(μ ; σ²) — avec point-virgule
INTÉGRALE : ∫  SOMME : ∑  INFINI : +∞  -∞`

  // Récupérer le programme du jour
  const prog = getProgrammeJour(candidat.sectionKey, dayNum)
  const ex1Theme = prog?.ex1.sousTh || sec.themes[0]
  const ex2Theme = prog?.ex2.sousTh || sec.themes[1]
  const ex3Theme = prog?.ex3.sousTh || sec.themes[2]||sec.themes[0]
  const ex4Theme = prog?.ex4.sousTh || sec.themes[3]||sec.themes[1]

  const prompt = `Crée le sujet du BAC BLANC OFFICIEL — Concours National — JOUR ${dayNum} — Section ${sec.label}.

SEED DÉTERMINISTE (pour que tous les élèves du même jour aient le même sujet) : ${seed}
DATE : ${dateStr}

═══ THÈMES OBLIGATOIRES DU JOUR ${dayNum} ═══
Exercice 1 (6 pts) — ${ex1Theme}
Exercice 2 (6 pts) — ${ex2Theme}
Exercice 3 (4 pts) — ${ex3Theme}
Exercice 4 (4 pts) — ${ex4Theme}

RÈGLES ABSOLUES :
- Sujet NOUVEAU et ORIGINAL — jamais une copie des annales
- Niveau exactement équivalent aux vrais examens Bac Tunisien officiel
- Données numériques précises et réalistes
- Durée 3h, Total 20 points
- Chaque exercice a des sous-parties numérotées 1) a) b) 2) a) b) c) etc.
- Minimum 120 mots par exercice

PRÉSENTATION DES ÉNONCÉS (format officiel Bac Tunisie) :
- Commencer par "Soit f la fonction définie sur..." ou "Dans le plan complexe..." ou "On considère..."
- Donner TOUTES les données avant les questions
- Numéroter : 1) a) b) 2) a) b) c) 3) a) b)
- Précision des hypothèses comme dans un vrai sujet officiel

GRAPHIQUES — CHAMP "graph" SÉPARÉ du "statement" :
FORMAT COURBE : [GRAPH: {"type":"function","expressions":["(2*x+1)*Math.exp(-x)+1"],"xMin":-1,"xMax":5,"labels":["f(x)"],"title":"Courbe de f"}]
FORMAT GÉO : [GRAPH: {"type":"geometry","title":"Figure","shapes":[{"type":"axes","step":1},{"type":"grid","step":1},{"type":"triangle","points":[{"x":0,"y":0,"label":"A"},{"x":4,"y":0,"label":"B"},{"x":1,"y":3,"label":"C"}],"fill":"#6366f120"}]}]
- INTERDIT dans shapes : "line3d","point3d","segment3d"
- Expressions JS : Math.exp déjà présent → NE PAS re-préfixer | JAMAIS x^2 → x*x | JAMAIS 2x → 2*x

Réponds avec CE JSON EXACT (aucun texte avant ou après) :
{
  "title": "Bac Blanc — ${sec.label} — Concours Jour ${dayNum}",
  "section": "${sec.label}",
  "duration": ${sec.duration},
  "totalPoints": 20,
  "exercises": [
    {
      "num":1,
      "title":"Exercice 1 — [Thème précis selon ${ex1Theme}]",
      "theme":"${prog?.ex1.theme||sec.themes[0]}",
      "points":6,
      "graph":"[GRAPH: {JSON_VALIDE_ICI}]",
      "statement":"Énoncé COMPLET et OFFICIEL. Commencer par définir la fonction/l'objet mathématique. Toutes les données avant les questions. Sous-parties 1) a) b) c) 2) a) b) c) 3) a) b). Minimum 200 mots. NE PAS inclure le [GRAPH] ici."
    },
    {
      "num":2,
      "title":"Exercice 2 — [Thème précis selon ${ex2Theme}]",
      "theme":"${prog?.ex2.theme||sec.themes[1]}",
      "points":6,
      "graph":"[GRAPH: {JSON_VALIDE_ICI}] ou null si pas de graphique",
      "statement":"Énoncé COMPLET. Minimum 150 mots."
    },
    {
      "num":3,
      "title":"Exercice 3 — [Thème précis selon ${ex3Theme}]",
      "theme":"${prog?.ex3.theme||sec.themes[2]||sec.themes[0]}",
      "points":4,
      "graph":null,
      "statement":"Énoncé complet. Minimum 80 mots."
    },
    {
      "num":4,
      "title":"Exercice 4 — [Thème précis selon ${ex4Theme}]",
      "theme":"${prog?.ex4.theme||sec.themes[3]||sec.themes[1]}",
      "points":4,
      "graph":null,
      "statement":"Énoncé complet. Minimum 80 mots."
    }
  ]
}`

  const raw = await askClaude(prompt, system, 5000)
  const parsed = parseJSON<Omit<BacExam,'id'|'day'|'date'|'sectionKey'|'index'>>(raw, {
    title:`Bac Blanc — ${sec.label} — Jour ${dayNum}`,
    section:sec.label, duration:sec.duration, totalPoints:20,
    exercises:[{num:1,title:'Exercice 1',theme:'Analyse',points:20,statement:'Erreur de génération — réessayez.'}]
  })
  return { ...parsed, id:`bb-j${dayNum}-${candidat.sectionKey}-${Date.now()}`, day:dayNum, date:dateStr, sectionKey:candidat.sectionKey }
}

// ════════════════════════════════════════════════════════════════════
// PAGE CLASSEMENT — 100 premiers
// ════════════════════════════════════════════════════════════════════
// ════════════════════════════════════════════════════════════════════
// PAGE STATISTIQUES — Classement + Insights + Admin
// Accès : bouton "📊 Statistiques & Classement"
// ════════════════════════════════════════════════════════════════════
function PageStatistiques({onBack}:{onBack:()=>void}){
  const [tab, setTab] = useState<'classement'|'insights'|'admin'>('classement')
  const [filterSection, setFilterSection] = useState('')
  const [filterDay, setFilterDay] = useState(0)
  const { isAdmin } = useAuth()
  // Panel admin dans PageStatistiques — garde le state local pour la saisie email
  const [adminEmail, setAdminEmail] = useState('')
  const [adminOk, setAdminOk] = useState(isAdmin)  // admin Supabase = accès direct
  const [adminErr, setAdminErr] = useState('')

  const ranking = getRanking()
  const stats = getStats()
  const today = new Date()
  const todayDay = today.getDate()

  let filtered = [...ranking]
  if (filterSection) filtered = filtered.filter(r=>r.sectionKey===filterSection)
  if (filterDay) filtered = filtered.filter(r=>r.day===filterDay)
  const top100 = filtered.sort((a,b)=>b.score-a.score).slice(0,100)
  const days = Array.from(new Set(ranking.map(r=>r.day))).sort()

  const avgScore = stats.ranking.length ? Math.round(stats.ranking.reduce((s,r)=>s+r.score/r.maxScore*100,0)/stats.ranking.length) : 0
  const topGov = Object.entries(stats.byGov).sort((a,b)=>b[1]-a[1]).slice(0,6)
  const topDay = Object.entries(stats.byDay).sort((a,b)=>b[1].length-a[1].length)[0]
  const todayEntries = stats.byDay[todayDay] || []
  const bestToday = [...todayEntries].sort((a,b)=>b.score-a.score)[0]

  const distrib = [0,0,0,0,0]
  stats.ranking.forEach(r=>{
    const p=Math.round(r.score/r.maxScore*100)
    if(p<40) distrib[0]++; else if(p<60) distrib[1]++; else if(p<75) distrib[2]++; else if(p<90) distrib[3]++; else distrib[4]++
  })

  const TABS = [
    {id:'classement' as const, label:'🏆 Classement'},
    {id:'insights'   as const, label:'📈 Insights'},
    {id:'admin'      as const, label:'🔐 Admin'},
  ]

  return(
    <div style={{minHeight:'100vh',background:'#0a0a1a',color:'white',fontFamily:'system-ui'}}>
      <Navbar/>
      <div style={{maxWidth:1100,margin:'0 auto',padding:'80px 20px 60px'}}>

        {/* Header */}
        <div style={{marginBottom:28}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:10,background:'rgba(99,102,241,0.1)',border:'1px solid rgba(99,102,241,0.3)',borderRadius:50,padding:'6px 18px',marginBottom:14}}>
            <span>📊</span><span style={{color:'#a5b4fc',fontWeight:700,fontSize:13}}>Bac Blanc — Statistiques Nationales</span>
          </div>
          <h1 style={{fontSize:28,fontWeight:900,margin:'0 0 6px'}}>Tableau de bord</h1>
          <p style={{color:'rgba(255,255,255,0.4)',fontSize:14}}>Session Mai–Juin {today.getFullYear()} · {stats.totalParticipants} participants</p>
        </div>

        {/* KPIs */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))',gap:14,marginBottom:26}}>
          {[
            {label:'Participants',   value:stats.totalParticipants, color:'#10b981', icon:'🎓'},
            {label:'Visites',        value:stats.visits,            color:'#6366f1', icon:'👀'},
            {label:'Score moyen',    value:`${avgScore}%`,          color:'#f59e0b', icon:'📊'},
            {label:'Jours actifs',   value:Object.keys(stats.byDay).length, color:'#8b5cf6', icon:'📅'},
            {label:'Meilleur aujourd\'hui', value:bestToday?`${bestToday.score}/${bestToday.maxScore}`:'—', color:'#fbbf24', icon:'🥇'},
          ].map(kpi=>(
            <div key={kpi.label} style={{background:'rgba(255,255,255,0.03)',border:`1px solid ${kpi.color}25`,borderRadius:14,padding:'18px 20px'}}>
              <div style={{fontSize:24,marginBottom:6}}>{kpi.icon}</div>
              <div style={{fontSize:28,fontWeight:900,color:kpi.color,lineHeight:1}}>{kpi.value}</div>
              <div style={{fontSize:11,color:'rgba(255,255,255,0.45)',marginTop:6}}>{kpi.label}</div>
            </div>
          ))}
        </div>

        {/* Onglets */}
        <div style={{display:'flex',gap:4,marginBottom:26,background:'rgba(255,255,255,0.04)',padding:6,borderRadius:12,border:'1px solid rgba(255,255,255,0.08)'}}>
          {TABS.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)}
              style={{flex:1,padding:'10px 12px',borderRadius:9,border:'none',cursor:'pointer',fontFamily:'inherit',
                background:tab===t.id?'rgba(99,102,241,0.25)':' transparent',
                color:tab===t.id?'#a5b4fc':'rgba(255,255,255,0.45)',fontWeight:tab===t.id?700:400,fontSize:13}}>
              {t.label}
            </button>
          ))}
        </div>

        {/* CLASSEMENT */}
        {tab==='classement'&&(
          <div>
            <div style={{display:'flex',gap:12,marginBottom:20,flexWrap:'wrap',alignItems:'center'}}>
              <select value={filterSection} onChange={e=>setFilterSection(e.target.value)}
                style={{background:'#1a1a35',border:'1px solid rgba(255,255,255,0.15)',borderRadius:8,padding:'8px 14px',color:'white',fontSize:13,outline:'none'}}>
                <option value="">Toutes les sections</option>
                {SECTIONS.map(s=><option key={s.key} value={s.key}>{s.label}</option>)}
              </select>
              <select value={filterDay} onChange={e=>setFilterDay(Number(e.target.value))}
                style={{background:'#1a1a35',border:'1px solid rgba(255,255,255,0.15)',borderRadius:8,padding:'8px 14px',color:'white',fontSize:13,outline:'none'}}>
                <option value={0}>Tous les jours</option>
                {days.map(d=><option key={d} value={d}>Jour {d}</option>)}
              </select>
              <span style={{fontSize:12,color:'rgba(255,255,255,0.3)'}}>{top100.length} candidats</span>
            </div>

            {top100.length>=3&&(
              <div style={{display:'flex',justifyContent:'center',gap:16,marginBottom:26,alignItems:'flex-end'}}>
                {[top100[1],top100[0],top100[2]].map((r,i)=>{
                  const medals=['🥈','🥇','🥉']; const heights=[118,142,108]; const colors=['#94a3b8','#fbbf24','#cd7c3a']; const rank=i===0?2:i===1?1:3
                  return(
                    <div key={i} style={{textAlign:'center',flex:1,maxWidth:200}}>
                      <div style={{fontSize:i===1?40:30,marginBottom:4}}>{medals[i]}</div>
                      <div style={{background:`${colors[i]}18`,border:`2px solid ${colors[i]}`,borderRadius:12,padding:'12px 10px',height:heights[i],display:'flex',flexDirection:'column',justifyContent:'center',gap:4}}>
                        <div style={{fontWeight:800,fontSize:13,color:'white'}}>{r.prenom} {r.nom}</div>
                        <div style={{fontSize:11,color:'rgba(255,255,255,0.5)'}}>{r.lycee}</div>
                        <div style={{fontSize:11,color:'rgba(255,255,255,0.35)'}}>{r.gouvernorat}</div>
                        <div style={{fontSize:20,fontWeight:900,color:colors[i],marginTop:4}}>{r.score}/{r.maxScore}</div>
                      </div>
                      <div style={{fontSize:12,color:colors[i],fontWeight:700,marginTop:5}}>#{rank}</div>
                    </div>
                  )
                })}
              </div>
            )}

            {top100.length>0?(
              <div style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:14,overflow:'hidden'}}>
                <div style={{display:'grid',gridTemplateColumns:'50px 1fr 1fr 120px 80px 70px',background:'rgba(255,255,255,0.05)',borderBottom:'1px solid rgba(255,255,255,0.08)',padding:'10px 16px',gap:0}}>
                  {['#','Candidat','Lycée','Section','Score','Jour'].map(h=>(
                    <div key={h} style={{fontSize:11,fontWeight:700,color:'rgba(255,255,255,0.4)',textTransform:'uppercase',letterSpacing:'0.06em'}}>{h}</div>
                  ))}
                </div>
                {top100.map((r,i)=>{
                  const sec=SECTIONS.find(s=>s.key===r.sectionKey)
                  const pct=Math.round((r.score/r.maxScore)*100)
                  const rowBg=i<3?['rgba(251,191,36,0.07)','rgba(148,163,184,0.05)','rgba(205,124,58,0.05)'][i]:'transparent'
                  return(
                    <div key={i} style={{display:'grid',gridTemplateColumns:'50px 1fr 1fr 120px 80px 70px',padding:'12px 16px',borderBottom:'1px solid rgba(255,255,255,0.04)',background:rowBg,alignItems:'center',gap:0}}>
                      <div style={{fontWeight:800,color:i<3?['#fbbf24','#94a3b8','#cd7c3a'][i]:'rgba(255,255,255,0.35)',fontSize:i<3?18:14}}>{i<3?['🥇','🥈','🥉'][i]:`#${i+1}`}</div>
                      <div><div style={{fontWeight:700,fontSize:13,color:'white'}}>{r.prenom} {r.nom}</div><div style={{fontSize:11,color:'rgba(255,255,255,0.4)'}}>{r.gouvernorat}</div></div>
                      <div style={{fontSize:12,color:'rgba(255,255,255,0.6)'}}>{r.lycee}</div>
                      <div>{sec&&<span style={{fontSize:11,padding:'3px 8px',borderRadius:50,background:`${sec.color}20`,color:sec.color,fontWeight:600}}>{sec.icon} {sec.label.split(' ')[0]}</span>}</div>
                      <div><div style={{fontWeight:800,fontSize:15,color:pct>=70?'#10b981':pct>=50?'#f59e0b':'#ef4444'}}>{r.score}/{r.maxScore}</div><div style={{fontSize:10,color:'rgba(255,255,255,0.3)'}}>{pct}%</div></div>
                      <div style={{fontSize:12,color:'rgba(255,255,255,0.4)'}}> J.{r.day}</div>
                    </div>
                  )
                })}
              </div>
            ):(
              <div style={{textAlign:'center',padding:'60px 20px',color:'rgba(255,255,255,0.3)'}}><div style={{fontSize:48,marginBottom:16}}>🏆</div><div>Aucun résultat — soyez le premier !</div></div>
            )}
          </div>
        )}

        {/* INSIGHTS */}
        {tab==='insights'&&(
          <div style={{display:'flex',flexDirection:'column',gap:20}}>
            {/* Distribution */}
            <div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:14,padding:24}}>
              <h3 style={{fontSize:15,fontWeight:700,marginBottom:18,color:'rgba(255,255,255,0.8)'}}>📊 Distribution des scores</h3>
              {[{label:'< 40%',val:distrib[0],color:'#ef4444'},{label:'40–59%',val:distrib[1],color:'#f59e0b'},{label:'60–74%',val:distrib[2],color:'#eab308'},{label:'75–89%',val:distrib[3],color:'#10b981'},{label:'≥ 90%',val:distrib[4],color:'#06b6d4'}].map(d=>{
                const total=stats.ranking.length||1; const pct=Math.round((d.val/total)*100)
                return(
                  <div key={d.label} style={{marginBottom:12}}>
                    <div style={{display:'flex',justifyContent:'space-between',marginBottom:5,fontSize:13}}><span style={{color:'rgba(255,255,255,0.7)'}}>{d.label}</span><span style={{color:d.color,fontWeight:700}}>{d.val} candidats ({pct}%)</span></div>
                    <div style={{height:10,background:'rgba(255,255,255,0.06)',borderRadius:6,overflow:'hidden'}}><div style={{height:'100%',width:`${pct}%`,background:d.color,borderRadius:6}}/></div>
                  </div>
                )
              })}
            </div>

            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}>
              <div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:14,padding:24}}>
                <h3 style={{fontSize:15,fontWeight:700,marginBottom:16,color:'rgba(255,255,255,0.8)'}}>🗺️ Top gouvernorats</h3>
                {topGov.length>0?topGov.map(([gov,count])=>{
                  const max=topGov[0][1]
                  return(<div key={gov} style={{marginBottom:12}}><div style={{display:'flex',justifyContent:'space-between',marginBottom:4,fontSize:13}}><span style={{color:'rgba(255,255,255,0.7)'}}>{gov}</span><span style={{color:'#6366f1',fontWeight:700}}>{count}</span></div><div style={{height:4,background:'rgba(255,255,255,0.08)',borderRadius:4,overflow:'hidden'}}><div style={{height:'100%',width:`${(count/max)*100}%`,background:'linear-gradient(90deg,#6366f1,#8b5cf6)',borderRadius:4}}/></div></div>)
                }):<p style={{color:'rgba(255,255,255,0.3)',fontSize:13}}>Aucun participant encore</p>}
              </div>
              <div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:14,padding:24}}>
                <h3 style={{fontSize:15,fontWeight:700,marginBottom:16,color:'rgba(255,255,255,0.8)'}}>📚 Par section</h3>
                {SECTIONS.map(sec=>{
                  const cnt=stats.ranking.filter(r=>r.sectionKey===sec.key).length
                  const avg=cnt?Math.round(stats.ranking.filter(r=>r.sectionKey===sec.key).reduce((s,r)=>s+r.score/r.maxScore*100,0)/cnt):0
                  return(<div key={sec.key} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'7px 0',borderBottom:'1px solid rgba(255,255,255,0.05)',fontSize:13}}><span style={{color:sec.color}}>{sec.icon} {sec.label.split(' ')[0]}</span><span style={{color:'rgba(255,255,255,0.6)'}}>{cnt}</span><span style={{color:'#fbbf24',fontWeight:700}}>moy. {avg}%</span></div>)
                })}
              </div>
            </div>

            {/* Evolution par jour */}
            <div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:14,padding:24}}>
              <h3 style={{fontSize:15,fontWeight:700,marginBottom:16,color:'rgba(255,255,255,0.8)'}}>📅 Évolution par jour</h3>
              <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                {Object.entries(stats.byDay).sort((a,b)=>Number(a[0])-Number(b[0])).map(([day,entries])=>{
                  const avgDay=Math.round(entries.reduce((s,r)=>s+r.score/r.maxScore*100,0)/entries.length)
                  const isToday=Number(day)===todayDay
                  return(<div key={day} style={{background:isToday?'rgba(245,158,11,0.12)':'rgba(255,255,255,0.04)',border:`1px solid ${isToday?'rgba(245,158,11,0.4)':'rgba(255,255,255,0.08)'}`,borderRadius:10,padding:'12px 16px',minWidth:90,textAlign:'center'}}><div style={{fontSize:11,color:'rgba(255,255,255,0.4)',marginBottom:4}}>Jour {day}{isToday?' ★':''}</div><div style={{fontSize:22,fontWeight:900,color:isToday?'#fbbf24':'white'}}>{entries.length}</div><div style={{fontSize:10,color:'rgba(255,255,255,0.35)'}}>candidats</div><div style={{fontSize:12,color:'#10b981',marginTop:4,fontWeight:700}}>moy. {avgDay}%</div></div>)
                })}
                {!Object.keys(stats.byDay).length&&<p style={{color:'rgba(255,255,255,0.3)',fontSize:13}}>Aucun jour actif encore</p>}
              </div>
            </div>

            {/* Insights auto */}
            <div style={{background:'rgba(99,102,241,0.06)',border:'1px solid rgba(99,102,241,0.2)',borderRadius:14,padding:24}}>
              <h3 style={{fontSize:15,fontWeight:700,marginBottom:14,color:'#a5b4fc'}}>🤖 Insights automatiques</h3>
              <div style={{display:'flex',flexDirection:'column',gap:8}}>
                {[
                  topDay?`📅 Jour le plus actif : Jour ${topDay[0]} avec ${topDay[1].length} participants`:null,
                  topGov[0]?`🗺️ Gouvernorat leader : ${topGov[0][0]} (${topGov[0][1]} candidats)`:null,
                  avgScore>=70?`✅ Bon niveau général — score moyen de ${avgScore}%`:avgScore>0?`📚 Niveau à améliorer — score moyen de ${avgScore}%`:null,
                  distrib[4]>0?`🌟 ${distrib[4]} candidat${distrib[4]>1?'s':''} ont atteint ≥ 90%`:null,
                  distrib[0]>distrib[3]+distrib[4]?`⚠️ Majorité en-dessous de 40% — renforcement nécessaire`:null,
                ].filter(Boolean).map((insight,i)=>(
                  <div key={i} style={{fontSize:13,color:'rgba(255,255,255,0.7)',padding:'8px 12px',background:'rgba(255,255,255,0.04)',borderRadius:8,borderLeft:'3px solid rgba(99,102,241,0.5)'}}>{insight}</div>
                ))}
                {stats.ranking.length===0&&<div style={{fontSize:13,color:'rgba(255,255,255,0.4)',fontStyle:'italic'}}>Les insights apparaîtront dès les premiers participants.</div>}
              </div>
            </div>
          </div>
        )}

        {/* ADMIN */}
        {tab==='admin'&&(
          <div>
            {!adminOk?(
              <div style={{maxWidth:380,margin:'0 auto'}}>
                <div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:16,padding:36,textAlign:'center'}}>
                  <div style={{fontSize:40,marginBottom:14}}>🔐</div>
                  <h2 style={{color:'white',fontWeight:800,fontSize:18,margin:'0 0 8px'}}>Espace Admin</h2>
                  <p style={{color:'rgba(255,255,255,0.4)',fontSize:13,marginBottom:24}}>Réservé au fondateur MathBac.AI</p>
                  <input value={adminEmail} onChange={e=>setAdminEmail(e.target.value)} placeholder="Email admin"
                    onKeyDown={e=>{if(e.key==='Enter'){if(adminEmail.trim().toLowerCase()===ADMIN_EMAIL){setAdminOk(true);setAdminErr('')}else setAdminErr('Email non autorisé.')}}}
                    style={{width:'100%',background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.15)',borderRadius:8,padding:'10px 14px',color:'white',fontSize:14,outline:'none',boxSizing:'border-box' as any,marginBottom:12}}/>
                  {adminErr&&<p style={{color:'#fca5a5',fontSize:13,marginBottom:12}}>{adminErr}</p>}
                  <button onClick={()=>{if(adminEmail.trim().toLowerCase()===ADMIN_EMAIL){setAdminOk(true);setAdminErr('')}else setAdminErr('Email non autorisé.')}}
                    style={{width:'100%',padding:'12px',borderRadius:9,border:'none',background:'linear-gradient(135deg,#6366f1,#8b5cf6)',color:'white',fontSize:14,fontWeight:700,cursor:'pointer'}}>
                    Accéder au tableau de bord
                  </button>
                </div>
              </div>
            ):(
              <div>
                <div style={{display:'inline-flex',alignItems:'center',gap:8,background:'rgba(16,185,129,0.1)',border:'1px solid rgba(16,185,129,0.3)',borderRadius:50,padding:'6px 16px',marginBottom:24}}>
                  <span style={{fontSize:12}}>✅</span><span style={{color:'#6ee7b7',fontWeight:700,fontSize:12}}>Connecté : {ADMIN_EMAIL}</span>
                </div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:24}}>
                  <div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:14,padding:20}}>
                    <h4 style={{fontSize:14,fontWeight:700,marginBottom:12,color:'rgba(255,255,255,0.8)'}}>📥 Export CSV</h4>
                    <button onClick={()=>{
                      const csv=['Nom,Prénom,Lycée,Gouvernorat,Section,Score,Max,Jour,Date',...stats.ranking.map(r=>`${r.nom},${r.prenom},${r.lycee},${r.gouvernorat},${r.section},${r.score},${r.maxScore},${r.day},${r.date}`)].join('\n')
                      const blob=new Blob([csv],{type:'text/csv'})
                      const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='bac-blanc-resultats.csv';a.click()
                    }} style={{width:'100%',padding:'10px',borderRadius:8,border:'1px solid rgba(16,185,129,0.3)',background:'rgba(16,185,129,0.08)',color:'#6ee7b7',fontSize:13,fontWeight:700,cursor:'pointer',fontFamily:'inherit'}}>
                      ⬇ Télécharger CSV
                    </button>
                  </div>
                  <div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:14,padding:20}}>
                    <h4 style={{fontSize:14,fontWeight:700,marginBottom:12,color:'rgba(255,255,255,0.8)'}}>🗑️ Gestion données</h4>
                    <button onClick={()=>{if(window.confirm('Effacer toutes les données ?')){localStorage.removeItem('bb_ranking');localStorage.removeItem('bb_visits');window.location.reload()}}}
                      style={{width:'100%',padding:'10px',borderRadius:8,border:'1px solid rgba(239,68,68,0.3)',background:'rgba(239,68,68,0.06)',color:'#fca5a5',fontSize:13,fontWeight:700,cursor:'pointer',fontFamily:'inherit'}}>
                      🗑 Effacer tout
                    </button>
                  </div>
                </div>
                <div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:14,padding:24}}>
                  <h3 style={{fontSize:15,fontWeight:700,marginBottom:16,color:'rgba(255,255,255,0.8)'}}>🏆 Top 10 — tous jours</h3>
                  {stats.ranking.sort((a,b)=>b.score-a.score).slice(0,10).map((r,i)=>{
                    const sec=SECTIONS.find(s=>s.key===r.sectionKey)
                    return(<div key={i} style={{display:'grid',gridTemplateColumns:'40px 1fr 140px 80px 60px',padding:'10px 0',borderBottom:'1px solid rgba(255,255,255,0.05)',alignItems:'center',fontSize:13,gap:0}}><span style={{fontWeight:800,color:i<3?['#fbbf24','#94a3b8','#cd7c3a'][i]:'rgba(255,255,255,0.4)'}}>{i<3?['🥇','🥈','🥉'][i]:`#${i+1}`}</span><div><div style={{fontWeight:700,color:'white'}}>{r.prenom} {r.nom}</div><div style={{fontSize:11,color:'rgba(255,255,255,0.4)'}}>{r.lycee} · {r.gouvernorat}</div></div>{sec&&<span style={{fontSize:11,padding:'2px 8px',borderRadius:50,background:`${sec.color}20`,color:sec.color}}>{sec.icon} {sec.label.split(' ')[0]}</span>}<span style={{fontWeight:800,color:r.score/r.maxScore>=0.7?'#10b981':r.score/r.maxScore>=0.5?'#f59e0b':'#ef4444'}}>{r.score}/{r.maxScore}</span><span style={{color:'rgba(255,255,255,0.4)',fontSize:11}}>J.{r.day}</span></div>)
                  })}
                  {!stats.ranking.length&&<p style={{color:'rgba(255,255,255,0.3)',fontSize:13}}>Aucun résultat encore</p>}
                </div>
              </div>
            )}
          </div>
        )}

        <div style={{textAlign:'center',marginTop:36}}>
          <button onClick={onBack} style={{padding:'10px 28px',borderRadius:9,border:'1px solid rgba(255,255,255,0.15)',background:'transparent',color:'rgba(255,255,255,0.6)',fontSize:13,cursor:'pointer',fontWeight:600}}>← Retour à l&apos;accueil</button>
        </div>
      </div>
      <Footer/>
    </div>
  )
}


// ════════════════════════════════════════════════════════════════════
// PHASE 1 — INSCRIPTION
// ════════════════════════════════════════════════════════════════════
function PhaseInscription({onSubmit,onStatistiques}:{onSubmit:(c:Candidat)=>void;onStatistiques:()=>void}){
  const { isAdmin } = useAuth()
  const [nom,setNom]=useState('')
  const [prenom,setPrenom]=useState('')
  const [lycee,setLycee]=useState('')
  const [gouvernorat,setGouvernorat]=useState('')
  const [sectionKey,setSectionKey]=useState('')
  const [err,setErr]=useState('')
  const today=new Date()
  const periodeStart=new Date(today.getFullYear(),4,1)
  const periodeEnd  =new Date(today.getFullYear(),5,30)
  const isInPeriode =today>=periodeStart&&today<=periodeEnd
  const isActive    =isInPeriode  // TODO prod: changer en isInPeriode seulement
  const dayNum=Math.max(1,Math.floor((today.getTime()-periodeStart.getTime())/(1000*60*60*24))+1)
  const monthNum=today.getMonth()+1
  const isMay=monthNum===5||monthNum===6
  const sec=SECTIONS.find(s=>s.key===sectionKey)

  const handleSubmit=()=>{
    if(!nom.trim()||!prenom.trim()||!lycee.trim()||!gouvernorat||!sectionKey){setErr('Veuillez remplir tous les champs.');return}
    setErr('')
    onSubmit({nom:nom.trim(),prenom:prenom.trim(),lycee:lycee.trim(),gouvernorat,section:sec!.label,sectionKey})
  }

  return(
    <div style={{minHeight:'100vh',background:'#0a0a1a',color:'white',fontFamily:'system-ui'}}>
      <Navbar/>
      <div style={{maxWidth:660,margin:'0 auto',padding:'80px 20px 40px'}}>

        {/* Hero */}
        <div style={{textAlign:'center',marginBottom:40}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:10,background:'linear-gradient(135deg,rgba(245,158,11,0.2),rgba(251,191,36,0.1))',border:'1px solid rgba(245,158,11,0.5)',borderRadius:50,padding:'8px 24px',marginBottom:20}}>
            <span style={{fontSize:22}}>🏆</span>
            <span style={{fontSize:13,fontWeight:800,color:'#fbbf24',letterSpacing:'0.1em',textTransform:'uppercase'}}>Concours National — Bac Blanc</span>
          </div>
          <h1 style={{fontSize:34,fontWeight:900,margin:'0 0 10px',background:'linear-gradient(135deg,#fbbf24,#f59e0b,#fbbf24)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>
            Bac Blanc IA
          </h1>
          <p style={{color:'rgba(255,255,255,0.5)',fontSize:15,margin:'0 0 6px'}}>
            {isMay
              ? <span>🗓 Concours Jour <strong style={{color:'#fbbf24'}}>{dayNum}</strong> · Période 1 Mai – 30 Juin — Nouveau sujet chaque jour · 61 jours de concours</span>
              : <span>Préparation au Bac — Concours actif <strong style={{color:'#f59e0b',fontWeight:700}}>en mai</strong> uniquement</span>
            }
          </p>
          {!isMay&&(
            <div style={{display:'inline-flex',alignItems:'center',gap:8,marginTop:4,
              background:'linear-gradient(135deg,rgba(245,158,11,0.12),rgba(251,191,36,0.08))',
              border:'1px solid rgba(245,158,11,0.35)',borderRadius:50,
              padding:'6px 16px'}}>
              <span style={{fontSize:14}}>📅</span>
              <span style={{fontSize:13,fontWeight:700,
                background:'linear-gradient(135deg,#fbbf24,#f59e0b)',
                WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>
                Disponible du 1er mai au 30 juin
              </span>
              <span style={{fontSize:12,color:'rgba(255,255,255,0.4)'}}>61 jours · chaque année</span>
            </div>
          )}
        </div>

        {/* Carte inscription */}
        <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:18,padding:32,marginBottom:20}}>
          <h2 style={{fontSize:18,fontWeight:700,marginBottom:24,color:'#fbbf24',display:'flex',alignItems:'center',gap:8}}>
            <span>📝</span> Fiche d'inscription
          </h2>

          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:16}}>
            <div>
                <label style={{fontSize:11,color:'rgba(255,255,255,0.5)',display:'block',marginBottom:6,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.06em'}}>Nom</label>
                <input value={nom} onChange={(e)=>setNom(e.target.value)} placeholder="BEN ALI"
                  style={{width:'100%',background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.12)',borderRadius:8,padding:'10px 14px',color:'white',fontSize:14,outline:'none',boxSizing:'border-box' as any}}/>
              </div>
              <div>
                <label style={{fontSize:11,color:'rgba(255,255,255,0.5)',display:'block',marginBottom:6,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.06em'}}>Prénom</label>
                <input value={prenom} onChange={(e)=>setPrenom(e.target.value)} placeholder="Mohamed"
                  style={{width:'100%',background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.12)',borderRadius:8,padding:'10px 14px',color:'white',fontSize:14,outline:'none',boxSizing:'border-box' as any}}/>
              </div>
          </div>

          <div style={{marginBottom:16}}>
            <label style={{fontSize:11,color:'rgba(255,255,255,0.5)',display:'block',marginBottom:6,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.06em'}}>Lycée</label>
            <input value={lycee} onChange={e=>setLycee(e.target.value)} placeholder="Lycée Sadiki"
              style={{width:'100%',background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.12)',borderRadius:8,padding:'10px 14px',color:'white',fontSize:14,outline:'none',boxSizing:'border-box' as any}}/>
          </div>

          <div style={{marginBottom:16}}>
            <label style={{fontSize:11,color:'rgba(255,255,255,0.5)',display:'block',marginBottom:8,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.06em'}}>Section</label>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
              {SECTIONS.map(s=>(
                <button key={s.key} onClick={()=>setSectionKey(s.key)}
                  style={{padding:'10px 12px',borderRadius:9,border:`2px solid ${sectionKey===s.key?s.color:'rgba(255,255,255,0.1)'}`,background:sectionKey===s.key?`${s.color}18`:'transparent',color:sectionKey===s.key?s.color:'rgba(255,255,255,0.55)',fontSize:12,fontWeight:700,cursor:'pointer',textAlign:'left',display:'flex',alignItems:'center',gap:8,transition:'all 0.2s'}}>
                  <span style={{fontSize:16}}>{s.icon}</span><span style={{lineHeight:1.2}}>{s.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div style={{marginBottom:24}}>
            <label style={{fontSize:11,color:'rgba(255,255,255,0.5)',display:'block',marginBottom:6,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.06em'}}>Gouvernorat</label>
            <select value={gouvernorat} onChange={e=>setGouvernorat(e.target.value)}
              style={{width:'100%',background:'#1a1a35',border:'1px solid rgba(255,255,255,0.12)',borderRadius:8,padding:'10px 14px',color:gouvernorat?'white':'rgba(255,255,255,0.4)',fontSize:14,outline:'none'}}>
              <option value="">— Choisir votre gouvernorat —</option>
              {GOUVERNORATS.map(g=><option key={g} value={g}>{g}</option>)}
            </select>
          </div>

          {sec&&(
            <div style={{background:`${sec.color}10`,border:`1px solid ${sec.color}30`,borderRadius:10,padding:'12px 16px',marginBottom:20,fontSize:13}}>
              <div style={{color:sec.color,fontWeight:700,marginBottom:4}}>{sec.icon} {sec.label} — Jour {dayNum}</div>
              <div style={{color:'rgba(255,255,255,0.5)',fontSize:12}}>Thèmes : {sec.themes.join(' · ')}</div>
              <div style={{color:'rgba(255,255,255,0.35)',marginTop:4,fontSize:11}}>Durée : {sec?.duration?sec.duration/60:3}h · Coeff {sec?.coeff||3} · 20 points · 4 exercices</div>
            </div>
          )}

          {err&&<div style={{background:'rgba(239,68,68,0.1)',border:'1px solid rgba(239,68,68,0.3)',borderRadius:8,padding:'10px 14px',fontSize:13,color:'#fca5a5',marginBottom:16}}>{err}</div>}

          <button onClick={handleSubmit}
            style={{width:'100%',padding:'15px',borderRadius:12,border:'none',background:'linear-gradient(135deg,#f59e0b,#fbbf24,#f59e0b)',color:'#0a0a1a',fontSize:15,fontWeight:900,cursor:'pointer',boxShadow:'0 4px 24px rgba(245,158,11,0.5)',letterSpacing:'0.03em',display:'flex',alignItems:'center',justifyContent:'center',gap:10}}>
            <span style={{fontSize:20}}>🏆</span> Commencer le Concours Jour {dayNum} · Période 1 Mai – 30 Juin
          </button>
        </div>

        {/* Actions secondaires */}
        {isAdmin && (
        <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
          <button onClick={onStatistiques}
            style={{padding:'10px 22px',borderRadius:9,border:'1px solid rgba(99,102,241,0.3)',background:'rgba(99,102,241,0.08)',color:'#a5b4fc',fontSize:13,fontWeight:700,cursor:'pointer',display:'flex',alignItems:'center',gap:6}}>
            📊 Statistiques & Classement
          </button>
        </div>
        )}

        <p style={{textAlign:'center',color:'rgba(255,255,255,0.25)',fontSize:11,marginTop:20}}>
          Chaque jour = un nouveau concours · Revenez demain pour le suivant
        </p>
      </div>
      <Footer/>
    </div>
  )
}

// ════════════════════════════════════════════════════════════════════
// PHASE 2 — GÉNÉRATION
// ════════════════════════════════════════════════════════════════════
function PhaseGenerating({candidat}:{candidat:Candidat}){
  const sec=SECTIONS.find(s=>s.key===candidat.sectionKey)!
  const msgs=['Analyse du programme officiel…','Création des exercices…','Vérification du niveau Bac…','Finalisation du concours…']
  const [msgIdx,setMsgIdx]=useState(0)
  useEffect(()=>{const t=setInterval(()=>setMsgIdx(m=>(m+1)%msgs.length),2200);return()=>clearInterval(t)},[])
  return(
    <div style={{minHeight:'100vh',background:'#0a0a1a',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:28,color:'white',fontFamily:'system-ui'}}>
      <div style={{position:'relative',width:80,height:80}}>
        <div style={{position:'absolute',inset:0,borderRadius:'50%',border:`3px solid ${sec.color}20`}}/>
        <div style={{position:'absolute',inset:0,borderRadius:'50%',border:`3px solid ${sec.color}`,borderTopColor:'transparent',animation:'spin 1s linear infinite'}}/>
        <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',fontSize:30}}>{sec.icon}</div>
      </div>
      <div style={{textAlign:'center',maxWidth:360}}>
        <div style={{fontSize:20,fontWeight:800,color:sec.color,marginBottom:10}}>Génération du Concours</div>
        <div style={{color:'rgba(255,255,255,0.6)',fontSize:15,marginBottom:6}}>{candidat.prenom} {candidat.nom} · {sec.label}</div>
        <div style={{color:'rgba(255,255,255,0.35)',fontSize:13,animation:'fadeIn 0.5s ease',transition:'all 0.4s'}}>{msgs[msgIdx]}</div>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}@keyframes fadeIn{from{opacity:0}to{opacity:1}}`}</style>
    </div>
  )
}

// ════════════════════════════════════════════════════════════════════
// PHASE 3 — EXAMEN (identique à simulation avec timer)
// ════════════════════════════════════════════════════════════════════
function PhaseExam({exam,candidat,onSubmit}:{exam:BacExam;candidat:Candidat;onSubmit:(a:string)=>void}){
  const [answers, setAnswers] = useState('')
  const [timeLeft, setTimeLeft] = useState(exam.duration*60)
  const [timerOn, setTimerOn] = useState(false)
  const [panel, setPanel] = useState<'both'|'subject'|'answer'>('both')
  const [savedMsg, setSavedMsg] = useState('')
  const [uploadMode, setUploadMode] = useState<'type'|'upload'>('type')
  const [uploadedFiles, setUploadedFiles] = useState<{name:string;content:string;type:string}[]>([])
  const [uploadError, setUploadError] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const sec = SECTIONS.find(s=>s.key===exam.sectionKey)!

  useEffect(()=>{
    if(!timerOn)return
    const id=setInterval(()=>setTimeLeft(t=>{
      if(t<=0){setTimerOn(false);if(!submitted)doSubmit();return 0}
      return t-1
    }),1000)
    return()=>clearInterval(id)
  },[timerOn,submitted])

  const fmt=(s:number)=>`${String(Math.floor(s/3600)).padStart(2,'0')}h ${String(Math.floor((s%3600)/60)).padStart(2,'0')}m ${String(s%60).padStart(2,'0')}s`
  const pctTime=(timeLeft/(exam.duration*60))*100
  const timerColor=pctTime>40?'#10b981':pctTime>15?'#f59e0b':'#ef4444'

  const doSubmit=()=>{
    if(submitted)return
    setSubmitted(true)
    const imageDesc=uploadedFiles.filter(f=>f.type==='image').map(f=>`[Image jointe : ${f.name} — photo de copie élève]`).join('\n')
    const final=[answers.trim(),imageDesc].filter(Boolean).join('\n\n')
    onSubmit(final||'')
  }

  const handleFileUpload=async(e:React.ChangeEvent<HTMLInputElement>)=>{
    const files=Array.from(e.target.files||[]) as File[]
    if(!files.length)return
    setUploadError('')
    const results:{name:string;content:string;type:string}[]=[]
    for(const file of files){
      const ext=file.name.split('.').pop()?.toLowerCase()||''
      if(['txt','md','tex'].includes(ext)||file.type.startsWith('text/')){
        const text=await file.text()
        results.push({name:file.name,content:text,type:'text'})
      }else if(file.type.startsWith('image/')){
        const dataUrl=await new Promise<string>(res=>{const r=new FileReader();r.onload=()=>res(r.result as string);r.readAsDataURL(file)})
        results.push({name:file.name,content:dataUrl,type:'image'})
      }else if(ext==='pdf'||file.type==='application/pdf'){
        results.push({name:file.name,content:'',type:'pdf'})
        setUploadError('PDF : convertissez en images ou copiez le texte.')
      }else{
        setUploadError(`Format non supporté : ${file.name}. Utilisez .txt, .jpg, .png.`)
      }
    }
    if(results.length){
      setUploadedFiles(prev=>[...prev,...results])
      const textFiles=results.filter(r=>r.type==='text')
      if(textFiles.length){
        const combined=textFiles.map(f=>`--- ${f.name} ---\n${f.content}`).join('\n\n')
        setAnswers(prev=>prev?prev+'\n\n'+combined:combined)
      }
    }
    if(fileInputRef.current)fileInputRef.current.value=''
  }

  // ── Sujet officiel PDF ────────────────────────────────────────────
  const openSubjectPdf=()=>{
    const esc=(s:string)=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    const secForPdf=SECTIONS.find(s=>s.key===exam.sectionKey)||{duration:180,coeff:3,icon:'📚'}
    const css=`
      @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600;700;900&display=swap');
      *{box-sizing:border-box;margin:0;padding:0}
      html,body{background:#fff;color:#1a1a1a;font-family:'Noto Sans','Segoe UI',Arial,sans-serif;font-size:14px;line-height:1.8}
      .wrap{max-width:780px;margin:0 auto;padding:20px 32px 60px}
      .print-bar{position:sticky;top:0;z-index:99;background:#fff;border-bottom:2px solid #1a1a2e;padding:10px 0 12px;margin-bottom:16px;display:flex;align-items:center;gap:12px}
      .print-btn{background:#1a1a2e;color:#fff;border:none;border-radius:6px;padding:9px 22px;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit}
      .header-official{border:2px solid #1a1a2e;border-radius:4px;margin-bottom:20px;overflow:hidden}
      .header-top{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;padding:14px 20px;border-bottom:1px solid #1a1a2e;gap:12px}
      .header-left{font-size:12px;line-height:1.7;color:#333}
      .header-center{text-align:center}
      .header-center .logo{font-size:30px;margin-bottom:4px}
      .header-center h1{font-size:16px;font-weight:900;color:#1a1a2e;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:2px}
      .header-center .subtitle{font-size:12px;color:#555;font-style:italic}
      .header-right{font-size:12px;line-height:1.8;color:#333;text-align:right}
      .header-bottom{background:#1a1a2e;padding:10px 20px;display:flex;justify-content:space-between;align-items:center}
      .header-bottom .section-badge{color:#fff;font-size:15px;font-weight:800;letter-spacing:0.04em;text-transform:uppercase}
      .header-bottom .meta{color:rgba(255,255,255,0.8);font-size:12px;display:flex;gap:24px}
      .candidat-box{border:1px solid #ddd;border-radius:4px;padding:10px 16px;margin-bottom:18px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;background:#fafafa}
      .candidat-field .label{color:#888;font-weight:600;text-transform:uppercase;letter-spacing:0.04em;font-size:11px;margin-bottom:2px}
      .candidat-field .value{font-weight:700;color:#1a1a2e;font-size:13px;border-bottom:1px solid #ddd;padding-bottom:2px}
      .instructions{background:#f0f4ff;border:1px solid #c7d4f5;border-left:4px solid #1a1a2e;border-radius:0 4px 4px 0;padding:10px 14px;margin-bottom:20px;font-size:12px;color:#2c2c5e}
      .instructions ul{margin:6px 0 0 18px}.instructions li{margin:3px 0}
      .exercice{margin-bottom:24px;border:1px solid #1a1a2e;border-radius:4px;overflow:hidden;page-break-inside:avoid}
      .exercice-header{background:#1a1a2e;padding:10px 18px;display:flex;justify-content:space-between;align-items:center}
      .exercice-title{color:#fff;font-size:14px;font-weight:800;letter-spacing:0.02em}
      .exercice-pts{background:rgba(255,255,255,0.2);color:#fff;font-size:12px;font-weight:700;padding:3px 10px;border-radius:12px}
      .exercice-body{padding:16px 20px;background:#fff;font-size:13px;line-height:1.9;text-align:justify}
      .footer{margin-top:32px;padding-top:12px;border-top:2px solid #1a1a2e;display:flex;justify-content:space-between;align-items:center;font-size:11px;color:#555}
      .footer-center{text-align:center;font-weight:700;color:#1a1a2e;font-size:12px}
      @media print{.print-bar{display:none!important}.wrap{padding:8px 16px}.exercice{page-break-inside:avoid}}
    `
    const exercicesHtml=exam.exercises.map(ex=>{
      const esc2=(s:string)=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      const hasG=!!(ex.graph&&ex.graph!=='null')
      return `<div class="exercice">
        <div class="exercice-header">
          <span class="exercice-title">📐 ${esc(ex.title)}</span>
          <span class="exercice-pts">${ex.points} points</span>
        </div>
        <div class="exercice-body">
          ${hasG?'<p style="color:#6366f1;font-size:12px">📊 Voir graphique dans l&#39;interface MathBac.AI</p>':''}
          <p style="white-space:pre-wrap">${esc(ex.statement)}</p>
        </div>
      </div>`
    }).join('\n')
    const html=`<!DOCTYPE html>
<html lang="fr"><head><meta charset="UTF-8"><title>Bac Blanc — ${esc(exam.section)} — Jour ${exam.day}</title><style>${css}</style></head>
<body><div class="wrap">
<div class="print-bar">
  <button class="print-btn" onclick="window.print()">🖨 Imprimer / Enregistrer en PDF</button>
  <span style="font-size:12px;color:#666">Boîte d'impression → <strong>Enregistrer en PDF</strong> · Cochez <strong>Couleurs de fond</strong></span>
</div>
<div class="header-official">
  <div class="header-top">
    <div class="header-left">
      <strong>MathBac.AI</strong><br>
      Bac Blanc — Concours National IA<br>
      <strong>Session : Mai ${new Date().getFullYear()}</strong><br>
      <span style="font-size:11px;color:#888">Sujet généré par intelligence artificielle</span>
    </div>
    <div class="header-center">
      <div class="logo">🎓</div>
      <h1>Bac Blanc — Sujet du Jour ${exam.day}</h1>
      <div class="subtitle">${esc(exam.section)}</div>
    </div>
    <div class="header-right">
      <strong>Date :</strong> ${esc(exam.date)}<br>
      <strong>Durée :</strong> ${secForPdf.duration/60}h<br>
      <strong>Coefficient :</strong> ${secForPdf.coeff}<br>
      <strong>Total :</strong> 20 points
    </div>
  </div>
  <div class="header-bottom">
    <span class="section-badge">${secForPdf.icon} ${esc(exam.section)}</span>
    <div class="meta">
      <span>🗓 Concours Jour ${exam.day}</span>
      <span>⏱ ${secForPdf.duration/60}h · Coeff ${secForPdf.coeff}</span>
      <span>📊 20 points</span>
    </div>
  </div>
</div>
<div class="candidat-box">
  <div class="candidat-field"><div class="label">Nom &amp; Prénom</div><div class="value">${esc(candidat.prenom+' '+candidat.nom)}</div></div>
  <div class="candidat-field"><div class="label">Lycée</div><div class="value">${esc(candidat.lycee)}</div></div>
  <div class="candidat-field"><div class="label">Gouvernorat</div><div class="value">${esc(candidat.gouvernorat)}</div></div>
</div>
<div class="instructions">
  <strong>Instructions générales :</strong>
  <ul>
    <li>La présentation, la lisibilité et la rigueur du raisonnement seront prises en compte.</li>
    <li>Les quatre exercices sont indépendants et peuvent être traités dans un ordre quelconque.</li>
    <li>Toute réponse non justifiée sera considérée comme nulle.</li>
  </ul>
</div>
${exercicesHtml}
<div class="footer">
  <span>MathBac.AI — Bac Blanc ${esc(exam.section)}</span>
  <span class="footer-center">Concours National — Jour ${exam.day} — ${new Date().getFullYear()}</span>
  <span>Page 1/1</span>
</div>
</div></body></html>`
    const blob=new Blob([html],{type:'text/html;charset=utf-8'})
    const url=URL.createObjectURL(blob)
    const win=window.open(url,'_blank')
    if(!win){const a=document.createElement('a');a.href=url;a.download=`BacBlanc_J${exam.day}_${exam.sectionKey}.html`;a.click()}
    setTimeout(()=>URL.revokeObjectURL(url),12000)
  }

  const hasContent=answers.trim().length>0||uploadedFiles.length>0

  return(
    <div style={{minHeight:'100vh',background:'#0a0a1a',color:'white',fontFamily:'system-ui'}}>
      {/* Header fixe */}
      <div style={{position:'sticky',top:0,zIndex:100,background:'rgba(10,10,26,0.97)',backdropFilter:'blur(16px)',borderBottom:'1px solid rgba(255,255,255,0.08)',padding:'10px 20px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:12,flexWrap:'wrap'}}>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <span style={{fontSize:22}}>🏆</span>
          <div>
            <div style={{fontWeight:800,fontSize:14,color:'#fbbf24'}}>Bac Blanc — Concours Jour {exam.day}</div>
            <div style={{fontSize:11,color:'rgba(255,255,255,0.4)'}}>{candidat.prenom} {candidat.nom} · {sec.label} · {exam.duration/60}h · Coeff {sec.coeff}</div>
          </div>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:8,flexWrap:'wrap'}}>
          {/* Switcher vue */}
          <div style={{display:'flex',borderRadius:8,border:'1px solid rgba(255,255,255,0.1)',overflow:'hidden'}}>
            {(['both','subject','answer'] as const).map(p=>(
              <button key={p} onClick={()=>setPanel(p)}
                style={{padding:'5px 10px',border:'none',background:panel===p?'rgba(255,255,255,0.12)':'transparent',color:panel===p?'white':'rgba(255,255,255,0.4)',fontSize:11,cursor:'pointer',fontWeight:panel===p?700:400}}>
                {p==='both'?'⊟ Les deux':p==='subject'?'📋 Sujet':'✍️ Réponse'}
              </button>
            ))}
          </div>
          {/* Timer */}
          {!timerOn&&!submitted&&(
            <button onClick={()=>setTimerOn(true)}
              style={{padding:'5px 12px',borderRadius:7,border:'1px solid rgba(16,185,129,0.4)',background:'rgba(16,185,129,0.1)',color:'#6ee7b7',fontSize:11,fontWeight:700,cursor:'pointer'}}>
              ▶ Démarrer chrono
            </button>
          )}
          {(timerOn||submitted)&&(
            <div style={{background:`${timerColor}18`,border:`1px solid ${timerColor}40`,borderRadius:8,padding:'5px 12px',display:'flex',alignItems:'center',gap:6}}>
              <span style={{fontSize:12}}>⏱</span>
              <span style={{fontFamily:'monospace',fontSize:18,fontWeight:800,color:timerColor}}>{fmt(timeLeft)}</span>
            </div>
          )}
          <button onClick={openSubjectPdf} style={{padding:'6px 12px',borderRadius:7,border:'1px solid rgba(255,255,255,0.15)',background:'rgba(255,255,255,0.05)',color:'rgba(255,255,255,0.8)',fontSize:11,cursor:'pointer',fontWeight:700}}>
            📄 Sujet PDF
          </button>
          <button onClick={doSubmit} disabled={submitted}
            style={{padding:'8px 18px',borderRadius:9,border:'none',background:submitted?'rgba(16,185,129,0.3)':'linear-gradient(135deg,#f59e0b,#fbbf24)',color:submitted?'#6ee7b7':'#0a0a1a',fontSize:13,fontWeight:800,cursor:submitted?'default':'pointer'}}>
            {submitted?'✓ Copie remise':'🏁 Remettre la copie'}
          </button>
        </div>
      </div>

      {/* Contenu 2 colonnes */}
      <div style={{display:'grid',gridTemplateColumns:panel==='both'?'1fr 1fr':panel==='subject'?'1fr 0':'0 1fr',minHeight:'calc(100vh - 60px)'}}>

        {/* Colonne Sujet */}
        {panel!=='answer'&&(
          <div style={{padding:'20px',borderRight:'1px solid rgba(255,255,255,0.07)',overflowY:'auto',maxHeight:'calc(100vh - 60px)'}}>
            <p style={{fontSize:11,textTransform:'uppercase',letterSpacing:'0.1em',color:'rgba(255,255,255,0.3)',marginBottom:14,fontWeight:700}}>📋 Sujet officiel</p>
            <div style={{display:'flex',flexDirection:'column',gap:14}}>
              {exam.exercises.map(ex=>(
                <div key={ex.num} style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)',borderLeft:`3px solid ${sec.color}`,borderRadius:12,padding:'16px 18px'}}>
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:10,alignItems:'center'}}>
                    <span style={{fontWeight:700,fontSize:13,color:sec.color}}>{ex.title}</span>
                    <span style={{fontFamily:'monospace',fontSize:12,color:'#fbbf24',fontWeight:700}}>{ex.points} pts</span>
                  </div>
                  {ex.graph&&ex.graph!=='null'&&<TextWithGraphs text={ex.graph}/>}
                  <TextWithGraphs text={ex.statement}/>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Colonne Réponse */}
        {panel!=='subject'&&(
          <div style={{padding:'20px',display:'flex',flexDirection:'column',gap:14,overflowY:'auto',maxHeight:'calc(100vh - 60px)'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:8}}>
              <p style={{fontSize:11,textTransform:'uppercase',letterSpacing:'0.1em',color:'rgba(255,255,255,0.3)',fontWeight:700,margin:0}}>✍️ Votre réponse</p>
              {/* Toggle tape / import */}
              <div style={{display:'flex',gap:4,background:'rgba(255,255,255,0.05)',borderRadius:8,padding:3}}>
                {(['type','upload'] as const).map(m=>(
                  <button key={m} onClick={()=>setUploadMode(m)}
                    style={{padding:'4px 12px',borderRadius:6,border:'none',background:uploadMode===m?'rgba(99,102,241,0.35)':'transparent',color:uploadMode===m?'#a5b4fc':'rgba(255,255,255,0.4)',fontSize:11,fontWeight:uploadMode===m?700:400,cursor:'pointer',fontFamily:'inherit'}}>
                    {m==='type'?'⌨️ Saisir':'📎 Importer'}
                  </button>
                ))}
              </div>
            </div>

            {/* Mode saisie — 4 exercices ensemble */}
            {uploadMode==='type'&&(
              <div style={{display:'flex',flexDirection:'column',gap:10}}>
                {exam.exercises.map(ex=>(
                  <div key={ex.num}>
                    <div style={{fontSize:11,color:'rgba(255,255,255,0.4)',marginBottom:5,fontWeight:600,display:'flex',justifyContent:'space-between'}}>
                      <span>{ex.title}</span>
                      <span style={{color:'#fbbf24'}}>{ex.points} pts</span>
                    </div>
                    <textarea
                      value={answers.split(/=== Exercice \d+ ===/)?.[ex.num]||''}
                      onChange={e=>{
                        // Stocker par exercice dans answers séparés par marqueurs
                        const parts=Array.from({length:exam.exercises.length},(_,i)=>{
                          const marker=`=== Exercice ${i+1} ===`
                          const allParts=answers.split(/=== Exercice \d+ ===/g)
                          return allParts[i+1]||''
                        })
                        parts[ex.num-1]=e.target.value
                        setAnswers(exam.exercises.map((_,i)=>`=== Exercice ${i+1} ===\n${parts[i]}`).join('\n\n'))
                      }}
                      placeholder={`Rédigez ici votre réponse à l'exercice ${ex.num}…`}
                      disabled={submitted}
                      style={{width:'100%',minHeight:110,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.09)',borderRadius:10,padding:'11px 13px',color:'white',fontSize:13,resize:'vertical',outline:'none',fontFamily:'inherit',boxSizing:'border-box' as any,opacity:submitted?0.6:1}}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Mode import */}
            {uploadMode==='upload'&&(
              <div style={{display:'flex',flexDirection:'column',gap:12}}>
                <div style={{border:'2px dashed rgba(99,102,241,0.3)',borderRadius:12,padding:'28px 20px',textAlign:'center',background:'rgba(99,102,241,0.04)'}}>
                  <div style={{fontSize:32,marginBottom:10}}>📎</div>
                  <div style={{fontSize:13,color:'rgba(255,255,255,0.7)',marginBottom:6}}>Importez votre copie</div>
                  <div style={{fontSize:11,color:'rgba(255,255,255,0.4)',marginBottom:14}}>Photo (.jpg, .png) · Texte (.txt) · Fichier scanné</div>
                  <button onClick={()=>fileInputRef.current?.click()}
                    style={{padding:'9px 22px',borderRadius:9,border:'1px solid rgba(99,102,241,0.4)',background:'rgba(99,102,241,0.15)',color:'#a5b4fc',fontSize:13,fontWeight:700,cursor:'pointer',fontFamily:'inherit'}}>
                    Choisir un fichier
                  </button>
                  <input ref={fileInputRef} type="file" multiple accept=".txt,.md,.jpg,.jpeg,.png,.gif,.webp,.pdf"
                    style={{display:'none'}} onChange={handleFileUpload}/>
                </div>
                {uploadError&&<div style={{padding:'9px 14px',background:'rgba(239,68,68,0.1)',border:'1px solid rgba(239,68,68,0.3)',borderRadius:8,fontSize:12,color:'#fca5a5'}}>{uploadError}</div>}
                {uploadedFiles.map((f,i)=>(
                  <div key={i} style={{display:'flex',gap:10,alignItems:'flex-start',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:10,padding:'10px 14px'}}>
                    <span style={{fontSize:20,flexShrink:0}}>{f.type==='image'?'🖼️':'📄'}</span>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontSize:12,fontWeight:600,color:'rgba(255,255,255,0.8)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{f.name}</div>
                      {f.type==='image'&&<img src={f.content} alt={f.name} style={{maxWidth:'100%',maxHeight:200,borderRadius:6,marginTop:8,objectFit:'contain'}}/>}
                      {f.type==='text'&&<pre style={{fontSize:11,color:'rgba(255,255,255,0.5)',marginTop:4,maxHeight:80,overflow:'hidden',fontFamily:'inherit'}}>{f.content.slice(0,200)}{f.content.length>200?'…':''}</pre>}
                    </div>
                    <button onClick={()=>setUploadedFiles(p=>p.filter((_,j)=>j!==i))} style={{background:'transparent',border:'none',color:'rgba(255,255,255,0.4)',cursor:'pointer',fontSize:16,padding:4,flexShrink:0}}>✕</button>
                  </div>
                ))}
                {/* Zone texte complémentaire */}
                <div>
                  <div style={{fontSize:11,color:'rgba(255,255,255,0.35)',marginBottom:6}}>Complément textuel (optionnel)</div>
                  <textarea value={answers} onChange={e=>setAnswers(e.target.value)}
                    placeholder="Ajoutez des explications ou notes complémentaires…"
                    style={{width:'100%',minHeight:80,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:10,padding:'10px 12px',color:'white',fontSize:13,resize:'vertical',outline:'none',fontFamily:'inherit',boxSizing:'border-box' as any}}/>
                </div>
              </div>
            )}

            {/* Bouton soumettre */}
            <button onClick={doSubmit} disabled={submitted}
              style={{padding:'13px',borderRadius:10,border:'none',background:submitted?'rgba(16,185,129,0.3)':'linear-gradient(135deg,#f59e0b,#fbbf24)',color:submitted?'#6ee7b7':'#0a0a1a',fontSize:14,fontWeight:900,cursor:submitted?'default':'pointer',marginTop:4}}>
              {submitted?'✓ Copie remise — correction en cours…':'🏁 Remettre la copie'}
            </button>
            {savedMsg&&<div style={{textAlign:'center',fontSize:12,color:'#6ee7b7'}}>{savedMsg}</div>}
          </div>
        )}
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}


// ════════════════════════════════════════════════════════════════════
// PHASE 4 — CORRECTION (IDENTIQUE SIMULATION — copie exacte)
// ════════════════════════════════════════════════════════════════════
// ════════════════════════════════════════════════════════════════════
// PAGE ANALYSE EXERCICE — Pleine page avec bouton Retour
// ════════════════════════════════════════════════════════════════════
function PageAnalyseExercice({
  analysis, exercise, exerciseNum, onBack
}: {
  analysis: AnalysisResult
  exercise: { title: string; theme: string; points: number; statement: string; graph?: string }
  exerciseNum: number
  onBack: () => void
}) {
  const [remAnswers, setRemAnswers] = useState<Record<string,string>>({})
  const [remFeedback, setRemFeedback] = useState<Record<string,string>>({})
  const [remLoading, setRemLoading] = useState<Record<string,boolean>>({})
  const [showHint, setShowHint] = useState<Record<string,boolean>>({})
  const [showOfficiel, setShowOfficiel] = useState<Record<string,boolean>>({})

  const score = analysis.estimatedScore
  const max = analysis.maxScore
  const pct = Math.round((score / max) * 100)
  const scoreColor = pct >= 70 ? '#10b981' : pct >= 40 ? '#f59e0b' : '#ef4444'
  const mention = pct >= 80 ? 'Excellent 🌟' : pct >= 60 ? 'Bien 👍' : pct >= 40 ? 'À améliorer 📚' : 'À retravailler 💪'

  const checkRem = async (rem: AnalysisResult['remediationExercises'][number]) => {
    if (remLoading[rem.id] || remFeedback[rem.id]) return
    setRemLoading(p => ({ ...p, [rem.id]: true }))
    try {
      const sys = `Tu es un tuteur mathématiques bienveillant. Corrige la réponse de l'élève sur cet exercice de remédiation. Sois précis et encourageant.`
      const prompt = `Exercice : ${rem.statement}\n\nRéponse de l'élève : ${remAnswers[rem.id] || '(Aucune réponse)'}\n\nCorrection officielle : ${rem.officialCorrection}\n\nFournis une correction commentée et encourageante :`
      const text = await askClaude(prompt, sys, 2500)
      setRemFeedback(p => ({ ...p, [rem.id]: text }))
    } catch {}
    setRemLoading(p => ({ ...p, [rem.id]: false }))
  }

  const sevColor: Record<string,string> = { critical:'#ef4444', moderate:'#f59e0b', good:'#10b981' }
  const sevLabel: Record<string,string> = { critical:'Priorité haute', moderate:'À améliorer', good:'Maîtrisé' }
  const diffColor: Record<string,string> = { introductory:'#10b981', standard:'#f59e0b', advanced:'#ef4444' }
  const diffLabel: Record<string,string> = { introductory:'Initiation', standard:'Standard', advanced:'Avancé' }

  return (
    <div style={{
      position:'fixed', inset:0, zIndex:200,
      background:'#0a0a1a', overflowY:'auto',
      fontFamily:'system-ui', color:'white',
    }}>
      {/* Header fixe */}
      <div style={{
        position:'sticky', top:0, zIndex:10,
        background:'rgba(10,10,26,0.97)', backdropFilter:'blur(16px)',
        borderBottom:'1px solid rgba(255,255,255,0.08)',
        padding:'14px 24px', display:'flex', alignItems:'center', gap:16,
      }}>
        <button onClick={onBack}
          style={{
            display:'flex', alignItems:'center', gap:8,
            padding:'9px 18px', borderRadius:9,
            border:'1px solid rgba(255,255,255,0.15)',
            background:'rgba(255,255,255,0.06)',
            color:'white', fontSize:13, fontWeight:700,
            cursor:'pointer', fontFamily:'inherit',
            transition:'all 0.2s',
          }}
          onMouseEnter={e=>{e.currentTarget.style.background='rgba(255,255,255,0.12)'}}
          onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,0.06)'}}>
          ← Retour à la correction
        </button>
        <div style={{flex:1}}>
          <div style={{fontWeight:800, fontSize:15, color:'#a5b4fc'}}>
            📊 Analyse — Exercice {exerciseNum}
          </div>
          <div style={{fontSize:12, color:'rgba(255,255,255,0.4)', marginTop:2}}>
            {exercise.title} · {exercise.theme}
          </div>
        </div>
        {/* Score compact dans le header */}
        <div style={{
          background:`${scoreColor}15`, border:`2px solid ${scoreColor}`,
          borderRadius:10, padding:'8px 16px', textAlign:'center',
        }}>
          <div style={{fontSize:24, fontWeight:900, color:scoreColor, lineHeight:1}}>
            {score}<span style={{fontSize:14, color:'rgba(255,255,255,0.4)'}}>/{max}</span>
          </div>
          <div style={{fontSize:11, color:scoreColor, marginTop:2}}>{mention}</div>
        </div>
      </div>

      {/* Contenu */}
      <div style={{maxWidth:860, margin:'0 auto', padding:'28px 20px 60px'}}>

        {/* Score visuel */}
        <div style={{
          display:'grid', gridTemplateColumns:'150px 1fr', gap:24,
          background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.08)',
          borderRadius:16, padding:'24px', marginBottom:24, alignItems:'center',
        }}>
          <div style={{textAlign:'center'}}>
            <svg width="110" height="110" style={{transform:'rotate(-90deg)'}}>
              <circle cx="55" cy="55" r="45" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="9"/>
              <circle cx="55" cy="55" r="45" fill="none" stroke={scoreColor} strokeWidth="9"
                strokeDasharray={`${(pct/100)*283} 283`} strokeLinecap="round"
                style={{transition:'stroke-dasharray 1.2s ease'}}/>
            </svg>
            <div style={{marginTop:-56, marginBottom:36}}>
              <div style={{fontSize:36, fontWeight:900, color:scoreColor}}>{score}</div>
              <div style={{fontSize:14, color:'rgba(255,255,255,0.35)'}}>/{max} pts</div>
            </div>
            <div style={{fontSize:12, fontWeight:700, color:scoreColor}}>{mention}</div>
          </div>
          <div style={{display:'flex', flexDirection:'column', gap:12}}>
            {analysis.strengths.length > 0 && (
              <div>
                <p style={{fontSize:11, fontWeight:700, color:'#6ee7b7', textTransform:'uppercase', letterSpacing:'0.08em', margin:'0 0 8px'}}>
                  💪 Points forts
                </p>
                <div style={{display:'flex', flexWrap:'wrap', gap:6}}>
                  {analysis.strengths.map((s,i) => (
                    <span key={i} style={{fontSize:12, padding:'4px 12px', background:'rgba(16,185,129,0.12)', color:'#6ee7b7', border:'1px solid rgba(16,185,129,0.25)', borderRadius:20}}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {analysis.globalAdvice.length > 0 && (
              <div>
                <p style={{fontSize:11, fontWeight:700, color:'#a5b4fc', textTransform:'uppercase', letterSpacing:'0.08em', margin:'0 0 8px'}}>
                  🎯 Conseils personnalisés
                </p>
                <div style={{display:'flex', flexDirection:'column', gap:5}}>
                  {analysis.globalAdvice.map((a,i) => (
                    <div key={i} style={{display:'flex', gap:10, alignItems:'flex-start', padding:'7px 12px', background:'rgba(99,102,241,0.08)', borderRadius:8, fontSize:12, color:'rgba(255,255,255,0.7)'}}>
                      <span style={{color:'#6366f1', fontWeight:700, flexShrink:0}}>{i+1}.</span>{a}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Zones faibles */}
        {analysis.weakAreas.length > 0 && (
          <div style={{marginBottom:24}}>
            <h3 style={{fontSize:15, fontWeight:700, color:'rgba(255,255,255,0.8)', marginBottom:12}}>
              🔍 Diagnostic par thème
            </h3>
            <div style={{display:'flex', flexDirection:'column', gap:8}}>
              {analysis.weakAreas.map((w,i) => {
                const wc = sevColor[w.severity] || '#10b981'
                return (
                  <div key={i} style={{
                    padding:'12px 16px', background:`${wc}08`,
                    borderLeft:`4px solid ${wc}`, borderRadius:'0 10px 10px 0',
                    border:`1px solid ${wc}20`,
                  }}>
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:4}}>
                      <span style={{fontWeight:700, fontSize:13, color:wc}}>{w.theme}</span>
                      <span style={{fontSize:10, background:`${wc}20`, color:wc, padding:'2px 8px', borderRadius:10, fontWeight:700}}>
                        {sevLabel[w.severity]}
                      </span>
                    </div>
                    <p style={{fontSize:12, color:'rgba(255,255,255,0.6)', lineHeight:1.6, margin:0}}>{w.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Exercices de remédiation */}
        {analysis.remediationExercises.length > 0 && (
          <div>
            <h3 style={{fontSize:15, fontWeight:700, color:'rgba(255,255,255,0.8)', margin:'0 0 6px'}}>
              🔧 Exercices de remédiation ciblés
            </h3>
            <p style={{fontSize:13, color:'rgba(255,255,255,0.4)', marginBottom:20}}>
              Exercices créés spécialement pour renforcer les lacunes de cet exercice.
            </p>
            <div style={{display:'flex', flexDirection:'column', gap:16}}>
              {analysis.remediationExercises.map((rem, i) => {
                const dc = diffColor[rem.difficulty] || '#f59e0b'
                return (
                  <div key={rem.id} style={{
                    background:'rgba(255,255,255,0.03)',
                    border:'1px solid rgba(255,255,255,0.08)',
                    borderRadius:14, overflow:'hidden',
                  }}>
                    {/* Header rem */}
                    <div style={{
                      padding:'12px 18px',
                      background:'rgba(255,255,255,0.03)',
                      borderBottom:'1px solid rgba(255,255,255,0.06)',
                      display:'flex', justifyContent:'space-between', alignItems:'center',
                    }}>
                      <div style={{display:'flex', gap:10, alignItems:'center'}}>
                        <div style={{
                          width:28, height:28, borderRadius:7,
                          background:`${dc}20`, border:`1px solid ${dc}40`,
                          display:'flex', alignItems:'center', justifyContent:'center',
                          fontWeight:800, fontSize:13, color:dc,
                        }}>{i+1}</div>
                        <div>
                          <p style={{margin:0, fontWeight:700, fontSize:13, color:'rgba(255,255,255,0.85)'}}>{rem.theme}</p>
                          <p style={{margin:0, fontSize:11, color:'rgba(255,255,255,0.4)'}}>{rem.objective}</p>
                        </div>
                      </div>
                      <span style={{fontSize:10, fontWeight:700, color:dc, background:`${dc}15`, padding:'3px 10px', borderRadius:10}}>
                        {diffLabel[rem.difficulty]}
                      </span>
                    </div>

                    {/* Corps rem */}
                    <div style={{padding:'16px 18px', display:'flex', flexDirection:'column', gap:12}}>
                      {/* Énoncé */}
                      <div style={{background:'rgba(0,0,0,0.2)', borderRadius:10, padding:'12px 14px'}}>
                        <p style={{fontSize:10, fontWeight:700, color:'rgba(255,255,255,0.3)', textTransform:'uppercase', margin:'0 0 8px'}}>Énoncé</p>
                        <TextWithGraphs text={rem.statement}/>
                      </div>

                      {/* Indice */}
                      <button onClick={()=>setShowHint(p=>({...p,[rem.id]:!p[rem.id]}))}
                        style={{alignSelf:'flex-start', fontSize:12, fontWeight:600, color:'#fbbf24', background:'rgba(251,191,36,0.08)', border:'1px solid rgba(251,191,36,0.2)', borderRadius:8, padding:'6px 14px', cursor:'pointer', fontFamily:'inherit'}}>
                        {showHint[rem.id] ? '▲ Masquer' : '💡 Voir'} l&apos;indice
                      </button>
                      {showHint[rem.id] && (
                        <div style={{padding:'10px 14px', background:'rgba(251,191,36,0.06)', border:'1px solid rgba(251,191,36,0.18)', borderRadius:8, fontSize:12, color:'rgba(255,255,255,0.7)'}}>
                          {rem.hint}
                        </div>
                      )}

                      {/* Réponse élève */}
                      {!remFeedback[rem.id] && (
                        <>
                          <textarea
                            value={remAnswers[rem.id]||''}
                            onChange={e=>setRemAnswers(p=>({...p,[rem.id]:e.target.value}))}
                            placeholder="Rédigez votre réponse ici…"
                            style={{
                              width:'100%', height:100, padding:'11px 13px',
                              borderRadius:9, border:'1px solid rgba(255,255,255,0.09)',
                              background:'rgba(0,0,0,0.2)', color:'rgba(255,255,255,0.85)',
                              fontSize:13, resize:'vertical', outline:'none',
                              fontFamily:'inherit', lineHeight:1.7, boxSizing:'border-box' as any,
                            }}/>
                          <button
                            onClick={()=>checkRem(rem)}
                            disabled={remLoading[rem.id]}
                            style={{
                              padding:'11px 22px', borderRadius:10, border:'none',
                              background:remLoading[rem.id]?'rgba(255,255,255,0.07)':'linear-gradient(135deg,#6366f1,#8b5cf6)',
                              color:remLoading[rem.id]?'rgba(255,255,255,0.3)':'white',
                              fontSize:13, fontWeight:700, cursor:remLoading[rem.id]?'not-allowed':'pointer',
                              fontFamily:'inherit', alignSelf:'flex-start',
                              display:'flex', alignItems:'center', gap:8,
                            }}>
                            {remLoading[rem.id] && (
                              <span style={{width:14,height:14,border:'2px solid rgba(255,255,255,0.3)',borderTopColor:'white',borderRadius:'50%',animation:'spin 0.7s linear infinite',display:'inline-block'}}/>
                            )}
                            {remLoading[rem.id] ? 'Correction en cours…' : 'Corriger par IA →'}
                          </button>
                        </>
                      )}

                      {/* Feedback IA */}
                      {remFeedback[rem.id] && (
                        <div style={{padding:'14px 16px', background:'rgba(99,102,241,0.07)', border:'1px solid rgba(99,102,241,0.22)', borderRadius:10}}>
                          <p style={{fontSize:10, fontWeight:700, color:'#a5b4fc', textTransform:'uppercase', margin:'0 0 10px'}}>
                            🤖 Correction IA personnalisée
                          </p>
                          <MD text={remFeedback[rem.id]}/>
                        </div>
                      )}

                      {/* Correction officielle */}
                      <button onClick={()=>setShowOfficiel(p=>({...p,[rem.id]:!p[rem.id]}))}
                        style={{alignSelf:'flex-start', fontSize:12, fontWeight:600, color:'rgba(255,255,255,0.45)', background:'transparent', border:'1px solid rgba(255,255,255,0.1)', borderRadius:8, padding:'6px 14px', cursor:'pointer', fontFamily:'inherit'}}>
                        {showOfficiel[rem.id] ? '▲ Masquer' : '📖 Voir'} la correction officielle
                      </button>
                      {showOfficiel[rem.id] && (
                        <div style={{padding:'12px 14px', background:'rgba(16,185,129,0.06)', border:'1px solid rgba(16,185,129,0.2)', borderRadius:9}}>
                          <MD text={rem.officialCorrection}/>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Bouton retour en bas aussi */}
        <div style={{textAlign:'center', marginTop:40, paddingTop:24, borderTop:'1px solid rgba(255,255,255,0.07)'}}>
          <button onClick={onBack}
            style={{
              padding:'12px 28px', borderRadius:10,
              border:'1px solid rgba(255,255,255,0.15)',
              background:'rgba(255,255,255,0.05)',
              color:'white', fontSize:14, fontWeight:700,
              cursor:'pointer', fontFamily:'inherit',
              display:'inline-flex', alignItems:'center', gap:8,
            }}>
            ← Retour à la correction
          </button>
        </div>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}

function PhaseCorrection({exam,candidat,answers,onFinish,onGraphExtracted}:{
  exam:BacExam;candidat:Candidat;answers:string
  onFinish:(corrections:Record<number,string>)=>void
  onGraphExtracted?:(idx:number,graph:string)=>void
}){
  const totalEx=exam.exercises.length
  const colors=['#6366f1','#10b981','#f59e0b','#8b5cf6','#ec4899','#06b6d4']
  const [currentIdx,setCurrentIdx]=useState(0)
  const [corrections,setCorrections]=useState<Record<number,string>>({})
  const [generating,setGenerating]=useState(false)
  const [pdfMsg,setPdfMsg]=useState<Record<number,string>>({})
  // Analyse par exercice — déclenchée après chaque correction
  const [perExAnalysis,setPerExAnalysis]=useState<Record<number,AnalysisResult>>({})
  const [analyzingEx,setAnalyzingEx]=useState<number|null>(null)
  const [showAnalysisIdx,setShowAnalysisIdx]=useState<number|null>(null)
  // Page analyse pleine — index exercice affiché (-1 = caché)
  const [analysePageIdx,setAnalysePageIdx]=useState<number>(-1)
  const currentEx=exam.exercises[currentIdx]
  const currentCorrection=corrections[currentIdx]||''
  const allDone=Object.keys(corrections).length>=totalEx

  const generateCurrent=useCallback(async()=>{
    if(generating||corrections[currentIdx])return
    setGenerating(true)
    try{
      const text=await correctSingleExercise(exam,currentIdx,answers)
      setCorrections(prev=>({...prev,[currentIdx]:text}))
      if(onGraphExtracted){const g=extractFirstGraph(text);if(g)onGraphExtracted(currentIdx,g)}
      // Lancer l'analyse de cet exercice en arrière-plan
      const exAnswerPart = answers.split('=== ').find(p=>p.startsWith(`Exercice ${currentIdx+1}`)) || ''
      setAnalyzingEx(currentIdx)
      analyzeOneExercise(exam.exercises[currentIdx], exAnswerPart, text, currentIdx)
        .then(r=>{setPerExAnalysis(prev=>({...prev,[currentIdx]:r}));setAnalyzingEx(null)})
        .catch(()=>setAnalyzingEx(null))
    }catch(e){
      setCorrections(prev=>({...prev,[currentIdx]:'⚠️ Erreur de génération — réessayez.'}))
    }
    setGenerating(false)
  },[currentIdx,generating,corrections,exam,answers,onGraphExtracted])

  const didMount=useRef(false)
  useEffect(()=>{if(!didMount.current){didMount.current=true;if(!corrections[0]&&!generating)generateCurrent()}},[])

  const openExercisePdf=(idx:number)=>{
    const ex=exam.exercises[idx]
    const corrText=corrections[idx]||''
    const singleExam:BacExam={...exam,title:`${exam.title} — Exercice ${idx+1}`,exercises:[ex]}
    try{openCorrectionPdf(singleExam,corrText,answers,candidat);setPdfMsg(p=>({...p,[idx]:'Ouvert !'})
    );setTimeout(()=>setPdfMsg(p=>({...p,[idx]:''})),3000)}
    catch{setPdfMsg(p=>({...p,[idx]:'Autorisez les popups'}))}
  }

  const goNext=useCallback(async()=>{
    if(currentIdx>=totalEx-1)return
    const nextIdx=currentIdx+1
    setCurrentIdx(nextIdx)
    if(!corrections[nextIdx]){
      setGenerating(true)
      try{
        const text=await correctSingleExercise(exam,nextIdx,answers)
        setCorrections(prev=>({...prev,[nextIdx]:text}))
        if(onGraphExtracted){const g=extractFirstGraph(text);if(g)onGraphExtracted(nextIdx,g)}
        const exAPart=answers.split('=== ').find(p=>p.startsWith(`Exercice ${nextIdx+1}`)) || ''
        setAnalyzingEx(nextIdx)
        analyzeOneExercise(exam.exercises[nextIdx],exAPart,text,nextIdx)
          .then(r=>{setPerExAnalysis(prev=>({...prev,[nextIdx]:r}));setAnalyzingEx(null)})
          .catch(()=>setAnalyzingEx(null))
      }catch{setCorrections(prev=>({...prev,[nextIdx]:'⚠️ Erreur de génération — réessayez.'}))}
      setGenerating(false)
    }
  },[currentIdx,totalEx,corrections,exam,answers,generating])

  const handleFinish=()=>{onFinish(corrections)}

  // Page analyse pleine — rendu direct avant le return principal
  if (analysePageIdx >= 0 && perExAnalysis[analysePageIdx]) {
    return (
      <PageAnalyseExercice
        analysis={perExAnalysis[analysePageIdx]}
        exercise={exam.exercises[analysePageIdx]}
        exerciseNum={analysePageIdx + 1}
        onBack={() => setAnalysePageIdx(-1)}
      />
    )
  }

  return(
    <div style={{minHeight:'100vh',background:'#0a0a1a',color:'white',fontFamily:'system-ui',padding:'24px 20px'}}>
      <div style={{maxWidth:900,margin:'0 auto'}}>

        <div style={{marginBottom:24}}>
          <h3 style={{margin:'0 0 4px',fontSize:18,color:'#e2e8f0',display:'flex',alignItems:'center',gap:10}}>
            <span>📝</span> Correction — Bac Blanc Jour {exam.day}
          </h3>
          <p style={{margin:0,fontSize:13,color:'rgba(255,255,255,0.4)'}}>{candidat.prenom} {candidat.nom} · {exam.section}</p>
        </div>

        {/* Stepper exercices */}
        <div style={{display:'flex',gap:8,marginBottom:28,flexWrap:'wrap',alignItems:'center'}}>
          {exam.exercises.map((ex,i)=>{
            const done=!!corrections[i],active=i===currentIdx,locked=!done&&i!==currentIdx
            const c=colors[i%colors.length]
            return(
              <button key={i} onClick={()=>{if(done&&!active)setCurrentIdx(i)}} disabled={locked}
                style={{display:'flex',alignItems:'center',gap:8,padding:'8px 16px',borderRadius:10,fontSize:12,fontWeight:700,cursor:locked?'not-allowed':'pointer',border:active?`2px solid ${c}`:done?`1px solid ${c}60`:'1px solid rgba(255,255,255,0.08)',background:active?`${c}18`:done?`${c}0a`:'rgba(255,255,255,0.02)',color:active?c:done?`${c}cc`:'rgba(255,255,255,0.2)',opacity:locked?0.4:1,boxShadow:active?`0 4px 16px ${c}30`:'none',transition:'all 0.2s'}}>
                {done?<span style={{width:18,height:18,borderRadius:'50%',background:c,display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,color:'white',fontWeight:900,flexShrink:0}}>✓</span>
                :active&&generating?<span style={{width:14,height:14,borderRadius:'50%',border:`2px solid ${c}40`,borderTopColor:c,animation:'spin 0.7s linear infinite',display:'inline-block',flexShrink:0}}/>
                :<span style={{width:18,height:18,borderRadius:'50%',border:`2px solid ${active?c:'rgba(255,255,255,0.15)'}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,color:active?c:'rgba(255,255,255,0.2)',fontWeight:900,flexShrink:0}}>{i+1}</span>}
                <span>Ex.{i+1}</span>
                <span style={{opacity:0.5,fontSize:10}}>({ex.points}pts)</span>
                {locked&&<span style={{fontSize:9,opacity:0.5}}>🔒</span>}
              </button>
            )
          })}
          {/* Bouton exercice suivant dans le stepper */}
          {!allDone&&currentIdx<totalEx-1&&corrections[currentIdx]&&(
            <button onClick={goNext}
              style={{marginLeft:8,padding:'8px 16px',borderRadius:10,background:'linear-gradient(135deg,rgba(99,102,241,0.3),rgba(139,92,246,0.25))',border:'1px solid rgba(99,102,241,0.4)',color:'#a5b4fc',fontWeight:700,fontSize:12,cursor:'pointer',display:'flex',alignItems:'center',gap:6}}>
              Ex.{currentIdx+2} →
            </button>
          )}
          {allDone&&(
            <button onClick={handleFinish}
              style={{marginLeft:'auto',padding:'9px 20px',borderRadius:10,background:'linear-gradient(135deg,#10b981,#059669)',border:'none',color:'white',fontWeight:700,fontSize:12,cursor:'pointer',boxShadow:'0 4px 16px rgba(16,185,129,0.35)',display:'flex',alignItems:'center',gap:8}}>
              📊 Analyser mes points faibles →
            </button>
          )}
        </div>

        {/* Carte exercice courant */}
        <div style={{background:'rgba(255,255,255,0.03)',border:`1px solid ${colors[currentIdx%colors.length]}30`,borderRadius:20,overflow:'hidden'}}>
          {/* Header */}
          <div style={{padding:'16px 24px',borderBottom:'1px solid rgba(255,255,255,0.07)',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:12,background:`${colors[currentIdx%colors.length]}08`}}>
            <div style={{display:'flex',alignItems:'center',gap:12}}>
              <div style={{width:36,height:36,borderRadius:10,background:`${colors[currentIdx%colors.length]}20`,border:`2px solid ${colors[currentIdx%colors.length]}50`,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:16,color:colors[currentIdx%colors.length]}}>{currentIdx+1}</div>
              <div>
                <p style={{margin:0,fontWeight:700,fontSize:14,color:'rgba(255,255,255,0.9)'}}>{currentEx?.title}</p>
                <p style={{margin:0,fontSize:11,color:'rgba(255,255,255,0.4)'}}>{currentEx?.theme} · {currentEx?.points} pts</p>
              </div>
            </div>
            <div style={{display:'flex',gap:8,alignItems:'center',flexWrap:'wrap'}}>
              {pdfMsg[currentIdx]&&<span style={{fontSize:11,color:'#6ee7b7',fontWeight:600,padding:'3px 10px',background:'rgba(16,185,129,0.1)',borderRadius:6}}>✓ {pdfMsg[currentIdx]}</span>}
              {currentCorrection&&(
                <>
                  <button onClick={()=>openExercisePdf(currentIdx)}
                    style={{display:'flex',alignItems:'center',gap:6,padding:'7px 13px',background:'linear-gradient(135deg,rgba(99,102,241,0.25),rgba(139,92,246,0.2))',border:'1px solid rgba(99,102,241,0.35)',borderRadius:9,cursor:'pointer',fontSize:12,fontWeight:700,color:'#a5b4fc',fontFamily:'inherit'}}>
                    🎨 Imprimer
                  </button>
                  <button onClick={()=>{ if(perExAnalysis[currentIdx]) setAnalysePageIdx(currentIdx) }}
                    style={{display:'flex',alignItems:'center',gap:6,padding:'7px 13px',
                      background:perExAnalysis[currentIdx]?'linear-gradient(135deg,rgba(16,185,129,0.25),rgba(6,214,160,0.15))':'rgba(255,255,255,0.04)',
                      border:perExAnalysis[currentIdx]?'1px solid rgba(16,185,129,0.5)':'1px solid rgba(255,255,255,0.1)',
                      borderRadius:9,cursor:perExAnalysis[currentIdx]?'pointer':'not-allowed',fontSize:12,fontWeight:700,
                      color:perExAnalysis[currentIdx]?'#6ee7b7':'rgba(255,255,255,0.3)',fontFamily:'inherit',
                      boxShadow:perExAnalysis[currentIdx]?'0 0 12px rgba(16,185,129,0.25)':'none'}}>
                    {analyzingEx===currentIdx&&!perExAnalysis[currentIdx]
                      ?<><span style={{width:10,height:10,border:'2px solid rgba(16,185,129,0.3)',borderTopColor:'#10b981',borderRadius:'50%',animation:'spin 0.8s linear infinite',display:'inline-block',marginRight:4}}/><span>Analyse…</span></>
                      :<>📊 Voir l&apos;analyse</>
                    }
                  </button>
                  {currentIdx<totalEx-1&&(
                    <button onClick={goNext}
                      style={{display:'flex',alignItems:'center',gap:5,padding:'7px 13px',
                        background:'linear-gradient(135deg,rgba(99,102,241,0.3),rgba(139,92,246,0.25))',
                        border:'1px solid rgba(99,102,241,0.45)',
                        borderRadius:9,cursor:'pointer',fontSize:12,fontWeight:700,color:'#c4b5fd',fontFamily:'inherit'}}>
                      Ex.{currentIdx+2} →
                    </button>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Énoncé */}
          <div style={{padding:'16px 24px',borderBottom:'1px solid rgba(255,255,255,0.06)',background:'rgba(0,0,0,0.2)'}}>
            <p style={{fontSize:11,fontWeight:700,color:'rgba(255,255,255,0.3)',textTransform:'uppercase',letterSpacing:'0.08em',margin:'0 0 8px'}}>Énoncé</p>
            {currentEx?.graph&&currentEx.graph!=='null'&&<TextWithGraphs text={currentEx.graph}/>}
            <TextWithGraphs text={currentEx?.statement||''}/>
          </div>

          {/* Correction */}
          <div style={{padding:'20px 24px'}}>
            {generating&&!currentCorrection?(
              <div style={{textAlign:'center',padding:'40px 20px'}}>
                <div style={{fontSize:44,marginBottom:14,animation:'float 2s ease-in-out infinite'}}>⚡</div>
                <h4 style={{color:'#e2e8f0',marginBottom:8,fontSize:16}}>Correction de l&apos;exercice {currentIdx+1}…</h4>
                <p style={{color:'rgba(255,255,255,0.4)',fontSize:13,marginBottom:20}}>L&apos;IA rédige la correction complète et détaillée</p>
                <div style={{width:240,height:3,borderRadius:3,background:'rgba(255,255,255,0.06)',margin:'0 auto',overflow:'hidden'}}>
                  <div style={{height:'100%',background:`linear-gradient(90deg,${colors[currentIdx%colors.length]},#10b981)`,borderRadius:3,animation:'slideBar 1.8s ease-in-out infinite'}}/>
                </div>
              </div>
            ):currentCorrection?(
              <div>
                <p style={{fontSize:11,fontWeight:700,color:'rgba(255,255,255,0.3)',textTransform:'uppercase',letterSpacing:'0.08em',margin:'0 0 14px'}}>✅ Correction complète</p>
                <MD text={currentCorrection}/>
              </div>
            ):(
              <div style={{textAlign:'center',padding:'20px'}}>
                <button onClick={generateCurrent}
                  style={{padding:'12px 24px',background:'linear-gradient(135deg,#6366f1,#8b5cf6)',border:'none',borderRadius:12,color:'white',fontWeight:700,fontSize:14,cursor:'pointer',fontFamily:'inherit'}}>
                  ⚡ Générer la correction
                </button>
              </div>
            )}
          </div>

          {/* Analyse par exercice — apparaît après correction */}
          {/* Badge analyse — spinner ou prêt → clic ouvre la page pleine */}
          {currentCorrection&&(
            <div style={{margin:'8px 20px 12px',display:'flex',alignItems:'center',gap:10}}>
              {analyzingEx===currentIdx&&!perExAnalysis[currentIdx]&&(
                <div style={{display:'flex',alignItems:'center',gap:8,padding:'8px 16px',borderRadius:8,background:'rgba(99,102,241,0.06)',border:'1px solid rgba(99,102,241,0.15)',fontSize:12,color:'rgba(255,255,255,0.5)'}}>
                  <div style={{width:12,height:12,border:'2px solid rgba(99,102,241,0.3)',borderTopColor:'#6366f1',borderRadius:'50%',animation:'spin 0.8s linear infinite'}}/>
                  Analyse de l&apos;exercice {currentIdx+1} en cours…
                </div>
              )}
              {perExAnalysis[currentIdx]&&(
                <button onClick={()=>setAnalysePageIdx(currentIdx)}
                  style={{display:'flex',alignItems:'center',gap:10,padding:'10px 20px',borderRadius:10,
                    background:'linear-gradient(135deg,rgba(16,185,129,0.15),rgba(6,214,160,0.1))',
                    border:'1px solid rgba(16,185,129,0.4)',cursor:'pointer',fontFamily:'inherit',
                    boxShadow:'0 0 16px rgba(16,185,129,0.2)',transition:'all 0.2s'}}>
                  <span style={{fontSize:20,fontWeight:900,color:perExAnalysis[currentIdx].estimatedScore/perExAnalysis[currentIdx].maxScore>=0.6?'#10b981':'#f59e0b'}}>
                    {perExAnalysis[currentIdx].estimatedScore}/{perExAnalysis[currentIdx].maxScore}
                  </span>
                  <div style={{textAlign:'left'}}>
                    <div style={{fontSize:12,fontWeight:700,color:'#6ee7b7'}}>📊 Analyse disponible</div>
                    <div style={{fontSize:11,color:'rgba(255,255,255,0.4)'}}>Cliquez pour voir le détail et la remédiation →</div>
                  </div>
                </button>
              )}
            </div>
          )}

          {/* Footer navigation */}
          {currentCorrection&&(
            <div style={{padding:'16px 24px',borderTop:'1px solid rgba(255,255,255,0.07)',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:12}}>
              <div style={{fontSize:12,color:'rgba(255,255,255,0.35)'}}>Exercice {currentIdx+1} / {totalEx} corrigé ✓</div>
              <div style={{display:'flex',gap:10}}>
                {currentIdx<totalEx-1?(
                  <button onClick={goNext}
                    style={{padding:'10px 24px',background:'linear-gradient(135deg,#6366f1,#8b5cf6)',border:'none',borderRadius:11,color:'white',fontWeight:700,fontSize:13,cursor:'pointer',fontFamily:'inherit',boxShadow:'0 4px 16px rgba(99,102,241,0.4)',display:'flex',alignItems:'center',gap:8}}>
                    Exercice {currentIdx+2} →
                    {corrections[currentIdx+1]?<span style={{fontSize:11,opacity:0.7}}>déjà corrigé</span>:<span style={{fontSize:11,opacity:0.7}}>générer</span>}
                  </button>
                ):(
                  <button onClick={handleFinish}
                    style={{padding:'10px 24px',background:'linear-gradient(135deg,#10b981,#059669)',border:'none',borderRadius:11,color:'white',fontWeight:700,fontSize:13,cursor:'pointer',fontFamily:'inherit',boxShadow:'0 4px 16px rgba(16,185,129,0.4)',display:'flex',alignItems:'center',gap:8}}>
                    📊 Analyser mes points faibles →
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Récap final */}
        {allDone&&(
          <div style={{marginTop:28,padding:'20px 24px',background:'linear-gradient(135deg,rgba(16,185,129,0.06),rgba(6,214,160,0.04))',border:'1px solid rgba(16,185,129,0.2)',borderRadius:18}}>
            <p style={{fontSize:12,fontWeight:700,color:'#6ee7b7',textTransform:'uppercase',letterSpacing:'0.08em',margin:'0 0 14px',display:'flex',alignItems:'center',gap:8}}>✅ Toutes les corrections sont prêtes</p>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:10}}>
              {exam.exercises.map((ex,i)=>{
                const c=colors[i%colors.length]
                return(
                  <div key={i} style={{padding:'14px 16px',background:'rgba(255,255,255,0.03)',border:`1px solid ${c}30`,borderRadius:12,display:'flex',flexDirection:'column',gap:10}}>
                    <div style={{display:'flex',alignItems:'center',gap:10}}>
                      <span style={{width:28,height:28,borderRadius:'50%',background:c,display:'flex',alignItems:'center',justifyContent:'center',fontSize:13,color:'white',fontWeight:900,flexShrink:0}}>{i+1}</span>
                      <div>
                        <p style={{margin:0,fontWeight:700,fontSize:12,color:'rgba(255,255,255,0.85)'}}>{ex.title}</p>
                        <p style={{margin:0,fontSize:10,color:'rgba(255,255,255,0.35)'}}>{ex.theme} · {ex.points} pts</p>
                      </div>
                    </div>
                    <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                      {pdfMsg[i]&&<span style={{fontSize:10,color:'#6ee7b7',fontWeight:600}}>✓ {pdfMsg[i]}</span>}
                      <button onClick={()=>setCurrentIdx(i)} style={{flex:1,fontSize:11,padding:'6px 10px',borderRadius:8,border:'1px solid rgba(255,255,255,0.1)',background:'transparent',color:'rgba(255,255,255,0.5)',cursor:'pointer',fontFamily:'inherit',fontWeight:600}}>👁 Revoir</button>
                      <button onClick={()=>openExercisePdf(i)} style={{flex:1,fontSize:11,padding:'6px 10px',borderRadius:8,border:`1px solid ${c}50`,background:`${c}12`,color:c,cursor:'pointer',fontFamily:'inherit',fontWeight:700}}>🎨 Imprimer</button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}@keyframes slideBar{0%{transform:translateX(-100%)}100%{transform:translateX(400%)}}`}</style>
    </div>
  )
}

// ════════════════════════════════════════════════════════════════════
// PHASE 5 — ANALYSE + REMÉDIATION (IDENTIQUE SIMULATION — copie exacte)
// ════════════════════════════════════════════════════════════════════
function PhaseAnalysis({analysis,exam,candidat,onRestart}:{analysis:AnalysisResult|null;exam:BacExam;candidat:Candidat;onRestart:()=>void}){
  const { incrementQuota: incrementQuotaSub } = useAuth()
  const [remAnswers,setRemAnswers]=useState<Record<string,string>>({})
  const [remFeedback,setRemFeedback]=useState<Record<string,string>>({})
  const [remLoading,setRemLoading]=useState<Record<string,boolean>>({})
  const [showHint,setShowHint]=useState<Record<string,boolean>>({})
  const [showCorrection,setShowCorrection]=useState<Record<string,boolean>>({})
  const [remSavedMsg,setRemSavedMsg]=useState<Record<string,string>>({})
  const remFileRefs=useRef<Record<string,HTMLInputElement|null>>({})

  const showMsg=(id:string,msg:string)=>{setRemSavedMsg(p=>({...p,[id]:msg}));setTimeout(()=>setRemSavedMsg(p=>({...p,[id]:''})),2500)}

  const downloadRemAnswer=(ex:AnalysisResult['remediationExercises'][number])=>{
    const ans=remAnswers[ex.id]||''; if(!ans.trim())return
    const blob=new Blob([`REMÉDIATION — ${ex.theme}\nDate : ${new Date().toLocaleString('fr-FR')}\n${'='.repeat(50)}\n\nÉnoncé :\n${ex.statement}\n\n${'='.repeat(50)}\n\nMa réponse :\n${ans}`],{type:'text/plain;charset=utf-8'})
    const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`Remediation-${ex.theme.replace(/[^\w-]/g,'-')}.txt`;a.click()
    showMsg(ex.id,'Réponse téléchargée !')
  }

  const downloadRemFeedback=(ex:AnalysisResult['remediationExercises'][number])=>{
    const feedback=remFeedback[ex.id]||''; if(!feedback.trim())return
    const blob=new Blob([`CORRECTION IA — ${ex.theme}\nDate : ${new Date().toLocaleString('fr-FR')}\n${'='.repeat(50)}\n\nÉnoncé :\n${ex.statement}\n\nMa réponse :\n${remAnswers[ex.id]||''}\n\n${'='.repeat(50)}\n\nCorrection IA :\n${feedback}`],{type:'text/plain;charset=utf-8'})
    const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`Correction-Rem-${ex.theme.replace(/[^\w-]/g,'-')}.txt`;a.click()
    showMsg(ex.id,'Correction téléchargée !')
  }

  const handleRemFile=async(e:React.ChangeEvent<HTMLInputElement>,exId:string)=>{
    const files=Array.from(e.target.files||[]) as File[]
    if(!files.length)return
    for(const file of files){
      if(file.type.startsWith('text/')||file.name.endsWith('.txt')||file.name.endsWith('.md')){
        const text=await file.text()
        setRemAnswers(p=>({...p,[exId]:p[exId]?p[exId]+'\n\n--- '+file.name+' ---\n'+text:text}))
        showMsg(exId,'Fichier importé !')
      }else if(file.type.startsWith('image/')){showMsg(exId,'Image reçue — recopiez votre réponse en texte')}
    }
    if(remFileRefs.current[exId])remFileRefs.current[exId]!.value=''
  }

  const openRemFeedbackPdf=(ex:AnalysisResult['remediationExercises'][number])=>{
    const feedback=remFeedback[ex.id]||'',answer=remAnswers[ex.id]||''
    const esc=(s:string)=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    const md2html=(s:string)=>esc(s).replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/\*(.+?)\*/g,'<em>$1</em>').replace(/`(.+?)`/g,'<code>$1</code>')
    const feedbackHtml=feedback.split('\n').map(line=>{
      const t=line.trim();if(!t)return '<div style="height:5px"></div>'
      if(t.startsWith('## '))return '<h3 style="color:#a5b4fc;font-size:14px;font-weight:800;margin:18px 0 8px">'+md2html(t.slice(3))+'</h3>'
      if(t.startsWith('### '))return '<h4 style="color:#e2e8f0;font-size:13px;font-weight:700;margin:12px 0 6px">'+md2html(t.slice(4))+'</h4>'
      if(t.startsWith('> '))return '<div style="background:#052e16;border:2px solid #10b981;border-radius:7px;padding:10px 14px;color:#6ee7b7;font-weight:700;margin:10px 0">'+md2html(t.slice(2))+'</div>'
      if(t.startsWith('- '))return '<div style="padding:3px 0 3px 18px;position:relative;color:#cbd5e1"><span style="position:absolute;left:4px;color:#8b5cf6;font-weight:700">›</span>'+md2html(t.slice(2))+'</div>'
      if(t==='---')return '<hr style="border:0;border-top:1px solid rgba(255,255,255,.08);margin:12px 0">'
      return '<p style="margin:4px 0;color:#cbd5e1;font-size:12.5px">'+md2html(t)+'</p>'
    }).join('\n')
    const diffLabel:Record<string,string>={introductory:'Introductif',standard:'Standard',advanced:'Avancé'}
    const html='<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><title>Correction Remédiation — '+esc(ex.theme)+'</title><style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:"Inter","Segoe UI",system-ui,sans-serif;background:#0c0c1a;color:#e2e8f0;font-size:13.5px;line-height:1.8;-webkit-print-color-adjust:exact;print-color-adjust:exact}.wrap{max-width:820px;margin:0 auto;padding:28px 36px 60px}.print-bar{position:sticky;top:0;z-index:99;background:#0c0c1a;border-bottom:1px solid rgba(255,255,255,.1);padding:10px 0 14px;margin-bottom:20px;display:flex;align-items:center;gap:12px}.print-btn{background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;border:none;border-radius:8px;padding:10px 24px;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit}.doc-title{background:linear-gradient(135deg,#1e1b4b,#2e1065);border:1px solid #8b5cf6;border-radius:12px;padding:20px 24px;margin-bottom:24px;text-align:center}.doc-title h1{font-size:17px;font-weight:900;color:#fff;margin-bottom:4px}.doc-title .sub{color:#c4b5fd;font-size:12px}.enonce{background:#1a1a35;border-left:4px solid #8b5cf6;border-radius:8px;padding:14px 16px;margin-bottom:16px;font-size:13px;white-space:pre-wrap}.answer-block{background:#0f2040;border:1px solid #3b82f6;border-radius:8px;padding:12px 16px;white-space:pre-wrap;font-size:13px;color:#bfdbfe;margin-bottom:16px}.correction-block{background:#0c1a10;border:1px solid #10b981;border-radius:10px;padding:16px 20px}.correction-block h2{color:#34d399;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;margin-bottom:14px}.footer{margin-top:40px;padding-top:12px;border-top:1px solid rgba(255,255,255,.08);text-align:center;color:rgba(255,255,255,.25);font-size:10.5px}@media print{.print-bar{display:none!important}}</style></head><body><div class="wrap">'
      +'<div class="print-bar"><button class="print-btn" onclick="window.print()">🖨 Imprimer / PDF</button></div>'
      +'<div class="doc-title"><h1>Exercice de remédiation</h1><div class="sub">'+esc(ex.theme)+' · '+esc(diffLabel[ex.difficulty]||ex.difficulty)+' · '+esc(ex.objective)+'</div></div>'
      +'<div class="enonce">'+esc(ex.statement)+'</div>'
      +(ex.hint?'<div style="background:#1c2a10;border-left:3px solid #84cc16;border-radius:0 8px 8px 0;padding:10px 14px;margin-bottom:14px;color:#bef264;font-size:12px">💡 Indice : '+esc(ex.hint)+'</div>':'')
      +(answer?'<div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#93c5fd;margin-bottom:8px">Ma réponse</div><div class="answer-block">'+esc(answer)+'</div>':'')
      +'<div class="correction-block"><h2>🤖 Correction IA personnalisée</h2>'+feedbackHtml+'</div>'
      +'<div class="footer">MathBac.AI — Remédiation · '+esc(ex.theme)+' · '+new Date().toLocaleDateString('fr-FR')+'</div>'
      +'</div></body></html>'
    const blob=new Blob([html],{type:'text/html;charset=utf-8'})
    const url=URL.createObjectURL(blob)
    const win=window.open(url,'_blank')
    if(!win){const a=document.createElement('a');a.href=url;a.download='Remediation-'+ex.theme.replace(/[^\w-]/g,'-')+'.html';a.click()}
    setTimeout(()=>URL.revokeObjectURL(url),8000)
  }

  const checkRemediation=async(ex:AnalysisResult['remediationExercises'][number])=>{
    setRemLoading(p=>({...p,[ex.id]:true}))
    await incrementQuotaSub('remediation')
    const feedback=await correctRemediationExercise(ex,remAnswers[ex.id]||'')
    setRemFeedback(p=>({...p,[ex.id]:feedback}))
    setRemLoading(p=>({...p,[ex.id]:false}))
  }

  if(!analysis){
    return(
      <div style={{textAlign:'center',padding:'60px 20px',color:'white',fontFamily:'system-ui'}}>
        <div style={{fontSize:52,marginBottom:16,animation:'float 2s ease-in-out infinite'}}>🔬</div>
        <h3 style={{color:'#e2e8f0'}}>Analyse en cours…</h3>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:13}}>L&apos;IA identifie vos points faibles</p>
        <div style={{width:260,height:4,borderRadius:4,background:'rgba(255,255,255,0.06)',margin:'24px auto 0',overflow:'hidden'}}>
          <div style={{height:'100%',background:'linear-gradient(90deg,#8b5cf6,#ec4899)',borderRadius:4,animation:'slideBar 1.8s ease-in-out infinite'}}/>
        </div>
        <style>{`@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}@keyframes slideBar{0%{transform:translateX(-100%)}100%{transform:translateX(400%)}}`}</style>
      </div>
    )
  }

  const scoreColor=analysis.estimatedScore/analysis.maxScore>=0.7?'#10b981':analysis.estimatedScore/analysis.maxScore>=0.5?'#f59e0b':'#ef4444'
  const scorePct=Math.round((analysis.estimatedScore/analysis.maxScore)*100)
  const sevColor:Record<string,string>={critical:'#ef4444',moderate:'#f59e0b',good:'#10b981'}
  const sevLabel:Record<string,string>={critical:'Priorité haute',moderate:'À améliorer',good:'Maîtrise'}
  const diffColor:Record<string,string>={introductory:'#10b981',standard:'#f59e0b',advanced:'#ef4444'}
  const diffLabel:Record<string,string>={introductory:'Introductif',standard:'Standard',advanced:'Avancé'}

  return(
    <div style={{minHeight:'100vh',background:'#0a0a1a',color:'white',fontFamily:'system-ui'}}>
      <Navbar/>
      <div style={{maxWidth:900,margin:'0 auto',padding:'80px 20px 60px'}}>

        {/* Header bilan */}
        <div style={{marginBottom:32,textAlign:'center'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:10,background:'rgba(245,158,11,0.1)',border:'1px solid rgba(245,158,11,0.3)',borderRadius:50,padding:'8px 20px',marginBottom:16}}>
            <span>🏆</span><span style={{color:'#fbbf24',fontWeight:700,fontSize:13}}>Bac Blanc Jour {exam.day} — {exam.section}</span>
          </div>
          <h2 style={{fontSize:22,color:'white',margin:'0 0 4px'}}>{candidat.prenom} {candidat.nom}</h2>
          <p style={{color:'rgba(255,255,255,0.4)',fontSize:13,margin:0}}>{candidat.lycee} · {candidat.gouvernorat}</p>
        </div>

        {/* Score + résumé */}
        <div style={{display:'grid',gridTemplateColumns:'160px 1fr',gap:24,marginBottom:32,padding:'24px 28px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:20,alignItems:'center'}}>
          <div style={{textAlign:'center'}}>
            <svg width="120" height="120" style={{transform:'rotate(-90deg)'}}>
              <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10"/>
              <circle cx="60" cy="60" r="50" fill="none" stroke={scoreColor} strokeWidth="10"
                strokeDasharray={`${(scorePct/100)*314} 314`} strokeLinecap="round" style={{transition:'stroke-dasharray 1.2s ease'}}/>
            </svg>
            <div style={{marginTop:-60,marginBottom:40}}>
              <div style={{fontSize:42,fontWeight:900,color:scoreColor}}>{analysis.estimatedScore}</div>
              <div style={{fontSize:16,color:'rgba(255,255,255,0.35)'}}>/{analysis.maxScore}</div>
            </div>
            <div style={{fontSize:12,fontWeight:700,color:scoreColor}}>
              {scorePct>=80?'Excellent ! 🏆':scorePct>=60?'Bien 👍':scorePct>=40?'En progrès':'À travailler 💪'}
            </div>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:14}}>
            {analysis.strengths.length>0&&(
              <div>
                <p style={{fontSize:11,fontWeight:700,color:'#6ee7b7',textTransform:'uppercase',letterSpacing:'0.08em',margin:'0 0 8px'}}>Points forts</p>
                <div style={{display:'flex',flexWrap:'wrap',gap:7}}>
                  {analysis.strengths.map((s,i)=>(
                    <span key={i} style={{fontSize:12,padding:'4px 13px',background:'rgba(16,185,129,0.12)',color:'#6ee7b7',border:'1px solid rgba(16,185,129,0.25)',borderRadius:20}}>{s}</span>
                  ))}
                </div>
              </div>
            )}
            {analysis.globalAdvice.length>0&&(
              <div>
                <p style={{fontSize:11,fontWeight:700,color:'#a5b4fc',textTransform:'uppercase',letterSpacing:'0.08em',margin:'0 0 8px'}}>Recommandations personnalisées</p>
                <div style={{display:'flex',flexDirection:'column',gap:5}}>
                  {analysis.globalAdvice.map((a,i)=>(
                    <div key={i} style={{display:'flex',gap:10,alignItems:'flex-start',padding:'7px 13px',background:'rgba(99,102,241,0.08)',borderRadius:9,fontSize:12,color:'rgba(255,255,255,0.7)'}}>
                      <span style={{color:'#6366f1',fontWeight:700,flexShrink:0}}>{i+1}.</span>{a}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Analyse par thème */}
        {analysis.weakAreas.length>0&&(
          <div style={{marginBottom:32}}>
            <h4 style={{margin:'0 0 14px',display:'flex',alignItems:'center',gap:8,color:'#e2e8f0'}}>Analyse par thème</h4>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(270px,1fr))',gap:12}}>
              {[...analysis.weakAreas].sort((a,b)=>a.priority-b.priority).map((w,i)=>{
                const c=sevColor[w.severity]||'#10b981'
                return(
                  <div key={i} style={{padding:'15px 18px',background:'rgba(255,255,255,0.03)',borderLeft:`3px solid ${c}`,border:`1px solid rgba(255,255,255,0.06)`,borderRadius:12}}>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:7,gap:8}}>
                      <span style={{fontWeight:700,fontSize:13,color:'rgba(255,255,255,0.85)'}}>{w.theme}</span>
                      <span style={{fontSize:9,background:`${c}20`,color:c,padding:'2px 8px',borderRadius:10,fontWeight:700,flexShrink:0}}>{sevLabel[w.severity]}</span>
                    </div>
                    <p style={{fontSize:12,color:'rgba(255,255,255,0.5)',lineHeight:1.65,margin:0}}>{w.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Exercices de remédiation */}
        {analysis.remediationExercises.length>0&&(
          <div style={{marginBottom:32}}>
            <h4 style={{margin:'0 0 6px',color:'#e2e8f0'}}>Exercices de remédiation personnalisés</h4>
            <p style={{fontSize:13,color:'rgba(255,255,255,0.4)',marginBottom:20}}>Exercices créés pour renforcer vos points faibles. Soumettez vos réponses pour une correction IA instantanée.</p>
            <div style={{display:'flex',flexDirection:'column',gap:20}}>
              {analysis.remediationExercises.map((ex,i)=>{
                const dc=diffColor[ex.difficulty]||'#f59e0b'
                const hasFeedback=!!remFeedback[ex.id]
                return(
                  <div key={ex.id} style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:18,overflow:'hidden'}}>
                    <div style={{padding:'14px 20px',background:'rgba(255,255,255,0.03)',borderBottom:'1px solid rgba(255,255,255,0.06)',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:10}}>
                      <div style={{display:'flex',gap:10,alignItems:'center'}}>
                        <div style={{width:30,height:30,borderRadius:8,background:`${dc}20`,border:`1px solid ${dc}40`,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:12,color:dc,flexShrink:0}}>{i+1}</div>
                        <div>
                          <p style={{margin:0,fontWeight:700,fontSize:13,color:'rgba(255,255,255,0.85)'}}>{ex.theme}</p>
                          <p style={{margin:0,fontSize:11,color:'rgba(255,255,255,0.35)'}}>{ex.objective}</p>
                        </div>
                      </div>
                      <span style={{fontSize:10,fontWeight:700,color:dc,background:`${dc}15`,padding:'3px 12px',borderRadius:10}}>{diffLabel[ex.difficulty]}</span>
                    </div>
                    <div style={{padding:'20px 20px 0'}}>
                      <div style={{marginBottom:14,padding:'14px 16px',background:'rgba(0,0,0,0.2)',borderRadius:11}}>
                        <p style={{fontSize:10,fontWeight:700,color:'rgba(255,255,255,0.3)',textTransform:'uppercase',margin:'0 0 8px'}}>Énoncé</p>
                        {ex.graph&&ex.graph!=='null'&&<TextWithGraphs text={ex.graph}/>}
                        <TextWithGraphs text={ex.statement}/>
                      </div>
                      <div style={{marginBottom:14}}>
                        <button onClick={()=>setShowHint(p=>({...p,[ex.id]:!p[ex.id]}))}
                          style={{fontSize:12,fontWeight:600,color:'#fbbf24',background:'rgba(251,191,36,0.08)',border:'1px solid rgba(251,191,36,0.2)',borderRadius:9,padding:'7px 14px',cursor:'pointer',fontFamily:'inherit'}}>
                          {showHint[ex.id]?'Masquer':'Voir'} indice
                        </button>
                        {showHint[ex.id]&&(
                          <div style={{marginTop:8,padding:'11px 15px',background:'rgba(251,191,36,0.06)',border:'1px solid rgba(251,191,36,0.18)',borderRadius:9,fontSize:12,color:'rgba(255,255,255,0.65)'}}>{ex.hint}</div>
                        )}
                      </div>
                      {!hasFeedback&&(
                        <div style={{marginBottom:14}}>
                          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6,flexWrap:'wrap',gap:6}}>
                            <span style={{fontSize:11,fontWeight:600,color:'rgba(255,255,255,0.3)',textTransform:'uppercase',letterSpacing:'0.06em'}}>Votre réponse</span>
                            <div style={{display:'flex',gap:6,alignItems:'center'}}>
                              {remSavedMsg[ex.id]&&<span style={{fontSize:11,color:'#6ee7b7',fontWeight:600,padding:'2px 8px',background:'rgba(16,185,129,0.1)',borderRadius:5}}>✓ {remSavedMsg[ex.id]}</span>}
                              <button onClick={()=>remFileRefs.current[ex.id]?.click()}
                                style={{padding:'4px 10px',borderRadius:7,border:'1px solid rgba(255,255,255,0.12)',background:'rgba(255,255,255,0.04)',color:'rgba(255,255,255,0.45)',cursor:'pointer',fontSize:11,fontWeight:600,fontFamily:'inherit',display:'flex',alignItems:'center',gap:4}}>
                                📁 Importer
                              </button>
                              <input ref={el=>{remFileRefs.current[ex.id]=el}} type="file" accept=".txt,.md,.jpg,.jpeg,.png,.webp" multiple onChange={e=>handleRemFile(e,ex.id)} style={{display:'none'}}/>
                              <button onClick={()=>downloadRemAnswer(ex)} disabled={!remAnswers[ex.id]?.trim()}
                                style={{padding:'4px 10px',borderRadius:7,border:'1px solid rgba(99,102,241,0.3)',background:remAnswers[ex.id]?.trim()?'rgba(99,102,241,0.1)':'transparent',color:remAnswers[ex.id]?.trim()?'#a5b4fc':'rgba(255,255,255,0.2)',cursor:remAnswers[ex.id]?.trim()?'pointer':'not-allowed',fontSize:11,fontWeight:600,fontFamily:'inherit',display:'flex',alignItems:'center',gap:4}}>
                                ⬇ Sauvegarder
                              </button>
                            </div>
                          </div>
                          <textarea value={remAnswers[ex.id]||''} onChange={e=>setRemAnswers(p=>({...p,[ex.id]:e.target.value}))}
                            placeholder="Rédigez votre réponse ici, ou importez un fichier .txt…"
                            style={{width:'100%',height:110,padding:'12px 14px',borderRadius:10,border:'1px solid rgba(255,255,255,0.09)',background:'rgba(0,0,0,0.2)',color:'rgba(255,255,255,0.8)',fontSize:13,resize:'vertical',outline:'none',fontFamily:'inherit',lineHeight:1.75,boxSizing:'border-box' as any}}/>
                        </div>
                      )}
                      <div style={{display:'flex',gap:10,marginBottom:16,flexWrap:'wrap'}}>
                        {!hasFeedback&&(
                          <PrimaryBtn onClick={()=>checkRemediation(ex)} loading={remLoading[ex.id]}>
                            {remLoading[ex.id]?'Correction en cours…':'Corriger par IA →'}
                          </PrimaryBtn>
                        )}
                        <button onClick={()=>setShowCorrection(p=>({...p,[ex.id]:!p[ex.id]}))}
                          style={{padding:'9px 16px',borderRadius:10,border:'1px solid rgba(255,255,255,0.1)',background:'transparent',color:'rgba(255,255,255,0.45)',cursor:'pointer',fontSize:12,fontWeight:600,fontFamily:'inherit'}}>
                          {showCorrection[ex.id]?'Masquer':'Voir'} correction officielle
                        </button>
                      </div>
                      {showCorrection[ex.id]&&(
                        <div style={{marginBottom:16,padding:'14px 16px',background:'rgba(16,185,129,0.06)',border:'1px solid rgba(16,185,129,0.2)',borderRadius:10}}>
                          <MD text={ex.officialCorrection}/>
                        </div>
                      )}
                      {hasFeedback&&(
                        <div style={{marginBottom:20,padding:'16px 18px',background:'rgba(99,102,241,0.07)',border:'1px solid rgba(99,102,241,0.22)',borderRadius:12}}>
                          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12,flexWrap:'wrap',gap:8}}>
                            <p style={{fontSize:10,fontWeight:700,color:'#a5b4fc',textTransform:'uppercase',margin:0}}>🤖 Correction IA personnalisée</p>
                            <div style={{display:'flex',gap:7,alignItems:'center',flexWrap:'wrap'}}>
                              {remSavedMsg[ex.id]&&<span style={{fontSize:11,color:'#6ee7b7',fontWeight:600,padding:'2px 8px',background:'rgba(16,185,129,0.1)',borderRadius:5}}>✓ {remSavedMsg[ex.id]}</span>}
                              <button onClick={()=>downloadRemFeedback(ex)}
                                style={{padding:'5px 10px',borderRadius:7,border:'1px solid rgba(255,255,255,0.12)',background:'rgba(255,255,255,0.05)',color:'rgba(255,255,255,0.55)',cursor:'pointer',fontSize:11,fontWeight:600,fontFamily:'inherit',display:'flex',alignItems:'center',gap:4}}>📄 .txt</button>
                              <button onClick={()=>openRemFeedbackPdf(ex)}
                                style={{padding:'5px 12px',borderRadius:7,border:'1px solid rgba(99,102,241,0.35)',background:'rgba(99,102,241,0.12)',color:'#a5b4fc',cursor:'pointer',fontSize:11,fontWeight:700,fontFamily:'inherit',display:'flex',alignItems:'center',gap:5}}>🎨 PDF coloré</button>
                            </div>
                          </div>
                          <MD text={remFeedback[ex.id]}/>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Actions finales */}
        <div style={{textAlign:'center',paddingTop:28,borderTop:'1px solid rgba(255,255,255,0.08)'}}>
          <p style={{color:'rgba(255,255,255,0.35)',fontSize:13,marginBottom:16}}>Revenez demain pour le concours du jour suivant !</p>
          <button onClick={onRestart}
            style={{padding:'12px 28px',borderRadius:10,border:'2px solid rgba(245,158,11,0.4)',background:'transparent',color:'#fbbf24',fontSize:14,fontWeight:700,cursor:'pointer'}}>
            🏆 Nouveau concours →
          </button>
        </div>
      </div>
      <Footer/>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}@keyframes slideBar{0%{transform:translateX(-100%)}100%{transform:translateX(400%)}}`}</style>
    </div>
  )
}

// ════════════════════════════════════════════════════════════════════
// COMPOSANT PRINCIPAL
// ════════════════════════════════════════════════════════════════════
// ════════════════════════════════════════════════════════════════════
// COMPOSANT PRINCIPAL — avec quotas Supabase
// ════════════════════════════════════════════════════════════════════
function BacBlancInner() {
  const { isAdmin, checkQuota, incrementQuota: incrementQuotaSub } = useAuth()

  const [phase, setPhase] = useState<Phase>('inscription')
  const [candidat, setCandidat] = useState<Candidat|null>(null)
  const [exam, setExam] = useState<BacExam|null>(null)
  const [answers, setAnswers] = useState('')
  const [corrections, setCorrections] = useState<Record<number,string>>({})
  const [analysis, setAnalysis] = useState<AnalysisResult|null>(null)
  const today = new Date()
  // Période concours: 1er mai – 15 juin · Jour 1=1mai, Jour 46=15juin
  const periodeStart = new Date(today.getFullYear(), 4, 1)
  const periodeEnd   = new Date(today.getFullYear(), 5, 15)
  const isInPeriode  = today >= periodeStart && today <= periodeEnd
  // En dev: toujours actif (calcul libre même hors période)
  const dayNum = Math.max(1, Math.floor((today.getTime() - periodeStart.getTime()) / (1000*60*60*24)) + 1)

  // Compteur de visite
  useEffect(() => { saveVisit() }, [])

  const handleInscription = useCallback(async (c: Candidat) => {
    // Vérifier quota simulation via Supabase (admin = illimité)
    if (!isAdmin && !checkQuota('simulations')) {
      alert('Quota atteint — 2 simulations/semaine. Renouvellement lundi prochain.\nUpgrade vers Sprint Bac pour plus de simulations.')
      return
    }
    setCandidat(c); setPhase('generating')
    try {
      const e = await generateBacBlanc(c, dayNum)
      // Incrémenter quota Supabase
      await incrementQuotaSub('simulations')
      setExam(e); setPhase('exam')
    } catch {
      alert('Erreur de génération. Réessayez.'); setPhase('inscription')
    }
  }, [dayNum, isAdmin, checkQuota, incrementQuotaSub])

  const handleSubmitExam = useCallback((ans: string) => {
    setAnswers(ans); setCorrections({}); setPhase('correction')
  }, [])

  const handleFinishCorrection = useCallback(async (corrs: Record<number,string>) => {
    setCorrections(corrs); setPhase('analysing')
    if (!exam || !candidat) return
    try {
      const fullCorr = Object.values(corrs).join('\n\n---\n\n')
      const r = await analyzeStudentWork(exam, answers, fullCorr)
      setAnalysis(r)
      // Sauvegarder dans le classement
      saveRanking({
        nom: candidat.nom, prenom: candidat.prenom, lycee: candidat.lycee,
        gouvernorat: candidat.gouvernorat, section: candidat.section, sectionKey: candidat.sectionKey,
        score: r.estimatedScore, maxScore: r.maxScore,
        day: dayNum, date: `${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`,
        ts: Date.now()
      })
      setPhase('analysis')
    } catch {
      setAnalysis({ estimatedScore:0, maxScore:exam.totalPoints, weakAreas:[], strengths:[], globalAdvice:[], remediationExercises:[] })
      setPhase('analysis')
    }
  }, [exam, answers, candidat, dayNum, today])

  const handleGraphExtracted = useCallback((idx: number, graph: string) => {
    setExam(prev => {
      if (!prev) return prev
      const exs = [...prev.exercises]
      if (exs[idx] && !exs[idx].graph) exs[idx] = { ...exs[idx], graph }
      return { ...prev, exercises: exs }
    })
  }, [])

  const handleRestart = () => {
    setPhase('inscription'); setExam(null); setCandidat(null)
    setAnswers(''); setCorrections({}); setAnalysis(null)
  }

  if (phase === 'statistiques') return <PageStatistiques onBack={handleRestart}/>
  
  if (phase === 'inscription') return <PhaseInscription onSubmit={handleInscription} onStatistiques={()=>setPhase('statistiques')}/>
  if (phase === 'generating' && candidat) return <PhaseGenerating candidat={candidat}/>
  if (phase === 'exam' && exam && candidat) return <PhaseExam exam={exam} candidat={candidat} onSubmit={handleSubmitExam}/>
  if (phase === 'correction' && exam && candidat) return(
    <PhaseCorrection exam={exam} candidat={candidat} answers={answers}
      onFinish={handleFinishCorrection} onGraphExtracted={handleGraphExtracted}/>
  )
  if ((phase==='analysing'||phase==='analysis') && exam && candidat) return(
    analysis
      ? <PhaseAnalysis analysis={analysis} exam={exam} candidat={candidat} onRestart={handleRestart}/>
      : <div style={{minHeight:'100vh',background:'#0a0a1a',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontFamily:'system-ui',flexDirection:'column',gap:16}}>
          <div style={{width:40,height:40,border:'3px solid rgba(245,158,11,0.3)',borderTopColor:'#f59e0b',borderRadius:'50%',animation:'spin 0.8s linear infinite'}}/>
          <span style={{fontSize:16,color:'rgba(255,255,255,0.6)'}}>Analyse de votre performance…</span>
          <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        </div>
  )
  return <PhaseInscription onSubmit={handleInscription} onStatistiques={()=>setPhase('statistiques')}/>
}

export default function BacBlancPage() {
  return (
    <Suspense fallback={
      <div style={{minHeight:'100vh',background:'#0a0a1a',display:'flex',alignItems:'center',justifyContent:'center',color:'rgba(255,255,255,0.5)',fontFamily:'system-ui'}}>
        Chargement…
      </div>
    }>
      <BacBlancInner/>
    </Suspense>
  )
}