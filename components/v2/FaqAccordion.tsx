"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

export function FaqAccordion({
  items,
}: {
  items: { q: string; a: string }[];
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-2">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm"
          >
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span className="text-sm font-semibold text-white sm:text-base">{item.q}</span>
              <ChevronDown
                className={cn(
                  "size-5 shrink-0 text-ju-cyanGlow transition",
                  isOpen && "rotate-180",
                )}
                aria-hidden
              />
            </button>
            {isOpen ? (
              <div className="border-t border-white/10 px-5 pb-4 pt-3 text-sm leading-relaxed text-ju-soft">
                {item.a}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

export function FaqGrouped({
  groups,
}: {
  groups: { label: string; items: { q: string; a: string }[] }[];
}) {
  return (
    <div className="space-y-10">
      {groups.map((g) => (
        <div key={g.label}>
          <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-ju-cyanGlow">
            {g.label}
          </h3>
          <FaqAccordion items={g.items} />
        </div>
      ))}
    </div>
  );
}
