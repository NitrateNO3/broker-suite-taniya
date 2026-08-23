import type { Metadata } from 'next';
import { site } from '@/config/site';

const ogImage = {
  url: '/og.png',
  width: 1200,
  height: 630,
  alt: `${site.name} — Real Estate CRM`,
};

/**
 * Builds page metadata with the shared social card attached.
 *
 * Next.js replaces the parent `openGraph` object wholesale rather than merging
 * it, so any page that sets its own openGraph block would otherwise drop the
 * site-wide og:image. Routing every page through this keeps them consistent.
 */
export function pageMetadata({
  title,
  description,
  path,
  ogTitle,
  ogDescription,
}: {
  title: string;
  description: string;
  path: string;
  ogTitle?: string;
  ogDescription?: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName: site.name,
      locale: site.locale,
      url: path,
      title: ogTitle ?? `${title} | ${site.name}`,
      description: ogDescription ?? description,
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle ?? `${title} | ${site.name}`,
      description: ogDescription ?? description,
      images: [ogImage.url],
    },
  };
}
