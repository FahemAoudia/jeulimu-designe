"use client";

import { useState, type CSSProperties, type SyntheticEvent } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import {
  MediaFitFrame,
  mediaDimsFromRatio,
  mediaFitVideoClass,
  mediaOrient,
  readVideoDims,
  type MediaDims,
} from "@/components/v2/MediaFitFrame";

export function GameModeMedia({
  image,
  video,
  alt = "",
  accentColor,
  fallbackSrc,
  className,
}: {
  image?: string;
  video?: string;
  alt?: string;
  accentColor?: string;
  fallbackSrc?: string;
  className?: string;
}) {
  const vid = video?.trim();
  const imgSrc = image?.trim() || fallbackSrc || "";
  const [dims, setDims] = useState<MediaDims | null>(null);
  const isPortrait = mediaOrient(dims) === "portrait";

  const borderGlow = accentColor
    ? `color-mix(in srgb, ${accentColor} 40%, transparent)`
    : "rgba(255,255,255,0.12)";

  const frameStyle = isPortrait
    ? ({
        borderColor: borderGlow,
        ["--portrait-glow" as string]: accentColor ?? "#00f5ff",
      } as CSSProperties)
    : {
        borderColor: borderGlow,
        boxShadow: accentColor
          ? `0 0 32px color-mix(in srgb, ${accentColor} 18%, transparent), 0 8px 32px rgba(0,0,0,0.4)`
          : undefined,
      };

  const portraitOverlay = (
    <>
      <div
        className="pointer-events-none absolute inset-0 z-[2] rounded-[inherit] shadow-[inset_0_0_20px_rgba(0,0,0,0.2)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-3 top-0 z-[3] h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
        aria-hidden
      />
    </>
  );

  const overlay = (
    <>
      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-tr from-[#030308]/40 via-transparent to-transparent"
        aria-hidden
      />
      {!isPortrait ? (
        <div
          className="ju-game-mode-media-grid pointer-events-none absolute inset-0 z-[1] opacity-[0.35]"
          aria-hidden
        />
      ) : null}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-[3] h-8 bg-gradient-to-t from-black/50 to-transparent"
        aria-hidden
      />
    </>
  );

  function onVideoReady(e: SyntheticEvent<HTMLVideoElement>) {
    const next = readVideoDims(e.currentTarget);
    if (next) setDims(next);
  }

  const frame = vid ? (
    <MediaFitFrame
      dims={dims}
      size="compact"
      className={cn(
        "group/media",
        isPortrait ? "ju-game-mode-portrait-frame rounded-[1.1rem]" : "shadow-[0_0_48px_rgba(0,0,0,0.45)] rounded-lg",
        className,
      )}
      style={frameStyle}
      overlay={isPortrait ? portraitOverlay : overlay}
    >
      <video
        className={cn(mediaFitVideoClass, "relative z-0 transition duration-700 group-hover/media:scale-[1.01]")}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onLoadedMetadata={onVideoReady}
        onLoadedData={onVideoReady}
      >
        <source src={vid} />
      </video>
    </MediaFitFrame>
  ) : !imgSrc ? null : (
    <MediaFitFrame
      dims={dims}
      size="compact"
      className={cn(
        isPortrait ? "ju-game-mode-portrait-frame rounded-[1.1rem]" : "rounded-lg",
        className,
      )}
      style={{ borderColor: borderGlow }}
      overlay={
        isPortrait ? portraitOverlay : (
          <div className="absolute inset-0 bg-gradient-to-r from-[#030308]/80 to-transparent" aria-hidden />
        )
      }
    >
      <Image
        src={imgSrc}
        alt={alt}
        width={dims?.w ?? 1600}
        height={dims?.h ?? 900}
        className="ju-media-fit-video object-contain"
        sizes="(max-width: 1024px) 100vw, 50vw"
        unoptimized={/^https?:\/\//.test(imgSrc)}
        onLoad={(e) => {
          const img = e.currentTarget;
          if (img.naturalWidth && img.naturalHeight) {
            setDims(mediaDimsFromRatio(img.naturalWidth, img.naturalHeight));
          }
        }}
      />
    </MediaFitFrame>
  );

  if (!frame) return null;

  if (isPortrait) {
    return (
      <div className="ju-game-mode-portrait-card ju-media-fit-portrait-wrap" style={frameStyle}>
        {frame}
      </div>
    );
  }

  return frame;
}
