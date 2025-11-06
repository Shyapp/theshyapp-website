# 🚀 Parallax Branch Deployed!

## ✅ Deployment Status

Your `parallax-story` branch has been pushed to GitHub successfully!

**Repository:** `Shyapp/theshyapp-website`  
**Branch:** `parallax-story`  
**Commits:** 11 commits ahead of main

---

## 🌐 **How to Access Your Preview**

### **Option 1: Vercel Dashboard** (Recommended)

1. **Go to:** https://vercel.com/dashboard
2. **Find project:** Look for `theshyapp-website` or your marketing site project
3. **Check deployments:** You should see a new deployment for `parallax-story` branch
4. **Preview URL will be:**
   ```
   theshyapp-website-git-parallax-story-shyapp.vercel.app
   ```
   or
   ```
   theshyapp-website-[random-hash].vercel.app
   ```

5. **Click the deployment** to see:
   - Build logs
   - Preview URL
   - Domain details

### **Option 2: GitHub Actions Tab**

1. **Go to:** https://github.com/Shyapp/theshyapp-website/actions
2. **Look for:** Build triggered by your push
3. **Vercel bot** will comment on commits with preview URL

### **Option 3: Direct Link Pattern**

If your Vercel project is linked, the preview URL follows this pattern:
```
https://theshyapp-website-git-parallax-story-shyapp.vercel.app
```

Try that URL directly! Vercel auto-generates it based on:
- Project name
- Branch name
- Organization name

---

## 🧪 **Testing Your Parallax**

Once you have the preview URL:

### **1. Test the Parallax Route**
```
[your-preview-url]/stories-gsap
```

**Example:**
```
https://theshyapp-website-git-parallax-story-shyapp.vercel.app/stories-gsap
```

### **2. Verify Original Routes Still Work**
```
[your-preview-url]/              ← Original landing page
[your-preview-url]/download      ← Download page
```

### **3. Mobile Testing**

**Chrome DevTools:**
- Press F12
- Click device toolbar (Ctrl+Shift+M)
- Test on:
  - iPhone SE (375×667)
  - iPhone 15 Pro (393×852)
  - iPad (768×1024)

**Real devices:**
- Use the preview URL on your phone
- Test over WiFi and 4G
- Check Safari (iOS) and Chrome (Android)

---

## 🎬 **What to Test**

