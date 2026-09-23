import { useState } from "react";
import { ArrowUpRight, Github, Linkedin, Mail, MapPin, MessageCircle, Phone, type LucideIcon } from "lucide-react";
import { PROFILE } from "@/data/portfolio";
import { useMagnetic } from "./hooks";

const ROWS: { label: string; value: string; href?: string; icon: LucideIcon }[] = [
  { label: "Email", value: PROFILE.email, href: `mailto:${PROFILE.email}`, icon: Mail },
  { label: "Téléphone", value: PROFILE.phone, href: `tel:+${PROFILE.whatsapp}`, icon: Phone },
  { label: "Localisation", value: `${PROFILE.city}, ${PROFILE.country}`, icon: MapPin },
  { label: "GitHub", value: PROFILE.githubHandle, href: PROFILE.github, icon: Github },
  { label: "LinkedIn", value: PROFILE.linkedinLabel, href: PROFILE.linkedin, icon: Linkedin },
];

/**
 * Formulaire sans serveur : il prépare le message puis l'ouvre dans WhatsApp
 * (le canal le plus utilisé en Côte d'Ivoire) ou dans le client mail de la personne.
 */
function ContactForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const waRef = useMagnetic<HTMLButtonElement>(0.18);

  const compose = () => {
    const n = name.trim();
    const m = message.trim();
    if (!n || !m) {
      setError("Ajoutez votre nom et un court message pour continuer.");
      return null;
    }
    setError("");
    return `Bonjour ${PROFILE.shortName.split(" ")[0]}, je m'appelle ${n}. ${m}`;
  };

  const sendWhatsApp = () => {
    const text = compose();
    if (!text) return;
    window.open(`https://wa.me/${PROFILE.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  };
  const sendEmail = () => {
    const text = compose();
    if (!text) return;
    window.location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent(
      `Projet : message de ${name.trim()}`,
    )}&body=${encodeURIComponent(text)}`;
  };

  const field =
    "mt-2 w-full rounded-xl border border-line bg-night/70 px-4 py-3.5 text-[1rem] text-ivoire placeholder:text-mist/60 transition-colors focus:border-gold focus:outline-none";

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="c-name" className="text-[14px] font-medium">
          Votre nom
        </label>
        <input
          id="c-name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Awa Koné"
          className={field}
        />
      </div>
      <div>
        <label htmlFor="c-msg" className="text-[14px] font-medium">
          Votre projet en quelques lignes
        </label>
        <textarea
          id="c-msg"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Je voudrais une boutique en ligne avec paiement Mobile Money…"
          className={`${field} resize-y`}
        />
      </div>
      {error && (
        <p role="alert" className="text-[14px] text-ember">
          {error}
        </p>
      )}
      <div className="flex flex-wrap gap-3">
        <button ref={waRef} type="button" onClick={sendWhatsApp} className="btn btn-gold">
          <MessageCircle className="h-[18px] w-[18px]" />
          Écrire sur WhatsApp
        </button>
        <button type="button" onClick={sendEmail} className="btn btn-ghost">
          <Mail className="h-[18px] w-[18px]" />
          Envoyer par email
        </button>
      </div>
      <p className="text-[13px] text-mist">Le message s'ouvre dans l'application choisie, prêt à envoyer.</p>
    </div>
  );
}

export function Contact() {
  return (
    <section id="contact" className="border-t border-line/60 bg-deep/40">
      <div className="mx-auto max-w-[1200px] px-6 py-28 lg:px-10 lg:py-40">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-24">
          <div>
            <h2 className="font-display text-[clamp(3rem,8vw,6.6rem)] font-extrabold leading-[0.92] tracking-[-0.035em] [font-stretch:84%]">
              Parlons de votre projet.
            </h2>
            <p className="mt-7 max-w-md text-[1.05rem] leading-relaxed text-mist">
              Disponible pour missions freelance, stages, CDI ou toute collaboration technique.
              Réponse sous 24 h ouvrées.
            </p>

            <ul className="mt-12 border-b border-line">
              {ROWS.map((r) => {
                const Icon = r.icon;
                const inner = (
                  <>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-gold transition-colors group-hover:border-gold">
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[13px] text-mist">{r.label}</span>
                      <span className="block truncate text-[1.02rem] font-medium">{r.value}</span>
                    </span>
                    {r.href && (
                      <ArrowUpRight className="h-[18px] w-[18px] text-mist transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold" />
                    )}
                  </>
                );
                return (
                  <li key={r.label} className="border-t border-line">
                    {r.href ? (
                      <a
                        href={r.href}
                        target={r.href.startsWith("http") ? "_blank" : undefined}
                        rel="noreferrer"
                        className="group flex items-center gap-4 py-4"
                      >
                        {inner}
                      </a>
                    ) : (
                      <div className="group flex items-center gap-4 py-4">{inner}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="rounded-[26px] border border-line bg-night/60 p-6 sm:p-9">
            <h3 className="h-card mb-7 text-[1.7rem]">Écrivez-moi</h3>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
