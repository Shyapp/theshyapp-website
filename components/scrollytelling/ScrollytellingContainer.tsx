/**
 * ScrollytellingContainer Component
 * Main container for the scrollytelling experience
 */

'use client';

import React from 'react';
import type { ScrollytellingConfig } from '@/lib/scrollytelling/types';
import { useScrollProgress } from '@/hooks/scrollytelling';
import { ScrollytellingScene } from './ScrollytellingScene';

interface ScrollytellingContainerProps {
  config: ScrollytellingConfig;
  children?: React.ReactNode;
}

export function ScrollytellingContainer({ 
  config, 
  children 
}: ScrollytellingContainerProps) {
  const { scrollProgress } = useScrollProgress();

  return (
    <div className="scrollytelling-container relative">
      {/* Debug Progress Indicator */}
      {config.showProgress && (
        <div className="fixed top-4 right-4 z-50 bg-black/80 text-white px-4 py-2 rounded-lg font-mono text-sm">
          Progress: {(scrollProgress * 100).toFixed(1)}%
        </div>
      )}

      {/* Render Scenes */}
      {config.scenes.map((scene) => (
        <ScrollytellingScene key={scene.id} scene={scene} />
      ))}

      {/* Custom Content */}
      {children}
    </div>
  );
}
