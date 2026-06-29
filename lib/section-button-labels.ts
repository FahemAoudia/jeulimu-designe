import type { LocalizedString } from "@/types/site-content";
import type { V2SiteContent } from "@/types/v2-site-content";
import { t } from "@/lib/site-v2-content";
import { UI } from "@/lib/ui-strings";

export type SectionButtonLabelSet = {
  primary?: { caption: string; placement?: string };
  secondary?: { caption: string; placement?: string };
};

/** Admin label: current site caption (EN / FR) + where the button appears. */
function caption(ls: LocalizedString | string): string {
  if (typeof ls === "string") return ls;
  const en = t(ls, "en");
  const fr = t(ls, "fr");
  if (!fr || en === fr) return en;
  return `${en} / ${fr}`;
}

function uniqueCaptions(items: LocalizedString[]): string {
  const seen = new Set<string>();
  const parts: string[] = [];
  for (const item of items) {
    const c = caption(item);
    if (!c || seen.has(c)) continue;
    seen.add(c);
    parts.push(c);
  }
  return parts.join(" · ");
}

export function sectionButtonLabels(sectionId: string, v2: V2SiteContent): SectionButtonLabelSet {
  const home = v2.home;
  const b = v2.birthdays;
  const g = v2.groups;
  const nav = v2.nav;

  switch (sectionId) {
    case "nav.contactButton":
      return {
        primary: {
          caption: caption(nav.contactUs),
          placement: "Top navigation bar (desktop header + mobile menu)",
        },
      };
    case "home.hero":
      return {
        primary: {
          caption: caption(home.hero.ctaBirthdays),
          placement: "Home hero — left column, under the headline",
        },
        secondary: {
          caption: caption(home.hero.ctaGroups),
          placement: "Home hero — beside the Birthdays button",
        },
      };
    case "home.whatIs":
      return {
        primary: {
          caption: caption(home.whatIs.cta),
          placement: "The Experience section — bottom of the text card",
        },
      };
    case "home.howWorks":
      return {
        primary: {
          caption: caption(home.howWorks.cta),
          placement: "How it works — below the step cards",
        },
      };
    case "home.gameModes":
      return {
        primary: {
          caption: caption(home.gameModes.cta),
          placement: "Game modes — on LumiQuest, LumiVS & LumiLogik cards (same button on all three)",
        },
      };
    case "home.reviews":
      return {
        primary: {
          caption: caption(home.reviews.cta),
          placement: "Reviews carousel — below the review cards",
        },
      };
    case "home.finalCta":
      return {
        primary: {
          caption: caption(home.finalCta.cta),
          placement: "Ready to play banner — center of the section",
        },
      };
    case "birthdays.hero":
      return {
        primary: {
          caption: caption(b.hero.ctaBook),
          placement: "Birthdays page hero — main action",
        },
        secondary: {
          caption: caption(b.hero.ctaCheck),
          placement: "Birthdays page hero — beside Book Now",
        },
      };
    case "birthdays.package":
      return {
        primary: {
          caption: caption(b.final.cta),
          placement: "Birthday package ($249) card — bottom",
        },
      };
    case "birthdays.final":
      return {
        primary: {
          caption: caption(b.final.cta),
          placement: "Bottom CTA banner on Birthdays page",
        },
      };
    case "groups.hero":
      return {
        primary: {
          caption: caption(nav.bookNow),
          placement: "Groups & Events hero — main action",
        },
        secondary: {
          caption: caption(nav.contactUs),
          placement: "Groups & Events hero — beside Book Now",
        },
      };
    case "groups.pricing":
      return {
        primary: {
          caption: uniqueCaptions(g.pricing.map((p) => p.cta)),
          placement: "Pricing table — on each pricing card (shared style)",
        },
        secondary: {
          caption: caption(g.customQuote.cta),
          placement: "Custom quote box — below the pricing grid",
        },
      };
    case "groups.contactCta":
      return {
        primary: {
          caption: caption(g.contact.cta),
          placement: "Groups page — bottom contact banner",
        },
      };
    case "contact.form":
      return {
        primary: {
          caption: `${UI.en.form.submit} / ${UI.fr.form.submit}`,
          placement: "Contact page — form submit button",
        },
      };
    default:
      return {};
  }
}
