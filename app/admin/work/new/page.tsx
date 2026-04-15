'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { ArrowLeft, Loader2, CheckCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const schema = z.object({
  title:       z.string().min(3),
  category:    z.string().min(2),
  year:        z.string().regex(/^\d{4}$/, '4-digit year'),
  tagline:     z.string().min(20),
  challenge:   z.string().min(30),
  approach:    z.string().min(30),
  role:        z.string().min(5),
  timeline:    z.string().min(2),
  stack:       z.string().min(3),
  coverImage:  z.string().url().or(z.literal('')).optional(),
  quoteText:   z.string().optional(),
  quoteAuthor: z.string().optional(),
  quoteRole:   z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function NewWorkProject() {
  const router = useRouter();
  const [done, setDone] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const project = {
      slug,
      title: data.title,
      category: data.category,
      year: data.year,
      tagline: data.tagline,
      challenge: data.challenge,
      approach: data.approach,
      role: data.role,
      timeline: data.timeline,
      stack: data.stack.split(',').map(s => s.trim()).filter(Boolean),
      coverImage: data.coverImage || `https://picsum.photos/seed/${slug}/1200/900`,
      processImage: `https://picsum.photos/seed/${slug}-process/1600/700`,
      nextSlug: 'northwind-commerce',
      outcomes: [
        { metric: 'TBD', label: 'Key metric 1', description: 'Update after launch.' },
        { metric: 'TBD', label: 'Key metric 2', description: 'Update after launch.' },
        { metric: 'TBD', label: 'Key metric 3', description: 'Update after launch.' },
        { metric: 'TBD', label: 'Key metric 4', description: 'Update after launch.' },
      ],
      process: [
        { step: '01', title: 'Discovery', description: 'Define goals, users, and constraints.' },
        { step: '02', title: 'Design & build', description: 'Prototype and build in tight loops.' },
        { step: '03', title: 'Launch & evolve', description: 'Ship, measure, iterate.' },
      ],
      quote: {
        text: data.quoteText || 'Great team to work with.',
        author: data.quoteAuthor || 'Client',
        role: data.quoteRole || 'Project lead',
      },
    };

    await fetch('/api/admin/work', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(project),
    });
    setDone(true);
  };

  const inputClass = "h-11 rounded-none border-x-0 border-t-0 border-b border-foreground/20 bg-transparent px-0 shadow-none focus-visible:ring-0 focus-visible:border-foreground transition-colors";
  const textClass = "rounded-lg border border-foreground/10 bg-transparent focus-visible:ring-0 focus-visible:border-foreground transition-colors resize-y";

  const F = ({ label, err, children }: { label: string; err?: string; children: React.ReactNode }) => (
    <div className="space-y-2">
      <Label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{label}</Label>
      {children}
      {err && <p className="text-xs text-destructive">{err}</p>}
    </div>
  );

  if (done) return (
    <div className="flex flex-col items-center justify-center flex-1 gap-4 text-center p-8">
      <CheckCircle className="h-10 w-10 text-emerald-600" />
      <h2 className="font-display text-2xl tracking-tight">Project added!</h2>
      <p className="text-muted-foreground text-sm">It will appear on the work page and get its own case study.</p>
      <div className="flex gap-3 mt-2">
        <Button variant="outline" onClick={() => router.push('/admin/work')} className="rounded-full border-foreground/20">Back to list</Button>
        <Button onClick={() => setDone(false)} className="rounded-full bg-foreground text-background">Add another</Button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-full">
      <header className="flex h-16 shrink-0 items-center gap-4 border-b border-foreground/10 px-8">
        <Link href="/admin/work" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group">
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        </Link>
        <div><p className="text-xs font-mono text-muted-foreground">Our Work</p><h1 className="font-display text-lg tracking-tight">New project</h1></div>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="flex-1 overflow-auto">
        <div className="mx-auto max-w-3xl p-8 space-y-8">

          <div className="grid gap-6 sm:grid-cols-2">
            <F label="Project title *" err={errors.title?.message}><Input {...register('title')} placeholder="Client or project name" className={inputClass} /></F>
            <F label="Category *" err={errors.category?.message}><Input {...register('category')} placeholder="e.g. Product & platform" className={inputClass} /></F>
            <F label="Year *" err={errors.year?.message}><Input {...register('year')} placeholder="2025" className={inputClass} /></F>
            <F label="Timeline *" err={errors.timeline?.message}><Input {...register('timeline')} placeholder="e.g. 6 months" className={inputClass} /></F>
          </div>

          <F label="Tagline *" err={errors.tagline?.message}>
            <Input {...register('tagline')} placeholder="One sentence about the project and outcome" className={inputClass} />
          </F>

          <F label="Scope / role *" err={errors.role?.message}>
            <Input {...register('role')} placeholder="e.g. Product design, front-end engineering" className={inputClass} />
          </F>

          <F label="Tech stack *" err={errors.stack?.message}>
            <Input {...register('stack')} placeholder="Next.js, TypeScript, Postgres (comma-separated)" className={inputClass} />
          </F>

          <F label="Cover image URL" err={errors.coverImage?.message}>
            <Input {...register('coverImage')} type="url" placeholder="https://images.unsplash.com/…" className={inputClass} />
          </F>

          <F label="The challenge *" err={errors.challenge?.message}>
            <Textarea {...register('challenge')} rows={5} placeholder="What problem were you solving? What was broken or missing?" className={textClass} />
          </F>

          <F label="Our approach *" err={errors.approach?.message}>
            <Textarea {...register('approach')} rows={5} placeholder="How did you think about it? What was the strategy?" className={textClass} />
          </F>

          <div className="space-y-4">
            <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Client quote (optional)</p>
            <div className="grid gap-5 sm:grid-cols-2">
              <F label="Quote"><Input {...register('quoteText')} placeholder="What they said…" className={inputClass} /></F>
              <F label="Author"><Input {...register('quoteAuthor')} placeholder="Jane Smith" className={inputClass} /></F>
              <F label="Author role"><Input {...register('quoteRole')} placeholder="CTO, Acme Corp" className={inputClass} /></F>
            </div>
          </div>

          <div className="flex justify-end gap-4 border-t border-foreground/10 pt-6">
            <Link href="/admin/work"><Button type="button" variant="outline" className="rounded-full border-foreground/20">Cancel</Button></Link>
            <Button type="submit" disabled={isSubmitting} className="rounded-full bg-foreground text-background hover:bg-foreground/90 px-8">
              {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving…</> : 'Add project'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
