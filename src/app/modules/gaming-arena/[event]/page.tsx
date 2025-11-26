"use client";

import { Orbitron, Space_Grotesk } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import {
  FaUsers,
  FaClock,
} from "react-icons/fa";
import { TimelineContent } from "@/components/timeline-animation";
import { useRef, use } from "react";
import { notFound } from "next/navigation";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "700"] });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

type EventKey = "counter-strike" | "game-development" | "tekken" | "fifa";

const EVENT_CONFIG: Record<
  EventKey,
  {
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    format: string;
    duration: string;
    prize: string;
    runnerUpPrize?: string;
    registrationFee: string;
    capacityLabel: string; // Teams/Squads/Players label
    max: number;
    current: number;
    bgA: string;
    bgB: string;
    accent: string; // text color for prize
  }
> = {
  "counter-strike": {
    title: "Counter Strike Tournament",
    description:
      "Step into the tactical world of Counter Strike, where precision, teamwork, and strategy decide your fate. Compete in intense 5v5 battles, showcase your aim, and prove your dominance across thrilling maps. Only the sharpest players will claim victory — do you have what it takes?",
    date: "March 15, 2025",
    time: "10:00 AM - 6:00 PM",
    location: "Gaming Lab, DSU Campus",
    format: "5v5 Team-based",
    duration: "Best of 3 Maps",
    prize: "Rs. 10,000",
    runnerUpPrize: "Rs. 5,000",
    registrationFee: "Rs. 600 per person",
    capacityLabel: "Teams Registered",
    max: 32,
    current: 18,
    bgA: "from-red-400",
    bgB: "to-orange-400",
    accent: "text-red-600",
  },
  "game-development": {
    title: "Game Development Sprint",
    description:
      "Assemble your dream crew, fire up your engine of choice, and build a playable experience from scratch. Creativity, polish, and a compelling pitch will determine who ships the most exciting mini game before the buzzer.",
    date: "March 16, 2025",
    time: "9:00 AM - 3:00 PM",
    location: "Innovation Lab, DSU Campus",
    format: "Team (2-4)",
    duration: "6 Hour Build + Demo",
    prize: "Rs. 10,000",
    runnerUpPrize: "Rs. 5,000",
    registrationFee: "Rs. 800 per team",
    capacityLabel: "Studios Registered",
    max: 15,
    current: 7,
    bgA: "from-amber-400",
    bgB: "to-lime-400",
    accent: "text-amber-700",
  },
  tekken: {
    title: "Tekken 7 Tournament",
    description:
      "Enter the arena where every punch counts. Unleash your combos, master your fighter, and dominate the competition in electrifying one-on-one battles. The king of iron fists awaits — are you ready?",
    date: "March 17, 2025",
    time: "12:00 PM - 8:00 PM",
    location: "Gaming Lab, DSU Campus",
    format: "1v1 Single Elimination",
    duration: "Double Elimination",
    prize: "Rs. 10,000",
    runnerUpPrize: "Rs. 5,000",
    registrationFee: "Rs. 600 per person",
    capacityLabel: "Players Registered",
    max: 64,
    current: 28,
    bgA: "from-purple-400",
    bgB: "to-pink-400",
    accent: "text-purple-600",
  },
  fifa: {
    title: "FIFA 24 Tournament",
    description:
      "Experience the thrill of football like never before. Outsmart your rivals with perfect passes, stunning goals, and elite control. Every match is a stage — every move defines your legacy.",
    date: "March 18, 2025",
    time: "1:00 PM - 9:00 PM",
    location: "Gaming Lab, DSU Campus",
    format: "1v1 Single Elimination",
    duration: "Knockout Tournament",
    prize: "Rs. 10,000",
    runnerUpPrize: "Rs. 5,000",
    registrationFee: "Rs. 600 per person",
    capacityLabel: "Players Registered",
    max: 32,
    current: 15,
    bgA: "from-green-400",
    bgB: "to-blue-400",
    accent: "text-green-600",
  },
};


type PageProps = { params: Promise<{ event: string }> };

