export interface HackathonTrack {
  id: string;
  title: string;
  tagline: string;
  description: string;
  prizePool: string;
  entryFee: string;
  format: string;
  duration: string;
  teamSize: string;
  location: string;
  date: string;
  time: string;
  iconName: string;
  bgGradient: string;
  accentColor: string;
  image: string;
  imagePosition?: string;
  rules: string[];
  judgingCriteria: { metric: string; weight: string; description: string }[];
  timeline: { time: string; event: string }[];

  presentedBy?: { name: string; logo: string };
  handbookUrl?: string;
  eventConcept?: string;
  toolsAllowed?: string;
  pitchFormat?: { duration: string; label: string; description: string }[];
  integrityPolicy?: string[];
  competitionTracks?: { title: string; description: string }[];
  datasetDetails?: string;
  logisticNotes?: string[];
  prizeSplitDetails?: { place: string; prize: string }[];
  mentorSetup?: string[];
}

export const HACKATHON_CONFIG: Record<string, HackathonTrack> = {
  "competitive-programming": {
    id: "competitive-programming",
    title: "Competitive Programming",
    tagline: "Speed Programming Arena · DHA Suffa University · 2-Day Event",
    description: "Race against the clock to solve complex algorithmic puzzles, optimize data structures, and debug under intense pressure. Go head-to-head with the region's top programmers. Only the top 40% of scorers from the Day 1 preliminary round will advance to the high-stakes Day 2 Grand Finals.",
    prizePool: "Rs. 30,000",
    entryFee: "Solo: Rs. 500 | Duo: Rs. 1,000 | Triplet: Rs. 1,500",
    format: "Solo, Duo, or Triplet",
    duration: "2-Day Event",
    teamSize: "1 – 3 participants",
    location: "DHA Suffa Computer Labs 4 – 5",
    date: "May 25-26, 2026",
    time: "09:00 AM",
    iconName: "FaCode",
    bgGradient: "from-blue-950 via-slate-900 to-black",
    accentColor: "#3B82F6",
    image: "/modules/speed-programming.png",
    imagePosition: "center",
    handbookUrl: "/handbooks/competitive-programming.pdf",
    eventConcept: "Teams solve timed algorithm challenges across 4–5 labs. Submissions are automatically scored and top entries are manually checked for integrity.",
    toolsAllowed: "No AI tools, ChatGPT, or external search allowed. Standard IDE compilers for C++, Python, and Java are pre-configured.",
    rules: [
      "No plagiarism or code sharing between teams at any point.",
      "No AI code generation tools (ChatGPT, Copilot, Claude, etc.) permitted.",
      "No external collaboration or communication outside the registered team.",
      "Violation at any stage will result in immediate disqualification with no refund."
    ],
    timeline: [
      { time: "Day 1 — Preliminary", event: "90 min round. Breadth of topics from easy to medium. Top 40% advance to Day 2." },
      { time: "Shortlist Announcement", event: "Manual review of top submissions for plagiarism and similarity patterns using diff tools." },
      { time: "Day 2 — Grand Final", event: "60 min final round. Medium to hard problems (graphs, DP, advanced DS)." },
      { time: "Results & Distribution", event: "Prize distribution immediately after final integrity audit clears." }
    ],
    judgingCriteria: [
      { metric: "Automatic Scoring", weight: "100%", description: "Score computed by HackerRank/VJudge based on difficulty weight and passed test cases." },
      { metric: "Tie-breaking", weight: "Manual", description: "Lowest cumulative submission time wins when scores are equal." },
      { metric: "Integrity Review", weight: "Pass/Fail", description: "Manual review of top code for plagiarism and AI-generated code detection." }
    ],
    prizeSplitDetails: [
      { place: "Winner", prize: "Rs. 20,000 + DSU Certificate" },
      { place: "Runner-up", prize: "Rs. 10,000 + DSU Certificate" }
    ],
    logisticNotes: [
      "4-5 labs pre-configured with browser access restricted to the platform domain only.",
      "Internet restricted at the network level; all other web traffic is blocked.",
      "3-4 proctors per lab; Competition Head holds final disqualification authority."
    ]
  },
  "vibe-and-pitch": {
    id: "vibe-and-pitch",
    title: "Vibe & Pitch Hackathon",
    tagline: "Pre-Seed Startup & MVP Software Sprint · 2-Day Event",
    description: "An intensive software sprint where raw ideas transform into working products. Formulate a solution to a real-world problem, build a functional MVP using your choice of modern tech stacks, and deliver a compelling startup-style pitch to industry founders.",
    prizePool: "Rs. 40,000",
    entryFee: "Solo: Rs. 500 | Duo: Rs. 1,000 | Triplet: Rs. 1,500",
    format: "Solo, Duo, or Triplet",
    duration: "2-Day Event",
    teamSize: "1 – 3 participants",
    location: "DHA Suffa University Campus",
    date: "May 25-26, 2026",
    time: "09:00 AM",
    iconName: "FaRocket",
    bgGradient: "from-amber-950 via-slate-900 to-black",
    accentColor: "#F59E0B",
    image: "/modules/web-development.png",
    imagePosition: "center",
    handbookUrl: "/handbooks/vibe-and-pitch.pdf",
    eventConcept: "Teams build a working product and pitch it as a market-ready concept. Judging focuses on viability, clarity, and business potential.",
    toolsAllowed: "Open toolset: AI, no-code, web frameworks, APIs, and all platforms are allowed.",
    rules: [
      "Any tool, framework, AI model, or platform is permitted.",
      "Solo, duo, or triplet entries are allowed (1 to 3 participants).",
      "All building must occur on Day 1 during official hours; pre-built projects are disqualified.",
      "Live demo is mandatory on Day 2; video recordings or slide-only pitches won't score.",
      "Teams may not share code, designs, or ideas with other teams during build day."
    ],
    timeline: [
      { time: "1 Week Before", event: "Broad vertical announced (e.g. local services, education) to think about problems." },
      { time: "Day 1 — Build", event: "9:00 AM - 6:00 PM. Hard code freeze. Submit URL/Github/APK and problem statement before midnight." },
      { time: "Day 2 — Pitch", event: "Morning onwards. Live pitching in randomized order to industry judges panel." },
      { time: "Day 2 — Afternoon", event: "Winners announced. Public judge feedback session for all teams." }
    ],
    pitchFormat: [
      { duration: "5 Min", label: "Live Demo + Pitch", description: "Show the product running live (no videos; slides optional, demo mandatory)" },
      { duration: "3 Min", label: "Judge Q&A", description: "Judges probe use case, market size, business model, and edge cases" },
      { duration: "2 Min", label: "Transition Buffer", description: "Reset, score recording, next team sets up" }
    ],
    judgingCriteria: [
      { metric: "Problem & Use Case", weight: "30%", description: "Is this a real problem? Specific target user? Evidence the problem exists?" },
      { metric: "Product-Market Fit", weight: "25%", description: "Credible estimate of who pays, clear timing value prop, differentiation from alternatives." },
      { metric: "Product & Usability", weight: "25%", description: "Core flow works live. Coherent UX. Demonstrates value directly without handholding." },
      { metric: "Scalability & Sense", weight: "20%", description: "Coherent monetization, thoughts beyond the demo, response to operational limitations." }
    ],
    mentorSetup: [
      "2-3 mentors (founders, product leads, alumni) circulate to help unblock tech or business framing.",
      "Mentors may not write code, design screens, or make product decisions.",
      "Optional 30-minute mid-day check-in available to any team that requests it."
    ],
    prizeSplitDetails: [
      { place: "Winner", prize: "Rs. 25,000 + Certificate" },
      { place: "Runner-up", prize: "Rs. 15,000 + Certificate" },
      { place: "Incubation", prize: "VC Incubation opportunities & mentor credits" }
    ]
  },
  "build-with-ai-ar": {
    id: "build-with-ai-ar",
    title: "Build with AI: AR Edition",
    presentedBy: { name: "Cognivision", logo: "/gallery/file.svg" },
    tagline: "Live Coding AR Competition · Powered by Cognivision · 1-Day Event",
    description: "A one-day live coding event powered by Cognivision, a spatial computing platform that lets you build real augmented reality and computer vision mobile apps using AI. Start with a hands-on workshop, then compete to build the best AR application. No prior AR experience required — what's tested is your creativity, speed, and ability to ship something that works.",
    prizePool: "Rs. 30,000",
    entryFee: "Solo: Rs. 500 | Duo: Rs. 1,000 | Triplet: Rs. 1,500",
    format: "Solo, Duo, or Triplet",
    duration: "1-Day Event",
    teamSize: "1 – 3 participants",
    location: "DHA Suffa University",
    date: "June 8, 2026",
    time: "09:00 AM",
    iconName: "FaMicrochip",
    bgGradient: "from-purple-950 via-slate-900 to-black",
    accentColor: "#A855F7",
    image: "/modules/data-science.png",
    imagePosition: "center 30%",
    handbookUrl: "/handbooks/BuildwithAI_ AR-Edition.pdf",
    eventConcept: "Cognivision trains all participants on spatial computing, then transitions into a live build competition where students use what they learned to create a working AR application.",
    toolsAllowed: "Cognivision platform via VS Code. All AR, computer vision, and on-device ML tooling is handled by the platform. Describe what you want to build in plain English and the AI assembles it.",
    rules: [
      "All building must take place during the official competition window on the day. Pre-built applications are grounds for disqualification.",
      "The Cognivision platform must be used for the build. Support from Cognivision mentors is available and encouraged.",
      "Participants must bring their own laptop and a personal iPhone or Android device for real-device testing. Developer mode must be enabled before arriving.",
      "Basic mobile app development understanding is preferred. No prior AR or computer vision experience needed.",
      "Sharing code or builds with other registered participants during the competition is not permitted.",
      "Any violation results in disqualification with no refund."
    ],
    timeline: [
      { time: "Session 1 — Workshop (60 min)", event: "Hands-on training by Cognivision. Learn the platform, build and run your first working AR app on your device." },
      { time: "Session 2 — Live Build", event: "New build prompt revealed. Create the best AR or computer vision application within the time window." },
      { time: "Submissions", event: "Evaluated by Cognivision on technical execution, creativity, use case relevance, and whether the app ships and runs correctly." },
      { time: "June 10 — Awards", event: "Winners announced at the Spectrum 26 closing ceremony. Top three invited on stage." }
    ],
    judgingCriteria: [
      { metric: "Technical Execution", weight: "30%", description: "Does the application actually work? Does it run on a real device and do what it is supposed to do?" },
      { metric: "Creativity & Use Case", weight: "30%", description: "Is the idea novel? Is the AR or CV capability used in a way that makes sense and adds value?" },
      { metric: "Completion", weight: "20%", description: "Was the application shipped within the competition window?" },
      { metric: "Demo Quality", weight: "20%", description: "Can the participant explain what they built and why the idea is worth pursuing?" }
    ],
    mentorSetup: [
      "Cognivision mentors are present throughout both the workshop and competition.",
      "Mentors provide technical support on the Cognivision platform.",
      "Students who impress during the competition may be considered for internship opportunities with Cognivision."
    ],
    prizeSplitDetails: [
      { place: "1st Place", prize: "Rs. 20,000" },
      { place: "2nd Place", prize: "Rs. 10,000" },
      { place: "3rd Place", prize: "Certificate + Goodies, recognised on stage" }
    ],
    logisticNotes: [
      "Bring: Laptop with VS Code installed, iPhone (iOS 16+) or Android (8.0+), USB cable, phone charged to at least 60%.",
      "Full system requirements shared via participant WhatsApp group before the event.",
      "All participants receive a certificate of participation and Cognivision platform beta access with monthly token rewards for up to one year."
    ]
  }
};
