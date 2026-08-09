"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Largeur à partir de laquelle on considère qu'on est sur un écran
// "type PC" : l'iframe est alors affichée telle quelle, exactement
// comme avant (aucun changement sur ce cas).
const DESKTOP_BREAKPOINT = 1024;

// Taille "virtuelle" à laquelle les jeux ont été conçus (canvas fixe).
// En dessous du breakpoint, on affiche le jeu à cette taille native
// puis on le réduit visuellement (CSS transform) pour qu'il tienne à
// l'écran — le fichier du jeu lui-même n'est jamais modifié ni
// redimensionné, on change juste le "zoom" de la fenêtre qui le montre.
const DEFAULT_DESIGN_WIDTH = 1280;
const DEFAULT_DESIGN_HEIGHT = 800;

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
  const [scale, setScale] = useState(1);

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
        const s = Math.min(
          window.innerWidth / designWidth,
          window.innerHeight / designHeight
        );
        setScale(s);
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

  // Mobile / écran étroit : le jeu garde sa taille native, on le
  // réduit à l'échelle pour qu'il tienne entièrement à l'écran (et
  // qu'il en profite vraiment en paysage), sans toucher au fichier
  // du jeu.
  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden bg-black">
      <div
        style={{
          width: designWidth,
          height: designHeight,
          transform: `scale(${scale})`,
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