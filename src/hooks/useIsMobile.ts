import { useState, useEffect } from 'react';

/**
 * Hook to track whether the viewport width is <= 767px (mobile).
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)');
    
    // Set initial value
    setIsMobile(media.matches);

    const listener = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    media.addEventListener('change', listener);
    return () => {
      media.removeEventListener('change', listener);
    };
  }, []);

  return isMobile;
}
