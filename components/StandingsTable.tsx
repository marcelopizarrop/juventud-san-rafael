type Equipo = {
  pos: number;
  equipo: string;
  pj: number;
  pg: number;
  pe: number;
  pp: number;
  gf: number;
  gc: number;
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
            <th className="py-2 px-2 text-left">#</th>
            <th className="py-2 px-2 text-left">Equipo</th>
            <th className="py-2 px-2">PJ</th>
            <th className="py-2 px-2">PG</th>
            <th className="py-2 px-2">PE</th>
            <th className="py-2 px-2">PP</th>
            <th className="py-2 px-2">GF</th>
            <th className="py-2 px-2">GC</th>
            <th className="py-2 px-2">Pts</th>
          </tr>
        </thead>
        <tbody>
          {equipos.map((e) => (
            <tr
              key={e.pos}
              className={
                e.equipo === destacar
                  ? "bg-cancha/15 font-bold"
                  : e.pos % 2 === 0
                  ? "bg-parchment"
                  : "bg-parchment-alto"
              }
            >
              <td className="py-2 px-2">{e.pos}</td>
              <td className="py-2 px-2 text-left">{e.equipo}</td>
              <td className="py-2 px-2 text-center">{e.pj}</td>
              <td className="py-2 px-2 text-center">{e.pg}</td>
              <td className="py-2 px-2 text-center">{e.pe}</td>
              <td className="py-2 px-2 text-center">{e.pp}</td>
              <td className="py-2 px-2 text-center">{e.gf}</td>
              <td className="py-2 px-2 text-center">{e.gc}</td>
              <td className="py-2 px-2 text-center">{e.pts}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
