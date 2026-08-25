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
        granate: "#141414",      // negro, acento de resultados y contraste
        parchment: "#F5F3EF",    // fondo neutro tipo papel de programa
        "parchment-alto": "#FFFFFF",
        tinta: "#141414",
        marcador: "#4A4A4A"
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
