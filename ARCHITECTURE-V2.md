# Architecture Plan V2 — Chandra Choodeshwaran Multi-Page Website Redesign

> **Status:** Approved for implementation
> **Target:** Multi-page premium brand website — pink-and-white design system
> **Author:** Solutions Architect
> **Date:** 2026-06-24

---

## Table of Contents

1. [Codebase Analysis Summary](#1-codebase-analysis-summary)
2. [Project Structure (File Tree)](#2-project-structure-file-tree)
3. [Route Map with SEO Metadata](#3-route-map-with-seo-metadata)
4. [Component Tree (Hierarchy Diagram)](#4-component-tree-hierarchy-diagram)
5. [Data Flow Architecture](#5-data-flow-architecture)
6. [Styling Tokens & Color System](#6-styling-tokens--color-system)
7. [Social Link Configuration](#7-social-link-configuration)
8. [SEO Implementation Plan](#8-seo-implementation-plan)
9. [Homepage Section Blueprint](#9-homepage-section-blueprint)
10. [Navbar Architecture](#10-navbar-architecture)
11. [Footer Architecture](#11-footer-architecture)
12. [Content Audit & Cleanup](#12-content-audit--cleanup)
13. [Migration Checklist](#13-migration-checklist-step-by-step)
14. [Risks & Mitigations](#14-risks--mitigations)

---

## 1. Codebase Analysis Summary

### Current State (Before Migration)

| Aspect | Current | Target |
|--------|---------|--------|
| **Routing** | Single-page, hash-based scrolling (`#human-os`, `#podcast`, etc.) | Multi-page App Router (`/about`, `/services`, etc.) |
| **Color Theme** | Navy (`#0A0F1E`), Gold (`#D4AF37`), Off-white | Pink, White, Rose, Blush, Magenta |
| **Social Links** | 4 hardcoded in `SocialLinks.tsx` (IG, IG2, CH, SP) | Instagram, Spotify, LinkedIn, Email — centralized |
| **Spotify URL** | Hardcoded in 3+ locations (`constants.ts` x2, `SocialLinks.tsx`) | Single source of truth in config |
| **Navbar** | Hash-based smooth scroll, `useActiveSection` hook | Next.js `<Link>` components, page navigation |
| **Footer** | References `CONTACT_FALLBACK` with clubhouse + instagram array | Clean social links, no abbreviations |
| **Hero.tsx** | Exists but NOT used in `page.tsx` (unused) | Will be repurposed as Home page hero |
| **CTA.tsx** | Exists but NOT used in `page.tsx` (unused) | Will be repurposed |
| **Struggle/** | Empty directory | Remove |
| **Legacy Flask** | `app/`, `instance/`, `run.py`, `requirements.txt` | Remove |
| **Sanity CMS** | Configured but primarily uses fallback constants | Keep, enhance for optional CMS |
| **Content Data** | All in `src/lib/constants.ts` (496 lines) | Split into per-page config modules |
| **Static Export** | `output: 'export'` in `next.config.ts` | Keep static export or switch to SSR/ISR |

### Currently Active Sections (in page.tsx)
1. OpeningStatement (Hero-equivalent with GSAP word reveal)
2. HumanOS (Interactive pentagon diagram)
3. FivePillars (Detailed pillar breakdown)
4. Frameworks (Transformation frameworks)
5. RecognitionJourney (Awards timeline)
6. PodcastUniverse (Podcast with filters)
7. VoicesOfChange (Testimonials)
8. BookConversation (CTA/Contact)

### Unused/Orphaned Components
- `Hero/` (Hero.tsx, HeroTitle.tsx, HeroCTA.tsx, MeshBackground.tsx)
- `CTA/` (CTA.tsx)
- `Struggle/` (empty)
- `Impact/` (Impact.tsx, ImpactBlock.tsx, ImpactVisual.tsx)
- `Timeline/` (Timeline.tsx, TimelineItem.tsx, TimelineTrack.tsx)
- `Podcast/` (Podcast.tsx, FeaturedEpisode.tsx, EpisodeList.tsx, TopicCluster.tsx)
- `Testimonials/` (Testimonials.tsx, QuoteWall.tsx, QuoteCard.tsx)

### Social Links Audit (Items to Fix)
| File | Current Content | Issue |
|------|----------------|-------|
| `SocialLinks.tsx` | `{ label: 'Instagram', href: '...', icon: 'IG' }` | Abbreviation icon |
| `SocialLinks.tsx` | `{ label: 'Instagram', href: '...', icon: 'IG2' }` | Duplicate, cryptic icon |
| `SocialLinks.tsx` | `{ label: 'Clubhouse', href: '...', icon: 'CH' }` | Clubhouse (CH) — must remove |
| `SocialLinks.tsx` | `{ label: 'Spotify', href: '...', icon: 'SP' }` | Abbreviation icon, incorrect URL |
| `constants.ts` `CONTACT_FALLBACK` | `instagram: ['@chandra_choodeshwaran', '@chandrudutta']` | Duplicate entries |
| `constants.ts` `CONTACT_FALLBACK` | `clubhouse: '@chandruhsr'` | Must remove |
| `Footer.tsx` | References `CONTACT_FALLBACK.instagram` and `CONTACT_FALLBACK.clubhouse` | Must update |

---

## 2. Project Structure (File Tree)

```
chandra_choodeshwaran/
├── .env.local                              # Sanity credentials
├── .gitignore
├── ARCHITECTURE-V2.md                      # ← THIS FILE
├── ARCHITECTURE.md                         # Old architecture (keep for reference, remove later)
├── next.config.ts                          # Next.js config
├── package.json                            # Dependencies
├── postcss.config.js                       # PostCSS config
├── postcss.config.mjs                      # (consider removing — duplicate)
├── sanity.cli.ts                           # Sanity CLI
├── sanity.config.ts                        # Sanity Studio
├── tailwind.config.js                      # DESIGN TOKENS (MAJOR UPDATE)
├── tsconfig.json                           # TypeScript config
│
├── public/
│   └── images/                             # Static images, favicon, og-image
│
├── src/
│   ├── app/
│   │   ├── layout.tsx                      # Root layout (Navbar + Footer + Providers + SEO base)
│   │   ├── page.tsx                        # Home page (NEW exceptional design)
│   │   ├── not-found.tsx                   # 404 page
│   │   ├── loading.tsx                     # Root loading state
│   │   ├── error.tsx                       # Error boundary
│   │   ├── globals.css                     # Global styles (pink/white design system)
│   │   ├── providers.tsx                   # React Context providers
│   │   │
│   │   ├── about/
│   │   │   ├── page.tsx                    # /about — Biography + credentials
│   │   │   └── loading.tsx                 # (optional)
│   │   │
│   │   ├── services/
│   │   │   ├── page.tsx                    # /services — Training & counselling
│   │   │   ├── [slug]/
│   │   │   │   └── page.tsx                # /services/self-awareness (individual service detail)
│   │   │   └── loading.tsx
│   │   │
│   │   ├── podcast/
│   │   │   ├── page.tsx                    # /podcast — Episodes + Spotify embed
│   │   │   ├── [slug]/
│   │   │   │   └── page.tsx                # /podcast/episode-title (episode detail)
│   │   │   └── loading.tsx
│   │   │
│   │   ├── awards/
│   │   │   ├── page.tsx                    # /awards — Awards & Recognition
│   │   │   └── loading.tsx
│   │   │
│   │   ├── experience/
│   │   │   ├── page.tsx                    # /experience — Professional journey
│   │   │   └── loading.tsx
│   │   │
│   │   ├── contact/
│   │   │   ├── page.tsx                    # /contact — Contact form + details
│   │   │   └── loading.tsx
│   │   │
│   │   ├── blog/                           # OPTIONAL — Phase 2
│   │   │   ├── page.tsx                    # /blog
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   │
│   │   ├── speaking/                       # OPTIONAL — Phase 2
│   │   │   └── page.tsx                    # /speaking
│   │   │
│   │   ├── sitemap.ts                      # Dynamic sitemap generation
│   │   └── robots.ts                       # Robots.txt generation
│   │
│   ├── components/
│   │   ├── layout/                         # Persistent chrome
│   │   │   ├── Navbar.tsx                  # REBUILD: multi-page Link-based nav
│   │   │   ├── MobileNav.tsx               # REBUILD: multi-page mobile nav
│   │   │   ├── Footer.tsx                  # REBUILD: new social links + pink theme
│   │   │   ├── BackToTop.tsx               # Keep (update colors)
│   │   │   └── PageLayout.tsx              # NEW: Reusable page wrapper with consistent spacing
│   │   │
│   │   ├── sections/                       # Home page sections (scrolling)
│   │   │   ├── Hero/                       # NEW: Emotional first impression hero
│   │   │   │   ├── Hero.tsx
│   │   │   │   ├── HeroTitle.tsx
│   │   │   │   ├── HeroCTA.tsx
│   │   │   │   └── HeroBackground.tsx      # NEW: Pink gradient mesh
│   │   │   │
│   │   │   ├── Philosophy/                 # RENAMED from HumanOS
│   │   │   │   ├── Philosophy.tsx          # Refactored with pink theme
│   │   │   │   ├── PillarCard.tsx
│   │   │   │   └── PillarIcon.tsx
│   │   │   │
│   │   │   ├── FivePillars/                # Keep section, update theme
│   │   │   │   └── FivePillars.tsx
│   │   │   │
│   │   │   ├── Frameworks/                 # Keep section, update theme
│   │   │   │   ├── Frameworks.tsx
│   │   │   │   └── FrameworkStep.tsx
│   │   │   │
│   │   │   ├── Testimonials/               # Keep section, update theme
│   │   │   │   ├── Testimonials.tsx
│   │   │   │   ├── QuoteWall.tsx
│   │   │   │   └── QuoteCard.tsx
│   │   │   │
│   │   │   ├── Podcast/                    # Keep, update theme, use centralized spotify URL
│   │   │   │   ├── Podcast.tsx
│   │   │   │   ├── EpisodeCard.tsx
│   │   │   │   └── ThemeFilter.tsx
│   │   │   │
│   │   │   ├── Stats/                      # NEW: Impact stats counter section
│   │   │   │   └── Stats.tsx
│   │   │   │
│   │   │   ├── CTA/                        # Keep section, update theme
│   │   │   │   └── CTA.tsx
│   │   │   │
│   │   │   └── Contact/                    # NEW: Home page contact preview
│   │   │       └── ContactPreview.tsx
│   │   │
│   │   ├── pages/                          # NEW: Page-specific components
│   │   │   ├── About/
│   │   │   │   ├── BioSection.tsx
│   │   │   │   ├── CredentialsGrid.tsx
│   │   │   │   └── PhilosophyStatement.tsx
│   │   │   │
│   │   │   ├── Services/
│   │   │   │   ├── ServiceGrid.tsx
│   │   │   │   ├── ServiceCard.tsx
│   │   │   │   └── ServiceDetail.tsx
│   │   │   │
│   │   │   ├── Podcast/
│   │   │   │   ├── EpisodeGrid.tsx
│   │   │   │   ├── EpisodeDetail.tsx
│   │   │   │   └── SpotifyEmbed.tsx
│   │   │   │
│   │   │   ├── Awards/
│   │   │   │   ├── AwardTimeline.tsx
│   │   │   │   └── AwardCard.tsx
│   │   │   │
│   │   │   ├── Experience/
│   │   │   │   ├── Timeline.tsx
│   │   │   │   └── TimelineItem.tsx
│   │   │   │
│   │   │   └── Contact/
│   │   │       ├── ContactForm.tsx
│   │   │       ├── ContactInfo.tsx
│   │   │       └── MapEmbed.tsx
│   │   │
│   │   └── ui/                             # Shared primitives
│   │       ├── Button.tsx                  # UPDATE: pink theme variants
│   │       ├── Container.tsx               # Keep
│   │       ├── SectionHeading.tsx           # UPDATE: pink theme
│   │       ├── SocialLinks.tsx             # REBUILD: recognizable icons + labels
│   │       ├── AnimatedCounter.tsx          # Keep
│   │       ├── RevealText.tsx              # Keep
│   │       ├── Card.tsx                    # NEW: Reusable card with pink border
│   │       ├── Badge.tsx                   # NEW: Pill badge for tags
│   │       └── SEOHead.tsx                 # NEW: Per-page SEO helper
│   │
│   ├── config/                             # NEW: Centralized configuration
│   │   ├── site.ts                         # Site-wide config (name, URLs, social links)
│   │   ├── navigation.ts                   # Nav items for multi-page
│   │   ├── seo.ts                          # Default SEO metadata, OG image
│   │   └── social.ts                       # SINGLE SOURCE OF TRUTH for all social links
│   │
│   ├── content/                            # NEW: Per-page content (moved from constants.ts)
│   │   ├── home.ts                         # Home page content
│   │   ├── about.ts                        # About page content
│   │   ├── services.ts                     # Services content
│   │   ├── podcast.ts                      # Podcast content
│   │   ├── awards.ts                       # Awards content
│   │   ├── experience.ts                   # Experience content
│   │   ├── contact.ts                      # Contact content
│   │   ├── testimonials.ts                 # Testimonial data
│   │   └── pillars.ts                      # Pillars data (shared)
│   │
│   ├── hooks/
│   │   ├── useActivePath.ts                # NEW: Detects active route for nav
│   │   ├── useMediaQuery.ts                # Keep
│   │   ├── useScrollDirection.ts           # Keep
│   │   ├── useScrollProgress.ts            # Keep
│   │   └── useScrollToTop.ts              # NEW: Scroll to top on route change
│   │
│   ├── lib/
│   │   ├── animations.ts                   # Keep, update colors
│   │   ├── constants.ts                    # DEPRECATED — content moves to config/ and content/
│   │   ├── fonts.ts                        # Keep (may add new font for pink theme)
│   │   ├── utils.ts                        # Keep
│   │   └── metadata.ts                     # NEW: Helper to build metadata per page
│   │
│   ├── sanity/                             # Keep as-is (enhance if needed)
│   │   ├── client.ts
│   │   ├── image.ts
│   │   ├── queries.ts
│   │   └── schemas/
│   │
│   └── types/
│       ├── index.ts                        # KEEP + extend with new types
│       └── lucide.d.ts                     # Keep
│
├── app/                                    # REMOVE (legacy Flask)
├── instance/                               # REMOVE (legacy Flask)
├── run.py                                  # REMOVE (legacy Flask)
├── requirements.txt                        # REMOVE (legacy Flask)
└── .github/workflows/                      # Keep, update for new build
```

---

## 3. Route Map with SEO Metadata

| Route | File | Page Title | Meta Description | Primary Keywords | OG Type | Schema Type |
|-------|------|-----------|-----------------|------------------|---------|-------------|
| `/` | `app/page.tsx` | Chandra Choodeshwaran M — Emotional Intelligence & Soft Skills Trainer | Helping people communicate, lead, and grow through emotional intelligence. Soft Skills Trainer in Hosur, Tamil Nadu. | soft skills trainer in hosur, emotional intelligence specialist tamil nadu | `website` | `Person` + `ProfessionalService` |
| `/about` | `app/about/page.tsx` | About — Chandra Choodeshwaran M | Learn about Chandra Choodeshwaran M — a certified emotional intelligence coach, counsellor, and public speaking trainer based in Hosur, Tamil Nadu. | counsellor in hosur, emotional intelligence coach, public speaking trainer tamil nadu | `profile` | `Person` |
| `/services` | `app/services/page.tsx` | Services — Soft Skills Training, Counselling & EI Coaching | Explore professional services: soft skills training, emotional intelligence coaching, counselling, career guidance, and public speaking training in Hosur. | soft skills training hosur, emotional intelligence training, career guidance tamil nadu | `website` | `ProfessionalService` |
| `/services/[slug]` | `app/services/[slug]/page.tsx` | %title% — Chandra Choodeshwaran | Detailed information about %service_name% — personalized training and counselling in Hosur, Tamil Nadu. | %service_keywords% | `article` | `Service` |
| `/podcast` | `app/podcast/page.tsx` | Chandru's Psychology In Tamil — Podcast | Listen to Chandru's Psychology In Tamil — a Tamil podcast on emotional intelligence, psychology, communication, and personal growth. | psychology podcast tamil, emotional intelligence podcast, tamil personal growth podcast | `website` | `PodcastSeries` |
| `/podcast/[slug]` | `app/podcast/[slug]/page.tsx` | %title% — Chandru's Psychology In Tamil | %description% — Listen to this episode of Chandru's Psychology In Tamil podcast. | %episode_keywords% | `article` | `PodcastEpisode` |
| `/awards` | `app/awards/page.tsx` | Awards & Recognition — Chandra Choodeshwaran M | View the awards and recognition received by Chandra Choodeshwaran M including Times Edu Ex Award, ISTD Outstanding National Trainer, and more. | emotional intelligence award tamil nadu, best trainer hosur | `website` | `ItemList` |
| `/experience` | `app/experience/page.tsx` | Professional Journey — Chandra Choodeshwaran M | Explore the professional journey of Chandra Choodeshwaran M — from Microsoft Global Education Exchange to Times Edu Ex Award winner. | soft skills trainer experience, emotional intelligence specialist credentials | `website` | `ItemList` |
| `/contact` | `app/contact/page.tsx` | Contact — Chandra Choodeshwaran M | Get in touch with Chandra Choodeshwaran M. Book a free discovery call for soft skills training, counselling, or emotional intelligence coaching in Hosur. | contact soft skills trainer hosur, book counselling session tamil nadu | `website` | `ContactPoint` |
| `/blog` | `app/blog/page.tsx` | Insights — Chandra Choodeshwaran M (Phase 2) | Read insights on emotional intelligence, communication, leadership, and personal growth from Chandra Choodeshwaran M. | emotional intelligence blog, soft skills tips | `website` | `Blog` |
| `/speaking` | `app/speaking/page.tsx` | Speaking & Workshops — Chandra Choodeshwaran M (Phase 2) | Book Chandra Choodeshwaran M for speaking engagements, corporate workshops, and training sessions. | corporate trainer hosur, public speaking workshop tamil nadu | `website` | `Event` |

### URL Slug Strategy
- All lowercase, kebab-case
- No trailing slashes (remove `trailingSlash: true` from next.config.ts or keep consistent)
- Services slugs: `self-awareness`, `emotional-intelligence`, `communication`, `leadership`, `growth`
- Podcast slugs: auto-generated from episode titles (e.g., `the-accountability-ladder`)
- Blog slugs: auto-generated from post titles

### Nested Routes
```
/services          → Service listing page
/services/[slug]   → Individual service detail (Self-Awareness, EI, etc.)

/podcast           → Podcast listing with all episodes
/podcast/[slug]    → Individual episode detail page

/blog              → Blog listing
/blog/[slug]       → Individual blog post
```

---

## 4. Component Tree (Hierarchy Diagram)

```
<html>
└── <body>
    └── Providers (NavContext)
        └── RootLayout
            ├── <Navbar>
            │   ├── Logo (Link to /)
            │   ├── Desktop Nav Links (Link components)
            │   │   ├── Home (/)
            │   │   ├── About (/about)
            │   │   ├── Services (/services)
            │   │   ├── Podcast (/podcast)
            │   │   ├── Awards (/awards)
            │   │   ├── Experience (/experience)
            │   │   └── Contact (/contact)
            │   ├── Desktop CTA Button (Link to /contact)
            │   └── Mobile Hamburger Toggle
            │
            ├── <MobileNav> (AnimatePresence overlay)
            │   ├── Nav Links (same as desktop, mobile layout)
            │   └── CTA Button
            │
            └── <main>
                │
                ├── [HOME] /page.tsx
                │   ├── <Hero>
                │   │   ├── <HeroBackground /> (pink gradient mesh)
                │   │   ├── <HeroTitle /> (emotional headline)
                │   │   ├── <HeroCTA /> (dual CTA)
                │   │   └── Trust indicators row
                │   │
                │   ├── <OpeningStatement /> (refactored, shortened)
                │   ├── <Philosophy /> (formerly HumanOS — pink theme)
                │   ├── <FivePillars /> (pink theme)
                │   ├── <Stats /> (NEW: impact numbers)
                │   ├── <Frameworks /> (pink theme)
                │   ├── <Podcast /> (refactored, centralized spotify URL)
                │   ├── <Testimonials /> (pink theme)
                │   └── <CTA /> (pink theme, Link to /contact)
                │
                ├── [ABOUT] /about/page.tsx
                │   ├── <PageLayout>
                │   │   ├── <BioSection />
                │   │   ├── <CredentialsGrid />
                │   │   └── <PhilosophyStatement />
                │   │
                │
                ├── [SERVICES] /services/page.tsx
                │   ├── <PageLayout>
                │   │   ├── <SectionHeading />
                │   │   └── <ServiceGrid>
                │   │       └── <ServiceCard /> × N
                │   │
                │
                ├── [SERVICE DETAIL] /services/[slug]/page.tsx
                │   ├── <PageLayout>
                │       ├── <ServiceDetail />
                │       └── <CTA /> (related CTA)
                │
                ├── [PODCAST] /podcast/page.tsx
                │   ├── <PageLayout>
                │   │   ├── <SectionHeading />
                │   │   ├── <SpotifyEmbed /> (centralized URL)
                │   │   ├── <ThemeFilter />
                │   │   └── <EpisodeGrid>
                │   │       └── <EpisodeCard /> × N
                │   │
                │
                ├── [AWARDS] /awards/page.tsx
                │   ├── <PageLayout>
                │   │   └── <AwardTimeline>
                │   │       └── <AwardCard /> × N
                │   │
                │
                ├── [EXPERIENCE] /experience/page.tsx
                │   ├── <PageLayout>
                │   │   └── <Timeline>
                │   │       └── <TimelineItem /> × N
                │   │
                │
                └── [CONTACT] /contact/page.tsx
                    ├── <PageLayout>
                        ├── <ContactForm />
                        ├── <ContactInfo />
                        └── <MapEmbed /> (optional)
            │
            └── <Footer>
                ├── Brand + description
                ├── Quick Links (Link components)
                ├── <SocialLinks /> (centralized, icons + labels)
                └── <BackToTop />
```

### Shared vs Page-Specific Components

| Component | Scope | Notes |
|-----------|-------|-------|
| Navbar | Shared (layout) | Multi-page link-based, active route detection |
| MobileNav | Shared (layout) | Same nav links, mobile overlay |
| Footer | Shared (layout) | Social links, quick links, copyright |
| BackToTop | Shared (layout) | Floating button |
| PageLayout | Shared | Consistent spacing, padding, background |
| Button | Shared | Pink-themed variants |
| Container | Shared | Max-width wrapper |
| SectionHeading | Shared | Badge + title + subtitle |
| SocialLinks | Shared | Centralized social config |
| Card | Shared | Reusable card component |
| Badge | Shared | Pill/badge for tags |
| RevealText | Shared | Text reveal animation |
| AnimatedCounter | Shared | Number counter animation |
| Hero | Home only | Emotional first impression |
| Philosophy | Home only | Interactive pentagon |
| FivePillars | Home only | Pillar details |
| Stats | Home only | Impact numbers |
| Frameworks | Home only | Framework steps |
| Testimonials | Home only | Quote wall |
| BioSection | About only | Biography content |
| CredentialsGrid | About only | Certifications |
| ServiceGrid | Services only | Service cards |
| ServiceDetail | Services/[slug] only | Individual service |
| EpisodeGrid | Podcast only | Episode listing |
| AwardTimeline | Awards only | Award timeline |
| ContactForm | Contact only | Form with validation |
| ContactInfo | Contact only | Address, email, social |

---

## 5. Data Flow Architecture

### 5.1 Configuration Layer (NEW)

```
src/config/
├── site.ts          → Site-wide constants (name, tagline, location, email)
├── navigation.ts    → Nav item definitions (label, href, isActive check)
├── seo.ts           → Default SEO metadata, OG image path, Twitter handle
└── social.ts        → ALL social links (SINGLE SOURCE OF TRUTH)
```

**`src/config/site.ts`:**
```typescript
export const SITE = {
  name: 'Chandra Choodeshwaran M',
  shortName: 'Chandra Choodeshwaran',
  initials: 'CC',
  tagline: 'Emotional Intelligence Trainer · Counsellor · Public Speaking Coach',
  positioning: 'Helping people communicate, lead, and grow through emotional intelligence.',
  location: 'Hosur, Tamil Nadu, India',
  email: 'chandrachoodeshwaran@gmail.com',
  phone: '', // Add if available
  baseUrl: 'https://chandrachoodeshwaran.com', // Update when deployed
  foundedYear: 2010,
  languages: ['Tamil', 'English'],
} as const
```

**`src/config/social.ts` (SINGLE SOURCE OF TRUTH):**
```typescript
import { Instagram, Music2, Linkedin, Mail } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface SocialLink {
  label: string        // Visible text (e.g., "Instagram")
  href: string         // Full URL
  icon: LucideIcon     // Lucide icon component
  ariaLabel: string    // Accessible label (e.g., "Follow on Instagram")
  platform: string     // Platform name for microdata
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/chandra_choodeshwaran',
    icon: Instagram,
    ariaLabel: 'Follow Chandra Choodeshwaran on Instagram',
    platform: 'Instagram',
  },
  {
    label: 'Spotify',
    href: 'https://open.spotify.com/show/7jte6TL6cXPKVdqgO2jqqu',
    icon: Music2,
    ariaLabel: 'Listen to Chandru\'s Psychology In Tamil on Spotify',
    platform: 'Spotify',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/chandrachoodeshwaran', // Verify this URL
    icon: Linkedin,
    ariaLabel: 'Connect on LinkedIn',
    platform: 'LinkedIn',
  },
  {
    label: 'Email',
    href: 'mailto:chandrachoodeshwaran@gmail.com',
    icon: Mail,
    ariaLabel: 'Send an email to Chandra Choodeshwaran',
    platform: 'Email',
  },
]

// Centralized Spotify URL (use everywhere)
export const SPOTIFY_SHOW_URL = 'https://open.spotify.com/show/7jte6TL6cXPKVdqgO2jqqu'
export const SPOTIFY_EMBED_URL = 'https://open.spotify.com/embed/show/7jte6TL6cXPKVdqgO2jqqu'
```

### 5.2 Content Layer (NEW)

Content moves from `constants.ts` into per-page content modules:

**`src/content/home.ts`:**
```typescript
export const HOME_HERO = {
  badge: 'CHANDRACHOODESHWARAN M',
  headline: 'Understanding People Changes Everything',
  subtitle: 'The quality of your life follows the quality of your thinking.',
  trustItems: [
    'Times Edu Ex Award 2024',
    'Outstanding National Trainer — ISTD',
    '15+ Years of Impact',
    '1000+ Lives Transformed',
  ],
}

export const HOME_STATS = {
  items: [
    { value: 15, suffix: '+', label: 'Years of Experience' },
    { value: 1000, suffix: '+', label: 'Lives Impacted' },
    { value: 500, suffix: '+', label: 'Workshops Delivered' },
    { value: 96, suffix: '%', label: 'Client Satisfaction' },
  ],
}
// ... etc for all home sections
```

### 5.3 Data Flow Diagram

```
                    ┌─────────────────────────────────────────────┐
                    │              src/config/                    │
                    │  site.ts  │  navigation.ts  │  social.ts   │
                    │  seo.ts  (site-wide constants)              │
                    └──────────────┬──────────────────────────────┘
                                   │ import
                                   ▼
                    ┌─────────────────────────────────────────────┐
                    │              src/content/                   │
                    │  home.ts │ about.ts │ services.ts │ ...     │
                    │  (per-page content data)                    │
                    └──────────────┬──────────────────────────────┘
                                   │ import
                                   ▼
                    ┌─────────────────────────────────────────────┐
                    │         Next.js Page Components             │
                    │  app/page.tsx, app/about/page.tsx, ...      │
                    │  (Server Components by default)             │
                    └──────────────┬──────────────────────────────┘
                                   │ props
                                   ▼
                    ┌─────────────────────────────────────────────┐
                    │         Section / Page Components           │
                    │  components/sections/Hero/Hero.tsx          │
                    │  components/pages/About/BioSection.tsx      │
                    └──────────────┬──────────────────────────────┘
                                   │ props
                                   ▼
                    ┌─────────────────────────────────────────────┐
                    │           UI Primitive Components            │
                    │  Button, Card, SectionHeading, SocialLinks   │
                    └─────────────────────────────────────────────┘

                    Optional Sanity CMS flow:
                    Sanity CMS ──> sanity/client.ts ──> Page (Server Component)
                    Falls back to src/content/* if Sanity data unavailable
```

### 5.4 Social Link Data Flow

```
src/config/social.ts (SINGLE SOURCE OF TRUTH)
    │
    ├──> components/ui/SocialLinks.tsx (imports SOCIAL_LINKS array)
    │       └── Renders icon + label + aria-label for each link
    │
    ├──> components/layout/Footer.tsx (imports SOCIAL_LINKS)
    │       └── Renders SocialLinks component in footer
    │
    ├──> components/sections/Podcast/Podcast.tsx (imports SPOTIFY_SHOW_URL, SPOTIFY_EMBED_URL)
    │       └── Uses centralized Spotify URL for iframe + links
    │
    ├──> pages/contact/page.tsx (imports SOCIAL_LINKS)
    │       └── Shows social links in contact info
    │
    └──> content/podcast.ts (imports SPOTIFY_SHOW_URL)
            └── Episode data references spotify URL
```

---

## 6. Styling Tokens & Color System

### 6.1 Complete Color Palette

```javascript
// tailwind.config.js — MAJOR UPDATE

colors: {
  // === PRIMARY: Pink & Rose Family ===
  pink: {
    50:  '#FFF5F7',   // Very light blush — page backgrounds
    100: '#FFE8ED',   // Light blush — card surfaces
    200: '#FFCED9',   // Soft pink — hover states, borders
    300: '#FCA5B5',   // Medium pink — decorative elements
    400: '#E07B8C',   // PREMIUM PINK — Primary brand color, buttons
    500: '#D63F6D',   // MAGENTA — Active states, highlights
    600: '#C4536A',   // DEEP ROSE — Secondary accent
    700: '#9B3A4E',   // Dark rose — pressed states
    800: '#78283B',   // Deep burgundy — footer backgrounds
    900: '#4A1523',   // Darkest — extreme accents
  },

  // === SECONDARY: Warm Neutrals ===
  blush: {
    50:  '#FFF9FA',   // Almost white — main background
    100: '#FFF2F4',   // Light tint — section alt background
    200: '#FFE5EA',   // Subtle pink tint — hover surfaces
  },

  // === TEXT ===
  text: {
    primary:   '#1A1A1A',   // Near-black — headings, body
    secondary: '#4A4A4A',   // Dark gray — secondary text
    muted:     '#8B7B7B',   // Warm muted — captions, metadata
    inverse:   '#FFFFFF',   // White — text on dark backgrounds
  },

  // === SURFACES ===
  surface: {
    white:     '#FFFFFF',   // Cards, sections
    blush:     '#FFF5F7',   // Alternating sections
    rose:      '#FFE8ED',   // Highlighted sections
    dark:      '#2D1B20',   // Footer dark background
  },

  // === BORDERS ===
  border: {
    light: '#FFE5EA',    // Subtle borders
    medium: '#FFCED9',   // Active borders
    accent: '#E07B8C',   // Focus borders
  },

  // === SEMANTIC ===
  success: '#22C55E',   // Success messages
  warning: '#F59E0B',   // Warnings
  error:   '#EF4444',   // Errors
}
```

### 6.2 Typography

| Token | Font | Usage |
|-------|------|-------|
| `--font-serif` | `DM Serif Display` (400) | Headlines, hero, pull quotes, section titles |
| `--font-sans` | `Figtree` (300–700) | Body text, buttons, nav, cards |
| `--font-mono` | `JetBrains Mono` (400–600) | Badges, labels, stats, metadata |

### 6.3 Font Sizes (Updated for Pink Theme)

```javascript
fontSize: {
  'display-xl': ['clamp(3.5rem, 10vw, 10rem)',  { lineHeight: '0.9',  letterSpacing: '-0.04em' }],
  'display-lg': ['clamp(3rem, 7vw, 7rem)',       { lineHeight: '0.95', letterSpacing: '-0.03em' }],
  'display':    ['clamp(2.5rem, 5vw, 5rem)',     { lineHeight: '1',    letterSpacing: '-0.02em' }],
  'display-sm': ['clamp(2rem, 3.5vw, 3.5rem)',   { lineHeight: '1.05', letterSpacing: '-0.02em' }],
  'heading-1':  ['clamp(2.5rem, 5vw, 5rem)',     { lineHeight: '1',    letterSpacing: '-0.02em' }],
  'heading-2':  ['clamp(2rem, 3.5vw, 3.5rem)',   { lineHeight: '1.1',  letterSpacing: '-0.02em' }],
  'heading-3':  ['clamp(1.25rem, 2vw, 2rem)',    { lineHeight: '1.2',  letterSpacing: '-0.01em' }],
  'heading-4':  ['clamp(1rem, 1.5vw, 1.5rem)',   { lineHeight: '1.3',  letterSpacing: '0' }],
  'body-lg':    ['clamp(1.125rem, 1.25vw, 1.5rem)', { lineHeight: '1.6' }],
  'body':       ['clamp(0.9375rem, 1vw, 1.125rem)', { lineHeight: '1.6' }],
  'body-sm':    ['0.875rem',  { lineHeight: '1.5' }],
  'small':      ['0.75rem',   { lineHeight: '1.4' }],
  'micro':      ['0.625rem',  { lineHeight: '1.3' }],
}
```

### 6.4 Responsive Breakpoints

```javascript
// tailwind.config.js — screens (default Tailwind, verify)
screens: {
  'xs':  '390px',   // Small mobile
  'sm':  '430px',   // Large mobile
  'md':  '768px',   // Tablet
  'lg':  '1024px',  // Desktop
  'xl':  '1280px',  // Large desktop
  '2xl': '1440px',  // Max content
}
```

### 6.5 Spacing

```javascript
spacing: {
  section: '6rem',       // Standard section padding (reduced from 8rem for pink lightness)
  'section-lg': '10rem', // Hero + CTA section padding
  'page-top': '8rem',    // Top padding for inner pages (below navbar)
}
```

### 6.6 Component Design Tokens (Pink Theme)

```css
/* Buttons */
.btn-primary:
  bg-pink-400 / text-white
  hover:bg-pink-500 / hover:shadow-lg / hover:shadow-pink-400/25
  active:bg-pink-600

.btn-secondary:
  border border-pink-400/50 / text-pink-500
  hover:bg-pink-50 / hover:border-pink-400

.btn-ghost:
  text-text-muted / hover:text-pink-500 / hover:bg-pink-50

/* Section Heading */
.badge:    font-mono / text-xs / tracking-[0.3em] / text-pink-400 / mb-4
.title:    font-serif / text-4xl-6xl / leading-tight / text-text-primary
.subtitle: text-lg-xl / text-text-muted / mt-6

/* Cards */
.card-default:    bg-white / border border-border-light / shadow-sm
.card-hover:      hover:border-pink-300 / hover:shadow-md / hover:shadow-pink-400/10
.card-elevated:   bg-white / shadow-lg / border-border-medium

/* Section Backgrounds */
.section-light:   bg-surface-white
.section-blush:   bg-surface-blush
.section-rose:    bg-surface-rose
```

### 6.7 CSS Global Updates (globals.css)

```css
/* Key changes from navy/gold to pink/white */
body {
  @apply bg-surface-white font-sans text-text-primary antialiased;
}

::selection {
  @apply bg-pink-200 text-pink-900;
}

*:focus-visible {
  @apply outline-none ring-2 ring-pink-400 ring-offset-2 ring-offset-white;
}

/* Pink accent class replacements */
.text-gradient-pink {
  @apply bg-gradient-to-r from-pink-400 via-pink-500 to-pink-400 bg-clip-text text-transparent;
}

.pink-glow {
  box-shadow: 0 0 30px rgba(212, 123, 140, 0.15),
              0 0 60px rgba(212, 123, 140, 0.05);
}

/* Remove: gold-underline, text-gradient-gold, gold-glow */
/* Replace with pink equivalents */
```

---

## 7. Social Link Configuration

### 7.1 Single Source of Truth (`src/config/social.ts`)

See Section 5.1 above for the complete configuration.

### 7.2 SocialLinks Component (`src/components/ui/SocialLinks.tsx`)

**Complete rewrite required:**
```typescript
'use client'

import { SOCIAL_LINKS } from '@/config/social'
import { cn } from '@/lib/utils'

interface SocialLinksProps {
  className?: string
  showLabels?: boolean    // If true, shows label next to icon
  size?: 'sm' | 'md' | 'lg'
  variant?: 'row' | 'grid'
}

export function SocialLinks({
  className,
  showLabels = false,
  size = 'md',
  variant = 'row',
}: SocialLinksProps) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  }

  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  }

  return (
    <div
      className={cn(
        variant === 'row' ? 'flex flex-wrap gap-3' : 'grid grid-cols-2 gap-3',
        className
      )}
    >
      {SOCIAL_LINKS.map((link) => {
        const Icon = link.icon
        return (
          <a
            key={link.platform}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'group inline-flex items-center gap-2 transition-all duration-300',
              'rounded-full border border-border-light',
              'text-text-muted hover:text-pink-500 hover:border-pink-300 hover:bg-pink-50',
              showLabels ? 'px-4 py-2' : sizeClasses[size]
            )}
            aria-label={link.ariaLabel}
          >
            <Icon className={cn(iconSizes[size], 'shrink-0')} />
            {showLabels && (
              <span className="text-sm font-medium">{link.label}</span>
            )}
          </a>
        )
      })}
    </div>
  )
}
```

### 7.3 What Changed

| Old (REMOVE) | New (ADD) |
|--------------|-----------|
| 4 hardcoded entries in SocialLinks.tsx | Import from `src/config/social.ts` |
| Clubhouse (@chandruhsr) | REMOVED entirely |
| Duplicate Instagram (@chandrudutta) | REMOVED entirely |
| Abbreviation icons (IG, IG2, CH, SP) | Full Lucide icons (Instagram, Music2, Linkedin, Mail) |
| No aria-labels | Descriptive aria-labels on every link |
| No visible labels | Optional `showLabels` prop |
| Spotify URL: `show/...-in-tamil` | Single source: `SPOTIFY_SHOW_URL` constant |

---

## 8. SEO Implementation Plan

### 8.1 Per-Page Metadata Helper

```typescript
// src/lib/metadata.ts
import type { Metadata } from 'next'
import { SITE } from '@/config/site'
import { DEFAULT_SEO } from '@/config/seo'

interface PageSEOProps {
  title: string
  description: string
  path: string
  ogType?: 'website' | 'profile' | 'article'
  keywords?: string[]
  publishedTime?: string
  images?: { url: string; width: number; height: number }[]
}

export function buildMetadata({
  title,
  description,
  path,
  ogType = 'website',
  keywords = [],
  publishedTime,
  images,
}: PageSEOProps): Metadata {
  const url = `${SITE.baseUrl}${path}`
  const fullTitle = `${title} | ${SITE.name}`

  return {
    title: fullTitle,
    description,
    keywords: keywords.join(', '),
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE.name,
      type: ogType,
      locale: 'en_IN',
      ...(publishedTime && { publishedTime }),
      images: images || [{ url: `${SITE.baseUrl}/images/og-default.jpg`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: images || [`${SITE.baseUrl}/images/og-default.jpg`],
    },
  }
}
```

### 8.2 Per-Page Metadata Usage

```typescript
// src/app/about/page.tsx
import { buildMetadata } from '@/lib/metadata'
import type { Metadata } from 'next'

export const metadata: Metadata = buildMetadata({
  title: 'About',
  description: 'Learn about Chandra Choodeshwaran M — a certified emotional intelligence coach, counsellor, and public speaking trainer based in Hosur, Tamil Nadu.',
  path: '/about',
  ogType: 'profile',
  keywords: ['counsellor in hosur', 'emotional intelligence coach', 'public speaking trainer tamil nadu'],
})
```

### 8.3 Schema Markup

Create a reusable JSON-LD component:

```typescript
// src/components/ui/JsonLd.tsx
export function PersonSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Chandra Choodeshwaran M',
    givenName: 'Chandra Choodeshwaran',
    familyName: 'M',
    jobTitle: 'Emotional Intelligence Trainer · Counsellor · Public Speaking Coach',
    description: 'Soft Skills Trainer, Emotional Intelligence Specialist, Counsellor, and Public Speaking Trainer based in Hosur, Tamil Nadu.',
    url: 'https://chandrachoodeshwaran.com',
    sameAs: [
      'https://instagram.com/chandra_choodeshwaran',
      'https://linkedin.com/in/chandrachoodeshwaran',
      'https://open.spotify.com/show/7jte6TL6cXPKVdqgO2jqqu',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Hosur',
      addressRegion: 'Tamil Nadu',
      addressCountry: 'IN',
    },
    knowsAbout: [
      'Emotional Intelligence',
      'Soft Skills Training',
      'Public Speaking',
      'Counselling',
      'Career Guidance',
      'Leadership Development',
      'Communication Skills',
    ],
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export function PodcastSeriesSchema() {
  // JSON-LD for PodcastSeries
}

export function BreadcrumbSchema({ items }: { items: { name: string; href: string }[] }) {
  // JSON-LD for BreadcrumbList
}
```

### 8.4 robots.txt & Sitemap

```typescript
// src/app/robots.ts
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/studio/'],
    },
    sitemap: 'https://chandrachoodeshwaran.com/sitemap.xml',
  }
}

// src/app/sitemap.ts
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://chandrachoodeshwaran.com'
  const pages = [
    { path: '', changeFreq: 'weekly', priority: 1.0 },
    { path: '/about', changeFreq: 'monthly', priority: 0.8 },
    { path: '/services', changeFreq: 'monthly', priority: 0.9 },
    { path: '/podcast', changeFreq: 'weekly', priority: 0.8 },
    { path: '/awards', changeFreq: 'monthly', priority: 0.6 },
    { path: '/experience', changeFreq: 'monthly', priority: 0.7 },
    { path: '/contact', changeFreq: 'monthly', priority: 0.7 },
  ] as const

  return pages.map(({ path, changeFreq, priority }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: changeFreq,
    priority,
  }))
}
```

### 8.5 Heading Hierarchy Rules

| Page | H1 | H2 Usage | H3 Usage |
|------|----|----------|----------|
| Home | "Understanding People Changes Everything" | Section titles (Philosophy, Pillars, etc.) | Card titles, framework names |
| About | "About Chandra Choodeshwaran M" | Bio sections, credentials categories | Credential item titles |
| Services | "Services & Offerings" | Service category titles | Service sub-items |
| Podcast | "Chandru's Psychology In Tamil" | Episode categories, featured | Episode titles |
| Awards | "Awards & Recognition" | Year categories | Award titles |
| Experience | "Professional Journey" | Career phases | Milestone titles |
| Contact | "Get In Touch" | Form sections | Contact method labels |
| 404 | "Page Not Found" | — | — |

### 8.6 Image Alt Text Strategy

- All images must have descriptive `alt` text
- Format: "Chandra Choodeshwaran M — [description of image content]"
- Example: "Chandra Choodeshwaran M — Emotional intelligence workshop session"
- Decorative images use `alt=""` (empty alt)
- Icons use `aria-hidden="true"` when decorative

### 8.7 Core Web Vitals Considerations

| Metric | Strategy |
|--------|----------|
| LCP | Hero section loads first; use `<Image>` with priority; preload hero background |
| FID/INP | Minimal JS on critical path; dynamic import for heavy components (GSAP) |
| CLS | Explicit dimensions on all images; font-display: swap; no layout shifts |
| TBT | Code splitting; lazy load below-fold sections; reduce third-party JS |

---

## 9. Homepage Section Blueprint

### 9.1 Section-by-Section Breakdown

The home page must feel like a **Wispr Flow / Linear / Raycast**-quality brand experience: clean, emotional, minimal, with a thought-leadership platform feel.

| Section | Component | Type | Purpose | Content Source |
|---------|-----------|------|---------|---------------|
| 1 | Hero | Full-screen | Emotional first impression, trust-building | `content/home.ts` |
| 2 | OpeningStatement | Full-screen (shortened) | Brand philosophy, positioning | `content/home.ts` |
| 3 | Philosophy | Interactive | The Human OS pentagon (interactive) | `content/philosophy.ts` |
| 4 | FivePillars | Scroll-through | Deep dive into each pillar | `content/pillars.ts` |
| 5 | Stats | Animated row | Social proof via numbers | `content/home.ts` |
| 6 | Frameworks | Scroll-through | Transformation frameworks | `content/frameworks.ts` |
| 7 | Podcast | Filterable grid | Social proof + content marketing | `content/podcast.ts` |
| 8 | Testimonials | Masonry quotes | Social proof from real clients | `content/testimonials.ts` |
| 9 | CTA | Full-screen | Conversion to contact | `content/home.ts` |

### 9.2 Hero Section (Critical)

```
┌─────────────────────────────────────────────────┐
│  [Badge: CHANDRACHOODESHWARAN M]                  │
│                                                   │
│  UNDERSTANDING                                    │
│  PEOPLE       ◄── Massive serif headline,         │
│  CHANGES         word-by-word reveal animation    │
│  EVERYTHING                                       │
│                                                   │
│  The quality of your life follows                │
│  the quality of your thinking.                   │
│                                                   │
│  [Book a Free Call]  [Explore Services]           │
│                                                   │
│  ✦ Times Edu Ex Award 2024                       │
│  ✦ Outstanding National Trainer — ISTD            │
│  ✦ 15+ Years of Impact                           │
│  ✦ 1000+ Lives Transformed                       │
│                                                   │
│              ┌──── scroll ────┐                    │
└─────────────────────────────────────────────────┘
```

**Hero Elements:**
1. **Background**: Pink gradient mesh (light, airy — `HeroBackground.tsx`) with mouse-reactive gradient
2. **Badge**: Name in small monospace, pink color
3. **Headline**: DM Serif Display, massive scale (clamp 2.8rem–9rem), GSAP word-reveal
4. **Subtitle**: Figtree, body-lg, warm muted text
5. **CTA Buttons**: Primary pink ("Book a Free Call" → /contact), Secondary outline ("Explore Services" → /services)
6. **Trust Row**: 4 trust indicators with icons, animated fade-in
7. **Scroll Indicator**: Gentle bounce arrow

### 9.3 What Makes It "Wispr Flow / Linear / Raycast" Quality

| Quality | Implementation |
|---------|---------------|
| **Emotional first impression** | Hero headline that resonates deeply; no stock photos; use of negative space |
| **Minimal UI** | Clean backgrounds, generous whitespace, no clutter |
| **Micro-interactions** | Hover effects on buttons, smooth scroll, word reveal, parallax depth |
| **Typography hierarchy** | Dramatic contrast between serif headlines and sans-serif body |
| **Color psychology** | Pink conveys warmth, empathy, approachability — perfect for a counsellor/trainer |
| **Performance** | Fast load, no layout shift, optimized images |
| **Trust signals** | Awards, stats, testimonials visible without scrolling |
| **Narrative flow** | Each section tells a chapter of the story: Who → What → Why → Proof → Call |

---

## 10. Navbar Architecture

### 10.1 Navigation Configuration

```typescript
// src/config/navigation.ts
export interface NavItem {
  label: string
  href: string
  isActive: (pathname: string) => boolean
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Home',
    href: '/',
    isActive: (pathname) => pathname === '/',
  },
  {
    label: 'About',
    href: '/about',
    isActive: (pathname) => pathname.startsWith('/about'),
  },
  {
    label: 'Services',
    href: '/services',
    isActive: (pathname) => pathname.startsWith('/services'),
  },
  {
    label: 'Podcast',
    href: '/podcast',
    isActive: (pathname) => pathname.startsWith('/podcast'),
  },
  {
    label: 'Awards',
    href: '/awards',
    isActive: (pathname) => pathname.startsWith('/awards'),
  },
  {
    label: 'Experience',
    href: '/experience',
    isActive: (pathname) => pathname.startsWith('/experience'),
  },
  {
    label: 'Contact',
    href: '/contact',
    isActive: (pathname) => pathname.startsWith('/contact'),
  },
]
```

### 10.2 Navbar Behavior

```typescript
// src/components/layout/Navbar.tsx (simplified architecture)
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { NAV_ITEMS } from '@/config/navigation'
import { SITE } from '@/config/site'
import { useState, useCallback, useEffect } from 'react'
import { useScrollDirection } from '@/hooks/useScrollDirection'
import MobileNav from './MobileNav'
import { Button } from '@/components/ui/Button'

export default function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const direction = useScrollDirection()
  const [isScrolled, setIsScrolled] = useState(false)

  // Track scroll position for background
  useEffect(() => {
    const handle = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handle, { passive: true })
    return () => window.removeEventListener('scroll', handle)
  }, [])

  // Close mobile nav on route change
  useEffect(() => { setMobileOpen(false) }, [pathname])

  // Prevent body scroll when mobile nav open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <motion.header
        className={cn(
          'fixed left-0 right-0 top-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-white/90 shadow-sm shadow-pink-400/5 backdrop-blur-xl'
            : 'bg-transparent'
        )}
        animate={{ y: direction === 'down' && isScrolled ? -100 : 0 }}
      >
        <nav className="mx-auto flex h-20 max-w-[1200px] items-center justify-between px-6 md:px-8 lg:px-12">
          {/* Logo */}
          <Link
            href="/"
            className="group font-serif text-xl tracking-wide text-text-primary transition-colors duration-300 hover:text-pink-500"
          >
            <span className="text-pink-500">C</span>handra
            <span className="text-pink-400">choo</span>deshwaran
          </Link>

          {/* Desktop nav links */}
          <div className="hidden items-center gap-8 md:flex">
            {NAV_ITEMS.map((item) => {
              const active = item.isActive(pathname)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'group relative py-2 text-sm uppercase tracking-[0.15em] transition-colors duration-300',
                    active ? 'text-pink-500' : 'text-text-muted hover:text-pink-400'
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      'absolute bottom-0 left-0 h-px transition-all duration-300',
                      active ? 'w-full bg-pink-500' : 'w-0 bg-pink-400 group-hover:w-full'
                    )}
                  />
                </Link>
              )
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link href="/contact">
              <Button variant="primary" size="sm">
                Book a Session
              </Button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <motion.span
              className="h-px w-6 bg-text-primary"
              animate={mobileOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
            />
            <motion.span
              className="h-px w-6 bg-text-primary"
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            />
            <motion.span
              className="h-px w-6 bg-text-primary"
              animate={mobileOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
            />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && <MobileNav onClose={() => setMobileOpen(false)} />}
      </AnimatePresence>
    </>
  )
}
```

### 10.3 Mobile Nav Behavior

- Full-screen overlay with clip-path circle animation
- Navigation links vertically centered with stagger animation
- Close button in top-right
- CTA button at bottom
- Background: white with pink accent
- Text: dark, with pink active state
- Closes automatically on route change

---

## 11. Footer Architecture

### 11.1 Footer Layout

```
┌─────────────────────────────────────────────────────┐
│  Logo (Chandra Choodeshwaran M)                      │
│  Helping people communicate, lead, and grow through  │
│  emotional intelligence.                             │
│  Based in Hosur, Tamil Nadu                           │
│                                                       │
│  ┌──────────┬──────────────┬──────────────┐          │
│  │ QUICK    │ SERVICES     │ CONNECT      │          │
│  │ LINKS    │              │              │          │
│  │          │              │ [Instagram]  │          │
│  │ Home     │ Self-Aware.  │ [Spotify]    │          │
│  │ About    │ Emotional    │ [LinkedIn]   │          │
│  │ Services │ Intelligence │ [Email]      │          │
│  │ Podcast  │ Communication│              │          │
│  │ Awards   │ Leadership   │              │          │
│  │ Exper.   │ Growth       │              │          │
│  │ Contact  │              │              │          │
│  └──────────┴──────────────┴──────────────┘          │
│                                                       │
│  ─────────────────────────────────────────────────    │
│  © 2026 Chandra Choodeshwaran M. All rights reserved. │
└─────────────────────────────────────────────────────┘
```

### 12.2 Footer Component Architecture

```typescript
// src/components/layout/Footer.tsx
import Link from 'next/link'
import { SITE } from '@/config/site'
import { NAV_ITEMS } from '@/config/navigation'
import { SocialLinks } from '@/components/ui/SocialLinks'
import { FIVE_PILLARS } from '@/content/pillars'
import BackToTop from './BackToTop'

const SERVICE_LINKS = FIVE_PILLARS.map(p => ({
  label: p.title,
  href: `/services/${p.id}`,
}))

export default function Footer() {
  return (
    <footer className="relative bg-surface-dark text-white">
      <div className="mx-auto max-w-[1200px] px-6 py-section md:px-8 lg:px-12">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-serif text-2xl text-white">
              <span className="text-pink-400">C</span>handra
              <span className="text-pink-300">choo</span>deshwaran
            </h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/60">
              {SITE.positioning}
            </p>
            <p className="mt-4 text-sm text-white/40">
              Based in {SITE.location}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-white/40">
              Quick Links
            </p>
            <ul className="space-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/60 transition-colors duration-300 hover:text-pink-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-white/40">
              Services
            </p>
            <ul className="space-y-2">
              {SERVICE_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/60 transition-colors duration-300 hover:text-pink-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-white/40">
              Connect
            </p>
            <SocialLinks showLabels variant="grid" />
            <div className="mt-6 space-y-1">
              <p className="text-sm text-white/40">{SITE.email}</p>
              <p className="text-sm text-white/40">{SITE.location}</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-white/40">
              &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
            </p>
            <p className="text-sm text-white/40">
              Built with purpose in Tamil Nadu, India.
            </p>
          </div>
        </div>
      </div>
      <BackToTop />
    </footer>
  )
}
```

---

## 12. Content Audit & Cleanup

### 12.1 Items to REMOVE

| File/Path | Item | Reason |
|-----------|------|--------|
| `src/components/ui/SocialLinks.tsx` | Clubhouse entry (`CH`) | Platform not relevant, abbreviation |
| `src/components/ui/SocialLinks.tsx` | Instagram duplicate (`IG2`) | Duplicate account, cryptic name |
| `src/components/ui/SocialLinks.tsx` | Spotify abbreviation icon (`SP`) | Must use recognizable icon |
| `src/components/ui/SocialLinks.tsx` | All hardcoded entries | Move to centralized `src/config/social.ts` |
| `src/lib/constants.ts` | `CONTACT_FALLBACK.clubhouse` | Remove Clubhouse |
| `src/lib/constants.ts` | `CONTACT_FALLBACK.instagram` array | Use single Instagram from config |
| `src/lib/constants.ts` | `HERO_FALLBACK` | Deprecated — content moved to `content/home.ts` |
| `src/lib/constants.ts` | `PILLARS` (legacy) | Duplicate of `FIVE_PILLARS` |
| `src/lib/constants.ts` | `IMPACT_AREAS` | Unused section |
| `src/lib/constants.ts` | `TIMELINE_FALLBACK` | Deprecated |
| `src/lib/constants.ts` | `PODCAST_FALLBACK` | Deprecated |
| `src/lib/constants.ts` | `TESTIMONIALS_FALLBACK` | Deprecated |
| `src/components/sections/Struggle/` | Entire empty directory | Remove |
| `src/components/sections/Impact/` | Entire directory | Unused, deprecated |
| `src/components/sections/Timeline/` | Entire directory | Unused (RecognitionJourney used instead) |
| `src/components/sections/Podcast/` | Entire directory (old) | Unused (PodcastUniverse used instead) |
| `src/components/sections/Testimonials/` | Entire directory (old) | Unused (VoicesOfChange used instead) |
| `app/` (root) | Entire directory | Legacy Flask |
| `instance/` | Entire directory | Legacy Flask data |
| `run.py` | File | Legacy Flask |
| `requirements.txt` | File | Legacy Flask |
| `src/components/sections/Hero/` | Old Hero directory | Move to new Hero under sections |

### 12.2 Items to UPDATE

| File/Path | Update |
|-----------|--------|
| `tailwind.config.js` | Replace navy/gold with pink/white color system |
| `src/app/globals.css` | Replace gold-themed CSS classes with pink equivalents |
| `src/app/layout.tsx` | Update metadata, theme color to pink |
| `src/components/layout/Navbar.tsx` | Multi-page Link-based nav, pink theme |
| `src/components/layout/MobileNav.tsx` | Multi-page nav, pink theme |
| `src/components/layout/Footer.tsx` | New social links, services links, pink theme |
| `src/components/ui/Button.tsx` | Pink color variants |
| `src/components/ui/SectionHeading.tsx` | Pink accent defaults |
| `src/components/ui/SocialLinks.tsx` | Complete rewrite (see Section 7.2) |
| `src/app/providers.tsx` | Simplify (remove NavContext, or keep) |
| `src/lib/constants.ts` | Clean up deprecated entries (keep for backward compat during migration) |
| `src/components/sections/OpeningStatement/OpeningStatement.tsx` | Pink theme, shorten for home page |

### 12.3 Items to CREATE

| Path | Purpose |
|------|---------|
| `src/config/site.ts` | Site-wide config |
| `src/config/navigation.ts` | Nav items |
| `src/config/seo.ts` | Default SEO |
| `src/config/social.ts` | Social links (single source of truth) |
| `src/content/home.ts` | Home page content |
| `src/content/about.ts` | About page content |
| `src/content/services.ts` | Services page content |
| `src/content/podcast.ts` | Podcast page content |
| `src/content/awards.ts` | Awards page content |
| `src/content/experience.ts` | Experience page content |
| `src/content/contact.ts` | Contact page content |
| `src/content/testimonials.ts` | Testimonial data |
| `src/content/pillars.ts` | Pillar data (shared) |
| `src/content/frameworks.ts` | Framework data |
| `src/lib/metadata.ts` | SEO metadata builder |
| `src/components/ui/Card.tsx` | Reusable card |
| `src/components/ui/Badge.tsx` | Pill badge |
| `src/components/ui/JsonLd.tsx` | Schema markup components |
| `src/components/layout/PageLayout.tsx` | Consistent page wrapper |
| `src/components/sections/Hero/HeroBackground.tsx` | Pink gradient mesh |
| `src/components/sections/Stats/Stats.tsx` | Impact stats counter |
| `src/components/pages/About/BioSection.tsx` | About bio |
| `src/components/pages/About/CredentialsGrid.tsx` | Credentials |
| `src/components/pages/Services/ServiceGrid.tsx` | Service cards |
| `src/components/pages/Contact/ContactForm.tsx` | Contact form |
| `src/hooks/useActivePath.ts` | Route-based active detection |
| `src/hooks/useScrollToTop.ts` | Scroll to top on route change |
| `src/app/sitemap.ts` | Dynamic sitemap |
| `src/app/robots.ts` | Robots.txt |
| All page directories | `about/`, `services/`, `podcast/`, `awards/`, `experience/`, `contact/` |

### 12.4 Items to PRESERVE (with updates)

| Path | Notes |
|------|-------|
| `src/components/sections/OpeningStatement/` | Keep, refactor for home page, update theme |
| `src/components/sections/HumanOS/` | Keep, rename to Philosophy, update theme |
| `src/components/sections/FivePillars/` | Keep, update theme |
| `src/components/sections/Frameworks/` | Keep, update theme |
| `src/components/sections/RecognitionJourney/` | Keep for home page, update theme |
| `src/components/sections/PodcastUniverse/` | Keep for home section, update theme |
| `src/components/sections/VoicesOfChange/` | Keep, rename to Testimonials, update theme |
| `src/components/sections/BookConversation/` | Keep, update theme |
| `src/hooks/useMediaQuery.ts` | Keep |
| `src/hooks/useScrollDirection.ts` | Keep |
| `src/hooks/useScrollProgress.ts` | Keep |
| `src/lib/animations.ts` | Keep, update color references |
| `src/lib/utils.ts` | Keep |
| `src/lib/fonts.ts` | Keep |
| `src/types/index.ts` | Keep, extend |
| `src/sanity/` | Keep |
| `src/app/api/contact/route.ts` | Keep |
| `src/app/not-found.tsx` | Keep, update theme |
| `src/app/loading.tsx` | Keep, update theme |
| `src/app/error.tsx` | Keep, update theme |

### 12.5 IN2 and CH References to Remove

1. **`src/components/ui/SocialLinks.tsx`** — Line 4: `{ label: 'Instagram', href: '...', icon: 'IG2' }` (IN2)
2. **`src/components/ui/SocialLinks.tsx`** — Line 5: `{ label: 'Clubhouse', href: '...', icon: 'CH' }` (CH)
3. **`src/components/ui/SocialLinks.tsx`** — Lines 3-6: Entire SOCIALS array
4. **`src/lib/constants.ts`** — Line 439: `clubhouse: '@chandruhsr'`
5. **`src/lib/constants.ts`** — Line 438: `instagram: ['@chandra_choodeshwaran', '@chandrudutta']` (second entry IN2)
6. **`src/components/layout/Footer.tsx`** — Lines 53-55: Clubhouse display
7. **`src/components/layout/Footer.tsx`** — Lines 50-52: Instagram display using CONTACT_FALLBACK

---

## 13. Migration Checklist (Step-by-Step)

### Phase 1: Foundation & Configuration

- [ ] **1. Create config layer**
  - Create `src/config/site.ts`
  - Create `src/config/navigation.ts`
  - Create `src/config/seo.ts`
  - Create `src/config/social.ts` (single source of truth for social links)
  - Remove Clubhouse and duplicate Instagram from all references

- [ ] **2. Create content layer**
  - Create `src/content/home.ts`
  - Create `src/content/about.ts`
  - Create `src/content/services.ts`
  - Create `src/content/podcast.ts`
  - Create `src/content/awards.ts`
  - Create `src/content/experience.ts`
  - Create `src/content/contact.ts`
  - Create `src/content/testimonials.ts`
  - Create `src/content/pillars.ts`
  - Create `src/content/frameworks.ts`

- [ ] **3. Update Tailwind config**
  - Replace navy/gold with pink/white color system
  - Update spacing, shadows, animations for pink theme

- [ ] **4. Update globals.css**
  - Replace all gold/navy utilities with pink/white equivalents
  - Update selection colors, focus rings
  - Remove gold-specific classes, add pink-specific classes

### Phase 2: Layout Components

- [ ] **5. Rewrite SocialLinks component**
  - Import from centralized social.ts
  - Use Lucide icons (Instagram, Music2, Linkedin, Mail)
  - Add showLabels, size, variant props
  - Add proper aria-labels

- [ ] **6. Rewrite Navbar**
  - Replace hash-based scrolling with Next.js `<Link>` components
  - Use `usePathname()` for active state detection
  - Update colors to pink/white theme
  - Update logo text styling
  - Update mobile hamburger colors

- [ ] **7. Rewrite MobileNav**
  - Replace section navigation with page links
  - Update colors to pink/white
  - Use Link components

- [ ] **8. Rewrite Footer**
  - Remove Clubhouse and duplicate Instagram references
  - Use SocialLinks component with showLabels
  - Add services quick links
  - Update colors to dark pink footer
  - Use centralized site config

- [ ] **9. Create PageLayout component**
  - Consistent top padding (page-top)
  - Consistent container width
  - Background color handling

- [ ] **10. Update Button component**
  - Pink primary variant (bg-pink-400)
  - Rose secondary variant
  - Update hover/active states

- [ ] **11. Update SectionHeading component**
  - Default badge color to pink-400
  - Update decorative divider to pink gradient

### Phase 3: Shared UI Components

- [ ] **12. Create Card component**
  - White background, pink border
  - Hover states with pink shadow
  - Variants: default, elevated, interactive

- [ ] **13. Create Badge component**
  - Pink pill badge for tags
  - Small rounded pill style

- [ ] **14. Create JsonLd component**
  - Person schema
  - PodcastSeries schema
  - Breadcrumb schema

- [ ] **15. Create SEO metadata helper**
  - `src/lib/metadata.ts`
  - Build function for per-page metadata

### Phase 4: Page Routes

- [ ] **16. Create Home page (`src/app/page.tsx`)**
  - New Hero component (pink gradient mesh)
  - Repurpose OpeningStatement (shortened)
  - Repurpose HumanOS → Philosophy (pink theme)
  - Repurpose FivePillars (pink theme)
  - New Stats section
  - Repurpose Frameworks (pink theme)
  - Repurpose PodcastUniverse (pink theme, centralized spotify URL)
  - Repurpose VoicesOfChange → Testimonials (pink theme)
  - Repurpose BookConversation → CTA (pink theme, Link to /contact)

- [ ] **17. Create About page**
  - BioSection component
  - CredentialsGrid component
  - PhilosophyStatement
  - SEO metadata

- [ ] **18. Create Services listing page**
  - ServiceGrid with ServiceCard components
  - SEO metadata

- [ ] **19. Create Service detail page (`/services/[slug]`)**
  - Dynamic route for each pillar/service
  - ServiceDetail component
  - Related CTA

- [ ] **20. Create Podcast page**
  - EpisodeGrid with EpisodeCard components
  - ThemeFilter for filtering
  - SpotifyEmbed with centralized URL
  - SEO metadata

- [ ] **21. Create Podcast episode detail (`/podcast/[slug]`)**
  - Dynamic route
  - EpisodeDetail component
  - SEO metadata with podcast episode schema

- [ ] **22. Create Awards page**
  - AwardTimeline with AwardCard components
  - SEO metadata

- [ ] **23. Create Experience page**
  - Timeline with TimelineItem components
  - SEO metadata

- [ ] **24. Create Contact page**
  - ContactForm with Zod validation
  - ContactInfo with centralized social links
  - Map embed (optional)
  - SEO metadata

### Phase 5: SEO & Infrastructure

- [ ] **25. Create sitemap.ts**
  - Dynamic sitemap with all pages
  - Priorities and change frequencies

- [ ] **26. Create robots.ts**
  - Allow all, disallow /api/ and /studio/

- [ ] **27. Update root layout metadata**
  - Use centralized SEO config
  - Add theme-color as pink
  - Add JSON-LD schemas

- [ ] **28. Add canonical URLs** to all pages

- [ ] **29. Add heading hierarchy** check for every page

### Phase 6: Cleanup

- [ ] **30. Remove legacy Flask files**
  - `app/` directory
  - `instance/` directory
  - `run.py`
  - `requirements.txt`

- [ ] **31. Remove unused components**
  - `src/components/sections/Struggle/`
  - `src/components/sections/Impact/`
  - `src/components/sections/Timeline/`
  - `src/components/sections/Podcast/` (old)
  - `src/components/sections/Testimonials/` (old)
  - `src/components/sections/Hero/` (old — contents repurposed)

- [ ] **32. Clean up `src/lib/constants.ts`**
  - Remove deprecated fallback data
  - Keep only what's needed for backward compat
  - Eventually remove file entirely

- [ ] **33. Update `next.config.ts`**
  - Update basePath if needed
  - Update images config
  - Remove `trailingSlash` if not needed

### Phase 7: Polish & QA

- [ ] **34. Update loading.tsx** with pink theme spinner/skeleton
- [ ] **35. Update error.tsx** with pink theme error page
- [ ] **36. Update not-found.tsx** with pink theme 404
- [ ] **37. Create useActivePath hook**
- [ ] **38. Create useScrollToTop hook** (scroll to top on route change)
- [ ] **39. Responsive QA**
  - 390px (iPhone SE)
  - 430px (iPhone 14)
  - 768px (iPad)
  - 1024px (desktop)
  - 1440px+ (large desktop)

- [ ] **40. Accessibility pass**
  - Skip-to-content link
  - Focus visible styles
  - ARIA labels on all interactive elements
  - Reduced motion support
  - Color contrast check (pink-400 on white: needs verification)

- [ ] **41. Performance audit**
  - Lighthouse target: 90+
  - Core Web Vitals check
  - Image optimization

- [ ] **42. Build & deploy test**
  - Run `next build`
  - Verify static export (if still using)
  - Deploy to staging/preview

---

## 14. Risks & Mitigations

| Risk | Impact | Probability | Mitigation |
|------|--------|------------|------------|
| **Color contrast issues** — Pink on white may fail WCAG AA for text | Medium | High | Use `text-text-primary` (#1A1A1A) for body text; reserve pink for accents, buttons, headings only. Verify contrast ratios. |
| **Breaking existing Sanity integration** — Content model changes | High | Medium | Keep Sanity schemas unchanged; content layer (`src/content/`) is fallback, not replacement. Add Sanity data as an enhancement layer later. |
| **Lost SEO rankings during migration** — URLs change from hash-based to routes | High | High | Initially unchanged — the home page still has all sections. New routes are additive. Add redirects from old hash URLs if needed. |
| **Static export limitations** — `output: 'export'` restricts dynamic routes | Medium | Medium | Service detail and podcast detail routes need `generateStaticParams()`. If too limiting, switch to SSR/ISR mode. |
| **MobileNav flash on route change** — Layout shift when nav closes | Low | Medium | Use `useEffect` to track route changes; animate close before navigation. |
| **Spotify embed performance** — Third-party iframe impacts LCP | Medium | Medium | Lazy-load Spotify embed with `loading="lazy"`; defer below fold on home page. |
| **Legacy file conflicts** — Old Flask files still in repo | Low | High | Remove Flask files in Phase 6 — no runtime impact since they're not imported. |
| **Framer Motion + GSAP conflicts** — Both libraries for animations | Medium | Low | Clear separation: Framer Motion for entry/interaction animations, GSAP for scroll-driven. Document which tool for which animation. |
| **IN2/CH references missed** — Social links still visible somewhere | Medium | Medium | Comprehensive grep for "clubhouse", "chandrudutta", "IN2", "CH", "IG2" after migration. |

---

## Appendix A: Key Files to Modify (Summary)

| File | Action | Complexity |
|------|--------|------------|
| `tailwind.config.js` | UPDATE (colors, spacing) | Medium |
| `src/app/globals.css` | UPDATE (pink theme) | Medium |
| `src/app/layout.tsx` | UPDATE (metadata, theme color) | Low |
| `src/app/page.tsx` | REWRITE (new home composition) | High |
| `src/components/layout/Navbar.tsx` | REWRITE (multi-page, pink) | High |
| `src/components/layout/MobileNav.tsx` | REWRITE (multi-page, pink) | Medium |
| `src/components/layout/Footer.tsx` | REWRITE (new social, services links) | Medium |
| `src/components/ui/SocialLinks.tsx` | REWRITE (centralized, icons) | Medium |
| `src/components/ui/Button.tsx` | UPDATE (pink variants) | Low |
| `src/components/ui/SectionHeading.tsx` | UPDATE (pink accents) | Low |
| `src/lib/constants.ts` | CLEAN UP (remove deprecated) | Medium |
| `src/app/sitemap.ts` | CREATE | Low |
| `src/app/robots.ts` | CREATE | Low |
| `src/config/` (4 files) | CREATE | Low |
| `src/content/` (10 files) | CREATE | Low |
| `src/lib/metadata.ts` | CREATE | Low |
| `src/components/ui/Card.tsx` | CREATE | Low |
| `src/components/ui/Badge.tsx` | CREATE | Low |
| `src/components/ui/JsonLd.tsx` | CREATE | Medium |
| `src/components/layout/PageLayout.tsx` | CREATE | Low |
| `src/components/sections/Hero/HeroBackground.tsx` | CREATE | Medium |
| `src/components/sections/Stats/Stats.tsx` | CREATE | Medium |
| `src/app/about/page.tsx` | CREATE | Medium |
| `src/app/services/page.tsx` | CREATE | Medium |
| `src/app/services/[slug]/page.tsx` | CREATE | Medium |
| `src/app/podcast/page.tsx` | CREATE | Medium |
| `src/app/podcast/[slug]/page.tsx` | CREATE | Medium |
| `src/app/awards/page.tsx` | CREATE | Medium |
| `src/app/experience/page.tsx` | CREATE | Medium |
| `src/app/contact/page.tsx` | CREATE | Medium |
| `src/app/page.tsx` | REWRITE | High |
| `app/` (legacy Flask) | DELETE | Low |
| `instance/` | DELETE | Low |
| `run.py` | DELETE | Low |
| `requirements.txt` | DELETE | Low |
| `src/components/sections/Struggle/` | DELETE | Low |
| `src/components/sections/Impact/` | DELETE | Low |
| `src/components/sections/Timeline/` | DELETE | Low |
| `src/components/sections/Podcast/` (old) | DELETE | Low |
| `src/components/sections/Testimonials/` (old) | DELETE | Low |

---

## Appendix B: New Files Tree (Growth)

```
src/
├── config/
│   ├── site.ts
│   ├── navigation.ts
│   ├── seo.ts
│   └── social.ts
├── content/
│   ├── home.ts
│   ├── about.ts
│   ├── services.ts
│   ├── podcast.ts
│   ├── awards.ts
│   ├── experience.ts
│   ├── contact.ts
│   ├── testimonials.ts
│   ├── pillars.ts
│   └── frameworks.ts
├── components/
│   ├── ui/
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   └── JsonLd.tsx
│   ├── sections/
│   │   ├── Hero/
│   │   │   └── HeroBackground.tsx
│   │   └── Stats/
│   │       └── Stats.tsx
│   ├── pages/
│   │   ├── About/
│   │   │   ├── BioSection.tsx
│   │   │   ├── CredentialsGrid.tsx
│   │   │   └── PhilosophyStatement.tsx
│   │   ├── Services/
│   │   │   ├── ServiceGrid.tsx
│   │   │   ├── ServiceCard.tsx
│   │   │   └── ServiceDetail.tsx
│   │   ├── Podcast/
│   │   │   ├── EpisodeGrid.tsx
│   │   │   ├── EpisodeDetail.tsx
│   │   │   └── SpotifyEmbed.tsx
│   │   ├── Awards/
│   │   │   ├── AwardTimeline.tsx
│   │   │   └── AwardCard.tsx
│   │   ├── Experience/
│   │   │   ├── Timeline.tsx
│   │   │   └── TimelineItem.tsx
│   │   └── Contact/
│   │       ├── ContactForm.tsx
│   │       └── ContactInfo.tsx
│   └── layout/
│       └── PageLayout.tsx
├── hooks/
│   ├── useActivePath.ts
│   └── useScrollToTop.ts
├── lib/
│   └── metadata.ts
├── app/
│   ├── about/
│   │   └── page.tsx
│   ├── services/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── podcast/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── awards/
│   │   └── page.tsx
│   ├── experience/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── sitemap.ts
│   └── robots.ts
```

---

> **End of Architecture Plan V2**
> 
> This plan replaces the current single-page navy/gold site with a premium multi-page pink/white brand experience. Every specification above is designed to be handed directly to a development team for implementation.
