import GaleriaGrid from "@/components/GaleriaGrid";
import { getClub, getSeries, getGaleriaGeneral, getGaleriaPorSerie } from "@/lib/datos";

export function generateMetadata() {
  const club = getClub();
  return { title: `Galería | ${club.nombre}` };
}

export default function GaleriaPage() {
  const generales = getGaleriaGeneral();
  const series = getSeries();
  const fotosPorSerie = series.map((s) => ({ serie: s, fotos: getGaleriaPorSerie(s.id) }));

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
        <GaleriaGrid fotos={generales} />
      </section>

      {fotosPorSerie.length > 0 && (
        <section className="space-y-12">
          <h2 className="font-display text-2xl text-cancha mb-2">Fotos por serie</h2>
          {fotosPorSerie.map(({ serie, fotos }) => (
            <div key={serie.id}>
              <h3 className="font-mono text-xs uppercase tracking-wider text-marcador mb-3">
                {serie.nombre}
              </h3>
              <GaleriaGrid fotos={fotos} />
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
