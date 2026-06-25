import type { SiteTheme } from "@/types/v2-site-content";
import { defaultTheme } from "@/lib/v2-content-defaults";

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const h = hex.replace("#", "").trim();
  if (h.length === 3) {
    const r = parseInt(h[0] + h[0], 16);
    const g = parseInt(h[1] + h[1], 16);
    const b = parseInt(h[2] + h[2], 16);
    return { r, g, b };
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
  const t = { ...defaultTheme, ...theme };
  return {
    ...t,
    pinkGlow: t.pinkGlow || t.magenta,
    bgMid: t.bgMid || defaultTheme.bgMid,
    bgNav: t.bgNav || defaultTheme.bgNav,
    gradientStart: t.gradientStart || defaultTheme.gradientStart,
    gradientMid: t.gradientMid || defaultTheme.gradientMid,
    gradientEnd: t.gradientEnd || t.bgDeep,
  };
}

/** CSS custom properties + v3 overrides applied site-wide (public + admin). */
export function generateThemeCss(themeInput?: Partial<SiteTheme> | null): string {
  const theme = mergeTheme(themeInput);
  const cyan = theme.cyan;
  const magenta = theme.magenta;
  const purple = theme.purple;

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
      --ju-focus: ${rgba(cyan, 0.48, "rgba(0, 245, 255, 0.48)")};
    }
    .ju-body-root {
      background: linear-gradient(
        165deg,
        var(--ju-gradient-start) 0%,
        var(--ju-gradient-mid) 52%,
        var(--ju-gradient-end) 100%
      ) !important;
    }
    .ju-v3-shell {
      background-color: ${theme.bgDeep};
      background-image:
        radial-gradient(ellipse 80% 50% at 50% -20%, ${rgba(purple, 0.14, "rgba(123, 44, 255, 0.14)")}, transparent 55%),
        radial-gradient(ellipse 60% 40% at 100% 50%, ${rgba(magenta, 0.06, "rgba(255, 45, 149, 0.06)")}, transparent 50%),
        radial-gradient(ellipse 50% 40% at 0% 80%, ${rgba(cyan, 0.05, "rgba(0, 245, 255, 0.05)")}, transparent 45%);
    }
    .ju-lumi-grid {
      background-image:
        linear-gradient(${rgba(cyan, 0.04, "rgba(0, 245, 255, 0.04)")} 1px, transparent 1px),
        linear-gradient(90deg, ${rgba(cyan, 0.04, "rgba(0, 245, 255, 0.04)")} 1px, transparent 1px);
    }
    .ju-nav-v3[data-scrolled="true"] {
      border-bottom-color: ${rgba(cyan, 0.12, "rgba(0, 245, 255, 0.12)")};
    }
    .ju-btn-primary {
      background: linear-gradient(135deg, ${magenta} 0%, ${purple} 100%);
      box-shadow: 0 4px 24px ${rgba(magenta, 0.35, "rgba(255, 45, 149, 0.35)")};
    }
    .ju-btn-primary:hover {
      box-shadow: 0 8px 36px ${rgba(magenta, 0.5, "rgba(255, 45, 149, 0.5)")};
    }
    .ju-btn-ghost:hover {
      border-color: ${rgba(cyan, 0.45, "rgba(0, 245, 255, 0.45)")};
      background: ${rgba(cyan, 0.06, "rgba(0, 245, 255, 0.06)")};
      box-shadow: 0 0 24px ${rgba(cyan, 0.12, "rgba(0, 245, 255, 0.12)")};
    }
    .ju-hero-outline {
      -webkit-text-stroke: 1px ${rgba(cyan, 0.35, "rgba(0, 245, 255, 0.35)")};
    }
    .ju-footer-v3 {
      border-image: linear-gradient(90deg, transparent, ${rgba(cyan, 0.35, "rgba(0, 245, 255, 0.35)")}, ${rgba(magenta, 0.35, "rgba(255, 45, 149, 0.35)")}, transparent) 1;
    }
    .ju-floor-panel {
      border-color: ${rgba(cyan, 0.28, "rgba(0, 245, 255, 0.28)")};
      box-shadow:
        0 0 0 1px rgba(255, 255, 255, 0.04) inset,
        0 24px 64px rgba(0, 0, 0, 0.55),
        0 0 48px ${rgba(cyan, 0.08, "rgba(0, 245, 255, 0.08)")};
    }
    .text-gradient-game {
      background-image: linear-gradient(to right, ${cyan}, ${purple}, ${magenta});
    }
  `;
}
