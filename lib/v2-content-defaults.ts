import { CLIENT_PRICING } from "@/lib/client-pricing";
import {
  v2Birthdays,
  v2Faq,
  v2Footer,
  v2Groups,
  v2Home,
  v2Mobile,
  v2Nav,
} from "@/lib/site-v2-content";
import type {
  SiteTheme,
  V2Pricing,
  V2SectionVisibility,
  V2SiteContent,
} from "@/types/v2-site-content";

const L = (en: string, fr: string) => ({ en, fr });

export const defaultTheme: SiteTheme = {
  cyan: "#00F5FF",
  magenta: "#FF2D95",
  purple: "#7B2CFF",
  pinkGlow: "#FF00E5",
  bgDeep: "#020818",
  bgMid: "#0A1035",
  bgNav: "#050A30",
  gradientStart: "#030818",
  gradientMid: "#0A1035",
  gradientEnd: "#020510",
  navBackground: "#030308",
  navText: "#FFFFFF",
  navTextMuted: "#FFFFFF",
  navLinkActive: "#00F5FF",
  navMobileBackground: "#030308",
  footerBackground: "#020205",
  footerText: "#FFFFFF",
  footerTextMuted: "#FFFFFF",
  footerHeading: "#00F5FF",
  footerIconAccent: "#FF2D95",
};

export const defaultPricing: V2Pricing = {
  smallGroup: { ...CLIENT_PRICING.smallGroup },
  group: { ...CLIENT_PRICING.group },
  largeGroup: { ...CLIENT_PRICING.largeGroup },
  birthday: { ...CLIENT_PRICING.birthday },
  partyRoom: { ...CLIENT_PRICING.partyRoom },
};

export const defaultSectionVisibilityV2: V2SectionVisibility = {
  hero: true,
  marquee: true,
  whatIs: true,
  howWorks: true,
  gameModes: true,
  experiences: true,
  reviews: true,
  finalCta: true,
};

const HOME_MARQUEE = [
  { v: "30", l: L("Max players", "Joueurs max") },
  { v: "3", l: L("Game categories", "Catégories de jeu") },
  { v: "🔒", l: L("Private sessions", "Séances privées") },
  { v: "🎮", l: L("Interactive gameplay", "Jeu interactif") },
  { v: "👤", l: L("Staff guided", "Encadré") },
  { v: "7+", l: L("Ages", "Âges") },
];

