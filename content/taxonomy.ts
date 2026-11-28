import type { Destination, CareerField, ProgramType, Option, MandarinRequirement, MandarinLevel } from "./types";

export const destinations: Destination[] = [
  {
    "slug": "taiwan",
    "name": "Taiwan",
    "cities": [
      "Taipei"
    ],
    "scene": "taiwan",
    "photo": { "src": "/images/dest-taiwan.webp", "alt": "Taipei 101 rising above the Taipei skyline with green hills behind" },
    "tagline": "Design-minded companies, a fast-moving tech scene and everyday Mandarin all around you.",
    "intro": "Taiwan combines a strong manufacturing and technology base with a lively creative and start-up community. Daily life runs in Mandarin, so there are plenty of chances to practise outside work.",
    "work": "Working languages vary by host. Some teams work mainly in Mandarin, others in English with Mandarin used alongside it. Each program states its own language requirement.",
    "practical": [
      "Visa and work-authorisation route — depends on nationality and program, to be confirmed with an advisor",
      "Accommodation — not included unless a program says so",
      "Arrival support — to be confirmed"
    ]
  },
  {
    "slug": "china",
    "name": "China",
    "cities": [
      "Shanghai",
      "Shenzhen",
      "Guangzhou",
      "Hangzhou"
    ],
    "scene": "china",
    "photo": { "src": "/images/dest-china.webp", "alt": "Shanghai’s Lujiazui skyline seen across the Huangpu River from the Bund" },
    "tagline": "Work inside large, fast-paced markets and see how business is done at scale.",
    "intro": "Shanghai, Shenzhen, Guangzhou and Hangzhou are centres for international business, consumer brands, manufacturing and technology. Programs give a first-hand view of how teams operate in some of the world’s busiest markets.",
    "work": "Many host teams use Mandarin day to day; some international teams work in English. Requirements differ by placement and are listed on each program.",
    "practical": [
      "Visa route — depends on nationality and program type, to be confirmed",
      "Online services and apps you may need — guidance to be confirmed",
      "Accommodation — not included unless a program says so"
    ]
  },
  {
    "slug": "singapore",
    "name": "Singapore",
    "cities": [
      "Singapore"
    ],
    "scene": "singapore",
    "photo": { "src": "/images/dest-singapore.webp", "alt": "Marina Bay Sands and the Singapore skyline across the bay" },
    "tagline": "An English-speaking regional hub where Mandarin is a useful extra, not a requirement everywhere.",
    "intro": "Singapore is a base for regional headquarters across finance, technology and marketing. English is the common working language; Mandarin is spoken widely and can help with some teams and clients.",
    "work": "Most placements here work in English. Where Mandarin is needed — for example with clients in Greater China — the program says so.",
    "practical": [
      "Work pass eligibility — depends on nationality and program, to be confirmed",
      "Cost of living — high; guidance to be confirmed",
      "Accommodation — not included unless a program says so"
    ]
  }
];

export const careerFields: CareerField[] = [
  {
    "slug": "business",
    "name": "Business",
    "icon": "brief",
    "blurb": "Business development, operations and partnerships."
  },
  {
    "slug": "marketing",
    "name": "Marketing",
    "icon": "mega",
    "blurb": "Brand, content, social and market research."
  },
  {
    "slug": "design",
    "name": "Design",
    "icon": "pen",
    "blurb": "Product, UX, graphic and spatial design."
  },
  {
    "slug": "technology",
    "name": "Technology",
    "icon": "code",
    "blurb": "Software, data and product engineering."
  },
  {
    "slug": "finance",
    "name": "Finance",
    "icon": "chart",
    "blurb": "Analysis, accounting and fintech."
  },
  {
    "slug": "production",
    "name": "Production",
    "icon": "film",
    "blurb": "Media, events and manufacturing production."
  }
];

export const programTypes: ProgramType[] = [
  {
    "slug": "internship",
    "name": "Internship",
    "short": "Professional placement",
    "desc": "A structured placement with a host organisation, working on real projects alongside a team. Typically 8 to 24 weeks.",
    "not": "Not a guaranteed job, and not paid employment unless a program states otherwise."
  },
  {
    "slug": "immersion",
    "name": "Immersion",
    "short": "Short cultural and professional experience",
    "desc": "A short group experience combining company visits, workshops, language practice and cultural activities. Typically 2 to 4 weeks.",
    "not": "No individual placement with a host organisation."
  }
];

export const durations: Option[] = [
  {
    "slug": "short",
    "name": "2–4 weeks"
  },
  {
    "slug": "medium",
    "name": "8–12 weeks"
  },
  {
    "slug": "long",
    "name": "13–24 weeks"
  }
];

export const startPeriods: string[] = [
  "Summer 2027",
  "Autumn 2027",
  "Spring 2028",
  "Flexible"
];

export const mandarinRequirements: MandarinRequirement[] = [
  {
    "slug": "none",
    "rank": 0,
    "name": "No Mandarin required"
  },
  {
    "slug": "basic",
    "rank": 1,
    "name": "Basic Mandarin helpful"
  },
  {
    "slug": "conversational",
    "rank": 2,
    "name": "Conversational Mandarin required"
  },
  {
    "slug": "professional",
    "rank": 3,
    "name": "Professional working Mandarin required"
  }
];

export const mandarinLevels: MandarinLevel[] = [
  {
    "slug": "none",
    "rank": 0,
    "name": "None yet",
    "desc": "I haven’t started."
  },
  {
    "slug": "beginner",
    "rank": 1,
    "name": "Beginner",
    "desc": "Greetings and a few phrases."
  },
  {
    "slug": "basic",
    "rank": 1,
    "name": "Basic",
    "desc": "Simple everyday conversations."
  },
  {
    "slug": "conversational",
    "rank": 2,
    "name": "Conversational",
    "desc": "Comfortable in most everyday situations."
  },
  {
    "slug": "professional",
    "rank": 3,
    "name": "Professional",
    "desc": "I can work in Mandarin."
  },
  {
    "slug": "unsure",
    "rank": -1,
    "name": "Not sure",
    "desc": "I’d like guidance."
  }
];

export const stages: string[] = [
  "Undergraduate student",
  "Postgraduate student",
  "Recent graduate (within 2 years)",
  "Early-career professional",
  "Career changer"
];
export const goals: string[] = [
  "Build work experience abroad",
  "Use and improve my Mandarin",
  "Explore a career field",
  "Understand a new business culture",
  "Grow my professional network"
];
export const learningGoals: string[] = [
  "Workplace introductions",
  "Everyday conversation",
  "Industry vocabulary",
  "Meetings and email phrases"
];

export const faqs: [string, string][] = [
  [
    "Is a placement guaranteed?",
    "No. Applying starts a conversation. Places depend on host organisations and your fit, and are only confirmed in writing."
  ],
  [
    "Are internships paid?",
    "Not unless a specific program says so. Pay, if any, is set by the host and will be stated before you commit."
  ],
  [
    "Do I need to speak Mandarin?",
    "It depends on the program. Each program lists its working language and Mandarin requirement. Some work in English; others need conversational or professional Mandarin."
  ],
  [
    "Do you arrange visas, housing or university credit?",
    "These details are not confirmed for the sample programs. An advisor will explain what applies to your program and nationality."
  ],
  [
    "What does it cost?",
    "Fees for the sample programs are to be confirmed. You won’t be asked to pay anything in this prototype."
  ],
  [
    "How does Bridgr Academy fit in?",
    "Bridgr Academy offers optional Mandarin lessons with your same Bridgr account. Lessons don’t guarantee eligibility or a placement."
  ]
];
