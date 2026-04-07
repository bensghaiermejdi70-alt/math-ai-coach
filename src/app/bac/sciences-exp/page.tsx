'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

// ================================================================
// SCIENCES EXPÉRIMENTALES — PROGRAMME OFFICIEL CNP TUNISIE
// 4ème année secondaire — Tous théorèmes & définitions du manuel
// TOME I  : CH01 Limites/Continuité · CH02 Suites · CH03 Dérivabilité
//           CH04 Fonctions réciproques · CH05 Logarithme · CH06 Exponentielle
//           CH07 Primitives · CH08 Intégrales · CH09 Équations différentielles
// TOME II : CH01 Complexes · CH02 Géométrie espace · CH03 Probabilités
//           CH04 Variables aléatoires · CH05 Statistiques
// ================================================================

const C = { thm:'#4f6ef7', def:'#06d6a0', formule:'#f59e0b', prop:'#8b5cf6', cor:'#ec4899' }
const L: Record<string,string> = { thm:'Théorème', def:'Définition', formule:'Formule', prop:'Propriété', cor:'Corollaire' }

const TOME1 = [
  {
    ch:'CH 01', slug:'limites', titre:'Continuité et Limites', badge:'Analyse',
    theoremes: [
      { id:'T1', type:'def', nom:'Limite finie en un point', enonce:'lim(x→a) f(x)=ℓ ⟺ ∀ε>0, ∃δ>0 : 0<|x−a|<δ ⟹ |f(x)−ℓ|<ε. On dit que f(x) tend vers ℓ quand x tend vers a.' },
      { id:'T2', type:'def', nom:'Limite infinie / en l\'infini', enonce:'lim(x→+∞) f(x)=ℓ ⟺ ∀ε>0, ∃A>0 : x>A ⟹ |f(x)−ℓ|<ε. lim(x→a) f(x)=+∞ ⟺ ∀M>0, ∃δ>0 : 0<|x−a|<δ ⟹ f(x)>M.' },
      { id:'T3', type:'thm', nom:'Opérations sur les limites', enonce:'Si lim f=ℓ et lim g=m alors : lim(f+g)=ℓ+m · lim(f·g)=ℓ·m · lim(f/g)=ℓ/m (m≠0) · lim(αf)=αℓ. Formes indéterminées : ∞−∞, ∞/∞, 0·∞, 0/0, 1^∞.' },
      { id:'T4', type:'thm', nom:'Théorème des gendarmes', enonce:'Si g(x) ≤ f(x) ≤ h(x) au voisinage de a, et lim(x→a) g(x)=lim(x→a) h(x)=ℓ, alors lim(x→a) f(x)=ℓ.' },
      { id:'T5', type:'thm', nom:'Limite par composition', enonce:'Si lim(x→a) g(x)=b et lim(x→b) f(x)=ℓ, alors lim(x→a) f(g(x))=ℓ. (sous réserve de compatibilité des domaines)' },
      { id:'T6', type:'formule', nom:'Limites trigonométriques usuelles', enonce:'lim(x→0) sin(x)/x = 1 · lim(x→0) tan(x)/x = 1 · lim(x→0) (1−cos x)/x² = 1/2 · lim(x→0) arcsin(x)/x = 1.' },
      { id:'T7', type:'formule', nom:'Limites exponentielle & logarithme', enonce:'lim(x→0) (eˣ−1)/x = 1 · lim(x→0) ln(1+x)/x = 1 · lim(x→+∞) (1+1/x)ˣ = e · lim(x→0) (aˣ−1)/x = ln(a).' },
      { id:'T8', type:'formule', nom:'Croissances comparées', enonce:'Pour tout α>0 et n∈ℕ* : lim(x→+∞) ln(x)/xᵅ = 0 · lim(x→+∞) xⁿ/eˣ = 0 · lim(x→0⁺) x^α·ln(x) = 0 · lim(x→+∞) eˣ/xⁿ = +∞.' },
      { id:'T9', type:'def', nom:'Continuité en un point', enonce:'f est continue en a ⟺ lim(x→a) f(x) = f(a). Cela implique : f définie en a, la limite existe, et elle est égale à f(a).' },
      { id:'T10', type:'thm', nom:'Continuité des fonctions usuelles', enonce:'Les fonctions polynômes, rationnelles (hors pôles), sin, cos, eˣ, ln (sur ]0,+∞[) sont continues sur leur domaine de définition. La somme, le produit et la composée de fonctions continues est continue.' },
      { id:'T11', type:'thm', nom:'Théorème des Valeurs Intermédiaires (TVI)', enonce:'Si f est continue sur [a,b] et k est un réel compris entre f(a) et f(b), alors il existe c∈[a,b] tel que f(c)=k.' },
      { id:'T12', type:'cor', nom:'Corollaire du TVI (annulation)', enonce:'Si f est continue sur [a,b] et f(a)·f(b) < 0, alors il existe c∈]a,b[ tel que f(c)=0.' },
      { id:'T13', type:'thm', nom:'TVI strict — Unicité', enonce:'Si f est continue et strictement monotone sur [a,b], et si k est entre f(a) et f(b), alors il existe un unique c∈[a,b] tel que f(c)=k.' },
      { id:'T14', type:'def', nom:'Prolongement par continuité', enonce:'Si f est définie sur I\\{a} et lim(x→a) f(x)=ℓ, alors la fonction g définie par g(x)=f(x) pour x≠a et g(a)=ℓ est un prolongement par continuité de f en a.' },
      { id:'T15', type:'def', nom:'Asymptotes', enonce:'Horizontale en +∞ : lim(x→+∞) f(x)=ℓ → droite y=ℓ. Verticale en a : lim(x→a) f(x)=±∞ → droite x=a. Oblique y=ax+b : lim(x→±∞) [f(x)−(ax+b)]=0, avec a=lim f(x)/x, b=lim[f(x)−ax].' },
    ]
  },
  {
    ch:'CH 02', slug:'suites', titre:'Suites numériques', badge:'Analyse',
    theoremes: [
      { id:'T1', type:'def', nom:'Suite numérique', enonce:'Une suite (uₙ) est une fonction de ℕ vers ℝ. Elle est arithmétique si uₙ₊₁=uₙ+r (raison r), géométrique si uₙ₊₁=q·uₙ (raison q≠0).' },
      { id:'T2', type:'formule', nom:'Formules suites arithmétiques', enonce:'uₙ = u₀ + nr · uₙ = uₚ + (n−p)r · Sₙ = (n+1)(u₀+uₙ)/2 = (n+1)u₀ + n(n+1)r/2.' },
      { id:'T3', type:'formule', nom:'Formules suites géométriques', enonce:'uₙ = u₀·qⁿ · uₙ = uₚ·qⁿ⁻ᵖ · Sₙ = u₀(1−qⁿ⁺¹)/(1−q) si q≠1 · Sₙ = (n+1)u₀ si q=1.' },
      { id:'T4', type:'def', nom:'Convergence d\'une suite', enonce:'(uₙ) converge vers ℓ ⟺ ∀ε>0, ∃N∈ℕ, n≥N ⟹ |uₙ−ℓ|<ε. On note lim(n→+∞) uₙ = ℓ. Sinon la suite diverge.' },
      { id:'T5', type:'thm', nom:'Opérations sur les limites de suites', enonce:'Si lim uₙ=ℓ et lim vₙ=m : lim(uₙ+vₙ)=ℓ+m · lim(uₙ·vₙ)=ℓ·m · lim(uₙ/vₙ)=ℓ/m (m≠0) · lim(αuₙ)=αℓ.' },
      { id:'T6', type:'thm', nom:'Théorème des gendarmes pour suites', enonce:'Si vₙ ≤ uₙ ≤ wₙ à partir d\'un certain rang, et lim vₙ = lim wₙ = ℓ, alors lim uₙ = ℓ.' },
      { id:'T7', type:'thm', nom:'Suite monotone et bornée', enonce:'Toute suite croissante et majorée est convergente. Toute suite décroissante et minorée est convergente.' },
      { id:'T8', type:'thm', nom:'Suites adjacentes', enonce:'(uₙ) et (vₙ) sont adjacentes si : uₙ croissante, vₙ décroissante, vₙ−uₙ→0. Alors elles convergent vers la même limite ℓ, et uₙ ≤ ℓ ≤ vₙ pour tout n.' },
      { id:'T9', type:'thm', nom:'Suite récurrente uₙ₊₁=f(uₙ)', enonce:'Si (uₙ) converge vers ℓ et f est continue en ℓ, alors ℓ est point fixe de f : f(ℓ)=ℓ. Le signe de uₙ₊₁−uₙ=f(uₙ)−uₙ détermine le sens de variation.' },
      { id:'T10', type:'prop', nom:'Suite géométrique — comportement', enonce:'Si q>1 : uₙ→+∞ (si u₀>0). Si 0<q<1 : uₙ→0. Si q=1 : uₙ constante. Si q<0 : suite oscille. Si |q|<1 : uₙ→0. Si |q|>1 : |uₙ|→+∞.' },
      { id:'T11', type:'prop', nom:'Comparaison suite–suite', enonce:'Si uₙ ≤ vₙ à partir d\'un certain rang et si les deux suites convergent, alors lim uₙ ≤ lim vₙ. Si lim uₙ = lim vₙ = ℓ et uₙ ≤ wₙ ≤ vₙ alors lim wₙ = ℓ.' },
    ]
  },
  {
    ch:'CH 03', slug:'derivabilite', titre:'Dérivabilité', badge:'Analyse',
    theoremes: [
      { id:'T1', type:'def', nom:'Nombre dérivé', enonce:'f est dérivable en a si lim(x→a) [f(x)−f(a)]/(x−a) = lim(h→0) [f(a+h)−f(a)]/h existe et est finie. Cette limite est le nombre dérivé f\'(a).' },
      { id:'T2', type:'prop', nom:'Dérivabilité ⟹ Continuité', enonce:'Si f est dérivable en a alors f est continue en a. La réciproque est fausse (exemple : f(x)=|x| en 0).' },
      { id:'T3', type:'thm', nom:'Opérations sur les dérivées', enonce:'(f+g)\'=f\'+g\' · (αf)\'=αf\' · (f·g)\'=f\'g+fg\' · (f/g)\'=(f\'g−fg\')/g² (g≠0) · (αf+βg)\'=αf\'+βg\'.' },
      { id:'T4', type:'thm', nom:'Dérivée de la composée', enonce:'(f∘g)\'(x) = f\'(g(x))·g\'(x). En notation de Leibniz : si y=f(u) et u=g(x) alors dy/dx = (dy/du)·(du/dx).' },
      { id:'T5', type:'formule', nom:'Dérivées usuelles', enonce:'(xⁿ)\'=nxⁿ⁻¹ · (√x)\'=1/(2√x) · (1/x)\'=−1/x² · (sin x)\'=cos x · (cos x)\'=−sin x · (tan x)\'=1/cos²x=1+tan²x · (eˣ)\'=eˣ · (ln x)\'=1/x.' },
      { id:'T6', type:'thm', nom:'Théorème de Rolle', enonce:'Si f est continue sur [a,b], dérivable sur ]a,b[ et f(a)=f(b), alors il existe c∈]a,b[ tel que f\'(c)=0.' },
      { id:'T7', type:'thm', nom:'Théorème des Accroissements Finis (TAF)', enonce:'Si f est continue sur [a,b] et dérivable sur ]a,b[, alors il existe c∈]a,b[ tel que f\'(c) = [f(b)−f(a)]/(b−a).' },
      { id:'T8', type:'cor', nom:'Corollaire du TAF (monotonie)', enonce:'f dérivable sur I : f\'≥0 sur I ⟺ f croissante · f\'≤0 sur I ⟺ f décroissante · f\'=0 sur I ⟺ f constante · f\'>0 sur I (sauf en des points isolés) ⟺ f strictement croissante.' },
      { id:'T9', type:'thm', nom:'Règle de L\'Hôpital', enonce:'Si lim f(x)=lim g(x)=0 (ou ±∞) et lim f\'(x)/g\'(x)=ℓ, alors lim f(x)/g(x)=ℓ. (f et g dérivables, g\'≠0 au voisinage)' },
      { id:'T10', type:'def', nom:'Convexité et concavité', enonce:'f est convexe sur I si f\'\' ≥ 0 sur I (courbe au-dessus des tangentes). f est concave si f\'\' ≤ 0. Un point d\'inflexion est un point où f\'\' change de signe.' },
      { id:'T11', type:'prop', nom:'Extremums locaux', enonce:'Si f\'(a)=0 et f\'\'(a)>0 : minimum local. Si f\'(a)=0 et f\'\'(a)<0 : maximum local. Si f\'(a)=0 et f\'\'(a)=0 : étude au cas par cas (peut être un point d\'inflexion).' },
      { id:'T12', type:'thm', nom:'Tangente à la courbe', enonce:'Équation de la tangente en (a, f(a)) : y = f\'(a)(x−a) + f(a). Si f\'(a)=0 : tangente horizontale. Si f est non dérivable en a mais f(x)→±∞ : tangente verticale.' },
    ]
  },
  {
    ch:'CH 04', slug:'fonctions-reciproques', titre:'Fonctions réciproques', badge:'Analyse',
    theoremes: [
      { id:'T1', type:'def', nom:'Bijection et fonction réciproque', enonce:'f : I→J est bijective si elle est injective (f(a)=f(b)⟹a=b) et surjective (∀y∈J, ∃x∈I, f(x)=y). Sa réciproque f⁻¹ : J→I vérifie f⁻¹(f(x))=x et f(f⁻¹(y))=y.' },
      { id:'T2', type:'thm', nom:'Théorème de la bijection', enonce:'Toute fonction continue et strictement monotone sur un intervalle I est une bijection de I sur son image J=f(I). Sa réciproque f⁻¹ est continue et strictement monotone de même sens.' },
      { id:'T3', type:'prop', nom:'Courbe de f⁻¹', enonce:'La courbe de f⁻¹ est le symétrique de la courbe de f par rapport à la droite y=x. Un point (a,b) est sur C_f ⟺ (b,a) est sur C_{f⁻¹}.' },
      { id:'T4', type:'thm', nom:'Dérivée de la réciproque', enonce:'Si f est dérivable en a avec f\'(a)≠0, alors f⁻¹ est dérivable en b=f(a) et (f⁻¹)\'(b) = 1/f\'(a) = 1/f\'(f⁻¹(b)).' },
      { id:'T5', type:'def', nom:'Fonction arcsin', enonce:'arcsin = réciproque de sin|_{[−π/2,π/2]}. Domaine : [−1,1]. Image : [−π/2,π/2]. arcsin est impaire, croissante. arcsin(sin x)=x si x∈[−π/2,π/2].' },
      { id:'T6', type:'formule', nom:'Dérivée de arcsin', enonce:'(arcsin x)\' = 1/√(1−x²) pour x∈]−1,1[. (arcsin x)\' > 0 donc arcsin est strictement croissante sur ]−1,1[.' },
      { id:'T7', type:'def', nom:'Fonction arccos', enonce:'arccos = réciproque de cos|_{[0,π]}. Domaine : [−1,1]. Image : [0,π]. arccos est décroissante. arccos(cos x)=x si x∈[0,π]. arcsin(x)+arccos(x)=π/2.' },
      { id:'T8', type:'formule', nom:'Dérivée de arccos', enonce:'(arccos x)\' = −1/√(1−x²) pour x∈]−1,1[.' },
      { id:'T9', type:'def', nom:'Fonction arctan', enonce:'arctan = réciproque de tan|_{]−π/2,π/2[}. Domaine : ℝ. Image : ]−π/2,π/2[. arctan est impaire, croissante. lim(x→+∞) arctan x = π/2. lim(x→−∞) arctan x = −π/2.' },
      { id:'T10', type:'formule', nom:'Dérivée de arctan', enonce:'(arctan x)\' = 1/(1+x²) pour tout x∈ℝ.' },
      { id:'T11', type:'formule', nom:'Formules trigonométriques inverses', enonce:'arcsin(−x)=−arcsin(x) · arccos(−x)=π−arccos(x) · arctan(−x)=−arctan(x) · arctan(x)+arctan(1/x)=π/2 (x>0).' },
    ]
  },
  {
    ch:'CH 05', slug:'logarithme', titre:'Fonction logarithme', badge:'Analyse',
    theoremes: [
      { id:'T1', type:'def', nom:'Définition de ln', enonce:'La fonction logarithme népérien ln est l\'unique fonction dérivable sur ]0,+∞[ telle que ln\'(x)=1/x et ln(1)=0. Elle est l\'inverse de l\'exponentielle.' },
      { id:'T2', type:'prop', nom:'Propriétés algébriques de ln', enonce:'Pour tous a,b>0 et r∈ℚ : ln(ab)=ln(a)+ln(b) · ln(a/b)=ln(a)−ln(b) · ln(aʳ)=r·ln(a) · ln(1/a)=−ln(a) · ln(1)=0 · ln(e)=1.' },
      { id:'T3', type:'prop', nom:'Variations de ln', enonce:'ln est strictement croissante sur ]0,+∞[. ln(x)<0 si 0<x<1, ln(x)=0 si x=1, ln(x)>0 si x>1. lim(x→0⁺) ln(x)=−∞ · lim(x→+∞) ln(x)=+∞.' },
      { id:'T4', type:'formule', nom:'Dérivée de ln et composée', enonce:'(ln x)\'=1/x sur ]0,+∞[. Si u>0 : (ln u)\'=u\'/u. (ln|x|)\'=1/x sur ℝ*. (ln|u|)\'=u\'/u.' },
      { id:'T5', type:'formule', nom:'Croissances comparées avec ln', enonce:'lim(x→+∞) ln(x)/x^α = 0 (α>0) · lim(x→0⁺) x^α·ln(x) = 0 (α>0) · lim(x→+∞) ln(x) = +∞ (mais moins vite que toute puissance).' },
      { id:'T6', type:'def', nom:'Logarithme de base a', enonce:'Pour a>0, a≠1 : logₐ(x) = ln(x)/ln(a). Propriétés : logₐ(ab)=logₐ(a)+logₐ(b), logₐ(aˣ)=x, aˡᵒᵍₐ⁽ˣ⁾=x. log₁₀ = logarithme décimal.' },
      { id:'T7', type:'thm', nom:'Courbe de ln', enonce:'Courbe de y=ln(x) : passe par (1,0) et (e,1). Asymptote verticale x=0. Tangente en (1,0) : y=x−1. Convexe sur ]0,+∞[ car (ln x)\'\'=−1/x²<0.' },
    ]
  },
  {
    ch:'CH 06', slug:'exponentielle', titre:'Fonction exponentielle', badge:'Analyse',
    theoremes: [
      { id:'T1', type:'def', nom:'Définition de exp', enonce:'La fonction exponentielle exp=eˣ est l\'unique fonction dérivable sur ℝ telle que f\'=f et f(0)=1. Elle est la réciproque de ln : eˡⁿ⁽ˣ⁾=x (x>0) et ln(eˣ)=x (x∈ℝ).' },
      { id:'T2', type:'prop', nom:'Propriétés algébriques de exp', enonce:'eᵃ⁺ᵇ=eᵃ·eᵇ · eᵃ⁻ᵇ=eᵃ/eᵇ · (eᵃ)ⁿ=eⁿᵃ · e⁰=1 · e⁻ˣ=1/eˣ · eˣ>0 pour tout x∈ℝ.' },
      { id:'T3', type:'prop', nom:'Variations de exp', enonce:'eˣ strictement croissante sur ℝ. lim(x→−∞) eˣ=0 · lim(x→+∞) eˣ=+∞. eˣ>0 pour tout x. eˣ≥1+x pour tout x (inégalité fondamentale).' },
      { id:'T4', type:'formule', nom:'Dérivée de exp et composée', enonce:'(eˣ)\'=eˣ. Si u est dérivable : (eᵘ)\'=u\'·eᵘ. (e^{ax+b})\'=a·e^{ax+b}.' },
      { id:'T5', type:'formule', nom:'Croissances comparées avec exp', enonce:'Pour tout n∈ℕ : lim(x→+∞) xⁿ/eˣ=0 · lim(x→−∞) |x|ⁿ·eˣ=0 · lim(x→+∞) eˣ/xⁿ=+∞.' },
      { id:'T6', type:'def', nom:'Puissance aˣ et fonction exponentielle de base a', enonce:'Pour a>0 : aˣ=e^{x·ln(a)}. (aˣ)\'=ln(a)·aˣ. Si a>1 : aˣ croissante. Si 0<a<1 : aˣ décroissante. Si a=1 : constante.' },
      { id:'T7', type:'thm', nom:'Courbe de exp', enonce:'Courbe de y=eˣ : passe par (0,1) et (1,e). Asymptote horizontale y=0 en −∞. Tangente en (0,1) : y=x+1. Convexe sur ℝ car (eˣ)\'\'=eˣ>0.' },
      { id:'T8', type:'prop', nom:'Inégalité de convexité', enonce:'eˣ ≥ 1+x pour tout x∈ℝ (avec égalité seulement en x=0). Plus généralement eˣ ≥ 1+x+x²/2 (inégalité utile en suites).' },
    ]
  },
  {
    ch:'CH 07', slug:'primitives', titre:'Primitives', badge:'Analyse',
    theoremes: [
      { id:'T1', type:'def', nom:'Primitive d\'une fonction', enonce:'F est une primitive de f sur I si F\'(x)=f(x) pour tout x∈I. Si F est une primitive de f, toutes les primitives de f s\'écrivent F(x)+C, C∈ℝ.' },
      { id:'T2', type:'thm', nom:'Existence des primitives', enonce:'Toute fonction continue sur un intervalle I admet des primitives sur I.' },
      { id:'T3', type:'formule', nom:'Primitives usuelles', enonce:'∫xⁿdx=xⁿ⁺¹/(n+1)+C (n≠−1) · ∫1/x dx=ln|x|+C · ∫eˣdx=eˣ+C · ∫sin x dx=−cos x+C · ∫cos x dx=sin x+C · ∫1/cos²x dx=tan x+C · ∫1/√(1−x²)dx=arcsin x+C · ∫1/(1+x²)dx=arctan x+C.' },
      { id:'T4', type:'formule', nom:'Primitives de fonctions composées', enonce:'∫u\'·uⁿdu=uⁿ⁺¹/(n+1)+C · ∫u\'/u du=ln|u|+C · ∫u\'eᵘdu=eᵘ+C · ∫u\'sin u du=−cos u+C · ∫u\'cos u du=sin u+C · ∫u\'/√(1−u²)du=arcsin u+C · ∫u\'/(1+u²)du=arctan u+C.' },
      { id:'T5', type:'thm', nom:'Intégration par parties (IPP)', enonce:'∫u\'v dx = [uv] − ∫uv\' dx. Choix stratégique : v\'=partie facile à intégrer, u=partie qui se simplifie en dérivant. Utile pour : ∫xeˣdx, ∫x·ln x dx, ∫arctan x dx, etc.' },
      { id:'T6', type:'thm', nom:'Changement de variable', enonce:'Si x=φ(t), dx=φ\'(t)dt. ∫f(x)dx = ∫f(φ(t))·φ\'(t)dt. Utile pour linéariser les expressions irrationnelles ou trigonométriques.' },
    ]
  },
  {
    ch:'CH 08', slug:'integrales', titre:'Intégrales', badge:'Analyse',
    theoremes: [
      { id:'T1', type:'def', nom:'Intégrale définie', enonce:'Si F est une primitive de f sur [a,b] : ∫ₐᵇ f(x)dx = [F(x)]ₐᵇ = F(b)−F(a). L\'intégrale est indépendante du choix de la primitive.' },
      { id:'T2', type:'thm', nom:'Théorème fondamental de l\'analyse', enonce:'Si f est continue sur [a,b], la fonction G(x)=∫ₐˣ f(t)dt est l\'unique primitive de f sur [a,b] qui s\'annule en a. G\'(x)=f(x).' },
      { id:'T3', type:'prop', nom:'Propriétés de l\'intégrale', enonce:'∫ₐᵇ(αf+βg)dx = α∫ₐᵇf dx + β∫ₐᵇg dx · ∫ₐᵃ f dx=0 · ∫ₐᵇ f dx=−∫ᵦₐ f dx · ∫ₐᵇ f dx=∫ₐᶜ f dx+∫ᶜᵇ f dx (Relation de Chasles).' },
      { id:'T4', type:'thm', nom:'Inégalités sur les intégrales', enonce:'Si f≤g sur [a,b] et a<b : ∫ₐᵇ f dx ≤ ∫ₐᵇ g dx. Corollaire : |∫ₐᵇ f dx| ≤ ∫ₐᵇ |f| dx. Si m≤f(x)≤M sur [a,b] : m(b−a) ≤ ∫ₐᵇ f dx ≤ M(b−a).' },
      { id:'T5', type:'def', nom:'Valeur moyenne d\'une fonction', enonce:'La valeur moyenne de f sur [a,b] est μ = 1/(b−a) · ∫ₐᵇ f(x)dx. Si f est continue sur [a,b], il existe c∈[a,b] tel que f(c)=μ (théorème de la valeur moyenne).' },
      { id:'T6', type:'formule', nom:'Calcul d\'aires', enonce:'Aire entre C_f et l\'axe des x sur [a,b] : A=∫ₐᵇ |f(x)|dx. Aire entre C_f et C_g : A=∫ₐᵇ |f(x)−g(x)|dx. Unité : 1 u.a. = (longueur unité)² en cm².' },
      { id:'T7', type:'thm', nom:'IPP pour intégrales définies', enonce:'∫ₐᵇ u\'(x)v(x)dx = [u(x)v(x)]ₐᵇ − ∫ₐᵇ u(x)v\'(x)dx.' },
    ]
  },
  {
    ch:'CH 09', slug:'equations-diff', titre:'Équations différentielles', badge:'Analyse',
    theoremes: [
      { id:'T1', type:'def', nom:'Équation différentielle', enonce:'Une équation différentielle (ED) est une relation entre une fonction inconnue y=f(x), ses dérivées y\', y\'\'... et la variable x. L\'ordre est le degré de la dérivée la plus élevée.' },
      { id:'T2', type:'thm', nom:'ED du 1er ordre : y\'=ay', enonce:'Les solutions de y\'=ay (a∈ℝ) sont y(x)=C·eᵃˣ (C∈ℝ). Solution particulière avec condition initiale y(x₀)=y₀ : C=y₀·e^{−ax₀}.' },
      { id:'T3', type:'thm', nom:'ED du 1er ordre : y\'=ay+b', enonce:'Solution générale : y(x)=C·eᵃˣ−b/a (a≠0). = Homogène + Particulière. La solution particulière constante est y*=−b/a (solution de y\'=0 ⟹ ay+b=0).' },
      { id:'T4', type:'thm', nom:'ED du 1er ordre : y\'=f(x)', enonce:'Les solutions sont les primitives de f : y(x)=F(x)+C où F est une primitive de f. Une condition initiale y(x₀)=y₀ détermine C=y₀−F(x₀).' },
      { id:'T5', type:'thm', nom:'ED du 2ème ordre : y\'\'=ay\'', enonce:'On pose z=y\'. L\'équation devient z\'=az dont les solutions sont z=C₁eᵃˣ. Donc y\'=C₁eᵃˣ et y=C₁/a·eᵃˣ+C₂ (a≠0), ou y=C₁x+C₂ (a=0).' },
      { id:'T6', type:'prop', nom:'Unicité de la solution', enonce:'Pour y\'=f(x,y) avec condition initiale y(x₀)=y₀, sous conditions de régularité (théorème de Cauchy-Lipschitz), il existe une unique solution définie au voisinage de x₀.' },
    ]
  },
]

