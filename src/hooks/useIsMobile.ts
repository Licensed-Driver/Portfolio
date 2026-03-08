import { useLayoutEffect, useState } from 'react';

// Custom hook to check if the screen width is less than 768, which is what I normally use to check if a screen is mobile with CSS and stuff
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);

  useLayoutEffect(() => {
    const checkIsMobile = () => (setIsMobile(window.innerWidth < 768));
    checkIsMobile();

    const observer = new ResizeObserver(() => {
        setIsMobile(window.innerWidth < 768);
    })

    observer.observe(document.body);
  }, []);

  return isMobile;
}
