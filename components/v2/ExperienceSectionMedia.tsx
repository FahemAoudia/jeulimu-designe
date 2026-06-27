"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

type MediaLayout = "landscape" | "portrait" | "square";

function layoutFromRatio(ratio: number): MediaLayout {
  if (ratio < 0.85) return "portrait";
  if (ratio > 1.2) return "landscape";
  return "square";
}

export function ExperienceSectionMedia({
  image,
  video,
}: {
  image: string;
  video?: string;
}) {
  const vid = video?.trim();
  const imgSrc = image?.trim() || "/hero-background.png";
  const [layout, setLayout] = useState<MediaLayout>("landscape");

  if (vid) {
    return (
      <div
        className={cn(
          "ju-game-mode-media relative overflow-hidden border border-white/10 bg-[#060610]",
          layout === "portrait" && "ju-game-mode-media--portrait",
          layout === "landscape" && "ju-game-mode-media--landscape",
          layout === "square" && "ju-game-mode-media--square",
        )}
      >
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={imgSrc}
          onLoadedMetadata={(e) => {
            const el = e.currentTarget;
            if (el.videoWidth && el.videoHeight) {
              setLayout(layoutFromRatio(el.videoWidth / el.videoHeight));
            }
          }}
        >
          <source src={vid} />
        </video>
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#030308]/85 via-transparent to-[#7B2CFF]/15"
          aria-hidden
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "ju-game-mode-media relative overflow-hidden border border-white/10 bg-[#060610]",
        layout === "portrait" && "ju-game-mode-media--portrait",
        layout === "landscape" && "ju-game-mode-media--landscape",
        layout === "square" && "ju-game-mode-media--square",
      )}
    >
      <Image
        src={imgSrc}
        alt=""
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 50vw"
        unoptimized={/^https?:\/\//.test(imgSrc)}
        onLoad={(e) => {
          const img = e.currentTarget;
          if (img.naturalWidth && img.naturalHeight) {
            setLayout(layoutFromRatio(img.naturalWidth / img.naturalHeight));
          }
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#030308]/85 via-transparent to-[#7B2CFF]/15"
        aria-hidden
      />
    </div>
  );
}
