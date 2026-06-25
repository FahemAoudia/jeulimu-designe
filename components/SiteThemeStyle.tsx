"use client";

import type { SiteTheme } from "@/types/v2-site-content";
import { generateThemeCss } from "@/lib/theme-css";

export function SiteThemeStyle({ theme }: { theme: SiteTheme }) {
  return <style id="jl-theme-vars" dangerouslySetInnerHTML={{ __html: generateThemeCss(theme) }} />;
}
