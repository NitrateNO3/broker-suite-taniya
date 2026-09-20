import Link from 'next/link';
import { StoreButtons } from '@/components/StoreButtons';
import { Container, Section } from '@/components/ui/Section';
import { site } from '@/config/site';

export function AppShowcase() {
  return (
    <Section id="download" tone="ink" className="overflow-hidden">
      <Container>
        <div className="max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-brand-400">
            Mobile app
          </p>
          <h2 className="text-display-sm font-bold text-white">
            Your real estate CRM. Wherever you go.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-300 sm:text-lg">
            Manage your properties, leads and clients directly from your phone — on a site visit, in the
            car, or between meetings.
          </p>

          <div className="mt-8">
            <p className="text-sm font-semibold text-white">Download {site.name}</p>
            <StoreButtons tone="dark" className="mt-3" />
            <p className="mt-4 max-w-sm text-xs leading-relaxed text-ink-500">
              Available now on the App Store. The Google Play listing is being prepared, and that button
              will go live as soon as the Android app is published.
            </p>
          </div>

          <p className="mt-8 text-sm text-ink-400">
            Want to see it first?{' '}
            <Link href="/how-it-works/" className="font-medium text-brand-400 underline-offset-4 hover:underline">
              Walk through the app screen by screen
            </Link>
            .
          </p>
        </div>
      </Container>
    </Section>
  );
}
