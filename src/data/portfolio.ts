/**
 * Tout le contenu du portfolio est ici. Modifie ce fichier pour changer les textes,
 * ajouter un projet ou mettre à jour ton parcours : le design se met à jour tout seul.
 */

export const PROFILE = {
  /** Nom court : navigation, footer, titre de l'onglet. */
  shortName: "Mouhammad Diabagaté",
  /** Nom complet : page À propos et données de partage. */
  fullName: "Al Hadj Mouhammad Al Hamine Diabagaté",
  /** Les deux lignes du grand titre du hero. */
  heroLines: ["Mouhammad", "Diabagaté"],
  role: "Développeur full stack",
  city: "Bouaké",
  country: "Côte d'Ivoire",
  email: "diabagatem28@gmail.com",
  phone: "+225 01 02 78 48 77",
  /** Numéro pour wa.me : indicatif pays + numéro, sans « + » ni espaces. */
  whatsapp: "2250102784877",
  github: "https://github.com/HAYEKCODING",
  githubHandle: "@HAYEKCODING",
  linkedin: "https://www.linkedin.com/in/al-hadj-mouhammad-al-hamine-sotigui-diabagate-9b9443406",
  linkedinLabel: "Al-Hadj Mouhammad Diabagaté",
} as const;

export const NAV = [
  { href: "#about", id: "about", label: "À propos" },
  { href: "#projects", id: "projects", label: "Projets" },
  { href: "#skills", id: "skills", label: "Stack" },
  { href: "#experience", id: "experience", label: "Parcours" },
  { href: "#services", id: "services", label: "Services" },
  { href: "#contact", id: "contact", label: "Contact" },
];

/** Phrases tapées dans le hero après « Je construis ». */
export const TYPED = [
  "des boutiques en ligne.",
  "des plateformes de santé.",
  "des outils de gestion pour PME.",
  "des APIs REST fiables.",
];

export const STATS = [
  { value: 3, label: "projets construits" },
  { value: 2, label: "stages en entreprise" },
  { value: 12, label: "technologies pratiquées" },
  { value: 3, label: "années d'études en informatique" },
];

export const MARQUEE = [
  "PHP",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Java",
  "Spring Boot",
  "Python",
  "MySQL",
  "PostgreSQL",
  "Docker",
  "Tailwind CSS",
];

export const ABOUT = {
  title: "Un développeur full stack rigoureux, tourné vers la qualité et la livraison.",
  lead: "Je conçois des applications web complètes, du premier trait d'interface au déploiement en production. Ma double formation MIAGE et BTS m'a donné les fondations théoriques et la discipline pour livrer du code robuste et maintenable.",
  paragraphs: [
    "J'ai fait mes premières armes en entreprise chez Synelia Group Africa, comme stagiaire développeur backend. J'y ai découvert le rythme agile, la revue de code et la livraison continue, des pratiques que j'applique désormais sur chacun de mes projets.",
    "Aujourd'hui, je collabore avec des entrepreneurs, PME et startups africaines pour transformer leurs idées en produits numériques exploitables : e-commerce, plateformes e-learning, applications HealthTech, outils métier sur mesure.",
  ],
  values: [
    { title: "Rigueur", text: "Code propre, testé, documenté" },
    { title: "Livraison", text: "Livraisons régulières, retours courts" },
    { title: "Impact", text: "Solutions pensées pour l'usage réel" },
  ],
};

export const SKILLS = [
  {
    label: "Développement web",
    title: "Interface et web",
    items: ["HTML5", "CSS3", "PHP", "React.js", "Spring Boot", "Tailwind CSS"],
  },
  {
    label: "Développement mobile",
    title: "Applications multi-plateformes",
    items: ["Flutter", "Responsive"],
  },
  {
    label: "Programmation",
    title: "Langages",
    items: ["Java", "Python", "PHP", "JavaScript"],
  },
  {
    label: "Données et modélisation",
    title: "Bases de données",
    items: ["MySQL", "Supabase (PostgreSQL)", "Merise (MCD/MLD)", "UML", "API REST"],
  },
  {
    label: "Outils et DevOps",
    title: "Workflow",
    items: ["VS Code", "IntelliJ IDEA", "Git", "GitHub", "Docker"],
  },
  {
    label: "Design et langues",
    title: "UI/UX et communication",
    items: ["Figma", "Canva", "🇫🇷 Français : courant", "🇬🇧 Anglais : débutant"],
  },
];

export type MockKind = "pharma" | "shop" | "school" | "api";

export interface Project {
  name: string;
  short: string;
  type: string;
  desc: string;
  tags: string[];
  status: "En cours" | "Livré" | "Expérience pro";
  /** Lien du code sur GitHub. Remplace-le par le lien direct du dépôt quand il existe. */
  href: string;
  /** Lien de démonstration en ligne (optionnel) : un bouton « Voir la démo » apparaît. */
  live?: string;
  featured?: boolean;
  mock: MockKind;
}

