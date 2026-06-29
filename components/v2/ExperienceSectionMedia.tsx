"use client";

import { useState, type CSSProperties } from "react";
import Image from "next/image";
import {
  MediaFitFrame,
  mediaDimsFromRatio,
  mediaFitVideoClass,
  mediaOrient,
  type MediaDims,
} from "@/components/v2/MediaFitFrame";

export function ExperienceSectionMedia({
  image,
  video,
}: {
  image: string;
  video?: string;
}) {
  const vid = video?.trim();
  const imgSrc = image?.trim() || "/hero-background.png";
  const [dims, setDims] = useState<MediaDims | null>(null);
  const isPortrait = mediaOrient(dims) === "portrait";

  const overlay = (
    <div
      className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#030308]/85 via-transparent to-[#7B2CFF]/15"
      aria-hidden
    />
  );

  const frameStyle: CSSProperties = isPortrait
    ? { ["--portrait-glow" as string]: "#00f5ff" }
    : {};

  const frame = vid ? (
    <MediaFitFrame
      dims={dims}
      size={isPortrait ? "compact" : "default"}
      className={isPortrait ? "rounded-2xl border-white/15" : "border-white/10 w-full"}
      style={frameStyle}
      overlay={overlay}
    >
      <video
        className={mediaFitVideoClass}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={imgSrc}
        onLoadedMetadata={(e) => {
          const el = e.currentTarget;
          setDims(mediaDimsFromRatio(el.videoWidth, el.videoHeight));
        }}
      >
        <source src={vid} />
      </video>
    </MediaFitFrame>
  ) : (
    <MediaFitFrame
      dims={dims}
      size={isPortrait ? "compact" : "default"}
      className={isPortrait ? "rounded-2xl border-white/15" : "border-white/10 w-full"}
      style={frameStyle}
      overlay={overlay}
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
          setDims(mediaDimsFromRatio(img.naturalWidth, img.naturalHeight));
        }}
      />
    </MediaFitFrame>
  );

  if (isPortrait) {
    return <div className="ju-media-fit-portrait-wrap">{frame}</div>;
  }

  return frame;
}
