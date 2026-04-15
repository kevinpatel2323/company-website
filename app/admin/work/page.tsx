'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Trash2, ExternalLink, Briefcase, Pencil } from 'lucide-react';

import { Button } from '@/components/ui/button';
import type { WorkProject } from '@/lib/work-projects';
import { workProjects as staticProjects } from '@/lib/work-projects';

export default function AdminWorkPage() {
  const [dynamic, setDynamic] = useState<WorkProject[]>([]);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => { fetch('/api/admin/work').then(r => r.json()).then(setDynamic); }, []);

  const all = [
    ...dynamic.map(p => ({ ...p, source: 'dynamic' as const })),
    ...staticProjects.map(p => ({ ...p, source: 'static' as const })),
  ];

  const handleDelete = async (slug: string) => {
    if (!confirm('Delete this project?')) return;
    setDeleting(slug);
    await fetch(`/api/admin/work/${slug}`, { method: 'DELETE' });
    setDynamic(d => d.filter(p => p.slug !== slug));
    setDeleting(null);
  };

  return (
    <div className="flex flex-col min-h-full">
      <header className="flex h-16 items-center justify-between border-b border-foreground/10 px-8">
        <div>
          <p className="text-xs font-mono text-muted-foreground">Content</p>
          <h1 className="font-display text-lg tracking-tight">Work projects</h1>
        </div>
        <Link href="/admin/work/new">
          <Button size="sm" className="gap-2 rounded-full bg-foreground text-background hover:bg-foreground/90">
            <Plus className="h-4 w-4" /> New project
          </Button>
        </Link>
      </header>

      <div className="flex-1 p-8">
        {all.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
            <Briefcase className="h-10 w-10 text-muted-foreground/40" />
            <p className="text-muted-foreground">No projects yet.</p>
            <Link href="/admin/work/new">
              <Button size="sm" className="rounded-full bg-foreground text-background">Add first project</Button>
            </Link>
          </div>
        ) : (
          <div className="rounded-xl border border-foreground/10 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="border-b border-foreground/10 bg-foreground/[0.02]">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-mono text-muted-foreground uppercase tracking-wider">Project</th>
                  <th className="px-5 py-3 text-left text-xs font-mono text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Category</th>
                  <th className="px-5 py-3 text-left text-xs font-mono text-muted-foreground uppercase tracking-wider hidden md:table-cell">Year</th>
                  <th className="px-5 py-3 text-left text-xs font-mono text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Source</th>
                  <th className="px-5 py-3 text-right text-xs font-mono text-muted-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-foreground/8">
                {all.map(p => (
                  <tr key={p.slug} className="hover:bg-foreground/[0.02] transition-colors">
                    <td className="px-5 py-4">
                      <p className="font-medium">{p.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{p.tagline}</p>
                    </td>
                    <td className="px-5 py-4 text-sm text-muted-foreground hidden sm:table-cell">{p.category}</td>
                    <td className="px-5 py-4 text-sm font-mono text-muted-foreground hidden md:table-cell">{p.year}</td>
                    <td className="px-5 py-4 hidden lg:table-cell">
                      <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-mono ${
                        p.source === 'dynamic' ? 'bg-emerald-50 text-emerald-700' : 'bg-foreground/8 text-muted-foreground'
                      }`}>
                        {p.source === 'dynamic' ? 'admin' : 'static'}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/admin/work/${p.slug}/edit`}>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground" title="Edit">
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                        </Link>
                        <Link href={`/work/${p.slug}`} target="_blank">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground" title="View">
                            <ExternalLink className="h-3.5 w-3.5" />
                          </Button>
                        </Link>
                        {p.source === 'dynamic' && (
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(p.slug)}
                            disabled={deleting === p.slug} className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive" title="Delete">
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
