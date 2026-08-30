import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { LegalPage } from '@/components/LegalPage';
import { contact, legalEntity, site } from '@/config/site';

export const metadata: Metadata = pageMetadata({
  title: 'Privacy Policy',
  description: `How ${site.name} collects, uses and protects personal information across the platform and mobile applications.`,
  path: '/privacy/',
});

/*
 * This is the BrokrSuite Privacy Policy exactly as it is published in the app,
 * so the two can never drift apart. Change it in the app first, then mirror
 * the change here.
 */
export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="August 2026"
      intro={`How ${site.name} handles the information you and your clients trust us with.`}
    >
      <p>
        {site.name} (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates the {site.name} Real
        Estate Brokerage, CRM &amp; Property Management Platform and mobile applications. This Privacy
        Policy informs you of our policies regarding the collection, use, disclosure, and protection of
        Personal Information when you use our services.
      </p>

      <h2>1. Information We Collect</h2>
      <p>We collect information to provide and improve our real estate brokerage and CRM services:</p>
      <ul>
        <li>
          <strong>Personal Information:</strong> Name, email address, phone number, and account credentials
          when registering or logging in.
        </li>
        <li>
          <strong>Real Estate Listing Data:</strong> Property photos, pricing, location, specifications,
          amenities, and owner/advisor contact numbers.
        </li>
        <li>
          <strong>Communications &amp; Inquiries:</strong> Inquiry logs, direct WhatsApp interactions, and
          customer support messages.
        </li>
        <li>
          <strong>Device &amp; Usage Data:</strong> IP address, device model, operating system version, and
          app performance logs.
        </li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <p>We use collected information for the following business purposes:</p>
      <ul>
        <li>To facilitate verified property exploration, listings, and real estate brokerage workflows.</li>
        <li>
          To connect prospective buyers, tenants, and property seekers directly with verified real estate
          advisors via WhatsApp and phone.
        </li>
        <li>
          To protect intellectual property through secure, dynamic watermarking on shared property media.
        </li>
        <li>To provide multi-tenant isolation, role-based access control, and workspace security.</li>
        <li>To comply with applicable legal obligations and resolve disputes.</li>
      </ul>

      <h2>3. Data Security &amp; Storage</h2>
      <p>
        We implement industry-standard technical and organizational security measures, including SSL/TLS
        encryption in transit, hashed credentials, and strict role-based data isolation. We do not sell,
        rent, or trade your personal data to third parties for marketing purposes.
      </p>

      <h2>4. Third-Party Services &amp; WhatsApp</h2>
      <p>
        Our platform integrates with third-party tools such as WhatsApp for direct client-agent
        communications. When initiating an inquiry via WhatsApp, your interactions are governed by
        WhatsApp&apos;s own Privacy Policy.
      </p>

      <h2>5. Account &amp; Data Deletion Rights</h2>
      <p>
        In compliance with Google Play Store, Apple App Store, and international privacy laws, you have the
        full right to delete your account and all associated personal data at any time directly through the
        app (Profile → Delete My Account), by{' '}
        <a href="/delete-account/">submitting a deletion request</a>, or by emailing{' '}
        <a href={`mailto:${contact.email}`}>{contact.email}</a>. Upon request, all active session tokens,
        profile records, and saved data are permanently removed or anonymized.
      </p>

      <h2>6. Children&apos;s Privacy</h2>
      <p>
        Our services are not directed to individuals under the age of 18. We do not knowingly collect
        personal information from minors.
      </p>

      <h2>7. Contact Us</h2>
      <p>
        If you have any questions or concerns regarding this Privacy Policy or data practices, please reach
        out to our privacy team:
      </p>
      <ul>
        <li>
          Email: <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </li>
        <li>
          Website: <a href={site.url}>{site.url}</a>
        </li>
        <li>{legalEntity}</li>
      </ul>
    </LegalPage>
  );
}
