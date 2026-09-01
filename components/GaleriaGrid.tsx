"use client";

import { useState } from "react";
import FotoAdaptativa from "./FotoAdaptativa";
import Lightbox from "./Lightbox";

type Foto = { imagen: string; leyenda: string };

export default function GaleriaGrid({ fotos }: { fotos: Foto[] }) {
  const [abierta, setAbierta] = useState<number | null>(null);

  if (fotos.length === 0) {
    return (
      <p className="font-mono text-sm text-marcador">
        Todavía no hay fotos cargadas en esta sección.
      </p>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {fotos.map((f, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setAbierta(i)}
            aria-label={`Ampliar foto${f.leyenda ? ": " + f.leyenda : ""}`}
            className="figurita overflow-hidden text-left cursor-zoom-in group"
          >
            <div className="relative w-full aspect-[4/3] bg-cancha-oscuro">
              <FotoAdaptativa
                src={f.imagen}
                alt={f.leyenda || "Foto del club"}
                sizes="(min-width: 768px) 25vw, 50vw"
              />
              <div className="absolute inset-0 bg-tinta/0 group-hover:bg-tinta/25 transition-colors flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="10" cy="10" r="6" />
                  <path d="M20 20l-4.5-4.5M10 8v4M8 10h4" strokeLinecap="round" />
                </svg>
              </div>
            </div>
            {f.leyenda && (
              <p className="font-mono text-xs text-marcador px-3 py-2">{f.leyenda}</p>
            )}
          </button>
        ))}
      </div>

      {abierta !== null && (
        <Lightbox
          items={fotos.map((f) => ({ src: f.imagen, alt: f.leyenda || "Foto del club", caption: f.leyenda }))}
          index={abierta}
          onClose={() => setAbierta(null)}
          onNavigate={setAbierta}
        />
      )}
    </>
  );
}
