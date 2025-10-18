"use client";

import { Orbitron, Space_Grotesk } from "next/font/google";
import Link from "next/link";
import {
  FaMicrophone,
  FaUsers,
  FaClock,
  FaMusic,
  FaTheaterMasks,
  FaLaugh,
  FaDrum,
  FaGuitar,
} from "react-icons/fa";
import { TimelineContent } from "@/components/timeline-animation";
import { useRef, use } from "react";
import { notFound } from "next/navigation";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "700"] });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

type EventKey = "singing" | "standup-comedy" | "skit-battle" | "the-memory-pat" | "treasure-chase" | "the-floor-is-lava";

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
    capacityLabel: string;
    max: number;
    current: number;
    bgA: string;
    bgB: string;
    accent: string;
  }
> = {
  "singing": {
    title: "Singing Competition",
    description:
      "Step onto the stage and let your voice be heard in this captivating singing competition. Showcase your vocal range, emotional expression, and stage presence. Whether you&apos;re a classical vocalist or pop singer, this is your moment to shine.",
    date: "March 27, 2025",
    time: "6:00 PM - 9:00 PM",
    location: "Main Auditorium",
    format: "Individual",
    duration: "3 Minutes",
    prize: "Rs. 8,000",
    runnerUpPrize: "Rs. 4,000",
    registrationFee: "Rs. 300 per person",
    capacityLabel: "Participants",
    max: 30,
    current: 12,
    bgA: "from-pink-400",
    bgB: "to-red-400",
    accent: "text-pink-600",
  },
  "standup-comedy": {
    title: "Standup Comedy Contest",
    description:
      "Make the audience roar with laughter in this hilarious standup comedy contest. Your wit, timing, and charisma will be your greatest assets on stage. From observational humor to storytelling, show us your unique comedic voice.",
    date: "March 28, 2025",
    time: "7:00 PM - 10:00 PM",
    location: "Comedy Club",
    format: "Individual",
    duration: "5 Minutes",
    prize: "Rs. 10,000",
    runnerUpPrize: "Rs. 5,000",
    registrationFee: "Rs. 400 per person",
    capacityLabel: "Participants",
    max: 20,
    current: 8,
    bgA: "from-yellow-400",
    bgB: "to-orange-400",
    accent: "text-yellow-600",
  },
  "skit-battle": {
    title: "Skit Battle Competition",
    description:
      "Bring stories to life through dramatic performances and creative skits. Collaborate with your teammates to create compelling narratives and engaging performances. From comedy to drama, showcase your acting skills and creativity.",
    date: "March 29, 2025",
    time: "5:00 PM - 8:00 PM",
    location: "Theater Hall",
    format: "Team (2-5)",
    duration: "8 Minutes",
    prize: "Rs. 15,000",
    runnerUpPrize: "Rs. 7,500",
    registrationFee: "Rs. 500 per team",
    capacityLabel: "Teams",
    max: 12,
    current: 5,
    bgA: "from-purple-400",
    bgB: "to-indigo-400",
    accent: "text-purple-600",
  },
  "the-memory-pat": {
    title: "The Memory Pat",
    description:
      "Test your memory skills in this challenging pattern recognition game. Remember sequences, colors, and patterns to prove your mental agility and concentration. Challenge yourself with increasingly complex patterns and sequences.",
    date: "March 30, 2025",
    time: "4:00 PM - 7:00 PM",
    location: "Game Room",
    format: "Individual",
    duration: "5 Minutes",
    prize: "Rs. 8,000",
    runnerUpPrize: "Rs. 4,000",
    registrationFee: "Rs. 300 per person",
    capacityLabel: "Participants",
    max: 30,
    current: 12,
    bgA: "from-purple-400",
    bgB: "to-indigo-400",
    accent: "text-purple-600",
  },
  "treasure-chase": {
    title: "Treasure Chase",
    description:
      "Navigate through clues and puzzles to find hidden treasures. Speed, strategy, and problem-solving skills are key to victory in this exciting adventure. Work together as a team to solve riddles and uncover the ultimate prize.",
    date: "March 31, 2025",
    time: "3:00 PM - 6:00 PM",
    location: "Outdoor Arena",
    format: "Team (2-4)",
    duration: "10 Minutes",
    prize: "Rs. 12,000",
    runnerUpPrize: "Rs. 6,000",
    registrationFee: "Rs. 500 per team",
    capacityLabel: "Teams",
    max: 15,
    current: 6,
    bgA: "from-yellow-400",
    bgB: "to-orange-400",
    accent: "text-yellow-600",
  },
  "the-floor-is-lava": {
    title: "The Floor is Lava",
    description:
      "Navigate obstacles and challenges while avoiding the &apos;lava floor&apos;. Agility, balance, and quick thinking will save you in this thrilling physical challenge. Test your reflexes and coordination in this high-energy competition.",
    date: "April 1, 2025",
    time: "5:00 PM - 8:00 PM",
    location: "Activity Hall",
    format: "Individual",
    duration: "6 Minutes",
    prize: "Rs. 10,000",
    runnerUpPrize: "Rs. 5,000",
    registrationFee: "Rs. 400 per person",
    capacityLabel: "Participants",
    max: 20,
    current: 8,
    bgA: "from-red-400",
    bgB: "to-pink-400",
    accent: "text-red-600",
  },
};

