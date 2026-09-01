"use client";

import { useMemo, useState } from "react";
import MatchCard from "./MatchCard";
import FiltroSerie from "./FiltroSerie";

type Partido = {
  fecha: string;
  hora: string;
  serie: string;
  rival: string;
  condicion: string;
  cancha: string;
  resultado: string | null;
};

export default function CalendarioSection({
  calendario,
  seriesOrden,
  nombreClub
}: {
  calendario: Partido[];
  seriesOrden: string[];
  nombreClub: string;
}) {
  const [serie, setSerie] = useState("");

  const opciones = useMemo(() => {
    const presentes = new Set(calendario.map((p) => p.serie));
    const ordenadas = seriesOrden.filter((s) => presentes.has(s));
    const extra = [...presentes].filter((s) => s && !seriesOrden.includes(s));
    return [...ordenadas, ...extra];
  }, [calendario, seriesOrden]);

  const base = serie ? calendario.filter((p) => p.serie === serie) : calendario;
  const proximos = base
    .filter((p) => !p.resultado)
    .sort((a, b) => a.fecha.localeCompare(b.fecha));
  const jugados = base
    .filter((p) => p.resultado)
    .sort((a, b) => b.fecha.localeCompare(a.fecha));

  return (
    <>
      <div className="flex items-center justify-between gap-3 mb-10 flex-wrap">
        <p className="font-mono text-xs uppercase tracking-wider text-marcador">
          Filtrar por serie
        </p>
        <FiltroSerie opciones={opciones} valor={serie} onChange={setSerie} />
      </div>

      <section className="mb-14">
        <h2 className="font-display text-2xl text-cancha mb-5">
          Próximos partidos
        </h2>
        {proximos.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {proximos.map((p, i) => (
              <MatchCard key={i} partido={p} nombreClub={nombreClub} />
            ))}
          </div>
        ) : (
          <p className="font-mono text-sm text-marcador">
            {serie
              ? "No hay partidos agendados para esta serie."
              : "No hay partidos agendados por el momento."}
          </p>
        )}
      </section>

      <section>
        <h2 className="font-display text-2xl text-cancha mb-5">
          Resultados recientes
        </h2>
        {jugados.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {jugados.map((p, i) => (
              <MatchCard key={i} partido={p} nombreClub={nombreClub} />
            ))}
          </div>
        ) : (
          <p className="font-mono text-sm text-marcador">
            {serie
              ? "Todavía no hay resultados para esta serie."
              : "Todavía no hay resultados cargados."}
          </p>
        )}
      </section>
    </>
  );
}
