"use client";

import { useEffect, useRef, useState } from "react";
import { Orbitron, Rajdhani, Antonio, Space_Grotesk } from "next/font/google";
import Orb from "./Orb";
import Link from "next/link";
import dynamic from "next/dynamic";
import { TimelineContent } from "@/components/timeline-animation";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type React from "react";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "700"] });
const rajdhani = Rajdhani({ subsets: ["latin"], weight: ["400", "600"] });
const antonio = Antonio({ subsets: ["latin"], weight: ["400", "700"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

const RobotCanvasLazy = dynamic(
  () => import("./RobotCanvas").then((m) => m.RobotCanvas),
  { ssr: false }
);

export default function HeroSection() {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const timelineRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    // 📅 EDIT COUNTDOWN DATE HERE: Change the date string below (format: "YYYY-MM-DDTHH:MM:SS")
    // Example: "2026-01-10T09:00:00" = January 10, 2026 at 9:00 AM
    const eventDate = new Date("2026-01-10T09:00:00");
    
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
  }, []);


  return (
    <section 
      ref={sectionRef}
      className="relative flex flex-col items-center text-center px-6 overflow-hidden bg-white"
      role="banner"
      aria-label="Spectrum 2025 Hero Section"
    >

      {/* HERO CONTENT */}
      <div className="relative z-20 min-h-[110vh] flex flex-col items-center justify-start pt-20 md:pt-28">
        <TimelineContent animationNum={0} timelineRef={sectionRef} once={false} as="div">
        <p className={`${spaceGrotesk.className} text-xl md:text-2xl text-neutral-800 tracking-[0.22em] mb-4 uppercase`}>DHA Innovista Presents</p>
        </TimelineContent>
        <TimelineContent animationNum={1} timelineRef={sectionRef} once={false} as="div">
        <h1 
          className={`${orbitron.className} text-6xl md:text-8xl font-bold mb-10 text-black`}
          aria-label="Spectrum 2025 - The Ultimate Tech Fest"
        >
          SPECTRUM 2025
        </h1>
        </TimelineContent>

        {/* NEXT-LEVEL TECH COUNTDOWN */}
<div ref={timelineRef} className="flex flex-col items-center justify-center text-black font-[Space_Grotesk] select-none">
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
      <TimelineContent key={i} animationNum={i} timelineRef={sectionRef} as="div" once={false} className="relative flex flex-col items-center">
        {/* Main number */}
        <span className="text-4xl md:text-6xl font-semibold leading-none text-black animate-fadeUp">
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
            </TimelineContent>
          ))}
        </div>
</div>


        {/* CTA BUTTON */}
      <div className="relative z-50 pointer-events-auto">
        <TimelineContent animationNum={5} timelineRef={sectionRef} once={false} as="div">
          <Link
          href="/register"
            className={`${orbitron.className} inline-block mt-12 px-12 py-5 bg-black text-white font-bold rounded-full shadow-lg transition transform hover:shadow-xl hover:scale-110`}
      >
        Register
          </Link>
        </TimelineContent>
      </div>
      </div>

      {/* 3D Robot - constrained to left side so it never covers CTA */}
      <div className="hidden md:block absolute left-0 top-[58%] -translate-y-1/2 z-10 h-[380px] w-[46vw] pointer-events-none">
        <div className="w-full h-full">
          {!reduceMotion && <RobotCanvasLazy amplitudeMultiplier={0.78} speed={0.22} scale={0.26} />}
        </div>
      </div>

      {/* MULTILAYER ORB COMPONENTS */}
      <div className="absolute top-[68%] md:top-[66%] flex flex-col items-center justify-center w-full z-10 pointer-events-none">
        {!reduceMotion && (
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
        )}
      </div>



    </section>
  );
}

