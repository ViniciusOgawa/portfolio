import type { CSSProperties } from "react";

// Seeded generator: the "random" offsets are identical on every render,
// so server HTML and client hydration always agree.
function rng(seed: number) {
  let s = seed >>> 0;
  return () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296;
}

type Mode = "depth" | "drift" | "rise";

// Splits a headline into word spans (and character spans for "depth"),
// with a visually hidden copy for screen readers.
export function Split({ text, mode, seed = 7, spread = 0.5 }: { text: string; mode: Mode; seed?: number; spread?: number }) {
  const r = rng(seed);
  const words = text.split(" ");
  let charIndex = 0;
  const totalChars = text.replace(/ /g, "").length;
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className={`split split--${mode}`}>
        {words.map((w, wi) => {
          const wordStyle = {
            "--th": ((wi / Math.max(1, words.length)) * spread + r() * 0.05).toFixed(3),
          } as CSSProperties;
          return (
            <span key={wi}>
              <span className="w" style={wordStyle}>
                {mode === "depth"
                  ? [...w].map((c, ci) => {
                      const style = {
                        "--th": ((charIndex++ / totalChars) * spread + r() * 0.08).toFixed(3),
                        "--jx": `${((r() - 0.5) * 18).toFixed(1)}px`,
                      } as CSSProperties;
                      return (
                        <span className="c" style={style} key={ci}>
                          {c}
                        </span>
                      );
                    })
                  : w}
              </span>
              {wi < words.length - 1 ? " " : ""}
            </span>
          );
        })}
      </span>
    </>
  );
}
