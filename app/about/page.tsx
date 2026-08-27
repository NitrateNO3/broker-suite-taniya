import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { PageHeader } from '@/components/PageHeader';
import { CTA } from '@/components/sections/CTA';
import { Container, Section } from '@/components/ui/Section';
import { contact, site, solutions } from '@/config/site';

export const metadata: Metadata = pageMetadata({
  title: 'About',
  description:
    `${site.name} is a real estate CRM and property management platform built for brokers, agents and agencies.`,
  path: '/about/',
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="A CRM built for how brokers actually work"
        body="Most real estate teams run on a mix of spreadsheets, chat threads and memory. BrokrSuite exists to replace that with one system built specifically for property businesses."
      />

      <Section compactTop>
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <div className="legal-prose">
                <h2>What BrokrSuite is</h2>
                <p>
                  BrokrSuite is a real estate CRM and property management platform. It brings property
                  inventory, leads, client records, follow-ups, team assignments and business analytics into
                  a single mobile-first application.
                </p>

                <h2>Why we built it</h2>
                <p>
                  Generic CRMs are built for software sales pipelines, not property deals. They have no
                  concept of an inventory of listings, of a client&apos;s preferred locations and budget, or
                  of the follow-up rhythm that decides whether a deal closes. Property portals, meanwhile,
                  are built to generate enquiries — not to help you manage them once they arrive.
                </p>
                <p>
                  BrokrSuite sits in that gap: the operational software a broker or agency runs its day on.
                </p>

                <h2>Who it&apos;s for</h2>
                <ul>
                  {solutions.map((solution) => (
                    <li key={solution.title}>
                      <strong>{solution.title.replace('For ', '')}</strong> — {solution.body}
                    </li>
                  ))}
                </ul>

                <h2>Talk to us</h2>
                <p>
                  We work closely with the brokers and agencies using BrokrSuite, and product decisions come
                  directly from that. If there is something your business needs, email us at{' '}
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>.
                </p>
              </div>
            </div>

            <aside className="lg:col-span-5">
              <div className="rounded-card-lg border border-ink-200/70 bg-ink-50 p-6 sm:p-8">
                <h2 className="text-base font-semibold text-ink-950">At a glance</h2>
                <dl className="mt-5 divide-y divide-ink-200 text-sm">
                  {[
                    ['Product', 'Real Estate CRM & Property Management'],
                    ['Platforms', 'Android and iOS'],
                    ['Built for', 'Brokers, agents, agencies and sales teams'],
                    ['Core modules', 'Properties, Leads, Clients, Follow-ups, Team, Analytics'],
                  ].map(([term, value]) => (
                    <div key={term} className="flex flex-col gap-1 py-3.5 first:pt-0 last:pb-0 sm:flex-row sm:gap-4">
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