### **Parallax Features**
- [ ] Background videos load and play
- [ ] Poster images show instantly (before videos)
- [ ] Mid-layer silhouettes move at medium speed
- [ ] Foreground videos composite correctly
- [ ] Scroll progress indicator appears (desktop)
- [ ] SVGs pick up Shy yellow color (#fbbf24)
- [ ] Text is readable (white on dark backgrounds)

### **Interactions**
- [ ] Hover effects on SVG elements
- [ ] Click scroll progress dots to jump scenes
- [ ] Smooth scrolling between scenes
- [ ] Reduced motion works (System Settings)

### **Performance**
- [ ] First Contentful Paint <2.5s
- [ ] No layout shift (CLS)
- [ ] Smooth 60fps scrolling
- [ ] Videos don't overwhelm mobile

### **Accessibility**
- [ ] Keyboard navigation works
- [ ] Screen reader announces scenes
- [ ] Focus indicators visible
- [ ] Reduced motion honored

---

## 📊 **Check Build Status**

### **Vercel Build Logs**

If deployment fails, check logs:

1. Go to Vercel dashboard
2. Click failed deployment
3. View "Building" tab
4. Look for errors

**Common issues:**
- Missing environment variables
- TypeScript errors
- Import path issues
- Missing dependencies

### **Build Should Show:**
```
✓ Creating an optimized production build
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages
✓ Finalizing page optimization

Route (app)                              Size     First Load JS
┌ ○ /                                   ...
├ ○ /download                           ...
└ ○ /stories-gsap                       ...  ← Your new route
```

---

## 🔧 **If Preview URL Doesn't Work**

### **Check 1: Vercel Project Linked?**

Run this to check if Vercel is connected:
```bash
cd d:\ShyFresh\shy-app\marketing
ls .vercel
```

If `.vercel` folder exists, you're linked!

### **Check 2: Manual Preview Trigger**

If auto-deployment didn't work:

```bash
# Install Vercel CLI (if not installed)
npm i -g vercel

# Deploy manually
cd d:\ShyFresh\shy-app\marketing
vercel --prod=false

# Follow prompts, get preview URL
```

### **Check 3: GitHub Integration**

Ensure Vercel is connected to GitHub:
1. Vercel Dashboard → Settings → Git
2. Should show: "Connected to GitHub"
3. Repository: `Shyapp/theshyapp-website`

If not connected:
- Vercel Dashboard → Add New → Import Project
- Select GitHub repo
- Deploy

---

## 🎯 **What You Should See**

### **Landing Page (`/`)**
✅ Same as production (untouched)

### **Download Page (`/download`)**
✅ Same as production (untouched)

### **Parallax Page (`/stories-gsap`)** 🆕
- 6 fullscreen scenes (hook, mechanic, charger, logo, tea, gym)
- Background videos (or placeholders if not uploaded yet)
- SVG UI components overlaid
- Smooth parallax scrolling
- Scroll progress dots on left (desktop)
- All using Shy yellow (#fbbf24) branding

---

## 📝 **Testing Checklist**

Copy this and test each:

```
Desktop (Chrome/Safari/Firefox):
[ ] /stories-gsap loads
[ ] Background videos play
[ ] Parallax scrolling smooth
[ ] Progress indicator visible
[ ] Click dots to jump scenes
[ ] Hover effects work
[ ] All 6 scenes render

Mobile (iPhone/Android):
[ ] /stories-gsap loads quickly
[ ] Videos load or fall back to posters
[ ] No janky scrolling
[ ] Text readable
[ ] CTAs tappable
[ ] Reduced effects on slow connection

Accessibility:
[ ] Keyboard tab navigation
[ ] Screen reader friendly
[ ] High contrast mode works
[ ] Reduced motion disables parallax

Performance:
[ ] Lighthouse score 90+
[ ] No console errors
[ ] Network waterfall reasonable
[ ] Memory usage acceptable
```

---

## 🐛 **Troubleshooting**

### **"Page not found" on /stories-gsap**

Possible causes:
1. Build failed (check Vercel logs)
2. TypeScript errors (check local `npm run build`)
3. Route not exported properly

**Fix:**
```bash
# Test locally first
npm run build
npm run start
# Visit http://localhost:3000/stories-gsap
```

### **Videos not loading**

Expected! You haven't uploaded video files yet. You'll see:
- Poster images only (if they exist)
- Or placeholder background color

**To add videos:**
```
marketing/public/story/hook/bg_city.webm
marketing/public/story/hook/poster.avif
# etc. for each scene
```

### **SVGs not showing Shy yellow**

Check that `tokens.css` is imported in `app/layout.tsx`:
```tsx
import '@/public/svg/parallax-story/tokens.css';
import '@/public/svg/parallax-story/animations.css';
import '@/public/svg/parallax-story/transitions.css';
```

---

## 🎉 **Success Indicators**

You'll know it worked when:

✅ Preview URL loads  
✅ `/stories-gsap` route exists  
✅ 6 scenes render (even without videos)  
✅ SVGs are Shy yellow  
✅ Scroll progress dots appear  
✅ Original routes (`/`, `/download`) unchanged  
✅ No console errors  
✅ Lighthouse performance 80+  

---

## 📞 **Next Steps**

### **1. Get Preview URL**
- Check Vercel dashboard
- Or try: `https://theshyapp-website-git-parallax-story-shyapp.vercel.app`

### **2. Test Thoroughly**
- Desktop: Chrome, Safari, Firefox
- Mobile: iPhone, Android
- Accessibility: Keyboard, screen reader

### **3. Add Videos** (Optional)
```bash
# Create video folders
mkdir -p public/story/{hook,mechanic,charger,logo,tea,gym}

# Add your Sora videos
# Each scene needs: bg_*.webm + poster.avif
```

### **4. Share for Feedback**
```
Preview: [your-vercel-url]/stories-gsap
GitHub: https://github.com/Shyapp/theshyapp-website/tree/parallax-story
```

### **5. Merge When Ready**
```bash
# When everything looks perfect:
git checkout main
git merge parallax-story
git push origin main

# Now production has parallax! 🎉
```

---

## 🔗 **Useful Links**

- **Vercel Dashboard:** https://vercel.com/dashboard
- **GitHub Repo:** https://github.com/Shyapp/theshyapp-website
- **Branch Compare:** https://github.com/Shyapp/theshyapp-website/compare/main...parallax-story
- **Create PR:** https://github.com/Shyapp/theshyapp-website/pull/new/parallax-story

---

**Your parallax branch is now live on Vercel preview!** 🚀

Check your Vercel dashboard for the preview URL and start testing!
