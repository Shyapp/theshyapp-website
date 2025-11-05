/**
 * ParallaxLayer Component
 * Renders a single parallax layer with configurable scroll effects
 */

'use client';

import React from 'react';
import type { ParallaxLayer as ParallaxLayerType } from '@/lib/scrollytelling/types';
import { useParallax } from '@/hooks/scrollytelling';

interface ParallaxLayerProps {
  layer: ParallaxLayerType;
  sceneProgress?: number;
}

export function ParallaxLayer({ layer, sceneProgress }: ParallaxLayerProps) {
  const { style } = useParallax(layer.parallax);

  const combinedStyle: React.CSSProperties = {
    ...style,
    ...layer.style,
    zIndex: layer.zIndex,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  };

  if (layer.type === 'image' && layer.src) {
    return (
      <div
        id={layer.id}
        className={layer.className}
        style={combinedStyle}>
        <img
          src={layer.src}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  if (layer.type === 'video' && layer.src) {
    return (
      <div
        id={layer.id}
        className={layer.className}
        style={combinedStyle}>
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={layer.poster}
          className="w-full h-full object-cover">
          <source src={layer.src} type="video/webm" />
          {/* Fallback for browsers without WebM support */}
          {layer.poster && (
            <img
              src={layer.poster}
              alt=""
              className="w-full h-full object-cover"
            />
          )}
        </video>
      </div>
    );
  }

  if (layer.type === 'element' && layer.element) {
    return (
      <div
        id={layer.id}
        className={layer.className}
        style={combinedStyle}>
        {layer.element}
      </div>
    );
  }

  return null;
}
