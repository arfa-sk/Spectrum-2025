"use client";

import Link from "next/link";
import Image from "next/image";
import { Orbitron } from "next/font/google";
import { TimelineContent } from "@/components/timeline-animation";
import type React from "react";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "700"] });

export default function Sponsors() {
  return (
    <section id="sponsors" className="py-24 relative z-10 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        <TimelineContent animationNum={0} timelineRef={{ current: (typeof document !== 'undefined' ? (document.body as HTMLElement) : null) } as React.RefObject<HTMLElement | null>} once>
          <h2 className={`${orbitron.className} text-4xl md:text-5xl font-bold mb-16 text-black`}>
            Our Sponsors
          </h2>
        </TimelineContent>

        <div className="space-y-12">
          <div className="relative w-full overflow-hidden">
            <div className="flex gap-16 animate-marquee-seamless">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="hover:scale-110 hover:rotate-1 transition duration-300">
                  <Image
                    src="/sponsors/sss.png"
                    alt="sponsor"
                    width={160}
                    height={96}
                    className="h-20 md:h-24 lg:h-28 w-auto object-contain rounded-xl shadow-[0_0_20px_gold]"
                    priority={i === 0}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12">
          <TimelineContent animationNum={1} timelineRef={{ current: (typeof document !== 'undefined' ? (document.body as HTMLElement) : null) } as React.RefObject<HTMLElement | null>} once>
            <Link
              href="/sponsors"
              className="px-8 py-3 bg-gradient-to-r from-[#FFD700] to-black text-white text-lg font-bold rounded-full shadow-[0_0_25px_gold] hover:scale-110 transition"
            >
              See All Sponsors →
            </Link>
          </TimelineContent>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee-seamless {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-seamless {
          display: inline-flex;
          width: max-content;
          animation: marquee-seamless 25s linear infinite;
        }
      `}</style>
    </section>
  );
}


