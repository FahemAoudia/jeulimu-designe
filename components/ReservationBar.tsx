"use client";

import { useState } from "react";
import { Calendar, Sparkles, X } from "lucide-react";
import { useLocaleContext, useSiteContext } from "@/providers/AppProviders";
import { pickLocalized } from "@/types/site-content";

export function ReservationBar() {
  const { locale } = useLocaleContext();
  const { content } = useSiteContext();
  const [dismissed, setDismissed] = useState(false);

  if (content.sectionVisibility?.reservationBar === false) return null;
  if (dismissed) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-[3.25rem] z-40 px-3 sm:top-[4.25rem] sm:px-6 lg:px-8">
      <div className="pointer-events-auto mx-auto flex max-w-[1440px] justify-center">
        <div
          className="ju-reservation-inner flex w-full max-w-4xl items-center gap-2 rounded-full border border-white/15 bg-[#0D0221]/90 px-2 py-2 pl-3 shadow-[0_0_40px_rgba(255,106,0,0.12)] backdrop-blur-xl sm:gap-3 sm:px-4 sm:py-2.5 sm:pl-5"
          role="status"
        >
          <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-ju-yellow text-[11px] font-black text-black shadow-[0_0_16px_rgba(255,106,0,0.55)] sm:size-8 sm:text-xs">
            <Sparkles className="size-3.5 sm:size-4" aria-hidden />
          </span>
          <p className="min-w-0 flex-1 text-center text-[11px] font-semibold leading-snug text-white sm:text-xs sm:font-bold">
            <span className="text-ju-cyanGlow drop-shadow-[0_0_12px_rgba(0,245,255,0.35)]">
              {pickLocalized(content.reservationBanner, locale)}
            </span>
          </p>
          <Calendar
            className="hidden size-4 shrink-0 text-ju-magenta sm:block"
            aria-hidden
          />
          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="ju-reservation-dismiss flex size-7 shrink-0 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white/70 transition duration-200 hover:border-white/30 hover:bg-black/50 hover:text-white"
            aria-label={locale === "fr" ? "Masquer le bandeau" : "Dismiss banner"}
          >
            <X className="size-3.5 stroke-[2.5]" aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}
