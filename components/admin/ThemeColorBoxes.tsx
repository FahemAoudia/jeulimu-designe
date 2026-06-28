"use client";

import type { SiteTheme } from "@/types/v2-site-content";
import { SITE_FONT_OPTIONS } from "@/lib/font-catalog";
import { mergeTheme } from "@/lib/theme-css";
import { defaultTheme } from "@/lib/v2-content-defaults";
import { AdminCollapse } from "@/components/admin/AdminFields";

function ColorBox({
  label,
  hint,
  value,
  onChange,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="rounded-xl border border-white/10 bg-black/35 p-3">
      <span className="text-[11px] font-bold uppercase tracking-wider text-ju-cyanGlow">{label}</span>
      {hint ? <p className="mt-1 text-[11px] leading-relaxed text-ju-muted">{hint}</p> : null}
      <div className="mt-3 flex items-center gap-3">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="size-12 shrink-0 cursor-pointer rounded-lg border border-white/15 bg-transparent"
          aria-label={label}
        />
        <div
          className="h-12 min-w-[3rem] flex-1 rounded-lg border border-white/10"
          style={{ backgroundColor: value }}
        />
        <input
          className="w-24 rounded-lg border border-white/10 bg-black/50 px-2 py-1.5 text-xs text-white"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </label>
  );
}

