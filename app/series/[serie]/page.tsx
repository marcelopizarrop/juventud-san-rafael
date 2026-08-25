import { notFound } from "next/navigation";
import Link from "next/link";
import PlayerCard from "@/components/PlayerCard";
import { getClub, getSeries, getSerie } from "@/lib/datos";

export function generateStaticParams() {
  return getSeries().map((s) => ({ serie: s.id }));
}

export function generateMetadata({ params }: { params: { serie: string } }) {
  const s = getSerie(params.serie);
  const club = getClub();
  return { title: s ? `${s.nombre} | ${club.nombre}` : club.nombre };
}

export default function SerieDetallePage({
  params
}: {
  params: { serie: string };
}) {
  const serie = getSerie(params.serie);
  if (!serie) return notFound();

  return (
    <div className="max-w-6xl mx-auto px-4 py-14">
      <Link
        href="/series"
        className="font-mono text-xs uppercase tracking-wider text-azul hover:underline"
      >
        ← Todas las series
      </Link>

      <div className="mt-4 mb-10">
        <p className="font-mono uppercase tracking-wider text-marcador text-xs mb-2">
          {serie.categoria} · DT {serie.entrenador}
        </p>
        <h1 className="font-display text-4xl md:text-5xl text-cancha">
          {serie.nombre}
        </h1>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {serie.jugadores.map((j) => (
          <PlayerCard key={j.numero} jugador={j} />
        ))}
      </div>
    </div>
  );
}
