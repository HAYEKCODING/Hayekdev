type DecorationArea = "home" | "about" | "skills" | "projects" | "journey" | "contact";
type Framework = "react" | "java" | "spring" | "html" | "css";

const DETAILS: Record<
  DecorationArea,
  {
    symbols: [string, string];
    tags: [string, string];
    frameworks: Framework[];
    technologies: string;
    binary: string;
  }
> = {
  home: {
    symbols: ["</>", "{}"],
    tags: ["<main>", "</main>"],
    frameworks: ["react", "java"],
    technologies: "React · Java",
    binary: "0101",
  },
  about: {
    symbols: ["{}", "[]"],
    tags: ["<section>", "</section>"],
    frameworks: ["java", "spring"],
    technologies: "Java · Spring Boot",
    binary: "1010",
  },
  skills: {
    symbols: ["</>", ";"],
    tags: ["<article>", "</article>"],
    frameworks: ["react", "html", "css"],
    technologies: "HTML · CSS · React",
    binary: "0101",
  },
  projects: {
    symbols: ["()", "[]"],
    tags: ["<project>", "</project>"],
    frameworks: ["react", "spring"],
    technologies: "React · Spring Boot",
    binary: "1010",
  },
  journey: {
    symbols: ["{}", ";"],
    tags: ["<main>", "</main>"],
    frameworks: ["java", "spring"],
    technologies: "Java · Spring Boot",
    binary: "0101",
  },
  contact: {
    symbols: ["</>", "()"],
    tags: ["<form>", "</form>"],
    frameworks: ["html", "css"],
    technologies: "HTML · CSS",
    binary: "1010",
  },
};

function FrameworkIcon({ framework }: { framework: Framework }) {
  if (framework === "react") {
    return (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <g stroke="currentColor" strokeWidth="1.5">
          <ellipse cx="16" cy="16" rx="13" ry="5" />
          <ellipse cx="16" cy="16" rx="13" ry="5" transform="rotate(60 16 16)" />
          <ellipse cx="16" cy="16" rx="13" ry="5" transform="rotate(120 16 16)" />
        </g>
        <circle cx="16" cy="16" r="2" fill="currentColor" />
      </svg>
    );
  }

  if (framework === "spring") {
    return (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path
          d="M26 5C16 5 7 9 7 18c0 5 4 8 8 8 8 0 12-10 11-21Z"
          fill="currentColor"
          opacity=".22"
        />
        <path d="M7 25c4-7 9-11 16-15M14 20l-1-6m6 1 4 1" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  }

  if (framework === "java") {
    return (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path
          d="M10 15h12v5a6 6 0 0 1-12 0v-5Zm12 2h3a3 3 0 0 1-3 4"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M12 25h10M14 11c-2-2 2-2 0-4m5 4c-2-2 2-2 0-4"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="m6 5 2 21 8 3 8-3 2-21H6Z" fill="currentColor" opacity=".18" />
      <path d="m10 11 1 12 5 2 5-2 1-12H10Z" stroke="currentColor" strokeWidth="1.5" />
      <path
        d={framework === "html" ? "M13 15h6m-5 4h4" : "M13 15h6m-6 4h5"}
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function PortfolioDecorations({ area }: { area: DecorationArea }) {
  const details = DETAILS[area];

  return (
    <div className={`portfolio-decoration portfolio-decoration--${area}`} aria-hidden="true">
      <span className="portfolio-decoration__grid" />
      <span className="portfolio-decoration__ring" />
      <span className="portfolio-decoration__line portfolio-decoration__line--diagonal" />
      <span className="portfolio-decoration__line portfolio-decoration__line--short" />
      <span className="portfolio-decoration__diamond" />
      <svg
        className="portfolio-decoration__curve"
        viewBox="0 0 260 150"
        fill="none"
        focusable="false"
      >
        <path d="M2 122C63 122 67 22 128 22s65 100 130 100" />
        <circle cx="128" cy="22" r="4" />
      </svg>
      <span className="portfolio-decoration__symbol portfolio-decoration__symbol--one">
        {details.symbols[0]}
      </span>
      <span className="portfolio-decoration__symbol portfolio-decoration__symbol--two">
        {details.symbols[1]}
      </span>
      <span className="portfolio-decoration__technology">{details.technologies}</span>
      <span className="portfolio-decoration__binary">{details.binary}</span>
      <span className="portfolio-decoration__tag portfolio-decoration__tag--one">
        {details.tags[0]}
      </span>
      <span className="portfolio-decoration__tag portfolio-decoration__tag--two">
        {details.tags[1]}
      </span>
      <span className="portfolio-decoration__frameworks">
        {details.frameworks.map((framework) => (
          <span key={framework} className="portfolio-decoration__framework">
            <FrameworkIcon framework={framework} />
            <span>{framework}</span>
          </span>
        ))}
      </span>
    </div>
  );
}
