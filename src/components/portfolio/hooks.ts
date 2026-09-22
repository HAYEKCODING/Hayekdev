import { useEffect, useRef, useState, type PointerEvent, type RefObject } from "react";

/** Vrai si la personne a demandé de réduire les animations. */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

/** Suit la visibilité d'un élément (utile pour mettre les animations en pause hors écran). */
export function useInView<T extends Element>(
  { threshold = 0.15, rootMargin = "0px", once = false } = {},
): [RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin, once]);
  return [ref, inView];
}

/**
 * Écrit la progression du défilement (0 → 1) dans la variable CSS `--p` de l'élément,
 * sans re-rendre React. La progression démarre quand le haut de l'élément atteint
 * `start` (part de la hauteur de fenêtre) et se termine quand son bas atteint `end`.
 */
export function useScrollProgress<T extends HTMLElement>(
  ref: RefObject<T | null>,
  { start = 0.85, end = 0.4, onProgress }: { start?: number; end?: number; onProgress?: (p: number) => void } = {},
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      el.style.setProperty("--p", "1");
      onProgress?.(1);
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const r = el.getBoundingClientRect();
      const total = r.height + (start - end) * vh;
      const p = Math.min(1, Math.max(0, (start * vh - r.top) / total));
      el.style.setProperty("--p", p.toFixed(4));
      onProgress?.(p);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, start, end]);
}

/** Machine à écrire : efface et retape les phrases en boucle. Affiche la première phrase sans JS. */
export function useTyped(phrases: string[], { typeMs = 52, deleteMs = 26, holdMs = 1800 } = {}) {
  const reduced = usePrefersReducedMotion();
  const [text, setText] = useState(phrases[0]);
  useEffect(() => {
    if (reduced) {
      setText(phrases[0]);
      return;
    }
    let idx = 0;
    let len = phrases[0].length;
    let mode: "del" | "type" = "del";
    let timer = 0;
    const step = () => {
      if (mode === "del") {
        len -= 1;
        setText(phrases[idx].slice(0, Math.max(len, 0)));
        if (len <= 0) {
          idx = (idx + 1) % phrases.length;
          mode = "type";
          timer = window.setTimeout(step, 280);
        } else {
          timer = window.setTimeout(step, deleteMs);
        }
      } else {
        len += 1;
        setText(phrases[idx].slice(0, len));
        if (len >= phrases[idx].length) {
          mode = "del";
          timer = window.setTimeout(step, holdMs);
        } else {
          timer = window.setTimeout(step, typeMs);
        }
      }
    };
    timer = window.setTimeout(step, holdMs);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);
  return text;
}

/** Heure locale de Côte d'Ivoire (GMT toute l'année), rendue côté client uniquement. */
export function useAbidjanTime() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Africa/Abidjan",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 15000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}

/** Place --mx / --my sur l'élément pour le projecteur (.spot). */
export function spotlight(e: PointerEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${e.clientX - r.left}px`);
  el.style.setProperty("--my", `${e.clientY - r.top}px`);
}

/** Inclinaison 3D + projecteur. À brancher sur onPointerMove / onPointerLeave d'une carte. */
export function tiltHandlers(targetSelector = "[data-tilt]", max = 5) {
  return {
    onPointerMove(e: PointerEvent<HTMLElement>) {
      spotlight(e);
      if (e.pointerType === "touch") return;
      const card = e.currentTarget;
      const target = card.querySelector<HTMLElement>(targetSelector);
      if (!target) return;
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      target.style.setProperty("--rx", `${(x * max).toFixed(2)}deg`);
      target.style.setProperty("--ry", `${(-y * max).toFixed(2)}deg`);
    },
    onPointerLeave(e: PointerEvent<HTMLElement>) {
      const target = e.currentTarget.querySelector<HTMLElement>(targetSelector);
      if (!target) return;
      target.style.setProperty("--rx", "0deg");
      target.style.setProperty("--ry", "0deg");
    },
  };
}

/** Effet magnétique : le bouton se rapproche légèrement du curseur. */
export function useMagnetic<T extends HTMLElement>(strength = 0.25) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(pointer: coarse)").matches
    )
      return;
    const move = (e: globalThis.PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${(dx * strength).toFixed(1)}px, ${(dy * strength).toFixed(1)}px)`;
    };
    const reset = () => {
      el.style.transform = "";
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", reset);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", reset);
    };
  }, [strength]);
  return ref;
}
