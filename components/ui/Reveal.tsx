'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * Fades content up once as it scrolls into view (PRD §21 — subtle only).
 * Respects prefers-reduced-motion, and renders content visible immediately if
 * IntersectionObserver is unavailable, so nothing can get stuck hidden.
 */
export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!node || reduced || typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`motion-safe:transition-[opacity,transform] motion-safe:duration-700 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] ${
        shown ? 'opacity-100 motion-safe:translate-y-0' : 'opacity-0 motion-safe:translate-y-3'
      } ${className}`}
      style={{ transitionDelay: shown ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  );
}
