"use client";

import { Orbitron, Space_Grotesk } from "next/font/google";
import Link from "next/link";
import { useState, useRef } from "react";
import {
  FaCode,
  FaMicrochip,
  FaRocket,
  FaShieldAlt,
  FaClock,
  FaUsers,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaTrophy,
  FaChevronDown,
  FaLightbulb,
  FaBalanceScale,
  FaCogs,
  FaCheckCircle,
  FaArrowRight,
  FaTimes,
  FaCoins,
  FaDownload
} from "react-icons/fa";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TimelineContent } from "@/components/timeline-animation";
import { HACKATHON_CONFIG, HackathonTrack } from "@/config/hackathon";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "700"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export default function HackathonPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<"eligibility" | "conduct" | "intellectual" | "integrity">("eligibility");
  const [activeTrack, setActiveTrack] = useState<HackathonTrack | null>(null);

  return (
    <>
      <Navbar />
      <main
        ref={sectionRef}
        className="relative min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 text-black overflow-x-hidden"
      >
        {/* Shiny Background Radial Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_20%,rgba(255,215,0,0.04)_0%,transparent_50%)] pointer-events-none"></div>

        {/* 1. Cinematic Hero Section */}
        <div className="relative pt-32 pb-20 px-6 min-h-screen flex flex-col justify-center items-center">
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
                <FaCode className="text-5xl md:text-6xl text-black mr-4" />
                <h1 className={`${orbitron.className} text-6xl sm:text-7xl md:text-8xl font-extrabold tracking-tight text-black`}>
                  HACKATHON
                </h1>
              </div>
            </TimelineContent>

            <TimelineContent animationNum={4} timelineRef={sectionRef} once={false} as="div">
              <div className="w-28 h-1 bg-gradient-to-r from-black via-[#FFD700] to-black mx-auto mb-8"></div>
            </TimelineContent>

            <TimelineContent animationNum={5} timelineRef={sectionRef} once={false} as="p">
              <p className={`${spaceGrotesk.className} text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed`}>
                Enter the elite arena of software architecture, engineering precision, and autonomous design. A premium 12-hour sprint targeting production-grade developments, agentic loops, and high-impact software MVPs.
              </p>
            </TimelineContent>

            <TimelineContent animationNum={6} timelineRef={sectionRef} once={false} as="div">
              <div className="flex flex-wrap justify-center gap-6 mt-10">
                <div className="flex items-center gap-3 px-5 py-3 border-2 border-black rounded-2xl bg-white shadow-md">
                  <FaTrophy className="text-[#C5A100] text-xl" />
                  <div className="text-left">
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Combined Reward Pool</p>
                    <p className="text-sm font-bold text-black">Rs. 200,000 Cash Award</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 px-5 py-3 border-2 border-black rounded-2xl bg-white shadow-md">
                  <FaClock className="text-[#C5A100] text-xl" />
                  <div className="text-left">
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Battle Structure</p>
                    <p className="text-sm font-bold text-black">Solo & Team Arenas</p>
                  </div>
                </div>
              </div>
            </TimelineContent>
          </div>
        </div>

        {/* 3. Spectacular Hackathon Tracks Grid */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`${orbitron.className} text-3xl md:text-4xl font-bold mb-4 text-black`}>
              OPERATIONAL ARENAS
            </h2>
            <p className={`${spaceGrotesk.className} text-gray-600 max-w-xl mx-auto text-sm`}>
              Choose your domain of combat. Each track represents a separate ecosystem optimized for specialized innovation.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-[#FFD700] to-black mx-auto mt-4"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[85rem] mx-auto px-4">
            {Object.values(HACKATHON_CONFIG).map((track, index) => (
              <TimelineContent
                key={track.id}
                animationNum={8 + index}
                timelineRef={sectionRef}
                once={true}
                as="div"
              >
                <div 
                  onClick={() => setActiveTrack(track)} 
                  className="group relative cursor-pointer bg-neutral-950 rounded-[2rem] border border-neutral-800/80 overflow-hidden transition-all duration-500 hover:shadow-[0_30px_70px_rgba(0,0,0,0.4)] hover:border-white/40 hover:-translate-y-3 hover:scale-[1.02] h-72 sm:h-80 md:h-[22rem] lg:h-[24rem] shadow-2xl"
                >
                  {/* Background Image with Zoom Effect */}
                  <div 
                    className="absolute inset-0 bg-cover bg-no-repeat opacity-100 transition-all duration-700 ease-out group-hover:scale-105"
                    style={{
                      backgroundImage: `url('${track.image}')`,
                      backgroundPosition: track.imagePosition || "center"
                    }}
                  ></div>
                  
                  {/* Elegant Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/35 transition-all duration-300 group-hover:from-black/85 group-hover:to-black/45"></div>

                  {/* Card Content - Title at top left */}
                  <div className="absolute top-6 left-6 right-6">
                    <h3 className={`${orbitron.className} text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-wider leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]`}>
                      {track.title}
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
        </section>

        {/* Dynamic Detail Modal */}
        {activeTrack && (
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
                onClick={() => setActiveTrack(null)}
                className="absolute top-6 right-6 p-2 rounded-full border border-gray-200 hover:bg-black hover:text-white transition-all duration-300 z-10 bg-white"
              >
                <FaTimes size={18} />
              </button>

              {/* Header Title */}
              <div className="mb-6">
                <span className={`${spaceGrotesk.className} inline-block px-4 py-1.5 text-xs font-bold bg-[#FFD700] text-black rounded-full mb-3 shadow`}>
                  {activeTrack.format} Competition
                </span>
                <h2 className={`${orbitron.className} text-3xl md:text-4xl font-extrabold text-black uppercase pr-10`}>
                  {activeTrack.title}
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-[#FFD700] to-black mt-2"></div>
              </div>

              {/* Description */}
              <div className="space-y-6 mb-8">
                <p className={`${spaceGrotesk.className} text-base text-gray-700 leading-relaxed`}>
                  {activeTrack.description}
                </p>

                {/* Vibe description */}
                <div className="p-4 bg-neutral-50 rounded-xl border border-gray-200">
                  <p className={`${spaceGrotesk.className} text-sm font-semibold text-black italic`}>
                    &ldquo;{activeTrack.tagline}&rdquo;
                  </p>
                </div>

                {/* Meta details list */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center justify-center p-3 bg-neutral-50 rounded-xl border border-gray-100 text-center">
                    <FaUsers className="text-[#C5A100] text-lg mb-1" />
                    <span className={`${spaceGrotesk.className} text-[0.65rem] text-gray-400 uppercase tracking-wider`}>Team Size</span>
                    <span className={`${spaceGrotesk.className} text-xs font-bold text-black mt-1`}>{activeTrack.teamSize}</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-3 bg-neutral-50 rounded-xl border border-gray-100 text-center">
                    <FaCoins className="text-[#C5A100] text-lg mb-1" />
                    <span className={`${spaceGrotesk.className} text-[0.65rem] text-gray-400 uppercase tracking-wider`}>Pricing</span>
                    <span className={`${spaceGrotesk.className} text-[10px] sm:text-xs font-bold text-black mt-1 leading-tight`}>{activeTrack.entryFee}</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-3 bg-neutral-50 rounded-xl border border-gray-100 text-center">
                    <FaTrophy className="text-[#C5A100] text-lg mb-1" />
                    <span className={`${spaceGrotesk.className} text-[0.65rem] text-gray-400 uppercase tracking-wider`}>Prize Pool</span>
                    <span className={`${spaceGrotesk.className} text-xs font-bold text-black mt-1`}>{activeTrack.prizePool}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setActiveTrack(null)}
                  className={`${orbitron.className} flex-1 py-4 border border-black hover:bg-neutral-100 text-black font-bold rounded-2xl transition-all duration-300 text-xs sm:text-sm`}
                >
                  Cancel
                </button>
                {activeTrack.handbookUrl && (
                  <Link
                    href={activeTrack.handbookUrl}
                    download
                    className={`${orbitron.className} flex-1 py-4 bg-neutral-100 border border-neutral-300 hover:bg-neutral-200 text-black text-center font-bold rounded-2xl transition-all duration-300 text-xs sm:text-sm flex items-center justify-center gap-2`}
                  >
                    <FaDownload className="text-xs" /> Handbook
                  </Link>
                )}
                <Link
                  href={`/register?category=Hackathon&track=${encodeURIComponent(activeTrack.title)}`}
                  className={`${orbitron.className} flex-1 py-4 bg-black text-[#FFD700] hover:bg-neutral-900 text-center font-bold rounded-2xl transition-all duration-300 shadow-lg text-xs sm:text-sm`}
                >
                  Register Now
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* 6. Team Rules Section */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className={`${orbitron.className} text-3xl md:text-4xl font-bold mb-4 text-black`}>
                REGULATIONS & BOUNDARIES
              </h2>
              <p className={`${spaceGrotesk.className} text-gray-600 max-w-xl mx-auto text-sm`}>
                Ensure compliance. Violations of code guidelines result in automated systems disqualifications.
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-[#FFD700] to-black mx-auto mt-4"></div>
            </div>

            {/* Cybernetic Tabs */}
            <div className="flex justify-center gap-4 mb-10 border-b border-gray-200 pb-4 overflow-x-auto scrollbar-none">
              {[
                { id: "eligibility", label: "Participation Bounds" },
                { id: "conduct", label: "Rules of Combat" },
                { id: "integrity", label: "AI & Integrity Policies" },
                { id: "intellectual", label: "IP Ownership" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
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

            {/* Tab Contents */}
            <div className="p-8 rounded-3xl border-2 border-black bg-gray-50 min-h-[220px]">
              {activeTab === "eligibility" && (
                <ul className="space-y-4 text-sm text-gray-700">
                  <li className="flex gap-3">
                    <span className="text-[#B8860B] font-bold">01.</span>
                    <span>All university and college students (Bachelor / Master) are eligible to participate. Cross-university team combinations are permitted.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#B8860B] font-bold">02.</span>
                    <span>All three tracks support Solo, Duo, or Triplet registrations (1 to 3 participants per team).</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#B8860B] font-bold">03.</span>
                    <span>Participants must bring their own hardware, development systems, chargers, and pre-installed tools. Stable internet and power access will be allocated in all workspace zones.</span>
                  </li>
                </ul>
              )}

              {activeTab === "conduct" && (
                <ul className="space-y-4 text-sm text-gray-700">
                  <li className="flex gap-3">
                    <span className="text-[#B8860B] font-bold">01.</span>
                    <span>All building must take place during the official Day 1 sprint hours. Bringing pre-built products, analysis files, or codebases is strictly forbidden and results in disqualification.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#B8860B] font-bold">02.</span>
                    <span>Submissions must freeze exactly at the 6:00 PM code freeze deadline on Day 1. Late submissions will not be scored.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#B8860B] font-bold">03.</span>
                    <span>Live demonstrations of working products are mandatory on Day 2. Video recordings, static mockups, or slides-only presentations will receive a score of zero on the product and usability dimension.</span>
                  </li>
                </ul>
              )}

              {activeTab === "integrity" && (
                <ul className="space-y-4 text-sm text-gray-700">
                  <li className="flex gap-3">
                    <span className="text-[#B8860B] font-bold">01.</span>
                    <span>AI usage policies vary by track: Vibe & Pitch has zero restrictions on LLMs or AI assistants (Cursor, v0, Lovable, Claude Code are fully allowed). AI & DS allows public pre-trained models with proper citations. Competitive Programming strictly prohibits all AI code generators.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#B8860B] font-bold">02.</span>
                    <span>Manual and automated checks will be conducted post-sprint. Codebases and Jupyter notebooks will be analyzed for plagiarism, code similarity, and integrity violations.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#B8860B] font-bold">03.</span>
                    <span>Violation of any integrity policy at any stage of the hackathon will result in immediate disqualification with no registration refund.</span>
                  </li>
                </ul>
              )}

              {activeTab === "intellectual" && (
                <ul className="space-y-4 text-sm text-gray-700">
                  <li className="flex gap-3">
                    <span className="text-[#B8860B] font-bold">01.</span>
                    <span>All prototypes engineered belong completely to the participants. DHA Suffa University and Spectrum retain zero intellectual claims or equity.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#B8860B] font-bold">02.</span>
                    <span>Leveraging open-source boilerplates, AI APIs, and visual component models is fully allowed, provided all APIs are correctly referenced in final submissions.</span>
                  </li>
                </ul>
              )}
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
