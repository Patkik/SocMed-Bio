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
    tag: "FEATURED PROJECT • ACTIVE",
    title: "Full-Stack Web Developer",
    shortDesc: "BukSU Capstone Management & Archiving System (CMS-V2)",
    projectName: "BukSU Capstone Management System",
    projectDesc: "A comprehensive web application built for Bukidnon State University's IT Department to manage undergraduate capstone proposals, faculty review rubrics, clearance workflows, and research paper archiving.",
    projectLink: "https://github.com/Patkik/Capstone-management-system",
    projectImage: "/cmsv2-showcase/web/01-hero-control-deck.webp"
  }
];

export const TECH_STACKS: TechStack[] = [
  { name: "React", category: "Frontend", level: 92 },
  { name: "TypeScript", category: "Frontend", level: 88 },
  { name: "Express", category: "Backend", level: 90 },
  { name: "MongoDB", category: "Database", level: 86 },
  { name: "ChromaDB", category: "Database", level: 82 },
  { name: "PaddleOCR-VL", category: "Next-Gen", level: 85 },
  { name: "Docker", category: "DevOps", level: 84 },
  { name: "AWS", category: "DevOps", level: 80 },
  { name: "Redis", category: "Database", level: 82 },
  { name: "Git", category: "Version Control", level: 90 },
  { name: "JavaScript", category: "Frontend", level: 94 },
  { name: "HTML", category: "Frontend", level: 95 },
  { name: "CSS", category: "Frontend", level: 92 },
  { name: "Java", category: "Backend", level: 80 },
  { name: "MySQL", category: "Database", level: 85 },
  { name: "Agentic A.I", category: "Next-Gen", level: 95 }
];

