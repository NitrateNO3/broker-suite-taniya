import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { LegalPage } from '@/components/LegalPage';
import { contact, site } from '@/config/site';

export const metadata: Metadata = pageMetadata({
  title: 'Cookie Policy',
  description: `How ${site.name} uses cookies and similar technologies on this website.`,
  path: '/cookies/',
});

export default function CookiesPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      updated="23 August 2026"
      intro="What this website stores on your device, and what it does not."
    >
      <h2>1. Current position</h2>
      <p>
        This website does not currently set analytics, advertising or tracking cookies. No third-party
        analytics or advertising scripts are loaded, and nothing is stored on your device for the purpose of
        profiling or cross-site tracking.
      </p>

      <h2>2. Strictly necessary storage</h2>
      <p>
        We may use a small amount of essential browser storage to keep the site working — for example
        remembering that you have dismissed a notice. This is not used to identify you and is not shared.
      </p>

      <h2>3. If this changes</h2>
      <p>
        We may introduce analytics in future to understand how the site is used. If we do, we will publish a
        cookie consent notice, obtain consent where required, list the specific cookies and their purposes
        here, and update the date above before any such cookie is set.
      </p>

      <h2>4. Controlling cookies</h2>
      <p>
        You can block or delete cookies through your browser settings at any time. Because this site does not
        rely on non-essential cookies, doing so will not affect how it works.
      </p>

      <h2>5. Contact</h2>
      <p>
        Questions about this policy can be sent to <a href={`mailto:${contact.email}`}>{contact.email}</a>.
      </p>
    </LegalPage>
  );
}
