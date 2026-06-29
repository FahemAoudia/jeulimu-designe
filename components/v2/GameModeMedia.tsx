"use client";

import { useState, type CSSProperties } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import {
  MediaFitFrame,
  mediaDimsFromRatio,
  mediaFitVideoClass,
  mediaOrient,
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

  const overlay = (
    <>
      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-tr from-[#030308]/50 via-transparent to-transparent"
        aria-hidden
      />
      {!isPortrait ? (
        <div
          className="ju-game-mode-media-grid pointer-events-none absolute inset-0 z-[1] opacity-[0.35]"
          aria-hidden
        />
      ) : null}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-[3] h-10 bg-gradient-to-t from-black/60 to-transparent"
        aria-hidden
      />
    </>
  );

  function setMediaDims(w: number, h: number) {
    setDims(mediaDimsFromRatio(w, h));
  }

  const frame = vid ? (
    <MediaFitFrame
      dims={dims}
      size="compact"
      className={cn(
        "group/media shadow-[0_0_48px_rgba(0,0,0,0.45)]",
        isPortrait ? "rounded-2xl" : "rounded-lg w-full",
        className,
      )}
      style={frameStyle}
      overlay={overlay}
    >
      <video
        className={cn(
          mediaFitVideoClass,
          "transition duration-700 group-hover/media:scale-[1.02]",
        )}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onLoadedMetadata={(e) => {
          const el = e.currentTarget;
          setMediaDims(el.videoWidth, el.videoHeight);
        }}
      >
        <source src={vid} />
      </video>
    </MediaFitFrame>
  ) : !imgSrc ? null : (
    <MediaFitFrame
      dims={dims}
      size="compact"
      className={cn(isPortrait ? "rounded-2xl" : "rounded-lg w-full", className)}
      style={{ borderColor: borderGlow }}
      overlay={
        <div className="absolute inset-0 bg-gradient-to-r from-[#030308]/80 to-transparent" aria-hidden />
      }
    >
      <Image
        src={imgSrc}
        alt={alt}
        fill
        className="object-cover transition duration-700 group-hover:scale-[1.02]"
        sizes="(max-width: 1024px) 100vw, 50vw"
        unoptimized={/^https?:\/\//.test(imgSrc)}
        onLoad={(e) => {
          const img = e.currentTarget;
          setMediaDims(img.naturalWidth, img.naturalHeight);
        }}
      />
    </MediaFitFrame>
  );

  if (!frame) return null;

  if (isPortrait) {
    return (
      <div className="ju-media-fit-portrait-wrap" style={frameStyle}>
        {frame}
      </div>
    );
  }

  return frame;
}
