"use client";

import { Orbitron, Space_Grotesk } from "next/font/google";
import Link from "next/link";
import { FaGamepad } from "react-icons/fa";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TimelineContent } from "@/components/timeline-animation";
import { useRef } from "react";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "700"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export default function GamingArenaPage() {
  const sectionRef = useRef<HTMLElement>(null);

  const games = [
    {
      title: "Counter Strike",
      description: "Tactical FPS tournament featuring intense 5v5 matches. Show your strategic skills and aim precision.",
      image: "/modules/valorant.png",
      imagePosition: "center", // center, center top, center 20%, etc.
      href: "/modules/gaming-arena/counter-strike",
      players: "5v5",
      duration: "Best of 3",
      prize: "₹50,000",
    },
    {
      title: "Game Development",
      description: "Prototype, polish, and pitch a playable experience built live during Spectrum.",
      image: "/modules/web-development.png",
      imagePosition: "center 20%",
      href: "/modules/gaming-arena/game-development",
      players: "Team (2-4)",
      duration: "6 Hours",
      prize: "₹75,000",
    },
    {
      title: "Tekken 7",
      description: "Fighting game tournament featuring one-on-one combat with classic Tekken characters.",
      image: "/modules/tekken.png",
      imagePosition: "center 20%", // Adjust this to show characters properly
      href: "/modules/gaming-arena/tekken",
      players: "1v1",
      duration: "Double Elim",
      prize: "₹25,000",
    },
    {
      title: "FIFA 24",
      description: "Football simulation tournament where you can lead your favorite team to victory.",
      image: "/modules/fifa.png",
      imagePosition: "center 30%", // Adjust this to show players/field properly
      href: "/modules/gaming-arena/fifa",
      players: "1v1",
      duration: "Knockout",
      prize: "₹30,000",
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
                <FaGamepad className="text-4xl text-black mr-4" />
                <h1 className={`${orbitron.className} text-5xl md:text-6xl font-bold text-black`}>
                  DevPlay
                </h1>
              </div>
            </TimelineContent>

            <TimelineContent animationNum={3} timelineRef={sectionRef} once={false} as="div">
              <div className="w-24 h-1 bg-gradient-to-r from-[#FFD700] to-black mx-auto mb-8"></div>
            </TimelineContent>

            <TimelineContent animationNum={4} timelineRef={sectionRef} once={false} as="div">
              <p className={`${spaceGrotesk.className} text-xl text-gray-700 max-w-3xl mx-auto`}>
                Compete in the ultimate gaming showdown featuring the most popular games
              </p>
            </TimelineContent>
          </div>

          {/* Games Grid */}
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {games.map((game, index) => (
              <TimelineContent 
                key={game.title} 
                animationNum={5 + index} 
                timelineRef={sectionRef} 
                once={true} 
                as="div"
              >
                <Link href={game.href} className="group block">
                  <div className="relative bg-white rounded-2xl p-8 border border-gray-200 overflow-hidden transition-transform duration-300 hover:scale-105">
                    {/* Background Image Overlay */}
                    <div 
                      className="absolute inset-0 bg-cover bg-no-repeat opacity-90"
                      style={{
                        backgroundImage: `url('${game.image}')`,
                        backgroundSize: "cover",
                        backgroundPosition: game.imagePosition
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
                        <h3 className={`${orbitron.className} text-3xl font-bold text-white mb-4 drop-shadow-lg`}>
                          {game.title}
                        </h3>
                      </TimelineContent>
                      
                      <TimelineContent 
                        animationNum={15 + index} 
                        timelineRef={sectionRef} 
                        once={true} 
                        as="div"
                      >
                        <div className="flex items-center justify-center">
                          <span className={`${spaceGrotesk.className} text-sm font-medium text-white bg-black px-4 py-2 rounded-full transition-transform duration-300 hover:scale-110`}>
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
