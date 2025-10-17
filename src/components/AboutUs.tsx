"use client";

import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Suspense } from "react";
import { Orbitron } from "next/font/google";

// Import Hero font
const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "700"] });

export default function AboutUs() {
  return (
    <section
      id="about"
      className="relative z-10 py-28 bg-[#0f0f0f] text-white overflow-hidden"
      style={{ minHeight: "700px" }}
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

      {/* Golden Nebula Glow Behind Title */}
      <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(255,215,0,0.35)_0%,transparent_70%)] blur-[100px] animate-pulse" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 flex flex-col items-center justify-center text-center animate-float">
        <h2
          className={`${orbitron.className} text-6xl font-extrabold animate-shimmer drop-shadow-[0_0_30px_rgba(255,215,0,0.8)]`}
        >
          About Us
        </h2>

        <p className="mt-6 text-lg leading-relaxed text-neutral-200 drop-shadow-[0_0_20px_rgba(0,0,0,0.9)] font-['Helvetica']">
          Spectrum’25 is Karachi’s ultimate tech festival! Our mission is to ignite creativity,
          enhance core skills, and build a competitive environment where students innovate,
          collaborate, and connect with industry experts.
        </p>

        <p className="mt-4 text-lg leading-relaxed text-neutral-200 drop-shadow-[0_0_20px_rgba(0,0,0,0.9)] font-['Helvetica']">
          Join us for hands-on experiences, workshops, and challenges that bridge academic
          learning with real-world applications.
        </p>

        {/* Socials */}
        <div className="flex items-center justify-center gap-6 mt-8 text-2xl">
          {[
            { Icon: FaFacebookF, link: "https://www.facebook.com/DSUSpectrum" },
            { Icon: FaInstagram, link: "https://www.instagram.com/acmatdsu/" },
            { Icon: FaYoutube, link: "https://www.youtube.com/channel/UCfCeJTUDDbEshMkEE3acx1A" },
            { Icon: FaTwitter, link: "https://twitter.com/acmatdsu" },
          ].map(({ Icon, link }, i) => (
            <a
              key={i}
              href={link}
              target="_blank"
              className="relative group p-3 rounded-full border-2 border-[#FFD700] hover:bg-[#FFD700] hover:text-black transition duration-300 shadow-[0_0_20px_rgba(255,215,0,0.6)]"
            >
              <Icon />
            </a>
          ))}
        </div>
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
