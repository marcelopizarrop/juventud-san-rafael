"use client";

import { useEffect, useState } from "react";
import FotoAdaptativa from "./FotoAdaptativa";

type Foto = { imagen: string; leyenda: string };

export default function GaleriaGrid({ fotos }: { fotos: Foto[] }) {
  const [abierta, setAbierta] = useState<number | null>(null);

  useEffect(() => {
    if (abierta === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAbierta(null);
      if (e.key === "ArrowRight") setAbierta((i) => (i === null ? i : (i + 1) % fotos.length));
      if (e.key === "ArrowLeft")
        setAbierta((i) => (i === null ? i : (i - 1 + fotos.length) % fotos.length));
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [abierta, fotos.length]);

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
        <div
          className="fixed inset-0 z-50 bg-tinta/90 flex flex-col items-center justify-center p-4 sm:p-8"
          onClick={() => setAbierta(null)}
        >
          <button
            type="button"
            aria-label="Cerrar"
            onClick={() => setAbierta(null)}
            className="absolute z-10 top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors text-2xl leading-none"
          >
            ×
          </button>

          {fotos.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Foto anterior"
                onClick={(e) => {
                  e.stopPropagation();
                  setAbierta((i) => (i === null ? i : (i - 1 + fotos.length) % fotos.length));
                }}
                className="absolute z-10 left-2 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors text-2xl"
              >
                ‹
              </button>
              <button
                type="button"
                aria-label="Foto siguiente"
                onClick={(e) => {
                  e.stopPropagation();
                  setAbierta((i) => (i === null ? i : (i + 1) % fotos.length));
                }}
                className="absolute z-10 right-2 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors text-2xl"
              >
                ›
              </button>
            </>
          )}

          <div
            className="relative w-full h-full max-w-5xl max-h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <FotoAdaptativa
              src={fotos[abierta].imagen}
              alt={fotos[abierta].leyenda || "Foto del club"}
              priority
              sizes="100vw"
            />
          </div>

          {fotos[abierta].leyenda && (
            <p className="font-mono text-sm text-white/90 mt-4 text-center px-4">
              {fotos[abierta].leyenda}
            </p>
          )}
        </div>
      )}
    </>
  );
}
