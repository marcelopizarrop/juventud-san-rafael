/**
 * Sincronización automática: Google Sheets + Google Drive → GitHub → Vercel
 * =========================================================================
 * Club Deportivo Juventud San Rafael
 *
 * Qué hace:
 *   1. Exporta la planilla de Google Sheets (que reemplaza a data/datos.xlsx)
 *      y, si cambió desde la última vez, la sube al repositorio.
 *   2. Revisa las carpetas de Google Drive que reemplazan a public/jugadores,
 *      public/directiva, public/mascota, public/novedades y public/galeria;
 *      sube al repositorio las fotos nuevas o modificadas.
 *   3. Si hubo cambios, hace UN solo commit a la rama configurada de GitHub.
 *      Como el repo ya está conectado a Vercel, ese commit dispara solo un
 *      nuevo deploy — nadie necesita tocar GitHub ni Vercel a mano.
 *
 * Instrucciones completas de instalación: ver AUTOMATIZACION.md en la raíz
 * del repositorio. Este archivo es la fuente de verdad del código; se copia
 * tal cual dentro de un proyecto de Google Apps Script.
 *
 * IMPORTANTE — a quién dar acceso:
 *   - El tercero que sube fotos y edita datos: acceso de EDITOR a la
 *     planilla y a las carpetas de Drive. Nada más.
 *   - Este proyecto de Apps Script (donde vive el token de GitHub): solo
 *     el administrador del sitio. Nunca lo compartas con el tercero.
 */

// ---------------------------------------------------------------------
// CONFIGURACIÓN — todo esto se define UNA vez en
// Extensiones → Apps Script → ⚙️ Configuración del proyecto → Propiedades
// del script (nunca queda escrito en este código). Ver AUTOMATIZACION.md.
// ---------------------------------------------------------------------
//   GITHUB_TOKEN            token de GitHub (fine-grained, solo este repo,
//                           permiso "Contents: Read and write")
//   GITHUB_OWNER            ej. "marcelopizarrop"
//   GITHUB_REPO             ej. "juventud-san-rafael"
//   GITHUB_RAMA             ej. "main"
//   ADMIN_EMAIL             correo donde avisar si algo falla
//   DRIVE_FOLDER_JUGADORES  ID de la carpeta de Drive → public/jugadores
//   DRIVE_FOLDER_DIRECTIVA  ID de la carpeta de Drive → public/directiva
//   DRIVE_FOLDER_MASCOTA    ID de la carpeta de Drive → public/mascota
//   DRIVE_FOLDER_NOVEDADES  ID de la carpeta de Drive → public/novedades
//   DRIVE_FOLDER_GALERIA    ID de la carpeta de Drive → public/galeria
//
// El ID de la planilla se obtiene solo si el script está "vinculado" a ella
// (Extensiones → Apps Script desde dentro de la propia Hoja de cálculo),
// que es la forma recomendada. Si usas un proyecto independiente, agrega
// también la propiedad SPREADSHEET_ID.

var RUTA_DATOS = "data/datos.xlsx";
var MAX_ARCHIVOS_POR_EJECUCION = 30; // evita quedarse sin tiempo de ejecución

var CARPETAS_IMAGENES = {
  jugadores: "DRIVE_FOLDER_JUGADORES",
  directiva: "DRIVE_FOLDER_DIRECTIVA",
  mascota: "DRIVE_FOLDER_MASCOTA",
  novedades: "DRIVE_FOLDER_NOVEDADES",
  galeria: "DRIVE_FOLDER_GALERIA"
};

// ---------------------------------------------------------------------
// PUNTO DE ENTRADA
// ---------------------------------------------------------------------

/**
 * Función principal. Instálala en un disparador de tiempo (ver
 * configurarTrigger) para que corra sola cada cierto tiempo.
 */
function sincronizar() {
  var props = PropertiesService.getScriptProperties();
  var cambios = [];

  try {
    var cambioDatos = revisarDatos_(props);
    if (cambioDatos) cambios.push(cambioDatos);

    Object.keys(CARPETAS_IMAGENES).forEach(function (carpeta) {
      var cambiosCarpeta = revisarCarpetaImagenes_(props, carpeta);
      cambios = cambios.concat(cambiosCarpeta);
    });

    if (cambios.length === 0) {
      Logger.log("Sin cambios. No se sube nada.");
      return;
    }

    if (cambios.length > MAX_ARCHIVOS_POR_EJECUCION) {
      Logger.log(
        "Hay " + cambios.length + " cambios; subiendo los primeros " +
          MAX_ARCHIVOS_POR_EJECUCION + " y dejando el resto para la próxima corrida."
      );
      cambios = cambios.slice(0, MAX_ARCHIVOS_POR_EJECUCION);
    }

    var shaCommit = subirCambiosAGithub_(cambios);
    Logger.log(
      "Commit creado: " + shaCommit + " (" + cambios.length + " archivo(s): " +
        cambios.map(function (c) { return c.path; }).join(", ") + ")"
    );

    // Solo después de que el commit se creó con éxito confirmamos el
    // estado nuevo, para que un archivo no se "pierda" si algo falla.
    cambios.forEach(function (c) {
      if (c.confirmar) c.confirmar();
    });
  } catch (error) {
    Logger.log("ERROR: " + error);
    notificarError_(error);
    throw error;
  }
}

