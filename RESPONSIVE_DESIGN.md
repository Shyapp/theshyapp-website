# Responsive Design System

## Overview
This marketing site uses industry-standard responsive wrappers and breakpoints to ensure optimal display across all devices and screen sizes.

## Breakpoints

### Standard Breakpoints (Tailwind-based)
```typescript
{
  xs: 375px,   // Mobile (iPhone SE and up)
  sm: 640px,   // Mobile landscape / Small tablet
  md: 768px,   // Tablet portrait (iPad)
  lg: 1024px,  // Tablet landscape / Small desktop
  xl: 1280px,  // Desktop
  2xl: 1536px, // Large desktop / 4K
}
```

### Device Targets
- **Mobile**: `< 768px` (xs, sm)
- **Tablet**: `768px - 1279px` (md, lg)
- **Desktop**: `≥ 1280px` (xl, 2xl)

## Container System

### Container Components
Use these standardized containers for consistent max-widths:

```tsx
import { Container, Section } from '@/components/ui/Container';

// Basic container
<Container size="xl">
  <h1>Content</h1>
</Container>

// Section with container
<Section containerSize="lg" className="py-20">
  <h2>Section Title</h2>
</Section>
```

### Container Sizes
| Size | Max Width | Use Case |
|------|-----------|----------|
| `xs` | 480px | Narrow content (forms, modals) |
| `sm` | 640px | Article content, blog posts |
| `md` | 768px | Standard content width |
| `lg` | 1024px | Wide content sections |
| `xl` | 1280px | **Default** - Main content area |
| `2xl` | 1536px | Extra wide layouts |
| `full` | 100% | Full-width sections |

### Responsive Padding
All containers include automatic responsive padding:
- Mobile (xs): `16px` (1rem)
- Tablet (md): `24px` (1.5rem)
- Desktop (lg+): `32px` (2rem)

## CSS Classes

### Container Wrappers
```css
.container-wrapper  /* Base wrapper with responsive padding */
.container-xs       /* 480px max-width */
.container-sm       /* 640px max-width */
.container-md       /* 768px max-width */
.container-lg       /* 1024px max-width */
.container-xl       /* 1280px max-width */
.container-2xl      /* 1536px max-width */
```

### Section Wrappers
```css
.section-wrapper       /* Full-width section */
.safe-area-wrapper     /* Mobile safe area (notches) */
```

## Responsive Utilities

### Hooks
```tsx
import { 
  useBreakpoint, 
  useIsMobile, 
  useIsTablet, 
  useIsDesktop,
  useWindowSize 
} from '@/lib/responsive';

function MyComponent() {
  const breakpoint = useBreakpoint();        // 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  const isMobile = useIsMobile();            // true on xs/sm
  const isTablet = useIsTablet();            // true on md/lg
  const isDesktop = useIsDesktop();          // true on xl/2xl
  const { width, height } = useWindowSize(); // Current viewport size
  
  return <div>Current breakpoint: {breakpoint}</div>;
}
```

### Device Detection
```tsx
import { getDeviceType, isTouchDevice, isIOS, isAndroid } from '@/lib/responsive';

const deviceType = getDeviceType();     // 'mobile' | 'tablet' | 'desktop'
const hasTouch = isTouchDevice();       // boolean
const isApple = isIOS();                // boolean
const isAndroidDevice = isAndroid();    // boolean
```

## Responsive Grid

### Usage
```tsx
import { ResponsiveGrid } from '@/components/ui/Container';

<ResponsiveGrid 
  cols={{ xs: 1, sm: 2, md: 3, lg: 4 }}
  className="gap-8"
>
  <Card />
  <Card />
  <Card />
</ResponsiveGrid>
```

### Grid Patterns
```tsx
// Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns
<ResponsiveGrid cols={{ xs: 1, md: 2, xl: 3 }}>

// Mobile: 1 column, Desktop: 4 columns
<ResponsiveGrid cols={{ xs: 1, lg: 4 }}>

// Evenly sized grid across all breakpoints
<ResponsiveGrid cols={{ xs: 2, sm: 3, md: 4, lg: 6 }}>
```

## Safe Area Support

For devices with notches (iPhone X+) and home indicators:

```tsx
import { SafeAreaWrapper } from '@/components/ui/Container';

<SafeAreaWrapper>
  <nav>Navigation with safe spacing</nav>
</SafeAreaWrapper>
```

### CSS Safe Area
```css
/* Automatic safe area insets */
.safe-area-wrapper {
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}
```

## Tailwind Utilities

### Responsive Classes
```html
<!-- Show/hide by breakpoint -->
<div class="hidden md:block">Visible on tablet+</div>
<div class="block md:hidden">Visible on mobile only</div>

<!-- Responsive spacing -->
<div class="py-4 md:py-8 lg:py-12">
  <!-- 16px mobile, 32px tablet, 48px desktop -->
</div>

<!-- Responsive text sizes -->
<h1 class="text-3xl md:text-5xl lg:text-7xl">
  <!-- Scales with screen size -->
</h1>

<!-- Responsive grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- 1 column mobile, 2 tablet, 3 desktop -->
</div>
```

## Best Practices

### 1. Mobile-First Approach
Always design for mobile first, then enhance for larger screens:
```tsx
// ✅ Good
<div className="text-base md:text-lg lg:text-xl">

// ❌ Bad  
<div className="text-xl lg:text-base">
```

### 2. Use Container Components
Prefer Container components over raw max-width:
```tsx
// ✅ Good
<Container size="lg">
  <h1>Title</h1>
</Container>

// ❌ Bad
<div className="max-w-[1024px] mx-auto px-4">
  <h1>Title</h1>
</div>
```

### 3. Test Across Breakpoints
Always test at these critical widths:
- **375px** - iPhone SE (smallest modern phone)
- **768px** - iPad portrait
- **1024px** - iPad landscape
- **1280px** - Laptop
- **1920px** - Desktop monitor

### 4. Safe Area for PWA/Mobile
For PWA installations and mobile browsers:
```tsx
<SafeAreaWrapper>
  <header className="sticky top-0">...</header>
</SafeAreaWrapper>
```

### 5. Touch-Friendly Targets
Ensure interactive elements are at least 44px × 44px on touch devices:
```tsx
const isMobile = useIsMobile();

<button className={isMobile ? 'h-12 min-w-12' : 'h-10'}>
  Tap me
</button>
```

## Examples

### Responsive Hero Section
```tsx
<Section containerSize="xl" className="py-20 md:py-32 lg:py-40">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
    <div>
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
        Hero Title
      </h1>
      <p className="mt-4 text-lg md:text-xl">
        Description text
      </p>
    </div>
    <div className="hidden lg:block">
      {/* Image visible on desktop only */}
    </div>
  </div>
</Section>
```

### Responsive Feature Cards
```tsx
<Section containerSize="lg">
  <ResponsiveGrid cols={{ xs: 1, sm: 2, lg: 3 }}>
    <FeatureCard />
    <FeatureCard />
    <FeatureCard />
  </ResponsiveGrid>
</Section>
```

### Mobile Navigation
```tsx
function Header() {
  const isMobile = useIsMobile();
  
  return (
    <header className="sticky top-0 safe-area-wrapper">
      <Container>
        {isMobile ? <MobileMenu /> : <DesktopNav />}
      </Container>
    </header>
  );
}
```

## Resources
- [Tailwind Responsive Design](https://tailwindcss.com/docs/responsive-design)
- [CSS Safe Area](https://webkit.org/blog/7929/designing-websites-for-iphone-x/)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
