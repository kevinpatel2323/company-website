import type { Metadata } from "next";
import Link from "next/link";

import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms and conditions for using the Tachyon Tech website and related digital services.",
};

export default function TermsPage() {
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
            Terms of use
          </h1>
          <p className="text-sm text-muted-foreground mb-16">
            Last updated: 16 May 2026
          </p>

          <div className="space-y-10 text-muted-foreground leading-relaxed">
            <p>
              These terms govern your use of the Tachyon Tech website and any content or features we make available
              here. By accessing or using the site, you agree to these terms. If you do not agree, please do not use
              the site.
            </p>

            <section className="space-y-4">
              <h2 className="text-lg font-medium text-foreground">Use of the site</h2>
              <p>
                You may browse and use the site for lawful purposes only. You agree not to interfere with the
                operation of the site, attempt unauthorized access to our systems or data, or use automated means to
                scrape or overload the site without our prior written consent.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-lg font-medium text-foreground">Intellectual property</h2>
              <p>
                Text, graphics, logos, layouts, and other materials on this site are owned by Tachyon Tech or our
                licensors and are protected by applicable intellectual property laws. You may not copy, modify, or
                redistribute site content for commercial use without permission, except as allowed by law or with our
                express consent.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-lg font-medium text-foreground">Informational content</h2>
              <p>
                Content on this site is provided for general information and may change without notice. It does not
                constitute professional advice (legal, financial, or otherwise). You should obtain advice tailored to
                your situation before acting on site content.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-lg font-medium text-foreground">Third-party links</h2>
              <p>
                The site may link to third-party websites or services. We are not responsible for their content,
                policies, or practices. Your use of third-party sites is at your own risk.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-lg font-medium text-foreground">Disclaimer</h2>
              <p>
                The site and its content are provided &quot;as is&quot; and &quot;as available&quot; without warranties
                of any kind, to the fullest extent permitted by law. We do not warrant that the site will be
                uninterrupted, error-free, or free of harmful components.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-lg font-medium text-foreground">Limitation of liability</h2>
              <p>
                To the maximum extent permitted by applicable law, Tachyon Tech and its team will not be liable for
                any indirect, incidental, special, consequential, or punitive damages, or any loss of profits, data, or
                goodwill, arising from your use of or inability to use the site.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-lg font-medium text-foreground">Changes</h2>
              <p>
                We may update these terms from time to time. The &quot;Last updated&quot; date at the top of this page
                will change when we do. Continued use of the site after changes constitutes acceptance of the revised
                terms.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-lg font-medium text-foreground">Contact</h2>
              <p>
                Questions about these terms? Visit our{" "}
                <Link href="/contact" className="text-foreground underline underline-offset-4 hover:no-underline">
                  contact page
                </Link>
                . Our{" "}
                <Link href="/privacy" className="text-foreground underline underline-offset-4 hover:no-underline">
                  privacy policy
                </Link>{" "}
                explains how we handle personal information.
              </p>
            </section>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
