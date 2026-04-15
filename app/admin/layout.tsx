'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const PIN = process.env.NEXT_PUBLIC_ADMIN_PIN ?? 'admin2024';
const SESSION_KEY = 'tachyon_admin_auth';

/* ── PIN entry screen ──────────────────────────────────────────── */
function PinScreen({ onSuccess }: { onSuccess: () => void }) {
  const [value, setValue] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value === PIN) {
      onSuccess();
    } else {
      setError(true);
      setShake(true);
      setValue('');
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-3">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-foreground/15 bg-foreground/[0.05]">
            <Lock className="h-5 w-5 text-foreground/70" />
          </div>
          <div className="text-center">
            <h1 className="font-display text-2xl tracking-tight">Admin access</h1>
            <p className="mt-1 text-sm text-muted-foreground font-mono">Enter your PIN to continue</p>
          </div>
        </div>

        <form
          onSubmit={submit}
          className={`space-y-4 transition-all ${shake ? 'animate-[shake_0.4s_ease-in-out]' : ''}`}
        >
          <div className="relative">
            <Input
              type={show ? 'text' : 'password'}
              placeholder="PIN"
              value={value}
              onChange={e => { setValue(e.target.value); setError(false); }}
              className={`h-12 rounded-none border-x-0 border-t-0 border-b bg-transparent px-0 text-base shadow-none focus-visible:ring-0 focus-visible:border-foreground transition-colors ${
                error ? 'border-destructive' : 'border-foreground/20'
              }`}
              autoFocus
            />
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShow(!show)}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          {error && (
            <p className="text-xs text-destructive font-mono">Incorrect PIN. Try again.</p>
          )}

          <Button
            type="submit"
            disabled={!value}
            className="w-full h-12 rounded-full bg-foreground text-background hover:bg-foreground/90 group"
          >
            Enter dashboard
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </form>

        <p className="mt-6 text-center text-xs text-muted-foreground font-mono">
          Default PIN: <code className="bg-foreground/5 px-1.5 py-0.5 rounded">admin2024</code>
        </p>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
      `}</style>
    </div>
  );
}

/* ── Admin shell ────────────────────────────────────────────────── */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setAuthed(sessionStorage.getItem(SESSION_KEY) === 'true');
    setLoaded(true);
  }, []);

  const handleSuccess = () => {
    sessionStorage.setItem(SESSION_KEY, 'true');
    setAuthed(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setAuthed(false);
  };

  if (!loaded) return null;
  if (!authed) return <PinScreen onSuccess={handleSuccess} />;

  return (
    <div className="flex h-screen overflow-hidden bg-background font-sans antialiased">
      <AdminSidebar onLogout={handleLogout} />
      <main className="flex flex-1 flex-col overflow-auto">
        {children}
      </main>
    </div>
  );
}
