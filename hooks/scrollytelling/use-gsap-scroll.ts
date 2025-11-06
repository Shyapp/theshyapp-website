import { useEffect } from 'react';
import { ScrollTrigger, ScrollAnimation } from '@/lib/scrollytelling/gsap-scroll';

/**
 * Hook to register GSAP-like scroll animations
 * Auto-cleans up on unmount
 */
export function useGSAPScroll(animations: ScrollAnimation[], deps: any[] = []) {
  useEffect(() => {
    // Wait for DOM to be ready
    const timer = setTimeout(() => {
      animations.forEach((anim) => ScrollTrigger.create(anim));
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.destroy();
    };
  }, deps);
}
