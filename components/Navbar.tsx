"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, ChevronDown, Menu, X } from "lucide-react";
import { NeonButton } from "@/components/NeonButton";
import { SiteLogoMark } from "@/components/SiteLogoMark";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useLocaleContext, useSiteContext, type Locale } from "@/providers/AppProviders";
import { ui } from "@/lib/ui-strings";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const pathname = usePathname();
  const { locale, setLocale } = useLocaleContext();
  const { content } = useSiteContext();
  const t = ui(locale);
  const langRef = useRef<HTMLDivElement>(null);

  const links = useMemo(() => {
    const vis = content.sectionVisibility;
    const out: { href: string; label: string }[] = [
      { href: "#home", label: t.nav.home },
    ];
    if (vis?.experienceAndHow !== false) {
      out.push({ href: "#experience", label: t.nav.experience });
    }
    if (vis?.gameModes !== false) {
      out.push({ href: "#game-modes", label: t.nav.gameModes });
    }
    if (vis?.pricing !== false) {
      out.push({ href: "#pricing", label: t.nav.pricing });
    }
    if (vis?.events !== false) {
      out.push({ href: "#events", label: t.nav.events });
    }
    if (vis?.contact !== false) {
      out.push({ href: "#contact", label: t.nav.contact });
    }
    return out;
  }, [content.sectionVisibility, t.nav]);

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
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#02020F]/92 via-[#050A30]/35 to-transparent" />
      <nav className="ju-public-nav relative mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8 xl:px-12">
        <Link
          href={pathname === "/" ? "#home" : "/#home"}
          className="group flex shrink-0 flex-col gap-0.5"
          onClick={() => setOpen(false)}
        >
          <SiteLogoMark variant="nav" />
        </Link>

        <ul className="hidden items-center gap-5 text-[12px] font-semibold uppercase tracking-wide text-white/80 xl:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={pathname === "/" ? l.href : `/${l.href}`}
                className="relative pb-1 transition hover:text-white"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle variant="nav" />
          <div className="relative" ref={langRef}>
            <button
              type="button"
              className="hidden items-center gap-1 rounded-full border border-white/15 bg-white/[0.06] px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white/90 backdrop-blur-md transition hover:border-ju-electric/55 sm:flex"
              aria-expanded={langOpen}
              aria-haspopup="listbox"
              onClick={() => setLangOpen((v) => !v)}
            >
              {locale === "fr" ? "FR" : "EN"}
              <ChevronDown
                className={`size-3.5 opacity-70 transition ${langOpen ? "rotate-180" : ""}`}
              />
            </button>
            {langOpen ? (
              <ul
                role="listbox"
                className="ju-nav-dropdown absolute right-0 top-[calc(100%+6px)] z-50 min-w-[120px] rounded-xl border border-white/12 bg-[#0D0221]/98 py-1 shadow-glass backdrop-blur-xl"
              >
                <li>
                  <button
                    type="button"
                    role="option"
                    aria-selected={locale === "en"}
                    className="flex w-full px-4 py-2.5 text-left text-xs font-bold uppercase tracking-wide hover:bg-white/10"
                    onClick={() => selectLang("en")}
                  >
                    English
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    role="option"
                    aria-selected={locale === "fr"}
                    className="flex w-full px-4 py-2.5 text-left text-xs font-bold uppercase tracking-wide hover:bg-white/10"
                    onClick={() => selectLang("fr")}
                  >
                    Français
                  </button>
                </li>
              </ul>
            ) : null}
          </div>
          <NeonButton
            variant="outline-white"
            icon={CalendarDays}
            iconPosition="left"
            className="hidden !py-2.5 !pl-4 !pr-5 text-xs sm:flex"
            href="/booking"
          >
            {t.bookNow}
          </NeonButton>

          <button
            type="button"
            className="flex rounded-full border border-white/20 bg-white/[0.06] p-2 text-white backdrop-blur-md xl:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="ju-nav-mobile border-t border-white/10 bg-[#02020F]/98 backdrop-blur-xl xl:hidden">
          <ul className="flex max-h-[75vh] flex-col gap-0.5 overflow-y-auto px-4 py-4">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={pathname === "/" ? l.href : `/${l.href}`}
                  className="block rounded-lg px-3 py-3 text-sm font-semibold uppercase tracking-wide text-white/90 hover:bg-white/[0.06]"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="flex justify-center py-2">
              <ThemeToggle variant="nav" />
            </li>
            <li className="mt-3 flex flex-col gap-2 border-t border-white/10 pt-4">
              <p className="px-1 text-[10px] font-bold uppercase tracking-wider text-ju-muted">
                {locale === "fr" ? "Langue" : "Language"}
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  className={`flex-1 rounded-full border px-3 py-2.5 text-xs font-bold uppercase ${
                    locale === "en"
                      ? "border-ju-electric bg-ju-electric/15 text-white"
                      : "border-white/15 text-white/75"
                  }`}
                  onClick={() => selectLang("en")}
                >
                  English
                </button>
                <button
                  type="button"
                  className={`flex-1 rounded-full border px-3 py-2.5 text-xs font-bold uppercase ${
                    locale === "fr"
                      ? "border-ju-electric bg-ju-electric/15 text-white"
                      : "border-white/15 text-white/75"
                  }`}
                  onClick={() => selectLang("fr")}
                >
                  Français
                </button>
              </div>
              <NeonButton
                variant="outline-white"
                icon={CalendarDays}
                iconPosition="left"
                className="w-full !py-2.5 text-xs"
                href="/booking"
              >
                {t.bookNow}
              </NeonButton>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
