import fs from "fs";
import path from "path";
import * as XLSX from "xlsx";

function leerLibro(nombreArchivo: string) {
  const filePath = path.join(process.cwd(), "data", nombreArchivo);
  const buffer = fs.readFileSync(filePath);
  return XLSX.read(buffer, { type: "buffer", cellDates: false });
}

function leerHoja<T = Record<string, unknown>>(
  nombreArchivo: string,
  nombreHoja: string
): T[] {
  const libro = leerLibro(nombreArchivo);
  const hoja = libro.Sheets[nombreHoja];
  if (!hoja) return [];
  return XLSX.utils.sheet_to_json<T>(hoja, { defval: "", raw: true });
}

function texto(valor: unknown): string {
  return valor === undefined || valor === null ? "" : String(valor).trim();
}

function numero(valor: unknown): number {
  const n = Number(valor);
  return Number.isFinite(n) ? n : 0;
}

// ---------- club.xlsx ----------
export type Hito = { anio: string; titulo: string; texto: string };
export type Club = {
  nombre: string;
  apodo: string;
  fundacion: number;
  comuna: string;
  region: string;
  colores: string[];
  estadio: string;
  resumen: string;
  hitos: Hito[];
};

export function getClub(): Club {
  const filas = leerHoja<Record<string, unknown>>("club.xlsx", "Club");
  const c = filas[0] ?? {};
  const hitos = leerHoja<Record<string, unknown>>("club.xlsx", "Hitos");
  return {
    nombre: texto(c.nombre) || "Nombre del club",
    apodo: texto(c.apodo),
    fundacion: numero(c.fundacion),
    comuna: texto(c.comuna),
    region: texto(c.region),
    colores: texto(c.colores)
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean),
    estadio: texto(c.estadio),
    resumen: texto(c.resumen),
    hitos: hitos
      .map((h) => ({ anio: texto(h.anio), titulo: texto(h.titulo), texto: texto(h.texto) }))
      .sort((a, b) => a.anio.localeCompare(b.anio))
  };
}

// ---------- series.xlsx ----------
export type Jugador = {
  numero: number;
  nombre: string;
  posicion: string;
  foto: string;
};
export type Serie = {
  id: string;
  nombre: string;
  categoria: string;
  entrenador: string;
  jugadores: Jugador[];
};

export function getSeries(): Serie[] {
  const series = leerHoja<Record<string, unknown>>("series.xlsx", "Series");
  const jugadores = leerHoja<Record<string, unknown>>("series.xlsx", "Jugadores");
  return series.map((s) => {
    const id = texto(s.id);
    return {
      id,
      nombre: texto(s.nombre),
      categoria: texto(s.categoria),
      entrenador: texto(s.entrenador),
      jugadores: jugadores
        .filter((j) => texto(j.serieId) === id)
        .map((j) => ({
          numero: numero(j.numero),
          nombre: texto(j.nombre),
          posicion: texto(j.posicion),
          foto: texto(j.foto)
        }))
    };
  });
}

export function getSerie(id: string): Serie | undefined {
  return getSeries().find((s) => s.id === id);
}

// ---------- tabla.xlsx ----------
export type EquipoTabla = {
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
export type Tabla = { liga: string; actualizado: string; equipos: EquipoTabla[] };

export function getTablas(): Record<string, Tabla> {
  const filas = leerHoja<Record<string, unknown>>("tabla.xlsx", "Tabla");
  const agrupado: Record<string, Tabla> = {};
  filas.forEach((f) => {
    const serieId = texto(f.serieId);
    if (!serieId) return;
    if (!agrupado[serieId]) {
      agrupado[serieId] = { liga: texto(f.liga), actualizado: texto(f.actualizado), equipos: [] };
    }
    agrupado[serieId].equipos.push({
      pos: numero(f.pos),
      equipo: texto(f.equipo),
      pj: numero(f.pj),
      pg: numero(f.pg),
      pe: numero(f.pe),
      pp: numero(f.pp),
      gf: numero(f.gf),
      gc: numero(f.gc),
      pts: numero(f.pts)
    });
  });
  Object.values(agrupado).forEach((t) => t.equipos.sort((a, b) => a.pos - b.pos));
  return agrupado;
}

// ---------- calendario.xlsx ----------
export type Partido = {
  fecha: string;
  hora: string;
  serie: string;
  rival: string;
  condicion: string;
  cancha: string;
  resultado: string | null;
};

export function getCalendario(): Partido[] {
  const filas = leerHoja<Record<string, unknown>>("calendario.xlsx", "Calendario");
  return filas
    .filter((f) => texto(f.fecha))
    .map((f) => ({
      fecha: texto(f.fecha),
      hora: texto(f.hora),
      serie: texto(f.serie),
      rival: texto(f.rival),
      condicion: texto(f.condicion),
      cancha: texto(f.cancha),
      resultado: texto(f.resultado) || null
    }));
}

// ---------- novedades.xlsx ----------
export type Novedad = {
  titulo: string;
  fecha: string;
  lugar: string;
  descripcion: string;
  imagen: string;
};

export function getNovedades(): Novedad[] {
  const filas = leerHoja<Record<string, unknown>>("novedades.xlsx", "Novedades");
  return filas
    .filter((f) => texto(f.titulo))
    .map((f) => ({
      titulo: texto(f.titulo),
      fecha: texto(f.fecha),
      lugar: texto(f.lugar),
      descripcion: texto(f.descripcion),
      imagen: texto(f.imagen)
    }));
}

// ---------- galeria.xlsx ----------
export type FotoGaleria = { orden: number; imagen: string; leyenda: string };

export function getGaleria(): FotoGaleria[] {
  const filas = leerHoja<Record<string, unknown>>("galeria.xlsx", "Galeria");
  return filas
    .filter((f) => texto(f.imagen))
    .map((f) => ({ orden: numero(f.orden), imagen: texto(f.imagen), leyenda: texto(f.leyenda) }))
    .sort((a, b) => a.orden - b.orden);
}
