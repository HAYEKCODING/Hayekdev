import { useRef } from "react";
import { ABOUT, PROFILE } from "@/data/portfolio";
import { DevStatus } from "./DevStatus";
import { useScrollProgress } from "./hooks";

export function About() {
  const leadRef = useRef<HTMLParagraphElement | null>(null);
  useScrollProgress(leadRef, { start: 0.82, end: 0.42 });
  const words = ABOUT.lead.split(" ");

  return (
    <section id="about" className="mx-auto max-w-[1200px] px-6 py-28 lg:px-10 lg:py-40">
      <div className="grid grid-cols-[minmax(0,1fr)] gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <div className="lg:sticky lg:top-28">
          <h2 className="h-section">{ABOUT.title}</h2>
          <div className="mt-10 hidden lg:block">
            <DevStatus />
          </div>
        </div>

        <div>
          {/* Les mots s'allument au fil de la lecture */}
          <p
            ref={leadRef}
            className="words font-display text-[clamp(1.5rem,2.6vw,2.15rem)] font-medium leading-[1.28] tracking-[-0.01em] [font-stretch:92%]"
            style={{ "--n": words.length } as React.CSSProperties}
          >
            {words.map((w, i) => (
              <span key={i} className="word" style={{ "--i": i } as React.CSSProperties}>
                {w}{" "}
              </span>
            ))}
          </p>

          <div className="mt-10 max-w-[38rem] space-y-5 text-[1.02rem] leading-[1.75] text-mist">
            {ABOUT.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p className="text-[14px]">
              Nom complet : <span className="text-ivoire">{PROFILE.fullName}</span>
            </p>
          </div>

          <ul className="mt-8 flex flex-wrap gap-2">
            {ABOUT.interests.map((it) => (
              <li key={it} className="rounded-full border border-line px-3 py-1 text-[13px] text-mist">
                {it}
              </li>
            ))}
            {ABOUT.languages.map((l) => (
              <li key={l.lang} className="rounded-full border border-line px-3 py-1 text-[13px] text-mist">
                {l.lang} · {l.level}
              </li>
            ))}
          </ul>

          <dl className="mt-14 grid grid-cols-[minmax(0,1fr)] gap-8 border-t border-line pt-8 sm:grid-cols-3">
            {ABOUT.values.map((v) => (
              <div key={v.title}>
                <dt className="flex items-center gap-2.5 font-display text-xl font-bold [font-stretch:88%]">
                  <span className="dia text-gold" />
                  {v.title}
                </dt>
                <dd className="mt-2 text-[14.5px] leading-relaxed text-mist">{v.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
