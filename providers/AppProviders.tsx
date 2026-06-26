"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { SiteContent } from "@/types/site-content";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { SiteThemeStyle } from "@/components/SiteThemeStyle";
import { mergeTheme } from "@/lib/theme-css";
import { defaultTheme } from "@/lib/v2-content-defaults";

export type Locale = "en" | "fr";

type LangContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
};

type SiteContextValue = {
  content: SiteContent;
  setContent: React.Dispatch<React.SetStateAction<SiteContent>>;
  saveToServer: () => Promise<{ ok: true } | { ok: false; error: string }>;
};

const LangContext = createContext<LangContextValue | null>(null);
const SiteContext = createContext<SiteContextValue | null>(null);

export function AppProviders({
  children,
  initialContent,
}: {
  children: React.ReactNode;
  initialContent: SiteContent;
}) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [content, setContent] = useState<SiteContent>(initialContent);

  useEffect(() => {
    try {
      const s = localStorage.getItem("jl_locale");
      if (s === "fr" || s === "en") setLocaleState(s);
    } catch {
      /* ignore */
    }
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      localStorage.setItem("jl_locale", l);
    } catch {
      /* ignore */
    }
    document.documentElement.lang = l;
  }, []);

  const saveToServer = useCallback(async () => {
    const payload = {
      ...content,
      schemaVersion: content.schemaVersion ?? 5,
    };
    const res = await fetch("/api/site", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      try {
        const fresh = (await fetch("/api/site", { cache: "no-store" }).then((r) =>
          r.json(),
        )) as SiteContent;
        setContent(fresh);
      } catch {
        setContent(payload);
      }
      return { ok: true as const };
    }
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    if (res.status === 401) {
      return {
        ok: false as const,
        error: "Session expired — log in again at /admin/login.",
      };
    }
    return {
      ok: false as const,
      error: data.error ?? `Save failed (HTTP ${res.status}).`,
    };
  }, [content]);

  const langValue = useMemo(
    () => ({ locale, setLocale }),
    [locale, setLocale],
  );

  const siteValue = useMemo(
    () => ({
      content,
      setContent,
      saveToServer,
    }),
    [content, saveToServer],
  );

  return (
    <LangContext.Provider value={langValue}>
      <SiteContext.Provider value={siteValue}>
        <SiteThemeStyle theme={mergeTheme(content.theme ?? defaultTheme)} />
        <ThemeProvider>{children}</ThemeProvider>
      </SiteContext.Provider>
    </LangContext.Provider>
  );
}

export function useLocaleContext() {
  const c = useContext(LangContext);
  if (!c) throw new Error("useLocaleContext must be used within AppProviders");
  return c;
}

export function useSiteContext() {
  const c = useContext(SiteContext);
  if (!c) throw new Error("useSiteContext must be used within AppProviders");
  return c;
}
