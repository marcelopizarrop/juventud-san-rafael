import Image from "next/image";

type Player = {
  nombre: string;
  posicion: string;
  foto?: string;
};

function iniciales(nombre: string) {
  return nombre
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

export default function PlayerCard({ jugador }: { jugador: Player }) {
  return (
    <div className="figurita p-1.5 flex flex-col items-center text-center">
      <div className="w-full aspect-square bg-cancha rounded-xl flex items-center justify-center relative overflow-hidden mb-1.5">
        {jugador.foto ? (
          <Image
            src={jugador.foto}
            alt={jugador.nombre}
            fill
            className="object-cover"
          />
        ) : (
          <span className="font-display text-2xl text-dorado">
            {iniciales(jugador.nombre)}
          </span>
        )}
      </div>
      <p className="font-display text-xs tracking-wide leading-tight">
        {jugador.nombre}
      </p>
      <p className="font-mono text-[10px] uppercase tracking-wider text-marcador">
        {jugador.posicion}
      </p>
    </div>
  );
}
