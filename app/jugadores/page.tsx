import Image from "next/image";
import Link from "next/link";
import { getClub, getDirectiva, getMascota, getSeries } from "@/lib/datos";

export function generateMetadata() {
  const club = getClub();
  return { title: `Jugadores | ${club.nombre}` };
}

function iniciales(nombre: string) {
  return nombre
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
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

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 mb-16">
        {directiva.map((m, i) => (
          <div key={i} className="figurita p-1.5 flex flex-col items-center text-center">
            <div className="w-full aspect-square bg-cancha rounded-xl flex items-center justify-center relative overflow-hidden mb-1.5">
              {m.foto ? (
                <Image src={m.foto} alt={m.nombre} fill className="object-cover" />
              ) : (
                <span className="font-display text-2xl text-dorado">
                  {iniciales(m.nombre)}
                </span>
              )}
            </div>
            <p className="font-display text-xs leading-tight">{m.nombre}</p>
            <p className="font-mono text-[10px] uppercase tracking-wider text-marcador mt-0.5">
              {m.cargo}
            </p>
          </div>
        ))}
        {directiva.length === 0 && (
          <p className="font-mono text-sm text-marcador col-span-full">
            Todavía no se ha cargado la directiva.
          </p>
        )}
      </div>

      {/* MASCOTA */}
      {mascota && (
        <section className="mb-16">
          <p className="font-mono uppercase tracking-[0.3em] text-azul text-xs mb-3">
            Nuestra mascota
          </p>
          <div className="ticket overflow-hidden flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 p-6">
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 mx-auto sm:mx-0 shrink-0 bg-cancha rounded-2xl flex items-center justify-center overflow-hidden">
              {mascota.imagen ? (
                <Image
                  src={mascota.imagen}
                  alt={mascota.nombre}
                  fill
                  className="object-cover"
                />
              ) : (
                <span className="font-display text-3xl text-dorado">
                  {iniciales(mascota.nombre)}
                </span>
              )}
            </div>
            <div className="flex flex-col justify-center text-center sm:text-left">
              <h2 className="font-display text-2xl text-cancha mb-2">
                {mascota.nombre}
              </h2>
              <p className="text-sm text-marcador">{mascota.descripcion}</p>
            </div>
          </div>
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
