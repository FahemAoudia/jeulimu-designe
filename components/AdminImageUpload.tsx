"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { ImageUp, Link2, Loader2, Trash2 } from "lucide-react";
import { postAdminImage } from "@/lib/admin-image-upload";

type AdminImageUploadProps = {
  label: string;
  helper?: string;
  value: string;
  onChange: (pathOrUrl: string) => void;
};

export function AdminImageUpload({
  label,
  helper,
  value,
  onChange,
}: AdminImageUploadProps) {
  const inputId = useId();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [pasteUrl, setPasteUrl] = useState("");
  const trimmed = value?.trim() ?? "";

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setErr(null);
    setBusy(true);
    try {
      const url = await postAdminImage(file);
      onChange(url);
      setPasteUrl(url);
    } catch (er) {
      setErr(er instanceof Error ? er.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  function applyPasteUrl() {
    const url = pasteUrl.trim();
    if (!url) return;
    setErr(null);
    onChange(url);
  }

  return (
    <div className="rounded-xl border border-white/10 bg-black/25 p-3">
      <p className="text-[11px] font-bold uppercase tracking-wider text-ju-cyanGlow">
        {label}
      </p>
      <input
        id={inputId}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="sr-only"
        disabled={busy}
        onChange={onPick}
      />
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <label
          htmlFor={inputId}
          className={`inline-flex cursor-pointer items-center gap-2 rounded-lg border border-ju-electric/45 bg-ju-electric/10 px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-ju-cyanGlow transition hover:bg-ju-electric/20 ${busy ? "pointer-events-none opacity-60" : ""}`}
        >
          {busy ? (
            <Loader2 className="size-3.5 animate-spin" />
          ) : (
            <ImageUp className="size-3.5" />
          )}
          {busy ? "Uploading…" : "Choose from computer"}
        </label>
        {trimmed ? (
          <button
            type="button"
            className="inline-flex items-center gap-1 rounded-lg border border-red-400/35 px-2 py-1.5 text-[11px] font-semibold uppercase text-red-200 hover:bg-red-500/10"
            onClick={() => {
              onChange("");
              setPasteUrl("");
            }}
          >
            <Trash2 className="size-3" /> Remove
          </button>
        ) : null}
      </div>

      <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center">
        <label className="flex min-w-0 flex-1 items-center gap-2 text-xs text-ju-muted">
          <Link2 className="size-3.5 shrink-0 text-ju-cyanGlow" aria-hidden />
          <span className="shrink-0 font-bold uppercase tracking-wider">Paste URL</span>
          <input
            type="url"
            placeholder="https://…"
            className="min-w-0 flex-1 rounded-lg border border-white/10 bg-black/50 px-3 py-2 text-sm text-white"
            value={pasteUrl || trimmed}
            onChange={(e) => setPasteUrl(e.target.value)}
          />
        </label>
        <button
          type="button"
          onClick={applyPasteUrl}
          className="shrink-0 rounded-lg border border-white/15 px-3 py-2 text-[10px] font-bold uppercase text-white hover:border-ju-cyanGlow/40"
        >
          Use URL
        </button>
      </div>

      {err ? <p className="mt-2 text-xs text-red-300">{err}</p> : null}
      {helper ? (
        <p className="mt-2 text-[11px] leading-relaxed text-ju-muted">{helper}</p>
      ) : (
        <p className="mt-2 text-[11px] leading-relaxed text-ju-muted">
          Upload needs <code className="text-ju-cyanGlow">BLOB_READ_WRITE_TOKEN</code> on Vercel.
          Or paste a direct image link and click Use URL — then Save.
        </p>
      )}
      {trimmed ? (
        <div className="relative mt-3 h-40 w-full max-w-md overflow-hidden rounded-lg border border-white/15 bg-black/40">
          <Image
            src={trimmed}
            alt=""
            fill
            className="object-contain p-2"
            sizes="400px"
            unoptimized={/^https?:\/\//.test(trimmed)}
          />
        </div>
      ) : null}
    </div>
  );
}
