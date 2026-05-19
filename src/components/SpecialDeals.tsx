"use client";

import { Orbitron, Space_Grotesk } from "next/font/google";
import { TimelineContent } from "@/components/timeline-animation";
import { useRef } from "react";
import Link from "next/link";
import { FaMusic, FaCode, FaGamepad, FaArrowRight, FaTicketAlt, FaFire } from "react-icons/fa";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "700", "900"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

interface DealCard {
  badge: string;
  title: string;
  subtitle: string;
  icon: typeof FaMusic;
  isPopular?: boolean;
  pricing: React.ReactNode;
  details: string[];
  link: string;
}

export default function SpecialDeals() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const deals: DealCard[] = [
    {
      badge: "DEAL 01",
      title: "Qawali Night Pass",
      subtitle: "Exclusive gate access to live musical performance",
      icon: FaMusic,
      pricing: (
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm border-b border-white/10 pb-2">
            <span className="text-neutral-400">Regular Entry:</span>
            <span className="line-through text-neutral-500 mr-2 font-semibold">Rs 800</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-neutral-400">Bundle Price:</span>
            <span>
              <span className="text-[#FFD700] font-black text-xl">Rs 700</span>
            </span>
          </div>
        </div>
      ),
      details: ["Standard Gate Access", "DSU Campus Entry", "Live Qawali Performance"],
      link: "/register?category=Special%20Deals&deal=qawali-pass",
    },
    {
      badge: "DEAL 02",
      title: "Hackathon + Qawali",
      subtitle: "The ultimate tech and music package",
      icon: FaCode,
      isPopular: true,
      pricing: (
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm border-b border-white/10 pb-2">
            <span className="text-neutral-400">Regular Entry:</span>
            <span className="line-through text-neutral-500 font-semibold">Rs 1500</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-neutral-400">Bundle Price:</span>
            <span className="text-[#FFD700] font-black text-2xl">Rs 800</span>
          </div>
        </div>
      ),
      details: ["Full Hackathon Access", "VIP Qawali Pass Included", "Refreshments & Certificates"],
      link: "/register?category=Special%20Deals&deal=hackathon-bundle",
    },
    {
      badge: "DEAL 03",
      title: "Gaming + Qawali",
      subtitle: "Unleash the player, enjoy the night",
      icon: FaGamepad,
      pricing: (
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm border-b border-white/10 pb-2">
            <span className="text-neutral-400">Regular Entry:</span>
            <span className="line-through text-neutral-500 font-semibold">Rs 1200</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-neutral-400">Bundle Price:</span>
            <span className="text-[#FFD700] font-black text-2xl">Rs 800</span>
          </div>
        </div>
      ),
      details: ["Any E-Sports Arena Entry", "VIP Qawali Pass Included", "Standard Console Access"],
      link: "/register?category=Special%20Deals&deal=gaming-bundle",
    },
  ];

  return (
    <section
      id="deals"
      ref={sectionRef}
      className="relative py-28 bg-[#0f0f0f] text-white overflow-hidden"
      aria-labelledby="deals-heading"
    >
      {/* Background gradients and particles */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_40%,rgba(255,215,0,0.03)_0%,transparent_60%)] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/4 w-80 h-80 rounded-full bg-[#FFD700]/3 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-1/4 w-80 h-80 rounded-full bg-[#B8860B]/2 blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <TimelineContent animationNum={0} timelineRef={sectionRef} once={false}>
            <span className={`${spaceGrotesk.className} uppercase tracking-[0.4em] text-xs font-bold text-[#FFD700] mb-2 block`}>
              Exclusive Bundles
            </span>
          </TimelineContent>
          
          <TimelineContent animationNum={1} timelineRef={sectionRef} once={false}>
            <h2
              id="deals-heading"
              className={`${orbitron.className} text-4xl md:text-5xl font-extrabold tracking-tight text-white uppercase mb-4`}
            >
              Special Deals
            </h2>
          </TimelineContent>

          <TimelineContent animationNum={2} timelineRef={sectionRef} once={false}>
            <div className="w-24 h-1 bg-gradient-to-r from-[#FFD700] to-black mx-auto mb-6" />
          </TimelineContent>

          <TimelineContent animationNum={3} timelineRef={sectionRef} once={false}>
            <p className={`${spaceGrotesk.className} text-neutral-400 text-sm md:text-base leading-relaxed`}>
              Get premium entry tickets and customized combo packs at special discount prices. Choose your deal and register before slots fill up!
            </p>
          </TimelineContent>
        </div>

        {/* 3-Column Deals Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {deals.map((deal, index) => (
            <TimelineContent
              key={deal.title}
              animationNum={4 + index}
              timelineRef={sectionRef}
              once={true}
              as="div"
            >
              <div 
                className={`relative bg-black/40 h-[480px] rounded-[32px] border-2 flex flex-col justify-between p-8 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-[1.03] hover:-translate-y-2 group ${
                  deal.isPopular ? "border-[#FFD700]" : "border-neutral-800 hover:border-[#FFD700]/50"
                }`}
                style={{
                  boxShadow: deal.isPopular ? "0 0 25px rgba(255, 215, 0, 0.15)" : "none"
                }}
              >
                {/* Gold glow leak on card hover */}
                <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-[#FFD700]/5 blur-3xl pointer-events-none group-hover:bg-[#FFD700]/10 transition-colors"></div>

                {/* Popular Ribbon */}
                {deal.isPopular && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-[#FFD700] to-[#B8860B] text-black text-[0.6rem] font-black uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1 shadow">
                    <FaFire size={8} /> Popular
                  </div>
                )}

                {/* Top Section */}
                <div>
                  {/* Badge */}
                  <span className={`${orbitron.className} inline-block text-[0.7rem] font-bold text-[#FFD700] tracking-[0.3em] mb-4`}>
                    {deal.badge}
                  </span>

                  {/* Icon and Title */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-neutral-900 border border-[#FFD700]/30 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                      <deal.icon className="text-[#FFD700] text-xl" />
                    </div>
                    <h3 className={`${orbitron.className} text-xl font-bold text-white group-hover:text-[#FFD700] transition-colors`}>
                      {deal.title}
                    </h3>
                  </div>

                  {/* Subtitle */}
                  <p className={`${spaceGrotesk.className} text-xs text-neutral-400 mb-6 leading-relaxed`}>
                    {deal.subtitle}
                  </p>

                  {/* Features Bullet List */}
                  <ul className={`${spaceGrotesk.className} space-y-2 text-xs text-neutral-300 mb-6`}>
                    {deal.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700]"></span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Section: Pricing & Action Button */}
                <div className="space-y-6 pt-6 border-t border-white/5">
                  {/* Pricing Box */}
                  <div className={`${spaceGrotesk.className}`}>
                    {deal.pricing}
                  </div>

                  {/* Action Button */}
                  <Link
                    href={deal.link}
                    className={`${orbitron.className} w-full py-3.5 bg-neutral-900 group-hover:bg-gradient-to-r group-hover:from-[#FFD700] group-hover:via-[#C5A100] group-hover:to-[#B8860B] border border-neutral-800 group-hover:border-[#FFD700] text-[#FFD700] group-hover:text-black font-black uppercase tracking-[0.2em] text-xs rounded-2xl flex items-center justify-center gap-2 transition-all duration-500 shadow-md`}
                  >
                    <span>Claim Deal</span>
                    <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

              </div>
            </TimelineContent>
          ))}
        </div>

        {/* Dynamic Footer: More to Come */}
        <TimelineContent animationNum={7} timelineRef={sectionRef} once={false}>
          <div className="flex flex-col items-center justify-center">
            <div className="relative inline-flex items-center gap-3 bg-neutral-900/60 border border-dashed border-[#FFD700]/30 rounded-2xl px-6 py-4">
              <FaTicketAlt className="text-[#FFD700] text-lg animate-bounce" />
              <span className={`${spaceGrotesk.className} text-xs text-neutral-400 uppercase tracking-widest font-bold`}>
                And more exciting deals to come... Stay Tuned!
              </span>
            </div>
          </div>
        </TimelineContent>

      </div>
    </section>
  );
}
