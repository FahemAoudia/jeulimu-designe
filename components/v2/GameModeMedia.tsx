"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

type MediaLayout = "landscape" | "portrait" | "square";

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
  const [layout, setLayout] = useState<MediaLayout>("landscape");

  const borderGlow = accentColor
    ? `color-mix(in srgb, ${accentColor} 40%, transparent)`
    : "rgba(255,255,255,0.12)";

  if (vid) {
    return (
      <div
        className={cn(
          "ju-game-mode-media group/media relative overflow-hidden rounded-lg border bg-[#060610] shadow-[0_0_48px_rgba(0,0,0,0.45)]",
          layout === "portrait" && "ju-game-mode-media--portrait",
          layout === "landscape" && "ju-game-mode-media--landscape",
          layout === "square" && "ju-game-mode-media--square",
          className,
        )}
        style={{
          borderColor: borderGlow,
          boxShadow: accentColor
            ? `0 0 32px color-mix(in srgb, ${accentColor} 18%, transparent), 0 8px 32px rgba(0,0,0,0.4)`
            : undefined,
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-tr from-[#030308]/50 via-transparent to-transparent"
          aria-hidden
        />
        <div className="ju-game-mode-media-grid pointer-events-none absolute inset-0 z-[1] opacity-[0.35]" aria-hidden />
        <video
          className="h-full w-full object-cover transition duration-700 group-hover/media:scale-[1.03]"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedMetadata={(e) => {
            const el = e.currentTarget;
            const w = el.videoWidth;
            const h = el.videoHeight;
            if (!w || !h) return;
            const ratio = w / h;
            if (ratio < 0.85) setLayout("portrait");
            else if (ratio > 1.2) setLayout("landscape");
            else setLayout("square");
          }}
        >
          <source src={vid} />
        </video>
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 z-[3] h-12 bg-gradient-to-t from-black/70 to-transparent"
          aria-hidden
        />
      </div>
    );
  }

  if (!imgSrc) return null;

  return (
    <div
      className={cn(
        "ju-game-mode-media ju-game-mode-media--landscape relative w-full overflow-hidden rounded-lg border bg-[#060610] aspect-video min-h-[200px] lg:min-h-[280px]",
        className,
      )}
      style={{ borderColor: borderGlow }}
    >
      <Image
        src={imgSrc}
        alt={alt}
        fill
        className="object-cover transition duration-700 group-hover:scale-105"
        sizes="(max-width: 1024px) 100vw, 50vw"
        unoptimized={/^https?:\/\//.test(imgSrc)}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#030308]/80 to-transparent" aria-hidden />
    </div>
  );
}
