"use client";

import { Orbitron, Space_Grotesk } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import {
  FaUsers,
  FaClock,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaTrophy,
  FaCheckCircle,
  FaClipboardList,
  FaBalanceScale,
  FaArrowRight
} from "react-icons/fa";
import { TimelineContent } from "@/components/timeline-animation";
import { useRef, use } from "react";
import { notFound } from "next/navigation";
import { HACKATHON_CONFIG } from "@/config/hackathon";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "700"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

interface PageProps {
  params: Promise<{ event: string }>;
}

export default function HackathonEventPage({ params }: PageProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { event } = use(params);
  const track = HACKATHON_CONFIG[event];
  
  if (!track) return notFound();

  return (
    <>
      <main 
        ref={sectionRef} 
        className="relative min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 text-black overflow-hidden pb-20"
      >
        {/* Cyber Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

        {/* Logo */}
        <div className="absolute top-6 left-6 z-50">
          <Link href="/">
            <Image
              src="/sponsors/Logo Spectrum.png"
              alt="Spectrum Logo"
              width={48}
              height={48}
              className="h-12 w-auto filter drop-shadow-[0_0_10px_rgba(0,0,0,0.1)] hover:scale-105 transition-transform duration-300"
            />
          </Link>
        </div>

        <div className="container mx-auto px-6 py-24 relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <TimelineContent animationNum={1} timelineRef={sectionRef} once={false} as="div">
              <Link
                href="/modules/hackathon"
                className={`${spaceGrotesk.className} inline-flex items-center text-sm text-gray-600 hover:text-black transition-colors mb-8 border-2 border-black px-4 py-1.5 rounded-full bg-white shadow-md`}
              >
                ← Back to Hackathon Arenas
              </Link>
            </TimelineContent>

            <TimelineContent animationNum={2} timelineRef={sectionRef} once={false} as="h1">
              <span className="text-xs font-bold text-[#B8860B] uppercase tracking-widest block mb-3">// Operational Track Matrix</span>
              <h1 className={`${orbitron.className} text-4xl sm:text-5xl md:text-6xl font-bold text-black text-center leading-tight`}>
                {track.title}
              </h1>
            </TimelineContent>

            <TimelineContent animationNum={3} timelineRef={sectionRef} once={false} as="div">
              <div className="w-24 h-[2px] bg-[#FFD700] mx-auto mt-6 mb-2"></div>
              <p className={`${spaceGrotesk.className} text-sm text-[#B8860B] tracking-widest uppercase font-semibold`}>
                {track.tagline}
              </p>
            </TimelineContent>
          </div>

          {/* Main Content Layout */}
          <div className="grid lg:grid-cols-12 gap-10 max-w-7xl mx-auto">
            
            {/* Left Column: Event Core Specs */}
            <div className="lg:col-span-7 space-y-10">
              
              {/* Event Description */}
              <TimelineContent animationNum={5} timelineRef={sectionRef} once={true} as="div">
                <div className="rounded-3xl border-2 border-black bg-white p-8 shadow-md">
                  <h2 className={`${orbitron.className} text-xl font-bold text-black mb-4 flex items-center gap-2.5`}>
                    <FaClipboardList className="text-[#C5A100] text-lg" /> Track Overview
                  </h2>
                  <div className="w-12 h-[2px] bg-[#FFD700] mb-6"></div>
                  <p className={`${spaceGrotesk.className} text-sm text-gray-700 leading-relaxed`}>
                    {track.description}
                  </p>
                </div>
              </TimelineContent>

              {/* Rules & Regulations */}
              <TimelineContent animationNum={6} timelineRef={sectionRef} once={true} as="div">
                <div className="rounded-3xl border-2 border-black bg-white p-8 shadow-md">
                  <h2 className={`${orbitron.className} text-xl font-bold text-black mb-4 flex items-center gap-2.5`}>
                    <FaCheckCircle className="text-[#C5A100] text-lg" /> Rules & Protocol bounds
                  </h2>
                  <div className="w-12 h-[2px] bg-[#FFD700] mb-6"></div>
                  <ul className="space-y-4 text-xs sm:text-sm text-gray-600">
                    {track.rules.map((rule, idx) => (
                      <li key={idx} className="flex gap-3 leading-relaxed">
                        <span className="text-[#B8860B] font-bold">0{idx + 1}.</span>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TimelineContent>

              {/* Judging Criteria */}
              <TimelineContent animationNum={7} timelineRef={sectionRef} once={true} as="div">
                <div className="rounded-3xl border-2 border-black bg-white p-8 shadow-md">
                  <h2 className={`${orbitron.className} text-xl font-bold text-black mb-4 flex items-center gap-2.5`}>
                    <FaBalanceScale className="text-[#C5A100] text-lg" /> Scoring & Evaluation Weights
                  </h2>
                  <div className="w-12 h-[2px] bg-[#FFD700] mb-6"></div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {track.judgingCriteria.map((crit, idx) => (
                      <div key={idx} className="p-4 rounded-2xl border-2 border-black bg-gray-50 flex flex-col justify-between">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-bold text-black uppercase tracking-wider">{crit.metric}</span>
                          <span className={`${orbitron.className} text-sm font-extrabold text-[#B8860B]`}>{crit.weight}</span>
                        </div>
                        <p className={`${spaceGrotesk.className} text-xs text-gray-500 leading-relaxed`}>
                          {crit.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </TimelineContent>

              {/* Timeline */}
              <TimelineContent animationNum={8} timelineRef={sectionRef} once={true} as="div">
                <div className="rounded-3xl border-2 border-black bg-white p-8 shadow-md">
                  <h2 className={`${orbitron.className} text-xl font-bold text-black mb-4 flex items-center gap-2.5`}>
                    <FaClock className="text-[#C5A100] text-lg" /> Track Timeline Schedule
                  </h2>
                  <div className="w-12 h-[2px] bg-[#FFD700] mb-6"></div>
                  <div className="border-l-2 border-black pl-6 space-y-6">
                    {track.timeline.map((item, idx) => (
                      <div key={idx} className="relative">
                        <div className="absolute -left-[32px] top-1.5 w-3 h-3 rounded-full bg-[#FFD700] border border-black shadow-sm"></div>
                        <span className="text-[10px] font-bold text-[#B8860B] uppercase tracking-widest block mb-1">
                          {item.time}
                        </span>
                        <h4 className={`${orbitron.className} text-sm font-bold text-black`}>
                          {item.event}
                        </h4>
                      </div>
                    ))}
                  </div>
                </div>
              </TimelineContent>

            </div>

            {/* Right Column: Checkout Card */}
            <div className="lg:col-span-5">
              <TimelineContent animationNum={9} timelineRef={sectionRef} once={false} as="div" className="lg:sticky lg:top-24">
                <div className="rounded-3xl p-8 border-2 border-black bg-white shadow-xl overflow-hidden relative text-black">
                  {/* Accent Highlight */}
                  <div 
                    className="absolute -top-12 -right-12 w-24 h-24 rounded-full blur-2xl opacity-10"
                    style={{ backgroundColor: track.accentColor }}
                  ></div>

                  <h3 className={`${orbitron.className} text-xl font-bold text-black mb-6 border-b-2 border-gray-100 pb-4 uppercase tracking-widest`}>
                    Track Ledger
                  </h3>

                  <div className="space-y-5 mb-8">
                    <div className="flex justify-between items-center py-2.5 border-b border-gray-100">
                      <span className="text-xs text-gray-500 uppercase tracking-widest flex items-center gap-2 font-bold">
                        <FaTrophy className="text-[#C5A100]" /> Prize Pool
                      </span>
                      <span className={`${orbitron.className} text-xl font-bold text-[#B8860B]`}>
                        {track.prizePool}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-2.5 border-b border-gray-100">
                      <span className="text-xs text-gray-500 uppercase tracking-widest flex items-center gap-2 font-bold">
                        <FaClock className="text-blue-500" /> Duration
                      </span>
                      <span className={`${spaceGrotesk.className} text-sm font-semibold text-black`}>
                        {track.duration}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-2.5 border-b border-gray-100">
                      <span className="text-xs text-gray-500 uppercase tracking-widest flex items-center gap-2 font-bold">
                        <FaUsers className="text-purple-500" /> Team Size
                      </span>
                      <span className={`${spaceGrotesk.className} text-sm font-semibold text-black`}>
                        {track.teamSize}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-2.5 border-b border-gray-100">
                      <span className="text-xs text-gray-500 uppercase tracking-widest flex items-center gap-2 font-bold">
                        <FaCalendarAlt className="text-green-500" /> Event Date
                      </span>
                      <span className={`${spaceGrotesk.className} text-sm font-semibold text-black`}>
                        {track.date}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-2.5 border-b border-gray-100">
                      <span className="text-xs text-gray-500 uppercase tracking-widest flex items-center gap-2 font-bold">
                        <FaMapMarkerAlt className="text-red-500" /> Venue
                      </span>
                      <span className={`${spaceGrotesk.className} text-sm font-semibold text-black`}>
                        {track.location}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-2.5">
                      <span className="text-xs text-gray-500 uppercase tracking-widest font-bold">Entry Fee</span>
                      <span className={`${orbitron.className} text-lg font-bold text-black`}>
                        {track.entryFee}
                      </span>
                    </div>
                  </div>

                  {/* COMMENCE REGISTRATION CTA */}
                  <div className="mt-8">
                    <Link
                      href={`/register?category=Hackathon&track=${track.id}`}
                      className={`${orbitron.className} w-full block text-center py-4 bg-gradient-to-r from-black to-gray-800 text-[#FFD700] hover:bg-gradient-to-r hover:from-[#FFD700] hover:to-[#B8860B] hover:text-black border-2 border-black font-extrabold rounded-xl text-xs uppercase tracking-widest transition-all duration-300 shadow-md`}
                    >
                      Commence Registration
                    </Link>
                  </div>

                  <p className={`${spaceGrotesk.className} text-[10px] text-gray-500 text-center mt-4 font-bold`}>
                    Registration closes 24 hours prior to technical verification check-in.
                  </p>

                </div>
              </TimelineContent>
            </div>

          </div>
        </div>
      </main>
    </>
  );
}
