"use client";

import type { GameModeContent } from "@/types/site-content";
import { AdminCollapse, LocEditor } from "@/components/admin/AdminFields";
import { AdminImageUpload } from "@/components/AdminImageUpload";
import { AdminVideoUpload } from "@/components/AdminVideoUpload";

export function GameModesAdminSection({
  modes,
  onChange,
}: {
  modes: GameModeContent[];
  onChange: (modes: GameModeContent[]) => void;
}) {
  function updateAt(index: number, patch: Partial<GameModeContent>) {
    onChange(modes.map((m, i) => (i === index ? { ...m, ...patch } : m)));
  }

  return (
    <div className="space-y-4">
      <p className="text-sm leading-relaxed text-ju-muted">
        Upload an image or a looping video for each mode. When a video is set, it replaces the image on
        the homepage. Portrait and landscape videos resize automatically.
      </p>
      {modes.map((mode, i) => (
        <AdminCollapse
          key={mode.id}
          title={mode.name.en || mode.id}
          hint={mode.tagline.en}
          defaultOpen={i === 0}
        >
          <div className="space-y-4">
            <LocEditor
              label="Name"
              value={mode.name}
              onChange={(v) => updateAt(i, { name: v })}
            />
            <LocEditor
              label="Tagline"
              value={mode.tagline}
              onChange={(v) => updateAt(i, { tagline: v })}
            />
            <LocEditor
              label="Lead"
              value={mode.lead}
              onChange={(v) => updateAt(i, { lead: v })}
            />
            <LocEditor
              label="Description"
              value={mode.description}
              onChange={(v) => updateAt(i, { description: v })}
            />
            <AdminImageUpload
              label="Image"
              helper="Shown when no video is uploaded."
              value={mode.image ?? ""}
              onChange={(v) => updateAt(i, { image: v })}
            />
            <AdminVideoUpload
              label="Video (optional)"
              helper="Loops automatically. Overrides the image on the live site."
              value={mode.video ?? ""}
              onChange={(v) => updateAt(i, { video: v })}
            />
            {mode.video?.trim() ? (
              <button
                type="button"
                className="text-xs font-semibold text-ju-muted hover:text-white"
                onClick={() => updateAt(i, { video: "" })}
              >
                Remove video (use image only)
              </button>
            ) : null}
          </div>
        </AdminCollapse>
      ))}
    </div>
  );
}
