// src/Portfolio.jsx
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  FileDown,
  MapPin,
  Sparkles,
  Briefcase,
  GraduationCap,
  ExternalLink,
} from "lucide-react";

/* ===== Theme ===== */
const NAME = { text: "text-white" }; // header name color (clean + readable)
const ACCENT = {
  text: "text-[#FF9900]",                 // AWS orange text
  bg: "bg-[#FF9900] hover:bg-[#e68900]",  // AWS orange button
};

/* ===== Profile ===== */
const PROFILE = {
  name: "Bhargavi Arya Siva",
  tagline: "AI/ML Engineer • Data Scientist • Analytics Storyteller",
  blurb:
    "Master's in Statistical Data Science @ FSU (Dec 2025). 3.7 years' industry experience across NLP, fraud/risk, and predictive analytics. I design data products that are robust, explainable, and production-ready.",
  location: "Tallahassee, FL, USA",
  email: "bhargaviarya11@gmail.com",
  links: {
    github: "https://github.com/BhargaviArya/BhargaviArya",
    linkedin: "https://www.linkedin.com/in/bhargavi-arya-siva-897287169/",
  },
};

/* Resume URL that works locally AND on GitHub Pages */
const RESUME_URL = import.meta.env.BASE_URL + "resume.pdf";

/* Email links that work everywhere (Gmail/Outlook/mail app) */
const EMAIL = (() => {
  const to = PROFILE.email;
  const subject = encodeURIComponent("Hello Bhargavi — from your portfolio");
  const body = encodeURIComponent("Hi Bhargavi,\n\nI saw your portfolio and...");
  return {
    gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}&body=${body}`,
    outlook: `https://outlook.live.com/mail/0/deeplink/compose?to=${to}&subject=${subject}&body=${body}`,
    mailto: `mailto:${to}?subject=${subject}&body=${body}`,
  };
})();

/* ===== Data ===== */
const SKILLS = [
  ["Python", "SQL", "R", "Pandas", "NumPy", "Spark"],
  ["Regression/GLM", "Tree Models", "Lasso/Ridge", "XGBoost", "NLP", "LLMs"],
  ["AWS", "GCP", "Azure", "Docker", "FastAPI/Flask", "Power BI", "Tableau"],
];

const PROJECTS = [
  {
    title: "Banking Revenue Prediction",
    tags: ["Regression", "Lasso", "Python"],
    summary:
      "End-to-end pipeline to forecast monthly revenue with EDA, VIF checks, cross-validation, and influence analysis (Cook’s D).",
    code: "https://github.com/USERNAME/revenue-model",
    demo: "#",
  },
  {
    title: "Healthcare Fraud Detection",
    tags: ["Classification", "Fraud", "ML"],
    summary:
      "Gradient boosting with feature engineering for insurer claims; added monitoring and drift alerts.",
    code: "https://github.com/USERNAME/healthcare-fraud",
    demo: "#",
  },
  {
    title: "NLP Customer Support Copilot",
    tags: ["NLP", "LLM", "GenAI"],
    summary:
      "LLM assistant with retrieval-augmented generation that reduced response time in pilots.",
    code: "https://github.com/USERNAME/llm-copilot",
    demo: "#",
  },
];

const EXPERIENCE = [
  {
    role: "Software Development Engineer (AI)",
    org: "MResult Services",
    period: "2021 — 2023",
    bullets: [
      "Built NLP chatbots and a voice interface for Indigo Airlines.",
      "Deployed GenAI features with OpenAI/HF; reduced handle time by 18% (internal).",
    ],
  },
  {
    role: "Machine Learning Engineer",
    org: "Quadratic Insights Pvt. Ltd.",
    period: "2019 — 2021",
    bullets: [
      "Fraud detection for HDFC Bank; automated ETL with Airflow/Kafka.",
      "Delivered monitoring pipelines and model drift alerts.",
    ],
  },
];

const EDUCATION = [
  {
    degree: "M.S. Statistical Data Science",
    school: "Florida State University",
    period: "2024 — 2025",
    details:
      "Capstone: Predicting Monthly Revenue from Banking Customers (Lasso, CV, diagnostics).",
  },
  {
    degree: "PG Diploma in Artificial Intelligence",
    school: "CDAC (India)",
    period: "2022 — 2023",
    details: "Projects in NLP, MLOps, and computer vision.",
  },
];

