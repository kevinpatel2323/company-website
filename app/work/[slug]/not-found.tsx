import { NotFoundPage } from '@/components/not-found-page';

export default function WorkNotFound() {
  return (
    <NotFoundPage
      context="Our work · Project not found"
      heading="Project not found"
      description="This case study doesn't exist or was removed."
      backHref="/work"
      backLabel="All projects"
      ctaHref="/contact"
      ctaLabel="Start a project"
    />
  );
}
