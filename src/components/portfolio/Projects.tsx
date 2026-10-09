import { ArrowUpRight, Check, Github } from "lucide-react";
import { PROJECTS, type Project } from "@/data/portfolio";
import { ProjectMock } from "./Mocks";
import { tiltHandlers } from "./hooks";

const STATUS_STYLE: Record<Project["status"], string> = {
  "En cours": "bg-gold/15 text-gold",
  "Livré": "bg-leaf/15 text-leaf",
  "Expérience pro": "bg-cobalt/15 text-cobalt",
};

function Status({ status }: { status: Project["status"] }) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[13px] font-medium ${STATUS_STYLE[status]}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

function Tags({ tags }: { tags: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((t) => (
        <li key={t} className="rounded-full border border-line px-3 py-1 text-[13px] text-mist">
          {t}
        </li>
      ))}
    </ul>
  );
}

/** Liste de fonctionnalités avec une puce en forme de coche : le detail « produit » du projet. */
function Features({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((f) => (
        <li key={f} className="flex items-start gap-2.5 text-[14.5px] leading-snug text-mist">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-leaf" />
          {f}
        </li>
      ))}
    </ul>
  );
}

function Links({ p }: { p: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
      {p.live && (
        <a href={p.live} target="_blank" rel="noreferrer" className="btn btn-gold !h-11">
          Voir la démo
          <ArrowUpRight className="h-4 w-4" />
        </a>
      )}
      <a
        href={p.href}
        target="_blank"
        rel="noreferrer"
        className="group inline-flex items-center gap-2 text-[15px] font-semibold text-ivoire transition-colors hover:text-gold"
      >
        <Github className="h-4 w-4" />
        Voir le code sur GitHub
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </a>
    </div>
  );
}

function Featured({ p }: { p: Project }) {
  const h = tiltHandlers();
  return (
    <article
      {...h}
      className="spot grid grid-cols-[minmax(0,1fr)] gap-10 overflow-hidden rounded-[28px] border border-line bg-deep/70 p-6 sm:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14 lg:p-14"
    >
      <div className="flex flex-col justify-center">
        <div className="mb-7 flex flex-wrap items-center gap-3">
          <Status status={p.status} />
          <span className="text-[14px] text-mist">Projet phare</span>
        </div>
        <h3 className="h-card text-[clamp(2.4rem,4.6vw,3.8rem)]">{p.name}</h3>
        <p className="mt-2 text-[1.1rem] font-medium text-ivoire/90">{p.short}</p>

        {p.problem && p.solution ? (
          <div className="mt-6 max-w-[30rem] space-y-4">
            <div>
              <p className="text-[13px] font-semibold uppercase tracking-wide text-gold">Le problème</p>
              <p className="mt-1.5 leading-relaxed text-mist">{p.problem}</p>
            </div>
            <div>
              <p className="text-[13px] font-semibold uppercase tracking-wide text-gold">La solution</p>
              <p className="mt-1.5 leading-relaxed text-mist">{p.solution}</p>
            </div>
          </div>
        ) : (
          <p className="mt-5 max-w-[30rem] leading-relaxed text-mist">{p.desc}</p>
        )}

        {p.features && (
          <div className="mt-6 max-w-[30rem]">
            <p className="mb-3 text-[13px] font-semibold uppercase tracking-wide text-gold">Fonctionnalités clés</p>
            <Features items={p.features} />
          </div>
        )}

        <div className="mt-7">
          <Tags tags={p.tags} />
        </div>

        <p className="mt-6 max-w-[30rem] text-[14px] italic leading-relaxed text-mist/80">{p.role}</p>

        <div className="mt-8">
          <Links p={p} />
        </div>
      </div>

      <div className="flex min-w-0 flex-col justify-center">
        <div data-tilt className="tilt">
          <ProjectMock kind={p.mock} label={`Aperçu illustratif de l'interface ${p.name}`} />
        </div>
        <p className="mt-4 text-center text-[13px] text-mist/80">Aperçu illustratif de l'interface</p>
      </div>
    </article>
  );
}

function Card({ p }: { p: Project }) {
  const h = tiltHandlers();
  return (
    <article {...h} className="spot flex flex-col rounded-[22px] border border-line bg-deep/70 p-5 sm:p-6">
      <div data-tilt className="tilt [&_.mock]:min-h-[240px]">
        <ProjectMock kind={p.mock} label={`Aperçu illustratif de l'interface ${p.name}`} />
      </div>
      <div className="mt-6 flex flex-1 flex-col">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <Status status={p.status} />
          <span className="text-[13px] text-mist">{p.type}</span>
        </div>
        <h3 className="h-card text-[1.7rem]">{p.name}</h3>
        <p className="mt-1 text-[15px] font-medium text-ivoire/90">{p.short}</p>
        <p className="mt-4 text-[15px] leading-relaxed text-mist">{p.solution ?? p.desc}</p>

        {p.features && (
          <div className="mt-4">
            <Features items={p.features.slice(0, 3)} />
          </div>
        )}

        <div className="mt-5">
          <Tags tags={p.tags} />
        </div>

        <p className="mt-5 text-[13.5px] italic leading-relaxed text-mist/80">{p.role}</p>

        <div className="mt-auto pt-7">
          <Links p={p} />
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  const featured = PROJECTS.find((p) => p.featured);
  const others = PROJECTS.filter((p) => !p.featured);
  return (
    <section id="projects" className="border-t border-line/60">
      <div className="mx-auto max-w-[1200px] px-6 py-28 lg:px-10 lg:py-36">
        <div className="mb-14 max-w-2xl">
          <h2 className="h-section">Projets récents</h2>
          <p className="mt-5 text-[1.05rem] leading-relaxed text-mist">
            Des applications conçues de A à Z : interface soignée, logique métier solide et
            technologies modernes.
          </p>
        </div>

        <div className="space-y-6 lg:space-y-8">
          {featured && <Featured p={featured} />}
          <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-3 lg:gap-8">
            {others.map((p) => (
              <Card key={p.name} p={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
