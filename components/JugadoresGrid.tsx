"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "./Lightbox";

type Jugador = {
  numero: number;
  nombre: string;
  posicion: string;
  foto: string;
};

function iniciales(nombre: string) {
  return nombre
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

export default function JugadoresGrid({ jugadores }: { jugadores: Jugador[] }) {
  const conFoto = jugadores.filter((j) => j.foto);
  const [abierto, setAbierto] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {jugadores.map((j, i) => {
          const key = `${j.numero}-${j.nombre}-${i}`;
          const tieneFoto = Boolean(j.foto);
          const contenido = (
            <>
              <div className="w-full aspect-square bg-cancha rounded-xl flex items-center justify-center relative overflow-hidden mb-2">
                {tieneFoto ? (
                  <>
                    <Image src={j.foto} alt={j.nombre} fill className="object-cover" />
                    <div className="absolute inset-0 bg-tinta/0 group-hover:bg-tinta/25 transition-colors flex items-center justify-center">
                      <svg
                        viewBox="0 0 24 24"
                        className="w-7 h-7 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow"
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
                  <span className="font-display text-3xl text-dorado">{iniciales(j.nombre)}</span>
                )}
              </div>
              <p className="font-display text-sm tracking-wide leading-tight">{j.nombre}</p>
              <p className="font-mono text-[11px] uppercase tracking-wider text-marcador">
                {j.posicion}
              </p>
            </>
          );

          if (!tieneFoto) {
            return (
              <div key={key} className="figurita p-2.5 flex flex-col items-center text-center">
                {contenido}
              </div>
            );
          }

          return (
            <button
              key={key}
              type="button"
              onClick={() => setAbierto(conFoto.indexOf(j))}
              aria-label={`Ampliar foto de ${j.nombre}`}
              className="figurita p-2.5 flex flex-col items-center text-center cursor-zoom-in group"
            >
              {contenido}
            </button>
          );
        })}
      </div>

      {abierto !== null && (
        <Lightbox
          items={conFoto.map((j) => ({ src: j.foto, alt: j.nombre, caption: `${j.nombre} · ${j.posicion}` }))}
          index={abierto}
          onClose={() => setAbierto(null)}
          onNavigate={setAbierto}
        />
      )}
    </>
  );
}
