import Link from 'next/link';
import { SiteCredits } from '@/components/SiteCredits';
import { Logo } from '@/components/Logo';
import { StoreButtons } from '@/components/StoreButtons';
import { Container } from '@/components/ui/Section';
import { footerNav } from '@/config/nav';
import { contact, site, social, type SocialKey } from '@/config/site';

const socialLabels: Record<SocialKey, string> = {
  instagram: 'Instagram',
  linkedin: 'LinkedIn',
  facebook: 'Facebook',
  x: 'X',
};

export function Footer() {
  // Only render social links that have been configured.
  const socials = (Object.keys(social) as SocialKey[])
    .filter((key) => social[key])
    .map((key) => ({ key, label: socialLabels[key], href: social[key] }));

  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink-800 bg-ink-950 text-ink-300">
      <Container className="py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-3">
            <Logo variant="light" withTagline />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-400">{site.shortDescription}</p>
            <StoreButtons tone="dark" className="mt-6" />
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-9">
            {footerNav.map((group) => (
              <div key={group.heading}>
                <h2 className="text-[0.8125rem] font-semibold uppercase tracking-[0.1em] text-white">
                  {group.heading}
                </h2>
                <ul className="mt-4 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="rounded text-sm text-ink-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h2 className="text-[0.8125rem] font-semibold uppercase tracking-[0.1em] text-white">Contact</h2>
              <ul className="mt-4 space-y-3 text-sm text-ink-400">
                <li>
                  <a
                    href={`mailto:${contact.email}`}
                    className="rounded break-words transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
                  >
                    {contact.email}
                  </a>
                </li>
                {contact.phone && (
                  <li>
                    <a
                      href={`tel:${contact.phone.replace(/\s/g, '')}`}
                      className="rounded transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
                    >
                      {contact.phone}
                    </a>
                  </li>
                )}
                {contact.address && <li>{contact.address}</li>}
              </ul>

              {socials.length > 0 && (
                <>
                  <h2 className="mt-8 text-[0.8125rem] font-semibold uppercase tracking-[0.1em] text-white">
                    Social
                  </h2>
                  <ul className="mt-4 space-y-3">
                    {socials.map((s) => (
                      <li key={s.key}>
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded text-sm text-ink-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
                        >
                          {s.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Legal links already sit in the Resources column above, so the
            bottom bar carries the copyright only. */}
        <div className="mt-12 flex flex-col-reverse items-start gap-6 border-t border-ink-800 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-ink-500">
            © {year} {site.name}. All rights reserved.
          </p>
          <SiteCredits />
        </div>
      </Container>
    </footer>
  );
}
