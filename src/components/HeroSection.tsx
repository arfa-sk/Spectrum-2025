"use client";

import { useEffect, useState } from "react";
import { Orbitron, Rajdhani, Antonio, Space_Grotesk } from "next/font/google";
import Orb from "./Orb";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "700"] });
const rajdhani = Rajdhani({ subsets: ["latin"], weight: ["400", "600"] });
const antonio = Antonio({ subsets: ["latin"], weight: ["400", "700"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export default function HeroSection() {
  const eventDate = new Date("2025-12-20T09:00:00");
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = eventDate.getTime() - now;

      // Stop timer if event has passed
      if (distance < 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
        return;
      }

      setCountdown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / (1000 * 60)) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [eventDate]);


  return (
    <section 
      className="relative flex flex-col items-center text-center px-6 overflow-hidden bg-white"
      role="banner"
      aria-label="Spectrum 2025 Hero Section"
    >

      {/* HERO CONTENT */}
      <div className="relative z-20 min-h-[110vh] flex flex-col items-center justify-start pt-20 md:pt-28">
        <p className={`${spaceGrotesk.className} text-xl md:text-2xl text-neutral-800 tracking-[0.22em] mb-4 uppercase`}>DHA Innovista Presents</p>
        <h1 
          className={`${orbitron.className} text-6xl md:text-8xl font-extrabold mb-10 animate-shimmer`}
          aria-label="Spectrum 2025 - The Ultimate Tech Fest"
        >
          SPECTRUM 2025
        </h1>

        {/* NEXT-LEVEL TECH COUNTDOWN */}
<div className="flex flex-col items-center justify-center text-black font-[Space_Grotesk] select-none">
  <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-black/50 mb-3">
    Launching In
  </p>

  <div className="flex items-end justify-center gap-4 md:gap-6">
    {[
      { label: "Days", value: countdown.days },
      { label: "Hours", value: countdown.hours },
      { label: "Minutes", value: countdown.minutes },
      { label: "Seconds", value: countdown.seconds },
    ].map((unit, i) => (
      <div key={i} className="relative flex flex-col items-center">
        {/* Main number */}
        <span className="text-4xl md:text-6xl font-semibold leading-none text-gradient animate-fadeUp">
          {unit.value.toString().padStart(2, "0")}
        </span>

        {/* Label */}
        <span className="mt-1 text-[0.6rem] md:text-xs uppercase tracking-[0.25em] text-black/50">
          {unit.label}
        </span>

        {/* Divider ":" */}
        {i < 3 && (
          <span className="absolute -right-3 md:-right-5 top-1/2 -translate-y-1/2 text-3xl md:text-5xl font-light text-black/30">
            :
          </span>
        )}
      </div>
    ))}
  </div>
</div>


      {/* CTA BUTTON */}
      <a
        href="/register"
        className={`${orbitron.className} mt-12 px-12 py-5 bg-black text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition`}
      >
        Register
      </a>
      </div>

      {/* MULTILAYER ORB COMPONENTS */}
      <div className="absolute top-[68%] md:top-[66%] flex flex-col items-center justify-center w-full z-10 pointer-events-none">
        <div className="orb-container" style={{ 
          width: '100%', 
          height: '800px', 
          position: 'relative'
        }}>
          {/* Background Orb - Gold theme */}
          <div style={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)',
            width: '120%', 
            height: '120%',
            opacity: 0.8
          }}>
            <Orb
              colorTheme="gold"
              hoverIntensity={0.4}
              rotateOnHover={true}
              forceHoverState={false}
            />
          </div>
          
          {/* Middle Orb - Silver theme */}
          <div style={{ 
            position: 'absolute', 
            top: '49.5%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)',
            width: '105%', 
            height: '105%',
            opacity: 1.0
          }}>
            <Orb
              colorTheme="metallic"
              hoverIntensity={0.65}
              rotateOnHover={true}
              forceHoverState={false}
            />
      </div>

          {/* Foreground Orb - Shiny Gold theme */}
          <div style={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)',
            width: '90%', 
            height: '90%',
            opacity: 1.0
          }}>
            <Orb
              colorTheme="gold"
              hoverIntensity={1.0}
              rotateOnHover={true}
              forceHoverState={false}
            />
            </div>

          {/* Inner Orb - Bronze accent */}
          <div style={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)',
            width: '75%', 
            height: '75%',
            opacity: 0.9
          }}>
            <Orb
              colorTheme="bronze"
              hoverIntensity={0.5}
              rotateOnHover={true}
              forceHoverState={false}
            />
          </div>
        </div>
      </div>



    </section>
  );
}

