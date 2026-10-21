"use client";

import { useEffect, useRef } from "react";
import { Split } from "./split";

const VIDEO_URL = "/assets/hero-scrub.mp4";
const POSTER_URL = "/assets/hero-poster.jpg";
const VIDEO_BYTES = 4_606_670; // real encoded size: the fallback when Content-Length is missing

// The five static-hero gates. Must match the CSS in globals.css character for character.
const GATES = [
  "(max-width: 720px)",
  "(orientation: portrait) and (max-width: 1024px)",
  "(orientation: portrait) and (pointer: coarse)",
  "(orientation: landscape) and (pointer: coarse) and (max-height: 560px)",
  "(prefers-reduced-motion: reduce)",
];

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const smoothstep = (p: number, e0: number, e1: number) => {
  const t = clamp((p - e0) / (e1 - e0), 0, 1);
  return t * t * (3 - 2 * t);
};

type Band = { el: HTMLElement; a: number; b: number; ramp: number; op: number; k: number };

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current!;
    const stage = hero.querySelector<HTMLElement>(".stage")!;
    const video = hero.querySelector<HTMLVideoElement>("video")!;
    const posterLayer = hero.querySelector<HTMLElement>(".poster")!;
    const ring = hero.querySelector<SVGElement>(".ring")!;
    const els = [...hero.querySelectorAll<HTMLElement>(".band")];
    const bands: Band[] = els.map((el) => ({
      el,
      a: Number(el.dataset.a),
      b: Number(el.dataset.b),
      ramp: Number(el.dataset.ramp || 0),
      op: -1,
      k: -1,
    }));

    let scrubOn = false;
    let heroOnScreen = true;
    let target = 0;
    let shown = 0;
    let rafId: number | null = null;
    let lastTick = 0;
    let loadK = 0;
    let loadRaf: number | null = null;
    let seekBusy = false;
    let pendingTime: number | null = null;
    let heroInit = false;
    let objectUrl: string | null = null;

    const heroProgress = () => {
      const range = hero.offsetHeight - window.innerHeight;
      if (range <= 0) return 0;
      return clamp(-hero.getBoundingClientRect().top / range, 0, 1);
    };

    function requestSeek(t: number) {
      if (!video.duration || !isFinite(t)) return;
      if (seekBusy) {
        pendingTime = t;
        return;
      }
      seekBusy = true;
      video.currentTime = t;
    }
    const onSeeked = () => {
      seekBusy = false;
      if (pendingTime !== null) {
        const t = pendingTime;
        pendingTime = null;
        requestSeek(t);
      }
    };
    const onVideoError = () => {
      seekBusy = false;
      pendingTime = null;
      failVideo();
    };
    video.addEventListener("seeked", onSeeked);
    video.addEventListener("error", onVideoError);

    let scrolled: boolean | null = null;
    function updateCaptions(p: number) {
      const isScrolled = p > 0.04;
      if (isScrolled !== scrolled) {
        scrolled = isScrolled;
        stage.classList.toggle("is-scrolled", isScrolled);
      }
      const last = bands.length - 1;
      bands.forEach((band, i) => {
        const { a, b } = band;
        const f = Math.min(0.02, (b - a) / 3);
        const fadeIn = i === 0 ? 1 : smoothstep(p, a, a + f);
        const fadeOut = i === last ? 1 : 1 - smoothstep(p, b - f, b);
        const op = fadeIn * fadeOut;
        let k = clamp((p - a) / (band.ramp || Math.min(0.025, (b - a) * 0.35)), 0, 1);
        if (i === 0) k = Math.max(k, loadK);
        const opR = Math.round(op * 1000) / 1000;
        if (opR !== band.op) {
          band.op = opR;
          band.el.style.opacity = String(opR);
          band.el.classList.toggle("is-off", opR === 0);
        }
        if (Math.abs(k - band.k) > 0.008 || ((k === 0 || k === 1) && k !== band.k)) {
          band.k = k;
          band.el.style.setProperty("--k", k.toFixed(3));
        }
      });
    }

    function tick(now: number) {
      const dt = Math.min(100, now - (lastTick || now));
      lastTick = now;
      const k = 0.16;
      shown += (target - shown) * (1 - Math.pow(1 - k, dt / 16.667));
      if (Math.abs(target - shown) < 0.0005) {
        shown = target;
        rafId = null;
        lastTick = 0;
      } else {
        rafId = requestAnimationFrame(tick);
      }
      requestSeek(shown * video.duration);
      updateCaptions(shown);
    }

    function onScroll() {
      target = heroProgress();
      if (rafId === null && heroOnScreen && scrubOn) rafId = requestAnimationFrame(tick);
    }

    // Band one assembles on load, then hands over to scroll.
    function runLoadRamp() {
      if (loadK >= 1) return;
      const start = performance.now();
      const step = (now: number) => {
        loadK = clamp((now - start) / 1100, 0, 1);
        loadK = 1 - Math.pow(1 - loadK, 3);
        updateCaptions(shown);
        loadRaf = loadK < 1 ? requestAnimationFrame(step) : null;
      };
      loadRaf = requestAnimationFrame(step);
    }

    async function loadHeroBlob() {
      const ctrl = new AbortController();
      let watchdog = window.setTimeout(() => ctrl.abort(), 20000);
      const res = await fetch(VIDEO_URL, { priority: "low", signal: ctrl.signal } as RequestInit);
      if (!res.ok || !res.body) throw new Error("video fetch failed");
      const total = Number(res.headers.get("Content-Length")) || VIDEO_BYTES;
      const reader = res.body.getReader();
      const chunks: BlobPart[] = [];
      let got = 0;
      let lastRing = 0;
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        clearTimeout(watchdog);
        watchdog = window.setTimeout(() => ctrl.abort(), 20000);
        chunks.push(value);
        got += value.length;
        const frac = Math.min(1, got / total);
        const now = performance.now();
        if (now - lastRing > 100 || frac === 1) {
          lastRing = now;
          ring.style.setProperty("--ld", String(Math.round(126 * (1 - frac))));
        }
      }
      clearTimeout(watchdog);
      ring.style.setProperty("--ld", "0");
      objectUrl = URL.createObjectURL(new Blob(chunks, { type: "video/mp4" }));
      video.src = objectUrl;
      video.load();
      video.addEventListener(
        "canplay",
        () => {
          requestSeek(heroProgress() * video.duration);
          stage.classList.add("video-ready");
        },
        { once: true },
      );
    }

    function failVideo() {
      stage.classList.add("video-failed");
    }

    function initHeroOnce() {
      if (heroInit) return;
      heroInit = true;
      posterLayer.style.backgroundImage = `url('${POSTER_URL}')`;
      let started = false;
      const startBlobFetch = () => {
        if (started) return;
        started = true;
        loadHeroBlob().catch(failVideo);
      };
      const img = new Image();
      img.onload = startBlobFetch;
      img.onerror = startBlobFetch;
      img.src = POSTER_URL;
      window.setTimeout(startBlobFetch, 4000);
    }

    function enableScrub() {
      if (scrubOn) return;
      scrubOn = true;
      initHeroOnce();
      window.addEventListener("scroll", onScroll, { passive: true });
      bands.forEach((b) => {
        b.op = -1;
        b.k = -1;
      });
      target = shown = heroProgress();
      updateCaptions(shown);
      runLoadRamp();
      onScroll();
    }
    function disableScrub() {
      if (!scrubOn) return;
      scrubOn = false;
      window.removeEventListener("scroll", onScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    }
    function applyHeroMode() {
      if (GATES.some((q) => window.matchMedia(q).matches)) disableScrub();
      else enableScrub();
    }

    const mqls = GATES.map((q) => window.matchMedia(q));
    mqls.forEach((m) => m.addEventListener("change", applyHeroMode));

    const io = new IntersectionObserver(([entry]) => {
      heroOnScreen = entry.isIntersecting;
      if (heroOnScreen) onScroll();
    });
    io.observe(hero);

    applyHeroMode();

    return () => {
      disableScrub();
      mqls.forEach((m) => m.removeEventListener("change", applyHeroMode));
      io.disconnect();
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("error", onVideoError);
      if (loadRaf !== null) cancelAnimationFrame(loadRaf);
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, []);

  return (
    <section className="hero" ref={heroRef} aria-label="Apresentação">
      <div className="stage">
        <div className="poster" aria-hidden="true" />
        <video preload="none" muted playsInline aria-hidden="true" tabIndex={-1} />
        <div className="scrim" aria-hidden="true" />

        <div className="band band--left band--one" data-a="0" data-b="0.2">
          <p className="kicker chip">Desenvolvedor front-end</p>
          <h1 className="band-title">
            <Split text="Oi, eu sou o Vinicius." mode="depth" seed={11} spread={0.45} />
          </h1>
          <p className="band-sub">
            Eu construo interfaces em React e TypeScript. Olha o que acontece quando você clica.
          </p>
        </div>

        <div className="band band--right band--two" data-a="0.25" data-b="0.45">
          <p className="kicker chip">01 · API</p>
          <h2 className="band-title">
            <Split text="A requisição desce." mode="drift" seed={23} spread={0.5} />
          </h2>
          <p className="band-sub">Da interface para a API, em Node.js ou Django.</p>
        </div>

        <div className="band band--left band--three" data-a="0.5" data-b="0.67">
          <p className="kicker chip">02 · Banco de dados</p>
          <h2 className="band-title">
            <Split text="O banco encontra o dado." mode="depth" seed={31} spread={0.4} />
          </h2>
          <p className="band-sub">PostgreSQL guarda tudo no lugar certo.</p>
        </div>

        <div className="band band--right band--four" data-a="0.74" data-b="1" data-ramp="0.06">
          <p className="kicker chip">03 · De volta à interface</p>
          <h2 className="band-title">
            <Split text="E a resposta volta. Rápido." mode="rise" seed={41} spread={0.55} />
          </h2>
          <p className="band-sub band-sub--staged">De ponta a ponta. Do clique ao dado e de volta.</p>
          <div className="band-ctas">
            <a className="btn btn--primary" href="#contato">
              Falar comigo
            </a>
            <a className="btn btn--ghost" href="#projetos">
              Ver projetos
            </a>
          </div>
        </div>

        <svg className="ring" viewBox="0 0 48 48" aria-hidden="true">
          <circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" strokeOpacity=".18" strokeWidth="3" />
          <circle
            cx="24"
            cy="24"
            r="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray="126"
            strokeLinecap="round"
            style={{ strokeDashoffset: "var(--ld,126)" }}
          />
        </svg>
        <div className="cue" aria-hidden="true">
          <span>role</span>
          <svg viewBox="0 0 16 24" width="16" height="24">
            <path d="M8 3v16M3 14l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      <div className="static-hero">
        <div className="static-copy">
          <p className="kicker chip">Desenvolvedor front-end</p>
          <h1 className="static-title">Oi, eu sou o Vinicius.</h1>
          <p className="band-sub">Eu construo interfaces em React e TypeScript que as pessoas entendem de primeira.</p>
          <div className="band-ctas">
            <a className="btn btn--primary" href="#contato">
              Falar comigo
            </a>
            <a className="btn btn--ghost" href="#projetos">
              Ver projetos
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
