import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { LegalPage } from '@/components/LegalPage';
import { contact, site } from '@/config/site';

export const metadata: Metadata = pageMetadata({
  title: 'Refund Policy',
  description: `Refund and cancellation terms for ${site.name} subscriptions.`,
  path: '/refund/',
});

export default function RefundPage() {
  return (
    <LegalPage
      title="Refund Policy"
      updated="23 August 2026"
      intro={`Cancellation and refund terms for paid ${site.name} subscriptions.`}
    >
      <h2>1. Scope</h2>
      <p>
        This policy applies to paid {site.name} subscriptions purchased directly from us. Subscriptions
        purchased through the Apple App Store or Google Play are subject to those stores&apos; own refund
        processes, which you should use in the first instance.
      </p>

      <h2>2. Cancelling</h2>
      <p>
        You can cancel a subscription at any time. Cancellation takes effect at the end of your current
        billing period, and you keep access until then. We do not automatically pro-rate part-months.
      </p>

      <h2>3. Refunds</h2>
      <ul>
        <li>
          <strong>Billing errors</strong> — if you were charged incorrectly or charged after cancelling, we
          will refund the incorrect amount in full.
        </li>
        <li>
          <strong>Service failure</strong> — if a prolonged fault on our side prevented you from using the
          service, contact us and we will refund or credit the affected period.
        </li>
        <li>
          <strong>Change of mind</strong> — refunds for unused time on an annual plan are considered
          case-by-case. Monthly plans are generally not refunded mid-period; cancel instead and access
          continues to the period end.
        </li>
      </ul>

      <h2>4. How to request a refund</h2>
      <p>
        Email <a href={`mailto:${contact.email}`}>{contact.email}</a> with your account email and the reason
        for the request. We aim to respond within three business days. Approved refunds are returned to the
        original payment method and typically take five to ten business days to appear.
      </p>

      <h2>5. Your data after cancellation</h2>
      <p>
        Cancelling does not immediately delete your data. Contact us before or shortly after cancelling if
        you would like an export of your properties, leads and clients.
      </p>
    </LegalPage>
  );
}
