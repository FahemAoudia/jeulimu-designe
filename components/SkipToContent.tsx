"use client";

import { useLocaleContext } from "@/providers/AppProviders";
import { ui } from "@/lib/ui-strings";

export function SkipToContent() {
  const { locale } = useLocaleContext();
  return (
    <a
      href="#main"
      className="fixed left-4 top-2 z-[100] -translate-y-24 rounded-full bg-gradient-to-r from-[#FF2D95] to-[#7B2CFF] px-4 py-2 text-xs font-bold uppercase tracking-wide text-white opacity-0 shadow-btn-brand transition focus:translate-y-0 focus:opacity-100"
    >
      {ui(locale).skip}
    </a>
  );
}
