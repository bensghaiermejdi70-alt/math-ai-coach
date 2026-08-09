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

// Compromis étirement / recadrage pour remplir l'écran sans bande
// noire : 0 = étirement complet (aucune coupe, formes déformées),
// 1 = recadrage complet (formes intactes, bords coupés). 0.5 = on
// partage la différence moitié-moitié entre les deux défauts.
const FILL_BLEND = 0.5;

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

  // Mobile / écran étroit : le jeu garde sa taille native, on
  // l'étire/recadre légèrement (moitié-moitié) pour remplir tout
  // l'écran sans bande noire, sans toucher au fichier du jeu.
  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden bg-black">
      <div
        style={{
          width: designWidth,
          height: designHeight,
          transform: `scale(${scale.scaleX}, ${scale.scaleY})`,
          transformOrigin: "center center",
          flexShrink: 0,
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
  );
}