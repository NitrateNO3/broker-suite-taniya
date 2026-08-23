import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { LegalPage } from '@/components/LegalPage';
import { contact, site } from '@/config/site';

export const metadata: Metadata = pageMetadata({
  title: 'Privacy Policy',
  description: `How ${site.name} collects, uses and protects personal information across the website and mobile application.`,
  path: '/privacy/',
});

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="23 August 2026"
      intro={`How ${site.name} handles the information you and your clients trust us with.`}
    >
      <h2>1. Who we are</h2>
      <p>
        {site.name} (&quot;we&quot;, &quot;us&quot;) provides a real estate CRM and property management
        platform available through this website and our mobile applications. This policy explains what
        personal information we collect, why we collect it, and what control you have over it.
      </p>

      <h2>2. Information we collect</h2>
      <ul>
        <li>
          <strong>Account information</strong> — your name, email address, phone number and business name,
          provided when you create an account or contact us.
        </li>
        <li>
          <strong>Business data you enter</strong> — property listings, leads, client records, notes,
          follow-ups and team member details that you add to the application.
        </li>
        <li>
          <strong>Enquiry information</strong> — the details you submit through the contact form on this
          website, used solely to respond to your enquiry.
        </li>
        <li>
          <strong>Technical information</strong> — device type, operating system, app version and error logs,
          used to diagnose problems and keep the service working.
        </li>
      </ul>

      <h2>3. How we use information</h2>
      <ul>
        <li>To provide, operate and support the {site.name} platform.</li>
        <li>To respond to demo requests, support enquiries and account questions.</li>
        <li>To diagnose faults, prevent abuse and improve the reliability of the service.</li>
        <li>To send service-related communications about your account.</li>
      </ul>
      <p>
        We do not sell your personal information, and we do not sell or share the client and lead data you
        store in the application.
      </p>

      <h2>4. Data you hold about your clients</h2>
      <p>
        When you add a lead or client to {site.name}, you remain responsible for that information as its
        controller. We process it on your behalf, only to provide the service to you. You are responsible for
        having a lawful basis to collect and store your clients&apos; details, and for responding to their
        requests about that data. We will assist you where we reasonably can.
      </p>

      <h2>5. Sharing and service providers</h2>
      <p>
        We share personal information only with service providers who help us run the platform — for example
        hosting, database and error-monitoring providers — and only to the extent needed to deliver the
        service. We may also disclose information where we are legally required to do so.
      </p>

      <h2>6. Retention</h2>
      <p>
        We keep your account and business data for as long as your account is active. If you close your
        account, contact us and we will provide an export and then delete your data, except where we are
        required to retain records by law.
      </p>

      <h2>7. Security</h2>
      <p>
        We use industry-standard measures including encrypted connections and access controls to protect your
        data. We do not currently hold third-party security certifications, and we will not claim any we have
        not been independently audited for. If your organisation has specific security requirements, contact
        us and we will answer them directly.
      </p>

      <h2>8. Your rights</h2>
      <p>
        You may request access to, correction of, or deletion of the personal information we hold about you,
        and you may object to certain processing. To exercise any of these rights, email{' '}
        <a href={`mailto:${contact.email}`}>{contact.email}</a> and we will respond within a reasonable
        period.
      </p>

      <h2>9. Children</h2>
      <p>
        {site.name} is a business tool and is not directed at children. We do not knowingly collect personal
        information from anyone under 18.
      </p>

      <h2>10. Changes to this policy</h2>
      <p>
        We may update this policy as the product changes. Material changes will be communicated through the
        application or by email, and the &quot;last updated&quot; date above will always reflect the current
        version.
      </p>

      <h2>11. Contact</h2>
      <p>
        Questions about this policy or about your data can be sent to{' '}
        <a href={`mailto:${contact.email}`}>{contact.email}</a>.
      </p>
    </LegalPage>
  );
}
