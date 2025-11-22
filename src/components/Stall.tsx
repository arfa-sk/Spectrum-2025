"use client";

import { memo, useMemo } from "react";
import Link from "next/link";
import { Orbitron, Space_Grotesk } from "next/font/google";
import { FaUtensils, FaGamepad, FaShoppingBag, FaArrowRight } from "react-icons/fa";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "700"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

interface StallSize {
  size: string;
  price: number;
}

interface StallCategory {
  name: string;
  icon: typeof FaUtensils;
  available: number;
  sizes: StallSize[];
}

const stallCategories: StallCategory[] = [
  {
    name: "Food",
    icon: FaUtensils,
    available: 10,
    sizes: [
      { size: "8x8 ft", price: 10000 },
      { size: "10x10 ft", price: 10000 },
    ],
  },
  {
    name: "Gaming",
    icon: FaGamepad,
    available: 10,
    sizes: [
      { size: "8x8 ft", price: 10000 },
      { size: "10x10 ft", price: 10000 },
    ],
  },
  {
    name: "Accessories",
    icon: FaShoppingBag,
    available: 10,
    sizes: [
      { size: "8x8 ft", price: 10000 },
      { size: "10x10 ft", price: 10000 },
    ],
  },
];

const includedItems = [
  "1 table",
  "1 chair",
  "Electricity (220V socket)",
  "Lighting",
  "Standard branding space",
];

