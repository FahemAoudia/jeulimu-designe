"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { MessageCircle, X, Sparkles } from "lucide-react";
import { useLocaleContext, useSiteContext } from "@/providers/AppProviders";
import { ui } from "@/lib/ui-strings";
import { pickLocalized } from "@/types/site-content";
import {
  FAQ_CHAT_OPEN_EVENT,
  type FaqChatOpenDetail,
} from "@/lib/faq-chat-events";

type ChatMsg = { role: "user" | "bot"; text: string };

type ResolvedFaq = { id: string; q: string; a: string };

export function FaqChatbot() {
  const pathname = usePathname();
  const { locale } = useLocaleContext();
  const { content } = useSiteContext();
  const t = ui(locale);
  const items: ResolvedFaq[] = useMemo(
    () =>
      (content.faqItems ?? []).map((it) => ({
        id: it.id,
        q: pickLocalized(it.question, locale),
        a: pickLocalized(it.answer, locale),
      })),
    [content.faqItems, locale],
  );
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const endRef = useRef<HTMLDivElement>(null);

  const scrollToEnd = useCallback(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToEnd();
  }, [messages, open, scrollToEnd]);

  const seedWelcome = useCallback(() => {
    setMessages([{ role: "bot", text: t.chat.welcome }]);
  }, [t.chat.welcome]);

  useEffect(() => {
    setMessages([]);
  }, [locale]);

  useEffect(() => {
    const onOpen = (e: Event) => {
      const { index } = (e as CustomEvent<FaqChatOpenDetail>).detail ?? {};
      if (typeof index !== "number" || !items[index]) return;
      setOpen(true);
      const item = items[index];
      setMessages((prev) => {
        if (prev.length === 0) {
          return [
            { role: "bot", text: t.chat.welcome },
            { role: "user", text: item.q },
            { role: "bot", text: item.a },
          ];
        }
        return [
          ...prev,
          { role: "user", text: item.q },
          { role: "bot", text: item.a },
        ];
      });
    };
    window.addEventListener(FAQ_CHAT_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(FAQ_CHAT_OPEN_EVENT, onOpen);
  }, [items, t.chat.welcome]);

  const openPanel = () => {
    setOpen(true);
    setMessages((prev) => (prev.length === 0 ? [{ role: "bot", text: t.chat.welcome }] : prev));
  };

  const closePanel = () => setOpen(false);

  const ask = (index: number) => {
    const item = items[index];
    if (!item) return;
    setMessages((prev) => {
      const base =
        prev.length === 0
          ? ([{ role: "bot" as const, text: t.chat.welcome }] as ChatMsg[])
          : prev;
      return [
        ...base,
        { role: "user", text: item.q },
        { role: "bot", text: item.a },
      ];
    });
  };

  const clearChat = () => {
    seedWelcome();
  };

  if (pathname?.startsWith("/admin")) return null;

  return (
    <div className="pointer-events-none fixed bottom-0 right-0 z-[90] p-4 sm:p-5">
      <div className="pointer-events-auto flex flex-col items-end gap-3">
        {open ? (
          <div
            className="ju-faq-chrome flex h-[min(72vh,540px)] w-[min(100vw-2rem,400px)] flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#0D0221]/95 shadow-[0_0_48px_rgba(255,45,149,0.22),0_24px_64px_rgba(0,0,0,0.55)] backdrop-blur-xl"
            role="dialog"
            aria-label={t.chat.title}
          >
            <div className="relative overflow-hidden border-b border-white/10 px-4 py-3">
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#FF2D95]/25 via-[#7B2CFF]/15 to-[#00AEEF]/20"
                aria-hidden
              />
              <div className="relative flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="flex size-9 items-center justify-center rounded-xl border border-ju-cyanGlow/35 bg-black/40 text-ju-cyanGlow shadow-[0_0_20px_rgba(0,245,255,0.25)]">
                    <Sparkles className="size-4" aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm font-black uppercase tracking-wide text-white">
                      {t.chat.title}
                    </p>
                    <p className="text-[11px] font-medium text-ju-muted">
                      {t.chat.subtitle}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={closePanel}
                  className="rounded-full border border-white/15 bg-black/35 p-2 text-white transition hover:border-ju-electric hover:text-ju-cyanGlow"
                  aria-label={t.chat.close}
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>

            <div className="flex min-h-0 flex-1 flex-col">
              <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-3 py-3 sm:px-4">
                {messages.map((m, i) =>
                  m.role === "user" ? (
                    <div key={i} className="flex justify-end">
                      <p className="max-w-[92%] rounded-2xl rounded-br-md bg-gradient-to-r from-[#FF2D95] via-[#A259FF] to-[#7B2CFF] px-3 py-2.5 text-[13px] font-medium leading-snug text-white shadow-btn-brand">
                        {m.text}
                      </p>
                    </div>
                  ) : (
                    <div key={i} className="flex justify-start gap-2">
                      <span className="mt-1 hidden size-7 shrink-0 items-center justify-center rounded-lg border border-ju-electric/25 bg-ju-electric/10 text-[10px] font-black text-ju-cyanGlow sm:flex">
                        JL
                      </span>
                      <div className="ju-faq-bubble-bot max-w-[92%] rounded-2xl rounded-bl-md border border-ju-electric/25 bg-black/45 px-3 py-2.5 text-[13px] leading-relaxed text-ju-soft shadow-[inset_0_0_0_1px_rgba(0,245,255,0.06)] transition-colors duration-200">
                        <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-ju-cyanGlow">
                          {t.chat.botName}
                        </span>
                        {m.text}
                      </div>
                    </div>
                  ),
                )}
                <div ref={endRef} />
              </div>

              <div className="ju-faq-footer border-t border-white/10 bg-black/35 px-3 py-3 sm:px-4">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-ju-muted">
                  {t.chat.choose}
                </p>
                {items.length === 0 ? (
                  <p className="ju-faq-empty rounded-lg border border-dashed border-white/15 bg-black/25 px-3 py-3 text-[12px] leading-relaxed text-ju-muted">
                    {t.chat.emptyFaq}
                  </p>
                ) : (
                  <div className="flex max-h-[100px] flex-wrap gap-2 overflow-y-auto sm:max-h-none">
                    {items.map((item, index) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => ask(index)}
                        className="max-w-full rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-left text-[11px] font-semibold leading-snug text-white/90 transition hover:border-ju-electric hover:bg-ju-electric/10 hover:text-white"
                      >
                        {item.q}
                      </button>
                    ))}
                  </div>
                )}
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={clearChat}
                    className="rounded-full border border-white/12 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-ju-muted transition hover:border-ju-yellow/50 hover:text-ju-yellow"
                  >
                    {t.chat.restart}
                  </button>
                  <Link
                    href="/contact"
                    onClick={() => setOpen(false)}
                    className="rounded-full border border-ju-cyanGlow/35 bg-ju-electric/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-ju-cyanGlow transition hover:border-ju-cyanGlow hover:bg-ju-electric/20"
                  >
                    {t.chat.contactCta}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <button
          type="button"
          onClick={() => (open ? closePanel() : openPanel())}
          className="pointer-events-auto flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-[#FF2D95] to-[#7B2CFF] text-white shadow-[0_0_32px_rgba(255,45,149,0.55),0_12px_30px_rgba(0,0,0,0.4)] ring-2 ring-white/15 transition hover:scale-[1.03] hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ju-cyanGlow sm:size-[3.75rem]"
          aria-expanded={open}
          aria-label={open ? t.chat.close : t.chat.openLabel}
        >
          {open ? (
            <X className="size-6" />
          ) : (
            <MessageCircle className="size-6 sm:size-7" strokeWidth={2} />
          )}
        </button>
      </div>
    </div>
  );
}
