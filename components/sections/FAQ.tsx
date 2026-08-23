import { Container, Section, SectionHeading } from '@/components/ui/Section';
import { faqs } from '@/config/site';

/**
 * Native <details> accordion — keyboard accessible and functional without
 * JavaScript, which keeps the FAQ readable to crawlers too.
 */
export function FAQ() {
  return (
    <Section id="faq">
      <Container>
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently asked questions"
          body="Everything brokers usually ask before getting started."
        />

        <div className="mx-auto mt-12 max-w-3xl divide-y divide-ink-200 border-y border-ink-200 lg:mt-14">
          {faqs.map((faq) => (
            <details key={faq.q} className="group">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 [&::-webkit-details-marker]:hidden">
                <h3 className="text-base font-semibold text-ink-950 sm:text-[1.0625rem]">{faq.q}</h3>
                <span
                  aria-hidden="true"
                  className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink-100 text-ink-600 transition-transform duration-200 group-open:rotate-45 group-open:bg-brand-600 group-open:text-white"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-3.5 w-3.5">
                    <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                  </svg>
                </span>
              </summary>
              <p className="max-w-prose pb-6 pr-10 text-[0.9375rem] leading-relaxed text-ink-500">{faq.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  );
}