export const TECH_DETAILS: Record<string, TechDetail> = {
  "react": {
    systemRole: "Interactive SPA cockpit & deliberation reader engine.",
    xp: "Engineered instructor workload matrix, real-time rubric scoring interfaces, student revision queues, and Google Scholar-style archive browser.",
    projects: "BukSU CMS-V2 Web Cockpit, Deliberation Matrix Deck."
  },
  "typescript": {
    systemRole: "Compile-time strict typing controller & domain contract enforcement.",
    xp: "Defined strict type schemas for 4-phase institutional clearance gates, student proposal lifecycles, panel voting interfaces, and typed REST DTOs.",
    projects: "BukSU CMS-V2 Core Type System, Multi-Tier Milestone Contracts."
  },
  "express": {
    systemRole: "RESTful API gateway & institutional authorization controller.",
    xp: "Designed modular endpoints, JWT-authenticated sessions, and granular Role-Based Access Control (RBAC) across Students, Advisers, Panelists, Chairs, and Dean ADM.",
    projects: "BukSU CMS-V2 API Gateway, Defense Coordination Endpoints."
  },
  "mongodb": {
    systemRole: "NoSQL document catalog & ACID transactional state store.",
    xp: "Architected flexible BSON schemas for capstone manuscripts, deliberation feedback logs, and atomic multi-document sessions preventing sign-off race conditions.",
    projects: "BukSU CMS-V2 Document Database, Manuscript Archival Registry."
  },
  "chromadb": {
    systemRole: "High-dimensional vector database for semantic literature discovery.",
    xp: "Indexed dense neural vector embeddings of capstone abstracts and methodologies, enabling conceptual search and duplicate topic detection for new proposals.",
    projects: "BukSU CMS-V2 Semantic Knowledge Vault, Literature Discovery Engine."
  },
  "paddleocr-vl": {
    systemRole: "Vision-Language optical character recognition worker.",
    xp: "Integrated a 0.9B vision-language pipeline to parse student PDF manuscripts, extracting structured tables, system topology blueprints, and raw narrative text.",
    projects: "BukSU CMS-V2 PDF Ingestion Worker, Automated SDG Classifier."
  },
  "paddleocr": {
    systemRole: "Vision-Language optical character recognition worker.",
    xp: "Integrated a 0.9B vision-language pipeline to parse student PDF manuscripts, extracting structured tables, system topology blueprints, and raw narrative text.",
    projects: "BukSU CMS-V2 PDF Ingestion Worker, Automated SDG Classifier."
  },
  "docker": {
    systemRole: "Container virtualization infrastructure & microservice orchestration.",
    xp: "Configured multi-stage Docker builds isolating the React client, Express API, Python OCR service, and ChromaDB vector store with dedicated networking.",
    projects: "BukSU CMS-V2 Production Container Cluster, Local Development Stack."
  },
  "aws": {
    systemRole: "Secure cloud object storage & archival infrastructure.",
    xp: "Implemented presigned AWS S3 upload pipelines for tamper-proof capstone PDF storage, bucket access policies, and permanent institutional archives.",
    projects: "BukSU CMS-V2 Manuscript S3 Storage, Archival Vault."
  },
  "redis": {
    systemRole: "In-memory session buffer & query acceleration layer.",
    xp: "Cached active defense evaluation rubrics, panel consensus locks, and high-frequency vector search queries to maintain sub-5ms response times.",
    projects: "BukSU CMS-V2 Deliberation Session Buffer, API Rate Limiter."
  },
  "git": {
    systemRole: "Distributed version control & deployment orchestration.",
    xp: "Maintained modular branch workflows, pull request reviews, defense release tags, and automated continuous integration for university deployment.",
    projects: "GitHub: Patkik/Capstone-management-system."
  },
  "javascript": {
    systemRole: "Runtime behavioral engine & client event loop.",
    xp: "Orchestrated asynchronous PDF uploads, canvas telemetry rendering, real-time rubric calculations, and DOM lifecycle optimizations.",
    projects: "BukSU CMS-V2 Client Runtime, Capstone Matrix Engine."
  },
  "html": {
    systemRole: "Semantic markup foundation & accessibility compliance.",
    xp: "Crafted WCAG 2.2 AA compliant document structures, accessible rubric form controls, and screen-reader navigable defense matrices.",
    projects: "BukSU CMS-V2 Accessible Interfaces, Portfolio Shell."
  },
  "css": {
    systemRole: "Tailwind CSS styling engine & HUD visual system.",
    xp: "Engineered clean developer dark-mode layouts, high-contrast typography, responsive mobile grids, and subtle HUD indicators.",
    projects: "BukSU CMS-V2 Design System, Terminal Showcase."
  },
  "java": {
    systemRole: "Object-oriented enterprise service & backend foundation.",
    xp: "Applied enterprise software patterns, relational database design principles, and secure API architecture derived from university coursework.",
    projects: "BukSU Academic Enterprise Computing, Backend Foundation."
  },
  "mysql": {
    systemRole: "Relational database schema design & institutional benchmarks.",
    xp: "Designed 3NF normalized institutional records, foreign key constraints, and comparative query benchmarks alongside MongoDB.",
    projects: "BukSU Capstone Audit Benchmarks, Relational Data Records."
  },
  "agentic a.i": {
    systemRole: "Autonomous architectural code partner & full-stack accelerator.",
    xp: "Utilized agentic pairing to stress-test OCR extraction pipelines, scaffold complex state machines, optimize vector queries, and verify accessibility.",
    projects: "BukSU CMS-V2 Development Cycle, Antigravity Engineering Workflows."
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
  favColorRevealed: "Blue",
  birthdayPlaceholder: "[REDACTED]",
  birthdayRevealed: "Sept 19, 2004",
  textPart2: ", birthday ",
  threatQuote: "My dream is to be a dinosaur someday so I can eat every single person that hurts my feelings."
};

export const SYSTEM_SPECS_DATA: SystemSpecs = {
  favColorRevealed: "BLUE",
  birthdayRevealed: "SEPTEMBER 19, 2004",
  geolocation: "PH_CORE.SYS"
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

