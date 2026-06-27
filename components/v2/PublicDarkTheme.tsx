"use client";

import { useEffect } from "react";
import { useTheme } from "@/providers/ThemeProvider";

/** Public site is dark-only — no visitor light-mode toggle. */
export function PublicDarkTheme() {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme("dark");
  }, [setTheme]);

  return null;
}
