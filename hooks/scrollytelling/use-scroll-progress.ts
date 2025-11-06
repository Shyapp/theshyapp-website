import { useEffect, useState } from 'react';

/**
 * Hook to track scroll progress through the page
 * Returns a value from 0 to 1 representing scroll position
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollHeight > 0 ? window.scrollY / scrollHeight : 0);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return progress; // 0..1
}
