"use client";

import type { SiteTheme } from "@/types/v2-site-content";

export function SiteThemeStyle({ theme }: { theme: SiteTheme }) {
  const css = `
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
    }
    .ju-body-root {
      background: linear-gradient(
        165deg,
        var(--ju-gradient-start) 0%,
        var(--ju-gradient-mid) 52%,
        var(--ju-gradient-end) 100%
      );
    }
  `;

  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}
