export interface CreativeGame {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  imagePosition?: string;
  gameType: "announced" | "surprise";
  rules: string[];
  scoring?: { action: string; points: string }[];
}

export const PENTA_ARCADE_META = {
  title: "Penta Arcade",
  category: "Creative Competition",
  tagline: "Spectrum 26 · DHA Suffa University · 3-Day Team Event",
  description:
    "Penta Arcade is a 3-day creative team competition designed to test speed, memory, coordination, trust, physical strategy, and team communication. Five games in total — four announced and one surprise finale — with points-based shortlisting from Day 1 through Day 3.",
  prizePool: "TBA",
  entryFee: "Rs. 2,000 per team",
  format: "Team (5 members)",
  duration: "3-Day Event",
  teamSize: "5 participants per team",
  location: "DHA Suffa University Campus",
  date: "Day 1 → Day 3",
  handbookUrl: "/handbooks/Creative_Competition.docx",
  timeline: [
    {
      time: "Day 1 — Preliminary Arcade",
      event: "All registered teams play 2 games from the announced pool. Scores combine for the Day 1 leaderboard. Highest-scoring teams qualify for Day 2.",
    },
    {
      time: "After Day 1",
      event: "Qualified team list announced after score verification. Objections must be raised within the review window.",
    },
    {
      time: "Day 2 — Semi-Final Arcade",
      event: "Day 1 qualifiers play the remaining two announced games. Scores verified to shortlist finalists for Day 3.",
    },
    {
      time: "Day 3 — Grand Finale",
      event: "Finalist teams only. Game 5 is the surprise finale — rules and scoring revealed shortly before play begins.",
    },
  ],
  qualificationFlow: [
    { stage: "Day 1", participants: "All registered teams", games: "2 games from announced pool", outcome: "Qualified teams move to Day 2" },
    { stage: "Day 2", participants: "Day 1 qualifiers", games: "2 remaining announced games", outcome: "Finalists move to Day 3" },
    { stage: "Day 3", participants: "Finalist teams only", games: "Game 5: surprise finale", outcome: "Winner and runner-up decided" },
  ],
  scoringSystem: [
    { action: "Correct assigned ball collected", points: "+20 points" },
    { action: "Incorrect ball collected", points: "-10 points" },
    { action: "White ball collected", points: "+30 bonus points" },
    { action: "Black ball collected", points: "-10 points (steal effect as briefed)" },
    { action: "Red rod collected", points: "+30 points" },
    { action: "White rod collected", points: "+10 points" },
    { action: "Black rod collected", points: "-20 points" },
    { action: "Accidental rod drop / knockover", points: "-10 points per incident" },
    { action: "Opponent ribbon snatched", points: "+10 bonus (safety compliant)" },
  ],
  judgingCriteria: [
    { metric: "Cumulative Score", weight: "Primary", description: "Scores recorded by game marshals on official score sheets across all rounds." },
    { metric: "Tie-breaking", weight: "Secondary", description: "Better completion time, fewer penalties, and stronger rule compliance rank higher." },
    { metric: "Disputes", weight: "Immediate", description: "Scoring disputes must be raised right after the round. Late objections may not be entertained." },
    { metric: "Final Authority", weight: "Competition Head", description: "Approves results, resolves disputes, and may disqualify for violations." },
  ],
  integrityPolicy: [
    "No pushing, rough contact, unsafe pulling, or physical misconduct.",
    "No intentional damage, hiding, or shifting of props.",
    "Teams must follow instructions of game marshals and volunteers at all times.",
    "Unfair assistance, outside interference, or rule manipulation may lead to immediate disqualification.",
    "Participants must wear comfortable shoes and follow all safety boundaries marked for each game.",
  ],
  logisticNotes: [
    "Outdoor field or activity area required for movement-based games; indoor setup where suitable.",
    "Props include colored balls, baskets, blindfolds, cards, rods, ribbons, cones, whistles, timers, and score sheets.",
    "At least 2–3 marshals per game station recommended for timing, scoring, and safety.",
    "Central score desk verifies results and updates the leaderboard after every game.",
    "First-aid desk and water point should be available throughout the event.",
  ],
};

