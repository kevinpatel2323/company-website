import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import { Navigation } from '@/components/landing/navigation';
import { FooterSection } from '@/components/landing/footer-section';
import { PostContent } from '@/components/blog/post-content';
import { PostToc } from '@/components/blog/post-toc';
import { RelatedPosts } from '@/components/blog/related-posts';
import { ReadingProgress } from '@/components/blog/reading-progress';
import { getPostBySlug, getRelatedPosts, extractToc, blogPosts } from '@/lib/blog-posts';

import '@/components/work/work-visuals.css';

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const toc = extractToc(post.body);
  const related = getRelatedPosts(post, 3);

  /* JSON-LD structured data (Article schema) */
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Tachyon Tech',
      url: 'https://tachyontech.io',
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    keywords: post.tags.join(', '),
    articleSection: post.category,
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ReadingProgress />
      <Navigation />

      {/* Article hero */}
      <section className="relative pt-36 pb-16 lg:pt-48 lg:pb-20 border-b border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <Link
            href="/blog"
            className="mb-12 inline-flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            All posts
          </Link>

          <div className="max-w-3xl">
            <div className="mb-6 flex flex-wrap items-center gap-4">
              <span className={`rounded-full px-3 py-0.5 text-xs font-mono ${
                post.category === 'Case Study' ? 'bg-foreground text-background' : 'bg-foreground/10 text-foreground'
              }`}>
                {post.category}
              </span>
              <span className="text-sm font-mono text-muted-foreground">{post.readingTime} min read</span>
              <time
                dateTime={post.publishedAt}
                className="text-sm font-mono text-muted-foreground"
              >
                {new Date(post.publishedAt).toLocaleDateString('en-GB', {
                  day: 'numeric', month: 'long', year: 'numeric',
                })}
              </time>
            </div>

            <h1 className="mb-6 text-4xl font-display leading-[1.05] tracking-tight lg:text-6xl">
              {post.title}
            </h1>

            <p className="text-base sm:text-xl text-muted-foreground leading-relaxed">{post.excerpt}</p>

            <div className="mt-8 flex items-center gap-3 pt-8 border-t border-foreground/10">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground/10 text-sm font-medium">
                {post.author.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium">{post.author.name}</p>
                <p className="text-xs font-mono text-muted-foreground">{post.author.role}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cover image */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="-mt-px aspect-[21/9] overflow-hidden border-x border-b border-foreground/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.coverImage}
            alt={post.title}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Body + TOC sidebar */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_240px] lg:gap-20 xl:grid-cols-[1fr_260px]">
          {/* Article body */}
          <article>
            <PostContent body={post.body} />

            {/* Tags */}
            <div className="mt-12 flex flex-wrap gap-2 border-t border-foreground/10 pt-8">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-foreground/10 px-3 py-1 text-xs font-mono text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>

          {/* Sticky sidebar: TOC */}
          <aside className="hidden lg:block">
            <PostToc items={toc} />
          </aside>
        </div>

        {/* Related posts */}
        <div className="mt-20">
          <RelatedPosts posts={related} />
        </div>
      </div>

      <FooterSection />
    </main>
  );
}
