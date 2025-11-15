import ScrollToTop from "@/src/components/ui/ScrollToTop";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Animania - Votre portail sur le monde animal",
    template: "%s | Animania",
  },
  description:
    "Découvrez le monde fascinant des animaux à travers des articles passionnants, des photos exceptionnelles et une communauté engagée.",
  keywords: [
    "animaux",
    "nature",
    "biodiversité",
    "protection animale",
    "faune",
    "écologie",
  ],
  authors: [{ name: "Équipe Animania" }],
  creator: "Animania",
  publisher: "Animania",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  ),
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    title: "Animania - Votre portail sur le monde animal",
    description:
      "Découvrez le monde fascinant des animaux à travers des articles passionnants.",
    siteName: "Animania",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <main className="grow">{children}</main>
        <ScrollToTop />
      </body>
    </html>
  );
}
