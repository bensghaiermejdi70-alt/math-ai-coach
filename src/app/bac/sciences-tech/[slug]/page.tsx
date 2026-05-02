'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// Route : /bac/sciences-tech/[slug]
// Programme officiel CNP Tunisie — Sciences Techniques · Coef. 3

const C = { thm:'#a78bfa', def:'#4f6ef7', formule:'#f5c842', prop:'#06d6a0', corollaire:'#f97316' }
const L: Record<string,string> = { thm:'Théorème', def:'Définition', formule:'Formule clé', prop:'Propriété', corollaire:'Corollaire' }

const NAV_ORDER = ['fonctions-generalites','limites-continuite','derivation','etude-fonctions','logarithme','exponentielle','suites','geometrie-plane','geometrie-espace','statistiques','denombrement','probabilites']
const TITRES: Record<string,string> = {'fonctions-generalites': "Fonctions \u2014 G\u00e9n\u00e9ralit\u00e9s", 'limites-continuite': "Limites et Continuit\u00e9", 'derivation': "D\u00e9rivation", 'etude-fonctions': "\u00c9tude de Fonctions", 'logarithme': "Logarithme N\u00e9p\u00e9rien", 'exponentielle': "Fonction Exponentielle", 'suites': "Suites Num\u00e9riques", 'geometrie-plane': "G\u00e9om\u00e9trie Plane", 'geometrie-espace': "G\u00e9om\u00e9trie dans l'Espace", 'statistiques': "Statistiques \u2014 S\u00e9ries \u00e0 deux variables", 'denombrement': "D\u00e9nombrement", 'probabilites': "Probabilit\u00e9s"}
const NUMS: Record<string,string> = {'fonctions-generalites': 'CH 01', 'limites-continuite': 'CH 02', 'derivation': 'CH 03', 'etude-fonctions': 'CH 04', 'logarithme': 'CH 05', 'exponentielle': 'CH 06', 'suites': 'CH 07', 'geometrie-plane': 'CH 08', 'geometrie-espace': 'CH 09', 'statistiques': 'CH 10', 'denombrement': 'CH 11', 'probabilites': 'CH 12'}
const SEC_COLOR: Record<string,string> = {'fonctions-generalites':'#f59e0b', 'limites-continuite':'#f59e0b', 'derivation':'#f59e0b', 'etude-fonctions':'#f59e0b', 'logarithme':'#f59e0b', 'exponentielle':'#f59e0b', 'suites':'#f59e0b', 'geometrie-plane':'#4f6ef7', 'geometrie-espace':'#4f6ef7', 'statistiques':'#f97316', 'denombrement':'#f5c842', 'probabilites':'#f5c842'}

