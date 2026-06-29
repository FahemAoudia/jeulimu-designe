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

/**
 * Video wrapper — frame shrink-wraps the video; video scales with object-contain (never cropped).
 * Do NOT set aspect-ratio on the box; intrinsic video dimensions define the border.
 */
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
        "ju-media-fit-intrinsic relative inline-flex max-w-full overflow-hidden border bg-[#060610]",
        o === "portrait" && "ju-media-fit-intrinsic--portrait mx-auto",
        o === "landscape" && "ju-media-fit-intrinsic--landscape",
        o === "square" && "ju-media-fit-intrinsic--square mx-auto",
        size === "compact" && o === "portrait" && "ju-media-fit-intrinsic--compact",
        className,
      )}
      style={style}
      data-orient={o}
      data-ready={dims ? "true" : "false"}
    >
      {children}
      {overlay}
    </div>
  );
}

/** Intrinsic sizing — full video visible, frame hugs content. */
export const mediaFitVideoClass =
  "ju-media-fit-video block h-auto w-auto max-w-full object-contain";

/** Read video dimensions once decoded (metadata alone can be wrong on some encodes). */
export function readVideoDims(el: HTMLVideoElement): MediaDims | null {
  const w = el.videoWidth;
  const h = el.videoHeight;
  return mediaDimsFromRatio(w, h);
}
