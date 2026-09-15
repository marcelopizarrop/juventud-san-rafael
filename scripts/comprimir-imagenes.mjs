// Comprime y redimensiona todas las fotos dentro de /public antes de subirlas.
// Uso: node scripts/comprimir-imagenes.mjs
//
// Limita el lado más largo (ancho O alto, el que sea mayor) a 1600px y
// re-comprime JPG/PNG/WEBP a una calidad razonable para web, reemplazando
// el archivo original. La mayoría de nuestras fotos son verticales (retratos
// de celular), así que limitar solo el ancho no las achicaba de verdad — hay
// que limitar el lado largo, sea cual sea.

import sharp from "sharp";
import { readdir, stat } from "fs/promises";
import path from "path";

const CARPETAS = [
  "public/jugadores",
  "public/novedades",
  "public/galeria",
  "public/directiva",
  "public/mascota",
  "public/auspiciadores",
  "public/series",
  "public/escudo"
];

const ANCHO_MAXIMO = 1600;
const CALIDAD = 80;
const EXTENSIONES = [".jpg", ".jpeg", ".png", ".webp"];

async function listarImagenes(carpeta) {
  try {
    const archivos = await readdir(carpeta);
    return archivos
      .filter((a) => EXTENSIONES.includes(path.extname(a).toLowerCase()))
      .map((a) => path.join(carpeta, a));
  } catch {
    return []; // la carpeta no existe todavía, no pasa nada
  }
}

async function comprimir(ruta) {
  const antes = (await stat(ruta)).size;
  const buffer = await sharp(ruta)
    .rotate() // respeta la orientación EXIF de fotos de celular
    .resize({ width: ANCHO_MAXIMO, height: ANCHO_MAXIMO, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: CALIDAD, mozjpeg: true })
    .toBuffer();

  const ext = path.extname(ruta).toLowerCase();
  if (ext === ".png") {
    await sharp(ruta)
      .rotate()
      .resize({ width: ANCHO_MAXIMO, height: ANCHO_MAXIMO, fit: "inside", withoutEnlargement: true })
      .png({ quality: CALIDAD, compressionLevel: 9 })
      .toFile(ruta + ".tmp");
  } else if (ext === ".webp") {
    await sharp(ruta)
      .rotate()
      .resize({ width: ANCHO_MAXIMO, height: ANCHO_MAXIMO, fit: "inside", withoutEnlargement: true })
      .webp({ quality: CALIDAD })
      .toFile(ruta + ".tmp");
  } else {
    const fs = await import("fs/promises");
    await fs.writeFile(ruta + ".tmp", buffer);
  }

  const fs = await import("fs/promises");
  await fs.rename(ruta + ".tmp", ruta);

  const despues = (await stat(ruta)).size;
  const ahorro = (100 - (despues / antes) * 100).toFixed(0);
  console.log(
    `${ruta}: ${(antes / 1024 / 1024).toFixed(2)} MB → ${(despues / 1024 / 1024).toFixed(2)} MB (-${ahorro}%)`
  );
}

async function main() {
  let total = 0;
  for (const carpeta of CARPETAS) {
    const imagenes = await listarImagenes(carpeta);
    for (const imagen of imagenes) {
      await comprimir(imagen);
      total++;
    }
  }
  console.log(`\nListo. ${total} imagen(es) procesada(s).`);
}

main().catch((err) => {
  console.error("Error comprimiendo imágenes:", err);
  process.exit(1);
});
