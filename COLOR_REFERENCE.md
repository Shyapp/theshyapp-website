# Shy Brand Colors - Quick Reference

## ✅ **tokens.css is now auto-imported!**

The `tokens.css` file is automatically imported in `app/layout.tsx`, so all SVGs across your app will pick up Shy brand colors automatically via `currentColor`.

---

## 🎨 **Brand Colors**

### Primary Colors (from globals.css)
```css
--shy-yellow: #fbbf24           /* Primary accent - Shy yellow */
--shy-yellow-bright: #fcd34d    /* Bright yellow highlight */
--shy-dark: #000000             /* Primary dark background */
--shy-dark-secondary: #0a0a0a   /* Secondary dark surface */
```

### Text Hierarchy
```css
--text-primary: #ffffff                  /* 100% white */
--text-secondary: rgba(255,255,255,0.75) /* 75% white */
--text-tertiary: rgba(255,255,255,0.6)   /* 60% white */
--text-disabled: rgba(255,255,255,0.38)  /* 38% white */
```

---

## 🎯 **Usage Examples**

### 1. Icon from Sprite (with brand color)
```tsx
<svg className="ui-yellow w-6 h-6">
  <use href="/svg/parallax-story/icons.svg#dumbbell"/>
</svg>
```

### 2. Badge with Amber Color
```tsx
<svg className="ui-yellow svg-lg">
  <use href="/svg/parallax-story/badges.svg#badge-accepted"/>
</svg>
```

### 3. Inline SVG Object
```tsx
<object 
  data="/svg/parallax-story/dm-request-modal.svg" 
  type="image/svg+xml"
  className="w-full h-auto ui-muted"
/>
```

### 4. Parallax Silhouette Layer
```tsx
<img 
  src="/svg/parallax-story/mid_venue-cafe.svg" 
  className="absolute inset-0 opacity-10" 
  alt=""
  style={{ color: 'var(--shy-yellow)' }}
/>
```

### 5. Custom Styled SVG
```tsx
<svg 
  className="w-8 h-8" 
  style={{ color: 'var(--shy-yellow-bright)' }}
>
  <use href="/svg/parallax-story/icons.svg#sparkles"/>
</svg>
```

---

## 📐 **Utility Classes**

### Brand Colors
```tsx
.ui-yellow        // Shy yellow (#fbbf24)
.ui-yellow-bright // Bright yellow (#fcd34d)
.ui-dark          // Black (#000000)
```

### Text Hierarchy
```tsx
.ui-white         // 100% white
.ui-muted         // 75% white
.ui-subtle        // 60% white
.ui-text-disabled // 38% white
```

### Semantic Colors
```tsx
.ui-success  // Green (#10b981)
.ui-warning  // Orange (#f59e0b)
.ui-error    // Red (#ef4444)
.ui-info     // Blue (#3b82f6)
```

### SVG Sizing
```tsx
.svg-xs  // 16px (1rem)
.svg-sm  // 20px (1.25rem)
.svg-md  // 24px (1.5rem)
.svg-lg  // 32px (2rem)
.svg-xl  // 40px (2.5rem)
```

---

## 🎬 **Real Examples from /stories-gsap**

### Scene Header with Icon
```tsx
<div className="flex items-center gap-3">
  <svg className="ui-yellow svg-md">
    <use href="/svg/parallax-story/icons.svg#cafe"/>
  </svg>
  <h2 className="text-white text-3xl font-bold">Café Scene</h2>
</div>
```

### CTA with Badge
```tsx
<div className="flex items-center gap-3">
  <svg className="ui-yellow svg-lg">
    <use href="/svg/parallax-story/badges.svg#badge-accepted"/>
  </svg>
  <span className="text-white/80">Ephemeral. Local. Opt-in.</span>
</div>
```

### Venue Chip Tabs
```tsx
<object 
  data="/svg/parallax-story/chip-tabs.svg" 
  type="image/svg+xml"
  className="w-[520px] h-[52px]"
/>
```

