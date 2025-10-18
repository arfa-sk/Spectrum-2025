"use client";

import { useState, useEffect, useRef } from "react";
import { Orbitron, Rajdhani, Space_Grotesk } from "next/font/google";
import { supabase } from "@/lib/supabaseClient";
import { FaUser, FaEnvelope, FaPhone, FaUniversity, FaIdCard, FaTrophy, FaUsers, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TimelineContent } from "@/components/timeline-animation";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "700"] });
const rajdhani = Rajdhani({ subsets: ["latin"], weight: ["400", "600"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

// Type definitions
interface FormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  university: string;
  department: string;
  rollNumber: string;
  mainCategory: string;
  subCategory: string;
  teamName: string;
  teamMembers: string;
  message: string;
}

interface SubCategories {
  [key: string]: string[];
}

const subCategories: SubCategories = {
  "Suffa's Got Talent": [
    "Singing",
    "Dance",
    "Stand-up Comedy",
    "Short Film",
    "Art",
    "Photography",
  ],
  "Hackathon": [
    "Web Dev",
    "Mobile App",
    "Data Science",
    "Cyber Security",
    "UI/UX",
    "Startup Ideathon",
  ],
  "Gaming Arena": ["PUBG", "Valorant", "FIFA", "Tekken"],
};

export default function RegisterPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phoneNumber: "",
    university: "",
    department: "",
    rollNumber: "",
    mainCategory: "",
    subCategory: "",
    teamName: "",
    teamMembers: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [termsError, setTermsError] = useState<string | null>(null);


  // Reset sub-category when main category changes
  useEffect(() => {
    if (formData.mainCategory) {
      setFormData((prev) => ({ ...prev, subCategory: "" }));
    }
  }, [formData.mainCategory]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    // Required field validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^(\+92)?[0-9]{10,11}$/.test(formData.phoneNumber.replace(/\s/g, ""))) {
      newErrors.phoneNumber = "Please enter a valid phone number";
    }

    // University validation
    if (!formData.university.trim()) {
      newErrors.university = "University/Institute name is required";
    }

    // Category validation
    if (!formData.mainCategory) {
      newErrors.mainCategory = "Please select a main category";
    }

    if (!formData.subCategory) {
      newErrors.subCategory = "Please select a sub-category";
    }

    // Terms & Conditions validation
    if (!termsAccepted) {
      setTermsError("You must agree to the terms and conditions to continue.");
    } else {
      setTermsError(null);
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0 && termsAccepted;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("idle");
    setSubmitMessage("");

    if (!validateForm()) {
      setSubmitStatus("error");
      setSubmitMessage("Please fix the errors above and try again.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Insert data into Supabase
      const { error } = await supabase
        .from("registrations")
        .insert([
          {
            full_name: formData.fullName,
            email: formData.email,
            phone_number: formData.phoneNumber,
            university: formData.university,
            department: formData.department || null,
            roll_number: formData.rollNumber || null,
            main_category: formData.mainCategory,
            sub_category: formData.subCategory,
            team_name: formData.teamName || null,
            team_members: formData.teamMembers || null,
            message: formData.message || null,
            terms_accepted: termsAccepted,
            created_at: new Date().toISOString(),
          },
        ])
        .select();

      if (error) throw error;

      setSubmitStatus("success");
      setSubmitMessage("Registration successful! We'll contact you soon.");
      
      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        university: "",
        department: "",
        rollNumber: "",
        mainCategory: "",
        subCategory: "",
        teamName: "",
        teamMembers: "",
        message: "",
      });

      // Scroll to success message
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error: unknown) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
      const message =
        typeof error === "object" && error !== null && "message" in error
          ? String((error as { message?: string }).message)
          : "An error occurred while submitting your registration. Please try again.";
      setSubmitMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const availableSubCategories = formData.mainCategory
    ? subCategories[formData.mainCategory]
    : [];

  return (
    <>
      <Navbar />
      <main ref={sectionRef} className="relative min-h-screen bg-white text-black overflow-hidden">

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden -z-10 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full border border-[#FFD700]/20 animate-float-slow"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 border border-[#FFD700]/20 rotate-45 animate-float-medium"></div>
        <div className="absolute top-1/2 left-1/3 w-48 h-48 border border-[#FFD700]/20 rounded-full animate-float-fast"></div>
      </div>

      {/* Header Section */}
      <div className="relative z-10 pt-32 pb-16 px-6 text-center">
        <TimelineContent animationNum={0} timelineRef={sectionRef} once={false}>
        <Link
          href="/"
          className={`${spaceGrotesk.className} inline-flex items-center text-sm text-gray-600 hover:text-black transition-colors mb-6`}
        >
          ← Back to Home
        </Link>
        </TimelineContent>
        <TimelineContent animationNum={1} timelineRef={sectionRef} once={false}>
        <h1
            className={`${orbitron.className} text-5xl md:text-7xl font-extrabold mb-6 text-black`}
        >
          REGISTER NOW
        </h1>
        </TimelineContent>
        <TimelineContent animationNum={2} timelineRef={sectionRef} once={false}>
        <div className="w-32 h-1 bg-gradient-to-r from-[#FFD700] to-black mx-auto mb-6"></div>
        </TimelineContent>
        <TimelineContent animationNum={3} timelineRef={sectionRef} once={false}>
          <p className={`${spaceGrotesk.className} text-lg md:text-xl text-gray-700 max-w-2xl mx-auto`}>
          Join Pakistan&apos;s Premier Tech Festival — Spectrum 2025
        </p>
        </TimelineContent>
      </div>

      {/* Status Messages */}
      {submitStatus === "success" && (
        <TimelineContent animationNum={4} timelineRef={sectionRef} once={false}>
        <div className="max-w-4xl mx-auto px-6 mb-8">
          <div className="bg-green-50 border-2 border-green-500 rounded-xl p-6 flex items-start gap-4 animate-slide-down">
            <FaCheckCircle className="text-green-500 text-3xl flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-green-800 text-lg mb-1">Success!</h3>
              <p className="text-green-700">{submitMessage}</p>
            </div>
          </div>
        </div>
        </TimelineContent>
      )}

      {submitStatus === "error" && submitMessage && (
        <TimelineContent animationNum={4} timelineRef={sectionRef} once={false}>
        <div className="max-w-4xl mx-auto px-6 mb-8">
          <div className="bg-red-50 border-2 border-red-500 rounded-xl p-6 flex items-start gap-4 animate-slide-down">
            <FaExclamationCircle className="text-red-500 text-3xl flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-red-800 text-lg mb-1">Error</h3>
              <p className="text-red-700">{submitMessage}</p>
            </div>
          </div>
        </div>
        </TimelineContent>
      )}

      {/* Registration Form */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 pb-20">
        <TimelineContent 
          animationNum={5} 
          timelineRef={sectionRef} 
          once={true}
          customVariants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1],
              },
            },
            hidden: {
              opacity: 0,
              y: 30,
            },
          }}
        >
        <div className="bg-white rounded-3xl border-2 border-[#FFD700]/30 shadow-[0_0_50px_rgba(255,215,0,0.2)] p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information Section */}
            <div>
              <h2 className={`${orbitron.className} text-2xl font-bold mb-6 flex items-center gap-3`}>
                <FaUser className="text-[#FFD700]" />
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent outline-none transition-all ${
                      errors.fullName ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <FaExclamationCircle className="text-xs" />
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-bold mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      className={`w-full pl-12 pr-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent outline-none transition-all ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <FaExclamationCircle className="text-xs" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-bold mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="+92 300 1234567"
                      className={`w-full pl-12 pr-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent outline-none transition-all ${
                        errors.phoneNumber ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                  </div>
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <FaExclamationCircle className="text-xs" />
                      {errors.phoneNumber}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Academic Information Section */}
            <div className="pt-6 border-t-2 border-gray-200">
              <h2 className={`${orbitron.className} text-2xl font-bold mb-6 flex items-center gap-3`}>
                <FaUniversity className="text-[#FFD700]" />
                Academic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* University */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold mb-2">
                    University / Institute Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="university"
                    value={formData.university}
                    onChange={handleInputChange}
                    placeholder="e.g., DHA Suffa University"
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent outline-none transition-all ${
                      errors.university ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.university && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <FaExclamationCircle className="text-xs" />
                      {errors.university}
                    </p>
                  )}
                </div>

                {/* Department */}
                <div>
                  <label className="block text-sm font-bold mb-2">Department</label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    placeholder="e.g., Computer Science"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent outline-none transition-all"
                  />
                </div>

                {/* Roll Number */}
                <div>
                  <label className="block text-sm font-bold mb-2">Roll Number / ID</label>
                  <div className="relative">
                    <FaIdCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="rollNumber"
                      value={formData.rollNumber}
                      onChange={handleInputChange}
                      placeholder="e.g., 20CS123"
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Event Selection Section */}
            <div className="pt-6 border-t-2 border-gray-200">
              <h2 className={`${orbitron.className} text-2xl font-bold mb-6 flex items-center gap-3`}>
                <FaTrophy className="text-[#FFD700]" />
                Event Selection
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Main Category */}
                <div>
                  <label className="block text-sm font-bold mb-2">
                    Main Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="mainCategory"
                    value={formData.mainCategory}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent outline-none transition-all appearance-none bg-white cursor-pointer ${
                      errors.mainCategory ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select a category</option>
                    <option value="Suffa's Got Talent">Suffa&apos;s Got Talent</option>
                    <option value="Hackathon">Hackathon</option>
                    <option value="Gaming Arena">Gaming Arena</option>
                  </select>
                  {errors.mainCategory && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <FaExclamationCircle className="text-xs" />
                      {errors.mainCategory}
                    </p>
                  )}
                </div>

                {/* Sub Category */}
                <div>
                  <label className="block text-sm font-bold mb-2">
                    Sub-Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="subCategory"
                    value={formData.subCategory}
                    onChange={handleInputChange}
                    disabled={!formData.mainCategory}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent outline-none transition-all appearance-none bg-white cursor-pointer ${
                      errors.subCategory ? "border-red-500" : "border-gray-300"
                    } ${!formData.mainCategory ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <option value="">
                      {formData.mainCategory ? "Select a sub-category" : "Select main category first"}
                    </option>
                    {availableSubCategories.map((subCat) => (
                      <option key={subCat} value={subCat}>
                        {subCat}
                      </option>
                    ))}
                  </select>
                  {errors.subCategory && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <FaExclamationCircle className="text-xs" />
                      {errors.subCategory}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Team Information Section */}
            <div className="pt-6 border-t-2 border-gray-200">
              <h2 className={`${orbitron.className} text-2xl font-bold mb-6 flex items-center gap-3`}>
                <FaUsers className="text-[#FFD700]" />
                Team Information
              </h2>
              <div className="space-y-6">
                {/* Team Name */}
                <div>
                  <label className="block text-sm font-bold mb-2">Team Name</label>
                  <input
                    type="text"
                    name="teamName"
                    value={formData.teamName}
                    onChange={handleInputChange}
                    placeholder="Enter your team name (if applicable)"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent outline-none transition-all"
                  />
                </div>

                {/* Team Members */}
                <div>
                  <label className="block text-sm font-bold mb-2">Team Members</label>
                  <textarea
                    name="teamMembers"
                    value={formData.teamMembers}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="List team member names (one per line)&#10;Example:&#10;John Doe&#10;Jane Smith&#10;Mike Johnson"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent outline-none transition-all resize-none"
                  />
                  <p className="text-sm text-gray-500 mt-1">Enter each team member&apos;s name on a new line</p>
                </div>
              </div>
            </div>

            {/* Consent & Submission */}
            <div className="pt-6 border-t-2 border-gray-200">
              <h2 className={`${orbitron.className} text-2xl font-bold mb-4`}>Consent & Submission</h2>
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => {
                    setTermsAccepted(e.target.checked);
                    if (e.target.checked) setTermsError(null);
                  }}
                  className="mt-1 h-5 w-5 accent-black border-2 border-gray-300 rounded"
                />
                <span className={`${spaceGrotesk.className} text-sm md:text-base text-gray-800`}>
                  I agree to the terms and conditions.
                </span>
              </label>
              {termsError && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <FaExclamationCircle className="text-xs" />
                  {termsError}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-6 text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`${orbitron.className} inline-block px-12 py-5 bg-black text-white font-bold rounded-full shadow-lg transition transform hover:shadow-xl hover:scale-110 ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-3">
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-3">
                    <FaCheckCircle />
                    Complete Registration
                  </span>
                )}
              </button>
            </div>

            <p className="text-center text-sm text-gray-400 mt-6">
              By registering, you agree to our terms and conditions. We&apos;ll contact you with further details
              about the event.
            </p>
          </form>
        </div>
        </TimelineContent>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        .animate-shimmer {
          background: linear-gradient(90deg, #000, #ffd700, #000, #ffd700);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s linear infinite;
        }

        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-30px) rotate(5deg);
          }
        }

        @keyframes float-medium {
          0%,
          100% {
            transform: translateY(0) rotate(45deg);
          }
          50% {
            transform: translateY(-20px) rotate(50deg);
          }
        }

        @keyframes float-fast {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(-5deg);
          }
        }

        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-float-slow {
          animation: float-slow 20s ease-in-out infinite;
        }
        .animate-float-medium {
          animation: float-medium 15s ease-in-out infinite;
        }
        .animate-float-fast {
          animation: float-fast 12s ease-in-out infinite;
        }
        .animate-slide-down {
          animation: slide-down 0.5s ease-out;
        }
      `}</style>
    </main>
      <Footer />
    </>
  );
}

