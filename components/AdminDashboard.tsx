"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogOut, Save, RotateCcw, Plus, Trash2, ChevronDown, KeyRound } from "lucide-react";
import { useSiteContext } from "@/providers/AppProviders";
import { ThemeToggle } from "@/components/ThemeToggle";
import type {
  GameModeContent,
  LocalizedString,
  PricingTier,
  SiteContent,
  SpaceDetail,
  FaqItem,
  TestimonialReview,
} from "@/types/site-content";
import { AdminImageUpload } from "@/components/AdminImageUpload";
import { AdminVideoUpload } from "@/components/AdminVideoUpload";
import { defaultSiteContent } from "@/lib/site-defaults";

const TABS = [
  "Overview",
  "General",
  "Gallery",
  "Game modes",
  "Pricing",
  "Events",
  "Party room",
  "Contact",
  "Reviews",
  "FAQ",
  "Security",
] as const;

type Tab = (typeof TABS)[number];

const SECTION_TOGGLE_META: {
  key: keyof SiteContent["sectionVisibility"];
  title: string;
  desc: string;
}[] = [
  {
    key: "reservationBar",
    title: "Reservation banner",
    desc: "Fixed strip below the nav with your reservation message.",
  },
  {
    key: "hero",
    title: "Hero",
    desc: "Full-width headline area with background image or video.",
  },
  {
    key: "experienceAndHow",
    title: "Experience + gallery + How it works",
    desc: "Intro copy, image gallery, and “how the game works” block.",
  },
  {
    key: "gameModes",
    title: "Game modes",
    desc: "Left column in the three-column band (purple card).",
  },
  {
    key: "pricing",
    title: "Pricing",
    desc: "Middle column with tier cards.",
  },
  {
    key: "testimonials",
    title: "Reviews",
    desc: "Right column — recent Google-style reviews (edit text in the Reviews tab).",
  },
  {
    key: "events",
    title: "Events",
    desc: "Party room + upcoming events section.",
  },
  {
    key: "contact",
    title: "Contact",
    desc: "Phone, email, hours, and map.",
  },
  {
    key: "bookBand",
    title: "Bottom promo band",
    desc: "Wide band above the footer with icons and booking CTA.",
  },
];

