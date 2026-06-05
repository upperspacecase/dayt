// Dayt Knight — inspiration harvester (sourcing layer of the engine).
//
// Editorial/creator sites block plain fetch and have no clean API. A real browser is not
// blocked. We read each source's page text THROUGH a running pinchtab browser, keep what
// returned real content, and hand it to the generator with its credit attached.
//
// We learn the PATTERN of a good New York night. We never copy a post.
//
// Run:  PT_PORT=<pinchtab port> node scripts/inspiration/harvest.mjs
//       (writes scripts/inspiration/harvest.json and prints a summary)

import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { SOURCES } from "./sources.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const server = `http://localhost:${process.env.PT_PORT || "9882"}`;

function pageText(url) {
  execFileSync("pinchtab", ["--server", server, "nav", url, "--block-images"], { stdio: "ignore" });
  const out = execFileSync("pinchtab", ["--server", server, "text"], {
    encoding: "utf8",
    maxBuffer: 24 * 1024 * 1024,
  });
  let text = out;
  try { text = JSON.parse(out).text ?? out; } catch {}
  return text.replace(/\s+/g, " ").trim();
}

const harvested = [];
for (const s of SOURCES) {
  let text = "";
  try { text = pageText(s.url); } catch { text = ""; }
  const clean = text.slice(0, 6000);
  const ok = clean.length > 400;
  console.error(`${ok ? "ok  " : "skip"}  ${s.name}  (${clean.length} chars)`);
  if (ok) harvested.push({ name: s.name, url: s.url, credit: s.credit, text: clean });
}

writeFileSync(join(here, "harvest.json"), JSON.stringify(harvested, null, 2));
console.error(`\nharvested ${harvested.length}/${SOURCES.length} sources -> harvest.json`);
