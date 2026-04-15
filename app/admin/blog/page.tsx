'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Trash2, ExternalLink, FileText, Pencil } from 'lucide-react';

import { Button } from '@/components/ui/button';
import type { BlogPost } from '@/lib/blog-posts';
import { blogPosts as staticPosts } from '@/lib/blog-posts';

const CATEGORY_COLOR: Record<string, string> = {
  'Case Study': 'bg-blue-50 text-blue-700',
  'Insight':    'bg-amber-50 text-amber-700',
  'Guide':      'bg-emerald-50 text-emerald-700',
};

export default function AdminBlogPage() {
  const [dynamic, setDynamic] = useState<BlogPost[]>([]);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => { fetch('/api/admin/blog').then(r => r.json()).then(setDynamic); }, []);

  const all = [
    ...dynamic.map(p => ({ ...p, source: 'dynamic' as const })),
    ...staticPosts.map(p => ({ ...p, source: 'static' as const })),
  ];

  const handleDelete = async (slug: string) => {
    if (!confirm('Delete this post?')) return;
    setDeleting(slug);
    await fetch(`/api/admin/blog/${slug}`, { method: 'DELETE' });
    setDynamic(d => d.filter(p => p.slug !== slug));
    setDeleting(null);
  };

  return (
    <div className="flex flex-col min-h-full">
      <header className="flex h-16 items-center justify-between border-b border-foreground/10 px-8">
        <div>
          <p className="text-xs font-mono text-muted-foreground">Content</p>
          <h1 className="font-display text-lg tracking-tight">Blog posts</h1>
        </div>
        <Link href="/admin/blog/new">
          <Button size="sm" className="gap-2 rounded-full bg-foreground text-background hover:bg-foreground/90">
            <Plus className="h-4 w-4" /> New post
          </Button>
        </Link>
      </header>

      <div className="flex-1 p-8">
        {all.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
            <FileText className="h-10 w-10 text-muted-foreground/40" />
            <p className="text-muted-foreground">No posts yet.</p>
            <Link href="/admin/blog/new">
              <Button size="sm" className="rounded-full bg-foreground text-background">Write your first post</Button>
            </Link>
          </div>
        ) : (
          <div className="rounded-xl border border-foreground/10 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="border-b border-foreground/10 bg-foreground/[0.02]">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-mono text-muted-foreground uppercase tracking-wider">Title</th>
                  <th className="px-5 py-3 text-left text-xs font-mono text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Category</th>
                  <th className="px-5 py-3 text-left text-xs font-mono text-muted-foreground uppercase tracking-wider hidden md:table-cell">Published</th>
                  <th className="px-5 py-3 text-left text-xs font-mono text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Source</th>
                  <th className="px-5 py-3 text-right text-xs font-mono text-muted-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-foreground/8">
                {all.map(p => (
                  <tr key={p.slug} className="group hover:bg-foreground/[0.02] transition-colors">
                    <td className="px-5 py-4">
                      <div>
                        <p className="font-medium leading-snug line-clamp-1">{p.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{p.excerpt}</p>
                      </div>
                    </td>
                    <td className="px-5 py-4 hidden sm:table-cell">
                      <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-mono ${CATEGORY_COLOR[p.category] ?? 'bg-foreground/8 text-foreground'}`}>
                        {p.category}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-muted-foreground font-mono text-xs hidden md:table-cell">
                      {new Date(p.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-5 py-4 hidden lg:table-cell">
                      <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-mono ${
                        p.source === 'dynamic' ? 'bg-emerald-50 text-emerald-700' : 'bg-foreground/8 text-muted-foreground'
                      }`}>
                        {p.source === 'dynamic' ? 'admin' : 'static'}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/admin/blog/${p.slug}/edit`}>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground" title="Edit">
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                        </Link>
                        <Link href={`/blog/${p.slug}`} target="_blank">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground" title="View">
                            <ExternalLink className="h-3.5 w-3.5" />
                          </Button>
                        </Link>
                        {p.source === 'dynamic' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(p.slug)}
                            disabled={deleting === p.slug}
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                            title="Delete"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
