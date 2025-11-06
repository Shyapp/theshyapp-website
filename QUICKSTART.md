# 🎬 Shy Parallax Storytelling - Quick Start

## ✅ Setup Complete!

You now have **two separate branches**:

### Branch Status
```bash
✅ main             → Your CURRENT LIVE SITE (untouched, safe)
🆕 parallax-story  → New parallax features (YOU ARE HERE)
```

---

## 🚀 Next Steps

### 1️⃣ Push to GitHub (Enable Preview Deployment)

```bash
# Push the new parallax branch to GitHub
git push -u origin parallax-story
```

**What happens:**
- GitHub receives your `parallax-story` branch
- Vercel auto-detects the new branch
- Creates preview deployment at: `shy-landing-git-parallax-story.vercel.app`
- Your main site remains untouched at: `shy-landing.vercel.app`

---

### 2️⃣ Add Your Video Assets

Create this folder structure and add your Sora videos:

```
marketing/
  public/
    story/                          👈 Create this folder
      hook/
        bg_city.webm                👈 Add your background video
        poster.avif                 👈 Add poster image (for instant load)
      mechanic/
        bg_softgradient.webm
        poster.avif
      charger/
        bg_cafe_plate.webm
        poster.avif
        fg_handoff_charger.webm     👈 Optional: Foreground video
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

**Quick create:**
```bash
# Run this to create the folder structure
mkdir -p public/story/{hook,mechanic,charger,logo,tea,gym}
```

---

### 3️⃣ Test Locally

```bash
# Make sure you're on parallax-story branch
git branch
# Should show: * parallax-story

# Start dev server
npm run dev

# Open browser to:
# http://localhost:3000/stories-gsap
```

---

### 4️⃣ Customize Brand Colors

Edit `public/svg/parallax-story/tokens.css`:

```css
:root {
  --shy-amber: #FBBF24;     /* 👈 Your primary accent color */
  --shy-violet: #8B5CF6;    /* 👈 Secondary color */
  --shy-pink: #EC4899;      /* 👈 Accent color */
  --shy-cyan: #06B6D4;      /* 👈 Highlight color */
}
```

---

### 5️⃣ Adjust Parallax Speeds

Edit `components/scrollytelling/ScrollytellingSceneGSAP.tsx`:

```tsx
// Line ~35: Background layer (subtle movement)
to: { transform: 'translateY(-80px)' }

// Line ~48: Mid silhouette layer (medium movement)
to: { transform: 'translateY(-120px)' }

// Line ~61: Foreground layer (dramatic movement)
to: { transform: 'translateY(-200px)' }
```

**Tips:**
- Smaller values = subtle parallax
- Larger values = dramatic parallax
- Test on mobile (reduce values if needed)

---

## 🌐 Deployment Workflow

```bash
# 1. Make changes on parallax-story branch
# (edit files, add videos, tweak animations)

# 2. Commit your changes
git add .
git commit -m "feat: Update parallax animations"

# 3. Push to GitHub
git push origin parallax-story

# 4. Vercel auto-deploys to preview URL
# Check Vercel dashboard for: shy-landing-git-parallax-story.vercel.app

# 5. Test the preview URL on mobile and desktop

# 6. When perfect, merge to production
git checkout main
git merge parallax-story
git push origin main
# Now your live site has parallax! 🎉
```

---

## 🎨 Brand Matching Checklist

- [ ] Colors match Shy branding in `tokens.css`
- [ ] SVGs use your color scheme (they use `currentColor`)
- [ ] Fonts match (update in SVG files if needed: `font-family="Roboto,system-ui"`)
- [ ] Animation speeds feel right (not too fast/slow)
- [ ] Mobile experience is smooth
- [ ] Reduced motion is honored (accessibility)

---

## 📱 Testing Checklist

- [ ] Desktop (Chrome, Safari, Firefox)
- [ ] Mobile (iOS Safari, Chrome)
- [ ] Tablet (iPad)
- [ ] Slow connection (throttle network in DevTools)
- [ ] Prefers-reduced-motion (System Settings → Accessibility)
- [ ] Lighthouse score (aim for 90+ performance)

---

## 🆘 Common Issues

### "Can't see /stories-gsap page"
```bash
# Make sure you're on parallax-story branch
git checkout parallax-story
npm run dev
# Visit http://localhost:3000/stories-gsap
```

### "Videos not loading"
- Check paths in `lib/scrollytelling/manifest.ts`
- Ensure videos are in `public/story/` folder
- Use WebM (VP9) or MP4 (H.264) format
- Add poster images for instant loading

### "Animations stuttering"
- Test `prefers-reduced-motion` (should disable parallax)
- Reduce parallax movement values
- Compress videos (target <5MB each)
- Test on lower-end devices

### "Accidentally changed production site"
Don't panic! Your `main` branch is safe:
```bash
git checkout main
git log  # Verify it's untouched
```

---

## 📊 Performance Tips

Before deploying to production:

```bash
# 1. Optimize SVGs
npx svgo -f public/svg/parallax-story -o public/svg/parallax-story

# 2. Build and test
npm run build
npm run start

# 3. Check Lighthouse
# Open http://localhost:3000/stories-gsap in Chrome
# DevTools → Lighthouse → Run audit
```

---

## 🔗 Resources

| Resource | Location |
|----------|----------|
| **Local preview** | http://localhost:3000/stories-gsap |
| **API docs** | `lib/scrollytelling/README.md` |
| **SVG guide** | `public/svg/parallax-story/INTEGRATION.md` |
| **Deployment guide** | `PARALLAX_DEPLOYMENT.md` |
| **Structure overview** | `PARALLAX_STRUCTURE.md` |
| **Vercel dashboard** | https://vercel.com/dashboard |

---

## 🎯 Your Current Setup

```
✅ Git branch created:     parallax-story
✅ Parallax system added:  24 files (1,070 lines)
✅ SVG assets ready:       14 files in public/svg/parallax-story/
✅ Example page created:   /stories-gsap
✅ Documentation added:    Deployment + structure guides
✅ Production site safe:   main branch untouched

🚧 Next: Add videos + push to GitHub for preview deployment
```

---

## 🎬 Ready to Deploy?

```bash
# Step 1: Push to GitHub
git push -u origin parallax-story

# Step 2: Check Vercel dashboard for preview URL

# Step 3: Add your videos and iterate

# Step 4: When ready, merge to main
git checkout main
git merge parallax-story
git push origin main
```

---

**Your production site is 100% safe on `main` branch. Experiment freely! 🎉**

Questions? Check the docs linked above or the commit history:
```bash
git log --oneline
```
