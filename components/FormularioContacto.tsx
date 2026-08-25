"use client";

import { useState, FormEvent } from "react";

type Estado = "idle" | "enviando" | "ok" | "error";

export default function FormularioContacto() {
  const [estado, setEstado] = useState<Estado>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEstado("enviando");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      nombre: (form.elements.namedItem("nombre") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      telefono: (form.elements.namedItem("telefono") as HTMLInputElement).value,
      asunto: (form.elements.namedItem("asunto") as HTMLInputElement).value,
      mensaje: (form.elements.namedItem("mensaje") as HTMLTextAreaElement).value
    };

    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      const json = await res.json();
      if (!res.ok) {
        setErrorMsg(json.error || "No se pudo enviar el mensaje.");
        setEstado("error");
        return;
      }
      setEstado("ok");
      form.reset();
    } catch {
      setErrorMsg("No se pudo enviar el mensaje. Revisa tu conexión.");
      setEstado("error");
    }
  }

  if (estado === "ok") {
    return (
      <div className="figurita p-8 text-center">
        <p className="font-display text-2xl text-cancha mb-2">¡Mensaje enviado!</p>
        <p className="text-marcador">
          Gracias por escribirnos. Te responderemos a la brevedad.
        </p>
        <button
          onClick={() => setEstado("idle")}
          className="mt-6 font-mono text-xs uppercase tracking-wider text-azul hover:underline"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={enviar} className="figurita p-6 sm:p-8 space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-mono text-xs uppercase tracking-wider text-marcador mb-1">
            Nombre *
          </label>
          <input
            name="nombre"
            required
            className="w-full rounded-xl border border-black/15 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-azul"
          />
        </div>
        <div>
          <label className="block font-mono text-xs uppercase tracking-wider text-marcador mb-1">
            Correo *
          </label>
          <input
            type="email"
            name="email"
            required
            className="w-full rounded-xl border border-black/15 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-azul"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-mono text-xs uppercase tracking-wider text-marcador mb-1">
            Teléfono
          </label>
          <input
            name="telefono"
            className="w-full rounded-xl border border-black/15 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-azul"
          />
        </div>
        <div>
          <label className="block font-mono text-xs uppercase tracking-wider text-marcador mb-1">
            Asunto
          </label>
          <input
            name="asunto"
            className="w-full rounded-xl border border-black/15 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-azul"
          />
        </div>
      </div>

      <div>
        <label className="block font-mono text-xs uppercase tracking-wider text-marcador mb-1">
          Mensaje *
        </label>
        <textarea
          name="mensaje"
          required
          rows={5}
          className="w-full rounded-xl border border-black/15 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-azul"
        />
      </div>

      {estado === "error" && (
        <p className="text-sm text-cancha font-mono">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={estado === "enviando"}
        className="bg-cancha text-parchment-alto px-6 py-3 rounded-full font-mono text-sm uppercase tracking-wider hover:bg-cancha-oscuro transition-colors disabled:opacity-60"
      >
        {estado === "enviando" ? "Enviando..." : "Enviar mensaje"}
      </button>
    </form>
  );
}
