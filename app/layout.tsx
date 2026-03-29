import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/nav";
import Footer from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Primate Labs",
    template: "%s — Primate Labs",
  },
  description:
    "Building at the intersection of software, AI, and hardware. Projects, writing, and experiments from a technical builder.",
  metadataBase: new URL("https://primatelabs.io"),
  openGraph: {
    title: "Primate Labs",
    description:
      "Building at the intersection of software, AI, and hardware.",
    url: "https://primatelabs.io",
    siteName: "Primate Labs",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Primate Labs",
    description:
      "Building at the intersection of software, AI, and hardware.",
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
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-[#0a0a0a] text-[#f5f5f5] antialiased">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
