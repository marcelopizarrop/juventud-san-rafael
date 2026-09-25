"use client";

import { useMemo, useState } from "react";
import StandingsTable from "@/components/StandingsTable";
import type { Tabla } from "@/lib/datos";

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

  const series = useMemo(() => {
    const ids = Array.from(new Set(entradas.map((t) => t.serieId)));
    return ids.sort((a, b) => ordenSeries.indexOf(a) - ordenSeries.indexOf(b));
  }, [entradas, ordenSeries]);

  const [serieId, setSerieId] = useState(series[0]);
  const [liga, setLiga] = useState(entradas.find((t) => t.serieId === series[0])?.liga);

  if (series.length === 0) {
    return (
      <p className="font-mono text-sm text-marcador">
        Todavía no hay tablas de posiciones cargadas.
      </p>
    );
  }

  const ligasDeSerie = entradas
    .filter((t) => t.serieId === serieId)
    .map((t) => t.liga);
  const ligaActiva = ligasDeSerie.includes(liga ?? "") ? liga : ligasDeSerie[0];

  const tabla = tablas[`${serieId}::${ligaActiva}`];

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-6">
        <select
          value={serieId}
          onChange={(e) => setSerieId(e.target.value)}
          aria-label="Filtrar por serie"
          className="font-mono text-xs uppercase tracking-wider border border-marcador/30 rounded-full px-4 py-2 bg-white text-tinta cursor-pointer focus:outline-none focus:ring-2 focus:ring-azul"
        >
          {series.map((id) => (
            <option key={id} value={id}>
              {etiquetasSerie[id] ?? id}
            </option>
          ))}
        </select>

        <select
          value={ligaActiva}
          onChange={(e) => setLiga(e.target.value)}
          aria-label="Filtrar por liga"
          className="font-mono text-xs uppercase tracking-wider border border-marcador/30 rounded-full px-4 py-2 bg-white text-tinta cursor-pointer focus:outline-none focus:ring-2 focus:ring-azul"
        >
          {ligasDeSerie.map((l) => (
            <option key={l} value={l}>
              {l}
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
