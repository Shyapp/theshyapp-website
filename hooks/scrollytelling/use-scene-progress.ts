/**
 * useSceneProgress Hook
 * Tracks progress within a specific scene (0-1)
 */

'use client';

import { useMemo } from 'react';
import { normalizeScroll } from '@/lib/scrollytelling/animations';
import { useScrollProgress } from './use-scroll-progress';

export function useSceneProgress(
  startProgress: number,
  endProgress: number
) {
  const { scrollProgress } = useScrollProgress();

  const sceneProgress = useMemo(() => {
    return normalizeScroll(scrollProgress, startProgress, endProgress);
  }, [scrollProgress, startProgress, endProgress]);

  const isActive = useMemo(() => {
    return scrollProgress >= startProgress && scrollProgress <= endProgress;
  }, [scrollProgress, startProgress, endProgress]);

  return {
    sceneProgress,
    isActive,
    globalProgress: scrollProgress,
  };
}
