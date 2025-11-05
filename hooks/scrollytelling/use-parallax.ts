/**
 * useParallax Hook
 * Calculates parallax transform values based on scroll progress
 */

'use client';

import { useMemo } from 'react';
import type { ParallaxConfig } from '@/lib/scrollytelling/types';
import { getParallaxTransform } from '@/lib/scrollytelling/animations';
import { useScrollProgress } from './use-scroll-progress';

export function useParallax(config: ParallaxConfig) {
  const { scrollProgress } = useScrollProgress();

  const transform = useMemo(() => {
    return getParallaxTransform(scrollProgress, config);
  }, [scrollProgress, config]);

  const style = useMemo(() => {
    return {
      transform,
      willChange: 'transform',
    };
  }, [transform]);

  return {
    transform,
    style,
    progress: scrollProgress,
  };
}
