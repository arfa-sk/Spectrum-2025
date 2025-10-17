"use client";

import { Orbitron, Rajdhani } from "next/font/google";
import AboutUs from "@/components/AboutUs";
import ContactUs from "@/components/ContactUs";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Link from "next/link";

// Import Google fonts
const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "700"] });
const rajdhani = Rajdhani({ subsets: ["latin"], weight: ["400", "600"] });

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white text-black overflow-hidden">
      <Navbar />
      <HeroSection />

      {/* === SPONSORS HIGHLIGHT === */}
      <section
        id="sponsors"
        className="py-24 relative z-10 bg-[#0a0a0a] backdrop-blur-md overflow-hidden"
      >
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <h2
            className={`${orbitron.className} text-4xl md:text-5xl font-bold mb-16 text-white animate-shimmer`}
          >
            Our Sponsors
          </h2>

          {/* Sponsor Marquee Preview (just 4–5 logos) */}
          <div className="space-y-12">
            <div className="relative w-full overflow-hidden">
              <div className="flex gap-16 animate-marquee-seamless">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="hover:scale-110 hover:rotate-1 transition duration-300"
                  >
                    <img
                      src="/sponsors/sss.png"
                      alt="sponsor"
                      className="h-20 md:h-24 lg:h-28 object-contain rounded-xl shadow-[0_0_20px_gold]"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* See All Sponsors Button */}
          <div className="mt-12">
            <Link
              href="/sponsors"
              className="px-8 py-3 bg-gradient-to-r from-[#FFD700] to-black text-white text-lg font-bold rounded-full shadow-[0_0_25px_gold] hover:scale-110 transition"
            >
              See All Sponsors →
            </Link>
          </div>
        </div>
      </section>

      {/* Register CTAs removed */}

      <AboutUs />
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
