# Scrollytelling Implementation Guide

This directory contains the complete parallax scrollytelling infrastructure for the ShyApp marketing website.

## 📁 Directory Structure

```
marketing/
├── components/scrollytelling/
│   ├── scenes/                    # Individual scene components
│   │   ├── Scene01Intro.tsx       # Populate with your scenes
│   │   ├── Scene02Discovery.tsx
│   │   └── ...
│   ├── ParallaxLayer.tsx          # ✅ Ready
│   ├── ScrollytellingScene.tsx    # ✅ Ready
│   ├── ScrollytellingContainer.tsx # ✅ Ready
│   └── index.ts                   # ✅ Ready
├── hooks/scrollytelling/
│   ├── use-scroll-progress.ts     # ✅ Ready
│   ├── use-parallax.ts            # ✅ Ready
│   ├── use-scene-progress.ts      # ✅ Ready
│   └── index.ts                   # ✅ Ready
├── lib/scrollytelling/
│   ├── types.ts                   # ✅ Ready
│   ├── animations.ts              # ✅ Ready
│   └── index.ts                   # Create this
└── public/scrollytelling/
    ├── images/                    # Populate with assets
    ├── videos/                    # Populate with assets
    └── README.md                  # ✅ Ready
```

## 🚀 Status: Ready for Content

### ✅ Infrastructure Complete
- Parallax animation system
- Scroll progress tracking
- Scene management
- TypeScript types & interfaces
- React hooks for animations
- Component architecture

### 📝 Next Steps (Your Tasks)

1. **Create Scene Components**
   - Navigate to `components/scrollytelling/scenes/`
   - Create scene files (Scene01Intro.tsx, Scene02Discovery.tsx, etc.)
   - Follow the template in scenes/README.md

2. **Add Media Assets**
   - Place images in `public/scrollytelling/images/`
   - Place videos in `public/scrollytelling/videos/`
   - Follow optimization guidelines in public/scrollytelling/README.md

3. **Create Scrollytelling Page**
   - Create `app/story/page.tsx` or similar
   - Import scenes and configure the experience

## 🎯 Quick Start Example

Once you've populated the folders, create a page like this:

```tsx
// app/story/page.tsx
'use client';

import { ScrollytellingContainer } from '@/components/scrollytelling';
import { Scene01Intro } from '@/components/scrollytelling/scenes/Scene01Intro';
import { Scene02Discovery } from '@/components/scrollytelling/scenes/Scene02Discovery';

export default function StoryPage() {
  const config = {
    scenes: [
      {
        id: 'intro',
        title: 'Meet People Nearby',
        startProgress: 0,
        endProgress: 0.25,
        backgroundColor: '#000000',
        parallaxLayers: [
          {
            id: 'bg-layer',
            type: 'image',
            src: '/scrollytelling/images/intro-bg.png',
            parallax: { speed: 0.5, direction: 'down' },
            zIndex: 0,
          },
        ],
      },
      {
        id: 'discovery',
        title: 'Discover at Shy Locations',
        startProgress: 0.25,
        endProgress: 0.5,
        backgroundColor: '#000000',
      },
      // Add more scenes...
    ],
    showProgress: true, // Debug mode
  };

  return (
    <ScrollytellingContainer config={config}>
      <Scene01Intro />
      <Scene02Discovery />
      {/* Add more scene components */}
    </ScrollytellingContainer>
  );
}
```

## 🎨 Brand Integration

All components use Shy's color palette:
- Primary Yellow: `#FBBF24`
- Black Background: `#000000`
- Purple Accent: `#8B5CF6`
- Pink Accent: `#EC4899`

## 📚 Component API

### ScrollytellingContainer
Main wrapper component.

**Props:**
- `config: ScrollytellingConfig` - Scene configuration
- `children?: ReactNode` - Custom scene components

### ScrollytellingScene
Individual scene wrapper.

**Props:**
- `scene: SceneConfig` - Scene configuration
- `children?: ReactNode` - Scene content

### Hooks

#### useScrollProgress
```tsx
const { scrollY, scrollProgress, viewportHeight } = useScrollProgress();
// scrollProgress: 0-1 (entire page)
```

#### useParallax
```tsx
const { transform, style, progress } = useParallax({
  speed: 0.5,
  direction: 'down',
});
```

#### useSceneProgress
```tsx
const { sceneProgress, isActive, globalProgress } = useSceneProgress(0, 0.5);
// sceneProgress: 0-1 (within scene)
// isActive: boolean
```

## 🔧 When You're Ready to Integrate

After populating scenes and assets, I'll help you:
1. Create the main scrollytelling page route
2. Integrate with the existing marketing site
3. Add navigation links
4. Optimize performance
5. Add smooth scroll and scene snapping
6. Fine-tune animations

## 📞 Ready to Glue It Together?

Once you've added:
- ✅ Scene components in `components/scrollytelling/scenes/`
- ✅ Media assets in `public/scrollytelling/`

Let me know and I'll create the integration page and wire everything together!
