import { Icon } from '@/components/Icon';
import { Button } from '@/components/ui/Button';
import { Container, Section, SectionHeading } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { valueProps } from '@/config/site';

export function ValueProps() {
  return (
    <Section id="overview" tone="muted">
      <Container>
        <SectionHeading
          eyebrow="One platform"
          title="Everything you need to run your real estate business"
          body="Six core modules that replace the spreadsheets, chat threads and notebooks your team is currently working from."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {valueProps.map((item, i) => (
            <Reveal key={item.title} delay={i * 60}>
              <div className="group h-full rounded-card border border-ink-200/70 bg-white p-6 transition-shadow duration-200 hover:shadow-md">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-inset ring-brand-100">
                  <Icon name={item.icon} className="h-[1.375rem] w-[1.375rem]" />
                </span>
                <h3 className="mt-5 text-base font-semibold text-ink-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button href="/features/" variant="secondary" size="lg">
            See all features in detail
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
              <path d="M5 12h13M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
