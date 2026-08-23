import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { LegalPage } from '@/components/LegalPage';
import { contact, site } from '@/config/site';

export const metadata: Metadata = pageMetadata({
  title: 'Terms & Conditions',
  description: `The terms that apply when you use the ${site.name} website and mobile applications.`,
  path: '/terms/',
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      updated="23 August 2026"
      intro={`The terms that apply when you use the ${site.name} website and applications.`}
    >
      <h2>1. Agreement</h2>
      <p>
        By creating a {site.name} account or using our website or applications, you agree to these terms. If
        you are accepting them on behalf of a business, you confirm that you are authorised to do so.
      </p>

      <h2>2. Your account</h2>
      <ul>
        <li>You are responsible for keeping your login credentials secure.</li>
        <li>You are responsible for the activity of the team members you invite to your account.</li>
        <li>You must provide accurate account information and keep it up to date.</li>
      </ul>

      <h2>3. Acceptable use</h2>
      <p>You agree not to use {site.name} to:</p>
      <ul>
        <li>Store or transmit unlawful, misleading or infringing content.</li>
        <li>Send unsolicited marketing in breach of applicable communications law.</li>
        <li>Attempt to gain unauthorised access to the service or to other customers&apos; data.</li>
        <li>Reverse engineer, resell or redistribute the service without our written permission.</li>
      </ul>

      <h2>4. Your data</h2>
      <p>
        The properties, leads, clients and other records you add remain yours. You grant us the limited right
        to host and process that data solely in order to provide the service. Our handling of personal
        information is described in our Privacy Policy.
      </p>

      <h2>5. Subscriptions and payment</h2>
      <p>
        Where a plan is paid, fees, billing period and included limits are those shown at the time you
        subscribe. Fees are payable in advance. We may change pricing for future billing periods with
        reasonable notice. Refunds are handled under our Refund Policy.
      </p>

      <h2>6. Availability</h2>
      <p>
        We work to keep {site.name} available and reliable, but we do not guarantee uninterrupted service.
        We may carry out maintenance, and we may change or discontinue features. Where a change materially
        reduces functionality you rely on, we will give reasonable notice.
      </p>

      <h2>7. Suspension and termination</h2>
      <p>
        You may stop using the service at any time. We may suspend or terminate an account that breaches
        these terms or that is used unlawfully. On termination you may request an export of your data before
        it is deleted.
      </p>

      <h2>8. Liability</h2>
      <p>
        To the extent permitted by law, {site.name} is provided &quot;as is&quot;, and we are not liable for
        indirect or consequential losses, lost profits, or loss of business opportunity. Nothing in these
        terms excludes liability that cannot lawfully be excluded.
      </p>

      <h2>9. Changes to these terms</h2>
      <p>
        We may update these terms as the product develops. Continued use after an update means you accept the
        revised terms.
      </p>

      <h2>10. Contact</h2>
      <p>
        Questions about these terms can be sent to <a href={`mailto:${contact.email}`}>{contact.email}</a>.
      </p>
    </LegalPage>
  );
}
