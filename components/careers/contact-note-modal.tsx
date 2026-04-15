'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowRight, CheckCircle, Loader2, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog, DialogContent, DialogTitle, DialogDescription,
} from '@/components/ui/dialog';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';

/* ── Schema ──────────────────────────────────────────────────── */
const schema = z.object({
  name:       z.string().min(1, 'Name is required'),
  email:      z.string().email('Please enter a valid email'),
  specialty:  z.string().min(1, 'Please tell us what you do'),
  portfolio:  z.string().url('Please enter a valid URL').or(z.literal('')).optional(),
  message:    z.string().min(30, 'Please write at least a sentence or two'),
});

type FormValues = z.infer<typeof schema>;

/* ── Field ───────────────────────────────────────────────────── */
function Field({ label, required, error, children }: {
  label: string; required?: boolean; error?: string; children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label className={`text-sm font-medium ${error ? 'text-destructive' : ''}`}>
        {label}{required && <span className="ml-1 text-muted-foreground">*</span>}
      </Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

/* ── Input style: bottom-border only ────────────────────────── */
const lineInput = "h-11 rounded-none border-x-0 border-t-0 border-b border-foreground/20 bg-transparent px-0 shadow-none focus-visible:ring-0 focus-visible:border-foreground transition-colors placeholder:text-muted-foreground/60";

/* ── Success ─────────────────────────────────────────────────── */
function SuccessView({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full border border-foreground/10 bg-foreground/[0.04]">
        <CheckCircle className="h-7 w-7" />
      </div>
      <h3 className="mb-2 text-2xl font-display tracking-tight">Note sent</h3>
      <p className="mb-6 text-muted-foreground max-w-xs leading-relaxed text-sm">
        We read every note personally. If there&apos;s a fit — now or in the future — we&apos;ll reach out.
      </p>
      <Button
        variant="outline"
        onClick={onClose}
        className="rounded-full border-foreground/20 h-11 px-6"
      >
        Close
      </Button>
    </div>
  );
}

/* ── Modal ───────────────────────────────────────────────────── */
export function ContactNoteModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit, setValue, formState: { errors, isSubmitting }, reset } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (_data: FormValues) => {
    await new Promise(r => setTimeout(r, 1200));
    setSubmitted(true);
  };

  const handleClose = (v: boolean) => {
    if (!v) {
      /* reset state when dialog closes */
      setTimeout(() => { reset(); setSubmitted(false); }, 300);
    }
    onOpenChange(v);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        showCloseButton={false}
        className="max-w-xl rounded-none border-foreground/15 p-0 shadow-2xl overflow-hidden sm:max-w-xl"
      >
        {/* Header bar */}
        <div className="flex items-center justify-between border-b border-foreground/10 px-8 py-5">
          <div>
            <DialogTitle className="text-base font-display tracking-tight">
              Send us a note
            </DialogTitle>
            <DialogDescription className="mt-0.5 text-xs font-mono text-muted-foreground">
              No role listed? Tell us who you are.
            </DialogDescription>
          </div>
          <button
            onClick={() => handleClose(false)}
            aria-label="Close"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-foreground/10 text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="px-8 py-7">
          {submitted ? (
            <SuccessView onClose={() => handleClose(false)} />
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">

              {/* Name + Email */}
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Your name" required error={errors.name?.message}>
                  <Input
                    {...register('name')}
                    placeholder="Jane Smith"
                    className={lineInput}
                    aria-invalid={!!errors.name}
                  />
                </Field>
                <Field label="Email" required error={errors.email?.message}>
                  <Input
                    {...register('email')}
                    type="email"
                    placeholder="jane@example.com"
                    className={lineInput}
                    aria-invalid={!!errors.email}
                  />
                </Field>
              </div>

              {/* Specialty */}
              <Field label="What do you do?" required error={errors.specialty?.message}>
                <Select onValueChange={v => setValue('specialty', v, { shouldValidate: true })}>
                  <SelectTrigger
                    className="h-11 rounded-none border-x-0 border-t-0 border-b border-foreground/20 bg-transparent px-0 shadow-none focus:ring-0 focus:border-foreground"
                    aria-invalid={!!errors.specialty}
                  >
                    <SelectValue placeholder="Select a discipline" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="product-design">Product design</SelectItem>
                    <SelectItem value="frontend">Front-end engineering</SelectItem>
                    <SelectItem value="fullstack">Full-stack engineering</SelectItem>
                    <SelectItem value="design-engineering">Design engineering</SelectItem>
                    <SelectItem value="mobile">Mobile development</SelectItem>
                    <SelectItem value="strategy">Product strategy</SelectItem>
                    <SelectItem value="devops">DevOps / infrastructure</SelectItem>
                    <SelectItem value="ai">AI / data</SelectItem>
                    <SelectItem value="other">Something else</SelectItem>
                  </SelectContent>
                </Select>
                {errors.specialty && <p className="text-xs text-destructive">{errors.specialty.message}</p>}
              </Field>

              {/* Portfolio */}
              <Field label="Portfolio or GitHub" error={errors.portfolio?.message}>
                <Input
                  {...register('portfolio')}
                  type="url"
                  placeholder="https://yoursite.com or github.com/…"
                  className={lineInput}
                  aria-invalid={!!errors.portfolio}
                />
              </Field>

              {/* Message */}
              <Field label="Tell us about yourself" required error={errors.message?.message}>
                <Textarea
                  {...register('message')}
                  placeholder="What are you working on? What kind of problems excite you? Why Tachyon?"
                  rows={4}
                  className="rounded-none border-x-0 border-t-0 border-b border-foreground/20 bg-transparent px-0 shadow-none focus-visible:ring-0 focus-visible:border-foreground transition-colors resize-none text-sm placeholder:text-muted-foreground/60 field-sizing-fixed"
                  aria-invalid={!!errors.message}
                />
              </Field>

              {/* Submit */}
              <div className="flex justify-end pt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-12 rounded-full bg-foreground text-background hover:bg-foreground/90 px-7 group"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send note
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </Button>
              </div>

            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
