// Dayt Knight — inspiration harvester (sourcing layer of the engine).
//
// Why it's shaped this way: UGC/social sources (Reddit, IG) block plain fetch/curl,
// and Instagram has no usable public content API. A REAL browser is not blocked. So
// we pull structured public endpoints (Reddit .json) THROUGH a running pinchtab
// browser, then rank by engagement — upvotes + comments are the crowd's taste signal.
//
// We learn the PATTERN (what kinds of nights New Yorkers ask for, save, argue about),
// we do not copy anyone's post.
//
// Run:  PT_PORT=<pinchtab instance port> node scripts/inspiration/harvest.mjs

import { execFileSync } from "node:child_process";

const server = `http://localhost:${process.env.PT_PORT || "9882"}`;

// Open, reliable sources. Reddit search.json = "what gets upvoted/discussed" per query.
// (Add editorial RSS + event/place APIs here as they get keys — see README.)
const SOURCES = [
  "https://www.reddit.com/r/AskNYC/search.json?q=best+date+spot&restrict_sr=on&sort=top&t=all&limit=15",
  "https://www.reddit.com/r/AskNYC/search.json?q=unique+date+night&restrict_sr=on&sort=top&t=all&limit=15",
  "https://www.reddit.com/r/AskNYC/search.json?q=romantic+rooftop+sunset&restrict_sr=on&sort=top&t=all&limit=10",
  "https://www.reddit.com/r/AskNYC/search.json?q=fun+things+to+do+couple&restrict_sr=on&sort=top&t=all&limit=10",
];

// Relevance gate — broad search + raw heat is noisy; keep only date/experience signal.
const RELEVANT =
  /\b(date|dates|dating|romantic|rooftop|sunset|speakeasy|cozy|cocktail|jazz|live music|picnic|walk|stroll|view|first date|anniversary|couple|workshop|class|gallery|wine|dinner|dessert|boat|ferry|adventure|hidden gem|spots?)\b/i;

function browserText(url) {
  execFileSync("pinchtab", ["--server", server, "nav", url], { stdio: "ignore" });
  const out = execFileSync("pinchtab", ["--server", server, "text"], { encoding: "utf8" });
  // pinchtab returns {"text": "<page text>"}; the page text is the Reddit JSON.
  let pageText = out;
  try { pageText = JSON.parse(out).text ?? out; } catch {}
  const m = pageText.match(/\{[\s\S]*\}/);
  return m ? JSON.parse(m[0]) : null;
}

const signals = [];
for (const url of SOURCES) {
  const data = browserText(url);
  for (const child of data?.data?.children ?? []) {
    const x = child.data;
    signals.push({
      source: "reddit:" + (x.subreddit || ""),
      title: x.title,
      score: x.score ?? 0,
      comments: x.num_comments ?? 0,
      // engagement-weighted: a discussed thread carries more taste signal than a quiet upvote
      heat: (x.score ?? 0) + (x.num_comments ?? 0) * 4,
      snippet: (x.selftext || "").replace(/\s+/g, " ").slice(0, 220),
      url: "https://reddit.com" + (x.permalink || ""),
    });
  }
}

// de-dup by title, keep only date/experience-relevant signal, rank by heat
const seen = new Set();
const ranked = signals
  .filter((s) => !seen.has(s.title) && seen.add(s.title))
  .filter((s) => RELEVANT.test(s.title + " " + s.snippet))
  .sort((a, b) => b.heat - a.heat)
  .slice(0, 20);

console.log(JSON.stringify(ranked, null, 2));
console.error(`\nharvested ${signals.length} signals -> ${ranked.length} ranked`);
