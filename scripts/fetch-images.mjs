// מוריד תמונה לכל אטרקציה מוויקיפדיה (Wikimedia Commons) אל public/images,
// ומייצר את lib/images.ts עם מיפוי מזהה -> נתיב תמונה.
// הרצה: node scripts/fetch-images.mjs
import { mkdir, writeFile, readdir } from "node:fs/promises";
import path from "node:path";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// מיפוי מזהה אטרקציה -> כותרת הערך בוויקיפדיה האנגלית
const PAGES = {
  schonbrunn: "Schönbrunn Palace",
  hofburg: "Hofburg",
  belvedere: "Belvedere, Vienna",
  stephansdom: "St. Stephen's Cathedral, Vienna",
  staatsoper: "Vienna State Opera",
  khm: "Kunsthistorisches Museum",
  albertina: "Albertina",
  leopold: "Leopold Museum",
  nhm: "Natural History Museum, Vienna",
  prater: "Wiener Riesenrad",
  naschmarkt: "Naschmarkt",
  "cafe-central": "Café Central",
  sacher: "Hotel Sacher",
  demel: "Demel",
  hundertwasser: "Hundertwasserhaus",
  karlskirche: "Karlskirche",
  "spanish-riding": "Spanish Riding School",
  stadtpark: "Stadtpark, Vienna",
  donauinsel: "Donauinsel",
  kahlenberg: "Kahlenberg",
  grinzing: "Grinzing",
  "haus-des-meeres": "Haus des Meeres",
  "technisches-museum": "Technisches Museum Wien",
  zentralfriedhof: "Vienna Central Cemetery",
  nationalbibliothek: "Austrian National Library",
  graben: "Graben, Vienna",
  "schonbrunn-zoo": "Tiergarten Schönbrunn",
  musikverein: "Musikverein",
  donauturm: "Donauturm",
  rathaus: "Vienna City Hall",
};

const HEADERS = {
  "User-Agent": "myVienna-app/1.0 (personal travel app; contact: local)",
};

const OUT_DIR = path.resolve("public/images");
const TARGET_WIDTH = 960;

async function fetchWithRetry(url, label) {
  const waits = [0, 8000, 20000, 45000];
  for (let attempt = 0; attempt < waits.length; attempt++) {
    if (waits[attempt]) {
      console.log(`  ... 429, ממתין ${waits[attempt] / 1000} שניות (${label})`);
      await sleep(waits[attempt]);
    }
    const res = await fetch(url, { headers: HEADERS, redirect: "follow" });
    if (res.status === 429) continue;
    if (!res.ok) throw new Error(`${res.status} for ${label}`);
    return res;
  }
  throw new Error(`429 after retries for ${label}`);
}

async function fetchSummary(title) {
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
  const res = await fetchWithRetry(url, `summary ${title}`);
  return res.json();
}

function resizeThumbUrl(thumbUrl, width) {
  // כתובות thumbnail של ויקימדיה מכילות /NNNpx- שאפשר להחליף לרוחב אחר
  return thumbUrl.replace(/\/(\d+)px-/, `/${width}px-`);
}

async function download(url) {
  const res = await fetchWithRetry(url, `download ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const manifest = {};
  const failures = [];
  const existing = await readdir(OUT_DIR).catch(() => []);

  for (const [id, title] of Object.entries(PAGES)) {
    const already = existing.find((f) => f.startsWith(`${id}.`));
    if (already) {
      manifest[id] = `/images/${already}`;
      console.log(`SKIP ${id} (כבר קיים)`);
      continue;
    }
    await sleep(2500); // מרווח בין בקשות כדי לא להיחסם
    try {
      const summary = await fetchSummary(title);
      const thumb = summary.thumbnail?.source;
      if (!thumb) throw new Error(`no thumbnail for ${title}`);
      let url = resizeThumbUrl(thumb, TARGET_WIDTH);
      let buf;
      try {
        buf = await download(url);
      } catch {
        // אם הרוחב המבוקש גדול מהמקור — ננסה את ה-thumbnail המקורי
        url = thumb;
        buf = await download(url);
      }
      const extMatch = url.match(/\.(jpe?g|png|webp)(?:\?|$)/i);
      const ext = extMatch ? extMatch[1].toLowerCase().replace("jpeg", "jpg") : "jpg";
      const filename = `${id}.${ext}`;
      await writeFile(path.join(OUT_DIR, filename), buf);
      manifest[id] = `/images/${filename}`;
      console.log(`OK  ${id} <- ${title} (${(buf.length / 1024).toFixed(0)}KB, .${ext})`);
    } catch (err) {
      failures.push({ id, title, error: String(err) });
      console.error(`FAIL ${id}: ${err}`);
    }
  }

  const ts = `// נוצר אוטומטית ע"י scripts/fetch-images.mjs — אל תערכו ידנית
export const IMAGES: Record<string, string> = ${JSON.stringify(manifest, null, 2)};
`;
  await writeFile(path.resolve("lib/images.ts"), ts);
  console.log(`\n${Object.keys(manifest).length} images OK, ${failures.length} failures`);
  if (failures.length) process.exitCode = 1;
}

main();
