// Dayt Knight — local generation run.
//
// Reads harvest.json (real, credited inspiration), generates COMPLETE original concepts
// via the shared engine core, stocks the `inspiration` pantry the nightly cron draws from,
// and inserts the concepts into MongoDB as drafts (status: "draft"). Review + publish at
// /admin; approved drafts go live in the Club, crediting the source.
//
// Run:  op run --env-file=scripts/inspiration/.env.tpl -- node scripts/inspiration/generate.mjs

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { MongoClient } from "mongodb";
import { generateConcepts, toDraft } from "../../engine-core.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const harvest = JSON.parse(readFileSync(join(here, "harvest.json"), "utf8"));

const client = await new MongoClient(process.env.MONGODB_URI).connect();
const db = client.db("daytknight");
const drafts = [];

for (const item of harvest) {
  // stock the pantry the nightly cron draws from
  await db.collection("inspiration").updateOne(
    { url: item.url },
    { $set: { name: item.name, url: item.url, credit: item.credit, text: item.text, updatedAt: new Date() } },
    { upsert: true },
  );
  let concepts = [];
  try {
    concepts = await generateConcepts(item, process.env.ANTHROPIC_API_KEY, 2);
  } catch (e) {
    console.error(`  ${item.name}: ${e.message}`);
  }
  console.error(`${item.name} -> ${concepts.length} concepts`);
  for (const c of concepts) drafts.push(toDraft(c, item, drafts.length));
}

if (drafts.length) await db.collection("concepts").insertMany(drafts);
await client.close();
console.error(`\ninserted ${drafts.length} drafts -> review at /admin`);
