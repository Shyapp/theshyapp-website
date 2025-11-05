/**
 * Parallax Animation Utilities
 * Helper functions for calculating parallax transforms and animations
 */

import type { ParallaxConfig, ScrollProgress } from './types';

/**
 * Calculate parallax offset based on scroll progress
 */
export function calculateParallaxOffset(
  progress: number,
  config: ParallaxConfig
): number {
  const { speed, offset = 0, easing = 'linear' } = config;
  
  // Apply easing function
  const easedProgress = applyEasing(progress, easing);
  
  // Calculate offset
  return offset + (easedProgress * speed * 100);
}

/**
 * Apply easing function to progress value
 */
export function applyEasing(
  t: number,
  easing: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut'
): number {
  switch (easing) {
    case 'linear':
      return t;
    case 'easeIn':
      return t * t;
    case 'easeOut':
      return t * (2 - t);
    case 'easeInOut':
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    default:
      return t;
  }
}

/**
 * Get transform CSS string for parallax effect
 */
export function getParallaxTransform(
  progress: number,
  config: ParallaxConfig
): string {
  const offset = calculateParallaxOffset(progress, config);
  
  switch (config.direction) {
    case 'up':
      return `translateY(-${offset}px)`;
    case 'down':
      return `translateY(${offset}px)`;
    case 'left':
      return `translateX(-${offset}px)`;
    case 'right':
      return `translateX(${offset}px)`;
    default:
      return 'none';
  }
}

/**
 * Interpolate between two values based on progress
 */
export function interpolate(
  from: number,
  to: number,
  progress: number
): number {
  return from + (to - from) * progress;
}

/**
 * Clamp value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Normalize scroll position to 0-1 range
 */
export function normalizeScroll(
  scrollY: number,
  startY: number,
  endY: number
): number {
  if (endY <= startY) return 0;
  return clamp((scrollY - startY) / (endY - startY), 0, 1);
}

/**
 * Get current active scene based on scroll progress
 */
export function getActiveScene(
  progress: number,
  scenes: Array<{ startProgress: number; endProgress: number; id: string }>
): string | null {
  for (const scene of scenes) {
    if (progress >= scene.startProgress && progress <= scene.endProgress) {
      return scene.id;
    }
  }
  return null;
}
