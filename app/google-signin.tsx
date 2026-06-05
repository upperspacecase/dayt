"use client";

import { useEffect } from "react";
import Script from "next/script";

export const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

// Decode a Google ID token's payload (client-side, for display/email — the server
// re-verifies admin tokens against Google's tokeninfo endpoint).
export function decodeToken(token: string): { email?: string; name?: string } {
  try {
    return JSON.parse(atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
  } catch {
    return {};
  }
}

// Google Identity Services: One Tap + a sign-in button. Calls onToken with the ID token.
export default function GoogleSignIn({ onToken }: { onToken: (token: string) => void }) {
  function init() {
    const g = (window as unknown as { google?: any }).google;
    if (!g || !GOOGLE_CLIENT_ID) return;
    g.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: (r: { credential: string }) => onToken(r.credential),
    });
    const el = document.getElementById("g-signin-btn");
    if (el) g.accounts.id.renderButton(el, { theme: "outline", size: "large", shape: "pill", text: "signin_with" });
    g.accounts.id.prompt(); // One Tap
  }

  useEffect(() => {
    const g = (window as unknown as { google?: any }).google;
    if (g) init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" onLoad={init} />
      <div id="g-signin-btn" />
    </>
  );
}
