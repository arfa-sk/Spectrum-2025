"use client";

import { Suspense, lazy } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import ErrorBoundary from "@/components/ErrorBoundary";

// Lazy load below-the-fold components for better initial load performance
const AboutUs = lazy(() => import("@/components/AboutUs"));
const SpectrumStartupArena = lazy(() => import("@/components/SpectrumStartupArena"));
const ModulesPreview = lazy(() => import("@/components/ModulesPreview"));
const Gallery = lazy(() => import("@/components/Gallery"));
const Sponsors = lazy(() => import("@/components/Sponsors"));
const Stall = lazy(() => import("@/components/Stall"));
const ContactUs = lazy(() => import("@/components/ContactUs"));

// Loading fallback component
const SectionLoader = () => (
  <div className="min-h-[400px] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-[#FFD700] border-t-transparent rounded-full animate-spin" />
  </div>
);

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white text-black overflow-hidden">
      <Navbar />
      <HeroSection />

      <ErrorBoundary>
        <Suspense fallback={<SectionLoader />}>
          <AboutUs />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary>
        <Suspense fallback={<SectionLoader />}>
          <SpectrumStartupArena />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary>
        <Suspense fallback={<SectionLoader />}>
          <ModulesPreview />
        </Suspense>
      </ErrorBoundary>
      
      <ErrorBoundary>
        <Suspense fallback={<SectionLoader />}>
          <Gallery title="Gallery" />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary>
        <Suspense fallback={<SectionLoader />}>
          <Sponsors />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary>
        <Suspense fallback={<SectionLoader />}>
          <Stall />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary>
        <Suspense fallback={<SectionLoader />}>
          <ContactUs />
        </Suspense>
      </ErrorBoundary>

      <Footer />
    </main>
  );
}
