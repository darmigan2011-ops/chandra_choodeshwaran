# MASTER AUDIT REPORT — Chandra Choodeshwaran M Website

**Date:** 2026-06-24
**Mode:** Read-only — no files modified
**Build Status:** `npm run build` — PASSED (27 static pages)

---

## EXECUTIVE SUMMARY

The website has solid engineering foundations (Next.js 15, TypeScript, Tailwind) and good design intentions. However, the codebase is in a **partially migrated state** — content is split between legacy `constants.ts` and newer `src/content/*`, creating data duplication. Critical issues include a **missing `public/` directory** (no OG images, no favicon), **dead API route** (static export prevents form submission), and **doubled metadata titles** (every page shows `"Title | Name | Name"`). The homepage Hero does not explicitly state the practitioner's roles. On-page SEO scores low (45/100) due to these issues.

**Overall verdict: DO NOT SHIP** — 5 critical and 15+ high-severity issues must be resolved first.

---

## CONSOLIDATED SCORES

| Category | Score | Source | Gate |
|----------|-------|--------|------|
| **Repository Health** | **62/100** | Finder Audit | ≥80 |
| **Homepage Experience** | **68/100** | UX + Content + Architecture | ≥90 |
| **Mobile UX** | **72/100** | UX Audit | ≥90 |
| **Navigation** | **80/100** | UX Audit | ≥85 |
| **Architecture** | **65/100** | Architect Audit | ≥85 |
| **Homepage Quality** | **60/100** | Architect + Content Audit | ≥90 |
| **Scalability** | **70/100** | Architect Audit | ≥80 |
| **Performance** | **72/100** | Debugger Audit | ≥90 |
| **Accessibility** | **78/100** | Debugger Audit | ≥90 |
| **Security** | **75/100** | Debugger Audit | ≥90 |
| **Maintainability** | **70/100** | Code Quality Audit | ≥85 |
| **Code Quality** | **76/100** | Code Quality Audit | ≥85 |
| **Trust (Content)** | **82/100** | Content Audit | ≥85 |
| **Readability (Content)** | **88/100** | Content Audit | ≥85 |
| **Authority (Content)** | **80/100** | Content Audit | ≥85 |
| **Technical SEO** | **55/100** | SEO Audit | ≥90 |
| **On-Page SEO** | **45/100** | SEO Audit | ≥90 |
| **Local SEO** | **70/100** | SEO Audit | ≥85 |
| **Production Readiness** | **58/100** | Composite | ≥90 |

---

## CRITICAL ISSUES (5) — Blocking Release

| ID | Severity | File | Issue | Fix |
|----|----------|------|-------|-----|
| C1 | Critical | `.gitignore` + missing `public/` | `public/` directory is gitignored and doesn't exist. OG images, favicon, all static assets are 404. | Remove `public/` from `.gitignore`. Create `public/images/og-default.jpg`, `favicon.ico`, etc. |
| C2 | Critical | `src/lib/metadata.ts` + `src/app/layout.tsx` | Metadata title doubled — `buildMetadata()` returns `"About | Name"` and layout template appends `"| Name"` again → `"About | Name | Name"`. | Return just `title` (not `fullTitle`) from `buildMetadata()`. |
| C3 | Critical | `src/app/api/contact/route.ts` + `next.config.ts` | API route is dead. `output: 'export'` silently excludes `app/api/*` at build time. Contact form cannot submit. | Replace with serverless form handler (Formspree, Web3Forms) or deploy on a serverful platform. |
| C4 | Critical | `src/lib/constants.ts` vs `src/content/*` | **Duplicate content sources.** `constants.ts` has live data that IS imported by components; `content/*` has newer data that is NOT imported. `FIVE_PILLARS`, `PODCAST_DATA`, `VOICES`, `FRAMEWORKS`, etc. exist in both. | Finish migration: update all component imports to use `@/content/*`, then remove duplicated data from `constants.ts`. |
| C5 | Critical | `src/components/sections/Hero/Hero.tsx` | Hero does NOT state the practitioner's roles. Visitors see a name badge and philosophical headline but no "Trainer, Counsellor, EI Specialist." | Add `SITE.tagline` below the badge in Hero.tsx. |

---

## HIGH ISSUES (18) — Must Fix Before Ship

