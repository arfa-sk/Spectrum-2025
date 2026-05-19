"use client";

import Link from "next/link";
import { Orbitron, Space_Grotesk } from "next/font/google";
import { FaGamepad, FaCode, FaMicrophone, FaArrowRight } from "react-icons/fa";
import { TimelineContent } from "@/components/timeline-animation";
import { useRef } from "react";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "700"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export default function ModulesPreview() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const modules = [
    {
      title: "E-Sports",
      description: "Enter the battleground: Counter Strike, PUBG, Tekken, FIFA, & Game Dev.",
      icon: FaGamepad,
      href: "/modules/gaming-arena",
      badge: "6 Games",
    },
    {
      title: "Hackathon",
      description: "Code the future. 48 hours of innovation, caffeine, and brilliant minds colliding.",
      icon: FaCode,
      href: "/modules/hackathon",
      badge: "7 Challenges",
    },
    {
      title: "Play To Win",
      description: "The stage is yours. Sing, act, laugh - make them remember your name.",
      icon: FaMicrophone,
      href: "/modules/suffas-got-talent",
      badge: "6 Performances",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="modules"
      className="relative py-28 bg-white border-t border-gray-100"
      aria-labelledby="modules-preview-heading"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_20%,rgba(255,215,0,0.02)_0%,transparent_50%)] pointer-events-none"></div>

      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <TimelineContent animationNum={0} timelineRef={sectionRef} once={false} as="p">
            <p className={`${spaceGrotesk.className} text-xs uppercase tracking-[0.35em] text-gray-400 mb-3`}>
              Three worlds • classified
            </p>
          </TimelineContent>

          <TimelineContent animationNum={1} timelineRef={sectionRef} once={false} as="h2">
            <h2
              id="modules-preview-heading"
              className={`${orbitron.className} text-4xl md:text-5xl font-bold text-black mb-6`}
            >
              Choose Your Arena
            </h2>
          </TimelineContent>

          <TimelineContent animationNum={2} timelineRef={sectionRef} once={false} as="div">
            <div className="h-1 w-24 bg-gradient-to-r from-[#FFD700] to-black mx-auto mb-6" />
          </TimelineContent>

          <TimelineContent animationNum={3} timelineRef={sectionRef} once={false} as="p">
            <p className={`${spaceGrotesk.className} text-base leading-relaxed text-gray-500`}>
              Dominate your domain and etch your name in the halls of glory. Select an arena below to view details and begin your journey.
            </p>
          </TimelineContent>
        </div>

        {/* Modules Grid */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {modules.map((module, index) => (
            <TimelineContent
              key={module.title}
              animationNum={4 + index}
              timelineRef={sectionRef}
              once={true}
              as="div"
            >
              <Link href={module.href} className="group block h-full">
                <div className="relative bg-white h-[420px] rounded-3xl border-2 border-black overflow-hidden transition-all duration-500 group-hover:shadow-2xl group-hover:scale-[1.03] group-hover:-translate-y-2">
                  
                  {/* Clean Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100 opacity-100 group-hover:from-gray-50 group-hover:to-gray-200 transition-all duration-500"></div>

                  {/* Content Container */}
                  <div className="relative z-10 h-full flex flex-col justify-between p-8">
                    
                    {/* Top Section */}
                    <div>
                      {/* Badge */}
                      <div className={`${spaceGrotesk.className} inline-block bg-gradient-to-r from-[#FFD700] via-[#C5A100] to-[#B8860B] text-black text-xs font-bold px-4 py-2 rounded-full mb-6 shadow-lg border border-[#C5A100]`}>
                        {module.badge}
                      </div>

                      {/* Icon Container */}
                      <div className="w-16 h-16 relative mb-6 group-hover:scale-110 transition-transform duration-500">
                        {/* Glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700] via-[#C5A100] to-[#B8860B] rounded-2xl blur-sm opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                        {/* Main Icon */}
                        <div className="relative w-16 h-16 bg-black rounded-2xl flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-[#FFD700] group-hover:via-[#C5A100] group-hover:to-[#B8860B] group-hover:rotate-12 transition-all duration-500 border-2 border-black group-hover:border-[#C5A100] shadow-lg">
                          <module.icon className="text-[#FFD700] text-2xl group-hover:text-black group-hover:scale-110 transition-all duration-500 drop-shadow" />
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className={`${orbitron.className} text-3xl font-bold text-black mb-4`}>
                        {module.title}
                      </h3>

                      {/* Description */}
                      <p className={`${spaceGrotesk.className} text-gray-600 leading-relaxed`}>
                        {module.description}
                      </p>
                    </div>

                    {/* CTA Section */}
                    <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                      <span className={`${spaceGrotesk.className} text-sm font-bold text-black uppercase tracking-wider group-hover:translate-x-2 transition-transform duration-300`}>
                        Enter Arena
                      </span>

                      {/* Arrow Container */}
                      <div className="relative group-hover:scale-110 group-hover:rotate-90 transition-all duration-500">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700] via-[#C5A100] to-[#B8860B] rounded-full blur-sm opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                        <div className="relative w-12 h-12 bg-black rounded-full flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-[#FFD700] group-hover:via-[#C5A100] group-hover:to-[#B8860B] transition-all duration-500 border-2 border-black group-hover:border-[#C5A100] shadow-lg">
                          <FaArrowRight className="text-[#FFD700] text-lg group-hover:text-black group-hover:translate-x-0.5 transition-all duration-500" />
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Shiny Glow Effect on Hover */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#FFD700] via-[#FFEC8B] to-[#FFD700] opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10 blur-md group-hover:blur-lg scale-105"></div>
                </div>
              </Link>
            </TimelineContent>
          ))}
        </div>
      </div>
    </section>
  );
}
