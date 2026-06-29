"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import {
  MediaFitFrame,
  mediaDimsFromRatio,
  mediaFitVideoClass,
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

  const borderGlow = accentColor
    ? `color-mix(in srgb, ${accentColor} 40%, transparent)`
    : "rgba(255,255,255,0.12)";

  const frameStyle = {
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
      <div
        className="ju-game-mode-media-grid pointer-events-none absolute inset-0 z-[1] opacity-[0.35]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-[3] h-12 bg-gradient-to-t from-black/70 to-transparent"
        aria-hidden
      />
    </>
  );

  if (vid) {
    return (
      <MediaFitFrame
        dims={dims}
        className={cn("group/media rounded-lg shadow-[0_0_48px_rgba(0,0,0,0.45)]", className)}
        style={frameStyle}
        overlay={overlay}
      >
        <video
          className={cn(mediaFitVideoClass, "transition duration-700 group-hover/media:scale-[1.02]")}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedMetadata={(e) => {
            const el = e.currentTarget;
            setDims(mediaDimsFromRatio(el.videoWidth, el.videoHeight));
          }}
        >
          <source src={vid} />
        </video>
      </MediaFitFrame>
    );
  }

  if (!imgSrc) return null;

  return (
    <MediaFitFrame
      dims={dims}
      className={cn("rounded-lg", className)}
      style={{ borderColor: borderGlow }}
      overlay={
        <div className="absolute inset-0 bg-gradient-to-r from-[#030308]/80 to-transparent" aria-hidden />
      }
    >
      <Image
        src={imgSrc}
        alt={alt}
        fill
        className="object-contain transition duration-700 group-hover:scale-[1.02]"
        sizes="(max-width: 1024px) 100vw, 50vw"
        unoptimized={/^https?:\/\//.test(imgSrc)}
        onLoad={(e) => {
          const img = e.currentTarget;
          setDims(mediaDimsFromRatio(img.naturalWidth, img.naturalHeight));
        }}
      />
    </MediaFitFrame>
  );
}
