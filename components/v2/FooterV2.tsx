"use client";

import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { SiteLogoMark } from "@/components/SiteLogoMark";
import { PrimaryBtn, GhostBtn } from "@/components/v3/primitives";
import { useLocaleContext, useSiteContext } from "@/providers/AppProviders";
import { t } from "@/lib/site-v2-content";
import { pickLocalized } from "@/types/site-content";
import { useV2Content } from "@/hooks/useV2Content";

const MAPS =
  "https://www.google.com/maps/dir/?api=1&destination=7427+Newman+Blvd,+LaSalle,+QC+H8N+1X3";

export function FooterV2() {
  const { locale } = useLocaleContext();
  const { content } = useSiteContext();
  const { v2 } = useV2Content();
  const c = content.contact;
  const footer = v2.footer;
  const nav = v2.nav;

  const QUICK = [
    { href: "/", label: { en: "Home", fr: "Accueil" } },
    { href: "/birthdays", label: nav.birthdays },
    { href: "/groups-pricing", label: nav.groupsPricing },
    { href: "/mobile-events", label: nav.mobileEvents },
    { href: "/faq", label: nav.faq },
  ];

  return (
    <footer className="ju-footer-v3 relative px-4 py-12 sm:px-6 sm:py-16 lg:px-10">
      <LumiGridBg className="opacity-30" />
      <div className="relative mx-auto max-w-[1400px]">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SiteLogoMark variant="footer" />
            <p className="ju-footer-tagline mt-4 max-w-sm text-sm leading-relaxed">
              {pickLocalized(content.footerTagline, locale)}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <PrimaryBtn href="/booking" className="w-full justify-center sm:w-auto !text-[10px]">
                {t(nav.bookNow, locale)}
              </PrimaryBtn>
              <GhostBtn href={MAPS} className="w-full justify-center sm:w-auto !text-[10px]">
                {t(footer.directions, locale)}
              </GhostBtn>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-3">
            <div>
              <p className="ju-footer-heading font-display text-[10px] font-bold uppercase tracking-[0.3em]">
                {t(footer.quickLinks, locale)}
              </p>
              <ul className="ju-footer-muted mt-4 space-y-2 text-sm">
                {QUICK.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="ju-footer-muted hover:text-[var(--ju-footer-text)]">{t(l.label, locale)}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="ju-footer-heading font-display text-[10px] font-bold uppercase tracking-[0.3em]">
                {t(footer.contact, locale)}
              </p>
              <ul className="ju-footer-muted mt-4 space-y-3 text-sm">
                <li className="flex gap-2">
                  <MapPin className="ju-footer-icon size-4 shrink-0" />
                  {pickLocalized(c.address, locale)}
                </li>
                <li>
                  <a href={`tel:+1${c.phone.replace(/\D/g, "")}`} className="ju-footer-muted flex items-center gap-2 hover:text-[var(--ju-footer-text)]">
                    <Phone className="ju-footer-icon size-4" /> {c.phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${c.email}`} className="ju-footer-muted flex items-center gap-2 hover:text-[var(--ju-footer-text)]">
                    <Mail className="ju-footer-icon size-4" /> {c.email}
                  </a>
                </li>
                <li>
                  <Link
                    href="/admin/login"
                    className="ju-footer-copyright text-xs transition hover:text-[var(--ju-footer-text-muted)]"
                  >
                    {locale === "fr" ? "Administration" : "Admin login"}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="ju-footer-heading font-display text-[10px] font-bold uppercase tracking-[0.3em]">
                {t(footer.hours, locale)}
              </p>
              <p className="mt-4 text-[10px] font-bold uppercase tracking-wider text-ju-yellow">
                {pickLocalized(c.hoursReservation, locale)}
              </p>
              <ul className="ju-footer-muted mt-3 space-y-2 text-xs">
                {c.schedule.map((row, i) => (
                  <li key={i} className="flex justify-between gap-2 border-b border-white/5 pb-2">
                    <span>{pickLocalized(row.days, locale)}</span>
                    <span className="ju-footer-hours-strong">{pickLocalized(row.hours, locale)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 overflow-hidden border border-white/10">
          <iframe
            title="jeuLumi map"
            src={c.mapEmbedUrl}
            className="h-52 w-full sm:h-64"
            loading="lazy"
          />
        </div>

        <p className="ju-footer-copyright mt-10 text-center text-[10px] uppercase tracking-[0.2em]">
          © {new Date().getFullYear()} jeuLumi · LaSalle, QC
        </p>
      </div>
    </footer>
  );
}

function LumiGridBg({ className }: { className?: string }) {
  return <div className={`ju-lumi-grid absolute inset-0 ${className ?? ""}`} aria-hidden />;
}
