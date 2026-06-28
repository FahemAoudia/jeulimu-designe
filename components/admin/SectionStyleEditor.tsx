"use client";

import type { SectionItemStyle, SectionStyle } from "@/types/section-styles";
import { AdminCollapse } from "@/components/admin/AdminFields";
import { AdminImageUpload } from "@/components/AdminImageUpload";
import { SITE_FONT_OPTIONS } from "@/lib/font-catalog";
import { withVisibilityFlag } from "@/lib/section-visibility";
import type { SectionItemDef } from "@/lib/section-style-registry";

const LUCIDE_OPTIONS = [
  "users",
  "trophy",
  "lock",
  "gamepad",
  "guide",
  "target",
  "run",
  "coop",
  "vs",
  "brain",
  "social",
  "zap",
  "music",
  "party",
  "building",
  "grad",
  "volleyball",
  "heart",
] as const;

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value?: string;
  onChange: (v: string | undefined) => void;
}) {
  return (
    <label className="rounded-lg border border-white/10 bg-black/35 p-2">
      <span className="text-[10px] font-bold uppercase tracking-wider text-ju-cyanGlow">{label}</span>
      <div className="mt-2 flex items-center gap-2">
        <input
          type="color"
          value={value ?? "#000000"}
          onChange={(e) => onChange(e.target.value)}
          className="size-9 shrink-0 cursor-pointer rounded border border-white/15 bg-transparent"
        />
        <input
          className="min-w-0 flex-1 rounded border border-white/10 bg-black/50 px-2 py-1 text-xs text-white"
          value={value ?? ""}
          placeholder="—"
          onChange={(e) => onChange(e.target.value || undefined)}
        />
        {value ? (
          <button
            type="button"
            className="text-[10px] text-ju-muted hover:text-white"
            onClick={() => onChange(undefined)}
          >
            Clear
          </button>
        ) : null}
      </div>
    </label>
  );
}

function ButtonStyleFields({
  label,
  value,
  onChange,
}: {
  label: string;
  value?: SectionStyle["primaryButton"];
  onChange: (v: SectionStyle["primaryButton"]) => void;
}) {
  const b = value ?? {};
  return (
    <div className="rounded-lg border border-white/10 bg-black/25 p-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-white">{label}</span>
        <label className="flex items-center gap-2 text-xs text-ju-soft">
          <input
            type="checkbox"
            checked={b.visible !== false}
            onChange={(e) => onChange(withVisibilityFlag(b, e.target.checked))}
            className="size-3.5 accent-ju-electric"
          />
          Show
        </label>
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <ColorField
          label="Background"
          value={b.background}
          onChange={(v) => onChange({ ...b, background: v })}
        />
        <ColorField
          label="Text color"
          value={b.textColor}
          onChange={(v) => onChange({ ...b, textColor: v })}
        />
      </div>
    </div>
  );
}

function ItemStyleEditor({
  label,
  value,
  onChange,
}: {
  label: string;
  value: SectionItemStyle;
  onChange: (v: SectionItemStyle) => void;
}) {
  const item = value ?? {};
  return (
    <AdminCollapse title={label} defaultOpen={false}>
      <div className="space-y-3">
        <label className="flex items-center gap-2 text-xs text-white">
          <input
            type="checkbox"
            checked={item.visible !== false}
            onChange={(e) => onChange(withVisibilityFlag(item, e.target.checked))}
            className="size-3.5 accent-ju-electric"
          />
          Show this item
        </label>
        <div className="grid gap-2 sm:grid-cols-2">
          <ColorField
            label="Background"
            value={item.background}
            onChange={(v) => onChange({ ...item, background: v })}
          />
          <ColorField
            label="Border"
            value={item.borderColor}
            onChange={(v) => onChange({ ...item, borderColor: v })}
          />
          <ColorField
            label="Title / value color"
            value={item.titleColor}
            onChange={(v) => onChange({ ...item, titleColor: v })}
          />
          <ColorField
            label="Text color"
            value={item.textColor}
            onChange={(v) => onChange({ ...item, textColor: v })}
          />
          <ColorField
            label="Icon color"
            value={item.iconColor}
            onChange={(v) => onChange({ ...item, iconColor: v })}
          />
        </div>
        <label className="block text-[10px] font-bold uppercase tracking-wider text-ju-soft">
          Icon emoji
          <input
            className="mt-1 w-full rounded-lg border border-white/10 bg-black/50 px-2 py-2 text-sm text-white"
            value={item.iconEmoji ?? ""}
            placeholder="e.g. 🏃"
            onChange={(e) => onChange({ ...item, iconEmoji: e.target.value || undefined })}
          />
        </label>
        <label className="block text-[10px] font-bold uppercase tracking-wider text-ju-soft">
          Icon (Lucide key)
          <select
            className="mt-1 w-full rounded-lg border border-white/10 bg-black/50 px-2 py-2 text-sm text-white"
            value={item.iconLucide ?? ""}
            onChange={(e) => onChange({ ...item, iconLucide: e.target.value || undefined })}
          >
            <option value="">— Content default —</option>
            {LUCIDE_OPTIONS.map((k) => (
              <option key={k} value={k}>{k}</option>
            ))}
          </select>
        </label>
        <AdminImageUpload
          label="Icon image (overrides emoji/Lucide)"
          value={item.iconImage ?? ""}
          onChange={(v) => onChange({ ...item, iconImage: v || undefined })}
        />
      </div>
    </AdminCollapse>
  );
}

