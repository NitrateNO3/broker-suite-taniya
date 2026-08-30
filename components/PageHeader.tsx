import type { ReactNode } from 'react';
import { Container } from '@/components/ui/Section';

/** Consistent page-level header for every non-home page. */
export function PageHeader({
  eyebrow,
  title,
  body,
  children,
  /** 'danger' tints the header red, for destructive pages. */
  tone = 'brand',
  /** Tighter padding and a smaller title, for pages that are mostly a form. */
  compact = false,
}: {
  eyebrow?: string;
  title: string;
  body?: ReactNode;
  children?: ReactNode;
  tone?: 'brand' | 'danger';
  compact?: boolean;
}) {
  const danger = tone === 'danger';
  return (
    <div className="relative overflow-hidden border-b border-ink-100 bg-white">
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 ${
          danger
            ? 'bg-[radial-gradient(48rem_24rem_at_50%_-30%,theme(colors.red.100),transparent_70%)]'
            : 'bg-[radial-gradient(48rem_24rem_at_50%_-30%,theme(colors.brand.50),transparent_70%)]'
        }`}
      />
      <Container className={`relative ${compact ? 'py-6 sm:py-8' : 'py-14 sm:py-16 lg:py-20'}`}>
        <div className="max-w-3xl">
          {eyebrow && (
            <p
              className={`mb-3 text-xs font-semibold uppercase tracking-[0.14em] ${
                danger ? 'text-red-600' : 'text-brand-600'
              }`}
            >
              {eyebrow}
            </p>
          )}
          <h1 className={`font-bold text-ink-950 ${compact ? 'text-display-sm' : 'text-display-md'}`}>
            {title}
          </h1>
          {body && (
            <p
              className={`max-w-2xl leading-relaxed text-ink-500 ${
                compact ? 'mt-3 text-[0.9375rem]' : 'mt-5 text-base sm:text-lg'
              }`}
            >
              {body}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </Container>
    </div>
  );
}
