import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        cancha: "#D4171F",       // rojo del escudo, color primario del club
        "cancha-oscuro": "#8C0E16",
        dorado: "#FFFFFF",       // blanco del escudo, usado como acento/trim
        "dorado-claro": "#F2F2F2",
        azul: "#0B2A4A",         // azul oscuro, acento de resultados y contraste
        "azul-claro": "#123B66",
        parchment: "#F5F3EF",    // fondo neutro tipo papel de programa
        "parchment-alto": "#FFFFFF",
        tinta: "#1A1A1A",
        marcador: "#5A5A5A"
      },
      borderRadius: {
        card: "1.25rem"
      },
      fontFamily: {
        display: ["var(--font-anton)", "sans-serif"],
        serif: ["var(--font-source-serif)", "serif"],
        mono: ["var(--font-jetbrains)", "monospace"]
      },
      backgroundImage: {
        "linen": "radial-gradient(circle at 1px 1px, rgba(26,26,22,0.06) 1px, transparent 0)"
      },
      backgroundSize: {
        "linen": "18px 18px"
      }
    }
  },
  plugins: []
};

export default config;
