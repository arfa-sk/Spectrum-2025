"use client";

import { Orbitron, Space_Grotesk } from "next/font/google";
import Link from "next/link";
import { FaGamepad, FaTimes, FaTrophy, FaUsers, FaCoins } from "react-icons/fa";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TimelineContent } from "@/components/timeline-animation";
import { useRef, useState } from "react";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "700"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

interface Game {
  title: string;
  type: string;
  pricing: string;
  teamSize: string;
  vibe: string;
  description: string;
  image: string;
  imagePosition: string;
}

export default function GamingArenaPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeGame, setActiveGame] = useState<Game | null>(null);

  const games: Game[] = [
    {
      title: "FIFA 26",
      type: "Solo",
      pricing: "Rs 500 / person",
      teamSize: "1 Player (Solo)",
      vibe: "Intense competitive 1v1 console matches. Precision control, perfect tactics.",
      description: "Step onto the virtual pitch and dominate in FIFA 26. Face off against the city's finest players in a high-stakes, single-elimination tournament where only the most clinical finishes and tactical setups will lead to absolute glory.",
      image: "/modules/fifa.png",
      imagePosition: "center 30%",
    },
    {
      title: "Tekken 8",
      type: "Solo",
      pricing: "Rs 500 / person",
      teamSize: "1 Player (Solo)",
      vibe: "Electrifying fighting arena. Master combos, high reflexes, double elimination.",
      description: "Enter the King of Iron Fist Tournament in Tekken 8. Pick your fighter, perfect your combos, and engage in pulse-pounding, frame-perfect 1v1 matches. Double-elimination format ensures only the most skilled champion claims the final trophy.",
      image: "/modules/tekken.png",
      imagePosition: "center 20%",
    },
    {
      title: "PUBG",
      type: "Team",
      pricing: "Rs 2000 / team",
      teamSize: "4 Players (Team)",
      vibe: "Tactical battle royale squads. Communication, map control, survival instincts.",
      description: "Drop, loot, survive. Compete in our high-stakes PUBG Mobile championship. Assemble your 4-player squad and outmaneuver rival teams across multiple maps to secure the ultimate chicken dinner under custom competitive settings.",
      image: "/modules/web-development.png",
      imagePosition: "center 20%",
    },
    {
      title: "Free Fire",
      type: "Team",
      pricing: "Rs 2000 / team",
      teamSize: "4 Players (Team)",
      vibe: "Fast-paced battle royale squad fights. Quick reflexes, close combat mastery.",
      description: "Jump into the fast-paced, high-octane battlegrounds of Free Fire. Put your squad's quick-thinking and survival tactics to the test in this premier squad battle royale series, featuring maximum competitiveness.",
      image: "/modules/valorant.png",
      imagePosition: "center",
    },
    {
      title: "Counter-Strike 2",
      type: "Team",
      pricing: "Rs 2000 / team",
      teamSize: "4 Players (Team)",
      vibe: "Tactical tactical shooter. Team cohesion, strategic executions, aim control.",
      description: "Tactical shooting reaches its peak in Counter-Strike 2. Perfect your smoke executes, coordinate site takes, and showcase absolute precision aiming. Compete under official competitive guidelines in a 4-player squad.",
      image: "/modules/valorant.png",
      imagePosition: "center",
    },
    {
      title: "Valorant",
      type: "Team",
      pricing: "Rs 2000 / team",
      teamSize: "4 Players (Team)",
      vibe: "High-octane tactical shooter. Agent ability synchronization, team strategies.",
      description: "Defy limits and claim your radiant rank. Valorant at Spectrum V1 brings intense tactical FPS action where mechanical skill meets tactical agency. Coordinate utility and execute perfect strategies with your 4-player team.",
      image: "/modules/valorant.png",
      imagePosition: "center",
    }
  ];

  return (
    <>
      <Navbar />
      <main ref={sectionRef} className="relative min-h-screen bg-white text-black overflow-x-hidden">
        
        {/* Background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_20%,rgba(255,215,0,0.02)_0%,transparent_50%)] pointer-events-none"></div>

        <div className="container mx-auto px-6 py-24">
          {/* Header */}
          <div className="text-center mb-16">
            <TimelineContent animationNum={1} timelineRef={sectionRef} once={false} as="div">
              <Link 
                href="/#modules" 
                className={`${spaceGrotesk.className} inline-flex items-center text-sm text-gray-500 hover:text-black transition-colors mb-8`}
              >
                ← Back to Modules
              </Link>
            </TimelineContent>

            <TimelineContent animationNum={2} timelineRef={sectionRef} once={false} as="div">
              <div className="flex items-center justify-center mb-6">
                <div className="p-3 bg-black rounded-2xl mr-4 shadow-lg">
                  <FaGamepad className="text-4xl text-[#FFD700] animate-pulse" />
                </div>
                <h1 className={`${orbitron.className} text-5xl md:text-6xl font-bold text-black`}>
                  DevPlay Arena
                </h1>
              </div>
            </TimelineContent>

            <TimelineContent animationNum={3} timelineRef={sectionRef} once={false} as="div">
              <div className="w-24 h-1 bg-gradient-to-r from-[#FFD700] to-black mx-auto mb-8"></div>
            </TimelineContent>

            <TimelineContent animationNum={4} timelineRef={sectionRef} once={false} as="div">
              <p className={`${spaceGrotesk.className} text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed`}>
                Enter Karachi&apos;s ultimate gaming arena. Register for solo duels or team battles, conquer the standings, and claim extreme glory.
              </p>
            </TimelineContent>
          </div>

          {/* Games Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {games.map((game, index) => (
              <TimelineContent 
                key={game.title} 
                animationNum={5 + index} 
                timelineRef={sectionRef} 
                once={true} 
                as="div"
              >
                <div 
                  onClick={() => setActiveGame(game)}
                  className="group relative cursor-pointer bg-white rounded-3xl p-8 border-2 border-black overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-[1.03] hover:-translate-y-2 h-72"
                >
                  {/* Background Image Overlay */}
                  <div 
                    className="absolute inset-0 bg-cover bg-no-repeat opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                    style={{
                      backgroundImage: `url('${game.image}')`,
                      backgroundSize: "cover",
                      backgroundPosition: game.imagePosition
                    }}
                  ></div>

                  {/* Gradient bottom slide */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100 opacity-100 -z-10"></div>
                  
                  {/* Content */}
                  <div className="relative z-10 flex flex-col justify-between h-full">
                    <div>
                      {/* Game Mode Badge */}
                      <span className={`${spaceGrotesk.className} inline-block px-3 py-1 text-xs font-bold bg-black text-[#FFD700] rounded-full mb-4 border border-[#FFD700]/30`}>
                        {game.type} Mode
                      </span>
                      
                      <h3 className={`${orbitron.className} text-3xl font-extrabold text-black mb-2 group-hover:text-amber-600 transition-colors`}>
                        {game.title}
                      </h3>
                      <p className={`${spaceGrotesk.className} text-xs text-gray-500 line-clamp-2`}>
                        {game.vibe}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className={`${spaceGrotesk.className} text-sm font-bold text-black`}>
                        {game.pricing}
                      </span>
                      <span className={`${spaceGrotesk.className} text-xs font-bold text-gray-400 group-hover:text-[#FFD700] transition-colors`}>
                        View Details →
                      </span>
                    </div>
                  </div>

                  {/* Cyber glow boundary on hover */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#FFD700] to-[#C5A100] opacity-0 group-hover:opacity-100 transition-all duration-500 -z-20 blur-md scale-105"></div>
                </div>
              </TimelineContent>
            ))}
          </div>
        </div>

        {/* Dynamic Detail Modal */}
        {activeGame && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in transition-opacity duration-300">
            <div 
              className="relative bg-white border-2 border-black rounded-3xl p-8 max-w-2xl w-full shadow-2xl transition-transform duration-500 scale-100 overflow-hidden"
              style={{
                boxShadow: "0 0 40px rgba(255, 215, 0, 0.2)"
              }}
            >
              {/* Gold light leak effect */}
              <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-[#FFD700]/10 blur-3xl pointer-events-none"></div>

              {/* Close Button */}
              <button 
                onClick={() => setActiveGame(null)}
                className="absolute top-6 right-6 p-2 rounded-full border border-gray-200 hover:bg-black hover:text-white transition-all duration-300"
              >
                <FaTimes size={18} />
              </button>

              {/* Header Title */}
              <div className="mb-6">
                <span className={`${spaceGrotesk.className} inline-block px-4 py-1.5 text-xs font-bold bg-[#FFD700] text-black rounded-full mb-3 shadow`}>
                  {activeGame.type} Competition
                </span>
                <h2 className={`${orbitron.className} text-4xl font-extrabold text-black uppercase`}>
                  {activeGame.title}
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-[#FFD700] to-black mt-2"></div>
              </div>

              {/* Description */}
              <div className="space-y-6 mb-8">
                <p className={`${spaceGrotesk.className} text-base text-gray-700 leading-relaxed`}>
                  {activeGame.description}
                </p>

                {/* Vibe description */}
                <div className="p-4 bg-neutral-50 rounded-xl border border-gray-200">
                  <p className={`${spaceGrotesk.className} text-sm font-semibold text-black italic`}>
                    &ldquo;{activeGame.vibe}&rdquo;
                  </p>
                </div>

                {/* Meta details list */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center justify-center p-3 bg-neutral-50 rounded-xl border border-gray-100">
                    <FaUsers className="text-[#C5A100] text-lg mb-1" />
                    <span className={`${spaceGrotesk.className} text-[0.65rem] text-gray-400 uppercase tracking-wider`}>Team Size</span>
                    <span className={`${spaceGrotesk.className} text-xs font-bold text-black mt-1`}>{activeGame.teamSize}</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-3 bg-neutral-50 rounded-xl border border-gray-100">
                    <FaCoins className="text-[#C5A100] text-lg mb-1" />
                    <span className={`${spaceGrotesk.className} text-[0.65rem] text-gray-400 uppercase tracking-wider`}>Pricing</span>
                    <span className={`${spaceGrotesk.className} text-xs font-bold text-black mt-1`}>{activeGame.pricing}</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-3 bg-neutral-50 rounded-xl border border-gray-100">
                    <FaTrophy className="text-[#C5A100] text-lg mb-1" />
                    <span className={`${spaceGrotesk.className} text-[0.65rem] text-gray-400 uppercase tracking-wider`}>Prize Pool</span>
                    <span className={`${spaceGrotesk.className} text-xs font-bold text-black mt-1`}>Top 3 Medals</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => setActiveGame(null)}
                  className={`${orbitron.className} flex-1 py-4 border border-black hover:bg-neutral-100 text-black font-bold rounded-2xl transition-all duration-300`}
                >
                  Cancel
                </button>
                <Link
                  href={`/register?category=DevPlay&game=${encodeURIComponent(activeGame.title)}`}
                  className={`${orbitron.className} flex-1 py-4 bg-black text-[#FFD700] hover:bg-neutral-900 text-center font-bold rounded-2xl transition-all duration-300 shadow-lg`}
                >
                  Register Now
                </Link>
              </div>

            </div>
          </div>
        )}

        <Footer />
      </main>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleUp {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.25s ease-out forwards;
        }
        .animate-scaleUp {
          animation: scaleUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>
    </>
  );
}
