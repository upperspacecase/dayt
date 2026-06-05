import { NextRequest, NextResponse } from "next/server";
import { conceptsCol, inspirationCol } from "../../../mongodb";
import { generateConcepts, toDraft } from "../../../../engine-core.mjs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

// Nightly: pick one stored inspiration source and draft fresh concepts from it.
// Drafts land in the review queue at /admin — never public until approved.
export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "ANTHROPIC_API_KEY not set" }, { status: 500 });

  const insp = await inspirationCol();
  const items = await insp.find({}).toArray();
  if (!items.length) {
    return NextResponse.json({ generated: 0, note: "no inspiration seeded — run a local harvest" });
  }

  // rotate through sources by calendar day
  const day = Math.floor(Date.now() / 86_400_000);
  const item = items[day % items.length];

  let concepts;
  try {
    concepts = await generateConcepts(item, apiKey, 2);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 502 });
  }

  const drafts = concepts.map((c, i) => toDraft(c, item, i));
  if (drafts.length) {
    const col = await conceptsCol();
    await col.insertMany(drafts);
  }
  return NextResponse.json({ generated: drafts.length, from: item.name });
}
