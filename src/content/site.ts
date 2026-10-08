/**
 * Site-wide content.
 */

export const site = {
  name: "Temitope Samuel",
  shortName: "Temitope",
  role: "Product Designer × Design Engineer",
  title: "Temitope Samuel — Product Designer & Design Engineer",
  description:
    "Temitope Samuel is a product designer and design engineer who designs and builds digital products, websites and AI-assisted experiences.",
  // Set NEXT_PUBLIC_SITE_URL to the live domain when deploying.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://temitopesamuel.com",
  locale: "en_NG",
  keywords: [
    "Product Designer",
    "UI/UX Designer",
    "Product Design",
    "AI Product Designer",
    "Design Engineer",
    "Design Technologist",
    "UX Designer",
    "Web Designer",
    "Nigeria Product Designer",
    "AI-assisted development",
  ],
};

export type SocialLink = { label: string; href: string; handle: string };

// From the CV (public/Temitope-Samuel-CV.pdf).
export const contact = {
  email: "topsysammy123@gmail.com",
  cvUrl: "/Temitope-Samuel-CV.pdf",
  calUrl: "https://cal.com/topsysammy/30min",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/temitope-samuel-a2284713b", handle: "in/temitope-samuel" },
    { label: "Twitter", href: "https://x.com/Topsysammy", handle: "@Topsysammy" },
    { label: "GitHub", href: "https://github.com/topsysammy", handle: "@topsysammy" },
    { label: "Behance", href: "https://www.behance.net/samueltemitope", handle: "samueltemitope" },
  ] satisfies SocialLink[],
};

export const nav = [
  { label: "Work", href: "/work" },
  { label: "Playground", href: "/playground" },
  { label: "About", href: "/about" },
];

export const capabilities = [
  "Product Design",
  "UX Research",
  "UI Design",
  "Prototyping",
  "Design Systems",
  "Web Design",
  "AI Vibecoding",
  "Rapid Prototyping",
];

export const disciplines = [
  {
    no: "01",
    title: "Product Design",
    lede: "Untangling the problem before drawing a single screen.",
    items: [
      "UX Research",
      "UX Strategy",
      "User Flows",
      "Information Architecture",
      "Wireframing",
      "UI Design",
      "Prototyping",
      "Design Systems",
    ],
  },
  {
    no: "02",
    title: "Web & Digital Experiences",
    lede: "Websites that look considered and say the right thing, fast.",
    items: [
      "Website Design",
      "Landing Pages",
      "SaaS Interfaces",
      "Responsive Design",
      "Interaction Design",
      "Visual Systems",
    ],
  },
  {
    no: "03",
    title: "AI Vibecoding",
    lede: "Taking the design all the way to something people can click.",
    items: [
      "AI-assisted development",
      "Rapid prototyping",
      "Functional MVPs",
      "Web apps",
      "AI experiments",
      "Design-to-code workflows",
    ],
  },
] as const;

export const workflow = [
  { step: "Think", body: "Frame the real problem, who has it and why it matters." },
  { step: "Design", body: "Shape flows, structure and interface until it feels obvious." },
  { step: "Build", body: "Turn the design into working software with AI as a co-pilot." },
  { step: "Ship", body: "Put it in front of people, learn, and iterate." },
];

export const aboutProcess = ["Understand", "Explore", "Design", "Build", "Iterate"];

export const stack = {
  AI: ["Claude", "ChatGPT", "Gemini"],
  Design: ["Figma", "FigJam"],
  // Only list technologies actually used.
  Build: ["HTML", "CSS", "JavaScript", "React", "Next.js"],
};

// From the CV.
export const experience: { period: string; role: string; org: string; note: string }[] = [
  { period: "Jan 2026 — Mar 2026", role: "UI/UX Designer (Contract)", org: "Caresync Expert · United Kingdom, remote", note: "Collaborated with designers and developers to create intuitive and visually engaging interfaces for websites, aligned with brand guidelines." },
  { period: "Oct 2024 — Present", role: "UI/UX Product Designer", org: "Freelance · Remote", note: "UI design and UX research with project managers and developers on e-commerce apps, health tech apps, diabetes trackers and real estate websites." },
  { period: "Aug 2023 — May 2025", role: "Product Designer", org: "Webverse · Nigeria, remote", note: "Designed and delivered websites and apps for up to 20 clients across various industries, with a key role in UI design and UX research." },
  { period: "Jan 2023 — Jun 2023", role: "UI/UX Design Intern", org: "Tech A intern", note: "Worked with senior designers on interfaces for web and mobile applications, and researched design trends to support project development." },
];

export const currently =
  "Currently open to product design opportunities, freelance projects and interesting product ideas.";
