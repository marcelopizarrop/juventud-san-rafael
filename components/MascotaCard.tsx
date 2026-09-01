"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "./Lightbox";

type Mascota = { nombre: string; descripcion: string; imagen: string };

function iniciales(nombre: string) {
  return nombre
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

export default function MascotaCard({ mascota }: { mascota: Mascota }) {
  const [abierta, setAbierta] = useState(false);
  const tieneFoto = Boolean(mascota.imagen);

  return (
    <div className="ticket overflow-hidden flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 p-6">
      {tieneFoto ? (
        <button
          type="button"
          onClick={() => setAbierta(true)}
          aria-label={`Ampliar foto de ${mascota.nombre}`}
          className="relative w-28 h-28 sm:w-36 sm:h-36 mx-auto sm:mx-0 shrink-0 bg-cancha rounded-2xl flex items-center justify-center overflow-hidden cursor-zoom-in group"
        >
          <Image src={mascota.imagen} alt={mascota.nombre} fill className="object-cover" />
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
        </button>
      ) : (
        <div className="relative w-28 h-28 sm:w-36 sm:h-36 mx-auto sm:mx-0 shrink-0 bg-cancha rounded-2xl flex items-center justify-center overflow-hidden">
          <span className="font-display text-3xl text-dorado">{iniciales(mascota.nombre)}</span>
        </div>
      )}
      <div className="flex flex-col justify-center text-center sm:text-left">
        <h2 className="font-display text-2xl text-cancha mb-2">{mascota.nombre}</h2>
        <p className="text-sm text-marcador">{mascota.descripcion}</p>
      </div>

      {abierta && (
        <Lightbox
          items={[{ src: mascota.imagen, alt: mascota.nombre, caption: mascota.nombre }]}
          index={0}
          onClose={() => setAbierta(false)}
          onNavigate={() => {}}
        />
      )}
    </div>
  );
}
