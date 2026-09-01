"use client";

import { useEffect, useRef, useState } from "react";
import FotoAdaptativa from "./FotoAdaptativa";
import Lightbox from "./Lightbox";

type Foto = { imagen: string; leyenda: string };

export default function Carrusel({ fotos }: { fotos: Foto[] }) {
  const [indice, setIndice] = useState(0);
  const [ampliada, setAmpliada] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const tocandoDesde = useRef<number | null>(null);

  useEffect(() => {
    if (fotos.length <= 1 || ampliada) return;
    timerRef.current = setInterval(() => {
      setIndice((i) => (i + 1) % fotos.length);
    }, 5000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [fotos.length, ampliada]);

  if (fotos.length === 0) return null;

  const ir = (i: number) => setIndice((i + fotos.length) % fotos.length);

  return (
    <>
    <div
      className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-card overflow-hidden bg-cancha-oscuro"
      onTouchStart={(e) => (tocandoDesde.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (tocandoDesde.current === null) return;
        const delta = e.changedTouches[0].clientX - tocandoDesde.current;
        if (delta > 50) ir(indice - 1);
        if (delta < -50) ir(indice + 1);
        tocandoDesde.current = null;
      }}
    >
      {fotos.map((foto, i) => (
        <button
          key={foto.imagen + i}
          type="button"
          aria-label={`Ampliar foto${foto.leyenda ? ": " + foto.leyenda : ""}`}
          onClick={() => setAmpliada(true)}
          className="carrusel-slide absolute inset-0 text-left cursor-zoom-in group"
          style={{ opacity: i === indice ? 1 : 0, pointerEvents: i === indice ? "auto" : "none" }}
        >
          <FotoAdaptativa
            src={foto.imagen}
            alt={foto.leyenda || "Foto del club"}
            priority={i === 0}
            sizes="(min-width: 1280px) 1152px, 100vw"
          />
          <div className="absolute inset-0 bg-tinta/0 group-hover:bg-tinta/20 transition-colors flex items-center justify-center">
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
          {foto.leyenda && (
            <p className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white font-mono text-xs sm:text-sm px-4 py-4">
              {foto.leyenda}
            </p>
          )}
        </button>
      ))}

      {fotos.length > 1 && (
        <>
          <button
            aria-label="Foto anterior"
            onClick={() => ir(indice - 1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/85 text-tinta flex items-center justify-center hover:bg-white transition-colors"
          >
            ‹
          </button>
          <button
            aria-label="Foto siguiente"
            onClick={() => ir(indice + 1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/85 text-tinta flex items-center justify-center hover:bg-white transition-colors"
          >
            ›
          </button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {fotos.map((_, i) => (
              <button
                key={i}
                aria-label={`Ir a la foto ${i + 1}`}
                onClick={() => ir(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === indice ? "bg-white w-5" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>

    {ampliada && (
      <Lightbox
        items={fotos.map((f) => ({ src: f.imagen, alt: f.leyenda || "Foto del club", caption: f.leyenda }))}
        index={indice}
        onClose={() => setAmpliada(false)}
        onNavigate={setIndice}
      />
    )}
    </>
  );
}
