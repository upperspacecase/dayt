import type { Metadata } from "next";
import "./globals.css";
import "./design.css";
import SiteHeader from "./site-header";
import SiteFooter from "./site-footer";

export const metadata: Metadata = {
  title: "Dayt Knight — Dating, without the admin.",
  description:
    "We dream up the whole night — where, when, the one moment that makes it, what to bring, the backup if it rains. Three new ways to fall for someone, each day. New York.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
        <div className="app" data-mood="cream" data-fonts="serif" data-density="comfortable">
          <SiteHeader />
          {children}
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
