import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Next 16 renamed `middleware` -> `proxy`. Guarded so the site runs until Clerk's keys
// are set; once they are, clerkMiddleware() takes over (the official setup).
export default process.env.CLERK_SECRET_KEY ? clerkMiddleware() : () => NextResponse.next();

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for Clerk's auto-proxy path
    "/__clerk/:path*",
    "/(api|trpc)(.*)",
  ],
};
