import Image from "next/image";
import { getClub, getNovedades } from "@/lib/datos";

export function generateMetadata() {
  const club = getClub();
  return { title: `Novedades | ${club.nombre}` };
}

function formatFecha(fecha: string) {
  const d = new Date(fecha + "T00:00:00");
  return d.toLocaleDateString("es-CL", {
    weekday: "long",
    day: "2-digit",
    month: "long"
  });
}

export default function NovedadesPage() {
  const novedades = getNovedades();
  const ordenadas = novedades
    .slice()
    .sort((a, b) => a.fecha.localeCompare(b.fecha));

  return (
    <div className="max-w-4xl mx-auto px-4 py-14">
      <p className="font-mono uppercase tracking-[0.3em] text-azul text-xs mb-3">
        Vida de club
      </p>
      <h1 className="font-display text-4xl md:text-5xl text-cancha mb-10">
        Novedades
      </h1>

      <div className="space-y-6">
        {ordenadas.map((n, i) => (
          <div key={i} className="ticket overflow-hidden">
            {n.imagen && (
              <div className="relative w-full aspect-[16/9] overflow-hidden rounded-t-card">
                <Image
                  src={n.imagen}
                  alt={n.titulo}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="px-6 py-5 grid md:grid-cols-[140px_1fr] gap-4">
              <div>
                <p className="font-mono text-xs uppercase text-marcador">
                  {formatFecha(n.fecha)}
                </p>
                <p className="font-mono text-xs text-azul mt-1">{n.lugar}</p>
              </div>
              <div>
                <h2 className="font-display text-xl text-cancha mb-1">
                  {n.titulo}
                </h2>
                <p className="text-sm text-marcador">{n.descripcion}</p>
              </div>
            </div>
          </div>
        ))}
        {ordenadas.length === 0 && (
          <p className="font-mono text-sm text-marcador">
            Todavía no hay novedades publicadas.
          </p>
        )}
      </div>
    </div>
  );
}
