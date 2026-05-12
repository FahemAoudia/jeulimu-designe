"use client";

import { Moon, Sun } from "lucide-react";
import { useLocaleContext } from "@/providers/AppProviders";
import { useTheme } from "@/providers/ThemeProvider";
import { ui } from "@/lib/ui-strings";
import { cn } from "@/lib/cn";

type ThemeToggleProps = {
  /** `toolbar` matches admin header chrome; both are icon-only */
  variant?: "nav" | "toolbar";
  className?: string;
};

const segment =
  "flex size-[22px] shrink-0 items-center justify-center rounded-full transition sm:size-6";

export function ThemeToggle({ variant = "nav", className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const { locale } = useLocaleContext();
  const t = ui(locale);

  const isLight = theme === "light";

  return (
    <div
      className={cn(
        "ju-theme-toggle flex items-center",
        variant === "toolbar" &&
          "ju-theme-toolbar rounded-lg border border-white/10 bg-black/25 p-px transition-[box-shadow,border-color] duration-200",
        variant === "nav" &&
          "ju-theme-nav rounded-full border border-white/12 bg-white/[0.06] p-px shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md transition-[box-shadow,border-color] duration-200",
        className,
      )}
      role="group"
      aria-label={t.theme.label}
    >
      <div className="flex gap-px rounded-full bg-black/40 p-px ring-1 ring-white/10">
        <button
          type="button"
          onClick={() => setTheme("light")}
          aria-pressed={isLight}
          className={cn(
            segment,
            isLight
              ? "bg-gradient-to-br from-white to-slate-100 text-slate-900 shadow-sm ring-1 ring-slate-200/80"
              : "text-ju-muted hover:text-white",
          )}
          aria-label={t.theme.light}
        >
          <Sun className="size-2.5 sm:size-3" strokeWidth={2} aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => setTheme("dark")}
          aria-pressed={!isLight}
          className={cn(
            segment,
            !isLight
              ? "bg-gradient-to-br from-[#1a1440] to-[#0a0618] text-white shadow-[0_0_12px_rgba(123,44,255,0.2)] ring-1 ring-white/15"
              : "text-ju-muted hover:text-slate-800",
          )}
          aria-label={t.theme.dark}
        >
          <Moon className="size-2.5 sm:size-3" strokeWidth={2} aria-hidden />
        </button>
      </div>
    </div>
  );
}
