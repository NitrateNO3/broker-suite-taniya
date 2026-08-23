import type { MetadataRoute } from 'next';
import { site } from '@/config/site';

// Required for `output: 'export'` — emit these as static files at build time.
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
