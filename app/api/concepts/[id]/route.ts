import { NextResponse } from "next/server";
import { conceptsCol, clean } from "../../../mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const col = await conceptsCol();
  const doc = await col.findOne({ id });
  if (!doc) return NextResponse.json(null, { status: 404 });
  return NextResponse.json(clean(doc));
}
