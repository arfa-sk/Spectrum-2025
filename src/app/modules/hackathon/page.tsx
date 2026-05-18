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
  FaArrowRight
} from "react-icons/fa";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TimelineContent } from "@/components/timeline-animation";
import { HACKATHON_CONFIG, HACKATHON_FAQS } from "@/config/hackathon";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "700"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export default function HackathonPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"eligibility" | "conduct" | "intellectual">("eligibility");

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <>
      <Navbar />
      <main
        ref={sectionRef}
        className="relative min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 text-black overflow-hidden pb-12"
      >
        {/* Shiny Background Radial Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_20%,rgba(255,215,0,0.04)_0%,transparent_50%)] pointer-events-none"></div>

        {/* 1. Cinematic Hero Section */}
        <div className="relative pt-32 pb-20 px-6">
          <div className="max-w-6xl mx-auto text-center relative z-10">
            

            <TimelineContent animationNum={2} timelineRef={sectionRef} once={false} as="div">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center border-2 border-[#C5A100] shadow-lg relative group transition-transform duration-500 hover:rotate-12">
                  {/* Glow */}
                  <div className="absolute inset-0 bg-[#FFD700] rounded-2xl blur-md opacity-25"></div>
                  <FaCode className="text-[#FFD700] text-3xl relative z-10" />
                </div>
              </div>
            </TimelineContent>

            <TimelineContent animationNum={3} timelineRef={sectionRef} once={false} as="h1">
              <h1 className={`${orbitron.className} text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6 text-black`}>
                SPECTRUM <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-[#C5A100] to-[#B8860B]">HACKATHON</span>
              </h1>
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

        {/* 2. Storytelling / Vision Section */}
        <section className="py-20 px-6 border-y-2 border-black bg-white relative">
          <div className="max-w-4xl mx-auto text-center">
            <TimelineContent animationNum={7} timelineRef={sectionRef} once={true} as="div">
              <span className="text-xs font-bold text-[#B8860B] uppercase tracking-widest block mb-4">// Core Philosophy</span>
              <h2 className={`${orbitron.className} text-2xl md:text-3xl font-bold mb-8 text-black leading-tight`}>
                "WE ARE NOT JUST WRITING CODE. WE ARE DESIGNING COGNITIVE LOOPS TO SHAPE DIGITAL INFRASTRUCTURE."
              </h2>
              <div className="w-16 h-[2px] bg-[#FFD700] mx-auto mb-8"></div>
              <p className={`${spaceGrotesk.className} text-gray-700 leading-relaxed text-lg max-w-3xl mx-auto`}>
                The Spectrum Hackathon is engineered for the elite. We reject standard, uninspired task lists. Here, developers are pushed to think like systems architects, cybersecurity operatives, and autonomous engineers. Whether you are debugging on the microsecond level or configuring self-prompting AI workflows, your creations must be ready to deploy and designed to disrupt.
              </p>
            </TimelineContent>
          </div>
        </section>

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

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {Object.values(HACKATHON_CONFIG).map((track, index) => (
              <TimelineContent
                key={track.id}
                animationNum={8 + index}
                timelineRef={sectionRef}
                once={true}
                as="div"
              >
                <Link href={`/modules/hackathon/${track.id}`} className="group block">
                  <div className="relative h-96 rounded-3xl border-2 border-black overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-2">
                    
                    {/* Background Image with Zoom Effect */}
                    <div 
                      className="absolute inset-0 bg-cover bg-no-repeat transition-transform duration-700 group-hover:scale-110"
                      style={{
                        backgroundImage: `url('${track.image}')`,
                        backgroundPosition: track.imagePosition || "center"
                      }}
                    ></div>
                    
                    {/* Sleek Black Gradient Overlay for High Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/10 opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>

                    {/* Content Container */}
                    <div className="relative z-10 h-full flex flex-col justify-between p-8 text-white">
                      
                      {/* Top Row: Format & Status */}
                      <div className="flex justify-between items-start">
                        <span className={`${spaceGrotesk.className} inline-block bg-gradient-to-r from-[#FFD700] via-[#C5A100] to-[#B8860B] text-black text-[10px] font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-md`}>
                          {track.format}
                        </span>
                        <div className="text-right text-[10px] text-gray-300 uppercase tracking-widest font-bold bg-black/45 px-3 py-1 rounded-md border border-white/10">
                          {track.duration} Sprint
                        </div>
                      </div>

                      {/* Middle: Title & Tagline */}
                      <div>
                        <h3 className={`${orbitron.className} text-2xl font-bold text-[#FFD700] drop-shadow-md group-hover:text-white transition-colors duration-300`}>
                          {track.title}
                        </h3>
                        <p className={`${spaceGrotesk.className} text-xs font-semibold text-gray-200 mt-1.5 uppercase tracking-widest`}>
                          {track.tagline}
                        </p>
                        <p className={`${spaceGrotesk.className} text-xs text-gray-300 mt-3 leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity`}>
                          {track.description.length > 120 ? `${track.description.slice(0, 120)}...` : track.description}
                        </p>
                      </div>

                      {/* Bottom: Specs Row & CTA */}
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-2 border-t border-white/20 pt-4 text-left">
                          <div>
                            <p className="text-[9px] text-gray-400 uppercase tracking-widest">Grand Cash Prize</p>
                            <p className="text-sm font-bold text-[#FFD700]">{track.prizePool}</p>
                          </div>
                          <div>
                            <p className="text-[9px] text-gray-400 uppercase tracking-widest">Entry Fee</p>
                            <p className="text-sm font-bold text-white">{track.entryFee}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <span className={`${spaceGrotesk.className} text-xs font-bold uppercase tracking-wider group-hover:translate-x-1.5 transition-transform duration-300`}>
                            Explore Specifications
                          </span>
                          <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center border-2 border-black group-hover:border-[#C5A100] group-hover:bg-gradient-to-br group-hover:from-[#FFD700] group-hover:to-[#B8860B] transition-all duration-300 shadow-md">
                            <FaArrowRight className="text-[#FFD700] group-hover:text-black text-sm transition-colors duration-300" />
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </Link>
              </TimelineContent>
            ))}
          </div>
        </section>

        {/* 4. Mega Prize Pool Section */}
        <section className="py-24 px-6 border-y-2 border-black bg-white relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-12 gap-12 items-center">
              
              <div className="md:col-span-7">
                <TimelineContent animationNum={12} timelineRef={sectionRef} once={true} as="div">
                  <span className="text-xs font-bold text-[#B8860B] uppercase tracking-widest block mb-2">// Bounty Matrix</span>
                  <h2 className={`${orbitron.className} text-3xl md:text-4xl font-bold mb-6 text-black`}>
                    MEGA PRIZE SPLIT
                  </h2>
                  <p className={`${spaceGrotesk.className} text-gray-700 text-sm leading-relaxed mb-6`}>
                    Every track in the Spectrum V2 Hackathon carries an identical, high-stakes cash payout. We ensure equal prestige and equal reward across all operational sub-modules. No slashed prices or generic tokens—strictly cash payouts for elite solutions.
                  </p>
                  <ul className="space-y-3">
                    {Object.values(HACKATHON_CONFIG).map((track) => (
                      <li key={track.id} className="flex items-center gap-3 text-sm text-gray-700">
                        <FaCheckCircle className="text-[#C5A100]" />
                        <span className="font-semibold text-black">{track.title}</span>: 
                        <span className="font-bold text-[#B8860B]">{track.prizePool} Cash Award</span>
                      </li>
                    ))}
                  </ul>
                </TimelineContent>
              </div>

              <div className="md:col-span-5 flex justify-center">
                <TimelineContent animationNum={13} timelineRef={sectionRef} once={true} as="div">
                  <div className="relative p-8 rounded-3xl border-2 border-black bg-white text-center shadow-xl max-w-sm">
                    {/* Glowing Accent */}
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-[#FFD700]/20 rounded-full blur-xl"></div>
                    
                    <span className="text-xs uppercase text-gray-500 font-bold tracking-wider block mb-2">Combined Pool Cash</span>
                    <p className={`${orbitron.className} text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-[#C5A100] to-[#B8860B]`}>
                      Rs. 200,000
                    </p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-2 border-t border-gray-200 pt-3 font-bold">
                      Direct Cash Distribution Matrix
                    </p>
                    <div className="mt-6">
                      <Link 
                        href="/register?category=Hackathon"
                        className={`${orbitron.className} block w-full py-4 rounded-xl bg-gradient-to-r from-black to-gray-800 text-[#FFD700] hover:bg-gradient-to-r hover:from-[#FFD700] hover:to-[#B8860B] hover:text-black border-2 border-black font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md`}
                      >
                        Secure Your Spot
                      </Link>
                    </div>
                  </div>
                </TimelineContent>
              </div>

            </div>
          </div>
        </section>

        {/* 5. Chronological Timeline */}
        <section className="py-24 px-6 max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`${orbitron.className} text-3xl md:text-4xl font-bold mb-4 text-black`}>
              OPERATIONAL TIMELINE
            </h2>
            <p className={`${spaceGrotesk.className} text-gray-600 max-w-xl mx-auto text-sm`}>
              Track your sequence of events. The engineering sprint is structured to test resilience, architecture, and pitch preparedness.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-[#FFD700] to-black mx-auto mt-4"></div>
          </div>

          <div className="relative border-l-2 border-black pl-8 ml-4 space-y-12">
            <div className="absolute top-0 left-[-2px] w-[2px] h-full bg-gradient-to-b from-[#FFD700] via-black to-transparent"></div>
            
            {[
              { time: "08:00 AM", title: "Global Developer Check-In", desc: "Reporting, hardware setup allocations, and network environment authentication checks." },
              { time: "09:00 AM", title: "API Keys Activation & Hacking Start", desc: "All system parameters unlocked. Development begins live across all operational labs." },
              { time: "02:00 PM", title: "Architectural Mentorship Checks", desc: "One-on-one evaluations with engineering leads to debug architectural hurdles and state parameters." },
              { time: "08:00 PM", title: "Repository Freeze & Deployments", desc: "Absolute code freeze. Deployed builds must be pushed live and repositories locked for auditing." },
              { time: "08:30 PM", title: "VC Pitch Arena & Live Demos", desc: "Teams defend their systems, interfaces, and startup designs before the venture jury panel." }
            ].map((step, idx) => (
              <TimelineContent key={idx} animationNum={14 + idx} timelineRef={sectionRef} once={true} as="div">
                <div className="relative">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[42px] top-1.5 w-6 h-6 rounded-full border-4 border-white bg-gradient-to-r from-[#FFD700] to-[#B8860B] shadow-md"></div>
                  
                  <div className="p-6 rounded-3xl border-2 border-black bg-white hover:shadow-lg transition-all duration-300">
                    <span className="text-xs font-bold text-[#B8860B] uppercase tracking-widest">{step.time}</span>
                    <h3 className={`${orbitron.className} text-xl font-bold text-black mt-1 mb-2`}>{step.title}</h3>
                    <p className={`${spaceGrotesk.className} text-sm text-gray-600`}>{step.desc}</p>
                  </div>
                </div>
              </TimelineContent>
            ))}
          </div>
        </section>

        {/* 6. Team Rules Section */}
        <section className="py-24 px-6 border-t-2 border-black bg-white">
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
            <div className="flex justify-center gap-4 mb-10 border-b border-gray-200 pb-4">
              {[
                { id: "eligibility", label: "Participation Bounds" },
                { id: "conduct", label: "Rules of Combat" },
                { id: "intellectual", label: "IP & Frameworks" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`${orbitron.className} px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${
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
                    <span>Solo participants are allowed to register strictly for the <strong>Speed Programming Challenge</strong>. All other tracks require teams of 2 to 4 members.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#B8860B] font-bold">03.</span>
                    <span>Participants must bring their own hardware, chargers, and development kits. Stable high-speed Wi-Fi and server nodes will be allocated at registration desks.</span>
                  </li>
                </ul>
              )}

              {activeTab === "conduct" && (
                <ul className="space-y-4 text-sm text-gray-700">
                  <li className="flex gap-3">
                    <span className="text-[#B8860B] font-bold">01.</span>
                    <span>All code repositories must begin empty or from documented, open-source template configurations. Zero pre-built private solutions are allowed.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#B8860B] font-bold">02.</span>
                    <span>Any automated DDOS or penetration attempts on grading tools, servers, or other competitor hardware triggers immediate DQ.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#B8860B] font-bold">03.</span>
                    <span>Repository sync logs will be actively checked. Continuous commits are required during the 12-hour period.</span>
                  </li>
                </ul>
              )}

              {activeTab === "intellectual" && (
                <ul className="space-y-4 text-sm text-gray-700">
                  <li className="flex gap-3">
                    <span className="text-[#B8860B] font-bold">01.</span>
                    <span>All prototypes engineered belong completely to the participants. Spectrum retains zero intellectual claims or equity.</span>
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

        {/* 7. Judging Criteria Section */}
        <section className="py-24 px-6 max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`${orbitron.className} text-3xl md:text-4xl font-bold mb-4 text-black`}>
              SCORING MATRIX DESIGN
            </h2>
            <p className={`${spaceGrotesk.className} text-gray-600 max-w-xl mx-auto text-sm`}>
              Review what determines victory. Our venture capital and engineering judges analyze technical systems, performance, and commercial viability.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-[#FFD700] to-black mx-auto mt-4"></div>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { score: "35%", title: "Technical Accuracy", desc: "Clean loops, secure APIs, latency metrics, and optimal data structure choices." },
              { score: "30%", title: "Autonomy Loop", desc: "Effective problem-solving in open loops and structural workflow resilience." },
              { score: "20%", title: "Design Architecture", desc: "Futuristic visual layouts, responsive design, and intuitive UX navigation components." },
              { score: "15%", title: "VC Presentation Pitch", desc: "Communication elegance, target market defense, and live product demo confidence." }
            ].map((cell, idx) => (
              <div key={idx} className="p-6 rounded-3xl border-2 border-black bg-white text-center hover:scale-105 transition-transform duration-300 shadow-md">
                <p className={`${orbitron.className} text-4xl font-extrabold text-[#B8860B] mb-3`}>{cell.score}</p>
                <h3 className="text-sm font-bold mb-2 text-black">{cell.title}</h3>
                <p className={`${spaceGrotesk.className} text-xs text-gray-500 leading-relaxed`}>{cell.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 8. Scrolling Sponsors Panel */}
        <section className="py-16 border-y-2 border-black bg-white overflow-hidden">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <span className="text-xs uppercase text-gray-500 tracking-widest font-bold block mb-8">// Technical Alliances & Event Grant Partners</span>
            <div className="flex flex-wrap justify-center items-center gap-12 grayscale opacity-40 hover:grayscale-0 hover:opacity-85 transition-all duration-500">
              <span className={`${orbitron.className} text-2xl font-black tracking-widest text-black`}>RED BULL</span>
              <span className={`${orbitron.className} text-2xl font-black tracking-widest text-black`}>PEPSI CO</span>
              <span className={`${orbitron.className} text-2xl font-black tracking-widest text-black`}>DSU SYSTEMS</span>
            </div>
          </div>
        </section>

        {/* 9. Interactive FAQ Accordion */}
        <section className="py-24 px-6 max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`${orbitron.className} text-3xl md:text-4xl font-bold mb-4 text-black`}>
              COMMON FAQS ANSWERED
            </h2>
            <p className={`${spaceGrotesk.className} text-gray-600 max-w-xl mx-auto text-sm`}>
              Clear all operational confusion. Review standard procedures below.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-[#FFD700] to-black mx-auto mt-4"></div>
          </div>

          <div className="space-y-4">
            {HACKATHON_FAQS.map((faq, index) => (
              <div 
                key={index} 
                className="rounded-3xl border-2 border-black bg-white overflow-hidden transition-all duration-300 shadow-sm"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center p-6 text-left hover:bg-[#FFD700]/5 transition-colors"
                >
                  <span className={`${orbitron.className} font-bold text-sm text-black`}>{faq.question}</span>
                  <FaChevronDown 
                    className={`text-[#B8860B] text-xs transition-transform duration-300 ${
                      activeFaq === index ? "transform rotate-180" : ""
                    }`} 
                  />
                </button>
                
                {activeFaq === index && (
                  <div className="px-6 pb-6 border-t-2 border-gray-100 pt-4 bg-gray-50/50">
                    <p className={`${spaceGrotesk.className} text-sm text-gray-700 leading-relaxed`}>
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 10. Global Registration CTA */}
        <section className="py-20 px-6 max-w-4xl mx-auto text-center">
          <div className="relative p-12 rounded-3xl border-2 border-black bg-white shadow-xl">
            <span className="text-xs uppercase text-[#B8860B] tracking-widest font-bold block mb-4">// System Ready</span>
            <h2 className={`${orbitron.className} text-3xl sm:text-4xl font-bold mb-6 text-black`}>
              ARE YOU READY TO DEPLOY?
            </h2>
            <p className={`${spaceGrotesk.className} text-gray-600 text-sm max-w-xl mx-auto leading-relaxed mb-8`}>
              Access credentials, declare your stack, and register your team. Applications undergo instant automated verification processing.
            </p>
            <div className="flex justify-center">
              <Link 
                href="/register?category=Hackathon"
                className={`${orbitron.className} inline-block px-10 py-5 rounded-full bg-gradient-to-r from-black to-gray-800 text-[#FFD700] hover:bg-gradient-to-r hover:from-[#FFD700] hover:to-[#B8860B] hover:text-black font-extrabold text-sm uppercase tracking-widest hover:scale-105 transition-transform duration-300 shadow-md border-2 border-black`}
              >
                Commence Registration
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
