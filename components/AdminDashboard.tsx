"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { KeyRound, LogOut, RotateCcw, Save } from "lucide-react";
import { useSiteContext } from "@/providers/AppProviders";
import { ThemeToggle } from "@/components/ThemeToggle";
import { defaultSiteContent } from "@/lib/site-defaults";
import type { SiteContent } from "@/types/site-content";
import type { SiteTheme } from "@/types/v2-site-content";
import { setAtPath } from "@/lib/content-path";
import {
  AdminCollapse,
  LocEditor,
  SectionPathEditor,
} from "@/components/admin/AdminFields";
import { ReviewsAdminSection } from "@/components/admin/ReviewsAdminSection";
import { AdminImageUpload } from "@/components/AdminImageUpload";
import { AdminVideoUpload } from "@/components/AdminVideoUpload";

const TABS = [
  "Overview",
  "Theme & Branding",
  "Navigation",
  "Home",
  "Birthdays",
  "Groups & Pricing",
  "Mobile Events",
  "FAQ Page",
  "Footer",
  "Pricing",
  "Media",
  "Game Modes",
  "Contact",
  "Reviews",
  "Chatbot FAQ",
  "Security",
] as const;

type Tab = (typeof TABS)[number];

const V2_VISIBILITY_META: {
  key: keyof SiteContent["sectionVisibilityV2"];
  title: string;
  desc: string;
}[] = [
  { key: "hero", title: "Hero", desc: "Homepage hero with headline and LED floor." },
  { key: "marquee", title: "Stats marquee", desc: "Scrolling stats bar under the hero." },
  { key: "whatIs", title: "What is JeuLumi", desc: "Experience intro + gallery image." },
  { key: "howWorks", title: "How it works", desc: "Gameplay steps section." },
  { key: "gameModes", title: "Game modes", desc: "LumiQuest / LumiVS / LumiLogik cards." },
  { key: "experiences", title: "Experiences", desc: "Birthdays / groups / mobile cards." },
  { key: "reviews", title: "Reviews", desc: "Google-style review carousel." },
  { key: "finalCta", title: "Final CTA", desc: "Ready to play booking band." },
];

const THEME_FIELDS: { key: keyof SiteTheme; label: string }[] = [
  { key: "cyan", label: "Cyan accent" },
  { key: "magenta", label: "Magenta accent" },
  { key: "purple", label: "Purple accent" },
  { key: "pinkGlow", label: "Pink glow" },
  { key: "bgDeep", label: "Background deep" },
  { key: "bgMid", label: "Background mid" },
  { key: "bgNav", label: "Nav background" },
  { key: "gradientStart", label: "Gradient start" },
  { key: "gradientMid", label: "Gradient mid" },
  { key: "gradientEnd", label: "Gradient end" },
];

