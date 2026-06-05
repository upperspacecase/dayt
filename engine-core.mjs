// Dayt Knight engine — the shared generator.
//
// One source of truth used by BOTH the local CLI (scripts/inspiration/generate.mjs)
// and the nightly cron (app/api/cron/generate/route.ts). Plain .mjs so both a Node
// script and the Next route can import it.

// Mirrors FILTERS in app/dates.ts — output must use these exact buckets so the Club
// filters line up.
const VIBE = ["Golden hour", "After dark", "Slow & candlelit", "Outdoorsy", "Artful", "Old New York"];
const BUDGET = ["Under $40", "$40–100", "Splurge"];
const ENERGY = ["Low-key", "Lively", "Adventurous"];
const STAGE = ["First date", "Something new", "Long-haul"];
const TINTS = ["#E8A06A", "#C7553B", "#D98841", "#B06A7E", "#9A6B8A", "#7E9B5F", "#5E83A6", "#C98A53"];

export const SYSTEM = `You write date ideas for Dayt Knight — a curated guide to dating in New York City.

Read what's given (a writer's piece, or an events listing) and write your own original ideas. Never reuse their words. Keep each idea SIMPLE: one or two sentences someone could act on this week. Not an itinerary — one good move.

THE REMIX BANK — your secret sauce. An ordinary outing becomes a real date when you add one of these moves:
- make something together
- become characters
- add a constraint
- compare or rank things
- create a souvenir
- let chance decide
- do a tiny mission
- learn badly together
- pair two unrelated activities
- add a secret prompt
- make it competitive
- make it ceremonial

Take a specific NYC place or a real upcoming event and apply one or two moves so a normal thing becomes a better date. For example —
  Plain: "Go to a bookstore."
  Remixed: "Each of you buys the other a book based only on its cover, then you read the first page to each other over coffee."

When the source is an events listing, build the idea around a specific, real, named upcoming event and remix it.

Be specific — name the place, the neighborhood, the move. Voice: premium, warm, confident. No emojis. Never use the words "cheap", "every", "actually", "truly", "simply", or "just". Don't anchor on price or compare to staying in.`;

export const TOOL = {
  name: "emit_concepts",
  description: "Return the original, remixed date ideas you wrote.",
  input_schema: {
    type: "object",
    properties: {
      concepts: {
        type: "array",
        items: {
          type: "object",
          properties: {
            title: { type: "string", description: "Short and evocative. Names the place or the move." },
            idea: { type: "string", description: "One or two sentences — what you actually do, with the remix that makes it a date. Specific." },
            area: { type: "string", description: "A specific NYC neighborhood, e.g. Greenpoint." },
            vibe: { type: "string", enum: VIBE },
            budget: { type: "string", enum: BUDGET },
            energy: { type: "string", enum: ENERGY },
            stage: { type: "string", enum: STAGE },
          },
          required: ["title", "idea", "area", "vibe", "budget", "energy", "stage"],
        },
      },
    },
    required: ["concepts"],
  },
};

export async function generateConcepts(item, apiKey, count = 3) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-opus-4-8",
      max_tokens: 4000,
      system: SYSTEM,
      tools: [TOOL],
      tool_choice: { type: "tool", name: "emit_concepts" },
      messages: [{
        role: "user",
        content: `Source: ${item.name} (${item.url}). Write ${count} original, remixed NYC date ideas — apply moves from the remix bank, and if this is an events listing, build them around specific real upcoming events.\n\n---\n${item.text}`,
      }],
    }),
  });
  if (!res.ok) {
    throw new Error(`anthropic ${res.status}: ${(await res.text()).slice(0, 200)}`);
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

// A generated idea -> a simple Mongo draft, crediting the source it learned from.
export function toDraft(concept, item, suffix) {
  const slug = concept.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40);
  return {
    id: `u_eng-${slug}-${Date.now().toString(36)}-${suffix}`,
    title: concept.title,
    area: concept.area,
    vibe: concept.vibe,
    budget: concept.budget,
    energy: concept.energy,
    stage: concept.stage,
    tint: tint(concept.title),
    timing: "", hook: concept.idea, arc: [], spot: "", moment: "", bring: "", backup: "",
    creator: "Dayt Knight",
    credit: item.url,
    source: "engine",
    status: "draft",
    createdAt: new Date(),
  };
}
