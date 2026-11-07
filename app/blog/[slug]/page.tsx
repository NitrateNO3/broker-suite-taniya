import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/JsonLd';
import { PageHeader } from '@/components/PageHeader';
import { Prose } from '@/components/Prose';
import { CTA } from '@/components/sections/CTA';
import { Button } from '@/components/ui/Button';
import { Container, Section } from '@/components/ui/Section';
import { postPath, posts } from '@/config/blog';
import { landingPages, landingPath } from '@/config/landing';
import { demoCta } from '@/config/site';
import { articleSchema } from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return posts.map((post) => ({ slug: post.slug }));
}

const find = (slug: string) => posts.find((post) => post.slug === slug);

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const post = find((await params).slug);
  if (!post) return {};
  const meta = pageMetadata({
    title: post.seoTitle ?? post.title,
    description: post.description,
    path: postPath(post.slug),
  });
  return {
    ...meta,
    openGraph: { ...meta.openGraph, type: 'article', publishedTime: post.published, modifiedTime: post.updated },
  };
}

const dateFormat = new Intl.DateTimeFormat('en', { day: 'numeric', month: 'long', year: 'numeric' });

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const post = find((await params).slug);
  if (!post) notFound();
  const product = landingPages[post.supports];
  const others = posts.filter((p) => p.slug !== post.slug);

  return (
    <>
      <PageHeader
        eyebrow="Guide"
        title={post.title}
        body={post.description}
        breadcrumbs={[
          { name: 'Blog', path: '/blog/' },
          { name: post.title, path: postPath(post.slug) },
        ]}
      >
        <p className="text-sm text-ink-500">
          By the BrokrSuite team ·{' '}
          <time dateTime={post.published}>{dateFormat.format(new Date(post.published))}</time>
          {post.updated !== post.published && (
            <>
              {' '}· Updated <time dateTime={post.updated}>{dateFormat.format(new Date(post.updated))}</time>
            </>
          )}{' '}
          · {post.readingMinutes} min read
        </p>
      </PageHeader>

      <Section compactTop>
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <article className="lg:col-span-8">
              <Prose blocks={post.body} />
            </article>

            <aside className="lg:col-span-4">
              <div className="rounded-card-lg border border-ink-200/70 bg-ink-50 p-6 lg:sticky lg:top-24">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">{product.eyebrow}</p>
                <p className="mt-2 text-base font-bold text-ink-950">{product.h1}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{product.description}</p>
                <div className="mt-5 flex flex-col gap-2.5">
                  <Button href={landingPath(post.supports)} variant="secondary">
                    See how BrokrSuite helps
                  </Button>
                  <Button href={demoCta.href} data-analytics="demo-request">
                    {demoCta.label}
                  </Button>
                </div>
              </div>
            </aside>
          </div>

          {others.length > 0 && (
            <div className="mt-16 border-t border-ink-100 pt-10">
              <h2 className="text-lg font-bold text-ink-950">More guides</h2>
              <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                {others.map((other) => (
                  <li key={other.slug}>
                    <Link
                      href={postPath(other.slug)}
                      className="block h-full rounded-card border border-ink-200/70 bg-white p-5 transition hover:border-brand-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                    >
                      <span className="text-base font-semibold text-ink-950">{other.title}</span>
                      <span className="mt-1.5 block text-sm leading-relaxed text-ink-500">{other.description}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Container>
      </Section>

      <CTA />
      <JsonLd
        data={articleSchema({
          title: post.title,
          description: post.description,
          path: postPath(post.slug),
          published: post.published,
          updated: post.updated,
        })}
      />
    </>
  );
}
