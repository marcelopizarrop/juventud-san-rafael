import club from "@/data/club.json";
import actividades from "@/data/actividades.json";

export const metadata = { title: `Actividades | ${club.nombre}` };

function formatFecha(fecha: string) {
  const d = new Date(fecha + "T00:00:00");
  return d.toLocaleDateString("es-CL", {
    weekday: "long",
    day: "2-digit",
    month: "long"
  });
}

export default function ActividadesPage() {
  const ordenadas = actividades
    .slice()
    .sort((a, b) => a.fecha.localeCompare(b.fecha));

  return (
    <div className="max-w-4xl mx-auto px-4 py-14">
      <p className="font-mono uppercase tracking-[0.3em] text-granate text-xs mb-3">
        Vida de club
      </p>
      <h1 className="font-display text-4xl md:text-5xl text-cancha mb-10">
        Actividades
      </h1>

      <div className="space-y-6">
        {ordenadas.map((a, i) => (
          <div key={i} className="ticket px-6 py-5 grid md:grid-cols-[140px_1fr] gap-4">
            <div>
              <p className="font-mono text-xs uppercase text-marcador">
                {formatFecha(a.fecha)}
              </p>
              <p className="font-mono text-xs text-granate mt-1">{a.lugar}</p>
            </div>
            <div>
              <h2 className="font-display text-xl text-cancha mb-1">
                {a.titulo}
              </h2>
              <p className="text-sm text-marcador">{a.descripcion}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
