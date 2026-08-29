import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { PageHeader } from '@/components/PageHeader';
import { CTA } from '@/components/sections/CTA';
import { Container, Section } from '@/components/ui/Section';
import { contact, legalEntity, site } from '@/config/site';

export const metadata: Metadata = pageMetadata({
  title: 'About',
  description: `${site.name} is an enterprise real estate brokerage and CRM platform for brokerages, agents and property seekers.`,
  path: '/about/',
});

/* Mission, differentiators and company details are taken from the app's own
   About screen, so the site never describes the product differently. */
export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title={`About ${site.name}`}
        body="Enterprise Real Estate Brokerage & CRM Platform."
      />

      <Section compactTop>
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <div className="legal-prose">
                <h2>Our Mission</h2>
                <p>
                  {site.name} is engineered to empower modern real estate brokerages, agents, and property
                  seekers with seamless multi-tenant workspaces, high-speed verified listings, instant
                  WhatsApp inquiries, and bank-grade data security.
                </p>

                <h2>Why Choose {site.name}?</h2>
                <ul>
                  <li>Isolated Multi-Tenant Workspaces for Brokerages</li>
                  <li>Dynamic Watermarking &amp; Protected Property Media</li>
                  <li>Direct WhatsApp Lead Pipeline &amp; Follow-up Tracker</li>
                  <li>Verified Property Exploration with Rich Filters</li>
                  <li>Comprehensive Employee, Agent &amp; Attendance Management</li>
                </ul>

                <h2>Company &amp; Support</h2>
                <p>{legalEntity}</p>
                <ul>
                  <li>
                    Website: <a href={site.url}>{site.url}</a>
                  </li>
                  <li>
                    Support: <a href={`mailto:${contact.email}`}>{contact.email}</a>
                  </li>
                </ul>
                <p>All rights reserved © 2026 {site.name}</p>
              </div>
            </div>

            <aside className="lg:col-span-5">
              <div className="rounded-card-lg border border-ink-200/70 bg-ink-50 p-6 sm:p-8">
                <h2 className="text-base font-semibold text-ink-950">At a glance</h2>
                <dl className="mt-5 divide-y divide-ink-200 text-sm">
                  {[
                    ['Product', 'Enterprise Real Estate Brokerage & CRM Platform'],
                    ['Version', 'v1.0.0 (Build 1)'],
                    ['Company', legalEntity],
                    ['Support', contact.email],
                  ].map(([term, value]) => (
                    <div
                      key={term}
                      className="flex flex-col gap-1 py-3.5 first:pt-0 last:pb-0 sm:flex-row sm:gap-4"
                    >
                      <dt className="shrink-0 text-ink-500 sm:w-28">{term}</dt>
                      <dd className="font-medium text-ink-800">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      <CTA />
    </>
  );
}
