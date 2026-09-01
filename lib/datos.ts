import fs from "fs";
import path from "path";
import * as XLSX from "xlsx";

// Todo el contenido del sitio vive en un solo libro Excel, con una hoja
// por tipo de dato (Club, Directiva, Series, Calendario, etc.). Esto es
// justo lo que la sincronización automática con Google Sheets necesita
// reemplazar en cada actualización: un único archivo.
const ARCHIVO_DATOS = "datos.xlsx";

function leerLibro() {
  const filePath = path.join(process.cwd(), "data", ARCHIVO_DATOS);
  const buffer = fs.readFileSync(filePath);
  return XLSX.read(buffer, { type: "buffer", cellDates: false });
}

function leerHoja<T = Record<string, unknown>>(nombreHoja: string): T[] {
  const libro = leerLibro();
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

// ---------- hojas Club / Hitos ----------
export type Hito = { anio: string; titulo: string; texto: string };
export type RedesSociales = { instagram: string; facebook: string; whatsapp: string };
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
  redes: RedesSociales;
};

export function getClub(): Club {
  const filas = leerHoja<Record<string, unknown>>("Club");
  const c = filas[0] ?? {};
  const hitos = leerHoja<Record<string, unknown>>("Hitos");
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
      .sort((a, b) => a.anio.localeCompare(b.anio)),
    redes: {
      instagram: texto(c.instagram),
      facebook: texto(c.facebook),
      whatsapp: texto(c.whatsapp)
    }
  };
}

// ---------- hojas Directiva / Mascota ----------
export type MiembroDirectiva = { cargo: string; nombre: string; foto: string };
export type Mascota = { nombre: string; descripcion: string; imagen: string };

export function getDirectiva(): MiembroDirectiva[] {
  const filas = leerHoja<Record<string, unknown>>("Directiva");
  return filas
    .filter((f) => texto(f.nombre))
    .map((f) => ({ cargo: texto(f.cargo), nombre: texto(f.nombre), foto: texto(f.foto) }));
}

export function getMascota(): Mascota | null {
  const filas = leerHoja<Record<string, unknown>>("Mascota");
  const m = filas[0];
  if (!m || !texto(m.nombre)) return null;
  return { nombre: texto(m.nombre), descripcion: texto(m.descripcion), imagen: texto(m.imagen) };
}

// ---------- hojas Series / Jugadores ----------
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
  fotoEquipo: string;
  jugadores: Jugador[];
};

export function getSeries(): Serie[] {
  const series = leerHoja<Record<string, unknown>>("Series");
  const jugadores = leerHoja<Record<string, unknown>>("Jugadores");
  return series.map((s) => {
    const id = texto(s.id);
    return {
      id,
      nombre: texto(s.nombre),
      categoria: texto(s.categoria),
      entrenador: texto(s.entrenador),
      fotoEquipo: texto(s.fotoEquipo),
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

// ---------- hoja Tabla ----------
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
  const filas = leerHoja<Record<string, unknown>>("Tabla");
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

// ---------- hoja Calendario ----------
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
  const filas = leerHoja<Record<string, unknown>>("Calendario");
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

// ---------- hoja Novedades ----------
export type Novedad = {
  titulo: string;
  fecha: string;
  lugar: string;
  descripcion: string;
  imagen: string;
};

export function getNovedades(): Novedad[] {
  const filas = leerHoja<Record<string, unknown>>("Novedades");
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

// ---------- hoja Galeria ----------
export type FotoGaleria = { orden: number; imagen: string; leyenda: string; serie: string };

export function getGaleria(): FotoGaleria[] {
  const filas = leerHoja<Record<string, unknown>>("Galeria");
  return filas
    .filter((f) => texto(f.imagen))
    .map((f) => ({
      orden: numero(f.orden),
      imagen: texto(f.imagen),
      leyenda: texto(f.leyenda),
      serie: texto(f.serie)
    }))
    .sort((a, b) => a.orden - b.orden);
}

export function getGaleriaGeneral(): FotoGaleria[] {
  return getGaleria().filter((f) => !f.serie);
}

export function getGaleriaPorSerie(serieId: string): FotoGaleria[] {
  return getGaleria().filter((f) => f.serie === serieId);
}
