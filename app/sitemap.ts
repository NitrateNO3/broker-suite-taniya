import type { MetadataRoute } from 'next';
import { postPath, posts } from '@/config/blog';
import { landingPages, landingPath, landingSlugs } from '@/config/landing';
import { site } from '@/config/site';

// Required for `output: 'export'` — emit these as static files at build time.
export const dynamic = 'force-static';

type Route = { path: string; priority: number; changeFrequency: 'weekly' | 'monthly' | 'yearly'; updated: string };

/*
 * `updated` is the date the page's content last changed — bump it when you edit
 * a page. Build time is deliberately not used: a lastmod that changes on every
 * deploy is one Google learns to ignore.
 */
const pages: Route[] = [
  { path: '/', priority: 1, changeFrequency: 'weekly', updated: '2026-11-07' },
  { path: '/features/', priority: 0.9, changeFrequency: 'monthly', updated: '2026-11-07' },
  { path: '/pricing/', priority: 0.8, changeFrequency: 'monthly', updated: '2026-11-07' },
  { path: '/book-a-demo/', priority: 0.8, changeFrequency: 'monthly', updated: '2026-11-07' },
  { path: '/how-it-works/', priority: 0.7, changeFrequency: 'monthly', updated: '2026-11-07' },
  { path: '/blog/', priority: 0.7, changeFrequency: 'weekly', updated: '2026-11-07' },
  { path: '/about/', priority: 0.6, changeFrequency: 'yearly', updated: '2026-11-07' },
  { path: '/help/', priority: 0.5, changeFrequency: 'monthly', updated: '2026-11-07' },
  { path: '/privacy/', priority: 0.3, changeFrequency: 'yearly', updated: '2026-08-31' },
  { path: '/delete-account/', priority: 0.3, changeFrequency: 'yearly', updated: '2026-08-31' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: Route[] = [
    ...pages,
    ...landingSlugs.map((slug) => ({
      path: landingPath(slug),
      priority: 0.9,
      changeFrequency: 'monthly' as const,
      updated: landingPages[slug].updated,
    })),
    ...posts.map((post) => ({
      path: postPath(post.slug),
      priority: 0.6,
      changeFrequency: 'yearly' as const,
      updated: post.updated,
    })),
  ];
  return routes.map((route) => ({
    url: `${site.url}${route.path}`,
    lastModified: route.updated,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
