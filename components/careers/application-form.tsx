'use client';

import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, Loader2, Upload, X } from 'lucide-react';

import type { Position } from '@/lib/careers-data';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';

/* ── Validation schema ───────────────────────────────────────── */
const schema = z.object({
  firstName:   z.string().min(1, 'First name is required'),
  lastName:    z.string().min(1, 'Last name is required'),
  email:       z.string().email('Please enter a valid email'),
  phone:       z.string().optional(),
  linkedin:    z.string().url('Please enter a valid URL').or(z.literal('')).optional(),
  portfolio:   z.string().url('Please enter a valid URL').or(z.literal('')).optional(),
  experience:  z.string().min(1, 'Please select your experience level'),
  availability: z.string().min(1, 'Please select your availability'),
  source:      z.string().min(1, 'Please let us know how you heard about us'),
  coverLetter: z.string().min(50, 'Please write at least a couple of sentences'),
  resumeLink:  z.string().url('Please enter a valid URL to your resume').or(z.literal('')).optional(),
  consent:     z.literal(true, { errorMap: () => ({ message: 'You must agree to continue' }) }),
});

type FormValues = z.infer<typeof schema>;

/* ── Field wrapper ───────────────────────────────────────────── */
function Field({
  label, required, error, children, hint,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="space-y-2">
      <Label className={`text-sm font-medium ${error ? 'text-destructive' : ''}`}>
        {label}
        {required && <span className="ml-1 text-muted-foreground">*</span>}
      </Label>
      {children}
      {hint && !error && <p className="text-xs text-muted-foreground">{hint}</p>}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

/* ── Success state ───────────────────────────────────────────── */
function SuccessScreen({ position }: { position: Position }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full border border-foreground/10 bg-foreground/[0.04]">
        <CheckCircle className="h-8 w-8 text-foreground" />
      </div>
      <h2 className="mb-3 text-3xl font-display tracking-tight lg:text-4xl">Application received</h2>
      <p className="mb-2 text-lg text-muted-foreground max-w-md">
        Thank you for applying for <strong className="text-foreground">{position.title}</strong>. We review every application personally.
      </p>
      <p className="mb-10 text-muted-foreground max-w-md">
        If your background looks like a strong fit, we&apos;ll be in touch within 5–7 business days for an intro call.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link href="/careers">
          <Button variant="outline" className="rounded-full border-foreground/20 h-12 px-6">
            View other roles
          </Button>
        </Link>
        <Link href="/">
          <Button className="rounded-full bg-foreground text-background hover:bg-foreground/90 h-12 px-6">
            Back to home
          </Button>
        </Link>
      </div>
    </div>
  );
}

/* ── Main form ───────────────────────────────────────────────── */
export function ApplicationForm({ position }: { position: Position }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); } },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (_data: FormValues) => {
    /* Simulate network round-trip — swap for real API call */
    await new Promise(r => setTimeout(r, 1400));
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (submitted) return <SuccessScreen position={position} />;

  return (
    <div ref={sectionRef}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>

        {/* ── Personal details ─────────────────────────────── */}
        <fieldset className="mb-12">
          <legend
            className={`mb-8 w-full border-b border-foreground/10 pb-4 text-xs font-mono uppercase tracking-widest text-muted-foreground transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            Personal details
          </legend>

          <div className={`grid gap-6 sm:grid-cols-2 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Field label="First name" required error={errors.firstName?.message}>
              <Input
                {...register('firstName')}
                placeholder="Jane"
                className="h-12 rounded-none border-x-0 border-t-0 border-b border-foreground/20 bg-transparent px-0 focus-visible:ring-0 focus-visible:border-foreground transition-colors"
                aria-invalid={!!errors.firstName}
              />
            </Field>

            <Field label="Last name" required error={errors.lastName?.message}>
              <Input
                {...register('lastName')}
                placeholder="Smith"
                className="h-12 rounded-none border-x-0 border-t-0 border-b border-foreground/20 bg-transparent px-0 focus-visible:ring-0 focus-visible:border-foreground transition-colors"
                aria-invalid={!!errors.lastName}
              />
            </Field>

            <Field label="Email address" required error={errors.email?.message}>
              <Input
                {...register('email')}
                type="email"
                placeholder="jane@example.com"
                className="h-12 rounded-none border-x-0 border-t-0 border-b border-foreground/20 bg-transparent px-0 focus-visible:ring-0 focus-visible:border-foreground transition-colors"
                aria-invalid={!!errors.email}
              />
            </Field>

            <Field label="Phone number" error={errors.phone?.message} hint="Optional — include country code">
              <Input
                {...register('phone')}
                type="tel"
                placeholder="+1 555 000 0000"
                className="h-12 rounded-none border-x-0 border-t-0 border-b border-foreground/20 bg-transparent px-0 focus-visible:ring-0 focus-visible:border-foreground transition-colors"
              />
            </Field>
          </div>
        </fieldset>

        {/* ── Links ────────────────────────────────────────── */}
        <fieldset className="mb-12">
          <legend
            className={`mb-8 w-full border-b border-foreground/10 pb-4 text-xs font-mono uppercase tracking-widest text-muted-foreground transition-all duration-700 delay-150 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            Links & portfolio
          </legend>

          <div className={`grid gap-6 sm:grid-cols-2 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Field label="LinkedIn URL" error={errors.linkedin?.message} hint="linkedin.com/in/…">
              <Input
                {...register('linkedin')}
                type="url"
                placeholder="https://linkedin.com/in/janesmith"
                className="h-12 rounded-none border-x-0 border-t-0 border-b border-foreground/20 bg-transparent px-0 focus-visible:ring-0 focus-visible:border-foreground transition-colors"
                aria-invalid={!!errors.linkedin}
              />
            </Field>

            <Field label="Portfolio / website" error={errors.portfolio?.message} hint="Figma, GitHub, personal site…">
              <Input
                {...register('portfolio')}
                type="url"
                placeholder="https://yoursite.com"
                className="h-12 rounded-none border-x-0 border-t-0 border-b border-foreground/20 bg-transparent px-0 focus-visible:ring-0 focus-visible:border-foreground transition-colors"
                aria-invalid={!!errors.portfolio}
              />
            </Field>

            <Field label="Resume link" error={errors.resumeLink?.message} hint="Google Drive, Dropbox, or any public link">
              <Input
                {...register('resumeLink')}
                type="url"
                placeholder="https://drive.google.com/…"
                className="h-12 rounded-none border-x-0 border-t-0 border-b border-foreground/20 bg-transparent px-0 focus-visible:ring-0 focus-visible:border-foreground transition-colors"
                aria-invalid={!!errors.resumeLink}
              />
            </Field>

            {/* Local file upload — visual only, pairs with resumeLink */}
            <Field label="Or upload resume" hint="PDF, DOCX — max 5 MB">
              <label className="flex h-12 cursor-pointer items-center gap-3 border-b border-foreground/20 transition-colors hover:border-foreground">
                <Upload className="h-4 w-4 shrink-0 text-muted-foreground" />
                <span className="flex-1 truncate text-sm text-muted-foreground">
                  {resumeFile ? resumeFile.name : 'Choose file…'}
                </span>
                {resumeFile && (
                  <button
                    type="button"
                    onClick={e => { e.preventDefault(); setResumeFile(null); }}
                    className="text-muted-foreground hover:text-foreground"
                    aria-label="Remove file"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="sr-only"
                  onChange={e => setResumeFile(e.target.files?.[0] ?? null)}
                />
              </label>
            </Field>
          </div>
        </fieldset>

        {/* ── Experience & logistics ────────────────────────── */}
        <fieldset className="mb-12">
          <legend
            className={`mb-8 w-full border-b border-foreground/10 pb-4 text-xs font-mono uppercase tracking-widest text-muted-foreground transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            Experience &amp; logistics
          </legend>

          <div className={`grid gap-6 sm:grid-cols-2 transition-all duration-700 delay-250 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Field label="Years of experience" required error={errors.experience?.message}>
              <Select onValueChange={v => setValue('experience', v, { shouldValidate: true })}>
                <SelectTrigger
                  className="h-12 rounded-none border-x-0 border-t-0 border-b border-foreground/20 bg-transparent px-0 focus:ring-0 focus:border-foreground shadow-none"
                  aria-invalid={!!errors.experience}
                >
                  <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-2">0–2 years</SelectItem>
                  <SelectItem value="3-5">3–5 years</SelectItem>
                  <SelectItem value="6-9">6–9 years</SelectItem>
                  <SelectItem value="10+">10+ years</SelectItem>
                </SelectContent>
              </Select>
              {errors.experience && <p className="text-xs text-destructive">{errors.experience.message}</p>}
            </Field>

            <Field label="Availability to start" required error={errors.availability?.message}>
              <Select onValueChange={v => setValue('availability', v, { shouldValidate: true })}>
                <SelectTrigger
                  className="h-12 rounded-none border-x-0 border-t-0 border-b border-foreground/20 bg-transparent px-0 focus:ring-0 focus:border-foreground shadow-none"
                  aria-invalid={!!errors.availability}
                >
                  <SelectValue placeholder="Select timeline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Immediately</SelectItem>
                  <SelectItem value="2-weeks">2 weeks</SelectItem>
                  <SelectItem value="1-month">1 month</SelectItem>
                  <SelectItem value="2-months">2 months</SelectItem>
                  <SelectItem value="flexible">Flexible / open to discuss</SelectItem>
                </SelectContent>
              </Select>
              {errors.availability && <p className="text-xs text-destructive">{errors.availability.message}</p>}
            </Field>

            <Field label="How did you hear about us?" required error={errors.source?.message}>
              <Select onValueChange={v => setValue('source', v, { shouldValidate: true })}>
                <SelectTrigger
                  className="h-12 rounded-none border-x-0 border-t-0 border-b border-foreground/20 bg-transparent px-0 focus:ring-0 focus:border-foreground shadow-none"
                  aria-invalid={!!errors.source}
                >
                  <SelectValue placeholder="Select source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                  <SelectItem value="twitter">Twitter / X</SelectItem>
                  <SelectItem value="referral">Referral from someone at Tachyon</SelectItem>
                  <SelectItem value="job-board">Job board</SelectItem>
                  <SelectItem value="website">Company website</SelectItem>
                  <SelectItem value="blog">Blog / article</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.source && <p className="text-xs text-destructive">{errors.source.message}</p>}
            </Field>
          </div>
        </fieldset>

        {/* ── Cover letter ─────────────────────────────────── */}
        <fieldset className="mb-12">
          <legend
            className={`mb-8 w-full border-b border-foreground/10 pb-4 text-xs font-mono uppercase tracking-widest text-muted-foreground transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            Tell us about yourself
          </legend>

          <div className={`transition-all duration-700 delay-350 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Field
              label="Cover letter / message"
              required
              error={errors.coverLetter?.message}
              hint="Why this role? What are you most proud of in your recent work? What kind of problems excite you?"
            >
              <Textarea
                {...register('coverLetter')}
                placeholder="Write a few paragraphs…"
                rows={8}
                className="rounded-none border-x-0 border-t-0 border-b border-foreground/20 bg-transparent px-0 focus-visible:ring-0 focus-visible:border-foreground transition-colors resize-none field-sizing-fixed"
                aria-invalid={!!errors.coverLetter}
              />
            </Field>
          </div>
        </fieldset>

        {/* ── Consent + submit ─────────────────────────────── */}
        <div className={`flex flex-col gap-8 border-t border-foreground/10 pt-10 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <label className="flex cursor-pointer items-start gap-4">
            <input
              type="checkbox"
              {...register('consent')}
              className="mt-1 h-4 w-4 shrink-0 accent-foreground cursor-pointer"
            />
            <span className="text-sm text-muted-foreground leading-relaxed">
              I agree that Tachyon Tech may store and process my personal data for the purposes of this job application.
              I understand my data will not be shared with third parties without my consent.
              {errors.consent && (
                <span className="ml-1 text-destructive">{errors.consent.message}</span>
              )}
            </span>
          </label>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground font-mono">
              Fields marked <span className="text-foreground">*</span> are required
            </p>

            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="h-14 rounded-full bg-foreground text-background hover:bg-foreground/90 px-10 text-base sm:w-auto w-full"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting…
                </>
              ) : (
                'Submit application'
              )}
            </Button>
          </div>
        </div>

      </form>
    </div>
  );
}
