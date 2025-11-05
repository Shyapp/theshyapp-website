# Scrollytelling Assets

This folder contains media assets for the parallax scrollytelling experience.

## Directory Structure

```
public/scrollytelling/
├── images/          # Static images for parallax layers
│   ├── layer-01-background.png
│   ├── layer-02-midground.png
│   ├── layer-03-foreground.png
│   └── ...
├── videos/          # Video backgrounds
│   ├── scene-01-intro.mp4
│   └── ...
└── README.md        # This file
```

## Image Guidelines

- **Format**: PNG with transparency for layers, JPG for backgrounds
- **Resolution**: 2x viewport size minimum (3840px wide for desktop)
- **Optimization**: Use tools like TinyPNG or ImageOptim
- **Naming**: Descriptive names with scene/layer numbers

### Recommended Sizes
- Background layers: 3840 x 2160px (4K)
- Midground layers: 2560 x 1440px (2K)
- Foreground elements: As needed, maintain quality

## Video Guidelines

- **Format**: MP4 (H.264 codec)
- **Resolution**: 1920x1080 (1080p) minimum
- **Duration**: Loop-friendly (seamless beginning/end)
- **File Size**: < 5MB per video (optimize with HandBrake)
- **Settings**: 
  - No audio track
  - 30fps
  - High compression ratio

## Color Palette Integration

Use these Shy brand colors in your assets:

### Primary
- Yellow: `#FBBF24` / `#FCD34D`
- Black: `#000000`

### Accents
- Purple: `#8B5CF6`
- Pink: `#EC4899`
- Cyan: `#06B6D4`

## Asset Checklist

Before adding assets:
- ✅ Optimized for web (compressed)
- ✅ Proper dimensions (2x viewport minimum)
- ✅ Follows brand color palette
- ✅ Named descriptively
- ✅ Transparent backgrounds where needed (PNG)
- ✅ License cleared for use

## Usage in Code

Reference assets from scenes:

```tsx
// Image layer
{
  id: 'background',
  type: 'image',
  src: '/scrollytelling/images/layer-01-background.png',
  parallax: { speed: 0.5, direction: 'down' }
}

// Video layer
{
  id: 'video-bg',
  type: 'video',
  src: '/scrollytelling/videos/scene-01-intro.mp4',
  parallax: { speed: 1, direction: 'up' }
}
```
