import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';
import { PageHeader } from '@/components/PageHeader';
import { Icon } from '@/components/Icon';
import { Container, Section } from '@/components/ui/Section';
import { FAQ } from '@/components/sections/FAQ';
import { contact, site, supportFaqs } from '@/config/site';

export const metadata: Metadata = pageMetadata({
  title: 'Help & Support',
  description: `Contact ${site.name} support by email or in the app, and find answers on agents, saved properties, listing a property and deleting your account.`,
  path: '/help/',
});

/* Mirrors the app's own Help & Support screen: the same two support routes,
   and the same answers, so nobody gets a different story on the web. */
export default function HelpPage() {
  return (
    <>
      <PageHeader
        eyebrow="Help & Support"
        title="How can we help you?"
        body="Reach out to our customer support team or browse frequently asked questions below."
        breadcrumbs={[{ name: 'Help & Support', path: '/help/' }]}
      />

      <Section compactTop>
        <Container>
          <div className="grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <a
              href={`mailto:${contact.email}`}
              className="group rounded-card border border-ink-200/70 bg-white p-6 transition hover:border-brand-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <Icon name="mail" className="h-5 w-5" />
              </span>
              <h2 className="mt-4 text-base font-semibold text-ink-950">Email Us</h2>
              <p className="mt-1 break-all text-sm text-ink-500 group-hover:text-brand-700">
                {contact.email}
              </p>
            </a>

            <div className="rounded-card border border-ink-200/70 bg-white p-6">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-success/10 text-success">
                <Icon name="message" className="h-5 w-5" />
              </span>
              <h2 className="mt-4 text-base font-semibold text-ink-950">WhatsApp</h2>
              <p className="mt-1 text-sm text-ink-500">
                Chat with support from inside the {site.name} app.
              </p>
            </div>

            <Link
              href="/delete-account/"
              className="group rounded-card border border-ink-200/70 bg-white p-6 transition hover:border-brand-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-ink-100 text-ink-600">
                <Icon name="user" className="h-5 w-5" />
              </span>
              <h2 className="mt-4 text-base font-semibold text-ink-950">Delete your account</h2>
              <p className="mt-1 text-sm text-ink-500 group-hover:text-brand-700">
                How to remove your account and data.
              </p>
            </Link>
          </div>
        </Container>
      </Section>

      <FAQ
        items={supportFaqs}
        eyebrow="Using the app"
        title="Frequently asked questions"
        body="The same answers you will find under Help & Support in the app."
        tone="muted"
      />
    </>
  );
}
