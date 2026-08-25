import FormularioContacto from "@/components/FormularioContacto";
import { getClub } from "@/lib/datos";

export function generateMetadata() {
  const club = getClub();
  return { title: `Contacto | ${club.nombre}` };
}

export default function ContactoPage() {
  const club = getClub();
  return (
    <div className="max-w-3xl mx-auto px-4 py-14">
      <p className="font-mono uppercase tracking-[0.3em] text-azul text-xs mb-3">
        Escríbenos
      </p>
      <h1 className="font-display text-4xl md:text-5xl text-cancha mb-4">
        Contacto
      </h1>
      <p className="text-marcador mb-10 max-w-xl">
        ¿Tienes dudas sobre matrículas, quieres coordinar un partido amistoso
        o proponer una actividad? Escríbenos y te responderemos a la
        brevedad.
      </p>

      <FormularioContacto />

      <div className="mt-10 font-mono text-sm text-marcador">
        <p>{club.estadio}</p>
        <p>{club.comuna}, Región {club.region}</p>
      </div>
    </div>
  );
}
