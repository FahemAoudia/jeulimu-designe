import { defaultSiteContent } from "@/lib/site-defaults";
import { defaultTheme } from "@/lib/v2-content-defaults";
import type { SiteContent } from "@/types/site-content";
import type { SiteTheme } from "@/types/v2-site-content";

export const SITE_CONTENT_SCHEMA_VERSION = 7;

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function deepMerge<T extends Record<string, unknown>>(base: T, patch: unknown): T {
  if (!isPlainObject(patch)) return base;
  const out = { ...base } as Record<string, unknown>;
  for (const key of Object.keys(patch)) {
    const pv = (patch as Record<string, unknown>)[key];
    const bv = out[key];
    if (isPlainObject(pv) && isPlainObject(bv)) {
      out[key] = deepMerge(bv as Record<string, unknown>, pv);
    } else if (pv !== undefined) {
      out[key] = pv;
    }
  }
  return out as T;
}

/** Apply client PDF content updates while preserving admin uploads and theme tweaks. */
export function migrateSiteContent(content: SiteContent): SiteContent {
  if ((content.schemaVersion ?? 0) >= SITE_CONTENT_SCHEMA_VERSION) {
    return content;
  }

  const savedLogo = content.siteBranding?.logoImage?.trim() ?? "";
  const isUploadedLogo =
    savedLogo.startsWith("http") || savedLogo.startsWith("/uploads/");

  const savedHeroBg = content.hero?.backgroundImage?.trim() ?? "";
  const isCustomHero =
    savedHeroBg.length > 0 &&
    savedHeroBg !== "/hero-background.png" &&
    savedHeroBg !== "/hero-background.svg";

  const savedHeroVid = content.hero?.backgroundVideo?.trim() ?? "";
  const savedGallery = content.gallery ?? [];
  const savedReviews = content.testimonialReviews ?? [];
  const savedPromo = content.eventsPromoImage?.trim() ?? "";
  const savedTheme = content.theme;
  const savedEventsList = content.eventsList ?? [];
  const savedLogoSize = content.siteBranding?.logoSize;
  const savedShowTagline = content.siteBranding?.showTagline;
  const savedSectionStyles = content.sectionStyles;

  const migrated = structuredClone(defaultSiteContent);
  migrated.schemaVersion = SITE_CONTENT_SCHEMA_VERSION;

  if (isUploadedLogo) migrated.siteBranding.logoImage = savedLogo;
  else migrated.siteBranding.logoImage = "/logo.png";
  if (savedLogoSize === "sm" || savedLogoSize === "md" || savedLogoSize === "lg" || savedLogoSize === "xl") {
    migrated.siteBranding.logoSize = savedLogoSize;
  }
  if (typeof savedShowTagline === "boolean") {
    migrated.siteBranding.showTagline = savedShowTagline;
  }
  if (savedSectionStyles && Object.keys(savedSectionStyles).length > 0) {
    migrated.sectionStyles = savedSectionStyles;
  }
  if (isCustomHero) migrated.hero.backgroundImage = savedHeroBg;
  if (savedHeroVid) migrated.hero.backgroundVideo = savedHeroVid;
  if (savedGallery.length) migrated.gallery = savedGallery;
  if (savedReviews.length) migrated.testimonialReviews = savedReviews;
  if (savedPromo) migrated.eventsPromoImage = savedPromo;
  if (savedEventsList.length) migrated.eventsList = savedEventsList;
  if (savedTheme) {
    migrated.theme = deepMerge(
      structuredClone(defaultTheme) as Record<string, unknown>,
      savedTheme as Record<string, unknown>,
    ) as SiteTheme;
  }

  return migrated;
}
