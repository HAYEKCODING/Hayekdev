import { FileText, Github, Linkedin, Mail } from "lucide-react";
import { CV, PROFILE } from "@/data/portfolio";

export function Footer() {
  const links = [
    { href: PROFILE.github, label: "GitHub", Icon: Github },
    { href: PROFILE.linkedin, label: "LinkedIn", Icon: Linkedin },
    { href: `mailto:${PROFILE.email}`, label: "Email", Icon: Mail },
    { href: CV.href, label: "CV", Icon: FileText },
  ];
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-6 px-6 py-10 sm:flex-row lg:px-10">
        <div className="flex items-center gap-3">
          <span aria-hidden className="relative inline-block h-[14px] w-[14px]">
            <span className="absolute inset-0 rotate-45 bg-gold" />
            <span className="absolute inset-[4px] rotate-45 bg-night" />
          </span>
          <div className="leading-tight">
            <span className="block font-display text-lg font-bold [font-stretch:88%]">{PROFILE.shortName}</span>
            <span className="block text-[12px] tracking-[0.14em] text-mist">{PROFILE.brand}</span>
          </div>
        </div>
        <ul className="flex items-center gap-2">
          {links.map(({ href, label, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target={href.startsWith("http") || href.endsWith(".pdf") ? "_blank" : undefined}
                rel="noreferrer"
                aria-label={label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-mist transition-colors hover:border-gold hover:text-gold"
              >
                <Icon className="h-[17px] w-[17px]" />
              </a>
            </li>
          ))}
        </ul>
        <p className="text-[13px] text-mist">
          © {new Date().getFullYear()} {PROFILE.shortName}. Conçu et développé à {PROFILE.city}.
        </p>
      </div>
    </footer>
  );
}
