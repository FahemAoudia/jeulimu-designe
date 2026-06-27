"use client";

import type { SectionStyle } from "@/types/section-styles";
import { AdminCollapse } from "@/components/admin/AdminFields";

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
            onChange={(e) => onChange({ ...b, visible: e.target.checked })}
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

export function SectionStyleEditor({
  title,
  hint,
  value,
  onChange,
  showCards,
  showButtons,
}: {
  title: string;
  hint?: string;
  value: SectionStyle;
  onChange: (v: SectionStyle) => void;
  showCards?: boolean;
  showButtons?: boolean;
}) {
  const v = value ?? {};

  return (
    <AdminCollapse title={title} hint={hint} defaultOpen={false}>
      <div className="space-y-4">
        <label className="flex items-center gap-2 text-sm text-white">
          <input
            type="checkbox"
            checked={v.visible !== false}
            onChange={(e) => onChange({ ...v, visible: e.target.checked })}
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
          <label className="block text-[10px] font-bold uppercase tracking-wider text-ju-soft">
            Font
            <select
              className="mt-1 w-full rounded-lg border border-white/10 bg-black/50 px-2 py-2 text-sm text-white"
              value={v.fontFamily ?? "inherit"}
              onChange={(e) =>
                onChange({
                  ...v,
                  fontFamily: e.target.value as SectionStyle["fontFamily"],
                })
              }
            >
              <option value="inherit">Site default</option>
              <option value="outfit">Outfit (body)</option>
              <option value="syne">Syne (display)</option>
              <option value="system">System</option>
            </select>
          </label>
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
          <ColorField
            label="Subtext color"
            value={v.subtextColor}
            onChange={(c) => onChange({ ...v, subtextColor: c })}
          />
          <ColorField
            label="Icon color (section)"
            value={v.iconColor}
            onChange={(c) => onChange({ ...v, iconColor: c })}
          />
        </div>

        {showCards ? (
          <div className="grid gap-3 sm:grid-cols-2 border-t border-white/10 pt-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-ju-yellow sm:col-span-2">
              Cards / boxes in this section
            </p>
            <ColorField
              label="Card background"
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
              label="Primary button (e.g. Book Now)"
              value={v.primaryButton}
              onChange={(b) => onChange({ ...v, primaryButton: b })}
            />
            <ButtonStyleFields
              label="Secondary button (e.g. Check Availability)"
              value={v.secondaryButton}
              onChange={(b) => onChange({ ...v, secondaryButton: b })}
            />
          </div>
        ) : null}
      </div>
    </AdminCollapse>
  );
}