const TOME2 = [
  {
    ch:'CH 01', slug:'complexes', titre:'Nombres complexes', badge:'Algèbre',
    theoremes: [
      { id:'T1', type:'def', nom:'Nombre complexe', enonce:'ℂ = {a+ib | a,b∈ℝ, i²=−1}. Partie réelle Re(z)=a, partie imaginaire Im(z)=b. Conjugué : z̄=a−ib. Module : |z|=√(a²+b²). z est réel ⟺ Im(z)=0. z est imaginaire pur ⟺ Re(z)=0.' },
      { id:'T2', type:'prop', nom:'Propriétés du conjugué', enonce:'z+z̄=2Re(z) · z−z̄=2i·Im(z) · z·z̄=|z|² · z̄₁+z̄₂=z₁+z₂̄ · z̄₁·z̄₂=z₁z₂̄ · z̄₁/z̄₂=z₁/z₂̄ · z réel ⟺ z=z̄ · z imaginaire pur ⟺ z=−z̄.' },
      { id:'T3', type:'prop', nom:'Propriétés du module', enonce:'|z₁·z₂|=|z₁|·|z₂| · |z₁/z₂|=|z₁|/|z₂| · |z̄|=|z| · |z|²=z·z̄ · |z₁+z₂|≤|z₁|+|z₂| (inégalité triangulaire) · ||z₁|−|z₂||≤|z₁+z₂|.' },
      { id:'T4', type:'def', nom:'Forme trigonométrique', enonce:'z=r(cos θ+i sin θ) avec r=|z|≥0 et θ=arg(z) (modulo 2π). On note aussi z=r·e^{iθ} (forme exponentielle d\'Euler).' },
      { id:'T5', type:'thm', nom:'Formule d\'Euler', enonce:'e^{iθ} = cos θ + i sin θ. Donc cos θ = (e^{iθ}+e^{−iθ})/2 et sin θ = (e^{iθ}−e^{−iθ})/(2i). |e^{iθ}|=1 pour tout θ∈ℝ.' },
      { id:'T6', type:'thm', nom:'Multiplication en forme trigonométrique', enonce:'z₁=r₁e^{iθ₁}, z₂=r₂e^{iθ₂} ⟹ z₁·z₂=r₁r₂·e^{i(θ₁+θ₂)}. Donc |z₁z₂|=|z₁||z₂| et arg(z₁z₂)=arg(z₁)+arg(z₂) [mod 2π].' },
      { id:'T7', type:'thm', nom:'Formule de Moivre', enonce:'(cos θ+i sin θ)ⁿ = cos(nθ)+i sin(nθ), pour tout n∈ℤ. Utile pour exprimer cos(nθ) et sin(nθ) en fonction de cos θ et sin θ (linéarisation).' },
      { id:'T8', type:'thm', nom:'Racines n-ièmes d\'un complexe', enonce:'L\'équation zⁿ=a (a∈ℂ*, n∈ℕ*) admet exactement n solutions : zₖ=ⁿ√|a|·e^{i(arg(a)+2kπ)/n}, k=0,1,...,n−1. Ces n racines sont régulièrement espacées sur un cercle.' },
      { id:'T9', type:'thm', nom:'Équation du 2nd degré dans ℂ', enonce:'az²+bz+c=0 (a≠0, a,b,c∈ℂ) admet toujours deux solutions (comptées avec multiplicité) dans ℂ. Discriminant Δ=b²−4ac. Solutions : z=(−b±√Δ)/(2a). √Δ existe toujours dans ℂ.' },
      { id:'T10', type:'prop', nom:'Applications géométriques', enonce:'Point M d\'affixe z, A d\'affixe a. |z−a|=r ⟺ M sur cercle centre A, rayon r. arg((z−a)/(z−b))=θ ⟺ angle en M du segment AB vaut θ. Milieu de [AB] : (zA+zB)/2.' },
    ]
  },
  {
    ch:'CH 02', slug:'geometrie-espace', titre:'Géométrie dans l\'espace', badge:'Géométrie',
    theoremes: [
      { id:'T1', type:'def', nom:'Vecteurs dans l\'espace', enonce:'Un vecteur AB⃗ a les coordonnées (xB−xA, yB−yA, zB−zA). Norme : ||u⃗||=√(x²+y²+z²). Vecteurs colinéaires : u⃗ et v⃗ sont colinéaires ⟺ u⃗=λv⃗ ou leurs coordonnées sont proportionnelles.' },
      { id:'T2', type:'def', nom:'Produit scalaire dans l\'espace', enonce:'u⃗·v⃗ = xx\'+yy\'+zz\' (coordonnées). Ou : u⃗·v⃗ = ||u⃗||·||v⃗||·cos θ où θ=angle(u⃗,v⃗). Propriétés : commutatif, distributif, ||u⃗||²=u⃗·u⃗.' },
      { id:'T3', type:'prop', nom:'Orthogonalité dans l\'espace', enonce:'u⃗⊥v⃗ ⟺ u⃗·v⃗=0 ⟺ xx\'+yy\'+zz\'=0. Droite perpendiculaire à un plan si son vecteur directeur est colinéaire au vecteur normal du plan.' },
      { id:'T4', type:'def', nom:'Produit vectoriel', enonce:'u⃗∧v⃗ = (y₁z₂−z₁y₂, z₁x₂−x₁z₂, x₁y₂−y₁x₂). Propriétés : u⃗∧v⃗ ⊥ u⃗ et ⊥ v⃗ · ||u⃗∧v⃗||=||u⃗||·||v⃗||·|sin θ| · u⃗∧v⃗=0⃗ ⟺ u⃗ et v⃗ colinéaires · u⃗∧v⃗=−v⃗∧u⃗.' },
      { id:'T5', type:'def', nom:'Équation d\'un plan', enonce:'Plan (P) de vecteur normal n⃗=(a,b,c) passant par A(x₀,y₀,z₀) : a(x−x₀)+b(y−y₀)+c(z−z₀)=0, soit ax+by+cz+d=0. n⃗ est perpendiculaire à tout vecteur du plan.' },
      { id:'T6', type:'def', nom:'Équation paramétrique d\'une droite', enonce:'Droite passant par A(x₀,y₀,z₀) de vecteur directeur u⃗=(a,b,c) : x=x₀+at, y=y₀+bt, z=z₀+ct (t∈ℝ). Deux droites sont parallèles si leurs vecteurs directeurs sont colinéaires.' },
      { id:'T7', type:'thm', nom:'Positions relatives droites et plans', enonce:'Droite (D) et plan (P) : D∥P si u⃗·n⃗=0 et A∉P · D⊂P si u⃗·n⃗=0 et A∈P · D∩P en un point si u⃗·n⃗≠0 · D⊥P si u⃗=λn⃗.' },
      { id:'T8', type:'formule', nom:'Distance point-plan', enonce:'Distance de M(x₀,y₀,z₀) au plan ax+by+cz+d=0 : d = |ax₀+by₀+cz₀+d| / √(a²+b²+c²).' },
      { id:'T9', type:'def', nom:'Sphère dans l\'espace', enonce:'Sphère de centre Ω(a,b,c) et rayon R>0 : (x−a)²+(y−b)²+(z−c)²=R². Ou en coordonnées vectorielles : |MΩ⃗|=R. Développé : x²+y²+z²+αx+βy+γz+δ=0 avec R²=(α²+β²+γ²)/4−δ>0.' },
    ]
  },
  {
    ch:'CH 03', slug:'probabilites', titre:'Probabilités', badge:'Probabilités',
    theoremes: [
      { id:'T1', type:'def', nom:'Espace probabilisé', enonce:'Ω = ensemble des issues. P : événements→[0,1] avec P(Ω)=1, P(A∪B)=P(A)+P(B) si A∩B=∅. P(∅)=0, P(Ā)=1−P(A).' },
      { id:'T2', type:'def', nom:'Probabilité conditionnelle', enonce:'P(B|A) = P(A∩B)/P(A) pour P(A)>0. Interprétation : probabilité de B sachant que A est réalisé. P(A∩B)=P(A)·P(B|A)=P(B)·P(A|B).' },
      { id:'T3', type:'def', nom:'Indépendance de deux événements', enonce:'A et B sont indépendants ⟺ P(A∩B)=P(A)·P(B) ⟺ P(B|A)=P(B) (si P(A)>0). Attention : incompatibilité ≠ indépendance.' },
      { id:'T4', type:'thm', nom:'Formule des probabilités totales', enonce:'Si (A₁,...,Aₙ) est un système complet d\'événements (Aᵢ deux à deux incompatibles, ∪Aᵢ=Ω, P(Aᵢ)>0), alors pour tout événement B : P(B)=∑P(Aᵢ)·P(B|Aᵢ).' },
      { id:'T5', type:'thm', nom:'Formule de Bayes', enonce:'Avec le même système complet : P(Aᵢ|B) = P(Aᵢ)·P(B|Aᵢ) / P(B) = P(Aᵢ)·P(B|Aᵢ) / ∑P(Aⱼ)·P(B|Aⱼ). Permet de "remonter" aux causes.' },
      { id:'T6', type:'prop', nom:'Arbre de probabilités', enonce:'Dans un arbre pondéré : la somme des probabilités des branches issues d\'un même nœud est 1. P(chemin) = produit des probabilités sur le chemin. P(événement) = somme des probabilités des chemins favorables.' },
    ]
  },
  {
    ch:'CH 04', slug:'variables-aleatoires', titre:'Variables aléatoires', badge:'Probabilités',
    theoremes: [
      { id:'T1', type:'def', nom:'Variable aléatoire discrète', enonce:'X : Ω→ℝ est une variable aléatoire discrète si elle prend un nombre fini ou dénombrable de valeurs x₁,...,xₙ. La loi de X est donnée par P(X=xᵢ) avec ∑P(X=xᵢ)=1.' },
      { id:'T2', type:'def', nom:'Espérance mathématique', enonce:'E(X) = ∑xᵢ·P(X=xᵢ). Propriétés : E(aX+b)=aE(X)+b · E(X+Y)=E(X)+E(Y) · Si X et Y indépendantes : E(XY)=E(X)·E(Y).' },
      { id:'T3', type:'def', nom:'Variance et écart-type', enonce:'V(X) = E[(X−E(X))²] = E(X²)−[E(X)]². σ(X)=√V(X) (écart-type). Propriétés : V(aX+b)=a²V(X) · V(X+Y)=V(X)+V(Y) si X,Y indépendantes.' },
      { id:'T4', type:'def', nom:'Loi de Bernoulli', enonce:'X suit B(1,p) si X prend 2 valeurs : X=1 avec P=p et X=0 avec P=1−p=q. E(X)=p, V(X)=pq.' },
      { id:'T5', type:'def', nom:'Loi binomiale B(n,p)', enonce:'X=nombre de succès en n épreuves de Bernoulli indépendantes de paramètre p. P(X=k)=C(n,k)·pᵏ·qⁿ⁻ᵏ (k=0,...,n). E(X)=np. V(X)=npq. σ(X)=√(npq).' },
      { id:'T6', type:'prop', nom:'Mode de la loi binomiale', enonce:'Le mode (valeur la plus probable) de B(n,p) est k₀ tel que (n+1)p−1 ≤ k₀ ≤ (n+1)p. Si (n+1)p entier : deux modes k₀=(n+1)p−1 et k₀=(n+1)p.' },
      { id:'T7', type:'thm', nom:'Inégalité de Markov', enonce:'Pour X≥0 et a>0 : P(X≥a) ≤ E(X)/a. Inégalité de Bienaymé-Tchebychev : P(|X−E(X)|≥ε) ≤ V(X)/ε².' },
    ]
  },
  {
    ch:'CH 05', slug:'statistiques', titre:'Statistiques', badge:'Statistiques',
    theoremes: [
      { id:'T1', type:'def', nom:'Indicateurs de position', enonce:'Moyenne : x̄ = (1/n)∑nᵢxᵢ = ∑fᵢxᵢ (fᵢ fréquences). Médiane Me : valeur qui partage la distribution en deux moitiés égales. Mode : valeur de plus grande fréquence.' },
      { id:'T2', type:'def', nom:'Indicateurs de dispersion', enonce:'Variance : V = (1/n)∑nᵢ(xᵢ−x̄)² = (1/n)∑nᵢxᵢ²−x̄². Écart-type : σ=√V. Étendue : max−min. Écart interquartile : Q₃−Q₁.' },
      { id:'T3', type:'def', nom:'Quartiles et percentiles', enonce:'Q₁ (1er quartile) : 25% des valeurs en dessous. Q₂=Me (médiane) : 50%. Q₃ (3ème quartile) : 75%. Boîte à moustaches : [Q₁−1.5·IQ, Q₃+1.5·IQ] (valeurs aberrantes hors de cet intervalle).' },
      { id:'T4', type:'def', nom:'Covariance et corrélation', enonce:'Cov(X,Y) = (1/n)∑(xᵢ−x̄)(yᵢ−ȳ) = (1/n)∑xᵢyᵢ − x̄·ȳ. Coefficient de corrélation linéaire : r = Cov(X,Y)/(σₓ·σᵧ). −1≤r≤1. |r| proche de 1 ⟹ liaison linéaire forte.' },
      { id:'T5', type:'thm', nom:'Droite de régression par les moindres carrés', enonce:'Droite y=ax+b qui minimise ∑(yᵢ−axᵢ−b)². Coefficients : a=Cov(X,Y)/V(X) et b=ȳ−ax̄. La droite passe toujours par le point moyen G(x̄,ȳ).' },
      { id:'T6', type:'prop', nom:'Utilisation de la droite de régression', enonce:'Si |r|>0.9 : régression linéaire fiable. On peut interpoler (prédire y pour x dans l\'intervalle observé) ou extrapoler (x hors de l\'intervalle, avec prudence). r²=coefficient de détermination.' },
    ]
  },
]

