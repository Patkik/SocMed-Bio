export interface Service {
  id: number;
  tag: string;
  title: string;
  shortDesc: string;
  projectName: string;
  projectDesc: string;
  projectLink: string;
  projectImage: string;
}

export interface TechStack {
  name: string;
  category: string;
  level: number;
}

export interface TechDetail {
  systemRole: string;
  xp: string;
  projects: string;
}

export interface Artwork {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  hash: string;
}

export const SERVICES_DATA: Service[] = [
  {
    id: 1,
    tag: "// SERVICE_01 // ACTIVE",
    title: "Full-stack Web Developer",
    shortDesc: "End-to-end web deployment, interactive modules, and high-performance server structures.",
    projectName: "COMSOC_MIS_v1.0",
    projectDesc: "A secure student organization management portal featuring live biometric dashboard logs, digital roster rosters, security firewall overlays, and high-fidelity custom design systems.",
    projectLink: "https://github.com/Patkik/SocMed-Bio",
    projectImage: "/img/art1.jpg"
  },
  {
    id: 2,
    tag: "// SERVICE_02 // ACTIVE",
    title: "Graphic Designer",
    shortDesc: "Sleek visual layouts, modern UI branding elements, and customized digital assets.",
    projectName: "CATERPRO_BRAND_DECK",
    projectDesc: "A premium corporate identity design system. Crafted with strict Apple-inspired minimalist design rules, balanced typography ratios, and micro-interaction visual blueprints.",
    projectLink: "https://github.com/Patkik/SocMed-Bio",
    projectImage: "/img/art2.jpg"
  }
];

export const TECH_STACKS: TechStack[] = [
  { name: "HTML", category: "Frontend", level: 95 },
  { name: "CSS", category: "Frontend", level: 90 },
  { name: "JavaScript", category: "Frontend", level: 92 },
  { name: "TypeScript", category: "Frontend", level: 85 },
  { name: "React", category: "Frontend", level: 88 },
  { name: "Java", category: "Backend", level: 80 },
  { name: "MySQL", category: "Database", level: 85 },
  { name: "MongoDB", category: "Database", level: 78 },
  { name: "Redis", category: "Database", level: 82 },
  { name: "Git", category: "Version Control", level: 90 },
  { name: "Docker", category: "DevOps", level: 84 },
  { name: "AWS", category: "DevOps", level: 80 },
  { name: "Agentic A.I", category: "Next-Gen", level: 95 }
];

export const TECH_DETAILS: Record<string, TechDetail> = {
  "html": {
    systemRole: "Markup structural foundation layer.",
    xp: "Crafting semantically complete Document Object Models with SEO compliance and ARIA access keys.",
    projects: "Comsoc MIS, CaterPro Brand Landing Page."
  },
  "css": {
    systemRole: "Visual layout styling engine.",
    xp: "Designing modern fluid grid frameworks, CRT shaders, glassmorphism templates, and adaptive animation curves.",
    projects: "Holy Portfolio, CaterPro Presentation Deck."
  },
  "javascript": {
    systemRole: "Runtime behavioral engine.",
    xp: "Asynchronous task orchestration, Web Audio API synthesis, dynamic canvas rendering, and live DOM updates.",
    projects: "Spaceship Flight HUD, Comsoc member dashboard."
  },
  "typescript": {
    systemRole: "Compile-time strict typing controller.",
    xp: "Writing interface contracts, generics, strict null-safe checks, and compiler declarations to prevent system crashes.",
    projects: "Holy Portfolio main build, SocMed-Bio telemetry data layer."
  },
  "react": {
    systemRole: "Reactive state component virtual DOM engine.",
    xp: "Framer Motion layout animations, component hooks (useState, useEffect, useRef), and lazy rendering optimizations.",
    projects: "Hacker Dashboard Mainframe, Comsoc portal."
  },
  "java": {
    systemRole: "Back-end business logic processing node.",
    xp: "Object-oriented service development, relational mapping, secure REST endpoint controllers, and thread execution.",
    projects: "CaterPro transaction service, Comsoc core audit server."
  },
  "mysql": {
    systemRole: "Relational database structure engine.",
    xp: "Designing normalized schemas, indexing keys, foreign key constraints, and writing high-speed query updates.",
    projects: "Comsoc member roster data logs, CaterPro backend storage."
  },
  "mongodb": {
    systemRole: "NoSQL document database catalog.",
    xp: "BSON data schema designs, unstructured telemetry document logs, database clustering, and aggregate lookups.",
    projects: "SocMed-Bio activity metrics, gaming API cache."
  },
  "redis": {
    systemRole: "In-memory key-value caching system.",
    xp: "Accelerating query speeds by caching API payloads, session tokens, and routing indexes under 5ms.",
    projects: "Spaceship cockpit metrics, shell history session buffer."
  },
  "git": {
    systemRole: "Distributed version control system.",
    xp: "Branching protocols, pull requests, merge conflict resolutions, and CI/CD pipelines deployment integration.",
    projects: "All projects managed under Github Patkik/SocMed-Bio repo."
  },
  "docker": {
    systemRole: "Container virtualization infrastructure.",
    xp: "Multi-stage Dockerfile configurations, alpine OS micro-images, and microservice containers networking configurations.",
    projects: "Warped Portfolio Docker server deployments, AWS container runs."
  },
  "aws": {
    systemRole: "Cloud computing compute cluster host.",
    xp: "EC2 virtual servers provisioning, security group network configurations, SSH certificate validations, and public domain hosting.",
    projects: "SocMed-Bio Live Server hosting, active portfolio EC2 nodes."
  },
  "agentic a.i": {
    systemRole: "Next-Gen autonomous workspace assistant.",
    xp: "Interpreting developer requirements, compiling software assets, deploying servers, and optimizing runtime parameters autonomously.",
    projects: "Antigravity coding session, adaptive cockpit UI developer partner."
  }
};

