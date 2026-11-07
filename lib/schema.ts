import { contact, legalEntity, site, stores, type Faq } from '@/config/site';

/**
 * schema.org builders. Every property here is something the site can back up:
 * no ratings, no prices (pricing is not public) and no features the app has
 * not been verified to have.
 */

const absolute = (path: string) => new URL(path, site.url).toString();

const orgId = `${site.url}/#organization`;

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': orgId,
  name: site.name,
  url: site.url,
  logo: absolute('/apple-icon.png'),
  email: contact.email,
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: contact.email,
    availableLanguage: ['English'],
  },
  parentOrganization: { '@type': 'Organization', name: legalEntity },
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${site.url}/#website`,
  name: site.name,
  url: site.url,
  inLanguage: 'en',
  publisher: { '@id': orgId },
};

/** The mobile app as listed on the App Store and Google Play. */
export const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: site.name,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'iOS, Android',
  description: site.description,
  url: site.url,
  installUrl: [stores.appStore, stores.googlePlay].filter(Boolean),
  publisher: { '@type': 'Organization', name: legalEntity },
};

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', path: '/' }, ...trail].map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absolute(item.path),
    })),
  };
}

export function faqSchema(items: readonly Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };
}

export function articleSchema({
  title,
  description,
  path,
  published,
  updated,
}: {
  title: string;
  description: string;
  path: string;
  published: string;
  updated: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    mainEntityOfPage: absolute(path),
    url: absolute(path),
    datePublished: published,
    dateModified: updated,
    inLanguage: 'en',
    image: absolute('/og.png'),
    author: { '@id': orgId },
    publisher: { '@id': orgId },
  };
}
