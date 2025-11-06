# Shy Parallax Storytelling - Directory Structure

This branch (`parallax-story`) adds parallax features while keeping the original site intact.

## 📁 Repository Structure

```
marketing/
├── app/
│   ├── page.tsx                          # ✅ ORIGINAL: Main landing page (unchanged)
│   ├── download/page.tsx                 # ✅ ORIGINAL: Download page (unchanged)
│   ├── layout.tsx                        # ✅ ORIGINAL: Root layout (unchanged)
│   └── stories-gsap/                     # 🆕 NEW: Parallax storytelling
│       └── page.tsx                      #     Route: /stories-gsap
│
├── components/
│   ├── Analytics.tsx                     # ✅ ORIGINAL (unchanged)
│   ├── ShyLandingPage.tsx                # ✅ ORIGINAL (unchanged)
│   ├── ShyHero.tsx                       # ✅ ORIGINAL (unchanged)
│   ├── ShyLogo.tsx                       # ✅ ORIGINAL (unchanged)
│   ├── FeaturedLocationsCarousel.tsx     # ✅ ORIGINAL (unchanged)
│   ├── ui/                               # ✅ ORIGINAL (unchanged)
│   └── scrollytelling/                   # 🆕 NEW: Parallax components
│       └── ScrollytellingSceneGSAP.tsx   #     Scene component with parallax
│
├── hooks/
│   └── scrollytelling/                   # 🆕 NEW: Scroll animation hooks
│       ├── use-gsap-scroll.ts            #     React hook for animations
│       └── use-reduced-motion.ts         #     Accessibility hook
│
├── lib/
│   ├── responsive.ts                     # ✅ ORIGINAL (unchanged)
│   └── scrollytelling/                   # 🆕 NEW: Animation engine
│       ├── gsap-scroll.ts                #     Lightweight ScrollTrigger (~2KB)
│       ├── manifest.ts                   #     Video asset definitions
│       ├── README.md                     #     API documentation
│       ├── animations.ts                 # ✅ ORIGINAL (if exists)
│       ├── index.ts                      # ✅ ORIGINAL (if exists)
│       └── types.ts                      # ✅ ORIGINAL (if exists)
│
├── public/
│   ├── images/                           # ✅ ORIGINAL (unchanged)
│   └── svg/
│       └── parallax-story/               # 🆕 NEW: SVG assets for parallax
│           ├── badges.svg                #     Status icons (sprite)
│           ├── chip-tabs.svg             #     Venue filter chips
│           ├── cta-banner.svg            #     Call-to-action banner
│           ├── dm-request-modal.svg      #     DM request UI
│           ├── focus-ring.svg            #     Animated focus ring
│           ├── group-create-modal.svg    #     Create group UI
│           ├── group-queue.svg           #     Request queue UI
│           ├── icons.svg                 #     General icons (sprite)
│           ├── lobby-list.svg            #     Lobby list UI
│           ├── mid_venue-cafe.svg        #     Café silhouette (parallax layer)
│           ├── mid_venue-gym.svg         #     Gym silhouette (parallax layer)
│           ├── mid_venue-library.svg     #     Library silhouette (parallax layer)
│           ├── progress-dots.svg         #     Progress indicator
│           ├── tooltip.svg               #     Tooltip component
│           ├── tokens.css                #     Design system tokens
│           ├── INTEGRATION.md            #     SVG usage guide
│           └── README.md                 #     Asset documentation
│
├── .gitignore                            # ✅ ORIGINAL (unchanged)
├── next.config.js                        # ✅ ORIGINAL (unchanged)
├── next.config.mjs                       # ✅ ORIGINAL (unchanged)
├── package.json                          # ✅ ORIGINAL (unchanged, no new deps)
├── postcss.config.js                     # ✅ ORIGINAL (unchanged)
├── tailwind.config.ts                    # ✅ ORIGINAL (unchanged)
├── tsconfig.json                         # ✅ ORIGINAL (unchanged)
├── vercel.json                           # ✅ ORIGINAL (unchanged)
├── README.md                             # ✅ ORIGINAL (unchanged)
├── RESPONSIVE_DESIGN.md                  # ✅ ORIGINAL (unchanged)
└── PARALLAX_DEPLOYMENT.md                # 🆕 NEW: This deployment guide
```

