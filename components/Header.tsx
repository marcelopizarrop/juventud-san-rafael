import Link from "next/link";
import Escudo from "./Escudo";
import club from "@/data/club.json";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/historia", label: "Historia" },
  { href: "/series", label: "Series" },
  { href: "/tabla", label: "Tabla" },
  { href: "/calendario", label: "Calendario" },
  { href: "/actividades", label: "Actividades" }
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-cancha text-parchment-alto border-b-4 border-dorado">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Escudo className="w-11 h-11" />
          <span className="font-display text-xl md:text-2xl tracking-wide leading-none">
            {club.nombre}
          </span>
        </Link>
        <nav className="flex flex-wrap gap-x-5 gap-y-1 font-mono text-xs md:text-sm uppercase tracking-wider">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-dorado transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
