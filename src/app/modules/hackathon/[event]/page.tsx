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

type EventKey = "speed-debugging" | "speed-programming" | "dark-spider" | "web-development" | "data-science" | "mobile-app-development" | "database-design";

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
  "speed-debugging": {
    title: "Speed Debugging Challenge",
    description:
      "Race against the clock to identify and fix bugs in record time. This intense debugging challenge tests your problem-solving skills, code analysis abilities, and quick thinking. Only the fastest and most accurate debuggers will claim victory in this adrenaline-fueled competition.",
    date: "March 20, 2025",
    time: "10:00 AM - 12:00 PM",
    location: "Computer Lab 1",
    format: "Individual",
    duration: "2 Hours",
    prize: "Rs. 8,000",
    runnerUpPrize: "Rs. 4,000",
    registrationFee: "Rs. 300 per person",
    capacityLabel: "Participants",
    max: 50,
    current: 23,
    bgA: "from-red-400",
    bgB: "to-orange-400",
    accent: "text-red-600",
  },
  "speed-programming": {
    title: "Speed Programming Contest",
    description:
      "Code your way to victory in this fast-paced programming competition. Solve algorithmic challenges, implement efficient solutions, and showcase your coding prowess under pressure. Speed, accuracy, and creativity are your weapons in this battle of minds.",
    date: "March 21, 2025",
    time: "9:00 AM - 12:00 PM",
    location: "Computer Lab 2",
    format: "Individual",
    duration: "3 Hours",
    prize: "Rs. 10,000",
    runnerUpPrize: "Rs. 5,000",
    registrationFee: "Rs. 400 per person",
    capacityLabel: "Participants",
    max: 40,
    current: 18,
    bgA: "from-blue-400",
    bgB: "to-purple-400",
    accent: "text-blue-600",
  },
  "dark-spider": {
    title: "Dark Spider Web Challenge",
    description:
      "Navigate through the intricate web of cybersecurity challenges and complex programming puzzles. This advanced competition tests your knowledge of web technologies, security protocols, and problem-solving skills. Only the most skilled developers will emerge from this digital labyrinth.",
    date: "March 22, 2025",
    time: "2:00 PM - 6:00 PM",
    location: "Computer Lab 3",
    format: "Team (2-3)",
    duration: "4 Hours",
    prize: "Rs. 15,000",
    runnerUpPrize: "Rs. 7,500",
    registrationFee: "Rs. 500 per team",
    capacityLabel: "Teams",
    max: 20,
    current: 8,
    bgA: "from-purple-400",
    bgB: "to-pink-400",
    accent: "text-purple-600",
  },
  "web-development": {
    title: "Web Development Hackathon",
    description:
      "Build stunning, responsive web applications from scratch in this comprehensive development challenge. Showcase your full-stack development prowess, creative design skills, and technical expertise. Create something extraordinary that stands out from the crowd.",
    date: "March 23, 2025",
    time: "9:00 AM - 3:00 PM",
    location: "Main Auditorium",
    format: "Team (2-4)",
    duration: "6 Hours",
    prize: "Rs. 20,000",
    runnerUpPrize: "Rs. 10,000",
    registrationFee: "Rs. 600 per team",
    capacityLabel: "Teams",
    max: 15,
    current: 6,
    bgA: "from-green-400",
    bgB: "to-teal-400",
    accent: "text-green-600",
  },
  "data-science": {
    title: "Data Science Challenge",
    description:
      "Dive deep into complex datasets and extract meaningful insights that drive real-world solutions. This intensive challenge tests your analytical skills, machine learning expertise, and ability to transform raw data into powerful insights. The future belongs to those who can make data speak.",
    date: "March 24, 2025",
    time: "8:00 AM - 4:00 PM",
    location: "Data Science Lab",
    format: "Team (2-3)",
    duration: "8 Hours",
    prize: "Rs. 25,000",
    runnerUpPrize: "Rs. 12,500",
    registrationFee: "Rs. 800 per team",
    capacityLabel: "Teams",
    max: 12,
    current: 4,
    bgA: "from-orange-400",
    bgB: "to-red-400",
    accent: "text-orange-600",
  },
  "mobile-app-development": {
    title: "Mobile App Development",
    description:
      "Create innovative mobile applications that solve real-world problems and captivate users. This comprehensive challenge tests your mobile development skills, UI/UX design abilities, and creative problem-solving. Build something that changes the way people interact with technology.",
    date: "March 25, 2025",
    time: "9:00 AM - 5:00 PM",
    location: "Mobile Dev Lab",
    format: "Team (2-4)",
    duration: "8 Hours",
    prize: "Rs. 22,000",
    runnerUpPrize: "Rs. 11,000",
    registrationFee: "Rs. 700 per team",
    capacityLabel: "Teams",
    max: 10,
    current: 3,
    bgA: "from-indigo-400",
    bgB: "to-blue-400",
    accent: "text-indigo-600",
  },
  "database-design": {
    title: "Database Design Challenge",
    description:
      "Master the art of database architecture and optimization in this technical challenge. Design robust, scalable database systems that handle complex data relationships and deliver optimal performance. Every table, every relationship, every query matters in this precision-focused competition.",
    date: "March 26, 2025",
    time: "1:00 PM - 5:00 PM",
    location: "Database Lab",
    format: "Individual",
    duration: "4 Hours",
    prize: "Rs. 12,000",
    runnerUpPrize: "Rs. 6,000",
    registrationFee: "Rs. 400 per person",
    capacityLabel: "Participants",
    max: 30,
    current: 12,
    bgA: "from-cyan-400",
    bgB: "to-blue-400",
    accent: "text-cyan-600",
  },
};

interface PageProps {
  params: Promise<{ event: string }>;
}

export default function HackathonEventPage({ params }: PageProps) {
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
                href="/modules/hackathon"
                className={`${spaceGrotesk.className} inline-flex items-center text-sm text-gray-600 hover:text-black transition-colors mb-8`}
              >
                ← Back to Hackathon
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
