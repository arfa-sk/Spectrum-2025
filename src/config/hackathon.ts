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
  
  // Custom rich details
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
    tagline: "Spectrum 26 · DHA Suffa University · 2-Day Event",
    description: "Compete in solving algorithmic puzzles under tight time limits. Platform: HackerRank / VJudge. Qualifier Threshold: Top 40% advances from Day 1 to Day 2.",
    prizePool: "Rs. 30,000",
    entryFee: "Solo: Rs. 500 | Duo: Rs. 750 | Triplet: Rs. 1,000",
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
    eventConcept: "All registered teams compete simultaneously across 4–5 computer labs to solve problems spanning coding efficiency, mathematical logic, greedy choices, and complex data structures. Scoring is automated, and submissions are analyzed for plagiarism.",
    toolsAllowed: "No AI tools, ChatGPT, or external search allowed during the contest. Standard IDE compilers for C++, Python, and Java are pre-configured.",
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
  "ai-ds-hackathon": {
    id: "ai-ds-hackathon",
    title: "AI & Data Science Hackathon",
    tagline: "DHA Suffa University · Dept. of Information Technology",
    description: "Explore, clean, model, and analyze real-world datasets. Day 1: 9-hour build & notebook freeze. Day 2: Notebook walkthrough & judge defense.",
    prizePool: "Exciting Cash Awards + Certificates",
    entryFee: "Rs. 500 per team",
    format: "Duo or Triplet only",
    duration: "2-Day Event",
    teamSize: "2 – 3 participants per team",
    location: "DHA Suffa University IT Labs",
    date: "May 25-26, 2026",
    time: "09:00 AM",
    iconName: "FaMicrochip",
    bgGradient: "from-purple-950 via-slate-900 to-black",
    accentColor: "#A855F7",
    image: "/modules/data-science.png",
    imagePosition: "center 30%",
    eventConcept: "Teams are given a real-world dataset on the morning of Day 1. They spend the day exploring, cleaning, analysing, and building a machine learning or data analysis solution. On Day 2 they present their findings, methodology, and results. Judging is focused on data understanding, analytical depth, and the quality of insights.",
    toolsAllowed: "Python (Pandas, NumPy, Scikit-learn, Matplotlib, Seaborn), Jupyter Notebook / Google Colab, Power BI / Tableau. Any public pre-trained model or API is allowed.",
    rules: [
      "Dataset distributed at 9 AM on Day 1 — no prior access allowed.",
      "All analysis must be performed during official hours on Day 1.",
      "Notebooks must be fully re-runnable from top to bottom with visible outputs.",
      "Use of public pre-trained models and AI APIs is allowed, but must be cited.",
      "Live walkthrough of notebook is mandatory on Day 2 — slides-only pitches won't score on methodology."
    ],
    timeline: [
      { time: "1 Week Before", event: "Broad domain released (e.g. healthcare, agriculture) for background research." },
      { time: "Day 1 — 9 AM", event: "Dataset released. Data cleaning, modeling, and exploratory analysis." },
      { time: "Day 1 — 6 PM", event: "Hard notebook freeze. Submit .ipynb file, summary, and 5-slide deck by midnight." },
      { time: "Day 2 — Morning", event: "All teams pitch to a panel of faculty & industry judges in randomized order." },
      { time: "Day 2 — Afternoon", event: "Winners announced. Judges provide one minute of public feedback to every team." }
    ],
    pitchFormat: [
      { duration: "5 Min", label: "Results Walkthrough", description: "Walk through the notebook and showcase key findings" },
      { duration: "3 Min", label: "Judge Q&A", description: "Defend data choices, methodology, and assumptions" },
      { duration: "2 Min", label: "Transition Buffer", description: "Score recording and setup for the next team" }
    ],
    judgingCriteria: [
      { metric: "Problem & EDA", weight: "30%", description: "Clearly defined target variable or question; thorough correlation & outlier checks." },
      { metric: "Methodology", weight: "25%", description: "Justified choice of algorithms, correct validation splits, and appropriate evaluation metrics." },
      { metric: "Quality of Insights", weight: "25%", description: "Results interpreted in plain language; real-world impact & limitations acknowledged honestly." },
      { metric: "Communication", weight: "20%", description: "Commented, reproducible notebook, clean visualizations, and confident Q&A." }
    ],
    competitionTracks: [
      { title: "Track A — Predictive Modelling", description: "Build a supervised learning model on the dataset. Focuses on predictive validation and model behavior analysis." },
      { title: "Track B — Exploratory Analysis & Viz", description: "Deep exploratory analysis (patterns, anomalies, correlations) without a model. Focuses on narrative and viz." }
    ],
    datasetDetails: "Real-world tabular dataset (min 5,000 rows) from South Asian context (Healthcare, Education, Agriculture, Finance, or Urban planning).",
    mentorSetup: [
      "2-3 mentors with DS experience circulate the venue to help teams with data bottlenecks.",
      "Mentors may not write code, select features, or choose models.",
      "Optional 30-minute mid-day check-in is available for quick approach gut-check."
    ],
    prizeSplitDetails: [
      { place: "1st Place", prize: "Cash Prize + DSU Certificate" },
      { place: "2nd Place", prize: "Cash Prize + DSU Certificate" },
      { place: "3rd Place", prize: "DSU Certificate + Goodies" },
      { place: "Best Insight", prize: "Special Judge Award + LinkedIn Feature" }
    ]
  },
  "vibe-and-pitch": {
    id: "vibe-and-pitch",
    title: "Build & Pitch Hackathon",
    tagline: "Spectrum 26 · DHA Suffa University · 2-Day Event",
    description: "Identify a real problem, build a product using any software/AI/no-code tool, and pitch it like a pre-seed startup. Focus is purely on product-market fit and business sense.",
    prizePool: "Exciting Cash Awards + Startup Incubation",
    entryFee: "Rs. 1,500 per team",
    format: "Duo or Triplet only",
    duration: "2-Day Event",
    teamSize: "2 – 3 participants per team",
    location: "DHA Suffa University Campus",
    date: "May 25-26, 2026",
    time: "09:00 AM",
    iconName: "FaRocket",
    bgGradient: "from-amber-950 via-slate-900 to-black",
    accentColor: "#F59E0B",
    image: "/modules/web-development.png",
    imagePosition: "center",
    eventConcept: "Teams identify a real problem, build a working product using any tools they want — AI, no-code, full-stack, whatever gets it shipped — then pitch it to a panel of industry judges as if they're raising a pre-seed round. The judging is entirely product and business focused. How they built it is irrelevant. What they built, who it's for, and whether it makes sense as a business — that's everything.",
    toolsAllowed: "All AI. Cursor, Lovable, Claude Code, v0, Bubble, Webflow, React, Supabase, n8n, Zapier, APIs — no restrictions.",
    rules: [
      "Any tool, framework, AI model, or platform is permitted.",
      "Solo entries not accepted; teams of 2 or 3 only.",
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
      { place: "Top Teams", prize: "Cash Rewards pool share + Certificate" },
      { place: "Incubation", prize: "VC Incubation opportunities & mentor credits" }
    ]
  }
};
