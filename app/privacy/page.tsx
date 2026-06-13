import type { Metadata } from "next";
import Link from "next/link";

import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Tachyon Tech collects, uses, and protects information when you use our website and services.",
};

export default function PrivacyPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <Navigation />

      <section className="relative py-24 lg:py-32 mt-20">
        <div className="max-w-[720px] mx-auto px-6 lg:px-12">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            Legal
          </span>
          <h1 className="text-4xl sm:text-5xl font-display tracking-tight mb-6">
            Privacy policy
          </h1>
          <p className="text-sm text-muted-foreground mb-16">
            Last updated: 16 May 2026
          </p>

          <div className="space-y-10 text-muted-foreground leading-relaxed">
            <p>
              This policy describes how Tachyon Tech (&quot;we&quot;, &quot;us&quot;) handles information when you
              visit our website or get in touch with us. It is provided for transparency and may be updated from time
              to time.
            </p>

            <section className="space-y-4">
              <h2 className="text-lg font-medium text-foreground">Information we collect</h2>
              <p>
                We may collect information you choose to give us—such as your name, email address, and message content
                when you use our contact forms or email us. We also receive standard technical data from your browser
                (for example device type, approximate region, and pages viewed) through common analytics and security
                tools, where enabled.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-lg font-medium text-foreground">How we use information</h2>
              <p>
                We use this information to respond to enquiries, operate and improve our site, understand aggregate
                usage patterns, and protect our services from abuse or fraud. We do not sell your personal information.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-lg font-medium text-foreground">Cookies</h2>
              <p>
                Our site may use cookies and similar technologies where needed for functionality, preferences, or
                analytics. You can control cookies through your browser settings.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-lg font-medium text-foreground">Retention & security</h2>
              <p>
                We keep information only as long as needed for the purposes above or as required by law, and we apply
                reasonable safeguards designed to protect it. No method of transmission over the internet is
                completely secure.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-lg font-medium text-foreground">Your choices</h2>
              <p>
                Depending on where you live, you may have rights to access, correct, or delete certain personal data we
                hold, or to object to some processing. To make a request, contact us using the details on our{" "}
                <Link href="/contact" className="text-foreground underline underline-offset-4 hover:no-underline">
                  contact page
                </Link>
                .
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-lg font-medium text-foreground">Questions</h2>
              <p>
                If you have questions about this policy, reach out via our{" "}
                <Link href="/contact" className="text-foreground underline underline-offset-4 hover:no-underline">
                  contact page
                </Link>
                .
              </p>
            </section>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
