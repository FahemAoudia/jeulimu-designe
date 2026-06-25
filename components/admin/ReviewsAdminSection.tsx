"use client";

import { ExternalLink, Plus, Trash2 } from "lucide-react";
import type { LocalizedString, TestimonialReview } from "@/types/site-content";
import { AdminCollapse, LocEditor } from "@/components/admin/AdminFields";

const GOOGLE_MAPS_REVIEWS_URL =
  "https://www.google.com/maps/search/?api=1&query=jeuLumi+7427+Newman+Blvd+LaSalle+QC";

function emptyReview(): TestimonialReview {
  const id = `rev-${Date.now()}`;
  return {
    id,
    name: { en: "", fr: "" },
    meta: { en: "Google review", fr: "Avis Google" },
    when: { en: "", fr: "" },
    quote: { en: "", fr: "" },
  };
}

export function ReviewsAdminSection({
  reviews,
  onChange,
}: {
  reviews: TestimonialReview[];
  onChange: (reviews: TestimonialReview[]) => void;
}) {
  function updateAt(index: number, patch: Partial<TestimonialReview>) {
    onChange(reviews.map((r, i) => (i === index ? { ...r, ...patch } : r)));
  }

  function updateField(
    index: number,
    key: "name" | "meta" | "when" | "quote",
    value: LocalizedString,
  ) {
    updateAt(index, { [key]: value });
  }

  return (
    <div className="space-y-4">
      <AdminCollapse
        title="Weekly update — how it works"
        hint="No Google API needed. Copy new reviews from Maps, paste here, then Save."
        defaultOpen
      >
        <ol className="space-y-3 text-sm leading-relaxed text-ju-muted">
          <li>
            <span className="font-bold text-white">1.</span> Open jeuLumi on Google Maps and read the latest reviews.
          </li>
          <li>
            <span className="font-bold text-white">2.</span> Click <strong className="text-white">Add review</strong> below (or edit an existing card).
          </li>
          <li>
            <span className="font-bold text-white">3.</span> Paste the quote in <strong className="text-white">EN</strong> (and FR if you have a translation).
          </li>
          <li>
            <span className="font-bold text-white">4.</span> Fill name, meta (e.g. &quot;Local Guide · 12 reviews&quot;), and when (e.g. &quot;2 weeks ago&quot;).
          </li>
          <li>
            <span className="font-bold text-white">5.</span> Click <strong className="text-white">Save</strong> in the top bar — reviews appear on the homepage carousel.
          </li>
        </ol>
        <p className="mt-4 text-xs leading-relaxed text-ju-muted/90">
          FR — Chaque semaine : ouvrez Google Maps, copiez les nouveaux avis, ajoutez-les ici, puis Sauvegarder.
        </p>
        <a
          href={GOOGLE_MAPS_REVIEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 rounded-lg border border-ju-electric/30 bg-ju-electric/10 px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-ju-cyanGlow hover:bg-ju-electric/15"
        >
          <ExternalLink className="size-3.5" />
          Open jeuLumi on Google Maps
        </a>
      </AdminCollapse>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ju-muted">
          <span className="font-bold text-white">{reviews.length}</span> review
          {reviews.length === 1 ? "" : "s"} on homepage
        </p>
        <button
          type="button"
          onClick={() => onChange([...reviews, emptyReview()])}
          className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-black/40 px-4 py-2 text-xs font-bold uppercase tracking-wide text-white hover:border-ju-cyanGlow/40"
        >
          <Plus className="size-3.5" /> Add review
        </button>
      </div>

      {reviews.length === 0 ? (
        <p className="rounded-xl border border-dashed border-white/15 bg-black/30 px-4 py-8 text-center text-sm text-ju-muted">
          No reviews yet — click Add review to paste your first Google review.
        </p>
      ) : null}

      <div className="space-y-4">
        {reviews.map((rev, index) => (
          <div
            key={rev.id}
            className="rounded-2xl border border-white/10 bg-[#07051a]/90 p-4 sm:p-5"
          >
            <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-ju-pinkGlow">
                  Review {index + 1}
                </p>
                <p className="mt-1 text-xs text-ju-muted">ID: {rev.id}</p>
              </div>
              <button
                type="button"
                onClick={() => onChange(reviews.filter((_, i) => i !== index))}
                className="inline-flex items-center gap-1 rounded-lg border border-red-400/30 px-3 py-1.5 text-[10px] font-bold uppercase text-red-200 hover:bg-red-500/10"
              >
                <Trash2 className="size-3" /> Remove
              </button>
            </div>

            <div className="mt-4 space-y-4">
              <LocEditor
                label="Review text (quote)"
                value={rev.quote}
                onChange={(v) => updateField(index, "quote", v)}
              />
              <LocEditor
                label="Reviewer name"
                value={rev.name}
                onChange={(v) => updateField(index, "name", v)}
              />
              <div className="grid gap-4 md:grid-cols-2">
                <LocEditor
                  label="Meta (e.g. Local Guide · 18 reviews)"
                  value={rev.meta}
                  onChange={(v) => updateField(index, "meta", v)}
                />
                <LocEditor
                  label="When (e.g. 2 weeks ago)"
                  value={rev.when}
                  onChange={(v) => updateField(index, "when", v)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
