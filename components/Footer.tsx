import club from "@/data/club.json";

export default function Footer() {
  return (
    <footer className="bg-cancha-oscuro text-parchment-alto mt-16 border-t-4 border-dorado">
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-8 md:grid-cols-3 font-mono text-sm">
        <div>
          <p className="font-display text-lg text-dorado mb-2">{club.nombre}</p>
          <p className="opacity-80">
            Fundado en {club.fundacion} · {club.comuna}, Región {club.region}
          </p>
        </div>
        <div>
          <p className="text-dorado mb-2 uppercase tracking-wider text-xs">Recinto</p>
          <p className="opacity-80">{club.estadio}</p>
        </div>
        <div>
          <p className="text-dorado mb-2 uppercase tracking-wider text-xs">Contacto</p>
          <p className="opacity-80">contacto@tudominio.cl</p>
          <p className="opacity-80">+56 9 0000 0000</p>
        </div>
      </div>
      <div className="text-center text-xs opacity-60 pb-6 font-mono">
        © {new Date().getFullYear()} {club.nombre}. Todos los derechos reservados.
      </div>
    </footer>
  );
}
