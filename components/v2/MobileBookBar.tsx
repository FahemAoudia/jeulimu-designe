"use client";

import { usePathname } from "next/navigation";
import { PrimaryBtn } from "@/components/v3/primitives";
import { useLocaleContext } from "@/providers/AppProviders";
import { v2Nav, t } from "@/lib/site-v2-content";

/** Sticky Book Now on phone — keeps conversion visible without opening the menu. */
export function MobileBookBar() {
  const { locale } = useLocaleContext();
  const pathname = usePathname();

  if (pathname?.startsWith("/booking") || pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[80] border-t border-white/10 bg-[#030308]/95 px-4 py-3 backdrop-blur-lg pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden"
      role="region"
      aria-label={t(v2Nav.bookNow, locale)}
    >
      <PrimaryBtn href="/booking" className="w-full !py-3.5 !text-[11px]">
        {t(v2Nav.bookNow, locale)}
      </PrimaryBtn>
    </div>
  );
}
