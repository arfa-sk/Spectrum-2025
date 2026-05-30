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
  FaDownload,
} from "react-icons/fa";
import { TimelineContent } from "@/components/timeline-animation";
import { useRef, use } from "react";
import { notFound } from "next/navigation";
import { CREATIVE_GAMES, PENTA_ARCADE_META } from "@/config/creativeCompetition";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "700"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

interface PageProps {
  params: Promise<{ event: string }>;
}

export default function CreativeGamePage({ params }: PageProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { event } = use(params);
  const game = CREATIVE_GAMES[event];
  const meta = PENTA_ARCADE_META;

  if (!game) return notFound();

  return (
    <>
      <main
        ref={sectionRef}
        className="relative min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 text-black overflow-x-hidden pb-20"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        <div className="absolute top-6 left-6 z-50">
          <Link href="/">
            <Image
              src="/sponsors/Logo Spectrum.png"
              alt="Spectrum Logo"
              width={48}
              height={48}
              className="h-12 w-auto"
            />
          </Link>
        </div>

        <div className="container mx-auto px-6 py-24 relative z-10">
          <div className="text-center mb-16">
            <TimelineContent animationNum={1} timelineRef={sectionRef} once={false} as="div">
              <Link
                href="/modules/suffas-got-talent"
                className={`${spaceGrotesk.className} inline-flex items-center text-sm text-gray-600 hover:text-black transition-colors mb-8 border-2 border-black px-4 py-1.5 rounded-full bg-white shadow-md`}
              >
                ← Back to Penta Arcade
              </Link>
            </TimelineContent>

            <TimelineContent animationNum={2} timelineRef={sectionRef} once={false} as="h1">
              <span className="text-xs font-bold text-[#B8860B] uppercase tracking-widest block mb-3">
                {game.gameType === "surprise" ? "Day 3 Finale Game" : "Announced Game Pool"}
              </span>
              <h1 className={`${orbitron.className} text-3xl sm:text-4xl md:text-6xl font-bold text-black text-center leading-tight`}>
                {game.title}
              </h1>
            </TimelineContent>

            <TimelineContent animationNum={3} timelineRef={sectionRef} once={false} as="div">
              <div className="w-24 h-[2px] bg-[#FFD700] mx-auto mt-6 mb-2" />
              <p className={`${spaceGrotesk.className} text-sm text-[#B8860B] tracking-widest uppercase font-semibold`}>
                {game.tagline}
              </p>
            </TimelineContent>
          </div>

          <div className="grid lg:grid-cols-12 gap-10 max-w-7xl mx-auto">
            <div className="lg:col-span-7 space-y-10">
              <TimelineContent animationNum={5} timelineRef={sectionRef} once={true} as="div">
                <div className="rounded-3xl border-2 border-black bg-white p-6 sm:p-8 shadow-md">
                  <h2 className={`${orbitron.className} text-xl font-bold text-black mb-4 flex items-center gap-2.5`}>
                    <FaClipboardList className="text-[#C5A100] text-lg" /> Game Overview
                  </h2>
                  <div className="w-12 h-[2px] bg-[#FFD700] mb-6" />
                  <p className={`${spaceGrotesk.className} text-sm text-gray-700 leading-relaxed`}>
                    {game.description}
                  </p>
                </div>
              </TimelineContent>

              <TimelineContent animationNum={6} timelineRef={sectionRef} once={true} as="div">
                <div className="rounded-3xl border-2 border-black bg-white p-6 sm:p-8 shadow-md">
                  <h2 className={`${orbitron.className} text-xl font-bold text-black mb-4 flex items-center gap-2.5`}>
                    <FaCheckCircle className="text-[#C5A100] text-lg" /> Rules
                  </h2>
                  <div className="w-12 h-[2px] bg-[#FFD700] mb-6" />
                  <ul className="space-y-4 text-xs sm:text-sm text-gray-600">
                    {game.rules.map((rule, idx) => (
                      <li key={idx} className="flex gap-3 leading-relaxed">
                        <span className="text-[#B8860B] font-bold shrink-0">{String(idx + 1).padStart(2, "0")}.</span>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TimelineContent>

              {game.scoring && game.scoring.length > 0 && (
                <TimelineContent animationNum={7} timelineRef={sectionRef} once={true} as="div">
                  <div className="rounded-3xl border-2 border-black bg-white p-6 sm:p-8 shadow-md">
                    <h2 className={`${orbitron.className} text-xl font-bold text-black mb-4 flex items-center gap-2.5`}>
                      <FaBalanceScale className="text-[#C5A100] text-lg" /> Scoring
                    </h2>
                    <div className="w-12 h-[2px] bg-[#FFD700] mb-6" />
                    <div className="grid sm:grid-cols-2 gap-4">
                      {game.scoring.map((s) => (
                        <div key={s.action} className="p-4 rounded-2xl border-2 border-black bg-gray-50">
                          <span className="text-xs font-bold text-black uppercase tracking-wider block mb-1">{s.action}</span>
                          <span className={`${orbitron.className} text-sm font-extrabold text-[#B8860B]`}>{s.points}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TimelineContent>
              )}

              <TimelineContent animationNum={8} timelineRef={sectionRef} once={true} as="div">
                <div className="rounded-3xl border-2 border-black bg-white p-6 sm:p-8 shadow-md">
                  <h2 className={`${orbitron.className} text-xl font-bold text-black mb-4 flex items-center gap-2.5`}>
                    <FaClock className="text-[#C5A100] text-lg" /> Event Timeline
                  </h2>
                  <div className="w-12 h-[2px] bg-[#FFD700] mb-6" />
                  <div className="border-l-2 border-black pl-6 space-y-6">
                    {meta.timeline.map((item, idx) => (
                      <div key={idx} className="relative">
                        <div className="absolute -left-[32px] top-1.5 w-3 h-3 rounded-full bg-[#FFD700] border border-black shadow-sm" />
                        <span className="text-[10px] font-bold text-[#B8860B] uppercase tracking-widest block mb-1">
                          {item.time}
                        </span>
                        <p className={`${spaceGrotesk.className} text-sm text-gray-700 leading-relaxed`}>{item.event}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TimelineContent>
            </div>

            <div className="lg:col-span-5">
              <TimelineContent animationNum={9} timelineRef={sectionRef} once={false} as="div" className="lg:sticky lg:top-24">
                <div className="rounded-3xl p-6 sm:p-8 border-2 border-black bg-white shadow-xl relative text-black">
                  <h3 className={`${orbitron.className} text-xl font-bold text-black mb-6 border-b-2 border-gray-100 pb-4 uppercase tracking-widest`}>
                    Penta Arcade
                  </h3>

                  <div className="space-y-5 mb-8">
                    <div className="flex justify-between items-center py-2.5 border-b border-gray-100">
                      <span className="text-xs text-gray-500 uppercase tracking-widest flex items-center gap-2 font-bold">
                        <FaTrophy className="text-[#C5A100]" /> Prize Pool
                      </span>
                      <span className={`${orbitron.className} text-lg font-bold text-[#B8860B]`}>{meta.prizePool}</span>
                    </div>
                    <div className="flex justify-between items-center py-2.5 border-b border-gray-100">
                      <span className="text-xs text-gray-500 uppercase tracking-widest flex items-center gap-2 font-bold">
                        <FaClock className="text-blue-500" /> Duration
                      </span>
                      <span className={`${spaceGrotesk.className} text-sm font-semibold text-black`}>{meta.duration}</span>
                    </div>
                    <div className="flex justify-between items-center py-2.5 border-b border-gray-100">
                      <span className="text-xs text-gray-500 uppercase tracking-widest flex items-center gap-2 font-bold">
                        <FaUsers className="text-purple-500" /> Team Size
                      </span>
                      <span className={`${spaceGrotesk.className} text-sm font-semibold text-black`}>{meta.teamSize}</span>
                    </div>
                    <div className="flex justify-between items-center py-2.5 border-b border-gray-100">
                      <span className="text-xs text-gray-500 uppercase tracking-widest flex items-center gap-2 font-bold">
                        <FaCalendarAlt className="text-green-500" /> Event
                      </span>
                      <span className={`${spaceGrotesk.className} text-sm font-semibold text-black`}>{meta.date}</span>
                    </div>
                    <div className="flex justify-between items-center py-2.5 border-b border-gray-100">
                      <span className="text-xs text-gray-500 uppercase tracking-widest flex items-center gap-2 font-bold">
                        <FaMapMarkerAlt className="text-red-500" /> Venue
                      </span>
                      <span className={`${spaceGrotesk.className} text-sm font-semibold text-black text-right max-w-[55%]`}>{meta.location}</span>
                    </div>
                    <div className="flex justify-between items-center py-2.5">
                      <span className="text-xs text-gray-500 uppercase tracking-widest font-bold">Entry Fee</span>
                      <span className={`${orbitron.className} text-lg font-bold text-black`}>{meta.entryFee}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Link
                      href="/register?category=Play%20To%20Win&game=Penta%20Arcade"
                      className={`${orbitron.className} w-full block text-center py-4 bg-black text-[#FFD700] hover:bg-neutral-900 border-2 border-black font-extrabold rounded-xl text-xs uppercase tracking-widest transition-all duration-300 shadow-md`}
                    >
                      Register Team
                    </Link>
                    <Link
                      href={meta.handbookUrl}
                      download
                      className={`${orbitron.className} w-full flex items-center justify-center gap-2 py-3 border-2 border-black bg-white hover:bg-neutral-100 text-black font-bold rounded-xl text-xs uppercase tracking-widest`}
                    >
                      <FaDownload className="text-xs" /> Handbook
                    </Link>
                  </div>

                  <p className={`${spaceGrotesk.className} text-[10px] text-gray-500 text-center mt-4 font-bold`}>
                    One registration covers all 5 games across the 3-day event.
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