function updateContent(
  content: SiteContent,
  path: string[],
  value: unknown,
): SiteContent {
  return setAtPath(content as unknown as Record<string, unknown>, path, value) as SiteContent;
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
    const data = (await res.json().catch(() => ({}))) as { error?: string; hint?: string };
    setBusy(false);
    if (!res.ok) {
      setMsg(data.error ?? "Update failed.");
      return;
    }
    setCurrent("");
    setNext("");
    setConfirm("");
    setMsg(data.hint ? `Password updated. ${data.hint}` : "Password updated.");
  }

  return (
    <div className="space-y-6">
      <AdminCollapse title="Change login password" hint="Stored in data/admin-password.json after first change.">
        <form onSubmit={submit} className="max-w-md space-y-4">
          <label className="block text-xs font-bold uppercase tracking-wider text-ju-soft">
            Current password
            <input
              type="password"
              autoComplete="current-password"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              className="mt-1 w-full rounded-lg border border-white/10 bg-black/50 px-3 py-2.5 text-sm text-white outline-none focus:ring-2 focus:ring-ju-electric/30"
            />
          </label>
          <label className="block text-xs font-bold uppercase tracking-wider text-ju-soft">
            New password
            <input
              type="password"
              autoComplete="new-password"
              value={next}
              onChange={(e) => setNext(e.target.value)}
              className="mt-1 w-full rounded-lg border border-white/10 bg-black/50 px-3 py-2.5 text-sm text-white outline-none focus:ring-2 focus:ring-ju-electric/30"
            />
          </label>
          <label className="block text-xs font-bold uppercase tracking-wider text-ju-soft">
            Confirm new password
            <input
              type="password"
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="mt-1 w-full rounded-lg border border-white/10 bg-black/50 px-3 py-2.5 text-sm text-white outline-none focus:ring-2 focus:ring-ju-electric/30"
            />
          </label>
          <button
            type="submit"
            disabled={busy}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#FF2D95] to-[#7B2CFF] px-4 py-2 text-xs font-bold uppercase tracking-wide text-white disabled:opacity-60"
          >
            <KeyRound className="size-3.5" /> {busy ? "Updating…" : "Update password"}
          </button>
          {msg ? <p className="text-sm text-ju-cyanGlow">{msg}</p> : null}
        </form>
      </AdminCollapse>
    </div>
  );
}

