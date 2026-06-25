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
import { defaultTheme } from "@/lib/v2-content-defaults";

export type Locale = "en" | "fr";

type LangContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
};

type SiteContextValue = {
  content: SiteContent;
  setContent: React.Dispatch<React.SetStateAction<SiteContent>>;
  saveToServer: () => Promise<boolean>;
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
    const res = await fetch("/api/site", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    return res.ok;
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
        <SiteThemeStyle theme={content.theme ?? defaultTheme} />
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
