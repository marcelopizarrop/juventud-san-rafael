import Link from "next/link";
import Escudo from "@/components/Escudo";
import MatchCard from "@/components/MatchCard";
import club from "@/data/club.json";
import calendario from "@/data/calendario.json";
import actividades from "@/data/actividades.json";

export default function Home() {
  const proximos = calendario
    .filter((p) => !p.resultado)
    .sort((a, b) => a.fecha.localeCompare(b.fecha))
    .slice(0, 3);

  const proximaActividad = actividades
    .slice()
    .sort((a, b) => a.fecha.localeCompare(b.fecha))[0];

  return (
    <div>
      {/* HERO */}
      <section className="bg-cancha text-parchment-alto relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-[1fr_auto] gap-10 items-center">
          <div>
            <p className="font-mono uppercase tracking-[0.3em] text-dorado text-xs mb-4">
              Desde {club.fundacion} · {club.comuna}
            </p>
            <h1 className="font-display text-4xl md:text-6xl leading-[0.95] mb-6">
              {club.nombre}
            </h1>
            <p className="max-w-xl text-parchment-alto/85 mb-8">
              {club.resumen}
            </p>
            <div className="flex flex-wrap gap-4 font-mono text-sm uppercase tracking-wider">
              <Link
                href="/series"
                className="bg-dorado text-cancha-oscuro px-5 py-3 font-bold hover:bg-dorado-claro transition-colors"
              >
                Ver planteles
              </Link>
              <Link
                href="/historia"
                className="border border-dorado px-5 py-3 hover:bg-cancha-oscuro transition-colors"
              >
                Nuestra historia
              </Link>
            </div>
          </div>
          <Escudo className="w-32 h-40 md:w-44 md:h-52 justify-self-center" />
        </div>
      </section>

      {/* PROXIMOS PARTIDOS */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="font-display text-2xl md:text-3xl text-cancha">
            Próximos partidos
          </h2>
          <Link
            href="/calendario"
            className="font-mono text-xs uppercase tracking-wider text-granate hover:underline"
          >
            Ver calendario completo →
          </Link>
        </div>
        {proximos.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6">
            {proximos.map((p, i) => (
              <MatchCard key={i} partido={p} />
            ))}
          </div>
        ) : (
          <p className="font-mono text-sm text-marcador">
            Por el momento no hay partidos agendados.
          </p>
        )}
      </section>

      {/* ACTIVIDAD DESTACADA */}
      {proximaActividad && (
        <section className="bg-granate text-parchment-alto">
          <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-[auto_1fr] gap-6 items-center">
            <p className="font-mono uppercase tracking-wider text-xs bg-parchment-alto text-granate inline-block px-3 py-1 w-fit">
              Próxima actividad
            </p>
            <div>
              <h3 className="font-display text-xl md:text-2xl mb-1">
                {proximaActividad.titulo}
              </h3>
              <p className="font-mono text-sm opacity-90">
                {proximaActividad.lugar} —{" "}
                <Link href="/actividades" className="underline">
                  más detalles
                </Link>
              </p>
            </div>
          </div>
        </section>
      )}

      {/* SERIES */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="font-display text-2xl md:text-3xl text-cancha mb-2">
          Todas nuestras series
        </h2>
        <p className="font-mono text-sm text-marcador mb-6">
          Desde la Escuela de Fútbol hasta el plantel Senior.
        </p>
        <Link
          href="/series"
          className="inline-block bg-cancha text-parchment-alto px-5 py-3 font-mono text-sm uppercase tracking-wider hover:bg-cancha-oscuro transition-colors"
        >
          Ver el álbum completo de jugadores →
        </Link>
      </section>
    </div>
  );
}
