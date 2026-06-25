import type { SiteTheme } from "@/types/v2-site-content";
import { defaultTheme } from "@/lib/v2-content-defaults";

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const h = hex.replace("#", "").trim();
  if (h.length === 3) {
    return {
      r: parseInt(h[0] + h[0], 16),
      g: parseInt(h[1] + h[1], 16),
      b: parseInt(h[2] + h[2], 16),
    };
  }
  if (h.length !== 6) return null;
  const n = parseInt(h, 16);
  if (Number.isNaN(n)) return null;
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function rgba(hex: string, alpha: number, fallback: string): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return fallback;
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
}

export function mergeTheme(theme?: Partial<SiteTheme> | null): SiteTheme {
  return { ...defaultTheme, ...theme };
}

/** Only CSS variables — globals.css keeps the original v3 design. */
export function generateThemeCss(themeInput?: Partial<SiteTheme> | null): string {
  const theme = mergeTheme(themeInput);
  return `
    :root {
      --ju-magenta: ${theme.magenta};
      --ju-purple: ${theme.purple};
      --ju-cyan: ${theme.cyan};
      --ju-cyan-glow: ${theme.cyan};
      --ju-pink-glow: ${theme.pinkGlow};
      --ju-bg-deep: ${theme.bgDeep};
      --ju-bg-mid: ${theme.bgMid};
      --ju-bg-nav: ${theme.bgNav};
      --ju-gradient-start: ${theme.gradientStart};
      --ju-gradient-mid: ${theme.gradientMid};
      --ju-gradient-end: ${theme.gradientEnd};
      --ju-focus: ${rgba(theme.cyan, 0.48, "rgba(0, 245, 255, 0.48)")};
    }
  `;
}
