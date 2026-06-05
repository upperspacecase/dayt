// Dayt Knight — generation layer of the engine.
//
// Reads harvest.json (real, credited inspiration), asks Claude to write COMPLETE original
// NYC date concepts — learning the pattern, never copying — and inserts them into MongoDB
// as drafts (status: "draft"). Review + publish them at /admin; approved drafts go live in
// the Club, crediting the source that inspired them.
//
// Run:  ANTHROPIC_API_KEY=... MONGODB_URI=... node scripts/inspiration/generate.mjs
//       (the runner injects both from 1Password)

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { MongoClient } from "mongodb";

const here = dirname(fileURLToPath(import.meta.url));

// Mirrors FILTERS in app/dates.ts — the engine's output must use these exact buckets so
// the Club filters line up.
const VIBE = ["Golden hour", "After dark", "Slow & candlelit", "Outdoorsy", "Artful", "Old New York"];
const BUDGET = ["Under $40", "$40–100", "Splurge"];
const ENERGY = ["Low-key", "Lively", "Adventurous"];
const STAGE = ["First date", "Something new", "Long-haul"];
const TINTS = ["#E8A06A", "#C7553B", "#D98841", "#B06A7E", "#9A6B8A", "#7E9B5F", "#5E83A6", "#C98A53"];

const SYSTEM = `You write complete date concepts for Dayt Knight — a curated guide to dating in New York City.

Your job: read inspiration sourced from a real NYC date writer, learn the PATTERN of the kind of night they're good at, then write your own original concepts. Never reuse their spots or their words — invent a complete night that stands on its own.

What a concept is: the whole night, planned. A specific place, a timed arc of three beats, the one moment that makes it, what to bring, and a rain backup. Specific always wins — name the hour, the corner, the detail ("the 7:40 tram", not "a scenic ride").

The craft underneath (never name it to the reader — it should only feel like magic): build for connection. Shared novelty and a little adventure pull two people closer; give the night one peak moment they'll both remember; design beats where they turn toward each other instead of a screen.

Voice: premium, warm, confident. No emojis. Never use the words "cheap", "every", "actually", "truly", "simply", or "just". Don't anchor on price or compare to staying in.`;

const tool = {
  name: "emit_concepts",
  description: "Return the original date concepts you wrote.",
  input_schema: {
    type: "object",
    properties: {
      concepts: {
        type: "array",
        items: {
          type: "object",
          properties: {
            title: { type: "string", description: "Evocative and specific. Not 'Fun Date Night'." },
            area: { type: "string", description: "A specific NYC neighborhood, e.g. Greenpoint." },
            vibe: { type: "string", enum: VIBE },
            budget: { type: "string", enum: BUDGET },
            energy: { type: "string", enum: ENERGY },
            stage: { type: "string", enum: STAGE },
            timing: { type: "string", description: "When to go, specific. 'Friday, arrive by 7:10pm'." },
            hook: { type: "string", description: "One line that sells the night." },
            arc: {
              type: "array",
              description: "Three beats, in order.",
              items: {
                type: "object",
                properties: { t: { type: "string" }, d: { type: "string" } },
                required: ["t", "d"],
              },
            },
            moment: { type: "string", description: "The single peak moment of the night." },
            spot: { type: "string", description: "The specific place." },
            bring: { type: "string" },
            backup: { type: "string", description: "What to do if it rains." },
          },
          required: ["title", "area", "vibe", "budget", "energy", "stage", "timing", "hook", "arc", "moment", "spot", "bring", "backup"],
        },
      },
    },
    required: ["concepts"],
  },
};

async function generate(item) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-opus-4-8",
      max_tokens: 8000,
      system: SYSTEM,
      tools: [tool],
      tool_choice: { type: "tool", name: "emit_concepts" },
      messages: [{
        role: "user",
        content: `Inspiration from ${item.name} (${item.url}). Learn the pattern of the nights they champion, then write 2 original NYC date concepts of your own.\n\n---\n${item.text}`,
      }],
    }),
  });
  if (!res.ok) {
    console.error(`  API ${res.status}: ${(await res.text()).slice(0, 200)}`);
    return [];
  }
  const data = await res.json();
  const block = data.content?.find((b) => b.type === "tool_use");
  return block?.input?.concepts ?? [];
}

function tint(seed) {
  let h = 0;
  for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) % 997;
  return TINTS[h % TINTS.length];
}

const harvest = JSON.parse(readFileSync(join(here, "harvest.json"), "utf8"));
const drafts = [];
for (const item of harvest) {
  const concepts = await generate(item);
  console.error(`${item.name} -> ${concepts.length} concepts`);
  for (const c of concepts) {
    const slug = c.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40);
    drafts.push({
      ...c,
      id: `u_eng-${slug}-${Date.now().toString(36)}-${drafts.length}`,
      tint: tint(c.title),
      creator: "Dayt Knight",
      credit: item.url,
      source: "engine",
      status: "draft",
      createdAt: new Date(),
    });
  }
}

if (!drafts.length) {
  console.error("no drafts generated");
  process.exit(1);
}

const client = await new MongoClient(process.env.MONGODB_URI).connect();
await client.db("daytknight").collection("concepts").insertMany(drafts);
await client.close();
console.error(`\ninserted ${drafts.length} drafts -> review at /admin`);
