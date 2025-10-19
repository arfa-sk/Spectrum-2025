"use client";

import AboutUs from "@/components/AboutUs";
import ContactUs from "@/components/ContactUs";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import Sponsors from "@/components/Sponsors";
import Gallery from "@/components/Gallery";
import ErrorBoundary from "@/components/ErrorBoundary";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white text-black overflow-hidden">
      <Navbar />
      <HeroSection />

      {/* === SPONSORS HIGHLIGHT === */}
      

      {/* Register CTAs removed */}

      <ErrorBoundary>
        <AboutUs />
      </ErrorBoundary>
      
      {/* Gallery Section */}
      <ErrorBoundary>
        <Gallery title="Gallery" />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <Sponsors />
      </ErrorBoundary>
      <ErrorBoundary>
        <ContactUs />
      </ErrorBoundary>
      <Footer />

      {/* === CUSTOM ANIMATIONS === */}
      <style jsx>{`
        @keyframes marquee-seamless {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee-seamless {
          display: inline-flex;
          width: max-content;
          animation: marquee-seamless 25s linear infinite;
        }
        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        .animate-bounce {
          animation: bounce 1s infinite;
        }
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        .animate-shimmer {
          background: linear-gradient(90deg, #fff, #ffd700, #fff);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s linear infinite;
        }
      `}</style>
    </main>
  );
}
