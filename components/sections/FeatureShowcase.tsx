import { Icon } from '@/components/Icon';
import { AppScreen } from '@/components/mockups/AppScreen';
import { PhoneFrame } from '@/components/mockups/PhoneFrame';
import { Container, Section, SectionHeading } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { features, type Feature } from '@/config/site';

function FeatureRow({ feature, flip }: { feature: Feature; flip: boolean }) {
  return (
    <div
      id={feature.id}
      className="grid scroll-mt-24 items-center gap-10 lg:grid-cols-12 lg:gap-16"
    >
      <div className={`lg:col-span-6 ${flip ? 'lg:order-2' : ''}`}>
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white">
            <Icon name={feature.icon} className="h-5 w-5" />
          </span>
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">
            {feature.eyebrow}
          </span>
        </div>

        <h3 className="mt-5 text-display-sm font-bold text-ink-950">{feature.title}</h3>
        <p className="mt-3 text-base leading-relaxed text-ink-500 sm:text-lg">{feature.summary}</p>

        <ul className="mt-7 grid gap-x-6 gap-y-3 sm:grid-cols-2">
          {feature.points.map((point) => (
            <li key={point} className="flex items-start gap-2.5">
              <span
                aria-hidden="true"
                className="mt-[0.1875rem] inline-flex h-[1.125rem] w-[1.125rem] shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="h-2.5 w-2.5">
                  <path d="M4 12.5l5 5 11-11" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="text-[0.9375rem] leading-snug text-ink-700">{point}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={`lg:col-span-6 ${flip ? 'lg:order-1' : ''}`}>
        <Reveal>
          <div className="relative flex justify-center rounded-card-lg bg-ink-50 px-6 py-10 ring-1 ring-inset ring-ink-200/70 sm:px-10 sm:py-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-card-lg bg-[radial-gradient(28rem_16rem_at_50%_0%,theme(colors.brand.100),transparent_70%)] opacity-60"
            />
            <PhoneFrame
              className="relative"
              label={`BrokrSuite app — ${feature.title} screen`}
            >
              <AppScreen variant={feature.visual} />
            </PhoneFrame>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

export function FeatureShowcase({
  limit,
  showHeading = true,
  compactTop = false,
}: {
  limit?: number;
  showHeading?: boolean;
  compactTop?: boolean;
}) {
  const shown = limit ? features.slice(0, limit) : features;

  return (
    <Section id="features" compactTop={compactTop}>
      <Container>
        {showHeading && (
          <SectionHeading
            eyebrow="Features"
            title="Built around how brokers actually work"
            body="Every module maps to a real step in your sales process — from listing a property to closing the deal."
          />
        )}
        <div className={`space-y-20 sm:space-y-24 lg:space-y-28 ${showHeading ? 'mt-16 lg:mt-20' : ''}`}>
          {shown.map((feature, i) => (
            <FeatureRow key={feature.id} feature={feature} flip={i % 2 === 1} />
          ))}
        </div>

        {limit && limit < features.length && (
          <div className="mt-16 flex justify-center border-t border-ink-100 pt-12">
            <Button href="/features/" variant="secondary" size="lg">
              See all {features.length} features
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
                <path d="M5 12h13M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Button>
          </div>
        )}
      </Container>
    </Section>
  );
}