export default function SciencesExpPage() {
  const [activeTab, setActiveTab] = useState<'tome1'|'tome2'>('tome1')
  const [openCh, setOpenCh] = useState<string|null>('CH 01')
  const chapitres = activeTab==='tome1' ? TOME1 : TOME2

  return (
    <>
      <Navbar />
      <main style={{ position:'relative', zIndex:1, paddingTop:80 }}>
        {/* Breadcrumb */}
        <div style={{ borderBottom:'1px solid var(--border)', padding:'14px clamp(20px,5vw,60px)', display:'flex', gap:8, fontSize:13, color:'var(--muted)', alignItems:'center', flexWrap:'wrap' }}>
          <Link href="/bac" style={{ color:'var(--muted)', textDecoration:'none' }}>Bac</Link><span>›</span>
          <span style={{ color:'var(--text)' }}>Section Sciences Expérimentales</span>
        </div>

        <div className="container" style={{ paddingTop:36, paddingBottom:80 }}>
          {/* Header */}
          <div style={{ marginBottom:36 }}>
            <span className="badge badge-teal" style={{ marginBottom:10, display:'inline-block' }}>🔬 Coefficient 3</span>
            <h1 style={{ fontSize:'clamp(24px,4vw,40px)', marginBottom:10 }}>Section Sciences Expérimentales</h1>
            <p style={{ maxWidth:600, color:'var(--text2)', marginBottom:20 }}>Programme officiel CNP Tunisie — 4ème année secondaire. Tous les théorèmes, définitions et formules des manuels officiels.</p>
            <div style={{ display:'flex', gap:20, fontSize:13, color:'var(--muted)', flexWrap:'wrap' }}>
              <span>📗 Tome I : 9 chapitres (Analyse)</span><span>·</span>
              <span>📘 Tome II : 5 chapitres (Algèbre, Probabilités, Statistiques)</span>
            </div>
          </div>

          {/* Onglets Tome I / Tome II */}
          <div style={{ display:'flex', gap:8, marginBottom:28, borderBottom:'2px solid var(--border)', paddingBottom:0 }}>
            {(['tome1','tome2'] as const).map(t => (
              <button key={t} onClick={() => { setActiveTab(t); setOpenCh(null) }}
                style={{ background:'none', border:'none', cursor:'pointer', padding:'10px 24px', fontSize:15, fontFamily:'var(--font-display)', fontWeight:700,
                  color: activeTab===t ? 'var(--accent)' : 'var(--muted)',
                  borderBottom: activeTab===t ? '3px solid var(--accent)' : '3px solid transparent',
                  marginBottom:-2, transition:'all 0.2s' }}>
                {t==='tome1' ? '📗 Tome I — Analyse' : '📘 Tome II — Algèbre & Probabilités'}
              </button>
            ))}
          </div>

          {/* Chapitres accordéon */}
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {chapitres.map(ch => (
              <div key={ch.ch} style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:16, overflow:'hidden' }}>
                {/* En-tête chapitre */}
                <button onClick={() => setOpenCh(openCh===ch.ch ? null : ch.ch)}
                  style={{ width:'100%', background:'none', border:'none', cursor:'pointer', padding:'18px 22px', display:'flex', justifyContent:'space-between', alignItems:'center', gap:12 }}>
                  <div style={{ display:'flex', gap:12, alignItems:'center', flexWrap:'wrap' }}>
                    <span style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--muted)', background:'var(--surface2)', padding:'2px 8px', borderRadius:6 }}>{ch.ch}</span>
                    <span className="badge badge-teal" style={{ fontSize:11 }}>{ch.badge}</span>
                    <span style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:16, color:'var(--text)' }}>{ch.titre}</span>
                  </div>
                  <div style={{ display:'flex', gap:16, alignItems:'center', flexShrink:0 }}>
                    <span style={{ fontSize:12, color:'var(--muted)' }}>{ch.theoremes.length} items</span>
                    <span style={{ color:'var(--accent)', fontSize:18, transition:'transform 0.2s', transform: openCh===ch.ch ? 'rotate(90deg)':'rotate(0deg)' }}>›</span>
                  </div>
                </button>

                {/* Contenu — théorèmes */}
                {openCh===ch.ch && (
                  <div style={{ padding:'0 22px 22px', borderTop:'1px solid var(--border)' }}>
                    <div style={{ paddingTop:16, display:'flex', flexDirection:'column', gap:10 }}>
                      {ch.theoremes.map(t => (
                        <div key={t.id} style={{ background:'var(--bg2)', border:`1.5px solid ${C[t.type as keyof typeof C]}25`, borderLeft:`4px solid ${C[t.type as keyof typeof C]}`, borderRadius:10, padding:'14px 16px' }}>
                          <div style={{ display:'flex', gap:8, alignItems:'center', marginBottom:8, flexWrap:'wrap' }}>
                            <span style={{ background:`${C[t.type as keyof typeof C]}20`, color:C[t.type as keyof typeof C], fontSize:10, fontFamily:'var(--font-mono)', fontWeight:700, padding:'2px 7px', borderRadius:5 }}>{t.id}</span>
                            <span style={{ background:`${C[t.type as keyof typeof C]}15`, color:C[t.type as keyof typeof C], fontSize:10, padding:'2px 7px', borderRadius:5 }}>{L[t.type]}</span>
                            <span style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:13, color:'var(--text)' }}>{t.nom}</span>
                          </div>
                          <div style={{ fontFamily:'var(--font-mono)', fontSize:12, color:'var(--text2)', lineHeight:1.9 }}>{t.enonce}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ marginTop:16, display:'flex', gap:8 }}>
                      <Link href={`/chat?q=Explique le chapitre ${ch.titre} en 4ème sciences expérimentales`} className="btn btn-primary btn-sm">🤖 Chat IA — {ch.titre}</Link>
                      <Link href={`/examens?ch=${ch.slug}`} className="btn btn-ghost btn-sm">📋 Exercices Bac</Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}