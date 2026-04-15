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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Position } from '@/lib/careers-data';

const schema = z.object({
  title:            z.string().min(3),
  department:       z.string().min(2),
  type:             z.enum(['Full-time', 'Contract']),
  location:         z.string().min(3),
  tagline:          z.string().min(10),
  about:            z.string().min(30),
  responsibilities: z.string().min(20),
  requirements:     z.string().min(20),
  niceToHave:       z.string().optional(),
});
type FormValues = z.infer<typeof schema>;

const inputClass = 'h-11 rounded-none border-x-0 border-t-0 border-b border-foreground/20 bg-transparent px-0 shadow-none focus-visible:ring-0 focus-visible:border-foreground transition-colors';
const textClass  = 'rounded-lg border border-foreground/10 bg-transparent focus-visible:ring-0 focus-visible:border-foreground transition-colors resize-y';

const F = ({ label, hint, err, children }: { label: string; hint?: string; err?: string; children: React.ReactNode }) => (
  <div className="space-y-2">
    <Label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{label}</Label>
    {children}
    {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    {err && <p className="text-xs text-destructive">{err}</p>}
  </div>
);

export default function EditCareerPosition({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [position, setPosition] = useState<(Position & { source: string }) | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [saved, setSaved] = useState(false);

  const { register, handleSubmit, setValue, watch, reset, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    fetch(`/api/admin/careers/${id}`)
      .then(r => { if (!r.ok) { setNotFound(true); setLoading(false); return null; } return r.json(); })
      .then((data: Position & { source: string } | null) => {
        if (!data) return;
        setPosition(data);
        reset({
          title:            data.title,
          department:       data.department,
          type:             data.type,
          location:         data.location,
          tagline:          data.tagline,
          about:            data.about,
          responsibilities: data.responsibilities.join('\n'),
          requirements:     data.requirements.join('\n'),
          niceToHave:       data.niceToHave?.join('\n') ?? '',
        });
        setLoading(false);
      });
  }, [id, reset]);

  const onSubmit = async (data: FormValues) => {
    const updated = {
      ...position,
      title:            data.title,
      department:       data.department,
      type:             data.type,
      location:         data.location,
      tagline:          data.tagline,
      about:            data.about,
      responsibilities: data.responsibilities.split('\n').map(l => l.trim()).filter(Boolean),
      requirements:     data.requirements.split('\n').map(l => l.trim()).filter(Boolean),
      niceToHave:       (data.niceToHave ?? '').split('\n').map(l => l.trim()).filter(Boolean),
    };
    await fetch(`/api/admin/careers/${id}`, {
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
      <p className="text-muted-foreground">Position not found.</p>
      <Link href="/admin/careers"><Button variant="outline" className="rounded-full border-foreground/20">Back to careers</Button></Link>
    </div>
  );
  if (saved) return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center p-8">
      <CheckCircle className="h-10 w-10 text-emerald-600" />
      <h2 className="font-display text-2xl tracking-tight">Changes saved</h2>
      <p className="text-muted-foreground text-sm">
        {position?.source === 'static' ? 'A dynamic copy was created that overrides the static version.' : 'The position has been updated.'}
      </p>
      <div className="flex gap-3 mt-2">
        <Button variant="outline" onClick={() => router.push('/admin/careers')} className="rounded-full border-foreground/20">Back to list</Button>
        <Button onClick={() => setSaved(false)} className="rounded-full bg-foreground text-background">Keep editing</Button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-full">
      <header className="flex h-16 shrink-0 items-center gap-4 border-b border-foreground/10 px-8">
        <Link href="/admin/careers" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group">
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        </Link>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-mono text-muted-foreground">Careers / Edit</p>
          <h1 className="font-display text-lg tracking-tight truncate">{position?.title}</h1>
        </div>
        {position?.source === 'static' && (
          <span className="shrink-0 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-mono text-amber-700">
            static — saving creates a dynamic copy
          </span>
        )}
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="flex-1 overflow-auto">
        <div className="mx-auto max-w-3xl p-8 space-y-8">

          <div className="grid gap-6 sm:grid-cols-2">
            <F label="Job title *" err={errors.title?.message}><Input {...register('title')} className={inputClass} /></F>
            <F label="Department *" err={errors.department?.message}><Input {...register('department')} className={inputClass} /></F>

            <F label="Employment type *" err={errors.type?.message}>
              <Select value={watch('type')} onValueChange={v => setValue('type', v as 'Full-time' | 'Contract', { shouldValidate: true })}>
                <SelectTrigger className="h-11 rounded-none border-x-0 border-t-0 border-b border-foreground/20 bg-transparent px-0 shadow-none focus:ring-0 focus:border-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                </SelectContent>
              </Select>
            </F>

            <F label="Location *" err={errors.location?.message}><Input {...register('location')} className={inputClass} /></F>
          </div>

          <F label="Tagline *" err={errors.tagline?.message}><Input {...register('tagline')} className={inputClass} /></F>
          <F label="About the role *" err={errors.about?.message}><Textarea {...register('about')} rows={4} className={textClass} /></F>
          <F label="Responsibilities *" err={errors.responsibilities?.message} hint="One per line">
            <Textarea {...register('responsibilities')} rows={6} className={textClass} />
          </F>
          <F label="Requirements *" err={errors.requirements?.message} hint="One per line">
            <Textarea {...register('requirements')} rows={6} className={textClass} />
          </F>
          <F label="Nice to have" hint="One per line — optional">
            <Textarea {...register('niceToHave')} rows={4} className={textClass} />
          </F>

          <div className="flex justify-end gap-4 border-t border-foreground/10 pt-6">
            <Link href="/admin/careers"><Button type="button" variant="outline" className="rounded-full border-foreground/20">Cancel</Button></Link>
            <Button type="submit" disabled={isSubmitting} className="rounded-full bg-foreground text-background hover:bg-foreground/90 px-8">
              {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving…</> : 'Save changes'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
