'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { ArrowLeft, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import type { WorkProject } from '@/lib/work-projects';

const schema = z.object({
  title:       z.string().min(3),
  category:    z.string().min(2),
  year:        z.string().regex(/^\d{4}$/),
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

const inputClass = 'h-11 rounded-none border-x-0 border-t-0 border-b border-foreground/20 bg-transparent px-0 shadow-none focus-visible:ring-0 focus-visible:border-foreground transition-colors';
const textClass  = 'rounded-lg border border-foreground/10 bg-transparent focus-visible:ring-0 focus-visible:border-foreground transition-colors resize-y';

const F = ({ label, err, children }: { label: string; err?: string; children: React.ReactNode }) => (
  <div className="space-y-2">
    <Label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{label}</Label>
    {children}
    {err && <p className="text-xs text-destructive">{err}</p>}
  </div>
);

export default function EditWorkProject({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [project, setProject] = useState<(WorkProject & { source: string }) | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [saved, setSaved] = useState(false);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    fetch(`/api/admin/work/${id}`)
      .then(r => { if (!r.ok) { setNotFound(true); setLoading(false); return null; } return r.json(); })
      .then((data: WorkProject & { source: string } | null) => {
        if (!data) return;
        setProject(data);
        reset({
          title:       data.title,
          category:    data.category,
          year:        data.year,
          tagline:     data.tagline,
          challenge:   data.challenge,
          approach:    data.approach,
          role:        data.role,
          timeline:    data.timeline,
          stack:       data.stack.join(', '),
          coverImage:  data.coverImage ?? '',
          quoteText:   data.quote?.text ?? '',
          quoteAuthor: data.quote?.author ?? '',
          quoteRole:   data.quote?.role ?? '',
        });
        setLoading(false);
      });
  }, [id, reset]);

  const onSubmit = async (data: FormValues) => {
    const updated = {
      ...project,
      title:      data.title,
      category:   data.category,
      year:       data.year,
      tagline:    data.tagline,
      challenge:  data.challenge,
      approach:   data.approach,
      role:       data.role,
      timeline:   data.timeline,
      stack:      data.stack.split(',').map(s => s.trim()).filter(Boolean),
      coverImage: data.coverImage || project!.coverImage,
      quote:      { text: data.quoteText || '', author: data.quoteAuthor || '', role: data.quoteRole || '' },
    };
    await fetch(`/api/admin/work/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    });
    setSaved(true);
  };

  if (loading) return <div className="flex-1 flex items-center justify-center"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>;
  if (notFound) return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center p-8">
      <AlertCircle className="h-10 w-10 text-muted-foreground/40" />
      <p className="text-muted-foreground">Project not found.</p>
      <Link href="/admin/work"><Button variant="outline" className="rounded-full border-foreground/20">Back to work</Button></Link>
    </div>
  );
  if (saved) return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center p-8">
      <CheckCircle className="h-10 w-10 text-emerald-600" />
      <h2 className="font-display text-2xl tracking-tight">Changes saved</h2>
      <p className="text-muted-foreground text-sm">
        {project?.source === 'static' ? 'A dynamic copy was created that overrides the static version.' : 'The project has been updated.'}
      </p>
      <div className="flex gap-3 mt-2">
        <Button variant="outline" onClick={() => router.push('/admin/work')} className="rounded-full border-foreground/20">Back to list</Button>
        <Button onClick={() => setSaved(false)} className="rounded-full bg-foreground text-background">Keep editing</Button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-full">
      <header className="flex h-16 shrink-0 items-center gap-4 border-b border-foreground/10 px-8">
        <Link href="/admin/work" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group">
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        </Link>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-mono text-muted-foreground">Our Work / Edit</p>
          <h1 className="font-display text-lg tracking-tight truncate">{project?.title}</h1>
        </div>
        {project?.source === 'static' && (
          <span className="shrink-0 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-mono text-amber-700">
            static — saving creates a dynamic copy
          </span>
        )}
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="flex-1 overflow-auto">
        <div className="mx-auto max-w-3xl p-8 space-y-8">

          <div className="grid gap-6 sm:grid-cols-2">
            <F label="Project title *" err={errors.title?.message}><Input {...register('title')} className={inputClass} /></F>
            <F label="Category *" err={errors.category?.message}><Input {...register('category')} className={inputClass} /></F>
            <F label="Year *" err={errors.year?.message}><Input {...register('year')} className={inputClass} /></F>
            <F label="Timeline *" err={errors.timeline?.message}><Input {...register('timeline')} className={inputClass} /></F>
          </div>

          <F label="Tagline *" err={errors.tagline?.message}><Input {...register('tagline')} className={inputClass} /></F>
          <F label="Scope / role *" err={errors.role?.message}><Input {...register('role')} className={inputClass} /></F>
          <F label="Tech stack *" err={errors.stack?.message}>
            <Input {...register('stack')} placeholder="comma-separated" className={inputClass} />
          </F>
          <F label="Cover image URL"><Input {...register('coverImage')} type="url" className={inputClass} /></F>
          <F label="The challenge *" err={errors.challenge?.message}><Textarea {...register('challenge')} rows={5} className={textClass} /></F>
          <F label="Our approach *" err={errors.approach?.message}><Textarea {...register('approach')} rows={5} className={textClass} /></F>

          <div className="space-y-4">
            <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Client quote</p>
            <div className="grid gap-5 sm:grid-cols-2">
              <F label="Quote"><Input {...register('quoteText')} className={inputClass} /></F>
              <F label="Author"><Input {...register('quoteAuthor')} className={inputClass} /></F>
              <F label="Author role"><Input {...register('quoteRole')} className={inputClass} /></F>
            </div>
          </div>

          <div className="flex justify-end gap-4 border-t border-foreground/10 pt-6">
            <Link href="/admin/work"><Button type="button" variant="outline" className="rounded-full border-foreground/20">Cancel</Button></Link>
            <Button type="submit" disabled={isSubmitting} className="rounded-full bg-foreground text-background hover:bg-foreground/90 px-8">
              {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving…</> : 'Save changes'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
