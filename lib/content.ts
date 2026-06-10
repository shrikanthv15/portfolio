// Single source of truth for portfolio content.
// Authoritative source: "Shrikanth Vilvadrinath Resume 2026.pdf" (2026-06-09),
// cross-checked with GitHub. Old-site broken links (wrong GH username, mismatched
// email) are FIXED here.

export const profile = {
  name: "Shrikanth Vilvadrinath",
  shortName: "Shrikanth",
  role: "AI Engineer",
  tagline: "An AI built this site. I built the AI.",
  location: "Washington, DC",
  email: "shri15@terpmail.umd.edu",
  github: "https://github.com/shrikanthv15",
  githubHandle: "shrikanthv15",
  linkedin: "https://www.linkedin.com/in/shrikanthv15",
  resumeUrl: "/resume.pdf", // resume PDF lives in /public
} as const;

// First-person, specific voice — built from the resume summary.
export const about = {
  lede:
    "I build production autonomous systems — agentic mortgage platforms, manufacturing ERPs, clinical AI pipelines, and live agent-to-agent networks that run without me in the room.",
  body: [
    "I'm an AI engineer finishing an MS in Data Science at the University of Maryland (4.0), after IIT Madras and an engineering degree in Ahmedabad. My work is multi-agent orchestration — LangGraph workflows, Temporal-backed pipelines, MCP servers, and A2A agent teams.",
    "I care about the unglamorous parts: durability, recoverability, interpretability, and systems that fail gracefully at 3am. The fun part is when a fleet of agents ships real work while I sleep.",
  ],
};

// Field Note 02 — the differentiator (the live A2A system)
export const machine = {
  eyebrow: "Field Note 02 — The Machine",
  title: "I don't vibe-code. I command a team of agents.",
  body: [
    "I run an autonomous multi-agent stack in production. OpenClaw brokers structured task envelopes between agents — Kratos orchestrates, Loki scouts, Mimir writes and publishes, Hermes keeps the books — communicating asynchronously over Google ADK's A2A protocol and self-correcting around the clock.",
    "A 'Justice League' of build agents ships code through the same envelope system, each commit attributed to the hero that wrote it. The newsroom ingests live feeds, reasons over them, and publishes — no human trigger.",
    "Yes, agents helped build the site you're reading. That's the point: a generic AI site hides where it came from. This one shows you — because the origin is a system most engineers can't build.",
  ],
  links: [
    { label: "Pantheon — live newsroom", href: "https://pantheon.twoby2.dev" },
    { label: "Control dashboard", href: "https://kratos.twoby2.dev" },
    { label: "Source", href: "https://github.com/shrikanthv15/the-pantheon" },
  ],
};

// ── Field Note 03 — the card file ─────────────────────────────────────────
// Six index cards dealt out of the journal's card file. `face` is the short
// hook on the front; `back` is the detail revealed on flip.
export type ProjectCard = {
  no: string;
  title: string;
  year: string;
  stamp: "LIVE" | "PRODUCTION" | "RESEARCH";
  face: string;
  back: string;
  outcome?: string;
  stack: string[];
  href?: string;
  hrefLabel?: string;
};

export const projectCards: ProjectCard[] = [
  {
    no: "01",
    title: "The Pantheon",
    year: "2026",
    stamp: "LIVE",
    face: "An autonomous A2A newsroom — agents publish articles around the clock with no human trigger.",
    back: "Kratos orchestrates, Loki scouts, Mimir writes and publishes, Hermes keeps the books. OpenClaw brokers structured task envelopes between them over Google ADK's A2A protocol, self-correcting 24/7 on a DigitalOcean VPS.",
    outcome: "Live in production — the same agent team helped build this site.",
    stack: ["Next.js", "OpenClaw", "A2A / ADK", "Supabase", "DigitalOcean"],
    href: "https://pantheon.twoby2.dev",
    hrefLabel: "pantheon.twoby2.dev",
  },
  {
    no: "02",
    title: "Agentic Loan Origination",
    year: "2026",
    stamp: "PRODUCTION",
    face: "A multi-tenant mortgage platform — borrower application to underwriting decision, run by agents.",
    back: "AI document review, income verification, and underwriting decisioning behind role-specific portals, with ULDD compliance export and multi-investor rate pricing. Four MCP servers handle document retrieval, data extraction, and encrypted multi-party email; Temporal makes every stage durable and recoverable.",
    outcome: "Shipped end-to-end at Confer Solutions AI.",
    stack: ["Next.js", "Temporal.io", "LangGraph", "MCP", "Supabase", "BullMQ"],
  },
  {
    no: "03",
    title: "StoneFactory ERP",
    year: "2026",
    stamp: "PRODUCTION",
    face: "A full manufacturing ERP — sales to production planning to inventory — with a field-team PWA.",
    back: "Sales orders, purchasing, CRM, production planning, inventory and wastage tracking, multi-level approvals — plus a React Native PWA giving factory field teams real-time production access from the floor.",
    outcome: "Second production platform shipped at Confer Solutions AI.",
    stack: ["Next.js", "Fastify", "Drizzle", "Redis", "Turborepo", "React Native"],
  },
  {
    no: "04",
    title: "Git Gardener",
    year: "2026",
    stamp: "LIVE",
    face: "Connect a repo, get an LLM-generated reorganisation plan ranked by impact.",
    back: "A FastAPI backend decomposes each repo into a Temporal activity chain that classifies files, scores complexity, and ranks a cleanup roadmap — automatic retries, per-repo drill-down, GitHub OAuth, results persisted in Postgres.",
    outcome: "Temporal-powered ingestion, live at gardener.twoby2.dev.",
    stack: ["FastAPI", "Temporal.io", "Next.js", "PostgreSQL", "Docker"],
    href: "https://gardener.twoby2.dev",
    hrefLabel: "gardener.twoby2.dev",
  },
  {
    no: "05",
    title: "Clinical Intake AI",
    year: "2025",
    stamp: "PRODUCTION",
    face: "Agentic patient intake for a longevity imaging centre — forms to follow-ups, no manual handoff.",
    back: "Agents extract and structure form data, run eligibility checks, and send automated follow-ups. A document-intelligence layer runs diagnostic reports through an LLM pipeline with standardised terminology and an interactive Q&A interface.",
    outcome: "~35% faster review; 90%+ of queries resolved autonomously across 100+ reports.",
    stack: ["LangGraph", "LangChain", "Ollama", "Next.js", "Supabase", "Python"],
  },
  {
    no: "06",
    title: "Diffusion / DiT Anomaly Detection",
    year: "2025",
    stamp: "RESEARCH",
    face: "Industrial surface-defect detection on MVTec AD with a modular diffusion / DiT pipeline.",
    back: "A reproducible training pipeline with custom anomaly scoring and config-driven experiment management — diffusion-based reconstruction error against DiT-style backbones for defect localisation.",
    outcome: "Graduate research, UMD DATA612.",
    stack: ["PyTorch", "Python", "MVTec AD", "Conda"],
    href: "https://github.com/shrikanthv15",
    hrefLabel: "github.com/shrikanthv15",
  },
];

