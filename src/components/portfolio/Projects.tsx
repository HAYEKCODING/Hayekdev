import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
  type RefObject,
} from "react";
import { ArrowUpRight, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { PROJECTS, type Project } from "@/data/portfolio";
import { ProjectMock } from "./Mocks";
import { PortfolioDecorations } from "./PortfolioDecorations";

const STATUS_STYLE: Record<Project["status"], string> = {
  "En cours": "project-status--progress",
  Livré: "project-status--delivered",
  "Expérience pro": "project-status--experience",
};

function Status({ status }: { status: Project["status"] }) {
  return (
    <span className={`project-status ${STATUS_STYLE[status]}`}>
      <span className="project-status-dot" aria-hidden />
      {status}
    </span>
  );
}

function Tags({ tags }: { tags: string[] }) {
  if (tags.length === 0) {
    return <p className="project-tags-empty">Technologies non renseignées</p>;
  }

  return (
    <ul className="project-tags">
      {tags.map((tag) => (
        <li key={tag}>{tag}</li>
      ))}
    </ul>
  );
}

function ProjectPreview({ project, visible }: { project: Project; visible: boolean }) {
  if (!visible) {
    return <div className="project-preview project-preview--placeholder" aria-hidden />;
  }

  if (!project.live) {
    return (
      <ProjectMock
        kind={project.mock}
        label={`Aperçu illustratif de l'expérience ${project.name}`}
      />
    );
  }

  return (
    <div className="project-preview">
      <iframe
        src={project.live}
        title={`Aperçu de l'interface ${project.name}`}
        loading="lazy"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

function DiscoverLink({ project, active }: { project: Project; active: boolean }) {
  if (!active) {
    return (
      <span className="btn btn-primary project-discover" aria-hidden="true">
        Découvrir le projet
        <ArrowUpRight className="h-4 w-4" />
      </span>
    );
  }

  if (!project.live) {
    return (
      <button
        type="button"
        className="btn btn-ghost project-discover"
        disabled
        aria-label={`${project.name} : aucune démo publique`}
      >
        Découvrir le projet
        <ArrowUpRight className="h-4 w-4" />
      </button>
    );
  }

  return (
    <a
      href={project.live}
      target="_blank"
      rel="noreferrer"
      className="btn btn-primary project-discover"
    >
      Découvrir le projet
      <ArrowUpRight className="h-4 w-4" />
    </a>
  );
}

function ProjectCard({
  project,
  offset,
  onSelect,
  activeCardRef,
}: {
  project: Project;
  offset: number;
  onSelect: () => void;
  activeCardRef: RefObject<HTMLElement | null>;
}) {
  const distance = Math.abs(offset);
  const isActive = distance === 0;
  const isAdjacent = distance === 1;
  const style: CSSProperties = {
    zIndex: 10 - distance,
    opacity: distance <= 1 ? 1 - distance * 0.18 : 0,
    transform: `translate3d(calc(-50% + ${offset * 78}%), 0, ${-distance * 90}px) rotateY(${-offset * 7}deg) scale(${1 - distance * 0.1})`,
  };

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (!isAdjacent || (event.key !== "Enter" && event.key !== " ")) return;
    event.preventDefault();
    onSelect();
  }

  return (
    <article
      ref={isActive ? activeCardRef : undefined}
      className={`project-carousel-card${isActive ? " is-active" : ""}${isAdjacent ? " is-adjacent" : ""}${!isActive && !isAdjacent ? " is-hidden" : ""}`}
      style={style}
      role={isActive ? "group" : "button"}
      aria-label={
        isActive
          ? `${project.name}, projet ${project.status}`
          : `Afficher le projet ${project.name}`
      }
      aria-roledescription={isActive ? "carte de projet" : undefined}
      aria-current={isActive ? "true" : undefined}
      aria-hidden={!isActive && !isAdjacent}
      inert={!isActive && !isAdjacent}
      tabIndex={isAdjacent ? 0 : -1}
      onClick={() => {
        if (!isActive) onSelect();
      }}
      onKeyDown={handleKeyDown}
    >
      <div className="project-carousel-visual">
        <ProjectPreview project={project} visible={isActive || isAdjacent} />
        <p className="project-preview-caption">
          {project.live ? "Aperçu de l'interface en ligne" : "Aperçu illustratif"}
        </p>
      </div>

      <div className="project-carousel-content">
        <div className="project-carousel-meta">
          <Status status={project.status} />
          <span>{project.type}</span>
        </div>
        <div>
          <h3 className="project-carousel-title">{project.name}</h3>
          <p className="project-carousel-short">{project.short}</p>
        </div>
        <p className="project-carousel-description">{project.solution ?? project.desc}</p>
        {project.problem && (
          <details className="project-carousel-context">
            <summary>Voir le contexte du projet</summary>
            <p>{project.problem}</p>
          </details>
        )}
        {project.features && (
          <ul className="project-carousel-features">
            {project.features.slice(0, 3).map((feature) => (
              <li key={feature}>
                <Check aria-hidden className="h-4 w-4 shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}
        <Tags tags={project.tags} />
        <p className="project-carousel-role">{project.role}</p>
        <DiscoverLink project={project} active={isActive} />
      </div>
    </article>
  );
}

export function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(true);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const activeCardRef = useRef<HTMLElement | null>(null);
  const total = PROJECTS.length;

  useEffect(() => {
    const updateVisibility = () => setIsPageVisible(document.visibilityState === "visible");
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (isHovered || !isPageVisible || prefersReducedMotion || total < 2) return;

    const timeout = window.setTimeout(() => {
      setActiveIndex((index) => (index + 1) % total);
    }, 4500);
    return () => window.clearTimeout(timeout);
  }, [activeIndex, isHovered, isPageVisible, prefersReducedMotion, total]);

  useEffect(() => {
    const stage = stageRef.current;
    const card = activeCardRef.current;
    if (!stage || !card) return;

    const fitActiveCard = () => {
      stage.style.removeProperty("min-height");
      const minimumHeight = Number.parseFloat(window.getComputedStyle(stage).minHeight);
      const cardHeight = card.offsetHeight + 20;
      stage.style.minHeight = `${Math.max(minimumHeight, cardHeight)}px`;
    };

    const observer = new ResizeObserver(fitActiveCard);
    observer.observe(card);
    window.addEventListener("resize", fitActiveCard);
    fitActiveCard();

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", fitActiveCard);
    };
  }, [activeIndex]);

  function move(direction: number) {
    setActiveIndex((index) => (index + direction + total) % total);
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch") {
      touchStart.current = { x: event.clientX, y: event.clientY };
    }
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start || event.pointerType !== "touch") return;

    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;
    if (Math.abs(deltaX) > 48 && Math.abs(deltaX) > Math.abs(deltaY)) {
      move(deltaX < 0 ? 1 : -1);
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      move(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      move(-1);
    }
  }

  return (
    <section id="projects" className="portfolio-section relative isolate border-t border-line/60">
      <PortfolioDecorations area="projects" />
      <div className="relative z-10 mx-auto max-w-[1200px] px-4 py-20 sm:px-6 sm:py-28 lg:px-10 lg:py-36">
        <div className="mb-10 max-w-2xl sm:mb-14">
          <h2 className="h-section">Projets concrets</h2>
          <p className="mt-5 text-[1.05rem] leading-relaxed text-mist">
            Des applications conçues de A à Z : interface soignée, logique métier solide et
            technologies modernes.
          </p>
        </div>

        <div
          className="project-carousel"
          role="region"
          aria-roledescription="carrousel"
          aria-label="Projets concrets"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            ref={stageRef}
            className="project-carousel-stage"
            tabIndex={0}
            aria-label="Utilisez les flèches du clavier ou faites glisser pour parcourir les projets"
            onKeyDown={handleKeyDown}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={() => {
              touchStart.current = null;
            }}
          >
            {PROJECTS.map((project, index) => {
              const relativeIndex = (index - activeIndex + total) % total;
              const offset = relativeIndex > total / 2 ? relativeIndex - total : relativeIndex;

              return (
                <ProjectCard
                  key={project.name}
                  project={project}
                  offset={offset}
                  onSelect={() => setActiveIndex(index)}
                  activeCardRef={activeCardRef}
                />
              );
            })}
          </div>

          <div className="project-carousel-controls">
            <button
              type="button"
              className="project-carousel-arrow"
              aria-label="Projet précédent"
              onClick={() => move(-1)}
            >
              <ChevronLeft aria-hidden className="h-5 w-5" />
            </button>
            <div className="project-carousel-pagination" aria-label="Choisir un projet">
              {PROJECTS.map((project, index) => (
                <button
                  key={project.name}
                  type="button"
                  className={`project-carousel-dot${index === activeIndex ? " is-active" : ""}`}
                  aria-label={`Afficher ${project.name}`}
                  aria-current={index === activeIndex ? "true" : undefined}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>
            <span className="project-carousel-count" aria-live="polite" aria-atomic="true">
              {String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <button
              type="button"
              className="project-carousel-arrow"
              aria-label="Projet suivant"
              onClick={() => move(1)}
            >
              <ChevronRight aria-hidden className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
