"use client";

import React, { useRef } from "react";
import { Orbitron } from "next/font/google";
import { TimelineContent } from "@/components/timeline-animation";
import { ParallaxScrollSecond } from "@/components/parallax-scroll";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "700"] });

interface GalleryProps {
  title?: string;
}

export default function Gallery({
  title = "Gallery",
}: GalleryProps) {
  const sectionRef = useRef<HTMLElement>(null);

  // Gallery images from public/gallery directory
  const images = [
    "/gallery/pic1.webp",
    "/gallery/pic2.webp", 
    "/gallery/pic3.webp",
    "/gallery/pic4.webp",
    "/gallery/pic5.webp",
    "/gallery/pic6.webp",
    "/gallery/pic7.webp",
    "/gallery/pic8.webp",
    "/gallery/pic9.webp",
    "/gallery/pic10.webp",
    "/gallery/pic11.webp",
    "/gallery/pic12.webp",
    "/gallery/pic13.webp",
    "/gallery/pic14.webp",
  ];

  return (
    <section ref={sectionRef} className="relative py-20 bg-white text-black overflow-hidden">
      {/* Header */}
      <div className="container mx-auto px-6 text-center mb-12">
        <TimelineContent animationNum={1} timelineRef={sectionRef} once={false} as="div">
          <h2 className={`${orbitron.className} text-5xl md:text-6xl font-bold text-black mb-6`}>
            {title}
          </h2>
        </TimelineContent>

        <TimelineContent animationNum={2} timelineRef={sectionRef} once={false} as="div">
          <div className="w-24 h-1 bg-gradient-to-r from-[#FFD700] to-black mx-auto mb-8"></div>
        </TimelineContent>
      </div>

      {/* Parallax Scroll Gallery */}
      <div className="w-full">
        <ParallaxScrollSecond images={images} />
      </div>
    </section>
  );
}
