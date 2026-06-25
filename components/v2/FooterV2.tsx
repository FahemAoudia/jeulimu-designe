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
    <footer className="ju-footer-v3 relative bg-[#020205] px-4 py-12 sm:px-6 sm:py-16 lg:px-10">
      <LumiGridBg className="opacity-30" />
      <div className="relative mx-auto max-w-[1400px]">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SiteLogoMark variant="footer" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/50">
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
              <p className="font-display text-[10px] font-bold uppercase tracking-[0.3em] text-ju-cyanGlow">
                {t(footer.quickLinks, locale)}
              </p>
              <ul className="mt-4 space-y-2 text-sm text-white/55">
                {QUICK.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="hover:text-white">{t(l.label, locale)}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-display text-[10px] font-bold uppercase tracking-[0.3em] text-ju-cyanGlow">
                {t(footer.contact, locale)}
              </p>
              <ul className="mt-4 space-y-3 text-sm text-white/55">
                <li className="flex gap-2">
                  <MapPin className="size-4 shrink-0 text-[#FF2D95]" />
                  {pickLocalized(c.address, locale)}
                </li>
                <li>
                  <a href={`tel:+1${c.phone.replace(/\D/g, "")}`} className="flex items-center gap-2 hover:text-white">
                    <Phone className="size-4 text-[#FF2D95]" /> {c.phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${c.email}`} className="flex items-center gap-2 hover:text-white">
                    <Mail className="size-4 text-[#FF2D95]" /> {c.email}
                  </a>
                </li>
                <li>
                  <Link
                    href="/admin/login"
                    className="text-xs text-white/35 hover:text-white/70 transition"
                  >
                    {locale === "fr" ? "Administration" : "Admin login"}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-display text-[10px] font-bold uppercase tracking-[0.3em] text-ju-cyanGlow">
                {t(footer.hours, locale)}
              </p>
              <p className="mt-4 text-[10px] font-bold uppercase tracking-wider text-ju-yellow">
                {pickLocalized(c.hoursReservation, locale)}
              </p>
              <ul className="mt-3 space-y-2 text-xs text-white/55">
                {c.schedule.map((row, i) => (
                  <li key={i} className="flex justify-between gap-2 border-b border-white/5 pb-2">
                    <span>{pickLocalized(row.days, locale)}</span>
                    <span className="text-white/80">{pickLocalized(row.hours, locale)}</span>
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

        <p className="mt-10 text-center text-[10px] uppercase tracking-[0.2em] text-white/35">
          © {new Date().getFullYear()} jeuLumi · LaSalle, QC
        </p>
      </div>
    </footer>
  );
}

function LumiGridBg({ className }: { className?: string }) {
  return <div className={`ju-lumi-grid absolute inset-0 ${className ?? ""}`} aria-hidden />;
}
