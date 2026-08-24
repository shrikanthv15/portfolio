// Single source of truth for portfolio content.
// Authoritative source: "Shrikanth_Vilvadrinath_AI_Systems_Engineer_ATT.pdf" (2026-07-31),
// cross-checked with GitHub. Old-site broken links (wrong GH username, mismatched
// email) are FIXED here.

export const profile = {
  name: "Shrikanth Vilvadrinath",
  shortName: "Shrikanth",
  role: "AI Systems Engineer",
  tagline: "An AI built this site. I built the AI.",
  location: "Dallas, TX",
  email: "shri15@terpmail.umd.edu",
  github: "https://github.com/shrikanthv15",
  githubHandle: "shrikanthv15",
  linkedin: "https://www.linkedin.com/in/shrikanthv15",
  resumeUrl: "/resume.pdf", // resume PDF lives in /public
} as const;

// First-person, specific voice — built from the resume summary.
export const about = {
  lede:
    "I build enterprise agentic systems — for lending, procure-to-pay, and air-gapped regulated platforms — that keep running when nobody is in the room.",
  body: [
    "I'm an AI systems engineer finishing an MS in Data Science at the University of Maryland (4.0), after IIT Madras and an engineering degree in Ahmedabad. The work I care about is context engineering — LangGraph and MCP orchestration, RAG and vector search, session and context management — running on distributed Temporal workflows across AWS, Docker and CI/CD.",
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

// ── Field Note 03 — Work ───────────────────────────────────────────────────
// Projects stay journal entries: no cards, just project prose, outcomes,
// stack tags, and compact signal rows.
export type ProjectNote = { tag: string; text: string };

export type Project = {
  title: string;
  year: string;
  stamp: "LIVE" | "PRODUCTION" | "RESEARCH";
  blurb: string;
  outcome?: string;
  stack: string[];
  href?: string;
  hrefLabel?: string;
  notes: ProjectNote[];
};

export const projects: Project[] = [
  {
    title: "The Pantheon — Autonomous A2A Newsroom",
    year: "2026",
    stamp: "LIVE",
    blurb:
      "A real-time agent-to-agent newsroom where autonomous agents publish articles, monitor live feeds, and surface oracle data with no human trigger. Agents run 24/7 on a DigitalOcean VPS via OpenClaw + Hermes, communicating over Google ADK's A2A protocol and self-correcting around the clock.",
    outcome: "Live in production — the same agent team helped build this site.",
    stack: ["Next.js", "Supabase", "OpenClaw", "Hermes", "Google ADK / A2A", "DigitalOcean", "Vercel"],
    href: "https://pantheon.twoby2.dev",
    hrefLabel: "pantheon.twoby2.dev",
    notes: [
      { tag: "stack", text: "Next.js · OpenClaw · Hermes · Google ADK (A2A) · Supabase · DigitalOcean" },
      { tag: "architecture", text: "Kratos orchestrates → Loki scouts → Mimir writes/publishes → Hermes audits. Task envelopes over A2A." },
      { tag: "what it does", text: "Ingests live feeds, reasons over them, and publishes articles 24/7 — no human in the loop." },
      { tag: "what it is, really", text: "A software org staffed by agents. I'm the only human, and I'm mostly asleep." },
      { tag: "fun fact", text: "This very portfolio was partly built by the same Justice League of build-agents." },
    ],
  },
  {
    title: "Agentic Loan Origination System",
    year: "2026",
    stamp: "PRODUCTION",
    blurb:
      "A multi-tenant mortgage platform that takes a borrower from application through AI document review, income verification, and underwriting decisioning — role-specific portals, ULDD compliance export, and multi-investor rate pricing. Built end-to-end at Confer Solutions AI.",
    outcome:
      "Four independently signaled Temporal phase workflows with three blocking human gates over 12 lifecycle gates — auto-clear only above 0.90 confidence, and stall detection that scopes a failure to one phase.",
    stack: ["Next.js", "TypeScript", "Temporal.io", "LangGraph", "MCP", "Supabase", "BullMQ"],
    notes: [
      { tag: "stack", text: "Next.js · Temporal.io · LangGraph · 4× MCP servers · Supabase · BullMQ · Redis" },
      { tag: "architecture", text: "Four MCP servers behind a LiteLLM gateway, so every agent stays portable across Anthropic, OpenAI and local models." },
      { tag: "what it does", text: "Application → AI doc review → income verification → underwriting decision, across role-specific portals." },
      { tag: "what it is, really", text: "A loan officer, an underwriter and a compliance team — compressed into a recoverable state machine." },
      { tag: "fun fact", text: "The work-assignment engine routes loans four ways — including an O(1) round-robin pointer keyed on (role, organization)." },
    ],
  },
  {
    title: "Change Management & Release Governance — IL5/IL6 Air-Gapped",
    year: "2026",
    stamp: "PRODUCTION",
    blurb:
      "A release-governance platform for an air-gapped IL5/IL6 enclave with no egress. Layered Terraform provisions the AWS environment under a fixed IAM permission boundary, and a nine-step Temporal workflow carries a signed 163 MB image all the way in — preflight, Zarf packaging, cosign signing, OCI push, migration, deploy, health verification and drift scan.",
    outcome:
      "Five agents scored on a real eval harness — the release advisor verified at 87.5% accuracy with zero false-ready calls.",
    stack: ["Terraform", "AWS (VPC, EC2, IAM)", "Temporal.io", "Langfuse", "Docker", "Gitea", "Ollama", "Next.js"],
    notes: [
      { tag: "stack", text: "Terraform · AWS (VPC, EC2, IAM) · Temporal · Langfuse · Docker · Gitea · Ollama" },
      { tag: "architecture", text: "Layered Terraform under a fixed IAM boundary; a 9-step Temporal release workflow into an enclave with no egress." },
      { tag: "what it does", text: "Five agents in parallel — change risk, compliance, process drift, issue intelligence, release advisor — judge whether a release is safe." },
      { tag: "what it is, really", text: "The change-advisory board, as software, for a network that cannot phone home." },
      { tag: "fun fact", text: "Scored on macro F1, QWK and safety recall against labelled examples — 87.5% accurate, and never once called a bad release ready." },
    ],
  },
  {
    title: "Procure-to-Pay ERP",
    year: "2026",
    stamp: "PRODUCTION",
    blurb:
      "A multi-tenant procure-to-pay ERP built on one signal-driven Temporal approval ladder, assembled at runtime from an approval-matrix table — maker-checker, N-of-M quorum and 24/48/72-hour SLA escalation serving all 33 business flows over a Postgres carrying 80 row-level-security policies. New approval rules ship as configuration, with no redeploy.",
    outcome:
      "A photographed goods-receipt note is parsed on CPU in ~98s and matched to its purchase order across a 15-field schema; anything under 0.75 confidence routes to a human, so nothing unverified reaches the ledger.",
    stack: ["TypeScript", "NestJS", "Temporal.io", "PostgreSQL (RLS)", "Drizzle", "Docling", "Docker", "GitHub Actions"],
    notes: [
      { tag: "stack", text: "TypeScript · NestJS · Temporal · PostgreSQL (RLS) · Drizzle · Docling · Docker" },
      { tag: "architecture", text: "One signal-driven Temporal approval ladder, assembled at runtime from an approval-matrix table." },
      { tag: "what it does", text: "Serves all 33 business flows with maker-checker, N-of-M quorum and 24/48/72-hour SLA escalation." },
      { tag: "what it is, really", text: "Every approval policy a company argues about, expressed once as data instead of code." },
      { tag: "fun fact", text: "80 row-level-security policies keep tenants apart; new approval rules ship as config, no redeploy." },
    ],
  },
  {
    title: "Git Gardener — Agentic Repo Intelligence",
    year: "2026",
    stamp: "LIVE",
    blurb:
      "Connect any GitHub repo and get a full health analysis with an LLM-generated reorganisation plan. A FastAPI backend decomposes each repo into a Temporal activity chain that classifies files, scores complexity, and ranks a cleanup roadmap by impact — with automatic retries and per-repo drill-down.",
    outcome: "Temporal-powered ingestion with GitHub OAuth; results persisted in Postgres.",
    stack: ["Next.js", "FastAPI", "Python", "PostgreSQL", "Temporal.io", "Docker"],
    href: "https://gardener.twoby2.dev",
    hrefLabel: "gardener.twoby2.dev",
    notes: [
      { tag: "stack", text: "FastAPI · Temporal.io · Next.js · PostgreSQL · SQLAlchemy · Docker" },
      { tag: "architecture", text: "Each repo → a Temporal activity chain (classify → score → rank) with automatic retries." },
      { tag: "what it does", text: "Reads a repo and hands back a cleanup roadmap ranked by impact." },
      { tag: "what it is, really", text: "A senior engineer's first-day 'let me reorganise this' instinct, automated." },
      { tag: "fun fact", text: "Built it because I kept doing repo archaeology by hand. Now Gardener does it." },
    ],
  },
  {
    title: "Clinical Intake AI — Longevity Imaging",
    year: "2025",
    stamp: "PRODUCTION",
    blurb:
      "An agentic patient-intake platform for a longevity imaging centre. AI agents extract and structure form data, run eligibility checks, and send automated follow-ups end-to-end with no manual handoff. A document-intelligence layer runs diagnostic reports through an LLM pipeline with an interactive Q&A interface.",
    outcome: "Reduced review time ~35% and resolved 90%+ of queries autonomously across 100+ reports.",
    stack: ["Next.js", "TypeScript", "LangGraph", "LangChain", "Ollama", "Supabase", "Python"],
    notes: [
      { tag: "stack", text: "LangGraph · LangChain · Ollama · Next.js · Supabase · Python" },
      { tag: "architecture", text: "Intake agents + a document-intelligence LLM pipeline that standardises clinical terms." },
      { tag: "what it does", text: "Forms → structured data → eligibility checks → automated follow-ups, no human handoff." },
      { tag: "what it is, really", text: "The front desk and a first-pass radiology assistant, working nights." },
      { tag: "fun fact", text: "~35% faster review and 90%+ of queries resolved on their own, over 100+ reports." },
    ],
  },
  {
    title: "Diffusion / DiT Anomaly Detection",
    year: "2025",
    stamp: "RESEARCH",
    blurb:
      "Industrial surface-defect detection on the MVTec AD dataset using a modular diffusion / DiT-style model — a reproducible training pipeline with custom anomaly scoring and config-driven experiment management. Graduate research at UMD (DATA612).",
    stack: ["Python", "PyTorch", "Conda", "MVTec AD"],
    href: "https://github.com/shrikanthv15",
    hrefLabel: "github.com/shrikanthv15",
    notes: [
      { tag: "stack", text: "PyTorch · Python · Conda · MVTec AD" },
      { tag: "architecture", text: "Diffusion reconstruction error vs DiT-style backbones; config-driven experiment runner." },
      { tag: "what it does", text: "Spots surface defects on industrial parts it has never seen labelled." },
      { tag: "what it is, really", text: "The 'is this part broken?' question, answered without defect labels." },
      { tag: "fun fact", text: "Anomaly scoring is custom — the model learns 'normal', then flags the weird." },
    ],
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
    period: "Jan 2026 — Present",
    place: "Dallas, TX",
    detail:
      "Building enterprise agentic systems for lending, procure-to-pay and air-gapped regulated platforms.",
    highlights: [
      "Agentic Loan Origination System: a multi-tenant mortgage platform taking a borrower from application through AI document review, income verification, and underwriting decisioning — role-specific portals, ULDD compliance export, multi-investor rate pricing. Four MCP servers handle document retrieval, mortgage data extraction, and encrypted multi-party email; Temporal workflows make every origination stage durable and fully recoverable.",
      "Change Management & Release Governance (IL5/IL6, air-gapped): layered Terraform under a fixed IAM permission boundary, and a nine-step Temporal release workflow moving signed 163 MB images into an enclave with no egress. Five agents run in parallel — change risk, compliance, process drift, issue intelligence, release advisor — scored on macro F1, QWK and safety recall against labelled examples and traced to a self-hosted Langfuse; the release advisor verified at 87.5% accuracy with zero false-ready calls.",
      "Procure-to-Pay ERP: one signal-driven Temporal approval ladder assembled at runtime from an approval-matrix table, serving all 33 business flows with maker-checker, N-of-M quorum and 24/48/72-hour SLA escalation over a multi-tenant Postgres carrying 80 row-level-security policies. A photographed goods-receipt note parses on CPU in ~98s and matches its purchase order across a 15-field schema, with anything under 0.75 confidence routed to review.",
    ],
    stack: ["LangGraph", "LangChain", "MCP", "Temporal.io", "LiteLLM", "Terraform", "AWS", "NestJS", "PostgreSQL (RLS)", "Langfuse", "Next.js"],
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
  { group: "Languages", items: ["Python", "TypeScript", "SQL", "Bash"] },
  {
    group: "Agentic AI",
    items: ["LangGraph", "LangChain", "LangSmith", "MCP (Model Context Protocol)", "A2A", "Temporal.io", "Vercel AI SDK", "Multi-agent orchestration", "Tool calling", "Anthropic / OpenAI / Ollama"],
  },
  {
    group: "Context engineering",
    items: ["RAG pipelines", "Vector search", "Session & context management", "Prompt engineering", "Confidence thresholds", "Human-in-the-loop gating"],
  },
  {
    group: "Evaluation",
    items: ["Langfuse", "Agent eval harnesses", "Macro F1 / accuracy / QWK", "Safety recall", "Playwright"],
  },
  {
    group: "Backend",
    items: ["FastAPI", "Flask", "Django", "NestJS", "Fastify", "SQLAlchemy", "Drizzle", "REST", "WebSockets"],
  },
  {
    group: "Data",
    items: ["PostgreSQL (RLS, multi-tenant)", "Supabase", "Redis", "pgvector", "Qdrant"],
  },
  {
    group: "Cloud / Infra",
    items: ["AWS (EC2, S3, VPC, IAM)", "Terraform", "Docker", "GitHub Actions CI/CD", "LiteLLM"],
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
