"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ATTRACTIONS,
  type Attraction,
  type CategoryId,
} from "@/lib/attractions";
import AttractionCard from "@/components/AttractionCard";
import AttractionModal from "@/components/AttractionModal";
import FilterBar, { type SortKey } from "@/components/FilterBar";

function sortAttractions(list: Attraction[], sort: SortKey): Attraction[] {
  const sorted = [...list];
  switch (sort) {
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "name":
      return sorted.sort((a, b) => a.name.localeCompare(b.name, "he"));
    case "price":
      return sorted.sort((a, b) => a.priceLevel - b.priceLevel);
    case "duration":
      return sorted.sort((a, b) => a.durationHours - b.durationHours);
  }
}

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<CategoryId | null>(null);
  const [sort, setSort] = useState<SortKey>("rating");
  const [selected, setSelected] = useState<Attraction | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const list = ATTRACTIONS.filter((a) => {
      if (category && a.category !== category) return false;
      if (!q) return true;
      const haystack = [
        a.name,
        a.nameOriginal,
        a.description,
        a.area,
        ...a.tags,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
    return sortAttractions(list, sort);
  }, [search, category, sort]);

  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-gradient-to-bl from-amber-800 to-amber-950 px-6 py-10 text-center text-amber-50 sm:py-14">
        <h1 className="text-3xl font-bold sm:text-4xl">
          גלו את וינה 🎻
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-amber-100/90">
          ארמונות קיסריים, בתי קפה היסטוריים, מוזיקה קלאסית ופארקים ירוקים —
          {" "}{ATTRACTIONS.length} האטרקציות המומלצות ביותר בעיר, עם טיפים
          מקומיים לכל אחת.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Link
            href="/quiz"
            className="rounded-full bg-amber-50 px-5 py-2.5 font-medium text-amber-900 transition-colors hover:bg-white"
          >
            ✨ לא יודעים מאיפה להתחיל? עשו את השאלון
          </Link>
          <Link
            href="/itinerary"
            className="rounded-full border border-amber-200/40 px-5 py-2.5 font-medium text-amber-50 transition-colors hover:bg-amber-800"
          >
            🗓️ למסלול שלי
          </Link>
        </div>
      </section>

      <FilterBar
        search={search}
        onSearch={setSearch}
        category={category}
        onCategory={setCategory}
        sort={sort}
        onSort={setSort}
      />

      {filtered.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-stone-300 py-16 text-center text-stone-500">
          <div className="mb-2 text-4xl">🔍</div>
          לא נמצאו אטרקציות מתאימות — נסו חיפוש אחר או הסירו סינון.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((a, i) => (
            <AttractionCard
              key={a.id}
              attraction={a}
              onOpen={setSelected}
              eagerImage={i < 6}
            />
          ))}
        </div>
      )}

      <AttractionModal attraction={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
