"use client";

import { Orbitron, Space_Grotesk } from "next/font/google";
import Link from "next/link";
import { FaMicrophone, FaMusic, FaTheaterMasks, FaLaugh, FaDrum, FaGuitar } from "react-icons/fa";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TimelineContent } from "@/components/timeline-animation";
import { useRef } from "react";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "700"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export default function SuffasGotTalentPage() {
  const sectionRef = useRef<HTMLElement>(null);

  const talents = [
    {
      title: "Singing",
      description: "Showcase your vocal prowess and musical talent in this captivating singing competition. Let your voice be heard and your passion shine through.",
      image: "/modules/singing.png",
      imagePosition: "center",
      href: "/modules/suffas-got-talent/singing",
      duration: "3 Minutes",
      format: "Individual",
      prize: "Rs. 8,000",
    },
    {
      title: "Standup Comedy",
      description: "Make the audience roar with laughter in this hilarious standup comedy contest. Your wit, timing, and charisma will be your greatest assets.",
      image: "/modules/standup-comedy.png",
      imagePosition: "center 20%",
      href: "/modules/suffas-got-talent/standup-comedy",
      duration: "5 Minutes",
      format: "Individual",
      prize: "Rs. 10,000",
    },
    {
      title: "Skit Battle",
      description: "Bring stories to life through dramatic performances and creative skits. Team up and showcase your acting skills and creativity.",
      image: "/modules/skit-battle.png",
      imagePosition: "center",
      href: "/modules/suffas-got-talent/skit-battle",
      duration: "8 Minutes",
      format: "Team (2-5)",
      prize: "Rs. 15,000",
    },
    {
      title: "The Memory Pat",
      description: "Test your memory skills in this challenging pattern recognition game. Remember sequences and prove your mental agility.",
      image: "/modules/the-memory-pat.png",
      imagePosition: "center",
      href: "/modules/suffas-got-talent/the-memory-pat",
      duration: "5 Minutes",
      format: "Individual",
      prize: "Rs. 8,000",
    },
    {
      title: "Treasure Chase",
      description: "Navigate through clues and puzzles to find hidden treasures. Speed, strategy, and problem-solving are key to victory.",
      image: "/modules/treasure-chase.png",
      imagePosition: "center 20%",
      href: "/modules/suffas-got-talent/treasure-chase",
      duration: "10 Minutes",
      format: "Team (2-4)",
      prize: "Rs. 12,000",
    },
    {
      title: "The Floor is Lava",
      description: "Navigate obstacles and challenges while avoiding the 'lava floor'. Agility, balance, and quick thinking will save you.",
      image: "/modules/the-floor-is-lava.png",
      imagePosition: "center 30%",
      href: "/modules/suffas-got-talent/the-floor-is-lava",
      duration: "6 Minutes",
      format: "Individual",
      prize: "Rs. 10,000",
    },
  ];

  return (
    <>
      <Navbar />
      <main ref={sectionRef} className="relative min-h-screen bg-white text-black">

        <div className="container mx-auto px-6 py-20">
          {/* Header */}
          <div className="text-center mb-16">
            <TimelineContent animationNum={1} timelineRef={sectionRef} once={false} as="div">
              <Link 
                href="/modules" 
                className={`${spaceGrotesk.className} inline-flex items-center text-sm text-gray-600 hover:text-black transition-colors mb-8`}
              >
                ← Back to Modules
              </Link>
            </TimelineContent>

            <TimelineContent animationNum={2} timelineRef={sectionRef} once={false} as="div">
              <div className="flex items-center justify-center mb-6">
                <FaMicrophone className="text-4xl text-black mr-4" />
                <h1 className={`${orbitron.className} text-5xl md:text-6xl font-bold text-black`}>
                  Suffa&apos;s Got Talent
                </h1>
              </div>
            </TimelineContent>

            <TimelineContent animationNum={3} timelineRef={sectionRef} once={false} as="div">
              <div className="w-24 h-1 bg-gradient-to-r from-[#FFD700] to-black mx-auto mb-8"></div>
            </TimelineContent>

            <TimelineContent animationNum={4} timelineRef={sectionRef} once={false} as="div">
              <p className={`${spaceGrotesk.className} text-xl text-gray-700 max-w-3xl mx-auto`}>
                Discover hidden talents and showcase your creativity across multiple performance categories
              </p>
            </TimelineContent>
          </div>

          {/* Talents Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {talents.map((talent, index) => (
              <TimelineContent 
                key={talent.title} 
                animationNum={5 + index} 
                timelineRef={sectionRef} 
                once={true} 
                as="div"
              >
                <Link href={talent.href} className="group block">
                  <div className="relative bg-white rounded-2xl p-8 border border-gray-200 overflow-hidden transition-transform duration-300 hover:scale-105">
                    {/* Background Image Overlay */}
                    <div 
                      className="absolute inset-0 bg-cover bg-no-repeat opacity-90"
                      style={{
                        backgroundImage: `url('${talent.image}')`,
                        backgroundSize: "cover",
                        backgroundPosition: talent.imagePosition
                      }}
                    ></div>
                    
                    {/* Content */}
                    <div className="relative z-10 flex flex-col justify-between h-full min-h-[200px]">
                      <TimelineContent 
                        animationNum={10 + index} 
                        timelineRef={sectionRef} 
                        once={true} 
                        as="h3"
                      >
                        <h3 className={`${orbitron.className} text-2xl font-bold text-white mb-4 drop-shadow-lg`}>
                          {talent.title}
                        </h3>
                      </TimelineContent>
                      
                      <TimelineContent 
                        animationNum={15 + index} 
                        timelineRef={sectionRef} 
                        once={true} 
                        as="div"
                      >
                        <div className="flex items-center justify-center">
                          <span className={`${spaceGrotesk.className} text-sm font-medium text-white bg-black px-4 py-2 rounded-full`}>
                            View Details
                          </span>
                        </div>
                      </TimelineContent>
                    </div>
                  </div>
                </Link>
              </TimelineContent>
            ))}
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}
