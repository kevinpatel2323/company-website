'use client';

import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactInfo } from "@/components/contact/contact-info";

export default function ContactPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <Navigation />
      
      <section className="relative py-24 lg:py-32 mt-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="mb-16 lg:mb-24">
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
              <span className="w-8 h-px bg-foreground/30" />
              Get in touch
            </span>
            <h1 className="text-5xl lg:text-7xl font-display tracking-tight mb-6 leading-[0.95]">
              Let&apos;s work
              <br />
              together
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
              Have an idea in mind? We&apos;d love to hear about it. Reach out and let&apos;s create something amazing together.
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Form */}
            <ContactForm />
            
            {/* Contact Info */}
            <ContactInfo />
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
