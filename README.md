# Temitope Samuel — Portfolio

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4. Every page is statically generated.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # type-check + static build
npm start
```

## Editing content

All content lives in `src/content/`. You don't need to touch components to update the site.

| File | What's in it |
|---|---|
| `src/content/projects.ts` | Every project. Add one by appending an object. `projectType` decides where it appears (`case-study`, `website`, `vibecoded`, `experiment`). |
| `src/content/site.ts` | Name, email, socials, nav, capabilities, stack, experience timeline, "Currently" line. |
| `src/content/types.ts` | The `Project` shape, including optional case-study and vibecode blocks. |

**Images.** Covers are code-drawn mockups (`src/components/mock/`). To use a real screenshot, put the file in `public/` and set:

```ts
coverImage: { src: "/work/ajotrack.jpg", alt: "AjoTrack dashboard", width: 2400, height: 1800 }
```

**Prototype embeds.** Set `caseStudy.prototype.embedUrl` (for example, a Figma embed URL).

**Live demos.** Set `liveUrl` and `githubUrl` on a project. The "Try it" and GitHub buttons appear automatically.

## Before launch
- Set `NEXT_PUBLIC_SITE_URL` (or `site.url` in `site.ts`) to the real domain. It drives canonical URLs, the sitemap and OG tags.
- Analytics: Vercel Analytics loads automatically when deployed on Vercel. Tracked events: contact, LinkedIn, GitHub, case-study, project, live-demo and filter clicks. They're wired through `data-track` attributes and `src/lib/track.ts`.

## Look & feel
A scrapbook on ruled notebook paper, inspired by Portfoliofy's Creative Artsy template. It uses pixel headlines (Handjet), handwriting (Just Me Again Down Here), DM Mono labels, torn tags, washi tape, polaroids, sticky notes and stacked folder-tab project cards. Colours and fonts live in `src/app/globals.css`.

## Structure
```
src/app/            routes: /, /work, /work/[slug], /vibecoded, /vibecoded/[slug], /about, /playground, /contact
src/components/
  doodle/           Torn, Tape, Sticker, Note, SketchBox, Arrow, Polaroid, Smiley, PageTitle, icons
  home/             homepage sections (Hero, WhatsUp, WhatIDo, FeaturedWorks, Websites, BuiltWithAI, …)
  work/             FolderStack, FolderCard, WorkFilter, CaseStudy template, Moodboard
  layout/           Navbar, LetsTalk (contact block on every page), Footer, Socials
  mock/             device frames + mocked UIs used as cover art
  ui/               reveal/analytics effects, portrait
```

Motion: scroll reveals and the pencil "draw-in" strokes are CSS triggered by one shared IntersectionObserver (`ClientEffects`). There's no animation library. Everything respects `prefers-reduced-motion`.
