import { Navigation } from '@/components/landing/navigation';
import { FooterSection } from '@/components/landing/footer-section';
import { BlogListing } from '@/components/blog/blog-listing';
import { blogPosts } from '@/lib/blog-posts';
import { getDynamicPosts } from '@/lib/dynamic-data';

import '@/components/work/work-visuals.css';

export const dynamic = 'force-dynamic'; // always fetch fresh dynamic posts

export default function BlogPage() {
  const dynamic_posts = getDynamicPosts();
  const all = [...dynamic_posts, ...blogPosts].filter(
    (p, i, arr) => arr.findIndex(x => x.slug === p.slug) === i
  );
  const sorted = all.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-40 pb-16 lg:pt-52 lg:pb-20 border-b border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-8">
            <span className="w-8 h-px bg-foreground/30" />
            Blog &amp; Case Studies
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display leading-[0.95] tracking-tight mb-8 max-w-3xl">
            Ideas, case studies,
            <br />
            <span className="text-muted-foreground">and things we learned</span>
          </h1>
          <p className="text-base sm:text-xl text-muted-foreground max-w-xl leading-relaxed">
            Practical writing on product design, engineering velocity, and how we think about building digital products that last.
          </p>
        </div>
      </section>

      <BlogListing posts={sorted} />

      <FooterSection />
    </main>
  );
}