---

## 🎯 Key Points

### ✅ What's UNCHANGED (Your Production Site)
- **All original pages:** `/`, `/download`
- **All original components:** Landing page, hero, logo, carousel
- **All original configs:** Next.js, Tailwind, TypeScript
- **No new dependencies:** Zero impact on bundle size
- **Vercel deployment:** `main` branch still deploys your current site

### 🆕 What's NEW (Parallax Features)
- **New route:** `/stories-gsap` (doesn't affect homepage)
- **Isolated folder:** `components/scrollytelling/`
- **Self-contained:** All parallax code in dedicated folders
- **Zero conflicts:** No edits to existing files
- **Opt-in:** Only loads when visiting `/stories-gsap`

---

## 🚦 Routes

| Route | Description | Branch | Status |
|-------|-------------|--------|--------|
| `/` | Original landing page | Both | ✅ Production |
| `/download` | Download page | Both | ✅ Production |
| `/stories-gsap` | Parallax storytelling | `parallax-story` only | 🚧 New |

---

## 📦 What You Need to Add

To make the parallax storytelling work, you'll need to add your **video assets**:

```
public/
  story/                    # 👈 Create this folder structure
    hook/
      bg_city.webm          # Background video
      poster.avif           # Poster image (instant load)
    mechanic/
      bg_softgradient.webm
      poster.avif
    charger/
      bg_cafe_plate.webm
      poster.avif
      fg_handoff_charger.webm
    logo/
      bg_cowork_plate.webm
      poster.avif
      fg_tablet_hand.webm
    tea/
      bg_teabar_plate.webm
      poster.avif
      fg_teacups.webm
    gym/
      bg_gym_plate.webm
      poster.avif
      fg_spotter_pair.webm
```

**Asset Requirements:**
- **Videos:** WebM (VP9) or MP4 (H.264), 1920×1080, <5MB
- **Posters:** AVIF or WebP, optimized for fast loading
- **Foreground videos:** Transparent background (alpha channel)

---

## 🔄 Workflow

```bash
# 1. View parallax locally
git checkout parallax-story
npm run dev
# Visit: http://localhost:3000/stories-gsap

# 2. View original site locally
git checkout main
npm run dev
# Visit: http://localhost:3000

# 3. Deploy to Vercel
git push origin parallax-story    # Creates preview deployment
git push origin main              # Production site (unchanged)
```

---

## 🎨 Brand Matching

The parallax system uses your Shy branding:

```css
/* In public/svg/parallax-story/tokens.css */
--shy-amber: #FBBF24;      /* Primary accent */
--shy-violet: #8B5CF6;     /* Secondary */
--shy-pink: #EC4899;       /* Accent */
--shy-cyan: #06B6D4;       /* Highlight */
```

All SVGs use `currentColor`, so they inherit your theme automatically.

---

## 📊 Performance Impact

| Metric | Production Site | Parallax Route |
|--------|----------------|----------------|
| Bundle Size | ✅ Unchanged | +2KB (gsap-scroll.ts) |
| Dependencies | ✅ Zero added | Zero added |
| Page Load | ✅ Unchanged | Optimized with posters |
| First Paint | ✅ Unchanged | <1s with AVIF posters |

---

## 🆘 Support

- **Deployment Guide:** See `PARALLAX_DEPLOYMENT.md`
- **API Docs:** See `lib/scrollytelling/README.md`
- **SVG Integration:** See `public/svg/parallax-story/INTEGRATION.md`

---

**You're on `parallax-story` branch** - Safe to experiment! Your production site is protected on `main` branch. 🎉
