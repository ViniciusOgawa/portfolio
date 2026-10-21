"use client";

import { useEffect } from "react";

// Page-wide motion: entrances (.in), living loops only while on screen (.live),
// and every animation paused on hidden tabs.
export function Motion() {
  useEffect(() => {
    const reveal = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          el.classList.add("in");
          reveal.unobserve(el);
          // Retire the stagger delays once the entrance has played.
          window.setTimeout(() => el.classList.add("settled"), 1600);
        });
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => reveal.observe(el));

    const live = new IntersectionObserver((entries) => {
      entries.forEach((e) => e.target.classList.toggle("live", e.isIntersecting));
    });
    document.querySelectorAll("[data-live]").forEach((el) => live.observe(el));

    const onVis = () => document.body.classList.toggle("paused", document.hidden);
    document.addEventListener("visibilitychange", onVis);

    return () => {
      reveal.disconnect();
      live.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);
  return null;
}
