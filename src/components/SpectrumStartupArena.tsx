"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Orbitron } from "next/font/google";
import { TimelineContent } from "@/components/timeline-animation";
import { FaArrowRight } from "react-icons/fa";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "700", "900"] });

export default function SpectrumStartupArena() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="startup-arena"
      className="relative overflow-hidden bg-white py-24"
      aria-labelledby="startup-arena-heading"
    >
      {/* Background image */}
      <div className="absolute inset-x-0 top-0 h-[420px] md:h-[520px] overflow-hidden">
        <Image
          src="/gallery/ceid.jpg"
          alt="Spectrum Startup Arena"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/40 to-white/5"></div>
      </div>

      <div className="relative container mx-auto px-6">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
          <TimelineContent animationNum={0} timelineRef={sectionRef} once={false} as="p">
            <p className={`${orbitron.className} text-xs uppercase tracking-[0.35em] text-black/50`}>
              Startup Pitch Competition
            </p>
          </TimelineContent>

          <TimelineContent animationNum={1} timelineRef={sectionRef} once={false} as="h2" id="startup-arena-heading">
            <h2 className={`${orbitron.className} text-4xl md:text-5xl font-bold text-black`}>
              Spectrum Startup Arena
            </h2>
          </TimelineContent>

          <TimelineContent animationNum={2} timelineRef={sectionRef} once={false} as="div" aria-hidden="true">
            <div className="h-1 w-20 rounded-full bg-gradient-to-r from-black via-[#FFD700] to-black opacity-80" />
          </TimelineContent>
          <TimelineContent animationNum={3} timelineRef={sectionRef} once={false} as="p">
            <p className={`${orbitron.className} text-base md:text-lg text-black/80 font-semibold tracking-[0.4em]`}>
              Pitch • Impress • Win
            </p>
          </TimelineContent>

          <TimelineContent animationNum={4} timelineRef={sectionRef} once={false} as="div">
            <p className={`${orbitron.className} text-sm md:text-base text-black/70 leading-relaxed max-w-2xl`}>
              Present your startup idea live on stage, get expert feedback from industry judges,
              and compete for prizes, recognition, and exposure.
            </p>
          </TimelineContent>

          {/* CTA Button - Pure Black */}
          <TimelineContent animationNum={5} timelineRef={sectionRef} once={false} as="div" className="mt-4">
            <Link
              href="/register"
              className={`${orbitron.className} group relative inline-flex items-center gap-3 rounded-full border-2 border-black bg-black px-8 py-4 text-xs font-bold uppercase tracking-[0.4em] text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-black/30 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black/50 focus-visible:scale-105`}
            >
              <span className="relative z-10">APPLY TO PITCH</span>
              <FaArrowRight className="text-sm relative z-10 transition-transform group-hover:translate-x-1" />
              <div className="absolute inset-0 rounded-full bg-black opacity-0 group-hover:opacity-100 transition-opacity blur-md"></div>
            </Link>          </TimelineContent>
        </div>
      </div>
    </section>
  );
}

