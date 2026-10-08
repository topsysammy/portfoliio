export type ProjectType = "case-study" | "website" | "vibecoded" | "experiment";

export type ProjectStatus = "Live" | "In progress" | "Concept" | "Prototype" | "Archived";

/**
 * Code-drawn cover art used until real screenshots exist.
 * Set `coverImage` on a project to replace the mock with a real image.
 */
export type MockKind = "savings" | "payments" | "shopping" | "care" | "estate" | "commerce" | "experiment";

export type MockConfig = {
  kind: MockKind;
  /** Background tint behind the device frame. */
  tint: string;
  /** Brand colour used inside the mocked UI. */
  brand: string;
};

export type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type CaseStudy = {
  overview?: { timeline?: string; team?: string; platform?: string; /** One-paragraph summary shown as a pull quote. */ summary?: string };
  problem?: {
    statement: string;
    who?: string;
    why?: string;
    /** Named frustrations, shown as sticky notes. */
    points?: { title: string; body: string }[];
    quote?: { text: string; by: string };
  };
  /** Week-by-week process. */
  process?: { when: string; title: string; body: string }[];
  /** Image-led sections: a heading, a short write-up and a taped-in image. */
  showcase?: { heading: string; title: string; body: string; image: ImageAsset; points?: { title: string; body: string }[] }[];
  research?: {
    methods?: string[];
    findings?: string[];
    painPoints?: string[];
    userNeeds?: string[];
    insights?: string[];
  };
  strategy?: {
    goals?: string[];
    principles?: { title: string; body: string }[];
    informationArchitecture?: string[];
    userFlow?: string[];
  };
  exploration?: { notes?: string; stages?: { title: string; body: string }[] };
  visual?: { notes?: string; screens?: string[] };
  prototype?: { embedUrl?: string; notes?: string };
  outcome?: {
    achieved?: string[];
    learned?: string[];
    improve?: string[];
  };
};

export type VibecodeStoryStep = {
  step: "Idea" | "Design" | "Prompt" | "Build" | "Iterate" | "Ship";
  body: string;
};

export type Vibecode = {
  whatItIs: string;
  whatIBuilt: string;
  aiTools: string[];
  tech: string[];
  problem?: string;
  story?: VibecodeStoryStep[];
};

export type Project = {
  title: string;
  slug: string;
  /** Short tagline shown under the title, e.g. "Personal savings tracker". */
  tagline: string;
  category: string[];
  description: string;
  year: string;
  role: string;
  tools: string[];
  projectType: ProjectType;
  featured?: boolean;
  status: ProjectStatus;
  coverImage?: ImageAsset;
  mock: MockConfig;
  gallery?: ImageAsset[];
  caseStudy?: CaseStudy;
  vibecode?: Vibecode;
  liveUrl?: string;
  githubUrl?: string;
  /** Full case study hosted on Behance. Cards link there with a "View on Behance" button. */
  behanceUrl?: string;
  /** A card with no page or link behind it: just the image and a short description. */
  showcaseOnly?: boolean;
};
