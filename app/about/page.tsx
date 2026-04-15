'use client';

import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { AboutHeroSection } from "@/components/about/about-hero-section";
import { ValuesSection } from "@/components/about/values-section";
import { XFactorSection } from "@/components/about/x-factor-section";
import { TeamSection } from "@/components/about/team-section";
import { AchievementsSection } from "@/components/about/achievements-section";
import { CultureSection } from "@/components/about/culture-section";
import { JoinTeamSection } from "@/components/about/join-team-section";

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <Navigation />
      <AboutHeroSection />
      <ValuesSection />
      <XFactorSection />
      <TeamSection />
      <AchievementsSection />
      <CultureSection />
      <JoinTeamSection />
      <FooterSection />
    </main>
  );
}
