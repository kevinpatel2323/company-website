'use client';

import { useEffect, useRef, useState } from 'react';

import type { ContentBlock } from '@/lib/blog-posts';

function Block({ block, visible, delay }: { block: ContentBlock; visible: boolean; delay: number }) {
  const base = `transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`;

  switch (block.type) {
    case 'heading':
      return block.level === 2 ? (
        <h2
          id={block.id}
          className={`mt-12 mb-5 text-3xl font-display tracking-tight scroll-mt-28 ${base}`}
          style={{ transitionDelay: `${delay}ms` }}
        >
          {block.text}
        </h2>
      ) : (
        <h3
          id={block.id}
          className={`mt-8 mb-4 text-2xl font-display tracking-tight scroll-mt-28 ${base}`}
          style={{ transitionDelay: `${delay}ms` }}
        >
          {block.text}
        </h3>
      );

    case 'paragraph':
      return (
        <p
          className={`mb-6 leading-[1.75] text-lg text-foreground/80 break-words ${base}`}
          style={{ transitionDelay: `${delay}ms` }}
        >
          {block.text}
        </p>
      );

    case 'list':
      const Tag = block.ordered ? 'ol' : 'ul';
      return (
        <Tag
          className={`mb-8 space-y-3 ${block.ordered ? 'list-decimal' : 'list-none'} pl-0 ${base}`}
          style={{ transitionDelay: `${delay}ms` }}
        >
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 leading-relaxed text-foreground/80">
              {!block.ordered && (
                <span className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40" />
              )}
              {block.ordered && (
                <span className="shrink-0 font-mono text-sm text-muted-foreground w-5">{i + 1}.</span>
              )}
              <span>{item}</span>
            </li>
          ))}
        </Tag>
      );

    case 'quote':
      return (
        <blockquote
          className={`my-10 border-l-2 border-foreground pl-6 ${base}`}
          style={{ transitionDelay: `${delay}ms` }}
        >
          <p className="text-xl font-display leading-relaxed tracking-tight text-foreground/90">
            &ldquo;{block.text}&rdquo;
          </p>
          {block.attribution && (
            <footer className="mt-4 text-sm font-mono text-muted-foreground">— {block.attribution}</footer>
          )}
        </blockquote>
      );

    case 'callout':
      return (
        <div
          className={`my-8 bg-foreground/[0.04] border border-foreground/10 px-6 py-5 ${base}`}
          style={{ transitionDelay: `${delay}ms` }}
        >
          <p className="leading-relaxed text-foreground/90">{block.text}</p>
        </div>
      );

    case 'stat-row':
      return (
        <div
          className={`my-10 grid grid-cols-1 gap-px bg-foreground/10 sm:grid-cols-3 ${base}`}
          style={{ transitionDelay: `${delay}ms` }}
        >
          {block.stats.map((s) => (
            <div key={s.label} className="bg-background px-6 py-8">
              <p className="text-4xl font-display tracking-tight">{s.metric}</p>
              <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      );

    case 'divider':
      return (
        <hr
          className={`my-12 border-foreground/10 ${base}`}
          style={{ transitionDelay: `${delay}ms` }}
        />
      );

    default:
      return null;
  }
}

export function PostContent({ body }: { body: ContentBlock[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); } },
      { threshold: 0.03 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef}>
      {body.map((block, i) => (
        <Block key={i} block={block} visible={isVisible} delay={Math.min(i * 40, 400)} />
      ))}
    </div>
  );
}
