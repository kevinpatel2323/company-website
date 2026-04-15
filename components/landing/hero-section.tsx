"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AnimatedSphere } from "./animated-sphere";

const words = ["design", "develop", "deliver", "scale"];

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Animated sphere background */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] lg:w-[800px] lg:h-[800px] opacity-20 sm:opacity-30 lg:opacity-40 pointer-events-none">
        <AnimatedSphere />
      </div>
      
      {/* Subtle grid lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        {[...Array(8)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute h-px bg-foreground/10"
            style={{
              top: `${12.5 * (i + 1)}%`,
              left: 0,
              right: 0,
            }}
          />
        ))}
        {[...Array(12)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute w-px bg-foreground/10"
            style={{
              left: `${8.33 * (i + 1)}%`,
              top: 0,
              bottom: 0,
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 py-32 lg:py-40">
        {/* Eyebrow */}
        <div 
          className={`mb-8 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground">
            <span className="w-8 h-px bg-foreground/30" />
            Expert digital solutions for ambitious brands
          </span>
        </div>
        
        {/* Main headline */}
        <div className="mb-12">
          <h1 
            className={`text-[clamp(3rem,12vw,10rem)] font-display leading-[0.9] tracking-tight transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="block">Transform your</span>
            <span className="block">
              vision to reality with{" "}
              <span className="relative inline-block">
                <span 
                  key={wordIndex}
                  className="inline-flex"
                >
                  {words[wordIndex].split("").map((char, i) => (
                    <span
                      key={`${wordIndex}-${i}`}
                      className="inline-block animate-char-in"
                      style={{
                        animationDelay: `${i * 50}ms`,
                      }}
                    >
                      {char}
                    </span>
                  ))}
                </span>
                <span className="absolute -bottom-2 left-0 right-0 h-3 bg-foreground/10" />
              </span>
            </span>
          </h1>
        </div>
        
        {/* Description */}
        <div className="max-w-2xl pb-20 sm:pb-32 lg:pb-48">
          <p 
            className={`text-base sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed mb-8 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            We craft beautiful, functional digital products that drive results. From concept to launch, we&apos;re your partner in success.
          </p>
          
          {/* CTAs */}
          <div 
            className={`flex flex-col sm:flex-row items-start gap-4 transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Button 
              size="lg" 
              className="bg-foreground hover:bg-foreground/90 text-background px-8 h-14 text-base rounded-full group"
            >
              Start your project
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="h-14 px-8 text-base rounded-full border-foreground/20 hover:bg-foreground/5"
            >
              View our work
            </Button>
          </div>
        </div>
        
      </div>
      
      {/* Stats marquee — full width, single-line strip */}
      <div
        className={`absolute bottom-8 sm:bottom-16 left-0 right-0 overflow-hidden transition-opacity duration-700 delay-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* marquee: two copies so the seam is invisible */}
        <div className="flex will-change-transform marquee">
          {[0, 1].map((setIdx) => (
            <div
              key={setIdx}
              /* shrink-0 keeps each set from squeezing; items-center aligns number + label on one axis */
              className="flex shrink-0 items-center gap-6 sm:gap-12 lg:gap-16 pr-6 sm:pr-12 lg:pr-16"
            >
              {(
                [
                  { value: "10+",      label: "projects delivered", company: "TECH BRANDS" },
                  { value: "97%",      label: "client retention",   company: "FORTUNE 500s" },
                  { value: "4 years",  label: "of excellence",      company: "SINCE 2022"   },
                ] as const
              ).map((stat) => (
                <div
                  key={`${stat.company}-${setIdx}`}
                  /* inline-flex + shrink-0 keeps each stat on a single row */
                  className="inline-flex shrink-0 items-center gap-2 sm:gap-3"
                >
                  <span className="text-xl sm:text-3xl lg:text-4xl font-display leading-none whitespace-nowrap">
                    {stat.value}
                  </span>
                  {/* separator */}
                  <span className="text-foreground/20 text-lg leading-none select-none">·</span>
                  <span className="hidden sm:flex flex-col leading-tight">
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{stat.label}</span>
                    <span className="text-[10px] font-mono text-muted-foreground/50 whitespace-nowrap">{stat.company}</span>
                  </span>
                  {/* mobile: show only the label, no stacked company line */}
                  <span className="sm:hidden text-xs text-muted-foreground whitespace-nowrap">{stat.label}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      
      {/* Scroll indicator */}
      
    </section>
  );
}
