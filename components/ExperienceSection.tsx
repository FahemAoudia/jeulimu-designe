"use client";

import Image from "next/image";
import { useLocaleContext, useSiteContext } from "@/providers/AppProviders";
import { ui } from "@/lib/ui-strings";
import { pickLocalized } from "@/types/site-content";

export function ExperienceSection() {
  const { locale } = useLocaleContext();
  const { content } = useSiteContext();

  if (!(content.sectionVisibility?.experienceAndHow ?? true)) return null;

  return (
    <section
      id="experience"
      className="relative z-10 scroll-mt-28 px-4 pb-10 pt-14 sm:px-6 sm:pb-12 sm:pt-16 lg:px-8 xl:px-12"
    >
      <div className="mx-auto max-w-[1440px]">
        <p className="text-center text-xs font-bold uppercase tracking-[0.35em] text-ju-cyanGlow drop-shadow-[0_0_12px_rgba(0,245,255,0.35)]">
          {pickLocalized(content.intro.sparkle, locale)}
        </p>
        <h2 className="mx-auto mt-3 max-w-4xl text-center text-xl font-extrabold uppercase leading-tight text-white sm:text-2xl md:text-3xl">
          {pickLocalized(content.intro.headline, locale)}
        </h2>
        <div className="mx-auto mt-6 max-w-3xl space-y-4 text-center text-sm leading-relaxed text-ju-soft sm:text-base">
          {content.intro.paragraphs.map((p, i) => (
            <p key={i}>{pickLocalized(p, locale)}</p>
          ))}
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-sm font-semibold text-ju-yellow">
          {ui(locale).bestGroup}
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {content.gallery.map((item, i) => (
            <figure
              key={i}
              className="ju-on-dark group relative overflow-hidden rounded-2xl border border-white/10 bg-black/30 shadow-[0_0_40px_rgba(123,44,255,0.08)]"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={item.image}
                  alt={pickLocalized(item.alt, locale)}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width:640px) 100vw, 33vw"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#02020F]/95 via-[#02020F]/20 to-transparent"
                  aria-hidden
                />
              </div>
              {item.caption ? (
                <figcaption className="absolute inset-x-0 bottom-0 p-3 text-center text-[12px] font-semibold text-white/95 sm:text-sm">
                  {pickLocalized(item.caption, locale)}
                </figcaption>
              ) : null}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
