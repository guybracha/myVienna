"use client";

import { useEffect } from "react";
import {
  CATEGORY_MAP,
  PRICE_LABELS,
  mapsUrl,
  type Attraction,
} from "@/lib/attractions";
import { useStore } from "@/lib/store";
import AttractionImage from "@/components/AttractionImage";

export default function AttractionModal({
  attraction,
  onClose,
}: {
  attraction: Attraction | null;
  onClose: () => void;
}) {
  const { isFavorite, toggleFavorite, hydrated } = useStore();

  useEffect(() => {
    if (!attraction) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [attraction, onClose]);

  if (!attraction) return null;

  const category = CATEGORY_MAP[attraction.category];
  const fav = hydrated && isFavorite(attraction.id);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={attraction.name}
    >
      <div
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-52 overflow-hidden sm:h-64">
          <AttractionImage attraction={attraction} emojiClassName="text-7xl" eager />
          <button
            type="button"
            onClick={onClose}
            aria-label="סגירה"
            className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-stone-700 shadow hover:bg-white"
          >
            ✕
          </button>
          <button
            type="button"
            onClick={() => toggleFavorite(attraction.id)}
            aria-label={fav ? "הסרה מהמועדפים" : "הוספה למועדפים"}
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-lg shadow hover:scale-110"
          >
            {fav ? "❤️" : "🤍"}
          </button>
        </div>

        <div className="space-y-5 p-6">
          <div>
            <h2 className="text-2xl font-bold text-stone-900">
              {attraction.name}
            </h2>
            <div className="text-stone-500" dir="ltr">
              {attraction.nameOriginal}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 text-sm">
            <span className="rounded-full bg-amber-100 px-3 py-1 text-amber-900">
              {category.emoji} {category.label}
            </span>
            <span className="rounded-full bg-stone-100 px-3 py-1 text-stone-700">
              ⭐ {attraction.rating.toFixed(1)}
            </span>
            <span className="rounded-full bg-stone-100 px-3 py-1 text-stone-700">
              ⏱️ כ־{attraction.durationHours} שעות
            </span>
            <span className="rounded-full bg-stone-100 px-3 py-1 text-stone-700">
              💶 {PRICE_LABELS[attraction.priceLevel]}
            </span>
            <span className="rounded-full bg-stone-100 px-3 py-1 text-stone-700">
              📍 {attraction.area}
            </span>
          </div>

          <p className="leading-relaxed text-stone-700">
            {attraction.description}
          </p>

          <div className="rounded-2xl bg-amber-50 p-4">
            <h3 className="mb-2 font-bold text-amber-900">💡 טיפים</h3>
            <ul className="space-y-1.5 text-sm text-amber-950/80">
              {attraction.tips.map((tip) => (
                <li key={tip} className="flex gap-2">
                  <span>•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {attraction.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-stone-200 px-2.5 py-0.5 text-xs text-stone-500"
              >
                {tag}
              </span>
            ))}
          </div>

          <a
            href={mapsUrl(attraction)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-full bg-amber-800 px-5 py-3 font-medium text-amber-50 transition-colors hover:bg-amber-900"
          >
            🗺️ פתיחה ב־Google Maps
          </a>
        </div>
      </div>
    </div>
  );
}
