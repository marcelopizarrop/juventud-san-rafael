import Link from "next/link";
import club from "@/data/club.json";
import series from "@/data/series.json";

export const metadata = { title: `Series | ${club.nombre}` };

export default function SeriesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-14">
      <p className="font-mono uppercase tracking-[0.3em] text-granate text-xs mb-3">
        Álbum de figuritas
      </p>
      <h1 className="font-display text-4xl md:text-5xl text-cancha mb-10">
        Nuestras series
      </h1>

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
              {s.jugadores.length} jugadores/as · DT {s.entrenador}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
