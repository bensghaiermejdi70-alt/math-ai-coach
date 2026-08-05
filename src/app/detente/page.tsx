import Link from "next/link";
import { DETENTE_GAMES } from "./games-data";

export const metadata = {
  title: "Espace Détente — 36 jeux de réflexion gratuits | MathBacAI",
  description:
    "Fais une pause entre deux révisions avec 36 jeux de réflexion originaux, 100% gratuits, sans inscription, sur MathBacAI.",
};

export default function DetentePage() {
  return (
    <main
      className="min-h-screen"
      style={{ background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)" }}
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-12 sm:px-10 lg:px-16">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:text-white"
          style={{ color: "#00ffff" }}
        >
          ← Accueil
        </Link>

        <h1 className="mb-2 text-3xl font-bold text-white md:text-4xl">
          🎮 Espace Détente
        </h1>
        <p className="mb-10" style={{ color: "#ffd700", opacity: 0.9 }}>
          {DETENTE_GAMES.length} jeux de réflexion originaux, 100% gratuits,
          sans inscription. Une pause bien méritée entre deux révisions.
        </p>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {DETENTE_GAMES.map((game) => (
            <Link
              key={game.id}
              href={`/detente/${game.id}`}
              className="group relative flex flex-col items-center justify-center rounded-2xl p-5 text-center transition-transform duration-300 hover:-translate-y-1.5"
              style={{
                background: "rgba(0,0,0,0.16)",
                border: "2px solid #00ffaa",
                boxShadow:
                  "0 0 18px rgba(0,255,170,0.35), inset 0 0 10px rgba(0,255,170,0.15)",
              }}
            >
              <span
                className="mb-1 text-sm font-bold"
                style={{
                  backgroundImage: "linear-gradient(90deg, #00ffff, #8a2be2)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Jeux n°{game.id}
              </span>
              <span className="text-sm font-semibold text-white">
                {game.title}
              </span>
              <span
                className="mt-3 inline-block rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-medium"
                style={{ color: "#00ffaa" }}
              >
                Gratuit
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}