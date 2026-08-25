type Partido = {
  fecha: string;
  hora: string;
  serie: string;
  rival: string;
  condicion: string;
  cancha: string;
  resultado?: string | null;
};

function formatFecha(fecha: string) {
  const d = new Date(fecha + "T00:00:00");
  return d.toLocaleDateString("es-CL", {
    weekday: "short",
    day: "2-digit",
    month: "short"
  });
}

export default function MatchCard({
  partido,
  nombreClub = "Juventud San Rafael"
}: {
  partido: Partido;
  nombreClub?: string;
}) {
  const jugado = Boolean(partido.resultado);
  return (
    <div className="ticket px-5 py-4 flex items-center justify-between gap-4">
      <div>
        <p className="font-mono text-xs uppercase tracking-wider text-marcador">
          {partido.serie} · {partido.condicion}
        </p>
        <p className="font-display text-lg leading-tight mt-1">
          {jugado ? `${nombreClub} vs` : "vs"} {partido.rival}
        </p>
        <p className="font-mono text-xs text-marcador mt-1">{partido.cancha}</p>
      </div>
      <div className="text-right shrink-0">
        {jugado ? (
          <p className="font-display text-2xl marcador-nums text-azul">
            {partido.resultado}
          </p>
        ) : (
          <>
            <p className="font-mono text-sm">{formatFecha(partido.fecha)}</p>
            <p className="font-mono text-sm font-bold">{partido.hora} hrs</p>
          </>
        )}
      </div>
    </div>
  );
}
