import { getClub } from "@/lib/datos";

export function generateMetadata() {
  const club = getClub();
  return { title: `Historia | ${club.nombre}` };
}

export default function HistoriaPage() {
  const club = getClub();
  return (
    <div className="max-w-4xl mx-auto px-4 py-14">
      <p className="font-mono uppercase tracking-[0.3em] text-azul text-xs mb-3">
        Nuestra historia
      </p>
      <h1 className="font-display text-4xl md:text-5xl text-cancha mb-6">
        {club.hitos.length} hitos, una sola camiseta
      </h1>
      <p className="text-marcador mb-12 max-w-2xl">{club.resumen}</p>

      <div className="relative border-l-4 border-dorado pl-8 space-y-10">
        {club.hitos.map((hito) => (
          <div key={hito.anio} className="relative">
            <span className="absolute -left-[42px] top-0 bg-cancha text-dorado font-mono text-xs font-bold w-8 h-8 rounded-full flex items-center justify-center border-2 border-dorado">
              •
            </span>
            <p className="font-display text-2xl text-azul leading-none mb-1">
              {hito.anio}
            </p>
            <h2 className="font-display text-lg text-cancha mb-1">
              {hito.titulo}
            </h2>
            <p className="text-marcador text-sm max-w-xl">{hito.texto}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
