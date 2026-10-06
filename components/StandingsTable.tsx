type Equipo = {
  pos: number;
  equipo: string;
  pj: number;
  pg: number;
  pe: number;
  pp: number;
  gf: number;
  gc: number;
  dif: number;
  pts: number;
};

export default function StandingsTable({
  equipos,
  destacar = "Juventud San Rafael"
}: {
  equipos: Equipo[];
  destacar?: string;
}) {
  return (
    <div className="overflow-x-auto figurita rounded-card">
      <table className="w-full font-mono text-sm min-w-[560px]">
        <thead>
          <tr className="bg-cancha text-parchment-alto uppercase text-xs">
            <th className="py-2 px-2 text-left sticky left-0 z-10 w-10 bg-cancha">
              #
            </th>
            <th className="py-2 px-2 text-left sticky left-10 z-10 bg-cancha border-r border-dorado/40">
              Equipo
            </th>
            <th className="py-2 px-2">PJ</th>
            <th className="py-2 px-2">PG</th>
            <th className="py-2 px-2">PE</th>
            <th className="py-2 px-2">PP</th>
            <th className="py-2 px-2">GF</th>
            <th className="py-2 px-2">GC</th>
            <th className="py-2 px-2">Dif</th>
            <th className="py-2 px-2">Pts</th>
          </tr>
        </thead>
        <tbody>
          {equipos.map((e) => {
            const filaBg =
              e.equipo === destacar
                ? "bg-cancha/15 font-bold"
                : e.pos % 2 === 0
                ? "bg-parchment"
                : "bg-parchment-alto";
            return (
            <tr key={e.pos} className={filaBg}>
              <td className={`py-2 px-2 sticky left-0 z-10 w-10 ${filaBg}`}>
                {e.pos}
              </td>
              <td
                className={`py-2 px-2 text-left sticky left-10 z-10 border-r border-marcador/15 ${filaBg}`}
              >
                {e.equipo}
              </td>
              <td className="py-2 px-2 text-center">{e.pj}</td>
              <td className="py-2 px-2 text-center">{e.pg}</td>
              <td className="py-2 px-2 text-center">{e.pe}</td>
              <td className="py-2 px-2 text-center">{e.pp}</td>
              <td className="py-2 px-2 text-center">{e.gf}</td>
              <td className="py-2 px-2 text-center">{e.gc}</td>
              <td className="py-2 px-2 text-center">
                {e.dif > 0 ? `+${e.dif}` : e.dif}
              </td>
              <td className="py-2 px-2 text-center">{e.pts}</td>
            </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
