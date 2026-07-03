import {
  ATTRACTIONS,
  type Attraction,
  type CategoryId,
  type PriceLevel,
} from "./attractions";

export type QuizAnswers = {
  days: number;
  interests: CategoryId[];
  budget: PriceLevel;
  withKids: boolean;
};

export type ScoredAttraction = {
  attraction: Attraction;
  score: number;
  reasons: string[];
};

const KID_TAGS = ["ילדים", "משפחות"];

export function recommend(answers: QuizAnswers): ScoredAttraction[] {
  const scored = ATTRACTIONS.map((attraction) => {
    let score = 0;
    const reasons: string[] = [];

    if (answers.interests.includes(attraction.category)) {
      score += 3;
      reasons.push("מתאים לתחומי העניין שבחרת");
    }

    if (answers.withKids) {
      if (attraction.tags.some((t) => KID_TAGS.includes(t))) {
        score += 2.5;
        reasons.push("מצוין לילדים");
      }
    }

    if (attraction.priceLevel <= answers.budget) {
      score += 1;
      if (attraction.priceLevel === 0) reasons.push("כניסה חינם");
    } else {
      score -= (attraction.priceLevel - answers.budget) * 1.5;
    }

    // בונוס לאטרקציות "חובה" ולדירוג גבוה
    if (attraction.tags.includes("חובה")) {
      score += 1;
      reasons.push("מנקודות החובה של וינה");
    }
    score += (attraction.rating - 4.4) * 2;

    return { attraction, score, reasons };
  });

  const count = Math.min(Math.max(answers.days * 4, 6), ATTRACTIONS.length);
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, count);
}
