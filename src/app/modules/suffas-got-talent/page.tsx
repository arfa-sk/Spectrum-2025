"use client";

import { Orbitron, Space_Grotesk } from "next/font/google";
import Link from "next/link";
import { useState, useRef } from "react";
import {
  FaPuzzlePiece,
  FaTimes,
  FaTrophy,
  FaUsers,
  FaCoins,
  FaClock,
  FaDownload,
  FaCalendarAlt,
} from "react-icons/fa";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TimelineContent } from "@/components/timeline-animation";
import {
  CREATIVE_GAMES,
  PENTA_ARCADE_META,
  type CreativeGame,
} from "@/config/creativeCompetition";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "700"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export default function SuffasGotTalentPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeGame, setActiveGame] = useState<CreativeGame | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "qualification" | "scoring" | "safety">("overview");

  const games = Object.values(CREATIVE_GAMES);
  const meta = PENTA_ARCADE_META;

  return (
    <>
      <Navbar />
      <main
        ref={sectionRef}
        className="relative min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 text-black overflow-x-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_20%,rgba(255,215,0,0.04)_0%,transparent_50%)] pointer-events-none" />

        {/* Hero */}
        <div className="relative pt-32 pb-20 px-6 min-h-[70vh] flex flex-col justify-center items-center">
          <div className="max-w-6xl mx-auto text-center relative z-10 w-full mt-10">
            <TimelineContent animationNum={1} timelineRef={sectionRef} once={false} as="div">
              <Link
                href="/#modules"
                className={`${spaceGrotesk.className} inline-flex items-center text-sm text-gray-500 hover:text-black transition-colors mb-12`}
              >
                ← Back to Modules
              </Link>
            </TimelineContent>

            <TimelineContent animationNum={2} timelineRef={sectionRef} once={false} as="div">
              <div className="flex items-center justify-center mb-6">
                <FaPuzzlePiece className="text-4xl sm:text-5xl text-black mr-4" />
                <h1 className={`${orbitron.className} text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-black`}>
                  CREATIVE COMPETITION
                </h1>
              </div>
            </TimelineContent>

            <TimelineContent animationNum={3} timelineRef={sectionRef} once={false} as="p">
              <p className={`${spaceGrotesk.className} text-sm sm:text-base text-[#B8860B] uppercase tracking-[0.25em] font-bold mb-4`}>
                {meta.title}
              </p>
            </TimelineContent>

            <TimelineContent animationNum={4} timelineRef={sectionRef} once={false} as="div">
              <div className="w-28 h-1 bg-gradient-to-r from-black via-[#FFD700] to-black mx-auto mb-8" />
            </TimelineContent>

            <TimelineContent animationNum={5} timelineRef={sectionRef} once={false} as="p">
              <p className={`${spaceGrotesk.className} text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed`}>
                {meta.description}
              </p>
            </TimelineContent>

            <TimelineContent animationNum={6} timelineRef={sectionRef} once={false} as="div">
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-10">
                <div className="flex items-center gap-3 px-5 py-3 border-2 border-black rounded-2xl bg-white shadow-md">
                  <FaPuzzlePiece className="text-[#C5A100] text-xl" />
                  <div className="text-left">
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Total Games</p>
                    <p className="text-sm font-bold text-black">5 (4 + 1 Surprise)</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 px-5 py-3 border-2 border-black rounded-2xl bg-white shadow-md">
                  <FaUsers className="text-[#C5A100] text-xl" />
                  <div className="text-left">
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Team Format</p>
                    <p className="text-sm font-bold text-black">5 Members / Squad</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 px-5 py-3 border-2 border-black rounded-2xl bg-white shadow-md">
                  <FaCalendarAlt className="text-[#C5A100] text-xl" />
                  <div className="text-left">
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Duration</p>
                    <p className="text-sm font-bold text-black">3-Day Event</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 px-5 py-3 border-2 border-black rounded-2xl bg-white shadow-md">
                  <FaCoins className="text-[#C5A100] text-xl" />
                  <div className="text-left">
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Registration</p>
                    <p className="text-sm font-bold text-black">{meta.entryFee}</p>
                  </div>
                </div>
              </div>
            </TimelineContent>
          </div>
        </div>

        {/* Game Grid */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`${orbitron.className} text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-black`}>
              ANNOUNCED GAME POOL
            </h2>
            <p className={`${spaceGrotesk.className} text-gray-600 max-w-xl mx-auto text-sm`}>
              Four announced games across Day 1 and Day 2, plus one surprise finale on Day 3. Exact day-wise order managed by the organizing team.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-[#FFD700] to-black mx-auto mt-4" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[85rem] mx-auto px-4">
            {games.map((game, index) => (
              <TimelineContent
                key={game.id}
                animationNum={8 + index}
                timelineRef={sectionRef}
                once={true}
                as="div"
              >
                <div
                  onClick={() => setActiveGame(game)}
                  className="group relative cursor-pointer bg-neutral-950 rounded-[2rem] border border-neutral-800/80 overflow-hidden transition-all duration-500 hover:shadow-[0_30px_70px_rgba(0,0,0,0.4)] hover:border-white/40 hover:-translate-y-3 hover:scale-[1.02] h-72 sm:h-80 md:h-[22rem] shadow-2xl"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-no-repeat opacity-100 transition-all duration-700 ease-out group-hover:scale-105"
                    style={{
                      backgroundImage: `url('${game.image}')`,
                      backgroundPosition: game.imagePosition || "center",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40 transition-all duration-300 group-hover:from-black/90" />

                  <div className="absolute top-6 left-6 right-6">
                    {game.gameType === "surprise" && (
                      <span className={`${spaceGrotesk.className} inline-block px-3 py-1 text-[10px] font-bold bg-[#FFD700] text-black rounded-full mb-3 uppercase tracking-wider`}>
                        Day 3 Finale
                      </span>
                    )}
                    <h3 className={`${orbitron.className} text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-wider leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]`}>
                      {game.title}
                    </h3>
                  </div>

                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                    <span className={`${spaceGrotesk.className} px-6 py-2.5 bg-black text-white text-xs sm:text-sm font-bold rounded-full tracking-wider uppercase shadow-xl transition-all duration-300 border border-neutral-800/50 group-hover:bg-white group-hover:text-black group-hover:scale-105 inline-block whitespace-nowrap`}>
                      View Details
                    </span>
                  </div>
                </div>
              </TimelineContent>
            ))}
          </div>
        </section>

        {/* Game Modal */}
        {activeGame && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
            <div className="relative bg-white border-2 border-black rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl">
              <button
                onClick={() => setActiveGame(null)}
                className="absolute top-6 right-6 p-2 rounded-full border border-gray-200 hover:bg-black hover:text-white transition-all duration-300 z-10 bg-white"
              >
                <FaTimes size={18} />
              </button>

              <div className="mb-6">
                <span className={`${spaceGrotesk.className} inline-block px-4 py-1.5 text-xs font-bold bg-[#FFD700] text-black rounded-full mb-3 shadow`}>
                  {activeGame.gameType === "surprise" ? "Surprise Finale" : "Announced Game"}
                </span>
                <h2 className={`${orbitron.className} text-2xl sm:text-3xl md:text-4xl font-extrabold text-black uppercase pr-10`}>
                  {activeGame.title}
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-[#FFD700] to-black mt-2" />
              </div>

              <div className="space-y-6 mb-8">
                <p className={`${spaceGrotesk.className} text-base text-gray-700 leading-relaxed`}>
                  {activeGame.description}
                </p>
                <div className="p-4 bg-neutral-50 rounded-xl border border-gray-200">
                  <p className={`${spaceGrotesk.className} text-sm font-semibold text-black italic`}>
                    &ldquo;{activeGame.tagline}&rdquo;
                  </p>
                </div>

                <div>
                  <h4 className={`${orbitron.className} text-sm font-bold text-black mb-3 uppercase tracking-wider`}>Rules</h4>
                  <ul className={`${spaceGrotesk.className} space-y-2 text-sm text-gray-700`}>
                    {activeGame.rules.map((rule, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-[#B8860B] font-bold shrink-0">•</span>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {activeGame.scoring && activeGame.scoring.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeGame.scoring.map((s) => (
                      <div key={s.action} className="p-3 bg-neutral-50 rounded-xl border border-gray-100 text-center">
                        <span className={`${spaceGrotesk.className} text-[0.65rem] text-gray-400 uppercase tracking-wider block`}>{s.action}</span>
                        <span className={`${spaceGrotesk.className} text-xs font-bold text-black mt-1 block`}>{s.points}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setActiveGame(null)}
                  className={`${orbitron.className} flex-1 py-4 border border-black hover:bg-neutral-100 text-black font-bold rounded-2xl transition-all duration-300 text-xs sm:text-sm`}
                >
                  Close
                </button>
                <Link
                  href={`/modules/suffas-got-talent/${activeGame.id}`}
                  className={`${orbitron.className} flex-1 py-4 bg-neutral-100 border border-neutral-300 hover:bg-neutral-200 text-black text-center font-bold rounded-2xl transition-all duration-300 text-xs sm:text-sm`}
                >
                  Full Details
                </Link>
                <Link
                  href="/register?category=Play%20To%20Win&game=Penta%20Arcade"
                  className={`${orbitron.className} flex-1 py-4 bg-black text-[#FFD700] hover:bg-neutral-900 text-center font-bold rounded-2xl transition-all duration-300 shadow-lg text-xs sm:text-sm`}
                >
                  Register Team
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Regulations */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className={`${orbitron.className} text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-black`}>
                COMPETITION GUIDELINES
              </h2>
              <p className={`${spaceGrotesk.className} text-gray-600 max-w-xl mx-auto text-sm`}>
                Qualification flow, scoring, and safety policies for Penta Arcade.
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-[#FFD700] to-black mx-auto mt-4" />
            </div>

            <div className="flex justify-center gap-4 mb-10 border-b border-gray-200 pb-4 overflow-x-auto scrollbar-none">
              {[
                { id: "overview", label: "Timeline" },
                { id: "qualification", label: "Qualification Flow" },
                { id: "scoring", label: "Scoring System" },
                { id: "safety", label: "Safety & Integrity" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`${orbitron.className} px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors duration-300 whitespace-nowrap ${
                    activeTab === tab.id
                      ? "text-[#B8860B] border-b-2 border-[#FFD700]"
                      : "text-gray-500 hover:text-black"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-6 sm:p-8 rounded-3xl border-2 border-black bg-gray-50 min-h-[220px]">
              {activeTab === "overview" && (
                <ul className="space-y-4 text-sm text-gray-700">
                  {meta.timeline.map((item, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="text-[#B8860B] font-bold shrink-0">{String(idx + 1).padStart(2, "0")}.</span>
                      <span><strong>{item.time}:</strong> {item.event}</span>
                    </li>
                  ))}
                </ul>
              )}

              {activeTab === "qualification" && (
                <div className="overflow-x-auto">
                  <table className={`${spaceGrotesk.className} w-full text-xs sm:text-sm text-left`}>
                    <thead>
                      <tr className="border-b border-gray-300">
                        <th className="py-2 pr-4 font-bold">Stage</th>
                        <th className="py-2 pr-4 font-bold">Participants</th>
                        <th className="py-2 pr-4 font-bold">Games</th>
                        <th className="py-2 font-bold">Outcome</th>
                      </tr>
                    </thead>
                    <tbody>
                      {meta.qualificationFlow.map((row) => (
                        <tr key={row.stage} className="border-b border-gray-200">
                          <td className="py-3 pr-4 font-semibold">{row.stage}</td>
                          <td className="py-3 pr-4">{row.participants}</td>
                          <td className="py-3 pr-4">{row.games}</td>
                          <td className="py-3">{row.outcome}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === "scoring" && (
                <ul className="space-y-3 text-sm text-gray-700">
                  {meta.scoringSystem.map((s, idx) => (
                    <li key={idx} className="flex justify-between gap-4 border-b border-gray-200 pb-2">
                      <span>{s.action}</span>
                      <span className="font-bold text-[#B8860B] shrink-0">{s.points}</span>
                    </li>
                  ))}
                </ul>
              )}

              {activeTab === "safety" && (
                <ul className="space-y-4 text-sm text-gray-700">
                  {meta.integrityPolicy.map((rule, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="text-[#B8860B] font-bold shrink-0">{String(idx + 1).padStart(2, "0")}.</span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={meta.handbookUrl}
                download
                className={`${orbitron.className} inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-black bg-white hover:bg-neutral-100 text-black font-bold rounded-2xl text-xs sm:text-sm uppercase tracking-wider`}
              >
                <FaDownload /> Download Handbook
              </Link>
              <Link
                href="/register?category=Play%20To%20Win&game=Penta%20Arcade"
                className={`${orbitron.className} inline-flex items-center justify-center gap-2 px-8 py-4 bg-black text-[#FFD700] hover:bg-neutral-900 font-bold rounded-2xl text-xs sm:text-sm uppercase tracking-wider shadow-lg`}
              >
                Register Your Team
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </main>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.25s ease-out forwards;
        }
      `}</style>
    </>
  );
}
