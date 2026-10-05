"use client";

export default function FiltroSerie({
  opciones,
  valor,
  onChange,
  etiquetaTodas = "Todas las series",
  ariaLabel = "Filtrar por serie"
}: {
  opciones: string[];
  valor: string;
  onChange: (nuevoValor: string) => void;
  etiquetaTodas?: string;
  ariaLabel?: string;
}) {
  if (opciones.length === 0) return null;

  return (
    <select
      value={valor}
      onChange={(e) => onChange(e.target.value)}
      aria-label={ariaLabel}
      className="font-mono text-xs uppercase tracking-wider border border-marcador/30 rounded-full px-4 py-2 bg-white text-tinta cursor-pointer focus:outline-none focus:ring-2 focus:ring-azul"
    >
      <option value="">{etiquetaTodas}</option>
      {opciones.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}
