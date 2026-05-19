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
}

export const HACKATHON_CONFIG: Record<string, HackathonTrack> = {
  "speed-programming": {
    id: "speed-programming",
    title: "Speed Programming Challenge",
    tagline: "Unleash algorithmic precision under absolute temporal pressure.",
    description: "Race against the clock to solve complex algorithmic puzzles, optimize data structures, and debug under extreme pressure. This is a pure test of speed, logic, and syntax proficiency where only the most rapid developers will survive.",
    prizePool: "Rs. 50,000",
    entryFee: "Rs. 1,000",
    format: "Individual",
    duration: "3 Hours",
    teamSize: "1 Member",
    location: "Software Engineering Lab",
    date: "May 25, 2026",
    time: "10:00 AM - 01:00 PM",
    iconName: "FaCode",
    bgGradient: "from-blue-950 via-slate-900 to-black",
    accentColor: "#3B82F6", // Blue
    image: "/modules/speed-programming.png",
    imagePosition: "center",
    rules: [
      "No external IDE extensions, plugins, or AI generation assistants (ChatGPT, Copilot) are allowed.",
      "Plagiarism checks will be automatically run on all submitted solutions; matches >15% trigger immediate DQ.",
      "The scoring metric heavily weights execution speed and successful test case passes.",
      "Decisions of the technical scoring committee are final and absolute."
    ],
    judgingCriteria: [
      { metric: "Test Case Accuracy", weight: "50%", description: "Number of standard and hidden test cases passed successfully." },
      { metric: "Time Complexity", weight: "25%", description: "Efficiency and algorithmic complexity of the submitted solution." },
      { metric: "Code Cleanliness", weight: "15%", description: "Structured indentation, semantic variable naming, and readability." },
      { metric: "Submission Speed", weight: "10%", description: "Timestamp of final operational submission." }
    ],
    timeline: [
      { time: "09:30 AM", event: "Reporting & Seating Allotment" },
      { time: "10:00 AM", event: "Problem Sets Release & Hacking Begins" },
      { time: "11:30 AM", event: "Mid-Session Leaderboard Freeze" },
      { time: "01:00 PM", event: "Hacking Stops & Automated Submission Grader Runs" }
    ]
  },
  "ai-agents": {
    id: "ai-agents",
    title: "AI Agentic Systems Arena",
    tagline: "Build the autonomous workflows and cognitive machines of tomorrow.",
    description: "Architect operational multi-agent networks, self-correcting coding copilots, or autonomous RAG engines. Leverage modern LLMs, orchestrators, and custom tools to construct a fully autonomous agentic worker that operates without human intervention.",
    prizePool: "Rs. 50,000",
    entryFee: "Rs. 1,500",
    format: "Team (2-4 members)",
    duration: "12 Hours",
    teamSize: "2 to 4 Members",
    location: "Artificial Intelligence Lab",
    date: "May 26, 2026",
    time: "09:00 AM - 09:00 PM",
    iconName: "FaMicrochip",
    bgGradient: "from-purple-950 via-slate-900 to-black",
    accentColor: "#A855F7", // Purple
    image: "/modules/data-science.png",
    imagePosition: "center 30%",
    rules: [
      "All API integrations must utilize approved models (OpenAI, Gemini, Claude, or local open-source models).",
      "Open-source libraries (LangChain, LlamaIndex, CrewAI) are highly encouraged; baseline starter templates are allowed.",
      "Teams must construct a functional demo dashboard or CLI interface to demonstrate live autonomy during judging.",
      "All codebase commits must be actively updated to their declared GitHub repository during the 12-hour sprint."
    ],
    judgingCriteria: [
      { metric: "Autonomy & Agent Loop", weight: "35%", description: "How effectively the agent handles failure, loops, tool calls, and self-corrects." },
      { metric: "Innovation & Scope", weight: "30%", description: "Complexity of the workflow engineered and real-world value of the autonomous task." },
      { metric: "Technical Architecture", weight: "20%", description: "Code elegance, state management, security considerations, and latency optimization." },
      { metric: "Live Demonstration", weight: "15%", description: "Confidence of presentation and successful live execution of the agent loop." }
    ],
    timeline: [
      { time: "08:30 AM", event: "Breakfast & Tech Environment Setup" },
      { time: "09:00 AM", event: "Hacking Officially Begins & APIs Activated" },
      { time: "02:00 PM", event: "Mentoring Rounds & Architecture Reviews" },
      { time: "08:00 PM", event: "Final Code Push & Repository Freeze" },
      { time: "08:30 PM", event: "Pitch & Live Demo to Venture Judges" }
    ]
  },
  "startup-innovation": {
    id: "startup-innovation",
    title: "Startup Innovation Challenge",
    tagline: "From blueprint to structural MVP—build products that scale.",
    description: "Conceive, design, and prototype a disruptive digital startup MVP targeting modern problems in SaaS, Fintech, Edtech, or Healthtech. Build a production-ready application layout, model its growth roadmap, and pitch it before leading venture capitalists.",
    prizePool: "Rs. 50,000",
    entryFee: "Rs. 1,500",
    format: "Team (2-4 members)",
    duration: "12 Hours",
    teamSize: "2 to 4 Members",
    location: "Main Exhibition Auditorium",
    date: "May 27, 2026",
    time: "09:00 AM - 09:00 PM",
    iconName: "FaRocket",
    bgGradient: "from-amber-950 via-slate-900 to-black",
    accentColor: "#F59E0B", // Gold/Amber
    image: "/modules/web-development.png",
    imagePosition: "center",
    rules: [
      "Teams must present both a functional, deployed software prototype and a detailed product pitch deck.",
      "The business model must address a clear target addressable market (TAM) with concrete monetization routes.",
      "Pre-existing codebase components are permitted, but all core features must be heavily refactored or built live.",
      "Pitch times are strictly capped at 5 minutes, followed by a 3-minute technical Q&A session."
    ],
    judgingCriteria: [
      { metric: "Product MVP Execution", weight: "40%", description: "Completeness, code quality, and responsive UX design of the live product prototype." },
      { metric: "Market Fit & Business Model", weight: "25%", description: "Feasibility of business scale, user retention strategy, and clarity of monetization." },
      { metric: "Innovation & Novelty", weight: "20%", description: "Unique value proposition and structural differentiation from current competitors." },
      { metric: "Pitch Quality & Defense", weight: "15%", description: "Clarity of communication, slide design, and defense during the Q&A session." }
    ],
    timeline: [
      { time: "08:30 AM", event: "Auditorium Setup & Pitch Deck Submissions" },
      { time: "09:00 AM", event: "Pitch Sprint Commences" },
      { time: "01:00 PM", event: "Business Model Stress Testing (Mentors)" },
      { time: "07:30 PM", event: "Product Deployments & Deck Freezes" },
      { time: "08:00 PM", event: "Venture Board Pitching & Q&A Panel" }
    ]
  },
  "cybersecurity": {
    id: "cybersecurity",
    title: "Cybersecurity Warfare (CTF)",
    tagline: "Breach defenses, extract flags, and secure the digital perimeter.",
    description: "Enter an immersive, high-stakes cybersecurity combat zone. Put your penetration testing, reverse engineering, web exploitation, binary analysis, and cryptography skills to the test in a multi-stage Capture-The-Flag challenge designed by cybersecurity specialists.",
    prizePool: "Rs. 50,000",
    entryFee: "Rs. 1,500",
    format: "Team (2-3 members)",
    duration: "6 Hours",
    teamSize: "2 to 3 Members",
    location: "Cyber Defense Command Lab",
    date: "May 28, 2026",
    time: "01:00 PM - 07:00 PM",
    iconName: "FaShieldAlt",
    bgGradient: "from-emerald-950 via-slate-900 to-black",
    accentColor: "#10B981", // Green/Emerald
    image: "/modules/dark-spider.png",
    imagePosition: "center 20%",
    rules: [
      "Any DDOS, brute forcing of grading infrastructure, or attacking opposing teams will result in immediate disqualification.",
      "Flags must be obtained legitimately through targeted exploitation; flag sharing is strictly prohibited.",
      "Internet access is fully permitted, but external collaborations are monitored and banned.",
      "Write-ups may be requested for high-tier flags to verify legitimate exploitation methods."
    ],
    judgingCriteria: [
      { metric: "Dynamic Flag Capture Score", weight: "70%", description: "Cumulative points accrued from successfully submitting valid flags." },
      { metric: "Difficulty Rating", weight: "20%", description: "Percentage of advanced/expert flags solved successfully by the team." },
      { metric: "Exploitation Write-ups", weight: "10%", description: "Technical elegance and documentation of advanced exploits if audited." }
    ],
    timeline: [
      { time: "12:30 PM", event: "VPN Configurations & Keys Allocation" },
      { time: "01:00 PM", event: "Command Center Arena Online & Targets Unlocked" },
      { time: "04:00 PM", event: "High-value Cryptography Targets Released" },
      { time: "07:00 PM", event: "CTF Portal Shutdown & Flag Audit Processing" }
    ]
  }
};

export const HACKATHON_FAQS = [
  {
    question: "Can individuals register for team-based events?",
    answer: "For 'AI Agentic Systems' and 'Startup Innovation', you must form a team of 2 to 4 members. 'Cybersecurity Warfare' allows teams of 2 to 3. Only the 'Speed Programming Challenge' is strictly an individual track."
  },
  {
    question: "What is the registration process for external students?",
    answer: "External participants can easily register using our central registration portal. Simply select the 'Hackathon' category, choose your preferred track, input your team details, and make the secure payment. Feel free to contact our support lines for immediate manual assistance."
  },
  {
    question: "Are pre-built solutions or baseline code permitted?",
    answer: "For hackathons, baseline starter libraries and open-source boilerplates (like LangChain, Next.js templates) are completely fine! However, the core features and functional business logic of your MVP must be engineered live during the sprint."
  },
  {
    question: "How will payment verification take place?",
    answer: "After submiting the online form, you will receive a digital ticket instruction detailing our verification. Our support desks will process a brief call to instantly activate your ticket."
  }
];
