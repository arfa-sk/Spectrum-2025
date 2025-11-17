"use client";

import { Orbitron, Space_Grotesk } from "next/font/google";
import Link from "next/link";
import { FaCode, FaLaptopCode, FaDatabase, FaBug, FaSpider, FaChartLine } from "react-icons/fa";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TimelineContent } from "@/components/timeline-animation";
import { useRef } from "react";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "700"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export default function HackathonPage() {
  const sectionRef = useRef<HTMLElement>(null);

  const hackathons = [
    {
      title: "Speed Debugging",
      description: "Race against time to find and fix bugs in record speed. Test your debugging skills in this intense coding challenge.",
      image: "/modules/speed-debugging.png",
      imagePosition: "center",
      href: "/modules/hackathon/speed-debugging",
      duration: "2 Hours",
      format: "Individual",
      prize: "Rs. 8,000",
    },
    {
      title: "Speed Programming",
      description: "Code your way to victory in this fast-paced programming competition. Speed, accuracy, and creativity are key to success.",
      image: "/modules/speed-programming.png",
      imagePosition: "center",
      href: "/modules/hackathon/speed-programming",
      duration: "3 Hours",
      format: "Individual",
      prize: "Rs. 10,000",
    },
    {
      title: "Dark Spider",
      description: "Navigate through complex web challenges and security puzzles. Only the most skilled developers will emerge victorious.",
      image: "/modules/dark-spider.png",
      imagePosition: "center 20%",
      href: "/modules/hackathon/dark-spider",
      duration: "4 Hours",
      format: "Team (2-3)",
      prize: "Rs. 15,000",
    },
    {
      title: "Web Development",
      description: "Build stunning, responsive web applications from scratch. Showcase your full-stack development prowess.",
      image: "/modules/web-development.png",
      imagePosition: "center",
      href: "/modules/hackathon/web-development",
      duration: "6 Hours",
      format: "Team (2-4)",
      prize: "Rs. 20,000",
    },
    {
      title: "Data Science",
      description: "Dive deep into datasets and extract meaningful insights. Transform raw data into powerful solutions.",
      image: "/modules/data-science.png",
      imagePosition: "center 30%",
      href: "/modules/hackathon/data-science",
      duration: "8 Hours",
      format: "Team (2-3)",
      prize: "Rs. 25,000",
    },
    {
      title: "Database Design",
      description: "Master the art of database architecture and optimization. Design systems that scale and perform.",
      image: "/modules/database-design.png",
      imagePosition: "center 20%",
      href: "/modules/hackathon/database-design",
      duration: "4 Hours",
      format: "Individual",
      prize: "Rs. 12,000",
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
                <FaCode className="text-4xl text-black mr-4" />
                <h1 className={`${orbitron.className} text-5xl md:text-6xl font-bold text-black`}>
                  Hackathon
                </h1>
              </div>
            </TimelineContent>

            <TimelineContent animationNum={3} timelineRef={sectionRef} once={false} as="div">
              <div className="w-24 h-1 bg-gradient-to-r from-[#FFD700] to-black mx-auto mb-8"></div>
            </TimelineContent>

            <TimelineContent animationNum={4} timelineRef={sectionRef} once={false} as="div">
              <p className={`${spaceGrotesk.className} text-xl text-gray-700 max-w-3xl mx-auto`}>
                Unleash your coding potential in intense programming challenges and innovative projects
              </p>
            </TimelineContent>
          </div>

          {/* Hackathons Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {hackathons.map((hackathon, index) => (
              <TimelineContent 
                key={hackathon.title} 
                animationNum={5 + index} 
                timelineRef={sectionRef} 
                once={true} 
                as="div"
              >
                <Link href={hackathon.href} className="group block">
                  <div className="relative bg-white rounded-2xl p-8 border border-gray-200 overflow-hidden transition-transform duration-300 hover:scale-105">
                    {/* Background Image Overlay */}
                    <div 
                      className="absolute inset-0 bg-cover bg-no-repeat opacity-90"
                      style={{
                        backgroundImage: `url('${hackathon.image}')`,
                        backgroundSize: "cover",
                        backgroundPosition: hackathon.imagePosition
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
                        <h3 className={`${orbitron.className} text-2xl font-bold text-white mb-4 drop-shadow-lg`}>
                          {hackathon.title}
                        </h3>
                      </TimelineContent>
                      
                      <TimelineContent 
                        animationNum={15 + index} 
                        timelineRef={sectionRef} 
                        once={true} 
                        as="div"
                      >
                        <div className="flex items-center justify-center">
                          <span className={`${spaceGrotesk.className} text-sm font-medium text-white bg-black px-4 py-2 rounded-full`}>
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
