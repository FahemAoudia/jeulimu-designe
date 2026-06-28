import type { V2SiteContent } from "@/types/v2-site-content";
import { t } from "@/lib/site-v2-content";

export type SectionRegistryEntry = {
  id: string;
  page: string;
  title: string;
  hint?: string;
  showCards?: boolean;
  showButtons?: boolean;
  showHeroLines?: boolean;
  showLabelTitleBody?: boolean;
  singleButton?: boolean;
  /** Load per-item editors from v2 content */
  itemSource?: "marquee" | "glance" | "whatIsFeatures" | "howWorksSteps" | "experiencesCards";
};

export const SECTION_STYLE_REGISTRY: SectionRegistryEntry[] = [
  {
    id: "nav.linksBox",
    page: "Navigation",
    title: "Menu links box (Birthdays, Groups…)",
    hint: "Background, border, link colors for the nav link group",
    showLabelTitleBody: true,
  },
  {
    id: "nav.contactButton",
    page: "Navigation",
    title: "Contact Us button",
    showButtons: true,
    singleButton: true,
  },
  {
    id: "home.hero",
    page: "Home",
    title: "Hero — STEP IN / BECOME THE GAME",
    hint: "Headline lines, body, CTAs, LED floor panel frame",
    showButtons: true,
    showHeroLines: true,
    showLabelTitleBody: true,
    showCards: true,
  },
  {
    id: "home.marquee",
    page: "Home",
    title: "Marquee stats (30 Max players…)",
    hint: "Scrolling stat pills under hero",
    showCards: true,
    itemSource: "marquee",
  },
  {
    id: "home.glance",
    page: "Home",
    title: "Glance stats grid",
    showCards: true,
    itemSource: "glance",
  },
  {
    id: "home.whatIs",
    page: "Home",
    title: "The experience — Your Own Interactive Playground",
    hint: "Label, title, body, feature grid, Learn More",
    showCards: true,
    showButtons: true,
    showLabelTitleBody: true,
    itemSource: "whatIsFeatures",
  },
  {
    id: "home.howWorks",
    page: "Home",
    title: "How it works — Simple To Learn",
    showButtons: true,
    showLabelTitleBody: true,
    itemSource: "howWorksSteps",
  },
  {
    id: "home.gameModes",
    page: "Home",
    title: "Game modes — LumiQuest / LumiVS / LumiLogik",
    showLabelTitleBody: true,
    showCards: true,
  },
  {
    id: "home.experiences",
    page: "Home",
    title: "Experiences For Every Group",
    showLabelTitleBody: true,
    showCards: true,
    itemSource: "experiencesCards",
  },
  {
    id: "home.reviews",
    page: "Home",
    title: "Reviews carousel",
    showLabelTitleBody: true,
    showCards: true,
    showButtons: true,
  },
  {
    id: "home.finalCta",
    page: "Home",
    title: "Final CTA — Ready to play",
    showLabelTitleBody: true,
    showButtons: true,
    showCards: true,
  },
  {
    id: "birthdays.hero",
    page: "Birthdays",
    title: "Hero",
    hint: "Title, subtitle, Book Now / Check Availability",
    showButtons: true,
    showLabelTitleBody: true,
  },
  {
    id: "birthdays.why",
    page: "Birthdays",
    title: "Why Choose jeuLumi",
    showCards: true,
    showLabelTitleBody: true,
  },
  {
    id: "birthdays.gameplay",
    page: "Birthdays",
    title: "What's Included",
    showCards: true,
    showLabelTitleBody: true,
  },
  {
    id: "birthdays.package",
    page: "Birthdays",
    title: "Birthday Package ($249)",
    showCards: true,
    showButtons: true,
    showLabelTitleBody: true,
  },
  {
    id: "birthdays.faq",
    page: "Birthdays",
    title: "FAQ",
    showLabelTitleBody: true,
  },
  {
    id: "birthdays.final",
    page: "Birthdays",
    title: "Final CTA",
    showButtons: true,
    showLabelTitleBody: true,
  },
  {
    id: "groups.hero",
    page: "Groups & Events",
    title: "Hero",
    showButtons: true,
    showLabelTitleBody: true,
  },
  {
    id: "groups.who",
    page: "Groups & Events",
    title: "Who We Serve",
    showCards: true,
    showLabelTitleBody: true,
  },
  {
    id: "groups.pricing",
    page: "Groups & Events",
    title: "Pricing table",
    showCards: true,
    showButtons: true,
    showLabelTitleBody: true,
  },
  {
    id: "groups.contactCta",
    page: "Groups & Events",
    title: "Bottom contact CTA",
    showButtons: true,
    showLabelTitleBody: true,
    singleButton: true,
  },
  {
    id: "contact.form",
    page: "Contact",
    title: "Contact form",
    showCards: true,
    showButtons: true,
  },
  {
    id: "contact.sidebar",
    page: "Contact",
    title: "Contact info & hours",
    showCards: true,
  },
];

export const SECTION_PAGES = Array.from(
  new Set(SECTION_STYLE_REGISTRY.map((s) => s.page)),
);

export type SectionItemDef = { key: string; label: string };

export function sectionItemDefs(
  entry: SectionRegistryEntry,
  v2: V2SiteContent,
): SectionItemDef[] {
  const home = v2.home;
  switch (entry.itemSource) {
    case "marquee":
      return home.marquee.map((s, i) => ({
        key: String(i),
        label: `${s.v} — ${t(s.l, "en")}`,
      }));
    case "glance":
      return (home.glance ?? []).map((s, i) => ({
        key: String(i),
        label: `${t(s.title, "en")} — ${s.sub ? t(s.sub, "en") : ""}`,
      }));
    case "whatIsFeatures":
      return home.whatIs.features.map((f, i) => ({
        key: String(i),
        label: t(f.title, "en"),
      }));
    case "howWorksSteps":
      return home.howWorks.steps.map((s, i) => ({
        key: String(i),
        label: t(s.title, "en"),
      }));
    case "experiencesCards":
      return [
        { key: "0", label: "Birthdays card" },
        { key: "1", label: "Groups & Events card" },
        { key: "2", label: "Mobile Events card" },
      ];
    default:
      return [];
  }
}
