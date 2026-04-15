export type ContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; level: 2 | 3; text: string; id: string }
  | { type: 'quote'; text: string; attribution?: string }
  | { type: 'list'; items: string[]; ordered?: boolean }
  | { type: 'stat-row'; stats: Array<{ metric: string; label: string }> }
  | { type: 'callout'; text: string }
  | { type: 'divider' };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string; // 150–160 chars — used as meta description
  category: 'Case Study' | 'Insight' | 'Guide';
  tags: string[];
  author: { name: string; role: string };
  publishedAt: string; // ISO-8601
  updatedAt?: string;
  readingTime: number; // minutes
  featured: boolean;
  coverImage: string;
  body: ContentBlock[];
};

export const blogPosts: BlogPost[] = [
  /* ─── CASE STUDY 1 ─────────────────────────────────────── */
  {
    slug: 'northwind-checkout-conversion',
    title: 'How we cut checkout abandon rate by 38% at Northwind Commerce',
    excerpt:
      "A multi-region retailer's checkout was haemorrhaging conversions. Here is the research, the decisions, and the numbers that changed everything.",
    category: 'Case Study',
    tags: ['e-commerce', 'conversion', 'checkout', 'design systems'],
    author: { name: 'Kevin Patel', role: 'Founder & CEO' },
    publishedAt: '2025-03-12',
    readingTime: 9,
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&h=900&fit=crop&auto=format',
    body: [
      {
        type: 'paragraph',
        text: 'When Northwind Commerce came to us, their average checkout abandon rate was sitting at 71%—not unusual for multi-region retail, but painful when you know what drives it. Three separate storefronts, each inherited from a different acquisition, each with its own cart logic, form validation quirks, and visual language. Users moved between regions for shipping options and fell off at the seams.',
      },
      {
        type: 'heading', level: 2, id: 'the-audit',
        text: 'Starting with evidence, not opinions',
      },
      {
        type: 'paragraph',
        text: 'Before designing a single screen we spent two weeks in analytics. We mapped every step of the purchase funnel across all three storefronts using session recordings, heatmaps, and funnel analysis. The data pointed to three distinct drop-off zones: the shipping options screen, the payment method selection, and the order review page.',
      },
      {
        type: 'paragraph',
        text: 'Shipping options had 22 permutations across regions, presented as a flat list with no hierarchy. Users from Region B were frequently landing on Region A\'s checkout and encountering shipping methods that weren\'t available for their address—only finding out after filling in payment details. This single issue accounted for 31% of total checkout exits.',
      },
      {
        type: 'callout',
        text: 'The most valuable insight: users weren\'t leaving because checkout was too long. They were leaving because it was unpredictable. Every fix we made was about reducing uncertainty.',
      },
      {
        type: 'heading', level: 2, id: 'design-decisions',
        text: 'The five design decisions that moved the numbers',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'Region detection at cart entry, not checkout — users saw only relevant shipping options from the start.',
          'Shipping tier hierarchy redesigned: recommended first, economy second, express third, with estimated delivery dates shown inline.',
          'Payment method selection collapsed to a single primary action (the most-used method per region), with alternatives accessible but not dominant.',
          'Progress indicator redesigned to show estimated minutes remaining, not step count.',
          'Error messages rewritten to be specific and actionable — "We need a 5-digit US ZIP code" instead of "Invalid postcode".',
        ],
      },
      {
        type: 'heading', level: 2, id: 'build-process',
        text: 'How the design system made this possible at speed',
      },
      {
        type: 'paragraph',
        text: 'Doing this across three codebases in six months would have been impossible. We started with the design system: a shared token layer that all three storefronts consumed. Typography, colour, spacing, and interactive states were unified in week two. By week four, new checkout components were being built once and deployed everywhere.',
      },
      {
        type: 'paragraph',
        text: 'The ops team adopted the same component library mid-project—an outcome we hadn\'t anticipated. Seeing the storefront components working in production gave their engineers confidence. They migrated their inventory dashboard to the same system in parallel, compressing a planned parallel workstream by six weeks.',
      },
      {
        type: 'heading', level: 2, id: 'results',
        text: 'Results after 90 days',
      },
      {
        type: 'stat-row',
        stats: [
          { metric: '38%', label: 'Conversion lift' },
          { metric: '61ms', label: 'P95 API latency' },
          { metric: '4×', label: 'Faster feature delivery' },
        ],
      },
      {
        type: 'paragraph',
        text: 'The 38% conversion lift was measured against the same 90-day window the prior year, controlling for seasonal variation. P95 API latency dropped from 340ms to 61ms as a side effect of consolidating three backends into one. The design system effect compounded: six months post-launch, Northwind\'s own team had shipped more features than in the previous two years combined.',
      },
      {
        type: 'heading', level: 2, id: 'takeaways',
        text: 'What other e-commerce teams can apply today',
      },
      {
        type: 'list',
        items: [
          'Audit before designing. Session recordings reveal the actual friction, not the friction you imagine.',
          'Consolidate before optimising. A design system investment pays for itself in the first project that benefits from it.',
          'Reduce uncertainty at every step. Users tolerate long checkouts; they abandon unpredictable ones.',
          'Region-aware UX is not a nice-to-have for multi-market brands—it\'s table stakes.',
        ],
      },
      {
        type: 'quote',
        text: 'Tachyon didn\'t just redesign our store—they rebuilt our capability to keep improving it ourselves. Six months in and our own team has shipped more than we did in the previous two years.',
        attribution: 'Jordan Miles, Head of Digital, Northwind Commerce',
      },
    ],
  },

  /* ─── INSIGHT 1 ─────────────────────────────────────────── */
  {
    slug: 'design-system-roi',
    title: 'A design system is your highest-leverage engineering investment',
    excerpt:
      'Teams that invest in design systems ship faster, maintain quality, and scale without chaos. Here is the evidence and the case for doing it earlier than feels comfortable.',
    category: 'Insight',
    tags: ['design systems', 'engineering', 'ROI', 'product velocity'],
    author: { name: 'Kevin Patel', role: 'Founder & CEO' },
    publishedAt: '2025-02-04',
    readingTime: 7,
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=1600&h=900&fit=crop&auto=format',
    body: [
      {
        type: 'paragraph',
        text: 'Every product team we talk to knows they should have a design system. Most of them don\'t have one. And the reasons they give—"we\'re too early", "we don\'t have the bandwidth", "we\'ll do it after the next release"—are exactly the conditions under which you need one most.',
      },
      {
        type: 'heading', level: 2, id: 'what-a-design-system-actually-is',
        text: 'What a design system actually is',
      },
      {
        type: 'paragraph',
        text: 'A design system is not a component library. It\'s not a Figma file. It\'s a shared language between design and engineering that makes decisions once and applies them everywhere. At its core: a token layer (values like colour, spacing, typography), a component layer (reusable UI built on those tokens), and a documentation layer (the rules for when and how to use them).',
      },
      {
        type: 'paragraph',
        text: 'The token layer is where most teams underinvest. When you define colour as a semantic token—`color.action.primary` rather than `#1a56db`—you gain the ability to theme, dark-mode, and rebrand without touching a single component. That flexibility compounds over time.',
      },
      {
        type: 'heading', level: 2, id: 'the-cost-of-not-having-one',
        text: 'The real cost of not having one',
      },
      {
        type: 'paragraph',
        text: 'At Atlas Finance, six product squads were building independently. Our initial audit found 1,400 unique colour values across their codebases—for a product with a brand palette of eight colours. Every squad had reinvented the same button component. The average time to build a new screen from scratch was three days; after the design system, it was four hours.',
      },
      {
        type: 'stat-row',
        stats: [
          { metric: '1,400', label: 'Unique colour values found' },
          { metric: '34', label: 'After consolidation' },
          { metric: '68%', label: 'Faster component builds' },
        ],
      },
      {
        type: 'paragraph',
        text: 'The hidden cost isn\'t the duplicated code—it\'s the cognitive overhead. Every engineer who builds a button from scratch is spending mental energy on a solved problem. Every designer who redocuments a spacing value is doing work that shouldn\'t exist. A design system redirects that energy toward problems worth solving.',
      },
      {
        type: 'heading', level: 2, id: 'when-to-invest',
        text: 'When to invest',
      },
      {
        type: 'paragraph',
        text: 'The inflection point is earlier than most teams expect. In our experience, a design system becomes ROI-positive the moment you have two product squads, two customer-facing surfaces, or two years of design debt. Below that threshold, a well-organised component folder is sufficient. Above it, the system pays for itself in the first quarter after launch.',
      },
      {
        type: 'callout',
        text: 'Rule of thumb: if you\'ve ever copy-pasted a component between two repos, you need a design system.',
      },
      {
        type: 'heading', level: 2, id: 'how-to-start',
        text: 'How to start without a six-month project',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'Audit first. Count your colour values, spacing scales, and button variants. The number will motivate the investment.',
          'Start with tokens, not components. A token architecture can be adopted incrementally; a new component library cannot.',
          'Build Storybook from day one. Documentation is not optional—undocumented components get bypassed.',
          'Measure adoption with linting rules. If components are used, the system is working. If they\'re bypassed, something is wrong with the component, not the team.',
          'Ship a v1, not a v1.0. A system with 30 components everyone uses beats a system with 300 components nobody trusts.',
        ],
      },
      {
        type: 'paragraph',
        text: 'The teams that delay design systems are usually the teams that most need them. The discomfort of investing before you feel ready is the signal that the investment is overdue.',
      },
    ],
  },

  /* ─── CASE STUDY 2 ─────────────────────────────────────── */
  {
    slug: 'signal-field-onboarding',
    title: 'From 18% to 54% trial conversion: what we learned building Signal Field\'s onboarding',
    excerpt:
      'Signal Field had a powerful product that users couldn\'t unlock. We rebuilt their onboarding from the positioning layer down. Here\'s what worked.',
    category: 'Case Study',
    tags: ['onboarding', 'SaaS', 'conversion', 'product design'],
    author: { name: 'Kevin Patel', role: 'Founder & CEO' },
    publishedAt: '2025-01-17',
    readingTime: 8,
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&h=900&fit=crop&auto=format',
    body: [
      {
        type: 'paragraph',
        text: 'Trial-to-paid conversion at 18% is not a product problem. It\'s a communication problem. Signal Field\'s data aggregation platform was genuinely powerful—their existing customers loved it. But the median new trial user was dropping out in under eight minutes, long before they\'d encountered the core value.',
      },
      {
        type: 'heading', level: 2, id: 'diagnosis',
        text: 'Diagnosing the problem',
      },
      {
        type: 'paragraph',
        text: 'We started with a cohort analysis: what did the users who converted have in common? The answer was surprisingly specific. Every user who reached "activation"—defined as creating their first automated report—converted at 81%. Users who didn\'t reach activation within five days never converted at all. The onboarding\'s only job was to get users to that first report.',
      },
      {
        type: 'paragraph',
        text: 'We then mapped every step between sign-up and first report: 23 steps, 11 of which were configuration choices that a new user had no context to make. The onboarding was asking people to configure a product they hadn\'t yet understood. The sequence was backwards.',
      },
      {
        type: 'heading', level: 2, id: 'positioning-first',
        text: 'Starting with positioning, not screens',
      },
      {
        type: 'paragraph',
        text: 'Before we designed a single screen, we ran a two-day positioning workshop with Signal Field\'s founders and sales team. We mapped the competitive landscape and identified the one thing Signal did that no competitor matched: automated multi-source reconciliation with no SQL required. That single idea became the through-line for every screen we designed.',
      },
      {
        type: 'callout',
        text: 'The marketing site and the onboarding flow were designed in parallel from the same brief. A new visitor and a new user should encounter the same language, the same proof points, the same tone.',
      },
      {
        type: 'heading', level: 2, id: 'onboarding-redesign',
        text: 'The redesigned onboarding',
      },
      {
        type: 'paragraph',
        text: 'The new onboarding had one job per screen. We reduced 23 steps to nine. Configuration choices were deferred until after the user had experienced value—we connected a demo data source automatically on sign-up so the first thing a user saw was a working report, not a blank state.',
      },
      {
        type: 'list',
        items: [
          'Instant demo mode: a live report using sample data, populated before the user sets up anything.',
          'Progressive disclosure: connection setup surfaced after the user had interacted with a demo report.',
          'Contextual tooltips triggered by hesitation (>4s on a screen), not timers.',
          'Activation celebration at milestone moments—small, but measurable in session replay data.',
          'Email sequences tied to product milestones, not time elapsed since sign-up.',
        ],
      },
      {
        type: 'heading', level: 2, id: 'results',
        text: 'The numbers after launch',
      },
      {
        type: 'stat-row',
        stats: [
          { metric: '54%', label: 'Trial-to-paid conversion' },
          { metric: '3 days', label: 'Median time to activation' },
          { metric: '2.4×', label: 'Organic demo requests' },
        ],
      },
      {
        type: 'paragraph',
        text: 'Trial-to-paid conversion lifted from 18% to 54% within the first 60 days. Median time to activation dropped from 12 days to 3. Support tickets in the first week fell by 40%, because contextual onboarding answered the questions before they became tickets.',
      },
      {
        type: 'heading', level: 2, id: 'principles',
        text: 'Principles that apply to any SaaS onboarding',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'Define activation before you design. Every onboarding decision should be evaluated against "does this get the user to their first moment of value faster?"',
          'Show before asking. A demo state that works immediately beats a blank state with a setup wizard.',
          'Defer configuration. New users don\'t have the context to make good configuration choices. Give them context first.',
          'Instrument everything from day one. Onboarding is a product, not a feature—it needs the same analytics discipline.',
          'Marketing and product onboarding are one narrative. Inconsistency between them is a trust problem.',
        ],
      },
      {
        type: 'quote',
        text: 'For the first time, prospects get it from the website alone. Our sales team spends the call on value, not explanation.',
        attribution: 'Tom Vasquez, CEO, Signal Field',
      },
    ],
  },

  /* ─── GUIDE ──────────────────────────────────────────────── */
  {
    slug: 'accessible-product-design',
    title: 'Accessible by default: the practical case for WCAG-first product design',
    excerpt:
      'Accessibility is not a compliance checkbox—it\'s a design quality signal. Teams that build accessible products ship better products, full stop.',
    category: 'Guide',
    tags: ['accessibility', 'WCAG', 'UX', 'inclusive design'],
    author: { name: 'Kevin Patel', role: 'Founder & CEO' },
    publishedAt: '2024-12-03',
    readingTime: 6,
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1600&h=900&fit=crop&auto=format',
    body: [
      {
        type: 'paragraph',
        text: 'The conversation around accessibility in product design still too often starts with legal risk. WCAG compliance is framed as a defensive posture—something you do to avoid lawsuits, not something you do to build a better product. This framing is both practically wrong and strategically short-sighted.',
      },
      {
        type: 'heading', level: 2, id: 'the-quality-signal',
        text: 'Accessibility as a proxy for design quality',
      },
      {
        type: 'paragraph',
        text: 'Every WCAG criterion that\'s difficult to meet is a signal that something in the design is fragile. Insufficient colour contrast usually means colours were chosen for aesthetics alone, without a systematic token layer. Keyboard navigation failures almost always indicate that interactive states weren\'t fully specified. Missing alt text reflects content workflows that never accounted for non-visual access.',
      },
      {
        type: 'paragraph',
        text: 'When we worked on Helio Health\'s patient scheduling platform, accessibility wasn\'t a retrofit—it was a design constraint from the first wireframe. The discipline of specifying focus states, error messages, and touch targets early produced a tighter, more consistent component library. The third-party WCAG 2.1 AA audit we commissioned before launch found zero critical issues—not because we were lucky, but because we\'d been building to that standard throughout.',
      },
      {
        type: 'heading', level: 2, id: 'practical-starting-points',
        text: 'Where to start if you\'re not yet accessible',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'Audit your colour system first. Run every foreground/background pair through a contrast checker. This is the fastest, highest-impact fix.',
          'Specify focus styles in your design system, not as an afterthought. Every interactive element needs a visible focus indicator that meets 3:1 contrast against the background.',
          'Test with a keyboard before any user testing. Tab through every flow. If you get stuck, your users will too.',
          'Write error messages for humans. "Field invalid" tells no one anything. "Please enter a date after today\'s date" is accessible and useful.',
          'Add skip navigation links. They\'re invisible to mouse users, essential to keyboard users, and take ten minutes to implement.',
        ],
      },
      {
        type: 'callout',
        text: 'The cheapest accessibility fix is the one you make in the design file before it reaches engineering. The most expensive is the retrofit after launch.',
      },
      {
        type: 'heading', level: 2, id: 'the-business-case',
        text: 'The business case beyond compliance',
      },
      {
        type: 'paragraph',
        text: 'Approximately 1 in 4 adults in the UK and US has some form of disability. Globally that\'s over a billion people. An inaccessible product excludes a significant fraction of your potential users before they\'ve encountered your core value proposition. The business case is not hypothetical.',
      },
      {
        type: 'paragraph',
        text: 'Beyond direct reach, accessible products perform better in search. Screen readers and search crawlers share many of the same access patterns—semantic HTML, meaningful alt text, logical heading hierarchy. An accessible product is, by definition, a more crawlable one.',
      },
      {
        type: 'heading', level: 2, id: 'team-practices',
        text: 'Team practices that make accessibility stick',
      },
      {
        type: 'list',
        items: [
          'Include accessibility criteria in your definition of done. A feature isn\'t done until it passes keyboard and screen reader review.',
          'Run automated accessibility checks in CI—tools like axe-core can catch 30–40% of issues before a human reviewer touches the PR.',
          'Commission an external audit before major launches. Internal teams develop blind spots.',
          'Involve users with disabilities in research. Lived experience surfaces issues that automated tools and checklists cannot.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Accessibility is not a constraint that limits great design. It\'s a discipline that produces it.',
      },
    ],
  },

  /* ─── INSIGHT 2 ─────────────────────────────────────────── */
  {
    slug: 'build-transparency-client-trust',
    title: 'How radical transparency with clients compresses delivery timelines',
    excerpt:
      'Most project delays start as communication gaps. The teams that ship fastest are the ones that share information the most openly, the earliest.',
    category: 'Insight',
    tags: ['process', 'client relationships', 'agile', 'delivery'],
    author: { name: 'Kevin Patel', role: 'Founder & CEO' },
    publishedAt: '2024-11-19',
    readingTime: 5,
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1600&h=900&fit=crop&auto=format',
    body: [
      {
        type: 'paragraph',
        text: 'The most reliable predictor of a project running over time and over budget is not scope complexity or technical risk—it\'s the frequency and quality of communication during the project. Teams that share early, share often, and share honestly consistently outperform teams that present polished artefacts at milestone gates.',
      },
      {
        type: 'heading', level: 2, id: 'the-hidden-cost-of-surprises',
        text: 'The hidden cost of surprises',
      },
      {
        type: 'paragraph',
        text: 'When a client sees work for the first time at a milestone review, they\'re evaluating it against weeks of accumulated assumptions about what was being built. The gap between those assumptions and the work on the screen is almost always larger than either party anticipated. Closing that gap—through revisions, re-scoping conversations, and reset expectations—consumes time that transparency would have saved.',
      },
      {
        type: 'paragraph',
        text: 'On every project at Tachyon, we share work-in-progress weekly. Not polish—actual work in progress. A rough wireframe at day five of a design sprint gets better feedback than a finished prototype at day twenty. The client\'s reaction to the rough tells us which direction to invest in finishing.',
      },
      {
        type: 'heading', level: 2, id: 'what-transparency-looks-like',
        text: 'What transparency looks like in practice',
      },
      {
        type: 'list',
        items: [
          'Weekly async video updates, not just status emails. Seeing the work removes more ambiguity than reading about it.',
          'Shared project tools: clients have read access to the Figma file, the Jira board, and the staging environment from day one.',
          'Risk flags raised immediately, not saved for retrospectives. A blocker surfaced on day three is solvable; the same blocker surfaced in week four is a timeline event.',
          'Decision logs: every significant design or product decision is documented with context, options considered, and rationale. Clients can audit the thinking, not just the outcome.',
        ],
      },
      {
        type: 'callout',
        text: 'The projects that felt hardest in the moment were often the ones that communicated least. The projects that felt easiest shared work almost daily.',
      },
      {
        type: 'heading', level: 2, id: 'trust-as-a-velocity-input',
        text: 'Trust as a velocity input',
      },
      {
        type: 'paragraph',
        text: 'Transparency builds trust, and trust is a velocity input. A client who trusts the team reviews work faster, makes decisions faster, and extends more creative latitude. A client who feels kept in the dark adds approval checkpoints, requests more documentation, and second-guesses decisions that should be final.',
      },
      {
        type: 'paragraph',
        text: 'The teams that ship fastest are not the ones that move quickest in isolation. They\'re the ones that keep their clients as close to the work as possible throughout—making the feedback loop so short that surprises become structurally impossible.',
      },
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  return blogPosts
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => {
      // same category scores higher; shared tags add weight
      const catA = a.category === post.category ? 2 : 0;
      const catB = b.category === post.category ? 2 : 0;
      const tagA = a.tags.filter((t) => post.tags.includes(t)).length;
      const tagB = b.tags.filter((t) => post.tags.includes(t)).length;
      return catB + tagB - (catA + tagA);
    })
    .slice(0, limit);
}

export function extractToc(body: ContentBlock[]): Array<{ id: string; text: string; level: 2 | 3 }> {
  return body
    .filter((b): b is Extract<ContentBlock, { type: 'heading' }> => b.type === 'heading')
    .map(({ id, text, level }) => ({ id, text, level }));
}
