import { ArrowUpRight } from "lucide-react";
import { SERVICES } from "@/data/portfolio";

export function Services() {
  return (
    <section id="services" className="border-t border-line/60">
      <div className="mx-auto max-w-[1200px] px-6 py-28 lg:px-10 lg:py-36">
        <div className="mb-16 max-w-2xl">
          <h2 className="h-section">Ce que je peux construire pour vous</h2>
          <p className="mt-5 text-[1.05rem] leading-relaxed text-mist">
            Des solutions sur mesure, pensées pour l'usage réel et adaptées au marché africain.
          </p>
        </div>

        <ul className="svc-list border-b border-line">
          {SERVICES.map((s) => (
            <li key={s.title} className="svc group relative border-t border-line">
              <a
                href="#contact"
                className="grid grid-cols-[minmax(0,1fr)] items-center gap-3 py-8 md:grid-cols-[minmax(0,6fr)_minmax(0,5fr)_auto] md:gap-10 md:py-10"
              >
                <h3 className="h-card text-[clamp(1.7rem,3.2vw,2.6rem)] transition-transform duration-500 ease-out md:group-hover:translate-x-2">
                  {s.title}
                </h3>
                <p className="text-[15.5px] leading-relaxed text-mist md:max-w-md">{s.desc}</p>
                <span className="hidden h-12 w-12 items-center justify-center rounded-full border border-line text-gold transition-colors md:flex">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </a>
              <span aria-hidden className="svc-line absolute -bottom-px left-0 h-[2px] w-full bg-gold" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
