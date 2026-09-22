import { useEffect, useRef } from "react";

/**
 * Champ de losanges tissés — la signature visuelle du hero.
 *
 * Le motif rappelle le tissage d'Afrique de l'Ouest (pagne baoulé, fil d'or sur indigo).
 * Une « navette » traverse le champ en continu ; le curseur (ou le doigt qui touche l'écran)
 * réveille les losanges autour de lui ; un clic lance une onde. Les losanges s'éteignent
 * progressivement et laissent une traînée.
 *
 * Performances : la grille de fond est dessinée une seule fois (canvas hors écran),
 * seuls les losanges actifs sont redessinés à chaque image, et la boucle s'arrête
 * quand le hero n'est plus visible.
 */

const CELL = 34; // largeur d'un losange (px CSS)
const R = CELL / 2; // demi-diagonale
const HALF = CELL / 2; // pas vertical (les rangées sont décalées d'un demi-losange)

const NIGHT = "#090e28";

function hash(i: number, j: number) {
  let h = (i * 374761393 + j * 668265263) | 0;
  h = (h ^ (h >>> 13)) * 1274126177;
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}

function diamond(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number) {
  ctx.moveTo(cx, cy - r);
  ctx.lineTo(cx + r, cy);
  ctx.lineTo(cx, cy + r);
  ctx.lineTo(cx - r, cy);
  ctx.closePath();
}

export function WovenField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const base = document.createElement("canvas");
    const bctx = base.getContext("2d")!;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let cols = 0;
    let rows = 0;
    let energy = new Float32Array(0);
    let raf = 0;
    let visible = true;
    const pointer = { x: -9999, y: -9999, on: false };
    const ripples: { x: number; y: number; t: number }[] = [];
    const start = performance.now();

    const center = (i: number, j: number) => ({
      x: i * CELL + (j & 1 ? HALF : 0),
      y: j * HALF,
    });

    function paintBase() {
      bctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      bctx.clearRect(0, 0, w, h);
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const { x, y } = center(i, j);
          const n = hash(i, j);
          if (n < 0.14) {
            // quelques losanges pleins : la trame du tissu
            bctx.beginPath();
            diamond(bctx, x, y, R * 0.7);
            bctx.fillStyle = "rgba(38, 74, 170, 0.22)";
            bctx.fill();
          }
          bctx.beginPath();
          diamond(bctx, x, y, R * 0.78);
          bctx.strokeStyle = "rgba(110, 130, 215, 0.17)";
          bctx.lineWidth = 1;
          bctx.stroke();
        }
      }
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      base.width = canvas!.width;
      base.height = canvas!.height;
      cols = Math.ceil(w / CELL) + 1;
      rows = Math.ceil(h / HALF) + 1;
      energy = new Float32Array(cols * rows);
      paintBase();
      if (reduced) drawStatic();
      else draw(performance.now());
    }

    function inject(cx: number, cy: number, radius: number, amount: number) {
      const r2 = radius * radius;
      const j0 = Math.max(0, Math.floor((cy - radius) / HALF));
      const j1 = Math.min(rows - 1, Math.ceil((cy + radius) / HALF));
      for (let j = j0; j <= j1; j++) {
        const i0 = Math.max(0, Math.floor((cx - radius) / CELL) - 1);
        const i1 = Math.min(cols - 1, Math.ceil((cx + radius) / CELL) + 1);
        for (let i = i0; i <= i1; i++) {
          const c = center(i, j);
          const dx = c.x - cx;
          const dy = c.y - cy;
          const d2 = dx * dx + dy * dy;
          if (d2 > r2) continue;
          const f = 1 - d2 / r2;
          const k = j * cols + i;
          const v = energy[k] + amount * f * f;
          energy[k] = v > 1 ? 1 : v;
        }
      }
    }

    function render() {
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.clearRect(0, 0, w, h);
      ctx!.drawImage(base, 0, 0, w, h);
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const e = energy[j * cols + i];
          if (e < 0.035) continue;
          const c = center(i, j);
          // bleu cobalt à faible énergie → or à forte énergie
          const t = Math.min(1, Math.max(0, (e - 0.3) / 0.5));
          const r = Math.round(61 + (245 - 61) * t);
          const g = Math.round(139 + (180 - 139) * t);
          const b = Math.round(235 + (27 - 235) * t);
          ctx!.beginPath();
          diamond(ctx!, c.x, c.y, R * (0.55 + 0.4 * e));
          ctx!.fillStyle = `rgba(${r}, ${g}, ${b}, ${Math.min(0.95, e * 1.15).toFixed(3)})`;
          ctx!.fill();
          if (e > 0.72) {
            // cœur creux : le motif de losanges emboîtés
            ctx!.beginPath();
            diamond(ctx!, c.x, c.y, R * 0.26);
            ctx!.fillStyle = NIGHT;
            ctx!.fill();
          }
        }
      }
    }

    function drawStatic() {
      // Mouvement réduit : une composition fixe, sans animation.
      energy.fill(0);
      inject(w * 0.72, h * 0.32, 190, 0.95);
      inject(w * 0.42, h * 0.78, 130, 0.55);
      render();
    }

    function draw(now: number) {
      const t = (now - start) / 1000;
      for (let k = 0; k < energy.length; k++) energy[k] *= 0.945;

      // La navette : traverse le champ de gauche à droite en oscillant.
      const span = w + 320;
      const sx = ((t * 95) % span) - 160;
      const sy = h * (0.5 + 0.3 * Math.sin(t * 1.15));
      inject(sx, sy, 95, 0.55);

      if (pointer.on) inject(pointer.x, pointer.y, 130, 0.42);

      for (let k = ripples.length - 1; k >= 0; k--) {
        const rp = ripples[k];
        const age = (now - rp.t) / 1000;
        if (age > 1.6) {
          ripples.splice(k, 1);
          continue;
        }
        // anneau qui s'élargit
        const radius = age * 380;
        const steps = 26;
        for (let s = 0; s < steps; s++) {
          const a = (s / steps) * Math.PI * 2;
          inject(rp.x + Math.cos(a) * radius, rp.y + Math.sin(a) * radius, 46, 0.34 * (1 - age / 1.6));
        }
      }
      render();
    }

    function loop(now: number) {
      raf = 0;
      if (!visible || document.hidden) return;
      draw(now);
      raf = requestAnimationFrame(loop);
    }
    function ensureLoop() {
      if (!raf && !reduced && visible && !document.hidden) raf = requestAnimationFrame(loop);
    }

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      pointer.on = x >= -60 && x <= r.width + 60 && y >= -60 && y <= r.height + 60;
      pointer.x = x;
      pointer.y = y;
    };
    const onLeave = () => {
      pointer.on = false;
    };
    const onDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("a, button, input, textarea")) return;
      const r = canvas.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      if (x < 0 || x > r.width || y < 0 || y > r.height) return;
      ripples.push({ x, y, t: performance.now() });
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) ensureLoop();
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);
    resize();

    if (!reduced) {
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerdown", onDown, { passive: true });
      document.addEventListener("pointerleave", onLeave);
      document.addEventListener("visibilitychange", ensureLoop);
      ensureLoop();
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", ensureLoop);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className={`block h-full w-full ${className}`} />;
}
