import Image from "next/image";
import JugadoresGrid from "@/components/JugadoresGrid";
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
  if (!serie) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-14">
      <a
        href="/jugadores"
        className="font-mono text-xs uppercase tracking-wider text-azul hover:underline"
      >
        ← Todas las series
      </a>

      <div className="mt-4 mb-8">
        <p className="font-mono uppercase tracking-wider text-marcador text-xs mb-2">
          {serie.categoria} · DT {serie.entrenador}
        </p>
        <h1 className="font-display text-4xl md:text-5xl text-cancha">
          {serie.nombre}
        </h1>
      </div>

      {serie.fotoEquipo && (
        <div className="figurita overflow-hidden mb-10">
          <div className="relative w-full aspect-[16/7]">
            <Image
              src={serie.fotoEquipo}
              alt={`Equipo ${serie.nombre}`}
              fill
              className="object-cover"
            />
          </div>
        </div>
      )}

      <JugadoresGrid jugadores={serie.jugadores} />
    </div>
  );
}
