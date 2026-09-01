"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
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

export default function ProximosPartidosHome({
  partidos,
  seriesOrden,
  nombreClub
}: {
  partidos: Partido[];
  seriesOrden: string[];
  nombreClub: string;
}) {
  const [serie, setSerie] = useState("");

  const opciones = useMemo(() => {
    const presentes = new Set(partidos.map((p) => p.serie));
    const ordenadas = seriesOrden.filter((s) => presentes.has(s));
    const extra = [...presentes].filter((s) => s && !seriesOrden.includes(s));
    return [...ordenadas, ...extra];
  }, [partidos, seriesOrden]);

  const filtrados = (serie ? partidos.filter((p) => p.serie === serie) : partidos).slice(0, 3);

  return (
    <>
      <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
        <h2 className="font-display text-2xl md:text-3xl text-cancha">
          Próximos partidos
        </h2>
        <div className="flex items-center gap-3 flex-wrap">
          <FiltroSerie opciones={opciones} valor={serie} onChange={setSerie} />
          <Link
            href="/calendario"
            className="font-mono text-xs uppercase tracking-wider text-azul hover:underline whitespace-nowrap"
          >
            Ver calendario completo →
          </Link>
        </div>
      </div>
      {filtrados.length > 0 ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filtrados.map((p, i) => (
            <MatchCard key={i} partido={p} nombreClub={nombreClub} />
          ))}
        </div>
      ) : (
        <p className="font-mono text-sm text-marcador">
          {serie
            ? "No hay partidos agendados para esta serie."
            : "Por el momento no hay partidos agendados."}
        </p>
      )}
    </>
  );
}