| ID | Severity | File | Issue | Fix |
|----|----------|------|-------|-----|
| H1 | High | `postcss.config.mjs` | Duplicate PostCSS config conflicts with `postcss.config.js`. `.mjs` references uninstalled `@tailwindcss/postcss`. | Delete `postcss.config.mjs`. |
| H2 | High | `src/content/about.ts`, `frameworks.ts`, `services.ts`, `testimonials.ts` | 4 content files exist but are NEVER imported by any component. Dead code. | Either (a) delete them or (b) complete migration by wiring components to them. |
| H3 | High | `src/components/sections/Hero/Hero.tsx` + `OpeningStatement.tsx` | Two `<h1>` elements on the same page — Hero and OpeningStatement both use `<h1>`. | Change OpeningStatement headline to `<h2>`. |
| H4 | High | `src/components/pages/Contact/ContactForm.tsx` | Form uses `mailto:` via `window.open()` instead of POST. No data collected. Mobile users without email client are stranded. | Replace with Formspree, Web3Forms, or wire to API route (requires non-static deployment). |
| H5 | High | `package.json` | 3 unused dependencies: `class-variance-authority`, `@portabletext/react`, `styled-components` add bundle bloat. | `npm uninstall` all three. |
| H6 | High | `src/hooks/useActivePath.ts`, `useActiveSection.ts`, `useMediaQuery.ts`, `useScrollProgress.ts`, `useScrollToTop.ts` | 5 of 6 hooks are never imported anywhere. Dead code. | Delete all unused hooks. Keep only `useScrollDirection.ts`. |
| H7 | High | `src/components/sections/CTA/CTA.tsx` | Orphaned component — never imported. Has broken `scrollToContact` referencing non-existent `#contact`. | Delete file. |
| H8 | High | `src/components/sections/FivePillars/PillarGrid.tsx` | Orphaned sub-component — never imported. FivePillars.tsx renders inline instead. | Delete file. |
| H9 | High | `src/components/ui/RevealText.tsx` | Orphaned UI component — never imported anywhere. | Either integrate or delete. |
| H10 | High | `src/types/index.ts` vs `src/config/navigation.ts` | Conflicting `NavItem` type definitions — different shapes, same name. Importing wrong one causes type errors. | Remove one definition. Import from a single source. |
| H11 | High | `.env` | Legacy Flask config with `SECRET_KEY`, `DATABASE_URL`, `FLASK_ENV` — security risk if committed. | Delete `.env`. |
| H12 | High | `src/app/layout.tsx` | Missing favicon/apple-touch-icon/icons in metadata. No `theme-color` meta tag set to brand pink. | Add `icons` metadata block with proper favicon paths. |
| H13 | High | `src/components/sections/Frameworks/FrameworkStep.tsx` | 418-line monolith violating SRP. Defines own types duplicating those in `@/types`. | Split into 3 components (`Ladder`, `Loop`, `Matrix`). Extract GSAP logic into hook. |
| H14 | High | `src/content/home.ts` | JCI Senator 2022 not in Hero trust indicators (only 3 of 4 major awards shown). | Add `'Outstanding JCI Senator 2022'` to trustItems. |
| H15 | High | `src/content/home.ts` line 7 + `constants.ts` line 21 | Opening Statement duplicates Hero headline verbatim. First scroll wastes user's attention. | Change Opening Statement headline to a complementary message. |
| H16 | High | `src/app/experience/page.tsx` + `src/app/awards/page.tsx` | Experience and Awards pages show identical content (same 4 milestones). Confusing and redundant. | Populate Experience with actual work history; keep Awards for recognition only. Or merge if no separate content exists. |
| H17 | High | `next.config.ts` | `basePath: '/chandra_choodeshwaran'` will break if deployed to a custom domain or at root. | Verify deployment target. Remove `basePath` for custom domain. |
| H18 | High | `src/app/sitemap.ts` | Sitemap only lists top-level pages. Dynamic routes (`/services/[slug]`, `/podcast/[slug]`) are missing. | Add detail page URLs to sitemap dynamically. |

---

## MEDIUM ISSUES (12)

