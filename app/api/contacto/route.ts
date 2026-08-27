import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  let body: { nombre?: string; email?: string; telefono?: string; asunto?: string; mensaje?: string };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  const { nombre, email, telefono, asunto, mensaje } = body;

  if (!nombre || !email || !mensaje) {
    return NextResponse.json(
      { error: "Por favor completa nombre, correo y mensaje." },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const destino = process.env.CONTACTO_EMAIL || "informaciones.jcu@gmail.com";

  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "El formulario todavía no está configurado. Falta agregar RESEND_API_KEY en las variables de entorno de Vercel."
      },
      { status: 500 }
    );
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "Juventud San Rafael <contacto@jcu.cl>",
      to: destino,
      reply_to: email,
      subject: asunto ? `[Sitio web] ${asunto}` : `Nuevo mensaje de ${nombre}`,
      text: `Nombre: ${nombre}\nCorreo: ${email}\nTeléfono: ${telefono || "No indicado"}\n\nMensaje:\n${mensaje}`
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "No se pudo enviar el mensaje." }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Error inesperado en /api/contacto:", e);
    return NextResponse.json({ error: "No se pudo enviar el mensaje." }, { status: 500 });
  }
}