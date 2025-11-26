"use client"

import { useEffect, useState, useRef } from "react";
import { Orbitron } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const orbitron = Orbitron({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-orbitron",
  weight: ["400", "500", "600", "700", "800", "900"],
});

interface ConfettiParticle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
}

const COLORS = [
  "#FFD700", "#FFA500", "#FFE135", "#FFF8DC",
  "#FFFFFF", "#F5F5F5", "#E8E8E8", "#D3D3D3"
] as const;

export default function WelcomePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const particlesRef = useRef<ConfettiParticle[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Create initial confetti burst only (SSR-safe)
    if (typeof window === 'undefined') return;
    
    const initialParticles: ConfettiParticle[] = [];
    const width = window.innerWidth || 1920;
    for (let i = 0; i < 150; i++) {
      initialParticles.push({
        id: i,
        x: Math.random() * width,
        y: -10,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: Math.random() * 8 + 4,
        speedX: (Math.random() - 0.5) * 6,
        speedY: Math.random() * 5 + 4,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
      });
    }
    particlesRef.current = initialParticles;
  }, []);

  useEffect(() => {
    if (!canvasRef.current || typeof window === 'undefined') return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      if (typeof window !== 'undefined') {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const startTime = Date.now();
    const duration = 7000; // 7 seconds

    const animate = () => {
      const elapsed = Date.now() - startTime;
      
      // Stop animation after 7 seconds
      if (elapsed > duration) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particlesRef.current = [];
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current = particlesRef.current.map(particle => {
        // Draw particle
        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate((particle.rotation * Math.PI) / 180);
        ctx.fillStyle = particle.color;
        ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
        ctx.restore();

        // Update position
        const newX = particle.x + particle.speedX;
        const newY = particle.y + particle.speedY;
        const newRotation = particle.rotation + particle.rotationSpeed;

        // Remove if off screen (don't reset)
        if (newY > canvas.height + 20) {
          return null;
        }

        return {
          ...particle,
          x: newX,
          y: newY,
          rotation: newRotation,
        };
      }).filter((p): p is ConfettiParticle => p !== null);

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

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

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
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


        .text-pop {
          color: rgb(255, 255, 255) !important;
          font-weight: 800;
          letter-spacing: 0.05em;
          position: relative;
          text-shadow: 
            0 0 4px rgba(255, 255, 255, 0.5),
            0 0 8px rgba(255, 255, 255, 0.3),
            0 0 12px rgba(255, 255, 255, 0.2);
          transform: translateZ(0);
          backface-visibility: hidden;
        }

        .text-white-subtle {
          color: rgb(255, 255, 255);
          font-weight: 700;
          letter-spacing: 0.03em;
          position: relative;
          text-shadow: 
            0 0 3px rgba(255, 255, 255, 0.4),
            0 0 6px rgba(255, 255, 255, 0.3),
            0 0 9px rgba(255, 255, 255, 0.2);
          transform: translateZ(0);
          backface-visibility: hidden;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }

        h1.text-pop {
          opacity: 1 !important;
        }

        .animate-scale-in {
          animation: scaleIn 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-bounce-slow {
          animation: bounce 2s ease-in-out infinite;
        }

        .animate-glow {
          animation: glow 2s ease-in-out infinite;
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
      <div className="relative w-full h-screen overflow-hidden bg-black">
        <canvas
          ref={canvasRef}
          className="fixed inset-0 w-full h-full pointer-events-none z-0"
          style={{ background: "transparent" }}
        />
        
        <div className="relative z-20 w-full h-full flex items-center justify-center px-8 md:px-16 lg:px-24">
          <div className="text-center max-w-4xl mx-auto">
            {/* Back Button */}
            <div className="absolute top-8 left-8 md:top-12 md:left-12">
              <Link
                href="/activation"
                className={`${orbitron.className} inline-flex items-center text-sm text-white/70 hover:text-white transition-colors`}
              >
                ← Back
              </Link>
            </div>
            
            {/* Logo */}
            <div 
              className={`mb-4 ${isVisible ? 'animate-scale-in' : ''}`}
              style={{ animationDelay: '0.2s' }}
            >
              <Image
                src="/sponsors/sss.png"
                alt="Spectrum Logo"
                width={150}
                height={150}
                className="object-contain mx-auto animate-bounce-slow"
                priority
              />
            </div>

            {/* Congratulations Text */}
            <h1 
              className={`${orbitron.className} text-pop animate-glow text-2xl md:text-3xl lg:text-4xl leading-tight mb-4 relative z-30 ${isVisible ? 'animate-fade-in-up' : ''}`}
              style={{ 
                animationDelay: isVisible ? '0.4s' : '0s'
              }}
            >
              Congratulations — you are now officially part of the Spectrum Team 2026
            </h1>

            {/* Discord Info */}
            <div 
              className={`mt-6 space-y-4 ${isVisible ? 'animate-fade-in-up' : ''}`}
              style={{ animationDelay: '0.8s' }}
            >
              <p className={`${orbitron.className} text-white-subtle text-base md:text-lg leading-relaxed relative z-30`}>
                Join the official Spectrum Discord server to meet your team, get announcements, and begin onboarding.
              </p>

              <div className="flex justify-center">
                <a
                  href="https://discord.gg/fNmxe2cV"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${orbitron.className} enter-button relative z-30 px-4 py-2 text-white font-bold text-sm md:text-base rounded-lg border-2 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl w-fit`}
                >
                  Join Discord
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

