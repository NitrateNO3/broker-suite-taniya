import type { ReactNode } from 'react';
import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { Container } from '@/components/ui/Section';
import { breadcrumbSchema } from '@/lib/schema';

export type Crumb = { name: string; path: string };

/** Consistent page-level header for every non-home page. */
export function PageHeader({
  eyebrow,
  title,
  body,
  children,
  /** Trail below Home, ending with this page. Renders visibly and as BreadcrumbList. */
  breadcrumbs,
  /** 'danger' tints the header red, for destructive pages. */
  tone = 'brand',
  /** Tighter padding and a smaller title, for pages that are mostly a form. */
  compact = false,
}: {
  eyebrow?: string;
  title: string;
  body?: ReactNode;
  children?: ReactNode;
  breadcrumbs?: Crumb[];
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
          {breadcrumbs && (
            <nav aria-label="Breadcrumb" className="mb-5">
              <ol className="flex flex-wrap items-center gap-1.5 text-xs text-ink-500">
                {[{ name: 'Home', path: '/' }, ...breadcrumbs].map((crumb, i, all) => (
                  <li key={crumb.path} className="flex items-center gap-1.5">
                    {i > 0 && <span aria-hidden="true">/</span>}
                    {i === all.length - 1 ? (
                      <span aria-current="page" className="text-ink-700">
                        {crumb.name}
                      </span>
                    ) : (
                      <Link href={crumb.path} className="rounded hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
                        {crumb.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ol>
              <JsonLd data={breadcrumbSchema(breadcrumbs)} />
            </nav>
          )}
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
