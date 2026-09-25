"use client";

import { useMemo, useState } from "react";
import StandingsTable from "@/components/StandingsTable";
import type { Tabla } from "@/lib/datos";

const LIGA_POR_DEFECTO = "Campeonato Campeones ANFA";
const SERIE_POR_DEFECTO = "Sr35";

export default function TablaSelector({
  tablas,
  etiquetasSerie,
  ordenSeries,
  nombreClub
}: {
  tablas: Record<string, Tabla>;
  etiquetasSerie: Record<string, string>;
  ordenSeries: string[];
  nombreClub: string;
}) {
  const entradas = Object.values(tablas);

  const ligas = useMemo(
    () => Array.from(new Set(entradas.map((t) => t.liga))),
    [entradas]
  );

  const [liga, setLiga] = useState(
    ligas.includes(LIGA_POR_DEFECTO) ? LIGA_POR_DEFECTO : ligas[0]
  );

  const seriesDeLiga = entradas
    .filter((t) => t.liga === liga)
    .map((t) => t.serieId)
    .sort((a, b) => ordenSeries.indexOf(a) - ordenSeries.indexOf(b));

  const [serieId, setSerieId] = useState(
    seriesDeLiga.includes(SERIE_POR_DEFECTO) ? SERIE_POR_DEFECTO : seriesDeLiga[0]
  );

  if (ligas.length === 0) {
    return (
      <p className="font-mono text-sm text-marcador">
        Todavía no hay tablas de posiciones cargadas.
      </p>
    );
  }

  const serieActiva = seriesDeLiga.includes(serieId) ? serieId : seriesDeLiga[0];

  const tabla = tablas[`${serieActiva}::${liga}`];

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-6">
        <select
          value={liga}
          onChange={(e) => setLiga(e.target.value)}
          aria-label="Filtrar por liga"
          className="font-mono text-xs uppercase tracking-wider border border-marcador/30 rounded-full px-4 py-2 bg-white text-tinta cursor-pointer focus:outline-none focus:ring-2 focus:ring-azul"
        >
          {ligas.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>

        <select
          value={serieActiva}
          onChange={(e) => setSerieId(e.target.value)}
          aria-label="Filtrar por serie"
          className="font-mono text-xs uppercase tracking-wider border border-marcador/30 rounded-full px-4 py-2 bg-white text-tinta cursor-pointer focus:outline-none focus:ring-2 focus:ring-azul"
        >
          {seriesDeLiga.map((id) => (
            <option key={id} value={id}>
              {etiquetasSerie[id] ?? id}
            </option>
          ))}
        </select>
      </div>

      {tabla ? (
        <>
          <p className="font-mono text-xs text-marcador mb-4">
            Actualizado el {tabla.actualizado}
          </p>
          <StandingsTable equipos={tabla.equipos} destacar={nombreClub} />
        </>
      ) : (
        <p className="font-mono text-sm text-marcador">
          Todavía no hay tabla cargada para esta combinación.
        </p>
      )}

      <p className="font-mono text-xs text-marcador mt-6">
        Las categorías formativas participan en formato de encuentros y no
        llevan tabla de posiciones oficial.
      </p>
    </div>
  );
}
