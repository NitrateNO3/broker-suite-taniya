import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
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
import { buyerFaqs, site } from '@/config/site';
import { softwareApplicationSchema } from '@/lib/schema';

const title = `Real Estate CRM Software for Brokers & Agencies | ${site.name}`;

export const metadata: Metadata = pageMetadata({
  title: { absolute: title },
  description: site.description,
  path: '/',
  ogTitle: title,
});

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
      <FAQ items={buyerFaqs} body="What brokers and agencies usually ask before getting started." />
      <CTA />
      <JsonLd data={softwareApplicationSchema} />
    </>
  );
}
