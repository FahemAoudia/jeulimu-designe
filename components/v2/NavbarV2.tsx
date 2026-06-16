"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { SiteLogoMark } from "@/components/SiteLogoMark";
import { PrimaryBtn } from "@/components/v3/primitives";
import { useLocaleContext } from "@/providers/AppProviders";
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
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { locale, setLocale } = useLocaleContext();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function toggleLang() {
    setLocale(locale === "fr" ? "en" : "fr");
    setOpen(false);
  }

  return (
    <header
      className="ju-nav-v3 fixed left-0 right-0 top-0 z-50"
      data-scrolled={scrolled ? "true" : "false"}
    >
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-10">
        <Link href="/" className="shrink-0" onClick={() => setOpen(false)}>
          <SiteLogoMark variant="nav" />
        </Link>

        <div className="hidden items-center gap-1 rounded-sm border border-white/10 bg-black/40 px-1 py-1 backdrop-blur-md lg:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] transition",
                pathname === l.href
                  ? "bg-white/10 text-ju-cyanGlow"
                  : "text-white/65 hover:text-white",
              )}
            >
              {t(l.label, locale)}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={toggleLang}
            className="hidden h-10 min-w-[3rem] border border-white/15 bg-black/30 text-[10px] font-bold uppercase tracking-widest text-white/80 transition hover:border-cyan-400/40 hover:text-white sm:block"
          >
            {locale === "fr" ? "FR" : "EN"}
          </button>
          <PrimaryBtn href="/booking" className="!py-2.5 !px-5 !text-[10px] hidden sm:inline-flex">
            {t(v2Nav.bookNow, locale)}
          </PrimaryBtn>
          <button
            type="button"
            className="flex border border-white/20 bg-black/40 p-2.5 text-white lg:hidden"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-white/10 bg-[#030308]/98 px-4 py-5 backdrop-blur-xl lg:hidden">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="block border-b border-white/5 py-3 text-sm font-bold uppercase tracking-[0.15em] text-white/90"
                  onClick={() => setOpen(false)}
                >
                  {t(l.label, locale)}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={toggleLang}
              className="flex-1 border border-white/15 py-3 text-xs font-bold uppercase"
            >
              {locale === "fr" ? "FR" : "EN"}
            </button>
            <PrimaryBtn href="/booking" className="flex-1 !py-3 !text-[10px]">
              {t(v2Nav.bookNow, locale)}
            </PrimaryBtn>
          </div>
        </div>
      ) : null}
    </header>
  );
}
