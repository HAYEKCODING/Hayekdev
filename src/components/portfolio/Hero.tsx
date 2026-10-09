import { useEffect, useRef } from "react";
import { ArrowDown, Download, FileText, Github, Linkedin } from "lucide-react";
import avatar from "@/assets/photo_2026-07-22_13-43-49.jpg";
import { CV, PROFILE, STATS, TYPED } from "@/data/portfolio";
import { WovenField } from "./WovenField";
import { KineticName } from "./KineticName";
import { Counter } from "./Counter";
import { useAbidjanTime, useMagnetic, useTyped } from "./hooks";

export function Hero() {
  const typed = useTyped(TYPED);
  const time = useAbidjanTime();
  const ctaRef = useMagnetic<HTMLAnchorElement>();
  const portraitRef = useRef<HTMLDivElement | null>(null);
  const plateRef = useRef<HTMLDivElement | null>(null);

  // Le portrait s'incline légèrement, la plaque dorée derrière lui bouge en sens inverse.
  useEffect(() => {
    const el = portraitRef.current;
    const plate = plateRef.current;
    if (!el || !plate) return;
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(1100px) rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg)`;
      plate.style.transform = `translate(${(-x * 14).toFixed(1)}px, ${(-y * 14).toFixed(1)}px)`;
    };
    const onLeave = () => {
      el.style.transform = "perspective(1100px) rotateX(0) rotateY(0)";
      plate.style.transform = "translate(0,0)";
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <header id="home" className="relative overflow-hidden">
      {/* Champ tissé */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,#000_62%,transparent_100%)] lg:opacity-100">
        <WovenField />
      </div>
      {/* Voile de lisibilité sous le texte */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(100deg,rgb(9_14_40/0.82)_0%,rgb(9_14_40/0.5)_38%,transparent_70%)]"
      />

      <div className="relative mx-auto grid max-w-[1200px] grid-cols-[minmax(0,1fr)] items-center gap-14 px-6 pb-24 pt-32 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:gap-8 lg:px-10 lg:pb-32 lg:pt-40">
        <div className="min-w-0">
          <p className="hero-rise mb-6 flex items-center gap-3 text-[15px] text-mist" style={{ "--d": "0.1s" } as React.CSSProperties}>
            <span className="dia text-gold" />
            {PROFILE.role} à {PROFILE.city}
          </p>

          <KineticName
            lines={[...PROFILE.heroLines]}
            className="text-[clamp(3.6rem,15.5vw,6.4rem)] sm:text-[clamp(5rem,14vw,8rem)] lg:text-[clamp(5rem,8.4vw,8.4rem)]"
          />

          <p
            className="hero-rise mt-9 min-h-[3.4rem] text-[1.35rem] font-medium leading-snug text-ivoire sm:text-[1.6rem] lg:min-h-[2.2rem]"
            style={{ "--d": "1.0s" } as React.CSSProperties}
          >
            <span className="sr-only">Je construis des applications web pour les PME et startups africaines.</span>
            <span aria-hidden>
              Je construis {typed}
              <span className="caret" />
            </span>
          </p>

          <p className="hero-rise mt-5 max-w-[34rem] text-[1.02rem] leading-relaxed text-mist" style={{ "--d": "1.15s" } as React.CSSProperties}>
            React et Spring Boot côté code, MySQL et PostgreSQL côté données. Je livre des
            applications complètes pour les PME et startups africaines, du premier écran à la mise
            en ligne.
          </p>

          <div className="hero-rise mt-9 flex flex-wrap items-center gap-3" style={{ "--d": "1.3s" } as React.CSSProperties}>
            <a ref={ctaRef} href="#projects" className="btn btn-gold">
              Voir les projets
              <ArrowDown className="h-4 w-4" />
            </a>
            <a href="#contact" className="btn btn-ghost">
              Me contacter
            </a>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="btn btn-ghost !w-12 !px-0"
            >
              <Github className="h-[18px] w-[18px]" />
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="btn btn-ghost !w-12 !px-0"
            >
              <Linkedin className="h-[18px] w-[18px]" />
            </a>
          </div>

          <div
            className="hero-rise mt-6 flex items-center gap-3 text-[14px]"
            style={{ "--d": "1.38s" } as React.CSSProperties}
          >
            <a
              href={CV.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-mist transition-colors hover:text-gold"
            >
              <FileText className="h-4 w-4" />
              Voir mon CV
            </a>
            <span className="dia text-line" />
            <a
              href={CV.href}
              download={CV.fileName}
              className="inline-flex items-center gap-1.5 font-medium text-mist transition-colors hover:text-gold"
            >
              <Download className="h-4 w-4" />
              Télécharger
            </a>
          </div>

          <dl
            className="hero-rise mt-10 grid max-w-[36rem] grid-cols-2 gap-x-6 gap-y-7 border-t border-line pt-7 sm:grid-cols-4"
            style={{ "--d": "1.45s" } as React.CSSProperties}
          >
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col">
                <dt className="order-2 mt-1 text-[13px] leading-snug text-mist">{s.label}</dt>
                <dd className="font-display text-[2.6rem] font-bold leading-none tracking-tight [font-stretch:86%]">
                  <Counter value={s.value} />
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Portrait */}
        <div className="hero-rise relative mx-auto w-full max-w-[22rem] lg:ml-auto lg:mr-0 lg:max-w-[25rem]" style={{ "--d": "0.7s" } as React.CSSProperties}>
          <div
            ref={plateRef}
            aria-hidden
            className="absolute inset-0 translate-x-3.5 translate-y-3.5 bg-gold transition-transform duration-300 ease-out [clip-path:polygon(0_0,calc(100%-48px)_0,100%_48px,100%_100%,48px_100%,0_calc(100%-48px))]"
          />
          <div ref={portraitRef} className="relative transition-transform duration-300 ease-out will-change-transform">
            <div className="relative aspect-[4/5] overflow-hidden bg-deep [clip-path:polygon(0_0,calc(100%-48px)_0,100%_48px,100%_100%,48px_100%,0_calc(100%-48px))]">
              <img
                src={avatar}
                alt={`Portrait de ${PROFILE.shortName}`}
                width={1024}
                height={1280}
                loading="eager"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="absolute -bottom-5 -left-3 flex items-center gap-3 rounded-full border border-line bg-night/90 py-2.5 pl-4 pr-5 shadow-[0_18px_40px_-18px_rgb(0_0_0/0.8)] backdrop-blur-md sm:-left-8">
            <span className="relative flex h-2.5 w-2.5">
              <span className="ping-soft absolute inline-flex h-full w-full rounded-full bg-leaf" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-leaf" />
            </span>
            <span className="text-[14px] font-medium">Ouvert aux missions</span>
          </div>

          <div className="absolute -right-2 -top-5 rounded-2xl border border-line bg-night/90 px-4 py-2.5 text-right shadow-[0_18px_40px_-18px_rgb(0_0_0/0.8)] backdrop-blur-md sm:-right-6">
            <div className="text-[12px] text-mist">
              {PROFILE.city}, {PROFILE.country}
            </div>
            <div className="font-display text-xl font-semibold tabular-nums leading-tight" suppressHydrationWarning>
              {time ?? "--:--"}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
