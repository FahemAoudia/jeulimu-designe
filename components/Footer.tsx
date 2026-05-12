"use client";

import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { SiteLogoMark } from "@/components/SiteLogoMark";
import { useLocaleContext, useSiteContext } from "@/providers/AppProviders";
import { ui } from "@/lib/ui-strings";
import { pickLocalized } from "@/types/site-content";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

const social = [
  { href: "https://instagram.com", label: "Instagram", Icon: Instagram },
  { href: "https://facebook.com", label: "Facebook", Icon: Facebook },
  { href: "https://tiktok.com", label: "TikTok", Icon: TikTokIcon },
];

export function Footer() {
  const { locale } = useLocaleContext();
  const { content } = useSiteContext();
  const t = ui(locale);
  const c = content.contact;

  return (
    <footer className="ju-footer-zone relative overflow-hidden border-t border-white/10 bg-[#02020F] px-4 py-14 sm:px-6 lg:px-8 xl:px-12">
      <div
        className="pointer-events-none absolute -left-24 top-0 h-64 w-64 rounded-full bg-ju-electric/10 blur-[100px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-[#FF2D95]/10 blur-[100px]"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-[1440px] gap-12 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Link href="#home" className="inline-flex flex-col gap-1">
            <SiteLogoMark variant="footer" />
          </Link>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-ju-muted">
            {pickLocalized(content.footerTagline, locale)}
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm text-ju-soft">
            <a
              href={`tel:+1${c.phone.replace(/\D/g, "")}`}
              className="inline-flex items-center gap-2 hover:text-white"
            >
              <Phone className="size-4 text-ju-magenta" /> {c.phone}
            </a>
            <a
              href={`mailto:${c.email}`}
              className="inline-flex items-center gap-2 hover:text-white"
            >
              <Mail className="size-4 text-ju-magenta" /> {c.email}
            </a>
            <span className="inline-flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-ju-magenta" />
              {pickLocalized(c.address, locale)}
            </span>
          </div>
        </div>

        <div className="lg:col-span-4">
          <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-ju-cyanGlow">
            {pickLocalized(c.hoursTitle, locale)}
          </h3>
          <p className="mt-3 inline-flex flex-wrap items-center gap-2 rounded-full border border-ju-yellow/35 bg-ju-yellow/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-ju-yellow">
            {ui(locale).reservationRibbon} ·{" "}
            {pickLocalized(c.hoursReservation, locale)}
          </p>
          <ul className="mt-4 space-y-2 text-sm text-ju-soft">
            {c.schedule.map((row, i) => (
              <li key={i} className="flex justify-between gap-4 border-b border-white/10 pb-2">
                <span>{pickLocalized(row.days, locale)}</span>
                <span className="shrink-0 text-white">
                  {pickLocalized(row.hours, locale)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-ju-cyanGlow">
            {locale === "fr" ? "Réseaux" : "Follow us"}
          </h3>
          <div className="mt-4 flex gap-3">
            {social.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-11 items-center justify-center rounded-full border border-[#FF2D95]/45 bg-white/[0.04] text-white shadow-[0_0_20px_rgba(255,45,149,0.2)] transition hover:border-ju-electric hover:text-ju-cyanGlow hover:shadow-[0_0_20px_rgba(0,245,255,0.25)]"
                aria-label={label}
              >
                <Icon className="size-5" />
              </a>
            ))}
          </div>
          <Link
            href="/admin/login"
            className="mt-8 inline-flex text-xs font-semibold uppercase tracking-wider text-ju-muted underline-offset-4 hover:text-ju-cyanGlow hover:underline"
          >
            {t.adminEntry}
          </Link>
        </div>
      </div>

      <p className="relative mx-auto mt-14 max-w-[1440px] border-t border-white/10 pt-8 text-center text-xs text-ju-muted">
        © {new Date().getFullYear()} jeuLumi.{" "}
        {locale === "fr"
          ? "Tous droits réservés."
          : "All rights reserved."}
      </p>
    </footer>
  );
}
