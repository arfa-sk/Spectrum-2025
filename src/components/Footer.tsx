"use client";

import { Orbitron } from "next/font/google";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "700"] });

export default function Footer() {
  return (
    <>
      {/* Footer */}
      <footer className="py-4 bg-black text-center border-t border-[#FFD700]/30">
        <p
          className={`${orbitron.className} text-sm md:text-base animate-shimmer text-white`}
        >
          © 2026 Spectrum — DHA Suffa University
        </p>
        <p className="text-xs text-neutral-400 mt-1">
          Empowering Tech Innovators | Coding • Robotics • AI • Creativity
        </p>
        <div className="mt-2">
          <a href="#" className="text-white text-xs hover:text-[#FFD700] transition mr-4">
            Privacy Policy
          </a>
          <a href="#" className="text-white text-xs hover:text-[#FFD700] transition">
            Terms & Conditions
          </a>
        </div>
      </footer>

      {/* Custom Animations */}
      <style jsx>{`
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
    </>
  );
}
