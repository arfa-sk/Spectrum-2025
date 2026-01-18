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

type EventKey = "singing" | "standup-comedy" | "tug-of-war" | "the-memory-pat" | "minute-to-win-it" | "arm-wrestling";

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
    prize: "Rs. 50,000",
    runnerUpPrize: "Rs. 40,000",
    registrationFee: "Rs. 1000 per person",
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
    prize: "Rs. 50,000",
    runnerUpPrize: "Rs. 40,000",
    registrationFee: "Rs. 1000 per person",
    capacityLabel: "Participants",
    max: 20,
    current: 8,
    bgA: "from-yellow-400",
    bgB: "to-orange-400",
    accent: "text-yellow-600",
  },
  "tug-of-war": {
    title: "Tug of War",
    description:
      "Grip the rope, brace your stance, and pull in perfect sync. Tug of War pits raw power against strategy as teams battle for leverage in a best-of-three showdown.",
    date: "March 29, 2025",
    time: "5:00 PM - 8:00 PM",
    location: "Main Arena",
    format: "Team (4-6)",
    duration: "5 Minutes",
    prize: "Rs. 50,000",
    runnerUpPrize: "Rs. 40,000",
    registrationFee: "Rs. 1500 per team",
    capacityLabel: "Teams",
    max: 10,
    current: 4,
    bgA: "from-amber-400",
    bgB: "to-yellow-500",
    accent: "text-amber-600",
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
    prize: "Rs. 50,000",
    runnerUpPrize: "Rs. 40,000",
    registrationFee: "Rs. 1000 per person",
    capacityLabel: "Participants",
    max: 30,
    current: 12,
    bgA: "from-purple-400",
    bgB: "to-indigo-400",
    accent: "text-purple-600",
  },
  "minute-to-win-it": {
    title: "Minute to Win It",
    description:
      "Stack, toss, balance, and solve lightning-fast challenges with only sixty seconds on the clock. Each round is a new surprise that tests focus and dexterity.",
    date: "March 31, 2025",
    time: "3:00 PM - 6:00 PM",
    location: "Activity Hall",
    format: "Individual",
    duration: "1 Minute",
    prize: "Rs. 50,000",
    runnerUpPrize: "Rs. 40,000",
    registrationFee: "Rs. 1000 per person",
    capacityLabel: "Participants",
    max: 25,
    current: 10,
    bgA: "from-sky-400",
    bgB: "to-blue-500",
    accent: "text-sky-600",
  },
  "arm-wrestling": {
    title: "Arm Wrestling Championship",
    description:
      "Square up, lock hands, and unleash controlled strength in intense one-on-one bouts. Technique, endurance, and explosive power crown the arm wrestling champion.",
    date: "April 1, 2025",
    time: "5:00 PM - 8:00 PM",
    location: "Strength Zone",
    format: "Individual",
    duration: "3 Minutes",
    prize: "Rs. 50,000",
    runnerUpPrize: "Rs. 40,000",
    registrationFee: "Rs. 1000 per person",
    capacityLabel: "Participants",
    max: 32,
    current: 14,
    bgA: "from-rose-400",
    bgB: "to-red-500",
    accent: "text-rose-600",
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
          <Image
            src="/sponsors/Logo Spectrum.png"
            alt="Spectrum Logo"
            width={48}
            height={48}
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
                ← Back to Play To Win
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
                      href="#"
                      className={`${orbitron.className} w-full inline-block text-center px-8 py-4 bg-black text-white font-bold rounded-full transition transform cursor-not-allowed pointer-events-none`}
                    >
                      Coming Soon
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
