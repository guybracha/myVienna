"use client";

import { useState } from "react";
import {
  CATEGORY_MAP,
  PRICE_LABELS,
  type Attraction,
} from "@/lib/attractions";
import { useStore } from "@/lib/store";
import AttractionImage from "@/components/AttractionImage";

export default function AttractionCard({
  attraction,
  onOpen,
  eagerImage = false,
}: {
  attraction: Attraction;
  onOpen: (a: Attraction) => void;
  eagerImage?: boolean;
}) {
  const { isFavorite, toggleFavorite, itinerary, addToDay, dayOf, hydrated } =
    useStore();
  const [dayMenuOpen, setDayMenuOpen] = useState(false);

  const fav = hydrated && isFavorite(attraction.id);
  const plannedDay = hydrated ? dayOf(attraction.id) : null;
  const category = CATEGORY_MAP[attraction.category];

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-amber-900/10 bg-white shadow-sm transition-shadow hover:shadow-lg">
      <button
        type="button"
        onClick={() => onOpen(attraction)}
        className="block h-44 w-full overflow-hidden"
        aria-label={`פרטים על ${attraction.name}`}
      >
        <div className="h-full w-full transition-transform duration-300 group-hover:scale-[1.04]">
          <AttractionImage attraction={attraction} eager={eagerImage} />
        </div>
      </button>

      <button
        type="button"
        onClick={() => toggleFavorite(attraction.id)}
        aria-label={fav ? "הסרה מהמועדפים" : "הוספה למועדפים"}
        className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-lg shadow transition-transform hover:scale-110"
      >
        {fav ? "❤️" : "🤍"}
      </button>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div>
          <button
            type="button"
            onClick={() => onOpen(attraction)}
            className="text-right text-lg font-bold text-stone-900 hover:text-amber-800"
          >
            {attraction.name}
          </button>
          <div className="text-sm text-stone-500" dir="ltr">
            {attraction.nameOriginal}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-stone-600">
          <span>
            {category.emoji} {category.label}
          </span>
          <span>⭐ {attraction.rating.toFixed(1)}</span>
          <span>⏱️ {attraction.durationHours} שע׳</span>
          <span>💶 {PRICE_LABELS[attraction.priceLevel]}</span>
        </div>

        <p className="line-clamp-2 text-sm leading-relaxed text-stone-600">
          {attraction.description}
        </p>

        <div className="mt-auto flex items-center gap-2 pt-2">
          <button
            type="button"
            onClick={() => onOpen(attraction)}
            className="rounded-full bg-amber-100 px-3 py-1.5 text-sm font-medium text-amber-900 transition-colors hover:bg-amber-200"
          >
            פרטים וטיפים
          </button>

          <div className="relative">
            <button
              type="button"
              onClick={() => setDayMenuOpen((o) => !o)}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                plannedDay !== null
                  ? "bg-emerald-100 text-emerald-900 hover:bg-emerald-200"
                  : "bg-stone-100 text-stone-700 hover:bg-stone-200"
              }`}
            >
              {plannedDay !== null ? `📍 יום ${plannedDay + 1}` : "+ למסלול"}
            </button>
            {dayMenuOpen && (
              <div className="absolute bottom-full z-20 mb-1 w-32 overflow-hidden rounded-xl border border-stone-200 bg-white shadow-lg">
                {Array.from({ length: itinerary.days }, (_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      addToDay(attraction.id, i);
                      setDayMenuOpen(false);
                    }}
                    className={`block w-full px-3 py-2 text-right text-sm hover:bg-amber-50 ${
                      plannedDay === i ? "font-bold text-amber-800" : "text-stone-700"
                    }`}
                  >
                    יום {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
