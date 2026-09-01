"use client";

export default function FiltroSerie({
  opciones,
  valor,
  onChange
}: {
  opciones: string[];
  valor: string;
  onChange: (nuevoValor: string) => void;
}) {
  if (opciones.length === 0) return null;

  return (
    <select
      value={valor}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Filtrar por serie"
      className="font-mono text-xs uppercase tracking-wider border border-marcador/30 rounded-full px-4 py-2 bg-white text-tinta cursor-pointer focus:outline-none focus:ring-2 focus:ring-azul"
    >
      <option value="">Todas las series</option>
      {opciones.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}
