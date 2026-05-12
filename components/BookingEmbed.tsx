"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Script from "next/script";
import { cn } from "@/lib/cn";

type BookingEmbedProps = {
  className?: string;
  iframeUrl: string;
};

export function BookingEmbed({ className, iframeUrl }: BookingEmbedProps) {
  const [loaded, setLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const applyIframeChrome = useCallback(() => {
    const el = iframeRef.current;
    if (!el) return;
    const light =
      document.documentElement.getAttribute("data-theme") === "light";
    el.style.setProperty("color-scheme", light ? "only light" : "only dark");
  }, []);

  /** Embedded scheduler reads prefers-color-scheme inside the iframe; align the iframe’s
   *  used color-scheme with jeuLumi Clair/Sombre so labels aren’t light-on-light. */
  useLayoutEffect(() => {
    applyIframeChrome();
    const mo = new MutationObserver(applyIframeChrome);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => mo.disconnect();
  }, [applyIframeChrome]);

  /**
   * Acuity’s embed.js sets iframe height from `sizing:NNN` postMessages; the value is often
   * slightly short, which leaves an inner scrollbar inside their UI. After their handler runs,
   * bump height so the page scrolls instead (outer document scrollbar only).
   */
  useEffect(() => {
    const ifr = iframeRef.current;
    if (!ifr) return;

    const onMsg = (ev: MessageEvent) => {
      if (typeof ev.data !== "string" || !ev.data.startsWith("sizing:")) return;
      if (ifr.contentWindow !== ev.source) return;
      const raw = parseInt(ev.data.split(":")[1] || "0", 10);
      if (!(raw > 150)) return;
      window.setTimeout(() => {
        const extra = Math.max(180, Math.round(raw * 0.12));
        ifr.style.setProperty("height", `${raw + extra}px`, "important");
        ifr.style.setProperty("max-height", "none", "important");
        ifr.style.setProperty("overflow", "hidden", "important");
        applyIframeChrome();
      }, 0);
    };

    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, [iframeUrl, applyIframeChrome]);

  const nonceSafeId = useMemo(
    () => `jl-booking-embed-${Math.random().toString(16).slice(2)}`,
    [],
  );

  return (
    <div
      className={cn(
        /* overflow-y-visible: avoid trapping wheel/touch so the page can scroll naturally */
        "ju-booking-embed relative overflow-x-clip overflow-y-visible rounded-2xl border border-white/12 bg-white/[0.04] shadow-glass backdrop-blur-xl transition-shadow duration-300",
        className,
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 opacity-100 transition duration-500",
          loaded ? "opacity-0" : "opacity-100",
        )}
        aria-hidden
      >
        <div className="absolute inset-0 bg-gradient-to-br from-ju-electric/10 via-transparent to-[#FF2D95]/10" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="p-5 sm:p-6 lg:p-7">
          <div className="h-5 w-44 rounded bg-white/10" />
          <div className="mt-3 h-4 w-72 max-w-full rounded bg-white/10" />
          <div className="mt-6 h-[480px] w-full rounded-xl bg-white/[0.06] sm:h-[540px] lg:h-[600px]" />
        </div>
      </div>

      <div className="ju-booking-embed-inner p-2 sm:p-3">
        <Script
          id={nonceSafeId}
          src="https://embed.acuityscheduling.com/js/embed.js"
          strategy="afterInteractive"
        />
        <iframe
          ref={iframeRef}
          title="Schedule a booking"
          src={iframeUrl}
          className={cn(
            "ju-booking-scheduler-frame w-full rounded-xl border border-white/10 bg-[#02020F]/30",
            /* Low floor until Acuity sends sizing: — large min-h fights embed.js and keeps inner scroll */
            "min-h-[min(42vh,480px)] sm:min-h-[min(44vh,520px)] lg:min-h-[min(46vh,540px)]",
            "transition-opacity duration-500",
            loaded ? "opacity-100" : "opacity-0",
          )}
          onLoad={() => setLoaded(true)}
          loading="eager"
        />
      </div>
    </div>
  );
}

