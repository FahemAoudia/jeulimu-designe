"use client";

import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type MediaDims = { w: number; h: number };

export function mediaDimsFromRatio(w: number, h: number): MediaDims | null {
  if (!w || !h) return null;
  return { w, h };
}

function orient(d: MediaDims | null): "landscape" | "portrait" | "square" {
  if (!d) return "landscape";
  const r = d.w / d.h;
  if (r < 0.92) return "portrait";
  if (r > 1.08) return "landscape";
  return "square";
}

/** Wrapper sized to the media's exact aspect ratio — no crop (object-contain inside). */
export function MediaFitFrame({
  dims,
  className,
  style,
  children,
  overlay,
}: {
  dims: MediaDims | null;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  overlay?: ReactNode;
}) {
  const o = orient(dims);

  return (
    <div
      className={cn(
        "ju-media-fit relative overflow-hidden border bg-[#060610]",
        o === "portrait" && "ju-media-fit--portrait mx-auto",
        o === "landscape" && "ju-media-fit--landscape",
        o === "square" && "ju-media-fit--square mx-auto",
        className,
      )}
      style={{
        ...style,
        aspectRatio: dims ? `${dims.w} / ${dims.h}` : "16 / 9",
      }}
      data-orient={o}
    >
      {children}
      {overlay}
    </div>
  );
}

export const mediaFitVideoClass = "block h-full w-full object-contain";
