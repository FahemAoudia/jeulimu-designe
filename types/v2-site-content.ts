import type { LocalizedString } from "@/types/site-content";

export type SiteTheme = {
  cyan: string;
  magenta: string;
  purple: string;
  pinkGlow: string;
  bgDeep: string;
  bgMid: string;
  bgNav: string;
  gradientStart: string;
  gradientMid: string;
  gradientEnd: string;
  /** Nav bar background (when scrolled). */
  navBackground: string;
  /** Nav link / menu text. */
  navText: string;
  /** Nav links default (muted). */
  navTextMuted: string;
  /** Active nav link + border accent. */
  navLinkActive: string;
  /** Mobile menu panel background. */
  navMobileBackground: string;
  /** Footer background. */
  footerBackground: string;
  /** Footer body text. */
  footerText: string;
  /** Footer muted text / links. */
  footerTextMuted: string;
  /** Footer section headings (Quick links, Contact…). */
  footerHeading: string;
  /** Footer icons (phone, map, mail). */
  footerIconAccent: string;
};

export type V2Pricing = {
  smallGroup: { players: string; durationMin: number; perPlayer: number };
  group: { players: string; durationMin: number; perPlayer: number };
  largeGroup: { players: string; durationMin: number; perPlayer: number };
  birthday: {
    package: number;
    extraPerPlayer: number;
    includedPlayers: number;
    maxPlayers: number;
  };
  partyRoom: { price: number; durationMin: number };
};

export type V2SectionVisibility = {
  hero: boolean;
  marquee: boolean;
  glance: boolean;
  whatIs: boolean;
  howWorks: boolean;
  gameModes: boolean;
  experiences: boolean;
  reviews: boolean;
  finalCta: boolean;
};

export type V2MarqueeStat = { v: string; l: LocalizedString };

export type V2IconItem = {
  icon?: string;
  title: LocalizedString;
  sub?: LocalizedString;
  desc?: LocalizedString;
};

export type V2FaqPair = { q: LocalizedString; a: LocalizedString };

export type V2FaqGroup = {
  id: string;
  label: LocalizedString;
  items: V2FaqPair[];
};

export type V2PricingCard = {
  id: string;
  title: LocalizedString;
  players: LocalizedString;
  duration: LocalizedString;
  price?: string;
  unit: LocalizedString;
  cta: LocalizedString;
  href: string;
  featured?: boolean;
};

export type V2SiteContent = {
  nav: {
    birthdays: LocalizedString;
    groupsPricing: LocalizedString;
    mobileEvents: LocalizedString;
    faq: LocalizedString;
    contactUs: LocalizedString;
    events: LocalizedString;
    bookNow: LocalizedString;
  };
  home: {
    hero: {
      headline: LocalizedString;
      sub: LocalizedString;
      support: LocalizedString;
      locationLabel: LocalizedString;
      ctaBirthdays: LocalizedString;
      ctaGroups: LocalizedString;
    };
    marquee: V2MarqueeStat[];
    glance?: V2IconItem[];
    whatIs: {
      title: LocalizedString;
      body: LocalizedString;
      features: V2IconItem[];
      cta: LocalizedString;
      sectionLabel: LocalizedString;
    };
    howWorks: {
      title: LocalizedString;
      body: LocalizedString;
      steps: V2IconItem[];
      cta: LocalizedString;
      sectionLabel: LocalizedString;
    };
    gameModes: {
      title: LocalizedString;
      subtitle: LocalizedString;
      modes: {
        id: string;
        name: LocalizedString;
        tag: LocalizedString;
        desc: LocalizedString;
        icon?: string;
      }[];
      cta: LocalizedString;
    };
    experiences: {
      title: LocalizedString;
      subtitle: LocalizedString;
      body: LocalizedString;
      birthday: {
        title: LocalizedString;
        sub: LocalizedString;
        cta: LocalizedString;
        label: LocalizedString;
      };
      groups: {
        title: LocalizedString;
        sub: LocalizedString;
        cta: LocalizedString;
        label: LocalizedString;
        badge: LocalizedString;
        perfectFor: LocalizedString[];
        pricing: LocalizedString[];
      };
      mobile: {
        title: LocalizedString;
        sub: LocalizedString;
        badge: LocalizedString;
        ctaLearn: LocalizedString;
        ctaWaitlist: LocalizedString;
        label: LocalizedString;
      };
    };
    reviews: {
      title: LocalizedString;
      cta: LocalizedString;
      sectionLabel: LocalizedString;
    };
    finalCta: {
      title: LocalizedString;
      sub: LocalizedString;
      cta: LocalizedString;
    };
  };
  birthdays: {
    hero: {
      title: LocalizedString;
      sub: LocalizedString;
      body: LocalizedString;
      ctaPlan: LocalizedString;
      ctaBook: LocalizedString;
      ctaCheck: LocalizedString;
      sectionLabel: LocalizedString;
    };
    why: { title: LocalizedString; items: V2IconItem[] };
    package: {
      title: LocalizedString;
      price?: LocalizedString;
      tax: LocalizedString;
      includes: LocalizedString[];
      extra: LocalizedString;
      capacity: LocalizedString;
    };
    gameplay: { title: LocalizedString; items: V2IconItem[] };
    bring: { title: LocalizedString; items: LocalizedString[] };
    partyRoom: { title: LocalizedString; items: LocalizedString[] };
    faq: V2FaqPair[];
    final: { title: LocalizedString; sub: LocalizedString; cta: LocalizedString };
  };
  groups: {
    hero: {
      title: LocalizedString;
      sub: LocalizedString;
      body: LocalizedString;
      sectionLabel: LocalizedString;
    };
    audiences: V2IconItem[];
    expect: { title: LocalizedString; items: LocalizedString[] };
    bring: { title: LocalizedString; items: LocalizedString[] };
    pricing: V2PricingCard[];
    addon: {
      title: LocalizedString;
      tax: LocalizedString;
      duration: LocalizedString;
      cta: LocalizedString;
      href: string;
    };
    contact: { title: LocalizedString; sub: LocalizedString; cta: LocalizedString };
    customQuote: { title: LocalizedString; body: LocalizedString; cta: LocalizedString };
    faq: V2FaqPair[];
  };
  mobile: {
    hero: {
      title: LocalizedString;
      sub: LocalizedString;
      badge: LocalizedString;
      sectionLabel: LocalizedString;
    };
    overview: LocalizedString;
    whoFor: LocalizedString[];
    how: { step: string; title: LocalizedString; sub: LocalizedString }[];
    waitlist: {
      title: LocalizedString;
      sub: LocalizedString;
      name: LocalizedString;
      email: LocalizedString;
      org: LocalizedString;
      submit: LocalizedString;
      success: LocalizedString;
    };
  };
  faq: { title: LocalizedString; groups: V2FaqGroup[] };
  footer: {
    quickLinks: LocalizedString;
    contact: LocalizedString;
    hours: LocalizedString;
    follow: LocalizedString;
    directions: LocalizedString;
    call: LocalizedString;
    email: LocalizedString;
    newsletter: LocalizedString;
    newsletterPlaceholder: LocalizedString;
    newsletterCta: LocalizedString;
  };
};
