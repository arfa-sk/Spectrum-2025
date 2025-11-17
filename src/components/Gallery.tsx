"use client";

import React, { useMemo, memo } from "react";
import { Orbitron } from "next/font/google";
import { ParallaxScrollSecond } from "@/components/parallax-scroll";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "700"] });

interface GalleryProps {
  title?: string;
}

export default memo(function Gallery({
  title = "Gallery",
}: GalleryProps) {
  // Memoize images array to prevent unnecessary re-renders
  const images = useMemo(() => [
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
  ], []);

  return (
    <section 
      className="relative py-20 bg-white text-black overflow-hidden"
      style={{
        contain: "layout style paint",
        transform: "translateZ(0)"
      }}
    >
      {/* Header */}
      <div className="container mx-auto px-6 text-center mb-12">
          <h2 className={`${orbitron.className} text-5xl md:text-6xl font-bold text-black mb-6`}>
            {title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#FFD700] to-black mx-auto mb-8"></div>
      </div>

      {/* Parallax Scroll Gallery */}
      <div className="w-full">
        <ParallaxScrollSecond images={images} />
      </div>
    </section>
  );
});
