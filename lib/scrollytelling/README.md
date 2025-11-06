# Tiny GSAP ScrollTrigger for Shy

A lightweight, zero-dependency scroll animation system inspired by GSAP ScrollTrigger.

## Features

- ✅ **Tiny** - ~2KB minified, no dependencies
- ✅ **Smooth** - RAF-based scrubbing animations
- ✅ **Accessible** - Honors `prefers-reduced-motion`
- ✅ **React-friendly** - Hooks and components included
- ✅ **Type-safe** - Full TypeScript support

## Installation

All files are already included:
- `lib/scrollytelling/gsap-scroll.ts` - Core engine
- `hooks/scrollytelling/use-gsap-scroll.ts` - React hook
- `components/scrollytelling/ScrollytellingSceneGSAP.tsx` - Scene component

## Usage

### Option 1: Use the Scene Component (Recommended)

```tsx
import { ScrollytellingSceneGSAP } from '@/components/scrollytelling/ScrollytellingSceneGSAP';
import { useReducedMotion } from '@/hooks/scrollytelling/use-reduced-motion';

export default function MyStory() {
  const reduced = useReducedMotion();

  return (
    <ScrollytellingSceneGSAP
      id="scene-1"
      bg="/videos/bg.webm"
      poster="/images/poster.avif"
      fg="/videos/fg.webm"
      midSilhouetteSrc="/svg/parallax-story/mid_venue-cafe.svg"
      reduced={reduced}
    >
      <h1>Your content here</h1>
    </ScrollytellingSceneGSAP>
  );
}
```

### Option 2: Manual ScrollTrigger API

```tsx
import { useEffect } from 'react';
import { ScrollTrigger } from '@/lib/scrollytelling/gsap-scroll';

export default function CustomParallax() {
  useEffect(() => {
    ScrollTrigger.create({
      element: '.my-element',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      from: { opacity: '0', transform: 'translateY(100px)' },
      to: { opacity: '1', transform: 'translateY(-100px)' },
    });

    return () => ScrollTrigger.destroy();
  }, []);

  return <div className="my-element">Parallax content</div>;
}
```

### Option 3: React Hook

```tsx
import { useGSAPScroll } from '@/hooks/scrollytelling/use-gsap-scroll';

export default function Component() {
  useGSAPScroll([
    {
      element: '.bg-layer',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      from: { transform: 'translateY(0px)' },
      to: { transform: 'translateY(-80px)' },
    },
    {
      element: '.fg-layer',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 0.5, // 0.5s smooth delay
      from: { transform: 'translateY(0px)' },
      to: { transform: 'translateY(-200px)' },
    },
  ]);

  return (
    <div>
      <div className="bg-layer">Background</div>
      <div className="fg-layer">Foreground</div>
    </div>
  );
}
```

## API Reference

### ScrollAnimation Config

```ts
type ScrollAnimation = {
  element: HTMLElement | string;  // DOM element or selector
  from?: Partial<CSSStyleDeclaration>;
  to?: Partial<CSSStyleDeclaration>;
  start?: string;   // e.g., "top center", "top bottom"
  end?: string;     // e.g., "bottom center"
  scrub?: boolean | number;  // true or delay in seconds
  pin?: boolean;    // (planned) pin element during scroll
  markers?: boolean; // (planned) debug markers
};
```

### Position Format

Format: `"[element position] [viewport position]"`

Examples:
- `"top bottom"` - element top hits viewport bottom
- `"top center"` - element top hits viewport center  
- `"top top"` - element top hits viewport top
- `"bottom top"` - element bottom hits viewport top

### Scrub Options

- `scrub: true` - Instant smooth scrubbing
- `scrub: 0.5` - 0.5 second delay for smoother feel
- `scrub: false` - Snap animation (not recommended)

## Performance Tips

1. **Use `will-change-transform`** only on animating elements
2. **Limit concurrent animations** to 3-4 layers max
3. **Test on mobile** - consider disabling on low-end devices
4. **Use CSS transforms** over other properties when possible
5. **Lazy load videos** with `poster` attribute

## Accessibility

Always honor reduced motion preferences:

```tsx
const reduced = useReducedMotion();

<ScrollytellingSceneGSAP reduced={reduced} {...props} />
```

When `reduced={true}`, all parallax effects are disabled.

## Browser Support

- Modern browsers with RAF support
- Graceful fallback for older browsers
- Mobile Safari 12+
- Chrome/Edge/Firefox latest

## Examples

See `app/stories-gsap/page.tsx` for complete implementation.
