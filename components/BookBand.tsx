"use client";

import { ArrowRightCircle } from "lucide-react";
import { NeonButton } from "@/components/NeonButton";
import { useLocaleContext, useSiteContext } from "@/providers/AppProviders";
import { ui } from "@/lib/ui-strings";
import {
  Cpu,
  HeartHandshake,
  PartyPopper,
  ShieldCheck,
} from "lucide-react";

const items = [
  {
    icon: Cpu,
    title: { en: "Exclusive LED game floor", fr: "Plancher LED exclusif" },
    body: {
      en: "Dynamic. Immersive. Interactive.",
      fr: "Dynamique. Immersif. Interactif.",
    },
  },
  {
    icon: HeartHandshake,
    title: { en: "For all ages", fr: "Pour tous les âges" },
    body: {
      en: "Kids, teens, adults — everyone’s in.",
      fr: "Enfants, ados, adultes : tout le monde joue.",
    },
  },
  {
    icon: PartyPopper,
    title: { en: "Private events", fr: "Événements privés" },
    body: {
      en: "Birthdays, corporate, celebrations.",
      fr: "Anniversaires, entreprises, célébrations.",
    },
  },
  {
    icon: ShieldCheck,
    title: { en: "Safe & guided", fr: "Sécuritaire et encadré" },
    body: {
      en: "Staff on site to guide every session.",
      fr: "Équipe sur place pour encadrer chaque séance.",
    },
  },
];

export function BookBand() {
  const { locale } = useLocaleContext();
  const { content } = useSiteContext();
  const t = ui(locale);

  if (content.sectionVisibility?.bookBand === false) return null;

  return (
    <section className="relative z-10 px-4 pb-16 sm:px-6 lg:px-8 xl:px-12">
      <div className="ju-public-promo mx-auto max-w-[1440px] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-[0_0_60px_rgba(0,174,239,0.08)] backdrop-blur-xl">
        <div className="grid gap-8 p-6 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-10 lg:p-9">
          <div className="ju-public-promo-icons grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {items.map(({ icon: Icon, title, body }) => (
              <div key={title.en} className="flex gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-ju-electric/45 bg-ju-electric/10 text-ju-cyanGlow shadow-[0_0_24px_rgba(0,245,255,0.2)]">
                  <Icon className="size-6" aria-hidden />
                </span>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wide text-white">
                    {locale === "fr" ? title.fr : title.en}
                  </h3>
                  <p className="mt-1 text-sm text-ju-soft">
                    {locale === "fr" ? body.fr : body.en}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#FF2D95] via-[#A259FF] to-[#7B2CFF] p-px shadow-btn-brand">
            <div className="ju-on-dark flex flex-col items-start gap-4 rounded-[15px] bg-[#050A30]/90 px-7 py-7 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-ju-cyanGlow">
                  {locale === "fr" ? "Prêt à jouer ?" : "Ready to play?"}
                </p>
                <p className="mt-2 max-w-[260px] text-lg font-bold leading-snug text-white">
                  {t.bookExperience}!
                </p>
              </div>
              <NeonButton
                variant="outline-white"
                icon={ArrowRightCircle}
                iconPosition="right"
                className="!rounded-full !border-white/50 !bg-white/10"
                href="/booking"
              >
                {t.bookNow}
              </NeonButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
