'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FileText, Briefcase, Users, Plus, ArrowUpRight, TrendingUp } from 'lucide-react';

import { Button } from '@/components/ui/button';

type Stats = {
  blog:    { static: number; dynamic: number };
  work:    { static: number; dynamic: number };
  careers: { static: number; dynamic: number };
};

const quickActions = [
  { label: 'New blog post',    href: '/admin/blog/new',    icon: FileText, color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { label: 'New project',      href: '/admin/work/new',    icon: Briefcase, color: 'bg-violet-50 text-violet-700 border-violet-200' },
  { label: 'New opening',      href: '/admin/careers/new', icon: Users, color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  useEffect(() => {
    fetch('/api/admin/stats').then(r => r.json()).then(setStats);
  }, []);

  const tiles = [
    {
      label: 'Blog posts',
      href: '/admin/blog',
      icon: FileText,
      total: stats ? stats.blog.static + stats.blog.dynamic : '—',
      sub: stats ? `${stats.blog.dynamic} added via admin` : '',
    },
    {
      label: 'Work projects',
      href: '/admin/work',
      icon: Briefcase,
      total: stats ? stats.work.static + stats.work.dynamic : '—',
      sub: stats ? `${stats.work.dynamic} added via admin` : '',
    },
    {
      label: 'Open positions',
      href: '/admin/careers',
      icon: Users,
      total: stats ? stats.careers.static + stats.careers.dynamic : '—',
      sub: stats ? `${stats.careers.dynamic} added via admin` : '',
    },
  ];

  return (
    <div className="flex flex-col gap-0 min-h-full">
      {/* Top bar */}
      <header className="flex h-16 items-center justify-between border-b border-foreground/10 px-8">
        <div>
          <p className="text-xs font-mono text-muted-foreground">{greeting}</p>
          <h1 className="font-display text-lg tracking-tight">Dashboard</h1>
        </div>
        <Link href="/" target="_blank">
          <Button variant="outline" size="sm" className="gap-2 rounded-full border-foreground/20 text-xs">
            View site <ArrowUpRight className="h-3 w-3" />
          </Button>
        </Link>
      </header>

      {/* Content */}
      <div className="flex-1 p-8 space-y-10">

        {/* Stat tiles */}
        <div className="grid gap-4 sm:grid-cols-3">
          {tiles.map(t => {
            const Icon = t.icon;
            return (
              <Link
                key={t.label}
                href={t.href}
                className="group flex flex-col gap-4 rounded-xl border border-foreground/10 bg-background p-6 transition-all duration-200 hover:border-foreground/20 hover:shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-foreground/10 bg-foreground/[0.04]">
                    <Icon className="h-4 w-4 text-foreground/70" />
                  </div>
                  <TrendingUp className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <div>
                  <p className="text-3xl font-display tracking-tight">{t.total}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">{t.label}</p>
                  {t.sub && <p className="mt-1 text-xs font-mono text-muted-foreground/70">{t.sub}</p>}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Quick actions */}
        <div>
          <h2 className="mb-4 text-xs font-mono uppercase tracking-widest text-muted-foreground">
            Quick actions
          </h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {quickActions.map(a => {
              const Icon = a.icon;
              return (
                <Link
                  key={a.href}
                  href={a.href}
                  className="flex items-center gap-3 rounded-xl border border-foreground/10 bg-background p-5 transition-all duration-200 hover:border-foreground/20 hover:shadow-sm group"
                >
                  <div className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${a.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium">{a.label}</span>
                  <Plus className="ml-auto h-4 w-4 text-muted-foreground opacity-0 transition-all group-hover:opacity-100" />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Info callout */}
        <div className="rounded-xl border border-foreground/10 bg-foreground/[0.02] px-6 py-5">
          <p className="text-sm font-medium mb-1">Content is stored locally</p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Entries you add here are saved to <code className="font-mono text-xs bg-foreground/8 px-1.5 py-0.5 rounded">/data/*.json</code> files.
            They merge with the static data in your TypeScript files and appear on the site immediately (on next request).
            To persist across deployments, commit the data files or connect a database.
          </p>
        </div>
      </div>
    </div>
  );
}
