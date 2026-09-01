"use client";

import { useEffect } from "react";
import FotoAdaptativa from "./FotoAdaptativa";

export type ItemLightbox = { src: string; alt: string; caption?: string };

/**
 * Visor de foto ampliada a pantalla completa, reutilizable en el
 * carrusel, la galería y las fichas de jugadores. Navega con las
 * flechas en pantalla, el teclado (← →) o Escape, y se cierra al
 * hacer clic fuera de la foto.
 */
export default function Lightbox({
  items,
  index,
  onClose,
  onNavigate
}: {
  items: ItemLightbox[];
  index: number;
  onClose: () => void;
  onNavigate: (nuevoIndice: number) => void;
}) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate((index + 1) % items.length);
      if (e.key === "ArrowLeft") onNavigate((index - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [index, items.length, onClose, onNavigate]);

  const item = items[index];
  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-tinta/90 flex flex-col items-center justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      <button
        type="button"
        aria-label="Cerrar"
        onClick={onClose}
        className="absolute z-10 top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors text-2xl leading-none"
      >
        ×
      </button>

      {items.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Foto anterior"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((index - 1 + items.length) % items.length);
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
              onNavigate((index + 1) % items.length);
            }}
            className="absolute z-10 right-2 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors text-2xl"
          >
            ›
          </button>
        </>
      )}

      <div className="relative w-full h-full max-w-5xl max-h-[80vh]" onClick={(e) => e.stopPropagation()}>
        <FotoAdaptativa src={item.src} alt={item.alt} priority sizes="100vw" />
      </div>

      {item.caption && (
        <p className="font-mono text-sm text-white/90 mt-4 text-center px-4">{item.caption}</p>
      )}
    </div>
  );
}
