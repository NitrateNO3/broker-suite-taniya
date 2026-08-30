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
  'Inquiry and support history tied to your account',
];

export default function DeleteAccountPage() {
  return (
    <>
      <PageHeader
        eyebrow="Your account"
        title="Delete your account"
        body={`You can remove your ${site.name} account and its data at any time — from inside the app, or by sending us a request here.`}
      />

      <Section compactTop>
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <div className="rounded-card-lg border border-ink-200/70 bg-ink-50 p-6 sm:p-8">
                <h2 className="text-base font-semibold text-ink-950">Fastest: delete it in the app</h2>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-600">
                  Open {site.name} and go to <strong className="font-semibold text-ink-800">Profile →
                  Delete My Account</strong>. The account is removed straight away, with no request to wait
                  on.
                </p>
              </div>

              <h2 className="mt-10 text-xl font-bold text-ink-950 sm:text-2xl">
                Or request it here
              </h2>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-600">
                Use this if you can no longer sign in. We only need enough to find the right account.
              </p>

              <div className="mt-6">
                <DeleteAccountForm />
              </div>
            </div>

            <aside className="lg:col-span-5">
              <div className="rounded-card-lg border border-ink-200/70 bg-white p-6 sm:p-8">
                <h2 className="text-base font-semibold text-ink-950">What gets deleted</h2>
                <ul className="mt-4 space-y-3">
                  {removed.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span
                        aria-hidden="true"
                        className="mt-[0.1875rem] inline-flex h-[1.125rem] w-[1.125rem] shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="h-2.5 w-2.5">
                          <path d="M4 12.5l5 5 11-11" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span className="text-[0.9375rem] leading-snug text-ink-700">{item}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-6 border-t border-ink-100 pt-6 text-sm leading-relaxed text-ink-500">
                  Deletion is permanent and cannot be undone. Records we are required to keep by law are
                  retained; everything else is removed or anonymised.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-ink-500">
                  Prefer email? Write to{' '}
                  <a
                    className="font-medium text-brand-700 underline underline-offset-4"
                    href={`mailto:${contact.email}?subject=${encodeURIComponent('Account deletion request')}`}
                  >
                    {contact.email}
                  </a>{' '}
                  from the address on the account.
                </p>
                <p className="mt-4 text-xs leading-relaxed text-ink-400">
                  Requests are handled by {legalEntity}. See our{' '}
                  <a className="underline underline-offset-4 hover:text-ink-600" href="/privacy/">
                    Privacy Policy
                  </a>{' '}
                  for how we treat your data.
                </p>
              </div>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
