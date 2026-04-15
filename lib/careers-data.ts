import { Wifi, Clock, BookOpen, Heart, TrendingUp, Globe, Monitor, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type Position = {
  id: string;
  title: string;
  department: string;
  type: 'Full-time' | 'Contract';
  location: string;
  tagline: string;
  about: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
};

export type Perk = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const positions: Position[] = [
  {
    id: 'senior-product-designer',
    title: 'Senior Product Designer',
    department: 'Design',
    type: 'Full-time',
    location: 'Remote · Americas / Europe',
    tagline: 'Shape how people experience our clients\' products end to end.',
    about:
      'We\'re looking for a product designer who moves fluidly between strategy and craft — someone as comfortable running a discovery sprint as they are pushing pixels. You\'ll work directly with clients, own flows from concept through handoff, and set the quality bar for everything that ships.',
    responsibilities: [
      'Lead product design across discovery, design, and delivery phases for 2–3 client projects simultaneously.',
      'Facilitate research sessions, workshops, and design critiques with both internal and client teams.',
      'Own the design system contribution process — proposing, building, and documenting new components.',
      'Produce detailed interaction specifications that engineering can implement without ambiguity.',
      'Mentor mid-level designers through code review-style design reviews.',
    ],
    requirements: [
      '5+ years of product design experience on digital products (not just marketing sites).',
      'A portfolio demonstrating shipped work with measurable user or business outcomes.',
      'Deep proficiency in Figma including component architecture and auto-layout.',
      'Experience conducting and synthesising qualitative user research.',
      'Strong written communication — you write design rationale, not just post screenshots.',
    ],
    niceToHave: [
      'Experience with design tokens and design-system tooling (Style Dictionary, Storybook).',
      'Basic front-end fluency — can read React/TypeScript and understand what you\'re asking engineers to build.',
      'Healthcare, fintech, or enterprise SaaS domain experience.',
    ],
  },
  {
    id: 'full-stack-engineer',
    title: 'Full-Stack Engineer',
    department: 'Engineering',
    type: 'Full-time',
    location: 'Remote · Worldwide',
    tagline: 'Build resilient, well-crafted products from API to interface.',
    about:
      'You\'ll be a core contributor on client product builds — owning features from database schema through polished UI. We work in Next.js, TypeScript, and Postgres mostly, but bring the right tool to each project. You care about the quality of what you ship, not just whether it works.',
    responsibilities: [
      'Design and build full-stack features across web apps and internal platforms.',
      'Collaborate closely with product designers — you push back on unimplementable specs and propose better patterns.',
      'Set up and maintain CI/CD pipelines, observability tooling, and deployment infrastructure.',
      'Conduct thorough code reviews and maintain high standards for test coverage.',
      'Contribute to architectural decisions and technical documentation.',
    ],
    requirements: [
      '4+ years of professional experience building production web applications.',
      'Strong proficiency in TypeScript and React (Next.js App Router preferred).',
      'Experience with relational databases — schema design, query optimisation, migrations.',
      'Understanding of web performance, Core Web Vitals, and accessibility at the implementation level.',
      'Comfortable owning a feature from ticket to production without hand-holding.',
    ],
    niceToHave: [
      'Experience with Vercel, Supabase, or similar modern deployment stacks.',
      'Design sensibility — you notice when spacing is off and say so.',
      'Open-source contributions or a visible technical portfolio.',
    ],
  },
  {
    id: 'product-strategist',
    title: 'Product Strategist',
    department: 'Strategy',
    type: 'Full-time',
    location: 'Remote · Americas preferred',
    tagline: 'Help clients figure out what to build before we build it.',
    about:
      'We need someone who can sit across the table from a founding team, understand their business model and user base, and turn ambiguous problems into a clear product direction. You\'ll run discovery engagements, own roadmap development, and be the client\'s thinking partner before a single screen is designed.',
    responsibilities: [
      'Lead 2–4 week discovery engagements including stakeholder interviews, competitive analysis, and opportunity sizing.',
      'Translate research into product strategy documents, opportunity briefs, and prioritised roadmaps.',
      'Define success metrics and measurement plans alongside client product owners.',
      'Facilitate alignment workshops with client leadership to resolve competing priorities.',
      'Support business development by shaping proposals and scoping new engagements.',
    ],
    requirements: [
      '4+ years in product management, product strategy, or management consulting with a digital product focus.',
      'Track record of defining product direction that resulted in shipped features with measurable impact.',
      'Fluent in both qualitative research and quantitative analysis — you can read a funnel as well as run an interview.',
      'Strong executive presence and written communication.',
      'Experience working at or with early-stage startups or in high-growth product environments.',
    ],
    niceToHave: [
      'Experience with SaaS pricing and monetisation strategy.',
      'Familiarity with fintech, healthtech, or B2B software domains.',
      'Basic UX / wireframing ability — enough to sketch concepts in a whiteboard session.',
    ],
  },
  {
    id: 'design-engineer',
    title: 'Design Engineer',
    department: 'Design & Engineering',
    type: 'Full-time',
    location: 'Remote · Worldwide',
    tagline: 'Live at the intersection of beautiful interfaces and clean code.',
    about:
      'A rare hybrid role for someone who designs in Figma and builds in React with equal fluency. You\'ll own the highest-fidelity, most interaction-rich parts of our client products — the moments where design and engineering need to be a single brain. You\'ll also champion our design system, ensuring what ships matches what was designed.',
    responsibilities: [
      'Prototype complex interactions in code that serve as the production implementation, not just a proof of concept.',
      'Build and maintain design-system components in both Figma and Storybook, keeping them in sync.',
      'Collaborate with product designers upstream and full-stack engineers downstream.',
      'Define animation and motion guidelines — and then implement them.',
      'Audit shipped UI against design intent and advocate for quality in code review.',
    ],
    requirements: [
      'Demonstrable ability to design and build polished UI — a portfolio with both Figma files and deployed code.',
      'Strong React and CSS proficiency — you understand the browser rendering model deeply.',
      'Experience with design tokens, CSS custom properties, and component variant systems.',
      'Eye for detail that embarrasses most designers and most engineers.',
      'Comfort working in ambiguity — you make decisions when the brief is incomplete.',
    ],
    niceToHave: [
      'Canvas API, WebGL, or SVG animation experience.',
      'Framer or Rive prototyping experience.',
      'Experience contributing to open-source component libraries.',
    ],
  },
];

export function getPositionById(id: string): Position | undefined {
  return positions.find(p => p.id === id);
}

export const perks: Perk[] = [
  {
    icon: Wifi,
    title: 'Remote-first',
    description: 'Work from anywhere. We have no HQ requirement and optimise for outcomes, not presence.',
  },
  {
    icon: Clock,
    title: 'Flexible hours',
    description: 'We have core overlap hours for collaboration, but outside that your schedule is yours.',
  },
  {
    icon: BookOpen,
    title: '$2,500 learning budget',
    description: 'Annual budget for courses, books, conferences, and certifications. No approval hoops.',
  },
  {
    icon: Heart,
    title: 'Health & wellness',
    description: 'Comprehensive health coverage plus a monthly wellness allowance for whatever keeps you sharp.',
  },
  {
    icon: TrendingUp,
    title: 'Equity & ownership',
    description: 'Meaningful equity from day one. We win together.',
  },
  {
    icon: Globe,
    title: 'Team retreats',
    description: 'Twice-yearly in-person retreats in interesting places. Work hard, explore together.',
  },
  {
    icon: Monitor,
    title: 'Premium equipment',
    description: 'MacBook Pro, external display, and any peripherals you need — we\'ll set you up properly.',
  },
  {
    icon: Zap,
    title: 'Async-friendly',
    description: 'We write things down. Long meetings are a last resort, not a default coordination mechanism.',
  },
];