export const ARTWORKS_DATA: Artwork[] = [
  {
    id: 1,
    title: "Toji",
    description: "Ressurected Toji Fushiguro from the anime series Jujutsu Kaisen",
    imageUrl: "/img/art1.jpg",
    date: "2026.04.12",
    hash: "MD5:8F2D5E1A"
  },
  {
    id: 2,
    title: "Tanjiro",
    description: "Fanart of Tanjiro Kamado from the anime series Demon Slayer: Kimetsu no Yaiba",
    imageUrl: "/img/art2.jpg",
    date: "2026.05.28",
    hash: "SHA256:4C8B9A2F"
  }
];

export interface BioOverview {
  textPart1: string;
  favColorPlaceholder: string;
  favColorRevealed: string;
  birthdayPlaceholder: string;
  birthdayRevealed: string;
  textPart2: string;
  threatQuote: string;
}

export interface SystemSpecs {
  favColorRevealed: string;
  birthdayRevealed: string;
  geolocation: string;
  mood: string;
  energySrc: string;
}

export interface ExtraFacts {
  summary: string;
  items: string[];
}

export interface MlbbData {
  rank: string;
  signature: string;
  role: string;
  intelTitle: string;
  intelDesc: string;
}

export interface CodmData {
  mpRank: string;
  brRank: string;
}

export interface GenshinHero {
  name: string;
  elem: string;
  color: string;
  intelTitle: string;
  intelDesc: string;
}

export interface GenshinData {
  arLevel: string;
  team: GenshinHero[];
}

export const BIO_OVERVIEW: BioOverview = {
  textPart1: "Currently a BSIT student, night owl, chill, likes animals, likes anime, likes coding, fav color ",
  favColorPlaceholder: "[REDACTED]",
  favColorRevealed: "NASA COMMENT SECTION",
  birthdayPlaceholder: "[REDACTED]",
  birthdayRevealed: "NASA COMMENT SECTION",
  textPart2: ", birthday ",
  threatQuote: "My dream is to be a dinosaur someday so I can eat every single person that hurts my feelings."
};

export const SYSTEM_SPECS_DATA: SystemSpecs = {
  favColorRevealed: "GREEN",
  birthdayRevealed: "OCTOBER 9, 2004",
  geolocation: "PH_CORE.SYS",
  mood: "CHILL_STATE",
  energySrc: "COFFEE_AND_ANIME"
};

export const EXTRA_FACTS_DATA: ExtraFacts = {
  summary: "I'm actually from another planet, so beware hooman.",
  items: [
    "totally not human.",
    "do you want to build a snowman?",
    "I can adapt easily to new environments just like planet Earth."
  ]
};

export const MLBB_DATA: MlbbData = {
  rank: "👑 Mythical Immortal (101 Stars)",
  signature: "🔮 Kagura (600+ Matches)",
  role: "All Around Operator",
  intelTitle: "// INTEL: SEIMEI UMBRELLA DECK",
  intelDesc: "Yin-yang vector manipulation. Specializes in multi-lane target locks and clean system wiping operations."
};

export const CODM_DATA: CodmData = {
  mpRank: "🎖️ Pro III [TACTICAL]",
  brRank: "⛰️ Pro V [SURVIVAL]"
};

export const GENSHIN_DATA: GenshinData = {
  arLevel: "AR 58 Operator",
  team: [
    {
      name: "Raiden Shogun",
      elem: "Electro",
      color: "text-purple-400 border-purple-500/30 bg-purple-950/20",
      intelTitle: "⚡ MUSOU NO HITOTACHI",
      intelDesc: "Electro power node. Maximizes elemental reload and bursts system metrics."
    },
    {
      name: "Itto",
      elem: "Geo",
      color: "text-yellow-500 border-yellow-500/30 bg-yellow-950/20",
      intelTitle: "👹 ARATAKI TATSUMAKI",
      intelDesc: "Geo core impact. Strong shielding nodes and heavy bludgeon critical streams."
    },
    {
      name: "Yoimiya",
      elem: "Pyro",
      color: "text-red-400 border-red-500/30 bg-red-950/20",
      intelTitle: "🔥 RYUUGAN FIREWORKS",
      intelDesc: "Pyro speed fireballs. Rapid fire damage streams and high-velocity kinetic hits."
    }
  ]
};

