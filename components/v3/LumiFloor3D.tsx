"use client";

import { cn } from "@/lib/cn";

const TILE_COUNT = 30;
const COLORS = [
  "rgba(0, 245, 255, 0.35)",
  "rgba(255, 45, 149, 0.35)",
  "rgba(123, 44, 255, 0.35)",
  "rgba(255, 195, 0, 0.28)",
];

/**
 * Lightweight CSS-only “LED floor” — no WebGL, no extra JS loop.
 */
export function LumiFloor3D({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "ju-floor-3d pointer-events-none absolute select-none",
        className,
      )}
      aria-hidden
    >
      <div className="ju-floor-3d-stage">
        <div className="ju-floor-3d-grid">
          {Array.from({ length: TILE_COUNT }).map((_, i) => (
            <div
              key={i}
              className="ju-floor-tile"
              style={{
                animationDelay: `${(i % 6) * 0.22}s`,
                backgroundColor: COLORS[i % COLORS.length],
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
