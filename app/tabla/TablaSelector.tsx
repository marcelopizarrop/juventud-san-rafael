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
      <select
        value={activa}
        onChange={(e) => setActiva(e.target.value)}
        aria-label="Filtrar por serie y liga"
        className="font-mono text-xs uppercase tracking-wider border border-marcador/30 rounded-full px-4 py-2 mb-6 bg-white text-tinta cursor-pointer focus:outline-none focus:ring-2 focus:ring-azul"
      >
        {opciones.map((op) => (
          <option key={op} value={op}>
            {etiquetas[op] ?? op}
          </option>
        ))}
      </select>

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
