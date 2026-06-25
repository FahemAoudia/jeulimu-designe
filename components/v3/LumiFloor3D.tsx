"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { useLocaleContext } from "@/providers/AppProviders";

const COLS = 8;
const ROWS = 6;
const TILE_COUNT = COLS * ROWS;

type TileKind = "blue" | "green" | "red";

const TILE_STYLES: Record<TileKind, { base: string; glow: string }> = {
  blue: { base: "rgba(0, 120, 255, 0.75)", glow: "rgba(0, 180, 255, 1)" },
  green: { base: "rgba(0, 200, 90, 0.65)", glow: "rgba(0, 255, 120, 0.95)" },
  red: { base: "rgba(255, 55, 55, 0.9)", glow: "rgba(255, 90, 90, 1)" },
};

function buildTileKinds(): TileKind[] {
  return Array.from({ length: TILE_COUNT }, (_, i) => {
    const col = i % COLS;
    if (col % 4 === 0) return "green";
    return "blue";
  });
}

type LumiFloor3DProps = {
  className?: string;
  showStage?: boolean;
};

export function LumiFloor3D({ className, showStage = true }: LumiFloor3DProps) {
  const { locale } = useLocaleContext();
  const arenaRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [pointer, setPointer] = useState({ col: -1, row: -1 });
  const [isHovering, setIsHovering] = useState(false);
  const [sweepCol, setSweepCol] = useState(0);
  const [kinds, setKinds] = useState<TileKind[]>(() => buildTileKinds());

  useEffect(() => {
    const id = setInterval(() => {
      setSweepCol((c) => (c + 1) % COLS);
    }, 450);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    setKinds((prev) =>
      prev.map((kind, i) => {
        const col = i % COLS;
        if (col === sweepCol && kind === "blue") return "green";
        return kind;
      }),
    );
  }, [sweepCol]);

  const updateFromPoint = useCallback((clientX: number, clientY: number) => {
    const el = arenaRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
    setTilt({ x: (x - 0.5) * 14, y: (y - 0.5) * -10 });
    setPointer({
      col: Math.min(COLS - 1, Math.floor(x * COLS)),
      row: Math.min(ROWS - 1, Math.floor(y * ROWS)),
    });
  }, []);

  const reset = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setPointer({ col: -1, row: -1 });
    setIsHovering(false);
  }, []);

  const floor = (
    <div
      ref={arenaRef}
      className="ju-floor-arena relative h-full w-full touch-none"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={reset}
      onMouseMove={(e) => {
        setIsHovering(true);
        updateFromPoint(e.clientX, e.clientY);
      }}
      onTouchStart={(e) => {
        const touch = e.touches[0];
        if (touch) updateFromPoint(touch.clientX, touch.clientY);
      }}
      onTouchMove={(e) => {
        const touch = e.touches[0];
        if (touch) updateFromPoint(touch.clientX, touch.clientY);
      }}
      onTouchEnd={reset}
    >
      <div
        className="ju-floor-spotlight pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: isHovering ? 1 : 0.35,
          background: `radial-gradient(circle at ${((pointer.col + 0.5) / COLS) * 100}% ${((pointer.row + 0.5) / ROWS) * 100}%, rgba(0,245,255,0.22) 0%, transparent 42%)`,
        }}
      />

      <div
        className="ju-floor-3d-stage h-full w-full transition-transform duration-200 ease-out"
        style={{
          transform: `rotateX(${58 + tilt.y}deg) rotateZ(${-14 + tilt.x}deg)`,
        }}
      >
        <div className="ju-floor-3d-grid" style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}>
          {kinds.map((kind, i) => {
            const col = i % COLS;
            const row = Math.floor(i / COLS);
            const isRedSweep = col === sweepCol;
            const tileKind: TileKind = isRedSweep ? "red" : kind;
            const dist =
              pointer.col < 0 ? 99 : Math.hypot(col - pointer.col, row - pointer.row);
            const hot = dist <= 1.2;
            const warm = dist <= 2.2;
            const color = TILE_STYLES[tileKind];
            return (
              <div
                key={i}
                className={cn(
                  "ju-floor-tile transition-all duration-150",
                  hot && "ju-floor-tile-hot",
                  warm && !hot && "ju-floor-tile-warm",
                  isRedSweep && "ju-floor-tile-sweep",
                )}
                style={{
                  backgroundColor: hot ? color.glow : color.base,
                  opacity: hot ? 1 : warm ? 0.92 : isRedSweep ? 1 : 0.55,
                  animationDelay: `${(i % COLS) * 0.12}s`,
                  transform: hot
                    ? "translateZ(14px) scale(1.08)"
                    : warm
                      ? "translateZ(6px)"
                      : isRedSweep
                        ? "translateZ(10px) scale(1.05)"
                        : "translateZ(0)",
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );

  if (!showStage) {
    return (
      <div className={cn("ju-floor-3d-standalone", className)} aria-hidden>
        {floor}
      </div>
    );
  }

  return (
    <div className={cn("ju-floor-panel w-full max-w-[420px]", className)}>
      <div className="ju-floor-panel-header flex items-center justify-between gap-2 px-4 py-3">
        <span className="font-display text-[10px] font-bold uppercase tracking-[0.28em] text-ju-cyanGlow">
          {locale === "fr" ? "Plancher LED interactif" : "Interactive LED floor"}
        </span>
        <span className="text-[9px] font-bold uppercase tracking-widest text-white/35">
          {locale === "fr" ? "Éliminez le bleu" : "Clear the blue"}
        </span>
      </div>
      <div className="ju-floor-panel-body relative aspect-[4/3] p-4 sm:p-5">
        {floor}
        <div className="pointer-events-none absolute bottom-3 left-4 right-4 flex justify-between text-[9px] font-bold uppercase tracking-widest text-white/30">
          <span>16&apos;×24&apos;</span>
          <span>{locale === "fr" ? "Rouge en mouvement" : "Red on the move"}</span>
        </div>
      </div>
    </div>
  );
}
