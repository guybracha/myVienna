"use client";

import { CATEGORIES, type CategoryId } from "@/lib/attractions";

export type SortKey = "rating" | "name" | "price" | "duration";

export const SORT_OPTIONS: { id: SortKey; label: string }[] = [
  { id: "rating", label: "דירוג (מהגבוה)" },
  { id: "name", label: "שם (א-ת)" },
  { id: "price", label: "מחיר (מהזול)" },
  { id: "duration", label: "משך ביקור (מהקצר)" },
];

export default function FilterBar({
  search,
  onSearch,
  category,
  onCategory,
  sort,
  onSort,
}: {
  search: string;
  onSearch: (v: string) => void;
  category: CategoryId | null;
  onCategory: (c: CategoryId | null) => void;
  sort: SortKey;
  onSort: (s: SortKey) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="search"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="חיפוש אטרקציה, אזור או תגית… (למשל: קפה, ילדים, נוף)"
          className="w-full rounded-full border border-stone-300 bg-white px-5 py-2.5 text-stone-800 outline-none placeholder:text-stone-400 focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20"
        />
        <select
          value={sort}
          onChange={(e) => onSort(e.target.value as SortKey)}
          className="rounded-full border border-stone-300 bg-white px-4 py-2.5 text-sm text-stone-700 outline-none focus:border-amber-600"
          aria-label="מיון"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.id} value={o.id}>
              מיון: {o.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onCategory(null)}
          className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
            category === null
              ? "bg-amber-800 text-amber-50"
              : "bg-white text-stone-700 hover:bg-amber-100 border border-stone-200"
          }`}
        >
          הכול
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => onCategory(category === c.id ? null : c.id)}
            className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
              category === c.id
                ? "bg-amber-800 text-amber-50"
                : "bg-white text-stone-700 hover:bg-amber-100 border border-stone-200"
            }`}
          >
            {c.emoji} {c.label}
          </button>
        ))}
      </div>
    </div>
  );
}
