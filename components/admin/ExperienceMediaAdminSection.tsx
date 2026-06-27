"use client";

import type { SiteContent } from "@/types/site-content";
import { defaultSiteContent } from "@/lib/site-defaults";
import { AdminImageUpload } from "@/components/AdminImageUpload";
import { AdminVideoUpload } from "@/components/AdminVideoUpload";

function experienceGalleryItem(content: SiteContent) {
  return content.gallery?.[0] ?? defaultSiteContent.gallery[0];
}

export function ExperienceMediaAdminSection({
  content,
  onChange,
}: {
  content: SiteContent;
  onChange: (gallery: SiteContent["gallery"]) => void;
}) {
  const item = experienceGalleryItem(content);

  function patchFirst(patch: { image?: string; video?: string }) {
    const gallery = [...(content.gallery?.length ? content.gallery : defaultSiteContent.gallery)];
    gallery[0] = { ...gallery[0], ...patch };
    onChange(gallery);
  }

  return (
    <div className="space-y-4">
      <AdminImageUpload
        label="Experience image"
        helper="Shown beside “The Experience” on the home page when no video is set. Layout adapts to landscape, portrait, or square."
        value={item.image}
        onChange={(v) => patchFirst({ image: v })}
      />
      <AdminVideoUpload
        label="Experience video (optional)"
        helper="When set, video replaces the image. MP4, WebM, or MOV from your computer."
        value={item.video ?? ""}
        onChange={(v) => patchFirst({ video: v })}
      />
    </div>
  );
}
