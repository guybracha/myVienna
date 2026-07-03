"use client";

import { useState } from "react";
import { IMAGES } from "@/lib/images";
import type { Attraction } from "@/lib/attractions";

// תמונה אמיתית של האטרקציה; אם אין תמונה או שהטעינה נכשלה — גרדיאנט + אימוג'י
export default function AttractionImage({
  attraction,
  emojiClassName = "text-6xl",
  eager = false,
}: {
  attraction: Attraction;
  emojiClassName?: string;
  eager?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const src = IMAGES[attraction.id];

  if (!src || failed) {
    return (
      <div
        className={`flex h-full w-full items-center justify-center bg-gradient-to-bl ${attraction.gradient}`}
      >
        <span className={`drop-shadow-lg ${emojiClassName}`}>
          {attraction.emoji}
        </span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={attraction.name}
      loading={eager ? "eager" : "lazy"}
      onError={() => setFailed(true)}
      className="h-full w-full object-cover"
    />
  );
}
