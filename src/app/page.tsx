"use client";

import { Orbitron, Rajdhani } from "next/font/google";
import AboutUs from "@/components/AboutUs";
import ContactUs from "@/components/ContactUs";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Link from "next/link";
import Image from "next/image";
import Sponsors from "@/components/Sponsors";

// Import Google fonts
const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "700"] });
const rajdhani = Rajdhani({ subsets: ["latin"], weight: ["400", "600"] });

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white text-black overflow-hidden">
      <Navbar />
      <HeroSection />

      {/* === SPONSORS HIGHLIGHT === */}
      

      {/* Register CTAs removed */}

      <AboutUs />
      <Sponsors />
      <ContactUs />

      {/* === FOOTER === */}
      <footer className="py-6 bg-black text-center border-t border-[#FFD700]/30">
        <p
          className={`${orbitron.className} text-sm md:text-base animate-shimmer text-white`}
        >
          © 2025 Spectrum — DHA Suffa University
        </p>
        <p className="text-xs text-neutral-400 mt-1">
          Empowering Tech Innovators | Coding • Robotics • AI • Creativity
        </p>
      </footer>

      {/* === CUSTOM ANIMATIONS === */}
      <style jsx>{`
        @keyframes marquee-seamless {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee-seamless {
          display: inline-flex;
          width: max-content;
          animation: marquee-seamless 25s linear infinite;
        }
        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        .animate-bounce {
          animation: bounce 1s infinite;
        }
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        .animate-shimmer {
          background: linear-gradient(90deg, #fff, #ffd700, #fff);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s linear infinite;
        }
      `}</style>
    </main>
  );
}
