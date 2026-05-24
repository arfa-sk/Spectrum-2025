"use client";

import { useState, useEffect, useRef } from "react";
import { Orbitron, Space_Grotesk } from "next/font/google";
import { FaUser, FaEnvelope, FaPhone, FaUniversity, FaIdCard, FaTrophy, FaUsers, FaCheckCircle, FaExclamationCircle, FaCogs, FaTicketAlt } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TimelineContent } from "@/components/timeline-animation";
import {
  compressTeamLogo,
  formatLogoSize,
  MAX_TEAM_LOGO_INPUT_BYTES,
  uploadTeamLogo,
} from "@/lib/teamLogoUpload";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "700"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

// Type definitions
interface TeamMember {
  name: string;
  phoneNumber: string;
}

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
  inGameUid?: string;
  teamMembersDetails: TeamMember[];
  projectIdea?: string;
  githubLink?: string;
  techStack?: string;
  problemStatement?: string;
  teamRoles?: string;
}

interface SubCategories {
  [key: string]: string[];
}

const subCategories: SubCategories = {
  "E-Sports": [
    "FC 26",
    "Tekken 8",
    "PUBG",
    "Free Fire",
    "Counter-Strike 2",
    "Valorant"
  ],
  "Hackathon": [
    "Competitive Programming",
    "AI & DS Hackathon",
    "Vibe & Pitch Hackathon"
  ],
  "Play To Win": [
    "Singing",
    "Standup Comedy",
    "Tug of War",
    "The Memory Pat",
    "Minute to Win It",
    "Arm Wrestling"
  ],
  "Spectrum Startup Arena": [],
  "Qawali Night": [
    "Standard Ticket - Rs. 800",
    "DSU Student Ticket - Rs. 700"
  ],
  "Special Deals": [
    "Qawali Night Pass - Rs. 700",
    "Hackathon + Qawali Bundle - Rs. 800",
    "Gaming + Qawali Bundle - Rs. 800"
  ]
};

const eSportsFivePlayerGames = ["Counter-Strike 2", "Valorant"];
const teamESportsGames = ["PUBG", "Free Fire", "Counter-Strike 2", "Valorant"];

async function parseRegisterApiResponse(response: Response): Promise<Record<string, unknown>> {
  const text = await response.text();

  if (
    response.status === 413 ||
    text.includes("Request Entity Too Large") ||
    text.includes("Body exceeded") ||
    text.includes("FUNCTION_PAYLOAD_TOO_LARGE")
  ) {
    throw new Error(
      "Upload too large. Please use a team logo under 2 MB, or register without a logo."
    );
  }

  if (!text.trim()) {
    return {};
  }

  try {
    return JSON.parse(text) as Record<string, unknown>;
  } catch {
    throw new Error(
      response.ok
        ? "Registration server returned an invalid response. Please try again."
        : `Registration failed (${response.status}). Please try again or contact support.`
    );
  }
}

function isNetworkFailure(message: string): boolean {
  const msg = message.toLowerCase();
  return (
    msg.includes("failed to fetch") ||
    msg.includes("network error") ||
    msg.includes("networkerror") ||
    msg.includes("load failed") ||
    msg.includes("network request failed") ||
    msg.includes("the internet connection appears to be offline")
  );
}

const getRequiredTeamMembersCount = (mainCategory: string, subCategory: string, hackathonFormat?: string): number => {
  if (mainCategory === "Hackathon") {
    if (hackathonFormat === "Solo") return 0;
    if (hackathonFormat === "Duo") return 1;
    return 2; // Triplet
  }
  if (mainCategory === "Spectrum Startup Arena") return 3;
  if (mainCategory === "E-Sports") {
    if (eSportsFivePlayerGames.includes(subCategory)) return 4;
    if (teamESportsGames.includes(subCategory)) return 3;
  }
  return 0;
};