/* ===== UI Bits ===== */
const Section = ({ id, title, icon, children }) => (
  <section id={id} className="scroll-mt-24">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-2 mb-6">
        {icon}
        <h2 className="text-2xl md:text-3xl font-semibold">{title}</h2>
      </div>
      {children}
    </div>
  </section>
);

const Tag = ({ children }) => <span className="tag">{children}</span>;

/* ===== Page ===== */
export default function Portfolio() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return PROJECTS;
    return PROJECTS.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.tags.join(" ").toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-[#262626] backdrop-blur bg-[#0f0f0f]/80">
        <div className="max-w-6xl mx-auto h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <a
            href="#home"
            className={`font-extrabold tracking-tight ${NAME.text} text-3xl md:text-4xl`}
            title="Back to top"
          >
            {PROFILE.name}
          </a>
          <nav className="hidden md:flex items-center gap-6 text-[#e5e7eb]">
            {[
              ["About", "about"],
              ["Skills", "skills"],
              ["Projects", "projects"],
              ["Experience", "experience"],
              ["Education", "education"],
              ["Contact", "contact"],
            ].map(([label, id]) => (
              <a key={id} href={`#${id}`} className="hover:underline underline-offset-4">
                {label}
              </a>
            ))}
          </nav>
          <a
            href={RESUME_URL}
            className="btn btn-primary"
            title="Open resume"
            target="_blank"
            rel="noreferrer"
          >
            <FileDown size={16} /> Resume
          </a>
        </div>
      </header>

      {/* Hero */}
      <Section id="home" title="" icon={<></>}>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight"
            >
              <span className={`${ACCENT.text}`}>AI/ML Engineer</span>{" "}
              <span className="text-white">• Data Scientist • Analytics Storyteller</span>
            </motion.h1>

            <p className="mt-4 text-[#d1d5db] leading-relaxed">{PROFILE.blurb}</p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a className="btn btn-outline" href={PROFILE.links.github} target="_blank" rel="noreferrer">
                <Github size={16} /> GitHub
              </a>
              <a className="btn btn-outline" href={PROFILE.links.linkedin} target="_blank" rel="noreferrer">
                <Linkedin size={16} /> LinkedIn
              </a>

              {/* Email buttons */}
              <a className="btn btn-primary" href={EMAIL.gmail} target="_blank" rel="noreferrer">
                <Mail size={16} /> Email
              </a>
              <a className="btn btn-outline" href={EMAIL.mailto}>
                <Mail size={16} /> Open in Mail App
              </a>
              <button
                className="btn btn-outline"
                onClick={() => navigator.clipboard.writeText(PROFILE.email)}
                title="Copy email to clipboard"
              >
                <Mail size={16} /> Copy Email
              </button>
            </div>

            <div className="mt-4 flex items-center gap-2 text-sm text-[#a3a3a3]">
              <MapPin size={16} /> {PROFILE.location}
            </div>
          </div>

          <div className="md:justify-self-end">
            <div className="card">
              <div className="flex items-start gap-3">
                <Sparkles className={`${ACCENT.text}`} size={20} />
                <div>
                  <p className="font-semibold">Currently</p>
                  <p className="text-sm text-[#cbd5e1]">
                    Building explainable AI systems and practical analytics for healthcare & finance.
                  </p>
                </div>
              </div>
              <div className="hr" />
              <div className="flex items-start gap-3">
                <Briefcase className={`${ACCENT.text}`} size={20} />
                <div>
                  <p className="font-semibold">Open to</p>
                  <p className="text-sm text-[#cbd5e1]">
                    Full-time roles in AI/ML, Data Science, or Analytics Engineering.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* About */}
      <Section id="about" title="About" icon={<Sparkles size={20} className={`${ACCENT.text}`} />}>
        <p className="max-w-3xl text-[#d1d5db]">
          I’m a data scientist focused on building production-grade ML systems with clear business
          impact. I care about good engineering, reproducible research, and readable dashboards.
        </p>
      </Section>

      {/* Skills */}
      <Section id="skills" title="Skills" icon={<Sparkles size={20} className={`${ACCENT.text}`} />}>
        <div className="grid md:grid-cols-3 gap-6">
          {SKILLS.map((col, i) => (
            <div key={i} className="card">
              <ul className="space-y-2 text-sm">
                {col.map((s) => (
                  <li key={s} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#FF9900]" />
                    <span className="text-[#e5e7eb]">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Projects */}
      <Section id="projects" title="Projects" icon={<Sparkles size={20} className={`${ACCENT.text}`} />}>
        <div className="mb-6">
          <input
            className="w-full md:w-96 bg-[#111] text-white placeholder:text-[#9ca3af] border border-[#2f2f2f] rounded-md px-3 py-2"
            placeholder="Search projects by title, tag, or summary…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((p) => (
            <div key={p.title} className="card hover:shadow-lg transition">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <p className="text-sm text-[#cbd5e1] mt-1">{p.summary}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {p.tags.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  {p.code && (
                    <a
                      href={p.code}
                      target="_blank"
                      rel="noreferrer"
                      className="underline inline-flex items-center gap-1 text-sm"
                    >
                      <Github size={16} /> Code
                    </a>
                  )}
                  {p.demo && (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="underline inline-flex items-center gap-1 text-sm"
                    >
                      <ExternalLink size={16} /> Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Experience */}
      <Section id="experience" title="Experience" icon={<Briefcase size={20} className={`${ACCENT.text}`} />}>
        <div className="space-y-6">
          {EXPERIENCE.map((job) => (
            <div key={job.role} className="card">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{job.role}</h3>
                  <p className="text-sm text-[#cbd5e1]">{job.org}</p>
                </div>
                <span className="text-sm text-[#a3a3a3]">{job.period}</span>
              </div>
              <ul className="list-disc ml-6 mt-3 space-y-2 text-sm text-[#e5e7eb]">
                {job.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Education */}
      <Section
        id="education"
        title="Education"
        icon={<GraduationCap size={20} className={`${ACCENT.text}`} />}>
        <div className="grid md:grid-cols-2 gap-6">
          {EDUCATION.map((e) => (
            <div key={e.degree} className="card">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{e.degree}</h3>
                  <p className="text-sm text-[#cbd5e1]">{e.school}</p>
                </div>
                <span className="text-sm text-[#a3a3a3]">{e.period}</span>
              </div>
              <p className="text-sm text-[#e5e7eb] mt-2">{e.details}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" title="Contact" icon={<Mail size={20} className={`${ACCENT.text}`} />}>
        <div className="grid md:grid-cols-2 gap-6 items-start">
          <div className="card">
            <h3 className="font-semibold">Let’s build something</h3>
            <p className="text-sm text-[#cbd5e1] mt-2">
              I’m open to roles, collaborations, and mentoring. Reach out via email or LinkedIn —
              I usually respond quickly.
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              <a href={EMAIL.gmail} target="_blank" rel="noreferrer" className="btn btn-primary">
                <Mail size={16} /> Email
              </a>
              <a href={PROFILE.links.linkedin} target="_blank" rel="noreferrer" className="btn btn-outline">
                <Linkedin size={16} /> LinkedIn
              </a>
              <a href={PROFILE.links.github} target="_blank" rel="noreferrer" className="btn btn-outline">
                <Github size={16} /> GitHub
              </a>
            </div>
          </div>
          <div className="text-sm text-[#a3a3a3]">
            <p className="mb-2">Preferred: Email</p>
            <p>{PROFILE.email}</p>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="border-t border-[#262626]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-sm text-[#a3a3a3] flex flex-wrap items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} {PROFILE.name}</span>
          <div className="flex items-center gap-3">
            <a href={PROFILE.links.github} className="underline underline-offset-4">GitHub</a>
            <a href={PROFILE.links.linkedin} className="underline underline-offset-4">LinkedIn</a>
            <a href={RESUME_URL} className="underline underline-offset-4" target="_blank" rel="noreferrer">Resume</a>
          </div>
        </div>
      </footer>

      {/* Sticky CTA */}
      <a
        href={EMAIL.gmail}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 shadow-lg px-4 py-3 rounded-full btn-primary"
      >
        Hire Me
      </a>
    </div>
  );
}
