/**
 * Tout le contenu du portfolio est ici. Modifie ce fichier pour changer les textes,
 * ajouter un projet ou mettre à jour ton parcours : le design se met à jour tout seul.
 */

export const PROFILE = {
  /** Nom court : navigation, footer, titre de l'onglet. */
  shortName: "Mouhammad Diabagaté",
  /** Nom complet : page À propos et données de partage. */
  fullName: "Al Hadj Mouhammad Al Hamine Diabagaté",
  /** Marque personnelle, visible dans le footer et le handle GitHub. */
  brand: "HAYEK DEV",
  /** Les deux lignes du grand titre du hero. */
  heroLines: ["Mouhammad", "Diabagaté"],
  role: "Développeur full stack",
  /** Sous-titre tiré du CV, affiché près du nom dans le hero. */
  roleLong: "Développeur d'applications · Informatique Décisionnelle",
  city: "Bouaké",
  country: "Côte d'Ivoire",
  /** Adresse officielle telle qu'elle figure sur le CV. */
  email: "diabagatemouhammad@gmail.com",
  phone: "+225 01 02 78 48 77",
  /** Numéro pour wa.me : indicatif pays + numéro, sans « + » ni espaces. */
  whatsapp: "2250102784877",
  github: "https://github.com/HAYEKCODING",
  githubHandle: "@HAYEKCODING",
  linkedin: "https://www.linkedin.com/in/al-hadj-mouhammad-al-hamine-sotigui-diabagate-9b9443406",
  linkedinLabel: "Al-Hadj Mouhammad Diabagaté",
} as const;

/** Le CV vit dans /public/cv : Vite le sert tel quel, sans transformation. */
export const CV = {
  href: "/cv/Mouhammad-Diabagate-CV.pdf",
  fileName: "Mouhammad-Diabagate-CV.pdf",
} as const;

export const NAV = [
  { href: "#about", id: "about", label: "À propos" },
  { href: "#projects", id: "projects", label: "Projets" },
  { href: "#skills", id: "skills", label: "Stack" },
  { href: "#experience", id: "experience", label: "Parcours" },
  { href: "#services", id: "services", label: "Services" },
  { href: "#contact", id: "contact", label: "Contact" },
];

/** Phrase unique affichée dans le hero, après « Je construis ». */
export const HERO_STATEMENT =
  "Je conçois et développe des applications web, de l'idée jusqu'à la mise en ligne.";

export const STATS = [
  { value: 6, label: "projets construits" },
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
  title: "Un développeur full stack, attaché au code propre et aux projets qui aboutissent.",
  lead: "Je suis développeur d'applications, diplômé d'une Licence en Informatique Décisionnelle. Je crée des sites et des applications mobiles, et je m'appuie sur de bonnes bases en modélisation de données.",
  paragraphs: [
    "Je souhaite aujourd'hui rejoindre une équipe produit pour progresser en développement full stack et contribuer à des projets utiles. Curieux et autonome, j'apprends vite et je m'intègre facilement.",
    "J'ai débuté chez Synelia Group Africa, comme stagiaire développeur backend. J'y ai appris les méthodes agiles, la revue de code et la livraison continue, trois habitudes que j'applique à chaque projet.",
    "J'accompagne aujourd'hui des entrepreneurs, des PME et des startups africaines. Ensemble, nous transformons une idée en produit numérique utilisable : site e-commerce, plateforme e-learning ou outil métier sur mesure.",
  ],
  values: [
    { title: "Rigueur", text: "Un code lisible, testé et documenté" },
    { title: "Livraison", text: "Des versions régulières, par petites étapes" },
    { title: "Impact", text: "Des solutions pensées pour l'usage réel" },
  ],
  /** Petits repères personnels, tirés du CV (centres d'intérêt, langues). */
  interests: ["Développement web & mobile", "Cybersécurité & IA", "Lecture technique"],
  languages: [
    { lang: "Français", level: "Courant" },
    { lang: "Anglais", level: "Débutant" },
  ],
};

/** Lignes du petit terminal de la section « À propos » — un détail de développeur, sans excès. */
export const STATUS_LINES = [
  { cmd: "whoami", out: "mouhammad — développeur full stack, Bouaké 🇨🇮" },
  { cmd: "cat formation.txt", out: "Licence Informatique Décisionnelle · BTS IDA · HETEC" },
  { cmd: "cat interets.txt", out: "cybersécurité · ia · lecture technique" },
  { cmd: "status", out: "ouvert aux missions" },
];

