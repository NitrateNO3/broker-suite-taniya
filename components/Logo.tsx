import { site } from '@/config/site';

type LogoProps = {
  /** 'dark' = for light backgrounds, 'light' = for dark backgrounds. */
  variant?: 'dark' | 'light';
  /** Show the "REAL ESTATE CRM" descriptor beneath the wordmark. */
  withTagline?: boolean;
  className?: string;
};

/**
 * The BrokrSuite lockup: violet tile mark + two-tone wordmark.
 * Only the wordmark's first half swaps colour between the light and dark
 * lockups — the mark and the "Suite" accent stay exactly as supplied.
 */
export function Logo({ variant = 'dark', withTagline = false, className = '' }: LogoProps) {
  const wordColor = variant === 'light' ? 'text-white' : 'text-ink-950';
  const taglineColor = variant === 'light' ? 'text-ink-400' : 'text-ink-500';

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-9 w-9 shrink-0" />
      <span className="flex flex-col justify-center leading-none">
        <span className={`text-[1.0625rem] font-bold tracking-[-0.02em] ${wordColor}`}>
          Brokr<span className="text-brand-500">Suite</span>
        </span>
        {withTagline && (
          <span className={`mt-1 text-[0.5625rem] font-medium uppercase tracking-[0.18em] ${taglineColor}`}>
            {site.tagline}
          </span>
        )}
      </span>
    </span>
  );
}

/** The tile mark on its own — used for the favicon, app icons and tight spaces. */
export function LogoMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} role="img" aria-label={`${site.name} logo`}>
      <rect width="48" height="48" rx="13" fill="#4F46E5" />
      {/* Left bar */}
      <rect x="10.5" y="24" width="6.4" height="12" rx="1.6" fill="#fff" />
      {/* Centre spire — the growth arrow */}
      <path d="M24 9.2l4.9 7.8h-9.8L24 9.2z" fill="#fff" />
      <rect x="20.8" y="16" width="6.4" height="20" rx="1.6" fill="#fff" />
      {/* Right bar */}
      <rect x="31.1" y="27.5" width="6.4" height="8.5" rx="1.6" fill="#fff" />
      {/* Accent dot */}
      <circle cx="34.6" cy="13.4" r="3.3" fill="#A5B4FC" />
    </svg>
  );
}
