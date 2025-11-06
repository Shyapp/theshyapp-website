# Parallax Story Branch - Deployment Guide

## 🎯 Branch Strategy

This repo now has **two branches** for safe parallel development:

### `main` branch
- **Current production site** (unchanged)
- Deployed to: `shy-landing.vercel.app` (or your custom domain)
- Contains: Original landing page
- Status: ✅ **LIVE - DO NOT TOUCH**

### `parallax-story` branch (NEW)
- **Parallax storytelling experiment**
- Will deploy to: Preview URL (e.g., `shy-landing-parallax-story.vercel.app`)
- Contains: All new parallax features + original site
- Status: 🚧 **In Development**

---

## 🚀 Quick Start

### View Current Branch
```bash
git branch
# * parallax-story  ← You're here
#   main
```

### Switch Between Branches
```bash
# Go back to production (current site)
git checkout main

# Return to parallax development
git checkout parallax-story
```

### Keep Branches Synced
```bash
# Get latest changes from main into parallax-story
git checkout parallax-story
git merge main
```

---

## 📦 What's New in `parallax-story` Branch

### New Files (Production site unchanged)
```
app/stories-gsap/page.tsx          ← New parallax page at /stories-gsap
components/scrollytelling/         ← Parallax scene components
hooks/scrollytelling/              ← Scroll hooks (reduced-motion, GSAP)
lib/scrollytelling/                ← Core animation engine
public/svg/parallax-story/         ← 14 SVG assets + tokens.css
```

### Unchanged (Your current site is safe)
```
app/page.tsx                       ← Original home page
components/ShyLandingPage.tsx      ← Original landing
All other existing files           ← Untouched
```

---

## 🌐 Vercel Deployment Setup

### Option A: Automatic Preview Deployments (Recommended)

Vercel will automatically create preview URLs for each branch:

1. **Push the parallax-story branch:**
   ```bash
   git push -u origin parallax-story
   ```

2. **Vercel auto-creates preview:**
   - Main site: `shy-landing.vercel.app` (from `main` branch)
   - Parallax: `shy-landing-git-parallax-story.vercel.app` (from `parallax-story` branch)

3. **Visit your preview:**
   - Go to Vercel dashboard
   - Find deployment for `parallax-story` branch
   - Click preview URL
   - Navigate to `/stories-gsap` to see parallax

### Option B: Manual Preview Project

Create a separate Vercel project for the parallax branch:

1. **In Vercel Dashboard:**
   - Import project again
   - Name it: `shy-landing-parallax`
   - Set Git branch: `parallax-story`
   - Deploy

2. **Result:**
   - Production site: Unchanged on main project
   - Parallax site: Separate project for testing

---

## 🎨 Development Workflow

### 1. Test Parallax Locally
```bash
# Make sure you're on parallax-story branch
git checkout parallax-story

# Install dependencies (if needed)
npm install

# Run dev server
npm run dev

# Visit http://localhost:3000/stories-gsap
```

### 2. Make Changes
```bash
# Edit files in:
# - components/scrollytelling/
# - app/stories-gsap/
# - public/svg/parallax-story/

# Add your Sora videos to:
# - public/story/hook/
# - public/story/mechanic/
# - public/story/charger/
# etc.
```

### 3. Commit & Push
```bash
git add .
git commit -m "feat: Update parallax scene animations"
git push origin parallax-story
```

### 4. Preview on Vercel
- Vercel auto-deploys `parallax-story` branch
- Check preview URL in Vercel dashboard
- Test on mobile and desktop

### 5. Merge When Ready
```bash
# When parallax is perfect and ready to replace main site:
git checkout main
git merge parallax-story
git push origin main

# Now production site includes parallax features
```

---

## 🎬 Adding Your Video Assets

The manifest expects videos in this structure:

