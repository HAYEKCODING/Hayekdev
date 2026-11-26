import { useEffect, useRef } from "react";
import { Award } from "lucide-react";
import { CERTIFICATIONS, EDUCATION, EXPERIENCE, type TimelineItem } from "@/data/portfolio";
import { useScrollProgress } from "./hooks";
import { PortfolioDecorations } from "./PortfolioDecorations";

/**
 * Timeline avec un fil qui se tisse pendant le défilement.
 * Chaque étape s'allume (losange doré) quand le fil l'atteint.
 */
function Column({ title, items }: { title: string; items: TimelineItem[] }) {
  const ref = useRef<HTMLDivElement | null>(null);

  const sync = () => {
    const root = ref.current;
    if (!root) return;
    const p = parseFloat(root.style.getPropertyValue("--p") || "0");
    const h = root.getBoundingClientRect().height;
    const reach = p * h;
    root.querySelectorAll<HTMLElement>("[data-step]").forEach((el) => {
      const on = el.offsetTop + 14 <= reach + 8 ? "1" : "0";
      if (el.dataset.on !== on) el.dataset.on = on;
    });
  };

  useScrollProgress(ref, { start: 0.7, end: 0.35, onProgress: sync });
  useEffect(() => {
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  return (
    <div>
      <h3 className="h-card mb-9 text-[1.6rem]">{title}</h3>
      <div ref={ref} className="thread">
        <div aria-hidden className="thread-fill" />
        <ol className="space-y-11">
          {items.map((it) => (
            <li key={it.role + it.date} data-step data-on="0" className="relative">
              <span aria-hidden className="thread-dot" />
              <p className="text-[14px] font-medium text-gold">{it.date}</p>
              <h4 className="mt-1 font-display text-[1.3rem] font-bold leading-snug tracking-tight [font-stretch:90%]">
                {it.role}
              </h4>
              <p className="mt-0.5 text-[15px] font-medium text-ivoire/90">{it.org}</p>
              <p className="mt-3 max-w-[34rem] text-[15px] leading-relaxed text-mist">{it.desc}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {it.tags.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-line px-3 py-1 text-[13px] text-mist"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export function Journey() {
  return (
    <section
      id="experience"
      className="portfolio-section relative isolate border-t border-line/60 bg-deep/40"
    >
      <PortfolioDecorations area="journey" />
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 py-28 lg:px-10 lg:py-36">
        <div className="mb-16 max-w-2xl">
          <h2 className="h-section">Expérience et formation</h2>
          <p className="mt-5 text-[1.05rem] leading-relaxed text-mist">
            Une licence, un BTS, deux stages et trois certifications : un parcours tourné vers la
            pratique.
          </p>
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)] gap-16 lg:grid-cols-2 lg:gap-20">
          <Column title="Expérience professionnelle" items={EXPERIENCE} />
          <Column title="Formation académique" items={EDUCATION} />
        </div>

        <div className="mt-20 border-t border-line pt-14">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h3 className="h-card text-[1.6rem]">Certifications</h3>
            <p className="text-[14px] text-mist">Cours en ligne validés · 2026</p>
          </div>
          <ul className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CERTIFICATIONS.map((c) => (
              <li
                key={c.title}
                className="flex flex-col rounded-2xl border border-line bg-night/70 p-6 transition-colors duration-300 hover:border-gold/50"
              >
                <span className="flex items-center gap-2 text-[12.5px] font-medium uppercase tracking-[0.14em] text-gold">
                  <Award aria-hidden className="h-4 w-4" />
                  Certificat de réussite
                </span>
                <h4 className="mt-3 font-display text-[1.15rem] font-bold leading-snug tracking-tight [font-stretch:90%]">
                  {c.title}
                </h4>
                <p className="mt-3 text-[13px] text-mist">{c.area}</p>
                <p className="mt-auto pt-4 text-[14px] font-medium text-ivoire/90">{c.date}</p>
                {c.id && (
                  <p className="mt-1 break-all font-mono text-[11.5px] text-mist/80">N° {c.id}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
