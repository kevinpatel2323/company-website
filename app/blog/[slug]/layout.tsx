import type { Metadata } from 'next';

import { getPostBySlug, blogPosts } from '@/lib/blog-posts';

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Post — Tachyon Tech' };

  const title = `${post.title} — Tachyon Tech`;

  return {
    title,
    description: post.excerpt,
    authors: [{ name: post.author.name }],
    openGraph: {
      title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [post.author.name],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: post.excerpt,
    },
    alternates: {
      canonical: `https://tachyontech.io/blog/${slug}`,
    },
  };
}

export default function SlugLayout({ children }: { children: React.ReactNode }) {
  return children;
}