export default function RegisterPage() {
  const router = useRouter();
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
    teamMembersDetails: [
      { name: "", phoneNumber: "" },
      { name: "", phoneNumber: "" },
      { name: "", phoneNumber: "" },
      { name: "", phoneNumber: "" }
    ],
    projectIdea: "",
    githubLink: "",
    techStack: "",
    problemStatement: "",
    teamRoles: ""
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [teamLogo, setTeamLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoError, setLogoError] = useState("");
  const [isProcessingLogo, setIsProcessingLogo] = useState(false);
  const [termsError, setTermsError] = useState<string | null>(null);
  const [hackathonFormat, setHackathonFormat] = useState<string>("Solo");
  const requiredTeamMemberCount = getRequiredTeamMembersCount(formData.mainCategory, formData.subCategory, hackathonFormat);

  // Phase 1: Scalability improvements
  const lastSubmissionTimeRef = useRef<number>(0);
  const submissionCooldownMs = 3000;

  const [showStatusCheck, setShowStatusCheck] = useState(false);
  const [statusCheckEmail, setStatusCheckEmail] = useState("");
  const [statusCheckLoading, setStatusCheckLoading] = useState(false);
  const [statusCheckResult, setStatusCheckResult] = useState<{
    type: "registered" | "not_registered" | "error";
    message: string;
  } | null>(null);

  useEffect(() => {
    return () => {
      if (logoPreview) URL.revokeObjectURL(logoPreview);
    };
  }, [logoPreview]);

  const handleTeamLogoSelect = async (file: File | undefined) => {
    if (!file) {
      setTeamLogo(null);
      setLogoError("");
      if (logoPreview) URL.revokeObjectURL(logoPreview);
      setLogoPreview(null);
      return;
    }

    if (file.size > MAX_TEAM_LOGO_INPUT_BYTES) {
      setTeamLogo(null);
      setLogoError(`File is too large (${formatLogoSize(file.size)}). Maximum input size is 10 MB.`);
      if (logoPreview) URL.revokeObjectURL(logoPreview);
      setLogoPreview(null);
      return;
    }

    setIsProcessingLogo(true);
    setLogoError("");

    try {
      const compressed = await compressTeamLogo(file);
      if (logoPreview) URL.revokeObjectURL(logoPreview);
      setTeamLogo(compressed);
      setLogoPreview(URL.createObjectURL(compressed));
    } catch (error: unknown) {
      setTeamLogo(null);
      if (logoPreview) URL.revokeObjectURL(logoPreview);
      setLogoPreview(null);
      setLogoError(error instanceof Error ? error.message : "Could not process this image. Please try another file.");
    } finally {
      setIsProcessingLogo(false);
    }
  };


  // Pre-populate mainCategory and subCategory from URL parameters
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const category = params.get("category");
      const game = params.get("game");
      const track = params.get("track");
      const ticket = params.get("ticket");
      const deal = params.get("deal");
      const subCategoryParam = params.get("subCategory");

      const trackMap: Record<string, string> = {
        "competitive-programming": "Competitive Programming",
        "ai-ds-hackathon": "AI & DS Hackathon",
        "vibe-and-pitch": "Vibe & Pitch Hackathon"
      };

      if (category === "Qawali") {
        setFormData(prev => ({
          ...prev,
          mainCategory: "Qawali Night",
          subCategory: ticket === "student" ? "DSU Student Ticket - Rs. 700" : "Standard Ticket - Rs. 800"
        }));
      } else if (category === "Special Deals" || category === "Special%20Deals") {
        let mappedDeal = "";
        if (deal === "qawali-pass") mappedDeal = "Qawali Night Pass - Rs. 700";
        else if (deal === "hackathon-bundle") mappedDeal = "Hackathon + Qawali Bundle - Rs. 800";
        else if (deal === "gaming-bundle") mappedDeal = "Gaming + Qawali Bundle - Rs. 800";

        setFormData(prev => ({
          ...prev,
          mainCategory: "Special Deals",
          subCategory: mappedDeal
        }));
      } else if (category && subCategories[category]) {
        const rawSub = subCategoryParam || track || game;
        const mappedSub = rawSub ? (trackMap[rawSub] || rawSub) : "";
        setFormData(prev => ({
          ...prev,
          mainCategory: category,
          subCategory: mappedSub && subCategories[category].includes(mappedSub) ? mappedSub : ""
        }));
      }
    }
  }, []);

  // Submit registration (single attempt — no auto-retry to avoid duplicates)
  const submitViaAPI = async (
    teamLogoUrl: string | null
  ): Promise<{ success: boolean; message: string; registrationId?: string }> => {
    const payload = {
      fullName: formData.fullName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      university: formData.university,
      department: formData.department || undefined,
      rollNumber: formData.rollNumber || undefined,
      mainCategory: formData.mainCategory,
      subCategory: formData.subCategory || undefined,
      teamName: formData.teamName || undefined,
      teamMembersDetails: formData.teamMembersDetails,
      termsAccepted,
      teamLogoUrl: teamLogoUrl || undefined,
      projectIdea: formData.projectIdea || undefined,
      githubLink: formData.githubLink || undefined,
      techStack: formData.techStack || undefined,
      problemStatement: formData.problemStatement || undefined,
      teamRoles: formData.teamRoles || undefined,
    };

    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await parseRegisterApiResponse(response);

    if (response.status === 429) {
      const retryAfter = String(data.retryAfter ?? response.headers.get("Retry-After") ?? "300");
      throw new Error(
        `Too many registration attempts. Please wait ${retryAfter} seconds before trying again.`
      );
    }

    if (response.status === 409 || data.alreadyRegistered) {
      throw new Error(
        String(
          data.error ??
            `You are already registered for ${formData.mainCategory} — ${formData.subCategory || "General"}. You don't need to sign up again for this event.`
        )
      );
    }

    if (!response.ok || !data.success) {
      throw new Error(String(data.error ?? data.message ?? "Registration failed"));
    }

    const registrationData = data.data as { id?: string; email?: string } | undefined;

    return {
      success: true,
      message: String(data.message ?? "Registration successful!"),
      registrationId: registrationData?.id,
    };
  };

  const attachTeamLogo = async (registrationId: string, logoUrl: string) => {
    const response = await fetch("/api/register/logo", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        registrationId,
        email: formData.email,
        teamLogoUrl: logoUrl,
      }),
    });

    const data = await parseRegisterApiResponse(response);
    if (!response.ok || !data.success) {
      throw new Error(String(data.error ?? "Could not save team logo."));
    }
  };

  const handleCheckRegistrationStatus = async () => {
    const email = (statusCheckEmail || formData.email).trim();
    if (!email) {
      setStatusCheckResult({ type: "error", message: "Please enter your email address." });
      return;
    }
    if (!formData.mainCategory) {
      setStatusCheckResult({ type: "error", message: "Please select an event category first." });
      return;
    }
    if (!formData.subCategory && subCategories[formData.mainCategory]?.length) {
      setStatusCheckResult({ type: "error", message: "Please select a sub-category first." });
      return;
    }

    setStatusCheckLoading(true);
    setStatusCheckResult(null);

    try {
      const params = new URLSearchParams({
        email,
        mainCategory: formData.mainCategory,
        subCategory: formData.subCategory || "General",
      });
      const response = await fetch(`/api/register/status?${params.toString()}`);
      const data = await parseRegisterApiResponse(response);

      if (!response.ok || !data.success) {
        throw new Error(String(data.error ?? "Could not check registration status."));
      }

      if (data.registered) {
        setStatusCheckResult({
          type: "registered",
          message: `Yes — you're registered for ${String(data.event ?? "this event")}. No need to submit again.`,
        });
      } else {
        setStatusCheckResult({
          type: "not_registered",
          message: `Not registered yet for ${String(data.event ?? "this event")}. You can submit the form below.`,
        });
      }
    } catch (error: unknown) {
      setStatusCheckResult({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Could not check registration status. Please try again.",
      });
    } finally {
      setStatusCheckLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "mainCategory" ? { subCategory: "" } : {})
    }));
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

    // University validation (optional)
    if (formData.university.trim() && !/^[a-zA-Z\s&.,'-]+$/.test(formData.university.trim())) {
      newErrors.university = "University/Institute name should only contain letters, spaces, and common punctuation";
    }

    // Department validation (optional but if provided, should be alphabets only)
    if (formData.department.trim() && !/^[a-zA-Z\s&.,'-]+$/.test(formData.department.trim())) {
      newErrors.department = "Department should only contain letters, spaces, and common punctuation";
    }

    // Category validation
    if (!formData.mainCategory) {
      newErrors.mainCategory = "Please select a main category";
    }

    // Sub-category validation (only required if the category has sub-categories)
    const categoriesWithSubCategories = ["E-Sports", "Hackathon", "Play To Win", "Qawali Night", "Special Deals"];
    if (categoriesWithSubCategories.includes(formData.mainCategory) && !formData.subCategory) {
      newErrors.subCategory = "Please select a sub-category";
    }

    // Team validation
    const requiredTeamMemberCount = getRequiredTeamMembersCount(formData.mainCategory, formData.subCategory, hackathonFormat);
    const isTeamEvent = requiredTeamMemberCount > 0;

    if (isTeamEvent) {
      if (!formData.teamName || !formData.teamName.trim()) {
        newErrors.teamName = "Team name is required for team-based events";
      }
      
      // Check if required additional member fields are all filled
      const membersToValidate = formData.teamMembersDetails.slice(0, requiredTeamMemberCount);
      const hasIncompleteMember = membersToValidate.some(member => !member.name.trim() || !member.phoneNumber.trim());
      if (hasIncompleteMember) {
        if (formData.mainCategory === "Hackathon") {
          newErrors.teamName = `Please fill in details for all selected team members (Member ${requiredTeamMemberCount === 1 ? "2" : "2 and 3"}).`;
        } else {
          newErrors.teamName = `Teams require ${requiredTeamMemberCount + 1} players. Please fill in details for all ${requiredTeamMemberCount} additional members.`;
        }
      }
    }

    // Terms & Conditions validation
    if (!termsAccepted) {
      setTermsError("You must agree to the terms and conditions to continue.");
    } else {
      setTermsError(null);
    }

    if (isProcessingLogo) {
      setLogoError("Please wait for the image to finish processing.");
    }

    setErrors(newErrors);
    const logoValid = !logoError && !isProcessingLogo;
    return Object.keys(newErrors).length === 0 && termsAccepted && logoValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Phase 1: Debouncing - Prevent rapid submissions
    const now = Date.now();
    const timeSinceLastSubmission = now - lastSubmissionTimeRef.current;

    if (timeSinceLastSubmission < submissionCooldownMs) {
      const remainingTime = Math.ceil((submissionCooldownMs - timeSinceLastSubmission) / 1000);
      setSubmitStatus("error");
      setSubmitMessage(`Please wait ${remainingTime} second${remainingTime > 1 ? 's' : ''} before submitting again.`);
      return;
    }

    // Phase 1: Prevent double submission
    if (isSubmitting) {
      return;
    }

    setSubmitStatus("idle");
    setSubmitMessage("");

    // Run validation
    const validationResult = validateForm();

    if (!validationResult) {
      setSubmitStatus("error");
      setSubmitMessage("Please fix the errors above and try again.");
      return;
    }

    setIsSubmitting(true);
    lastSubmissionTimeRef.current = now;

    try {
      setSubmitMessage("Submitting registration...");
      const result = await submitViaAPI(null);

      let successMessage = result.message || "Registration successful! Redirecting to confirmation page...";

      if (teamLogo && result.registrationId) {
        setSubmitMessage("Registration saved. Uploading team logo...");
        try {
          const logoUrl = await uploadTeamLogo(teamLogo);
          await attachTeamLogo(result.registrationId, logoUrl);
        } catch {
          successMessage =
            "Registration successful! We couldn't attach your team logo — please contact spectrum2026.dsu@gmail.com if you need to add it.";
        }
      }

      setSubmitStatus("success");
      setSubmitMessage(successMessage);
      
      setTimeout(() => {
        try {
          // Save last registration category/subcategory to sessionStorage so the success page
          // can display context-aware contact info (e.g., gaming vs hackathon support).
          sessionStorage.setItem("lastRegistrationCategory", formData.mainCategory || "");
          sessionStorage.setItem("lastRegistrationSub", formData.subCategory || "");
        } catch (e) {
          // ignore storage errors (e.g., SSR or private mode)
        }
        router.push("/register/success");
      }, 1000);

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
        teamMembersDetails: [
          { name: "", phoneNumber: "" },
          { name: "", phoneNumber: "" },
          { name: "", phoneNumber: "" }
        ],
        projectIdea: "",
        githubLink: "",
        techStack: "",
        problemStatement: "",
        teamRoles: ""
      });
      setTeamLogo(null);
      if (logoPreview) URL.revokeObjectURL(logoPreview);
      setLogoPreview(null);
      setLogoError("");

      // Scroll to success message
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error: unknown) {
      setSubmitStatus("error");

      // Extract error message safely with multiple fallbacks
      let message = "An error occurred while submitting your registration. Please try again.";
      let errorCode = "";
      let errorMessage = "";

      if (error instanceof Error) {
        message = error.message;
        errorMessage = error.message;
      } else if (typeof error === "object" && error !== null) {
        // Type guard for error object
        interface ErrorLike {
          message?: unknown;
          code?: unknown;
          details?: unknown;
          hint?: unknown;
          error?: { message?: unknown };
          toString?: () => string;
        }
        const errorObj = error as ErrorLike;

        errorCode = String(errorObj.code || "");
        errorMessage = String(errorObj.message || errorObj.details || errorObj.hint || "");

        // Try multiple possible error message locations
        if (errorObj.message) {
          message = String(errorObj.message);
        } else if (errorObj.error?.message) {
          message = String(errorObj.error.message);
        } else if (errorObj.details) {
          message = String(errorObj.details);
        } else if (errorObj.hint) {
          message = String(errorObj.hint);
        } else if (errorObj.toString && errorObj.toString() !== "[object Object]") {
          message = errorObj.toString();
        }
      } else if (typeof error === "string") {
        message = error;
        errorMessage = error;
      }

      // Phase 1: Enhanced error messages with retry information
      // RLS errors
      if (errorCode === "42501" || errorMessage.includes("row-level security policy") || errorMessage.includes("RLS") || errorMessage.includes("policy")) {
        message = "Registration is currently unavailable due to security configuration. Please contact support or try again later.";
      }
      // Duplicate email errors
      else if (
        errorCode === "23505" ||
        errorMessage.includes("duplicate key") ||
        errorMessage.includes("already exists") ||
        errorMessage.includes("unique constraint") ||
        errorMessage.includes("already registered") ||
        errorMessage.includes("don't need to sign up again")
      ) {
        message = errorMessage.includes("already registered") || errorMessage.includes("don't need to sign up again")
          ? errorMessage
          : `You are already registered for ${formData.mainCategory}${formData.subCategory ? ` — ${formData.subCategory}` : ""}. You don't need to sign up again for this event.`;
      }
      // Server-side registration errors
      else if (
        errorMessage.includes("Registration service is temporarily unavailable") ||
        errorMessage.includes("Registration failed") ||
        errorMessage.includes("unexpected error occurred") ||
        errorMessage.includes("An unexpected error")
      ) {
        message = "Something went wrong on our end. Please try again in a moment, or contact spectrum2026.dsu@gmail.com if it keeps happening.";
      }
      // Validation errors from API
      else if (errorMessage.includes("Validation failed")) {
        message = "Please check your form details and try again.";
      }
      // Logo upload errors
      else if (
        errorMessage.includes("team logo") ||
        errorMessage.includes("Logo upload") ||
        errorMessage.includes("Could not upload") ||
        errorMessage.includes("Could not process image")
      ) {
        message = errorMessage;
        setLogoError(errorMessage);
      }
      // Upload / payload size errors
      else if (
        errorMessage.includes("Upload too large") ||
        errorMessage.includes("Team logo must be") ||
        errorMessage.includes("Invalid team logo") ||
        errorMessage.includes("Request Entity Too Large") ||
        errorMessage.includes("not valid JSON") ||
        errorMessage.includes("Unexpected token")
      ) {
        message = "There was a problem with the team logo. Please try a different image or register without one.";
        setLogoError("Please choose a different image or skip the logo.");
      }
      // Real network / timeout failures (request never completed)
      else if (isNetworkFailure(errorMessage)) {
        message =
          "We couldn't confirm your registration. Please use 'Check my registration' below before submitting again.";
      }
      // Invalid subcategory errors
      else if (errorMessage.includes("Invalid subcategory") || errorMessage.includes("subcategory")) {
        message = "Please select a valid subcategory for your chosen category.";
      }
      // Constraint violation errors
      else if (errorMessage.includes("violates check constraint") || errorMessage.includes("constraint")) {
        if (errorMessage.includes("email")) {
          message = "Please enter a valid email address.";
        } else if (errorMessage.includes("phone")) {
          message = "Please enter a valid phone number (10-11 digits).";
        } else if (errorMessage.includes("category")) {
          message = "Please select a valid category.";
        } else {
          message = "Please fill in all required fields correctly.";
        }
      }
      // Team validation errors
      else if (errorMessage.includes("Team name is required") || errorMessage.includes("team")) {
        message = "Team name and members are required for this category.";
      }
      // Required field errors
      else if (errorMessage.includes("required") || errorMessage.includes("NOT NULL")) {
        message = "Please fill in all required fields.";
      }

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
              className={`${orbitron.className} text-5xl md:text-7xl font-bold mb-6 text-black`}
            >
              REGISTER NOW
            </h1>
          </TimelineContent>
          <TimelineContent animationNum={2} timelineRef={sectionRef} once={false}>
            <div className="w-32 h-1 bg-gradient-to-r from-[#FFD700] to-black mx-auto mb-6"></div>
          </TimelineContent>
          <TimelineContent animationNum={3} timelineRef={sectionRef} once={false}>
            <p className={`${spaceGrotesk.className} text-lg md:text-xl text-gray-700 max-w-2xl mx-auto`}>
              Join Pakistan&apos;s Premier Tech Festival — Spectrum 2026
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
              {/* Check registration status */}
              <div className="mb-8 pb-8 border-b border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowStatusCheck((prev) => !prev)}
                  className="text-sm font-bold text-gray-700 hover:text-black underline underline-offset-2"
                >
                  {showStatusCheck ? "Hide registration check" : "Already submitted? Check if you're registered"}
                </button>

                {showStatusCheck && (
                  <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-3">
                    <p className="text-sm text-gray-600">
                      Unsure if your registration went through? Check here before submitting again.
                    </p>
                    <input
                      type="email"
                      placeholder="Your email address"
                      value={statusCheckEmail || formData.email}
                      onChange={(e) => setStatusCheckEmail(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD700] outline-none"
                    />
                    <p className="text-xs text-gray-500">
                      Uses the event category and sub-category selected in the form below.
                    </p>
                    <button
                      type="button"
                      disabled={statusCheckLoading}
                      onClick={() => void handleCheckRegistrationStatus()}
                      className="px-5 py-2.5 bg-black text-[#FFD700] font-bold rounded-lg hover:bg-gray-900 disabled:opacity-60"
                    >
                      {statusCheckLoading ? "Checking..." : "Check my registration"}
                    </button>
                    {statusCheckResult && (
                      <p
                        className={`text-sm font-semibold ${
                          statusCheckResult.type === "registered"
                            ? "text-green-700"
                            : statusCheckResult.type === "not_registered"
                              ? "text-blue-700"
                              : "text-red-600"
                        }`}
                      >
                        {statusCheckResult.message}
                      </p>
                    )}
                  </div>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Immersive V3 Visual Checkout Banner */}
                {(formData.mainCategory === "Qawali Night" || formData.mainCategory === "Special Deals") && (
                  <div className="backdrop-blur-md bg-neutral-950 text-white rounded-2xl border-2 border-[#FFD700]/40 p-6 md:p-8 space-y-4 shadow-[0_0_30px_rgba(255,215,0,0.15)] animate-slide-down">
                    <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                      <div className="w-10 h-10 bg-neutral-900 border border-[#FFD700]/30 rounded-xl flex items-center justify-center">
                        <FaTicketAlt className="text-[#FFD700] text-lg animate-pulse" />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">// Checkout Summary</p>
                        <h4 className={`${orbitron.className} text-base md:text-lg font-bold text-[#FFD700]`}>
                          {formData.mainCategory}
                        </h4>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <p className="text-gray-400 font-semibold">Selected Ticket/Package:</p>
                        <p className="text-white font-bold mt-1 text-sm">{formData.subCategory || "None Selected"}</p>
                      </div>
                      <div className="sm:text-right">
                        <p className="text-gray-400 font-semibold">Payable Amount:</p>
                        <p className={`${orbitron.className} text-xl font-black text-[#FFD700] mt-0.5`}>
                          {formData.subCategory?.includes("Rs. 800") ? "Rs. 800" : formData.subCategory?.includes("Rs. 700") ? "Rs. 700" : "Select below"}
                        </p>
                      </div>
                    </div>

                    <div className="bg-neutral-900/60 border border-white/5 rounded-xl p-4 text-[11px] text-gray-300 space-y-2">
                      <p className="font-bold text-white uppercase tracking-wider text-[9px]">Included in Pass:</p>
                      {formData.mainCategory === "Qawali Night" ? (
                        <ul className="list-disc pl-4 space-y-1">
                          <li>Standard open lawn access under the stars</li>
                          <li>Full Sufi Qawali performances admission</li>
                          <li>DSU campus visitor clearance certificate</li>
                        </ul>
                      ) : (
                        <ul className="list-disc pl-4 space-y-1">
                          <li>Exclusive combo package access (music + arena entry)</li>
                          <li>VIP priority seating passes included</li>
                          <li>Free snack refreshments & certificates</li>
                        </ul>
                      )}
                    </div>
                  </div>
                )}

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
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent outline-none transition-all ${errors.fullName ? "border-red-500" : "border-gray-300"
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
                          className={`w-full pl-12 pr-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent outline-none transition-all ${errors.email ? "border-red-500" : "border-gray-300"
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
                          placeholder="03001234567"
                          className={`w-full pl-12 pr-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent outline-none transition-all ${errors.phoneNumber ? "border-red-500" : "border-gray-300"
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
                        University / Institute Name <span className="font-normal text-sm text-gray-500">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        name="university"
                        value={formData.university}
                        onChange={handleInputChange}
                        placeholder="e.g., DHA Suffa University"
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent outline-none transition-all ${errors.university ? "border-red-500" : "border-gray-300"
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
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent outline-none transition-all ${errors.department ? "border-red-500" : "border-gray-300"
                          }`}
                      />
                      {errors.department && (
                        <p className="text-red-500 text-sm mt-1">{errors.department}</p>
                      )}
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
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent outline-none transition-all appearance-none bg-white cursor-pointer ${errors.mainCategory ? "border-red-500" : "border-gray-300"
                          }`}
                      >
                        <option value="">Select a category</option>
                        <option value="Hackathon">Hackathon</option>
                        <option value="E-Sports">E-Sports</option>
                        <option value="Special Deals">Special Deals</option>
                      </select>
                      {errors.mainCategory && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <FaExclamationCircle className="text-xs" />
                          {errors.mainCategory}
                        </p>
                      )}
                    </div>

                    {/* Sub Category */}
                    {formData.mainCategory && availableSubCategories.length > 0 && (
                      <div>
                        <label className="block text-sm font-bold mb-2">
                          Sub-Category <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="subCategory"
                          value={formData.subCategory}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent outline-none transition-all appearance-none bg-white cursor-pointer ${errors.subCategory ? "border-red-500" : "border-gray-300"
                            }`}
                        >
                          <option value="">Select a sub-category</option>
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
                    )}

                    {/* Participation Format */}
                    {formData.mainCategory === "Hackathon" && (
                      <div>
                        <label className="block text-sm font-bold mb-2">
                          Participation Format <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <select
                            value={hackathonFormat}
                            onChange={(e) => setHackathonFormat(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent outline-none transition-all appearance-none bg-white cursor-pointer"
                          >
                            <option value="Solo">Solo (1 Participant)</option>
                            <option value="Duo">Duo (2 Participants)</option>
                            <option value="Triplet">Triplet (3 Participants)</option>
                          </select>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                 {/* Team Information Section */}
                 {requiredTeamMemberCount > 0 && (
                 <div className="pt-6 border-t-2 border-gray-200">
                   <h2 className={`${orbitron.className} text-2xl font-bold mb-6 flex items-center gap-3`}>
                     <FaUsers className="text-[#FFD700]" />
                     Team Information
                   </h2>
                   <div className="space-y-8">
                     {/* Team Name */}
                     <div>
                       <label className="block text-sm font-bold mb-2">
                         Team Name <span className="text-red-500">*</span>
                       </label>
                       <input
                         type="text"
                         name="teamName"
                         value={formData.teamName}
                         onChange={handleInputChange}
                         placeholder="Enter your team name"
                         className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent outline-none transition-all ${errors.teamName ? "border-red-500" : "border-gray-300"}`}
                       />
                       {errors.teamName && (
                         <p className="text-red-500 text-sm mt-1">{errors.teamName}</p>
                       )}
                     </div>
 
                     {/* Team Logo */}
                     <div>
                       <label className="block text-sm font-bold mb-2">Team Logo (Optional)</label>
                       <input
                         type="file"
                         accept="image/png,image/jpeg,image/jpg,image/webp"
                         disabled={isProcessingLogo || isSubmitting}
                         onChange={(e) => {
                           void handleTeamLogoSelect(e.target.files?.[0]);
                           e.target.value = "";
                         }}
                         className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent outline-none transition-all disabled:opacity-60 ${logoError ? "border-red-500" : "border-gray-300"}`}
                       />
                       <p className="text-sm text-gray-500 mt-1">
                         PNG or JPEG. Large photos are auto-compressed before upload.
                       </p>
                       {isProcessingLogo && (
                         <p className="text-sm text-gray-600 mt-1">Processing image...</p>
                       )}
                       {logoError && (
                         <p className="text-red-500 text-sm mt-1">{logoError}</p>
                       )}
                       {teamLogo && !logoError && !isProcessingLogo && (
                         <p className="text-green-700 text-sm mt-1">
                           Ready: {teamLogo.name} ({formatLogoSize(teamLogo.size)})
                         </p>
                       )}
                       {logoPreview && !logoError && (
                         <img
                           src={logoPreview}
                           alt="Team logo preview"
                           className="mt-3 h-20 w-20 rounded-lg border border-gray-200 object-cover"
                         />
                       )}
                     </div>
 
                     {/* Team Members */}
                     <div>
                       <h3 className="text-lg font-bold mb-4">Team Members Details</h3>
                       <p className="text-sm text-gray-600 mb-4 font-semibold">
                         Leader is Player 1. {formData.mainCategory === "Hackathon"
                           ? "Please provide details for Member 2 (and Member 3 if registering as a triplet)."
                           : `Please provide details for the remaining ${requiredTeamMemberCount} member${requiredTeamMemberCount === 1 ? "" : "s"}.`}
                       </p>
                       
                       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                         {Array.from({ length: requiredTeamMemberCount }, (_, index) => index).map((index) => (
                           <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                             <h4 className="font-bold text-sm mb-3 text-[#FFD700] bg-black inline-block px-3 py-1 rounded">Member {index + 2}</h4>
                             <div className="space-y-3">
                               <input
                                 type="text"
                                 placeholder="Full Name *"
                                 value={formData.teamMembersDetails[index].name}
                                onChange={(e) => {
                                  const newDetails = [...formData.teamMembersDetails];
                                  newDetails[index].name = e.target.value;
                                  setFormData({ ...formData, teamMembersDetails: newDetails });
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#FFD700] outline-none text-sm"
                              />
                              <input
                                type="text"
                                placeholder="Phone Number *"
                                value={formData.teamMembersDetails[index].phoneNumber}
                                onChange={(e) => {
                                  const newDetails = [...formData.teamMembersDetails];
                                  newDetails[index].phoneNumber = e.target.value;
                                  setFormData({ ...formData, teamMembersDetails: newDetails });
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#FFD700] outline-none text-sm"
                              />

                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                )}

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
                    className={`${orbitron.className} inline-block px-12 py-5 bg-black text-white font-bold rounded-full shadow-lg transition transform hover:shadow-xl hover:scale-110 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""
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

