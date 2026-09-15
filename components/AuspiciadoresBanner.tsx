import Image from "next/image";
import { getAuspiciadores } from "@/lib/datos";

export default function AuspiciadoresBanner() {
  const auspiciadores = getAuspiciadores();
  if (auspiciadores.length === 0) return null;

  return (
    <section className="max-w-6xl mx-auto px-4 pb-14">
      <p className="font-mono uppercase tracking-[0.3em] text-azul text-xs mb-6 text-center">
        Con el apoyo de
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        {auspiciadores.map((a, i) => {
          const logo = (
            <div className="figurita relative w-32 h-20 sm:w-36 sm:h-24 flex items-center justify-center p-3">
              <Image
                src={a.imagen}
                alt={a.nombre || "Auspiciador"}
                fill
                className="object-contain p-2"
                sizes="150px"
              />
            </div>
          );
          return a.url ? (
            <a
              key={i}
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={a.nombre || "Sitio del auspiciador"}
            >
              {logo}
            </a>
          ) : (
            <div key={i}>{logo}</div>
          );
        })}
      </div>
    </section>
  );
}
