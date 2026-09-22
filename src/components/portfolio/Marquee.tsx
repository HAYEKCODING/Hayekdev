import { MARQUEE } from "@/data/portfolio";

function Row({ reverse = false, dur = 70 }: { reverse?: boolean; dur?: number }) {
  return (
    <div className="marquee marquee-mask overflow-hidden">
      <div className={`marquee-track ${reverse ? "reverse" : ""}`} style={{ "--dur": `${dur}s` } as React.CSSProperties}>
        {[0, 1].map((dup) => (
          <ul key={dup} aria-hidden={dup === 1} className="flex shrink-0 items-center">
            {MARQUEE.map((t) => (
              <li key={t} className="flex items-center">
                <span
                  className={`outline-text px-7 font-display font-extrabold tracking-tight [font-stretch:84%] ${
                    reverse ? "text-[clamp(1.6rem,3.2vw,2.6rem)]" : "text-[clamp(3rem,7.5vw,6.5rem)] leading-[1.05]"
                  }`}
                >
                  {t}
                </span>
                <span className="dia text-gold" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

/** Bandeau de technologies : deux rangées en sens opposés, en contour. Pause au survol. */
export function Marquee() {
  return (
    <section aria-label="Technologies utilisées" className="border-y border-line/60 bg-deep/40 py-8">
      <Row dur={75} />
      <div className="h-3" />
      <Row reverse dur={90} />
    </section>
  );
}
