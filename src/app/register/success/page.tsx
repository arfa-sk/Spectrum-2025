"use client";

import { Orbitron, Space_Grotesk } from "next/font/google";
import Link from "next/link";
import { FaCheckCircle, FaWhatsapp, FaEnvelope, FaHome, FaInfoCircle } from "react-icons/fa";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRef, useEffect, useState } from "react";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "700", "900"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export default function RegistrationSuccessPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [supportNumber, setSupportNumber] = useState<string>("+92 325 7062104");
  const [isGaming, setIsGaming] = useState(false);

  useEffect(() => {
    try {
      const main = sessionStorage.getItem("lastRegistrationCategory") || "";
      const sub = sessionStorage.getItem("lastRegistrationSub") || "";
      const gamingSubs = ["FC 26", "FIFA 26", "Tekken 8", "PUBG", "Free Fire", "Counter-Strike 2", "Valorant"];
      const gaming = main === "E-Sports" || gamingSubs.includes(sub) || gamingSubs.includes(main);

      if (gaming) {
        setSupportNumber("+92 334 2862602");
        setIsGaming(true);
      } else {
        setSupportNumber("+92 325 7062104");
        setIsGaming(false);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen bg-white text-black overflow-x-hidden flex flex-col justify-between">
        
        {/* Futuristic Grid Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_40%,rgba(255,215,0,0.03)_0%,transparent_60%)] pointer-events-none"></div>

        <div className="flex-1 flex items-center justify-center pt-32 pb-20 px-6 relative z-10">
          <div 
            ref={containerRef}
            className="max-w-2xl w-full border-2 border-black bg-white rounded-[32px] p-8 md:p-12 text-center relative overflow-hidden"
            style={{
              boxShadow: "0 0 50px rgba(255, 215, 0, 0.15)"
            }}
          >
            {/* Glowing gold ambient circles */}
            <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-[#FFD700]/5 blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-[#FFD700]/5 blur-3xl pointer-events-none"></div>

            {/* Glowing Animated Success Icon */}
            <div className="inline-flex justify-center items-center mb-8 relative">
              {/* Outer glow ring */}
              <div className="absolute inset-0 rounded-full bg-[#FFD700]/20 blur-md animate-ping duration-1000"></div>
              {/* Success Badge */}
              <div className="relative w-24 h-24 bg-black rounded-full flex items-center justify-center shadow-lg border border-[#FFD700]">
                <FaCheckCircle className="text-[#FFD700] text-5xl" />
              </div>
            </div>

            {/* Success Heading */}
            <div className="mb-6">
              <span className={`${spaceGrotesk.className} uppercase tracking-[0.4em] text-xs font-bold text-gray-400 mb-2 block`}>
                Registration Confirmed
              </span>
              <h1 className={`${orbitron.className} text-4xl md:text-5xl font-extrabold text-black leading-tight uppercase`}>
                Registration complete.
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-[#FFD700] to-black mx-auto mt-4" />
            </div>

            {/* Payment Instructions */}
            <p className={`${spaceGrotesk.className} text-base text-gray-700 mb-6 max-w-lg mx-auto leading-relaxed`}>
              Registration done — next step is to pay online. Use the bank details below to complete your payment, then send the payment screenshot to the support WhatsApp number shown below.
            </p>

            <div className="text-left bg-neutral-50 rounded-2xl border border-gray-200 p-6 mb-8">
              <h3 className={`${orbitron.className} text-sm font-bold uppercase tracking-wider text-black mb-4`}>
                Payment Details
              </h3>
              <div className={`${spaceGrotesk.className} text-sm text-gray-800`}> 
                <p className="mb-2"><strong>Muhammad Fardan Mohsin</strong></p>
                <p className="mb-1">Account Number: <span className="font-bold">2678346203949</span></p>
                <p className="mb-1">IBAN: <span className="font-bold">PK93UNIL0109000346203949</span></p>
                <p className="mb-1">Bank: <span className="font-bold">UBL</span></p>
              </div>
              <p className="text-xs text-gray-500 mt-4">After completing payment, send the screenshot to the support WhatsApp number below.</p>
            </div>

            {/* Support Desk */}
            <div className="border-t border-gray-100 pt-8 mb-8">
              <p className={`${spaceGrotesk.className} text-sm text-gray-500 mb-4`}>
                Need quick support or have customization guidelines? Contact our official support desk:
              </p>

              <div className="text-center text-sm text-gray-500 mb-4">
                <a
                  href="mailto:spectrum2026.dsu@gmail.com"
                  className={`${spaceGrotesk.className} inline-flex items-center gap-2 font-bold text-black`}
                >
                  <FaEnvelope className="text-[#C5A100] text-lg" />
                  spectrum2026.dsu@gmail.com
                </a>
              </div>

              <div className="flex justify-center mb-4">
                <a
                  href="https://wa.me/923342862602"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${spaceGrotesk.className} inline-flex items-center gap-2 text-sm font-bold text-white bg-[#25D366] hover:bg-[#1fa954] px-6 py-3 rounded-full transition-all duration-300 shadow-md`}
                >
                  <FaWhatsapp className="text-white text-lg" />
                  Send payment screenshot to +92 334 2862602
                </a>
              </div>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 flex-wrap">
                <a
                  href={`https://wa.me/${supportNumber.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${spaceGrotesk.className} inline-flex items-center gap-2 text-xs font-bold text-black border border-gray-200 hover:border-[#FFD700] hover:bg-neutral-50 px-5 py-3 rounded-full transition-all duration-300 shadow-sm`}
                >
                  <FaWhatsapp className="text-emerald-500 text-lg" />
                  {supportNumber}
                </a>

                {!isGaming && (
                  <a
                    href="mailto:spectrum2026.dsu@gmail.com"
                    className={`${spaceGrotesk.className} inline-flex items-center gap-2 text-xs font-bold text-black border border-gray-200 hover:border-[#FFD700] hover:bg-neutral-50 px-5 py-3 rounded-full transition-all duration-300 shadow-sm`}
                  >
                    <FaEnvelope className="text-[#C5A100] text-lg" />
                    spectrum2026.dsu@gmail.com
                  </a>
                )}
              </div>
            </div>

            {/* Back Home Button */}
            <div>
              <Link
                href="/"
                className={`${orbitron.className} inline-flex items-center gap-3 bg-black hover:bg-gradient-to-r hover:from-[#FFD700] hover:via-[#C5A100] hover:to-[#B8860B] text-white hover:text-black font-bold uppercase tracking-[0.3em] text-xs px-8 py-4 rounded-full transition-all duration-300 shadow-lg`}
              >
                <FaHome /> Back to Home
              </Link>
            </div>

          </div>
        </div>
        
        <Footer />
      </main>

      <style jsx global>{`
        @keyframes ping {
          75%, 100% {
            transform: scale(1.4);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}
