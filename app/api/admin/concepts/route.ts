import { NextRequest, NextResponse } from "next/server";
import { conceptsCol, clean } from "../../../mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function authed(token: string | null): boolean {
  const expected = process.env.ADMIN_TOKEN;
  return !!expected && token === expected;
}

// the review queue — engine drafts awaiting a thumbs-up
export async function GET(req: NextRequest) {
  if (!authed(req.nextUrl.searchParams.get("token"))) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const col = await conceptsCol();
  const docs = await col.find({ status: "draft" }).sort({ createdAt: -1 }).limit(200).toArray();
  return NextResponse.json(docs.map((d) => clean(d)));
}

// publish a draft, or reject (delete) it
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  if (!authed(body.token)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  if (!body.id || (body.action !== "publish" && body.action !== "reject")) {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }
  const col = await conceptsCol();
  if (body.action === "publish") {
    await col.updateOne({ id: body.id }, { $set: { status: "published" } });
  } else {
    await col.deleteOne({ id: body.id });
  }
  return NextResponse.json({ ok: true });
}
