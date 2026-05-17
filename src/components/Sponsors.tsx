"use client";

import { Orbitron, Space_Grotesk } from "next/font/google";
import { TimelineContent } from "@/components/timeline-animation";
import { useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "700"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

interface Sponsor {
  name: string;
  logoType: "redbull" | "pepsi" | "dsu";
}

// High-fidelity custom SVG logos to ensure pristine rendering and zero broken image issues
function SponsorLogo({ type }: { type: Sponsor["logoType"] }) {
  if (type === "redbull") {
    return (
      <svg className="h-16 w-auto" viewBox="0 0 240 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="redbullSun" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFE600" />
            <stop offset="100%" stopColor="#FF9900" />
          </linearGradient>
          <linearGradient id="redbullBull" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF003C" />
            <stop offset="100%" stopColor="#9E0010" />
          </linearGradient>
        </defs>
        {/* Sun */}
        <circle cx="80" cy="40" r="24" fill="url(#redbullSun)" />
        {/* Left Bull */}
        <path d="M 68 46 C 60 46, 50 36, 42 38 C 38 39, 36 43, 30 38 C 24 33, 26 25, 20 22 C 28 26, 32 30, 38 28 C 42 27, 46 22, 50 24 C 54 26, 56 32, 62 34 C 66 35, 72 34, 76 38 Z" fill="url(#redbullBull)" />
        {/* Right Bull */}
        <path d="M 92 46 C 100 46, 110 36, 118 38 C 122 39, 124 43, 130 38 C 136 33, 134 25, 140 22 C 132 26, 128 30, 122 28 C 118 27, 114 22, 110 24 C 106 26, 104 32, 98 34 C 94 35, 88 34, 84 38 Z" fill="url(#redbullBull)" />
        {/* Text */}
        <text x="148" y="48" fill="#000D47" fontFamily="sans-serif" fontSize="24" fontWeight="900" letterSpacing="0.05em">Red Bull</text>
        <text x="148" y="62" fill="#FF003C" fontFamily="sans-serif" fontSize="10" fontWeight="900" letterSpacing="0.4em">ENERGY</text>
      </svg>
    );
  }

  if (type === "pepsi") {
    return (
      <svg className="h-16 w-auto" viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="pepsiBlue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#004B93" />
            <stop offset="100%" stopColor="#001850" />
          </linearGradient>
          <linearGradient id="pepsiRed" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E32219" />
            <stop offset="100%" stopColor="#9E0A00" />
          </linearGradient>
        </defs>
        {/* Globe Wrapper */}
        <g transform="translate(10, 8)">
          {/* Background Blue bottom half */}
          <path d="M 32 32 M 3.4 43.6 C 7.5 54.8, 18.5 62, 32 62 C 45.5 62, 56.5 54.8, 60.6 43.6 C 45 42, 23 48, 3.4 43.6 Z" fill="url(#pepsiBlue)" />
          {/* Top Red half */}
          <path d="M 32 32 M 3.4 20.4 C 7.5 9.2, 18.5 2, 32 2 C 45.5 2, 56.5 9.2, 60.6 20.4 C 42 16, 21 24, 3.4 20.4 Z" fill="url(#pepsiRed)" />
          {/* Middle white wave space implicitly created */}
        </g>
        {/* Text */}
        <text x="94" y="49" fill="#004B93" fontFamily="sans-serif" fontSize="28" fontWeight="800" fontStyle="italic" letterSpacing="-0.02em">pepsi</text>
      </svg>
    );
  }

  // DSU logo
  return (
    <svg className="h-16 w-auto" viewBox="0 0 260 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="dsuGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="50%" stopColor="#C5A100" />
          <stop offset="100%" stopColor="#B8860B" />
        </linearGradient>
      </defs>
      {/* Insignia Shield */}
      <g transform="translate(10, 8)">
        {/* Laurels */}
        <path d="M 12 45 C 8 35, 10 20, 20 12 C 16 22, 16 35, 20 40 M 52 45 C 56 35, 54 20, 44 12 C 48 22, 48 35, 44 40" stroke="url(#dsuGold)" strokeWidth="3" strokeLinecap="round" />
        {/* Center Shield */}
        <path d="M 24 16 L 40 16 L 40 38 C 40 44, 32 50, 32 50 C 32 50, 24 44, 24 38 Z" fill="black" stroke="url(#dsuGold)" strokeWidth="3" />
        {/* Book Lines */}
        <path d="M 28 26 L 36 26 M 28 32 L 36 32" stroke="url(#dsuGold)" strokeWidth="2.5" strokeLinecap="round" />
        {/* Star */}
        <path d="M 32 10 L 33.5 13 L 36.5 13 L 34.5 15 L 35.5 18 L 32 16.5 L 28.5 18 L 29.5 15 L 27.5 13 L 30.5 13 Z" fill="url(#dsuGold)" />
      </g>
      {/* Text */}
      <text x="80" y="40" fill="black" fontFamily="sans-serif" fontSize="24" fontWeight="800" letterSpacing="0.05em">DSU</text>
      <text x="80" y="55" fill="gray" fontFamily="sans-serif" fontSize="9" fontWeight="600" letterSpacing="0.2em">DHA SUFFA UNIVERSITY</text>
    </svg>
  );
}

export default function Sponsors() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();

  const sponsors: Sponsor[] = [
    { name: "Red Bull", logoType: "redbull" },
    { name: "Pepsi", logoType: "pepsi" },
    { name: "DSU", logoType: "dsu" },
  ];

  // Tripled list to ensure a completely seamless and uninterrupted infinite scrolling track
  const scrollingSponsors = [...sponsors, ...sponsors, ...sponsors];

  return (
    <section
      id="sponsors"
      ref={sectionRef}
      className="relative py-28 bg-gradient-to-b from-white to-neutral-50 border-t border-gray-100 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,rgba(255,215,0,0.015)_0%,transparent_60%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Section Title */}
        <TimelineContent animationNum={0} timelineRef={sectionRef} once={false}>
          <h2
            className={`${orbitron.className} text-4xl md:text-5xl font-extrabold tracking-tight text-black uppercase mb-4`}
          >
            Spectrum Partners
          </h2>
        </TimelineContent>

        <TimelineContent animationNum={1} timelineRef={sectionRef} once={false}>
          <p className={`${spaceGrotesk.className} text-gray-500 text-base max-w-2xl mx-auto leading-relaxed`}>
            Collaborating with world-class leaders to foster innovation, support digital excellence, and ignite creative energy.
          </p>
        </TimelineContent>

        {/* Premium Divider */}
        <div className="mt-6 mb-20">
          <div className="w-24 h-1 bg-gradient-to-r from-[#FFD700] to-black mx-auto" />
        </div>

        {/* Scrolling Track Container */}
        <TimelineContent animationNum={2} timelineRef={sectionRef} once={false}>
          <div
            className="relative w-full group overflow-hidden py-4"
            style={{
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
              maskImage:
                "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
            }}
            aria-label="Official Event Sponsors"
          >
            <div
              className={`flex gap-12 ${
                reduceMotion ? "" : "animate-scroll"
              } group-hover:[animation-play-state:paused]`}
            >
              {scrollingSponsors.map((sponsor, i) => (
                <div
                  key={`${sponsor.name}-${i}`}
                  className="flex-shrink-0"
                >
                  {/* Premium Tilt-Simulating Card */}
                  <div className="rounded-3xl border-2 border-black bg-white shadow-sm hover:shadow-2xl px-10 py-6 transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:[transform:rotateX(4deg)_rotateY(-3deg)] flex items-center justify-center min-w-[240px] h-28 relative overflow-hidden group/card">
                    {/* Background gold pulse */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700]/0 via-[#FFD700]/5 to-[#FFD700]/0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
                    <SponsorLogo type={sponsor.logoType} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TimelineContent>
      </div>

      {/* High-speed CSS Animations */}
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.3333%); }
        }
        .animate-scroll {
          display: flex;
          width: max-content;
          animation: scroll 22s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-scroll { animation: none; }
        }
      `}</style>
    </section>
  );
}
