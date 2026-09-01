"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "./Lightbox";

type Miembro = { cargo: string; nombre: string; foto: string };

function iniciales(nombre: string) {
  return nombre
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

export default function DirectivaGrid({ directiva }: { directiva: Miembro[] }) {
  const conFoto = directiva.filter((m) => m.foto);
  const [abierto, setAbierto] = useState<number | null>(null);

  if (directiva.length === 0) {
    return (
      <p className="font-mono text-sm text-marcador col-span-full">
        Todavía no se ha cargado la directiva.
      </p>
    );
  }

  return (
    <>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 mb-16">
        {directiva.map((m, i) => {
          const tieneFoto = Boolean(m.foto);
          const contenido = (
            <>
              <div className="w-full aspect-square bg-cancha rounded-xl flex items-center justify-center relative overflow-hidden mb-1.5">
                {tieneFoto ? (
                  <>
                    <Image src={m.foto} alt={m.nombre} fill className="object-cover" />
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
                  </>
                ) : (
                  <span className="font-display text-2xl text-dorado">{iniciales(m.nombre)}</span>
                )}
              </div>
              <p className="font-display text-xs leading-tight">{m.nombre}</p>
              <p className="font-mono text-[10px] uppercase tracking-wider text-marcador mt-0.5">
                {m.cargo}
              </p>
            </>
          );

          if (!tieneFoto) {
            return (
              <div key={i} className="figurita p-1.5 flex flex-col items-center text-center">
                {contenido}
              </div>
            );
          }

          return (
            <button
              key={i}
              type="button"
              onClick={() => setAbierto(conFoto.indexOf(m))}
              aria-label={`Ampliar foto de ${m.nombre}`}
              className="figurita p-1.5 flex flex-col items-center text-center cursor-zoom-in group"
            >
              {contenido}
            </button>
          );
        })}
      </div>

      {abierto !== null && (
        <Lightbox
          items={conFoto.map((m) => ({ src: m.foto, alt: m.nombre, caption: `${m.nombre} · ${m.cargo}` }))}
          index={abierto}
          onClose={() => setAbierto(null)}
          onNavigate={setAbierto}
        />
      )}
    </>
  );
}
