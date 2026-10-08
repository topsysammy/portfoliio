import type { Project, ProjectType } from "./types";

/**
 * All portfolio work lives here. Add a project by appending an object; pages,
 * filters, sitemap and "next project" links pick it up automatically.
 *
 * Content rule: nothing here is an invented result.
 */


export const projects: Project[] = [
  // ─────────────────────────────── Case studies ───────────────────────────────
  {
    title: "DUBA",
    slug: "duba",
    tagline: "Bill payment app",
    category: ["Fintech", "Product Design", "Mobile App"],
    description:
      "A bill-payment and virtual-card app that brings airtime, data, electricity and betting top-ups into one calm, trustworthy wallet.",
    year: "2026",
    role: "Product Designer (UI/UX)",
    tools: ["Figma"],
    projectType: "case-study",
    featured: true,
    status: "Concept",
    coverImage: { src: "/work/duba-cover.png", alt: "DUBA bill payment app: wallet home, onboarding and airtime screens", width: 1400, height: 1147 },
    mock: { kind: "payments", tint: "#0E0E0E", brand: "#111111" },
    behanceUrl: "https://www.behance.net/gallery/256508847/DUBA-Bill-payment-app",
    // Content below is taken from the Behance case study.
    caseStudy: {
      overview: {
        timeline: "6 weeks",
        platform: "iOS mobile app",
        summary:
          "DUBA is a bill-payment app designed around one simple idea: paying for the essentials should take seconds, not four different apps — and every naira should leave a clear, trustworthy receipt.",
      },
      problem: {
        statement: "Paying bills in Nigeria feels scattered.",
        who: "We spoke with 12 young professionals in Lagos and Abuja who pay at least four bills a month. Three frustrations kept coming up.",
        why: "Nigerians juggle separate apps and USSD codes to buy airtime, data, power tokens and betting credit. Payments fail silently, receipts disappear, and balances are hard to trust.",
        points: [
          { title: "Too many apps", body: "Airtime in one app, power tokens in another, betting top-ups on a website. Users context-switch for every bill." },
          { title: "Payments fail silently", body: "Debits with no token, no receipt and no clear status leave users anxious and calling support." },
          { title: "Low trust in balances", body: "Hidden fees and unclear confirmations make people double-check every transaction." },
        ],
        quote: {
          text: "I just want to buy light, top up data and fund my bet in one place — and actually see a receipt when the money leaves.",
          by: "Ada, 27 · Lagos (research participant)",
        },
      },
      process: [
        { when: "Week 01", title: "Discover", body: "Interviews, competitor audit of 6 bill-pay apps, USSD journey mapping." },
        { when: "Week 02", title: "Define", body: "Personas, jobs-to-be-done and the “4 taps to pay” success metric." },
        { when: "Week 03", title: "Structure", body: "Information architecture, user flows and low-fi wireframes." },
        { when: "Week 04–05", title: "Design", body: "High-fidelity UI, components, glass nav and the virtual card." },
        { when: "Week 06", title: "Test", body: "Prototype tests with 8 users; iterated on PIN and receipt screens." },
      ],
      strategy: {
        goals: ["Every decision was measured against one question: does this help someone pay a bill faster and feel sure it worked?"],
        principles: [
          { title: "Clarity", body: "One hero number per screen. Balances, amounts and statuses are always the largest type on the page." },
          { title: "Speed", body: "Any bill in four taps: pick service → enter details → confirm → PIN. Quick amounts remove typing." },
          { title: "Trust", body: "Verified customer names, a confirmation sheet before every debit, and a receipt for every naira." },
          { title: "Control", body: "Freeze the card, reveal details, and set limits from one place — no support call needed." },
        ],
      },
      showcase: [
        {
          heading: "any bill in four taps",
          title: "User flow",
          body: "The core journey was designed once and reused for every service, so learning to buy airtime means you already know how to pay for light, data or betting.",
          image: { src: "/work/duba/user-flow.png", alt: "DUBA user flow: splash, sign up, verify email, create PIN, home, choose service, enter details, confirm, enter PIN, success", width: 1400, height: 400 },
        },
        {
          heading: "monochrome by default, colour with purpose",
          title: "Visual language",
          body: "DUBA unifies everyday payments in a quiet, monochrome interface that lets the money do the talking. Plus Jakarta Sans carries the UI, and colour is reserved for services and status.",
          image: { src: "/work/duba/visual-language.png", alt: "DUBA typeface, type scale and colour palette", width: 1400, height: 690 },
        },
        {
          heading: "a home screen that answers first",
          title: "Application design",
          body: "The wallet balance leads, Top up and Transfer sit one thumb-reach below, and the four most-used services are large, tinted tiles — each tint carried into its own flow so users always know where they are.",
          image: { src: "/work/duba/home.png", alt: "DUBA home screen with wallet balance and service tiles, beside the internet data screen", width: 830, height: 1089 },
          points: [
            { title: "Balance first", body: "₦ and $ equivalent at a glance, with a privacy toggle." },
            { title: "Tinted service tiles", body: "Blue for Internet, green for Electricity, yellow for Betting." },
            { title: "Glass navigation", body: "A floating pill nav that never hides content." },
          ],
        },
        {
          heading: "security that feels reassuring, not heavy",
          title: "Onboarding & security",
          body: "Sign-up stays short: verify the email, set a 4-digit transaction PIN, and you’re in. The same PIN pad and dot pattern reappear at checkout, so authorising a payment feels familiar from day one.",
          image: { src: "/work/duba/onboarding.png", alt: "DUBA onboarding screens: welcome, sign up, verify email, create PIN, all set", width: 1400, height: 600 },
        },
        {
          heading: "from tap to token in under 20 seconds",
          title: "Core flow · Airtime",
          body: "Quick amounts and a saved number mean most airtime purchases need no typing at all. A review sheet and PIN guard every debit, and success always ends with a shareable receipt.",
          image: { src: "/work/duba/airtime.png", alt: "DUBA airtime flow: enter details, confirm, authorise with PIN, payment successful", width: 1400, height: 780 },
        },
        {
          heading: "take control of your card from one place",
          title: "Virtual card",
          body: "Card details stay blurred until you ask for them. Freezing is a single, reversible action with a plain-language confirmation — no charges, no calls.",
          image: { src: "/work/duba/card.png", alt: "DUBA virtual card screens: card, card details, freeze card sheet, frozen card", width: 1400, height: 700 },
        },
        {
          heading: "every naira, accounted for",
          title: "Wallet & activity",
          body: "A dedicated account number makes top-ups as easy as a bank transfer. Transfers resolve the recipient’s name before you pay, and every transaction lands in a searchable history with a downloadable receipt.",
          image: { src: "/work/duba/wallet.png", alt: "DUBA top up, transfer, transactions, receipt and notifications screens", width: 1400, height: 640 },
        },
        {
          heading: "a small kit that scales to every bill",
          title: "UI components",
          body: "Buttons, inputs, selection chips, service tiles, navigation and list rows: a handful of parts reused across every flow.",
          image: { src: "/work/duba/components.png", alt: "DUBA UI components: buttons, inputs, selection, service tiles, navigation, PIN and network pickers, lists", width: 1400, height: 880 },
        },
        {
          heading: "the rest of the app, same quiet system",
          title: "Other screens",
          body: "Every remaining screen is built from the same handful of components — so login, settings and betting feel like part of one product, not add-ons.",
          image: { src: "/work/duba/other.png", alt: "More DUBA screens: splash, login, forgot password, confirm PIN, betting, settings, internet, virtual card, electricity, transfer, transactions, notifications", width: 1400, height: 960 },
        },
      ],
    },
  },
  {
    title: "Mealio",
    slug: "mealio",
    tagline: "Food ordering and delivery app",
    category: ["UI/UX", "Food Delivery", "Mobile App"],
    description:
      "A modern food delivery app that helps users quickly discover restaurants, filter food options and place orders with minimal friction.",
    year: "2025",
    role: "UI/UX Designer",
    tools: ["Figma"],
    projectType: "case-study",
    featured: true,
    status: "Concept",
    coverImage: { src: "/work/mealio/cover.png", alt: "Mealio food ordering app: welcome, home and restaurant detail screens", width: 1400, height: 996 },
    mock: { kind: "shopping", tint: "#EFFAF0", brand: "#14B74D" },
    behanceUrl: "https://www.behance.net/gallery/239472869/MEALIO-Food-Ordering-and-Delivery-App",
    // Content below is taken from the Behance case study.
    caseStudy: {
      overview: {
        platform: "iOS mobile app",
        summary:
          "This project focuses on designing a modern and effortless food delivery application that helps users quickly discover restaurants, filter food options, and place orders with minimal friction. The goal was to create a clean, intuitive interface that improves food discovery and ordering for users in busy urban environments.",
      },
      problem: {
        statement: "The challenge was to design a food delivery app that solves these pain points with speed, clarity, and personalization.",
        who: "Jessica works long hours and barely has time to cook. She values speed, convenience and reliability, and wants to order food quickly — preferably in under 2 minutes — without scrolling endlessly.",
        why: "Too many options, weak filters and slow checkouts lead to frustration, abandoned carts, and slow decision-making.",
      },
      research: {
        methods: ["User interviews (10 participants)", "Competitor analysis (UberEats, JumiaFood, Glovo)", "Survey on ordering behaviors"],
        findings: [
          "84% of users rely on search before browsing menus",
          "Users want clear delivery times and transparent pricing",
          "Filters are underused because they feel complex or hidden",
          "Most users reorder the same meals regularly",
          "Speed and convenience are the biggest factors in app choice",
        ],
        painPoints: [
          "Too many restaurant options",
          "Difficulty finding preferred cuisines quickly",
          "Poor filtering systems",
          "Slow and confusing checkout processes",
          "Cluttered, visually overwhelming interfaces",
        ],
        userNeeds: ["Find food fast without browsing too much", "See delivery time clearly", "Reorder usual meals easily", "Get meals within budget"],
      },
      strategy: {
        goals: [
          "Make food discovery fast, relevant, and personalized",
          "Create an easy ordering experience with minimal steps",
          "Ensure users can filter and find exactly what they want without frustration",
          "Improve conversion rates by simplifying the search → select → order journey",
          "Deliver a clean visual aesthetic that enhances usability and trust",
        ],
      },
      showcase: [
        { heading: "what it does", title: "App features", body: "With Mealio, food ordering has never been so easy. Just open your app and order food from your favorite restaurant.", image: { src: "/work/mealio/features.png", alt: "Mealio app features: smart search, live support, favourites, checkout, tracking, notifications", width: 1400, height: 810 } },
        { heading: "first impressions", title: "Splash & onboarding", body: "A calm splash screen and two onboarding screens that set expectations: discover meals, track orders, check out securely.", image: { src: "/work/mealio/onboarding.png", alt: "Mealio splash and onboarding screens", width: 1400, height: 820 } },
        { heading: "getting in", title: "Secured sign-up & login", body: "Login, sign-up and password reset, with Google and Apple as quick alternatives.", image: { src: "/work/mealio/signup.png", alt: "Mealio login, sign up and reset password screens", width: 1400, height: 840 } },
        { heading: "finding food fast", title: "Home & product pages", body: "Search sits at the top of home, followed by category chips, restaurants and popular meals. Meal and restaurant pages keep price, delivery time and add-ons in view.", image: { src: "/work/mealio/home.png", alt: "Mealio home, meal details and restaurant screens", width: 1400, height: 810 } },
        { heading: "paying without friction", title: "Cart & checkout flow", body: "Cart totals are broken down clearly, and checkout keeps delivery location and payment method on one screen.", image: { src: "/work/mealio/cart.png", alt: "Mealio cart, checkout and add card screens", width: 1400, height: 850 } },
        { heading: "browse and track", title: "Explore & order pages", body: "Explore lists meals with simple filters. Orders show status at a glance, with step-by-step tracking in the details.", image: { src: "/work/mealio/explore.png", alt: "Mealio explore, orders and order details screens", width: 1400, height: 820 } },
        { heading: "everything else", title: "Other screens", body: "Search, filters, notifications, messaging, calls and profile.", image: { src: "/work/mealio/other.png", alt: "More Mealio screens: search, filters, notifications, messaging, call", width: 1400, height: 2100 } },
        { heading: "the ui kit", title: "Typography & colour", body: "Roboto throughout, with one fresh green (#14B74D) against near-black, light grey and mid grey.", image: { src: "/work/mealio/ui-kit.png", alt: "Mealio typography scale in Roboto and colour palette", width: 1400, height: 640 } },
      ],
    },
  },
  {
    title: "DUBA Website",
    slug: "duba-website",
    tagline: "Landing page for the DUBA app",
    category: ["Web Design", "Landing Page", "Fintech"],
    description:
      "The marketing site for DUBA: airtime, data, electricity and betting top-ups, plus a virtual card you control, explained on one page.",
    year: "2026",
    role: "Designer & Builder",
    tools: ["Figma"],
    projectType: "website",
    featured: true,
    status: "Live",
    coverImage: { src: "/work/duba-website.jpg", alt: "DUBA landing page hero: Pay every bill from one place, beside the app's home screen", width: 1440, height: 1020 },
    mock: { kind: "commerce", tint: "#0E0E0E", brand: "#FF5C02" },
    liveUrl: "https://duba-landing.vercel.app/",
  },
  {
    title: "Picta",
    slug: "picta",
    tagline: "Two-player draw-and-guess game",
    category: ["Game", "Web App", "Vibecoded"],
    description:
      "A two-player draw-and-guess game for the phone. One player draws a secret word, the other guesses it. Play on one phone by passing it back and forth, or on two phones over the internet.",
    year: "2026",
    role: "Designer & Builder",
    tools: ["Claude"],
    projectType: "vibecoded",
    featured: true,
    status: "Live",
    liveUrl: "https://picta-game.vercel.app",
    coverImage: { src: "/work/picta/cover.jpg", alt: "Picta screens: home with three game modes, the drawing screen with a secret word and timer, and Freestyle with a sketched house", width: 1400, height: 900 },
    gallery: [{ src: "/work/picta/flow.jpg", alt: "Picta screens: Pass N play setup, the pass-the-phone screen, and Play online", width: 1400, height: 900 }],
    mock: { kind: "experiment", tint: "#F3E2AD", brand: "#2B3A4F" },
    vibecode: {
      whatItIs:
        "A draw-and-guess game for two. Three modes: Pass N play on one phone, Play online on two phones, and Freestyle for drawing with no timer.",
      whatIBuilt:
        "The whole game: splash and home screens, the drawing canvas with stroke widths, undo and clear, timed rounds and scoring, and online play over a realtime channel.",
      aiTools: ["Claude"],
      tech: ["React", "Vite", "Tailwind CSS", "Supabase"],
      problem:
        "Drawing games are usually built for a room full of people and a big screen. I wanted one that works for two people with just a phone, whether they are sitting together or apart.",
    },
  },
  {
    title: "Morenikeji Collections",
    slug: "morenikeji-collections",
    tagline: "Fashion & lifestyle e-commerce store",
    category: ["Web Design", "E-commerce", "Fashion"],
    description:
      "An online store for the Nigerian market: clothing, perfumes, watches, bags and more, with delivery across Nigeria and payment by card, transfer or USSD.",
    year: "2026",
    role: "Designer & Builder",
    tools: ["Figma"],
    projectType: "website",
    featured: true,
    status: "Live",
    coverImage: { src: "/work/morenikeji-website.jpg", alt: "Morenikeji Collections homepage hero: Your Style Starts Here, with For Him and For Her collection cards", width: 1280, height: 960 },
    mock: { kind: "commerce", tint: "#ECEBDF", brand: "#8EEB5B" },
    liveUrl: "https://morenikejicollections.netlify.app/",
  },
  {
    title: "Shoppa",
    slug: "shoppa",
    tagline: "Your market list, every day",
    category: ["UI/UX", "Product Design", "Mobile App"],
    description:
      "A shopping-list app built around how people in Nigerian markets and supermarkets actually shop: in a crowd, with one free hand, often on a weak connection, and frequently buying for someone else.",
    year: "2026",
    role: "Product design, PRD, design system",
    tools: ["Figma", "Claude"],
    projectType: "case-study",
    featured: true,
    status: "Concept",
    coverImage: { src: "/work/shoppa/cover.png", alt: "Shoppa app: home screen with active shopping lists and the welcome screen. Write it. Share it. Shop it.", width: 1400, height: 1000 },
    mock: { kind: "shopping", tint: "#DFF1CF", brand: "#1FA855" },
    behanceUrl: "https://www.behance.net/gallery/256754665/Shoppa",
    // Content below is taken from the Behance case study.
    caseStudy: {
      overview: {
        team: "Self-initiated project",
        platform: "Mobile app · iOS & Android",
        summary: "Shoppa replaces the paper list with one you can share on WhatsApp, tick off with one hand, and keep using when the network drops.",
      },
      problem: {
        statement: "Paper lists get lost, can\u2019t be shared, and never tell you what is left.",
        points: [
          { title: "Lists live in one pocket", body: "If the person with the paper isn\u2019t at the market, the list isn\u2019t either." },
          { title: "Markets have their own units", body: "Paint, congo, tuber, bunch, tin. Generic apps default to kilograms and litres." },
          { title: "Connection is not guaranteed", body: "Many stalls have weak data. An app that waits on the network fails when it\u2019s needed most." },
        ],
      },
      strategy: {
        goals: ["One list, a calm Shopping Mode, WhatsApp sharing, and offline that just works."],
      },
      showcase: [
        { heading: "what shoppa does instead", title: "Solutions", body: "Quick add with recent items and local units, a Shopping Mode with big rows and a live count, and sharing that starts with WhatsApp and syncs when you are back online.", image: { src: "/work/shoppa/solutions.png", alt: "Shoppa solutions: quick add, Shopping Mode, share and sync", width: 1400, height: 700 } },
        { heading: "what the design depends on", title: "Assumptions", body: "No usability data yet, so instead of inventing research I wrote down what the design depends on, and what would prove it wrong.", image: { src: "/work/shoppa/assumptions.png", alt: "Four assumptions with a test for each: one-handed use, WhatsApp as the sharing channel, local units, offline messaging", width: 1400, height: 900 } },
        { heading: "from splash to trip done", title: "User flow", body: "Add items, check the list, share, shop, finish.", image: { src: "/work/shoppa/user-flow.png", alt: "Shoppa user flow diagram and the five key screens: add items, check the list, share, shop, finish", width: 1400, height: 1370 } },
        { heading: "decision 01", title: "Shopping Mode is a different screen on purpose", body: "The list screen is for planning, so it is dense. Shopping Mode strips it down to big rows and the one number that matters: items remaining.", image: { src: "/work/shoppa/decision-1.png", alt: "Decision 01: Shopping Mode with 80px rows, 32px checkboxes and a live count", width: 1400, height: 640 } },
        { heading: "decision 02", title: "WhatsApp comes first in the share sheet", body: "The sheet previews the exact message, so you see what your family will receive before you send it.", image: { src: "/work/shoppa/decision-2.png", alt: "Decision 02: share sheet with message preview and WhatsApp first", width: 1400, height: 640 } },
        { heading: "decision 03", title: "Offline is designed, not an error", body: "A calm banner explains that changes are saved on the device and will sync later. Nothing blocks, so people keep shopping.", image: { src: "/work/shoppa/decision-3.png", alt: "Decision 03: offline home screen with a saved-on-device banner and sync badge", width: 1400, height: 640 } },
        { heading: "decision 04", title: "Shared lists show who did what", body: "Each item says who added it, and a banner at the top summarises the latest change.", image: { src: "/work/shoppa/decision-4.png", alt: "Decision 04: shared list showing who added each item and an activity banner", width: 1400, height: 640 } },
        { heading: "a calm, light system", title: "Typography & colour", body: "One green for action, one ink for text, and colour kept for meaning so a badge is the only place it shouts. Set in Figtree.", image: { src: "/work/shoppa/type-colour.png", alt: "Shoppa type in Figtree and an eight-colour palette", width: 1400, height: 1090 } },
        { heading: "the parts", title: "Components", body: "Navigation, buttons, inputs, chips, badges, toggles and list rows.", image: { src: "/work/shoppa/components.png", alt: "Shoppa UI components", width: 1400, height: 740 } },
        { heading: "everything in the app", title: "Feature sorting", body: "Sixteen areas, from splash and onboarding to offline states.", image: { src: "/work/shoppa/features.png", alt: "Shoppa feature list: splash, onboarding, sign up, sign in, home, lists, list details, add item, Shopping Mode, share list, join list, shared lists, search, notifications, profile and settings, offline and states", width: 1400, height: 380 } },
        { heading: "the screens", title: "UI screens", body: "Splash, profile, search, add item, list details, shopping complete, join list and the offline home.", image: { src: "/work/shoppa/screens.png", alt: "Eight Shoppa screens", width: 1400, height: 1340 } },
      ],
    },
  },

  {
    title: "GlobePay",
    slug: "globepay",
    tagline: "Send money globally",
    category: ["Fintech", "UI Design", "Mobile App"],
    description: "A money-transfer app for sending, receiving and exchanging money across USD and NGN accounts.",
    year: "2025",
    role: "UI Designer",
    tools: ["Figma"],
    projectType: "vibecoded",
    status: "Concept",
    showcaseOnly: true,
    coverImage: { src: "/work/globepay-cover.jpg", alt: "GlobePay app: welcome screen with a wallet and globe, and the home screen with USD and NGN accounts and recent transactions", width: 1400, height: 1000 },
    mock: { kind: "payments", tint: "#0C1F52", brand: "#1554E0" },
  },

];

/* ─────────────────────────────── Helpers ─────────────────────────────── */

export const typeLabels: Record<ProjectType, string> = {
  "case-study": "Case Study",
  website: "Websites",
  vibecoded: "Applications",
  experiment: "Experiments",
};

export const byType = (t: ProjectType) => projects.filter((p) => p.projectType === t);
export const featured = () => projects.filter((p) => p.featured);
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

/** Canonical URL for any project. */
export function projectHref(p: Project) {
  if (p.projectType === "vibecoded") return `/vibecoded/${p.slug}`;
  return `/work/${p.slug}`;
}

/** Projects that get a full detail page (websites/experiments are shown inline). */
export const hasDetailPage = (p: Project) =>
  (p.projectType === "case-study" && !!p.caseStudy) || (p.projectType === "vibecoded" && !!p.vibecode);

/** Next project in a continuous loop over projects with detail pages. */
export function nextProject(slug: string) {
  const list = projects.filter(hasDetailPage);
  const i = list.findIndex((p) => p.slug === slug);
  return list[(i + 1) % list.length];
}