export default function GamingArenaEventPage({ params }: PageProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { event } = use(params);
  const key = event as EventKey;
  const config = EVENT_CONFIG[key];
  if (!config) return notFound();

  return (
    <>
      <main ref={sectionRef} className="relative min-h-screen bg-white text-black">
        {/* Logo */}
        <div className="absolute top-6 left-6 z-50">
          <Link href="/" className="flex items-center">
            <Image 
              src="/sponsors/Logo Spectrum.png"
              alt="Spectrum Logo" 
              width={48}
              height={48}
              className="h-12 w-auto"
            />
          </Link>
        </div>

        <div className="container mx-auto px-6 py-20">
          {/* Header */}
          <div className="text-center mb-16">
            <TimelineContent animationNum={1} timelineRef={sectionRef} once={false} as="div">
              <Link
                href="/modules/gaming-arena"
                className={`${spaceGrotesk.className} inline-flex items-center text-sm text-gray-600 hover:text-black transition-colors mb-8`}
              >
                ← Back to DevPlay
              </Link>
            </TimelineContent>

            <TimelineContent animationNum={2} timelineRef={sectionRef} once={false} as="div">
              <h1 className={`${orbitron.className} text-5xl md:text-6xl font-bold text-black text-center mb-6`}>
                {config.title}
              </h1>
            </TimelineContent>

            <TimelineContent animationNum={3} timelineRef={sectionRef} once={false} as="div">
              <div className="w-24 h-1 bg-gradient-to-r from-[#FFD700] to-[#C5A100] mx-auto mb-8"></div>
            </TimelineContent>
          </div>

          {/* Main Content - Event Info and Registration Side by Side */}
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Event Information */}
            <TimelineContent animationNum={5} timelineRef={sectionRef} once={false} as="div">
              <div className="rounded-2xl p-[1px] bg-gradient-to-br from-[#FFD700] to-[#C5A100] shadow-[0_0_20px_rgba(255,215,0,0.18)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,215,0,0.3)] hover:shadow-2xl">
                <div className="rounded-2xl p-8 bg-white shadow-inner">
                  <h2 className={`${orbitron.className} text-2xl font-bold text-black mb-3`}>Event Information</h2>
                  <div className="w-16 h-1 bg-gradient-to-r from-[#FFD700] to-[#C5A100] mb-6"></div>
                  
                  <TimelineContent animationNum={7} timelineRef={sectionRef} once={true} as="p">
                    <p className={`${spaceGrotesk.className} text-sm text-gray-700 leading-relaxed mb-6`}>
                      {config.description}
                    </p>
                  </TimelineContent>

                  <div className="space-y-4">
                    <TimelineContent animationNum={8} timelineRef={sectionRef} once={true} as="div">
                      <div className="flex items-center p-3 rounded-lg bg-gray-50 hover:bg-gradient-to-r hover:from-[#FFF4BF] hover:to-[#FFE38E] transition-all duration-300">
                        <FaClock className="text-[#C5A100] text-xl mr-4" />
                        <div>
                          <p className={`${spaceGrotesk.className} text-sm text-gray-600`}>Duration</p>
                          <p className={`${spaceGrotesk.className} text-lg font-semibold text-black`}>{config.time}</p>
                        </div>
                      </div>
                    </TimelineContent>

                    <TimelineContent animationNum={9} timelineRef={sectionRef} once={true} as="div">
                      <div className="flex items-center p-3 rounded-lg bg-gray-50 hover:bg-gradient-to-r hover:from-[#FFF4BF] hover:to-[#FFE38E] transition-all duration-300">
                        <FaUsers className="text-[#C5A100] text-xl mr-4" />
                        <div>
                          <p className={`${spaceGrotesk.className} text-sm text-gray-600`}>Format</p>
                          <p className={`${spaceGrotesk.className} text-lg font-semibold text-black`}>{config.format}</p>
                        </div>
                      </div>
                    </TimelineContent>
                  </div>
                </div>
              </div>
            </TimelineContent>

            {/* Registration Card */}
            <TimelineContent animationNum={6} timelineRef={sectionRef} once={false} as="div">
              <div className="rounded-2xl p-[1px] bg-gradient-to-br from-[#FFD700] to-[#C5A100] shadow-[0_0_20px_rgba(255,215,0,0.18)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,215,0,0.3)] hover:shadow-2xl">
                <div
                  className="rounded-2xl p-8 transition-all duration-300"
                  style={{
                    background:
                      "linear-gradient(135deg, #8B7355 0%, #D4AF37 25%, #F4E4BC 50%, #D4AF37 75%, #8B7355 100%), " +
                      "radial-gradient(ellipse at 30% 20%, rgba(255, 255, 255, 0.2), transparent 50%)",
                    boxShadow:
                      "inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -2px 8px rgba(0,0,0,0.1), 0 4px 12px rgba(0,0,0,0.1)",
                  }}
                >
                  <h3 className={`${orbitron.className} text-2xl font-bold text-black mb-6`}>Registration</h3>

                  <div className="space-y-4 mb-8">
                    <TimelineContent animationNum={20} timelineRef={sectionRef} once={true} as="div">
                      <div className="flex justify-between items-center p-2 rounded-lg hover:bg-white/20 transition-all duration-300">
                        <span className={`${spaceGrotesk.className} text-black/70`}>Prize Pool</span>
                        <span className={`${orbitron.className} text-2xl font-bold text-black`}>{config.prize}</span>
                      </div>
                    </TimelineContent>
                    
                    {config.runnerUpPrize && (
                      <TimelineContent animationNum={21} timelineRef={sectionRef} once={true} as="div">
                        <div className="flex justify-between items-center p-2 rounded-lg hover:bg-white/20 transition-all duration-300">
                          <span className={`${spaceGrotesk.className} text-black/70`}>Runner Up</span>
                          <span className={`${spaceGrotesk.className} text-lg font-semibold text-black`}>{config.runnerUpPrize}</span>
                        </div>
                      </TimelineContent>
                    )}

                    <TimelineContent animationNum={22} timelineRef={sectionRef} once={true} as="div">
                      <div className="flex justify-between items-center p-2 rounded-lg hover:bg-white/20 transition-all duration-300">
                        <span className={`${spaceGrotesk.className} text-black/70`}>Entry Fee</span>
                        <span className={`${spaceGrotesk.className} text-lg font-semibold text-black`}>{config.registrationFee}</span>
                      </div>
                    </TimelineContent>
                  </div>

                  <TimelineContent animationNum={23} timelineRef={sectionRef} once={true} as="div">
                    <Link
                      href="/register"
                      className={`${orbitron.className} w-full inline-block text-center px-8 py-4 bg-black text-white font-bold rounded-full transition transform hover:scale-105 hover:opacity-90`}
                    >
                      Register Now
                    </Link>
                  </TimelineContent>
                  
                  <TimelineContent animationNum={24} timelineRef={sectionRef} once={true} as="p">
                    <p className={`${spaceGrotesk.className} text-xs text-black/60 text-center mt-4`}>
                      Registration closes 24 hours before the event
                    </p>
                  </TimelineContent>
                </div>
              </div>
            </TimelineContent>
          </div>
        </div>
      </main>
    </>
  );
}

