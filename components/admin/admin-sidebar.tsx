'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, FileText, Briefcase, Users,
  ExternalLink, LogOut, ChevronRight,
} from 'lucide-react';

const nav = [
  { label: 'Dashboard',  href: '/admin',          icon: LayoutDashboard },
  { label: 'Blog',       href: '/admin/blog',      icon: FileText },
  { label: 'Our Work',   href: '/admin/work',      icon: Briefcase },
  { label: 'Careers',    href: '/admin/careers',   icon: Users },
];

export function AdminSidebar({ onLogout }: { onLogout: () => void }) {
  const path = usePathname();

  const isActive = (href: string) =>
    href === '/admin' ? path === '/admin' : path.startsWith(href);

  return (
    <aside className="flex h-full w-60 shrink-0 flex-col border-r border-foreground/10 bg-foreground text-background">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-background/10 px-6">
        <span className="font-display text-lg tracking-tight">Tachyon</span>
        <span className="rounded-sm bg-background/15 px-1.5 py-0.5 text-[10px] font-mono uppercase tracking-wide text-background/60">
          admin
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-0.5 px-3 pt-4">
        {nav.map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-150 ${
              isActive(href)
                ? 'bg-background/15 text-background font-medium'
                : 'text-background/60 hover:bg-background/10 hover:text-background'
            }`}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {label}
            {isActive(href) && (
              <ChevronRight className="ml-auto h-3 w-3 opacity-60" />
            )}
          </Link>
        ))}
      </nav>

      {/* Footer actions */}
      <div className="space-y-0.5 border-t border-background/10 px-3 py-4">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-background/60 hover:bg-background/10 hover:text-background transition-all duration-150"
        >
          <ExternalLink className="h-4 w-4 shrink-0" />
          View site
        </Link>
        <button
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-background/60 hover:bg-background/10 hover:text-background transition-all duration-150"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          Log out
        </button>
      </div>
    </aside>
  );
}
