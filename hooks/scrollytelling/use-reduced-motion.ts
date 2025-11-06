import { useEffect, useState } from 'react';

/**
 * Hook to detect user's reduced motion preference
 * Honors prefers-reduced-motion media query
 */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const apply = () => setReduced(!!mq.matches);
    apply();
    
    mq.addEventListener?.('change', apply);
    return () => mq.removeEventListener?.('change', apply);
  }, []);

  return reduced;
}
