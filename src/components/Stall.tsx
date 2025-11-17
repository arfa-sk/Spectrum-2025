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

export default function Stall() {
  return (
    <section
      id="stalls"
      className="relative py-24 overflow-hidden bg-white"
      aria-labelledby="stalls-heading"
    >
      {/* Subtle radial gold tint */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_-10%,rgba(0,0,0,0.04)_0%,transparent_55%)] pointer-events-none" />

      <div className="relative container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className={`${spaceGrotesk.className} text-xs uppercase tracking-[0.35em] text-black/60`}>
            Vendor Stalls
          </span>
          <h2 className={`${orbitron.className} text-4xl md:text-5xl font-bold text-black mt-4`}>
            Reserve Your Stall
          </h2>
          <p className={`${spaceGrotesk.className} text-base md:text-lg text-gray-600 mt-6`}>
            Join Spectrum 2025 as a vendor. Choose your category and stall size to get started.
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-black via-[#FFD700] to-black mx-auto mt-6"></div>
        </div>

        {/* Stall Categories Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {stallCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={category.name}
                className="relative bg-white rounded-3xl border-2 border-black overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-105 hover:-translate-y-2 group"
              >
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100 opacity-100 group-hover:from-gray-50 group-hover:to-gray-200 transition-all duration-500"></div>

                {/* Content */}
                <div className="relative z-10 p-8 flex flex-col h-full">
                  {/* Badge */}
                  <div className={`${spaceGrotesk.className} inline-block bg-gradient-to-r from-[#FFD700] via-[#C5A100] to-[#B8860B] text-black text-xs font-bold px-4 py-2 rounded-full mb-6 shadow-lg border border-[#C5A100] w-fit`}>
                    {category.available} Available
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 relative mb-6 group-hover:scale-110 transition-transform duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700] via-[#C5A100] to-[#B8860B] rounded-2xl blur-sm opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                    <div className="relative w-16 h-16 bg-black rounded-2xl flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-[#FFD700] group-hover:via-[#C5A100] group-hover:to-[#B8860B] group-hover:rotate-12 transition-all duration-500 border-2 border-black group-hover:border-[#C5A100] shadow-lg">
                      <Icon className="text-[#FFD700] text-2xl group-hover:text-black group-hover:scale-110 transition-all duration-500" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className={`${orbitron.className} text-3xl font-bold text-black mb-4`}>
                    {category.name}
                  </h3>

                  {/* Size & Price - Compact */}
                  <div className="mb-6 flex-grow">
                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 group-hover:border-[#FFD700]/30 transition-colors">
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
                      {includedItems.map((item, itemIndex) => (
                        <li key={itemIndex} className={`${spaceGrotesk.className} text-sm text-gray-700 flex items-center gap-2`}>
                          <span className="text-[#FFD700] font-bold">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Book Now Button */}
                  <Link
                    href="/#contact"
                    className={`${orbitron.className} w-full inline-flex items-center justify-center gap-3 rounded-full border-2 border-black bg-black text-white px-6 py-4 text-sm font-semibold uppercase tracking-[0.2em] transition-all duration-500 hover:scale-105 hover:bg-gradient-to-r hover:from-[#FFD700] hover:via-[#C5A100] hover:to-[#B8860B] hover:text-black hover:border-[#C5A100] group-hover:shadow-lg`}
                  >
                    Book Now
                    <FaArrowRight className="text-sm transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>

                {/* Gold Glow Effect on Hover */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#FFD700] via-[#FFEC8B] to-[#FFD700] opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10 blur-md group-hover:blur-lg scale-105"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

