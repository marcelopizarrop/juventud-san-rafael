import Image from "next/image";
import { getClub, getSeries, getGaleriaGeneral, getGaleriaPorSerie } from "@/lib/datos";

export function generateMetadata() {
  const club = getClub();
  return { title: `Galería | ${club.nombre}` };
}

function GridFotos({ fotos }: { fotos: { imagen: string; leyenda: string }[] }) {
  if (fotos.length === 0) {
    return (
      <p className="font-mono text-sm text-marcador">
        Todavía no hay fotos cargadas en esta sección.
      </p>
    );
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {fotos.map((f, i) => (
        <div key={i} className="figurita overflow-hidden">
          <div className="relative w-full aspect-[4/3]">
            <Image src={f.imagen} alt={f.leyenda || "Foto del club"} fill className="object-cover" />
          </div>
          {f.leyenda && (
            <p className="font-mono text-xs text-marcador px-3 py-2">{f.leyenda}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default function GaleriaPage() {
  const generales = getGaleriaGeneral();
  const series = getSeries();
  const seriesConFotos = series
    .map((s) => ({ serie: s, fotos: getGaleriaPorSerie(s.id) }))
    .filter((g) => g.fotos.length > 0);

  return (
    <div className="max-w-6xl mx-auto px-4 py-14">
      <p className="font-mono uppercase tracking-[0.3em] text-azul text-xs mb-3">
        Momentos del club
      </p>
      <h1 className="font-display text-4xl md:text-5xl text-cancha mb-10">
        Galería
      </h1>

      <section className="mb-16">
        <h2 className="font-display text-2xl text-cancha mb-5">Fotos del club</h2>
        <GridFotos fotos={generales} />
      </section>

      {seriesConFotos.length > 0 && (
        <section className="space-y-12">
          <h2 className="font-display text-2xl text-cancha mb-2">Fotos por serie</h2>
          {seriesConFotos.map(({ serie, fotos }) => (
            <div key={serie.id}>
              <h3 className="font-mono text-xs uppercase tracking-wider text-marcador mb-3">
                {serie.nombre}
              </h3>
              <GridFotos fotos={fotos} />
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
