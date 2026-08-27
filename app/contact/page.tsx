import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { ContactForm } from '@/components/ContactForm';
import { PageHeader } from '@/components/PageHeader';
import { StoreButtons } from '@/components/StoreButtons';
import { Container, Section } from '@/components/ui/Section';
import { contact, site } from '@/config/site';

export const metadata: Metadata = pageMetadata({
  title: 'Contact & Request a Demo',
  description:
    'Talk to the BrokrSuite team. Request a demo of the real estate CRM, ask about plans, or get help getting started.',
  path: '/contact/',
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Request a demo"
        body="Tell us about your business and we will show you how BrokrSuite fits the way your team already works."
      />

      <Section compactTop>
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <h2 className="sr-only">Contact form</h2>
              <ContactForm />
            </div>

            <aside className="lg:col-span-5">
              <div className="rounded-card-lg border border-ink-200/70 bg-ink-50 p-6 sm:p-8">
                <h2 className="text-base font-semibold text-ink-950">Get in touch directly</h2>
                <dl className="mt-5 space-y-4 text-sm">
                  <div>
                    <dt className="text-ink-500">Email</dt>
                    <dd className="mt-1">
                      <a
                        href={`mailto:${contact.email}`}
                        className="rounded font-medium text-brand-600 underline underline-offset-4 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                      >
                        {contact.email}
                      </a>
                    </dd>
                  </div>
                  {contact.phone && (
                    <div>
                      <dt className="text-ink-500">Phone</dt>
                      <dd className="mt-1">
                        <a
                          href={`tel:${contact.phone.replace(/\s/g, '')}`}
                          className="rounded font-medium text-brand-600 underline underline-offset-4 hover:text-brand-700"
                        >
                          {contact.phone}
                        </a>
                      </dd>
                    </div>
                  )}
                  {contact.address && (
                    <div>
                      <dt className="text-ink-500">Address</dt>
                      <dd className="mt-1 text-ink-800">{contact.address}</dd>
                    </div>
                  )}
                </dl>

                <div className="mt-8 border-t border-ink-200 pt-6">
                  <h3 className="text-sm font-semibold text-ink-950">Prefer to try the app?</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-500">
                    {site.name} will be available on both stores at launch.
                  </p>
                  <StoreButtons className="mt-4" />
                </div>
              </div>

              <div className="mt-6 rounded-card-lg border border-ink-200/70 p-6 sm:p-8">
                <h2 className="text-base font-semibold text-ink-950">What to expect</h2>
                <ol className="mt-4 space-y-3.5 text-sm text-ink-600">
                  {[
                    'We reply to demo requests within one business day.',
                    'A short call to understand your inventory, team and process.',
                    'A walkthrough of the app using examples from your own business.',
                  ].map((item, i) => (
                    <li key={item} className="flex gap-3">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-50 text-[0.6875rem] font-bold text-brand-700">
                        {i + 1}
                      </span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
