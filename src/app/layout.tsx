import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/authContext";
import ErrorBoundary from "@/components/ErrorBoundary";

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
    default: "Spectrum 2025 — DHA Suffa University",
    template: "%s — Spectrum 2025",
  },
  description: "Spectrum 2025: Coding, Robotics, AI, Creativity — The Ultimate Tech Fest.",
  metadataBase: new URL("https://example.com"),
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Spectrum 2025 — DHA Suffa University",
    description: "Join the ultimate tech fest: coding, robotics, AI, and creativity.",
    url: "https://example.com",
    siteName: "Spectrum 2025",
    images: [
      { url: "/spectrum-og.png", width: 1200, height: 630, alt: "Spectrum 2025" },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Spectrum 2025 — DHA Suffa University",
    description: "Join the ultimate tech fest: coding, robotics, AI, and creativity.",
    images: ["/spectrum-og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#FFD700" />
        <link rel="icon" href="/icon.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-icon.png" sizes="180x180" />
      </head>
      <body suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ErrorBoundary>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
