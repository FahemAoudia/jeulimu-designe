export type LocalizedString = { en: string; fr: string };

export type GameModeContent = {
  id: string;
  name: LocalizedString;
  tagline: LocalizedString;
  lead: LocalizedString;
  description: LocalizedString;
  image?: string;
  /** Optional loop video — overrides image on the public site when set */
  video?: string;
};

export type PricingTier = {
  id: string;
  title: LocalizedString;
  players: LocalizedString;
  price: string;
  priceNote: LocalizedString;
  kidNote?: LocalizedString;
  extras: LocalizedString[];
  cta: LocalizedString;
  featured: boolean;
  badge?: LocalizedString;
};

export type SiteEvent = {
  id: string;
  title: LocalizedString;
  dateLabel: LocalizedString;
  description: LocalizedString;
  /** Saved as /uploads/... after admin upload */
  image?: string;
};

export type SpaceDetail = {
  icon: string;
  title: LocalizedString;
  body: LocalizedString;
};

export type FaqItem = {
  id: string;
  question: LocalizedString;
  answer: LocalizedString;
};

/** Stacked initials in the hero Google Maps summary card (styles cycle by index). */
export type HeroGoogleMapsAvatar = {
  id: string;
  initials: string;
  /** Full name for tooltip / accessibility */
  displayName: string;
};

/** Hero top-right mini card: score, maps label, location, avatars. */
export type HeroGoogleMapsSummary = {
  visible: boolean;
  /** e.g. "5.0/5" */
  scoreText: string;
  mapsLabel: LocalizedString;
  locationLine: LocalizedString;
  avatars: HeroGoogleMapsAvatar[];
};

/** Google-style review row in the homepage testimonials column. */
export type TestimonialReview = {
  id: string;
  name: LocalizedString;
  meta: LocalizedString;
  when: LocalizedString;
  quote: LocalizedString;
};

/** Logo + optional tagline (navbar & footer); empty logoImage = built-in gradient wordmark. */
export type SiteBranding = {
  logoImage: string;
  logoAlt: LocalizedString;
  /** Responsive scale for the image in nav + footer */
  logoSize: "sm" | "md" | "lg" | "xl";
  /** Second line under logo (e.g. “Interactive LED Game Floor”) */
  showTagline: boolean;
};

import type {
  SiteTheme,
  V2Pricing,
  V2SectionVisibility,
  V2SiteContent,
} from "@/types/v2-site-content";
import type { SectionStylesMap } from "@/types/section-styles";

export type SiteContent = {
  hero: {
    titleStep: LocalizedString;
    titleGame: LocalizedString;
    subtitle: LocalizedString;
    badges: LocalizedString[];
    /** Backdrop image path or URL (e.g. /hero-background.png or /uploads/…). */
    backgroundImage: string;
    /** Optional MP4/WebM/MOV loop behind hero; empty = image only. */
    backgroundVideo: string;
    /** One flag per `badges[]` index; false hides that pill on the site. */
    badgeVisible: boolean[];
    showBookCta: boolean;
    showWatchVideoCta: boolean;
    googleMapsSummary: HeroGoogleMapsSummary;
  };
  intro: {
    sparkle: LocalizedString;
    headline: LocalizedString;
    paragraphs: LocalizedString[];
  };
  gallery: { alt: LocalizedString; caption?: LocalizedString; image: string }[];
  howItWorks: {
    title: LocalizedString;
    intro: LocalizedString;
    bullets: LocalizedString[];
    closing: LocalizedString;
  };
  gameModesIntro: {
    title: LocalizedString;
    sparkle: LocalizedString;
  };
  gameModes: GameModeContent[];
  pricing: {
    sparkle: LocalizedString;
    title: LocalizedString;
  };
  pricingTiers: PricingTier[];
  eventsParty: {
    sparkle: LocalizedString;
    title: LocalizedString;
    priceLine: LocalizedString;
    idealTitle: LocalizedString;
    idealFor: LocalizedString[];
    spaceTitle: LocalizedString;
    spaceDetails: SpaceDetail[];
    bookingNote: LocalizedString;
    bookingContact: LocalizedString;
    cta: LocalizedString;
  };
  eventsList: SiteEvent[];
  contact: {
    sparkle: LocalizedString;
    title: LocalizedString;
    phone: string;
    email: string;
    address: LocalizedString;
    hoursTitle: LocalizedString;
    hoursReservation: LocalizedString;
    hoursExplainer: LocalizedString;
    mapLabel: LocalizedString;
    mapEmbedUrl: string;
    schedule: { days: LocalizedString; hours: LocalizedString }[];
  };
  reservationBanner: LocalizedString;
  footerTagline: LocalizedString;
  siteBranding: SiteBranding;
  /** Homepage “Avis récents” / reviews column (editable in admin). */
  testimonialReviews: TestimonialReview[];
  /** Show/hide major homepage blocks (admin-controlled) */
  sectionVisibility: {
    reservationBar: boolean;
    hero: boolean;
    /** Intro sparkle/headline + gallery + “How it works” */
    experienceAndHow: boolean;
    gameModes: boolean;
    pricing: boolean;
    testimonials: boolean;
    /** Party room + upcoming events */
    events: boolean;
    contact: boolean;
    bookBand: boolean;
  };
  /** Optional image above events grid (e.g. /uploads/...) */
  eventsPromoImage: string;
  /** FAQ entries for the floating chat assistant (EN + FR). */
  faqItems: FaqItem[];
  /** V2 public site copy (home, pages, nav, footer). */
  v2: V2SiteContent;
  /** Editable pricing used across v2 pages. */
  pricingV2: V2Pricing;
  /** Brand / UI colors (CSS variables). */
  theme: SiteTheme;
  /** Show/hide homepage v2 sections. */
  sectionVisibilityV2: V2SectionVisibility;
  /** Per-section colors, fonts, buttons — Admin → Page styles */
  sectionStyles: SectionStylesMap;
  /** Bumps when default copy must replace saved CMS (client content updates). */
  schemaVersion?: number;
};

export function pickLocalized<T extends LocalizedString>(
  v: T,
  locale: "en" | "fr",
): string {
  return locale === "fr" ? v.fr : v.en;
}

export function pickLocalizedList(
  list: LocalizedString[],
  locale: "en" | "fr",
): string[] {
  return list.map((x) => pickLocalized(x, locale));
}
