import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { JsonLd } from '@/components/JsonLd';
import { PageHeader } from '@/components/PageHeader';
import { StoreButtons } from '@/components/StoreButtons';
import { AppShot } from '@/components/mockups/AppShot';
import { PhoneFrame } from '@/components/mockups/PhoneFrame';
import { CTA } from '@/components/sections/CTA';
import { FAQ } from '@/components/sections/FAQ';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { Container, Section, SectionHeading } from '@/components/ui/Section';
import { landingPages, landingPath, type LandingSlug } from '@/config/landing';
import { demoCta, features } from '@/config/site';
import { softwareApplicationSchema } from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';

export function landingMetadata(slug: LandingSlug): Metadata {
  const page = landingPages[slug];
  return pageMetadata({ title: page.title, description: page.description, path: landingPath(slug) });
}

function Check() {
  return (
    <span
      aria-hidden="true"
      className="mt-[0.1875rem] inline-flex h-[1.125rem] w-[1.125rem] shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="h-2.5 w-2.5">
        <path d="M4 12.5l5 5 11-11" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

/**
 * One template for every SEO landing page, assembled from the site's existing
 * sections so the pages share the established design. Content lives in
 * config/landing.ts.
 */
export function LandingPage({ slug }: { slug: LandingSlug }) {
  const page = landingPages[slug];
  const pageFeatures = page.featureIds
    .map((id) => features.find((f) => f.id === id))
    .filter((f): f is (typeof features)[number] => Boolean(f));
  const isApp = slug === 'real-estate-crm-app';

  return (
    <>
      <PageHeader
        eyebrow={page.eyebrow}
        title={page.h1}
        body={page.intro}
        breadcrumbs={[{ name: page.name, path: landingPath(slug) }]}
      >
        {isApp ? (
          <StoreButtons />
        ) : (
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href={demoCta.href} size="lg" data-analytics="demo-request">
              {demoCta.label}
            </Button>
            <Button href="/features/" size="lg" variant="secondary">
              Explore all features
            </Button>
          </div>
        )}
      </PageHeader>

      {/* Overview, with the genuine app screen that shows it */}
      <Section compactTop>
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className={page.screen ? 'lg:col-span-7' : 'lg:col-span-12'}>
              <h2 className="text-display-sm font-bold text-ink-950">{page.overview.heading}</h2>
              <div className="mt-6 space-y-5">
                {page.overview.paragraphs.map((p) => (
                  <p key={p.slice(0, 40)} className="max-w-prose text-base leading-relaxed text-ink-600 sm:text-[1.0625rem]">
                    {p}
                  </p>
                ))}
              </div>
            </div>
            {page.screen && (
              <figure className="lg:col-span-5">
                <Reveal>
                  <div className="relative flex justify-center rounded-card-lg bg-ink-50 px-6 py-10 ring-1 ring-inset ring-ink-200/70">
                    <PhoneFrame className="relative max-w-[15rem]">
                      <AppShot screen={page.screen} />
                    </PhoneFrame>
                  </div>
                </Reveal>
                {page.screenCaption && (
                  <figcaption className="mt-3 text-center text-sm leading-relaxed text-ink-500">
                    {page.screenCaption}
                  </figcaption>
                )}
              </figure>
            )}
          </div>
        </Container>
      </Section>

      {/* Benefits */}
      <Section tone="muted">
        <Container>
          <SectionHeading title={page.benefits.heading} body={page.benefits.body} />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-14">
            {page.benefits.items.map((item, i) => (
              <Reveal key={item.title} delay={i * 60}>
                <div className="h-full rounded-card border border-ink-200/70 bg-white p-6">
                  <h3 className="text-base font-semibold text-ink-950">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* The confirmed modules behind this page, with their real capability lists */}
      <Section>
        <Container>
          <SectionHeading eyebrow="Features" title={page.featuresHeading} />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14">
            {pageFeatures.map((feature) => (
              <div key={feature.id} className="flex h-full flex-col rounded-card-lg border border-ink-200/70 bg-white p-6 sm:p-7">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white">
                    <Icon name={feature.icon} className="h-[1.125rem] w-[1.125rem]" />
                  </span>
                  <h3 className="text-lg font-bold text-ink-950">{feature.title}</h3>
                </div>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-500">{feature.summary}</p>
                <ul className="mt-5 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                  {feature.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5">
                      <Check />
                      <span className="text-sm leading-snug text-ink-700">{point}</span>
                    </li>
                  ))}
                </ul>
                {feature.page && feature.page.href !== landingPath(slug) && (
                  <Link
                    href={feature.page.href}
                    className="mt-auto inline-flex items-center gap-1.5 rounded pt-5 text-sm font-semibold text-brand-600 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                  >
                    {feature.page.label}
                    <span aria-hidden="true">→</span>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Workflow */}
      <Section tone="muted">
        <Container>
          <SectionHeading title={page.workflow.heading} />
          <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-6">
            {page.workflow.items.map((step, i) => (
              <li key={step.title}>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-base font-semibold text-ink-950">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{step.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <FAQ items={page.faqs} title={`${page.name}: common questions`} />

      {/* Related pages — contextual internal links */}
      <Section tone="muted" className="!pt-14 !pb-14">
        <Container>
          <h2 className="text-lg font-bold text-ink-950">Related solutions</h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-3">
            {page.related.map((rel) => (
              <li key={rel}>
                <Link
                  href={landingPath(rel)}
                  className="group flex h-full flex-col rounded-card border border-ink-200/70 bg-white p-5 transition hover:border-brand-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                >
                  <span className="text-base font-semibold text-ink-950 group-hover:text-brand-700">
                    {landingPages[rel].name}
                  </span>
                  <span className="mt-1.5 text-sm leading-relaxed text-ink-500">{landingPages[rel].description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CTA />
      {isApp && <JsonLd data={softwareApplicationSchema} />}
    </>
  );
}
