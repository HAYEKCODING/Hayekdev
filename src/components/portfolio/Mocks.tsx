import type { CSSProperties } from "react";
import { Check, Search, ShoppingBag } from "lucide-react";
import type { MockKind } from "@/data/portfolio";
import { useInView } from "./hooks";

/**
 * Aperçus illustratifs des projets, dessinés en HTML/CSS (pas de captures d'écran).
 * Ils sont volontairement marqués « aperçu illustratif » : remplace-les par de vraies
 * captures dès que tu en as, en mettant <img> à la place du composant dans Projects.tsx.
 */

const n = (i: number) => ({ "--n": i }) as CSSProperties;

function Pharma() {
  const rows = [
    { name: "Pharmacie Centrale", dist: "350 m", state: "En stock", tone: "bg-leaf/15 text-leaf", live: true },
    { name: "Pharmacie du Marché", dist: "900 m", state: "Stock faible", tone: "bg-gold/15 text-gold", live: false },
    { name: "Pharmacie Belle Vue", dist: "1,4 km", state: "Rupture", tone: "bg-ember/15 text-ember", live: false },
  ];
  return (
    <>
      <div className="mock-bar">
        <i />
        <i />
        <i />
        <span>PharmaCi</span>
      </div>
      <div className="pm-search">
        <Search className="h-3.5 w-3.5 text-mist" />
        <span className="pm-typed">Paracétamol 500 mg</span>
        <span className="caret !h-3 !w-[2px]" />
      </div>
      {rows.map((r, i) => (
        <div key={r.name} className="pm-row" style={n(i)}>
          <span className="dia text-gold" />
          <div className="min-w-0">
            <div className="truncate font-semibold">{r.name}</div>
            <div className="text-[10.5px] text-mist">{r.dist}</div>
          </div>
          <span className={`pm-pill ${r.tone}`}>{r.state}</span>
          {r.live ? <span className="pm-btn live">Réserver</span> : <span className="pm-btn opacity-40">Réserver</span>}
        </div>
      ))}
      <div className="pm-toast">
        <Check className="h-4 w-4" />
        Réservation confirmée
      </div>
      <div className="h-14" />
    </>
  );
}

const PATTERNS = [
  // bandes indigo et or
  "repeating-linear-gradient(90deg,#1c2a8a 0 10px,#f5b41b 10px 14px,#1c2a8a 14px 26px,#e8e0cc 26px 29px)",
  // losanges
  "conic-gradient(from 45deg at 50% 50%,#e2553b 0 25%,#f5b41b 0 50%,#e2553b 0 75%,#f5b41b 0) 0 0/22px 22px",
  // damier fin
  "repeating-conic-gradient(#0f1740 0 25%,#3d8beb 0 50%) 0 0/16px 16px",
];

function Shop() {
  const items = [
    { name: "Robe pagne", price: "18 500 F", live: true },
    { name: "Ensemble wax", price: "24 000 F", live: false },
    { name: "Boubou brodé", price: "32 000 F", live: false },
  ];
  return (
    <>
      <div className="mock-bar">
        <i />
        <i />
        <i />
        <span>Chic Ivoire</span>
        <span className="cm-cart relative ml-auto h-5 w-5 rounded-full bg-gold text-night" aria-hidden>
          <span className="a text-[10px] font-bold">1</span>
          <span className="b text-[10px] font-bold">2</span>
        </span>
        <ShoppingBag className="h-3.5 w-3.5 text-mist" />
      </div>
      <div className="grid grid-cols-3 gap-2.5 p-3.5">
        {items.map((it, i) => (
          <div key={it.name} className={`cm-tile ${it.live ? "lift" : ""}`}>
            <div className="cm-art" style={{ background: PATTERNS[i] }} />
            <div className="px-2 pb-1.5 pt-2">
              <div className="truncate text-[10.5px] font-semibold">{it.name}</div>
              <div className="text-[10px] text-mist">{it.price}</div>
            </div>
            <span className={`cm-add ${it.live ? "live" : ""}`}>Ajouter</span>
          </div>
        ))}
      </div>
    </>
  );
}

function School() {
  const bars = [55, 72, 48, 84, 66, 92, 78];
  const week = ["#3d8beb", "#f5b41b", "#3dd68c", "#3d8beb", "#f5b41b"];
  return (
    <>
      <div className="mock-bar">
        <i />
        <i />
        <i />
        <span>Gestion scolaire</span>
      </div>
      <div className="grid grid-cols-[34px_1fr] gap-3 p-3.5">
        <div className="flex flex-col gap-2 border-r border-line pr-3 pt-1">
          {[0, 1, 2, 3].map((k) => (
            <span key={k} className={`h-4 w-full rounded ${k === 0 ? "bg-gold" : "bg-line"}`} />
          ))}
        </div>
        <div>
          <div className="mb-2 flex items-baseline justify-between">
            <span className="text-[10.5px] text-mist">Moyenne par classe</span>
            <span className="text-[10.5px] font-semibold text-leaf">+4 %</span>
          </div>
          <div className="flex h-[92px] items-end gap-1.5 border-b border-line">
            {bars.map((b, i) => (
              <span
                key={i}
                className="sm-bar"
                style={{ ...n(i), height: `${b}%`, background: i === 5 ? "#f5b41b" : "#2a4fb8" }}
              />
            ))}
          </div>
          <div className="mt-3 grid grid-cols-5 gap-1.5">
            {week.map((c, i) => (
              <div key={i} className="rounded-md p-1.5 text-[9.5px] font-semibold text-night" style={{ background: c }}>
                {["Maths", "Fr.", "SVT", "Angl.", "EPS"][i]}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function Api() {
  const lines = [
    { m: "GET", p: "/api/clients", s: "200", t: "38 ms" },
    { m: "POST", p: "/api/commandes", s: "201", t: "61 ms" },
    { m: "PUT", p: "/api/factures/12", s: "200", t: "44 ms" },
    { m: "GET", p: "/api/stock", s: "200", t: "29 ms" },
    { m: "DELETE", p: "/api/sessions/7", s: "204", t: "18 ms" },
  ];
  return (
    <>
      <div className="mock-bar">
        <i />
        <i />
        <i />
        <span>Spring Boot</span>
      </div>
      <div className="tm space-y-2 p-4">
        <div className="text-mist">
          <span className="text-gold">$</span> mvn spring-boot:run
        </div>
        {lines.map((l, i) => (
          <div key={l.p} className="tm-line flex gap-3" style={n(i + 1)}>
            <span className="w-[3.4rem] text-cobalt">{l.m}</span>
            <span className="min-w-0 flex-1 truncate">{l.p}</span>
            <span className="text-leaf">{l.s}</span>
            <span className="w-11 text-right text-mist">{l.t}</span>
          </div>
        ))}
        <div className="pt-1 text-mist">
          <span className="text-gold">$</span>
          <span className="caret !h-3.5" />
        </div>
      </div>
    </>
  );
}

export function ProjectMock({ kind, label }: { kind: MockKind; label: string }) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.2 });
  return (
    <div ref={ref} className="mock" data-run={inView} role="img" aria-label={label}>
      {kind === "pharma" && <Pharma />}
      {kind === "shop" && <Shop />}
      {kind === "school" && <School />}
      {kind === "api" && <Api />}
    </div>
  );
}