export function ThemeColorBoxes({
  theme,
  onChange,
}: {
  theme: SiteTheme | undefined;
  onChange: (theme: SiteTheme) => void;
}) {
  const t = mergeTheme(theme);

  function set(key: keyof SiteTheme, value: string) {
    onChange({ ...t, [key]: value });
  }

  return (
    <div className="space-y-4">
      <AdminCollapse
        title="Navigation bar"
        hint="Background and link colors — visible after Save on the live site."
        defaultOpen
      >
        <div
          className="mb-4 rounded-lg border border-white/10 px-4 py-3 backdrop-blur-md"
          style={{
            background: `color-mix(in srgb, ${t.navBackground} 88%, transparent)`,
            borderBottom: `1px solid color-mix(in srgb, ${t.navLinkActive} 25%, transparent)`,
          }}
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-sm font-bold" style={{ color: t.navText }}>jeuLumi</span>
            <div className="flex gap-3 text-[10px] font-bold uppercase tracking-widest">
              <span style={{ color: t.navLinkActive }}>Birthdays</span>
              <span style={{ color: t.navTextMuted, opacity: 0.65 }}>FAQ</span>
            </div>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <ColorBox
            label="Background"
            hint="Bar background when scrolling"
            value={t.navBackground}
            onChange={(v) => set("navBackground", v)}
          />
          <ColorBox
            label="Link text"
            hint="Menu links (bright)"
            value={t.navText}
            onChange={(v) => set("navText", v)}
          />
          <ColorBox
            label="Link muted"
            hint="Default link color"
            value={t.navTextMuted}
            onChange={(v) => set("navTextMuted", v)}
          />
          <ColorBox
            label="Active link"
            hint="Current page + accent border"
            value={t.navLinkActive}
            onChange={(v) => set("navLinkActive", v)}
          />
          <ColorBox
            label="Mobile menu bg"
            value={t.navMobileBackground}
            onChange={(v) => set("navMobileBackground", v)}
          />
        </div>
      </AdminCollapse>

      <AdminCollapse title="Footer" hint="Bottom of every page." defaultOpen>
        <div
          className="mb-4 rounded-lg border border-white/10 px-4 py-4"
          style={{ backgroundColor: t.footerBackground }}
        >
          <p
            className="text-[10px] font-bold uppercase tracking-[0.3em]"
            style={{ color: t.footerHeading }}
          >
            Quick Links
          </p>
          <p className="mt-2 text-sm" style={{ color: t.footerTextMuted, opacity: 0.55 }}>
            Sample footer link
          </p>
          <p className="mt-2 text-xs" style={{ color: t.footerIconAccent }}>✉ contact@jeuLumi.ca</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <ColorBox
            label="Background"
            value={t.footerBackground}
            onChange={(v) => set("footerBackground", v)}
          />
          <ColorBox
            label="Heading text"
            hint="Section titles"
            value={t.footerHeading}
            onChange={(v) => set("footerHeading", v)}
          />
          <ColorBox
            label="Body text"
            value={t.footerText}
            onChange={(v) => set("footerText", v)}
          />
          <ColorBox
            label="Muted text"
            hint="Links & secondary lines"
            value={t.footerTextMuted}
            onChange={(v) => set("footerTextMuted", v)}
          />
          <ColorBox
            label="Icons accent"
            hint="Phone, map, email icons"
            value={t.footerIconAccent}
            onChange={(v) => set("footerIconAccent", v)}
          />
        </div>
      </AdminCollapse>

      <AdminCollapse title="Brand accents & page background" defaultOpen={false}>
        <div className="grid gap-3 sm:grid-cols-2">
          <ColorBox label="Cyan" value={t.cyan} onChange={(v) => set("cyan", v)} />
          <ColorBox label="Magenta" value={t.magenta} onChange={(v) => set("magenta", v)} />
          <ColorBox label="Purple" value={t.purple} onChange={(v) => set("purple", v)} />
          <ColorBox label="Pink glow" value={t.pinkGlow} onChange={(v) => set("pinkGlow", v)} />
          <ColorBox label="Page bg deep" value={t.bgDeep} onChange={(v) => set("bgDeep", v)} />
          <ColorBox label="Gradient start" value={t.gradientStart} onChange={(v) => set("gradientStart", v)} />
          <ColorBox label="Gradient mid" value={t.gradientMid} onChange={(v) => set("gradientMid", v)} />
          <ColorBox label="Gradient end" value={t.gradientEnd} onChange={(v) => set("gradientEnd", v)} />
        </div>
      </AdminCollapse>

      <AdminCollapse
        title="Site fonts"
        hint="Body and heading fonts across the public site."
        defaultOpen={false}
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-ju-soft">
            Body font
            <select
              className="mt-1 w-full rounded-lg border border-white/10 bg-black/50 px-2 py-2 text-sm text-white"
              value={t.fontBody}
              onChange={(e) =>
                onChange({ ...t, fontBody: e.target.value as SiteTheme["fontBody"] })
              }
            >
              {SITE_FONT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </label>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-ju-soft">
            Heading font
            <select
              className="mt-1 w-full rounded-lg border border-white/10 bg-black/50 px-2 py-2 text-sm text-white"
              value={t.fontHeading}
              onChange={(e) =>
                onChange({ ...t, fontHeading: e.target.value as SiteTheme["fontHeading"] })
              }
            >
              {SITE_FONT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </label>
        </div>
      </AdminCollapse>

      <AdminCollapse
        title="Light mode (public site)"
        hint="Background colors when visitors switch to light mode via the sun/moon toggle in the nav."
        defaultOpen={false}
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <ColorBox
            label="Light bg deep"
            hint="Main page background"
            value={t.lightBgDeep}
            onChange={(v) => set("lightBgDeep", v)}
          />
          <ColorBox
            label="Light bg mid"
            hint="Cards & mid-tones"
            value={t.lightBgMid}
            onChange={(v) => set("lightBgMid", v)}
          />
          <ColorBox
            label="Light text primary"
            value={t.lightTextPrimary}
            onChange={(v) => set("lightTextPrimary", v)}
          />
          <ColorBox
            label="Light text muted"
            value={t.lightTextMuted}
            onChange={(v) => set("lightTextMuted", v)}
          />
        </div>
      </AdminCollapse>
    </div>
  );
}

export function defaultThemeForEditor(): SiteTheme {
  return mergeTheme(defaultTheme);
}
