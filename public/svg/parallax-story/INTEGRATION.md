# GSAP ScrollTrigger Integration Guide

## Quick Start

### 1. Import tokens CSS (once in your app)

```tsx
// app/layout.tsx or pages/_app.tsx
import '@/public/svg/parallax-story/tokens.css';
import '@/app/globals.css';
```

### 2. Use SVG assets in your scenes

```tsx
<!-- Icon from sprite -->
<svg class="w-5 h-5 ui-white">
  <use href="/svg/parallax-story/icons.svg#dumbbell"/>
</svg>

<!-- Badge from sprite -->
<svg class="h-6 w-6 ui-amber">
  <use href="/svg/parallax-story/badges.svg#badge-accepted"/>
</svg>

<!-- Inline overlay -->
<object 
  type="image/svg+xml" 
  data="/svg/parallax-story/dm-request-modal.svg" 
  className="w-full h-auto"
/>

<!-- Silhouette mid-layer -->
<img 
  src="/svg/parallax-story/mid_venue-cafe.svg" 
  className="absolute inset-0 opacity-10" 
  alt=""
/>
```

## GSAP ScrollTrigger Variant

The mini ScrollTrigger implementation provides smooth scroll-driven animations:

### Basic Usage

```tsx
import { ScrollTrigger } from '@/lib/scrollytelling/gsap-scroll';

ScrollTrigger.create({
  element: '#my-element',
  start: 'top bottom',  // when element top hits viewport bottom
  end: 'bottom top',    // when element bottom hits viewport top
  scrub: true,          // smooth scrubbing
  from: { opacity: '0', transform: 'translateY(50px)' },
  to: { opacity: '1', transform: 'translateY(0px)' },
});
```

### With React Hook

```tsx
import { useGSAPScroll } from '@/hooks/scrollytelling/use-gsap-scroll';

function MyComponent() {
  useGSAPScroll([
    {
      element: '.parallax-bg',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      from: { transform: 'translateY(0px)' },
      to: { transform: 'translateY(-80px)' },
    },
  ]);

  return <div className="parallax-bg">Content</div>;
}
```

### Position Values

- `start` / `end` format: `"[element position] [viewport position]"`
  - `"top bottom"` - element top hits viewport bottom
  - `"top center"` - element top hits viewport center
  - `"top top"` - element top hits viewport top
  - `"bottom top"` - element bottom hits viewport top

### Scrub Options

- `scrub: true` - instant smooth scrubbing
- `scrub: 0.5` - 0.5s delay for smoother feel
- `scrub: false` - snap animation (not recommended for parallax)

## Optimization

### SVGO Configuration

Optimize your SVGs before deployment:

```js
// svgo.config.js
module.exports = {
  multipass: true,
  js2svg: { pretty: false },
  plugins: [
    'removeDoctype',
    'removeComments',
    'cleanupAttrs',
    'mergePaths',
    'convertPathData',
    { name: 'removeAttrs', params: { attrs: ['data-name'] } },
    { name: 'removeDimensions' },
    { name: 'convertColors', params: { currentColor: true } },
    { name: 'cleanupNumericValues', params: { floatPrecision: 2 } },
  ]
};
```

Run optimization:
```bash
npx svgo -f public/svg/parallax-story -o public/svg/parallax-story
```

### Next.js Caching

Add long-term caching for SVG assets:

```js
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/svg/parallax-story/:path*',
        headers: [
          { 
            key: 'Cache-Control', 
            value: 'public, max-age=31536000, immutable' 
          }
        ],
      },
    ];
  },
};
```

## Accessibility

- All SVGs use `currentColor` for theme adaptation
- Proper ARIA labels on interactive elements
- Sprite symbols use `aria-hidden="true"`
- Reduced motion support via `prefers-reduced-motion`

## Example Scene Structure

```tsx
<ScrollytellingSceneGSAP
  id="hook"
  bg="/story/hook/bg_city.webm"
  poster="/story/hook/poster.avif"
  midSilhouetteSrc="/svg/parallax-story/mid_venue-cafe.svg"
  reduced={useReducedMotion()}
>
  <h1>Your Content</h1>
  <object data="/svg/parallax-story/chip-tabs.svg" type="image/svg+xml" />
</ScrollytellingSceneGSAP>
```

## Performance Tips

1. **Lazy load videos** - Use `poster` attribute for instant paint
2. **Use `will-change-transform`** - On parallax layers only
3. **Limit active animations** - Max 3-4 simultaneous parallax layers
4. **Test on mobile** - Reduce or disable parallax for low-end devices
5. **Honor reduced motion** - Always check `prefers-reduced-motion`