export function SectionStyleEditor({
  title,
  hint,
  value,
  onChange,
  showCards,
  showButtons,
  showHeroLines,
  showLabelTitleBody,
  items,
  singleButton,
}: {
  title: string;
  hint?: string;
  value: SectionStyle;
  onChange: (v: SectionStyle) => void;
  showCards?: boolean;
  showButtons?: boolean;
  showHeroLines?: boolean;
  showLabelTitleBody?: boolean;
  items?: SectionItemDef[];
  singleButton?: boolean;
}) {
  const v = value ?? {};

  function setItem(key: string, item: SectionItemStyle) {
    onChange({ ...v, items: { ...v.items, [key]: item } });
  }

  return (
    <AdminCollapse title={title} hint={hint} defaultOpen={false}>
      <div className="space-y-4">
        <label className="flex items-center gap-2 text-sm text-white">
          <input
            type="checkbox"
            checked={v.visible !== false}
            onChange={(e) => onChange(withVisibilityFlag(v, e.target.checked))}
            className="size-4 accent-ju-electric"
          />
          Section visible on site
        </label>

        <div className="grid gap-3 sm:grid-cols-2">
          <ColorField
            label="Section background"
            value={v.background}
            onChange={(c) => onChange({ ...v, background: c })}
          />
          <ColorField
            label="Border color"
            value={v.borderColor}
            onChange={(c) => onChange({ ...v, borderColor: c })}
          />
          <label className="block text-[10px] font-bold uppercase tracking-wider text-ju-soft sm:col-span-2">
            Font
            <select
              className="mt-1 w-full rounded-lg border border-white/10 bg-black/50 px-2 py-2 text-sm text-white"
              value={v.fontFamily ?? "inherit"}
              onChange={(e) => {
                const next = { ...v };
                if (e.target.value === "inherit") delete next.fontFamily;
                else next.fontFamily = e.target.value as SectionStyle["fontFamily"];
                onChange(next);
              }}
            >
              <option value="inherit">Site default</option>
              {SITE_FONT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </label>
        </div>

        {showLabelTitleBody ? (
          <div className="grid gap-3 sm:grid-cols-2 border-t border-white/10 pt-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-ju-yellow sm:col-span-2">
              Text colors
            </p>
            <ColorField
              label="Label (small caps)"
              value={v.labelColor}
              onChange={(c) => onChange({ ...v, labelColor: c })}
            />
            <ColorField
              label="Title"
              value={v.titleColor}
              onChange={(c) => onChange({ ...v, titleColor: c })}
            />
            <ColorField
              label="Body text"
              value={v.bodyColor}
              onChange={(c) => onChange({ ...v, bodyColor: c })}
            />
            <ColorField
              label="Subtext / muted"
              value={v.subtextColor}
              onChange={(c) => onChange({ ...v, subtextColor: c })}
            />
            <ColorField
              label="Accent"
              value={v.accentColor}
              onChange={(c) => onChange({ ...v, accentColor: c })}
            />
            <ColorField
              label="Icon color"
              value={v.iconColor}
              onChange={(c) => onChange({ ...v, iconColor: c })}
            />
          </div>
        ) : null}

        {showHeroLines ? (
          <div className="grid gap-3 sm:grid-cols-2 border-t border-white/10 pt-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-ju-yellow sm:col-span-2">
              Hero headline lines
            </p>
            <ColorField
              label="Line 1 (STEP IN)"
              value={v.headingLine1Color}
              onChange={(c) => onChange({ ...v, headingLine1Color: c })}
            />
            <ColorField
              label="Line 2 (BECOME THE GAME)"
              value={v.headingLine2Color}
              onChange={(c) => onChange({ ...v, headingLine2Color: c })}
            />
            <ColorField
              label="Heading fallback"
              value={v.headingColor}
              onChange={(c) => onChange({ ...v, headingColor: c })}
            />
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            <ColorField
              label="Heading color"
              value={v.headingColor}
              onChange={(c) => onChange({ ...v, headingColor: c })}
            />
            <ColorField
              label="Body text color"
              value={v.textColor}
              onChange={(c) => onChange({ ...v, textColor: c })}
            />
          </div>
        )}

        {showCards ? (
          <div className="grid gap-3 sm:grid-cols-2 border-t border-white/10 pt-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-ju-yellow sm:col-span-2">
              Cards / boxes / LED panel frame
            </p>
            <ColorField
              label="Card / panel background"
              value={v.cardBackground}
              onChange={(c) => onChange({ ...v, cardBackground: c })}
            />
            <ColorField
              label="Card icon color"
              value={v.cardIconColor}
              onChange={(c) => onChange({ ...v, cardIconColor: c })}
            />
            <ColorField
              label="Card title color"
              value={v.cardHeadingColor}
              onChange={(c) => onChange({ ...v, cardHeadingColor: c })}
            />
            <ColorField
              label="Card text color"
              value={v.cardTextColor}
              onChange={(c) => onChange({ ...v, cardTextColor: c })}
            />
          </div>
        ) : null}

        {showButtons ? (
          <div className="space-y-3 border-t border-white/10 pt-4">
            <ButtonStyleFields
              label="Primary button"
              value={v.primaryButton}
              onChange={(b) => onChange({ ...v, primaryButton: b })}
            />
            {showButtons && !singleButton ? (
              <ButtonStyleFields
                label="Secondary button"
                value={v.secondaryButton}
                onChange={(b) => onChange({ ...v, secondaryButton: b })}
              />
            ) : null}
          </div>
        ) : null}

        {items && items.length > 0 ? (
          <div className="space-y-2 border-t border-white/10 pt-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-ju-yellow">
              Items in this section
            </p>
            {items.map((def) => (
              <ItemStyleEditor
                key={def.key}
                label={def.label}
                value={v.items?.[def.key] ?? {}}
                onChange={(item) => setItem(def.key, item)}
              />
            ))}
          </div>
        ) : null}
      </div>
    </AdminCollapse>
  );
}
