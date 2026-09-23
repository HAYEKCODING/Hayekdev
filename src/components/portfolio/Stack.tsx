import { SKILLS } from "@/data/portfolio";

export function Stack() {
  return (
    <section id="skills" className="border-t border-line/60 bg-deep/40">
      <div className="mx-auto max-w-[1200px] px-6 py-28 lg:px-10 lg:py-36">
        <div className="mb-16 max-w-2xl">
          <h2 className="h-section">Compétences et technologies</h2>
          <p className="mt-5 text-[1.05rem] leading-relaxed text-mist">
            Un stack complet pour concevoir des applications robustes, de l'interface jusqu'à la
            base de données.
          </p>
        </div>

        <div className="border-b border-line">
          {SKILLS.map((sk) => (
            <div
              key={sk.label}
              className="skill-row grid grid-cols-[minmax(0,1fr)] gap-4 border-t border-line py-8 transition-colors hover:bg-night/40 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] md:gap-10 md:px-4"
            >
              <div>
                <h3 className="h-card text-[1.55rem]">{sk.label}</h3>
                <p className="mt-1 text-[14px] text-mist">{sk.title}</p>
              </div>
              <ul className="flex flex-wrap content-start gap-x-8 gap-y-3">
                {sk.items.map((item, i) => (
                  <li key={item} className="flex items-center gap-3 text-[1.05rem]" style={{ "--i": i } as React.CSSProperties}>
                    <span className="dia" style={{ "--i": i } as React.CSSProperties} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
