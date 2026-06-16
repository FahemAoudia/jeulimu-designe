"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { NeonButton } from "@/components/NeonButton";
import { SiteLogoMark } from "@/components/SiteLogoMark";
import { useLocaleContext, type Locale } from "@/providers/AppProviders";
import { v2Nav, t } from "@/lib/site-v2-content";
import { cn } from "@/lib/cn";

const NAV_LINKS = [
  { href: "/birthdays", label: v2Nav.birthdays },
  { href: "/groups-pricing", label: v2Nav.groupsPricing },
  { href: "/mobile-events", label: v2Nav.mobileEvents },
  { href: "/faq", label: v2Nav.faq },
];

export function NavbarV2() {
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const pathname = usePathname();
  const { locale, setLocale } = useLocaleContext();
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!langRef.current?.contains(e.target as Node)) setLangOpen(false);
    }
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  function selectLang(next: Locale) {
    setLocale(next);
    setLangOpen(false);
    setOpen(false);
  }

  return (
    <header className="ju-nav-shell fixed left-0 right-0 top-0 z-50">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#02020F]/95 via-[#050A30]/40 to-transparent" />
      <nav className="ju-public-nav relative mx-auto flex max-w-[1440px] items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8 xl:px-12">
        <Link href="/" className="shrink-0" onClick={() => setOpen(false)}>
          <SiteLogoMark variant="nav" />
        </Link>

        <ul className="hidden items-center gap-6 text-[11px] font-bold uppercase tracking-[0.12em] text-white/80 lg:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={cn(
                  "transition hover:text-white",
                  pathname === l.href && "text-ju-cyanGlow",
                )}
              >
                {t(l.label, locale)}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative" ref={langRef}>
            <button
              type="button"
              className="flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.06] px-3 py-2 text-xs font-bold uppercase tracking-wide text-white/90 backdrop-blur-md transition hover:border-ju-electric/55"
              aria-expanded={langOpen}
              onClick={() => setLangOpen((v) => !v)}
            >
              {locale === "fr" ? "FR" : "EN"}
              <ChevronDown
                className={cn("size-3.5 opacity-70 transition", langOpen && "rotate-180")}
              />
            </button>
            {langOpen ? (
              <ul className="ju-nav-dropdown absolute right-0 top-[calc(100%+6px)] z-50 min-w-[120px] rounded-xl border border-white/12 bg-[#0D0221]/98 py-1 shadow-glass backdrop-blur-xl">
                <li>
                  <button
                    type="button"
                    className="flex w-full px-4 py-2.5 text-left text-xs font-bold uppercase hover:bg-white/10"
                    onClick={() => selectLang("en")}
                  >
                    English
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="flex w-full px-4 py-2.5 text-left text-xs font-bold uppercase hover:bg-white/10"
                    onClick={() => selectLang("fr")}
                  >
                    Français
                  </button>
                </li>
              </ul>
            ) : null}
          </div>

          <NeonButton
            href="/booking"
            className="!py-2.5 !px-5 text-[11px] font-bold shadow-[0_0_28px_rgba(255,45,149,0.45)]"
          >
            {t(v2Nav.bookNow, locale)}
          </NeonButton>

          <button
            type="button"
            className="flex rounded-full border border-white/20 bg-white/[0.06] p-2 text-white backdrop-blur-md lg:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="ju-nav-mobile border-t border-white/10 bg-[#02020F]/98 backdrop-blur-xl lg:hidden">
          <ul className="flex flex-col gap-1 px-4 py-4">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="block rounded-xl px-3 py-3 text-sm font-bold uppercase tracking-wide text-white/90 hover:bg-white/[0.06]"
                  onClick={() => setOpen(false)}
                >
                  {t(l.label, locale)}
                </Link>
              </li>
            ))}
            <li className="mt-3 border-t border-white/10 pt-4">
              <NeonButton href="/booking" className="w-full !py-3 text-xs">
                {t(v2Nav.bookNow, locale)}
              </NeonButton>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
