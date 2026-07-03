"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CATEGORY_MAP,
  getAttraction,
  mapsUrl,
  type Attraction,
} from "@/lib/attractions";
import { useStore } from "@/lib/store";
import AttractionModal from "@/components/AttractionModal";
import AttractionImage from "@/components/AttractionImage";

export default function ItineraryBuilder() {
  const { itinerary, setDays, removeFromDay, moveToDay, itineraryCount, hydrated } =
    useStore();
  const [selected, setSelected] = useState<Attraction | null>(null);

  if (!hydrated) return null;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-amber-900/10 bg-white p-4">
        <label className="flex items-center gap-3 text-stone-700">
          <span className="font-medium">כמה ימים בווינה?</span>
          <select
            value={itinerary.days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="rounded-full border border-stone-300 bg-white px-4 py-2 text-sm outline-none focus:border-amber-600"
          >
            {[1, 2, 3, 4, 5, 6, 7].map((d) => (
              <option key={d} value={d}>
                {d === 1 ? "יום אחד" : `${d} ימים`}
              </option>
            ))}
          </select>
        </label>
        <div className="text-sm text-stone-500">
          {itineraryCount === 0
            ? "המסלול עדיין ריק"
            : `${itineraryCount} אטרקציות במסלול`}
        </div>
      </div>

      {itineraryCount === 0 && (
        <div className="rounded-3xl border border-dashed border-stone-300 py-14 text-center text-stone-500">
          <div className="mb-2 text-4xl">🗓️</div>
          <p>הוסיפו אטרקציות למסלול מכל כרטיס באתר (כפתור ״+ למסלול״).</p>
          <div className="mt-4 flex justify-center gap-3">
            <Link
              href="/"
              className="rounded-full bg-amber-800 px-5 py-2.5 font-medium text-amber-50 hover:bg-amber-900"
            >
              לרשימת האטרקציות
            </Link>
            <Link
              href="/quiz"
              className="rounded-full border border-stone-300 px-5 py-2.5 font-medium text-stone-700 hover:bg-amber-100"
            >
              ✨ לשאלון ההמלצות
            </Link>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {itinerary.items.map((dayItems, dayIdx) => {
          const attractions = dayItems
            .map(getAttraction)
            .filter((a): a is Attraction => Boolean(a));
          const totalHours = attractions.reduce(
            (sum, a) => sum + a.durationHours,
            0
          );
          return (
            <div
              key={dayIdx}
              className="rounded-2xl border border-amber-900/10 bg-white p-4"
            >
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-lg font-bold text-stone-900">
                  יום {dayIdx + 1}
                </h2>
                {totalHours > 0 && (
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      totalHours > 9
                        ? "bg-red-100 text-red-800"
                        : "bg-emerald-100 text-emerald-800"
                    }`}
                  >
                    ⏱️ כ־{totalHours} שעות
                    {totalHours > 9 ? " — יום עמוס מדי?" : ""}
                  </span>
                )}
              </div>

              {attractions.length === 0 ? (
                <p className="py-6 text-center text-sm text-stone-400">
                  אין עדיין אטרקציות ליום הזה
                </p>
              ) : (
                <ul className="space-y-2">
                  {attractions.map((a) => (
                    <li
                      key={a.id}
                      className="flex items-center gap-3 rounded-xl bg-stone-50 p-3"
                    >
                      <button
                        type="button"
                        onClick={() => setSelected(a)}
                        className="h-11 w-11 shrink-0 overflow-hidden rounded-xl"
                        aria-label={`פרטים על ${a.name}`}
                      >
                        <AttractionImage attraction={a} emojiClassName="text-2xl" />
                      </button>
                      <div className="min-w-0 flex-1">
                        <button
                          type="button"
                          onClick={() => setSelected(a)}
                          className="block truncate text-right font-medium text-stone-900 hover:text-amber-800"
                        >
                          {a.name}
                        </button>
                        <div className="text-xs text-stone-500">
                          {CATEGORY_MAP[a.category].emoji}{" "}
                          {CATEGORY_MAP[a.category].label} · ⏱️ {a.durationHours}{" "}
                          שע׳
                        </div>
                      </div>
                      <div className="flex shrink-0 items-center gap-1">
                        <a
                          href={mapsUrl(a)}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="פתיחה במפה"
                          className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-amber-100"
                        >
                          🗺️
                        </a>
                        {itinerary.days > 1 && (
                          <select
                            value={dayIdx}
                            onChange={(e) =>
                              moveToDay(a.id, dayIdx, Number(e.target.value))
                            }
                            title="העברה ליום אחר"
                            className="h-8 rounded-full border border-stone-200 bg-white px-1 text-xs text-stone-600 outline-none"
                          >
                            {Array.from({ length: itinerary.days }, (_, i) => (
                              <option key={i} value={i}>
                                יום {i + 1}
                              </option>
                            ))}
                          </select>
                        )}
                        <button
                          type="button"
                          onClick={() => removeFromDay(a.id, dayIdx)}
                          title="הסרה מהמסלול"
                          className="flex h-8 w-8 items-center justify-center rounded-full text-stone-400 hover:bg-red-50 hover:text-red-600"
                        >
                          ✕
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>

      <AttractionModal attraction={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
