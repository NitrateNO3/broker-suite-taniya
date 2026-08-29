import type { MetadataRoute } from 'next';
import { site } from '@/config/site';

// Required for `output: 'export'` — emit these as static files at build time.
export const dynamic = 'force-static';

const routes = [
  { path: '/', priority: 1, changeFrequency: 'weekly' as const },
  { path: '/features/', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/how-it-works/', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/pricing/', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/about/', priority: 0.6, changeFrequency: 'yearly' as const },
  { path: '/help/', priority: 0.6, changeFrequency: 'monthly' as const },
  { path: '/privacy/', priority: 0.3, changeFrequency: 'yearly' as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((route) => ({
    url: `${site.url}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
