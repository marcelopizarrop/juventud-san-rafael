"use client";

import { useState } from "react";
import StandingsTable from "@/components/StandingsTable";
import type { Tabla } from "@/lib/datos";

export default function TablaSelector({
  tablas,
  etiquetas,
  nombreClub
}: {
  tablas: Record<string, Tabla>;
  etiquetas: Record<string, string>;
  nombreClub: string;
}) {
  const opciones = Object.keys(tablas);
  const [activa, setActiva] = useState(opciones[0]);

  if (opciones.length === 0) {
    return (
      <p className="font-mono text-sm text-marcador">
        Todavía no hay tablas de posiciones cargadas.
      </p>
    );
  }

  const tabla = tablas[activa];

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6 font-mono text-xs uppercase tracking-wider">
        {opciones.map((op) => (
          <button
            key={op}
            onClick={() => setActiva(op)}
            className={`px-4 py-2 rounded-full border-2 border-cancha transition-colors ${
              activa === op
                ? "bg-cancha text-parchment-alto"
                : "bg-transparent text-cancha hover:bg-cancha/10"
            }`}
          >
            {etiquetas[op] ?? op}
          </button>
        ))}
      </div>

      <p className="font-mono text-sm text-marcador mb-1">{tabla.liga}</p>
      <p className="font-mono text-xs text-marcador mb-4">
        Actualizado el {tabla.actualizado}
      </p>

      <StandingsTable equipos={tabla.equipos} destacar={nombreClub} />

      <p className="font-mono text-xs text-marcador mt-6">
        Las categorías formativas participan en formato de encuentros y no
        llevan tabla de posiciones oficial.
      </p>
    </div>
  );
}
