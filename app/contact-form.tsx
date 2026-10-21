"use client";

import { useState, type FormEvent } from "react";

const EMAIL = "vini_ogawa@hotmail.com";

// No backend on a static site: submitting opens the visitor's own email app, addressed to Vinicius.
export function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("nome") || "").trim();
    const from = String(data.get("email") || "").trim();
    const msg = String(data.get("mensagem") || "").trim();
    const subject = `Contato pelo portfólio${name ? `: ${name}` : ""}`;
    const body = `${msg}\n\n${name}${from ? ` (${from})` : ""}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form className={`form${sent ? " is-sent" : ""}`} onSubmit={onSubmit}>
      <label className="field">
        <span className="field-label">Nome</span>
        <input name="nome" type="text" autoComplete="name" placeholder="Seu nome" required />
      </label>
      <label className="field">
        <span className="field-label">Email</span>
        <input name="email" type="email" autoComplete="email" placeholder="seu@email.com" required />
      </label>
      <label className="field">
        <span className="field-label">Mensagem</span>
        <textarea name="mensagem" rows={5} placeholder="Conte um pouco sobre a vaga ou o projeto" required />
      </label>
      <button className="btn btn--primary btn--wide" type="submit">
        Enviar mensagem
      </button>
      <p className="form-note" aria-live="polite">
        {sent ? "Seu app de email abriu. É só enviar." : "Isso abre o seu app de email com a mensagem pronta."}
      </p>
    </form>
  );
}
