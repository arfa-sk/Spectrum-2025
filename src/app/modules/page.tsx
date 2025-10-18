"use client";

import { Orbitron, Space_Grotesk } from "next/font/google";
import Link from "next/link";
import { FaGamepad, FaCode, FaMicrophone } from "react-icons/fa";
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
      description: "Compete in the ultimate gaming showdown featuring Valorant, PUBG, Tekken, and FIFA tournaments.",
      icon: FaGamepad,
      href: "/modules/gaming-arena",
      color: "from-red-500 to-orange-500",
      bgColor: "bg-red-50",
    },
    {
      title: "Hackathon",
      description: "Showcase your coding skills in Web Development, Dark Spider, and Data Science challenges.",
      icon: FaCode,
      href: "/modules/hackathon",
      color: "from-blue-500 to-purple-500",
      bgColor: "bg-blue-50",
    },
    {
      title: "Suffas Got Talent",
      description: "Express your creativity through Singing, Standup Comedy, and Skit Battle performances.",
      icon: FaMicrophone,
      href: "/modules/suffas-got-talent",
      color: "from-green-500 to-teal-500",
      bgColor: "bg-green-50",
    },
  ];

  return (
    <>
      <Navbar />
      <main ref={sectionRef} className="relative min-h-screen bg-white text-black overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden -z-10 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-red-400 to-orange-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-gradient-to-r from-green-400 to-teal-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        </div>

        <div className="container mx-auto px-6 py-20">
          {/* Header */}
          <div className="text-center mb-16">
            <TimelineContent animationNum={1} timelineRef={sectionRef} once={false} as="div">
              <Link 
                href="/" 
                className={`${spaceGrotesk.className} inline-flex items-center text-sm text-gray-600 hover:text-black transition-colors mb-8`}
              >
                ← Back to Home
              </Link>
            </TimelineContent>

            <TimelineContent animationNum={2} timelineRef={sectionRef} once={false} as="div">
              <h1 className={`${orbitron.className} text-5xl md:text-6xl font-bold text-black mb-6`}>
                Event Modules
              </h1>
            </TimelineContent>

            <TimelineContent animationNum={3} timelineRef={sectionRef} once={false} as="div">
              <div className="w-24 h-1 bg-gradient-to-r from-[#FFD700] to-black mx-auto mb-8"></div>
            </TimelineContent>

            <TimelineContent animationNum={4} timelineRef={sectionRef} once={false} as="div">
              <p className={`${spaceGrotesk.className} text-xl text-gray-700 max-w-3xl mx-auto`}>
                Choose your battlefield and showcase your skills across three exciting categories
              </p>
            </TimelineContent>
          </div>

          {/* Modules Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {modules.map((module, index) => (
              <TimelineContent 
                key={module.title} 
                animationNum={5 + index} 
                timelineRef={sectionRef} 
                once={false} 
                as="div"
              >
                <Link href={module.href} className="group block">
                  <div className={`${module.bgColor} rounded-2xl p-8 h-full transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105`}>
                    <div className={`w-16 h-16 bg-gradient-to-r ${module.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <module.icon className="text-white text-2xl" />
                    </div>
                    
                    <h3 className={`${orbitron.className} text-2xl font-bold text-black mb-4 group-hover:text-gray-800 transition-colors`}>
                      {module.title}
                    </h3>
                    
                    <p className={`${spaceGrotesk.className} text-gray-700 leading-relaxed group-hover:text-gray-600 transition-colors`}>
                      {module.description}
                    </p>

                    <div className="mt-6 flex items-center text-sm font-medium text-gray-600 group-hover:text-black transition-colors">
                      <span>Explore Events</span>
                      <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
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
