import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { PageHeader } from '@/components/PageHeader';
import { CTA } from '@/components/sections/CTA';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { AppShot, appScreens, screenOrder } from '@/components/mockups/AppShot';
import { PhoneFrame } from '@/components/mockups/PhoneFrame';
import { Container, Section, SectionHeading } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { site } from '@/config/site';

export const metadata: Metadata = pageMetadata({
  title: 'How It Works',
  description: `How ${site.name} works, screen by screen — from opening the app to browsing listings and working your day from the dashboard.`,
  path: '/how-it-works/',
});

export default function HowItWorksPage() {
  return (
    <>
      <PageHeader
        eyebrow="How it works"
        title={`A walk through ${site.name}`}
        body="What the app actually looks like, screen by screen — every image below is a real screenshot, not a rendering."
      />

      <HowItWorks compactTop />

      <Section tone="muted">
        <Container>
          <SectionHeading
            eyebrow="The app, screen by screen"
            title="From first launch to your working day"
            body="The order below is the order you meet these screens in."
          />

          <ol className="mt-14 space-y-16 sm:space-y-20 lg:mt-16">
            {screenOrder.map((key, i) => {
              const screen = appScreens[key];
              const flip = i % 2 === 1;
              return (
                <li
                  key={key}
                  className="grid items-center gap-8 sm:grid-cols-12 sm:gap-10 lg:gap-16"
                >
                  <div className={`sm:col-span-5 lg:col-span-4 ${flip ? 'sm:order-2' : ''}`}>
                    <Reveal>
                      <div className="flex justify-center">
                        <PhoneFrame className="max-w-[15rem]">
                          <AppShot screen={key} priority={i === 0} />
                        </PhoneFrame>
                      </div>
                    </Reveal>
                  </div>

                  <div className={`sm:col-span-7 lg:col-span-8 ${flip ? 'sm:order-1' : ''}`}>
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">
                      Step {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-3 text-display-sm font-bold text-ink-950">{screen.label}</h3>
                    <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-500 sm:text-lg">
                      {screen.blurb}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </Container>
      </Section>

      <CTA />
    </>
  );
}
