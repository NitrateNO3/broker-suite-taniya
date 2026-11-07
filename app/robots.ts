import type { MetadataRoute } from 'next';
import { site } from '@/config/site';

// Required for `output: 'export'` — emit these as static files at build time.
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    // The form endpoint is POST-only and has nothing to index.
    rules: [{ userAgent: '*', allow: '/', disallow: '/api/' }],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
