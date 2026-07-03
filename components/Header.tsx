"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "@/lib/store";

const NAV = [
  { href: "/", label: "גלו את וינה", emoji: "🇦🇹" },
  { href: "/quiz", label: "שאלון המלצות", emoji: "✨" },
  { href: "/itinerary", label: "המסלול שלי", emoji: "🗓️" },
  { href: "/favorites", label: "מועדפים", emoji: "❤️" },
];

export default function Header() {
  const pathname = usePathname();
  const { favorites, itineraryCount, hydrated } = useStore();

  const badge = (href: string) => {
    if (!hydrated) return 0;
    if (href === "/favorites") return favorites.length;
    if (href === "/itinerary") return itineraryCount;
    return 0;
  };

  return (
    <header className="sticky top-0 z-40 border-b border-amber-900/10 bg-[#fdfaf5]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🎻</span>
          <span className="text-xl font-bold text-amber-900">
            myVienna
            <span className="mr-2 hidden text-sm font-normal text-amber-800/70 sm:inline">
              המדריך שלך לווינה
            </span>
          </span>
        </Link>
        <nav className="flex items-center gap-1 text-sm sm:gap-2">
          {NAV.map((item) => {
            const active = pathname === item.href;
            const count = badge(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center gap-1.5 rounded-full px-3 py-1.5 font-medium transition-colors ${
                  active
                    ? "bg-amber-800 text-amber-50"
                    : "text-amber-900 hover:bg-amber-100"
                }`}
              >
                <span className="hidden sm:inline">{item.emoji}</span>
                {item.label}
                {count > 0 && (
                  <span
                    className={`inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs font-bold ${
                      active ? "bg-amber-50 text-amber-900" : "bg-amber-800 text-amber-50"
                    }`}
                  >
                    {count}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
