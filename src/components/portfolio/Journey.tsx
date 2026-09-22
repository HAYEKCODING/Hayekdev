import { useEffect, useRef } from "react";
import { EDUCATION, EXPERIENCE, type TimelineItem } from "@/data/portfolio";
import { useScrollProgress } from "./hooks";

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
                  <li key={t} className="rounded-full border border-line px-3 py-1 text-[13px] text-mist">
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
    <section id="experience" className="border-t border-line/60 bg-deep/40">
      <div className="mx-auto max-w-[1200px] px-6 py-28 lg:px-10 lg:py-36">
        <div className="mb-16 max-w-2xl">
          <h2 className="h-section">Expérience et formation</h2>
          <p className="mt-5 text-[1.05rem] leading-relaxed text-mist">
            Un parcours académique solide, complété par une expérience backend réelle en
            entreprise.
          </p>
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)] gap-16 lg:grid-cols-2 lg:gap-20">
          <Column title="Expérience professionnelle" items={EXPERIENCE} />
          <Column title="Formation académique" items={EDUCATION} />
        </div>
      </div>
    </section>
  );
}
