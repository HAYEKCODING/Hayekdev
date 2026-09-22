import { ARCHITECTURE } from "@/data/portfolio";
import { useInView } from "./hooks";

/**
 * Une fonctionnalité voyage de l'écran à la mise en ligne : un point doré parcourt
 * le rail et allume chaque étape à son passage. Ici l'ordre compte (c'est un parcours),
 * donc les étapes sont numérotées.
 */
export function Architecture() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.25 });
  const CYCLE = 7; // secondes — doit rester égal à la durée dans styles.css

  return (
    <section aria-labelledby="arch-title" className="border-t border-line/60">
      <div className="mx-auto max-w-[1200px] px-6 py-28 lg:px-10 lg:py-36">
        <div className="mb-16 max-w-2xl">
          <h2 id="arch-title" className="h-section">
            Comment je conçois une application
          </h2>
          <p className="mt-5 text-[1.05rem] leading-relaxed text-mist">
            Une approche full stack structurée, du premier écran jusqu'à la mise en ligne.
          </p>
        </div>

        <div ref={ref} data-run={inView} className="flow">
          <ol className="grid grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-5 md:gap-0">
            {ARCHITECTURE.map((step, i) => {
              const delay = `${(0.2 * i - 0.06) * CYCLE}s`;
              return (
                <li key={step.title} className="md:px-2">
                  <div
                    className="flow-node h-full rounded-2xl border border-line bg-deep/70 p-5"
                    style={{ "--delay": delay } as React.CSSProperties}
                  >
                    <div className="mb-3 flex h-7 w-7 items-center justify-center rounded-full border border-line text-[13px] font-semibold text-gold">
                      {i + 1}
                    </div>
                    <h3 className="h-card text-[1.3rem]">{step.title}</h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-mist">{step.text}</p>
                  </div>
                </li>
              );
            })}
          </ol>

          {/* Rail (desktop) : une rangée à part, donc alignée par construction sur les cinq colonnes */}
          <div aria-hidden className="relative mt-8 hidden h-4 md:block">
            <div className="absolute inset-x-[10%] top-1/2 h-px bg-line" />
            {ARCHITECTURE.map((step, i) => (
              <span
                key={step.title}
                className="flow-station absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-line"
                style={{ left: `${10 + 20 * i}%`, "--delay": `${(0.2 * i - 0.06) * CYCLE}s` } as React.CSSProperties}
              />
            ))}
            <span className="flow-packet absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-gold shadow-[0_0_24px_6px_rgb(245_180_27/0.55)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
