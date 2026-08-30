import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { PageHeader } from '@/components/PageHeader';
import { DeleteAccountForm } from '@/components/DeleteAccountForm';
import { Container, Section } from '@/components/ui/Section';
import { contact, legalEntity, site } from '@/config/site';

export const metadata: Metadata = pageMetadata({
  title: 'Delete Your Account',
  description: `Request deletion of your ${site.name} account and personal data. Delete in the app, or send a request here.`,
  path: '/delete-account/',
});

const removed = [
  'Your profile and account credentials',
  'Saved and favourited properties',
  'Active session tokens',
  'Inquiry and support history',
];

/*
 * Deliberately sized to sit within one screen: the header is compact and the
 * guidance lives beside the form rather than stacked above it, so nobody has
 * to scroll to reach the thing the page exists for.
 */
export default function DeleteAccountPage() {
  return (
    <div className="flex min-h-[calc(100svh-4rem)] flex-col lg:min-h-[calc(100svh-4.5rem)]">
      <PageHeader
        compact
        tone="danger"
        eyebrow="Your account"
        title="Delete your account"
        body={`Remove your ${site.name} account and its data — from inside the app, or by requesting it here.`}
      />

      <Section
        compactTop
        className="flex flex-1 flex-col justify-center !pt-6 !pb-10 sm:!pt-8 sm:!pb-12"
      >
        <Container>
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <h2 className="text-lg font-bold text-ink-950">Request account deletion</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-500">
                Use this if you can no longer sign in. We only need enough to find the right account.
              </p>
              <div className="mt-4">
                <DeleteAccountForm />
              </div>
            </div>

            <aside className="space-y-4 lg:col-span-5">
              <div className="rounded-card border border-ink-200/70 bg-ink-50 p-5">
                <h2 className="text-sm font-semibold text-ink-950">Faster: delete it in the app</h2>
                <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-ink-600">
                  Open {site.name} and go to{' '}
                  <strong className="font-semibold text-ink-800">Profile → Delete My Account</strong>. It is
                  removed straight away, with no request to wait on.
                </p>
              </div>

              <div className="rounded-card border border-red-200 bg-red-50/40 p-5">
                <h2 className="text-sm font-semibold text-ink-950">What gets deleted</h2>
                <ul className="mt-3 space-y-2">
                  {removed.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span
                        aria-hidden="true"
                        className="mt-[0.1875rem] inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" className="h-2 w-2">
                          <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                        </svg>
                      </span>
                      <span className="text-[0.8125rem] leading-snug text-ink-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3.5 border-t border-red-200/70 pt-3 text-[0.8125rem] font-medium leading-relaxed text-red-800">
                  Deletion is permanent and cannot be undone.
                </p>
              </div>

              <p className="text-xs leading-relaxed text-ink-500">
                Prefer email? Write to{' '}
                <a
                  className="font-medium text-red-700 underline underline-offset-4"
                  href={`mailto:${contact.email}?subject=${encodeURIComponent('Account deletion request')}`}
                >
                  {contact.email}
                </a>{' '}
                from the address on the account. Requests are handled by {legalEntity}; see our{' '}
                <a className="underline underline-offset-4 hover:text-ink-700" href="/privacy/">
                  Privacy Policy
                </a>
                .
              </p>
            </aside>
          </div>
        </Container>
      </Section>
    </div>
  );
}
