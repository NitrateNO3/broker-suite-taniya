import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { PageHeader } from '@/components/PageHeader';
import { FreeTrialForm } from '@/components/FreeTrialForm';
import { Container, Section } from '@/components/ui/Section';
import { site } from '@/config/site';

export const metadata: Metadata = pageMetadata({
  title: 'Book a Demo',
  description: `Book a demo of ${site.name}, the real estate CRM app for brokers, agents and agencies. See how it fits your business and get current pricing.`,
  path: '/book-a-demo/',
});

const points = [
  'A walkthrough of BrokrSuite with your own business in mind',
  'Help setting up your properties, leads and team',
  'Answers on pricing and what your business would need',
];

export default function BookDemoPage() {
  return (
    <div className="flex min-h-[calc(100svh-4rem)] flex-col lg:min-h-[calc(100svh-4.5rem)]">
      <PageHeader
        compact
        eyebrow="Book a demo"
        title="Book a demo of BrokrSuite"
        body={`Tell us a little about your business and we will show you how ${site.name} fits it.`}
      />

      <Section compactTop className="flex flex-1 flex-col justify-center !pt-8 !pb-12 sm:!pt-10 sm:!pb-14">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <FreeTrialForm />
            </div>

            <aside className="lg:col-span-5">
              <div className="rounded-card-lg border border-ink-200/70 bg-ink-50 p-6 sm:p-7">
                <h2 className="text-base font-semibold text-ink-950">What happens next</h2>
                <ul className="mt-4 space-y-3">
                  {points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5">
                      <span
                        aria-hidden="true"
                        className="mt-[0.1875rem] inline-flex h-[1.125rem] w-[1.125rem] shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="h-2.5 w-2.5">
                          <path d="M4 12.5l5 5 11-11" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span className="text-[0.9375rem] leading-snug text-ink-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </Container>
      </Section>
    </div>
  );
}
