import { Button } from '@/components/ui/Button';
import { Container, Section, SectionHeading } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { contact, pricing, type Plan } from '@/config/site';

function PlanCard({ plan, showPrice }: { plan: Plan; showPrice: boolean }) {
  return (
    <div
      className={`relative flex h-full flex-col rounded-card-lg p-6 sm:p-7 ${
        plan.featured
          ? 'bg-ink-950 text-white shadow-lg ring-1 ring-ink-950'
          : 'border border-ink-200/70 bg-white'
      }`}
    >
      {plan.featured && (
        <span className="absolute -top-3 left-6 rounded-full bg-brand-600 px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-wide text-white">
          Most popular
        </span>
      )}

      <h3 className={`text-lg font-bold ${plan.featured ? 'text-white' : 'text-ink-950'}`}>{plan.name}</h3>
      <p className={`mt-1.5 text-sm ${plan.featured ? 'text-ink-300' : 'text-ink-500'}`}>{plan.audience}</p>

      <div className="mt-6">
        {showPrice && plan.price ? (
          <p className="flex items-baseline gap-1">
            <span className={`text-4xl font-bold tracking-tight ${plan.featured ? 'text-white' : 'text-ink-950'}`}>
              {pricing.currency}
              {plan.price}
            </span>
            <span className={`text-sm ${plan.featured ? 'text-ink-400' : 'text-ink-500'}`}>{plan.period}</span>
          </p>
        ) : (
          <p className={`text-xl font-bold tracking-tight ${plan.featured ? 'text-white' : 'text-ink-950'}`}>
            Pricing on request
          </p>
        )}
      </div>

      <Button
        href={plan.cta.href}
        variant={plan.featured ? 'inverse' : 'secondary'}
        className="mt-6 w-full"
        data-analytics="get-started-click"
      >
        {plan.cta.label}
      </Button>

      <dl className={`mt-7 space-y-2.5 border-t pt-6 text-sm ${plan.featured ? 'border-ink-800' : 'border-ink-100'}`}>
        {Object.entries(plan.limits).map(([key, value]) => (
          <div key={key} className="flex items-baseline justify-between gap-3">
            <dt className={`capitalize ${plan.featured ? 'text-ink-400' : 'text-ink-500'}`}>{key}</dt>
            <dd className={`text-right font-medium ${plan.featured ? 'text-ink-200' : 'text-ink-800'}`}>
              {value}
            </dd>
          </div>
        ))}
      </dl>

      <ul className={`mt-6 flex-1 space-y-3 border-t pt-6 ${plan.featured ? 'border-ink-800' : 'border-ink-100'}`}>
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5">
            <span
              aria-hidden="true"
              className={`mt-[0.1875rem] inline-flex h-[1.125rem] w-[1.125rem] shrink-0 items-center justify-center rounded-full ${
                plan.featured ? 'bg-brand-500/20 text-brand-300' : 'bg-brand-50 text-brand-600'
              }`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="h-2.5 w-2.5">
                <path d="M4 12.5l5 5 11-11" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className={`text-sm leading-snug ${plan.featured ? 'text-ink-200' : 'text-ink-700'}`}>
              {feature}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Pricing({
  tone = 'muted',
  compactTop = false,
}: {
  tone?: 'muted' | 'default';
  compactTop?: boolean;
}) {
  return (
    <Section id="pricing" tone={tone} compactTop={compactTop}>
      <Container>
        <SectionHeading
          eyebrow="Pricing"
          title="Plans that scale with your business"
          body={
            pricing.enabled
              ? 'Straightforward plans for solo brokers through to multi-agent agencies.'
              : pricing.note
          }
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3 lg:gap-6">
          {pricing.plans.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 70}>
              <PlanCard plan={plan} showPrice={pricing.enabled} />
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-ink-500">
          Need something specific?{' '}
          <a
            href={`mailto:${contact.email}`}
            className="rounded font-medium text-brand-600 underline underline-offset-4 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            Talk to us
          </a>{' '}
          about a plan for your team.
        </p>
      </Container>
    </Section>
  );
}
