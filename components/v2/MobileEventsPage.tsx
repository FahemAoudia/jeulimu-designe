"use client";

import { useState } from "react";
import { NeonButton } from "@/components/NeonButton";
import { Section, SectionHeading } from "@/components/v2/Section";
import { useLocaleContext } from "@/providers/AppProviders";
import { v2Mobile, t } from "@/lib/site-v2-content";

export function MobileEventsPageContent() {
  const { locale } = useLocaleContext();
  const m = v2Mobile;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [org, setOrg] = useState("");
  const [done, setDone] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setDone(true);
  }

  return (
    <>
      <Section className="!pt-8">
        <span className="rounded-full border border-ju-yellow/40 bg-ju-yellow/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-ju-yellow">
          {t(m.hero.badge, locale)}
        </span>
        <h1 className="mt-6 text-4xl font-black uppercase text-white sm:text-5xl lg:text-6xl">
          {t(m.hero.title, locale)}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-ju-soft">{t(m.hero.sub, locale)}</p>
        <p className="mt-4 max-w-2xl text-base text-ju-muted">{t(m.overview, locale)}</p>
      </Section>

      <Section dark>
        <SectionHeading
          title={locale === "fr" ? "Pour qui ?" : "Who It's For"}
          align="left"
          className="!mb-8"
        />
        <div className="flex flex-wrap gap-3">
          {m.whoFor.map((item, i) => (
            <span
              key={i}
              className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-bold uppercase tracking-wide text-white"
            >
              {t(item, locale)}
            </span>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          title={locale === "fr" ? "Comment ça marche" : "How It Works"}
          align="left"
          className="!mb-8"
        />
        <div className="grid gap-6 md:grid-cols-3">
          {m.how.map((step) => (
            <div
              key={step.step}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"
            >
              <span className="text-3xl font-black text-ju-cyanGlow">{step.step}</span>
              <h3 className="mt-3 text-lg font-bold uppercase text-white">
                {t(step.title, locale)}
              </h3>
              <p className="mt-2 text-sm text-ju-soft">{t(step.sub, locale)}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section dark id="waitlist">
        <div className="mx-auto max-w-lg">
          <SectionHeading
            title={t(m.waitlist.title, locale)}
            subtitle={t(m.waitlist.sub, locale)}
            className="!mb-8"
          />
          {done ? (
            <p className="rounded-2xl border border-ju-electric/30 bg-ju-electric/10 p-6 text-center text-white">
              {t(m.waitlist.success, locale)}
            </p>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <input
                type="text"
                placeholder={t(m.waitlist.name, locale)}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-white placeholder:text-ju-muted focus:border-ju-electric/50 focus:outline-none"
              />
              <input
                type="email"
                required
                placeholder={t(m.waitlist.email, locale)}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-white placeholder:text-ju-muted focus:border-ju-electric/50 focus:outline-none"
              />
              <input
                type="text"
                placeholder={t(m.waitlist.org, locale)}
                value={org}
                onChange={(e) => setOrg(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-white placeholder:text-ju-muted focus:border-ju-electric/50 focus:outline-none"
              />
              <NeonButton type="submit" className="w-full">
                {t(m.waitlist.submit, locale)}
              </NeonButton>
            </form>
          )}
        </div>
      </Section>
    </>
  );
}
