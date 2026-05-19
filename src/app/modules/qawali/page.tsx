"use client";

import { Orbitron, Space_Grotesk } from "next/font/google";
import Link from "next/link";
import { useRef } from "react";
import { FaMusic, FaCheckCircle, FaCalendarAlt, FaMapMarkerAlt, FaClock, FaArrowRight, FaTicketAlt, FaMicrophoneAlt, FaUsers } from "react-icons/fa";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TimelineContent } from "@/components/timeline-animation";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "700", "900"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export default function QawaliNightPage() {
  const sectionRef = useRef<HTMLElement>(null);

  const eventTimeline = [
    {
      time: "06:00 PM",
      title: "Gates Open & Seating",
      description: "Welcome to the grand auditorium. Ambient lighting and soft traditional music greet early arrivals under the open sky."
    },
    {
      time: "07:30 PM",
      title: "The Spiritual Awakening",
      description: "Opening recitation and welcome notes, followed by the introduction of the legendary Qawals of the night."
    },
    {
      time: "08:15 PM",
      title: "The Classic Renditions",
      description: "Opening with calm, deep classical ragas and highly spiritual kalams to set the baseline energy."
    },
    {
      time: "09:30 PM",
      title: "The Crescendo Battle",
      description: "High-octane clapping rhythms, dynamic vocal improvisations, and crowd-favorite Sufi anthems under brilliant light filters."
    },
    {
      time: "11:00 PM",
      title: "Closing Kalam & Farewells",
      description: "A final emotional rendition, leaving the audience with peace, unity, and unforgettable cultural memories."
    }
  ];

  return (
    <>
      <Navbar />
      <main
        ref={sectionRef}
        className="relative min-h-screen bg-[#050505] text-white overflow-hidden pb-20"
      >
        {/* Deep Ambient Amber Radial Glow Leak */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_20%,rgba(212,175,55,0.06)_0%,transparent_50%)] pointer-events-none"></div>
        <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-[#FFD700]/3 blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-[#B8860B]/2 blur-[120px] pointer-events-none"></div>

        {/* 1. Cinematic Hero Section */}
        <div className="relative pt-40 pb-24 px-6 border-b border-white/5">
          <div className="max-w-6xl mx-auto text-center relative z-10">
            <TimelineContent animationNum={1} timelineRef={sectionRef} once={false} as="div">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-neutral-900 border border-[#FFD700]/30 rounded-2xl flex items-center justify-center group hover:scale-110 hover:rotate-12 transition-all duration-500 shadow-[0_0_20px_rgba(255,215,0,0.05)]">
                  <FaMusic className="text-[#FFD700] text-2xl animate-pulse" />
                </div>
              </div>
            </TimelineContent>

            <TimelineContent animationNum={2} timelineRef={sectionRef} once={false} as="h1">
              <h1 className={`${orbitron.className} text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6 uppercase text-white leading-tight`}>
                Sufi <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-[#FFD700] to-yellow-600">Qawali</span> Night
              </h1>
            </TimelineContent>

            <TimelineContent animationNum={3} timelineRef={sectionRef} once={false} as="div">
              <div className="w-28 h-[2px] bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mx-auto mb-8"></div>
            </TimelineContent>

            <TimelineContent animationNum={4} timelineRef={sectionRef} once={false} as="p">
              <p className={`${spaceGrotesk.className} text-base md:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed`}>
                Experience a mystical journey of rhythm, poetry, and absolute spiritual ecstasy. An unforgettable open-sky night featuring world-class Sufi performance artists.
              </p>
            </TimelineContent>

            {/* Quick Details Badges */}
            <TimelineContent animationNum={5} timelineRef={sectionRef} once={false} as="div">
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-10">
                <div className="flex items-center gap-3 px-5 py-3 border border-white/10 rounded-2xl bg-neutral-900/60 backdrop-blur-md">
                  <FaCalendarAlt className="text-[#FFD700]" />
                  <div className="text-left text-xs font-semibold">
                    <p className="text-neutral-500 uppercase tracking-widest text-[9px]">Event Date</p>
                    <p className="text-neutral-200">May 30, 2026</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 px-5 py-3 border border-white/10 rounded-2xl bg-neutral-900/60 backdrop-blur-md">
                  <FaClock className="text-[#FFD700]" />
                  <div className="text-left text-xs font-semibold">
                    <p className="text-neutral-500 uppercase tracking-widest text-[9px]">Timing</p>
                    <p className="text-neutral-200">06:00 PM onwards</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 px-5 py-3 border border-white/10 rounded-2xl bg-neutral-900/60 backdrop-blur-md">
                  <FaMapMarkerAlt className="text-[#FFD700]" />
                  <div className="text-left text-xs font-semibold">
                    <p className="text-neutral-500 uppercase tracking-widest text-[9px]">Venue</p>
                    <p className="text-neutral-200">DSU Main Lawn</p>
                  </div>
                </div>
              </div>
            </TimelineContent>
          </div>
        </div>

        {/* 2. Emotional Storytelling Section */}
        <section className="py-24 px-6 border-b border-white/5 relative bg-neutral-950/20">
          <div className="max-w-4xl mx-auto text-center">
            <TimelineContent animationNum={6} timelineRef={sectionRef} once={true} as="div">
              <span className={`${spaceGrotesk.className} text-[10px] font-bold text-[#FFD700] uppercase tracking-[0.4em] block mb-4`}>
                // The Cultural Lore
              </span>
              <h2 className={`${orbitron.className} text-2xl md:text-3xl font-extrabold mb-8 text-neutral-100 leading-snug max-w-2xl mx-auto`}>
                "IN THE REPETITIVE CLAP OF THE QAWALI, MIND DISSOLVES AND ONLY MUSIC REMAINS."
              </h2>
              <div className="w-16 h-[1px] bg-[#FFD700]/30 mx-auto mb-8"></div>
              <p className={`${spaceGrotesk.className} text-neutral-400 leading-relaxed text-sm md:text-base max-w-3xl mx-auto space-y-4`}>
                Qawali is not merely an auditory experience; it is an ancestral gateway to the spiritual realm. Originated centuries ago, the rhythmic claps, hypnotic harmonium notes, and soaring vocal improvisations are designed to take listeners on an emotional journey of love, unity, and absolute devotion. 
                <br /><br />
                Underneath a canopy of stars on the lush green lawns of DSU, Spectrum V3 presents a premium classical night. Far from standard festivals, this is a meticulously engineered evening of acoustic purity, designed for lovers of traditional art, classical poetry, and absolute cultural luxury.
              </p>
            </TimelineContent>
          </div>
        </section>

        {/* 3. Immersive Progression Flow Section */}
        <section className="py-24 px-6 border-b border-white/5">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <TimelineContent animationNum={7} timelineRef={sectionRef} once={true} as="div">
                <span className={`${spaceGrotesk.className} text-[10px] font-bold text-[#FFD700] uppercase tracking-[0.4em] block mb-2`}>
                  // Flow of The Night
                </span>
                <h2 className={`${orbitron.className} text-2xl md:text-3xl font-black uppercase text-white`}>
                  EXPERIENCE CHRONOLOGY
                </h2>
                <div className="w-20 h-[2px] bg-[#FFD700]/30 mx-auto mt-4"></div>
              </TimelineContent>
            </div>

            <div className="relative border-l border-white/10 pl-6 sm:pl-10 space-y-12 max-w-2xl mx-auto">
              {eventTimeline.map((step, idx) => (
                <TimelineContent
                  key={step.title}
                  animationNum={8 + idx}
                  timelineRef={sectionRef}
                  once={true}
                  as="div"
                  className="relative"
                >
                  {/* Bullet */}
                  <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 bg-black border-2 border-[#FFD700] rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-[#FFD700] rounded-full animate-ping"></div>
                  </div>

                  <div className="backdrop-blur-md bg-neutral-950/40 border border-white/5 rounded-2xl p-5 hover:border-[#FFD700]/30 transition-all duration-300">
                    <span className={`${orbitron.className} text-[10px] text-[#FFD700] font-bold tracking-wider uppercase bg-[#FFD700]/10 px-2.5 py-1 rounded-md`}>
                      {step.time}
                    </span>
                    <h3 className={`${orbitron.className} text-base font-bold text-white mt-3`}>
                      {step.title}
                    </h3>
                    <p className={`${spaceGrotesk.className} text-xs text-neutral-400 mt-2 leading-relaxed`}>
                      {step.description}
                    </p>
                  </div>
                </TimelineContent>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Ticket Pricing Section (Pre-fill conversion point) */}
        <section className="py-24 px-6 border-b border-white/5 bg-neutral-950/20">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <TimelineContent animationNum={13} timelineRef={sectionRef} once={true} as="div">
                <span className={`${spaceGrotesk.className} text-[10px] font-bold text-[#FFD700] uppercase tracking-[0.4em] block mb-2`}>
                  // Claim Tickets
                </span>
                <h2 className={`${orbitron.className} text-2xl md:text-3xl font-black uppercase text-white`}>
                  ACCESS SPECTRUM PASSPORT
                </h2>
                <div className="w-20 h-[2px] bg-[#FFD700]/30 mx-auto mt-4"></div>
              </TimelineContent>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              
              {/* Ticket Card 1: Standard ticket */}
              <TimelineContent animationNum={14} timelineRef={sectionRef} once={true} as="div">
                <div className="relative bg-black border-2 border-neutral-800 hover:border-[#FFD700]/50 rounded-[32px] p-8 flex flex-col justify-between h-[400px] transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 group shadow-lg">
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <span className={`${orbitron.className} text-[10px] font-bold text-[#FFD700] tracking-widest uppercase bg-[#FFD700]/10 px-3 py-1 rounded-full`}>
                        Standard Pass
                      </span>
                      <FaTicketAlt className="text-neutral-600 group-hover:text-[#FFD700] transition-colors" />
                    </div>
                    <h3 className={`${orbitron.className} text-2xl font-bold text-white mb-3`}>
                      External Entry
                    </h3>
                    <p className={`${spaceGrotesk.className} text-xs text-neutral-400 leading-relaxed mb-6`}>
                      Standard gates admission pass for external guests and alumni. Grants full access to DSU main lawn and prime seating rows.
                    </p>
                    <ul className={`${spaceGrotesk.className} space-y-2 text-xs text-neutral-300`}>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-[#FFD700] text-[10px]" /> Full Open Lawn Access
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-[#FFD700] text-[10px]" /> Standard Gate Admission
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-[#FFD700] text-[10px]" /> Complementary Water Bottle
                      </li>
                    </ul>
                  </div>

                  <div className="pt-6 border-t border-white/5 space-y-4">
                    <div className="flex justify-between items-end">
                      <span className={`${spaceGrotesk.className} text-xs text-neutral-500 uppercase tracking-wider`}>Ticket Price</span>
                      <span className={`${spaceGrotesk.className} text-[#FFD700] font-black text-2xl`}>Rs. 800</span>
                    </div>
                    <Link
                      href="/register?category=Qawali&ticket=standard"
                      className={`${orbitron.className} w-full py-3 bg-neutral-900 group-hover:bg-[#FFD700] border border-neutral-800 group-hover:border-[#FFD700] text-[#FFD700] group-hover:text-black font-black uppercase tracking-[0.2em] text-xs rounded-xl flex items-center justify-center gap-2 transition-all duration-300`}
                    >
                      <span>Book Ticket</span>
                      <FaArrowRight className="text-xs" />
                    </Link>
                  </div>
                </div>
              </TimelineContent>

              {/* Ticket Card 2: Student ticket */}
              <TimelineContent animationNum={15} timelineRef={sectionRef} once={true} as="div">
                <div className="relative bg-black border-2 border-[#FFD700] rounded-[32px] p-8 flex flex-col justify-between h-[400px] transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 group shadow-[0_0_25px_rgba(255,215,0,0.1)]">
                  {/* Glowing Leak */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/5 to-transparent rounded-[32px] pointer-events-none"></div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <span className={`${orbitron.className} text-[10px] font-black text-black tracking-widest uppercase bg-[#FFD700] px-3.5 py-1.5 rounded-full shadow-md`}>
                        DSU Discount Pass
                      </span>
                      <FaUsers className="text-[#FFD700]" />
                    </div>
                    <h3 className={`${orbitron.className} text-2xl font-bold text-white mb-3`}>
                      DSU Student Entry
                    </h3>
                    <p className={`${spaceGrotesk.className} text-xs text-neutral-400 leading-relaxed mb-6`}>
                      Exclusive discounted gateway pricing for currently enrolled DSU students. Requires physical student ID verification at the gate.
                    </p>
                    <ul className={`${spaceGrotesk.className} space-y-2 text-xs text-neutral-300`}>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-[#FFD700] text-[10px]" /> Full Open Lawn Access
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-[#FFD700] text-[10px]" /> Campus Exclusive Pass
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-[#FFD700] text-[10px]" /> Front Row Seating Tier (Frist-come)
                      </li>
                    </ul>
                  </div>

                  <div className="pt-6 border-t border-white/5 space-y-4 relative z-10">
                    <div className="flex justify-between items-end">
                      <span className={`${spaceGrotesk.className} text-xs text-neutral-500 uppercase tracking-wider`}>Student Price</span>
                      <span>
                        <span className="line-through text-neutral-600 mr-2 text-sm font-bold">Rs. 800</span>
                        <span className={`${spaceGrotesk.className} text-[#FFD700] font-black text-2xl`}>Rs. 700</span>
                      </span>
                    </div>
                    <Link
                      href="/register?category=Qawali&ticket=student"
                      className={`${orbitron.className} w-full py-3 bg-[#FFD700] text-black font-black uppercase tracking-[0.2em] text-xs rounded-xl flex items-center justify-center gap-2 hover:bg-white hover:text-black transition-all duration-300 border border-[#FFD700]`}
                    >
                      <span>Book Student Ticket</span>
                      <FaArrowRight className="text-xs" />
                    </Link>
                  </div>
                </div>
              </TimelineContent>

            </div>
          </div>
        </section>

        {/* 5. Artist Showcase Section (Placeholder ready) */}
        <section className="py-24 px-6 border-b border-white/5">
          <div className="max-w-4xl mx-auto text-center">
            <TimelineContent animationNum={16} timelineRef={sectionRef} once={true} as="div">
              <span className={`${spaceGrotesk.className} text-[10px] font-bold text-[#FFD700] uppercase tracking-[0.4em] block mb-2`}>
                // The Performers
              </span>
              <h2 className={`${orbitron.className} text-2xl md:text-3xl font-black uppercase text-white`}>
                PERFORMING ARTISTS MATRIX
              </h2>
              <div className="w-20 h-[2px] bg-[#FFD700]/30 mx-auto mt-4 mb-16"></div>
            </TimelineContent>

            <div className="grid sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
              <TimelineContent animationNum={17} timelineRef={sectionRef} once={true} as="div">
                <div className="relative group rounded-3xl border border-white/5 overflow-hidden aspect-[4/5] bg-neutral-900/40 backdrop-blur-md flex flex-col justify-end p-6">
                  {/* Ambient Glow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10"></div>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.02)_0%,transparent_70%)] group-hover:scale-110 transition-transform duration-700"></div>
                  
                  {/* Micro Icon */}
                  <div className="w-10 h-10 bg-black/60 rounded-xl border border-white/10 flex items-center justify-center mb-4 relative z-20 group-hover:scale-115 transition-transform duration-500">
                    <FaMicrophoneAlt className="text-[#FFD700] text-sm" />
                  </div>

                  <div className="relative z-20 text-left">
                    <h4 className={`${orbitron.className} text-lg font-bold text-white group-hover:text-[#FFD700] transition-colors`}>
                      Elite Sufi Ensemble
                    </h4>
                    <p className={`${spaceGrotesk.className} text-[10px] text-gray-400 mt-1 uppercase tracking-widest font-semibold`}>
                      Classical Harmonium & Vocals
                    </p>
                    <p className={`${spaceGrotesk.className} text-xs text-neutral-400 mt-3 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                      Master musicians specialized in traditional, raw Sufi vocal projections and hypnotic hand-claps.
                    </p>
                  </div>
                </div>
              </TimelineContent>

              <TimelineContent animationNum={18} timelineRef={sectionRef} once={true} as="div">
                <div className="relative group rounded-3xl border border-white/5 overflow-hidden aspect-[4/5] bg-neutral-900/40 backdrop-blur-md flex flex-col justify-end p-6">
                  {/* Ambient Glow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10"></div>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.02)_0%,transparent_70%)] group-hover:scale-110 transition-transform duration-700"></div>
                  
                  {/* Micro Icon */}
                  <div className="w-10 h-10 bg-black/60 rounded-xl border border-white/10 flex items-center justify-center mb-4 relative z-20 group-hover:scale-115 transition-transform duration-500">
                    <FaMusic className="text-[#FFD700] text-sm" />
                  </div>

                  <div className="relative z-20 text-left">
                    <h4 className={`${orbitron.className} text-lg font-bold text-white group-hover:text-[#FFD700] transition-colors`}>
                      Featured Classical Qawals
                    </h4>
                    <p className={`${spaceGrotesk.className} text-[10px] text-gray-400 mt-1 uppercase tracking-widest font-semibold`}>
                      Lead Harmonium & Tabla
                    </p>
                    <p className={`${spaceGrotesk.className} text-xs text-neutral-400 mt-3 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                      Accomplished artists bringing iconic renditions of Sabri Brothers, Nusrat Fateh Ali Khan, and custom Sufi kalams.
                    </p>
                  </div>
                </div>
              </TimelineContent>
            </div>

            {/* Note about announcements */}
            <TimelineContent animationNum={19} timelineRef={sectionRef} once={true} as="div" className="mt-12">
              <p className={`${spaceGrotesk.className} text-neutral-500 text-xs tracking-wide max-w-md mx-auto`}>
                * Artist reveals, lineup releases, and performance announcements will be updated dynamically. Keep checking this portal for live reveals!
              </p>
            </TimelineContent>

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
