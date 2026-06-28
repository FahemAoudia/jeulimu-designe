import type { SiteTheme } from "@/types/v2-site-content";
import { defaultTheme } from "@/lib/v2-content-defaults";
import { normalizeSiteFontKey, siteFontFamilyCss } from "@/lib/font-catalog";

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

function fontStack(key: SiteTheme["fontBody"]): string {
  return siteFontFamilyCss(normalizeSiteFontKey(key));
}

function headingStack(key: SiteTheme["fontHeading"]): string {
  return siteFontFamilyCss(normalizeSiteFontKey(key));
}

export function mergeTheme(theme?: Partial<SiteTheme> | null): SiteTheme {
  return { ...defaultTheme, ...theme };
}

/** CSS variables for brand + nav + footer + fonts + light mode. */
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
      --ju-nav-bg: ${theme.navBackground};
      --ju-nav-text: ${theme.navText};
      --ju-nav-text-muted: ${rgba(theme.navTextMuted, 0.65, "rgba(255, 255, 255, 0.65)")};
      --ju-nav-link-active: ${theme.navLinkActive};
      --ju-nav-mobile-bg: ${rgba(theme.navMobileBackground, 0.98, "rgba(3, 3, 8, 0.98)")};
      --ju-nav-border: ${theme.navLinkActive};
      --ju-footer-bg: ${theme.footerBackground};
      --ju-footer-text: ${theme.footerText};
      --ju-footer-text-muted: ${rgba(theme.footerTextMuted, 0.55, "rgba(255, 255, 255, 0.55)")};
      --ju-footer-heading: ${theme.footerHeading};
      --ju-footer-icon: ${theme.footerIconAccent};
      --ju-footer-copyright: ${rgba(theme.footerTextMuted, 0.35, "rgba(255, 255, 255, 0.35)")};
      --ju-footer-tagline: ${rgba(theme.footerTextMuted, 0.5, "rgba(255, 255, 255, 0.5)")};
      --ju-font-body: ${fontStack(theme.fontBody)};
      --ju-font-heading: ${headingStack(theme.fontHeading)};
      --ju-body-gradient-start: ${theme.gradientStart};
      --ju-body-gradient-mid: ${theme.gradientMid};
      --ju-body-gradient-end: ${theme.gradientEnd};
    }
    html[data-theme="light"] {
      --ju-bg-deep: ${theme.lightBgDeep};
      --ju-bg-mid: ${theme.lightBgMid};
      --ju-gradient-start: ${theme.lightBgDeep};
      --ju-gradient-mid: ${theme.lightBgMid};
      --ju-gradient-end: ${theme.lightBgDeep};
      --ju-light-text: ${theme.lightTextPrimary};
      --ju-light-text-muted: ${theme.lightTextMuted};
    }
    body.ju-body-root {
      font-family: var(--ju-font-body);
    }
    .font-display,
    .ju-section-heading h1,
    .ju-section-heading h2,
    .ju-section-heading h3 {
      font-family: var(--ju-font-heading);
    }
  `;
}
