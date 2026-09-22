import { useEffect, useRef } from "react";

/**
 * Le nom en très grand. Bricolage Grotesque est une police variable : chaque lettre
 * change d'épaisseur en fonction de la distance au curseur (« le fil se tend »).
 * Sans curseur (mobile), une vague d'épaisseur traverse le nom toute seule.
 * Le texte reste lisible par les lecteurs d'écran (aria-label sur le h1).
 */

const REST = 470; // épaisseur au repos
const PEAK = 800; // épaisseur maximale

export function KineticName({ lines, className = "" }: { lines: string[]; className?: string }) {
  const rootRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const letters = Array.from(root.querySelectorAll<HTMLElement>("[data-l]"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      letters.forEach((l) => (l.style.fontVariationSettings = `"wght" 620`));
      return;
    }

    const pointer = { x: 0, y: 0, on: false };
    let raf = 0;
    let visible = true;
    const t0 = performance.now();

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.on = true;
    };
    const onLeave = () => {
      pointer.on = false;
    };

    const tick = (now: number) => {
      raf = 0;
      if (!visible || document.hidden) return;
      const rootRect = root.getBoundingClientRect();
      // lecture groupée…
      const rects = letters.map((l) => l.getBoundingClientRect());
      // …puis écriture groupée (évite les recalculs de mise en page en cascade)
      const t = (now - t0) / 1000;
      const waveX = rootRect.left + (((t * 0.16) % 1.5) - 0.25) * rootRect.width;
      const waveSigma = Math.max(60, rootRect.width * 0.16);
      for (let i = 0; i < letters.length; i++) {
        const r = rects[i];
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        let influence = Math.exp(-(((cx - waveX) / waveSigma) ** 2)) * 0.8;
        if (pointer.on) {
          const d = Math.hypot(cx - pointer.x, cy - pointer.y);
          influence = Math.max(influence * 0.5, Math.exp(-((d / 210) ** 2)));
        }
        const wght = REST + (PEAK - REST) * influence;
        letters[i].style.fontVariationSettings = `"wght" ${wght.toFixed(0)}`;
      }
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (!raf && visible && !document.hidden) raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
      },
      { threshold: 0 },
    );
    io.observe(root);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", start);
    start();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", start);
    };
  }, []);

  let n = 0;
  return (
    <h1
      ref={rootRef}
      aria-label={lines.join(" ")}
      className={`font-display font-bold leading-[0.9] tracking-[-0.035em] ${className}`}
      style={{ fontStretch: "86%" }}
    >
      {lines.map((line) => (
        <span key={line} className="k-line" aria-hidden>
          {Array.from(line).map((ch) => (
            <span key={n} data-l className="k-letter" style={{ "--i": n++ } as React.CSSProperties}>
              {ch}
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
}