// ---------------------------------------------------------------------
// PLANILLA DE DATOS (equivalente a data/datos.xlsx)
// ---------------------------------------------------------------------

function revisarDatos_(props) {
  var idPlanilla = obtenerIdPlanilla_(props);
  var bytes = exportarPlanillaComoXlsx_(idPlanilla);
  var hash = Utilities.base64Encode(
    Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, bytes)
  );

  var hashAnterior = props.getProperty("HASH_DATOS");
  if (hash === hashAnterior) return null;

  return {
    path: RUTA_DATOS,
    bytes: bytes,
    confirmar: function () {
      props.setProperty("HASH_DATOS", hash);
    }
  };
}

// DriveApp.getFileById(id).getAs(MimeType.MICROSOFT_EXCEL) NO funciona
// para convertir una Hoja de cálculo nativa de Google a .xlsx (Apps
// Script lo rechaza con "Converting from application/vnd.google-apps.
// spreadsheet ... is not supported"), así que se exporta directamente
// por la URL de exportación de Google Sheets.
function exportarPlanillaComoXlsx_(idPlanilla) {
  var url =
    "https://docs.google.com/spreadsheets/d/" + idPlanilla + "/export?format=xlsx";
  var respuesta = UrlFetchApp.fetch(url, {
    headers: { Authorization: "Bearer " + ScriptApp.getOAuthToken() },
    muteHttpExceptions: true
  });
  var codigo = respuesta.getResponseCode();
  if (codigo !== 200) {
    throw new Error(
      "No se pudo exportar la planilla como .xlsx (código " + codigo + "): " +
        respuesta.getContentText()
    );
  }
  return respuesta.getContent();
}

function obtenerIdPlanilla_(props) {
  var idGuardado = props.getProperty("SPREADSHEET_ID");
  if (idGuardado) return idGuardado;
  // Si el script está vinculado a la Hoja de cálculo (recomendado), se
  // obtiene el ID directamente sin necesidad de configurarlo a mano.
  var activa = SpreadsheetApp.getActiveSpreadsheet();
  if (activa) return activa.getId();
  throw new Error(
    "No encuentro la planilla. Vincula el script a la Hoja de cálculo o " +
      "define la propiedad SPREADSHEET_ID."
  );
}

// ---------------------------------------------------------------------
// CARPETAS DE FOTOS (equivalente a public/<carpeta>)
// ---------------------------------------------------------------------

function revisarCarpetaImagenes_(props, nombreCarpeta) {
  var idCarpeta = props.getProperty(CARPETAS_IMAGENES[nombreCarpeta]);
  if (!idCarpeta) {
    Logger.log(
      "Aviso: no se configuró la propiedad " + CARPETAS_IMAGENES[nombreCarpeta] +
        "; se omite la carpeta " + nombreCarpeta + "."
    );
    return [];
  }

  var claveEstado = "ESTADO_" + nombreCarpeta.toUpperCase();
  var estadoAnterior = JSON.parse(props.getProperty(claveEstado) || "{}");
  var estadoNuevo = {};
  var cambios = [];

  var archivos = DriveApp.getFolderById(idCarpeta).getFiles();
  while (archivos.hasNext()) {
    var archivo = archivos.next();
    var id = archivo.getId();
    var nombre = archivo.getName();
    var actualizado = archivo.getLastUpdated().getTime();
    estadoNuevo[id] = { nombre: nombre, actualizado: actualizado };

    var previo = estadoAnterior[id];
    var cambio = !previo || previo.actualizado !== actualizado || previo.nombre !== nombre;
    if (!cambio) continue;

    cambios.push({
      path: "public/" + nombreCarpeta + "/" + nombre,
      bytes: archivo.getBlob().getBytes(),
      // Cierre sobre el id específico: solo actualiza el estado de ESTE
      // archivo dentro del mapa completo de la carpeta.
      confirmar: (function (idArchivo, datos) {
        return function () {
          var estado = JSON.parse(props.getProperty(claveEstado) || "{}");
          estado[idArchivo] = datos;
          props.setProperty(claveEstado, JSON.stringify(estado));
        };
      })(id, estadoNuevo[id])
    });
  }

  return cambios;
}

