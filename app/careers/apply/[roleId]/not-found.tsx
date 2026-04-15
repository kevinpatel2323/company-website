import { NotFoundPage } from '@/components/not-found-page';

export default function ApplyNotFound() {
  return (
    <NotFoundPage
      context="Careers · Role not found"
      heading="Role not found"
      description="This position no longer exists or has been filled."
      backHref="/careers"
      backLabel="See open roles"
      ctaHref="/careers#positions"
      ctaLabel="Browse openings"
    />
  );
}
