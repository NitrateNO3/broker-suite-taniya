import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { PageHeader } from '@/components/PageHeader';
import { Pricing } from '@/components/sections/Pricing';
import { CTA } from '@/components/sections/CTA';
import { Container, Section, SectionHeading } from '@/components/ui/Section';

export const metadata: Metadata = pageMetadata({
  title: 'Pricing',
  description:
    'BrokerSuite pricing plans for individual brokers, growing real estate businesses and agencies. Contact us for current plans.',
  path: '/pricing/',
});

const pricingFaqs = [
  {
    q: 'Can I change plans later?',
    a: 'Yes. You can move between plans as your team grows — talk to us and we will move your account across.',
  },
  {
    q: 'Do you offer a plan for a single broker?',
    a: 'Yes. The Starter plan is built for individual brokers working on their own.',
  },
  {
    q: 'What happens to my data if I stop using BrokerSuite?',
    a: 'Your data stays yours. Contact us before closing your account and we will provide an export of your properties, leads and clients.',
  },
  {
    q: 'Do you charge per user?',
    a: 'Plan structure and per-user pricing are being finalized. Contact us and we will confirm the details for your team size.',
  },
];

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title="Simple plans for every size of real estate business"
        body="Start on your own, or roll BrokerSuite out across a full agency. Pricing is being finalized — get in touch and we will walk you through the current plans."
      />

      <Pricing tone="default" compactTop />

      <Section tone="muted">
        <Container>
          <SectionHeading eyebrow="Pricing FAQ" title="Questions about plans" />
          <div className="mx-auto mt-10 max-w-3xl divide-y divide-ink-200 border-y border-ink-200">
            {pricingFaqs.map((faq) => (
              <details key={faq.q} className="group">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 [&::-webkit-details-marker]:hidden">
                  <h3 className="text-base font-semibold text-ink-950">{faq.q}</h3>
                  <span
                    aria-hidden="true"
                    className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-ink-600 ring-1 ring-ink-200 transition-transform duration-200 group-open:rotate-45 group-open:bg-brand-600 group-open:text-white group-open:ring-brand-600"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-3.5 w-3.5">
                      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                    </svg>
                  </span>
                </summary>
                <p className="max-w-prose pb-6 pr-10 text-[0.9375rem] leading-relaxed text-ink-500">{faq.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </Section>

      <CTA />
    </>
  );
}