export const SKILLS = [
  {
    label: "Développement web",
    title: "Interfaces et sites web",
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
  /** Résumé d'une phrase, utilisé si le projet n'a pas de problème/solution détaillés. */
  desc: string;
  /** Le problème que le projet cherche à résoudre. */
  problem?: string;
  /** La réponse apportée par l'application. */
  solution?: string;
  /** Fonctionnalités principales, réellement présentes dans le projet. */
  features?: string[];
  /** Ce que j'ai concrètement développé. */
  role: string;
  tags: string[];
  status: "En cours" | "Livré" | "Expérience pro";
  /** Lien du projet en ligne (optionnel) : un bouton « Voir site » apparaît. */
  live?: string;
  featured?: boolean;
  /** Capture d'écran du site, servie depuis public/projects. */
  image?: string;
  /** Illustration de secours, utilisée quand aucune capture n'est disponible. */
  mock?: MockKind;
}

export const PROJECTS: Project[] = [
  {
    name: "PharmaCi",
    short: "Pharmacies ouvertes, médicaments et comparaison des prix",
    type: "HealthTech · application web",
    desc: "Une application qui aide à trouver une pharmacie ouverte, vérifier si un médicament est disponible et comparer les prix en Côte d'Ivoire.",
    problem:
      "Savoir si une pharmacie a un médicament en stock demande souvent plusieurs appels, parfois plusieurs déplacements, sans être sûr de le trouver.",
    solution:
      "PharmaCi réunit les pharmacies ouvertes, les stocks et les prix au même endroit, pour éviter les déplacements inutiles.",
    features: [
      "Rechercher un médicament par son nom",
      "Voir sa disponibilité dans chaque pharmacie",
      "Trouver une pharmacie ouverte et comparer les prix",
    ],
    role: "Conception et développement complets : interface React, API Spring Boot et base MySQL.",
    tags: ["React", "Spring Boot", "MySQL", "Tailwind"],
    status: "En cours",
    live: "https://pharmacie-ci.base44.app",
    featured: true,
    image: "/projects/pharmaci.jpg",
    mock: "pharma",
  },
  {
    name: "Chic Ivoire Boutique",
    short: "Mode féminine ivoirienne",
    type: "E-commerce",
    desc: "Une boutique en ligne consacrée à la mode féminine ivoirienne.",
    problem:
      "Les créatrices de mode locales manquent souvent d'une vitrine en ligne à la hauteur de leur catalogue.",
    solution:
      "Chic Ivoire met en ligne une boutique complète, du catalogue au paiement, pensée pour le marché ivoirien.",
    features: [
      "Catalogue organisé par catégories",
      "Panier et suivi des commandes",
      "Paiement adapté au marché local",
    ],
    role: "Développement de la boutique de bout en bout, du catalogue au paiement.",
    tags: ["Next.js", "Tailwind", "MySQL"],
    status: "Livré",
    live: "https://chic-ivoire-boutique.lovable.app",
    image: "/projects/chic-ivoire.jpg",
    mock: "shop",
  },
  {
    name: "CampusLink",
    short: "Le réseau éducatif des étudiants",
    type: "Éducation · réseau étudiant",
    desc: "Une plateforme qui aide les étudiants à trouver un binôme de révision, un partenaire d'étude ou un contact sur leur campus.",
    problem:
      "Sur un même campus, il reste difficile de trouver un binôme de révision ou un partenaire d'étude.",
    solution:
      "CampusLink met les étudiants en relation et facilite la création de groupes de révision.",
    features: [
      "Trouver un binôme de révision",
      "Rencontrer des partenaires d'étude",
      "Créer des contacts sur le campus",
    ],
    role: "Conception et développement de la plateforme.",
    tags: [],
    status: "Livré",
    live: "https://campuslink-olive.vercel.app/",
    image: "/projects/campuslink.jpg",
    mock: "school",
  },
  {
    name: "Applications backend Synelia",
    short: "Applications métier",
    type: "Backend · expérience professionnelle",
    desc: "Mon travail au sein de l'équipe backend de Synelia Group Africa.",
    role: "J'ai développé des fonctionnalités métier, corrigé des bugs et participé à la maintenance de l'application, en méthode agile.",
    features: [
      "Développement de fonctionnalités métier",
      "Correction de bugs",
      "Amélioration des performances",
    ],
    tags: ["Java", "Spring Boot", "MySQL", "Git", "REST"],
    status: "Expérience pro",
    mock: "api",
  },
  {
    name: "Bernabe RH",
    short: "Gestion des ressources humaines",
    type: "Application métier · RH",
    desc: "Une application web pour gérer les ressources humaines d'une entreprise.",
    role: "Conception et développement de la plateforme, de la base de données à l'interface.",
    tags: [],
    status: "Livré",
    live: "https://bernabe-rh.onrender.com/login",
    image: "/projects/bernabe-rh.jpg",
    mock: "api",
  },
  {
    name: "Bernice Parfumerie",
    short: "Parfums et montres de luxe",
    type: "E-commerce · parfumerie",
    desc: "Une boutique en ligne de parfums et de montres : prix en FCFA, commande par WhatsApp et livraison en Côte d'Ivoire.",
    features: [
      "Catalogue de parfums et de montres",
      "Commande par WhatsApp",
      "Livraison en Côte d'Ivoire",
    ],
    role: "Conception et développement de la boutique en ligne.",
    tags: [],
    status: "Livré",
    live: "https://bernices-boutique-bliss.lovable.app",
    image: "/projects/bernice.jpg",
    mock: "shop",
  },
];

export interface TimelineItem {
  date: string;
  role: string;
  org: string;
  desc: string;
  tags: string[];
}

/** Triées de l'activité la plus récente (ou en cours) à la plus ancienne. */
export const EXPERIENCE: TimelineItem[] = [
  {
    date: "2024 à aujourd'hui",
    role: "Développeur d'applications, projets personnels",
    org: "Freelance et apprentissage",
    desc: "Je conçois et développe des applications web et mobiles, pour des clients comme pour mes propres projets : PharmaCi, Chic Ivoire, CampusLink, Bernabe RH et Bernice Parfumerie. Modélisation Merise et UML, API REST, bases de données.",
    tags: ["React", "Flutter", "PHP", "Spring Boot"],
  },
  {
    date: "Avril à juin 2026",
    role: "Stagiaire développeur",
    org: "ONG Amour Divin",
    desc: "J'ai conçu et développé PharmaCi, une plateforme qui montre les médicaments disponibles en pharmacie et permet de les réserver.",
    tags: ["HealthTech", "React", "Spring Boot"],
  },
  {
    date: "Août à octobre 2025",
    role: "Stagiaire, équipe backend",
    org: "Synelia Group Africa",
    desc: "J'ai développé et maintenu des applications web métier avec l'équipe backend : nouvelles fonctionnalités, correction de bugs et amélioration des performances.",
    tags: ["Java", "Spring Boot", "MySQL", "Git"],
  },
];

export const EDUCATION: TimelineItem[] = [
  {
    date: "2025 à 2026",
    role: "Licence en Informatique Décisionnelle",
    org: "HETEC, Côte d'Ivoire",
    desc: "Business Intelligence et analyse de données : tableaux de bord Power BI, SQL et conception de systèmes d'information pour le pilotage.",
    tags: ["Power BI", "SQL", "Data", "POO", "UML"],
  },
  {
    date: "2024 à 2025",
    role: "BTS en Informatique Développeur d'Applications (IDA)",
    org: "HETEC, Côte d'Ivoire",
    desc: "Développement web en PHP et JavaScript, bases de données, modélisation Merise (MCD/MLD) et méthodes agiles.",
    tags: ["PHP", "MySQL", "Merise"],
  },
];

export interface Certification {
  title: string;
  /** Date d'obtention, telle qu'elle figure sur le certificat. */
  date: string;
  /** Domaine de la formation, affiché en surtitre. */
  area: string;
  /** Numéro de certificat, quand il est fourni. */
  id?: string;
}

/** Triées de la plus récente à la plus ancienne. */
export const CERTIFICATIONS: Certification[] = [
  {
    title: "Débutez votre parcours DevOps avec Docker",
    date: "9 octobre 2026",
    area: "DevOps · Docker",
  },
  {
    title: "Boostez votre valeur en entreprise avec Java & Spring Boot",
    date: "8 octobre 2026",
    area: "Java · Spring Boot",
  },
  {
    title: "L'IA pour tous",
    date: "16 août 2026",
    area: "Intelligence artificielle",
    id: "SKA4402827081620261311",
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
    desc: "Sites vitrine, portfolios et landing pages : un design soigné et des pages qui chargent vite.",
  },
  {
    title: "Applications métier",
    desc: "Outils de gestion, tableaux de bord et logiciels internes sur mesure pour les PME.",
  },
  {
    title: "APIs REST",
    desc: "Des API sécurisées et documentées, prêtes à évoluer avec votre produit.",
  },
  {
    title: "Plateformes e-learning",
    desc: "Cours, étudiants, paiements et certificats réunis dans une même plateforme.",
  },
  {
    title: "E-commerce",
    desc: "Boutiques en ligne avec catalogue, panier et paiement Mobile Money, adaptées à la Côte d'Ivoire.",
  },
  {
    title: "Applications d'entreprise",
    desc: "Gestion RH, comptabilité et facturation : des outils simples, pensés pour le marché africain.",
  },
];
