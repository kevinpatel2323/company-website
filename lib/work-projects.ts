export type Outcome = { metric: string; label: string; description: string };
export type ProcessStep = { step: string; title: string; description: string };

export type WorkProject = {
  slug: string;
  title: string;
  category: string;
  year: string;
  tagline: string;
  challenge: string;
  approach: string;
  role: string;
  timeline: string;
  stack: string[];
  outcomes: Outcome[];
  process: ProcessStep[];
  quote: { text: string; author: string; role: string };
  nextSlug: string;
  coverImage: string;
  processImage: string;
};

export const workProjects: WorkProject[] = [
  {
    slug: 'northwind-commerce',
    title: 'Northwind Commerce',
    category: 'Product & platform',
    year: '2025',
    tagline: 'Unified storefront and ops dashboard for a multi-region retailer—latency down, conversion up, and a design system the team still ships with.',
    challenge:
      'Northwind operated three separate storefronts built over six years, each with its own cart engine, analytics stack, and inconsistent UI. Checkout abandon rates were climbing and the ops team couldn\'t see real-time inventory across regions without switching between four different dashboards.',
    approach:
      'We audited every user flow end-to-end before touching a single component. A consolidated design system came first—tokens, typography, and a component library that both the storefront and internal ops tool could share. Engineering embedded alongside our designers from sprint two onwards, ensuring the system was buildable before it was finalised.',
    role: 'Product design, front-end engineering, design system',
    timeline: '6 months',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Postgres', 'Vercel'],
    outcomes: [
      { metric: '38%', label: 'Checkout conversion lift', description: 'Measured over 90-day post-launch window vs same period prior year.' },
      { metric: '61ms', label: 'P95 API latency', description: 'Down from 340ms before the platform consolidation.' },
      { metric: '3→1', label: 'Codebase reduction', description: 'Three legacy repos collapsed into a single monorepo.' },
      { metric: '4×', label: 'Faster feature delivery', description: 'From idea to production deploy, measured over six post-launch sprints.' },
    ],
    process: [
      { step: '01', title: 'Audit & alignment', description: 'Three weeks of stakeholder interviews, analytics deep-dives, and session recordings. We mapped every decision point in the existing checkout flow and identified the nine highest-impact friction points.' },
      { step: '02', title: 'Design system first', description: 'Before any screen design, we built the token layer—spacing, colour, typography—then components, then patterns. The ops team adopted the system mid-project, compressing their parallel workstream by weeks.' },
      { step: '03', title: 'Parallel build', description: 'Design and engineering worked in the same Figma file and the same repo. Weekly demos with Northwind\'s product team meant feedback landed in the same sprint it was given.' },
      { step: '04', title: 'Phased rollout', description: 'The new storefront launched region-by-region with feature flags. Ops tooling followed two weeks later once the inventory sync layer passed load testing. No big-bang cutover.' },
    ],
    quote: {
      text: 'Tachyon didn\'t just redesign our store—they rebuilt our capability to keep improving it ourselves. Six months in and our own team has shipped more than we did in the previous two years.',
      author: 'Jordan Miles',
      role: 'Head of Digital, Northwind Commerce',
    },
    nextSlug: 'helio-health',
    coverImage: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=900&fit=crop&auto=format',
    processImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&h=700&fit=crop&auto=format',
  },
  {
    slug: 'helio-health',
    title: 'Helio Health',
    category: 'Healthcare · Mobile & web',
    year: '2024',
    tagline: 'Patient-first scheduling and care coordination across iOS, Android, and web, with accessibility and compliance baked into every flow.',
    challenge:
      'Helio\'s clinical coordinators were managing appointments, referrals, and follow-ups across three disconnected tools—one a legacy desktop app, one a shared spreadsheet, and one a generic CRM. Patients were falling through gaps. Appointment no-show rates exceeded 30%.',
    approach:
      'Healthcare UX demands deep contextual research. We embedded with coordinators across two clinics for a week before writing a line of design. Accessibility wasn\'t a retrofit—WCAG 2.1 AA was a constraint from the first wireframe. HIPAA compliance shaped every data model decision before engineering began.',
    role: 'UX research, product design, iOS/Android/web engineering',
    timeline: '9 months',
    stack: ['React Native', 'Next.js', 'TypeScript', 'Supabase', 'FHIR API'],
    outcomes: [
      { metric: '31%', label: 'No-show rate reduction', description: 'Smart reminders and frictionless rescheduling drove measurable attendance improvement.' },
      { metric: 'WCAG 2.1 AA', label: 'Accessibility standard', description: 'Full compliance certified by third-party audit before launch.' },
      { metric: '4.8★', label: 'Patient app rating', description: 'Average App Store and Google Play rating within 60 days of launch.' },
      { metric: '22%', label: 'Coordinator time saved', description: 'Measured through time-tracking study two months post-launch.' },
    ],
    process: [
      { step: '01', title: 'Embedded research', description: 'A week on-site with coordinators and a separate round of patient interviews. We catalogued 47 distinct pain points and grouped them into five problem spaces that shaped the entire product roadmap.' },
      { step: '02', title: 'Accessibility-first prototyping', description: 'Every screen was tested with screen readers and keyboard-only navigation before visual polish. Colour contrast, touch targets, and error states were specified in the design system before component build.' },
      { step: '03', title: 'Cross-platform component system', description: 'Shared business logic in a TypeScript core, with platform-specific UI adapters. The same booking engine powers iOS, Android, and web without divergence.' },
      { step: '04', title: 'Compliance review & launch', description: 'A third-party HIPAA and WCAG audit ran in parallel with final QA. Issues were addressed before certification sign-off. Staged rollout across three clinic sites over four weeks.' },
    ],
    quote: {
      text: 'Our coordinators called it the first tool that actually felt like it was designed for them. Patient satisfaction scores improved in the first month.',
      author: 'Dr. Priya Kapoor',
      role: 'Chief Medical Officer, Helio Health',
    },
    nextSlug: 'atlas-finance',
    coverImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=900&fit=crop&auto=format',
    processImage: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=1600&h=700&fit=crop&auto=format',
  },
  {
    slug: 'atlas-finance',
    title: 'Atlas Finance',
    category: 'Fintech · Design systems',
    year: '2024',
    tagline: 'A token-based design system and component library that accelerated delivery for squads building lending and treasury tools.',
    challenge:
      'Six product squads at Atlas were building independently—each with their own component conventions, colour definitions, and interaction patterns. The result was a fragmented product surface that felt different on every screen. Design reviews were bottlenecks. Engineering duplicated the same components across repos.',
    approach:
      'We started with a system audit: cataloguing every component variant, every colour value, every spacing deviation across the six products. The token architecture came next—primitive, semantic, and component-level tokens in a single source of truth. Then components, then documentation, then adoption support.',
    role: 'Design system architecture, component engineering, documentation',
    timeline: '5 months',
    stack: ['React', 'TypeScript', 'Storybook', 'Style Dictionary', 'Figma API'],
    outcomes: [
      { metric: '240+', label: 'Components shipped', description: 'Covering every common pattern across Atlas\'s six product surfaces.' },
      { metric: '68%', label: 'Faster component builds', description: 'Measured by comparing sprint velocity before and after system adoption.' },
      { metric: '100%', label: 'Squad adoption', description: 'All six product squads migrated within eight weeks of the v1 release.' },
      { metric: '1 source', label: 'Token truth', description: 'All design decisions flow from a single Style Dictionary config synced to Figma.' },
    ],
    process: [
      { step: '01', title: 'Audit & inventory', description: 'We crawled every Figma file and every codebase. 1,400 unique colour values collapsed to 34. 6 button variants reduced to 3. The audit report became the system\'s first shared artefact.' },
      { step: '02', title: 'Token architecture', description: 'Primitive tokens → semantic tokens → component tokens. A three-layer model that gives squads flexibility without breaking visual consistency. Dark mode and brand theming fell out naturally.' },
      { step: '03', title: 'Component library build', description: 'Storybook-first development. Every component documented with usage guidelines, do/don\'t examples, and accessibility notes before it was merged into the consuming repos.' },
      { step: '04', title: 'Adoption & enablement', description: 'Migration guides, office hours, and embedded pairing sessions with each squad. We tracked adoption through automated linting rules that flagged non-system usage in PRs.' },
    ],
    quote: {
      text: 'We went from six teams doing their own thing to one coherent product in under two months. The system paid for itself in the first quarter.',
      author: 'Ines Ferreira',
      role: 'VP Product, Atlas Finance',
    },
    nextSlug: 'signal-field',
    coverImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=900&fit=crop&auto=format',
    processImage: 'https://images.unsplash.com/photo-1642790551116-18e150f248e3?w=1600&h=700&fit=crop&auto=format',
  },
  {
    slug: 'signal-field',
    title: 'Signal Field',
    category: 'B2B SaaS',
    year: '2023',
    tagline: 'From brand refresh to production UI: marketing site, app shell, and onboarding that turned a complex product into a clear story.',
    challenge:
      'Signal Field had a powerful data aggregation platform but struggled to communicate its value. The marketing site was technical and dense. The product UI had grown organically and first-time users consistently dropped out before completing setup. Sales cycles were long because prospects couldn\'t self-serve.',
    approach:
      'Brand and product worked in lockstep from the start. The same positioning workshop that shaped the marketing narrative informed the onboarding flow design. We built the story first, then the screens. The result is a product that explains itself as you use it.',
    role: 'Brand strategy, marketing site, product UX, onboarding engineering',
    timeline: '4 months',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Segment'],
    outcomes: [
      { metric: '54%', label: 'Trial-to-paid conversion', description: 'Up from 18% before the onboarding redesign.' },
      { metric: '3 days', label: 'Median time to activation', description: 'Down from 12 days—the point where users complete a meaningful action.' },
      { metric: '2.4×', label: 'Organic demo requests', description: 'Month-over-month growth in inbound pipeline after site launch.' },
      { metric: '40%', label: 'Support ticket reduction', description: 'Contextual onboarding reduced first-week confusion significantly.' },
    ],
    process: [
      { step: '01', title: 'Positioning workshop', description: 'Two days with Signal\'s founders and sales team. We mapped the competitive landscape, identified the one thing Signal does that no one else does, and built a messaging hierarchy that became the brief for both marketing and product design.' },
      { step: '02', title: 'Story-first design', description: 'Marketing site and onboarding flow were designed in parallel—the same narrative thread runs through both. New visitors and new users encounter the same language, the same proof points, the same tone.' },
      { step: '03', title: 'Onboarding engineering', description: 'Progress-based onboarding with contextual tooltips, empty states designed to guide rather than confuse, and celebration moments at each activation milestone. Instrumented with Segment from day one.' },
      { step: '04', title: 'Launch & iteration', description: 'Soft launch to a cohort of 200 trial users with full analytics. Two rapid iteration cycles in the following month based on drop-off data. Full launch in week six.' },
    ],
    quote: {
      text: 'For the first time, prospects get it from the website alone. Our sales team spends the call on value, not explanation.',
      author: 'Tom Vasquez',
      role: 'CEO, Signal Field',
    },
    nextSlug: 'northwind-commerce',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=900&fit=crop&auto=format',
    processImage: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1600&h=700&fit=crop&auto=format',
  },
];

export function getProjectBySlug(slug: string): WorkProject | undefined {
  return workProjects.find((p) => p.slug === slug);
}

export function getNextProject(slug: string): WorkProject | undefined {
  const current = getProjectBySlug(slug);
  if (!current) return undefined;
  return getProjectBySlug(current.nextSlug);
}
