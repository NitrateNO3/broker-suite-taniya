import { AppScreen } from '@/components/mockups/AppScreen';
import { PhoneFrame } from '@/components/mockups/PhoneFrame';
import { StoreButtons } from '@/components/StoreButtons';
import { Container, Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { site } from '@/config/site';

export function AppShowcase() {
  return (
    <Section id="download" tone="ink" className="overflow-hidden">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-brand-400">
              Mobile app
            </p>
            <h2 className="text-display-sm font-bold text-white">Your real estate CRM. Wherever you go.</h2>
            <p className="mt-5 text-base leading-relaxed text-ink-300 sm:text-lg">
              Manage your properties, leads and clients directly from your phone — on a site visit, in the
              car, or between meetings.
            </p>

            <div className="mt-8">
              <p className="text-sm font-semibold text-white">Download {site.name}</p>
              <StoreButtons tone="dark" className="mt-3" />
              <p className="mt-4 max-w-sm text-xs leading-relaxed text-ink-500">
                Store listings are being prepared. These buttons will link to the live App Store and Google
                Play pages as soon as the apps are published.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              {/* Fixed widths, not percentages, so the row can never outgrow
                  its column. One device on mobile, two from tablet up. */}
              <div className="flex items-end justify-center gap-4">
                <div className="w-full max-w-[16rem] shrink-0 sm:w-64 sm:max-w-none sm:-translate-y-8">
                  <PhoneFrame className="w-full" label="BrokrSuite app — properties list with search, category filters and status labels">
                    <AppScreen variant="properties" />
                  </PhoneFrame>
                </div>
                <div className="hidden w-64 shrink-0 sm:block">
                  <PhoneFrame className="w-full" label="BrokrSuite app — lead management showing status, source and assigned agent">
                    <AppScreen variant="leads" />
                  </PhoneFrame>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
