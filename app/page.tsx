import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { Hero } from '@/components/sections/Hero';
import { ValueProps } from '@/components/sections/ValueProps';
import { Problem } from '@/components/sections/Problem';
import { Solutions } from '@/components/sections/Solutions';
import { AppShowcase } from '@/components/sections/AppShowcase';
import { Stats } from '@/components/sections/Stats';
import { Testimonials } from '@/components/sections/Testimonials';
import { Pricing } from '@/components/sections/Pricing';
import { FAQ } from '@/components/sections/FAQ';
import { CTA } from '@/components/sections/CTA';
import { faqs, site } from '@/config/site';

export const metadata: Metadata = pageMetadata({
  title: `${site.name} — Real Estate CRM & Property Management Software`,
  description: site.description,
  path: '/',
  ogTitle: `${site.name} — Real Estate CRM & Property Management Software`,
});

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: { '@type': 'Answer', text: faq.a },
  })),
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueProps />
      <Stats />
      <Problem />
      <Solutions />
      <AppShowcase />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
