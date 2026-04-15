'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Trash2, ExternalLink, Users, Pencil } from 'lucide-react';

import { Button } from '@/components/ui/button';
import type { Position } from '@/lib/careers-data';
import { positions as staticPositions } from '@/lib/careers-data';

export default function AdminCareersPage() {
  const [dynamic, setDynamic] = useState<Position[]>([]);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => { fetch('/api/admin/careers').then(r => r.json()).then(setDynamic); }, []);

  const all = [
    ...dynamic.map(p => ({ ...p, source: 'dynamic' as const })),
    ...staticPositions.map(p => ({ ...p, source: 'static' as const })),
  ];

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this position?')) return;
    setDeleting(id);
    await fetch(`/api/admin/careers/${id}`, { method: 'DELETE' });
    setDynamic(d => d.filter(p => p.id !== id));
    setDeleting(null);
  };

  const TYPE_COLOR: Record<string, string> = {
    'Full-time': 'bg-blue-50 text-blue-700',
    'Contract':  'bg-amber-50 text-amber-700',
  };

  return (
    <div className="flex flex-col min-h-full">
      <header className="flex h-16 items-center justify-between border-b border-foreground/10 px-8">
        <div>
          <p className="text-xs font-mono text-muted-foreground">Content</p>
          <h1 className="font-display text-lg tracking-tight">Open positions</h1>
        </div>
        <Link href="/admin/careers/new">
          <Button size="sm" className="gap-2 rounded-full bg-foreground text-background hover:bg-foreground/90">
            <Plus className="h-4 w-4" /> New opening
          </Button>
        </Link>
      </header>

      <div className="flex-1 p-8">
        {all.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
            <Users className="h-10 w-10 text-muted-foreground/40" />
            <p className="text-muted-foreground">No positions yet.</p>
            <Link href="/admin/careers/new">
              <Button size="sm" className="rounded-full bg-foreground text-background">Post first opening</Button>
            </Link>
          </div>
        ) : (
          <div className="rounded-xl border border-foreground/10 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="border-b border-foreground/10 bg-foreground/[0.02]">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-mono text-muted-foreground uppercase tracking-wider">Role</th>
                  <th className="px-5 py-3 text-left text-xs font-mono text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Department</th>
                  <th className="px-5 py-3 text-left text-xs font-mono text-muted-foreground uppercase tracking-wider hidden md:table-cell">Type</th>
                  <th className="px-5 py-3 text-left text-xs font-mono text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Source</th>
                  <th className="px-5 py-3 text-right text-xs font-mono text-muted-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-foreground/8">
                {all.map(p => (
                  <tr key={p.id} className="hover:bg-foreground/[0.02] transition-colors">
                    <td className="px-5 py-4">
                      <p className="font-medium">{p.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{p.location}</p>
                    </td>
                    <td className="px-5 py-4 text-sm text-muted-foreground hidden sm:table-cell">{p.department}</td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-mono ${TYPE_COLOR[p.type] ?? 'bg-foreground/8 text-muted-foreground'}`}>
                        {p.type}
                      </span>
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
                        <Link href={`/admin/careers/${p.id}/edit`}>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground" title="Edit">
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                        </Link>
                        <Link href="/careers" target="_blank">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground" title="View">
                            <ExternalLink className="h-3.5 w-3.5" />
                          </Button>
                        </Link>
                        {p.source === 'dynamic' && (
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(p.id)}
                            disabled={deleting === p.id} className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive" title="Delete">
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
