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
import type { ContentBlock, BlogPost } from '@/lib/blog-posts';

/* ── Serialise ContentBlock[] → markdown-lite text ─────────────── */
function blocksToMarkdown(blocks: ContentBlock[]): string {
  return blocks
    .map(b => {
      switch (b.type) {
        case 'heading':   return `${'#'.repeat(b.level)} ${b.text}`;
        case 'paragraph': return b.text;
        case 'quote':     return `> ${b.text}${b.attribution ? `\n\n— ${b.attribution}` : ''}`;
        case 'callout':   return `!!! ${b.text}`;
        case 'list':      return b.items.map(i => `- ${i}`).join('\n');
        case 'stat-row':  return b.stats.map(s => `${s.metric}|${s.label}`).join('\n');
        case 'divider':   return '---';
        default:          return '';
      }
    })
    .join('\n\n');
}

/* ── Markdown-lite → ContentBlock[] ─────────────────────────────── */
function parseBody(raw: string): ContentBlock[] {
  const lines = raw.split('\n');
  const blocks: ContentBlock[] = [];
  let listBuf: string[] = [];
  let statBuf: { metric: string; label: string }[] = [];
  let paraBuf: string[] = [];

  const flush = () => {
    const t = paraBuf.join(' ').trim();
    if (t) blocks.push({ type: 'paragraph', text: t });
    paraBuf = [];
    if (listBuf.length) { blocks.push({ type: 'list', items: [...listBuf] }); listBuf = []; }
    if (statBuf.length) { blocks.push({ type: 'stat-row', stats: [...statBuf] }); statBuf = []; }
  };

  for (const raw of lines) {
    const t = raw.trim();
    if (!t) { flush(); continue; }
    if (t.startsWith('## ')) { flush(); const text = t.slice(3); blocks.push({ type: 'heading', level: 2, text, id: text.toLowerCase().replace(/[^a-z0-9]+/g, '-') }); }
    else if (t.startsWith('### ')) { flush(); const text = t.slice(4); blocks.push({ type: 'heading', level: 3, text, id: text.toLowerCase().replace(/[^a-z0-9]+/g, '-') }); }
    else if (t.startsWith('> ')) { flush(); blocks.push({ type: 'quote', text: t.slice(2) }); }
    else if (t.startsWith('!!! ')) { flush(); blocks.push({ type: 'callout', text: t.slice(4) }); }
    else if (t === '---') { flush(); blocks.push({ type: 'divider' }); }
    else if (t.startsWith('- ')) { paraBuf.length && flush(); statBuf.length && flush(); listBuf.push(t.slice(2)); }
    else if (t.includes('|') && !t.startsWith('#')) {
      const [metric, label] = t.split('|').map(s => s.trim());
      if (metric && label) { paraBuf.length && (flush()); listBuf.length && flush(); statBuf.push({ metric, label }); }
    } else { listBuf.length && flush(); statBuf.length && flush(); paraBuf.push(t); }
  }
  flush();
  return blocks;
}

/* ── Schema ─────────────────────────────────────────────────────── */
const schema = z.object({
  title:       z.string().min(5),
  excerpt:     z.string().min(20),
  category:    z.enum(['Case Study', 'Insight', 'Guide']),
  tags:        z.string().min(1),
  readingTime: z.coerce.number().min(1).max(60),
  featured:    z.boolean().default(false),
  coverImage:  z.string().url().or(z.literal('')).optional(),
  body:        z.string().min(50),
});
type FormValues = z.infer<typeof schema>;

const inputClass = 'h-11 rounded-none border-x-0 border-t-0 border-b border-foreground/20 bg-transparent px-0 shadow-none focus-visible:ring-0 focus-visible:border-foreground transition-colors';

