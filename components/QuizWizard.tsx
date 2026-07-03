"use client";

import { useState } from "react";
import { CATEGORIES, type Attraction, type CategoryId, type PriceLevel } from "@/lib/attractions";
import { recommend, type QuizAnswers, type ScoredAttraction } from "@/lib/quiz";
import AttractionCard from "@/components/AttractionCard";
import AttractionModal from "@/components/AttractionModal";
import { useStore } from "@/lib/store";

const BUDGET_OPTIONS: { value: PriceLevel; label: string; desc: string }[] = [
  { value: 1, label: "חסכוני 💰", desc: "בעיקר אטרקציות חינמיות וזולות" },
  { value: 2, label: "בינוני 💰💰", desc: "כניסות למוזיאונים וארמונות בסדר גמור" },
  { value: 3, label: "מפנק 💰💰💰", desc: "הכול פתוח — כולל החוויות היקרות" },
];

export default function QuizWizard() {
  const { setDays } = useStore();
  const [step, setStep] = useState(0);
  const [days, setDaysLocal] = useState(3);
  const [interests, setInterests] = useState<CategoryId[]>([]);
  const [budget, setBudget] = useState<PriceLevel>(2);
  const [withKids, setWithKids] = useState(false);
  const [results, setResults] = useState<ScoredAttraction[] | null>(null);
  const [selected, setSelected] = useState<Attraction | null>(null);

  const toggleInterest = (c: CategoryId) =>
    setInterests((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );

  const finish = () => {
    const answers: QuizAnswers = { days, interests, budget, withKids };
    setDays(days); // מסנכרן את מספר הימים גם למסלול
    setResults(recommend(answers));
  };

  const restart = () => {
    setResults(null);
    setStep(0);
  };

  if (results) {
    return (
      <div className="space-y-6">
        <div className="rounded-3xl bg-gradient-to-bl from-emerald-700 to-teal-900 px-6 py-8 text-center text-emerald-50">
          <h2 className="text-2xl font-bold">ההמלצות שלנו בשבילכם ✨</h2>
          <p className="mt-2 text-emerald-100/90">
            {results.length} אטרקציות שנבחרו לפי {days} ימים בעיר
            {withKids ? ", כולל התאמה לילדים" : ""}. לחצו על ״+ למסלול״ כדי
            לשבץ אותן בימי הטיול.
          </p>
          <button
            type="button"
            onClick={restart}
            className="mt-4 rounded-full border border-emerald-200/40 px-5 py-2 text-sm font-medium hover:bg-emerald-800"
          >
            ↻ מילוי מחדש
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map(({ attraction, reasons }) => (
            <div key={attraction.id} className="flex flex-col gap-2">
              <AttractionCard attraction={attraction} onOpen={setSelected} />
              {reasons.length > 0 && (
                <div className="rounded-xl bg-emerald-50 px-3 py-2 text-xs text-emerald-800">
                  {reasons.join(" · ")}
                </div>
              )}
            </div>
          ))}
        </div>

        <AttractionModal attraction={selected} onClose={() => setSelected(null)} />
      </div>
    );
  }

  const steps = [
    // שלב 0: ימים
    <div key="days" className="space-y-4 text-center">
      <h2 className="text-xl font-bold text-stone-900">כמה ימים תהיו בווינה?</h2>
      <div className="flex flex-wrap justify-center gap-2">
        {[1, 2, 3, 4, 5, 6, 7].map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => setDaysLocal(d)}
            className={`h-12 w-12 rounded-full text-lg font-bold transition-colors ${
              days === d
                ? "bg-amber-800 text-amber-50"
                : "bg-white text-stone-700 border border-stone-200 hover:bg-amber-100"
            }`}
          >
            {d}
          </button>
        ))}
      </div>
      <p className="text-sm text-stone-500">
        {days === 1 ? "יום אחד" : `${days} ימים`} — נמליץ בהתאם על כמות אטרקציות מתאימה
      </p>
    </div>,

    // שלב 1: תחומי עניין
    <div key="interests" className="space-y-4 text-center">
      <h2 className="text-xl font-bold text-stone-900">מה מעניין אתכם?</h2>
      <p className="text-sm text-stone-500">אפשר לבחור כמה שרוצים</p>
      <div className="flex flex-wrap justify-center gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => toggleInterest(c.id)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              interests.includes(c.id)
                ? "bg-amber-800 text-amber-50"
                : "bg-white text-stone-700 border border-stone-200 hover:bg-amber-100"
            }`}
          >
            {c.emoji} {c.label}
          </button>
        ))}
      </div>
    </div>,

    // שלב 2: תקציב
    <div key="budget" className="space-y-4 text-center">
      <h2 className="text-xl font-bold text-stone-900">מה התקציב שלכם?</h2>
      <div className="mx-auto flex max-w-md flex-col gap-2">
        {BUDGET_OPTIONS.map((o) => (
          <button
            key={o.value}
            type="button"
            onClick={() => setBudget(o.value)}
            className={`rounded-2xl px-4 py-3 text-right transition-colors ${
              budget === o.value
                ? "bg-amber-800 text-amber-50"
                : "bg-white text-stone-700 border border-stone-200 hover:bg-amber-100"
            }`}
          >
            <div className="font-bold">{o.label}</div>
            <div className={`text-sm ${budget === o.value ? "text-amber-100/80" : "text-stone-500"}`}>
              {o.desc}
            </div>
          </button>
        ))}
      </div>
    </div>,

    // שלב 3: ילדים
    <div key="kids" className="space-y-4 text-center">
      <h2 className="text-xl font-bold text-stone-900">מטיילים עם ילדים?</h2>
      <div className="flex justify-center gap-3">
        <button
          type="button"
          onClick={() => setWithKids(true)}
          className={`rounded-2xl px-8 py-4 text-lg font-bold transition-colors ${
            withKids
              ? "bg-amber-800 text-amber-50"
              : "bg-white text-stone-700 border border-stone-200 hover:bg-amber-100"
          }`}
        >
          כן 👨‍👩‍👧‍👦
        </button>
        <button
          type="button"
          onClick={() => setWithKids(false)}
          className={`rounded-2xl px-8 py-4 text-lg font-bold transition-colors ${
            !withKids
              ? "bg-amber-800 text-amber-50"
              : "bg-white text-stone-700 border border-stone-200 hover:bg-amber-100"
          }`}
        >
          לא 🧳
        </button>
      </div>
    </div>,
  ];

  const isLast = step === steps.length - 1;
  const nextDisabled = step === 1 && interests.length === 0;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center justify-center gap-2">
        {steps.map((_, i) => (
          <span
            key={i}
            className={`h-2 rounded-full transition-all ${
              i === step ? "w-8 bg-amber-800" : i < step ? "w-2 bg-amber-600" : "w-2 bg-stone-300"
            }`}
          />
        ))}
      </div>

      <div className="rounded-3xl border border-amber-900/10 bg-white p-6 shadow-sm sm:p-8">
        {steps[step]}
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="rounded-full px-5 py-2.5 font-medium text-stone-600 hover:bg-stone-100 disabled:invisible"
        >
          → הקודם
        </button>
        <button
          type="button"
          onClick={() => (isLast ? finish() : setStep((s) => s + 1))}
          disabled={nextDisabled}
          className="rounded-full bg-amber-800 px-6 py-2.5 font-medium text-amber-50 transition-colors hover:bg-amber-900 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isLast ? "✨ קבלו המלצות" : "הבא ←"}
        </button>
      </div>
      {nextDisabled && (
        <p className="text-center text-sm text-stone-400">בחרו לפחות תחום עניין אחד</p>
      )}
    </div>
  );
}
