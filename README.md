# Sitio web — Club Deportivo Juventud San Rafael

Sitio construido con **Next.js** (funciona automáticamente en **Vercel**) y
pensado para publicarse en un dominio **.cl de NIC.cl**. El contenido
(historia, jugadores, tabla, calendario, novedades, galería de fotos) se
administra desde **archivos Excel** dentro de la carpeta `data/`, y el sitio
incluye un formulario de contacto que envía correos reales.

---

## 1. Requisitos

- Cuenta en **[GitHub](https://github.com)** — ya tienes el repositorio
  `marcelopizarrop/juventud-san-rafael` conectado.
- Cuenta gratuita en **[Vercel](https://vercel.com)**.
- Cuenta gratuita en **[Resend](https://resend.com)** (para que el
  formulario de contacto pueda enviar correos).
- Tu dominio en **[NIC.cl](https://www.nic.cl)**.
- Opcional, para probar en tu computador: [Node.js 18+](https://nodejs.org)
  y **Microsoft Excel**, **Google Sheets** o **LibreOffice Calc** para
  editar los archivos `.xlsx`.

---

## 2. Subir estos cambios a GitHub

Esta carpeta ya está conectada a tu repositorio. Desde tu computador,
dentro de la carpeta del proyecto:

```bash
git add .
git commit -m "Nuevo diseño, Excel, novedades con fotos, carrusel y contacto"
git push
```

Si prefieres no usar la terminal, puedes arrastrar los archivos con
**GitHub Desktop**, que hace lo mismo con clics.

---

## 3. Publicar en Vercel

Si el proyecto ya estaba conectado a Vercel, esto ocurre solo: cada `git
push` genera una nueva publicación en 1-2 minutos. Si es la primera vez:

1. Entra a [vercel.com](https://vercel.com) e inicia sesión con GitHub.
2. **Add New → Project** y selecciona el repositorio.
3. Vercel detecta Next.js automáticamente. Antes de darle a **Deploy**,
   agrega las variables de entorno del formulario de contacto (ver
   sección 6 más abajo) — si las agregas después, solo tendrás que volver
   a desplegar una vez ("Redeploy").

---

## 4. Conectar tu dominio de NIC.cl

1. En Vercel: **Settings → Domains**, escribe tu dominio (ej.
   `juventudsanrafael.cl`) y agrega también `www.juventudsanrafael.cl`.
2. Vercel te mostrará los registros DNS a usar, normalmente:
   - Dominio raíz: registro **A** → `76.76.21.21`
   - `www`: registro **CNAME** → `cname.vercel-dns.com`

   *(usa siempre los valores exactos que te muestre Vercel en ese momento)*
3. En NIC.cl, entra a la administración de tu dominio y busca
   **Configuración técnica**.
4. Elige la opción **"Servidores DNS"** (no "Redireccionamiento web" — esa
   opción solo sirve para reenviar el dominio a otra URL, no para publicar
   un sitio real con hosting, SSL ni formulario de contacto).
5. Dentro de "Servidores DNS", agrega los registros A/CNAME que te dio
   Vercel en el paso 2.
6. Guarda. La propagación puede tardar minutos u horas. Vercel marcará el
   dominio como "Valid" y activa el certificado de seguridad (https)
   automáticamente, sin costo.

---

## 5. Editar el contenido — ahora con Excel

Toda la información vive en archivos `.xlsx` dentro de `data/`. A
diferencia de antes, **los Excel no se pueden editar directamente en la
web de GitHub** (son archivos binarios, no de texto). El flujo es:

1. Ve a `data/` en tu repositorio de GitHub y descarga el archivo que
   quieras cambiar (⋯ → **Download**).
2. Ábrelo con Excel, Google Sheets o LibreOffice y edita las filas.
   **No cambies los nombres de las columnas** (primera fila) ni el nombre
   de las hojas (pestañas abajo) — el sitio los usa para leer los datos.
3. Guarda el archivo **en formato .xlsx**, con el mismo nombre.
4. En GitHub, entra a `data/`, haz clic en el archivo antiguo → ⋯ →
   **Delete file** (o directamente arrastra el nuevo archivo con **Add
   file → Upload files**, que lo reemplaza si tiene el mismo nombre).
5. Sube el archivo nuevo con **Add file → Upload files**, arrastrando el
   `.xlsx` editado, y confirma el cambio ("Commit changes").
6. Espera ~1 minuto: Vercel vuelve a publicar el sitio solo.

> Tip: si administras el sitio en equipo, es más simple mantener estos
> Excel en una carpeta de Google Drive/Sheets compartida y, cada vez que
> haya cambios, descargar como `.xlsx` y subirlos a GitHub siguiendo los
> pasos de arriba.

### ¿Qué hay en cada archivo?

- **`data/club.xlsx`**
  - Hoja **Club**: una sola fila con nombre, apodo, año de fundación,
    comuna, región, colores (separados por coma), estadio y resumen.
  - Hoja **Hitos**: una fila por hito de la historia (año, título, texto).

- **`data/series.xlsx`**
  - Hoja **Series**: una fila por categoría (id, nombre, categoría,
    entrenador, `fotoEquipo`). El `id` debe ser corto y sin espacios (ej.
    `sub-15`). La columna `fotoEquipo` es opcional: pon ahí la ruta de una
    foto del plantel completo (ej. `/jugadores/foto-equipo-sub-15.jpg`) y
    aparecerá como foto de portada en la página de esa serie.
  - Hoja **Jugadores**: una fila por jugador/a, con la columna `serieId`
    indicando a qué serie pertenece (debe coincidir exactamente con el
    `id` de la hoja Series). Columnas: `serieId`, `numero`, `nombre`,
    `posicion`, `foto` (ver sección de imágenes más abajo).

- **`data/tabla.xlsx`** — Hoja **Tabla**: una fila por equipo en cada
  liga. La columna `serieId` agrupa las filas por serie (debe coincidir
  con el `id` de `series.xlsx` para que aparezca con ese nombre en el
  selector). Columnas: `pj, pg, pe, pp, gf, gc, pts`.

- **`data/calendario.xlsx`** — Hoja **Calendario**: una fila por partido.
  Si ya se jugó, escribe el resultado en `resultado` (ej. `2 - 1`); si no,
  déjalo vacío y aparecerá en "Próximos partidos".

- **`data/novedades.xlsx`** — Hoja **Novedades**: matrículas, aniversarios,
  actividades a beneficio, charlas, etc. Columnas: `titulo`, `fecha`,
  `lugar`, `descripcion`, `imagen` (opcional, ver abajo).

- **`data/galeria.xlsx`** — Hoja **Galeria**: fotos del carrusel de la
  portada y de la página Galería. Columnas: `orden` (número, define el
  orden de aparición), `imagen`, `leyenda` (texto opcional que aparece
  sobre la foto), `serie` (opcional). Si dejas `serie` vacío, la foto
  aparece en "Fotos del club" y en el carrusel de la portada; si escribes
  el `id` de una serie (el mismo de `series.xlsx`), la foto aparece en la
  sección "Fotos por serie" de esa serie dentro de la página Galería.

- **`data/directiva.xlsx`**
  - Hoja **Directiva**: una fila por integrante (cargo, nombre, `foto`
    opcional).
  - Hoja **Mascota**: una sola fila (nombre, descripción, `imagen`
    opcional).

### Subir fotos (jugadores, directiva, mascota, novedades y galería)

El proceso es el mismo en todos los casos:

1. En GitHub, entra a la carpeta correspondiente y usa **Add file →
   Upload files**:
   - `public/jugadores/` para fotos de jugadores y para la foto del
     equipo completo de una serie (`fotoEquipo`)
   - `public/directiva/` para fotos de los integrantes de la directiva
   - `public/mascota/` para la foto de la mascota
   - `public/novedades/` para la foto de una novedad
   - `public/galeria/` para las fotos del carrusel/galería (generales o
     por serie)
2. Sube la imagen (`.jpg`, `.jpeg`, `.png` o `.webp`; para el carrusel y
   las fotos de equipo funciona mejor una foto horizontal/panorámica).
3. En el Excel correspondiente, en la columna `foto` / `imagen` /
   `fotoEquipo`, escribe la ruta con `/` al inicio, por ejemplo:
   `/jugadores/ignacio-rojas.jpg`, `/jugadores/foto-equipo-sub-15.jpg`,
   `/directiva/feliciciano-barra.jpg`, `/mascota/chocolo.jpg`,
   `/novedades/aniversario-64.jpg`, `/galeria/hinchada.jpg`.
4. Sube el Excel actualizado como se explicó en la sección anterior.

Mientras el campo de foto esté vacío, la ficha de jugador o de directiva
muestra automáticamente sus iniciales, así el sitio se ve bien aunque
falten fotos.

---

## 6. Formulario de contacto (envío de correos)

El formulario de la página **/contacto** usa **[Resend](https://resend.com)**,
un servicio gratuito (100 correos/día) para enviar los mensajes a tu
correo. Configúralo una sola vez:

1. Crea una cuenta gratuita en [resend.com](https://resend.com).
2. Ve a **API Keys → Create API Key**, dale cualquier nombre y copia la
   clave (empieza con `re_...`). Solo se muestra una vez.
3. En Vercel, entra a tu proyecto → **Settings → Environment Variables** y
   agrega:
   - `RESEND_API_KEY` → la clave que copiaste.
   - `CONTACTO_EMAIL` → el correo del club donde quieres recibir los
     mensajes (ej. `contacto@juventudsanrafael.cl` o tu Gmail).
4. Haz clic en **Save** y luego en **Deployments → ⋯ → Redeploy** para que
   los cambios se apliquen.

Con esto, cada mensaje enviado desde el formulario llegará a
`CONTACTO_EMAIL`, y podrás responder directamente porque el correo queda
configurado con "responder a" la dirección de quien escribió.

> Nota: mientras no verifiques un dominio propio en Resend, los correos se
> envían desde una dirección genérica de prueba (`onboarding@resend.dev`).
> Esto funciona perfecto para recibir los mensajes; si más adelante quieres
> que los correos salgan "desde" tu propio dominio, Resend permite verificar
> `juventudsanrafael.cl` agregando un par de registros DNS adicionales.

### Probarlo en tu computador

Copia `.env.example` como `.env.local` y completa las dos variables antes
de correr `npm run dev` (ver sección 7).

---

## 7. Probarlo en tu computador (opcional)

```bash
npm install
cp .env.example .env.local   # completa RESEND_API_KEY y CONTACTO_EMAIL
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

---

## 8. Estructura del proyecto

```
app/                  → páginas del sitio (Inicio, Historia, Jugadores, Series, Tabla, Calendario, Novedades, Galería, Contacto)
app/api/contacto/     → endpoint que envía el correo del formulario de contacto
components/           → piezas reutilizables (encabezado, carrusel, ficha de jugador, tarjeta de partido, etc.)
data/                 → TODO el contenido editable, en archivos Excel (.xlsx)
lib/datos.ts          → lee los archivos Excel y se los entrega a cada página
public/jugadores/     → fotos de jugadores y fotos de equipo completo por serie
public/directiva/     → fotos de los integrantes de la directiva
public/mascota/       → foto de la mascota
public/novedades/     → fotos de novedades
public/galeria/       → fotos del carrusel/galería (generales o por serie)
public/escudo/        → logo del club
```

---

## 9. Ideas para más adelante

- Verificar tu dominio en Resend para que los correos salgan desde
  `contacto@juventudsanrafael.cl` en vez de la dirección de prueba.
- Sumar redes sociales del club en el pie de página.
