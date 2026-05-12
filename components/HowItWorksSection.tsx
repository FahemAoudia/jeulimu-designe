"use client";

import { CheckCircle2 } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { useLocaleContext, useSiteContext } from "@/providers/AppProviders";
import { pickLocalized, pickLocalizedList } from "@/types/site-content";

export function HowItWorksSection() {
  const { locale } = useLocaleContext();
  const { content } = useSiteContext();
  const bullets = pickLocalizedList(content.howItWorks.bullets, locale);

  if (!(content.sectionVisibility?.experienceAndHow ?? true)) return null;

  return (
    <section
      id="how-it-works"
      className="relative z-10 scroll-mt-28 px-4 pb-10 sm:px-6 lg:px-8 xl:px-12"
    >
      <div className="mx-auto max-w-[1440px]">
        <GlassCard glow="purple" className="p-5 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-ju-cyanGlow">
                jeuLumi
              </p>
              <h2 className="mt-2 text-2xl font-bold uppercase tracking-wide text-white sm:text-3xl">
                {pickLocalized(content.howItWorks.title, locale)}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-ju-soft sm:text-base">
                {pickLocalized(content.howItWorks.intro, locale)}
              </p>
            </div>
            <ul className="flex flex-col gap-3">
              {bullets.map((b, i) => (
                <li
                  key={i}
                  className="ju-on-dark flex gap-3 rounded-xl border border-white/10 bg-black/35 p-4 backdrop-blur-md"
                >
                  <CheckCircle2
                    className="mt-0.5 size-5 shrink-0 text-ju-green"
                    aria-hidden
                  />
                  <span className="text-sm leading-snug text-white/90">{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-8 border-t border-white/10 pt-6 text-center text-sm font-medium text-ju-soft">
            {pickLocalized(content.howItWorks.closing, locale)}
          </p>
        </GlassCard>
      </div>
    </section>
  );
}
