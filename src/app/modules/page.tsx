"use client";

import { Orbitron, Space_Grotesk } from "next/font/google";
import Link from "next/link";
import { FaGamepad, FaCode, FaMicrophone, FaArrowRight } from "react-icons/fa";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TimelineContent } from "@/components/timeline-animation";
import { useRef } from "react";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "700"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export default function ModulesPage() {
  const sectionRef = useRef<HTMLElement>(null);

  const modules = [
    {
      title: "Gaming Arena",
      description: "Enter the battleground where legends are born. Valorant, PUBG, Tekken, FIFA - choose your weapon.",
      icon: FaGamepad,
      href: "/modules/gaming-arena",
      badge: "4 Tournaments",
    },
    {
      title: "Hackathon",
      description: "Code the future. 48 hours of innovation, caffeine, and brilliant minds colliding.",
      icon: FaCode,
      href: "/modules/hackathon",
      badge: "7 Challenges",
    },
    {
      title: "Suffa's Got Talent",
      description: "The stage is yours. Sing, act, laugh - make them remember your name.",
      icon: FaMicrophone,
      href: "/modules/suffas-got-talent",
      badge: "6 Performances",
    },
  ];

  return (
    <>
      <Navbar />
      <main ref={sectionRef} className="relative min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 text-black overflow-hidden">
        {/* Enhanced Background with More Depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_20%,rgba(255,215,0,0.05)_0%,transparent_50%)]"></div>
        
        {/* Hero Section */}
        <div className="relative py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-20">
            <TimelineContent animationNum={2} timelineRef={sectionRef} once={false} as="div">
              <h1 className={`${orbitron.className} text-6xl md:text-7xl font-bold text-black mb-6`}>
                CHOOSE YOUR ARENA
              </h1>
            </TimelineContent>

            <TimelineContent animationNum={3} timelineRef={sectionRef} once={false} as="div">
              <div className="w-24 h-1 bg-gradient-to-r from-[#FFD700] to-black mx-auto mb-8"></div>
            </TimelineContent>

              <TimelineContent animationNum={4} timelineRef={sectionRef} once={false} as="div">
                <p className={`${spaceGrotesk.className} text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed`}>
                  Three worlds. One mission. Dominate your domain and etch your name in the halls of glory.
                </p>
              </TimelineContent>
            </div>

            {/* Enhanced Modules Grid - Keeping Black Outline */}
            <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {modules.map((module, index) => (
                <TimelineContent 
                  key={module.title} 
                  animationNum={5 + index} 
                  timelineRef={sectionRef} 
                  once={true} 
                  as="div"
                >
                  <Link href={module.href} className="group block h-full">
                    <div className="relative bg-white h-96 rounded-3xl border-2 border-black overflow-hidden transition-all duration-500 group-hover:shadow-2xl group-hover:scale-105 group-hover:-translate-y-2">
                      
                      {/* Clean Background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100 opacity-100 group-hover:from-gray-50 group-hover:to-gray-200 transition-all duration-500"></div>

                      {/* Content Container */}
                      <div className="relative z-10 h-full flex flex-col justify-between p-8">
                        
                        {/* Top Section */}
                        <div>
                           {/* Ultra Shiny Gold Badge */}
                           <TimelineContent animationNum={10 + index} timelineRef={sectionRef} once={true} as="div">
                             <div className={`${spaceGrotesk.className} inline-block bg-gradient-to-r from-[#FFD700] via-[#C5A100] to-[#B8860B] text-black text-xs font-bold px-4 py-2 rounded-full mb-6 shadow-lg border border-[#C5A100]`}>
                               {module.badge}
                             </div>
                           </TimelineContent>

                          {/* Super Shiny Gold Icon */}
                          <TimelineContent animationNum={11 + index} timelineRef={sectionRef} once={true} as="div">
                            <div className="w-16 h-16 relative mb-6 group-hover:scale-110 transition-transform duration-500">
                              {/* Gold Shadow/Glow */}
                              <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700] via-[#C5A100] to-[#B8860B] rounded-2xl blur-sm opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                              {/* Main Icon Container */}
                              <div className="relative w-16 h-16 bg-black rounded-2xl flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-[#FFD700] group-hover:via-[#C5A100] group-hover:to-[#B8860B] group-hover:rotate-12 transition-all duration-500 border-2 border-black group-hover:border-[#C5A100] shadow-lg">
                                <module.icon className="text-[#FFD700] text-2xl group-hover:text-black group-hover:scale-110 transition-all duration-500 drop-shadow" />
                              </div>
                            </div>
                          </TimelineContent>
                          
                          {/* Title */}
                          <TimelineContent animationNum={12 + index} timelineRef={sectionRef} once={true} as="div">
                            <h3 className={`${orbitron.className} text-3xl font-bold text-black mb-4`}>
                              {module.title}
                            </h3>
                          </TimelineContent>
                          
                          {/* Description */}
                          <TimelineContent animationNum={13 + index} timelineRef={sectionRef} once={true} as="div">
                            <p className={`${spaceGrotesk.className} text-gray-700 leading-relaxed`}>
                              {module.description}
                            </p>
                          </TimelineContent>
                        </div>

                        {/* CTA Section */}
                        <TimelineContent animationNum={14 + index} timelineRef={sectionRef} once={true} as="div">
                          <div className="flex items-center justify-between pt-6 border-t border-gray-300">
                            <span className={`${spaceGrotesk.className} text-sm font-bold text-black uppercase tracking-wider group-hover:translate-x-2 transition-transform duration-300`}>
                              Enter Arena
                            </span>
                            
                             {/* Ultra Shiny Gold Arrow */}
                             <div className="relative group-hover:scale-110 group-hover:rotate-90 transition-all duration-500">
                               {/* Gold Shadow/Glow */}
                               <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700] via-[#C5A100] to-[#B8860B] rounded-full blur-sm opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                               {/* Main Arrow Container */}
                               <div className="relative w-12 h-12 bg-black rounded-full flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-[#FFD700] group-hover:via-[#C5A100] group-hover:to-[#B8860B] transition-all duration-500 border-2 border-black group-hover:border-[#C5A100] shadow-lg">
                                 <FaArrowRight className="text-[#FFD700] text-lg group-hover:text-black group-hover:translate-x-0.5 transition-all duration-500" />
                               </div>
                             </div>
                          </div>
                        </TimelineContent>
                      </div>

                      {/* Shiny Gold Glow Effect on Hover */}
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#FFD700] via-[#FFEC8B] to-[#FFD700] opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10 blur-md group-hover:blur-lg scale-105"></div>
                      
                      {/* Gold Sparkle Overlay */}
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,0,0.1)_0%,transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </Link>
                </TimelineContent>
              ))}
            </div>

            {/* Bottom CTA */}
            <TimelineContent animationNum={8} timelineRef={sectionRef} once={false} as="div">
              <div className="text-center mt-20">
                <p className={`${spaceGrotesk.className} text-lg text-gray-600 mb-6`}>
                  Ready to make your mark?
                </p>
                <div className="w-32 h-1 bg-gradient-to-r from-black via-[#FFD700] to-black mx-auto"></div>
              </div>
            </TimelineContent>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}