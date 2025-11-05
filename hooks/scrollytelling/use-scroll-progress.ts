/**
 * useScrollProgress Hook
 * Tracks scroll position and calculates normalized progress (0-1)
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import type { ScrollProgress } from '@/lib/scrollytelling/types';

export function useScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState<ScrollProgress>({
    scrollY: 0,
    scrollProgress: 0,
    viewportHeight: 0,
  });

  const updateProgress = useCallback(() => {
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const maxScroll = documentHeight - viewportHeight;
    
    const progress = maxScroll > 0 ? scrollY / maxScroll : 0;

    setScrollProgress({
      scrollY,
      scrollProgress: Math.min(Math.max(progress, 0), 1),
      viewportHeight,
    });
  }, []);

  useEffect(() => {
    // Initial calculation
    updateProgress();

    // Update on scroll
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, [updateProgress]);

  return scrollProgress;
}
