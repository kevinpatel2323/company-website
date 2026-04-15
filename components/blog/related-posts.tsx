'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import type { BlogPost } from '@/lib/blog-posts';

export function RelatedPosts({ posts }: { posts: BlogPost[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); } },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  if (posts.length === 0) return null;

  return (
    <div ref={sectionRef} className="border-t border-foreground/10 pt-16">
      <h2 className="mb-10 text-2xl font-display tracking-tight">Continue reading</h2>
      <div className="grid gap-px bg-foreground/10 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className={`group flex flex-col bg-background transition-all duration-700 hover:bg-foreground/[0.02] ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <div className="aspect-[16/9] overflow-hidden border-b border-foreground/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.coverImage}
                alt={post.title}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
            <div className="p-6">
            <span className="mb-2 inline-block rounded-full bg-foreground/8 px-3 py-0.5 text-xs font-mono text-muted-foreground">
              {post.category}
            </span>
            <h3 className="mb-2 flex-1 text-lg font-display leading-snug tracking-tight transition-colors group-hover:text-muted-foreground">
              {post.title}
            </h3>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs font-mono text-muted-foreground">{post.readingTime} min read</span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
