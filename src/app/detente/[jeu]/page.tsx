import { notFound } from "next/navigation";
import { DETENTE_GAMES } from "../games-data";
import GameFrame from "./GameFrame";

export function generateStaticParams() {
  return DETENTE_GAMES.map((g) => ({ jeu: String(g.id) }));
}

export function generateMetadata({ params }: { params: { jeu: string } }) {
  const game = DETENTE_GAMES.find((g) => g.id === Number(params.jeu));
  if (!game) return {};
  return {
    title: `${game.title} — Détente | MathBacAI`,
    description: `Joue gratuitement à ${game.title} sur MathBacAI, entre deux séances de révision.`,
  };
}

export default function GamePage({ params }: { params: { jeu: string } }) {
  const game = DETENTE_GAMES.find((g) => g.id === Number(params.jeu));
  if (!game) notFound();

  return (
    <div className="h-[100dvh] w-full bg-black">
      <GameFrame slug={game.slug} title={game.title} />
    </div>
  );
}