| ID | Severity | File | Issue | Fix |
|----|----------|------|-------|-----|
| M1 | Medium | `src/sanity/image.ts` vs `client.ts` | Duplicate `urlFor` function in two files. `image.ts` is never imported. | Delete `src/sanity/image.ts`. |
| M2 | Medium | `src/app/fonts/` | Empty directory | Delete. |
| M3 | Medium | `tsconfig.tsbuildinfo` | Build artifact tracked in git despite `.gitignore` entry (added after tracking). | `git rm --cached tsconfig.tsbuildinfo` |
| M4 | Medium | `out/` | Build output directory not properly gitignored. | Verify `.gitignore` covers it; `git rm -r --cached out/` |
| M5 | Medium | `ARCHITECTURE.md` | Old architecture doc (navy/gold, single-page) conflicts with current state. | Delete or archive. |
| M6 | Medium | `src/app/layout.tsx` | `new Date().getFullYear()` in Footer — hydration risk and stale year on cached builds. | Hardcode current year or pass as prop. |
| M7 | Medium | `src/components/layout/MobileNav.tsx` | Invalid Tailwind class `bg-white/98` — opacity `/98` not supported in v3.4. | Change to `bg-white/95` or `bg-white/[.98]`. |
| M8 | Medium | `src/components/sections/PodcastUniverse/PodcastUniverse.tsx` | `sticky top-24` on mobile breaks layout stacking. | Add `lg:sticky lg:top-24` to disable sticky on mobile. |
| M9 | Medium | `src/components/ui/SocialLinks.tsx` | Unnecessary `'use client'` — component contains no hooks or browser APIs. Prevents SSR. | Remove `'use client'`. |
| M10 | Medium | `src/components/ui/SectionHeading.tsx` | `'use client'` forced by framer-motion. Used on every page, preventing full server rendering. | Replace with CSS-only scroll animation or accept trade-off. |
| M11 | Medium | `src/components/pages/Contact/ContactForm.tsx` | No input sanitization before `mailto:` — potential CRLF injection via subject/body. | Strip `\r\n` from inputs or (preferred) replace mailto with API. |
| M12 | Medium | `src/components/sections/BookConversation/BookConversation.tsx` | `BOOK_CONVERSATION` data duplicated between `constants.ts` and `content/contact.ts`. | Define once, import everywhere. |

---

## LOW ISSUES (10)

| ID | Severity | File | Issue | Fix |
|----|----------|------|-------|-----|
| L1 | Low | `src/components/ui/Container.tsx` | Hardcoded `max-w-[1200px]` cannot be overridden via className. | Accept `maxWidth` prop or use CSS variable. |
| L2 | Low | Multiple files | Background glow/mesh patterns duplicated across 6+ sections. | Create shared `SectionBackground` component. |
| L3 | Low | Multiple files | Magic numbers for scroll thresholds scattered (20, 80, 500). | Define as named constants in config. |
| L4 | Low | Multiple files | Inconsistent export pattern: 16 use `export default`, 18 use `export function`. | Adopt project-wide convention (recommend: named exports). |
| L5 | Low | `tailwind.config.js` | `font-mono` CSS variable `--font-mono` not referenced by Tailwind config (uses hardcoded font instead). | Change to `['var(--font-mono)', 'JetBrains Mono', 'monospace']`. |
| L6 | Low | `src/components/sections/Hero/Hero.tsx` | Array index used as `key` in word map (`key={i}`). | Use `key={`${word}-${i}`}` for explicitness. |
| L7 | Low | `src/app/about/page.tsx` | SEO description uses "coach" but tagline consistently uses "trainer". | Standardize on "trainer". |
| L8 | Low | `src/content/experience.ts` | `EXPERIENCE = TIMELINE` alias — naming is misleading (contains awards data, not work history). | Rename for clarity. |
| L9 | Low | `src/app/page.tsx` | Hero trust items are plain `<span>` elements — not clickable links to `/awards`. | Make each trust item a link to relevant page. |
| L10 | Low | `src/components/sections/Frameworks/Frameworks.tsx` | No CTA per framework — visitor consumes content but has no clear next step. | Add small CTA below each framework diagram. |

---

## RELEASE GATES ASSESSMENT

| Gate | Target | Current | Status |
|------|--------|---------|--------|
| Homepage Quality | ≥90 | 60 | ❌ FAIL |
| SEO | ≥90 | 45 | ❌ FAIL |
| Accessibility | ≥90 | 78 | ❌ FAIL |
| Performance | ≥90 | 72 | ❌ FAIL |
| Mobile UX | ≥90 | 72 | ❌ FAIL |
| Production Readiness | ≥90 | 58 | ❌ FAIL |
| No Critical Issues | 0 | 5 | ❌ FAIL |
| No High Issues | 0 | 18 | ❌ FAIL |
| Successful Build | Yes | Yes | ✅ PASS |
| All Client Requirements Complete | Yes | Partial | ❌ FAIL |

**All 9 release gates are failing. DO NOT SHIP.**

---

## CLIENT REQUIREMENTS STATUS

| # | Requirement | Status | Notes |
|---|-------------|--------|-------|
| 1 | Multi-page architecture | ✅ Done | 9 routes implemented |
| 2 | Pink and white palette | ✅ Done | Colors in tailwind.config + globals.css |
| 3 | Wonderful homepage | ❌ NEEDS WORK | Hero missing roles, OpeningStatement duplicates headline, missing JCI award |
| 4 | Mobile parity with desktop | ⚠️ Partial | Same content, but sticky podcast embed breaks on mobile |
| 5 | Remove random top-left element | ✅ Done | No floating artifacts found |
| 6 | Remove IN2 | ✅ Done | No references found |
| 7 | Remove CH | ✅ Done | No references found |
| 8 | Replace Spotify URL | ✅ Done | Single source in `social.ts` |
| 9 | Full SEO optimization | ❌ NEEDS WORK | Doubled titles, missing OG image, no favicon, empty sitemap |
| 10 | Proper social icons with labels | ✅ Done | Lucide icons + aria-labels |

