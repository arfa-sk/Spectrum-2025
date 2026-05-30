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
  prize: string;
}

export default function GamingArenaPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeGame, setActiveGame] = useState<Game | null>(null);

  const games: Game[] = [
    {
      title: "FC 26",
      type: "Solo",
      pricing: "Rs 500 / person",
      teamSize: "1 Player (Solo)",
      vibe: "Intense competitive 1v1 console matches. Precision control, perfect tactics.",
      description: "Step onto the virtual pitch and dominate in FC 26. Face off against the city's finest players in a high-stakes, single-elimination tournament where only the most clinical finishes and tactical setups will lead to absolute glory.",
      image: "/modules/fifa.png",
      imagePosition: "center 30%",
      prize: "Rs 120K",
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
      prize: "Rs 120K",
    },
    {
      title: "PUBG",
      type: "Team",
      pricing: "Rs 2000 / team",
      teamSize: "4 Players (Team)",
      vibe: "Tactical battle royale squads. Communication, map control, survival instincts.",
      description: "Drop, loot, survive. Compete in our high-stakes PUBG Mobile championship. Assemble your 4-player squad and outmaneuver rival teams across multiple maps to secure the ultimate chicken dinner under custom competitive settings.",
      image: "/modules/pubg.png",
      imagePosition: "center 20%",
      prize: "Rs 120K",
    },
    {
      title: "Free Fire",
      type: "Team",
      pricing: "Rs 1500 / team",
      teamSize: "4 Players (Team)",
      vibe: "Fast-paced battle royale squad fights. Quick reflexes, close combat mastery.",
      description: "Jump into the fast-paced, high-octane battlegrounds of Free Fire. Put your squad's quick-thinking and survival tactics to the test in this premier squad battle royale series, featuring maximum competitiveness.",
      image: "/modules/free-fire.png",
      imagePosition: "center",
      prize: "Rs 120K",
    },
    {
      title: "Counter-Strike 2",
      type: "Team",
      pricing: "Rs 2000 / team",
      teamSize: "5 Players (Team)",
      vibe: "Tactical tactical shooter. Team cohesion, strategic executions, aim control.",
      description: "Tactical shooting reaches its peak in Counter-Strike 2. Perfect your smoke executes, coordinate site takes, and showcase absolute precision aiming. Compete under official competitive guidelines in a 5-player squad.",
      image: "/modules/cs-2.png",
      imagePosition: "center",
      prize: "Rs 120K",
    },
    {
      title: "Valorant",
      type: "Team",
      pricing: "Rs 2000 / team",
      teamSize: "5 Players (Team)",
      vibe: "High-octane tactical shooter. Agent ability synchronization, team strategies.",
      description: "Defy limits and claim your radiant rank. Valorant at Spectrum V1 brings intense tactical FPS action where mechanical skill meets tactical agency. Coordinate utility and execute perfect strategies with your 5-player team.",
      image: "/modules/valorant.png",
      imagePosition: "center",
      prize: "Rs 120K",
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
                <FaGamepad className="text-5xl text-black mr-4" />
                <h1 className={`${orbitron.className} text-5xl md:text-6xl font-extrabold text-black tracking-tight`}>
                  E-Sports
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[85rem] mx-auto px-4">
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
                  className="group relative cursor-pointer bg-neutral-950 rounded-[2rem] border border-neutral-800/80 overflow-hidden transition-all duration-500 hover:shadow-[0_30px_70px_rgba(0,0,0,0.4)] hover:border-white/40 hover:-translate-y-3 hover:scale-[1.02] h-72 sm:h-80 md:h-[22rem] lg:h-[24rem] shadow-2xl"
                >
                  {/* Full Bleed Background Image with full opacity and smooth zoom */}
                  <div 
                    className="absolute inset-0 bg-cover bg-no-repeat opacity-100 transition-all duration-700 ease-out group-hover:scale-105"
                    style={{
                      backgroundImage: `url('${game.image}')`,
                      backgroundPosition: game.imagePosition || "center"
                    }}
                  ></div>

                  {/* Elegant Gradient Overlay - Minimal & bright to let beautiful game art pop */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/35 transition-all duration-300 group-hover:from-black/85 group-hover:to-black/45"></div>
                  
                  {/* Card Content - Title at top left */}
                  <div className="absolute top-6 left-6 right-6">
                    <h3 className={`${orbitron.className} text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-wider leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]`}>
                      {game.title}
                    </h3>
                  </div>

                  {/* Centered Pill Button at the Bottom */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                    <span className={`${spaceGrotesk.className} px-6 py-2.5 bg-black text-white text-xs sm:text-sm font-bold rounded-full tracking-wider uppercase shadow-xl transition-all duration-300 border border-neutral-800/50 group-hover:bg-white group-hover:text-black group-hover:scale-105 inline-block whitespace-nowrap`}>
                      View Details
                    </span>
                  </div>
                </div>
              </TimelineContent>
            ))}
          </div>
        </div>

        {/* Dynamic Detail Modal */}
        {activeGame && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in transition-opacity duration-300">
            <div 
              className="relative bg-white border-2 border-black rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl transition-transform duration-500 scale-100"
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
                <h2 className={`${orbitron.className} text-2xl sm:text-4xl font-extrabold text-black uppercase`}>
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
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                    <span className={`${spaceGrotesk.className} text-xs font-bold text-black mt-1`}>{activeGame.prize}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setActiveGame(null)}
                  className={`${orbitron.className} flex-1 py-4 border border-black hover:bg-neutral-100 text-black font-bold rounded-2xl transition-all duration-300 text-xs sm:text-sm`}
                >
                  Cancel
                </button>
                <Link
                  href={`/register?category=E-Sports&game=${encodeURIComponent(activeGame.title)}`}
                  className={`${orbitron.className} flex-1 py-4 bg-black text-[#FFD700] hover:bg-neutral-900 text-center font-bold rounded-2xl transition-all duration-300 shadow-lg text-xs sm:text-sm`}
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