/* ── Page ───────────────────────────────────────────────────────── */
export default function EditBlogPost({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [post, setPost] = useState<(BlogPost & { source: string }) | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [saved, setSaved] = useState(false);

  const { register, handleSubmit, setValue, watch, reset, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  /* Load */
  useEffect(() => {
    fetch(`/api/admin/blog/${id}`)
      .then(r => { if (!r.ok) { setNotFound(true); setLoading(false); return null; } return r.json(); })
      .then((data: BlogPost & { source: string } | null) => {
        if (!data) return;
        setPost(data);
        reset({
          title:       data.title,
          excerpt:     data.excerpt,
          category:    data.category as 'Case Study' | 'Insight' | 'Guide',
          tags:        data.tags.join(', '),
          readingTime: data.readingTime,
          featured:    data.featured,
          coverImage:  data.coverImage ?? '',
          body:        blocksToMarkdown(data.body),
        });
        setLoading(false);
      });
  }, [id, reset]);

  /* Save */
  const onSubmit = async (data: FormValues) => {
    const updated = {
      slug:        post!.slug,
      title:       data.title,
      excerpt:     data.excerpt,
      category:    data.category,
      tags:        data.tags.split(',').map(t => t.trim()).filter(Boolean),
      readingTime: data.readingTime,
      featured:    data.featured,
      coverImage:  data.coverImage || post!.coverImage,
      publishedAt: post!.publishedAt,
      updatedAt:   new Date().toISOString().split('T')[0],
      author:      post!.author,
      body:        parseBody(data.body),
    };
    await fetch(`/api/admin/blog/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    });
    setSaved(true);
  };

  /* States */
  if (loading) return <div className="flex-1 flex items-center justify-center"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>;
  if (notFound) return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center p-8">
      <AlertCircle className="h-10 w-10 text-muted-foreground/40" />
      <p className="text-muted-foreground">Post not found.</p>
      <Link href="/admin/blog"><Button variant="outline" className="rounded-full border-foreground/20">Back to blog</Button></Link>
    </div>
  );
  if (saved) return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center p-8">
      <CheckCircle className="h-10 w-10 text-emerald-600" />
      <h2 className="font-display text-2xl tracking-tight">Changes saved</h2>
      <p className="text-muted-foreground text-sm">
        {post?.source === 'static' ? 'A dynamic copy was created that overrides the static version.' : 'The post has been updated.'}
      </p>
      <div className="flex gap-3 mt-2">
        <Button variant="outline" onClick={() => router.push('/admin/blog')} className="rounded-full border-foreground/20">Back to list</Button>
        <Button onClick={() => setSaved(false)} className="rounded-full bg-foreground text-background">Keep editing</Button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-full">
      <header className="flex h-16 shrink-0 items-center gap-4 border-b border-foreground/10 px-8">
        <Link href="/admin/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group">
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        </Link>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-mono text-muted-foreground">Blog / Edit</p>
          <h1 className="font-display text-lg tracking-tight truncate">{post?.title}</h1>
        </div>
        {post?.source === 'static' && (
          <span className="shrink-0 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-mono text-amber-700">
            static — saving creates a dynamic copy
          </span>
        )}
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="flex-1 overflow-auto">
        <div className="mx-auto max-w-3xl p-8 space-y-8">

          <div className="space-y-2">
            <Label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Title *</Label>
            <Input {...register('title')} className={inputClass} />
            {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Excerpt *</Label>
            <Textarea {...register('excerpt')} rows={3} className="rounded-none border-x-0 border-t-0 border-b border-foreground/20 bg-transparent px-0 shadow-none focus-visible:ring-0 focus-visible:border-foreground resize-none field-sizing-fixed" />
            {errors.excerpt && <p className="text-xs text-destructive">{errors.excerpt.message}</p>}
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            <div className="space-y-2">
              <Label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Category *</Label>
              <Select value={watch('category')} onValueChange={v => setValue('category', v as 'Case Study' | 'Insight' | 'Guide', { shouldValidate: true })}>
                <SelectTrigger className="h-11 rounded-none border-x-0 border-t-0 border-b border-foreground/20 bg-transparent px-0 shadow-none focus:ring-0 focus:border-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Case Study">Case Study</SelectItem>
                  <SelectItem value="Insight">Insight</SelectItem>
                  <SelectItem value="Guide">Guide</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Reading time (min)</Label>
              <Input {...register('readingTime')} type="number" min={1} className={inputClass} />
            </div>
            <div className="flex items-end pb-3 gap-3">
              <input type="checkbox" {...register('featured')} id="featured-edit" className="h-4 w-4 accent-foreground" />
              <label htmlFor="featured-edit" className="text-sm">Featured post</label>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Tags *</Label>
            <Input {...register('tags')} className={inputClass} />
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Cover image URL</Label>
            <Input {...register('coverImage')} type="url" className={inputClass} />
          </div>

          <div className="space-y-3">
            <Label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Content *</Label>
            <Textarea {...register('body')} rows={22} className="rounded-lg border border-foreground/10 bg-transparent font-mono text-sm focus-visible:ring-0 focus-visible:border-foreground resize-y" />
            {errors.body && <p className="text-xs text-destructive">{errors.body.message}</p>}
          </div>

          <div className="flex justify-end gap-4 border-t border-foreground/10 pt-6">
            <Link href="/admin/blog"><Button type="button" variant="outline" className="rounded-full border-foreground/20">Cancel</Button></Link>
            <Button type="submit" disabled={isSubmitting} className="rounded-full bg-foreground text-background hover:bg-foreground/90 px-8">
              {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving…</> : 'Save changes'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
