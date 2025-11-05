# Scrollytelling Implementation Guide

## Overview
This scrollytelling system uses Next.js 14 with TypeScript, React hooks, and a centralized asset manifest for production-ready parallax video storytelling.

## Architecture

### Asset Structure
```
public/story/
├── hook/           # Scene 1: City discovery
│   ├── bg_city.webm
│   └── poster.avif
├── mechanic/       # Scene 2: How Shy works
│   ├── bg_softgradient.webm
│   └── poster.avif
├── charger/        # Scene 3: Coffee shop
│   ├── bg_cafe_plate.webm
│   ├── fg_handoff_charger.webm
│   └── poster.avif
├── logo/           # Scene 4: Coworking space
│   ├── bg_cowork_plate.webm
│   ├── fg_tablet_hand.webm
│   └── poster.avif
├── tea/            # Scene 5: Tea bar
│   ├── bg_teabar_plate.webm
│   ├── fg_teacups.webm
│   └── poster.avif
├── gym/            # Scene 6: Gym spotters
│   ├── bg_gym_plate.webm
│   ├── fg_spotter_pair.webm
│   └── poster.avif
├── ui/             # SVG UI overlays
│   ├── tokens.css
│   ├── lobby-list.svg
│   ├── dm-request-modal.svg
│   └── ...
└── shared/         # Shared effects
    └── particles.webm
```

### Code Organization
```
lib/scrollytelling/
├── manifest.ts        # Central asset registry (SCENES, UI_ASSETS, SCENE_CONFIG)
├── types.ts           # TypeScript interfaces
└── animations.ts      # Easing functions, transform calculations

hooks/scrollytelling/
├── use-scroll-progress.ts    # Global scroll tracking (0-1)
├── use-parallax.ts           # Parallax transform calculations
└── use-scene-progress.ts     # Per-scene progress (0-1)

components/scrollytelling/
├── ScrollytellingContainer.tsx   # Main container with scroll context
├── ScrollytellingScene.tsx       # Individual scene renderer
└── ParallaxLayer.tsx             # Layer renderer (bg/fg videos)
```

## Key Files

### manifest.ts
Central registry for all assets. **Always update this when adding new scenes or assets.**

```typescript
export const SCENES = {
  hook: {
    bg: '/story/hook/bg_city.webm',
    poster: '/story/hook/poster.avif',
  },
  // ...
};

export const SCENE_CONFIG: SceneMetadata[] = [
  {
    id: 'hook',
    title: 'Meet People Nearby',
    startProgress: 0,
    endProgress: 0.16,
    backgroundColor: '#000000',
  },
  // ...
];
```

### Usage Example
```tsx
import { ScrollytellingContainer, ScrollytellingScene } from '@/components/scrollytelling';
import { SCENE_CONFIG } from '@/lib/scrollytelling/manifest';

export default function StoryPage() {
  return (
    <ScrollytellingContainer>
      {SCENE_CONFIG.map(scene => (
        <ScrollytellingScene key={scene.id} scene={scene}>
          <div className="text-center">
            <h2>{scene.title}</h2>
          </div>
        </ScrollytellingScene>
      ))}
    </ScrollytellingContainer>
  );
}
```

## Asset Requirements

### Video Files (.webm)
- **Codec**: VP9 or VP8
- **Resolution**: 1920×1080 (Full HD)
- **Frame Rate**: 30fps
- **Bitrate**: 2-5 Mbps
- **Duration**: 5-15 seconds (looping)
- **Naming**: `bg_*.webm` (background), `fg_*.webm` (foreground)

#### Encoding Command
```bash
ffmpeg -i input.mp4 -c:v libvpx-vp9 -b:v 3M -vf scale=1920:1080 -an output.webm
```

### Poster Images (.avif)
- **Format**: AVIF (better compression than WebP)
- **Resolution**: 1920×1080 (matches video)
- **Purpose**: Instant display before video loads
- **Source**: First frame of video

#### Extraction Command
```bash
ffmpeg -i bg_city.webm -vframes 1 -f image2 poster.avif
```

### Mobile Variants (Optional)
- **Naming**: `bg_city_m.webm`, `poster_m.avif`
- **Resolution**: 1080×1920 (portrait) or 720×1280
- **Usage**: Automatic device detection via manifest

## Performance

### Caching Strategy
Configured in `next.config.js`:
- **Videos (.webm, .avif)**: 1 year immutable cache
- **UI Assets (.svg)**: 1 week with stale-while-revalidate
- **Manifest updates**: Bust cache by renaming files

