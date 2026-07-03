export type CategoryId =
  | "palaces"
  | "museums"
  | "music"
  | "food"
  | "parks"
  | "markets"
  | "family"
  | "views";

export type Category = {
  id: CategoryId;
  label: string;
  emoji: string;
};

export const CATEGORIES: Category[] = [
  { id: "palaces", label: "ארמונות והיסטוריה", emoji: "🏰" },
  { id: "museums", label: "מוזיאונים ואמנות", emoji: "🖼️" },
  { id: "music", label: "מוזיקה ואופרה", emoji: "🎻" },
  { id: "food", label: "בתי קפה ואוכל", emoji: "☕" },
  { id: "parks", label: "פארקים וטבע", emoji: "🌳" },
  { id: "markets", label: "שווקים וקניות", emoji: "🛍️" },
  { id: "family", label: "משפחות וילדים", emoji: "🎡" },
  { id: "views", label: "נוף ותצפיות", emoji: "🌆" },
];

export const CATEGORY_MAP: Record<CategoryId, Category> = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c])
) as Record<CategoryId, Category>;

export type PriceLevel = 0 | 1 | 2 | 3;

export const PRICE_LABELS: Record<PriceLevel, string> = {
  0: "חינם",
  1: "זול",
  2: "בינוני",
  3: "יקר",
};

export type Attraction = {
  id: string;
  name: string;
  nameOriginal: string;
  category: CategoryId;
  area: string;
  description: string;
  tips: string[];
  durationHours: number;
  priceLevel: PriceLevel;
  rating: number;
  emoji: string;
  gradient: string;
  tags: string[];
  mapsQuery: string;
};

