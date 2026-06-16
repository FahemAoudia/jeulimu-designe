"use client";

import Link from "next/link";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Navigation,
  Phone,
} from "lucide-react";
import { NeonButton } from "@/components/NeonButton";
import { SiteLogoMark } from "@/components/SiteLogoMark";
import { useLocaleContext, useSiteContext } from "@/providers/AppProviders";
import { v2Footer, v2Nav, t } from "@/lib/site-v2-content";
import { pickLocalized } from "@/types/site-content";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

const QUICK_LINKS = [
  { href: "/", label: { en: "Home", fr: "Accueil" } },
  { href: "/birthdays", label: v2Nav.birthdays },
  { href: "/groups-pricing", label: v2Nav.groupsPricing },
  { href: "/mobile-events", label: v2Nav.mobileEvents },
  { href: "/faq", label: v2Nav.faq },
  { href: "/booking", label: v2Nav.bookNow },
];

const social = [
  { href: "https://instagram.com", label: "Instagram", Icon: Instagram },
  { href: "https://facebook.com", label: "Facebook", Icon: Facebook },
  { href: "https://tiktok.com", label: "TikTok", Icon: TikTokIcon },
];

const MAPS_DIR =
  "https://www.google.com/maps/dir/?api=1&destination=7427+Newman+Blvd,+LaSalle,+QC+H8N+1X3";

export function FooterV2() {
  const { locale } = useLocaleContext();
  const { content } = useSiteContext();
  const c = content.contact;

  return (
    <footer className="ju-footer-zone relative border-t border-white/10 bg-[#02020F]">
      <div className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <SiteLogoMark variant="footer" />
            <p className="mt-4 text-sm leading-relaxed text-ju-muted">
              {pickLocalized(content.footerTagline, locale)}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <NeonButton href="/booking" className="!py-2.5 text-xs">
                {t(v2Nav.bookNow, locale)}
              </NeonButton>
              <NeonButton
                href={MAPS_DIR}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline-white"
                icon={Navigation}
                iconPosition="left"
                className="!py-2.5 text-xs"
              >
                {t(v2Footer.directions, locale)}
              </NeonButton>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-ju-cyanGlow">
              {t(v2Footer.quickLinks, locale)}
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-ju-soft transition hover:text-white"
                  >
                    {t(l.label, locale)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-ju-cyanGlow">
              {t(v2Footer.contact, locale)}
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-ju-soft">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-ju-magenta" />
                {pickLocalized(c.address, locale)}
              </li>
              <li>
                <a
                  href={`tel:+1${c.phone.replace(/\D/g, "")}`}
                  className="inline-flex items-center gap-2 hover:text-white"
                >
                  <Phone className="size-4 text-ju-magenta" />
                  {c.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${c.email}`}
                  className="inline-flex items-center gap-2 hover:text-white"
                >
                  <Mail className="size-4 text-ju-magenta" />
                  {c.email}
                </a>
              </li>
            </ul>
            <div className="mt-4 flex gap-2">
              <NeonButton
                href={`tel:+1${c.phone.replace(/\D/g, "")}`}
                variant="outline-white"
                className="!py-2 text-[10px]"
              >
                {t(v2Footer.call, locale)}
              </NeonButton>
              <NeonButton
                href={`mailto:${c.email}`}
                variant="outline-white"
                className="!py-2 text-[10px]"
              >
                {t(v2Footer.email, locale)}
              </NeonButton>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-ju-cyanGlow">
              {t(v2Footer.hours, locale)}
            </h3>
            <p className="mt-3 text-[11px] font-bold uppercase tracking-wider text-ju-yellow">
              {pickLocalized(c.hoursReservation, locale)}
            </p>
            <ul className="mt-3 space-y-2 text-sm text-ju-soft">
              {c.schedule.map((row, i) => (
                <li key={i} className="flex justify-between gap-2 border-b border-white/10 pb-2">
                  <span>{pickLocalized(row.days, locale)}</span>
                  <span className="shrink-0 text-white">
                    {pickLocalized(row.hours, locale)}
                  </span>
                </li>
              ))}
            </ul>
            <h3 className="mt-6 text-xs font-bold uppercase tracking-[0.25em] text-ju-cyanGlow">
              {t(v2Footer.follow, locale)}
            </h3>
            <div className="mt-3 flex gap-2">
              {social.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-10 items-center justify-center rounded-full border border-[#FF2D95]/45 bg-white/[0.04] text-white transition hover:border-ju-electric hover:text-ju-cyanGlow"
                  aria-label={label}
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-white/10">
          <iframe
            title="jeuLumi location"
            src={c.mapEmbedUrl}
            className="h-56 w-full sm:h-64"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <p className="mt-10 border-t border-white/10 pt-8 text-center text-xs text-ju-muted">
          © {new Date().getFullYear()} jeuLumi.{" "}
          {locale === "fr" ? "Tous droits réservés." : "All rights reserved."}
          <Link
            href="/admin/login"
            className="ml-2 underline-offset-4 hover:text-ju-cyanGlow hover:underline"
          >
            {locale === "fr" ? "Admin" : "Admin"}
          </Link>
        </p>
      </div>
    </footer>
  );
}