export type Job = {
  org: string;
  role: string;
  period: string;
  place: string;
  detail: string;
  highlights?: string[];
  stack?: string[];
};

export const experience: Job[] = [
  {
    org: "Confer Solutions AI",
    role: "AI Engineer",
    period: "Jan 2026 — May 2026",
    place: "Remote",
    detail:
      "Built two production agentic platforms end-to-end.",
    highlights: [
      "Agentic Loan Origination System: a multi-tenant mortgage platform taking a borrower from application through AI document review, income verification, and underwriting decisioning — role-specific portals, ULDD compliance export, multi-investor rate pricing. Four MCP servers handle document retrieval, mortgage data extraction, and encrypted multi-party email; Temporal workflows make every origination stage durable and fully recoverable.",
      "StoneFactory ERP: a full manufacturing ERP — sales orders, purchasing, CRM, production planning, inventory, wastage tracking, and multi-level approvals — plus a React Native PWA giving field teams real-time production access.",
    ],
    stack: ["Next.js", "TypeScript", "Temporal.io", "LangGraph", "Supabase", "BullMQ", "Redis", "Turborepo", "Fastify", "Drizzle"],
  },
  {
    org: "NV Rad Imaging",
    role: "AI Engineer",
    period: "May 2025 — Dec 2025",
    place: "Tampa, FL (Remote)",
    detail:
      "Built an agentic patient-intake platform for a longevity imaging centre — AI agents extract and structure form data, run eligibility checks, and send automated follow-ups end-to-end with no manual handoff.",
    highlights: [
      "A clinical document-intelligence layer runs diagnostic reports through an LLM pipeline that extracts key terms, standardises terminology, and surfaces an interactive Q&A interface.",
      "Reduced review time ~35% and resolved 90%+ of queries autonomously across 100+ reports.",
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "LangGraph", "Python", "LangChain", "Ollama"],
  },
];

export type Education = {
  school: string;
  degree: string;
  period: string;
  place: string;
  gpa?: string;
};

export const education: Education[] = [
  {
    school: "University of Maryland, College Park",
    degree: "M.S. Data Science",
    period: "Aug 2024 — May 2026",
    place: "College Park, MD",
    gpa: "4.0 / 4.0",
  },
  {
    school: "IIT Madras",
    degree: "B.Sc. Data Science",
    period: "Jan 2021 — Dec 2024",
    place: "Chennai, India",
    gpa: "3.5 / 4.0",
  },
  {
    school: "Vishwakarma Govt. Engineering College",
    degree: "B.Tech. Electronics & Communication",
    period: "Sep 2020 — Jun 2024",
    place: "Ahmedabad, India",
    gpa: "3.5 / 4.0",
  },
];

export const achievements = [
  "Rank 5 — DSA Competition, IIT Madras",
  "NumPy ML Certification (IITM Proctored Exam)",
  "Member, Code:Black — UMD College Park",
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["TypeScript", "Python", "Java", "C++", "SQL", "R"] },
  {
    group: "AI / Agents",
    items: ["LangGraph", "Temporal.io", "OpenClaw", "MCP", "A2A Communication", "Agent Teams", "Langfuse", "Vercel AI SDK", "@ai-sdk (Anthropic / OpenAI)"],
  },
  { group: "Web", items: ["Next.js", "React", "Fastify", "FastAPI", "Flask", "Django", "React Native (Expo)"] },
  { group: "ML / Data", items: ["PyTorch", "TensorFlow", "scikit-learn", "Pandas"] },
  {
    group: "Cloud / Infra",
    items: ["AWS (S3, SageMaker)", "GCP", "PostgreSQL", "Supabase", "Redis", "Docker", "Turborepo", "Vercel", "DigitalOcean", "Kafka"],
  },
];

export const nav = [
  { label: "Who", href: "#who" },
  { label: "The Machine", href: "#machine" },
  { label: "Work", href: "#work" },
  { label: "Track record", href: "#experience" },
  { label: "Foundations", href: "#education" },
  { label: "Contact", href: "#contact" },
];
