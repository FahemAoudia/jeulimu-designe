"use client";

import { Star } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { useLocaleContext, useSiteContext } from "@/providers/AppProviders";
import { ui } from "@/lib/ui-strings";
import { pickLocalized } from "@/types/site-content";

export function Testimonials() {
  const { locale } = useLocaleContext();
  const { content } = useSiteContext();
  const t = ui(locale);

  if (content.sectionVisibility?.testimonials === false) return null;

  return (
    <GlassCard glow="magenta" className="flex h-full flex-col" id="testimonials">
      <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-ju-cyanGlow">
        {t.reviewsSource}
      </p>
      <h2 className="mt-1 text-xl font-bold uppercase tracking-wide text-white sm:text-2xl">
        {t.reviewsTitle}
      </h2>
      <p className="mt-1 text-xs text-ju-muted">{t.reviewsMeta}</p>

      <div className="mt-4 flex flex-1 flex-col gap-2.5">
        {(content.testimonialReviews ?? []).length === 0 ? (
          <p className="rounded-xl border border-dashed border-white/15 bg-black/20 px-4 py-6 text-center text-sm text-ju-muted">
            No reviews configured — add entries in Admin → Reviews, then save.
          </p>
        ) : null}
        {(content.testimonialReviews ?? []).map((r) => (
          <article
            key={r.id}
            className="ju-on-dark rounded-xl border border-white/10 bg-black/35 p-3.5 shadow-[inset_0_0_0_1px_rgba(255,45,149,0.15)] backdrop-blur-md transition duration-300 sm:p-4"
          >
            <div className="flex items-start gap-3">
              <div
                className="size-10 shrink-0 rounded-full bg-gradient-to-br from-ju-electric/50 to-[#FF2D95]/55 shadow-[0_0_20px_rgba(255,45,149,0.35)]"
                aria-hidden
              />
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-white sm:text-sm">
                  {pickLocalized(r.name, locale)}
                </p>
                <p className="text-[11px] text-ju-muted">
                  {pickLocalized(r.meta, locale)}
                </p>
                <p className="mt-0.5 text-[11px] text-white/40">
                  {pickLocalized(r.when, locale)}
                </p>
                <div className="mt-2 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <Star
                      key={si}
                      className="size-3.5 fill-[#FF2D95] text-[#FF2D95] sm:size-4"
                      aria-hidden
                    />
                  ))}
                </div>
                <p className="mt-2 text-[13px] leading-snug text-white/90 sm:text-sm sm:leading-relaxed">
                  “{pickLocalized(r.quote, locale)}”
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </GlassCard>
  );
}
