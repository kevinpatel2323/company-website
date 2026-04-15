'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import type { BlogPost } from '@/lib/blog-posts';

const CATEGORY_COLORS: Record<BlogPost['category'], string> = {
  'Case Study': 'bg-foreground text-background',
  'Insight': 'bg-foreground/10 text-foreground',
  'Guide': 'bg-foreground/10 text-foreground',
};

function CategoryBadge({ category }: { category: BlogPost['category'] }) {
  return (
    <span className={`inline-block rounded-full px-3 py-0.5 text-xs font-mono ${CATEGORY_COLORS[category]}`}>
      {category}
    </span>
  );
}

function FeaturedCard({ post, visible }: { post: BlogPost; visible: boolean }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group col-span-full block border border-foreground/10 p-8 lg:p-12 transition-all duration-700 hover:bg-foreground/[0.02] hover:border-foreground/20 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 lg:items-end">
        <div className="aspect-[16/9] overflow-hidden border border-foreground/10 transition-colors duration-500 group-hover:border-foreground/20">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.coverImage}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>

        <div>
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <CategoryBadge category={post.category} />
            <span className="text-sm font-mono text-muted-foreground">{post.readingTime} min read</span>
          </div>

          <h2 className="mb-4 text-3xl font-display tracking-tight transition-colors group-hover:text-muted-foreground lg:text-4xl">
            {post.title}
          </h2>

          <p className="mb-6 leading-relaxed text-muted-foreground lg:text-lg break-words">{post.excerpt}</p>

          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{post.author.name}</span>
              {' · '}
              {new Date(post.publishedAt).toLocaleDateString('en-GB', {
                day: 'numeric', month: 'long', year: 'numeric',
              })}
            </div>
            <ArrowUpRight className="h-5 w-5 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
          </div>
        </div>
      </div>
    </Link>
  );
}

function PostCard({ post, index, visible }: { post: BlogPost; index: number; visible: boolean }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group flex flex-col border border-foreground/10 p-8 transition-all duration-700 hover:bg-foreground/[0.02] hover:border-foreground/20 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionDelay: `${(index + 1) * 80}ms` }}
    >
      <div className="mb-6 aspect-[16/9] overflow-hidden border border-foreground/10 transition-colors duration-500 group-hover:border-foreground/20">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.coverImage}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>

      <div className="mb-3 flex flex-wrap items-center gap-3">
        <CategoryBadge category={post.category} />
        <span className="text-sm font-mono text-muted-foreground">{post.readingTime} min read</span>
      </div>

      <h3 className="mb-3 flex-1 text-xl font-display tracking-tight transition-colors group-hover:text-muted-foreground lg:text-2xl">
        {post.title}
      </h3>

      <p className="mb-6 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground break-words">
        {post.excerpt}
      </p>

      <div className="mt-auto flex items-center justify-between border-t border-foreground/10 pt-4">
        <span className="text-xs text-muted-foreground font-mono">
          {new Date(post.publishedAt).toLocaleDateString('en-GB', {
            day: 'numeric', month: 'short', year: 'numeric',
          })}
        </span>
        <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
      </div>
    </Link>
  );
}

export function BlogListing({ posts }: { posts: BlogPost[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); } },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p.slug !== featured.slug);

  return (
    <div ref={sectionRef} className="max-w-[1400px] mx-auto px-6 lg:px-12 py-24 lg:py-32">
      {/* Featured */}
      <div className="mb-px">
        <FeaturedCard post={featured} visible={isVisible} />
      </div>

      {/* Grid */}
      <div className="mt-px grid gap-px bg-foreground/10 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((post, i) => (
          <PostCard key={post.slug} post={post} index={i} visible={isVisible} />
        ))}
      </div>
    </div>
  );
}
