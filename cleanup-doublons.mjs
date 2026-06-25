// cleanup-doublons.mjs
// Detecte (et annule) les abonnements Stripe en double : MEME email + MEME offre (price).
//
// SECURITE : par defaut il n'annule RIEN (dry run). Il affiche seulement
// ce qu'il garderait et ce qu'il annulerait. Pour annuler reellement,
// relance avec EXECUTE=1.
//
// Lancement (PowerShell, depuis le dossier du projet) :
//   1) Lecture seule (recommande d'abord) :
//        $env:STRIPE_SECRET_KEY="sk_live_xxx"; node cleanup-doublons.mjs
//   2) Annulation reelle (apres avoir verifie la liste) :
//        $env:STRIPE_SECRET_KEY="sk_live_xxx"; $env:EXECUTE="1"; node cleanup-doublons.mjs
//
// (sk_live_xxx = ta cle secrete Stripe LIVE, depuis Dashboard > Developers > API keys)

import Stripe from "stripe"

const KEY = process.env.STRIPE_SECRET_KEY
if (!KEY) {
  console.error("STRIPE_SECRET_KEY manquante. Ex: $env:STRIPE_SECRET_KEY=\"sk_live_...\"")
  process.exit(1)
}

const stripe = new Stripe(KEY)
const EXECUTE = process.env.EXECUTE === "1"

// Statuts qui facturent encore (donc qui peuvent provoquer des prelevements)
const BILLING = new Set(["active", "trialing", "past_due", "unpaid"])

console.log(EXECUTE
  ? "===== MODE EXECUTION : annulation REELLE des doublons ====="
  : "===== MODE LECTURE SEULE (dry run) : rien ne sera annule ====="
)

// 1) Recuperer TOUS les abonnements (pagination auto) + leur client (pour l'email)
const all = []
for await (const sub of stripe.subscriptions.list({
  status: "all",
  limit: 100,
  expand: ["data.customer"],
})) {
  if (BILLING.has(sub.status)) all.push(sub)
}
console.log(`Abonnements facturants trouves : ${all.length}\n`)

// 2) Grouper par email + price (meme personne, meme offre = doublon)
const groups = new Map()
for (const sub of all) {
  const cust = sub.customer
  const email = (cust && !cust.deleted && cust.email ? cust.email : "").toLowerCase()
  const price = sub.items.data[0]?.price?.id || "?"
  const key = `${email}__${price}`
  if (!groups.has(key)) groups.set(key, [])
  groups.get(key).push(sub)
}

// 3) Pour chaque groupe en double : garder 1, annuler le reste
const rank = { active: 0, trialing: 1, past_due: 2, unpaid: 3 }
let groupesDoublons = 0
let aAnnuler = 0

for (const [key, subs] of groups) {
  if (subs.length < 2) continue
  const [email, price] = key.split("__")
  if (!email) continue // pas d'email identifiable -> on ne touche pas

  groupesDoublons++

  // On garde en priorite : celui qui N'EST PAS en cours d'annulation,
  // puis le plus "sain" (active > trialing > past_due > unpaid),
  // puis le plus recent.
  subs.sort((a, b) =>
    ((a.cancel_at_period_end ? 1 : 0) - (b.cancel_at_period_end ? 1 : 0)) ||
    (((rank[a.status] ?? 9)) - ((rank[b.status] ?? 9))) ||
    (b.created - a.created)
  )

  const keep = subs[0]
  const rest = subs.slice(1)

  console.log(`${email} | offre ${price} | ${subs.length} abonnements`)
  console.log(`   GARDE  : ${keep.id} (${keep.status})`)

  for (const s of rest) {
    aAnnuler++
    console.log(`   ANNULE : ${s.id} (${s.status})`)
    if (EXECUTE) {
      try {
        await stripe.subscriptions.cancel(s.id)
        console.log(`      -> annule OK`)
      } catch (e) {
        console.log(`      -> ERREUR: ${e.message}`)
      }
    }
  }
  console.log("")
}

console.log("──────────────────────────────────────────")
console.log(`Personnes avec doublons : ${groupesDoublons}`)
console.log(`${EXECUTE ? "Abonnements annules" : "Abonnements a annuler"} : ${aAnnuler}`)
if (!EXECUTE && aAnnuler > 0) {
  console.log("\nPour annuler reellement, relance avec EXECUTE=1 :")
  console.log('   $env:EXECUTE="1"; node cleanup-doublons.mjs')
}
