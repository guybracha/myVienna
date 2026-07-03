"use client";

import { useState } from "react";
import Link from "next/link";
import { ATTRACTIONS, type Attraction } from "@/lib/attractions";
import { useStore } from "@/lib/store";
import AttractionCard from "@/components/AttractionCard";
import AttractionModal from "@/components/AttractionModal";

export default function FavoritesPage() {
  const { favorites, hydrated } = useStore();
  const [selected, setSelected] = useState<Attraction | null>(null);

  const favAttractions = ATTRACTIONS.filter((a) => favorites.includes(a.id));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-stone-900">❤️ המועדפים שלי</h1>
        <p className="mt-1 text-stone-500">
          האטרקציות ששמרתם — נשמרות גם אחרי סגירת הדפדפן.
        </p>
      </div>

      {!hydrated ? null : favAttractions.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-stone-300 py-16 text-center text-stone-500">
          <div className="mb-2 text-4xl">🤍</div>
          <p>עדיין לא שמרתם אטרקציות.</p>
          <Link
            href="/"
            className="mt-4 inline-block rounded-full bg-amber-800 px-5 py-2.5 font-medium text-amber-50 hover:bg-amber-900"
          >
            לגלות את וינה
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {favAttractions.map((a) => (
            <AttractionCard key={a.id} attraction={a} onOpen={setSelected} />
          ))}
        </div>
      )}

      <AttractionModal attraction={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
