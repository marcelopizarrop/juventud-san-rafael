# Sincronización automática — Google Sheets/Drive → GitHub → Vercel

Esto permite que un tercero mantenga el contenido del sitio (datos y
fotos) **sin tocar GitHub nunca**: edita una planilla de Google Sheets y
sube fotos a carpetas de Google Drive, y un script revisa esos cambios
cada 15 minutos, los sube al repositorio con un commit, y Vercel publica
solo — igual que ya hace hoy con cualquier `git push`.

Es una configuración **de una sola vez**, que hace el administrador del
sitio (tú). El tercero nunca necesita saber que existe GitHub.

```
Google Sheets (datos) ┐
                        ├─→ Apps Script (cada 15 min) → GitHub → Vercel
Google Drive (fotos)  ┘
```

---

## Antes de empezar

- Necesitas una cuenta de Google (para crear la planilla, las carpetas y
  el script) — puede ser la tuya o una cuenta nueva dedicada al club.
- El script queda guardado dentro de tu cuenta de Google. **Solo tú**
  debes tener acceso a él (no el tercero) porque ahí vive el token que
  puede escribir en el repositorio.
- Esto reemplaza la edición manual descrita en la sección 5 del
  [README](README.md); ese flujo manual sigue funcionando si alguna vez
  quieres editar `data/datos.xlsx` directamente en GitHub, incluso
  después de activar la automatización.

---

## 1. Crear la carpeta de Google Drive

