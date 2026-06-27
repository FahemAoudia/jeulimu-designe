export type SectionRegistryEntry = {
  id: string;
  page: string;
  title: string;
  hint?: string;
  showCards?: boolean;
  showButtons?: boolean;
};

export const SECTION_STYLE_REGISTRY: SectionRegistryEntry[] = [
  {
    id: "home.hero",
    page: "Home",
    title: "Hero",
    hint: "Headline, floor panel, CTAs",
    showButtons: true,
  },
  {
    id: "birthdays.hero",
    page: "Birthdays",
    title: "Hero",
    hint: "Title, subtitle, Book Now / Check Availability",
    showButtons: true,
  },
  {
    id: "birthdays.why",
    page: "Birthdays",
    title: "Why Choose jeuLumi",
    hint: "Section + icon cards (Interactive Games, Staff Guided…)",
    showCards: true,
  },
  {
    id: "birthdays.gameplay",
    page: "Birthdays",
    title: "What's Included",
    hint: "Dynamic Games, Atmosphere, Party Zone cards",
    showCards: true,
  },
  {
    id: "birthdays.package",
    page: "Birthdays",
    title: "Birthday Package ($249)",
    hint: "Package box + booking button",
    showCards: true,
    showButtons: true,
  },
  {
    id: "birthdays.faq",
    page: "Birthdays",
    title: "FAQ",
  },
  {
    id: "birthdays.final",
    page: "Birthdays",
    title: "Final CTA",
    hint: "Ready To Celebrate band",
    showButtons: true,
  },
  {
    id: "groups.hero",
    page: "Groups & Events",
    title: "Hero",
    showButtons: true,
  },
  {
    id: "groups.who",
    page: "Groups & Events",
    title: "Who We Serve",
    showCards: true,
  },
  {
    id: "groups.pricing",
    page: "Groups & Events",
    title: "Pricing table",
    showCards: true,
    showButtons: true,
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
