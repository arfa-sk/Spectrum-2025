"use client";

import { Orbitron, Space_Grotesk } from "next/font/google";
import { TimelineContent } from "@/components/timeline-animation";
import { useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import Image from "next/image";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "700"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

interface Sponsor {
  name: string;
  image: string;
}

export default function Sponsors() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();

  const sponsors: Sponsor[] = [
    { name: "GenZ", image: "/sponsors/Genz-Logo.png" },
    { name: "Tapmad", image: "/sponsors/Logo-tapmad.png" },
    { name: "Sports & Youth Affairs Govt of Sindh", image: "/sponsors/Sports & Youth Affairs Department Govt of Sindh Logo.png" },
    { name: "Tapshop", image: "/sponsors/tapshop.png" },
  ];

  // Tripled list to ensure a completely seamless and uninterrupted infinite scrolling track
  const sponsorsRow1 = [...sponsors, ...sponsors, ...sponsors, ...sponsors];
  const sponsorsRow2 = [...sponsors].reverse();
  const scrollingRow2 = [...sponsorsRow2, ...sponsorsRow2, ...sponsorsRow2, ...sponsorsRow2];

  return (
    <section
      id="sponsors"
      ref={sectionRef}
      className="relative py-28 bg-white border-t border-gray-100 overflow-hidden"
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
            We collaborate with brands who believe in creativity, technology, and impact.
          </p>
        </TimelineContent>

        {/* Premium Divider */}
        <div className="mt-6 mb-20">
          <div className="w-16 h-1 bg-gradient-to-r from-[#FFD700] to-black mx-auto rounded-full" />
        </div>

        {/* Scrolling Track Container */}
        <TimelineContent animationNum={2} timelineRef={sectionRef} once={false}>
          <div className="flex flex-col gap-6 w-full">
            
            {/* ROW 1: Scrolling Left */}
            <div
              className="relative w-full group overflow-hidden py-2"
              style={{
                WebkitMaskImage:
                  "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
                maskImage:
                  "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
              }}
              aria-label="Official Event Sponsors Row 1"
            >
              <div
                className={`flex gap-6 ${
                  reduceMotion ? "" : "animate-scroll-left"
                } group-hover:[animation-play-state:paused]`}
              >
                {sponsorsRow1.map((sponsor, i) => (
                  <div
                    key={`${sponsor.name}-row1-${i}`}
                    className="flex-shrink-0"
                  >
                    <div className="rounded-2xl border border-neutral-200/60 bg-white shadow-sm hover:shadow-md px-6 py-4 transition-all duration-300 hover:scale-105 flex items-center justify-center w-[160px] h-[100px] relative overflow-hidden">
                      <div className="relative w-28 h-12 flex items-center justify-center">
                        <Image
                          src={sponsor.image}
                          alt={sponsor.name}
                          fill
                          className="object-contain"
                          sizes="112px"
                          priority={i < 4}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ROW 2: Scrolling Right */}
            <div
              className="relative w-full group overflow-hidden py-2"
              style={{
                WebkitMaskImage:
                  "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
                maskImage:
                  "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
              }}
              aria-label="Official Event Sponsors Row 2"
            >
              <div
                className={`flex gap-6 ${
                  reduceMotion ? "" : "animate-scroll-right"
                } group-hover:[animation-play-state:paused]`}
              >
                {scrollingRow2.map((sponsor, i) => (
                  <div
                    key={`${sponsor.name}-row2-${i}`}
                    className="flex-shrink-0"
                  >
                    <div className="rounded-2xl border border-neutral-200/60 bg-white shadow-sm hover:shadow-md px-6 py-4 transition-all duration-300 hover:scale-105 flex items-center justify-center w-[160px] h-[100px] relative overflow-hidden">
                      <div className="relative w-28 h-12 flex items-center justify-center">
                        <Image
                          src={sponsor.image}
                          alt={sponsor.name}
                          fill
                          className="object-contain"
                          sizes="112px"
                          priority={i < 4}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </TimelineContent>
      </div>

      {/* High-speed CSS Animations */}
      <style jsx>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-25%); }
          100% { transform: translateX(0); }
        }
        .animate-scroll-left {
          display: flex;
          width: max-content;
          animation: scroll-left 30s linear infinite;
        }
        .animate-scroll-right {
          display: flex;
          width: max-content;
          animation: scroll-right 30s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-scroll-left, .animate-scroll-right { animation: none; }
        }
      `}</style>
    </section>
  );
}
