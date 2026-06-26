"use client";

import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import {
  BentoCard,
  DisplayTitle,
  SectionLabel,
} from "@/components/v3/primitives";
import { useLocaleContext, useSiteContext } from "@/providers/AppProviders";
import { ui } from "@/lib/ui-strings";
import { pickLocalized } from "@/types/site-content";

export function ContactPageContent() {
  const { locale } = useLocaleContext();
  const { content } = useSiteContext();
  const t = ui(locale);
  const c = content.contact;
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  return (
    <div className="ju-v3-shell">
      <section className="ju-pt-nav px-4 pb-12 sm:px-6 sm:pb-16 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <SectionLabel>{locale === "fr" ? "Contact" : "Contact"}</SectionLabel>
          <DisplayTitle className="mt-4">{pickLocalized(c.title, locale)}</DisplayTitle>
          <p className="mt-4 max-w-2xl text-sm text-white/55">{pickLocalized(c.sparkle, locale)}</p>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-10">
        <div className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-2">
          <BentoCard accent="cyan" className="!p-6 sm:!p-8">
            <form
              className="flex flex-col gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                setStatus("sent");
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-ju-soft">
                  {t.form.firstName}
                  <input required name="firstName" className="mt-1 w-full rounded-lg border border-white/10 bg-black/50 px-3 py-2.5 text-sm text-white outline-none focus:ring-2 focus:ring-ju-electric/30" />
                </label>
                <label className="block text-xs font-bold uppercase tracking-wider text-ju-soft">
                  {t.form.lastName}
                  <input required name="lastName" className="mt-1 w-full rounded-lg border border-white/10 bg-black/50 px-3 py-2.5 text-sm text-white outline-none focus:ring-2 focus:ring-ju-electric/30" />
                </label>
              </div>
              <label className="block text-xs font-bold uppercase tracking-wider text-ju-soft">
                {t.form.email}
                <input required type="email" name="email" className="mt-1 w-full rounded-lg border border-white/10 bg-black/50 px-3 py-2.5 text-sm text-white outline-none focus:ring-2 focus:ring-ju-electric/30" />
              </label>
              <label className="block text-xs font-bold uppercase tracking-wider text-ju-soft">
                {t.form.phone}
                <input type="tel" name="phone" className="mt-1 w-full rounded-lg border border-white/10 bg-black/50 px-3 py-2.5 text-sm text-white outline-none focus:ring-2 focus:ring-ju-electric/30" />
              </label>
              <label className="block text-xs font-bold uppercase tracking-wider text-ju-soft">
                {t.form.message}
                <textarea name="message" rows={4} className="mt-1 w-full resize-y rounded-lg border border-white/10 bg-black/50 px-3 py-2.5 text-sm text-white outline-none focus:ring-2 focus:ring-ju-electric/30" />
              </label>
              <button
                type="submit"
                className="ju-btn-primary inline-flex items-center justify-center px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-white w-full sm:w-auto"
              >
                {t.form.submit}
              </button>
              {status === "sent" ? (
                <p className="text-sm text-emerald-300">
                  {locale === "fr" ? "Merci — nous vous répondrons bientôt." : "Thanks — we'll get back to you shortly."}
                </p>
              ) : null}
            </form>
          </BentoCard>

          <div className="flex flex-col gap-6">
            <BentoCard accent="pink" className="!p-6">
              <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-ju-cyanGlow">
                {locale === "fr" ? "Coordonnées" : "Get in touch"}
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-white/65">
                <li className="flex gap-3">
                  <Phone className="size-4 shrink-0 text-[#FF2D95]" />
                  <a href={`tel:+1${c.phone.replace(/\D/g, "")}`} className="hover:text-white">{c.phone}</a>
                </li>
                <li className="flex gap-3">
                  <Mail className="size-4 shrink-0 text-[#FF2D95]" />
                  <a href={`mailto:${c.email}`} className="hover:text-white">{c.email}</a>
                </li>
                <li className="flex gap-3">
                  <MapPin className="size-4 shrink-0 text-[#FF2D95]" />
                  <span>{pickLocalized(c.address, locale)}</span>
                </li>
              </ul>
            </BentoCard>

            <BentoCard accent="purple" className="!p-6">
              <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-ju-yellow">
                {pickLocalized(c.hoursTitle, locale)}
              </h3>
              <p className="mt-2 text-xs font-bold uppercase text-ju-cyanGlow">
                {pickLocalized(c.hoursReservation, locale)}
              </p>
              <ul className="mt-4 space-y-2 text-sm text-white/55">
                {c.schedule.map((row, i) => (
                  <li key={i} className="flex justify-between gap-4 border-b border-white/10 pb-2">
                    <span>{pickLocalized(row.days, locale)}</span>
                    <span className="text-white/80">{pickLocalized(row.hours, locale)}</span>
                  </li>
                ))}
              </ul>
            </BentoCard>

            <div className="overflow-hidden rounded-lg border border-white/10">
              <iframe
                title="jeuLumi map"
                src={c.mapEmbedUrl}
                className="h-52 w-full sm:h-64"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
