# Scrollytelling Restructuring Complete ✅

## What Changed

### Directory Structure
```
OLD: public/scrollytelling/
     ├── images/
     └── videos/

NEW: public/story/
     ├── hook/          (bg_city.webm, poster.avif)
     ├── mechanic/      (bg_softgradient.webm, poster.avif)
     ├── charger/       (bg + fg videos, poster)
     ├── logo/          (bg + fg videos, poster)
     ├── tea/           (bg + fg videos, poster)
     ├── gym/           (bg + fg videos, poster)
     ├── ui/            (SVG overlays + tokens.css)
     └── shared/        (particles.webm)
```

### New Files Created
1. **lib/scrollytelling/manifest.ts** - Central asset registry
   - `SCENES` object with all video/poster paths
   - `UI_ASSETS` for SVG overlays
   - `SCENE_CONFIG` with progress ranges (0-1)

2. **public/story/ui/tokens.css** - Design tokens
   - Brand colors (--shy-yellow, --shy-dark, etc.)
   - Spacing scale (matches Tailwind)
   - Border radius, timing functions, z-index layers

3. **Placeholder files** - Six poster.avif.placeholder files
   - One for each scene folder (hook, mechanic, charger, logo, tea, gym)
   - Includes ffmpeg commands to generate actual posters

### Updated Files
1. **ParallaxLayer.tsx**
   - Added `poster` prop support
   - Videos now show posters instantly before loading
   - Fallback image for browsers without WebM support

2. **ScrollytellingScene.tsx**
   - Imports manifest (SCENES)
   - Uses manifest for asset paths (no more hardcoded strings)

3. **types.ts**
   - Added `poster?: string` to ParallaxLayer interface

4. **globals.css**
   - Added reduced motion support (@media prefers-reduced-motion)
   - Disables animations, transforms, parallax for accessibility

5. **next.config.js**
   - Vercel caching headers for /story/* assets
   - 1 year cache for .webm/.avif (immutable)
   - 1 week cache for /story/ui/* (SVG)

6. **SCROLLYTELLING_README.md**
   - Complete implementation guide
   - Asset requirements (video encoding, poster extraction)
   - Performance optimization strategies
   - Troubleshooting section
   - Deployment checklist

## Why These Changes

### Alignment with Next.js/Vercel Best Practices
- **Static asset serving**: public/story/* maps to /story/* URLs
- **Edge caching**: Long-cache headers for immutable video files
- **Performance**: Poster-first loading (AVIF ~50KB vs WebM ~5MB)

### Alignment with Sora Video Workflow
- **Scene-based folders**: Each Sora generation outputs to its own folder
- **Naming convention**: bg_*.webm, fg_*.webm, poster.avif
- **Mobile variants**: Ready for _m.webm suffixes

### Developer Experience
- **Centralized manifest**: Update paths in one place, not scattered across components
- **Type safety**: TypeScript interfaces prevent typos
- **Clear organization**: Story scenes match marketing narrative

### Production Readiness
- **Accessibility**: Reduced motion support (WCAG 2.1)
- **Browser compat**: Poster fallbacks for video failures
- **Performance**: CDN caching, lazy loading, poster-first display

## Next Steps (When Ready to Populate)

### 1. Generate Actual Videos
```bash
# For each scene, encode to WebM VP9
ffmpeg -i source.mp4 -c:v libvpx-vp9 -b:v 3M -vf scale=1920:1080 -an public/story/hook/bg_city.webm
```

### 2. Extract Posters
```bash
# Generate AVIF posters from first frame
ffmpeg -i public/story/hook/bg_city.webm -vframes 1 -f image2 public/story/hook/poster.avif
```

### 3. Create UI Overlays (SVG)
- lobby-list.svg
- dm-request-modal.svg
- group-create-modal.svg
- etc. (see manifest.ts UI_ASSETS)

### 4. Wire to Landing Page
```tsx
import { SCENE_CONFIG } from '@/lib/scrollytelling/manifest';
import { ScrollytellingContainer, ScrollytellingScene } from '@/components/scrollytelling';

export default function Home() {
  return (
    <>
      <HeroSection />
      <ScrollytellingContainer>
        {SCENE_CONFIG.map(scene => (
          <ScrollytellingScene key={scene.id} scene={scene}>
            {/* Custom content per scene */}
          </ScrollytellingScene>
        ))}
      </ScrollytellingContainer>
      <FooterSection />
    </>
  );
}
```

## Commit Details
- **Commit**: 26c067e
- **Files Changed**: 17
- **Insertions**: +538
- **Deletions**: -246
- **Deployed to**: Vercel (auto-deploy on push)

## Testing Checklist
- [x] TypeScript compiles without errors
- [x] Manifest exports correct paths
- [x] Placeholder files in correct locations
- [x] Reduced motion CSS rules added
- [x] Vercel caching headers configured
- [ ] Actual videos encoded and added
- [ ] Posters extracted and verified
- [ ] UI overlays created
- [ ] Landing page wired to scrollytelling
- [ ] Mobile responsive testing
- [ ] Accessibility audit (keyboard nav, screen readers)
- [ ] Performance audit (Lighthouse)

## Documentation
- **Implementation Guide**: SCROLLYTELLING_README.md (complete)
- **Manifest Reference**: lib/scrollytelling/manifest.ts (inline comments)
- **Type Definitions**: lib/scrollytelling/types.ts (JSDoc comments)

---

**Status**: Infrastructure 100% complete. Ready for content population when videos are generated.
