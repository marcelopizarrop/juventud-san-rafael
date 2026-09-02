"use client";

import { useState } from "react";
import FotoAdaptativa from "./FotoAdaptativa";
import Lightbox from "./Lightbox";

type Novedad = {
  titulo: string;
  fecha: string;
  lugar: string;
  descripcion: string;
  imagen: string;
};

function formatFecha(fecha: string) {
  const d = new Date(fecha + "T00:00:00");
  return d.toLocaleDateString("es-CL", {
    weekday: "long",
    day: "2-digit",
    month: "long"
  });
}

export default function NovedadesLista({ novedades }: { novedades: Novedad[] }) {
  const conFoto = novedades.filter((n) => n.imagen);
  const [abierta, setAbierta] = useState<number | null>(null);

  if (novedades.length === 0) {
    return (
      <p className="font-mono text-sm text-marcador">
        Todavía no hay novedades publicadas.
      </p>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {novedades.map((n, i) => (
          <div key={i} className="ticket overflow-hidden p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              {n.imagen && (
                <button
                  type="button"
                  onClick={() => setAbierta(conFoto.indexOf(n))}
                  aria-label={`Ampliar foto: ${n.titulo}`}
                  className="relative w-full h-36 sm:w-28 sm:h-28 shrink-0 rounded-xl overflow-hidden bg-cancha-oscuro cursor-zoom-in group"
                >
                  <FotoAdaptativa
                    src={n.imagen}
                    alt={n.titulo}
                    sizes="(min-width: 640px) 112px, 100vw"
                  />
                  <div className="absolute inset-0 bg-tinta/0 group-hover:bg-tinta/25 transition-colors flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="10" cy="10" r="6" />
                      <path d="M20 20l-4.5-4.5M10 8v4M8 10h4" strokeLinecap="round" />
                    </svg>
                  </div>
                </button>
              )}
              <div className="shrink-0 sm:w-[130px]">
                <p className="font-mono text-xs uppercase text-marcador">
                  {formatFecha(n.fecha)}
                </p>
                <p className="font-mono text-xs text-azul mt-1">{n.lugar}</p>
              </div>
              <div className="min-w-0">
                <h2 className="font-display text-xl text-cancha mb-1">{n.titulo}</h2>
                <p className="text-sm text-marcador">{n.descripcion}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {abierta !== null && (
        <Lightbox
          items={conFoto.map((n) => ({ src: n.imagen, alt: n.titulo, caption: n.titulo }))}
          index={abierta}
          onClose={() => setAbierta(null)}
          onNavigate={setAbierta}
        />
      )}
    </>
  );
}