export const PROJECTS: Project[] = [
  {
    name: "PharmaCi",
    short: "Disponibilité et réservation de médicaments",
    type: "HealthTech · application web",
    desc: "Plateforme dédiée aux pharmacies de Côte d'Ivoire : consultation en temps réel des disponibilités de médicaments et réservation en ligne pour les patients.",
    tags: ["React", "Spring Boot", "MySQL", "Tailwind"],
    status: "En cours",
    href: "https://github.com/HAYEKCODING/pharma-projrct",
    featured: true,
    mock: "pharma",
  },
  {
    name: "Chic Ivoire",
    short: "Mode féminine ivoirienne",
    type: "E-commerce",
    desc: "Boutique en ligne dédiée à la mode féminine ivoirienne : catalogue, panier, gestion de commandes et intégration paiement adaptée au marché local.",
    tags: ["Next.js", "Tailwind", "MySQL"],
    status: "Livré",
    href: "https://github.com/HAYEKCODING/chic-ivoire",
    mock: "shop",
  },
  {
    name: "Plateforme de gestion scolaire",
    short: "Élèves, enseignants, notes",
    type: "SaaS · éducation",
    desc: "Solution moderne de gestion scolaire pensée pour une expérience fluide : élèves, enseignants, notes, emplois du temps et communication interne.",
    tags: ["React", "Spring Boot", "PostgreSQL"],
    status: "En cours",
    href: "https://github.com/HAYEKCODING",
    mock: "school",
  },
  {
    name: "Applications backend Synelia",
    short: "Applications métier",
    type: "Backend · expérience professionnelle",
    desc: "Contributions à l'équipe backend de Synelia Group Africa : développement de fonctionnalités, correction de bugs et maintenance évolutive d'applications web métier.",
    tags: ["Java", "Spring Boot", "MySQL", "Git", "REST"],
    status: "Expérience pro",
    href: "https://github.com/HAYEKCODING",
    mock: "api",
  },
];

export interface TimelineItem {
  date: string;
  role: string;
  org: string;
  desc: string;
  tags: string[];
}

export const EXPERIENCE: TimelineItem[] = [
  {
    date: "Août à octobre 2025",
    role: "Stagiaire, équipe backend",
    org: "Synelia Group Africa",
    desc: "Participation au développement et à la maintenance d'applications web métier avec l'équipe backend. Amélioration des performances, correction de bugs et maintenance évolutive.",
    tags: ["Java", "Spring Boot", "MySQL", "Git"],
  },
  {
    date: "Avril à juin 2025",
    role: "Stagiaire développeur",
    org: "ONG Amour Divin",
    desc: "Stage au sein de l'organisation Amour Divin, où j'ai développé le projet PharmaCI pour améliorer la disponibilité et la réservation de médicaments, en lien étroit avec l'équipe.",
    tags: ["HealthTech", "React", "Spring Boot"],
  },
  {
    date: "2024 à aujourd'hui",
    role: "Développeur d'applications, projets personnels",
    org: "Freelance et apprentissage",
    desc: "Conception et développement d'applications web et mobiles : PharmaCi, Chic Ivoire, plateforme de gestion scolaire. Modélisation Merise/UML, API REST, intégration base de données.",
    tags: ["React", "Flutter", "PHP", "Spring Boot"],
  },
  {
    date: "2024 à 2025",
    role: "Membre du bureau exécutif",
    org: "HETEC Bouaké · Réseau des Jeunes Dynamiques",
    desc: "Adjoint du secrétaire de l'urbanisation du Réseau des Jeunes Dynamiques de Bouaké. Engagement associatif, coordination et communication.",
    tags: ["Leadership", "Communication"],
  },
];

export const EDUCATION: TimelineItem[] = [
  {
    date: "2025 à 2026",
    role: "Licence en Informatique Décisionnelle",
    org: "HETEC, Côte d'Ivoire",
    desc: "Business Intelligence, exploitation et valorisation des données, outils décisionnels (Power BI), conception de systèmes d'information orientés pilotage.",
    tags: ["Power BI", "SQL", "Data", "POO", "UML"],
  },
  {
    date: "2024 à 2025",
    role: "Licence 2 / BTS Développeur d'Applications",
    org: "HETEC, Côte d'Ivoire",
    desc: "Développement web (PHP/JS), bases de données sécurisées, modélisation Merise (MCD/MLD), conception de systèmes d'information et méthodes agiles.",
    tags: ["PHP", "MySQL", "Merise"],
  },
  {
    date: "2023 à 2024",
    role: "Licence 1 MIAGE",
    org: "Université Polytechnique de Bingerville",
    desc: "Fondamentaux : algorithmique, programmation orientée objet (Java/Python), conception web, normalisation SQL et bases de la gestion de projet.",
    tags: ["Java", "Python", "SQL", "Algo"],
  },
];

export const ARCHITECTURE = [
  { title: "Frontend", text: "React, Next.js, Tailwind" },
  { title: "API", text: "Authentification, routage, limitation de débit" },
  { title: "Backend", text: "PHP, Java, Spring Boot" },
  { title: "Base de données", text: "MySQL, PostgreSQL" },
  { title: "Déploiement", text: "Docker, Vercel, CI/CD" },
];

export const SERVICES = [
  {
    title: "Sites web professionnels",
    desc: "Landing pages, portfolios et sites vitrine au design soigné et aux performances optimisées.",
  },
  {
    title: "Applications métier",
    desc: "Systèmes de gestion, tableaux de bord d'administration et outils internes sur mesure pour les PME.",
  },
  {
    title: "APIs REST",
    desc: "Conception et développement d'APIs sécurisées, documentées et prêtes à évoluer.",
  },
  {
    title: "Plateformes e-learning",
    desc: "Plateformes complètes avec gestion des cours, des étudiants, des paiements et des certifications.",
  },
  {
    title: "E-commerce",
    desc: "Boutiques en ligne avec catalogue, panier et paiement Mobile Money adapté à la Côte d'Ivoire.",
  },
  {
    title: "Applications d'entreprise",
    desc: "ERP léger, gestion RH, comptabilité et facturation adaptés au marché africain.",
  },
];