const CHAPITRES: Record<string,{
  ch:string; titre:string; badge:string; desc:string; duree:string; section:string;
  theoremes:{id:string;type:string;nom:string;enonce:string}[];
  exercices:{id:string;niveau:string;titre:string;enonce:string;correction:string}[];
}> = {
  'fonctions-generalites': {
    ch:'CH 01', titre:"Fonctions \u2014 G\u00e9n\u00e9ralit\u00e9s", badge:'Analyse',
    duree:'~5h', section:"Partie 1 \u2014 Analyse (7 ch.)",
    desc:"Ensemble de d\u00e9finition, parit\u00e9 f(-x)=f(x)/f(-x)=-f(x), p\u00e9riodicit\u00e9 (p\u00e9riode T), op\u00e9rations sur fonctions (somme, produit, quotient, compos\u00e9e), fonction \u221af (conditions f(x)\u22650), valeur absolue |f|.",
    theoremes:[
      {id:'D1',type:'def',nom:"Ensemble de d\u00e9finition",
       enonce:"D_f = ensemble des x pour lesquels f(x) est d\u00e9finie.\n\nCas courants :\n\u2022 1/g(x) : g(x)\u22600\n\u2022 \u221ag(x) : g(x)\u22650\n\u2022 ln(g(x)) : g(x)>0\n\nIntersection des conditions si plusieurs contraintes."},
      {id:'D2',type:'def',nom:"Parit\u00e9 et p\u00e9riodicit\u00e9",
       enonce:"f paire : D_f sym\u00e9trique et f(\u2212x)=f(x) \u2192 courbe sym\u00e9trique par rapport \u00e0 Oy\nf impaire : f(\u2212x)=\u2212f(x) \u2192 sym\u00e9trique par rapport \u00e0 O\nf p\u00e9riodique T : f(x+T)=f(x) pour tout x\u2208D_f\n\nExemples : sin, cos (T=2\u03c0) ; tan (T=\u03c0) ; |sin x| (T=\u03c0)"},
      {id:'D3',type:'def',nom:"Op\u00e9rations sur les fonctions",
       enonce:"Somme/produit/quotient (avec g\u22600) : D=D_f\u2229D_g\nCompos\u00e9e g\u2218f : x\u21a6g(f(x)), D={x\u2208D_f : f(x)\u2208D_g}\n\n\u221af(x) : conditions f(x)\u22650\n|f(x)| : d\u00e9fini sur D_f entier\nf+g, fg, f/g, g\u2218f : appliquer les r\u00e8gles"},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:"Domaine",
       enonce:"D_f pour f(x)=\u221a(x+2)/ln(x).",
       correction:"x+2\u22650\u2192x\u2265\u22122 ; x>0 ; x\u22601.\nD_f=]0;1[\u222a]1;+\u221e[."},
      {id:'EX02',niveau:'Facile',titre:"Parit\u00e9",
       enonce:"f(x)=x\u00b3+sin x. Paire ou impaire ?",
       correction:"f(\u2212x)=\u2212x\u00b3\u2212sin x=\u2212f(x). f est impaire."},
    ],
  },
  'limites-continuite': {
    ch:'CH 02', titre:"Limites et Continuit\u00e9", badge:'Analyse',
    duree:'~5h', section:"Partie 1 \u2014 Analyse (7 ch.)",
    desc:"Limite finie en un r\u00e9el a (d\u00e9finition, unicit\u00e9), limite infinie en a (asymptote verticale), limite \u00e0 l'infini (horizontale, infinie), op\u00e9rations (formes ind\u00e9termin\u00e9es), continuit\u00e9 en un point et sur un intervalle, TVI, th\u00e9or\u00e8me de la bijection (fonction continue strictement monotone), asymptotes verticales/horizontales/obliques.",
    theoremes:[
      {id:'D1',type:'def',nom:"Limite en un point",
       enonce:"lim(x\u2192a) f(x)=\u2113 : f(x) arbitrairement proche de \u2113 pour x\u2192a\nLimites \u00e0 gauche et droite \u2192 si \u00e9gales \u2192 limite existe\n\nOp\u00e9rations (\u2113,m\u2208\u211d) : somme \u2113+m, produit \u2113m, quotient \u2113/m (m\u22600)\nFormes ind\u00e9termin\u00e9es : 0/0, \u221e/\u221e, \u221e\u2212\u221e, 0\u00b7\u221e \u2192 lever par factorisation, conjugu\u00e9, \u00e9quivalents"},
      {id:'T1',type:'thm',nom:"Th\u00e9or\u00e8me des Valeurs Interm\u00e9diaires (TVI)",
       enonce:"f continue sur [a,b] et k entre f(a) et f(b) :\n\u2203 c\u2208[a,b] : f(c)=k\n\nCorollaire : si f(a)\u00b7f(b)<0 \u2192 \u2203 racine dans ]a,b[\nSi f strictement monotone \u2192 racine unique\n\nDichotomie : diviser [a,b] par 2 \u00e0 chaque \u00e9tape pour approcher c"},
      {id:'T2',type:'thm',nom:"Th\u00e9or\u00e8me de la bijection",
       enonce:"f continue et strictement monotone sur [a,b] :\n\u2192 f r\u00e9alise une bijection de [a,b] vers [f(a),f(b)]\n\u2192 Pour tout k\u2208[f(a),f(b)], \u2203 unique c : f(c)=k"},
      {id:'D2',type:'def',nom:"Asymptotes",
       enonce:"Verticale x=a : lim(x\u2192a)|f(x)|=+\u221e\nHorizontale y=\u2113 : lim(x\u2192\u00b1\u221e)f(x)=\u2113\nOblique y=ax+b : lim(x\u2192\u00b1\u221e)[f(x)\u2212ax\u2212b]=0\n  a=lim f(x)/x ; b=lim[f(x)\u2212ax]\n\nBranche parabolique : lim f(x)/x=\u00b1\u221e"},
      {id:'F1',type:'formule',nom:"Croissances compar\u00e9es",
       enonce:"x\u2192+\u221e : e\u02e3\u226bx\u207f\u226bln x (pour tout n>0)\nlim e\u02e3/x\u207f=+\u221e ; lim(ln x)/x\u1d45=0 (\u03b1>0)\nx\u21920\u207a : lim x\u00b7ln x=0\n\nLimites fondamentales :\nlim(x\u21920) sin x/x=1 ; lim(x\u21920)(e\u02e3\u22121)/x=1"},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:"Asymptote oblique",
       enonce:"f(x)=(x\u00b2+2x)/(x+1). Asymptote oblique.",
       correction:"a=lim f/x=1. b=lim[f(x)\u2212x]=lim[x/(x+1)]=1. AO : y=x+1."},
      {id:'EX02',niveau:'Intermédiaire',titre:"TVI",
       enonce:"Montrer que f(x)=x\u00b3\u22122x+1 a une racine dans ]\u22122;\u22121[.",
       correction:"f(\u22122)=\u22123<0 ; f(\u22121)=2>0. f continue \u2192 \u2203 c par TVI."},
    ],
  },
  'derivation': {
    ch:'CH 03', titre:"D\u00e9rivation", badge:'Analyse',
    duree:'~5h', section:"Partie 1 \u2014 Analyse (7 ch.)",
    desc:"Nombre d\u00e9riv\u00e9 (taux d'accroissement, limite), interpr\u00e9tation g\u00e9om\u00e9trique, approximation affine f(x)\u2248f(a)+f'(a)(x\u2212a), d\u00e9rivabilit\u00e9 sur un intervalle, d\u00e9riv\u00e9es usuelles (x\u207f, 1/x, \u221ax, sin x, cos x, e\u02e3, ln x), op\u00e9rations (somme, produit, quotient, compos\u00e9e (u\u2218v)'), tangente y=f'(a)(x\u2212a)+f(a), signe de f' et variations, extrema locaux et tableau de variation.",
    theoremes:[
      {id:'D1',type:'def',nom:"Nombre d\u00e9riv\u00e9 et tangente",
       enonce:"f'(a)=lim(x\u2192a)(f(x)\u2212f(a))/(x\u2212a)\nTangente en (a,f(a)) : y=f'(a)(x\u2212a)+f(a)\nApproximation affine : f(x)\u2248f(a)+f'(a)(x\u2212a)"},
      {id:'F1',type:'formule',nom:"D\u00e9riv\u00e9es usuelles",
       enonce:"(x\u207f)'=nx\u207f\u207b\u00b9 ; (\u221ax)'=1/(2\u221ax) ; (1/x)'=\u22121/x\u00b2\n(e\u02e3)'=e\u02e3 ; (ln x)'=1/x\n(sin x)'=cos x ; (cos x)'=\u2212sin x ; (tan x)'=1/cos\u00b2x\n(arcsin x)'=1/\u221a(1\u2212x\u00b2) ; (arctan x)'=1/(1+x\u00b2)\n\n(u+v)'=u'+v' ; (uv)'=u'v+uv'\n(u/v)'=(u'v\u2212uv')/v\u00b2 ; (f\u2218g)'=f'(g)\u00b7g'"},
      {id:'T1',type:'thm',nom:"Variations, extrema et convexit\u00e9",
       enonce:"f'(x)>0 sur I \u2192 f croissante ; f'(x)<0 \u2192 f d\u00e9croissante\nf'(a)=0 et changement de signe \u2192 extremum local en a\n\nConvexit\u00e9 : f''(x)\u22650 \u2194 f convexe sur I\nPoint d'inflexion : f'' change de signe\nTh\u00e9or\u00e8me de Rolle : f continue sur [a,b], d\u00e9rivable sur ]a,b[, f(a)=f(b) \u2192 \u2203c : f'(c)=0"},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:"D\u00e9riv\u00e9e compos\u00e9e",
       enonce:"f(x)=sin(3x\u00b2+1). Calculer f'(x).",
       correction:"f'(x)=6x\u00b7cos(3x\u00b2+1)."},
      {id:'EX02',niveau:'Intermédiaire',titre:"Extrema",
       enonce:"f(x)=x\u00b3\u22126x+2. Extrema locaux.",
       correction:"f'(x)=3x\u00b2\u22126=0 \u2192 x=\u00b1\u221a2.\nMax local f(\u2212\u221a2)=2+4\u221a2 ; min local f(\u221a2)=2\u22124\u221a2."},
    ],
  },
  'etude-fonctions': {
    ch:'CH 04', titre:"\u00c9tude de Fonctions", badge:'Analyse',
    duree:'~5h', section:"Partie 1 \u2014 Analyse (7 ch.)",
    desc:"Polyn\u00f4mes deg 2 (sommet, signe), deg 3, bicarr\u00e9es ax\u2074+bx\u00b2+c (substitution X=x\u00b2), rationnelles type 1 ax+b/cx+d (centre de sym\u00e9trie), type 2 ax\u00b2+bx+c/dx+e, type 3 ax\u00b2+bx+c/dx\u00b2+ex+f, irrationnelles \u221a(ax+b) et \u221a(ax\u00b2+bx+c), circulaires sin(ax+b), cos(ax+b) et tan x.",
    theoremes:[
      {id:'F1',type:'formule',nom:"Polyn\u00f4mes",
       enonce:"Deg 2 : sommet S(\u2212b/2a;\u2212\u0394/4a) ; signe selon \u0394 et a\nDeg 3 : f'(x)=3ax\u00b2+2bx+c ; inflexion en x=\u2212b/(3a)\nBicarr\u00e9e ax\u2074+bx\u00b2+c : substitution X=x\u00b2 \u2192 aX\u00b2+bX+c"},
      {id:'F2',type:'formule',nom:"Fonctions rationnelles",
       enonce:"Type 1 (ax+b)/(cx+d) :\n\u2022 AV x=\u2212d/c ; AH y=a/c ; centre sym. (\u2212d/c;a/c)\n\nType 2 (ax\u00b2+bx+c)/(dx+e) :\n\u2022 Division euclidienne \u2192 AO\n\nType 3 (ax\u00b2+bx+c)/(dx\u00b2+ex+f) :\n\u2022 \u00c9tude du signe du d\u00e9nominateur"},
      {id:'F3',type:'formule',nom:"Fonctions irrationnelles et circulaires",
       enonce:"Irrationnelles :\n\u2022 \u221a(ax+b) : D=[\u2212b/a;+\u221e[ ; d\u00e9riv\u00e9e a/(2\u221a(ax+b))\n\u2022 \u221a(ax\u00b2+bx+c) : D selon signe du trin\u00f4me\n\nCirculaires :\n\u2022 sin(ax+b) : p\u00e9riode 2\u03c0/a ; (sin(ax+b))'=a\u00b7cos(ax+b)\n\u2022 cos(ax+b) : p\u00e9riode 2\u03c0/a ; (cos(ax+b))'=\u2212a\u00b7sin(ax+b)\n\u2022 tan x : p\u00e9riode \u03c0 ; D=\u211d\\{\u03c0/2+k\u03c0}\n\nExponentielle ln x et e\u02e3 int\u00e9gr\u00e9es dans l'\u00e9tude"},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:"Rationnelle type 1",
       enonce:"f(x)=(2x\u22121)/(x+3). Asymptotes.",
       correction:"AV : x=\u22123. AH : y=2. Centre de sym\u00e9trie (\u22123;2)."},
      {id:'EX02',niveau:'Intermédiaire',titre:"Bicarr\u00e9e",
       enonce:"f(x)=x\u2074\u22125x\u00b2+4. Trouver les racines.",
       correction:"X=x\u00b2 : X\u00b2\u22125X+4=0 \u2192 X=1 ou X=4.\nx=\u00b11 ou x=\u00b12."},
    ],
  },
  'logarithme': {
    ch:'CH 05', titre:"Logarithme N\u00e9p\u00e9rien", badge:'Analyse',
    duree:'~5h', section:"Partie 1 \u2014 Analyse (7 ch.)",
    desc:"D\u00e9finition de ln x pour x>0, propri\u00e9t\u00e9s alg\u00e9briques (ln(ab)=ln a+ln b, ln(a\u207f)=n\u00b7ln a), d\u00e9riv\u00e9e (ln x)'=1/x et (ln u)'=u'/u, \u00e9tude compl\u00e8te (variations, limites, courbe), fonctions du type x\u21a6ln(u(x)).",
    theoremes:[
      {id:'D1',type:'def',nom:"D\u00e9finition et propri\u00e9t\u00e9s alg\u00e9briques",
       enonce:"(ln x)'=1/x pour x>0 ; ln(1)=0 ; ln(e)=1\nR\u00e9ciproque de e\u02e3 : ln(e\u02e3)=x ; e^(ln x)=x\n\nln(ab)=ln a+ln b ; ln(a/b)=ln a\u2212ln b\nln(a\u207f)=n\u00b7ln a ; ln(\u221aa)=(1/2)ln a\nln(1/a)=\u2212ln a"},
      {id:'F1',type:'formule',nom:"D\u00e9riv\u00e9e compos\u00e9e et \u00e9tude",
       enonce:"(ln u)'=u'/u (u>0) ; (ln|u|)'=u'/u\n\n\u00c9tude de ln x :\n\u2022 Domaine ]0;+\u221e[ ; croissante ; concave\n\u2022 lim(x\u21920\u207a)ln x=\u2212\u221e ; lim(x\u2192+\u221e)=+\u221e\n\nCroissances compar\u00e9es :\nlim(x\u2192+\u221e)(ln x)/x\u1d45=0 (\u03b1>0)\nlim(x\u21920\u207a) x\u00b7ln x=0"},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:"Simplification",
       enonce:"Simplifier A=ln(4)\u22122ln(\u221a2).",
       correction:"A=ln 4\u2212ln 2=ln 2."},
      {id:'EX02',niveau:'Intermédiaire',titre:"\u00c9tude",
       enonce:"f(x)=x\u00b7ln x sur ]0;+\u221e[. Minimum.",
       correction:"f'(x)=ln x+1=0 \u2192 x=1/e. Min : f(1/e)=\u22121/e."},
    ],
  },
  'exponentielle': {
    ch:'CH 06', titre:"Fonction Exponentielle", badge:'Analyse',
    duree:'~5h', section:"Partie 1 \u2014 Analyse (7 ch.)",
    desc:"D\u00e9finition e\u02e3 (r\u00e9ciproque de ln), propri\u00e9t\u00e9s alg\u00e9briques (e^(a+b)=e\u1d43\u00d7e\u1d47, (e\u1d43)\u207f=e^(na)), d\u00e9riv\u00e9e (e\u02e3)'=e\u02e3 et (e\u1d58)'=u'\u00b7e\u1d58, \u00e9tude compl\u00e8te (variations, limites, courbe), fonctions du type x\u21a6e^(u(x)).",
    theoremes:[
      {id:'D1',type:'def',nom:"D\u00e9finition et propri\u00e9t\u00e9s",
       enonce:"e\u02e3 = r\u00e9ciproque de ln ; (e\u02e3)'=e\u02e3 ; e\u2070=1 ; e\u02e3>0\ne^(a+b)=e\u1d43e\u1d47 ; (e\u1d43)\u207f=e\u207f\u1d43 ; e\u207b\u02e3=1/e\u02e3\n(e\u1d58)'=u'e\u1d58\n\n\u00c9tude : croissante sur \u211d ; convexe (in\u00e9galit\u00e9 e\u02e3\u22651+x)\nlim(x\u2192\u2212\u221e)e\u02e3=0 ; lim(x\u2192+\u221e)=+\u221e"},
      {id:'F1',type:'formule',nom:"Croissances compar\u00e9es et base a\u02e3",
       enonce:"lim(x\u2192+\u221e) e\u02e3/x\u207f=+\u221e (n>0)\nlim(x\u2192\u2212\u221e) |x\u207f|e\u02e3=0\n\nBase a\u02e3=e^(x ln a) (a>0, a\u22601) ; (a\u02e3)'=ln(a)\u00b7a\u02e3"},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:"\u00c9quation",
       enonce:"R\u00e9soudre e^(2x)=5.",
       correction:"2x=ln 5 \u2192 x=ln5/2."},
      {id:'EX02',niveau:'Intermédiaire',titre:"Syst\u00e8me",
       enonce:"R\u00e9soudre e^(2x)\u22123e\u02e3+2=0.",
       correction:"t=e\u02e3>0 : t\u00b2\u22123t+2=0 \u2192 t=1 ou t=2.\nx=0 ou x=ln2."},
    ],
  },
  'suites': {
    ch:'CH 07', titre:"Suites Num\u00e9riques", badge:'Analyse',
    duree:'~5h', section:"Partie 1 \u2014 Analyse (7 ch.)",
    desc:"Suites arithm\u00e9tiques (u_{n+1}=u_n+r, terme g\u00e9n\u00e9ral, somme), g\u00e9om\u00e9triques (u_{n+1}=q\u00b7u_n, terme g\u00e9n\u00e9ral, somme), suites du type u_n=f(n) (f polyn\u00f4me ou rationnelle), r\u00e9currentes u_{n+1}=f(u_n) (cas affine au_n+b, cas homographique (au_n+b)/(cu_n+d)), limite d'une suite, th\u00e9or\u00e8me des gendarmes, principe de r\u00e9currence.",
    theoremes:[
      {id:'D1',type:'def',nom:"Suites arithm\u00e9tiques et g\u00e9om\u00e9triques",
       enonce:"Arithm\u00e9tique (raison r) : u\u2099\u208a\u2081=u\u2099+r\n\u2022 u\u2099=u\u2080+nr ; S\u2099=n(u\u2081+u\u2099)/2\n\nG\u00e9om\u00e9trique (raison q\u22600) : u\u2099\u208a\u2081=q\u00b7u\u2099\n\u2022 u\u2099=u\u2080\u00b7q\u207f ; S\u2099=u\u2081(1\u2212q\u207f)/(1\u2212q)\n\u2022 |q|<1\u21920 ; q>1\u2192+\u221e ; |q|>1, q<0 : diverge"},
      {id:'T1',type:'thm',nom:"Convergence \u2014 Suites monotones born\u00e9es",
       enonce:"Toute suite croissante et major\u00e9e converge.\nToute suite d\u00e9croissante et minor\u00e9e converge.\n\nTh\u00e9or\u00e8me des gendarmes :\nv\u2099\u2264u\u2099\u2264w\u2099 et lim v\u2099=lim w\u2099=\u2113 \u27f9 lim u\u2099=\u2113"},
      {id:'D2',type:'def',nom:"Suite r\u00e9currente u\u2099\u208a\u2081=f(u\u2099)",
       enonce:"Cas affine u\u2099\u208a\u2081=au\u2099+b (a\u22601) :\n\u2022 Point fixe \u2113=b/(1\u2212a)\n\u2022 v\u2099=u\u2099\u2212\u2113 g\u00e9om\u00e9trique raison a\n\u2022 u\u2099=\u2113+(u\u2080\u2212\u2113)\u00b7a\u207f\n\nCas homographique u\u2099\u208a\u2081=(au\u2099+b)/(cu\u2099+d) :\n\u2022 Points fixes : \u2113 est racine de c\u2113\u00b2+(d\u2212a)\u2113\u2212b=0\n\u2022 Changement de variable v\u2099=1/(u\u2099\u2212\u2113) ou (u\u2099\u2212\u2113)/(u\u2099\u2212\u2113')\n\nSi u\u2099\u2192\u2113 et f continue : f(\u2113)=\u2113"},
      {id:'T2',type:'thm',nom:"Principe de r\u00e9currence",
       enonce:"Pour montrer P(n) vraie pour tout n\u2265n\u2080 :\n1. Base : v\u00e9rifier P(n\u2080)\n2. H\u00e9r\u00e9dit\u00e9 : supposer P(n) et montrer P(n+1)\n\u27f9 P(n) vraie pour tout n\u2265n\u2080"},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:"Suite g\u00e9om\u00e9trique",
       enonce:"u\u2099 g\u00e9om\u00e9trique, u\u2080=4, q=1/2. lim u\u2099 ?",
       correction:"|q|=1/2<1 \u2192 lim u\u2099=0."},
      {id:'EX02',niveau:'Intermédiaire',titre:"Suite affine",
       enonce:"u\u2099\u208a\u2081=2u\u2099\u22123, u\u2080=1. Exprimer u\u2099.",
       correction:"\u2113=3. v\u2099=u\u2099\u22123, v\u2080=\u22122. v\u2099=\u22122\u00d72\u207f. u\u2099=3\u22122^(n+1)."},
    ],
  },
  'geometrie-plane': {
    ch:'CH 08', titre:"G\u00e9om\u00e9trie Plane", badge:'Géométrie',
    duree:'~5h', section:"Partie 2 \u2014 G\u00e9om\u00e9trie (2 ch.)",
    desc:"Vecteurs du plan (composantes, colin\u00e9arit\u00e9, bases), droites du plan (\u00e9quations cart\u00e9siennes, r\u00e9duites, param\u00e9triques), cercles (\u00e9quation, tangente, intersection avec droite), coniques : ellipse (d\u00e9finition, \u00e9quation, propri\u00e9t\u00e9s), hyperbole (d\u00e9finition, \u00e9quation, asymptotes), parabole (d\u00e9finition, \u00e9quation, directrice, foyer).",
    theoremes:[
      {id:'F1',type:'formule',nom:"Vecteurs et droites",
       enonce:"Vecteur u\u20d7(x;y) ; \u2016u\u20d7\u2016=\u221a(x\u00b2+y\u00b2)\nColin\u00e9arit\u00e9 : u\u20d7(x;y)\u2225v\u20d7(x';y') \u27fa xy'\u2212yx'=0\n\nDroite par A(x\u2080;y\u2080), directeur u\u20d7(a;b) :\n\u2022 Param\u00e9trique : x=x\u2080+at ; y=y\u2080+bt\n\u2022 Cart\u00e9sienne : bx\u2212ay+c=0 (c=\u2212bx\u2080+ay\u2080)\n\u2022 R\u00e9duite : y=mx+p (m=b/a)"},
      {id:'F2',type:'formule',nom:"Cercles",
       enonce:"Cercle centre \u03a9(a;b), rayon r : (x\u2212a)\u00b2+(y\u2212b)\u00b2=r\u00b2\nTangente en M(x\u2080;y\u2080) : (x\u2080\u2212a)(x\u2212a)+(y\u2080\u2212b)(y\u2212b)=r\u00b2\n\nDistance de \u03a9(\u03b1;\u03b2) \u00e0 droite bx\u2212ay+c=0 :\nd=|b\u03b1\u2212a\u03b2+c|/\u221a(a\u00b2+b\u00b2)\nd<r : s\u00e9cante ; d=r : tangente ; d>r : ext\u00e9rieure"},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:"\u00c9quation d'une droite",
       enonce:"Droite passant par A(1;2) et B(3;6).",
       correction:"m=(6\u22122)/(3\u22121)=2. y\u22122=2(x\u22121) \u2192 y=2x."},
      {id:'EX02',niveau:'Intermédiaire',titre:"Tangente au cercle",
       enonce:"Cercle (x\u22121)\u00b2+(y\u22122)\u00b2=25. Tangente en M(4;6).",
       correction:"3(x\u22121)+4(y\u22122)=25 \u2192 3x+4y=36."},
    ],
  },
  'geometrie-espace': {
    ch:'CH 09', titre:"G\u00e9om\u00e9trie dans l'Espace", badge:'Géométrie',
    duree:'~5h', section:"Partie 2 \u2014 G\u00e9om\u00e9trie (2 ch.)",
    desc:"Vecteurs de l'espace (composantes, op\u00e9rations), bases (trois vecteurs non coplanaires), produit scalaire dans l'espace (d\u00e9finition, propri\u00e9t\u00e9s, applications), produit vectoriel (d\u00e9finition, propri\u00e9t\u00e9s, applications g\u00e9om\u00e9triques), droites (repr\u00e9sentation param\u00e9trique, cart\u00e9sienne), plans (ax+by+cz+d=0), positions relatives (droite-droite, droite-plan, plan-plan), distance point-plan et point-droite.",
    theoremes:[
      {id:'F1',type:'formule',nom:"Vecteurs et produit scalaire",
       enonce:"u\u20d7(x;y;z) ; \u2016u\u20d7\u2016=\u221a(x\u00b2+y\u00b2+z\u00b2)\nu\u20d7\u00b7v\u20d7=xx'+yy'+zz'=\u2016u\u20d7\u2016\u2016v\u20d7\u2016cos\u03b8\nu\u20d7\u22a5v\u20d7 \u27fa u\u20d7\u00b7v\u20d7=0 ; \u2016u\u20d7\u2016\u00b2=u\u20d7\u00b7u\u20d7"},
      {id:'D1',type:'def',nom:"Plans et droites",
       enonce:"Plan : ax+by+cz+d=0, normale n\u20d7(a;b;c)\nPlan par A(x\u2080;y\u2080;z\u2080), normale n\u20d7 :\na(x\u2212x\u2080)+b(y\u2212y\u2080)+c(z\u2212z\u2080)=0\n\nDroite par A, directeur u\u20d7(a;b;c) :\nx=x\u2080+at ; y=y\u2080+bt ; z=z\u2080+ct (t\u2208\u211d)"},
      {id:'F2',type:'formule',nom:"Distances",
       enonce:"d(M,plan ax+by+cz+d=0)=|ax\u2080+by\u2080+cz\u2080+d|/\u221a(a\u00b2+b\u00b2+c\u00b2)\nd(M,droite)=\u2016AM\u20d7\u2227u\u20d7\u2016/\u2016u\u20d7\u2016 (produit vectoriel)\n\nSph\u00e8re centre \u03a9(a;b;c), rayon r :\n(x\u2212a)\u00b2+(y\u2212b)\u00b2+(z\u2212c)\u00b2=r\u00b2"},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:"\u00c9quation du plan",
       enonce:"Plan par A(1;2;3), normale n\u20d7(2;\u22121;1).",
       correction:"2(x\u22121)\u2212(y\u22122)+(z\u22123)=0 \u2192 2x\u2212y+z\u22123=0."},
      {id:'EX02',niveau:'Intermédiaire',titre:"Distance point-plan",
       enonce:"Distance de M(3;1;2) au plan 2x\u2212y+z\u22123=0.",
       correction:"d=|6\u22121+2\u22123|/\u221a(4+1+1)=|4|/\u221a6=4\u221a6/6=2\u221a6/3."},
    ],
  },
  'statistiques': {
    ch:'CH 10', titre:"Statistiques \u2014 S\u00e9ries \u00e0 deux variables", badge:'Statistiques',
    duree:'~5h', section:"Partie 3 \u2014 Statistiques",
    desc:"Nuage de points (xi, yi), point moyen G(x\u0304, \u0233), ajustement lin\u00e9aire (droite de r\u00e9gression par moindres carr\u00e9s), coefficient de corr\u00e9lation r (\u22121\u2264r\u22641, interpr\u00e9tation), pr\u00e9visions par extrapolation et interpolation.",
    theoremes:[
      {id:'F1',type:'formule',nom:"Droite de r\u00e9gression et corr\u00e9lation",
       enonce:"Donn\u00e9es (x\u1d62;y\u1d62), i=1,\u2026,n.\nx\u0304=\u03a3x\u1d62/n ; \u0233=\u03a3y\u1d62/n ; G(x\u0304;\u0233)\ncov(X,Y)=(1/n)\u03a3x\u1d62y\u1d62\u2212x\u0304\u0233\n\u03c3\u00b2\u2093=(1/n)\u03a3x\u1d62\u00b2\u2212x\u0304\u00b2\n\nDroite y=ax+b (passe par G) :\na=cov/\u03c3\u00b2\u2093 ; b=\u0233\u2212ax\u0304\nr=cov/(\u03c3\u2093\u03c3\u1d67) ; \u22121\u2264r\u22641\n|r|\u22481 \u2192 bonne corr\u00e9lation lin\u00e9aire"},
    ],
    exercices:[
      {id:'EX01',niveau:'Intermédiaire',titre:"Droite de r\u00e9gression",
       enonce:"Points : (1;2),(2;4),(3;5),(4;7). Droite y=ax+b.",
       correction:"x\u0304=2,5 ; \u0233=4,5. \u03a3x\u1d62y\u1d62/4=53/4. cov=53/4\u221211,25=2. \u03c3\u00b2\u2093=30/4\u22126,25=1,25.\na=2/1,25=1,6. b=4,5\u22124=0,5. Droite : y=1,6x+0,5."},
    ],
  },
  'denombrement': {
    ch:'CH 11', titre:"D\u00e9nombrement", badge:'Probabilités',
    duree:'~5h', section:"Partie 4 \u2014 Probabilit\u00e9s (2 ch.)",
    desc:"Arrangements A\u2099\u1d56 = n!/(n\u2212p)!, permutations n!, combinaisons C\u2099\u1d56 = (n choose p), formule du bin\u00f4me (a+b)\u207f = \u03a3 C\u2099\u1d4f a\u1d4f b\u207f\u207b\u1d4f.",
    theoremes:[
      {id:'F1',type:'formule',nom:"Arrangements, permutations, combinaisons",
       enonce:"Arrangements (ordre compte) : A\u2099\u1d56=n!/(n\u2212p)!\nPermutations de n \u00e9l\u00e9ments : n!\nCombinaisons (ordre indiff\u00e9rent) : C\u2099\u1d56=n!/(p!(n\u2212p)!)\n\nPropri\u00e9t\u00e9s : C\u2099\u1d56=C\u2099\u207f\u207b\u1d56 ; C\u2099\u1d56+C\u2099\u1d56\u207a\u00b9=C\u2099\u208a\u2081\u1d56\u207a\u00b9\n\nFormule du bin\u00f4me de Newton :\n(a+b)\u207f=\u03a3\u2096\u208c\u2080\u207f C\u2099\u1d4f\u00b7a\u1d4f\u00b7b\u207f\u207b\u1d4f"},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:"Combinaisons",
       enonce:"Calculer C\u2086\u00b3.",
       correction:"C\u2086\u00b3=6!/(3!3!)=20."},
      {id:'EX02',niveau:'Intermédiaire',titre:"Bin\u00f4me",
       enonce:"D\u00e9velopper (1+x)\u2074.",
       correction:"1+4x+6x\u00b2+4x\u00b3+x\u2074."},
    ],
  },
  'probabilites': {
    ch:'CH 12', titre:"Probabilit\u00e9s", badge:'Probabilités',
    duree:'~5h', section:"Partie 4 \u2014 Probabilit\u00e9s (2 ch.)",
    desc:"Vocabulaire probabiliste (univers \u03a9, \u00e9v\u00e9nements \u00e9l\u00e9mentaires), probabilit\u00e9 sur ensemble fini (d\u00e9finition, axiomes), probabilit\u00e9 de la r\u00e9union P(A\u222aB)=P(A)+P(B)\u2212P(A\u2229B), probabilit\u00e9 de l'intersection, \u00e9quiprobabilit\u00e9 P(A)=card(A)/card(\u03a9), probabilit\u00e9s conditionnelles P_A(B)=P(A\u2229B)/P(A), ind\u00e9pendance P(A\u2229B)=P(A)\u00d7P(B).",
    theoremes:[
      {id:'F1',type:'formule',nom:"Probabilit\u00e9s conditionnelles",
       enonce:"P(B|A)=P(A\u2229B)/P(A) (P(A)>0)\nP(A\u2229B)=P(A)\u00b7P(B|A)=P(B)\u00b7P(A|B)\n\nFormule des probabilit\u00e9s totales :\nP(B)=P(A)\u00b7P(B|A)+P(\u0100)\u00b7P(B|\u0100)"},
      {id:'T1',type:'thm',nom:"Th\u00e9or\u00e8me de Bayes et ind\u00e9pendance",
       enonce:"Bayes : P(A|B)=P(A)\u00b7P(B|A)/P(B)\n\nInd\u00e9pendance : P(A\u2229B)=P(A)\u00b7P(B)\n\u27fa P(B|A)=P(B) \u27fa P(A|B)=P(A)\n\n\u00c9quiprobabilit\u00e9 : P(A)=card(A)/card(\u03a9)"},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:"Probabilit\u00e9s totales",
       enonce:"P(A)=0,3, P(B|A)=0,7, P(B|\u0100)=0,1. Calculer P(B).",
       correction:"P(B)=0,3\u00d70,7+0,7\u00d70,1=0,21+0,07=0,28."},
      {id:'EX02',niveau:'Intermédiaire',titre:"Bayes",
       enonce:"Test + : 95% si malade, 3% si sain. 2% malades. P(malade|+) ?",
       correction:"P(+)=0,02\u00d70,95+0,98\u00d70,03=0,019+0,0294=0,0484.\nP(m|+)=0,019/0,0484\u224839%."},
    ],
  },
}

