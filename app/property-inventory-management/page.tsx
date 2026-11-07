import type { Metadata } from 'next';
import { LandingPage, landingMetadata } from '@/components/LandingPage';

export const metadata: Metadata = landingMetadata('property-inventory-management');

export default function Page() {
  return <LandingPage slug="property-inventory-management" />;
}
