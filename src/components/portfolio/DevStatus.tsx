import { STATUS_LINES } from "@/data/portfolio";
import { useInView } from "./hooks";

const n = (i: number) => ({ "--n": i }) as React.CSSProperties;

/**
 * Petit détail de développeur pour la section « À propos » : un terminal qui affiche
 * quelques lignes réelles (formation, centres d'intérêt, statut). Réutilise les classes
 * .mock / .tm / .tm-line déjà définies pour l'aperçu du projet Synelia.
 */
export function DevStatus() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.3 });
  return (
    <div ref={ref} className="mock max-w-[26rem]" data-run={inView} aria-hidden>
      <div className="mock-bar">
        <i />
        <i />
        <i />
        <span>~/mouhammad</span>
      </div>
      <div className="tm space-y-2.5 p-4">
        {STATUS_LINES.map((l, i) => (
          <div key={l.cmd} className="tm-line" style={n(i)}>
            <div className="text-gold">
              <span className="text-mist">$</span> {l.cmd}
            </div>
            <div className="mt-0.5 text-ivoire/90">{l.out}</div>
          </div>
        ))}
        <div className="tm-line" style={n(STATUS_LINES.length)}>
          <span className="text-gold">$</span>
          <span className="caret !h-3.5" />
        </div>
      </div>
    </div>
  );
}
