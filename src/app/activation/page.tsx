"use client"

import Hero from "@/components/ui/animated-shader-hero";
import Image from "next/image";
import { Orbitron } from "next/font/google";
import { useEffect, useState, useRef, memo, useCallback } from "react";
import { useRouter } from "next/navigation";

const orbitron = Orbitron({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-orbitron",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const TypingText = memo(function TypingText({ text, delay = 0, speed = 30 }: { text: string; delay?: number; speed?: number }) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentIndexRef = useRef(0);

  useEffect(() => {
    // Reset state
    setDisplayedText("");
    setIsTyping(false);
    currentIndexRef.current = 0;

    // Clear any existing timers
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setIsTyping(true);
      currentIndexRef.current = 0;

      const typeNextChar = () => {
        if (currentIndexRef.current < text.length) {
          setDisplayedText(text.slice(0, currentIndexRef.current + 1));
          currentIndexRef.current++;
          typingTimeoutRef.current = setTimeout(typeNextChar, speed);
        } else {
          setIsTyping(false);
        }
      };

      typeNextChar();
    }, delay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, [text, delay, speed]);

  return (
    <span>
      {displayedText}
      {isTyping && displayedText.length < text.length && (
        <span className="typing-cursor" aria-hidden="true">|</span>
      )}
    </span>
  );
});

export default function ActivationPage() {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Use requestAnimationFrame for smoother initialization
    const rafId = requestAnimationFrame(() => {
      setIsVisible(true);
    });
    return () => cancelAnimationFrame(rafId);
  }, []);

  const handleProceed = useCallback(() => {
    router.push("/activation/welcome");
  }, [router]);

  return (
    <>
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translate3d(0, 30px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translate3d(-30px, 0, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translate3d(50px, 0, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes glow {
          0%, 100% {
            text-shadow: 
              0 0 3px rgba(255, 253, 245, 0.25),
              0 0 6px rgba(255, 250, 240, 0.15),
              0 0 9px rgba(255, 255, 255, 0.1);
          }
          50% {
            text-shadow: 
              0 0 5px rgba(255, 253, 245, 0.35),
              0 0 9px rgba(255, 250, 240, 0.2),
              0 0 12px rgba(255, 255, 255, 0.15);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        @keyframes blink {
          0%, 50% {
            opacity: 1;
          }
          51%, 100% {
            opacity: 0;
          }
        }

        .typing-cursor {
          animation: blink 1s infinite;
          will-change: opacity;
          display: inline-block;
        }

        .animate-fade-in-up-delayed {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
          will-change: opacity, transform;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
          will-change: opacity, transform;
        }

        .animate-fade-in-left {
          animation: fadeInLeft 0.8s ease-out forwards;
          opacity: 0;
          will-change: opacity, transform;
        }

        .animate-slide-in-right {
          animation: slideInRight 1s ease-out forwards;
          opacity: 0;
          will-change: opacity, transform;
        }

        .animate-glow {
          animation: glow 3s ease-in-out infinite;
          will-change: text-shadow;
        }

        .text-pop {
          color:rgb(14, 14, 13);
          font-weight: 800;
          letter-spacing: 0.05em;
          position: relative;
          text-shadow: 
            0 0 2px rgba(255, 253, 245, 0.2),
            0 0 4px rgba(255, 250, 240, 0.15),
            0 0 6px rgba(255, 255, 255, 0.1);
          transform: translateZ(0);
          backface-visibility: hidden;
        }

        .text-white-subtle {
          color:rgb(0, 0, 0);
          font-weight: 700;
          letter-spacing: 0.03em;
          position: relative;
          text-shadow: 
            0 0 2px rgba(255, 253, 245, 0.2),
            0 0 4px rgba(255, 250, 240, 0.15),
            0 0 6px rgba(255, 255, 255, 0.1);
          transform: translateZ(0);
          backface-visibility: hidden;
        }

        .enter-button {
          background-color: #000000;
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateZ(0);
          backface-visibility: hidden;
        }

        .enter-button:hover {
          background-color: #1a1a1a;
          border-color: rgba(255, 255, 255, 0.3);
          transform: translateZ(0) scale(1.05);
        }

        .enter-button:focus {
          outline: none;
          box-shadow: none;
        }

        .enter-button:active {
          background-color: #0a0a0a;
          transform: translateZ(0) scale(1.02);
        }
      `}</style>
      <Hero
        headline={{
          line1: "",
          line2: ""
        }}
        subtitle=""
      >
        <div className="w-full h-full flex items-center justify-center px-8 md:px-16 lg:px-24">
          <div className="flex flex-col md:flex-row items-center md:items-center gap-8 md:gap-12 lg:gap-16 w-full max-w-7xl">
            {/* Logo on the left */}
            <div 
              className={`flex-shrink-0 ${isVisible ? 'animate-fade-in-left' : ''}`}
              style={{ animationDelay: '0.2s' }}
            >
              <Image
                src="/sponsors/sss.png"
                alt="Spectrum Logo"
                width={350}
                height={350}
                className="object-contain"
                priority
              />
            </div>
            
            {/* Text on the right */}
            <div 
              className={`flex-1 text-center md:text-left flex flex-col gap-4 justify-center md:mt-8 ${isVisible ? 'animate-slide-in-right' : ''}`}
              style={{ animationDelay: '0.4s' }}
            >
              <p className={`${orbitron.className} text-pop animate-glow text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight max-w-5xl`}>
                <TypingText 
                  text="We don't just organize events. We craft experiences."
                  delay={600}
                  speed={30}
                />
              </p>
              <p className={`${orbitron.className} text-white-subtle text-lg md:text-xl lg:text-2xl leading-tight max-w-5xl`}>
                <TypingText 
                  text="Your journey starts today"
                  delay={3000}
                  speed={30}
                />
              </p>
              <button 
                onClick={handleProceed}
                className={`${orbitron.className} enter-button mt-6 px-4 py-2 text-white font-bold text-sm md:text-base rounded-lg border-2 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl w-fit ${isVisible ? 'animate-fade-in-up-delayed' : ''}`}
                style={{ animationDelay: '0.6s' }}
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      </Hero>
    </>
  );
}