export function AdminDashboard() {
  const { content, setContent, saveToServer } = useSiteContext();
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("Overview");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  function patch(path: string[], value: unknown) {
    setContent((prev) => updateContent(prev, path, value));
  }

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
    setMsg(ok ? "Saved — changes are live on the public site." : "Save failed (check auth / permissions).");
    if (ok) router.refresh();
  }

  function resetDefaults() {
    if (!confirm("Reset ALL site content to built-in defaults?")) return;
    setContent(structuredClone(defaultSiteContent));
    setMsg("Defaults loaded locally — click Save to persist.");
  }

  const v2 = content.v2 ?? defaultSiteContent.v2;

  return (
    <div className="ju-admin-root min-h-screen bg-[#02020F] text-white">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#050A30]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3.5 sm:px-6">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-ju-pinkGlow">Admin</p>
            <h1 className="text-lg font-black">jeuLumi — Site CMS</h1>
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
          <p className="rounded-lg border border-ju-electric/25 bg-ju-electric/5 px-3 py-2 text-sm text-ju-cyanGlow">{msg}</p>
        </div>
      ) : null}

      <div className="mx-auto max-w-7xl px-4 pb-14 pt-4 sm:px-6">
        <div className="lg:grid lg:grid-cols-[minmax(10.5rem,13.5rem)_minmax(0,1fr)] lg:items-start lg:gap-10">
          <aside className="mb-6 lg:sticky lg:top-[4.25rem] lg:mb-0 lg:self-start">
            <nav
              className="flex flex-row gap-1.5 overflow-x-auto pb-1 lg:flex-col lg:gap-1.5 lg:overflow-visible lg:pb-0"
              role="tablist"
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

          <main className="min-w-0 space-y-6">
            {tab === "Overview" ? (
              <div className="space-y-4">
                <AdminCollapse title="Homepage sections" hint="Show or hide blocks on the live homepage." defaultOpen>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {V2_VISIBILITY_META.map((s) => (
                      <label
                        key={s.key}
                        className="flex gap-3 rounded-xl border border-white/10 bg-black/30 p-4 text-sm"
                      >
                        <input
                          type="checkbox"
                          className="mt-1 size-4 accent-ju-electric"
                          checked={content.sectionVisibilityV2?.[s.key] ?? true}
                          onChange={(e) =>
                            setContent((prev) => ({
                              ...prev,
                              sectionVisibilityV2: {
                                ...prev.sectionVisibilityV2,
                                [s.key]: e.target.checked,
                              },
                            }))
                          }
                        />
                        <span>
                          <span className="font-bold text-white">{s.title}</span>
                          <span className="mt-1 block text-xs text-ju-muted">{s.desc}</span>
                        </span>
                      </label>
                    ))}
                  </div>
                </AdminCollapse>
                <LocEditor
                  label="Footer tagline"
                  value={content.footerTagline}
                  onChange={(v) => setContent((p) => ({ ...p, footerTagline: v }))}
                />
              </div>
            ) : null}

            {tab === "Theme & Branding" ? (
              <div className="space-y-4">
                <AdminCollapse
                  title="Brand colors"
                  hint="Use the color boxes below. Save, then refresh the public site to see changes."
                  defaultOpen
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    {THEME_FIELDS.map((f) => (
                      <label key={f.key} className="block text-xs font-bold uppercase tracking-wider text-ju-soft">
                        {f.label}
                        <div className="mt-1 flex gap-2">
                          <input
                            type="color"
                            value={content.theme?.[f.key] ?? defaultSiteContent.theme[f.key]}
                            onChange={(e) =>
                              setContent((p) => ({
                                ...p,
                                theme: { ...p.theme, [f.key]: e.target.value },
                              }))
                            }
                            className="size-10 rounded border border-white/15 bg-transparent"
                          />
                          <input
                            className="flex-1 rounded-lg border border-white/10 bg-black/50 px-3 py-2 text-sm text-white"
                            value={content.theme?.[f.key] ?? defaultSiteContent.theme[f.key]}
                            onChange={(e) =>
                              setContent((p) => ({
                                ...p,
                                theme: { ...p.theme, [f.key]: e.target.value },
                              }))
                            }
                          />
                        </div>
                      </label>
                    ))}
                  </div>
                </AdminCollapse>
                <AdminCollapse title="Logo & branding" defaultOpen>
                  <p className="text-xs leading-relaxed text-ju-muted">
                    Upload needs <code className="text-ju-cyanGlow">BLOB_READ_WRITE_TOKEN</code> on Vercel,
                    or paste an image URL below then click Use URL.
                  </p>
                  <div className="mt-4 space-y-4">
                    <AdminImageUpload
                      label="Logo image"
                      value={content.siteBranding.logoImage}
                      onChange={(v) =>
                        setContent((p) => ({
                          ...p,
                          siteBranding: { ...p.siteBranding, logoImage: v },
                        }))
                      }
                    />
                    <LocEditor
                      label="Logo alt text"
                      value={content.siteBranding.logoAlt}
                      onChange={(v) =>
                        setContent((p) => ({
                          ...p,
                          siteBranding: { ...p.siteBranding, logoAlt: v },
                        }))
                      }
                    />
                    <label className="flex items-center gap-3 text-sm text-white">
                      <input
                        type="checkbox"
                        checked={content.siteBranding.showTagline}
                        onChange={(e) =>
                          setContent((p) => ({
                            ...p,
                            siteBranding: { ...p.siteBranding, showTagline: e.target.checked },
                          }))
                        }
                        className="size-4 accent-ju-electric"
                      />
                      Show logo tagline
                    </label>
                    <label className="block text-xs font-bold uppercase tracking-wider text-ju-soft">
                      Logo size
                      <select
                        className="mt-1 w-full rounded-lg border border-white/10 bg-black/50 px-3 py-2 text-sm text-white"
                        value={content.siteBranding.logoSize}
                        onChange={(e) =>
                          setContent((p) => ({
                            ...p,
                            siteBranding: {
                              ...p.siteBranding,
                              logoSize: e.target.value as "sm" | "md" | "lg",
                            },
                          }))
                        }
                      >
                        <option value="sm">Small</option>
                        <option value="md">Medium</option>
                        <option value="lg">Large</option>
                      </select>
                    </label>
                  </div>
                </AdminCollapse>
              </div>
            ) : null}

            {tab === "Navigation" ? (
              <SectionPathEditor
                title="Navigation labels"
                hint="Menu links and Book Now button."
                value={v2.nav}
                onChange={(v) => patch(["v2", "nav"], v)}
              />
            ) : null}

            {tab === "Home" ? (
              <SectionPathEditor
                title="Homepage content"
                hint="Hero, marquee stats, sections, experiences, reviews, final CTA."
                value={v2.home}
                onChange={(v) => patch(["v2", "home"], v)}
              />
            ) : null}

            {tab === "Birthdays" ? (
              <SectionPathEditor
                title="Birthdays page"
                value={v2.birthdays}
                onChange={(v) => patch(["v2", "birthdays"], v)}
              />
            ) : null}

            {tab === "Groups & Pricing" ? (
              <SectionPathEditor
                title="Groups & pricing page"
                value={v2.groups}
                onChange={(v) => patch(["v2", "groups"], v)}
              />
            ) : null}

            {tab === "Mobile Events" ? (
              <SectionPathEditor
                title="Mobile events page"
                value={v2.mobile}
                onChange={(v) => patch(["v2", "mobile"], v)}
              />
            ) : null}

            {tab === "FAQ Page" ? (
              <SectionPathEditor
                title="FAQ page"
                hint="Grouped FAQ on /faq — add, edit, or remove questions."
                value={v2.faq}
                onChange={(v) => patch(["v2", "faq"], v)}
              />
            ) : null}

            {tab === "Footer" ? (
              <SectionPathEditor
                title="Footer labels"
                value={v2.footer}
                onChange={(v) => patch(["v2", "footer"], v)}
              />
            ) : null}

            {tab === "Pricing" ? (
              <SectionPathEditor
                title="Pricing numbers"
                hint="Per-player rates, birthday package, party room — used across the site."
                value={content.pricingV2 ?? defaultSiteContent.pricingV2}
                onChange={(v) => patch(["pricingV2"], v)}
              />
            ) : null}

            {tab === "Media" ? (
              <div className="space-y-4">
                <AdminCollapse title="Hero background" defaultOpen>
                  <AdminImageUpload
                    label="Hero image"
                    value={content.hero.backgroundImage}
                    onChange={(v) =>
                      setContent((p) => ({ ...p, hero: { ...p.hero, backgroundImage: v } }))
                    }
                  />
                  <AdminVideoUpload
                    label="Hero video (optional)"
                    value={content.hero.backgroundVideo}
                    onChange={(v) =>
                      setContent((p) => ({ ...p, hero: { ...p.hero, backgroundVideo: v } }))
                    }
                  />
                </AdminCollapse>
                <AdminCollapse title="Birthdays hero image">
                  <AdminImageUpload
                    label="Events / birthdays promo"
                    value={content.eventsPromoImage}
                    onChange={(v) => setContent((p) => ({ ...p, eventsPromoImage: v }))}
                  />
                </AdminCollapse>
                <SectionPathEditor
                  title="Gallery images"
                  value={content.gallery}
                  onChange={(v) => patch(["gallery"], v)}
                />
              </div>
            ) : null}

            {tab === "Game Modes" ? (
              <SectionPathEditor
                title="Game modes"
                hint="Names, images, and descriptions — synced with homepage game mode cards."
                value={content.gameModes}
                onChange={(v) => patch(["gameModes"], v)}
              />
            ) : null}

            {tab === "Contact" ? (
              <SectionPathEditor
                title="Contact & hours"
                value={content.contact}
                onChange={(v) => patch(["contact"], v)}
              />
            ) : null}

            {tab === "Reviews" ? (
              <ReviewsAdminSection
                reviews={content.testimonialReviews ?? []}
                onChange={(v) => patch(["testimonialReviews"], v)}
              />
            ) : null}

            {tab === "Chatbot FAQ" ? (
              <SectionPathEditor
                title="Chatbot FAQ"
                hint="Floating FAQ assistant — separate from the FAQ page."
                value={content.faqItems}
                onChange={(v) => patch(["faqItems"], v)}
              />
            ) : null}

            {tab === "Security" ? <AdminPasswordSection /> : null}
          </main>
        </div>
      </div>
    </div>
  );
}
