import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { Container, Section, SectionHeading } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { solutions } from '@/config/site';

export function Solutions() {
  return (
    <Section id="solutions" tone="muted">
      <Container>
        <SectionHeading
          eyebrow="Solutions"
          title="One platform, whatever the size of your operation"
          body="From a solo broker with a phone to an agency running a floor of agents."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {solutions.map((solution, i) => (
            <Reveal key={solution.title} delay={i * 60}>
              <div className="h-full rounded-card border border-ink-200/70 bg-white p-6">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-ink-950 text-white">
                  <Icon name={solution.icon} className="h-[1.375rem] w-[1.375rem]" />
                </span>
                <h3 className="mt-5 text-base font-semibold text-ink-950">{solution.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{solution.body}</p>
                <Link
                  href={solution.href}
                  className="mt-4 inline-flex items-center gap-1.5 rounded text-sm font-medium text-brand-600 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                >
                  See how it works<span className="sr-only"> {solution.title.toLowerCase()}</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5" aria-hidden="true">
                      <path d="M5 12h13M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
