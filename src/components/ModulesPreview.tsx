"use client";

import Link from "next/link";
import { Orbitron, Space_Grotesk } from "next/font/google";
import { FaGamepad, FaCode, FaMicrophone, FaArrowRight } from "react-icons/fa";
import { TimelineContent } from "@/components/timeline-animation";
import { useRef } from "react";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "700"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export default function ModulesPreview() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 bg-white"
      aria-labelledby="modules-preview-heading"
    >
      <div className="container mx-auto px-6">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-6 text-center">
          <TimelineContent animationNum={0} timelineRef={sectionRef} once={false} as="p">
            <p className={`${spaceGrotesk.className} text-xs uppercase tracking-[0.35em] text-gray-400`}>
              Three worlds • classified
            </p>
          </TimelineContent>

          <TimelineContent animationNum={1} timelineRef={sectionRef} once={false} as="h3">
            <h3
              id="modules-preview-heading"
              className={`${orbitron.className} text-3xl font-semibold text-black`}
            >
              Modules? Let the Games Begin.
            </h3>
          </TimelineContent>

          <TimelineContent animationNum={2} timelineRef={sectionRef} once={false} as="div">
            <div className="h-1 w-14 rounded-full bg-gradient-to-r from-black via-[#FFD700] to-black opacity-70" />
          </TimelineContent>

          <TimelineContent animationNum={3} timelineRef={sectionRef} once={false} as="p">
            <p className={`${spaceGrotesk.className} text-sm leading-relaxed text-gray-500`}>
              Three arenas, infinite possibilities. Choose your path, and let chaos reign.
            </p>
          </TimelineContent>

          <TimelineContent animationNum={4} timelineRef={sectionRef} once={false} as="div">
            <Link
              href="/modules"
              className={`${orbitron.className} inline-flex items-center gap-3 rounded-full border border-black bg-black px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition-all duration-300 hover:scale-105 hover:bg-gradient-to-r hover:from-[#FFD700] hover:via-[#C5A100] hover:to-[#B8860B] hover:text-black`}
            >
              Access Modules
              <FaArrowRight className="text-sm" />
            </Link>
          </TimelineContent>
        </div>
      </div>
    </section>
  );
}
