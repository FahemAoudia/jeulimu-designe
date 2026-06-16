"use client";

import { useState } from "react";
import {
  BentoCard,
  DisplayTitle,
  SectionLabel,
} from "@/components/v3/primitives";
import { useLocaleContext } from "@/providers/AppProviders";
import { v2Mobile, t } from "@/lib/site-v2-content";

export function MobileEventsPageContent() {
  const { locale } = useLocaleContext();
  const m = v2Mobile;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [org, setOrg] = useState("");
  const [done, setDone] = useState(false);

  return (
    <div className="ju-v3-shell">
      <section className="px-4 pt-24 pb-12 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <span className="inline-block border border-ju-yellow/40 bg-ju-yellow/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-ju-yellow">
            {t(m.hero.badge, locale)}
          </span>
          <DisplayTitle className="mt-6">{t(m.hero.title, locale)}</DisplayTitle>
          <p className="mt-4 max-w-2xl text-lg text-white/55">{t(m.hero.sub, locale)}</p>
          <p className="mt-4 max-w-3xl text-sm text-white/40">{t(m.overview, locale)}</p>
        </div>
      </section>

      <section className="border-y border-white/10 px-4 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1400px] flex flex-wrap gap-3">
          {m.whoFor.map((item, i) => (
            <span key={i} className="ju-stat-pill border border-white/15 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white/70">
              {t(item, locale)}
            </span>
          ))}
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1400px] grid gap-6 md:grid-cols-3">
          {m.how.map((step) => (
            <BentoCard key={step.step} accent="purple" className="!p-8">
              <span className="font-display text-4xl font-bold text-white/20">{step.step}</span>
              <p className="mt-4 font-display font-bold uppercase text-white">{t(step.title, locale)}</p>
              <p className="mt-2 text-sm text-white/45">{t(step.sub, locale)}</p>
            </BentoCard>
          ))}
        </div>
      </section>

      <section id="waitlist" className="px-4 pb-24 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-md">
          <SectionLabel>{t(m.waitlist.title, locale)}</SectionLabel>
          <p className="mt-2 text-sm text-white/45">{t(m.waitlist.sub, locale)}</p>
          {done ? (
            <BentoCard accent="cyan" className="mt-8 !p-6 text-center text-white">{t(m.waitlist.success, locale)}</BentoCard>
          ) : (
            <form
              className="mt-8 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                if (email.trim()) setDone(true);
              }}
            >
              <input className="w-full border border-white/15 bg-black/50 px-4 py-3 text-white placeholder:text-white/30 focus:border-cyan-400/50 focus:outline-none" placeholder={t(m.waitlist.name, locale)} value={name} onChange={(e) => setName(e.target.value)} />
              <input required type="email" className="w-full border border-white/15 bg-black/50 px-4 py-3 text-white placeholder:text-white/30 focus:border-cyan-400/50 focus:outline-none" placeholder={t(m.waitlist.email, locale)} value={email} onChange={(e) => setEmail(e.target.value)} />
              <input className="w-full border border-white/15 bg-black/50 px-4 py-3 text-white placeholder:text-white/30 focus:border-cyan-400/50 focus:outline-none" placeholder={t(m.waitlist.org, locale)} value={org} onChange={(e) => setOrg(e.target.value)} />
              <button type="submit" className="ju-btn-primary w-full py-3.5 text-[10px] font-bold uppercase tracking-[0.22em] text-white">
                {t(m.waitlist.submit, locale)}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
