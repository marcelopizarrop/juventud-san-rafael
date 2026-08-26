import Link from "next/link";
import { getClub } from "@/lib/datos";

export default function Footer() {
  const club = getClub();
  return (
    <footer className="bg-cancha-oscuro text-parchment-alto mt-16 border-t-4 border-dorado">
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-8 md:grid-cols-4 font-mono text-sm">
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
          <p className="opacity-80">informaciones.jcu@gmail.com</p>
          <p className="opacity-80">+56 9 5017 2752</p>
          <Link href="/contacto" className="inline-block mt-2 underline hover:text-dorado">
            Escríbenos →
          </Link>
        </div>
        <div>
          <p className="text-dorado mb-2 uppercase tracking-wider text-xs">Síguenos</p>
          <div className="flex items-center gap-3">
            {club.redes.instagram && (
              <a
                href={club.redes.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-dorado/60 flex items-center justify-center hover:bg-dorado hover:text-cancha-oscuro transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-4.5 h-4.5" fill="currentColor" width="18" height="18">
                  <path d="M12 2.2c3.2 0 3.6 0 4.8.07 1.2.06 2.1.26 2.8.55.8.3 1.4.7 2 1.35.6.6 1 1.2 1.35 2 .29.7.49 1.6.55 2.8.06 1.2.07 1.6.07 4.8s0 3.6-.07 4.8c-.06 1.2-.26 2.1-.55 2.8-.3.8-.7 1.4-1.35 2-.6.6-1.2 1-2 1.35-.7.29-1.6.49-2.8.55-1.2.06-1.6.07-4.8.07s-3.6 0-4.8-.07c-1.2-.06-2.1-.26-2.8-.55-.8-.3-1.4-.7-2-1.35-.6-.6-1-1.2-1.35-2-.29-.7-.49-1.6-.55-2.8C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.8c.06-1.2.26-2.1.55-2.8.3-.8.7-1.4 1.35-2 .6-.6 1.2-1 2-1.35.7-.29 1.6-.49 2.8-.55C8.4 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.15 0-3.5 0-4.74.07-1 .05-1.55.22-1.9.36-.48.19-.82.41-1.18.77-.36.36-.58.7-.77 1.18-.14.35-.31.9-.36 1.9C3 9.5 3 9.85 3 13s0 3.5.07 4.74c.05 1 .22 1.55.36 1.9.19.48.41.82.77 1.18.36.36.7.58 1.18.77.35.14.9.31 1.9.36 1.24.07 1.59.07 4.74.07s3.5 0 4.74-.07c1-.05 1.55-.22 1.9-.36.48-.19.82-.41 1.18-.77.36-.36.58-.7.77-1.18.14-.35.31-.9.36-1.9.07-1.24.07-1.59.07-4.74s0-3.5-.07-4.74c-.05-1-.22-1.55-.36-1.9-.19-.48-.41-.82-.77-1.18a3.2 3.2 0 0 0-1.18-.77c-.35-.14-.9-.31-1.9-.36C15.5 4 15.15 4 12 4Zm0 3.4a4.6 4.6 0 1 1 0 9.2 4.6 4.6 0 0 1 0-9.2Zm0 1.8a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6Zm4.8-2a1.08 1.08 0 1 1 0 2.16 1.08 1.08 0 0 1 0-2.16Z" />
                </svg>
              </a>
            )}
            {club.redes.facebook && (
              <a
                href={club.redes.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full border border-dorado/60 flex items-center justify-center hover:bg-dorado hover:text-cancha-oscuro transition-colors"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M13.5 21v-7.9h2.65l.4-3.08h-3.05V8.06c0-.89.25-1.5 1.52-1.5h1.63V3.8c-.28-.04-1.25-.12-2.37-.12-2.35 0-3.96 1.43-3.96 4.06v2.27H7.66v3.08h2.66V21h3.18Z" />
                </svg>
              </a>
            )}
            {club.redes.whatsapp && (
              <a
                href={club.redes.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full border border-dorado/60 flex items-center justify-center hover:bg-dorado hover:text-cancha-oscuro transition-colors"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M12.04 2.5c-5.26 0-9.54 4.28-9.54 9.54 0 1.68.44 3.31 1.28 4.75L2.5 21.5l4.86-1.27a9.5 9.5 0 0 0 4.68 1.24h.01c5.26 0 9.54-4.28 9.54-9.54s-4.29-9.43-9.55-9.43Zm0 17.34h-.01a7.8 7.8 0 0 1-3.97-1.09l-.28-.17-2.88.76.77-2.8-.19-.29a7.77 7.77 0 0 1-1.2-4.15c0-4.3 3.5-7.8 7.8-7.8 2.08 0 4.04.81 5.51 2.29a7.75 7.75 0 0 1 2.28 5.52c0 4.3-3.5 7.73-7.83 7.73Zm4.27-5.82c-.23-.12-1.37-.68-1.58-.75-.21-.08-.37-.12-.52.11-.16.23-.6.75-.73.9-.14.16-.27.18-.5.06-.23-.12-.98-.36-1.87-1.15-.69-.62-1.16-1.38-1.3-1.61-.13-.23-.01-.35.1-.47.11-.11.23-.27.35-.4.11-.14.15-.23.23-.39.08-.16.04-.3-.02-.42-.06-.12-.52-1.25-.71-1.71-.19-.45-.38-.39-.52-.4-.13-.01-.29-.01-.44-.01-.16 0-.42.06-.64.3-.22.23-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.13 3.64.58.25 1.03.4 1.38.51.58.18 1.1.16 1.52.1.46-.07 1.37-.56 1.57-1.1.19-.54.19-1 .13-1.1-.06-.1-.21-.16-.44-.28Z" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="text-center text-xs opacity-60 pb-6 font-mono">
        © {new Date().getFullYear()} {club.nombre}. Todos los derechos reservados.
      </div>
    </footer>
  );
}