export function mapsUrl(a: Attraction): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(a.mapsQuery)}`;
}

export const ATTRACTIONS: Attraction[] = [
  {
    id: "schonbrunn",
    name: "ארמון שנברון",
    nameOriginal: "Schloss Schönbrunn",
    category: "palaces",
    area: "רובע 13 – הייצינג",
    description:
      "ארמון הקיץ המפואר של בית הבסבורג, אתר מורשת עולמית של אונסק\"ו עם 1,441 חדרים וגנים עצומים. הסיור בחדרי הארמון מספר את סיפורה של הקיסרית סיסי והקיסר פרנץ יוזף.",
    tips: [
      "קנו כרטיסים מראש באינטרנט — התורים במקום ארוכים מאוד",
      "הגנים חינמיים לחלוטין — גם מי שלא נכנס לארמון ייהנה",
      "עלו לגלוריאטה לתצפית יפה על הארמון והעיר",
    ],
    durationHours: 3.5,
    priceLevel: 3,
    rating: 4.9,
    emoji: "🏰",
    gradient: "from-amber-400 to-yellow-600",
    tags: ["קלאסיקה", "משפחות", "זוגות", "היסטוריה", "חובה"],
    mapsQuery: "Schloss Schönbrunn, Vienna",
  },
  {
    id: "hofburg",
    name: "ארמון הופבורג",
    nameOriginal: "Hofburg",
    category: "palaces",
    area: "רובע 1 – מרכז העיר",
    description:
      "מתחם הארמונות הקיסרי במרכז וינה, מקום מושבם של ההבסבורגים במשך יותר מ-600 שנה. כולל את מוזיאון סיסי, הדירות הקיסריות ואוסף כלי הכסף.",
    tips: [
      "כרטיס משולב עם שנברון (Sisi Ticket) חוסך כסף ומדלג על התור",
      "עברו דרך חצרות הארמון גם בערב — התאורה יפהפייה",
    ],
    durationHours: 2.5,
    priceLevel: 2,
    rating: 4.7,
    emoji: "👑",
    gradient: "from-stone-400 to-stone-600",
    tags: ["קלאסיקה", "היסטוריה", "גשם"],
    mapsQuery: "Hofburg, Vienna",
  },
  {
    id: "belvedere",
    name: "ארמון בלוודר",
    nameOriginal: "Schloss Belvedere",
    category: "palaces",
    area: "רובע 3 – לנדשטראסה",
    description:
      "ארמון בארוק מרהיב משני מבנים עם גן צרפתי ביניהם. בבלוודר העליון מוצגת 'הנשיקה' של גוסטב קלימט — היצירה המפורסמת ביותר באוסטריה.",
    tips: [
      "'הנשיקה' נמצאת בבלוודר העליון — אם הזמן קצר, התמקדו בו",
      "הגן בין שני הארמונות חינמי ומצוין לתמונות",
    ],
    durationHours: 2.5,
    priceLevel: 2,
    rating: 4.8,
    emoji: "🖼️",
    gradient: "from-emerald-400 to-teal-600",
    tags: ["אמנות", "זוגות", "קלאסיקה", "חובה"],
    mapsQuery: "Oberes Belvedere, Vienna",
  },
  {
    id: "stephansdom",
    name: "קתדרלת שטפן",
    nameOriginal: "Stephansdom",
    category: "palaces",
    area: "רובע 1 – מרכז העיר",
    description:
      "הקתדרלה הגותית שהיא סמלה של וינה, עם גג האריחים הצבעוני המפורסם. אפשר לעלות למגדל הדרומי (343 מדרגות) או במעלית למגדל הצפוני לתצפית על העיר.",
    tips: [
      "הכניסה לאולם הראשי חינם — הסיורים והמגדלים בתשלום",
      "העלייה למגדל הדרומי ברגל זולה יותר ועם נוף טוב יותר",
      "בערב הכיכר סביב מלאה באווירה — שווה לחזור",
    ],
    durationHours: 1.5,
    priceLevel: 1,
    rating: 4.8,
    emoji: "⛪",
    gradient: "from-slate-500 to-slate-700",
    tags: ["קלאסיקה", "חובה", "אדריכלות", "חינם"],
    mapsQuery: "Stephansdom, Vienna",
  },
  {
    id: "staatsoper",
    name: "בית האופרה של וינה",
    nameOriginal: "Wiener Staatsoper",
    category: "music",
    area: "רובע 1 – הרינג",
    description:
      "אחד מבתי האופרה החשובים בעולם. גם אם אינכם חובבי אופרה — סיור מודרך בבניין או כרטיס עמידה זול (מ-13~ יורו) הם חוויה וינאית אמיתית.",
    tips: [
      "כרטיסי עמידה נמכרים כשעה לפני ההצגה במחיר סמלי",
      "בחודשי הקיץ מוקרנות הופעות בחינם על מסך ענק בחוץ",
    ],
    durationHours: 2,
    priceLevel: 1,
    rating: 4.8,
    emoji: "🎭",
    gradient: "from-rose-400 to-red-600",
    tags: ["מוזיקה", "זוגות", "ערב", "קלאסיקה"],
    mapsQuery: "Wiener Staatsoper, Vienna",
  },
  {
    id: "khm",
    name: "מוזיאון תולדות האמנות",
    nameOriginal: "Kunsthistorisches Museum",
    category: "museums",
    area: "רובע 1 – כיכר מריה תרזיה",
    description:
      "אחד ממוזיאוני האמנות הגדולים בעולם, עם אוספי ההבסבורגים: ברויגל, ורמיר, רפאל, קרוואג'ו ואוסף מצרי מרשים. גם הבניין עצמו יצירת אמנות.",
    tips: [
      "בית הקפה שבכיפה המרכזית הוא מהיפים בווינה",
      "אל תפספסו את אולם ברויגל — האוסף הגדול בעולם של יצירותיו",
    ],
    durationHours: 3,
    priceLevel: 2,
    rating: 4.8,
    emoji: "🏛️",
    gradient: "from-indigo-400 to-purple-600",
    tags: ["אמנות", "גשם", "היסטוריה"],
    mapsQuery: "Kunsthistorisches Museum, Vienna",
  },
  {
    id: "albertina",
    name: "מוזיאון אלברטינה",
    nameOriginal: "Albertina",
    category: "museums",
    area: "רובע 1 – מרכז העיר",
    description:
      "מוזיאון אמנות במרכז העיר עם אוסף ענק של הדפסים ורישומים, ותערוכת קבע 'ממונה עד פיקאסו'. מרפסת הכניסה מציעה נוף יפה לאופרה.",
    tips: [
      "שילוב מצוין ליום גשום יחד עם האופרה הסמוכה",
      "יש גם אלברטינה מודרן — סניף לאמנות עכשווית",
    ],
    durationHours: 2,
    priceLevel: 2,
    rating: 4.7,
    emoji: "🎨",
    gradient: "from-fuchsia-400 to-pink-600",
    tags: ["אמנות", "גשם"],
    mapsQuery: "Albertina, Vienna",
  },
  {
    id: "leopold",
    name: "מוזיאון ליאופולד ורובע המוזיאונים",
    nameOriginal: "Leopold Museum / MuseumsQuartier",
    category: "museums",
    area: "רובע 7 – נויבאו",
    description:
      "רובע המוזיאונים (MQ) הוא מתחם תרבות שוקק עם חצרות ישיבה צבעוניות. מוזיאון ליאופולד מציג את האוסף הגדול בעולם של אגון שילה ויצירות קלימט.",
    tips: [
      "החצר המרכזית חינמית — מקום מצוין לשבת עם קפה",
      "בערבי קיץ החצר מלאה מקומיים — אווירה נהדרת",
    ],
    durationHours: 2.5,
    priceLevel: 2,
    rating: 4.6,
    emoji: "🖌️",
    gradient: "from-orange-400 to-red-500",
    tags: ["אמנות", "צעירים", "גשם"],
    mapsQuery: "Leopold Museum, Vienna",
  },
  {
    id: "nhm",
    name: "מוזיאון הטבע",
    nameOriginal: "Naturhistorisches Museum",
    category: "museums",
    area: "רובע 1 – כיכר מריה תרזיה",
    description:
      "מוזיאון טבע מהמובילים בעולם, מול מוזיאון האמנות. שלדי דינוזאורים, ונוס מווילנדורף בת 29,500 השנים, ואולמות מינרלים מרהיבים — מצוין לכל גיל.",
    tips: [
      "אטרקציית הדינוזאורים מצוינת לילדים",
      "עלו לסיור הגג לתצפית על הרינגשטראסה",
    ],
    durationHours: 2.5,
    priceLevel: 2,
    rating: 4.7,
    emoji: "🦕",
    gradient: "from-lime-500 to-green-700",
    tags: ["משפחות", "ילדים", "גשם", "מדע"],
    mapsQuery: "Naturhistorisches Museum, Vienna",
  },
  {
    id: "prater",
    name: "פארק הפראטר וגלגל הענק",
    nameOriginal: "Prater & Riesenrad",
    category: "family",
    area: "רובע 2 – לאופולדשטאט",
    description:
      "פארק השעשועים הוותיק בעולם עם גלגל הענק ההיסטורי משנת 1897 — אחד מסמלי וינה. סביבו פארק ירוק ענק (Grüner Prater) עם שדרות לריצה ורכיבה.",
    tips: [
      "הכניסה לפארק חינם — משלמים רק על מתקנים",
      "סיבוב בגלגל הענק בשקיעה = נוף בלתי נשכח",
      "מסעדת Schweizerhaus מפורסמת בברך חזיר ובירה",
    ],
    durationHours: 3,
    priceLevel: 1,
    rating: 4.6,
    emoji: "🎡",
    gradient: "from-sky-400 to-blue-600",
    tags: ["משפחות", "ילדים", "זוגות", "ערב", "חובה"],
    mapsQuery: "Wiener Riesenrad, Vienna",
  },
  {
    id: "naschmarkt",
    name: "שוק נאשמרקט",
    nameOriginal: "Naschmarkt",
    category: "markets",
    area: "רובע 6 – בין קרלספלאץ לקטנברוקנגאסה",
    description:
      "השוק המפורסם של וינה — כ-1.5 ק\"מ של דוכני אוכל, תבלינים, גבינות ומסעדות מכל העולם. בשבתות מתווסף שוק פשפשים גדול בקצהו.",
    tips: [
      "בואו רעבים — הטעימות והאוכל הם החוויה",
      "שוק הפשפשים פועל רק בשבת בבוקר",
      "רוב הדוכנים סגורים בימי ראשון",
    ],
    durationHours: 1.5,
    priceLevel: 1,
    rating: 4.4,
    emoji: "🥨",
    gradient: "from-yellow-400 to-orange-500",
    tags: ["אוכל", "צעירים", "חינם"],
    mapsQuery: "Naschmarkt, Vienna",
  },
  {
    id: "cafe-central",
    name: "קפה צנטרל",
    nameOriginal: "Café Central",
    category: "food",
    area: "רובע 1 – הרנגאסה",
    description:
      "בית הקפה ההיסטורי המפורסם ביותר בווינה, שבו ישבו פרויד, טרוצקי וסופרי התקופה. תקרות מקומרות מרהיבות, עוגות מהוללות ואווירת קיסרות.",
    tips: [
      "צפו לתור בכניסה — בוקר מוקדם או אחר צהריים מאוחר עדיפים",
      "נסו את עוגת הבית (Central Torte) ומלאנז' וינאי",
    ],
    durationHours: 1,
    priceLevel: 2,
    rating: 4.6,
    emoji: "☕",
    gradient: "from-amber-500 to-orange-700",
    tags: ["אוכל", "זוגות", "היסטוריה", "גשם"],
    mapsQuery: "Café Central, Vienna",
  },
  {
    id: "sacher",
    name: "קפה זאכר",
    nameOriginal: "Café Sacher",
    category: "food",
    area: "רובע 1 – מאחורי האופרה",
    description:
      "ביתה של עוגת הזאכר טורט המקורית — עוגת השוקולד עם ריבת המשמש שנולדה כאן ב-1832. חוויה וינאית קלאסית במלון היוקרתי זאכר.",
    tips: [
      "העוגה מוגשת עם קצפת לא ממותקת — כך במקור",
      "אפשר לקנות עוגה ארוזה בקופסת עץ למזכרת",
    ],
    durationHours: 1,
    priceLevel: 2,
    rating: 4.5,
    emoji: "🍰",
    gradient: "from-amber-700 to-stone-800",
    tags: ["אוכל", "זוגות", "קלאסיקה"],
    mapsQuery: "Café Sacher, Vienna",
  },
  {
    id: "demel",
    name: "קונדיטוריית דמל",
    nameOriginal: "Demel",
    category: "food",
    area: "רובע 1 – קולמרקט",
    description:
      "קונדיטוריה קיסרית משנת 1786 שסיפקה מתוקים לחצר ההבסבורגית. חלון הראווה והמטבח הפתוח שבו רואים את הקונדיטורים בעבודה הם אטרקציה בפני עצמה.",
    tips: [
      "יריבתה הגדולה של זאכר על תואר עוגת השוקולד הטובה — שפטו בעצמכם",
      "האפפלשטרודל כאן נחשב מהטובים בעיר",
    ],
    durationHours: 1,
    priceLevel: 2,
    rating: 4.5,
    emoji: "🧁",
    gradient: "from-pink-400 to-rose-600",
    tags: ["אוכל", "קלאסיקה"],
    mapsQuery: "Demel, Kohlmarkt, Vienna",
  },
  {
    id: "hundertwasser",
    name: "בית הונדרטוואסר",
    nameOriginal: "Hundertwasserhaus",
    category: "views",
    area: "רובע 3 – לנדשטראסה",
    description:
      "בניין המגורים הצבעוני והמפורסם של האמן פרידנסרייך הונדרטוואסר — קווים מתעקלים, עצים שצומחים מהמרפסות ואפס קווים ישרים. חוויה חזותית ייחודית.",
    tips: [
      "הבית עצמו מאוכלס ואין כניסה — מצלמים מבחוץ",
      "ממול נמצא Hundertwasser Village עם חנויות בעיצוב דומה",
      "חובבי האמן ימשיכו למוזיאון Kunst Haus Wien הסמוך",
    ],
    durationHours: 1,
    priceLevel: 0,
    rating: 4.4,
    emoji: "🌈",
    gradient: "from-teal-400 to-cyan-600",
    tags: ["אדריכלות", "חינם", "צעירים"],
    mapsQuery: "Hundertwasserhaus, Vienna",
  },
  {
    id: "karlskirche",
    name: "כנסיית קרלסקירכה",
    nameOriginal: "Karlskirche",
    category: "palaces",
    area: "רובע 4 – קרלספלאץ",
    description:
      "כנסיית הבארוק המרשימה ביותר בווינה עם כיפה ירוקה ושני עמודי תבליט בהשראת עמוד טראיאנוס. מעלית פנורמית מטפסת אל תוך הכיפה לתצפית מקרוב על הפרסקאות.",
    tips: [
      "הבריכה שלפני הכנסייה נותנת השתקפות מושלמת לתמונות",
      "בדצמבר מתקיים כאן שוק חג מולד אומנותי ואיכותי",
    ],
    durationHours: 1,
    priceLevel: 1,
    rating: 4.6,
    emoji: "🕍",
    gradient: "from-cyan-500 to-emerald-600",
    tags: ["אדריכלות", "קלאסיקה"],
    mapsQuery: "Karlskirche, Vienna",
  },
  {
    id: "spanish-riding",
    name: "בית הספר הספרדי לרכיבה",
    nameOriginal: "Spanische Hofreitschule",
    category: "music",
    area: "רובע 1 – הופבורג",
    description:
      "מופעי הרכיבה הקלאסית של סוסי הליפיצאנר הלבנים — מסורת בת 450 שנה באולם בארוק מפואר בתוך ארמון הופבורג. אמנות רכיבה שהוכרה כמורשת אונסק\"ו.",
    tips: [
      "אימון הבוקר (Morning Exercise) זול משמעותית מהמופע המלא",
      "כרטיסים למופעים נמכרים חודשים מראש — הזמינו מוקדם",
    ],
    durationHours: 1.5,
    priceLevel: 3,
    rating: 4.5,
    emoji: "🐎",
    gradient: "from-neutral-400 to-stone-600",
    tags: ["קלאסיקה", "משפחות", "היסטוריה"],
    mapsQuery: "Spanish Riding School, Vienna",
  },
  {
    id: "stadtpark",
    name: "השטאדטפארק ופסל שטראוס",
    nameOriginal: "Stadtpark",
    category: "parks",
    area: "רובע 1/3 – על הרינג",
    description:
      "הפארק העירוני הוותיק של וינה, ביתו של פסל הזהב המפורסם של יוהאן שטראוס. מקום מושלם להפסקה ירוקה בין אטרקציות במרכז.",
    tips: [
      "פסל שטראוס המוזהב הוא אחד המקומות המצולמים בעיר",
      "בקורסלון הסמוך מתקיימים קונצרטים של ואלסים לתיירים",
    ],
    durationHours: 1,
    priceLevel: 0,
    rating: 4.4,
    emoji: "🌳",
    gradient: "from-green-400 to-emerald-600",
    tags: ["חינם", "זוגות", "מנוחה"],
    mapsQuery: "Stadtpark, Vienna",
  },
  {
    id: "donauinsel",
    name: "אי הדנובה",
    nameOriginal: "Donauinsel",
    category: "parks",
    area: "רובע 21/22 – הדנובה",
    description:
      "אי מלאכותי באורך 21 ק\"מ בלב הדנובה — גן העדן של הווינאים לרכיבה, שחייה, ברביקיו וברים על המים בקיץ. בריחה מושלמת מהעיר בלי לצאת ממנה.",
    tips: [
      "שכרו אופניים וסעו לאורך האי — מסלול שטוח ויפה",
      "באזור CopaBeach אווירת חוף עם ברים על המים",
    ],
    durationHours: 2.5,
    priceLevel: 0,
    rating: 4.3,
    emoji: "🏝️",
    gradient: "from-blue-400 to-cyan-600",
    tags: ["חינם", "קיץ", "ספורט", "צעירים", "משפחות"],
    mapsQuery: "Donauinsel, Vienna",
  },
  {
    id: "kahlenberg",
    name: "הר קאלנברג",
    nameOriginal: "Kahlenberg",
    category: "views",
    area: "רובע 19 – יער וינה",
    description:
      "נקודת התצפית הקלאסית על וינה מגובה 484 מטר, בקצה יער וינה. ביום בהיר רואים את כל העיר, הדנובה ואפילו את הרי הקרפטים.",
    tips: [
      "אוטובוס 38A מגיע עד הפסגה מתחנת גרינצינג",
      "שלבו עם ירידה ברגל דרך הכרמים לגרינצינג וסיום בהוריגר",
    ],
    durationHours: 2,
    priceLevel: 0,
    rating: 4.5,
    emoji: "⛰️",
    gradient: "from-violet-400 to-indigo-600",
    tags: ["נוף", "חינם", "טבע", "זוגות"],
    mapsQuery: "Kahlenberg, Vienna",
  },
  {
    id: "grinzing",
    name: "גרינצינג והוריגר",
    nameOriginal: "Grinzing / Heuriger",
    category: "food",
    area: "רובע 19 – דבלינג",
    description:
      "כפר יין ציורי בשולי העיר שבו שותים יין חדש (הוריגר) מהכרמים שמסביב, עם מזנון אוסטרי כפרי ומוזיקה חיה. מסורת וינאית אותנטית של ערב שלם.",
    tips: [
      "הוריגר אמיתי מזוהה בענף אורן תלוי מעל הדלת",
      "Mayer am Pfarrplatz — הוריגר היסטורי שבו התגורר בטהובן",
    ],
    durationHours: 3,
    priceLevel: 2,
    rating: 4.5,
    emoji: "🍷",
    gradient: "from-purple-500 to-fuchsia-700",
    tags: ["אוכל", "ערב", "זוגות", "אותנטי"],
    mapsQuery: "Grinzing, Vienna",
  },
  {
    id: "haus-des-meeres",
    name: "האקווריום — האוס דס מרס",
    nameOriginal: "Haus des Meeres",
    category: "family",
    area: "רובע 6 – מריאהילף",
    description:
      "אקווריום ענק בתוך מגדל נ\"מ היסטורי ממלחמת העולם השנייה — 11 קומות של כרישים, זוחלים, קופים ובית טרופי. על הגג מסעדה עם נוף 360° על העיר.",
    tips: [
      "עלו לתצפית שעל הגג גם אם רק לקפה — הנוף מעולה",
      "האכלות הכרישים מתפרסמות בלוח הזמנים באתר",
    ],
    durationHours: 2.5,
    priceLevel: 2,
    rating: 4.5,
    emoji: "🦈",
    gradient: "from-blue-500 to-indigo-700",
    tags: ["ילדים", "משפחות", "גשם", "נוף"],
    mapsQuery: "Haus des Meeres, Vienna",
  },
  {
    id: "technisches-museum",
    name: "מוזיאון הטכנולוגיה",
    nameOriginal: "Technisches Museum Wien",
    category: "family",
    area: "רובע 14 – פנצינג",
    description:
      "מוזיאון טכנולוגיה ענק וידידותי במיוחד לילדים — קטרים היסטוריים, מטוסים, תחנת כוח אמיתית ואזור מיני מדעי לילדים קטנים (das mini). אינטראקטיבי כמעט כולו.",
    tips: [
      "נמצא ממש מול גני שנברון — קל לשלב באותו יום",
      "לילדים עד 6: אזור das mini דורש הרשמה בכניסה",
    ],
    durationHours: 3,
    priceLevel: 2,
    rating: 4.6,
    emoji: "🚂",
    gradient: "from-zinc-400 to-slate-600",
    tags: ["ילדים", "משפחות", "גשם", "מדע"],
    mapsQuery: "Technisches Museum Wien",
  },
  {
    id: "zentralfriedhof",
    name: "בית הקברות המרכזי",
    nameOriginal: "Zentralfriedhof",
    category: "parks",
    area: "רובע 11 – זימרינג",
    description:
      "אחד מבתי הקברות הגדולים באירופה ואתר עלייה לרגל לחובבי מוזיקה: קברי בטהובן, שוברט, ברהמס ויוהאן שטראוס זה לצד זה. פארק עצום, שקט ומלא היסטוריה.",
    tips: [
      "קברי המלחינים באזור 32A — קרוב לשער השני",
      "הכנסייה בסגנון היוגנדשטיל (Luegerkirche) שווה הצצה",
    ],
    durationHours: 2,
    priceLevel: 0,
    rating: 4.4,
    emoji: "🎼",
    gradient: "from-gray-500 to-zinc-700",
    tags: ["מוזיקה", "היסטוריה", "חינם", "שקט"],
    mapsQuery: "Zentralfriedhof, Vienna",
  },
  {
    id: "nationalbibliothek",
    name: "ספריית הלאום — אולם הפאר",
    nameOriginal: "Österreichische Nationalbibliothek – Prunksaal",
    category: "museums",
    area: "רובע 1 – יוזפספלאץ",
    description:
      "אולם הספרייה הבארוקי היפה בעולם: 80 מטר של ארונות עץ מוזהבים, גלובוסים עתיקים ופרסקו ענק בכיפה. 200,000 ספרים עתיקים במבט אחד עוצר נשימה.",
    tips: [
      "אולם אחד בלבד — ביקור קצר אבל בלתי נשכח",
      "משלבים מצוין עם הופבורג ובית הספר לרכיבה הסמוכים",
    ],
    durationHours: 1,
    priceLevel: 1,
    rating: 4.7,
    emoji: "📚",
    gradient: "from-yellow-600 to-amber-800",
    tags: ["היסטוריה", "אדריכלות", "גשם", "זוגות"],
    mapsQuery: "Prunksaal Nationalbibliothek, Vienna",
  },
  {
    id: "graben",
    name: "מדרחוב גראבן וקרנטנר",
    nameOriginal: "Graben & Kärntner Straße",
    category: "markets",
    area: "רובע 1 – מרכז העיר",
    description:
      "רחובות הקניות המפוארים של וינה, בין האופרה לקתדרלת שטפן. עמוד המגפה הבארוקי, חלונות ראווה יוקרתיים, אמני רחוב וארכיטקטורה קיסרית בכל פינה.",
    tips: [
      "היכנסו לחצרות הפנימיות הנסתרות — למשל Palais Ferstel",
      "בתקופת חג המולד התאורה כאן מהיפות באירופה",
    ],
    durationHours: 1.5,
    priceLevel: 0,
    rating: 4.5,
    emoji: "🛍️",
    gradient: "from-rose-300 to-pink-500",
    tags: ["קניות", "חינם", "ערב", "קלאסיקה"],
    mapsQuery: "Graben, Vienna",
  },
  {
    id: "schonbrunn-zoo",
    name: "גן החיות שנברון",
    nameOriginal: "Tiergarten Schönbrunn",
    category: "family",
    area: "רובע 13 – בגני שנברון",
    description:
      "גן החיות הוותיק בעולם (1752) ומהמובילים באירופה, בתוך גני ארמון שנברון. פנדות ענק, קוטב, ג'ונגל טרופי ומבנים בארוקיים מקוריים.",
    tips: [
      "שלבו עם ביקור בארמון שנברון לאותו יום",
      "האכלות בעלי החיים מפורסמות בלוח בכניסה — תכננו לפיהן",
      "כרטיס משפחתי משתלם למשפחות עם ילדים",
    ],
    durationHours: 3,
    priceLevel: 2,
    rating: 4.7,
    emoji: "🐼",
    gradient: "from-green-500 to-lime-600",
    tags: ["ילדים", "משפחות", "טבע"],
    mapsQuery: "Tiergarten Schönbrunn, Vienna",
  },
  {
    id: "musikverein",
    name: "מוזיקפריין — היכל המוזיקה",
    nameOriginal: "Musikverein",
    category: "music",
    area: "רובע 1 – קרלספלאץ",
    description:
      "אולם הקונצרטים בעל האקוסטיקה המפורסמת בעולם, ביתה של הפילהרמונית הווינאית ומקום קונצרט השנה החדשה המשודר לכל העולם. 'אולם הזהב' מדהים ביופיו.",
    tips: [
      "כרטיסי עמידה זולים נמכרים להרבה קונצרטים",
      "סיור מודרך באנגלית מתקיים כמעט כל יום בצהריים",
    ],
    durationHours: 2,
    priceLevel: 2,
    rating: 4.8,
    emoji: "🎻",
    gradient: "from-amber-400 to-orange-600",
    tags: ["מוזיקה", "ערב", "קלאסיקה", "זוגות"],
    mapsQuery: "Musikverein, Vienna",
  },
  {
    id: "donauturm",
    name: "מגדל הדנובה",
    nameOriginal: "Donauturm",
    category: "views",
    area: "רובע 22 – דונאושטאט",
    description:
      "המגדל הגבוה באוסטריה (252 מ') עם מרפסת תצפית ומסעדה מסתובבת. הנוף הטוב ביותר על הדנובה, האי והעיר כולה — במיוחד בשקיעה.",
    tips: [
      "עדיף להגיע כשעה לפני שקיעה ולראות את העיר גם באור וגם בלילה",
      "שלבו עם טיול באי הדנובה או בפארק הדנובה שלמרגלותיו",
    ],
    durationHours: 1.5,
    priceLevel: 2,
    rating: 4.4,
    emoji: "🗼",
    gradient: "from-sky-500 to-blue-700",
    tags: ["נוף", "זוגות", "ערב"],
    mapsQuery: "Donauturm, Vienna",
  },
  {
    id: "rathaus",
    name: "בניין העירייה והרינגשטראסה",
    nameOriginal: "Rathaus & Ringstraße",
    category: "views",
    area: "רובע 1 – הרינג",
    description:
      "בניין העירייה הנאו-גותי המרשים והשדרה המפוארת שמקיפה את מרכז העיר. בכיכר שלפניו מתחלפים כל השנה אירועים: החלקה על קרח בחורף, פסטיבל סרטים בקיץ ושוקי חג מולד.",
    tips: [
      "חשמלית מספר 1 מקיפה את הרינג — סיור עצמאי זול ומצוין",
      "בדקו מה מתרחש בכיכר בזמן הביקור — כמעט תמיד יש משהו",
    ],
    durationHours: 1.5,
    priceLevel: 0,
    rating: 4.5,
    emoji: "🏛️",
    gradient: "from-red-400 to-rose-600",
    tags: ["חינם", "אדריכלות", "ערב", "אירועים"],
    mapsQuery: "Rathaus, Vienna",
  },
];

export function getAttraction(id: string): Attraction | undefined {
  return ATTRACTIONS.find((a) => a.id === id);
}
