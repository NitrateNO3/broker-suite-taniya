'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Section';
import { mainNav } from '@/config/nav';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Close the mobile menu on navigation.
  useEffect(() => setOpen(false), [pathname]);

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
              aria-label={`BrokerSuite — home`}
            >
              <Logo />
            </Link>

            {/* Desktop navigation */}
            <ul className="hidden items-center gap-0.5 lg:flex">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    className={`rounded-lg px-3 py-2 text-[0.9375rem] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                      isActive(item.href)
                        ? 'text-brand-600'
                        : 'text-ink-600 hover:bg-ink-50 hover:text-ink-950'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="hidden items-center gap-2.5 lg:flex">
              <Button href="/#download" variant="secondary" size="sm">
                Download App
              </Button>
              <Button href="/contact/" size="sm" data-analytics="get-started-click">
                Get Started
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
                  <Link
                    href={item.href}
                    className="flex items-center justify-between border-b border-ink-100 py-4 text-base font-medium text-ink-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                  >
                    {item.label}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4 text-ink-300" aria-hidden="true">
                      <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col gap-3 pb-8">
              <Button href="/contact/" size="lg" className="w-full">
                Get Started
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
