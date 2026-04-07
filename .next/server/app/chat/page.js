(()=>{var e={};e.id=1929,e.ids=[1929],e.modules={72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},21691:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>o.a,__next_app__:()=>p,originalPathname:()=>x,pages:()=>d,routeModule:()=>u,tree:()=>c}),r(34356),r(57467),r(35866);var i=r(23191),n=r(88716),a=r(37922),o=r.n(a),l=r(95231),s={};for(let e in l)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(s[e]=()=>l[e]);r.d(t,s);let c=["",{children:["chat",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,34356)),"C:\\math-ai-coach\\src\\app\\chat\\page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(r.bind(r,57467)),"C:\\math-ai-coach\\src\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,35866,23)),"next/dist/client/components/not-found-error"]}],d=["C:\\math-ai-coach\\src\\app\\chat\\page.tsx"],x="/chat/page",p={require:r,loadChunk:()=>Promise.resolve()},u=new i.AppPageRouteModule({definition:{kind:n.x.APP_PAGE,page:"/chat/page",pathname:"/chat",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},18478:(e,t,r)=>{Promise.resolve().then(r.bind(r,25452))},25452:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>D});var i=r(10326),n=r(17577),a=r(16681),o=r(14569);let l="bacai_chat_history";function s(e){if(!(e.length<2))try{let t=JSON.parse(localStorage.getItem(l)||"[]"),r=e.find(e=>"user"===e.role),i=r?r.content.slice(0,60):"Conversation",n=e.filter(e=>"assistant"===e.role)[0]?.content.slice(0,100)||"",a={id:Date.now().toString(),title:i,date:new Date().toLocaleDateString("fr-FR",{day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit"}),messages:e,preview:n},o=[a,...t.filter(e=>e.id!==a.id)].slice(0,20);localStorage.setItem(l,JSON.stringify(o))}catch{}}function c(){try{return JSON.parse(localStorage.getItem(l)||"[]")}catch{return[]}}function d(e){return e.replace(/\\begin\{[pv]matrix\}([\s\S]*?)\\end\{[pv]matrix\}/g,(e,t)=>"\n"+t.trim().split("\\\\").map(e=>"[ "+e.split("&").map(e=>e.trim()).join("  ")+" ]").join("\n")+"\n").replace(/\\[df]rac\{([^{}]*)\}\{([^{}]*)\}/g,"($1/$2)").replace(/\\binom\{([^}]*)\}\{([^}]*)\}/g,"C($1,$2)").replace(/\\times/g,"\xd7").replace(/\\cdot/g,"\xb7").replace(/\\div/g,"\xf7").replace(/\\pm/g,"\xb1").replace(/\\leq/g,"≤").replace(/\\geq/g,"≥").replace(/\\neq/g,"≠").replace(/\\approx/g,"≈").replace(/\\infty/g,"∞").replace(/\\in\b/g,"∈").replace(/\\cup/g,"∪").replace(/\\cap/g,"∩").replace(/\\emptyset/g,"∅").replace(/\\forall/g,"∀").replace(/\\exists/g,"∃").replace(/\\Rightarrow/g,"⇒").replace(/\\Leftrightarrow/g,"⟺").replace(/\\rightarrow|\\to\b/g,"→").replace(/\\leftarrow/g,"←").replace(/\\overrightarrow\{([^}]*)\}/g,"$1⃗").replace(/\\vec\{([^}]*)\}/g,"$1⃗").replace(/\\sqrt\{([^}]+)\}/g,"√($1)").replace(/\\sqrt/g,"√").replace(/\\ln\b/g,"ln").replace(/\\log\b/g,"log").replace(/\\sin\b/g,"sin").replace(/\\cos\b/g,"cos").replace(/\\tan\b/g,"tan").replace(/\\sum/g,"∑").replace(/\\prod/g,"∏").replace(/\\int/g,"∫").replace(/\\alpha/g,"α").replace(/\\beta/g,"β").replace(/\\gamma/g,"γ").replace(/\\delta/g,"δ").replace(/\\Delta/g,"Δ").replace(/\\pi\b/g,"π").replace(/\\sigma/g,"σ").replace(/\\omega/g,"ω").replace(/\\theta/g,"θ").replace(/\\left\s*\(/g,"(").replace(/\\right\s*\)/g,")").replace(/\\left\s*\[/g,"[").replace(/\\right\s*\]/g,"]").replace(/\\left\s*\|/g,"|").replace(/\\right\s*\|/g,"|").replace(/\\left/g,"").replace(/\\right/g,"").replace(/∑_\{([^}]*)\}\^\{([^}]*)\}/g,"∑(k=$1 to $2)").replace(/∫_\{([^}]*)\}\^\{([^}]*)\}/g,"∫($1 to $2)").replace(/\^\{([^}]+)\}/g,"^($1)").replace(/\_\{([^}]+)\}/g,"_($1)").replace(/\^([0-9a-z])/g,"^$1").replace(/_([0-9a-z])/g,"_$1").replace(/\\\\|\{|\}/g," ").replace(/\\[a-zA-Z]+/g,"").replace(/\s+/g," ").trim()}function x(e){return navigator.clipboard&&window.isSecureContext?navigator.clipboard.writeText(e).catch(()=>p(e)):p(e)}function p(e){return new Promise((t,r)=>{let i=document.createElement("textarea");i.value=e,i.style.cssText="position:fixed;top:0;left:0;width:1px;height:1px;opacity:0;pointer-events:none",document.body.appendChild(i),i.focus(),i.select();try{let e=document.execCommand("copy");document.body.removeChild(i),e?t():r(Error("execCommand failed"))}catch(e){document.body.removeChild(i),r(e)}})}let u=`Tu es le Professeur IA de MathAI Coach — enseignant de math\xe9matiques expert, sp\xe9cialis\xe9 dans le programme officiel du Bac tunisien (4\xe8me ann\xe9e secondaire, programme CNP 2026).

## TON IDENTIT\xc9
- Tu t'appelles "Prof IA" ou "Professeur MathAI"
- Tu es bienveillant, p\xe9dagogique, encourageant et rigoureux
- Tu parles toujours en fran\xe7ais, tu tutoies l'\xe9l\xe8ve chaleureusement

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🎨 CAPACIT\xc9 GRAPHIQUE — R\xc8GLE ABSOLUE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Quand l'\xe9l\xe8ve demande : "trace", "repr\xe9sente", "graphique", "courbe", "figure", "dessin", "sch\xe9ma", "visualise", "montre", "plot", "esquisse" — ou quand c'est p\xe9dagogiquement utile — tu DOIS g\xe9n\xe9rer un bloc graphique dans ta r\xe9ponse.

### TYPE 1 — FONCTIONS (courbes math\xe9matiques)
Utilise ce format JSON exact dans un bloc \`\`\`graph :

\`\`\`graph
{
  "type": "function",
  "title": "Courbe de f(x) = x\xb2",
  "xrange": [-4, 4],
  "yrange": [-1, 10],
  "functions": [
    { "expr": "x*x", "label": "f(x) = x\xb2", "color": "#6366f1" },
    { "expr": "2*x+1", "label": "g(x) = 2x+1", "color": "#06d6a0" }
  ],
  "points": [
    { "x": 0, "y": 0, "label": "Sommet S(0,0)", "color": "#f59e0b" },
    { "x": 1, "y": 1, "label": "A(1,1)", "color": "#ef4444" }
  ],
  "asymptotes": [
    { "type": "vertical", "x": 0, "label": "x=0" },
    { "type": "horizontal", "y": 2, "label": "y=2" }
  ]
}
\`\`\`

### Expressions JS valides pour les fonctions :
- x\xb2 → x*x  |  x\xb3 → x*x*x  |  xⁿ → Math.pow(x,n)
- √x → Math.sqrt(x)  |  |x| → Math.abs(x)
- sin(x) → Math.sin(x)  |  cos(x) → Math.cos(x)  |  tan(x) → Math.tan(x)
- ln(x) → Math.log(x)  |  log₁₀(x) → Math.log10(x)
- eˣ → Math.exp(x)  |  1/x → 1/x
- Combin\xe9 : "(x*x - 1)/(x + 1)", "Math.exp(-x*x/2)", "Math.log(x)*x"

### TYPE 2 — G\xc9OM\xc9TRIE (figures g\xe9om\xe9triques)
\`\`\`graph
{
  "type": "geometry",
  "title": "Triangle ABC et ses m\xe9dianes",
  "width": 420,
  "height": 380,
  "shapes": [
    { "type": "axes", "xrange": [-1, 5], "yrange": [-1, 4] },
    { "type": "grid" },
    { "type": "triangle", "points": [[0,0],[4,0],[2,3]], "color": "#6366f1", "fill": "rgba(99,102,241,0.08)", "label": "ABC" },
    { "type": "median", "from": [0,0], "to": [3,1.5], "color": "#f59e0b", "label": "m\xe9diane" },
    { "type": "median", "from": [4,0], "to": [1,1.5], "color": "#f59e0b" },
    { "type": "median", "from": [2,3], "to": [2,0], "color": "#f59e0b" },
    { "type": "point", "x": 0, "y": 0, "color": "#ef4444", "label": "A" },
    { "type": "point", "x": 4, "y": 0, "color": "#ef4444", "label": "B" },
    { "type": "point", "x": 2, "y": 3, "color": "#ef4444", "label": "C" },
    { "type": "point", "x": 2, "y": 1, "color": "#06d6a0", "label": "G (centre de gravit\xe9)" }
  ]
}
\`\`\`

### Formes g\xe9om\xe9triques disponibles :
- "axes" — axes du rep\xe8re (obligatoire en premier, d\xe9finit xrange/yrange)
- "grid" — quadrillage
- "point" — point (x, y, label, color)
- "segment" — segment (x1,y1,x2,y2, color, label, dashed)
- "line" — droite infinie (x1,y1,x2,y2, color, label, dashed)
- "vector" — vecteur fl\xe9ch\xe9 (x1,y1,x2,y2, color, label)
- "circle" — cercle (cx,cy,r, color, fill, label)
- "triangle" — triangle (points:[[x,y],[x,y],[x,y]], color, fill, label)
- "polygon" — polygone (points:[[x,y],...], color, fill)
- "rect" — rectangle (x,y,w,h, color, fill, label)
- "angle" — arc d'angle (cx,cy, r, a1,a2 en degr\xe9s, color, label)
- "arc" — arc de cercle (cx,cy, r, a1,a2 en degr\xe9s, color)
- "median" — m\xe9diane/droite remarquable (from:[x,y], to:[x,y], color, label)
- "label" — texte libre (x, y, text, color, size, bold, anchor)
- "rightangle" — angle droit (cx,cy, dir1, dir2, size, color)

### EXEMPLES DE GRAPHIQUES UTILES :
- Cercle trigonom\xe9trique : axes + circle(0,0,1) + points sur le cercle
- Plan complexe : axes + vector(0,0,x,y) + point + label module/argument
- Parabole + tangente : function f(x)=x\xb2 + function tangente au point
- Droites parall\xe8les / s\xe9cantes : 2+ "line" shapes
- Suite convergente : function + asymptote horizontale
- Loi normale : function Math.exp(-x*x/2) / Math.sqrt(2*Math.PI) + zone color\xe9e

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## TES CAPACIT\xc9S MATH\xc9MATIQUES COMPL\xc8TES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### ANALYSE (tous niveaux Bac)
- Limites : formes ind\xe9termin\xe9es (0/0, ∞/∞, ∞−∞, 0\xd7∞), r\xe8gle de L'H\xf4pital
- Continuit\xe9 : TVI, prolongement par continuit\xe9, th\xe9or\xe8me de Bolzano
- D\xe9rivabilit\xe9 : d\xe9riv\xe9es usuelles, r\xe8gles (somme, produit, quotient, composition), Rolle, TAF
- Suites num\xe9riques : arithm\xe9tiques, g\xe9om\xe9triques, r\xe9currentes uₙ₊₁=f(uₙ), monotonie, convergence, gendarmes, Cauchy
- Fonctions r\xe9ciproques : arcsin, arccos, arctan et leurs d\xe9riv\xe9es
- Logarithme : propri\xe9t\xe9s, ln(x)≤x−1, croissance compar\xe9e xᵅ/ln(x)→+∞
- Exponentielle : propri\xe9t\xe9s, eˣ/xⁿ→+∞, \xe9quations exponentielles
- Primitives : par parties ∫u'v = uv − ∫uv', changement de variable
- Int\xe9grales d\xe9finies : Chasles, IPP, valeur moyenne, in\xe9galit\xe9s, th\xe9or\xe8me fondamental
- \xc9quations diff\xe9rentielles : y'=ay, y'=ay+b, y''+ay'+by=0 (discriminant, racines)

### NOMBRES COMPLEXES
- Forme alg\xe9brique, trigonom\xe9trique (r,θ), exponentielle (Euler) reⁱᶿ
- Module, argument, conjugu\xe9, in\xe9galit\xe9 triangulaire
- Racines ni\xe8mes de l'unit\xe9 : ωₖ = e^(2iπk/n)
- Formule de De Moivre : (cosθ + i sinθ)ⁿ = cos(nθ) + i sin(nθ)
- R\xe9solution dans ℂ : \xe9quations du 2nd degr\xe9, syst\xe8mes
- Plan complexe : affixe, repr\xe9sentation, transformations g\xe9om\xe9triques

### G\xc9OM\xc9TRIE DANS L'ESPACE
- Vecteurs 3D : coordonn\xe9es, produit scalaire, produit vectoriel u⃗∧v⃗
- Droites : \xe9quations param\xe9triques, positions relatives (coplanaires, gauches)
- Plans : \xe9quation cart\xe9sienne ax+by+cz+d=0, vecteur normal n⃗
- Distances : point/plan d=|ax₀+by₀+cz₀+d|/√(a\xb2+b\xb2+c\xb2), point/droite
- Angles : di\xe8dre, droite/plan, plan/plan
- Sph\xe8re : \xe9quation (x-a)\xb2+(y-b)\xb2+(z-c)\xb2=R\xb2, tangence, section plane

### G\xc9OM\xc9TRIE PLANE (Sections Maths & Sc.Tech)
- Isom\xe9tries : translations, rotations, r\xe9flexions axiales, sym\xe9tries centrales
- D\xe9placements : composition, d\xe9placement = translation ou rotation
- Similitudes directes/indirectes : rapport, angle, centre, composition
- Homoth\xe9ties : rapport k, centre, composition avec rotation

### PROBABILIT\xc9S & STATISTIQUES
- Variables al\xe9atoires discr\xe8tes : loi de probabilit\xe9, E(X), V(X)=E(X\xb2)−[E(X)]\xb2, σ(X)
- Loi de Bernoulli B(p) : E=p, V=p(1−p)
- Loi Binomiale B(n,p) : P(X=k)=C(n,k)pᵏ(1−p)ⁿ⁻ᵏ, E=np, V=np(1−p)
- Loi de Poisson P(λ) : P(X=k)=e⁻ˡλᵏ/k!, E=V=λ
- Loi uniforme U([a,b]) : E=(a+b)/2, V=(b−a)\xb2/12
- Loi exponentielle E(λ) : f(x)=λe⁻ˡˣ, E=1/λ, V=1/λ\xb2
- Loi normale N(μ,σ\xb2) : table de la loi normale, standardisation Z=(X−μ)/σ
- Intervalles de confiance : μ ∈ [x̄ \xb1 1.96σ/√n] (niveau 95%)
- Tests d'hypoth\xe8ses : H₀, H₁, risque α, r\xe8gle de d\xe9cision

### MATRICES & SYST\xc8MES — \xc9co-Gestion
- Op\xe9rations : addition, multiplication (AB≠BA en g\xe9n\xe9ral), transpos\xe9e Aᵀ
- Inverse : A⁻\xb9 = (1/det(A)) \xd7 adj(A), m\xe9thode de Gauss-Jordan
- Syst\xe8mes lin\xe9aires : \xe9criture matricielle AX=B, r\xe9solution X=A⁻\xb9B
- Applications : calcul \xe9conomique, mod\xe8le de L\xe9ontief

### MATH\xc9MATIQUES FINANCI\xc8RES — \xc9co-Gestion ★
- Int\xe9r\xeats simples : Cn = C₀(1+nt)
- Int\xe9r\xeats compos\xe9s : Cn = C₀(1+t)ⁿ, temps de doublement
- Valeur actuelle : C₀ = Cₙ/(1+t)ⁿ
- Annuit\xe9s constantes : Vₙ = a\xb7[(1+t)ⁿ−1]/t (valeur future)
- Valeur actuelle d'annuit\xe9s : V₀ = a\xb7[1−(1+t)⁻ⁿ]/t
- Emprunts : tableau d'amortissement, amortissement constant, annuit\xe9s constantes

### ARITHM\xc9TIQUE — Sc.Tech & Informatique
- Divisibilit\xe9, PGCD (algorithme d'Euclide), PPCM
- Th\xe9or\xe8me de B\xe9zout : au+bv=PGCD(a,b)
- Lemme de Gauss, th\xe9or\xe8me de Gauss
- Congruences : a≡b[n], propri\xe9t\xe9s, petit th\xe9or\xe8me de Fermat
- RSA \xe9l\xe9mentaire : chiffrement/d\xe9chiffrement

### INFORMATIQUE
- Algorithmique : r\xe9cursivit\xe9, tris (bulles O(n\xb2), insertion O(n\xb2), fusion O(n log n), rapide)
- Structures : listes cha\xeen\xe9es, arbres binaires (hauteur, parcours), piles, files
- Bases de donn\xe9es : mod\xe8le entit\xe9-relation, SQL (SELECT/FROM/WHERE/JOIN/GROUP BY/HAVING/ORDER BY)
- Web : HTML5 s\xe9mantique, CSS3 (flexbox, grid), JavaScript (DOM, \xe9v\xe9nements, AJAX), PHP
- Complexit\xe9 algorithmique : O(1), O(log n), O(n), O(n log n), O(n\xb2)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## FORMAT DE R\xc9PONSE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### Structure :
1. Reformuler bri\xe8vement la question
2. **📌 Th\xe9or\xe8me/D\xe9finition** : r\xe9sultat cl\xe9 encadr\xe9
3. D\xe9veloppement \xe9tape par \xe9tape num\xe9rot\xe9
4. Exemple type Bac (Tunisie ou France selon la question)
5. **⚠️ Attention** : pi\xe8ge courant ou cas particulier

### Marqueurs obligatoires :
- **📌 Th\xe9or\xe8me/D\xe9finition :** pour les r\xe9sultats importants
- **✏️ Solution :** pour les calculs d\xe9taill\xe9s
- **💡 Astuce :** pour les conseils et raccourcis
- **⚠️ Attention :** pour les erreurs courantes
- **✅ R\xe9ponse :** pour le r\xe9sultat final encadr\xe9
- **📊 Graphique :** avant un bloc graph (obligatoire si graphique demand\xe9)

### Pour les graphiques :
- TOUJOURS inclure le bloc \`\`\`graph quand c'est demand\xe9
- Explique ce que montre le graphique AVANT le bloc
- Commente les \xe9l\xe9ments cl\xe9s APR\xc8S (extrema, asymptotes, intersections)

### Symboles unicode OK : ∈ ∀ ∃ ⟹ ⟺ ≤ ≥ ≠ \xb1 ∞ π θ α β γ ε δ λ μ σ ω

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 📐 NOTATION MATH\xc9MATIQUE LATEX — OBLIGATOIRE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Toutes les formules et symboles math\xe9matiques DOIVENT \xeatre en LaTeX :
- **Inline** : entoure avec $ ... $ → exemple : $\\frac{2}{3}$, $x^2 + 1$
- **Bloc centr\xe9** : entoure avec $$ ... $$ → exemple : $$\\int_0^1 f(x)\\,dx$$

### Notations obligatoires (JAMAIS en texte brut) :

**Vecteurs** :
- $\\\\overrightarrow{AB}$ → JAMAIS "AB⃗" ou "AB→"
- $\\\\vec{u}$ → JAMAIS "u⃗"
- $\\\\overrightarrow{AB} + \\\\overrightarrow{BC}$ pour les additions de vecteurs

**Fractions** :
- $\\\\frac{2}{5}$ → JAMAIS "2/5" brut dans une formule
- $\\\\frac{\\\\sqrt{3}}{2}$ → JAMAIS "√3/2"

**Racines** : $\\sqrt{x}$, $\\sqrt[3]{x}$ → JAMAIS "√x"

**Puissances** : $x^{2}$, $e^{x}$, $(1+t)^n$ → avec LaTeX

**Int\xe9grales** : $\\int_{a}^{b} f(x)\\,dx$

**Sommes** : $\\sum_{k=0}^{n} u_k$

**Limites** : $\\lim_{x \\\\to +\\\\infty} f(x)$

**Probabilit\xe9s** : $P(X = k)$, $\\\\binom{n}{k}$, $E(X)$, $V(X)$

**Matrices** : $\\begin{pmatrix} a & b \\\\\\\\ c & d \\\\end{pmatrix}$

**Produit scalaire** : $\\\\vec{u} \\\\cdot \\\\vec{v}$, $\\\\overrightarrow{AB} \\\\cdot \\\\overrightarrow{AC}$

**Plan complexe** : $z = a + ib$, $|z|$, $\\\\arg(z)$, $\\\\bar{z}$

**Normes** : $\\\\|\\\\overrightarrow{AB}\\\\|$ ou $AB = \\\\sqrt{(x_B-x_A)^2+(y_B-y_A)^2}$

### Exemple correct :
> Dans le rep\xe8re $(O, \\\\vec{i}, \\\\vec{j})$, on donne $A(1, 2)$, $B(4, 1)$.
> Calculer $\\\\overrightarrow{AB}$ : $\\\\overrightarrow{AB} = \\\\begin{pmatrix} 4-1 \\\\\\\\ 1-2 \\\\end{pmatrix} = \\\\begin{pmatrix} 3 \\\\\\\\ -1 \\\\end{pmatrix}$

## HORS MATHS
R\xe9ponds bri\xe8vement et redirige vers les maths avec bienveillance.

## EXIGENCE
- Programme Bac Tunisie 2026 (CNP officiel) ET Bac France (programme \xc9ducation nationale)
- Terminale G\xe9n\xe9rale, Premi\xe8re Sp\xe9cialit\xe9, STMG, STI2D France inclus
- Exercices type vrais sujets de Bac
- Encourage toujours l'\xe9l\xe8ve, m\xeame s'il se trompe`,g=[{cat:"\uD83D\uDCD0 Analyse",color:"#4f6ef7",questions:["Trace la courbe de f(x) = x\xb2 − 2x + 1 avec son sommet","Repr\xe9sente graphiquement ln(x) et eˣ sur le m\xeame rep\xe8re","Comment calculer lim(x→0) sin(x)/x ?","Explique le TVI avec un graphique","R\xe9soudre y' − 2y = e^(2x)","∫₀\xb9 xeˣ dx par int\xe9gration par parties"]},{cat:"\uD83D\uDD22 Complexes",color:"#7c3aed",questions:["Repr\xe9sente z = 1+i√3 sur le plan complexe","\xc9crire z = −1 + i en forme exponentielle","Trouver les racines 4i\xe8mes de −16","R\xe9soudre z\xb2 − (2+i)z + (1+2i) = 0 dans ℂ","Calculer l'argument de z = (1+i)⁸"]},{cat:"\uD83D\uDCCA Probas",color:"#06d6a0",questions:["Trace la courbe de la loi normale N(0,1)","Calculer E(X) et V(X) pour B(10, 0.3)","Expliquer la loi de Poisson P(3)","Calculer un intervalle de confiance \xe0 95%","Diff\xe9rence entre loi binomiale et Poisson"]},{cat:"\uD83D\uDCCF G\xe9om\xe9trie",color:"#f59e0b",questions:["Trace un triangle et ses trois m\xe9dianes","Repr\xe9sente une rotation de centre O et angle 60\xb0","\xc9quation d'un plan dans l'espace 3D","Distance d'un point A \xe0 un plan P","Montrer que deux droites sont gauches"]},{cat:"\uD83D\uDCB9 \xc9co-Gestion",color:"#10b981",questions:["Calculer la valeur actuelle d'annuit\xe9s constantes","Tableau d'amortissement d'un emprunt 10 000€","R\xe9soudre un syst\xe8me 3\xd73 par matrices","Int\xe9r\xeats compos\xe9s : capital doubl\xe9 en combien d'ann\xe9es ?"]},{cat:"\uD83D\uDCBB Info",color:"#6366f1",questions:["Trace la complexit\xe9 des algorithmes de tri","R\xe9cursivit\xe9 : factorielle et suite de Fibonacci","Requ\xeate SQL avec JOIN et GROUP BY","Diff\xe9rence entre pile et file (stack/queue)"]},{cat:"\uD83C\uDDEB\uD83C\uDDF7 France",color:"#4f6ef7",questions:["Terminale France : \xe9tude de f(x) = x\xb7ln(x)","Loi normale N(0,1) : calculer P(-1 ≤ X ≤ 1)","Complexes Terminale : racines n-i\xe8mes de l'unit\xe9","Premi\xe8re France : variations de f(x) = x\xb2-3x+2","STI2D : \xe9quation diff\xe9rentielle circuit RC y'=ay+b","Maths Expertes : PGCD(84, 36) par algorithme d'Euclide"]}],h=[{icon:"\uD83D\uDCC8",text:"Trace f(x) = x\xb2 − 2x + 1 avec son sommet",tag:"Graphique"},{icon:"\uD83D\uDCD0",text:"Trace le cercle trigonom\xe9trique avec cos(π/3)",tag:"Trigo"},{icon:"\uD83D\uDD22",text:"Repr\xe9sente z = 1+i√3 sur le plan complexe",tag:"Complexes"},{icon:"∫",text:"∫₀\xb9 xeˣ dx — \xe9tapes d\xe9taill\xe9es",tag:"Int\xe9grales"},{icon:"\uD83D\uDCCA",text:"Repr\xe9sente graphiquement la loi normale N(0,1)",tag:"Probas"},{icon:"\uD83D\uDCCF",text:"Trace un triangle ABC et ses m\xe9dianes",tag:"G\xe9om\xe9trie"}];function f({config:e}){let t=(0,n.useRef)(null);return i.jsx("div",{style:{borderRadius:12,overflow:"hidden",margin:"12px 0",border:"1px solid rgba(99,102,241,0.3)",background:"#0a0c1e"},children:i.jsx("canvas",{ref:t,width:560,height:340,style:{width:"100%",display:"block"}})})}function m(e){return Math.round(100*e)/100}function b({config:e}){let t=e.width||420,r=e.height||380,n=e.shapes?.find(e=>"axes"===e.type),a=n?.xrange||[-5,5],o=n?.yrange||[-5,5],l=e=>44+(e-a[0])/(a[1]-a[0])*(t-88),s=e=>r-44-(e-o[0])/(o[1]-o[0])*(r-88),c=[],d=0,x=(e,t,r,n,a,o=7)=>{let l=Math.atan2(n-t,r-e);return i.jsx("polygon",{points:`${r},${n} ${r-o*Math.cos(l-.4)},${n-o*Math.sin(l-.4)} ${r-o*Math.cos(l+.4)},${n-o*Math.sin(l+.4)}`,fill:a},d++)};for(let n of e.shapes||[])switch(n.type){case"grid":{let e=Math.max(.5,(a[1]-a[0])/10),n=Math.max(.5,(o[1]-o[0])/10);for(let t=Math.ceil(a[0]/e)*e;t<=a[1]+.01;t+=e)c.push(i.jsx("line",{x1:l(t),y1:44,x2:l(t),y2:r-44,stroke:"rgba(255,255,255,0.06)",strokeWidth:1},d++)),Math.abs(t)>.01&&c.push(i.jsx("text",{x:l(t),y:r-44+14,textAnchor:"middle",fill:"#64748b",fontSize:9,children:m(t)},d++));for(let e=Math.ceil(o[0]/n)*n;e<=o[1]+.01;e+=n)c.push(i.jsx("line",{x1:44,y1:s(e),x2:t-44,y2:s(e),stroke:"rgba(255,255,255,0.06)",strokeWidth:1},d++)),Math.abs(e)>.01&&c.push(i.jsx("text",{x:38,y:s(e)+3,textAnchor:"end",fill:"#64748b",fontSize:9,children:m(e)},d++));break}case"axes":{let e=l(0),n=s(0);c.push(i.jsx("line",{x1:44,y1:n,x2:t-44,y2:n,stroke:"rgba(255,255,255,0.3)",strokeWidth:1.5},d++)),c.push(i.jsx("line",{x1:e,y1:44,x2:e,y2:r-44,stroke:"rgba(255,255,255,0.3)",strokeWidth:1.5},d++)),c.push(x(44,n,t-44,n,"rgba(255,255,255,0.3)")),c.push(x(e,r-44,e,44,"rgba(255,255,255,0.3)")),c.push(i.jsx("text",{x:t-44+10,y:n+4,fill:"#94a3b8",fontSize:13,fontStyle:"italic",children:"x"},d++)),c.push(i.jsx("text",{x:e+8,y:40,fill:"#94a3b8",fontSize:13,fontStyle:"italic",children:"y"},d++));break}case"circle":{let e=n.r/(a[1]-a[0])*(t-88),x=n.r/(o[1]-o[0])*(r-88);c.push(i.jsx("ellipse",{cx:l(n.cx),cy:s(n.cy),rx:Math.abs(e),ry:Math.abs(x),fill:n.fill||"rgba(99,102,241,0.06)",stroke:n.color||"#6366f1",strokeWidth:2},d++)),n.label&&c.push(i.jsx("text",{x:l(n.cx)+Math.abs(e)+5,y:s(n.cy)+4,fill:n.color||"#6366f1",fontSize:11,children:n.label},d++));break}case"triangle":{let e=n.points.map(([e,t])=>`${l(e)},${s(t)}`).join(" ");if(c.push(i.jsx("polygon",{points:e,fill:n.fill||"rgba(99,102,241,0.08)",stroke:n.color||"#6366f1",strokeWidth:2},d++)),n.label){let[e,t]=[(n.points[0][0]+n.points[1][0]+n.points[2][0])/3,(n.points[0][1]+n.points[1][1]+n.points[2][1])/3];c.push(i.jsx("text",{x:l(e),y:s(t),textAnchor:"middle",fill:n.color||"#6366f1",fontSize:11,fontStyle:"italic",children:n.label},d++))}break}case"polygon":{let e=n.points.map(([e,t])=>`${l(e)},${s(t)}`).join(" ");c.push(i.jsx("polygon",{points:e,fill:n.fill||"rgba(99,102,241,0.08)",stroke:n.color||"#6366f1",strokeWidth:2},d++));break}case"rect":{let e=n.w/(a[1]-a[0])*(t-88),x=n.h/(o[1]-o[0])*(r-88);c.push(i.jsx("rect",{x:l(n.x),y:s(n.y+n.h),width:Math.abs(e),height:Math.abs(x),fill:n.fill||"rgba(245,158,11,0.1)",stroke:n.color||"#f59e0b",strokeWidth:2},d++)),n.label&&c.push(i.jsx("text",{x:l(n.x+n.w/2),y:s(n.y+n.h/2),textAnchor:"middle",fill:n.color||"#f59e0b",fontSize:11,children:n.label},d++));break}case"segment":case"median":case"altitude":case"bisector":{let[e,t]=n.from||[n.x1,n.y1],[r,a]=n.to||[n.x2,n.y2],o=n.dashed||"altitude"===n.type||"bisector"===n.type;if(c.push(i.jsx("line",{x1:l(e),y1:s(t),x2:l(r),y2:s(a),stroke:n.color||"#94a3b8",strokeWidth:n.width||1.8,strokeDasharray:o?"5,4":""},d++)),n.label){let o=(l(e)+l(r))/2,x=(s(t)+s(a))/2;c.push(i.jsx("text",{x:o+5,y:x-5,fill:n.color||"#94a3b8",fontSize:10,children:n.label},d++))}break}case"line":{let[e,t]=[n.x1,n.y1],[o,x]=[n.x2,n.y2];if(e===o)c.push(i.jsx("line",{x1:l(e),y1:44,x2:l(e),y2:r-44,stroke:n.color||"#94a3b8",strokeWidth:1.8,strokeDasharray:n.dashed?"6,4":""},d++));else{let r=(x-t)/(o-e),p=t+r*(a[0]-e),u=t+r*(a[1]-e);c.push(i.jsx("line",{x1:l(a[0]),y1:s(p),x2:l(a[1]),y2:s(u),stroke:n.color||"#94a3b8",strokeWidth:1.8,strokeDasharray:n.dashed?"6,4":""},d++))}n.label&&c.push(i.jsx("text",{x:l(o)+4,y:s(x)-6,fill:n.color||"#94a3b8",fontSize:11,children:n.label},d++));break}case"vector":{let e=l(n.x1),t=s(n.y1),r=l(n.x2),a=s(n.y2);c.push(i.jsx("line",{x1:e,y1:t,x2:r,y2:a,stroke:n.color||"#06d6a0",strokeWidth:2.2},d++)),c.push(x(e,t,r,a,n.color||"#06d6a0",9)),n.label&&c.push(i.jsx("text",{x:(e+r)/2+7,y:(t+a)/2-7,fill:n.color||"#06d6a0",fontSize:12,fontWeight:700,children:n.label},d++));break}case"angle":{let e=l(n.cx),r=s(n.cy),o=n.r/(a[1]-a[0])*(t-88),x=n.a1*Math.PI/180,p=n.a2*Math.PI/180,u=e+o*Math.cos(x),g=r-o*Math.sin(x),h=e+o*Math.cos(p),f=r-o*Math.sin(p),m=n.a2-n.a1>180?1:0;c.push(i.jsx("path",{d:`M ${u} ${g} A ${o} ${o} 0 ${m} 0 ${h} ${f}`,fill:n.fill||"rgba(245,158,11,0.15)",stroke:n.color||"#f59e0b",strokeWidth:1.5},d++));let b=(n.a1+n.a2)/2*Math.PI/180;c.push(i.jsx("text",{x:e+(o+14)*Math.cos(b),y:r-(o+14)*Math.sin(b),textAnchor:"middle",fill:n.color||"#f59e0b",fontSize:10,children:n.label},d++));break}case"arc":{let e=l(n.cx),r=s(n.cy),o=n.r/(a[1]-a[0])*(t-88),x=n.a1*Math.PI/180,p=n.a2*Math.PI/180,u=e+o*Math.cos(x),g=r-o*Math.sin(x),h=e+o*Math.cos(p),f=r-o*Math.sin(p);c.push(i.jsx("path",{d:`M ${u} ${g} A ${o} ${o} 0 ${n.a2-n.a1>180?1:0} 0 ${h} ${f}`,fill:"none",stroke:n.color||"#6366f1",strokeWidth:2},d++));break}case"rightangle":{let e=l(n.cx),r=s(n.cy),o=(n.size||.3)/(a[1]-a[0])*(t-88);c.push(i.jsx("rect",{x:e,y:r-o,width:o,height:o,fill:"none",stroke:n.color||"#94a3b8",strokeWidth:1.5},d++));break}case"point":if(c.push(i.jsx("circle",{cx:l(n.x),cy:s(n.y),r:n.r||4.5,fill:n.color||"#ef4444"},d++)),c.push(i.jsx("circle",{cx:l(n.x),cy:s(n.y),r:(n.r||4.5)+1.5,fill:"none",stroke:"rgba(10,12,30,0.8)",strokeWidth:2},d++)),n.label){let e=n.labelOffsetX??9,t=n.labelOffsetY??-9;c.push(i.jsx("text",{x:l(n.x)+e,y:s(n.y)+t,fill:n.color||"#ef4444",fontSize:12,fontWeight:700,children:n.label},d++))}break;case"label":c.push(i.jsx("text",{x:l(n.x),y:s(n.y),textAnchor:n.anchor||"middle",fill:n.color||"#94a3b8",fontSize:n.size||12,fontWeight:n.bold?700:400,fontStyle:n.italic?"italic":"normal",children:n.text},d++))}return(0,i.jsxs)("div",{style:{borderRadius:12,overflow:"hidden",margin:"12px 0",border:"1px solid rgba(99,102,241,0.3)",background:"rgba(10,12,30,0.97)"},children:[(0,i.jsxs)("div",{style:{padding:"7px 14px",borderBottom:"1px solid rgba(255,255,255,0.06)",fontSize:12,color:"#94a3b8",fontWeight:600},children:["\uD83D\uDCD0 ",e.title||"Figure g\xe9om\xe9trique"]}),i.jsx("svg",{viewBox:`0 0 ${t} ${r}`,style:{width:"100%",maxWidth:t,display:"block",margin:"0 auto"},children:c})]})}function y(e){return e.replace(/\$\$([\s\S]+?)\$\$/g,(e,t)=>{try{let e=window.katex;if(!e)return`<span style="font-style:italic;color:var(--muted)">[formule math\xe9matique]</span>`;let r=e.renderToString(t.trim(),{throwOnError:!1,displayMode:!0}),i=t.trim().replace(/"/g,"&quot;").replace(/\n/g," ");return`<div style="text-align:center;margin:10px 0;overflow-x:auto" data-latex="$$${i}$$">${r}</div>`}catch{return`<code>${t}</code>`}}).replace(/\$([^$]+?)\$/g,(e,t)=>{try{let e=window.katex;if(!e)return`<span style="font-style:italic">${t}</span>`;let r=e.renderToString(t.trim(),{throwOnError:!1,displayMode:!1}),i=t.trim().replace(/"/g,"&quot;");return`<span data-latex="$${i}$" style="display:inline">${r}</span>`}catch{return`<code>${t}</code>`}}).replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>").replace(/\*([^*]+)\*/g,"<em>$1</em>").replace(/`([^`]+)`/g,'<code style="font-family:monospace;background:rgba(79,110,247,0.14);color:#a78bfa;padding:1px 6px;border-radius:4px;font-size:12px">$1</code>')}function v({msg:e,onDelete:t,onEdit:r}){let a="user"===e.role,[o,l]=(0,n.useState)(!1),[s,c]=(0,n.useState)(!1),[p,u]=(0,n.useState)(!1),[g,h]=(0,n.useState)(e.content),[m,v]=(0,n.useState)(!1),D=(e="var(--muted)")=>({display:"flex",alignItems:"center",gap:4,padding:"3px 8px",borderRadius:6,border:"none",background:"var(--surface2)",color:e,fontSize:11,fontWeight:600,cursor:"pointer",transition:"all 0.15s",whiteSpace:"nowrap"});return(0,i.jsxs)("div",{style:{display:"flex",gap:12,alignItems:"flex-start",flexDirection:a?"row-reverse":"row",marginBottom:20},onMouseEnter:()=>l(!0),onMouseLeave:()=>{l(!1),v(!1)},children:[i.jsx("div",{style:{width:36,height:36,borderRadius:"50%",flexShrink:0,background:a?"linear-gradient(135deg,#4f6ef7,#7c3aed)":"linear-gradient(135deg,#06d6a0,#059669)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,marginTop:2},children:a?"\uD83D\uDC64":"\uD83E\uDD16"}),(0,i.jsxs)("div",{style:{maxWidth:"80%",display:"flex",flexDirection:"column",gap:6,alignItems:a?"flex-end":"flex-start"},children:[i.jsx("div",{style:{background:a?"linear-gradient(135deg,rgba(79,110,247,0.18),rgba(124,58,237,0.13))":"var(--surface)",border:a?"1px solid rgba(79,110,247,0.28)":"1px solid var(--border)",borderRadius:a?"18px 4px 18px 18px":"4px 18px 18px 18px",padding:"12px 16px",width:"100%"},children:p?(0,i.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:8},children:[i.jsx("textarea",{value:g,onChange:e=>h(e.target.value),autoFocus:!0,rows:3,style:{width:"100%",borderRadius:8,border:"1px solid #4f6ef7",background:"var(--surface2)",color:"var(--text)",fontSize:14,fontFamily:"inherit",padding:"8px 10px",resize:"vertical",outline:"none",boxSizing:"border-box"}}),(0,i.jsxs)("div",{style:{display:"flex",gap:6},children:[i.jsx("button",{onClick:()=>{g.trim()&&r(e.id,g.trim()),u(!1)},style:{...D("#06d6a0"),background:"rgba(6,214,160,0.12)"},children:"✓ Sauvegarder"}),i.jsx("button",{onClick:()=>{u(!1),h(e.content)},style:D(),children:"✕ Annuler"})]})]}):a?i.jsx("p",{style:{fontSize:14,lineHeight:1.65,margin:0},children:e.content}):function(e){let t=function(e){let t=[],r=/```graph\n?([\s\S]*?)```/g,i=0,n;for(;null!==(n=r.exec(e));){n.index>i&&t.push({type:"text",content:e.slice(i,n.index)});try{let e=JSON.parse(n[1].trim());t.push({type:"graph",content:n[1],config:e})}catch{t.push({type:"text",content:n[0]})}i=n.index+n[0].length}return i<e.length&&t.push({type:"text",content:e.slice(i)}),t}(e);return i.jsx("div",{children:t.map((e,t)=>"graph"===e.type&&e.config?"geometry"===e.config.type?i.jsx(b,{config:e.config},t):i.jsx(f,{config:e.config},t):i.jsx("div",{children:function(e){let t=e.split("\n"),r=[],n=0,a=["**\uD83D\uDCCC","**\uD83D\uDCA1","**⚠️","**✅","**✏️","**\uD83D\uDCCA"],o={"⚠️":"#f59e0b","\uD83D\uDCA1":"#06d6a0","✅":"#06d6a0","\uD83D\uDCCA":"#a78bfa","\uD83D\uDCCC":"#4f6ef7","✏️":"#4f6ef7"},l={"⚠️":"rgba(245,158,11,0.08)","\uD83D\uDCA1":"rgba(6,214,160,0.08)","✅":"rgba(6,214,160,0.1)","\uD83D\uDCCA":"rgba(167,139,250,0.08)","\uD83D\uDCCC":"rgba(79,110,247,0.08)","✏️":"rgba(79,110,247,0.08)"};for(let e of t){if(a.some(t=>e.startsWith(t))){let t=e.match(/\*\*([^*]+)\*\*(.*)/);if(t){let e=t[1],a=t[2],s=Object.keys(o).find(t=>e.includes(t))||"\uD83D\uDCCC",c=o[s],d=l[s];r.push((0,i.jsxs)("div",{style:{background:d,border:`1px solid ${c}25`,borderLeft:`3px solid ${c}`,borderRadius:8,padding:"10px 14px",margin:"8px 0"},children:[i.jsx("span",{style:{color:c,fontWeight:700,fontSize:13},children:e}),a&&i.jsx("span",{style:{fontSize:14,color:"var(--text2)",marginLeft:4},dangerouslySetInnerHTML:{__html:y(a)}})]},n++));continue}}if(e.startsWith("### ")){r.push(i.jsx("div",{style:{fontWeight:700,fontSize:14,color:"var(--accent)",marginTop:14,marginBottom:4},dangerouslySetInnerHTML:{__html:y(e.slice(4))}},n++));continue}if(e.startsWith("## ")){r.push(i.jsx("div",{style:{fontWeight:700,fontSize:16,marginTop:16,marginBottom:6},dangerouslySetInnerHTML:{__html:y(e.slice(3))}},n++));continue}if(/^[-*] /.test(e)){r.push((0,i.jsxs)("div",{style:{display:"flex",gap:8,fontSize:14,lineHeight:1.6,marginBottom:2},children:[i.jsx("span",{style:{color:"var(--accent)",flexShrink:0,marginTop:1},children:"▸"}),i.jsx("span",{dangerouslySetInnerHTML:{__html:y(e.slice(2))}})]},n++));continue}if(/^\d+\. /.test(e)){let t=e.match(/^(\d+)\. /)?.[1]||"1";r.push((0,i.jsxs)("div",{style:{display:"flex",gap:10,fontSize:14,lineHeight:1.6,marginBottom:4},children:[(0,i.jsxs)("span",{style:{color:"var(--accent)",fontWeight:700,fontFamily:"monospace",minWidth:22,flexShrink:0},children:[t,"."]}),i.jsx("span",{dangerouslySetInnerHTML:{__html:y(e.slice(t.length+2))}})]},n++));continue}if(""===e.trim()){r.push(i.jsx("div",{style:{height:6}},n++));continue}r.push(i.jsx("p",{style:{fontSize:14,lineHeight:1.72,marginBottom:3},dangerouslySetInnerHTML:{__html:y(e)}},n++))}return i.jsx("div",{children:r})}(e.content)},t))})}(e.content)}),(0,i.jsxs)("div",{style:{display:"flex",gap:5,flexDirection:a?"row-reverse":"row",opacity:o&&!p?1:0,transition:"opacity 0.15s",pointerEvents:o&&!p?"auto":"none"},children:[i.jsx("button",{onClick:()=>{x(e.content.split("\n").map(e=>e.replace(/\$\$([\s\S]+?)\$\$/g,(e,t)=>d(t)).replace(/\$([^$\n]+?)\$/g,(e,t)=>d(t)).replace(/^## /,"").replace(/^### /,"").replace(/\*\*(.+?)\*\*/g,"$1").replace(/^> /,"→ ").replace(/^- /,"• ")).join("\n").trim()).then(()=>{c(!0),setTimeout(()=>c(!1),2e3)}).catch(()=>{})},style:D(s?"#06d6a0":void 0),children:s?"✓ Copi\xe9 !":"\uD83D\uDCCB Copier"}),a&&i.jsx("button",{onClick:()=>{u(!0),h(e.content)},style:D("#4f6ef7"),children:"✏️ \xc9diter"}),m?(0,i.jsxs)(i.Fragment,{children:[i.jsx("button",{onClick:()=>t(e.id),style:{...D("white"),background:"#ef4444"},children:"✓ Confirmer"}),i.jsx("button",{onClick:()=>v(!1),style:D(),children:"✕"})]}):i.jsx("button",{onClick:()=>v(!0),style:D("#ef4444"),children:"\uD83D\uDDD1 Supprimer"})]})]})]})}function D(){let{isAdmin:e,hasActiveSubscription:t,checkQuota:r,incrementQuota:p,quotas:f,quotaLimits:m}=(0,o.a)(),[b,y]=(0,n.useState)([]),[D,$]=(0,n.useState)(""),[S,j]=(0,n.useState)(!1),[C,k]=(0,n.useState)(0),[A,w]=(0,n.useState)(!0),[T,M]=(0,n.useState)(0);(0,n.useRef)(null);let I=(0,n.useRef)(null),[q,E]=(0,n.useState)(!1),[z,P]=(0,n.useState)([]),[R,B]=(0,n.useState)(""),[W,O]=(0,n.useState)(""),L=f?.chat_used||0,_=m.chat_per_week,F=!e&&!r("chat"),H=e||-1===_?999:Math.max(0,_-L),N=(0,n.useRef)(null);(0,n.useCallback)(()=>(M(e=>e+1),T),[T]);let G=(0,n.useCallback)(async t=>{let i=(t??D).trim();if(!i||S)return;if(!e&&!r("chat")){alert(`Quota atteint — ${_} messages/semaine. Renouvellement lundi prochain.

Upgrade vers Sprint Bac pour plus de questions.`);return}let n={role:"user",content:i,id:T};M(e=>e+1),y(e=>[...e,n]),$(""),w(!1),j(!0);let a=[...b,n].map(e=>({role:e.role,content:e.content}));try{let e=await fetch("/api/anthropic",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:4e3,system:u,messages:a})}),t=await e.json();if(429===e.status){y(e=>[...e,{role:"assistant",content:`⚠️ ${t.error||"Quota hebdomadaire atteint. Renouvellement lundi."}`,id:T}]),M(e=>e+1),j(!1);return}let r=t.content?.map(e=>e.text||"").join("")||"D\xe9sol\xe9, je n'ai pas pu g\xe9n\xe9rer une r\xe9ponse.";await p("chat");let i=[...b,n,{role:"assistant",content:r,id:T}];y(e=>[...e,{role:"assistant",content:r,id:T}]),M(e=>e+1),setTimeout(()=>{s(i),P(c())},100)}catch{y(e=>[...e,{role:"assistant",content:"⚠️ Erreur de connexion. V\xe9rifie que le serveur est bien d\xe9marr\xe9.",id:T}]),M(e=>e+1)}j(!1)},[D,S,b,T,e,r,p,_]);return(0,i.jsxs)(i.Fragment,{children:[i.jsx(a.Z,{}),i.jsx("main",{style:{position:"fixed",top:64,left:0,right:0,bottom:0,zIndex:1,display:"flex",flexDirection:"column",overflow:"hidden"},children:(0,i.jsxs)("div",{style:{flex:1,display:"flex",overflow:"hidden",maxWidth:1200,width:"100%",margin:"0 auto",padding:"0 16px",gap:16,minHeight:0,scrollbarWidth:"thin",scrollbarColor:"rgba(99,102,241,0.4) transparent"},children:[(0,i.jsxs)("aside",{style:{width:260,flexShrink:0,display:"flex",flexDirection:"column",gap:10,padding:"14px 0",overflowY:"auto",overflowX:"hidden",height:"100%"},children:[(0,i.jsxs)("div",{style:{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:16,overflow:"hidden"},children:[(0,i.jsxs)("button",{onClick:()=>E(!q),style:{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 14px",background:"transparent",border:"none",cursor:"pointer",fontFamily:"inherit"},children:[(0,i.jsxs)("span",{style:{fontSize:12,fontWeight:700,color:"var(--text2)"},children:["\uD83D\uDD50 Historique (",z.length,")"]}),i.jsx("span",{style:{fontSize:11,color:"var(--muted)",transform:q?"rotate(180deg)":"none",transition:"0.2s"},children:"▼"})]}),q&&i.jsx("div",{style:{maxHeight:200,overflowY:"auto",borderTop:"1px solid var(--border)"},children:0===z.length?i.jsx("div",{style:{padding:"14px",fontSize:12,color:"var(--muted)",textAlign:"center"},children:"Aucune conversation sauvegard\xe9e"}):z.map(e=>i.jsx("div",{style:{borderBottom:"1px solid var(--border)",padding:"10px 12px",cursor:"pointer",transition:"all 0.15s"},onMouseEnter:e=>e.currentTarget.style.background="rgba(79,110,247,0.06)",onMouseLeave:e=>e.currentTarget.style.background="transparent",children:(0,i.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:4},children:[(0,i.jsxs)("button",{onClick:()=>{y(e.messages),w(!1),E(!1)},style:{flex:1,textAlign:"left",background:"none",border:"none",cursor:"pointer",padding:0,fontFamily:"inherit"},children:[i.jsx("div",{style:{fontSize:11,fontWeight:700,color:"var(--text)",lineHeight:1.35,marginBottom:2},children:e.title}),(0,i.jsxs)("div",{style:{fontSize:10,color:"var(--muted)"},children:[e.date," \xb7 ",e.messages.length," msg"]}),(0,i.jsxs)("div",{style:{fontSize:10,color:"var(--muted)",marginTop:2,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:[e.preview.slice(0,50),"…"]})]}),i.jsx("button",{onClick:t=>{t.stopPropagation(),function(e){try{let t=c().filter(t=>t.id!==e);localStorage.setItem(l,JSON.stringify(t))}catch{}}(e.id),P(c())},style:{background:"none",border:"none",cursor:"pointer",color:"rgba(239,68,68,0.5)",fontSize:14,flexShrink:0,padding:"0 2px"},title:"Supprimer",children:"\xd7"})]})},e.id))})]}),(0,i.jsxs)("div",{style:{background:"linear-gradient(135deg,rgba(6,214,160,0.08),rgba(79,110,247,0.08))",border:"1px solid rgba(6,214,160,0.22)",borderRadius:14,padding:"12px 14px"},children:[(0,i.jsxs)("div",{style:{display:"flex",gap:10,alignItems:"center"},children:[i.jsx("div",{style:{width:36,height:36,borderRadius:"50%",background:"linear-gradient(135deg,#06d6a0,#059669)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0},children:"\uD83E\uDD16"}),(0,i.jsxs)("div",{style:{flex:1,minWidth:0},children:[i.jsx("div",{style:{fontWeight:700,fontSize:13},children:"Prof IA"}),i.jsx("div",{style:{fontSize:10,color:"#06d6a0"},children:"● En ligne \xb7 Maths Tunisie & France"})]})]}),(0,i.jsxs)("div",{style:{marginTop:8,fontSize:10,color:"var(--text2)",lineHeight:1.5,background:"rgba(99,102,241,0.08)",borderRadius:7,padding:"6px 8px"},children:["\uD83D\uDCA1 Dis ",i.jsx("strong",{children:'"trace"'})," ou ",i.jsx("strong",{children:'"repr\xe9sente"'})," pour avoir un graphique interactif"]})]}),(0,i.jsxs)("div",{style:{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:14,overflow:"hidden"},children:[i.jsx("div",{style:{padding:"8px 12px",borderBottom:"1px solid var(--border)",fontSize:10,color:"var(--muted)",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em"},children:"Questions fr\xe9quentes"}),i.jsx("div",{style:{display:"flex",overflowX:"auto",borderBottom:"1px solid var(--border)"},children:g.map((e,t)=>i.jsx("button",{onClick:()=>k(t),style:{padding:"7px 10px",border:"none",cursor:"pointer",flexShrink:0,background:C===t?`${e.color}15`:"transparent",borderBottom:C===t?`2px solid ${e.color}`:"2px solid transparent",fontSize:10,color:C===t?e.color:"var(--muted)",fontWeight:C===t?700:400,transition:"all 0.15s"},children:e.cat.split(" ")[0]},t))}),i.jsx("div",{style:{padding:8,display:"flex",flexDirection:"column",gap:3},children:g[C].questions.map((e,t)=>(0,i.jsxs)("button",{onClick:()=>G(e),disabled:S,style:{textAlign:"left",padding:"7px 9px",borderRadius:7,border:"none",background:"transparent",color:"var(--text2)",fontSize:11.5,cursor:"pointer",lineHeight:1.4,transition:"all 0.15s"},onMouseEnter:e=>{e.currentTarget.style.background=`${g[C].color}12`,e.currentTarget.style.color=g[C].color},onMouseLeave:e=>{e.currentTarget.style.background="transparent",e.currentTarget.style.color="var(--text2)"},children:["↗ ",e]},t))})]}),b.length>0&&(0,i.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:6},children:[i.jsx("button",{onClick:()=>(function(e){let t=[];document.querySelectorAll("canvas").forEach(e=>{try{let r=e.toDataURL("image/png");t.push(r)}catch{}});let r=[];document.querySelectorAll("svg").forEach(e=>{try{let t=new XMLSerializer().serializeToString(e),i="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(t);r.push(i)}catch{}});let i=function(e,t=[],r=[]){let i=new Date().toLocaleDateString("fr-FR",{day:"2-digit",month:"long",year:"numeric",hour:"2-digit",minute:"2-digit"}),n=e=>e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");function a(e){if(e.trim().startsWith("{")||e.trim().startsWith('"type"')||e.trim().startsWith('"title"')||e.trim().startsWith('"xrange"')||e.trim().startsWith('"functions"')||e.trim().startsWith('"points"')||e.trim().startsWith('"shapes"')||e.trim().startsWith('"asymptotes"')||"```"===e.trim()||"```graph"===e.trim())return"";if(!e.trim())return'<div style="height:6px"></div>';let t=e=>{let t=e.replace(/\$\$([\s\S]+?)\$\$/g,(e,t)=>{let r=d(t.trim());return`<div style="text-align:center;margin:6px 0;padding:4px 0;font-family:'Cambria Math','Times New Roman',serif;font-size:14px;color:#1a1a2e">${n(r)}</div>`});return(t=t.replace(/\$([^$\n]+?)\$/g,(e,t)=>{let r=d(t.trim());return`<span style="font-family:'Cambria Math','Times New Roman',serif;color:#1e1b4b">${n(r)}</span>`})).replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>").replace(/\*(.+?)\*/g,"<em>$1</em>")};return e.startsWith("## ")?`<h3 style="font-size:14px;font-weight:700;color:#4f6ef7;margin:14px 0 5px;border-bottom:1px solid #e0e7ff;padding-bottom:4px">${t(e.slice(3))}</h3>`:e.startsWith("### ")?`<h4 style="font-size:13px;font-weight:700;color:#1a1a2e;margin:10px 0 4px">${t(e.slice(4))}</h4>`:e.startsWith("> ")?`<div style="background:#f0f4ff;border-left:3px solid #4f6ef7;padding:8px 12px;margin:6px 0;border-radius:0 6px 6px 0;font-weight:600;color:#1e1b4b">${t(e.slice(2))}</div>`:e.startsWith("- ")?`<li style="margin:2px 0 2px 18px;font-size:13px">${t(e.slice(2))}</li>`:/^\d+\.\s/.test(e)?`<li style="margin:2px 0 2px 18px;font-size:13px;list-style-type:decimal">${t(e.replace(/^\d+\.\s/,""))}</li>`:`<p style="margin:3px 0;font-size:13.5px;line-height:1.75">${t(e)}</p>`}let o=e.map(e=>{let i="user"===e.role,n=0,o=0,l=e.content.replace(/```graph[\s\S]*?```/g,()=>{let e=t[n],i=r[o];return e?(n++,`<div style="margin:12px 0;text-align:center"><img src="${e}" style="max-width:100%;border-radius:8px;border:1px solid #e2e8f0" alt="Graphique"/></div>`):i?(o++,`<div style="margin:12px 0;text-align:center"><img src="${i}" style="max-width:100%;border-radius:8px;border:1px solid #e2e8f0" alt="Graphique"/></div>`):'<div style="background:#f0f4ff;border-left:3px solid #4f6ef7;padding:8px 12px;margin:8px 0;border-radius:0 6px 6px 0;font-style:italic;color:#4f6ef7;font-size:12px">\uD83D\uDCCA Graphique — ouvrir dans MathBac.AI pour visualiser</div>'}).split("\n").map(a).join("");return`
    <div style="margin-bottom:20px">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
        <div style="width:28px;height:28px;border-radius:50%;background:${i?"linear-gradient(135deg,#4f6ef7,#7c3aed)":"linear-gradient(135deg,#06d6a0,#059669)"};display:flex;align-items:center;justify-content:center;font-size:14px;color:white;flex-shrink:0">${i?"\uD83D\uDC64":"\uD83E\uDD16"}</div>
        <strong style="font-size:12px;color:${i?"#4f6ef7":"#059669"}">${i?"\xc9l\xe8ve":"Prof IA"}</strong>
      </div>
      <div style="margin-left:36px;background:${i?"#f8f9ff":"#ffffff"};border:1px solid ${i?"#c7d4f5":"#e2e8f0"};border-left:3px solid ${i?"#4f6ef7":"#06d6a0"};border-radius:0 8px 8px 0;padding:12px 16px">
        ${l}
      </div>
    </div>`}).join("");return`<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<title>MathBac.AI — Chat Prof IA</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Segoe UI',Arial,sans-serif;background:#fff;color:#1a1a2e;font-size:14px;line-height:1.7}
  .page{max-width:800px;margin:0 auto;padding:32px 40px 60px}
  .print-bar{position:sticky;top:0;z-index:99;background:#fff;border-bottom:2px solid #1a1a2e;padding:10px 0 12px;margin-bottom:20px;display:flex;align-items:center;gap:12px}
  .print-btn{background:#1a1a2e;color:#fff;border:none;border-radius:6px;padding:9px 22px;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit}
  .header{display:grid;grid-template-columns:1fr auto;align-items:center;border:2px solid #1a1a2e;border-radius:4px;margin-bottom:24px;overflow:hidden}
  .header-left{padding:16px 22px}
  .brand{font-size:11px;font-weight:700;color:#4f6ef7;letter-spacing:.1em;text-transform:uppercase;margin-bottom:4px}
  .htitle{font-size:19px;font-weight:800;color:#1a1a2e}
  .header-right{background:#1a1a2e;color:#fff;padding:16px 20px;text-align:right;font-size:12px;line-height:1.7}
  .footer{margin-top:32px;padding-top:12px;border-top:2px solid #1a1a2e;display:flex;justify-content:space-between;font-size:10px;color:#666}
  .katex-display{margin:8px 0!important;overflow-x:auto}
  @media print{.print-bar{display:none!important}.page{padding:10px 20px}}
</style>
</head>
<body>
<div class="page">
  <div class="print-bar">
    <button class="print-btn" onclick="window.print()">🖨 Imprimer / Enregistrer en PDF</button>
    <span style="font-size:12px;color:#666">Bo\xeete d'impression → <strong>Enregistrer en PDF</strong></span>
  </div>
  <div class="header">
    <div class="header-left">
      <div class="brand">🤖 MathBac.AI \xb7 Chat Prof IA</div>
      <div class="htitle">Conversation math\xe9matiques</div>
    </div>
    <div class="header-right">
      <strong>Date :</strong> ${i}<br>
      <strong>Messages :</strong> ${e.length}<br>
      <strong>Source :</strong> MathBac.AI
    </div>
  </div>
  ${o}
  <div class="footer">
    <span><strong>MathBac.AI</strong> — Chat Prof IA \xb7 Programme CNP officiel</span>
    <span>MathBac.AI ${new Date().getFullYear()}</span>
  </div>
</div>
<script>
  const katexCDN='https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js'
  const s=document.createElement('script');s.src=katexCDN;s.onload=()=>{
    document.querySelectorAll('p,h3,h4,li,div').forEach(el=>{
      try{if(el.children.length===0)el.innerHTML=el.innerHTML
        .replace(/\\$\\$([\\s\\S]+?)\\$\\$/g,(_,m)=>katex.renderToString(m.trim(),{throwOnError:false,displayMode:true}))
        .replace(/\\$([^$\\n]+?)\\$/g,(_,m)=>katex.renderToString(m.trim(),{throwOnError:false,displayMode:false}))}catch(e){}
    })
    setTimeout(()=>window.print(),600)
  };document.head.appendChild(s)
</script>
</body>
</html>`}(e,t,r),n=window.open("","_blank");if(!n){alert("Popup bloqu\xe9 — autorisez les popups pour ce site");return}n.document.write(i),n.document.close()})(b.map(e=>({role:e.role,content:e.content}))),style:{display:"flex",alignItems:"center",gap:7,padding:"8px 14px",background:"linear-gradient(135deg,rgba(99,102,241,0.25),rgba(139,92,246,0.2))",border:"1px solid rgba(99,102,241,0.35)",borderRadius:10,cursor:"pointer",fontSize:12,fontWeight:700,color:"#a5b4fc",fontFamily:"inherit",width:"100%",justifyContent:"center"},children:"\uD83C\uDFA8 Imprimer PDF"}),i.jsx("button",{onClick:()=>{x(b.map(e=>{let t=e.content.replace(/```graph[\s\S]*?```/g,"[Graphique interactif]").split("\n").map(e=>e.replace(/\$\$([\s\S]+?)\$\$/g,(e,t)=>d(t)).replace(/\$([^$\n]+?)\$/g,(e,t)=>d(t)).replace(/^## /,"").replace(/^### /,"").replace(/\*\*(.+?)\*\*/g,"$1").replace(/^> /,"→ ").replace(/^- /,"• ")).join("\n");return("user"===e.role?"\uD83D\uDC64 \xc9l\xe8ve:\n":"\uD83E\uDD16 Prof IA:\n")+t}).join("\n\n─────────────\n\n").trim()).then(()=>{O("Copi\xe9 !"),setTimeout(()=>O(""),2500)}).catch(()=>O("Erreur copie"))},style:{padding:"8px 14px",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:10,cursor:"pointer",fontSize:12,color:W?"#6ee7b7":"rgba(255,255,255,0.5)",fontFamily:"inherit",width:"100%",textAlign:"center"},children:W?`✓ ${W}`:"\uD83D\uDCCB Copier la conversation"}),i.jsx("button",{onClick:()=>{s(b),P(c()),y([]),w(!0),$("")},style:{padding:"7px 14px",borderRadius:10,border:"1px solid var(--border)",background:"transparent",color:"var(--muted)",fontSize:11,cursor:"pointer",width:"100%",textAlign:"center"},children:"\uD83D\uDDD1 Nouvelle conversation"})]})]}),(0,i.jsxs)("div",{style:{flex:1,display:"flex",flexDirection:"column",minWidth:0,minHeight:0,overflow:"hidden"},children:[(0,i.jsxs)("div",{style:{padding:"14px 0 11px",borderBottom:"1px solid var(--border)",display:"flex",alignItems:"center",gap:12,flexShrink:0},children:[i.jsx("div",{style:{width:9,height:9,borderRadius:"50%",background:"#06d6a0",animation:"pulse 2s ease infinite"}}),i.jsx("span",{style:{fontWeight:700,fontSize:15},children:"Professeur IA — Math\xe9matiques"}),i.jsx("span",{style:{marginLeft:"auto",fontSize:11,color:"var(--muted)",fontFamily:"monospace"},children:b.length>0?`${Math.ceil(b.length/2)} \xe9changes`:"\uD83D\uDCC8 Graphiques \xb7 \uD83D\uDCD0 G\xe9om\xe9trie \xb7 \uD83E\uDDEE Tous chapitres"})]}),(0,i.jsxs)("div",{ref:N,style:{flex:1,overflowY:"auto",minHeight:0,padding:"20px 4px"},children:[A&&0===b.length&&(0,i.jsxs)("div",{style:{textAlign:"center",padding:"36px 20px"},children:[i.jsx("div",{style:{fontSize:46,marginBottom:14},children:"\uD83C\uDF93"}),i.jsx("h2",{style:{fontSize:21,marginBottom:8},children:"Bonjour ! Je suis ton Prof IA"}),(0,i.jsxs)("p",{style:{color:"var(--text2)",fontSize:14,maxWidth:500,margin:"0 auto 28px",lineHeight:1.6},children:["Pose-moi n'importe quelle question sur les maths — Bac Tunisie ou France.",i.jsx("br",{}),"Je peux ",i.jsx("strong",{style:{color:"#a78bfa"},children:"tracer des courbes"}),", dessiner des ",i.jsx("strong",{style:{color:"#f59e0b"},children:"figures g\xe9om\xe9triques"}),", et expliquer tous les chapitres du programme."]}),i.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(185px,1fr))",gap:9,maxWidth:620,margin:"0 auto"},children:h.map((e,t)=>(0,i.jsxs)("button",{onClick:()=>G(e.text),style:{textAlign:"left",padding:"12px 14px",borderRadius:12,background:"var(--surface)",border:"1px solid var(--border)",cursor:"pointer",transition:"all 0.2s"},onMouseEnter:e=>{e.currentTarget.style.borderColor="#6366f1",e.currentTarget.style.background="rgba(99,102,241,0.06)"},onMouseLeave:e=>{e.currentTarget.style.borderColor="var(--border)",e.currentTarget.style.background="var(--surface)"},children:[i.jsx("div",{style:{fontSize:19,marginBottom:5},children:e.icon}),i.jsx("div",{style:{fontSize:12,color:"var(--text)",lineHeight:1.4,fontFamily:"monospace"},children:e.text}),i.jsx("div",{style:{fontSize:10,color:"#6366f1",marginTop:5,fontWeight:600},children:e.tag})]},t))})]}),b.map(e=>i.jsx(v,{msg:e,onDelete:e=>y(t=>t.filter(t=>t.id!==e)),onEdit:(e,t)=>y(r=>r.map(r=>r.id===e?{...r,content:t}:r))},e.id)),S&&(0,i.jsxs)("div",{style:{display:"flex",gap:12,alignItems:"flex-start",marginBottom:20},children:[i.jsx("div",{style:{width:36,height:36,borderRadius:"50%",background:"linear-gradient(135deg,#06d6a0,#059669)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16},children:"\uD83E\uDD16"}),i.jsx("div",{style:{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:"4px 18px 18px 18px",padding:"14px 18px",display:"flex",gap:5,alignItems:"center"},children:[0,1,2].map(e=>i.jsx("div",{style:{width:7,height:7,borderRadius:"50%",background:"#06d6a0",animation:`bounce 1.2s ease ${.2*e}s infinite`}},e))})]})]}),i.jsx("div",{style:{padding:"6px 0 2px",flexShrink:0},children:(0,i.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:8,flexWrap:"wrap"},children:[(0,i.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:6,fontSize:11,color:e?"rgba(110,231,183,0.9)":F?"rgba(239,68,68,0.9)":H<=5?"rgba(245,158,11,0.9)":"rgba(255,255,255,0.4)"},children:[i.jsx("span",{style:{width:6,height:6,borderRadius:"50%",background:e?"#10b981":F?"#ef4444":H<=5?"#f59e0b":"#10b981",display:"inline-block"}}),e?"✓ Admin — illimit\xe9":F?"Quota atteint — renouvellement lundi":`${H} question${H>1?"s":""} restante${H>1?"s":""} cette semaine`]}),!e&&H<=5&&!F&&i.jsx("a",{href:"/abonnement",style:{fontSize:10,color:"var(--gold)",textDecoration:"none",fontFamily:"monospace"},children:"\uD83D\uDD25 Sprint Bac pour +messages"}),!e&&F&&i.jsx("a",{href:"/abonnement",style:{fontSize:11,color:"#ef4444",textDecoration:"none",fontWeight:600},children:"Voir les abonnements →"})]})}),(0,i.jsxs)("div",{style:{padding:"4px 0 14px",flexShrink:0},children:[(0,i.jsxs)("div",{style:{display:"flex",gap:10,alignItems:"flex-end",background:"var(--surface)",border:"1px solid var(--border)",borderRadius:16,padding:"10px 12px",transition:"border-color 0.2s"},onFocusCapture:e=>e.currentTarget.style.borderColor="#6366f1",onBlurCapture:e=>e.currentTarget.style.borderColor="var(--border)",children:[i.jsx("textarea",{ref:I,value:D,onChange:e=>$(e.target.value),onKeyDown:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),G())},placeholder:F?"Quota atteint — renouvellement lundi prochain":'Pose ta question… ou dis "trace f(x) = x\xb2−2x" pour un graphique interactif',rows:1,style:{flex:1,border:"none",background:"transparent",color:"var(--text)",fontSize:14,fontFamily:"inherit",resize:"none",outline:"none",lineHeight:1.5,maxHeight:120,overflow:"auto"},onInput:e=>{let t=e.target;t.style.height="auto",t.style.height=Math.min(t.scrollHeight,120)+"px"}}),i.jsx("button",{onClick:()=>G(),disabled:S||!D.trim()||F,style:{width:38,height:38,borderRadius:10,border:"none",flexShrink:0,background:S||!D.trim()||F?"var(--surface2)":"linear-gradient(135deg,#4f6ef7,#7c3aed)",color:"white",fontSize:16,cursor:S||!D.trim()||F?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s"},children:S?"⟳":F?"\uD83D\uDD12":"↑"})]}),i.jsx("div",{style:{textAlign:"center",fontSize:10.5,color:"var(--muted)",marginTop:7},children:"Entr\xe9e pour envoyer \xb7 Shift+Entr\xe9e pour saut de ligne \xb7 Tunisie & France \xb7 \uD83D\uDCC8 Graphiques interactifs"})]})]})]})}),i.jsx("style",{children:`
        @keyframes bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-8px)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @media(max-width:768px){ aside{display:none!important} }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: rgba(255,255,255,0.03); }
        ::-webkit-scrollbar-thumb { background: rgba(99,102,241,0.4); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(99,102,241,0.7); }
      `})]})}},34356:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>i});let i=(0,r(68570).createProxy)(String.raw`C:\math-ai-coach\src\app\chat\page.tsx#default`)}};var t=require("../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),i=t.X(0,[9276,813,434,4872],()=>r(21691));module.exports=i})();