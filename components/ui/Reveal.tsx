'use client';

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';

/** useLayoutEffect warns during SSR; fall back to useEffect on the server. */
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * Fades content up once as it scrolls into view (PRD §21 — subtle only).
 *
 * The fade is purely additive: the server renders every child *visible*, and
 * JS only hides an element if it is still off-screen after hydration. So a
 * visitor whose JS is slow, blocked or broken sees the whole page rather than
 * a column of blank sections, and content already on screen never blinks.
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
  // `armed` = JS has taken over and this element started off-screen.
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const node = ref.current;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!node || reduced || typeof IntersectionObserver === 'undefined') return;

    // Already in view on load — leave it alone rather than hide then re-show it.
    if (node.getBoundingClientRect().top < window.innerHeight) return;

    setArmed(true);
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

  const hidden = armed && !shown;

  return (
    <div
      ref={ref}
      className={`motion-safe:transition-[opacity,transform] motion-safe:duration-700 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] ${
        hidden ? 'opacity-0 motion-safe:translate-y-3' : 'opacity-100 motion-safe:translate-y-0'
      } ${className}`}
      style={{ transitionDelay: hidden ? '0ms' : `${delay}ms` }}
    >
      {children}
    </div>
  );
}