1. En [Google Drive](https://drive.google.com), crea una carpeta, por
   ejemplo **"Juventud San Rafael — Contenido del sitio"**.
2. Dentro, crea:
   - Una **Hoja de cálculo de Google** llamada `datos` (Archivo nuevo →
     Hoja de cálculo de Google — **no** subas el `.xlsx`, créala nueva
     para poder editarla en línea).
   - Cinco carpetas: `jugadores`, `directiva`, `mascota`, `novedades`,
     `galeria` (mismos nombres que las carpetas `public/` del sitio).

### Preparar las pestañas de la planilla

Descarga `data/datos.xlsx` desde el repositorio y ábrelo. Copia cada
pestaña (Club, Hitos, Directiva, Mascota, Series, Jugadores, Tabla,
Calendario, Novedades, Galeria) dentro de la nueva Hoja de cálculo de
Google, **con el mismo nombre de pestaña y las mismas columnas en la
primera fila** — el script exporta la planilla completa como `.xlsx` y
el sitio la lee exactamente igual que hoy. Puedes hacerlo abriendo el
`.xlsx` con Google Sheets (se abre como una vista previa) y usando
**Archivo → Importar → Insertar nueva(s) hoja(s)**, o copiando y
pegando el contenido de cada pestaña a mano.

> No cambies nombres de columnas ni de pestañas — son los mismos que ya
> usa `lib/datos.ts` para leer los datos.

### Fotos existentes

Si quieres partir con las fotos que ya están en `public/` del
repositorio, descárgalas y súbelas a la carpeta de Drive que
corresponda (incluye `escudo/`... en realidad **no**: `public/escudo/`
no se sincroniza automáticamente, se mantiene fijo — ver sección
"Qué NO se sincroniza" más abajo).

---

## 2. Anotar los IDs de Drive

Necesitarás el ID de la planilla y de cada carpeta. El ID es la parte
de la URL después de `/d/` (planilla) o `/folders/` (carpeta), por
ejemplo:

```
https://docs.google.com/spreadsheets/d/1AbCdEfGhIjKlMnOpQrStUvWxYz/edit
                                      └────────── este es el ID ─────────┘

https://drive.google.com/drive/folders/1AbCdEfGhIjKlMnOpQrStUvWxYz
                                        └────────── este es el ID ────────┘
```

Anota el ID de las 5 carpetas de fotos (el de la planilla no hace falta
si sigues el paso 4 tal cual, que vincula el script directamente a
ella).

---

## 3. Crear el token de GitHub

1. En GitHub, ve a **Settings → Developer settings → Personal access
   tokens → Fine-grained tokens → Generate new token**.
2. **Resource owner**: tu cuenta (`marcelopizarrop`).
3. **Repository access**: "Only select repositories" → elige
   `juventud-san-rafael`. (Nunca "All repositories".)
4. **Permissions → Repository permissions → Contents**: `Read and
   write`. Deja todo lo demás en "No access".
5. Genera el token y **cópialo ahora** — GitHub solo lo muestra una vez.

> Este token es la única "llave" que necesita cuidado: con ella se
> puede escribir en el repositorio. Trátalo como una contraseña. Si
> alguna vez se filtra, ve a GitHub y revócalo (Developer settings →
> Personal access tokens → Delete), y genera uno nuevo.

---

## 4. Crear el proyecto de Apps Script

1. Abre la Hoja de cálculo `datos` que creaste en el paso 1.
2. **Extensiones → Apps Script**. Se abre un editor de código vinculado
   a esa planilla (así el script siempre sabe cuál es "su" planilla,
   sin configurar un ID aparte).
3. Borra el contenido de `Código.gs` y pega el contenido completo de
   [`automatizacion/sincronizar.gs`](automatizacion/sincronizar.gs) de
   este repositorio.
4. Guarda el proyecto (dale un nombre, ej. "Sincronización sitio JSR").

### Configurar las propiedades del script

En el editor de Apps Script: **⚙️ Configuración del proyecto** (ícono
de engranaje, panel izquierdo) → **Propiedades del script** → **Añadir
propiedad del script**. Agrega una por una:

| Propiedad | Valor |
|---|---|
| `GITHUB_TOKEN` | el token que generaste en el paso 3 |
| `GITHUB_OWNER` | `marcelopizarrop` |
| `GITHUB_REPO` | `juventud-san-rafael` |
| `GITHUB_RAMA` | `main` |
| `ADMIN_EMAIL` | tu correo, para avisos si algo falla |
| `DRIVE_FOLDER_JUGADORES` | ID de la carpeta `jugadores` |
| `DRIVE_FOLDER_DIRECTIVA` | ID de la carpeta `directiva` |
| `DRIVE_FOLDER_MASCOTA` | ID de la carpeta `mascota` |
| `DRIVE_FOLDER_NOVEDADES` | ID de la carpeta `novedades` |
| `DRIVE_FOLDER_GALERIA` | ID de la carpeta `galeria` |

Estas propiedades **no quedan visibles en el código** ni se comparten
con nadie que solo tenga acceso a la planilla — son parte del proyecto
de Apps Script, que solo tú administras.

### Probar y activar

En el editor de Apps Script, arriba, selecciona la función en el menú
desplegable y presiona **▶ Ejecutar**:

1. Ejecuta `probarConexionGithub`. La primera vez te pedirá autorizar
   permisos (Drive, enviar correos, hacer solicitudes externas) —
   revisa y acepta ("Avanzado → Ir a [nombre del proyecto] (no seguro)"
   es normal para proyectos personales sin publicar). Si el registro de
   ejecución dice `Conexión OK con el repositorio: ...`, el token y la
   configuración de GitHub están bien.
2. Ejecuta `sincronizar` una vez a mano. Debería subir tu
   `datos.xlsx` y las fotos que ya hayas puesto en Drive, en un solo
   commit. Revisa el repositorio en GitHub: debería aparecer un commit
   nuevo llamado "Sincronización automática: ...", y en Vercel un
   nuevo deploy en curso.
3. Ejecuta `configurarTrigger` **una sola vez**. Esto deja
   `sincronizar` corriendo sola cada 15 minutos, sin que nadie tenga
   que abrir nada.

---

## 5. Invitar al tercero

Comparte con esa persona (con su cuenta de Google, como **Editor**):

- La Hoja de cálculo `datos`.
- Las 5 carpetas de fotos (`jugadores`, `directiva`, `mascota`,
  `novedades`, `galeria`) — o directamente la carpeta contenedora
  completa, que ya las incluye.

**No compartas el proyecto de Apps Script** (no hace falta, y contiene
el token de GitHub).

### Cómo debe trabajar el tercero

- **Datos**: edita las filas de la pestaña que corresponda, igual que
  se describe en la sección 5 del [README](README.md) (mismas columnas,
  mismos nombres de pestaña).
- **Fotos**: sube la imagen a la carpeta de Drive que corresponda
  (`jugadores`, `directiva`, etc.) y, en la celda `foto` / `imagen` /
  `fotoEquipo` de la planilla, escribe la ruta con el **mismo nombre de
  archivo**, por ejemplo si sube `marcelo-pizarro.jpeg` a la carpeta
  `jugadores`, en la planilla escribe `/jugadores/marcelo-pizarro.jpeg`.
  - Usa nombres de archivo simples: minúsculas, sin espacios ni tildes,
    con guiones (`marcelo-pizarro.jpeg`, no `Marcelo Pizarro.JPG`).
- Los cambios tardan **hasta ~15 minutos** en aparecer en el sitio (el
  intervalo del disparador) más 1-2 minutos que demora Vercel en
  publicar.

---

## Qué NO se sincroniza

- `public/escudo/` (el logo del club) y los favicons (`app/icon.png`,
  `app/apple-icon.png`) se mantienen fijos — no cambian seguido y un
  cambio ahí sí conviene revisarlo a mano antes de publicarlo.
- Si alguien **borra** una foto de una carpeta de Drive, el script no
  la borra del sitio (por seguridad, para evitar que un borrado
  accidental tumbe una foto en producción). Si de verdad quieres
  quitar una, bórrala también manualmente desde GitHub (`public/...` →
  Delete file) o pide ayuda para extender el script.

---

## Verificar que está funcionando

- **Apps Script**: en el editor, panel izquierdo → **Ejecuciones**.
  Verás cada corrida de `sincronizar`, si tuvo éxito y qué logueó.
- **GitHub**: la pestaña *Commits* del repositorio muestra los commits
  "Sincronización automática: ...".
- **Vercel**: cada uno de esos commits dispara un deploy nuevo, visible
  en el dashboard del proyecto.
- Si algo falla, te llega un correo a `ADMIN_EMAIL` con el error, y el
  cambio que falló se reintenta solo en la próxima corrida (no se
  pierde).

## Pausar o desinstalar

- **Pausar**: en Apps Script → panel izquierdo → **Disparadores** →
  borra el disparador de `sincronizar` (el ícono de basurero). El sitio
  sigue funcionando igual, solo que ya nadie actualiza `datos.xlsx` ni
  las fotos automáticamente; puedes volver al flujo manual del README
  en cualquier momento.
- **Desinstalar del todo**: borra el disparador, y opcionalmente
  revoca el token de GitHub (paso 3) y borra el proyecto de Apps
  Script.