```
public/
  story/
    hook/
      bg_city.webm              ← Background video
      poster.avif               ← Poster image (for instant load)
    mechanic/
      bg_softgradient.webm
      poster.avif
    charger/
      bg_cafe_plate.webm
      poster.avif
      fg_handoff_charger.webm   ← Optional foreground video
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

### Video Requirements
- **Format:** WebM (VP9 codec) or MP4 (H.264)
- **Poster:** AVIF or WebP for fast loading
- **Background:** 1920×1080 or 16:9 ratio
- **Foreground:** Transparent background (keyed/alpha channel)
- **File size:** Target <5MB per video (compress with FFmpeg)

---

## 🔧 Customization Guide

### Change Brand Colors

Edit `public/svg/parallax-story/tokens.css`:

```css
:root {
  --shy-amber: #FBBF24;     ← Change to your accent color
  --shy-violet: #8B5CF6;    ← Secondary color
  /* etc. */
}
```

### Adjust Parallax Speeds

Edit `components/scrollytelling/ScrollytellingSceneGSAP.tsx`:

```tsx
// Background layer (slowest)
to: { transform: 'translateY(-80px)' }  // Increase for more movement

// Mid layer (medium)
to: { transform: 'translateY(-120px)' } // Tweak for silhouettes

// Foreground layer (fastest)
to: { transform: 'translateY(-200px)' } // Reduce for subtle effect
```

### Add New Scenes

1. Add video assets to `public/story/your-scene/`
2. Update `lib/scrollytelling/manifest.ts`:
   ```ts
   export const SCENES = {
     // ... existing scenes
     yourScene: {
       bg: '/story/your-scene/bg.webm',
       poster: '/story/your-scene/poster.avif',
     },
   };
   ```
3. Add to `app/stories-gsap/page.tsx`:
   ```tsx
   <ScrollytellingSceneGSAP
     id="your-scene"
     bg={SCENES.yourScene.bg}
     poster={SCENES.yourScene.poster}
     reduced={reduced}
   >
     <h1>Your content</h1>
   </ScrollytellingSceneGSAP>
   ```

---

## 📊 Performance Optimization

### Before Deploying

1. **Optimize SVGs:**
   ```bash
   npx svgo -f public/svg/parallax-story -o public/svg/parallax-story
   ```

2. **Compress Videos:**
   ```bash
   # Use FFmpeg or online tools
   # Target: <5MB per video, 30fps max
   ```

3. **Test Performance:**
   ```bash
   npm run build
   npm run start
   # Test Lighthouse score
   ```

### Vercel Caching

Already configured in `next.config.js` for long-term SVG caching.

---

## 🆘 Troubleshooting

### "Videos not loading"
- Check file paths in `lib/scrollytelling/manifest.ts`
- Ensure videos are in `public/story/` folder
- Verify WebM codec support (use MP4 fallback)

### "Animations stuttering"
- Check `prefers-reduced-motion` (should disable parallax)
- Test on lower-end devices
- Reduce `will-change-transform` usage
- Consider lowering parallax movement values

### "Can't see /stories-gsap page"
- Ensure you're on `parallax-story` branch: `git branch`
- Check `app/stories-gsap/page.tsx` exists
- Restart dev server: `npm run dev`

### "Production site changed accidentally"
- Don't panic! `main` branch is untouched
- Double-check branch: `git checkout main && git log`
- Only merge when ready

---

## 📝 Next Steps

1. ✅ **You're on `parallax-story` branch** - Safe to experiment!
2. 🎬 **Add your Sora videos** to `public/story/*/`
3. 🎨 **Customize colors** in `tokens.css`
4. 🚀 **Push to GitHub** to trigger Vercel preview
5. 📱 **Test on mobile** via preview URL
6. ✨ **Tweak parallax speeds** until perfect
7. 🎯 **Merge to main** when ready to go live

---

## 🔗 Resources

- **Local Preview:** http://localhost:3000/stories-gsap
- **Docs:** See `lib/scrollytelling/README.md`
- **SVG Guide:** See `public/svg/parallax-story/INTEGRATION.md`
- **Vercel Dashboard:** https://vercel.com/dashboard

---

**Remember:** Your production site on `main` branch is completely safe. Experiment freely on `parallax-story`! 🎉
