"use client";

import { useState } from "react";
import FotoAdaptativa from "./FotoAdaptativa";
import Lightbox from "./Lightbox";

export default function FotoEquipo({ src, alt }: { src: string; alt: string }) {
  const [abierta, setAbierta] = useState(false);

  return (
    <div className="figurita overflow-hidden mb-10">
      <button
        type="button"
        onClick={() => setAbierta(true)}
        aria-label={`Ampliar foto: ${alt}`}
        className="relative block w-full aspect-[16/7] bg-cancha-oscuro cursor-zoom-in group"
      >
        <FotoAdaptativa src={src} alt={alt} sizes="(min-width: 1024px) 1024px, 100vw" />
        <div className="absolute inset-0 bg-tinta/0 group-hover:bg-tinta/25 transition-colors flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            className="w-9 h-9 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="10" cy="10" r="6" />
            <path d="M20 20l-4.5-4.5M10 8v4M8 10h4" strokeLinecap="round" />
          </svg>
        </div>
      </button>

      {abierta && (
        <Lightbox
          items={[{ src, alt, caption: alt }]}
          index={0}
          onClose={() => setAbierta(false)}
          onNavigate={() => {}}
        />
      )}
    </div>
  );
}
