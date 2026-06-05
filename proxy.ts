import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Next 16 renamed `middleware` -> `proxy`. Clerk only runs once its keys are set;
// until then this is a pass-through so the admin editor-key fallback keeps working.
export const proxy = process.env.CLERK_SECRET_KEY ? clerkMiddleware() : () => NextResponse.next();

export const config = {
  matcher: ["/admin", "/api/admin/:path*"],
};
