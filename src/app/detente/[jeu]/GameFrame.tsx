"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GameFrame({
  slug,
  title,
}: {
  slug: string;
  title: string;
}) {
  const router = useRouter();

  useEffect(() => {
    function handleMessage(e: MessageEvent) {
      if (e.data?.action === "close") {
        router.push("/detente");
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [router]);

  return (
    <iframe
      src={`/jeux/${slug}.html`}
      title={title}
      className="block h-full w-full border-0"
      allow="fullscreen"
    />
  );
}