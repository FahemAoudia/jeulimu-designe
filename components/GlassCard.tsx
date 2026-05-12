import { cn } from "@/lib/cn";

type GlassCardProps = {
  children: React.ReactNode;
  className?: string;
  glow?: "cyan" | "magenta" | "purple" | "none";
  padding?: boolean;
  id?: string;
};

const glowRing: Record<NonNullable<GlassCardProps["glow"]>, string> = {
  cyan: "shadow-[inset_0_0_0_1px_rgba(0,255,255,0.35)] shadow-[0_0_40px_rgba(0,255,255,0.08)]",
  magenta:
    "shadow-[inset_0_0_0_1px_rgba(255,0,255,0.35)] shadow-[0_0_48px_rgba(255,0,255,0.12)]",
  purple:
    "shadow-[inset_0_0_0_1px_rgba(139,92,246,0.4)] shadow-[0_0_40px_rgba(139,92,246,0.1)]",
  none: "",
};

export function GlassCard({
  children,
  className,
  glow = "cyan",
  padding = true,
  id,
}: GlassCardProps) {
  return (
    <div
      id={id}
      className={cn(
        "ju-glass-surface relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-xl transition-[box-shadow,border-color,transform] duration-300 ease-out",
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/[0.07] before:to-transparent before:to-40%",
        glowRing[glow],
        padding && "p-4 sm:p-5",
        className,
      )}
    >
      {children}
    </div>
  );
}
