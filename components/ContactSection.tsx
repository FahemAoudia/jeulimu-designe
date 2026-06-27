"use client";

import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { NeonButton } from "@/components/NeonButton";
import { useLocaleContext, useSiteContext } from "@/providers/AppProviders";
import { ui } from "@/lib/ui-strings";
import { pickLocalized } from "@/types/site-content";
import { postContactForm } from "@/lib/contact-form";

export function ContactSection() {
  const { locale } = useLocaleContext();
  const { content } = useSiteContext();
  const t = ui(locale);
  const c = content.contact;
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setStatus("sending");
    try {
      await postContactForm({
        firstName: String(fd.get("firstName") ?? ""),
        lastName: String(fd.get("lastName") ?? ""),
        email: String(fd.get("email") ?? ""),
        phone: String(fd.get("phone") ?? ""),
        date: String(fd.get("date") ?? ""),
        totalPlayers: String(fd.get("players") ?? ""),
        kidsUnder12: String(fd.get("kids") ?? ""),
        message: String(fd.get("message") ?? ""),
        locale,
      });
      setStatus("sent");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  if (content.sectionVisibility?.contact === false) return null;

  return (
    <section
      id="contact"
      className="relative z-10 scroll-mt-28 px-4 pb-16 sm:px-6 lg:px-8 xl:px-12"
    >
      <div className="mx-auto max-w-[1440px]">
        <GlassCard glow="cyan" className="p-5 sm:p-8 lg:p-10">
          <p className="text-center text-xs font-bold uppercase tracking-[0.35em] text-ju-pinkGlow">
            {pickLocalized(c.sparkle, locale)}
          </p>
          <h2 className="mt-2 text-center text-2xl font-bold uppercase tracking-wide text-white sm:text-3xl">
            {pickLocalized(c.title, locale)}
          </h2>

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <form className="ju-contact-form ju-on-dark flex flex-col gap-4" onSubmit={onSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-1.5 text-xs font-semibold uppercase tracking-wide text-ju-soft">
                  {t.form.firstName}{" "}
                  <span className="text-ju-magenta">({t.form.required})</span>
                  <input
                    required
                    name="firstName"
                    autoComplete="given-name"
                    className="rounded-xl border border-white/15 bg-black/40 px-3 py-2.5 text-sm font-normal normal-case text-white outline-none ring-ju-electric/30 placeholder:text-ju-muted focus:ring-2"
                    placeholder="Ada"
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-xs font-semibold uppercase tracking-wide text-ju-soft">
                  {t.form.lastName}{" "}
                  <span className="text-ju-magenta">({t.form.required})</span>
                  <input
                    required
                    name="lastName"
                    autoComplete="family-name"
                    className="rounded-xl border border-white/15 bg-black/40 px-3 py-2.5 text-sm font-normal normal-case text-white outline-none ring-ju-electric/30 placeholder:text-ju-muted focus:ring-2"
                    placeholder="Lovelace"
                  />
                </label>
              </div>
              <label className="flex flex-col gap-1.5 text-xs font-semibold uppercase tracking-wide text-ju-soft">
                {t.form.email}{" "}
                <span className="text-ju-magenta">({t.form.required})</span>
                <input
                  required
                  type="email"
                  name="email"
                  autoComplete="email"
                  className="rounded-xl border border-white/15 bg-black/40 px-3 py-2.5 text-sm font-normal normal-case text-white outline-none ring-ju-electric/30 placeholder:text-ju-muted focus:ring-2"
                  placeholder="hello@example.com"
                />
              </label>
              <label className="flex flex-col gap-1.5 text-xs font-semibold uppercase tracking-wide text-ju-soft">
                {t.form.phone}
                <input
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  className="rounded-xl border border-white/15 bg-black/40 px-3 py-2.5 text-sm font-normal normal-case text-white outline-none ring-ju-electric/30 placeholder:text-ju-muted focus:ring-2"
                  placeholder="514 000 0000"
                />
              </label>
              <label className="flex flex-col gap-1.5 text-xs font-semibold uppercase tracking-wide text-ju-soft">
                {t.form.date}{" "}
                <span className="text-ju-magenta">({t.form.required})</span>
                <input
                  required
                  type="text"
                  name="date"
                  className="rounded-xl border border-white/15 bg-black/40 px-3 py-2.5 text-sm font-normal normal-case text-white outline-none ring-ju-electric/30 placeholder:text-ju-muted focus:ring-2"
                  placeholder={t.form.datePlaceholder}
                />
              </label>
              <label className="flex flex-col gap-1.5 text-xs font-semibold uppercase tracking-wide text-ju-soft">
                {t.form.players}{" "}
                <span className="text-ju-magenta">({t.form.required})</span>
                <input
                  required
                  inputMode="numeric"
                  name="players"
                  className="rounded-xl border border-white/15 bg-black/40 px-3 py-2.5 text-sm font-normal normal-case text-white outline-none ring-ju-electric/30 placeholder:text-ju-muted focus:ring-2"
                  placeholder="8"
                />
              </label>
              <label className="flex flex-col gap-1.5 text-xs font-semibold uppercase tracking-wide text-ju-soft">
                {t.form.kids}{" "}
                <span className="text-ju-magenta">({t.form.required})</span>
                <input
                  required
                  inputMode="numeric"
                  name="kids"
                  className="rounded-xl border border-white/15 bg-black/40 px-3 py-2.5 text-sm font-normal normal-case text-white outline-none ring-ju-electric/30 placeholder:text-ju-muted focus:ring-2"
                  placeholder="0"
                />
              </label>
              <label className="flex flex-col gap-1.5 text-xs font-semibold uppercase tracking-wide text-ju-soft">
                {t.form.message}
                <textarea
                  name="message"
                  rows={4}
                  className="resize-y rounded-xl border border-white/15 bg-black/40 px-3 py-2.5 text-sm font-normal normal-case text-white outline-none ring-ju-electric/30 placeholder:text-ju-muted focus:ring-2"
                />
              </label>
              <NeonButton type="submit" variant="gradient" className="!rounded-xl" disabled={status === "sending"}>
                {status === "sending"
                  ? locale === "fr"
                    ? "Envoi…"
                    : "Sending…"
                  : t.form.submit}
              </NeonButton>
              {status === "sent" ? (
                <p className="text-center text-sm text-ju-green">
                  {locale === "fr"
                    ? "Merci — nous vous répondrons bientôt."
                    : "Thanks — we’ll get back to you shortly."}
                </p>
              ) : null}
              {status === "error" ? (
                <p className="text-center text-sm text-red-300">
                  {locale === "fr"
                    ? "Impossible d’envoyer le message. Réessayez ou appelez-nous."
                    : "Could not send your message. Please try again or call us."}
                </p>
              ) : null}
            </form>

            <div className="flex flex-col gap-6">
              <div className="ju-on-dark rounded-2xl border border-white/10 bg-black/35 p-5 backdrop-blur-md">
                <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-ju-cyanGlow">
                  {pickLocalized(
                    {
                      en: "Contact us",
                      fr: "Contactez-nous",
                    },
                    locale,
                  )}
                </h3>
                <ul className="mt-4 space-y-3 text-sm text-ju-soft">
                  <li className="flex gap-3">
                    <Phone className="mt-0.5 size-4 shrink-0 text-ju-magenta" />
                    <a href={`tel:+1${c.phone.replace(/\D/g, "")}`} className="hover:text-white">
                      ☎ {c.phone}
                    </a>
                  </li>
                  <li className="flex gap-3">
                    <Mail className="mt-0.5 size-4 shrink-0 text-ju-magenta" />
                    <a href={`mailto:${c.email}`} className="hover:text-white">
                      ✉ {c.email}
                    </a>
                  </li>
                  <li className="flex gap-3">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-ju-magenta" />
                    <span className="text-white/90">
                      ◎ {pickLocalized(c.address, locale)}
                    </span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-ju-yellow/35 bg-ju-yellow/10 p-5">
                <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-ju-yellow">
                  {pickLocalized(c.hoursTitle, locale)}
                </h3>
                <p className="mt-2 inline-flex items-center rounded-full bg-black/40 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-ju-cyanGlow">
                  {ui(locale).reservationRibbon} —{" "}
                  {pickLocalized(c.hoursReservation, locale)}
                </p>
                <p className="mt-3 text-sm text-ju-soft">
                  {pickLocalized(c.hoursExplainer, locale)}
                </p>
                <ul className="mt-4 space-y-2 text-sm">
                  {c.schedule.map((row, i) => (
                    <li
                      key={i}
                      className="flex justify-between gap-4 border-b border-white/10 pb-2 last:border-0"
                    >
                      <span className="text-ju-muted">
                        {pickLocalized(row.days, locale)}
                      </span>
                      <span className="shrink-0 text-white">
                        {pickLocalized(row.hours, locale)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-ju-cyanGlow">
                  {pickLocalized(c.mapLabel, locale)}
                </p>
                <div className="mt-3 overflow-hidden rounded-xl border border-white/15 shadow-[0_0_40px_rgba(0,174,239,0.15)]">
                  <iframe
                    title="JeuLumi location"
                    src={c.mapEmbedUrl}
                    className="h-[220px] w-full bg-black sm:h-[280px]"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=7427+Newman+Blvd,+LaSalle,+QC+H8N+1X3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-sm font-semibold text-ju-electric hover:text-ju-cyanGlow"
                >
                  {t.mapOpen} →
                </a>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