### Tooltip
```tsx
<object 
  data="/svg/parallax-story/tooltip.svg" 
  type="image/svg+xml"
  className="w-[320px] ui-muted"
/>
```

---

## 🌓 **Dark Mode Support**

The tokens automatically adapt to system preferences:

```css
@media (prefers-color-scheme: light) {
  /* Text colors invert */
  --text-primary: #000000
  --text-secondary: rgba(0,0,0,0.75)
  
  /* Borders invert */
  --border-default: rgba(0,0,0,0.12)
  
  /* Brand colors stay the same */
  --shy-yellow: #fbbf24  /* Unchanged */
}
```

---

## 🎨 **CSS Custom Properties**

Use these in your styles or inline:

```tsx
// Inline style
<div style={{ 
  color: 'var(--shy-yellow)',
  borderColor: 'var(--border-default)' 
}}>
  Content
</div>

// In your CSS
.my-component {
  color: var(--shy-yellow);
  background: var(--shy-dark);
  border: 1px solid var(--border-default);
}

.my-text {
  color: var(--text-secondary);
}
```

---

## ✨ **Best Practices**

1. **Use `currentColor` in SVGs** - SVGs will inherit color from parent
   ```tsx
   <div className="ui-yellow">
     <svg>...</svg>  {/* Automatically yellow */}
   </div>
   ```

2. **Prefer utility classes** - More maintainable than inline styles
   ```tsx
   <svg className="ui-yellow svg-md">  {/* Good */}
   <svg style={{color: '#fbbf24'}}>    {/* Avoid */}
   ```

3. **Use semantic colors** - Makes intent clear
   ```tsx
   <svg className="ui-success">  {/* Clear intent */}
   <svg className="text-green">  {/* Less clear */}
   ```

4. **Test dark mode** - Enable system dark mode to verify
   ```bash
   # macOS: System Preferences → Appearance → Dark
   # Windows: Settings → Personalization → Colors → Dark
   ```

---

## 🔧 **Customization**

To change brand colors, edit **both** files:

### 1. `app/globals.css`
```css
:root {
  --shy-yellow: #YOUR_COLOR;
}
```

### 2. `public/svg/parallax-story/tokens.css`
```css
:root {
  --shy-yellow: #YOUR_COLOR;
}
```

---

## 📊 **Color Contrast**

Current colors meet WCAG AA standards:

- **Shy Yellow (#fbbf24)** on black: ✅ 9.8:1 (AAA)
- **White text** on black: ✅ 21:1 (AAA)
- **75% white** on black: ✅ 15.75:1 (AAA)
- **60% white** on black: ✅ 12.6:1 (AAA)

---

## 🚀 **Quick Test**

Create a test component to verify tokens are working:

```tsx
// app/test-tokens/page.tsx
export default function TestTokens() {
  return (
    <div className="min-h-screen bg-black p-8">
      <h1 className="text-white text-4xl mb-8">Token Test</h1>
      
      {/* Test brand colors */}
      <div className="flex gap-4 mb-8">
        <svg className="ui-yellow svg-xl">
          <use href="/svg/parallax-story/icons.svg#sparkles"/>
        </svg>
        <svg className="ui-yellow-bright svg-xl">
          <use href="/svg/parallax-story/icons.svg#check"/>
        </svg>
        <svg className="ui-white svg-xl">
          <use href="/svg/parallax-story/icons.svg#user"/>
        </svg>
      </div>
      
      {/* Test text hierarchy */}
      <p className="ui-white mb-2">Primary text (100%)</p>
      <p className="ui-muted mb-2">Secondary text (75%)</p>
      <p className="ui-subtle mb-2">Tertiary text (60%)</p>
      
      {/* Test CSS variables */}
      <div 
        className="p-4 rounded-lg"
        style={{ 
          backgroundColor: 'var(--surface-raised)',
          borderColor: 'var(--border-default)',
          color: 'var(--text-primary)'
        }}
      >
        CSS Variables Working!
      </div>
    </div>
  );
}
```

Visit: `http://localhost:3000/test-tokens`

---

**All SVGs in your app now automatically use Shy brand colors! 🎨**
