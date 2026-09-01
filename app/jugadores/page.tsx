import Link from "next/link";
import DirectivaGrid from "@/components/DirectivaGrid";
import MascotaCard from "@/components/MascotaCard";
import { getClub, getDirectiva, getMascota, getSeries } from "@/lib/datos";

export function generateMetadata() {
  const club = getClub();
  return { title: `Jugadores | ${club.nombre}` };
}

export default function JugadoresPage() {
  const directiva = getDirectiva();
  const mascota = getMascota();
  const series = getSeries();

  return (
    <div className="max-w-6xl mx-auto px-4 py-14">
      {/* DIRECTIVA */}
      <p className="font-mono uppercase tracking-[0.3em] text-azul text-xs mb-3">
        Quiénes lideran el club
      </p>
      <h1 className="font-display text-3xl md:text-4xl text-cancha mb-10">
        Directiva
      </h1>

      <DirectivaGrid directiva={directiva} />

      {/* MASCOTA */}
      {mascota && (
        <section className="mb-16">
          <p className="font-mono uppercase tracking-[0.3em] text-azul text-xs mb-3">
            Nuestra mascota
          </p>
          <MascotaCard mascota={mascota} />
        </section>
      )}

      {/* SERIES */}
      <p className="font-mono uppercase tracking-[0.3em] text-azul text-xs mb-3">
        Álbum de jugadores
      </p>
      <h2 className="font-display text-3xl md:text-4xl text-cancha mb-8">
        Nuestras series
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {series.map((s) => (
          <Link
            key={s.id}
            href={`/series/${s.id}`}
            className="figurita p-6 flex flex-col hover:-translate-y-1 transition-transform"
          >
            <span className="font-mono text-xs uppercase tracking-wider text-marcador mb-2">
              {s.categoria}
            </span>
            <span className="font-display text-2xl text-cancha mb-3">
              {s.nombre}
            </span>
            <span className="font-mono text-sm text-marcador mt-auto">
              {s.jugadores.length} jugadores · DT {s.entrenador}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
