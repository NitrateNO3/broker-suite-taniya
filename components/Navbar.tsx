'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Section';
import { mainNav, type NavItem } from '@/config/nav';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLUListElement>(null);

  // Close the mobile menu and any open dropdown on navigation.
  useEffect(() => {
    setOpen(false);
    setMenu(null);
  }, [pathname]);

  // Dismiss the dropdown on outside click or Escape.
  useEffect(() => {
    if (!menu) return;
    const onDown = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setMenu(null);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenu(null);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [menu]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll and allow Escape to dismiss while the menu is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const isActive = (href: string) =>
    href.startsWith('/#') ? false : href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b bg-white/85 backdrop-blur-md transition-colors duration-200 ${
          scrolled ? 'border-ink-200' : 'border-transparent'
        }`}
      >
        <Container>
          <nav className="flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]" aria-label="Main">
            <Link
              href="/"
              className="-m-2 rounded-lg p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              aria-label={`BrokrSuite — home`}
            >
              <Logo decorative />
            </Link>

            {/* Desktop navigation */}
            <ul ref={navRef} className="hidden items-center gap-0.5 lg:flex">
              {mainNav.map((item) => {
                const active = isActive(item.href) || item.children?.some((c) => isActive(c.href));
                const linkClass = `rounded-lg px-3 py-2 text-[0.9375rem] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                  active ? 'text-brand-600' : 'text-ink-600 hover:bg-ink-50 hover:text-ink-950'
                }`;

                if (!item.children) {
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={isActive(item.href) ? 'page' : undefined}
                        className={linkClass}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                }

                const expanded = menu === item.label;
                return (
                  <li
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => setMenu(item.label)}
                    onMouseLeave={() => setMenu(null)}
                  >
                    <button
                      type="button"
                      aria-expanded={expanded}
                      aria-haspopup="true"
                      onClick={() => setMenu(expanded ? null : item.label)}
                      className={`inline-flex items-center gap-1.5 ${linkClass}`}
                    >
                      {item.label}
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden="true"
                        className={`h-3.5 w-3.5 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
                      >
                        <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>

                    {expanded && (
                      <ul className="absolute right-0 top-full z-50 w-56 rounded-card border border-ink-200/80 bg-white p-1.5 shadow-lg">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              aria-current={isActive(child.href) ? 'page' : undefined}
                              className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                                child.danger
                                  ? isActive(child.href)
                                    ? 'bg-red-50 text-red-700'
                                    : 'text-red-600 hover:bg-red-50 hover:text-red-700'
                                  : isActive(child.href)
                                    ? 'bg-brand-50 text-brand-700'
                                    : 'text-ink-600 hover:bg-ink-50 hover:text-ink-950'
                              }`}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="hidden items-center gap-2.5 lg:flex">
              <Button href="/#download" variant="secondary" size="sm" className="hidden xl:inline-flex">
                Download App
              </Button>
              <Button href="/free-trial/" size="sm" data-analytics="free-trial-click">
                Book Your Free Trial
              </Button>
            </div>

            {/* Mobile toggle */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-lg text-ink-700 transition-colors hover:bg-ink-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 lg:hidden"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="h-6 w-6">
                {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3.5 7h17M3.5 12h17M3.5 17h17" />}
              </svg>
            </button>
          </nav>
        </Container>
      </header>

      {/* Mobile menu — a dedicated full-width panel, not a squeezed desktop bar.
          Deliberately a sibling of <header>, not a child: the header's
          backdrop-blur would otherwise act as the containing block for this
          fixed panel and collapse it to the header's own height. */}
      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto overscroll-contain border-t border-ink-200 bg-white lg:hidden"
        >
          <Container className="py-4">
            <ul className="flex flex-col">
              {mainNav.map((item) => (
                <li key={item.href}>
                  {item.children ? (
                    /* No collapse on mobile — the group is short, and an
                       always-open list is one tap instead of two. */
                    <div className="border-b border-ink-100 py-4">
                      <span className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-400">
                        {item.label}
                      </span>
                      <ul className="mt-2 flex flex-col">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className="flex items-center justify-between py-2.5 text-base font-medium text-ink-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                            >
                              {child.label}
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4 text-ink-300" aria-hidden="true">
                                <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="flex items-center justify-between border-b border-ink-100 py-4 text-base font-medium text-ink-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                    >
                      {item.label}
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4 text-ink-300" aria-hidden="true">
                        <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col gap-3 pb-8">
              <Button href="/free-trial/" size="lg" className="w-full">
                Book Your Free Trial
              </Button>
              <Button href="/#download" variant="secondary" size="lg" className="w-full">
                Download App
              </Button>
            </div>
          </Container>
        </div>
      )}
    </>
  );
}
