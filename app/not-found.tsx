import { NotFoundPage } from '@/components/not-found-page';

export default function GlobalNotFound() {
  return (
    <NotFoundPage
      context="Error · 404"
      heading="Nothing here"
      description="The page you're looking for doesn't exist or has moved."
      backHref="/"
      backLabel="Back to home"
      ctaHref="/work"
      ctaLabel="View our work"
    />
  );
}