interface PageProps {
  params: Promise<{ event: string }>;
}

export default function SuffasGotTalentEventPage({ params }: PageProps) {
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
          <img 
            src="/sponsors/Logo Spectrum.png" 
            alt="Spectrum Logo" 
            className="h-12 w-auto"
          />
        </div>

        <div className="container mx-auto px-6 py-20">
          {/* Header */}
          <div className="text-center mb-16">
            <TimelineContent animationNum={1} timelineRef={sectionRef} once={false} as="div">
              <Link
                href="/modules/suffas-got-talent"
                className={`${spaceGrotesk.className} inline-flex items-center text-sm text-gray-600 hover:text-black transition-colors mb-8`}
              >
                ← Back to Suffa&apos;s Got Talent
              </Link>
            </TimelineContent>

            <TimelineContent animationNum={2} timelineRef={sectionRef} once={false} as="div">
              <h1 className={`${orbitron.className} text-5xl md:text-6xl font-bold text-black text-center mb-6`}>
                {config.title}
              </h1>
            </TimelineContent>

            <TimelineContent animationNum={3} timelineRef={sectionRef} once={false} as="div">
              <div className="w-24 h-1 bg-gradient-to-r from-[#FFD700] to-black mx-auto mb-8"></div>
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
                          <p className={`${spaceGrotesk.className} text-lg font-semibold text-black`}>{config.duration}</p>
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
                    <TimelineContent animationNum={10} timelineRef={sectionRef} once={true} as="div">
                      <div className="flex justify-between items-center p-2 rounded-lg hover:bg-white/20 transition-all duration-300">
                        <span className={`${spaceGrotesk.className} text-black/70`}>Prize Pool</span>
                        <span className={`${orbitron.className} text-2xl font-bold text-black`}>{config.prize}</span>
                      </div>
                    </TimelineContent>
                    
                    {config.runnerUpPrize && (
                      <TimelineContent animationNum={11} timelineRef={sectionRef} once={true} as="div">
                        <div className="flex justify-between items-center p-2 rounded-lg hover:bg-white/20 transition-all duration-300">
                          <span className={`${spaceGrotesk.className} text-black/70`}>Runner Up</span>
                          <span className={`${spaceGrotesk.className} text-lg font-semibold text-black`}>{config.runnerUpPrize}</span>
                        </div>
                      </TimelineContent>
                    )}

                    <TimelineContent animationNum={12} timelineRef={sectionRef} once={true} as="div">
                      <div className="flex justify-between items-center p-2 rounded-lg hover:bg-white/20 transition-all duration-300">
                        <span className={`${spaceGrotesk.className} text-black/70`}>Entry Fee</span>
                        <span className={`${spaceGrotesk.className} text-lg font-semibold text-black`}>{config.registrationFee}</span>
                      </div>
                    </TimelineContent>
                  </div>

                  <TimelineContent animationNum={13} timelineRef={sectionRef} once={true} as="div">
                    <Link
                      href="/register"
                      className={`${orbitron.className} w-full inline-block text-center px-8 py-4 bg-black text-white font-bold rounded-full transition transform hover:scale-105 hover:opacity-90`}
                    >
                      Register Now
                    </Link>
                  </TimelineContent>
                  
                  <TimelineContent animationNum={14} timelineRef={sectionRef} once={true} as="p">
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
