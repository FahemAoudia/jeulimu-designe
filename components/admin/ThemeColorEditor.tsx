"use client";

import type { SiteTheme } from "@/types/v2-site-content";
import { mergeTheme } from "@/lib/theme-css";
import { defaultTheme } from "@/lib/v2-content-defaults";
import { AdminCollapse } from "@/components/admin/AdminFields";

const CORE_COLORS: {
  key: keyof SiteTheme;
  label: string;
  hint: string;
}[] = [
  { key: "cyan", label: "Cyan accent", hint: "Links, labels, glow highlights" },
  { key: "magenta", label: "Magenta accent", hint: "Buttons, stars, featured borders" },
  { key: "purple", label: "Purple accent", hint: "Gradients, cards, depth" },
  { key: "bgDeep", label: "Page background", hint: "Main dark background tone" },
];

export function ThemeColorEditor({
  theme,
  onChange,
}: {
  theme: SiteTheme | undefined;
  onChange: (theme: SiteTheme) => void;
}) {
  const merged = mergeTheme(theme);

  function setKey(key: keyof SiteTheme, value: string) {
    const next = mergeTheme({ ...merged, [key]: value });
  if (key === "bgDeep") {
      next.gradientEnd = value;
    }
    onChange(next);
  }

  return (
    <div className="space-y-4">
      <AdminCollapse
        title="Brand colors"
        hint="Pick colors below — changes apply to the public site after Save."
        defaultOpen
      >
        <div className="mb-6 rounded-xl border border-white/10 bg-black/40 p-4">
          <p className="text-[10px] font-bold uppercase tracking-wider text-ju-muted">Live preview</p>
          <div
            className="mt-3 rounded-lg p-4"
            style={{
              background: `linear-gradient(165deg, ${merged.gradientStart} 0%, ${merged.gradientMid} 52%, ${merged.gradientEnd} 100%)`,
            }}
          >
            <p className="font-display text-sm font-bold uppercase" style={{ color: merged.cyan }}>
              Section label
            </p>
            <p className="mt-2 text-lg font-bold text-white">Headline preview</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span
                className="rounded px-4 py-2 text-[10px] font-bold uppercase text-white"
                style={{
                  background: `linear-gradient(135deg, ${merged.magenta} 0%, ${merged.purple} 100%)`,
                }}
              >
                Book Now
              </span>
              <span
                className="rounded border px-4 py-2 text-[10px] font-bold uppercase text-white"
                style={{ borderColor: `${merged.cyan}66` }}
              >
                Ghost button
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {CORE_COLORS.map((f) => (
            <label
              key={f.key}
              className="rounded-xl border border-white/10 bg-black/30 p-3"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-ju-soft">{f.label}</span>
              <p className="mt-1 text-[11px] text-ju-muted">{f.hint}</p>
              <div className="mt-3 flex gap-2">
                <input
                  type="color"
                  value={merged[f.key]}
                  onChange={(e) => setKey(f.key, e.target.value)}
                  className="size-11 cursor-pointer rounded border border-white/15 bg-transparent"
                  aria-label={f.label}
                />
                <input
                  className="min-w-0 flex-1 rounded-lg border border-white/10 bg-black/50 px-3 py-2 text-sm text-white"
                  value={merged[f.key]}
                  onChange={(e) => setKey(f.key, e.target.value)}
                />
              </div>
            </label>
          ))}
        </div>

        <details className="mt-4 rounded-xl border border-white/10 bg-black/20 p-3">
          <summary className="cursor-pointer text-[11px] font-bold uppercase tracking-wider text-ju-muted">
            Advanced gradient & nav colors
          </summary>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {(
              [
                ["pinkGlow", "Pink glow"],
                ["bgMid", "Background mid"],
                ["bgNav", "Nav bar"],
                ["gradientStart", "Gradient start"],
                ["gradientMid", "Gradient mid"],
                ["gradientEnd", "Gradient end"],
              ] as [keyof SiteTheme, string][]
            ).map(([key, label]) => (
              <label key={key} className="block text-xs text-ju-muted">
                {label}
                <div className="mt-1 flex gap-2">
                  <input
                    type="color"
                    value={merged[key]}
                    onChange={(e) => setKey(key, e.target.value)}
                    className="size-9 rounded border border-white/15 bg-transparent"
                  />
                  <input
                    className="flex-1 rounded border border-white/10 bg-black/50 px-2 py-1.5 text-xs text-white"
                    value={merged[key]}
                    onChange={(e) => setKey(key, e.target.value)}
                  />
                </div>
              </label>
            ))}
          </div>
        </details>
      </AdminCollapse>
    </div>
  );
}
