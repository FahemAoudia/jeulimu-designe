"use client";

import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type MediaDims = { w: number; h: number };

export function mediaDimsFromRatio(w: number, h: number): MediaDims | null {
  if (!w || !h) return null;
  return { w, h };
}

export function mediaOrient(d: MediaDims | null): "landscape" | "portrait" | "square" {
  if (!d) return "landscape";
  const r = d.w / d.h;
  if (r < 0.92) return "portrait";
  if (r > 1.08) return "landscape";
  return "square";
}

/** Wrapper sized to the media's exact aspect ratio — no crop. */
export function MediaFitFrame({
  dims,
  size = "default",
  className,
  style,
  children,
  overlay,
}: {
  dims: MediaDims | null;
  size?: "default" | "compact";
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  overlay?: ReactNode;
}) {
  const o = mediaOrient(dims);

  return (
    <div
      className={cn(
        "ju-media-fit relative overflow-hidden border bg-[#060610]",
        o === "portrait" && "ju-media-fit--portrait mx-auto w-auto",
        o === "landscape" && "ju-media-fit--landscape w-full",
        o === "square" && "ju-media-fit--square mx-auto w-auto",
        size === "compact" && o === "portrait" && "ju-media-fit--compact",
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

export const mediaFitVideoClass = "absolute inset-0 h-full w-full object-cover";
