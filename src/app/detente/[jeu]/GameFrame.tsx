"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Largeur à partir de laquelle on considère qu'on est sur un écran
// "type PC" : l'iframe est alors affichée telle quelle, exactement
// comme avant (aucun changement sur ce cas).
const DESKTOP_BREAKPOINT = 1024;

// Taille "virtuelle" à laquelle les jeux ont été conçus (canvas fixe).
// En dessous du breakpoint, on affiche le jeu à cette taille native
// puis on le réduit/adapte visuellement (CSS transform) pour qu'il
// remplisse l'écran — le fichier du jeu lui-même n'est jamais modifié.
const DEFAULT_DESIGN_WIDTH = 1280;
const DEFAULT_DESIGN_HEIGHT = 800;

// Compromis étirement / recadrage. Avec le défilement tactile
// maintenant actif, le recadrage n'a plus d'inconvénient (on atteint
// toujours la zone coupée en glissant le doigt) alors que
// l'étirement déforme en permanence — donc réglé à 1 (recadrage
// complet, zéro déformation) par défaut. Repasser à une valeur plus
// basse (ex. 0.3) si un jeu précis a des boutons vraiment trop loin
// pour qu'on ait envie de scroller.
const FILL_BLEND = 1;

function computeFillScale(vw: number, vh: number, dw: number, dh: number) {
  const sx = vw / dw;
  const sy = vh / dh;
  if (sx >= sy) {
    return { scaleX: sx, scaleY: sy + FILL_BLEND * (sx - sy) };
  }
  return { scaleX: sx + FILL_BLEND * (sy - sx), scaleY: sy };
}

export default function GameFrame({
  slug,
  title,
  designWidth = DEFAULT_DESIGN_WIDTH,
  designHeight = DEFAULT_DESIGN_HEIGHT,
}: {
  slug: string;
  title: string;
  designWidth?: number;
  designHeight?: number;
}) {
  const router = useRouter();
  const [isDesktop, setIsDesktop] = useState(true);
  const [scale, setScale] = useState({ scaleX: 1, scaleY: 1 });

  useEffect(() => {
    function handleMessage(e: MessageEvent) {
      if (e.data?.action === "close") {
        router.push("/detente");
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [router]);

  useEffect(() => {
    function recompute() {
      const desktop = window.innerWidth >= DESKTOP_BREAKPOINT;
      setIsDesktop(desktop);
      if (!desktop) {
        setScale(
          computeFillScale(
            window.innerWidth,
            window.innerHeight,
            designWidth,
            designHeight
          )
        );
      }
    }
    recompute();
    window.addEventListener("resize", recompute);
    window.addEventListener("orientationchange", recompute);
    return () => {
      window.removeEventListener("resize", recompute);
      window.removeEventListener("orientationchange", recompute);
    };
  }, [designWidth, designHeight]);

  if (isDesktop) {
    // Comportement PC actuel — strictement inchangé.
    return (
      <iframe
        src={`/jeux/${slug}.html`}
        title={title}
        className="block h-full w-full border-0"
        allow="fullscreen"
      />
    );
  }

  // Mobile / écran étroit : le jeu garde sa taille native, recadré
  // pour remplir l'écran sans déformation (FILL_BLEND=1), et la zone
  // reste défilable (glisser du doigt) pour atteindre toute portion
  // recadrée hors champ — rien n'est donc jamais définitivement
  // inaccessible. Le fichier du jeu n'est pas touché.
  return (
    <div
      className="h-full w-full overflow-auto bg-black"
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      <div
        style={{
          width: designWidth * scale.scaleX,
          height: designHeight * scale.scaleY,
        }}
      >
        <div
          style={{
            width: designWidth,
            height: designHeight,
            transform: `scale(${scale.scaleX}, ${scale.scaleY})`,
            transformOrigin: "top left",
          }}
        >
          <iframe
            src={`/jeux/${slug}.html`}
            title={title}
            className="block h-full w-full border-0"
            allow="fullscreen"
          />
        </div>
      </div>
    </div>
  );
}