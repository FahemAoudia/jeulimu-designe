"use client";

import { ChevronDown, Plus, Trash2 } from "lucide-react";
import type { LocalizedString } from "@/types/site-content";
import { AdminImageUpload } from "@/components/AdminImageUpload";
import { AdminVideoUpload } from "@/components/AdminVideoUpload";
import {
  isImageKey,
  isLocalizedString,
  labelFromKey,
} from "@/lib/content-path";

export function AdminCollapse({
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
      className="ju-admin-surface group rounded-2xl border border-white/10 bg-[#07051a]/90 shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
    >
      <summary className="cursor-pointer list-none rounded-2xl px-4 py-3.5 outline-none transition hover:bg-white/[0.04] focus-visible:ring-2 focus-visible:ring-ju-electric/40 sm:px-5 sm:py-4 [&::-webkit-details-marker]:hidden">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-ju-cyanGlow">{title}</p>
            {hint ? <p className="mt-1.5 text-[13px] leading-relaxed text-ju-muted">{hint}</p> : null}
          </div>
          <ChevronDown
            className="mt-0.5 size-5 shrink-0 text-white/50 transition-transform duration-200 group-open:rotate-180"
            aria-hidden
          />
        </div>
      </summary>
      <div className="space-y-5 border-t border-white/10 px-4 pb-5 pt-5 sm:px-5">{children}</div>
    </details>
  );
}

export function LocEditor({
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
      <p className="text-[11px] font-bold uppercase tracking-wider text-ju-cyanGlow">{label}</p>
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

function cloneTemplate(value: unknown): unknown {
  if (isLocalizedString(value)) return { en: "", fr: "" };
  if (typeof value === "string") return "";
  if (typeof value === "number") return 0;
  if (typeof value === "boolean") return false;
  if (Array.isArray(value)) return [];
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([k, v]) => [k, cloneTemplate(v)]),
    );
  }
  return "";
}

export function ContentValueEditor({
  value,
  onChange,
  keyName = "",
  depth = 0,
}: {
  value: unknown;
  onChange: (v: unknown) => void;
  keyName?: string;
  depth?: number;
}) {
  if (isLocalizedString(value)) {
    return (
      <LocEditor
        label={labelFromKey(keyName || "Text")}
        value={value}
        onChange={(v) => onChange(v)}
      />
    );
  }

  if (typeof value === "boolean") {
    return (
      <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white">
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          className="size-4 accent-ju-electric"
        />
        {labelFromKey(keyName)}
      </label>
    );
  }

  if (typeof value === "number") {
    return (
      <label className="block text-xs font-bold uppercase tracking-wider text-ju-soft">
        {labelFromKey(keyName)}
        <input
          type="number"
          step="any"
          className="mt-1 w-full rounded-lg border border-white/10 bg-black/50 px-3 py-2 text-sm text-white"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      </label>
    );
  }

  if (typeof value === "string") {
    if (isImageKey(keyName)) {
      if (keyName.toLowerCase().includes("video")) {
        return (
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-ju-cyanGlow">
              {labelFromKey(keyName)}
            </p>
            <AdminVideoUpload
              value={value}
              onChange={(v) => onChange(v)}
              label={labelFromKey(keyName)}
            />
          </div>
        );
      }
      return (
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-ju-cyanGlow">
            {labelFromKey(keyName)}
          </p>
          <AdminImageUpload value={value} onChange={(v) => onChange(v)} label={labelFromKey(keyName)} />
        </div>
      );
    }
    return (
      <label className="block text-xs font-bold uppercase tracking-wider text-ju-soft">
        {labelFromKey(keyName)}
        <input
          className="mt-1 w-full rounded-lg border border-white/10 bg-black/50 px-3 py-2 text-sm text-white"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
    );
  }

  if (Array.isArray(value)) {
    return (
      <div className="space-y-3 rounded-xl border border-white/10 bg-black/20 p-4">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[11px] font-bold uppercase tracking-wider text-ju-cyanGlow">
            {labelFromKey(keyName)} ({value.length})
          </p>
          <button
            type="button"
            onClick={() => onChange([...value, cloneTemplate(value[0] ?? "")])}
            className="inline-flex items-center gap-1 rounded-lg border border-white/15 px-2 py-1 text-[10px] font-bold uppercase text-ju-soft hover:text-white"
          >
            <Plus className="size-3" /> Add
          </button>
        </div>
        {value.map((item, i) => (
          <div key={i} className="rounded-xl border border-white/10 bg-black/40 p-3">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/50">
                Item {i + 1}
              </span>
              <button
                type="button"
                onClick={() => onChange(value.filter((_, j) => j !== i))}
                className="inline-flex items-center gap-1 text-[10px] font-bold uppercase text-red-300 hover:text-red-200"
              >
                <Trash2 className="size-3" /> Remove
              </button>
            </div>
            <ContentValueEditor
              value={item}
              onChange={(next) => {
                const copy = [...value];
                copy[i] = next;
                onChange(copy);
              }}
              depth={depth + 1}
            />
          </div>
        ))}
      </div>
    );
  }

  if (value && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);
    if (depth > 2) {
      return (
        <div className="space-y-3">
          {entries.map(([k, v]) => (
            <ContentValueEditor
              key={k}
              keyName={k}
              value={v}
              onChange={(next) => onChange({ ...(value as object), [k]: next })}
              depth={depth + 1}
            />
          ))}
        </div>
      );
    }
    return (
      <div className="space-y-3">
        {entries.map(([k, v]) => (
          <AdminCollapse key={k} title={labelFromKey(k)} defaultOpen={depth < 1}>
            <ContentValueEditor
              keyName={k}
              value={v}
              onChange={(next) => onChange({ ...(value as object), [k]: next })}
              depth={depth + 1}
            />
          </AdminCollapse>
        ))}
      </div>
    );
  }

  return null;
}

export function SectionPathEditor({
  title,
  hint,
  value,
  onChange,
}: {
  title: string;
  hint?: string;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  return (
    <AdminCollapse title={title} hint={hint} defaultOpen>
      <ContentValueEditor value={value} onChange={onChange} keyName={title} />
    </AdminCollapse>
  );
}
