import type { ReactNode } from 'react';
import { Container } from '@/components/ui/Section';

/** Consistent page-level header for every non-home page. */
export function PageHeader({
  eyebrow,
  title,
  body,
  children,
}: {
  eyebrow?: string;
  title: string;
  body?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="relative overflow-hidden border-b border-ink-100 bg-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(48rem_24rem_at_50%_-30%,theme(colors.brand.50),transparent_70%)]"
      />
      <Container className="relative py-14 sm:py-16 lg:py-20">
        <div className="max-w-3xl">
          {eyebrow && (
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">{eyebrow}</p>
          )}
          <h1 className="text-display-md font-bold text-ink-950">{title}</h1>
          {body && <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-500 sm:text-lg">{body}</p>}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </Container>
    </div>
  );
}
