import NovedadesLista from "@/components/NovedadesLista";
import { getClub, getNovedades } from "@/lib/datos";

export function generateMetadata() {
  const club = getClub();
  return { title: `Novedades | ${club.nombre}` };
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

      <NovedadesLista novedades={ordenadas} />
    </div>
  );
}
