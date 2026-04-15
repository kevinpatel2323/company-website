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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { ContentBlock } from '@/lib/blog-posts';

const schema = z.object({
  title:       z.string().min(5, 'Title required'),
  excerpt:     z.string().min(20, 'Excerpt required (150–160 chars ideal)'),
  category:    z.enum(['Case Study', 'Insight', 'Guide']),
  tags:        z.string().min(1, 'At least one tag'),
  readingTime: z.coerce.number().min(1).max(60),
  featured:    z.boolean().default(false),
  coverImage:  z.string().url('Must be a valid URL').or(z.literal('')).optional(),
  body:        z.string().min(100, 'Content is too short'),
});

type FormValues = z.infer<typeof schema>;

/**
 * Parses a simple markdown-lite syntax into ContentBlock[].
 *
 * ## Heading 2  → { type: 'heading', level: 2 }
 * ### Heading 3 → { type: 'heading', level: 3 }
 * > Quote       → { type: 'quote' }
 * !!! Callout   → { type: 'callout' }
 * - item        → grouped into { type: 'list' }
 * ---           → { type: 'divider' }
 * metric|label  → grouped into { type: 'stat-row' }
 * blank lines   → paragraph separator
 */
function parseBody(raw: string): ContentBlock[] {
  const lines = raw.split('\n');
  const blocks: ContentBlock[] = [];
  let listBuffer: string[] = [];
  let statBuffer: Array<{ metric: string; label: string }> = [];

  const flushList = () => {
    if (listBuffer.length) { blocks.push({ type: 'list', items: [...listBuffer] }); listBuffer = []; }
  };
  const flushStats = () => {
    if (statBuffer.length) { blocks.push({ type: 'stat-row', stats: [...statBuffer] }); statBuffer = []; }
  };

  let paraLines: string[] = [];
  const flushPara = () => {
    const t = paraLines.join(' ').trim();
    if (t) blocks.push({ type: 'paragraph', text: t });
    paraLines = [];
  };

  for (const line of lines) {
    const t = line.trim();

    if (!t) { flushPara(); flushList(); flushStats(); continue; }

    if (t.startsWith('## ')) {
      flushPara(); flushList(); flushStats();
      const text = t.slice(3);
      blocks.push({ type: 'heading', level: 2, text, id: text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') });
    } else if (t.startsWith('### ')) {
      flushPara(); flushList(); flushStats();
      const text = t.slice(4);
      blocks.push({ type: 'heading', level: 3, text, id: text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') });
    } else if (t.startsWith('> ')) {
      flushPara(); flushList(); flushStats();
      blocks.push({ type: 'quote', text: t.slice(2) });
    } else if (t.startsWith('!!! ')) {
      flushPara(); flushList(); flushStats();
      blocks.push({ type: 'callout', text: t.slice(4) });
    } else if (t === '---') {
      flushPara(); flushList(); flushStats();
      blocks.push({ type: 'divider' });
    } else if (t.startsWith('- ')) {
      flushPara(); flushStats();
      listBuffer.push(t.slice(2));
    } else if (t.includes('|') && !t.startsWith('#')) {
      const [metric, label] = t.split('|').map(s => s.trim());
      if (metric && label) { flushPara(); flushList(); statBuffer.push({ metric, label }); }
    } else {
      flushList(); flushStats();
      paraLines.push(t);
    }
  }

  flushPara(); flushList(); flushStats();
  return blocks;
}

export default function NewBlogPost() {
  const router = useRouter();
  const [done, setDone] = useState(false);

  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { featured: false, readingTime: 5 },
  });

  const onSubmit = async (data: FormValues) => {
    const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const body = parseBody(data.body);
    const post = {
      slug,
      title: data.title,
      excerpt: data.excerpt,
      category: data.category,
      tags: data.tags.split(',').map(t => t.trim()).filter(Boolean),
      readingTime: data.readingTime,
      featured: data.featured,
      coverImage: data.coverImage || `https://picsum.photos/seed/${slug}/1600/900`,
      publishedAt: new Date().toISOString().split('T')[0],
      author: { name: 'Kevin Patel', role: 'Founder & CEO' },
      body,
    };
    await fetch('/api/admin/blog', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(post) });
    setDone(true);
  };

  const inputClass = "h-11 rounded-none border-x-0 border-t-0 border-b border-foreground/20 bg-transparent px-0 shadow-none focus-visible:ring-0 focus-visible:border-foreground transition-colors";

  if (done) return (
    <div className="flex flex-col items-center justify-center flex-1 gap-4 text-center p-8">
      <CheckCircle className="h-10 w-10 text-emerald-600" />
      <h2 className="font-display text-2xl tracking-tight">Post published!</h2>
      <p className="text-muted-foreground text-sm">It will appear on the blog immediately.</p>
      <div className="flex gap-3 mt-2">
        <Button variant="outline" onClick={() => router.push('/admin/blog')} className="rounded-full border-foreground/20">Back to list</Button>
        <Button onClick={() => { setDone(false); }} className="rounded-full bg-foreground text-background">Write another</Button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-full">
      <header className="flex h-16 shrink-0 items-center gap-4 border-b border-foreground/10 px-8">
        <Link href="/admin/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group">
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        </Link>
        <div>
          <p className="text-xs font-mono text-muted-foreground">Blog</p>
          <h1 className="font-display text-lg tracking-tight">New post</h1>
        </div>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="flex-1 overflow-auto">
        <div className="mx-auto max-w-3xl p-8 space-y-8">

          {/* Title */}
          <div className="space-y-2">
            <Label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Title *</Label>
            <Input {...register('title')} placeholder="The compelling post title…" className={inputClass} />
            {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
          </div>

          {/* Excerpt */}
          <div className="space-y-2">
            <Label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Excerpt / meta description *</Label>
            <Textarea {...register('excerpt')} placeholder="150–160 chars shown in search results and on the blog listing…" rows={3} className="rounded-none border-x-0 border-t-0 border-b border-foreground/20 bg-transparent px-0 shadow-none focus-visible:ring-0 focus-visible:border-foreground transition-colors resize-none field-sizing-fixed" />
            {errors.excerpt && <p className="text-xs text-destructive">{errors.excerpt.message}</p>}
          </div>

          {/* Category + Reading time */}
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="space-y-2">
              <Label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Category *</Label>
              <Select onValueChange={v => setValue('category', v as 'Case Study' | 'Insight' | 'Guide', { shouldValidate: true })}>
                <SelectTrigger className="h-11 rounded-none border-x-0 border-t-0 border-b border-foreground/20 bg-transparent px-0 shadow-none focus:ring-0 focus:border-foreground">
                  <SelectValue placeholder="Select…" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Case Study">Case Study</SelectItem>
                  <SelectItem value="Insight">Insight</SelectItem>
                  <SelectItem value="Guide">Guide</SelectItem>
                </SelectContent>
              </Select>
              {errors.category && <p className="text-xs text-destructive">{errors.category.message}</p>}
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Reading time (min) *</Label>
              <Input {...register('readingTime')} type="number" min={1} className={inputClass} />
              {errors.readingTime && <p className="text-xs text-destructive">{errors.readingTime.message}</p>}
            </div>

            <div className="flex items-end pb-3 gap-3">
              <input type="checkbox" {...register('featured')} id="featured" className="h-4 w-4 accent-foreground" />
              <label htmlFor="featured" className="text-sm">Featured post</label>
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Tags *</Label>
            <Input {...register('tags')} placeholder="design systems, engineering, product (comma-separated)" className={inputClass} />
            {errors.tags && <p className="text-xs text-destructive">{errors.tags.message}</p>}
          </div>

          {/* Cover image */}
          <div className="space-y-2">
            <Label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Cover image URL</Label>
            <Input {...register('coverImage')} type="url" placeholder="https://images.unsplash.com/…" className={inputClass} />
            <p className="text-xs text-muted-foreground">Leave blank to auto-generate a placeholder.</p>
          </div>

          {/* Body */}
          <div className="space-y-3">
            <Label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Content *</Label>
            <div className="rounded-lg border border-foreground/10 bg-foreground/[0.02] px-4 py-3 text-xs font-mono text-muted-foreground space-y-1">
              <p className="font-medium text-foreground/70">Syntax reference:</p>
              <p><code className="text-foreground/80">## Heading 2</code>  <code className="text-foreground/80">### Heading 3</code>  <code className="text-foreground/80">&gt; Quote text</code></p>
              <p><code className="text-foreground/80">- List item</code>  <code className="text-foreground/80">!!! Callout text</code>  <code className="text-foreground/80">---</code> divider</p>
              <p><code className="text-foreground/80">42%|Metric label</code> → stat row  •  Blank line → new paragraph</p>
            </div>
            <Textarea
              {...register('body')}
              placeholder={`## Why this matters\n\nWrite your first paragraph here. Each blank line starts a new paragraph.\n\n- First list item\n- Second list item\n\n42%|Conversion lift\n3 days|Time to activation\n\n> "This is a pull quote." — Author name`}
              rows={20}
              className="rounded-lg border border-foreground/10 bg-transparent font-mono text-sm focus-visible:ring-0 focus-visible:border-foreground transition-colors resize-y"
            />
            {errors.body && <p className="text-xs text-destructive">{errors.body.message}</p>}
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-4 border-t border-foreground/10 pt-6">
            <Link href="/admin/blog">
              <Button type="button" variant="outline" className="rounded-full border-foreground/20">Cancel</Button>
            </Link>
            <Button type="submit" disabled={isSubmitting} className="rounded-full bg-foreground text-background hover:bg-foreground/90 px-8">
              {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Publishing…</> : 'Publish post'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
