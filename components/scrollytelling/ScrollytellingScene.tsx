/**
 * ScrollytellingScene Component
 * Renders a single scene with parallax layers and animations
 */

'use client';

import React from 'react';
import type { SceneConfig } from '@/lib/scrollytelling/types';
import { useSceneProgress } from '@/hooks/scrollytelling';
import { ParallaxLayer } from './ParallaxLayer';

interface ScrollytellingSceneProps {
  scene: SceneConfig;
  children?: React.ReactNode;
}

export function ScrollytellingScene({ scene, children }: ScrollytellingSceneProps) {
  const { sceneProgress, isActive } = useSceneProgress(
    scene.startProgress,
    scene.endProgress
  );

  const sceneStyle: React.CSSProperties = {
    position: 'relative',
    minHeight: '100vh',
    width: '100%',
    overflow: 'hidden',
    backgroundColor: scene.backgroundColor || 'transparent',
    opacity: isActive ? 1 : 0.3,
    transition: 'opacity 0.3s ease',
  };

  return (
    <section
      id={scene.id}
      data-scene={scene.id}
      data-active={isActive}
      style={sceneStyle}
      className="relative">
      
      {/* Parallax Layers */}
      {scene.parallaxLayers?.map((layer) => (
        <ParallaxLayer
          key={layer.id}
          layer={layer}
          sceneProgress={sceneProgress}
        />
      ))}

      {/* Scene Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
        {children || (
          <div className="text-center max-w-4xl">
            <h2 className="text-5xl md:text-7xl font-black mb-6">
              {scene.title}
            </h2>
          </div>
        )}
      </div>
    </section>
  );
}
