"use client";

import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Suspense, useRef } from "react";
import { Orbitron, Space_Grotesk } from "next/font/google";
import { TimelineContent } from "@/components/timeline-animation";
import type React from "react";

// Import Hero font
const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "700"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export default function AboutUs() {
  const sectionRef = useRef<HTMLElement | null>(null);
  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative z-10 py-28 bg-[#0f0f0f] text-white overflow-hidden min-h-[70vh]"
    >
      {/* 3D Canvas Background */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
          <Suspense fallback={null}>
            <Stars radius={100} depth={50} count={5000} factor={4} fade speed={2} />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
          </Suspense>
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 flex flex-col items-center justify-center text-center animate-float">
        <TimelineContent animationNum={0} timelineRef={sectionRef} once={false}>
        <h2
            className={`${orbitron.className} text-6xl font-extrabold text-white`}
        >
          About Us
        </h2>
        </TimelineContent>

        {/* Gold to black divider matching Contact/Sponsors */}
        <TimelineContent animationNum={1} timelineRef={sectionRef} once={false}>
          <div className="w-24 h-1 bg-gradient-to-r from-[#FFD700] to-black mx-auto mt-4" />
        </TimelineContent>

        <TimelineContent animationNum={2} timelineRef={sectionRef} once={false}>
          <p className={`${spaceGrotesk.className} mt-6 text-lg leading-relaxed text-neutral-200 max-w-3xl mx-auto`}>
          Spectrum&apos;25 is Karachi&apos;s ultimate tech festival! Our mission is to ignite creativity,
          enhance core skills, and build a competitive environment where students innovate,
          collaborate, and connect with industry experts.
        </p>
        </TimelineContent>

        <TimelineContent animationNum={3} timelineRef={sectionRef} once={false}>
          <p className={`${spaceGrotesk.className} mt-4 text-lg leading-relaxed text-neutral-200 max-w-3xl mx-auto`}>
          Join us for hands-on experiences, workshops, and challenges that bridge academic
          learning with real-world applications.
        </p>
        </TimelineContent>

        {/* Socials */}
        <TimelineContent animationNum={4} timelineRef={sectionRef} once={false}>
        <div className="flex items-center justify-center gap-4 mt-8">
          {[
            { Icon: FaFacebookF, link: "https://www.facebook.com/DSUSpectrum", label: "Facebook" },
            { Icon: FaInstagram, link: "https://www.instagram.com/acmatdsu/", label: "Instagram" },
            { Icon: FaYoutube, link: "https://www.youtube.com/channel/UCfCeJTUDDbEshMkEE3acx1A", label: "YouTube" },
            { Icon: FaTwitter, link: "https://twitter.com/acmatdsu", label: "X (Twitter)" },
          ].map(({ Icon, link, label }, i) => (
            <a
              key={i}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group"
              aria-label={`Visit our ${label}`}
            >
              {/* Gold Shadow/Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700] via-[#C5A100] to-[#B8860B] rounded-full blur-sm opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
              {/* Main Icon Container */}
              <div className="relative w-10 h-10 bg-gradient-to-br from-[#FFD700] via-[#C5A100] to-[#B8860B] rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg border border-[#C5A100]">
                <Icon className="text-black text-sm group-hover:scale-110 transition-transform duration-500" />
              </div>
            </a>
          ))}
        </div>
        </TimelineContent>
      </div>

      {/* Effects */}
      <style jsx>{`
        .animate-shimmer {
          background: linear-gradient(90deg, #ffd700, #ff8c00, #ffffff, #ffd700);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s linear infinite;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
          100% {
            transform: translateY(0px);
          }
        }
      `}</style>
    </section>
  );
}
