import { NotFoundPage } from '@/components/not-found-page';

export default function BlogNotFound() {
  return (
    <NotFoundPage
      context="Blog · Post not found"
      heading="Post not found"
      description="This article doesn't exist or was removed."
      backHref="/blog"
      backLabel="All posts"
      ctaHref="/contact"
      ctaLabel="Get in touch"
    />
  );
}
