"use server";

import { redirect } from "next/navigation";

export async function subscribe(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const apiKey = process.env.RESEND_API_KEY;
  const segmentId = process.env.RESEND_DAYT_SEGMENT_ID;

  if (!email || !email.includes("@") || !apiKey || !segmentId) {
    redirect("/?error=1");
  }

  let ok = false;
  try {
    const res = await fetch("https://api.resend.com/contacts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        unsubscribed: false,
        segments: [{ id: segmentId }],
      }),
    });
    ok = res.ok;
  } catch {
    ok = false;
  }

  redirect(ok ? "/?subscribed=1" : "/?error=1");
}
