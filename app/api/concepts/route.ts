import { NextRequest, NextResponse } from "next/server";
import { conceptsCol, clean, type StoredConcept } from "../../mongodb";
import { type Concept } from "../../dates";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const creator = req.nextUrl.searchParams.get("creator");
  const col = await conceptsCol();
  // drafts (engine output awaiting review) never surface publicly
  const query: Record<string, unknown> = { status: { $ne: "draft" } };
  if (creator) {
    query.creator = { $regex: `^${creator.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, $options: "i" };
  }
  const docs = await col.find(query).sort({ createdAt: -1 }).limit(200).toArray();
  return NextResponse.json(docs.map((d) => clean(d)));
}

export async function POST(req: NextRequest) {
  let body: Partial<Concept>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }
  if (!body.id || !body.title || typeof body.title !== "string" || body.title.length > 120) {
    return NextResponse.json({ error: "invalid concept" }, { status: 400 });
  }
  const col = await conceptsCol();
  // a person creating from the site is published immediately and credited as a creator
  const doc: StoredConcept = {
    ...(body as Concept),
    source: "creator",
    status: "published",
    createdAt: new Date(),
  };
  await col.insertOne(doc);
  return NextResponse.json({ id: body.id });
}
