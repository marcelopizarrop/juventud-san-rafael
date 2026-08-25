import TablaSelector from "./TablaSelector";
import club from "@/data/club.json";

export const metadata = { title: `Tabla de posiciones | ${club.nombre}` };

export default function TablaPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-14">
      <p className="font-mono uppercase tracking-[0.3em] text-granate text-xs mb-3">
        Marcador
      </p>
      <h1 className="font-display text-4xl md:text-5xl text-cancha mb-10">
        Tabla de posiciones
      </h1>
      <TablaSelector />
    </div>
  );
}
