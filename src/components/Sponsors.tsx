"use client";
import Image from "next/image";
import Link from "next/link";
import { Orbitron, Space_Grotesk } from "next/font/google";
import { TimelineContent } from "@/components/timeline-animation";
import type React from "react";
import { useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "700"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export default function Sponsors() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();

  const logos = [
    "/sponsors/sponsor1.jpeg",
    "/sponsors/sponsor2.png",
    "/sponsors/sponsor3.png",
    "/sponsors/sponsor4.png",
    "/sponsors/sponsor1.jpeg",
    "/sponsors/sponsor2.png",
  ];

  return (
    <section
      id="sponsors"
      ref={sectionRef}
      className="relative py-28 bg-gradient-to-b from-white to-neutral-50 border-t border-black/10"
    >
      <div className="max-w-6xl mx-auto px-6 text-center overflow-hidden">
        {/* Title */}
        <TimelineContent animationNum={0} timelineRef={sectionRef} once={false}>
          <h2
            className={`${orbitron.className} text-4xl md:text-5xl font-bold tracking-tight text-black uppercase`}
          >
            Spectrum Partners
          </h2>
        </TimelineContent>

        <TimelineContent animationNum={1} timelineRef={sectionRef} once={false}>
          <p className={`${spaceGrotesk.className} mt-3 text-black/60 text-sm md:text-base`}>
            We collaborate with brands who believe in creativity, technology, and impact.
          </p>
        </TimelineContent>

        {/* Divider (gold bar like ContactUs) */}
        <div className="mt-6">
          <div className="w-24 h-1 bg-gradient-to-r from-[#FFD700] to-black mx-auto mb-6" />
        </div>

        {/* Scrolling Sponsors - dual rows with edge fades and pause-on-hover */}
        <TimelineContent animationNum={2} timelineRef={sectionRef} once={false}>
          <div className="mt-16 space-y-8">
            {[0, 1].map((row) => (
              <div
                key={row}
                className="relative group overflow-hidden"
                style={{
                  WebkitMaskImage:
                    "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                  maskImage:
                    "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                }}
                aria-label={row === 0 ? "Primary sponsors" : "Additional sponsors"}
              >
                <div
                  className={`flex gap-10 ${
                    reduceMotion ? "" : row === 0 ? "animate-scroll-left" : "animate-scroll-right"
                  } group-hover:[animation-play-state:paused]`}
                >
                  {[...logos, ...logos].map((src, i) => (
                    <div
                      key={`${row}-${i}`}
                      className="flex-shrink-0 will-change-transform"
                    >
                      <div className="[transform-style:preserve-3d] [perspective:700px]">
                        <div className="rounded-2xl border border-black/5 bg-white shadow-sm px-5 py-4 transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:[transform:rotateX(2deg)_rotateY(-3deg)]">
                          <Image
                            src={src}
                            alt={`Sponsor ${i + 1}`}
                            width={row === 0 ? 180 : 150}
                            height={96}
                            className={`${
                              row === 0 ? "h-14" : "h-12"
                            } w-auto object-contain`}
                            priority={i === 0 && row === 0}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TimelineContent>

        {/* Become a Sponsor button removed as requested */}
      </div>

       {/* Animation Keyframes and reduced-motion support */}
       <style jsx>{`
         @keyframes scroll-left {
           0% { transform: translateX(0); }
           100% { transform: translateX(-50%); }
         }
         @keyframes scroll-right {
           0% { transform: translateX(-50%); }
           100% { transform: translateX(0); }
         }
         .animate-scroll-left {
           display: flex;
           width: max-content;
           animation: scroll-left 28s linear infinite;
         }
         .animate-scroll-right {
           display: flex;
           width: max-content;
           animation: scroll-right 30s linear infinite;
         }
         @media (prefers-reduced-motion: reduce) {
           .animate-scroll-left,
           .animate-scroll-right { animation: none; }
         }
       `}</style>
    </section>
  );
}
