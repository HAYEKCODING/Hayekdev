import { useEffect, useRef, useState } from "react";
import { ArrowUp, Menu, X } from "lucide-react";
import { NAV, PROFILE } from "@/data/portfolio";

/** Marque : un losange doré avec un cœur creux, comme dans le champ tissé du hero. */
function Mark() {
  return (
    <span aria-hidden className="relative inline-block h-[18px] w-[18px]">
      <span className="absolute inset-0 rotate-45 bg-gold" />
      <span className="absolute inset-[5px] rotate-45 bg-night" />
    </span>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const [showTop, setShowTop] = useState(false);
  const barRef = useRef<HTMLDivElement | null>(null);

  // Progression de lecture (fil d'or en haut de page) — sans re-render React
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (barRef.current) barRef.current.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
      setScrolled((v) => (v === y > 24 ? v : y > 24));
      setShowTop((v) => (v === y > 700 ? v : y > 700));
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
  }, []);

  // Section active
  useEffect(() => {
    const els = NAV.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    const hero = document.getElementById("home");
    const heroIo = new IntersectionObserver(([e]) => e.isIntersecting && setActive(""), {
      rootMargin: "-45% 0px -50% 0px",
    });
    if (hero) heroIo.observe(hero);
    return () => {
      io.disconnect();
      heroIo.disconnect();
    };
  }, []);

  // Menu mobile : bloque le défilement, Échap pour fermer
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <div
        ref={barRef}
        aria-hidden
        className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left scale-x-0 bg-gradient-to-r from-gold to-cobalt"
      />

      <nav
        aria-label="Navigation principale"
        className={`fixed inset-x-0 top-0 z-[60] transition-[background-color,border-color,backdrop-filter] duration-300 ${
          scrolled || open
            ? "border-b border-line/70 bg-night/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[4.25rem] max-w-[1200px] items-center justify-between px-6 lg:px-10">
          <a href="#home" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <Mark />
            <span className="font-display text-[1.15rem] font-bold tracking-tight [font-stretch:88%]">
              {PROFILE.shortName}
            </span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {NAV.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  aria-current={active === n.id ? "true" : undefined}
                  className={`group relative px-3.5 py-2 text-[14px] transition-colors ${
                    active === n.id ? "text-ivoire" : "text-mist hover:text-ivoire"
                  }`}
                >
                  {n.label}
                  <span
                    className={`absolute inset-x-3.5 -bottom-0.5 h-px origin-left bg-gold transition-transform duration-300 ${
                      active === n.id ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a href="#contact" className="btn btn-gold hidden !h-10 !px-5 !text-[14px] sm:inline-flex">
              Me contacter
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={open}
              aria-controls="menu-mobile"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ivoire transition-colors hover:border-gold md:hidden"
            >
              {open ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Menu mobile plein écran */}
      <div
        id="menu-mobile"
        hidden={!open}
        className="fixed inset-0 z-[55] bg-night pt-24 md:hidden"
      >
        <ul className="flex flex-col px-6">
          {NAV.map((n, i) => (
            <li key={n.href} className="border-b border-line/60">
              <a
                href={n.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between py-5 font-display text-[2.3rem] font-bold tracking-tight [font-stretch:84%]"
                style={{ animation: "menu-item .6s cubic-bezier(.2,.8,.2,1) both", animationDelay: `${0.05 + i * 0.06}s` }}
              >
                {n.label}
                <span className="dia text-gold" />
              </a>
            </li>
          ))}
        </ul>
        <div className="px-6 pt-8">
          <a href="#contact" onClick={() => setOpen(false)} className="btn btn-gold w-full">
            Me contacter
          </a>
        </div>
      </div>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Retour en haut"
        className={`fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-gold/60 bg-night/90 text-gold backdrop-blur transition-all duration-300 hover:bg-gold hover:text-night ${
          showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <ArrowUp className="h-[18px] w-[18px]" />
      </button>
    </>
  );
}