// ---------------------------------------------------------------------
// GITHUB — commit único con todos los archivos cambiados
// ---------------------------------------------------------------------

function subirCambiosAGithub_(archivos) {
  var props = PropertiesService.getScriptProperties();
  var owner = requerirPropiedad_(props, "GITHUB_OWNER");
  var repo = requerirPropiedad_(props, "GITHUB_REPO");
  var rama = props.getProperty("GITHUB_RAMA") || "main";
  var base = "https://api.github.com/repos/" + owner + "/" + repo;

  var ref = llamarGithub_("GET", base + "/git/ref/heads/" + rama);
  var commitActualSha = ref.object.sha;

  var commitActual = llamarGithub_("GET", base + "/git/commits/" + commitActualSha);
  var treeActualSha = commitActual.tree.sha;

  var entradasTree = archivos.map(function (a) {
    var blob = llamarGithub_("POST", base + "/git/blobs", {
      content: Utilities.base64Encode(a.bytes),
      encoding: "base64"
    });
    return { path: a.path, mode: "100644", type: "blob", sha: blob.sha };
  });

  var nuevoTree = llamarGithub_("POST", base + "/git/trees", {
    base_tree: treeActualSha,
    tree: entradasTree
  });

  var nombresArchivos = archivos.map(function (a) { return a.path; }).join(", ");
  var nuevoCommit = llamarGithub_("POST", base + "/git/commits", {
    message: "Sincronización automática: " + nombresArchivos,
    tree: nuevoTree.sha,
    parents: [commitActualSha]
  });

  llamarGithub_("PATCH", base + "/git/refs/heads/" + rama, {
    sha: nuevoCommit.sha
  });

  return nuevoCommit.sha;
}

function llamarGithub_(metodo, url, cuerpo) {
  var props = PropertiesService.getScriptProperties();
  var token = requerirPropiedad_(props, "GITHUB_TOKEN");

  var opciones = {
    method: metodo,
    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28"
    },
    muteHttpExceptions: true
  };
  if (cuerpo) {
    opciones.contentType = "application/json";
    opciones.payload = JSON.stringify(cuerpo);
  }

  var respuesta = UrlFetchApp.fetch(url, opciones);
  var codigo = respuesta.getResponseCode();
  var texto = respuesta.getContentText();

  if (codigo < 200 || codigo >= 300) {
    throw new Error(
      "GitHub respondió " + codigo + " en " + metodo + " " + url + ": " + texto
    );
  }
  return texto ? JSON.parse(texto) : null;
}

function requerirPropiedad_(props, nombre) {
  var valor = props.getProperty(nombre);
  if (!valor) {
    throw new Error(
      "Falta configurar la propiedad '" + nombre + "' en Configuración del " +
        "proyecto → Propiedades del script. Ver AUTOMATIZACION.md."
    );
  }
  return valor;
}

// ---------------------------------------------------------------------
// AVISOS Y UTILIDADES DE INSTALACIÓN
// ---------------------------------------------------------------------

function notificarError_(error) {
  var props = PropertiesService.getScriptProperties();
  var correo = props.getProperty("ADMIN_EMAIL");
  if (!correo) return;
  try {
    MailApp.sendEmail(
      correo,
      "⚠️ Falló la sincronización del sitio del club",
      "La sincronización automática de datos.xlsx / fotos con GitHub falló:\n\n" +
        error +
        "\n\nRevisa el registro de ejecuciones en Apps Script (Ejecuciones, en el " +
        "menú lateral) para más detalles."
    );
  } catch (e) {
    Logger.log("No se pudo enviar el correo de aviso: " + e);
  }
}

/**
 * Ejecuta esto UNA vez a mano (▶ en el editor) para instalar el
 * disparador que corre sincronizar() cada 15 minutos. Puedes volver a
 * ejecutarlo si cambias el intervalo; no crea triggers duplicados.
 */
function configurarTrigger() {
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (t.getHandlerFunction() === "sincronizar") ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger("sincronizar").timeBased().everyMinutes(15).create();
  Logger.log("Listo: sincronizar() correrá cada 15 minutos.");
}

/**
 * Ejecuta esto a mano para comprobar que el token y la configuración de
 * GitHub funcionan, sin subir nada todavía.
 */
function probarConexionGithub() {
  var props = PropertiesService.getScriptProperties();
  var owner = requerirPropiedad_(props, "GITHUB_OWNER");
  var repo = requerirPropiedad_(props, "GITHUB_REPO");
  var info = llamarGithub_(
    "GET",
    "https://api.github.com/repos/" + owner + "/" + repo
  );
  Logger.log("Conexión OK con el repositorio: " + info.full_name);
}
