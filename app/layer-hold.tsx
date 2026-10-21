"use client";

import { useEffect, useRef, useState } from "react";

const LAYERS = [
  { name: "Interface", tools: "React e TypeScript" },
  { name: "API", tools: "Node.js, Express e Django" },
  { name: "Banco de dados", tools: "PostgreSQL e TypeORM" },
];

const HOLD_MS = 1800; // full trip down and back up
const RELEASE_MS = 1500; // easing back when let go early

// Press and hold: a pulse travels from the interface down to the database and back.
export function LayerHold() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const root = rootRef.current!;
    const btn = root.querySelector<HTMLButtonElement>(".hold-btn")!;
    let p = 0;
    let holding = false;
    let raf: number | null = null;
    let last = 0;
    let finished = false;
    let lastWritten = -1;

    const write = () => {
      const r = Math.round(p * 1000) / 1000;
      if (r === lastWritten) return;
      lastWritten = r;
      root.style.setProperty("--hp", r.toFixed(3));
    };

    const finish = () => {
      finished = true;
      p = 1;
      write();
      root.classList.add("is-done");
      setDone(true);
    };

    const loop = (now: number) => {
      const dt = Math.min(64, now - (last || now));
      last = now;
      if (holding) p = Math.min(1, p + dt / HOLD_MS);
      else p = Math.max(0, p - dt / RELEASE_MS);
      write();
      if (p >= 1) {
        raf = null;
        last = 0;
        finish();
        return;
      }
      if (!holding && p <= 0) {
        raf = null;
        last = 0;
        return;
      }
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (finished) return;
      holding = true;
      root.classList.add("is-holding");
      if (raf === null) raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      holding = false;
      root.classList.remove("is-holding");
      if (!finished && raf === null && p > 0) raf = requestAnimationFrame(loop);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.key === " " || e.key === "Enter") && !e.repeat) {
        e.preventDefault();
        start();
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter") stop();
    };

    btn.addEventListener("pointerdown", start);
    window.addEventListener("pointerup", stop);
    btn.addEventListener("pointerleave", stop);
    btn.addEventListener("pointercancel", stop);
    btn.addEventListener("keydown", onKeyDown);
    btn.addEventListener("keyup", onKeyUp);
    btn.addEventListener("contextmenu", (e) => e.preventDefault());

    // Reduced motion gets the finished state, no hold needed. Honored live.
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotion = () => {
      if (mq.matches && !finished) {
        if (raf !== null) cancelAnimationFrame(raf);
        raf = null;
        finish();
      }
    };
    mq.addEventListener("change", onMotion);
    onMotion();

    return () => {
      if (raf !== null) cancelAnimationFrame(raf);
      btn.removeEventListener("pointerdown", start);
      window.removeEventListener("pointerup", stop);
      btn.removeEventListener("pointerleave", stop);
      btn.removeEventListener("pointercancel", stop);
      btn.removeEventListener("keydown", onKeyDown);
      btn.removeEventListener("keyup", onKeyUp);
      mq.removeEventListener("change", onMotion);
    };
  }, []);

  return (
    <div className="hold" ref={rootRef}>
      <div className="hold-stack" aria-hidden="true">
        <div className="hold-track">
          <span className="hold-pulse" />
        </div>
        {LAYERS.map((l, i) => (
          <div className={`hold-layer hold-layer--${i}`} key={l.name}>
            <span className="hold-index">0{i + 1}</span>
            <span className="hold-name">{l.name}</span>
            <span className="hold-tools">{l.tools}</span>
          </div>
        ))}
      </div>
      <div className="hold-side">
        <ul className="sr-only">
          {LAYERS.map((l) => (
            <li key={l.name}>
              {l.name}: {l.tools}
            </li>
          ))}
        </ul>
        <button type="button" className="hold-btn" disabled={done}>
          <svg className="hold-ring" viewBox="0 0 48 48" aria-hidden="true">
            <circle cx="24" cy="24" r="20" />
          </svg>
          <span>{done ? "Requisição completa" : "Segure aqui"}</span>
        </button>
        <p className="hold-result" aria-live="polite">
          {done ? "A resposta voltou. Tudo no lugar certo." : ""}
        </p>
      </div>
    </div>
  );
}
