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
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
