# Scrollytelling Scene Template

This folder contains individual scene components for the scrollytelling experience.

## Structure

Each scene should be a separate file that exports a React component:

```tsx
// Example: Scene01Intro.tsx
'use client';

import React from 'react';
import { useSceneProgress } from '@/hooks/scrollytelling';

export function Scene01Intro() {
  const { sceneProgress, isActive } = useSceneProgress(0, 0.2);

  return (
    <div className="relative z-10 flex items-center justify-center min-h-screen">
      <div className="text-center max-w-4xl">
        <h2 
          className="text-7xl font-black mb-6"
          style={{ opacity: isActive ? 1 : 0 }}>
          Scene Title
        </h2>
        <p className="text-xl text-white/75">
          Scene description
        </p>
      </div>
    </div>
  );
}
```

## Guidelines

1. Use `useSceneProgress` hook to track scene activation
2. Define start/end progress values (0-1)
3. Apply animations based on `sceneProgress`
4. Keep scenes focused on single narrative beats
5. Use Shy brand colors from the palette

## Naming Convention

- `Scene01Intro.tsx` - First scene
- `Scene02Discovery.tsx` - Second scene
- `Scene03Connection.tsx` - Third scene
- etc.

Populate this folder with your scene components and they'll be imported into the main scrollytelling page.