export const defaultV2SiteContent: V2SiteContent = {
  nav: { ...v2Nav },
  home: {
    hero: {
      headline: v2Home.hero.headline,
      sub: v2Home.hero.sub,
      support: v2Home.hero.support,
      locationLabel: L("LaSalle, QC", "LaSalle, QC"),
      ctaBirthdays: v2Home.hero.ctaBirthdays,
      ctaGroups: v2Home.hero.ctaGroups,
    },
    marquee: HOME_MARQUEE,
    whatIs: {
      title: v2Home.whatIs.title,
      body: v2Home.whatIs.body,
      features: v2Home.whatIs.features.map((f) => ({
        icon: f.icon,
        title: f.title,
        sub: f.sub,
      })),
      cta: v2Home.whatIs.cta,
      sectionLabel: L("The experience", "L’expérience"),
    },
    howWorks: {
      title: v2Home.howWorks.title,
      body: v2Home.howWorks.body,
      steps: v2Home.howWorks.steps.map((s) => ({
        icon: s.icon,
        title: s.title,
        sub: s.sub,
      })),
      cta: v2Home.howWorks.cta,
      sectionLabel: L("Gameplay", "Gameplay"),
    },
    gameModes: {
      title: v2Home.gameModes.title,
      subtitle: L("Three worlds", "Trois univers"),
      modes: v2Home.gameModes.modes.map((m) => ({
        id: m.id,
        name: m.name,
        tag: m.tag,
        desc: m.desc,
        icon: m.icon,
      })),
      cta: v2Home.gameModes.cta,
    },
    experiences: {
      title: v2Home.experiences.title,
      subtitle: L("Pick your experience", "Choisissez votre expérience"),
      body: v2Home.experiences.body,
      birthday: {
        title: v2Home.experiences.birthday.title,
        sub: v2Home.experiences.birthday.sub,
        cta: v2Home.experiences.birthday.cta,
        label: L("Birthdays", "Anniversaires"),
      },
      groups: {
        title: v2Home.experiences.groups.title,
        sub: L("Group pricing", "Tarifs groupe"),
        cta: v2Home.experiences.groups.cta,
        label: L("Groups", "Groupes"),
        badge: L("2–24 players", "2–24 joueurs"),
        perfectFor: [...v2Home.experiences.groups.perfectFor],
        pricing: [...v2Home.experiences.groups.pricing],
      },
      mobile: {
        title: v2Home.experiences.mobile.title,
        sub: v2Home.experiences.mobile.sub,
        badge: v2Home.experiences.mobile.badge,
        ctaLearn: v2Home.experiences.mobile.ctaLearn,
        ctaWaitlist: v2Home.experiences.mobile.ctaWaitlist,
        label: L("Soon", "Bientôt"),
      },
    },
    reviews: {
      title: v2Home.reviews.title,
      cta: v2Home.reviews.cta,
      sectionLabel: L("Google", "Google"),
    },
    finalCta: { ...v2Home.finalCta },
  },
  birthdays: {
    hero: {
      title: v2Birthdays.hero.title,
      sub: v2Birthdays.hero.sub,
      body: v2Birthdays.hero.body,
      ctaPlan: v2Birthdays.hero.ctaPlan,
      ctaBook: v2Birthdays.hero.ctaBook,
      ctaCheck: v2Birthdays.hero.ctaCheck,
      sectionLabel: L("Birthdays", "Anniversaires"),
    },
    why: {
      title: v2Birthdays.why.title,
      items: v2Birthdays.why.items.map((i) => ({
        icon: i.icon,
        title: i.title,
        sub: i.sub,
      })),
    },
    package: {
      title: v2Birthdays.package.title,
      tax: v2Birthdays.package.tax,
      includes: [...v2Birthdays.package.includes],
      extra: v2Birthdays.package.extra,
      capacity: v2Birthdays.package.capacity,
    },
    gameplay: {
      title: v2Birthdays.gameplay.title,
      items: v2Birthdays.gameplay.items.map((i) => ({
        icon: i.icon,
        title: i.title,
        sub: i.sub,
      })),
    },
    bring: {
      title: v2Birthdays.bring.title,
      items: [...v2Birthdays.bring.items],
    },
    partyRoom: {
      title: v2Birthdays.partyRoom.title,
      items: [...v2Birthdays.partyRoom.items],
    },
    faq: [...v2Birthdays.faq],
    final: { ...v2Birthdays.final },
  },
  groups: {
    hero: {
      title: v2Groups.hero.title,
      sub: v2Groups.hero.sub,
      body: v2Groups.hero.body,
      sectionLabel: L("Groups", "Groupes"),
    },
    audiences: v2Groups.audiences.map((a) => ({
      icon: a.icon,
      title: a.title,
      desc: a.desc,
    })),
    expect: {
      title: v2Groups.expect.title,
      items: [...v2Groups.expect.items],
    },
    bring: {
      title: v2Groups.bring.title,
      items: [...v2Groups.bring.items],
    },
    pricing: v2Groups.pricing.map((p) => ({
      id: p.id,
      title: p.title,
      players: p.players,
      duration: p.duration,
      price: p.price,
      unit: p.unit,
      cta: p.cta,
      href: p.href,
      featured: p.featured,
    })),
    addon: {
      title: v2Groups.addon.title,
      tax: v2Groups.addon.tax,
      duration: v2Groups.addon.duration,
      cta: v2Groups.addon.cta,
      href: v2Groups.addon.href,
    },
    contact: { ...v2Groups.contact },
    customQuote: { ...v2Groups.customQuote },
    faq: [...v2Groups.faq],
  },
  mobile: {
    hero: {
      title: v2Mobile.hero.title,
      sub: v2Mobile.hero.sub,
      badge: v2Mobile.hero.badge,
      sectionLabel: L("Mobile", "Mobile"),
    },
    overview: v2Mobile.overview,
    whoFor: [...v2Mobile.whoFor],
    how: v2Mobile.how.map((h) => ({ ...h })),
    waitlist: { ...v2Mobile.waitlist },
  },
  faq: {
    title: v2Faq.title,
    groups: v2Faq.groups.map((g) => ({
      id: g.id,
      label: g.label,
      items: g.items.map((item) => ({ q: item.q, a: item.a })),
    })),
  },
  footer: { ...v2Footer },
};