function Stall() {
  // Memoize included items list to prevent re-creation
  const memoizedItems = useMemo(() => includedItems, []);

  return (
    <section
      id="stalls"
      className="relative py-24 overflow-hidden bg-white"
      aria-labelledby="stalls-heading"
      style={{ 
        contain: "layout style paint",
        isolation: "isolate",
        transform: "translate3d(0, 0, 0)",
      }}
    >
      {/* Subtle radial gold tint - optimized */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 50% -10%, rgba(0,0,0,0.04) 0%, transparent 55%)",
          willChange: "auto",
          transform: "translate3d(0, 0, 0)",
        }}
      />

      <div className="relative container mx-auto px-6" style={{ contain: "layout style" }}>
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className={`${spaceGrotesk.className} text-xs uppercase tracking-[0.35em] text-black/60`}>
            Vendor Stalls
          </span>
          <h2 id="stalls-heading" className={`${orbitron.className} text-4xl md:text-5xl font-bold text-black mt-4`}>
            Reserve Your Stall
          </h2>
          <p className={`${spaceGrotesk.className} text-base md:text-lg text-gray-600 mt-6`}>
            Join Spectrum 2026 as a vendor. Choose your category and stall size to get started.
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-black via-[#FFD700] to-black mx-auto mt-6"></div>
        </div>

        {/* Stall Categories Grid - optimized with content-visibility */}
        <div 
          className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          style={{ contain: "layout style" }}
        >
          {stallCategories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.name}
                className="stall-card relative bg-white rounded-3xl border-2 border-black overflow-hidden"
                style={{
                  contain: "layout style paint",
                  isolation: "isolate",
                  transform: "translate3d(0, 0, 0)",
                  backfaceVisibility: "hidden",
                  perspective: "1000px",
                }}
              >
                {/* Background Gradient - GPU layer */}
                <div 
                  className="stall-bg absolute inset-0"
                  style={{
                    background: "linear-gradient(to bottom right, #ffffff, #f9fafb, #f3f4f6)",
                    willChange: "opacity",
                    transform: "translate3d(0, 0, 0)",
                  }}
                />

                {/* Gold Glow Effect - simplified, no blur on mobile */}
                <div 
                  className="stall-glow absolute inset-0 rounded-3xl opacity-0 -z-10"
                  style={{
                    background: "linear-gradient(to right, #FFD700, #FFEC8B, #FFD700)",
                    transform: "translate3d(0, 0, 0) scale(1.05)",
                    willChange: "opacity",
                  }}
                />

                {/* Content */}
                <div className="relative z-10 p-8 flex flex-col h-full" style={{ contain: "layout" }}>
                  {/* Badge */}
                  <div className={`${spaceGrotesk.className} inline-block bg-gradient-to-r from-[#FFD700] via-[#C5A100] to-[#B8860B] text-black text-xs font-bold px-4 py-2 rounded-full mb-6 shadow-lg border border-[#C5A100] w-fit`}>
                    {category.available} Available
                  </div>

                  {/* Icon - optimized with GPU acceleration */}
                  <div 
                    className="stall-icon-container w-16 h-16 relative mb-6"
                    style={{ transform: "translate3d(0, 0, 0)" }}
                  >
                    <div 
                      className="stall-icon-glow absolute inset-0 rounded-2xl opacity-60"
                      style={{
                        background: "linear-gradient(to bottom right, #FFD700, #C5A100, #B8860B)",
                        filter: "blur(4px)",
                        willChange: "opacity",
                        transform: "translate3d(0, 0, 0)",
                      }}
                    />
                    <div 
                      className="stall-icon-box relative w-16 h-16 bg-black rounded-2xl flex items-center justify-center border-2 border-black shadow-lg"
                      style={{
                        willChange: "transform, background-color",
                        transform: "translate3d(0, 0, 0)",
                      }}
                    >
                      <Icon 
                        className="stall-icon text-[#FFD700] text-2xl"
                        style={{
                          willChange: "transform, color",
                          transform: "translate3d(0, 0, 0)",
                        }}
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className={`${orbitron.className} text-3xl font-bold text-black mb-4`}>
                    {category.name}
                  </h3>

                  {/* Size & Price - Compact */}
                  <div className="mb-6 flex-grow">
                    <div 
                      className="stall-price-box p-4 rounded-xl bg-gray-50 border border-gray-200"
                      style={{ willChange: "border-color" }}
                    >
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span className={`${spaceGrotesk.className} text-sm font-semibold text-black`}>
                          8x8 ft
                        </span>
                        <span className="text-gray-400">•</span>
                        <span className={`${spaceGrotesk.className} text-sm font-semibold text-black`}>
                          10x10 ft
                        </span>
                      </div>
                      <div className={`${orbitron.className} text-xl font-bold text-[#FFD700]`}>
                        Rs 10,000
                      </div>
                    </div>
                  </div>

                  {/* Included Items */}
                  <div className="mb-6 p-4 rounded-xl bg-gradient-to-br from-[#FFD700]/10 to-[#FFD700]/5 border border-[#FFD700]/20">
                    <p className={`${spaceGrotesk.className} text-xs font-semibold uppercase tracking-[0.15em] text-black/70 mb-3`}>
                      All Stalls Include:
                    </p>
                    <ul className="space-y-2">
                      {memoizedItems.map((item, itemIndex) => (
                        <li key={itemIndex} className={`${spaceGrotesk.className} text-sm text-gray-700 flex items-center gap-2`}>
                          <span className="text-[#FFD700] font-bold">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Book Now Button - optimized */}
                  <Link
                    href="/#contact"
                    className={`stall-button ${orbitron.className} w-full inline-flex items-center justify-center gap-3 rounded-full border-2 border-black bg-black text-white px-6 py-4 text-sm font-semibold uppercase tracking-[0.2em]`}
                    style={{
                      willChange: "transform, background-color",
                      transform: "translate3d(0, 0, 0)",
                    }}
                  >
                    Book Now
                    <FaArrowRight 
                      className="stall-button-arrow text-sm"
                      style={{
                        willChange: "transform",
                        transform: "translate3d(0, 0, 0)",
                      }}
                    />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Ultra-optimized hover styles - GPU accelerated, compositor-only properties */}
      <style jsx>{`
        .stall-card {
          transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), 
                      box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .stall-card:hover {
          transform: translate3d(0, -8px, 0) scale3d(1.02, 1.02, 1);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }
        
        .stall-bg {
          transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .stall-card:hover .stall-bg {
          opacity: 1;
        }
        
        .stall-glow {
          transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .stall-card:hover .stall-glow {
          opacity: 0.25;
        }
        
        .stall-icon-glow {
          transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .stall-card:hover .stall-icon-glow {
          opacity: 0.8;
        }
        
        .stall-icon-box {
          transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1),
                      background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1),
                      border-color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .stall-card:hover .stall-icon-box {
          background: linear-gradient(to bottom right, #FFD700, #C5A100, #B8860B);
          transform: translate3d(0, 0, 0) rotate3d(0, 0, 1, 12deg);
          border-color: #C5A100;
        }
        
        .stall-icon {
          transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1),
                      color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .stall-card:hover .stall-icon {
          color: black;
          transform: translate3d(0, 0, 0) scale3d(1.1, 1.1, 1);
        }
        
        .stall-price-box {
          transition: border-color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .stall-card:hover .stall-price-box {
          border-color: rgba(255, 215, 0, 0.3);
        }
        
        .stall-button {
          transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1),
                      background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1),
                      color 0.2s cubic-bezier(0.4, 0, 0.2, 1),
                      border-color 0.2s cubic-bezier(0.4, 0, 0.2, 1),
                      box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .stall-card:hover .stall-button {
          transform: translate3d(0, 0, 0) scale3d(1.02, 1.02, 1);
          background: linear-gradient(to right, #FFD700, #C5A100, #B8860B);
          color: black;
          border-color: #C5A100;
          box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
        }
        
        .stall-button-arrow {
          transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .stall-card:hover .stall-button-arrow {
          transform: translate3d(4px, 0, 0);
        }
        
        /* Mobile optimizations - reduce blur */
        @media (max-width: 768px) {
          .stall-icon-glow {
            filter: blur(2px);
          }
          .stall-glow {
            filter: blur(4px);
          }
        }
        
        /* High DPI optimizations */
        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
          .stall-card {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
        }
        
        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .stall-card,
          .stall-card * {
            transition: none !important;
            animation: none !important;
          }
          .stall-card:hover {
            transform: none;
          }
        }
        
        /* Touch device optimizations */
        @media (hover: none) and (pointer: coarse) {
          .stall-card:active {
            transform: translate3d(0, -4px, 0) scale3d(1.01, 1.01, 1);
          }
        }
      `}</style>
    </section>
  );
}

export default memo(Stall);