function TypeBadge({type}:{type:string}) {
  const color = C[type as keyof typeof C]||C.def
  return <span style={{fontSize:11,fontWeight:700,padding:'3px 10px',borderRadius:20,background:`${color}20`,color,border:`1px solid ${color}30`,flexShrink:0}}>{L[type as keyof typeof L]||type}</span>
}

export default function SciencesTechSlugPage() {
  const params = useParams()
  const slug = params?.slug as string
  const ch = CHAPITRES[slug]
  const [openEx, setOpenEx] = useState<string|null>(null)
  const secColor = SEC_COLOR[slug]||'#f59e0b'
  const idx = NAV_ORDER.indexOf(slug)
  const prevSlug = idx>0 ? NAV_ORDER[idx-1] : null
  const nextSlug = idx<NAV_ORDER.length-1 ? NAV_ORDER[idx+1] : null

  if (!ch) return (
    <><Navbar/>
      <main style={{paddingTop:80,minHeight:'50vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div style={{textAlign:'center'}}>
          <div style={{fontSize:48,marginBottom:16}}>📭</div>
          <h2 style={{marginBottom:12}}>Chapitre non trouvé</h2>
          <Link href="/bac/sciences-tech" style={{color:'#f59e0b'}}>← Retour Sciences Techniques</Link>
        </div>
      </main><Footer/></>
  )

  const GROUPS: {label:string;slugs:string[]}[] = [
    {label:"Partie 1 \u2014 Analyse (7 ch.)", slugs:["fonctions-generalites", "limites-continuite", "derivation", "etude-fonctions", "logarithme", "exponentielle", "suites"]},
    {label:"Partie 2 \u2014 G\u00e9om\u00e9trie (2 ch.)", slugs:["geometrie-plane", "geometrie-espace"]},
    {label:"Partie 3 \u2014 Statistiques", slugs:["statistiques"]},
    {label:"Partie 4 \u2014 Probabilit\u00e9s (2 ch.)", slugs:["denombrement", "probabilites"]},
  ]

  return (
    <><Navbar/>
      <main style={{position:'relative',zIndex:1,paddingTop:80}}>
        <div style={{borderBottom:'1px solid var(--border)',padding:'14px clamp(20px,5vw,60px)',display:'flex',gap:8,fontSize:13,color:'var(--muted)',alignItems:'center',flexWrap:'wrap'}}>
          <Link href="/bac" style={{color:'var(--muted)',textDecoration:'none'}}>Bac</Link><span>›</span>
          <Link href="/bac/sciences-tech" style={{color:'var(--muted)',textDecoration:'none'}}>Sciences Techniques</Link><span>›</span>
          <span style={{color:secColor,fontWeight:600}}>{ch.ch} — {ch.titre}</span>
        </div>
        <div className="container" style={{paddingTop:40,paddingBottom:80}}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 275px',gap:32,alignItems:'start'}}>
            <div>
              <div style={{marginBottom:32}}>
                <div style={{display:'flex',gap:8,marginBottom:12,flexWrap:'wrap'}}>
                  <span style={{fontFamily:'var(--font-mono)',fontSize:12,background:'var(--surface2)',color:'var(--muted)',padding:'3px 10px',borderRadius:8}}>Sciences Techniques · {ch.ch}</span>
                  <span style={{fontSize:12,background:`${secColor}20`,color:secColor,padding:'3px 10px',borderRadius:12,fontWeight:600}}>{ch.badge}</span>
                  <span style={{fontSize:11,background:'rgba(79,110,247,0.1)',color:'#f59e0b',padding:'3px 10px',borderRadius:12}}>Bac Tunisie · Coef. 3</span>
                </div>
                <h1 style={{fontSize:'clamp(22px,3.5vw,36px)',marginBottom:8}}>{ch.titre}</h1>
                <div style={{fontSize:12,color:secColor,marginBottom:8}}>📂 {ch.section}</div>
                <p style={{color:'var(--text2)',fontSize:14,lineHeight:1.65,marginBottom:14,maxWidth:640}}>{ch.desc}</p>
                <div style={{display:'flex',gap:16,fontSize:12,color:'var(--muted)',flexWrap:'wrap'}}>
                  <span>📊 {ch.theoremes.length} théorèmes & formules</span><span>·</span>
                  <span>📝 {ch.exercices.length} exercices</span><span>·</span>
                  <span>⏱ {ch.duree}</span>
                </div>
              </div>
              <div style={{display:'flex',gap:8,flexWrap:'wrap',alignItems:'center',marginBottom:24,padding:'10px 14px',background:'var(--surface)',borderRadius:12,border:'1px solid var(--border)'}}>
                <span style={{fontSize:12,color:'var(--muted)',marginRight:4}}>Légende :</span>
                {Object.entries(L).map(([k,v])=>(<span key={k} style={{fontSize:11,padding:'2px 10px',borderRadius:20,background:`${C[k as keyof typeof C]}18`,color:C[k as keyof typeof C],border:`1px solid ${C[k as keyof typeof C]}25`,fontWeight:600}}>{v}</span>))}
              </div>
              <div style={{marginBottom:44}}>
                <h2 style={{fontSize:20,marginBottom:18}}>📐 Cours officiel — Théorèmes & Formules</h2>
                <div style={{display:'flex',flexDirection:'column',gap:13}}>
                  {ch.theoremes.map(t=>{
                    const color=C[t.type as keyof typeof C]||C.def
                    return (
                      <div key={t.id} style={{borderLeft:`3px solid ${color}`,background:`${color}07`,borderRadius:'0 12px 12px 0',padding:'15px 20px',border:`1px solid ${color}18`}}>
                        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:8,gap:10,flexWrap:'wrap'}}>
                          <div style={{fontWeight:700,fontSize:14}}>{t.nom}</div>
                          <TypeBadge type={t.type}/>
                        </div>
                        <div style={{fontSize:13,color:'var(--text2)',lineHeight:1.8,whiteSpace:'pre-line',fontFamily:t.type==='formule'?'var(--font-mono)':'inherit'}}>{t.enonce}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div style={{marginBottom:44}}>
                <h2 style={{fontSize:20,marginBottom:18}}>📝 Exercices</h2>
                <div style={{display:'flex',flexDirection:'column',gap:11}}>
                  {ch.exercices.map(ex=>(
                    <div key={ex.id} style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:14,overflow:'hidden'}}>
                      <div style={{padding:'15px 20px'}}>
                        <div style={{display:'flex',gap:8,alignItems:'center',marginBottom:8,flexWrap:'wrap'}}>
                          <span style={{fontFamily:'var(--font-mono)',fontSize:11,color:'var(--muted)',background:'var(--surface2)',padding:'2px 8px',borderRadius:6}}>{ex.id}</span>
                          <span style={{fontSize:11,padding:'2px 8px',borderRadius:10,fontWeight:600,background:ex.niveau==='Facile'?'rgba(6,214,160,0.15)':'rgba(245,158,11,0.15)',color:ex.niveau==='Facile'?'#06d6a0':'#f59e0b'}}>{ex.niveau}</span>
                          <span style={{fontWeight:600,fontSize:14}}>{ex.titre}</span>
                        </div>
                        <p style={{fontSize:13,color:'var(--text2)',margin:0,lineHeight:1.6,whiteSpace:'pre-line'}}>{ex.enonce}</p>
                      </div>
                      <div style={{borderTop:'1px solid var(--border)',padding:'10px 20px',display:'flex',gap:10,flexWrap:'wrap'}}>
                        <Link href={`/solve?q=${encodeURIComponent('Sciences Techniques Tunisie — '+ch.titre+' — '+ex.enonce)}`} className="btn btn-primary" style={{fontSize:12,padding:'6px 14px'}}>🧮 Résoudre avec IA</Link>
                        <button onClick={()=>setOpenEx(openEx===ex.id?null:ex.id)} style={{fontSize:12,padding:'6px 14px',borderRadius:8,border:'1px solid var(--border)',background:'transparent',color:'var(--text2)',cursor:'pointer',fontFamily:'inherit'}}>
                          📋 {openEx===ex.id?'Masquer':'Correction'}
                        </button>
                      </div>
                      {openEx===ex.id&&(
                        <div style={{padding:'13px 20px',borderTop:'1px solid var(--border)',background:`${secColor}06`}}>
                          <div style={{fontSize:11,color:secColor,fontWeight:700,marginBottom:5}}>✅ Correction</div>
                          <div style={{fontSize:13,color:'var(--text2)',lineHeight:1.75,whiteSpace:'pre-line'}}>{ex.correction}</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,borderTop:'1px solid var(--border)',paddingTop:22}}>
                {prevSlug?(<Link href={`/bac/sciences-tech/${prevSlug}`} style={{textDecoration:'none'}}><div className="card" style={{padding:'13px 16px',transition:'transform 0.15s'}} onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'} onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}><div style={{fontSize:11,color:'var(--muted)',marginBottom:3}}>← Précédent</div><div style={{fontWeight:700,fontSize:13}}>{TITRES[prevSlug]}</div></div></Link>):<div/>}
                {nextSlug?(<Link href={`/bac/sciences-tech/${nextSlug}`} style={{textDecoration:'none'}}><div className="card" style={{padding:'13px 16px',textAlign:'right',transition:'transform 0.15s'}} onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'} onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}><div style={{fontSize:11,color:'var(--muted)',marginBottom:3}}>Suivant →</div><div style={{fontWeight:700,fontSize:13}}>{TITRES[nextSlug]}</div></div></Link>):<div/>}
              </div>
            </div>
            <aside style={{position:'sticky',top:88}}>
              <div style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:16,overflow:'hidden',marginBottom:14}}>
                <div style={{padding:'11px 15px',borderBottom:'1px solid var(--border)',fontSize:11,color:'var(--muted)',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.08em'}}>⚙️ Sciences Techniques · 12 ch.</div>
                {GROUPS.map(g=>(
                  <div key={g.label}>
                    <div style={{padding:'7px 15px 3px',fontSize:10,color:'var(--muted)',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.1em',background:'rgba(255,255,255,0.02)'}}>{g.label}</div>
                    {g.slugs.map(s=>(
                      <Link key={s} href={`/bac/sciences-tech/${s}`} style={{textDecoration:'none'}}>
                        <div style={{padding:'8px 15px',borderBottom:'1px solid var(--border)',background:s===slug?`${SEC_COLOR[s]||secColor}12`:'transparent',borderLeft:s===slug?`3px solid ${SEC_COLOR[s]||secColor}`:'3px solid transparent',transition:'all 0.15s'}}
                          onMouseEnter={e=>{if(s!==slug)e.currentTarget.style.background='rgba(255,255,255,0.03)'}}
                          onMouseLeave={e=>{if(s!==slug)e.currentTarget.style.background='transparent'}}>
                          <div style={{fontSize:10,color:'var(--muted)',marginBottom:1,fontFamily:'var(--font-mono)'}}>{NUMS[s]}</div>
                          <div style={{fontSize:11,fontWeight:s===slug?700:400,color:s===slug?SEC_COLOR[s]||secColor:'var(--text2)'}}>{TITRES[s]}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
              <div style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:13,padding:'14px'}}>
                <div style={{fontSize:11,color:'var(--muted)',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:10}}>Actions</div>
                <div style={{display:'flex',flexDirection:'column',gap:7}}>
                  <Link href={`/solve?q=${encodeURIComponent('Explique-moi '+ch.titre+' Sciences Techniques Bac Tunisie')}`} className="btn btn-primary" style={{textAlign:'center',fontSize:12}}>🤖 Chat IA — {ch.titre}</Link>
                  <Link href="/examens" className="btn btn-secondary" style={{textAlign:'center',fontSize:12}}>📋 Exercice type Bac</Link>
                  <Link href="/bac/sciences-tech" className="btn btn-secondary" style={{textAlign:'center',fontSize:12}}>← Retour Sciences Techniques</Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer/>
      <style>{`@media(max-width:900px){div[style*="grid-template-columns: 1fr 275px"]{grid-template-columns:1fr!important;}aside{display:none;}}`}</style>
    </>
  )
}