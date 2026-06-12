import { useEffect, useState } from 'react';

export default function useScrollReveal(options = {}) {
  const [el, setEl] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: options.threshold || 0.1, rootMargin: options.rootMargin || '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [el, options.threshold, options.rootMargin]);

  return [setEl, isVisible];
}