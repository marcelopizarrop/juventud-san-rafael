import TablaSelector from "./TablaSelector";
import { getClub, getTablas, getSeries } from "@/lib/datos";

export function generateMetadata() {
  const club = getClub();
  return { title: `Tabla de posiciones | ${club.nombre}` };
}

export default function TablaPage() {
  const club = getClub();
  const tablas = getTablas();
  const series = getSeries();
  const etiquetas: Record<string, string> = {};
  Object.keys(tablas).forEach((id) => {
    etiquetas[id] = series.find((s) => s.id === id)?.nombre ?? id;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-14">
      <p className="font-mono uppercase tracking-[0.3em] text-azul text-xs mb-3">
        Marcador
      </p>
      <h1 className="font-display text-4xl md:text-5xl text-cancha mb-10">
        Tabla de posiciones
      </h1>
      <TablaSelector tablas={tablas} etiquetas={etiquetas} nombreClub={club.nombre} />
    </div>
  );
}
