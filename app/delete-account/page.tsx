import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { PageHeader } from '@/components/PageHeader';
import { Container, Section } from '@/components/ui/Section';
import { contact, site } from '@/config/site';

export const metadata: Metadata = pageMetadata({
  title: 'Account & Data Deletion',
  description: `How to delete your ${site.name} account and associated data — instantly in the app, or by emailing a request.`,
  path: '/delete-account/',
});

const inAppSteps = [
  <>Open the {site.name} app.</>,
  <>Log in to your account.</>,
  <>
    Go to the <strong className="font-semibold text-ink-900">Profile</strong> tab (bottom navigation).
  </>,
  <>
    Select <strong className="font-semibold text-ink-900">Delete My Account</strong>.
  </>,
  <>
    Review the consequences, check the confirmation box, type{' '}
    <code className="rounded bg-ink-100 px-1.5 py-0.5 text-[0.8125rem] font-semibold text-ink-900">
      DELETE
    </code>
    , and tap <strong className="font-semibold text-ink-900">Permanently Delete My Account</strong>.
  </>,
];

const emailSteps = [
  <>
    Send an email to{' '}
    <a
      href={`mailto:${contact.email}?subject=${encodeURIComponent('Account Deletion Request')}`}
      className="font-medium text-red-700 underline underline-offset-4"
    >
      {contact.email}
    </a>{' '}
    with the subject line <strong className="font-semibold text-ink-900">“Account Deletion Request”</strong>.
  </>,
  <>Include your registered username or email address.</>,
  <>
    Our team will verify and permanently purge your account, profile credentials, and associated data from
    our servers within{' '}
    <strong className="font-semibold text-ink-900">48 to 72 hours</strong>, and send a confirmation email.
  </>,
];

const deletedData = [
  'User account profile (Name, Username, Email, Phone Number, Password hash)',
  'Authentication tokens and session logs',
  'Saved properties, favourites, and client inquiry history',
];

function Method({
  badge,
  title,
  note,
  steps,
  ordered = true,
}: {
  badge: string;
  title: string;
  note?: string;
  steps: React.ReactNode[];
  ordered?: boolean;
}) {
  const List = ordered ? 'ol' : 'ul';
  return (
    <div className="flex h-full flex-col rounded-card-lg border border-ink-200/70 bg-white p-6 sm:p-7">
      <span className="inline-flex w-fit items-center rounded-full bg-red-50 px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-red-700">
        {badge}
      </span>
      <h2 className="mt-3.5 text-lg font-bold text-ink-950">{title}</h2>
      {note && <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{note}</p>}
      <List className="mt-4 space-y-2.5">
        {steps.map((step, i) => (
          <li key={i} className="flex gap-3">
            <span
              aria-hidden="true"
              className="mt-[0.125rem] inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink-100 text-[0.6875rem] font-bold text-ink-600"
            >
              {ordered ? i + 1 : '•'}
            </span>
            <span className="text-[0.9375rem] leading-relaxed text-ink-700">{step}</span>
          </li>
        ))}
      </List>
    </div>
  );
}

export default function DeleteAccountPage() {
  return (
    <div className="flex min-h-[calc(100svh-4rem)] flex-col lg:min-h-[calc(100svh-4.5rem)]">
      <PageHeader
        compact
        tone="danger"
        eyebrow="Your account"
        title="Account & data deletion"
        body={`How to delete your ${site.name} account and its associated data.`}
      />

      <Section compactTop className="flex-1 !pt-8 !pb-12 sm:!pt-10 sm:!pb-14">
        <Container>
          <div className="grid gap-5 lg:grid-cols-2">
            <Method
              badge="Method 1 — instant"
              title="In-app deletion"
              steps={inAppSteps}
            />
            <Method
              badge="Method 2"
              title="Web / email request"
              note="If you are unable to access the app, or wish to request deletion externally."
              steps={emailSteps}
              ordered={false}
            />
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            <div className="rounded-card-lg border border-red-200 bg-red-50/40 p-6 sm:p-7">
              <h2 className="text-lg font-bold text-ink-950">Types of data deleted</h2>
              <ul className="mt-4 space-y-2.5">
                {deletedData.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span
                      aria-hidden="true"
                      className="mt-[0.1875rem] inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" className="h-2 w-2">
                        <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                      </svg>
                    </span>
                    <span className="text-[0.9375rem] leading-relaxed text-ink-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-card-lg border border-ink-200/70 bg-ink-50 p-6 sm:p-7">
              <h2 className="text-lg font-bold text-ink-950">Data retention policy</h2>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-700">
                No personal data is retained after deletion. Transactional or audit logs required by law are
                retained only as strictly mandated by statutory regulations.
              </p>
              <p className="mt-5 border-t border-ink-200 pt-5 text-sm leading-relaxed text-ink-500">
                Questions about your data? See our{' '}
                <a className="font-medium text-ink-700 underline underline-offset-4" href="/privacy/">
                  Privacy Policy
                </a>{' '}
                or write to{' '}
                <a
                  className="font-medium text-ink-700 underline underline-offset-4"
                  href={`mailto:${contact.email}`}
                >
                  {contact.email}
                </a>
                .
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
