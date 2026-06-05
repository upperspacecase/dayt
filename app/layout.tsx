import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import "./design.css";
import SiteHeader from "./site-header";
import SiteFooter from "./site-footer";

export const metadata: Metadata = {
  title: "Dayt Knight — Dating, without the admin.",
  description:
    "Dayt Knight helps you plan better dates without turning romance into admin. Get inspired by fresh daily ideas, open the full plan, shape it to your person, and make it happen.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const app = (
    <div className="app" data-mood="cream" data-fonts="serif" data-density="comfortable">
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Inter:wght@400;500;600;700&family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;0,6..96,600;0,6..96,700;1,6..96,400;1,6..96,500&family=Hanken+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* ClerkProvider wraps the app once its keys are set — site runs untouched until then. */}
        {process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ? <ClerkProvider>{app}</ClerkProvider> : app}
      </body>
    </html>
  );
}
