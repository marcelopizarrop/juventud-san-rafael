import CalendarioSection from "@/components/CalendarioSection";
import { getClub, getCalendario, getSeries } from "@/lib/datos";

export function generateMetadata() {
  const club = getClub();
  return { title: `Calendario | ${club.nombre}` };
}

export default function CalendarioPage() {
  const club = getClub();
  const calendario = getCalendario();
  const seriesOrden = getSeries().map((s) => s.nombre);

  return (
    <div className="max-w-5xl mx-auto px-4 py-14">
      <p className="font-mono uppercase tracking-[0.3em] text-azul text-xs mb-3">
        Fixture
      </p>
      <h1 className="font-display text-4xl md:text-5xl text-cancha mb-10">
        Calendario
      </h1>

      <CalendarioSection
        calendario={calendario}
        seriesOrden={seriesOrden}
        nombreClub={club.nombre}
      />
    </div>
  );
}
