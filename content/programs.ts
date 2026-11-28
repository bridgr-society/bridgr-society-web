/* Sample programs — every entry is a SAMPLE for launch preparation.
   Fields in `confirmed` stay null until the business supplies real values;
   the UI renders null as "To be confirmed". Edit here, or replace with a CMS
   that returns the same Program shape (see content/types.ts). */
import type { Program } from "./types";

export const programs: Program[] = [
  {
    "slug": "taipei-marketing",
    "title": "Marketing Internship",
    "sample": true,
    "type": "internship",
    "destination": "taiwan",
    "city": "Taipei",
    "field": "marketing",
    "duration": "medium",
    "durationText": "8–12 weeks",
    "starts": [
      "Summer 2027",
      "Autumn 2027"
    ],
    "workingLanguage": "English and Mandarin",
    "mandarinRequirement": "basic",
    "status": "open",
    "featured": false,
    "scene": "office",
    "photo": { "src": "/images/prog-taipei-marketing.webp", "alt": "Two interns reviewing a campaign mood board and colour swatches in a Taipei studio" },
    "summary": "Support a marketing team with campaigns, content and research for audiences in Taiwan and the region.",
    "audience": "Students and recent graduates in marketing, communications or business who want hands-on campaign experience.",
    "activities": [
      "Help plan and track social and content campaigns",
      "Research local consumer trends and competitors",
      "Prepare bilingual briefs with the team",
      "Join team meetings and present a short project"
    ],
    "outcomes": [
      "A portfolio piece from a real campaign",
      "Experience of a Taiwanese workplace",
      "Practical marketing vocabulary in Mandarin"
    ],
    "eligibility": [
      "Currently studying or graduated within the last two years",
      "Basic Mandarin is helpful; English is used in most team meetings (sample assumption)"
    ],
    "steps": [
      "Apply or register interest online",
      "Speak with a Bridgr Society advisor",
      "Placement or place confirmed by the host (not guaranteed)",
      "Prepare to go, with optional Mandarin preparation"
    ],
    "confirmed": {
      "dates": null,
      "fee": null,
      "inclusions": null,
      "host": null
    }
  },
  {
    "slug": "taipei-design",
    "title": "Product Design Internship",
    "sample": true,
    "type": "internship",
    "destination": "taiwan",
    "city": "Taipei",
    "field": "design",
    "duration": "long",
    "durationText": "12–16 weeks",
    "starts": [
      "Autumn 2027"
    ],
    "workingLanguage": "Mandarin with some English",
    "mandarinRequirement": "conversational",
    "status": "soon",
    "featured": false,
    "scene": "studio",
    "photo": { "src": "/images/prog-taipei-design.webp", "alt": "Two designers reviewing app wireframes at a desk, with Taipei 101 outside the window" },
    "summary": "Work with a product team on user research, wireframes and visual design.",
    "audience": "Design students and early-career designers with a portfolio.",
    "activities": [
      "Join user interviews and synthesise findings",
      "Create wireframes and prototypes",
      "Contribute to design reviews"
    ],
    "outcomes": [
      "A documented case study",
      "Experience of a product team’s process"
    ],
    "eligibility": [
      "A portfolio of design work",
      "Conversational Mandarin, as team discussions are mostly in Mandarin (sample assumption)"
    ],
    "steps": [
      "Apply or register interest online",
      "Speak with a Bridgr Society advisor",
      "Placement or place confirmed by the host (not guaranteed)",
      "Prepare to go, with optional Mandarin preparation"
    ],
    "confirmed": {
      "dates": null,
      "fee": null,
      "inclusions": null,
      "host": null
    }
  },
  {
    "slug": "shanghai-bizdev",
    "title": "Business Development Internship",
    "sample": true,
    "type": "internship",
    "destination": "china",
    "city": "Shanghai",
    "field": "business",
    "duration": "medium",
    "durationText": "10–12 weeks",
    "starts": [
      "Summer 2027"
    ],
    "workingLanguage": "Mandarin and English",
    "mandarinRequirement": "conversational",
    "status": "open",
    "featured": true,
    "scene": "meeting",
    "photo": { "src": "/images/prog-shanghai-bizdev.webp", "alt": "Interns reviewing a market map with a manager in a Shanghai office overlooking the Pudong skyline" },
    "summary": "Support a business development team with market research, partner outreach and client materials.",
    "audience": "Business and economics students interested in international trade and partnerships.",
    "activities": [
      "Research potential partners and markets",
      "Prepare pitch and client materials",
      "Join client calls and take notes",
      "Present findings to the team"
    ],
    "outcomes": [
      "Market research experience in China",
      "Confidence in bilingual business settings"
    ],
    "eligibility": [
      "Currently studying or graduated within the last two years",
      "Conversational Mandarin for internal meetings (sample assumption)"
    ],
    "steps": [
      "Apply or register interest online",
      "Speak with a Bridgr Society advisor",
      "Placement or place confirmed by the host (not guaranteed)",
      "Prepare to go, with optional Mandarin preparation"
    ],
    "confirmed": {
      "dates": null,
      "fee": null,
      "inclusions": null,
      "host": null
    }
  },
  {
    "slug": "shenzhen-tech",
    "title": "Technology Internship",
    "sample": true,
    "type": "internship",
    "destination": "china",
    "city": "Shenzhen",
    "field": "technology",
    "duration": "long",
    "durationText": "12–24 weeks",
    "starts": [
      "Flexible"
    ],
    "workingLanguage": "English-speaking team",
    "mandarinRequirement": "basic",
    "status": "enquiry",
    "featured": false,
    "scene": "tech",
    "photo": { "src": "/images/prog-shenzhen-tech.webp", "alt": "Two developers pair-programming at a monitor in a Shenzhen office" },
    "summary": "Join an engineering team building hardware-connected software products.",
    "audience": "Computer science and engineering students.",
    "activities": [
      "Contribute to a scoped engineering task",
      "Take part in code review and stand-ups",
      "Visit production partners (subject to host)"
    ],
    "outcomes": [
      "Engineering experience in a hardware ecosystem",
      "Understanding of product development in Shenzhen"
    ],
    "eligibility": [
      "Programming experience",
      "Basic Mandarin helpful outside work; the team works in English (sample assumption)"
    ],
    "steps": [
      "Apply or register interest online",
      "Speak with a Bridgr Society advisor",
      "Placement or place confirmed by the host (not guaranteed)",
      "Prepare to go, with optional Mandarin preparation"
    ],
    "confirmed": {
      "dates": null,
      "fee": null,
      "inclusions": null,
      "host": null
    }
  },
  {
    "slug": "singapore-finance",
    "title": "Finance & Operations Internship",
    "sample": true,
    "type": "internship",
    "destination": "singapore",
    "city": "Singapore",
    "field": "finance",
    "duration": "medium",
    "durationText": "8–12 weeks",
    "starts": [
      "Summer 2027",
      "Spring 2028"
    ],
    "workingLanguage": "English",
    "mandarinRequirement": "none",
    "status": "open",
    "featured": true,
    "scene": "finance",
    "photo": { "src": "/images/dest-singapore.webp", "alt": "Marina Bay Sands and the Singapore skyline across the bay" },
    "summary": "Support a regional finance team with reporting, analysis and process improvement.",
    "audience": "Finance, accounting and economics students.",
    "activities": [
      "Prepare and check reports",
      "Analyse data for a regional project",
      "Document a process improvement"
    ],
    "outcomes": [
      "Regional finance experience",
      "A finished analysis project"
    ],
    "eligibility": [
      "Finance or related study",
      "No Mandarin required; it may help with some clients (sample assumption)"
    ],
    "steps": [
      "Apply or register interest online",
      "Speak with a Bridgr Society advisor",
      "Placement or place confirmed by the host (not guaranteed)",
      "Prepare to go, with optional Mandarin preparation"
    ],
    "confirmed": {
      "dates": null,
      "fee": null,
      "inclusions": null,
      "host": null
    }
  },
  {
    "slug": "singapore-digital",
    "title": "Digital Marketing Internship",
    "sample": true,
    "type": "internship",
    "destination": "singapore",
    "city": "Singapore",
    "field": "marketing",
    "duration": "medium",
    "durationText": "8–12 weeks",
    "starts": [
      "Autumn 2027"
    ],
    "workingLanguage": "English",
    "mandarinRequirement": "none",
    "status": "soon",
    "featured": false,
    "scene": "office",
    "photo": { "src": "/images/dest-singapore.webp", "alt": "Marina Bay Sands and the Singapore skyline across the bay" },
    "summary": "Help a regional marketing team with performance campaigns and reporting.",
    "audience": "Marketing and data-minded students.",
    "activities": [
      "Set up and monitor campaigns",
      "Build simple performance reports",
      "Research audiences across Southeast Asia"
    ],
    "outcomes": [
      "Hands-on digital marketing experience",
      "A campaign report for your portfolio"
    ],
    "eligibility": [
      "Interest in digital marketing",
      "No Mandarin required (sample assumption)"
    ],
    "steps": [
      "Apply or register interest online",
      "Speak with a Bridgr Society advisor",
      "Placement or place confirmed by the host (not guaranteed)",
      "Prepare to go, with optional Mandarin preparation"
    ],
    "confirmed": {
      "dates": null,
      "fee": null,
      "inclusions": null,
      "host": null
    }
  },
  {
    "slug": "taipei-immersion",
    "title": "Mandarin & Workplace Culture Immersion",
    "sample": true,
    "type": "immersion",
    "destination": "taiwan",
    "city": "Taipei",
    "field": "business",
    "duration": "short",
    "durationText": "4 weeks",
    "starts": [
      "Summer 2027"
    ],
    "workingLanguage": "English with Mandarin practice",
    "mandarinRequirement": "none",
    "status": "open",
    "featured": true,
    "scene": "taiwan",
    "photo": { "src": "/images/hero-taipei.webp", "alt": "Three young people working together at a table in a bright Taipei office" },
    "summary": "A short group program combining company visits, workplace-culture workshops and daily Mandarin practice.",
    "audience": "Students curious about working in Mandarin-speaking environments, including complete beginners.",
    "activities": [
      "Company visits across sectors (hosts to be confirmed)",
      "Workshops on workplace communication",
      "Daily Mandarin practice sessions",
      "Cultural activities in Taipei"
    ],
    "outcomes": [
      "A clear picture of local workplace culture",
      "Everyday and workplace Mandarin basics"
    ],
    "eligibility": [
      "Open to beginners — no Mandarin required (sample assumption)"
    ],
    "steps": [
      "Apply or register interest online",
      "Speak with a Bridgr Society advisor",
      "Placement or place confirmed by the host (not guaranteed)",
      "Prepare to go, with optional Mandarin preparation"
    ],
    "confirmed": {
      "dates": null,
      "fee": null,
      "inclusions": null,
      "host": null
    }
  },
  {
    "slug": "shanghai-immersion",
    "title": "Business Culture Immersion",
    "sample": true,
    "type": "immersion",
    "destination": "china",
    "city": "Shanghai",
    "field": "business",
    "duration": "short",
    "durationText": "2 weeks",
    "starts": [
      "Summer 2027"
    ],
    "workingLanguage": "English",
    "mandarinRequirement": "none",
    "status": "enquiry",
    "featured": false,
    "scene": "china",
    "photo": { "src": "/images/dest-china.webp", "alt": "Shanghai’s Lujiazui skyline seen across the Huangpu River from the Bund" },
    "summary": "A two-week introduction to business in Shanghai through visits, talks and team challenges.",
    "audience": "Students exploring international business careers.",
    "activities": [
      "Company and industry visits (to be confirmed)",
      "Talks from local professionals",
      "A group business challenge"
    ],
    "outcomes": [
      "An introduction to business culture in China",
      "A team project presentation"
    ],
    "eligibility": [
      "Open to all levels of Mandarin (sample assumption)"
    ],
    "steps": [
      "Apply or register interest online",
      "Speak with a Bridgr Society advisor",
      "Placement or place confirmed by the host (not guaranteed)",
      "Prepare to go, with optional Mandarin preparation"
    ],
    "confirmed": {
      "dates": null,
      "fee": null,
      "inclusions": null,
      "host": null
    }
  },
  {
    "slug": "taipei-production",
    "title": "Media Production Internship",
    "sample": true,
    "type": "internship",
    "destination": "taiwan",
    "city": "Taipei",
    "field": "production",
    "duration": "medium",
    "durationText": "8–12 weeks",
    "starts": [
      "Spring 2028"
    ],
    "workingLanguage": "Mandarin",
    "mandarinRequirement": "professional",
    "status": "enquiry",
    "featured": false,
    "scene": "studio",
    "photo": { "src": "/images/prog-product-video.webp", "alt": "An intern setting up a product video shoot while a colleague reviews analytics on a laptop" },
    "summary": "Assist a production team on video and event projects from planning to delivery.",
    "audience": "Media, film and communications students.",
    "activities": [
      "Help with pre-production planning",
      "Assist on shoots and events",
      "Support editing and delivery"
    ],
    "outcomes": [
      "Credits on real productions",
      "Production vocabulary in Mandarin"
    ],
    "eligibility": [
      "Media or film experience",
      "Professional working Mandarin, as the team works fully in Mandarin (sample assumption)"
    ],
    "steps": [
      "Apply or register interest online",
      "Speak with a Bridgr Society advisor",
      "Placement or place confirmed by the host (not guaranteed)",
      "Prepare to go, with optional Mandarin preparation"
    ],
    "confirmed": {
      "dates": null,
      "fee": null,
      "inclusions": null,
      "host": null
    }
  }
];
