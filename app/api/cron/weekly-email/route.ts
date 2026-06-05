import { NextRequest, NextResponse } from "next/server";
import { getDailyThree, type Concept } from "../../../dates";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FROM = "Dayt Knight <hello@daytknight.club>";
const SITE = "https://daytknight.club";

function emailHtml(ideas: Concept[]): string {
  const blocks = ideas
    .map(
      (c) => `
    <tr><td style="padding:0 0 18px;">
      <div style="background:#FCEEF1;border:1px solid rgba(43,35,41,0.10);border-radius:16px;padding:22px 24px;">
        <div style="font:600 11px/1.4 Georgia,'Times New Roman',serif;letter-spacing:0.12em;text-transform:uppercase;color:#C24E73;">${c.area} &middot; ${c.vibe}</div>
        <h2 style="margin:8px 0 6px;font:600 24px/1.15 Georgia,'Times New Roman',serif;color:#2B2329;">${c.title}</h2>
        <p style="margin:0 0 14px;font:400 15px/1.55 Arial,sans-serif;color:#6E5E66;">${c.hook}</p>
        <a href="${SITE}/dates/${c.id}" style="font:600 14px Arial,sans-serif;color:#DE4D86;text-decoration:none;">See the plan &rarr;</a>
      </div>
    </td></tr>`,
    )
    .join("");
  return `<!doctype html><html><body style="margin:0;background:#F5DCE2;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F5DCE2;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;">
        <tr><td style="padding:0 0 22px;text-align:center;">
          <div style="font:600 26px Georgia,'Times New Roman',serif;color:#2B2329;">Dayt Knight</div>
          <div style="font:400 15px Arial,sans-serif;color:#6E5E66;margin-top:6px;">Three for the weekend.</div>
        </td></tr>
        ${blocks}
        <tr><td style="padding:10px 0 0;text-align:center;font:400 12px Arial,sans-serif;color:#A892A0;">
          Made in New York. <a href="${SITE}/club" style="color:#C24E73;text-decoration:none;">Join the club</a> for the whole library.<br/>
          <a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color:#A892A0;">Unsubscribe</a>
        </td></tr>
      </table>
    </td></tr>
  </table>
  </body></html>`;
}

// Weekly: send three date ideas to the list. ?test=1 creates a draft instead of sending.
export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const apiKey = process.env.RESEND_API_KEY;
  const segmentId = process.env.RESEND_DAYT_SEGMENT_ID;
  if (!apiKey || !segmentId) {
    return NextResponse.json({ error: "RESEND env not set" }, { status: 500 });
  }

  const dry = req.nextUrl.searchParams.get("test") === "1";
  const ideas = getDailyThree();
  const html = emailHtml(ideas);

  const create = await fetch("https://api.resend.com/broadcasts", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: FROM,
      subject: "Your three for the weekend",
      segment_id: segmentId,
      name: `Weekly — ${ideas.map((i) => i.title).join(", ")}`.slice(0, 110),
      html,
    }),
  });
  const created = await create.json();
  if (!created?.id) {
    return NextResponse.json({ error: "broadcast create failed", detail: created }, { status: 502 });
  }
  if (dry) return NextResponse.json({ ok: true, draft: created.id, sent: false });

  const send = await fetch(`https://api.resend.com/broadcasts/${created.id}/send`, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
  });
  return NextResponse.json({ ok: send.ok, broadcast: created.id, sent: send.ok });
}
