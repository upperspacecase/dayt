import { NextRequest, NextResponse } from "next/server";
import { conceptsCol, clean } from "../../../mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "taytoddpattison@gmail.com").toLowerCase();
const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

// Verify a Google One Tap ID token via Google's tokeninfo endpoint (it checks the
// signature + expiry server-side) and return the verified email.
async function googleEmail(idToken: string): Promise<string | null> {
  const r = await fetch(
    `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(idToken)}`,
  );
  if (!r.ok) return null;
  const c = await r.json();
  if (CLIENT_ID && c.aud !== CLIENT_ID) return null;
  if (c.email_verified !== "true" && c.email_verified !== true) return null;
  return typeof c.email === "string" ? c.email.toLowerCase() : null;
}

// Allow only the admin: a valid Google sign-in for the allowed email, or — as a
// transitional fallback until Google is configured — the editor key.
async function authorize(google?: string | null, admin?: string | null): Promise<boolean> {
  if (google) {
    const email = await googleEmail(google);
    if (email && email === ADMIN_EMAIL) return true;
  }
  const expected = process.env.ADMIN_TOKEN;
  return !!expected && admin === expected;
}

function bearer(req: NextRequest): string | null {
  const h = req.headers.get("authorization") || "";
  return h.startsWith("Bearer ") ? h.slice(7) : null;
}

// the review queue — engine drafts awaiting a thumbs-up
export async function GET(req: NextRequest) {
  if (!(await authorize(bearer(req), req.nextUrl.searchParams.get("token")))) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const col = await conceptsCol();
  const docs = await col.find({ status: "draft" }).sort({ createdAt: -1 }).limit(200).toArray();
  return NextResponse.json(docs.map((d) => clean(d)));
}

// publish a draft, or reject (delete) it
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  if (!(await authorize(body.googleToken, body.token))) {
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