### Loading Optimization
1. **Poster-first**: Posters display immediately (AVIF ~50KB)
2. **Lazy video**: Videos load on scroll proximity
3. **Preload hints**: Next.js automatically preloads critical assets
4. **CDN**: Vercel Edge Network caches globally

### Reduced Motion
System respects `prefers-reduced-motion` media query:
- Disables animations (globals.css)
- Shows static posters instead of videos
- Maintains content readability

## Design Tokens

### Brand Colors (tokens.css)
```css
--shy-yellow: #fbbf24;      /* Primary accent */
--shy-dark: #000000;        /* Background */
--shy-purple: #8b5cf6;      /* Secondary */
--shy-pink: #ec4899;        /* Tertiary */
```

### Spacing Scale
Matches Tailwind CSS:
- `--shy-space-xs`: 8px
- `--shy-space-sm`: 12px
- `--shy-space-md`: 16px
- `--shy-space-lg`: 24px
- `--shy-space-xl`: 32px
- `--shy-space-2xl`: 48px

## Scene Configuration

### Progress Ranges
Each scene occupies a scroll range (0-1):
- **hook**: 0 → 0.16 (16% of total scroll)
- **mechanic**: 0.16 → 0.33
- **charger**: 0.33 → 0.50
- **logo**: 0.50 → 0.66
- **tea**: 0.66 → 0.83
- **gym**: 0.83 → 1.0

### Parallax Configuration
```typescript
{
  speed: 0.5,           // 0.5 = slower, 2 = faster
  direction: 'up',      // 'up' | 'down' | 'left' | 'right'
  offset: 100,          // Starting offset (px)
  easing: 'easeInOut',  // Smoothing function
}
```

## Adding New Scenes

### 1. Generate Assets
```bash
# Create scene folder
mkdir public/story/new-scene

# Add video (encode to WebM)
ffmpeg -i source.mp4 -c:v libvpx-vp9 -b:v 3M public/story/new-scene/bg_scene.webm

# Extract poster
ffmpeg -i public/story/new-scene/bg_scene.webm -vframes 1 public/story/new-scene/poster.avif
```

### 2. Update Manifest
```typescript
// lib/scrollytelling/manifest.ts
export const SCENES = {
  // ...existing scenes
  newScene: {
    bg: '/story/new-scene/bg_scene.webm',
    poster: '/story/new-scene/poster.avif',
  },
};

export const SCENE_CONFIG = [
  // ...existing scenes
  {
    id: 'newScene',
    title: 'New Scene Title',
    startProgress: 0.83,
    endProgress: 1.0,
    backgroundColor: '#000000',
  },
];
```

### 3. Deploy
```bash
git add .
git commit -m "Add new scrollytelling scene"
git push origin main
```
Vercel auto-deploys on push to main.

## Troubleshooting

### Video Not Playing
- **Check format**: Must be .webm (VP9/VP8)
- **Check size**: Keep under 10MB per video
- **Check path**: Verify manifest.ts paths match actual files
- **Check browser**: Safari requires H.264 fallback (not implemented yet)

### Poster Not Showing
- **Check format**: Must be .avif
- **Check resolution**: Should match video (1920×1080)
- **Check manifest**: Ensure poster path is in SCENES object

### Parallax Not Working
- **Check hooks**: Verify useScroll, useParallax are called
- **Check progress**: Log sceneProgress to debug ranges
- **Check CSS**: Ensure transform: translate3d is applied

### Performance Issues
- **Reduce bitrate**: Try 2Mbps instead of 5Mbps
- **Smaller resolution**: Use 1280×720 for mobile
- **Lazy loading**: Videos only load when scrolled near

## Browser Support
- **Chrome/Edge**: ✅ Full support (VP9)
- **Firefox**: ✅ Full support (VP9)
- **Safari**: ⚠️ Requires H.264 fallback (future enhancement)
- **Mobile browsers**: ✅ WebM widely supported

## Deployment Checklist
- [ ] All videos encoded to WebM VP9
- [ ] Posters extracted to AVIF
- [ ] Manifest updated with new paths
- [ ] Scene progress ranges validated (no gaps)
- [ ] Reduced motion tested
- [ ] Mobile variants added (if needed)
- [ ] Pushed to main branch
- [ ] Verified on Vercel preview URL
- [ ] Promoted to production

## Resources
- [VP9 Encoding Guide](https://trac.ffmpeg.org/wiki/Encode/VP9)
- [AVIF Image Format](https://jakearchibald.com/2020/avif-has-landed/)
- [Next.js Caching](https://nextjs.org/docs/app/building-your-application/optimizing/caching)
- [Vercel Edge Network](https://vercel.com/docs/edge-network/overview)
