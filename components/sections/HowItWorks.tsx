import { Container, Section, SectionHeading } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { steps } from '@/config/site';

export function HowItWorks() {
  return (
    <Section id="how-it-works">
      <Container>
        <SectionHeading
          eyebrow="How it works"
          title="Up and running in four steps"
          body="No migration project, no consultants. Set up your business and start working the same day."
        />

        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-6">
          {steps.map((step, i) => (
            <li key={step.title} className="relative">
              {/* Connector to the next step — drawn per item so the rail stops
                  at step four instead of running off the grid. */}
              {i < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute left-14 top-6 hidden h-px bg-ink-200 lg:block"
                  style={{ right: '-1.75rem' }}
                />
              )}
              <Reveal delay={i * 80}>
                <span className="relative z-10 inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-600 text-base font-bold text-white ring-8 ring-white">
                  {i + 1}
                </span>
                <h3 className="mt-5 text-base font-semibold text-ink-950">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{step.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
