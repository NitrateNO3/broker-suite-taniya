import type { Metadata } from 'next';
import { LandingPage, landingMetadata } from '@/components/LandingPage';

export const metadata: Metadata = landingMetadata('real-estate-broker-crm');

export default function Page() {
  return <LandingPage slug="real-estate-broker-crm" />;
}