**8 of 10 client requirements complete.** SEO and Homepage need significant work.

---

## PRIORITIZED REMEDIATION ROADMAP

### Round 1 (Quick Fixes — ~2 hours)

1. Delete `postcss.config.mjs` — 1 min
2. Delete `.env` — 30 sec
3. Delete empty `src/app/fonts/` — 30 sec
4. Delete `src/components/sections/CTA/CTA.tsx` — 30 sec
5. Delete `src/components/sections/FivePillars/PillarGrid.tsx` — 30 sec
6. Delete `src/sanity/image.ts` — 30 sec
7. Delete unused content files (about.ts, frameworks.ts, services.ts, testimonials.ts) if not needed — 2 min
8. Delete 5 unused hooks — 2 min
9. Fix `bg-white/98` → `bg-white/95` — 1 min
10. Fix `SocialLinks.tsx` — remove `'use client'` — 1 min
11. Fix `font-mono` in tailwind config — 2 min
12. Remove `public/` from `.gitignore`, create `public/images/` directory — 3 min
13. Fix metadata title duplication in `metadata.ts` — 5 min
14. Remove duplicate `NavItem` type from `types/index.ts` — 3 min
15. Add JCI Senator 2022 to Hero trust items — 2 min
16. Fix Opening Statement headline duplication — 5 min
17. Fix `<h1>` duplication (OpeningStatement → `<h2>`) — 2 min
18. Fix sticky on PodcastUniverse mobile — 2 min
19. Remove unused npm deps — 2 min
20. Fix sitemap to include dynamic routes — 5 min

**Estimated: ~45 minutes**

### Round 2 (Medium Effort — ~4 hours)

21. Complete content migration: update all component imports to use `@/content/*`, deduplicate `constants.ts` — 1 hr
22. Create `public/images/og-default.jpg` (1200×630px) — 30 min (needs design asset)
23. Add favicon files to `public/` + `icons` metadata in layout — 20 min
24. Add tagline to Hero component — 15 min
25. Wire contact form to Formspree/Web3Forms — 30 min
26. Differentiate Experience vs Awards page content — 30 min
27. Update Hero trust items to be clickable links — 15 min
28. Fix scroll-to-top `new Date().getFullYear()` — 5 min
29. Verify `robots` meta on subpages (inheritance issue) — 15 min
30. Clean up git tracking: `out/`, `tsconfig.tsbuildinfo` — 5 min

**Estimated: ~4 hours**

### Round 3 (Architectural — ~6 hours)

31. Split FrameworkStep.tsx monolith into 3 components — 1.5 hr
32. Extract HumanOS subcomponents into separate files — 1 hr
33. Create shared `Timeline` primitive to deduplicate Experience/Awards — 1 hr
34. Create shared `SectionBackground` component — 30 min
35. Replace framer-motion in SectionHeading with CSS animation — 30 min
36. Adopt consistent named export convention — 1 hr
37. Standardize animation library (reduce dual GSAP+Framer Motion overhead) — 30 min

**Estimated: ~6 hours**

### Round 4 (SEO & Polish — ~4 hours)

38. Add per-page canonical URLs, Open Graph, Twitter Cards verification — 1 hr
39. Add BreadcrumbList JSON-LD — 30 min
40. Add missing robots meta to subpages — 15 min
41. Lighthouse audit pass (actual browser testing) — 1 hr
42. Mobile responsive QA at 390px, 430px, 768px, 1024px — 1 hr
43. Accessibility pass (keyboard, screen reader, contrast) — 30 min

**Estimated: ~4 hours**

**Total estimated remediation effort: ~15 hours**

---

## FINAL RECOMMENDATION

### ⛔ DO NOT SHIP

**Status:** Production Readiness Score = 58/100

The website has good bones but is not production-ready. The top 5 issues to resolve before re-evaluation:

1. **Create `public/` directory** with OG image and favicon
2. **Fix metadata title duplication** — every page shows doubled title
3. **Complete content migration** — eliminate dual source of truth between `constants.ts` and `content/*`
4. **Fix contact form** — mailto: loses leads
5. **Add practitioner roles to Hero** — visitors must instantly understand who he is

After completing Round 1 (quick fixes), re-score. After Round 2, re-evaluate for ship readiness. Rounds 3-4 are architectural improvements that raise quality from "good" to "premium."

---

*Report compiled from 7 agent audits: Finder, Explore, Architect, Debugger, Coder, Editor, General (SEO). No files were modified.*
