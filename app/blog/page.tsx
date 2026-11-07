import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/PageHeader';
import { CTA } from '@/components/sections/CTA';
import { Container, Section } from '@/components/ui/Section';
import { postPath, posts } from '@/config/blog';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Real Estate CRM Blog',
  description:
    'Practical guides for real estate brokers, agents and agencies on managing leads, property inventory, follow-ups and teams.',
  path: '/blog/',
});

const dateFormat = new Intl.DateTimeFormat('en', { day: 'numeric', month: 'long', year: 'numeric' });

export default function BlogIndexPage() {
  const sorted = [...posts].sort((a, b) => b.published.localeCompare(a.published));
  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Guides for real estate brokers and agencies"
        body="Practical advice on managing leads, property inventory, follow-ups and teams."
        breadcrumbs={[{ name: 'Blog', path: '/blog/' }]}
      />

      <Section compactTop>
        <Container>
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {sorted.map((post) => (
              <li key={post.slug}>
                <article className="flex h-full flex-col rounded-card-lg border border-ink-200/70 bg-white p-6 transition hover:border-brand-300 hover:shadow-md">
                  <p className="text-xs font-medium text-ink-500">
                    <time dateTime={post.published}>{dateFormat.format(new Date(post.published))}</time> ·{' '}
                    {post.readingMinutes} min read
                  </p>
                  <h2 className="mt-3 text-lg font-bold leading-snug text-ink-950">
                    <Link
                      href={postPath(post.slug)}
                      className="rounded hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-500">{post.description}</p>
                  <Link
                    href={postPath(post.slug)}
                    className="mt-5 inline-flex items-center gap-1.5 rounded text-sm font-semibold text-brand-600 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                    aria-hidden="true"
                    tabIndex={-1}
                  >
                    Read the guide →
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CTA />
    </>
  );
}
