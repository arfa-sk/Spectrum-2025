"use client";

import { useEffect, useState, useRef } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";
import { Orbitron } from "next/font/google";
import { TimelineContent } from "@/components/timeline-animation";
import type React from "react";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "700"] });

export default function ContactUs() {
  const [isBrowser, setIsBrowser] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeField, setActiveField] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => setIsBrowser(true), []);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    
    const handleScroll = () => {
      if (sectionRef.current) {
        const section = sectionRef.current;
        const scrollTop = window.scrollY;
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const progress = Math.max(0, Math.min(1, (scrollTop - sectionTop + window.innerHeight / 2) / sectionHeight));
        setScrollProgress(progress);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section id="contact" ref={sectionRef} className="relative z-10 py-20 md:py-28 overflow-hidden min-h-screen bg-white">

      {/* === ANIMATED BACKGROUND ELEMENTS === */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="absolute top-0 left-0 w-full h-px bg-gray-800" style={{ top: `${i * 5}%` }}></div>
          ))}
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="absolute top-0 left-0 h-full w-px bg-gray-800" style={{ left: `${i * 5}%` }}></div>
          ))}
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full border border-[#FFD700]/10 animate-float-slow"></div>
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 border border-[#FFD700]/10 rotate-45 animate-float-medium"></div>
        <div className="absolute top-2/3 left-1/5 w-32 h-32 border border-[#FFD700]/10 rounded-full animate-float-fast"></div>
        
        {/* Scroll progress indicator removed as requested */}
      </div>

      {/* === MOUSE GLOW === */}
      <div
        className="pointer-events-none fixed inset-0 z-20"
        style={{
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 215, 0, 0.06), transparent 70%)`,
        }}
      />

      {/* HEADER SECTION */}
      <div className="text-center mb-16 px-6">
        <TimelineContent animationNum={0} timelineRef={{ current: (typeof document !== 'undefined' ? (document.body as HTMLElement) : null) } as React.RefObject<HTMLElement | null>} once>
          <h1 className={`${orbitron.className} text-5xl md:text-6xl font-extrabold text-black mb-6`}>
            CONNECT WITH US
          </h1>
        </TimelineContent>
        <div className="w-24 h-1 bg-gradient-to-r from-[#FFD700] to-black mx-auto mb-6"></div>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Have questions about SPECTRUM 2025? Reach out to our team for information about events, registration, sponsorships, and more.
        </p>
      </div>

      {/* === CONTENT === */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 flex flex-col lg:flex-row gap-16 items-start justify-center">

        {/* Left: Contact Information */}
        <div className="flex-1 space-y-10 w-full lg:w-2/5">
          <div>
            <h2 className={`${orbitron.className} text-3xl font-bold text-black mb-6`}>
              Get In Touch
            </h2>
            
            {[{
              icon: FaMapMarkerAlt,
              title: "Event Address",
              text: "DHA Suffa University, DG-78, Off Khayaban-e-Tufail, Ph-VII (Ext.), DHA, Karachi-75"
            }, {
              icon: FaEnvelope,
              title: "Email Us",
              text: "dsuspectrum@gmail.com"
            }, {
              icon: FaPhoneAlt,
              title: "Call Us",
              text: "0309 9226663"
            }].map(({ icon: Icon, title, text }, i) => (
              <div
                key={i}
                className="flex items-start gap-5 p-6 rounded-xl bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group mb-6"
                onMouseEnter={() => setActiveField(`info-${i}`)}
                onMouseLeave={() => setActiveField(null)}
              >
                <div className={`p-3 rounded-lg bg-black group-hover:bg-[#FFD700] transition-colors duration-300 ${activeField === `info-${i}` ? 'animate-pulse' : ''}`}>
                  <Icon className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-black">{title}</h3>
                  <p className="text-gray-600 mt-2">{text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className={`${orbitron.className} text-xl font-bold text-black mb-4`}>Follow Us</h3>
            <div className="flex space-x-4">
              {[
                { icon: FaLinkedin, color: "bg-blue-600", url: "#" },
                { icon: FaTwitter, color: "bg-blue-400", url: "#" },
                { icon: FaInstagram, color: "bg-gradient-to-r from-purple-500 to-pink-500", url: "#" },
              ].map(({ icon: Icon, color, url }, i) => (
                <a
                  key={i}
                  href={url}
                  className={`p-3 rounded-lg ${color} text-white transform transition-all duration-300 hover:scale-110 hover:rotate-6`}
                >
                  <Icon className="text-xl" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="flex-1 w-full lg:w-3/5 bg-white rounded-2xl border border-gray-200 shadow-xl p-8">
          <div className="flex items-center mb-8">
            <div className="p-3 bg-black rounded-lg mr-4">
              <FaPaperPlane className="text-xl text-[#FFD700]" />
            </div>
            <h3 className={`${orbitron.className} text-2xl font-bold text-black`}>Reach Out Directly</h3>
          </div>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Name" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent outline-none transition-all"
                  onFocus={() => setActiveField('name')}
                  onBlur={() => setActiveField(null)}
                  required
                />
                {activeField === 'name' && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#FFD700] to-black animate-line-expand"></div>
                )}
              </div>
              
              <div className="relative">
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your Email" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent outline-none transition-all"
                  onFocus={() => setActiveField('email')}
                  onBlur={() => setActiveField(null)}
                  required
                />
                {activeField === 'email' && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#FFD700] to-black animate-line-expand"></div>
                )}
              </div>
            </div>
            
            <div className="relative">
              <input 
                type="text" 
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Subject" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent outline-none transition-all"
                onFocus={() => setActiveField('subject')}
                onBlur={() => setActiveField(null)}
                required
              />
              {activeField === 'subject' && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#FFD700] to-black animate-line-expand"></div>
              )}
            </div>
            
            <div className="relative">
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Your Message" 
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent outline-none transition-all resize-none"
                onFocus={() => setActiveField('message')}
                onBlur={() => setActiveField(null)}
                required
              ></textarea>
              {activeField === 'message' && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#FFD700] to-black animate-line-expand"></div>
              )}
            </div>
            
            <button 
              type="submit"
              className="group relative w-full bg-black text-white font-medium py-3 px-6 rounded-lg overflow-hidden transition-all duration-300 hover:bg-gray-900"
            >
              <span className="relative z-10 flex items-center justify-center">
                Send Message
                <FaPaperPlane className="ml-2 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#FFD700] to-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
            </button>
          </form>
        </div>
      </div>

      {/* Bottom: Google Map */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 mt-20">
        <div className="mb-8 text-center">
          <h3 className={`${orbitron.className} text-3xl font-bold text-black mb-2`}>Find Us Here</h3>
          <div className="h-1 w-16 bg-gradient-to-r from-[#FFD700] to-black mx-auto mb-4"></div>
        </div>
        
        <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-xl border border-gray-200">
          {isBrowser && (
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.234971035021!2d67.08152407501018!3d24.831132884064562!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33f1a5ed0ecfd%3A0xb276f4413a47a6b9!2sDHA%20Suffa%20University!5e0!3m2!1sen!2s!4v1689056789471!5m2!1sen!2s"
              width="100%"
              height="100%"
              className="border-0"
              allowFullScreen
              loading="lazy"
            />
          )}
          <div className="absolute inset-0 pointer-events-none border border-[#FFD700]/30 rounded-2xl"></div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes float-medium {
          0%, 100% { transform: translateY(0) rotate(45deg); }
          50% { transform: translateY(-15px) rotate(50deg); }
        }
        
        @keyframes float-fast {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(-5deg); }
        }
        
        .animate-float-slow { animation: float-slow 15s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 10s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 8s ease-in-out infinite; }
        
        @keyframes line-expand {
          0% { transform: scaleX(0); opacity: 0; }
          100% { transform: scaleX(1); opacity: 1; }
        }
        
        .animate-line-expand {
          animation: line-expand 0.3s ease-out forwards;
        }
        
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255, 215, 0, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(255, 215, 0, 0); }
        }
        
        .animate-pulse { animation: pulse 2s infinite; }
      `}</style>
    </section>
  );
}