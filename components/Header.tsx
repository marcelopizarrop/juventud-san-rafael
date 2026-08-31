"use client";

import { useState } from "react";
import Link from "next/link";
import Escudo from "./Escudo";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/historia", label: "Historia" },
  { href: "/directiva", label: "Directiva y Series" },
  { href: "/galeria", label: "Galería" },
  { href: "/tabla", label: "Tabla" },
  { href: "/calendario", label: "Calendario" },
  { href: "/novedades", label: "Novedades" },
  { href: "/contacto", label: "Contacto" }
];

export default function Header({ nombreClub }: { nombreClub: string }) {
  const [abierto, setAbierto] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-cancha text-parchment-alto border-b-4 border-dorado">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-3 shrink-0"
          onClick={() => setAbierto(false)}
        >
          <Escudo className="w-11 h-11" />
          <span className="font-display text-lg sm:text-xl md:text-2xl tracking-wide leading-none">
            {nombreClub}
          </span>
        </Link>

        {/* Navegación de escritorio */}
        <nav className="hidden md:flex flex-wrap gap-x-5 gap-y-1 font-mono text-[11px] md:text-xs uppercase tracking-wider">
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

        {/* Botón hamburguesa (móvil) */}
        <button
          onClick={() => setAbierto((v) => !v)}
          aria-label="Abrir menú"
          aria-expanded={abierto}
          className="md:hidden w-10 h-10 rounded-full flex flex-col items-center justify-center gap-1.5 border border-dorado/60"
        >
          <span
            className={`block w-5 h-0.5 bg-parchment-alto transition-transform ${
              abierto ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-parchment-alto transition-opacity ${
              abierto ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-parchment-alto transition-transform ${
              abierto ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Navegación móvil desplegable */}
      {abierto && (
        <nav className="md:hidden bg-cancha-oscuro border-t border-dorado/40 px-4 py-3 flex flex-col gap-1 font-mono text-xs uppercase tracking-wider">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setAbierto(false)}
              className="py-2.5 hover:text-dorado transition-colors border-b border-white/10 last:border-none"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}