function AdminCollapse({
  title,
  hint,
  defaultOpen = false,
  children,
}: {
  title: string;
  hint?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  return (
    <details
      open={defaultOpen}
      className="ju-admin-surface group rounded-2xl border border-white/10 bg-[#07051a]/90 shadow-[0_12px_40px_rgba(0,0,0,0.35)] transition-shadow duration-300"
    >
      <summary className="cursor-pointer list-none rounded-2xl px-4 py-3.5 outline-none transition hover:bg-white/[0.04] focus-visible:ring-2 focus-visible:ring-ju-electric/40 sm:px-5 sm:py-4 [&::-webkit-details-marker]:hidden">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-ju-cyanGlow">
              {title}
            </p>
            {hint ? (
              <p className="mt-1.5 text-[13px] leading-relaxed text-ju-muted">{hint}</p>
            ) : null}
          </div>
          <ChevronDown
            className="mt-0.5 size-5 shrink-0 text-white/50 transition-transform duration-200 group-open:rotate-180"
            aria-hidden
          />
        </div>
      </summary>
      <div className="space-y-5 border-t border-white/10 px-4 pb-5 pt-5 sm:px-5">
        {children}
      </div>
    </details>
  );
}

function Loc({
  label,
  value,
  onChange,
}: {
  label: string;
  value: LocalizedString;
  onChange: (v: LocalizedString) => void;
}) {
  return (
    <div className="ju-admin-inset rounded-xl border border-white/10 bg-black/30 p-3">
      <p className="text-[11px] font-bold uppercase tracking-wider text-ju-cyanGlow">
        {label}
      </p>
      <div className="mt-2 grid gap-2 md:grid-cols-2">
        <label className="block text-xs text-ju-muted">
          EN
          <input
            className="mt-1 w-full rounded-lg border border-white/10 bg-black/50 px-2 py-2 text-sm text-white"
            value={value.en}
            onChange={(e) => onChange({ ...value, en: e.target.value })}
          />
        </label>
        <label className="block text-xs text-ju-muted">
          FR
          <input
            className="mt-1 w-full rounded-lg border border-white/10 bg-black/50 px-2 py-2 text-sm text-white"
            value={value.fr}
            onChange={(e) => onChange({ ...value, fr: e.target.value })}
          />
        </label>
      </div>
    </div>
  );
}

export function AdminDashboard() {
  const { content, setContent, saveToServer } = useSiteContext();
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("Overview");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  async function save() {
    setBusy(true);
    setMsg(null);
    const ok = await saveToServer();
    setBusy(false);
    setMsg(ok ? "Saved to data/site-content.json" : "Save failed (check permissions / auth).");
    if (ok) router.refresh();
  }

  function resetDefaults() {
    if (!confirm("Reset all content to built-in defaults?")) return;
    setContent(structuredClone(defaultSiteContent));
    setMsg("Defaults loaded locally — click Save to persist.");
  }

  return (
    <div className="ju-admin-root min-h-screen bg-[#02020F] text-white">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#050A30]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3.5 sm:px-6">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-ju-pinkGlow">
              Admin
            </p>
            <h1 className="text-lg font-black">jeuLumi dashboard</h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <ThemeToggle variant="toolbar" />
            <Link
              href="/"
              className="rounded-lg border border-white/15 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-ju-soft hover:border-ju-electric hover:text-white"
            >
              View site
            </Link>
            <button
              type="button"
              onClick={resetDefaults}
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-xs font-semibold uppercase text-ju-soft hover:border-ju-yellow hover:text-white"
            >
              <RotateCcw className="size-3.5" /> Reset defaults
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={save}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#FF2D95] to-[#7B2CFF] px-4 py-2 text-xs font-bold uppercase tracking-wide shadow-btn-brand disabled:opacity-60"
            >
              <Save className="size-3.5" /> {busy ? "Saving…" : "Save"}
            </button>
            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-lg border border-red-400/40 px-3 py-2 text-xs font-semibold uppercase text-red-200 hover:bg-red-500/10"
            >
              <LogOut className="size-3.5" /> Logout
            </button>
          </div>
        </div>
      </header>

      {msg ? (
        <div className="mx-auto max-w-7xl px-4 pt-3 sm:px-6">
          <p className="rounded-lg border border-ju-electric/25 bg-ju-electric/5 px-3 py-2 text-sm text-ju-cyanGlow">
            {msg}
          </p>
        </div>
      ) : null}

      <div className="mx-auto max-w-7xl px-4 pb-14 pt-4 sm:px-6">
        <div className="lg:grid lg:grid-cols-[minmax(10.5rem,13.5rem)_minmax(0,1fr)] lg:items-start lg:gap-10">
          <aside className="mb-6 lg:sticky lg:top-[4.25rem] lg:mb-0 lg:self-start">
            <p className="mb-2 hidden text-[10px] font-bold uppercase tracking-[0.28em] text-ju-muted lg:block">
              Sections
            </p>
            <nav
              className="flex flex-row gap-1.5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] lg:flex-col lg:gap-1.5 lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden"
              role="tablist"
              aria-label="Admin sections"
            >
              {TABS.map((t) => (
                <button
                  key={t}
                  type="button"
                  role="tab"
                  aria-selected={tab === t}
                  onClick={() => setTab(t)}
                  className={`shrink-0 rounded-xl border px-3 py-2 text-left text-[12px] font-semibold leading-tight transition sm:text-[13px] lg:w-full lg:px-3.5 lg:py-2.5 ${
                    tab === t
                      ? "border-transparent bg-white text-black shadow-md"
                      : "border-white/10 bg-black/35 text-ju-soft hover:border-white/20 hover:bg-black/50 hover:text-white"
                  }`}
                >
                  {t}
                </button>
              ))}
            </nav>
          </aside>

          <main className="min-w-0 space-y-8">
        {tab === "Overview" ? (
          <div className="space-y-8">
            <div className="ju-admin-overview rounded-2xl border border-white/10 bg-gradient-to-br from-[#050A30]/95 via-[#0D0221]/55 to-[#02020F]/90 p-6 shadow-[0_0_48px_rgba(123,44,255,0.06)]">
              <div className="ju-admin-overview-header border-b border-white/10 pb-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-ju-pinkGlow">
                  Site structure
                </p>
                <h2 className="mt-1 text-xl font-black text-white">
                  What appears on the homepage
                </h2>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ju-muted">
                  Uncheck a block to hide it from visitors and from the main navigation (where
                  relevant). Text and prices are edited in the other tabs — this screen only
                  controls visibility.
                </p>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {SECTION_TOGGLE_META.map(({ key, title, desc }) => (
                  <label
                    key={key}
                    className="ju-admin-overview-tile flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-black/35 p-4 transition hover:border-white/20"
                  >
                    <input
                      type="checkbox"
                      className="mt-1 size-4 shrink-0 rounded border-white/25 bg-black/50 text-ju-electric focus:ring-ju-electric/40"
                      checked={content.sectionVisibility?.[key] ?? true}
                      onChange={(e) =>
                        setContent((c) => ({
                          ...c,
                          sectionVisibility: {
                            ...c.sectionVisibility,
                            [key]: e.target.checked,
                          },
                        }))
                      }
                    />
                    <span>
                      <span className="font-bold text-white">{title}</span>
                      <span className="mt-1 block text-[13px] leading-snug text-ju-muted">
                        {desc}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="ju-admin-overview-secondary rounded-xl border border-white/10 bg-black/25 p-5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-ju-yellow">
                Events area — promo banner
              </p>
              <p className="mt-1 text-sm text-ju-muted">
                Optional wide image above the party room and upcoming events. Leave empty for no
                banner.
              </p>
              <div className="mt-4">
                <AdminImageUpload
                  label="Upload promo image"
                  helper="JPEG / PNG / WebP / GIF up to 4 MB. Shown full width above Events."
                  value={content.eventsPromoImage}
                  onChange={(url) =>
                    setContent((c) => ({ ...c, eventsPromoImage: url }))
                  }
                />
              </div>
            </div>
          </div>
        ) : null}

        {tab === "General" ? (
          <div className="space-y-4">
            <AdminCollapse
              title="Logo & wordmark"
              hint="Upload your mark from your computer (same uploader as hero images). Empty = built-in gradient « JeuLumi ». Size presets keep layout balanced on phones and desktops."
              defaultOpen
            >
              <AdminImageUpload
                label="Logo image"
                helper="PNG with transparency works best. SVG via URL path is OK if you paste a path; uploads are raster (JPEG/PNG/WebP/GIF)."
                value={content.siteBranding?.logoImage ?? ""}
                onChange={(url) =>
                  setContent((c) => ({
                    ...c,
                    siteBranding: {
                      ...defaultSiteContent.siteBranding,
                      ...c.siteBranding,
                      logoImage: url,
                    },
                  }))
                }
              />
              <Loc
                label="Logo alt text (accessibility)"
                value={
                  content.siteBranding?.logoAlt ??
                  defaultSiteContent.siteBranding.logoAlt
                }
                onChange={(v) =>
                  setContent((c) => ({
                    ...c,
                    siteBranding: {
                      ...defaultSiteContent.siteBranding,
                      ...c.siteBranding,
                      logoAlt: v,
                    },
                  }))
                }
              />
              <label className="block text-xs text-ju-muted">
                Logo size (navbar + footer)
                <select
                  className="mt-1 w-full max-w-md rounded-lg border border-white/10 bg-black/50 px-2 py-2 text-sm text-white"
                  value={
                    content.siteBranding?.logoSize ??
                    defaultSiteContent.siteBranding.logoSize
                  }
                  onChange={(e) =>
                    setContent((c) => ({
                      ...c,
                      siteBranding: {
                        ...defaultSiteContent.siteBranding,
                        ...c.siteBranding,
                        logoSize: e.target.value as "sm" | "md" | "lg",
                      },
                    }))
                  }
                >
                  <option value="sm">Compact — best on small phones</option>
                  <option value="md">Balanced (recommended)</option>
                  <option value="lg">Large — more presence on desktop</option>
                </select>
              </label>
              <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-white/10 bg-black/40 px-3 py-2.5 text-xs">
                <input
                  type="checkbox"
                  className="size-4 rounded border-white/25 bg-black/50 text-ju-electric"
                  checked={
                    (content.siteBranding?.showTagline ??
                      defaultSiteContent.siteBranding.showTagline) !== false
                  }
                  onChange={(e) =>
                    setContent((c) => ({
                      ...c,
                      siteBranding: {
                        ...defaultSiteContent.siteBranding,
                        ...c.siteBranding,
                        showTagline: e.target.checked,
                      },
                    }))
                  }
                />
                <span className="font-semibold text-white">
                  Show tagline under logo (e.g. “Interactive LED Game Floor”)
                </span>
              </label>
            </AdminCollapse>

            <AdminCollapse
              title="Hero — background"
              hint="Image and optional muted loop video behind the headline."
              defaultOpen
            >
              <div className="grid gap-4 lg:grid-cols-2">
                <AdminImageUpload
                  label="Background image"
                  helper="Shown when no video is set, and as the video poster when a clip is active."
                  value={content.hero.backgroundImage ?? "/hero-background.png"}
                  onChange={(url) =>
                    setContent((c) => ({
                      ...c,
                      hero: {
                        ...c.hero,
                        backgroundImage: url.trim()
                          ? url
                          : "/hero-background.png",
                      },
                    }))
                  }
                />
                <AdminVideoUpload
                  label="Background video (optional)"
                  helper="MP4, WebM or MOV — max 80 MB. Remove to use only the image."
                  value={content.hero.backgroundVideo ?? ""}
                  onChange={(url) =>
                    setContent((c) => ({
                      ...c,
                      hero: { ...c.hero, backgroundVideo: url },
                    }))
                  }
                />
              </div>
            </AdminCollapse>

            <AdminCollapse
              title="Hero — headline"
              hint="Main title lines and subtitle under the hero."
              defaultOpen
            >
              <Loc
                label="Hero — line 1"
                value={content.hero.titleStep}
                onChange={(v) =>
                  setContent((c) => ({
                    ...c,
                    hero: { ...c.hero, titleStep: v },
                  }))
                }
              />
              <Loc
                label="Hero — line 2"
                value={content.hero.titleGame}
                onChange={(v) =>
                  setContent((c) => ({
                    ...c,
                    hero: { ...c.hero, titleGame: v },
                  }))
                }
              />
              <Loc
                label="Hero — subtitle"
                value={content.hero.subtitle}
                onChange={(v) =>
                  setContent((c) => ({
                    ...c,
                    hero: { ...c.hero, subtitle: v },
                  }))
                }
              />
            </AdminCollapse>

            <AdminCollapse
              title="Hero — badges & actions"
              hint="Pills under the subtitle, plus booking / video buttons."
              defaultOpen
            >
            <div className="rounded-xl border border-white/10 bg-black/25 p-3 sm:p-4">
              <div className="space-y-4">
                {content.hero.badges.length === 0 ? (
                  <p className="rounded-lg border border-dashed border-white/15 bg-black/20 px-3 py-4 text-center text-sm text-ju-muted">
                    No hero badges yet — click Add hero badge below.
                  </p>
                ) : null}
                {content.hero.badges.map((b, i) => (
                  <div
                    key={i}
                    className="space-y-2 rounded-xl border border-white/10 bg-black/25 p-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wide text-ju-yellow">
                        Badge {i + 1}
                      </span>
                      <div className="flex flex-wrap items-center gap-3">
                        <label className="flex cursor-pointer items-center gap-2 text-[11px] font-semibold text-ju-soft">
                          <input
                            type="checkbox"
                            className="size-3.5 rounded border-white/25 bg-black/50 text-ju-electric"
                            checked={content.hero.badgeVisible?.[i] !== false}
                            onChange={(e) =>
                              setContent((c) => {
                                const n = c.hero.badges.length;
                                const prev = [
                                  ...(c.hero.badgeVisible ?? Array(n).fill(true)),
                                ] as boolean[];
                                while (prev.length < n) prev.push(true);
                                prev[i] = e.target.checked;
                                return {
                                  ...c,
                                  hero: {
                                    ...c.hero,
                                    badgeVisible: prev.slice(0, n),
                                  },
                                };
                              })
                            }
                          />
                          Show on site
                        </label>
                        <button
                          type="button"
                          className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase text-red-300 hover:text-red-200"
                          onClick={() =>
                            setContent((c) => {
                              const badges = c.hero.badges.filter((_, j) => j !== i);
                              const vis = (c.hero.badgeVisible ?? []).filter(
                                (_, j) => j !== i,
                              );
                              const n = badges.length;
                              const badgeVisible = [...vis];
                              while (badgeVisible.length < n) badgeVisible.push(true);
                              return {
                                ...c,
                                hero: {
                                  ...c.hero,
                                  badges,
                                  badgeVisible: badgeVisible.slice(0, n),
                                },
                              };
                            })
                          }
                        >
                          <Trash2 className="size-3.5" /> Remove
                        </button>
                      </div>
                    </div>
                    <Loc
                      label="Text (EN / FR)"
                      value={b}
                      onChange={(v) =>
                        setContent((c) => {
                          const badges = [...c.hero.badges];
                          badges[i] = v;
                          return { ...c, hero: { ...c.hero, badges } };
                        })
                      }
                    />
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="mt-3 inline-flex items-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-xs font-bold uppercase"
                onClick={() =>
                  setContent((c) => {
                    const badges = [
                      ...c.hero.badges,
                      { en: "New badge", fr: "Nouvelle pastille" },
                    ];
                    const n = badges.length;
                    const prev = [...(c.hero.badgeVisible ?? [])] as boolean[];
                    while (prev.length < n) prev.push(true);
                    prev[n - 1] = true;
                    return {
                      ...c,
                      hero: {
                        ...c.hero,
                        badges,
                        badgeVisible: prev.slice(0, n),
                      },
                    };
                  })
                }
              >
                <Plus className="size-3.5" /> Add hero badge
              </button>
              <div className="mt-5 space-y-2 border-t border-white/10 pt-4">
                <p className="text-[11px] font-bold uppercase text-ju-cyanGlow">
                  Hero buttons
                </p>
                <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-white/10 bg-black/40 px-3 py-2.5 text-xs">
                  <input
                    type="checkbox"
                    className="size-4 rounded border-white/25 bg-black/50 text-ju-electric"
                    checked={content.hero.showBookCta !== false}
                    onChange={(e) =>
                      setContent((c) => ({
                        ...c,
                        hero: { ...c.hero, showBookCta: e.target.checked },
                      }))
                    }
                  />
                  <span className="font-semibold text-white">
                    Book your experience (reservation CTA)
                  </span>
                </label>
                <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-white/10 bg-black/40 px-3 py-2.5 text-xs">
                  <input
                    type="checkbox"
                    className="size-4 rounded border-white/25 bg-black/50 text-ju-electric"
                    checked={content.hero.showWatchVideoCta !== false}
                    onChange={(e) =>
                      setContent((c) => ({
                        ...c,
                        hero: { ...c.hero, showWatchVideoCta: e.target.checked },
                      }))
                    }
                  />
                  <span className="font-semibold text-white">Watch video button</span>
                </label>
              </div>
            </div>
            </AdminCollapse>

            <AdminCollapse
              title="Reservation notice"
              hint="Short message in the bar under the navigation."
              defaultOpen={false}
            >
              <Loc
                label="Reservation banner"
                value={content.reservationBanner}
                onChange={(v) =>
                  setContent((c) => ({ ...c, reservationBanner: v }))
                }
              />
            </AdminCollapse>

            <AdminCollapse
              title="Intro (experience block)"
              hint="Sparkle, headline, and paragraphs above the gallery."
              defaultOpen={false}
            >
            <Loc
              label="Intro sparkle"
              value={content.intro.sparkle}
              onChange={(v) =>
                setContent((c) => ({
                  ...c,
                  intro: { ...c.intro, sparkle: v },
                }))
              }
            />
            <Loc
              label="Intro headline"
              value={content.intro.headline}
              onChange={(v) =>
                setContent((c) => ({
                  ...c,
                  intro: { ...c.intro, headline: v },
                }))
              }
            />
            {content.intro.paragraphs.map((p, i) => (
              <Loc
                key={i}
                label={`Intro paragraph ${i + 1}`}
                value={p}
                onChange={(v) =>
                  setContent((c) => {
                    const paragraphs = [...c.intro.paragraphs];
                    paragraphs[i] = v;
                    return { ...c, intro: { ...c.intro, paragraphs } };
                  })
                }
              />
            ))}
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-xs font-bold uppercase"
              onClick={() =>
                setContent((c) => ({
                  ...c,
                  intro: {
                    ...c.intro,
                    paragraphs: [
                      ...c.intro.paragraphs,
                      { en: "", fr: "" },
                    ],
                  },
                }))
              }
            >
              <Plus className="size-3.5" /> Add intro paragraph
            </button>
            </AdminCollapse>

            <AdminCollapse
              title="How it works"
              hint="Title, intro text, bullet list, and closing line."
              defaultOpen={false}
            >
            <Loc
              label="How it works — title"
              value={content.howItWorks.title}
              onChange={(v) =>
                setContent((c) => ({
                  ...c,
                  howItWorks: { ...c.howItWorks, title: v },
                }))
              }
            />
            <Loc
              label="How it works — intro"
              value={content.howItWorks.intro}
              onChange={(v) =>
                setContent((c) => ({
                  ...c,
                  howItWorks: { ...c.howItWorks, intro: v },
                }))
              }
            />
            {content.howItWorks.bullets.map((b, i) => (
              <Loc
                key={i}
                label={`Bullet ${i + 1}`}
                value={b}
                onChange={(v) =>
                  setContent((c) => {
                    const bullets = [...c.howItWorks.bullets];
                    bullets[i] = v;
                    return {
                      ...c,
                      howItWorks: { ...c.howItWorks, bullets },
                    };
                  })
                }
              />
            ))}
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-xs font-bold uppercase"
              onClick={() =>
                setContent((c) => ({
                  ...c,
                  howItWorks: {
                    ...c.howItWorks,
                    bullets: [...c.howItWorks.bullets, { en: "", fr: "" }],
                  },
                }))
              }
            >
              <Plus className="size-3.5" /> Add bullet
            </button>
            <Loc
              label="How it works — closing"
              value={content.howItWorks.closing}
              onChange={(v) =>
                setContent((c) => ({
                  ...c,
                  howItWorks: { ...c.howItWorks, closing: v },
                }))
              }
            />
            </AdminCollapse>

            <AdminCollapse
              title="Section headers & footer"
              hint="Game modes and pricing section titles, plus site footer tagline."
              defaultOpen={false}
            >
            <Loc
              label="Game modes intro — sparkle"
              value={content.gameModesIntro.sparkle}
              onChange={(v) =>
                setContent((c) => ({
                  ...c,
                  gameModesIntro: { ...c.gameModesIntro, sparkle: v },
                }))
              }
            />
            <Loc
              label="Game modes intro — body"
              value={content.gameModesIntro.title}
              onChange={(v) =>
                setContent((c) => ({
                  ...c,
                  gameModesIntro: { ...c.gameModesIntro, title: v },
                }))
              }
            />
            <Loc
              label="Pricing sparkle"
              value={content.pricing.sparkle}
              onChange={(v) =>
                setContent((c) => ({
                  ...c,
                  pricing: { ...c.pricing, sparkle: v },
                }))
              }
            />
            <Loc
              label="Pricing title"
              value={content.pricing.title}
              onChange={(v) =>
                setContent((c) => ({
                  ...c,
                  pricing: { ...c.pricing, title: v },
                }))
              }
            />
            <Loc
              label="Footer tagline"
              value={content.footerTagline}
              onChange={(v) => setContent((c) => ({ ...c, footerTagline: v }))}
            />
            </AdminCollapse>
          </div>
        ) : null}

        {tab === "Gallery" ? (
          <div className="space-y-6">
            {content.gallery.map((g, i) => (
              <div
                key={i}
                className="space-y-3 rounded-xl border border-white/10 bg-black/25 p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-xs font-bold uppercase text-ju-yellow">
                    Gallery item {i + 1}
                  </p>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 text-xs text-red-300 hover:text-red-200"
                    onClick={() =>
                      setContent((c) => ({
                        ...c,
                        gallery: c.gallery.filter((_, j) => j !== i),
                      }))
                    }
                  >
                    <Trash2 className="size-3.5" /> Remove
                  </button>
                </div>
                <AdminImageUpload
                  label="Photo"
                  helper="Upload from your computer. You can also paste a CDN link in “Paste URL”."
                  value={g.image}
                  onChange={(url) =>
                    setContent((c) => {
                      const gallery = [...c.gallery];
                      gallery[i] = { ...gallery[i], image: url };
                      return { ...c, gallery };
                    })
                  }
                />
                <details className="rounded-lg border border-white/10 bg-black/25 px-3 py-2">
                  <summary className="cursor-pointer text-[11px] font-semibold uppercase tracking-wide text-ju-muted">
                    Paste image URL instead
                  </summary>
                  <label className="mt-2 block text-xs text-ju-muted">
                    Path or external URL
                    <input
                      className="mt-1 w-full rounded-lg border border-white/10 bg-black/50 px-2 py-2 text-sm text-white"
                      value={g.image}
                      onChange={(e) =>
                        setContent((c) => {
                          const gallery = [...c.gallery];
                          gallery[i] = {
                            ...gallery[i],
                            image: e.target.value,
                          };
                          return { ...c, gallery };
                        })
                      }
                    />
                  </label>
                </details>
                <Loc
                  label="Alt text"
                  value={g.alt}
                  onChange={(v) =>
                    setContent((c) => {
                      const gallery = [...c.gallery];
                      gallery[i] = { ...gallery[i], alt: v };
                      return { ...c, gallery };
                    })
                  }
                />
                <Loc
                  label="Caption (optional)"
                  value={g.caption ?? { en: "", fr: "" }}
                  onChange={(v) =>
                    setContent((c) => {
                      const gallery = [...c.gallery];
                      gallery[i] = { ...gallery[i], caption: v };
                      return { ...c, gallery };
                    })
                  }
                />
              </div>
            ))}
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-xs font-bold uppercase"
              onClick={() =>
                setContent((c) => ({
                  ...c,
                  gallery: [
                    ...c.gallery,
                    {
                      image: "/hero-background.png",
                      alt: { en: "", fr: "" },
                      caption: { en: "", fr: "" },
                    },
                  ],
                }))
              }
            >
              <Plus className="size-3.5" /> Add gallery item
            </button>
          </div>
        ) : null}

        {tab === "Game modes" ? (
          <div className="space-y-6">
            {content.gameModes.map((m, idx) => (
              <ModeCard
                key={m.id}
                mode={m}
                onChange={(next) =>
                  setContent((c) => {
                    const gameModes = [...c.gameModes];
                    gameModes[idx] = next;
                    return { ...c, gameModes };
                  })
                }
                onRemove={() =>
                  setContent((c) => ({
                    ...c,
                    gameModes: c.gameModes.filter((_, i) => i !== idx),
                  }))
                }
              />
            ))}
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-xs font-bold uppercase"
              onClick={() =>
                setContent((c) => ({
                  ...c,
                  gameModes: [
                    ...c.gameModes,
                    {
                      id: crypto.randomUUID(),
                      name: { en: "New mode", fr: "Nouveau mode" },
                      tagline: { en: "", fr: "" },
                      lead: { en: "", fr: "" },
                      description: { en: "", fr: "" },
                      image: "/hero-background.png",
                    },
                  ],
                }))
              }
            >
              <Plus className="size-3.5" /> Add game mode
            </button>
          </div>
        ) : null}

        {tab === "Pricing" ? (
          <div className="space-y-6">
            {content.pricingTiers.map((tier, idx) => (
              <TierCard
                key={tier.id}
                tier={tier}
                onChange={(next) =>
                  setContent((c) => {
                    const pricingTiers = [...c.pricingTiers];
                    pricingTiers[idx] = next;
                    return { ...c, pricingTiers };
                  })
                }
                onRemove={() =>
                  setContent((c) => ({
                    ...c,
                    pricingTiers: c.pricingTiers.filter((_, i) => i !== idx),
                  }))
                }
              />
            ))}
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-xs font-bold uppercase"
              onClick={() =>
                setContent((c) => ({
                  ...c,
                  pricingTiers: [
                    ...c.pricingTiers,
                    {
                      id: crypto.randomUUID(),
                      title: { en: "Tier", fr: "Forfait" },
                      players: { en: "", fr: "" },
                      price: "$0",
                      priceNote: { en: "/player + taxes", fr: "/pers. + taxes" },
                      extras: [
                        { en: "60 Minutes", fr: "60 minutes" },
                        {
                          en: "Staff-guided session",
                          fr: "Séance encadrée",
                        },
                      ],
                      cta: { en: "Book Now", fr: "Réserver" },
                      featured: false,
                    },
                  ],
                }))
              }
            >
              <Plus className="size-3.5" /> Add pricing tier
            </button>
          </div>
        ) : null}

        {tab === "Events" ? (
          <div className="space-y-6">
            {content.eventsList.map((ev, idx) => (
              <div
                key={ev.id}
                className="space-y-3 rounded-xl border border-white/10 bg-black/25 p-4"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-bold uppercase text-ju-yellow">
                    Event {idx + 1}
                  </p>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 text-xs text-red-300"
                    onClick={() =>
                      setContent((c) => ({
                        ...c,
                        eventsList: c.eventsList.filter((_, i) => i !== idx),
                      }))
                    }
                  >
                    <Trash2 className="size-3.5" /> Remove
                  </button>
                </div>
                <Loc
                  label="Title"
                  value={ev.title}
                  onChange={(v) =>
                    setContent((c) => {
                      const eventsList = [...c.eventsList];
                      eventsList[idx] = { ...eventsList[idx], title: v };
                      return { ...c, eventsList };
                    })
                  }
                />
                <Loc
                  label="Date label"
                  value={ev.dateLabel}
                  onChange={(v) =>
                    setContent((c) => {
                      const eventsList = [...c.eventsList];
                      eventsList[idx] = { ...eventsList[idx], dateLabel: v };
                      return { ...c, eventsList };
                    })
                  }
                />
                <AdminImageUpload
                  label="Event photo (optional)"
                  helper="Shown on the public site next to the title and description."
                  value={ev.image ?? ""}
                  onChange={(url) =>
                    setContent((c) => {
                      const eventsList = [...c.eventsList];
                      eventsList[idx] = {
                        ...eventsList[idx],
                        image: url || undefined,
                      };
                      return { ...c, eventsList };
                    })
                  }
                />
                <div className="ju-admin-inset rounded-xl border border-white/10 bg-black/30 p-3">
                  <p className="text-[11px] font-bold uppercase text-ju-cyanGlow">
                    Description
                  </p>
                  <div className="mt-2 grid gap-2 md:grid-cols-2">
                    <label className="block text-xs text-ju-muted">
                      EN
                      <textarea
                        className="mt-1 min-h-[80px] w-full rounded-lg border border-white/10 bg-black/50 px-2 py-2 text-sm"
                        value={ev.description.en}
                        onChange={(e) =>
                          setContent((c) => {
                            const eventsList = [...c.eventsList];
                            eventsList[idx] = {
                              ...eventsList[idx],
                              description: {
                                ...eventsList[idx].description,
                                en: e.target.value,
                              },
                            };
                            return { ...c, eventsList };
                          })
                        }
                      />
                    </label>
                    <label className="block text-xs text-ju-muted">
                      FR
                      <textarea
                        className="mt-1 min-h-[80px] w-full rounded-lg border border-white/10 bg-black/50 px-2 py-2 text-sm"
                        value={ev.description.fr}
                        onChange={(e) =>
                          setContent((c) => {
                            const eventsList = [...c.eventsList];
                            eventsList[idx] = {
                              ...eventsList[idx],
                              description: {
                                ...eventsList[idx].description,
                                fr: e.target.value,
                              },
                            };
                            return { ...c, eventsList };
                          })
                        }
                      />
                    </label>
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-xs font-bold uppercase"
              onClick={() =>
                setContent((c) => ({
                  ...c,
                  eventsList: [
                    ...c.eventsList,
                    {
                      id: crypto.randomUUID(),
                      title: { en: "New event", fr: "Nouvel événement" },
                      dateLabel: { en: "TBA", fr: "À confirmer" },
                      description: { en: "", fr: "" },
                    },
                  ],
                }))
              }
            >
              <Plus className="size-3.5" /> Add upcoming event
            </button>
          </div>
        ) : null}

        {tab === "Party room" ? (
          <div className="space-y-6">
            <Loc
              label="Section sparkle"
              value={content.eventsParty.sparkle}
              onChange={(v) =>
                setContent((c) => ({
                  ...c,
                  eventsParty: { ...c.eventsParty, sparkle: v },
                }))
              }
            />
            <Loc
              label="Title"
              value={content.eventsParty.title}
              onChange={(v) =>
                setContent((c) => ({
                  ...c,
                  eventsParty: { ...c.eventsParty, title: v },
                }))
              }
            />
            <div className="ju-admin-inset rounded-xl border border-white/10 bg-black/30 p-3">
              <p className="text-[11px] font-bold uppercase text-ju-cyanGlow">
                Price / policy copy
              </p>
              <div className="mt-2 grid gap-2 md:grid-cols-2">
                <label className="block text-xs text-ju-muted">
                  EN
                  <textarea
                    className="mt-1 min-h-[100px] w-full rounded-lg border border-white/10 bg-black/50 px-2 py-2 text-sm"
                    value={content.eventsParty.priceLine.en}
                    onChange={(e) =>
                      setContent((c) => ({
                        ...c,
                        eventsParty: {
                          ...c.eventsParty,
                          priceLine: {
                            ...c.eventsParty.priceLine,
                            en: e.target.value,
                          },
                        },
                      }))
                    }
                  />
                </label>
                <label className="block text-xs text-ju-muted">
                  FR
                  <textarea
                    className="mt-1 min-h-[100px] w-full rounded-lg border border-white/10 bg-black/50 px-2 py-2 text-sm"
                    value={content.eventsParty.priceLine.fr}
                    onChange={(e) =>
                      setContent((c) => ({
                        ...c,
                        eventsParty: {
                          ...c.eventsParty,
                          priceLine: {
                            ...c.eventsParty.priceLine,
                            fr: e.target.value,
                          },
                        },
                      }))
                    }
                  />
                </label>
              </div>
            </div>
            <Loc
              label="Ideal for — section title"
              value={content.eventsParty.idealTitle}
              onChange={(v) =>
                setContent((c) => ({
                  ...c,
                  eventsParty: { ...c.eventsParty, idealTitle: v },
                }))
              }
            />
            {content.eventsParty.idealFor.map((line, i) => (
              <Loc
                key={i}
                label={`Ideal for item ${i + 1}`}
                value={line}
                onChange={(v) =>
                  setContent((c) => {
                    const idealFor = [...c.eventsParty.idealFor];
                    idealFor[i] = v;
                    return {
                      ...c,
                      eventsParty: { ...c.eventsParty, idealFor },
                    };
                  })
                }
              />
            ))}
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-xs font-bold uppercase"
              onClick={() =>
                setContent((c) => ({
                  ...c,
                  eventsParty: {
                    ...c.eventsParty,
                    idealFor: [...c.eventsParty.idealFor, { en: "", fr: "" }],
                  },
                }))
              }
            >
              <Plus className="size-3.5" /> Add ideal-for bullet
            </button>
            <Loc
              label="Space details title"
              value={content.eventsParty.spaceTitle}
              onChange={(v) =>
                setContent((c) => ({
                  ...c,
                  eventsParty: { ...c.eventsParty, spaceTitle: v },
                }))
              }
            />
            {content.eventsParty.spaceDetails.map((row, i) => (
              <SpaceEditor
                key={i}
                row={row}
                onChange={(next) =>
                  setContent((c) => {
                    const spaceDetails = [...c.eventsParty.spaceDetails];
                    spaceDetails[i] = next;
                    return {
                      ...c,
                      eventsParty: { ...c.eventsParty, spaceDetails },
                    };
                  })
                }
                onRemove={() =>
                  setContent((c) => ({
                    ...c,
                    eventsParty: {
                      ...c.eventsParty,
                      spaceDetails: c.eventsParty.spaceDetails.filter(
                        (_, j) => j !== i,
                      ),
                    },
                  }))
                }
              />
            ))}
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-xs font-bold uppercase"
              onClick={() =>
                setContent((c) => ({
                  ...c,
                  eventsParty: {
                    ...c.eventsParty,
                    spaceDetails: [
                      ...c.eventsParty.spaceDetails,
                      {
                        icon: "chair",
                        title: { en: "", fr: "" },
                        body: { en: "", fr: "" },
                      },
                    ],
                  },
                }))
              }
            >
              <Plus className="size-3.5" /> Add space detail
            </button>
            <Loc
              label="CTA button"
              value={content.eventsParty.cta}
              onChange={(v) =>
                setContent((c) => ({
                  ...c,
                  eventsParty: { ...c.eventsParty, cta: v },
                }))
              }
            />
          </div>
        ) : null}

        {tab === "Contact" ? (
          <div className="space-y-6">
            <Loc
              label="Sparkle"
              value={content.contact.sparkle}
              onChange={(v) =>
                setContent((c) => ({
                  ...c,
                  contact: { ...c.contact, sparkle: v },
                }))
              }
            />
            <Loc
              label="Title"
              value={content.contact.title}
              onChange={(v) =>
                setContent((c) => ({
                  ...c,
                  contact: { ...c.contact, title: v },
                }))
              }
            />
            <label className="block text-xs text-ju-muted">
              Phone
              <input
                className="mt-1 w-full rounded-lg border border-white/10 bg-black/50 px-2 py-2 text-sm"
                value={content.contact.phone}
                onChange={(e) =>
                  setContent((c) => ({
                    ...c,
                    contact: { ...c.contact, phone: e.target.value },
                  }))
                }
              />
            </label>
            <label className="block text-xs text-ju-muted">
              Email
              <input
                className="mt-1 w-full rounded-lg border border-white/10 bg-black/50 px-2 py-2 text-sm"
                value={content.contact.email}
                onChange={(e) =>
                  setContent((c) => ({
                    ...c,
                    contact: { ...c.contact, email: e.target.value },
                  }))
                }
              />
            </label>
            <Loc
              label="Address"
              value={content.contact.address}
              onChange={(v) =>
                setContent((c) => ({
                  ...c,
                  contact: { ...c.contact, address: v },
                }))
              }
            />
            <Loc
              label="Hours title"
              value={content.contact.hoursTitle}
              onChange={(v) =>
                setContent((c) => ({
                  ...c,
                  contact: { ...c.contact, hoursTitle: v },
                }))
              }
            />
            <Loc
              label="Hours — reservation tag"
              value={content.contact.hoursReservation}
              onChange={(v) =>
                setContent((c) => ({
                  ...c,
                  contact: { ...c.contact, hoursReservation: v },
                }))
              }
            />
            <div className="ju-admin-inset rounded-xl border border-white/10 bg-black/30 p-3">
              <p className="text-[11px] font-bold uppercase text-ju-cyanGlow">
                Hours explainer
              </p>
              <div className="mt-2 grid gap-2 md:grid-cols-2">
                <label className="block text-xs text-ju-muted">
                  EN
                  <textarea
                    className="mt-1 min-h-[80px] w-full rounded-lg border border-white/10 bg-black/50 px-2 py-2 text-sm"
                    value={content.contact.hoursExplainer.en}
                    onChange={(e) =>
                      setContent((c) => ({
                        ...c,
                        contact: {
                          ...c.contact,
                          hoursExplainer: {
                            ...c.contact.hoursExplainer,
                            en: e.target.value,
                          },
                        },
                      }))
                    }
                  />
                </label>
                <label className="block text-xs text-ju-muted">
                  FR
                  <textarea
                    className="mt-1 min-h-[80px] w-full rounded-lg border border-white/10 bg-black/50 px-2 py-2 text-sm"
                    value={content.contact.hoursExplainer.fr}
                    onChange={(e) =>
                      setContent((c) => ({
                        ...c,
                        contact: {
                          ...c.contact,
                          hoursExplainer: {
                            ...c.contact.hoursExplainer,
                            fr: e.target.value,
                          },
                        },
                      }))
                    }
                  />
                </label>
              </div>
            </div>
            <Loc
              label="Map label"
              value={content.contact.mapLabel}
              onChange={(v) =>
                setContent((c) => ({
                  ...c,
                  contact: { ...c.contact, mapLabel: v },
                }))
              }
            />
            <label className="block text-xs text-ju-muted">
              Google Maps embed URL
              <input
                className="mt-1 w-full rounded-lg border border-white/10 bg-black/50 px-2 py-2 text-sm"
                value={content.contact.mapEmbedUrl}
                onChange={(e) =>
                  setContent((c) => ({
                    ...c,
                    contact: {
                      ...c.contact,
                      mapEmbedUrl: e.target.value,
                    },
                  }))
                }
              />
            </label>
            <p className="text-[11px] font-bold uppercase text-ju-yellow">
              Weekly schedule
            </p>
            {content.contact.schedule.map((row, i) => (
              <div key={i} className="grid gap-2 md:grid-cols-2">
                <Loc
                  label={`Row ${i + 1} — days`}
                  value={row.days}
                  onChange={(v) =>
                    setContent((c) => {
                      const schedule = [...c.contact.schedule];
                      schedule[i] = { ...schedule[i], days: v };
                      return { ...c, contact: { ...c.contact, schedule } };
                    })
                  }
                />
                <Loc
                  label={`Row ${i + 1} — hours`}
                  value={row.hours}
                  onChange={(v) =>
                    setContent((c) => {
                      const schedule = [...c.contact.schedule];
                      schedule[i] = { ...schedule[i], hours: v };
                      return { ...c, contact: { ...c.contact, schedule } };
                    })
                  }
                />
              </div>
            ))}
          </div>
        ) : null}

        {tab === "Reviews" ? (
          <div className="space-y-6">
            <AdminCollapse
              title="Hero — Google Maps summary card"
              hint="Top-right on the hero: score, stacked initials, and stars. Hide it here without turning off the whole hero (see Overview → Hero for that)."
              defaultOpen
            >
              <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-white/10 bg-black/40 px-3 py-2.5 text-xs">
                <input
                  type="checkbox"
                  className="size-4 rounded border-white/25 bg-black/50 text-ju-electric"
                  checked={
                    (
                      content.hero.googleMapsSummary ??
                      defaultSiteContent.hero.googleMapsSummary
                    ).visible !== false
                  }
                  onChange={(e) =>
                    setContent((c) => {
                      const prev =
                        c.hero.googleMapsSummary ??
                        defaultSiteContent.hero.googleMapsSummary;
                      return {
                        ...c,
                        hero: {
                          ...c.hero,
                          googleMapsSummary: {
                            ...prev,
                            visible: e.target.checked,
                          },
                        },
                      };
                    })
                  }
                />
                <span className="font-semibold text-white">
                  Show Google Maps summary card on hero
                </span>
              </label>
              <label className="block text-xs text-ju-muted">
                Score text (e.g. 5.0/5)
                <input
                  className="mt-1 w-full max-w-md rounded-lg border border-white/10 bg-black/50 px-2 py-2 text-sm text-white"
                  value={
                    (
                      content.hero.googleMapsSummary ??
                      defaultSiteContent.hero.googleMapsSummary
                    ).scoreText
                  }
                  onChange={(e) =>
                    setContent((c) => {
                      const prev =
                        c.hero.googleMapsSummary ??
                        defaultSiteContent.hero.googleMapsSummary;
                      return {
                        ...c,
                        hero: {
                          ...c.hero,
                          googleMapsSummary: {
                            ...prev,
                            scoreText: e.target.value,
                          },
                        },
                      };
                    })
                  }
                />
              </label>
              <Loc
                label="Maps label (after score)"
                value={
                  (
                    content.hero.googleMapsSummary ??
                    defaultSiteContent.hero.googleMapsSummary
                  ).mapsLabel
                }
                onChange={(v) =>
                  setContent((c) => {
                    const prev =
                      c.hero.googleMapsSummary ??
                      defaultSiteContent.hero.googleMapsSummary;
                    return {
                      ...c,
                      hero: {
                        ...c.hero,
                        googleMapsSummary: { ...prev, mapsLabel: v },
                      },
                    };
                  })
                }
              />
              <Loc
                label="Location line"
                value={
                  (
                    content.hero.googleMapsSummary ??
                    defaultSiteContent.hero.googleMapsSummary
                  ).locationLine
                }
                onChange={(v) =>
                  setContent((c) => {
                    const prev =
                      c.hero.googleMapsSummary ??
                      defaultSiteContent.hero.googleMapsSummary;
                    return {
                      ...c,
                      hero: {
                        ...c.hero,
                        googleMapsSummary: { ...prev, locationLine: v },
                      },
                    };
                  })
                }
              />
              <p className="text-[11px] font-bold uppercase text-ju-cyanGlow">
                Stacked avatars (initials)
              </p>
              <p className="text-xs text-ju-muted">
                Up to ~5 recommended. Colors cycle automatically (cyan / magenta / pink).
              </p>
              <div className="space-y-3">
                {(
                  content.hero.googleMapsSummary ??
                  defaultSiteContent.hero.googleMapsSummary
                ).avatars.map((a, idx) => (
                  <div
                    key={a.id}
                    className="flex flex-wrap items-end gap-3 rounded-xl border border-white/10 bg-black/25 p-3"
                  >
                    <span className="text-[11px] font-bold uppercase text-ju-yellow">
                      #{idx + 1}
                    </span>
                    <label className="block text-xs text-ju-muted">
                      Initials (2 letters)
                      <input
                        className="mt-1 w-20 rounded-lg border border-white/10 bg-black/50 px-2 py-2 text-sm text-white uppercase"
                        value={a.initials}
                        maxLength={4}
                        onChange={(e) =>
                          setContent((c) => {
                            const prev =
                              c.hero.googleMapsSummary ??
                              defaultSiteContent.hero.googleMapsSummary;
                            const avatars = [...prev.avatars];
                            avatars[idx] = {
                              ...avatars[idx],
                              initials: e.target.value.toUpperCase(),
                            };
                            return {
                              ...c,
                              hero: {
                                ...c.hero,
                                googleMapsSummary: { ...prev, avatars },
                              },
                            };
                          })
                        }
                      />
                    </label>
                    <label className="min-w-[12rem] flex-1 text-xs text-ju-muted">
                      Full name (tooltip)
                      <input
                        className="mt-1 w-full rounded-lg border border-white/10 bg-black/50 px-2 py-2 text-sm text-white"
                        value={a.displayName}
                        onChange={(e) =>
                          setContent((c) => {
                            const prev =
                              c.hero.googleMapsSummary ??
                              defaultSiteContent.hero.googleMapsSummary;
                            const avatars = [...prev.avatars];
                            avatars[idx] = {
                              ...avatars[idx],
                              displayName: e.target.value,
                            };
                            return {
                              ...c,
                              hero: {
                                ...c.hero,
                                googleMapsSummary: { ...prev, avatars },
                              },
                            };
                          })
                        }
                      />
                    </label>
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase text-red-300 hover:text-red-200"
                      onClick={() =>
                        setContent((c) => {
                          const prev =
                            c.hero.googleMapsSummary ??
                            defaultSiteContent.hero.googleMapsSummary;
                          return {
                            ...c,
                            hero: {
                              ...c.hero,
                              googleMapsSummary: {
                                ...prev,
                                avatars: prev.avatars.filter((x) => x.id !== a.id),
                              },
                            },
                          };
                        })
                      }
                    >
                      <Trash2 className="size-3.5" /> Remove
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-xs font-bold uppercase"
                onClick={() =>
                  setContent((c) => {
                    const prev =
                      c.hero.googleMapsSummary ??
                      defaultSiteContent.hero.googleMapsSummary;
                    return {
                      ...c,
                      hero: {
                        ...c.hero,
                        googleMapsSummary: {
                          ...prev,
                          avatars: [
                            ...prev.avatars,
                            {
                              id: crypto.randomUUID(),
                              initials: "??",
                              displayName: "New reviewer",
                            },
                          ],
                        },
                      },
                    };
                  })
                }
              >
                <Plus className="size-3.5" /> Add avatar
              </button>
            </AdminCollapse>

            <AdminCollapse
              title="Homepage — review cards (right column)"
              hint="Shown when Overview → Reviews is enabled. Same people can appear here and on the hero card, or not — you control each list."
              defaultOpen
            >
              {(content.testimonialReviews ?? []).map((item, idx) => (
                <div
                  key={item.id}
                  className="ju-admin-surface mb-4 space-y-4 rounded-2xl border border-white/10 bg-[#07051a]/80 p-4 sm:p-5 transition-shadow duration-300"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-xs font-bold uppercase text-ju-cyanGlow">
                      Review {idx + 1}
                    </p>
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 text-xs font-semibold uppercase text-red-300 hover:text-red-200"
                      onClick={() =>
                        setContent((c) => ({
                          ...c,
                          testimonialReviews: (c.testimonialReviews ?? []).filter(
                            (x) => x.id !== item.id,
                          ),
                        }))
                      }
                    >
                      <Trash2 className="size-3.5" /> Delete
                    </button>
                  </div>
                  <Loc
                    label="Reviewer name"
                    value={item.name}
                    onChange={(v) =>
                      setContent((c) => {
                        const testimonialReviews = [...(c.testimonialReviews ?? [])];
                        testimonialReviews[idx] = { ...testimonialReviews[idx], name: v };
                        return { ...c, testimonialReviews };
                      })
                    }
                  />
                  <Loc
                    label="Meta line (e.g. Local Guide · 65 reviews)"
                    value={item.meta}
                    onChange={(v) =>
                      setContent((c) => {
                        const testimonialReviews = [...(c.testimonialReviews ?? [])];
                        testimonialReviews[idx] = { ...testimonialReviews[idx], meta: v };
                        return { ...c, testimonialReviews };
                      })
                    }
                  />
                  <Loc
                    label="Date / recency (e.g. 2 weeks ago)"
                    value={item.when}
                    onChange={(v) =>
                      setContent((c) => {
                        const testimonialReviews = [...(c.testimonialReviews ?? [])];
                        testimonialReviews[idx] = { ...testimonialReviews[idx], when: v };
                        return { ...c, testimonialReviews };
                      })
                    }
                  />
                  <div className="ju-admin-inset rounded-xl border border-white/10 bg-black/30 p-3">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-ju-cyanGlow">
                      Quote
                    </p>
                    <div className="mt-2 grid gap-2 md:grid-cols-2">
                      <label className="block text-xs text-ju-muted">
                        EN
                        <textarea
                          className="mt-1 min-h-[100px] w-full rounded-lg border border-white/10 bg-black/50 px-2 py-2 text-sm text-white"
                          value={item.quote.en}
                          onChange={(e) =>
                            setContent((c) => {
                              const testimonialReviews = [...(c.testimonialReviews ?? [])];
                              testimonialReviews[idx] = {
                                ...testimonialReviews[idx],
                                quote: {
                                  ...testimonialReviews[idx].quote,
                                  en: e.target.value,
                                },
                              };
                              return { ...c, testimonialReviews };
                            })
                          }
                        />
                      </label>
                      <label className="block text-xs text-ju-muted">
                        FR
                        <textarea
                          className="mt-1 min-h-[100px] w-full rounded-lg border border-white/10 bg-black/50 px-2 py-2 text-sm text-white"
                          value={item.quote.fr}
                          onChange={(e) =>
                            setContent((c) => {
                              const testimonialReviews = [...(c.testimonialReviews ?? [])];
                              testimonialReviews[idx] = {
                                ...testimonialReviews[idx],
                                quote: {
                                  ...testimonialReviews[idx].quote,
                                  fr: e.target.value,
                                },
                              };
                              return { ...c, testimonialReviews };
                            })
                          }
                        />
                      </label>
                    </div>
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-xs font-bold uppercase"
                onClick={() =>
                  setContent((c) => ({
                    ...c,
                    testimonialReviews: [
                      ...(c.testimonialReviews ?? []),
                      {
                        id: crypto.randomUUID(),
                        name: { en: "Name", fr: "Nom" },
                        meta: { en: "", fr: "" },
                        when: { en: "", fr: "" },
                        quote: { en: "", fr: "" },
                      } satisfies TestimonialReview,
                    ],
                  }))
                }
              >
                <Plus className="size-3.5" /> Add review
              </button>
            </AdminCollapse>
          </div>
        ) : null}

        {tab === "FAQ" ? (
          <div className="space-y-6">
            <div className="rounded-xl border border-white/10 bg-black/25 p-4 sm:p-5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-ju-yellow">
                FAQ — floating assistant
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ju-muted">
                These questions appear as chips in the jeuLumi FAQ chat (bottom-right on the
                public site). Each entry has English and French text. Save to apply on the live
                site.
              </p>
            </div>
            {(content.faqItems ?? []).map((item, idx) => (
              <div
                key={item.id}
                className="ju-admin-surface space-y-4 rounded-2xl border border-white/10 bg-[#07051a]/80 p-4 sm:p-5 transition-shadow duration-300"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-xs font-bold uppercase text-ju-cyanGlow">
                    Question {idx + 1}
                  </p>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 text-xs font-semibold uppercase text-red-300 hover:text-red-200"
                    onClick={() =>
                      setContent((c) => ({
                        ...c,
                        faqItems: (c.faqItems ?? []).filter((x) => x.id !== item.id),
                      }))
                    }
                  >
                    <Trash2 className="size-3.5" /> Delete
                  </button>
                </div>
                <Loc
                  label="Question (visitor sees this on the chip)"
                  value={item.question}
                  onChange={(v) =>
                    setContent((c) => {
                      const faqItems = [...(c.faqItems ?? [])];
                      faqItems[idx] = { ...faqItems[idx], question: v };
                      return { ...c, faqItems };
                    })
                  }
                />
                <div className="ju-admin-inset rounded-xl border border-white/10 bg-black/30 p-3">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-ju-cyanGlow">
                    Answer
                  </p>
                  <div className="mt-2 grid gap-2 md:grid-cols-2">
                    <label className="block text-xs text-ju-muted">
                      EN
                      <textarea
                        className="mt-1 min-h-[100px] w-full rounded-lg border border-white/10 bg-black/50 px-2 py-2 text-sm text-white"
                        value={item.answer.en}
                        onChange={(e) =>
                          setContent((c) => {
                            const faqItems = [...(c.faqItems ?? [])];
                            faqItems[idx] = {
                              ...faqItems[idx],
                              answer: {
                                ...faqItems[idx].answer,
                                en: e.target.value,
                              },
                            };
                            return { ...c, faqItems };
                          })
                        }
                      />
                    </label>
                    <label className="block text-xs text-ju-muted">
                      FR
                      <textarea
                        className="mt-1 min-h-[100px] w-full rounded-lg border border-white/10 bg-black/50 px-2 py-2 text-sm text-white"
                        value={item.answer.fr}
                        onChange={(e) =>
                          setContent((c) => {
                            const faqItems = [...(c.faqItems ?? [])];
                            faqItems[idx] = {
                              ...faqItems[idx],
                              answer: {
                                ...faqItems[idx].answer,
                                fr: e.target.value,
                              },
                            };
                            return { ...c, faqItems };
                          })
                        }
                      />
                    </label>
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-xs font-bold uppercase"
              onClick={() =>
                setContent((c) => ({
                  ...c,
                  faqItems: [
                    ...(c.faqItems ?? []),
                    {
                      id: crypto.randomUUID(),
                      question: {
                        en: "New question",
                        fr: "Nouvelle question",
                      },
                      answer: { en: "", fr: "" },
                    } satisfies FaqItem,
                  ],
                }))
              }
            >
              <Plus className="size-3.5" /> Add FAQ entry
            </button>
          </div>
        ) : null}

        {tab === "Security" ? <AdminPasswordSection /> : null}
          </main>
        </div>
      </div>
    </div>
  );
}

function AdminPasswordSection() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    if (next !== confirm) {
      setMsg("New password and confirmation do not match.");
      return;
    }
    setBusy(true);
    const res = await fetch("/api/admin/password", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword: current, newPassword: next }),
    });
    const data = (await res.json().catch(() => ({}))) as {
      error?: string;
      hint?: string;
    };
    setBusy(false);
    if (!res.ok) {
      setMsg(data.error ?? "Update failed.");
      return;
    }
    setCurrent("");
    setNext("");
    setConfirm("");
    setMsg(
      data.hint
        ? `Password updated. ${data.hint}`
        : "Password updated. Use the new password the next time you sign in.",
    );
  }

  return (
    <div className="space-y-6">
      <div className="ju-admin-overview rounded-2xl border border-white/10 bg-gradient-to-br from-[#050A30]/95 via-[#0D0221]/55 to-[#02020F]/90 p-6 shadow-[0_0_48px_rgba(123,44,255,0.06)]">
        <div className="flex items-start gap-3 border-b border-white/10 pb-5">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-ju-electric/35 bg-ju-electric/10 text-ju-cyanGlow">
            <KeyRound className="size-5" aria-hidden />
          </span>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-ju-pinkGlow">
              Admin access
            </p>
            <h2 className="mt-1 text-xl font-black text-white">Change login password</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ju-muted">
              After the first change, sign-in uses a secure file{" "}
              <code className="rounded bg-black/40 px-1.5 py-0.5 text-xs text-ju-cyanGlow">
                data/admin-password.json
              </code>{" "}
              on the server. Until then, the password from{" "}
              <code className="rounded bg-black/40 px-1.5 py-0.5 text-xs">ADMIN_PASSWORD</code> in
              <code className="rounded bg-black/40 px-1.5 py-0.5 text-xs"> .env.local</code> is used.
              Use at least 8 characters for the new password.
            </p>
          </div>
        </div>

        <form onSubmit={submit} className="mt-6 max-w-md space-y-4">
          <label className="block text-xs font-bold uppercase tracking-wider text-ju-soft">
            Current password
            <input
              type="password"
              autoComplete="current-password"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              className="mt-1 w-full rounded-lg border border-white/10 bg-black/50 px-3 py-2.5 text-sm text-white outline-none ring-ju-electric/30 focus:ring-2"
            />
          </label>
          <label className="block text-xs font-bold uppercase tracking-wider text-ju-soft">
            New password
            <input
              type="password"
              autoComplete="new-password"
              value={next}
              onChange={(e) => setNext(e.target.value)}
              className="mt-1 w-full rounded-lg border border-white/10 bg-black/50 px-3 py-2.5 text-sm text-white outline-none ring-ju-electric/30 focus:ring-2"
            />
          </label>
          <label className="block text-xs font-bold uppercase tracking-wider text-ju-soft">
            Confirm new password
            <input
              type="password"
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="mt-1 w-full rounded-lg border border-white/10 bg-black/50 px-3 py-2.5 text-sm text-white outline-none ring-ju-electric/30 focus:ring-2"
            />
          </label>
          {msg ? (
            <p
              className={`text-sm font-medium ${
                msg.toLowerCase().includes("updated") ? "text-ju-green" : "text-ju-pinkGlow"
              }`}
            >
              {msg}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={busy}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#FF2D95] to-[#7B2CFF] px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-white shadow-btn-brand disabled:opacity-60"
          >
            {busy ? "Updating…" : "Update password"}
          </button>
        </form>
      </div>
    </div>
  );
}

function ModeCard({
  mode,
  onChange,
  onRemove,
}: {
  mode: GameModeContent;
  onChange: (m: GameModeContent) => void;
  onRemove: () => void;
}) {
  return (
    <div className="space-y-3 rounded-xl border border-white/10 bg-black/25 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs font-bold uppercase text-ju-yellow">Mode</p>
        <button
          type="button"
          className="inline-flex items-center gap-1 text-xs text-red-300"
          onClick={onRemove}
        >
          <Trash2 className="size-3.5" /> Remove
        </button>
      </div>
      <label className="block text-xs text-ju-muted">
        ID (slug)
        <input
          className="mt-1 w-full rounded-lg border border-white/10 bg-black/50 px-2 py-2 text-sm"
          value={mode.id}
          onChange={(e) => onChange({ ...mode, id: e.target.value })}
        />
      </label>
      <AdminImageUpload
        label="Card image"
        helper="Upload from disk, or expand below to type a path (e.g. /hero-background.png)."
        value={mode.image ?? ""}
        onChange={(url) =>
          onChange({
            ...mode,
            image: url.trim() ? url : undefined,
          })
        }
      />
      <details className="rounded-lg border border-white/10 bg-black/25 px-3 py-2">
        <summary className="cursor-pointer text-[11px] font-semibold uppercase tracking-wide text-ju-muted">
          Paste image path or URL
        </summary>
        <label className="mt-2 block text-xs text-ju-muted">
          Path / URL
          <input
            className="mt-1 w-full rounded-lg border border-white/10 bg-black/50 px-2 py-2 text-sm text-white"
            value={mode.image ?? ""}
            onChange={(e) =>
              onChange({
                ...mode,
                image: e.target.value.trim() || undefined,
              })
            }
          />
        </label>
      </details>
      <Loc
        label="Name"
        value={mode.name}
        onChange={(v) => onChange({ ...mode, name: v })}
      />
      <Loc
        label="Tagline"
        value={mode.tagline}
        onChange={(v) => onChange({ ...mode, tagline: v })}
      />
      <Loc
        label="Lead"
        value={mode.lead}
        onChange={(v) => onChange({ ...mode, lead: v })}
      />
      <div className="ju-admin-inset rounded-xl border border-white/10 bg-black/30 p-3">
        <p className="text-[11px] font-bold uppercase text-ju-cyanGlow">
          Description
        </p>
        <div className="mt-2 grid gap-2 md:grid-cols-2">
          <label className="block text-xs text-ju-muted">
            EN
            <textarea
              className="mt-1 min-h-[90px] w-full rounded-lg border border-white/10 bg-black/50 px-2 py-2 text-sm"
              value={mode.description.en}
              onChange={(e) =>
                onChange({
                  ...mode,
                  description: { ...mode.description, en: e.target.value },
                })
              }
            />
          </label>
          <label className="block text-xs text-ju-muted">
            FR
            <textarea
              className="mt-1 min-h-[90px] w-full rounded-lg border border-white/10 bg-black/50 px-2 py-2 text-sm"
              value={mode.description.fr}
              onChange={(e) =>
                onChange({
                  ...mode,
                  description: { ...mode.description, fr: e.target.value },
                })
              }
            />
          </label>
        </div>
      </div>
    </div>
  );
}

function TierCard({
  tier,
  onChange,
  onRemove,
}: {
  tier: PricingTier;
  onChange: (t: PricingTier) => void;
  onRemove: () => void;
}) {
  return (
    <div className="space-y-3 rounded-xl border border-white/10 bg-black/25 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs font-bold uppercase text-ju-yellow">Tier</p>
        <button
          type="button"
          className="inline-flex items-center gap-1 text-xs text-red-300"
          onClick={onRemove}
        >
          <Trash2 className="size-3.5" /> Remove
        </button>
      </div>
      <label className="block text-xs text-ju-muted">
        ID
        <input
          className="mt-1 w-full rounded-lg border border-white/10 bg-black/50 px-2 py-2 text-sm"
          value={tier.id}
          onChange={(e) => onChange({ ...tier, id: e.target.value })}
        />
      </label>
      <label className="flex items-center gap-2 text-xs text-ju-muted">
        <input
          type="checkbox"
          checked={tier.featured}
          onChange={(e) => onChange({ ...tier, featured: e.target.checked })}
        />
        Featured tier
      </label>
      <Loc
        label="Title"
        value={tier.title}
        onChange={(v) => onChange({ ...tier, title: v })}
      />
      <Loc
        label="Players line"
        value={tier.players}
        onChange={(v) => onChange({ ...tier, players: v })}
      />
      <label className="block text-xs text-ju-muted">
        Price (e.g. $28)
        <input
          className="mt-1 w-full rounded-lg border border-white/10 bg-black/50 px-2 py-2 text-sm"
          value={tier.price}
          onChange={(e) => onChange({ ...tier, price: e.target.value })}
        />
      </label>
      <Loc
        label="Price note"
        value={tier.priceNote}
        onChange={(v) => onChange({ ...tier, priceNote: v })}
      />
      <Loc
        label="Kid note (optional)"
        value={tier.kidNote ?? { en: "", fr: "" }}
        onChange={(v) => onChange({ ...tier, kidNote: v })}
      />
      <Loc
        label="Badge (optional)"
        value={tier.badge ?? { en: "", fr: "" }}
        onChange={(v) => onChange({ ...tier, badge: v })}
      />
      <Loc
        label="CTA label"
        value={tier.cta}
        onChange={(v) => onChange({ ...tier, cta: v })}
      />
      {tier.extras.map((ex, i) => (
        <Loc
          key={i}
          label={`Extra line ${i + 1}`}
          value={ex}
          onChange={(v) => {
            const extras = [...tier.extras];
            extras[i] = v;
            onChange({ ...tier, extras });
          }}
        />
      ))}
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-xs font-bold uppercase"
        onClick={() =>
          onChange({
            ...tier,
            extras: [...tier.extras, { en: "", fr: "" }],
          })
        }
      >
        <Plus className="size-3.5" /> Add extra line
      </button>
    </div>
  );
}

function SpaceEditor({
  row,
  onChange,
  onRemove,
}: {
  row: SpaceDetail;
  onChange: (s: SpaceDetail) => void;
  onRemove: () => void;
}) {
  return (
    <div className="space-y-3 rounded-xl border border-dashed border-white/15 bg-black/20 p-4">
      <div className="flex items-center justify-between gap-2">
        <label className="text-xs text-ju-muted">
          Icon key (chair | food | calendar)
          <input
            className="mt-1 w-full rounded-lg border border-white/10 bg-black/50 px-2 py-2 text-sm"
            value={row.icon}
            onChange={(e) => onChange({ ...row, icon: e.target.value })}
          />
        </label>
        <button
          type="button"
          className="inline-flex items-center gap-1 text-xs text-red-300"
          onClick={onRemove}
        >
          <Trash2 className="size-3.5" />
        </button>
      </div>
      <Loc
        label="Title"
        value={row.title}
        onChange={(v) => onChange({ ...row, title: v })}
      />
      <div className="ju-admin-inset rounded-xl border border-white/10 bg-black/30 p-3">
        <p className="text-[11px] font-bold uppercase text-ju-cyanGlow">Body</p>
        <div className="mt-2 grid gap-2 md:grid-cols-2">
          <label className="block text-xs text-ju-muted">
            EN
            <textarea
              className="mt-1 min-h-[80px] w-full rounded-lg border border-white/10 bg-black/50 px-2 py-2 text-sm"
              value={row.body.en}
              onChange={(e) =>
                onChange({
                  ...row,
                  body: { ...row.body, en: e.target.value },
                })
              }
            />
          </label>
          <label className="block text-xs text-ju-muted">
            FR
            <textarea
              className="mt-1 min-h-[80px] w-full rounded-lg border border-white/10 bg-black/50 px-2 py-2 text-sm"
              value={row.body.fr}
              onChange={(e) =>
                onChange({
                  ...row,
                  body: { ...row.body, fr: e.target.value },
                })
              }
            />
          </label>
        </div>
      </div>
    </div>
  );
}
