import MatchCard from "@/components/MatchCard";
import { getClub, getCalendario } from "@/lib/datos";

export function generateMetadata() {
  const club = getClub();
  return { title: `Calendario | ${club.nombre}` };
}

export default function CalendarioPage() {
  const club = getClub();
  const calendario = getCalendario();
  const proximos = calendario
    .filter((p) => !p.resultado)
    .sort((a, b) => a.fecha.localeCompare(b.fecha));
  const jugados = calendario
    .filter((p) => p.resultado)
    .sort((a, b) => b.fecha.localeCompare(a.fecha));

  return (
    <div className="max-w-5xl mx-auto px-4 py-14">
      <p className="font-mono uppercase tracking-[0.3em] text-azul text-xs mb-3">
        Fixture
      </p>
      <h1 className="font-display text-4xl md:text-5xl text-cancha mb-10">
        Calendario
      </h1>

      <section className="mb-14">
        <h2 className="font-display text-2xl text-cancha mb-5">
          Próximos partidos
        </h2>
        {proximos.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {proximos.map((p, i) => (
              <MatchCard key={i} partido={p} nombreClub={club.nombre} />
            ))}
          </div>
        ) : (
          <p className="font-mono text-sm text-marcador">
            No hay partidos agendados por el momento.
          </p>
        )}
      </section>

      <section>
        <h2 className="font-display text-2xl text-cancha mb-5">
          Resultados recientes
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {jugados.map((p, i) => (
            <MatchCard key={i} partido={p} nombreClub={club.nombre} />
          ))}
        </div>
      </section>
    </div>
  );
}
