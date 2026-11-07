import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { PageHeader } from '@/components/PageHeader';
import { CTA } from '@/components/sections/CTA';
import { Container, Section } from '@/components/ui/Section';
import Link from 'next/link';
import { contact, legalEntity, site } from '@/config/site';
import { solutionLinks } from '@/config/nav';

export const metadata: Metadata = pageMetadata({
  title: 'About BrokrSuite',
  description: `${site.name} is a real estate CRM app by ${legalEntity} for brokers, agents, property dealers and agencies, available on iPhone and Android.`,
  path: '/about/',
});

/* Only verified product facts: the six core modules, the two app stores and
   the publisher. Claims the app has not been verified to support are left out. */
export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title={`About ${site.name}`}
        body="Real estate CRM software for brokers, agents and agencies."
        breadcrumbs={[{ name: 'About', path: '/about/' }]}
      />

      <Section compactTop>
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <div className="legal-prose">
                <h2>Our Mission</h2>
                <p>
                  Most brokers are not short of deals — they are short of a single place to keep track of them.
                  {' '}{site.name} exists to give real estate brokers, agents, property dealers and agencies one
                  system for the properties they offer and the people looking for one, instead of spreadsheets,
                  notebooks and chat threads.
                </p>

                <h2>What {site.name} does</h2>
                <ul>
                  <li>Property inventory management — listings with photos, details and status</li>
                  <li>Lead management — source, status, assigned agent, notes and history</li>
                  <li>Client management — requirements, budget, preferred locations and history</li>
                  <li>Follow-up management — reminders, upcoming and completed follow-ups</li>
                  <li>Team management — add members and assign leads and properties</li>
                  <li>Business analytics — leads, deals, follow-ups and team performance</li>
                </ul>
                <p>
                  {site.name} is a mobile app, available on the App Store for iPhone and on Google Play for
                  Android.
                </p>

                <h2>Who it is for</h2>
                <ul>
                  {solutionLinks
                    .filter((link) => link.href !== '/real-estate-crm-app/')
                    .map((link) => (
                      <li key={link.href}>
                        <Link href={link.href}>{link.label}</Link>
                      </li>
                    ))}
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
                    ['Product', 'Real estate CRM app'],
                    ['Platforms', 'iPhone and Android'],
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
