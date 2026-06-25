"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { SiteLogoMark } from "@/components/SiteLogoMark";
import { PrimaryBtn } from "@/components/v3/primitives";
import { useLocaleContext } from "@/providers/AppProviders";
import { t } from "@/lib/site-v2-content";
import { useV2Content } from "@/hooks/useV2Content";
import { cn } from "@/lib/cn";

export function NavbarV2() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { locale, setLocale } = useLocaleContext();
  const { v2 } = useV2Content();
  const nav = v2.nav;

  const NAV_LINKS = [
    { href: "/birthdays", label: nav.birthdays },
    { href: "/groups-pricing", label: nav.groupsPricing },
    { href: "/mobile-events", label: nav.mobileEvents },
    { href: "/faq", label: nav.faq },
  ];

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function toggleLang() {
    setLocale(locale === "fr" ? "en" : "fr");
    setOpen(false);
  }

  return (
    <header
      className="ju-nav-v3 fixed left-0 right-0 top-0 z-50"
      data-scrolled={scrolled ? "true" : "false"}
    >
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between gap-2 px-3 py-3 sm:px-6 sm:py-4 lg:px-10">
        <Link href="/" className="min-w-0 shrink" onClick={() => setOpen(false)}>
          <SiteLogoMark variant="nav" />
        </Link>

        <div className="hidden items-center gap-1 rounded-sm border border-white/10 bg-black/40 px-1 py-1 backdrop-blur-md lg:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "ju-nav-link px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em]",
                pathname === l.href && "ju-nav-link-active",
              )}
            >
              {t(l.label, locale)}
            </Link>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
          <button
            type="button"
            onClick={toggleLang}
            className="ju-nav-icon-btn flex h-9 min-w-[2.75rem] items-center justify-center text-[10px] font-bold uppercase tracking-widest sm:h-10 sm:min-w-[3rem] lg:hidden"
          >
            {locale === "fr" ? "FR" : "EN"}
          </button>
          <PrimaryBtn
            href="/booking"
            className="hidden sm:inline-flex !py-2.5 !px-5 !text-[10px]"
          >
            {t(nav.bookNow, locale)}
          </PrimaryBtn>
          <button
            type="button"
            className="ju-nav-icon-btn flex p-2.5 lg:hidden"
            style={{ color: "var(--ju-nav-text, #ffffff)" }}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="ju-nav-mobile-panel px-4 py-5 backdrop-blur-xl lg:hidden">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="ju-nav-mobile-link block py-3 text-sm font-bold uppercase tracking-[0.15em]"
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
              {t(nav.bookNow, locale)}
            </PrimaryBtn>
          </div>
        </div>
      ) : null}
    </header>
  );
}
