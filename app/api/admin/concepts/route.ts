import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { conceptsCol, clean } from "../../../mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "taytoddpattison@gmail.com").toLowerCase();

// Allow only the admin: a Clerk sign-in whose email matches, or — until Clerk's keys
// are set — the editor key as a fallback.
async function authorize(adminKey?: string | null): Promise<boolean> {
  if (process.env.CLERK_SECRET_KEY) {
    try {
      const { userId } = await auth();
      if (userId) {
        const u = await currentUser();
        const email = u?.primaryEmailAddress?.emailAddress?.toLowerCase();
        if (email === ADMIN_EMAIL) return true;
      }
    } catch {
      // fall through to the key check
    }
  }
  const expected = process.env.ADMIN_TOKEN;
  return !!expected && adminKey === expected;
}

// the review queue — engine drafts awaiting a thumbs-up
export async function GET(req: NextRequest) {
  if (!(await authorize(req.nextUrl.searchParams.get("token")))) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const col = await conceptsCol();
  const docs = await col.find({ status: "draft" }).sort({ createdAt: -1 }).limit(200).toArray();
  return NextResponse.json(docs.map((d) => clean(d)));
}

// publish a draft, or reject (delete) it
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  if (!(await authorize(body.token))) {
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
