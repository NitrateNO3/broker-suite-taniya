import { Button } from '@/components/ui/Button';
import { Container, Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { problems } from '@/config/site';

export function Problem() {
  return (
    <Section id="problem">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">
              The problem
            </p>
            <h2 className="text-display-sm font-bold text-ink-950">
              Real estate management doesn&apos;t have to be complicated.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-500 sm:text-lg">
              Most brokers aren&apos;t short on deals — they&apos;re short on a single place to keep track of
              them. BrokerSuite brings your properties, leads, clients and follow-ups into one system your
              whole team works from.
            </p>
            <Button href="/features/" className="mt-8 h-12 text-left sm:whitespace-nowrap">
              Move your real estate business to one platform
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
                <path d="M5 12h13M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Button>
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <ul className="divide-y divide-ink-200/70 overflow-hidden rounded-card border border-ink-200/70 bg-ink-50">
                {problems.map((problem) => (
                  <li key={problem} className="flex items-start gap-3.5 px-5 py-4 sm:px-6 sm:py-[1.125rem]">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-error/10 text-error"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-3 w-3">
                        <path d="M7 7l10 10M17 7L7 17" strokeLinecap="round" />
                      </svg>
                    </span>
                    <span className="text-[0.9375rem] leading-relaxed text-ink-700">{problem}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
