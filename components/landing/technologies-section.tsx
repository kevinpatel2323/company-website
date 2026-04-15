"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type Category = {
  id: string;
  label: string;
  tagline: string;
  description: string;
  cta: string;
  technologies: string[];
};

const categories: Category[] = [
  {
    id: "frontend",
    label: "Front End",
    tagline: "Your Very Own UI/UX Architects",
    description:
      "Experience smooth navigation and user-friendly designs with our front-end expertise. We craft pixel-perfect interfaces that delight users and drive results.",
    cta: "Hire Frontend Developer",
    technologies: [
      "React.js", "Next.js", "Angular", "Vue.js",
      "TypeScript", "Tailwind CSS", "Framer Motion", "WebGL",
    ],
  },
  {
    id: "backend",
    label: "Backend",
    tagline: "Scalable, Secure & Rock-Solid APIs",
    description:
      "Build performant server-side systems designed to handle any load. From microservices to monoliths, we architect backends that grow seamlessly with your product.",
    cta: "Hire Backend Developer",
    technologies: [
      "Node.js", "Python", "Go", "GraphQL",
      "REST APIs", "tRPC", "Prisma", "Hono",
    ],
  },
  {
    id: "mobile",
    label: "Mobile",
    tagline: "Innovating Mobile-Friendly App Solutions",
    description:
      "Create dynamic mobile apps that make your brand stand out from the crowd. Native and cross-platform, built with accessibility and performance at the core.",
    cta: "Hire Mobile App Developer",
    technologies: [
      "iOS (Swift)", "Android (Kotlin)", "Flutter",
      "React Native", "Expo", "SwiftUI", "Jetpack Compose",
    ],
  },
  {
    id: "databases",
    label: "Databases",
    tagline: "Data That Works as Hard as You Do",
    description:
      "Design schemas, optimise queries, and build data pipelines that scale. The right database for each job, architected for long-term reliability and speed.",
    cta: "Talk to a Data Engineer",
    technologies: [
      "PostgreSQL", "Supabase", "MongoDB", "Redis",
      "MySQL", "PlanetScale", "Neon", "ClickHouse",
    ],
  },
  {
    id: "devops",
    label: "DevOps & Infra",
    tagline: "Ship Faster, Break Nothing",
    description:
      "CI/CD pipelines, container orchestration, and infrastructure-as-code that lets your team deploy with full confidence on every push.",
    cta: "Hire DevOps Engineer",
    technologies: [
      "Docker", "Kubernetes", "AWS", "Vercel",
      "GitHub Actions", "Terraform", "Datadog", "Pulumi",
    ],
  },
  {
    id: "ai",
    label: "AI & Data Stack",
    tagline: "Intelligence Built Into Your Product",
    description:
      "Integrate LLMs, build RAG pipelines, and ship AI features that actually work in production — from fast prototypes to production-grade AI infrastructure.",
    cta: "Build AI Features",
    technologies: [
      "OpenAI", "Anthropic", "LangChain", "LlamaIndex",
      "PyTorch", "Pinecone", "Hugging Face", "Vercel AI SDK",
    ],
  },
  {
    id: "vibe",
    label: "Vibe Coding",
    tagline: "Move at the Speed of Thought",
    description:
      "We pair senior engineering judgment with the latest AI-assisted development tools to ship higher-quality code, faster. Vibe coding done right.",
    cta: "See How We Work",
    technologies: [
      "Cursor", "Claude", "GitHub Copilot", "v0.dev",
      "Lovable", "Bolt.new", "Windsurf", "Replit Agent",
    ],
  },
];

export function TechnologiesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [contentKey, setContentKey] = useState(0);
  const tabListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); } },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const switchTab = (idx: number) => {
    if (idx === activeIdx) return;
    setActiveIdx(idx);
    setContentKey(k => k + 1);
    /* scroll active tab into view on mobile */
    const tabs = tabListRef.current?.querySelectorAll("button");
    tabs?.[idx]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  const active = categories[activeIdx];

  return (
    <section id="technologies" ref={sectionRef} className="relative py-24 lg:py-32 border-t border-foreground/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        {/* ── Header ────────────────────────────────────────────── */}
        <div className="mb-14 lg:mb-20">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            Technologies
          </span>
          <h2 className={`text-4xl lg:text-6xl font-display tracking-tight transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            Every layer of
            <br />
            <span className="text-muted-foreground">the modern stack</span>
          </h2>
        </div>

        {/* ── Tab row + panel ───────────────────────────────────── */}
        <div className={`transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>

          {/* Tab bar — horizontal scroll on mobile, wraps on lg */}
          <div
            ref={tabListRef}
            role="tablist"
            aria-label="Technology categories"
            className="mb-0 flex overflow-x-auto gap-0 border-b border-foreground/10 scrollbar-none lg:overflow-visible"
          >
            {categories.map((cat, i) => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={i === activeIdx}
                aria-controls={`tech-panel-${cat.id}`}
                onClick={() => switchTab(i)}
                className={`relative shrink-0 px-5 py-4 text-sm font-mono transition-colors duration-200 whitespace-nowrap focus-visible:outline-none
                  ${i === activeIdx
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground/70"
                  }`}
              >
                {cat.label}
                {/* active underline */}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] w-full bg-foreground transition-all duration-300 ${
                    i === activeIdx ? "opacity-100" : "opacity-0"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Panel */}
          <div
            key={contentKey}
            id={`tech-panel-${active.id}`}
            role="tabpanel"
            className="tech-panel-enter grid gap-10 border border-t-0 border-foreground/10 p-8 lg:grid-cols-2 lg:gap-16 lg:p-12"
          >
            {/* Left: tech tags */}
            <div>
              <p className="mb-6 text-xs font-mono uppercase tracking-widest text-muted-foreground">
                {active.label} Stack
              </p>
              <div className="flex flex-wrap gap-3">
                {active.technologies.map((tech, i) => (
                  <span
                    key={tech}
                    className="tech-tag-enter inline-flex items-center rounded-full border border-foreground/15 bg-foreground/[0.04] px-4 py-2 text-sm font-mono text-foreground/80 transition-colors duration-200 hover:border-foreground/30 hover:bg-foreground/[0.08]"
                    style={{ animationDelay: `${i * 45}ms` }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: copy + CTA */}
            <div className="flex flex-col justify-between gap-8">
              <div>
                <h3
                  className="mb-4 text-2xl font-display tracking-tight lg:text-3xl"
                  style={{ animationDelay: "80ms" }}
                >
                  {active.tagline}
                </h3>
                <p className="leading-relaxed text-muted-foreground lg:text-lg">
                  {active.description}
                </p>
              </div>

              <div>
                <Link href={`/contact?interest=${active.id}`}>
                  <Button
                    size="lg"
                    className="h-13 rounded-full bg-foreground px-7 text-sm text-background hover:bg-foreground/90 group"
                  >
                    {active.cta}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
