import Link from "next/link";
import Image from "next/image";
import Escudo from "@/components/Escudo";
import Carrusel from "@/components/Carrusel";
import AuspiciadoresBanner from "@/components/AuspiciadoresBanner";
import ProximosPartidosHome from "@/components/ProximosPartidosHome";
import { getClub, getCalendario, getNovedades, getGaleriaGeneral, getSeries } from "@/lib/datos";

export default function Home() {
  const club = getClub();
  const calendario = getCalendario();
  const novedades = getNovedades();
  const galeria = getGaleriaGeneral();
  const seriesOrden = getSeries().map((s) => s.nombre);

  const proximos = calendario
    .filter((p) => !p.resultado)
    .sort((a, b) => a.fecha.localeCompare(b.fecha));

  const proximaNovedad = novedades
    .slice()
    .sort((a, b) => a.fecha.localeCompare(b.fecha))[0];

  return (
    <div>
      {/* HERO */}
      <section className="bg-cancha text-parchment-alto relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 py-6 md:py-8 grid md:grid-cols-[1fr_auto] gap-4 md:gap-6 items-center">
          <div>
            <h1 className="font-display text-xl sm:text-2xl md:text-3xl leading-tight mb-2">
              {club.nombre}
            </h1>
            <p className="max-w-xl text-parchment-alto/85 mb-4 text-xs sm:text-sm">
              {club.resumen}
            </p>
            <div className="flex flex-wrap gap-3 font-mono text-[11px] uppercase tracking-wider">
              <Link
                href="/jugadores"
                className="bg-dorado text-cancha-oscuro px-4 py-2 rounded-full font-bold hover:bg-dorado-claro transition-colors"
              >
                Ver planteles
              </Link>
              <Link
                href="/historia"
                className="border border-dorado px-4 py-2 rounded-full hover:bg-cancha-oscuro transition-colors"
              >
                Nuestra historia
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 justify-self-center">
            <div className="flex items-center gap-10">
              <Escudo className="w-20 h-24 md:w-24 md:h-28" />
              <span className="relative inline-block w-20 h-24 md:w-24 md:h-28 rounded-card bg-parchment-alto shrink-0">
                <Image
                  src="/escudo/asociacion-santa-rosa-sur.jpg"
                  alt="Asociación Santa Rosa Sur"
                  fill
                  className="object-contain rounded-card"
                />
              </span>
            </div>
            <p className="text-parchment-alto/70 text-[10px] font-mono uppercase tracking-wider text-center max-w-[180px]">
              Club afiliado a la Asociación Santa Rosa Sur
            </p>
          </div>
        </div>
      </section>

      {/* PROXIMOS PARTIDOS */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <ProximosPartidosHome
          partidos={proximos}
          seriesOrden={seriesOrden}
          nombreClub={club.nombre}
        />
      </section>

      {/* CARRUSEL DE FOTOS */}
      {galeria.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 pt-2 pb-10">
          <Carrusel fotos={galeria} />
        </section>
      )}

      {/* AUSPICIADORES */}
      <AuspiciadoresBanner />

      {/* NOVEDAD DESTACADA */}
      {proximaNovedad && (
        <section className="bg-azul text-parchment-alto rounded-card md:rounded-none">
          <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-[auto_1fr] gap-6 items-center">
            <p className="font-mono uppercase tracking-wider text-xs bg-parchment-alto text-azul inline-block px-3 py-1 rounded-full w-fit">
              Próxima novedad
            </p>
            <div>
              <h3 className="font-display text-xl md:text-2xl mb-1">
                {proximaNovedad.titulo}
              </h3>
              <p className="font-mono text-sm opacity-90">
                {proximaNovedad.lugar} —{" "}
                <Link href="/novedades" className="underline">
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
        <div className="flex flex-wrap gap-3">
          <Link
            href="/jugadores"
            className="inline-block bg-cancha text-parchment-alto px-5 py-3 rounded-full font-mono text-sm uppercase tracking-wider hover:bg-cancha-oscuro transition-colors"
          >
            Ver el álbum completo de jugadores →
          </Link>
          <Link
            href="/galeria"
            className="inline-block border-2 border-cancha text-cancha px-5 py-3 rounded-full font-mono text-sm uppercase tracking-wider hover:bg-cancha hover:text-parchment-alto transition-colors"
          >
            Ver galería de fotos →
          </Link>
        </div>
      </section>
    </div>
  );
}
