"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const FAVORITES_KEY = "myvienna:favorites";
const ITINERARY_KEY = "myvienna:itinerary";

export type Itinerary = {
  days: number;
  // items[dayIndex] = רשימת מזהי אטרקציות לאותו יום
  items: string[][];
};

type StoreValue = {
  hydrated: boolean;
  favorites: string[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
  itinerary: Itinerary;
  setDays: (days: number) => void;
  addToDay: (id: string, day: number) => void;
  removeFromDay: (id: string, day: number) => void;
  moveToDay: (id: string, fromDay: number, toDay: number) => void;
  itineraryCount: number;
  dayOf: (id: string) => number | null;
};

const StoreContext = createContext<StoreValue | null>(null);

function emptyItinerary(days = 3): Itinerary {
  return { days, items: Array.from({ length: days }, () => []) };
}

function normalizeItinerary(raw: unknown): Itinerary {
  if (
    typeof raw !== "object" ||
    raw === null ||
    !Array.isArray((raw as Itinerary).items)
  ) {
    return emptyItinerary();
  }
  const it = raw as Itinerary;
  const days = Math.min(Math.max(Number(it.days) || 3, 1), 7);
  const items = Array.from({ length: days }, (_, i) =>
    Array.isArray(it.items[i]) ? it.items[i].filter((x) => typeof x === "string") : []
  );
  return { days, items };
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [itinerary, setItinerary] = useState<Itinerary>(emptyItinerary());

  useEffect(() => {
    try {
      const fav = localStorage.getItem(FAVORITES_KEY);
      if (fav) setFavorites(JSON.parse(fav));
      const it = localStorage.getItem(ITINERARY_KEY);
      if (it) setItinerary(normalizeItinerary(JSON.parse(it)));
    } catch {
      // נתונים פגומים — מתחילים מחדש
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(ITINERARY_KEY, JSON.stringify(itinerary));
  }, [itinerary, hydrated]);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  }, []);

  const isFavorite = useCallback(
    (id: string) => favorites.includes(id),
    [favorites]
  );

  const setDays = useCallback((days: number) => {
    const d = Math.min(Math.max(days, 1), 7);
    setItinerary((prev) => {
      const items = Array.from({ length: d }, (_, i) => prev.items[i] ?? []);
      return { days: d, items };
    });
  }, []);

  const addToDay = useCallback((id: string, day: number) => {
    setItinerary((prev) => {
      if (day < 0 || day >= prev.days) return prev;
      // אטרקציה מופיעה פעם אחת במסלול — הוספה מחדש מעבירה אותה
      const items = prev.items.map((dayItems) =>
        dayItems.filter((x) => x !== id)
      );
      items[day] = [...items[day], id];
      return { ...prev, items };
    });
  }, []);

  const removeFromDay = useCallback((id: string, day: number) => {
    setItinerary((prev) => {
      if (day < 0 || day >= prev.days) return prev;
      const items = prev.items.map((dayItems, i) =>
        i === day ? dayItems.filter((x) => x !== id) : dayItems
      );
      return { ...prev, items };
    });
  }, []);

  const moveToDay = useCallback(
    (id: string, fromDay: number, toDay: number) => {
      setItinerary((prev) => {
        if (
          fromDay < 0 ||
          fromDay >= prev.days ||
          toDay < 0 ||
          toDay >= prev.days ||
          fromDay === toDay
        ) {
          return prev;
        }
        const items = prev.items.map((dayItems, i) =>
          i === fromDay ? dayItems.filter((x) => x !== id) : [...dayItems]
        );
        items[toDay].push(id);
        return { ...prev, items };
      });
    },
    []
  );

  const itineraryCount = useMemo(
    () => itinerary.items.reduce((sum, d) => sum + d.length, 0),
    [itinerary]
  );

  const dayOf = useCallback(
    (id: string) => {
      const idx = itinerary.items.findIndex((d) => d.includes(id));
      return idx === -1 ? null : idx;
    },
    [itinerary]
  );

  const value = useMemo<StoreValue>(
    () => ({
      hydrated,
      favorites,
      isFavorite,
      toggleFavorite,
      itinerary,
      setDays,
      addToDay,
      removeFromDay,
      moveToDay,
      itineraryCount,
      dayOf,
    }),
    [
      hydrated,
      favorites,
      isFavorite,
      toggleFavorite,
      itinerary,
      setDays,
      addToDay,
      removeFromDay,
      moveToDay,
      itineraryCount,
      dayOf,
    ]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore חייב לרוץ בתוך StoreProvider");
  return ctx;
}