export const CREATIVE_GAMES: Record<string, CreativeGame> = {
  "chromatic-harvest": {
    id: "chromatic-harvest",
    title: "Chromatic Harvest",
    tagline: "High-speed sensory sorting challenge",
    description:
      "A high-speed sensory sorting challenge in which one player is blindfolded and guided by teammates to collect assigned colored balls from a central pool.",
    image: "/modules/treasure-chase.png",
    imagePosition: "center 20%",
    gameType: "announced",
    rules: [
      "One member from each team is blindfolded and enters the central pool.",
      "Remaining members guide the player verbally and help sort collected balls at the team station.",
      "Each team is assigned two target colors. Correct target-color balls earn points; incorrect colors create penalties.",
      "Special white and black balls may change the score through bonus or penalty effects.",
    ],
    scoring: [
      { action: "Correct assigned ball", points: "+20" },
      { action: "Incorrect ball", points: "-10" },
      { action: "White ball", points: "+30 bonus" },
      { action: "Black ball", points: "-10 (steal effect as briefed)" },
    ],
  },
  "memory-matrix": {
    id: "memory-matrix",
    title: "Memory Matrix",
    tagline: "Tactical memory-and-relay game",
    description:
      "A tactical memory-and-relay game where teams recreate a displayed card pattern within the given time.",
    image: "/modules/the-memory-pat.png",
    imagePosition: "center",
    gameType: "announced",
    rules: [
      "One player observes and memorizes the required pattern.",
      "Two players search the master deck/grid and collect the required cards.",
      "Objective: recreate the exact sequence or layout before time runs out.",
      "Accuracy, completion time, and rule compliance determine the score.",
    ],
  },
  "iron-maze": {
    id: "iron-maze",
    title: "The Iron Maze",
    tagline: "Precision-based trust challenge",
    description:
      "A precision-based trust challenge in which a blindfolded player navigates a maze and collects rods with the help of a navigator.",
    image: "/modules/skit-battle.png",
    imagePosition: "center",
    gameType: "announced",
    rules: [
      "Two members participate: one blindfolded collector and one outside navigator.",
      "The blindfolded player must collect assigned rods without disturbing other rods in the maze.",
      "Red and white rods add points; black rods and accidental drops create penalties.",
      "Unsafe movement, intentional disturbance, or marshal warnings may reduce the score.",
    ],
    scoring: [
      { action: "Red rod collected", points: "+30" },
      { action: "White rod collected", points: "+10" },
      { action: "Black rod collected", points: "-20" },
      { action: "Accidental drop / knockover", points: "-10 per incident" },
    ],
  },
  "wavelength-survival": {
    id: "wavelength-survival",
    title: "Wavelength Survival",
    tagline: "Tactical territory and survival game",
    description:
      "A tactical territory and survival game in which players must reach the announced safe zone while protecting their team ribbons.",
    image: "/modules/the-floor-is-lava.png",
    imagePosition: "center 30%",
    gameType: "announced",
    rules: [
      "Active players begin from the center of the field with a team ribbon attached at the back.",
      "A color/wavelength is announced; players must move to the matching safe zone within the time limit.",
      "Opponents may attempt to snatch ribbons during movement, subject to safety rules.",
      "Players losing their ribbons are eliminated. Last surviving teams score highest.",
    ],
    scoring: [{ action: "Opponent ribbon snatched", points: "+10 bonus (safety compliant)" }],
  },
  "surprise-finale": {
    id: "surprise-finale",
    title: "Game 5 — Surprise Finale",
    tagline: "Day 3 grand finale · finalists only",
    description:
      "The final surprise game played only on Day 3 by finalist teams. Setup, rules, scoring, and required active players are announced shortly before the finale begins.",
    image: "/modules/dark-spider.png",
    imagePosition: "center",
    gameType: "surprise",
    rules: [
      "Only finalist teams qualify for the surprise finale.",
      "The game tests a different skill set and may influence the final leaderboard.",
      "Competition Head and marshals brief finalists on safety and rule compliance before play begins.",
      "Winner and runner-up are declared after Day 3 score verification.",
    ],
  },
};
