import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register - Spectrum 2026 | DHA Suffa University",
  description: "Register for Spectrum 2026 - Pakistan's Premier Tech Festival. Join us for Hackathons, Gaming Arena, and Suffa's Got Talent competitions with PKR 400,000+ in prizes.",
  keywords: ["Spectrum 2026", "DHA Suffa University", "Tech Fest", "Hackathon", "Gaming", "Registration", "Karachi"],
  openGraph: {
    title: "Register for Spectrum 2026",
    description: "Join Pakistan's Premier Tech Festival - Coding, Gaming, and Talent Competitions",
    type: "website",
  },
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

