import { Container, Section, SectionHeading } from '@/components/ui/Section';
import { testimonials } from '@/config/site';

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className={`h-4 w-4 ${i < rating ? 'text-warning' : 'text-ink-200'}`}
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 2.5l2.9 6.1 6.6.9-4.8 4.6 1.2 6.6-5.9-3.2-5.9 3.2 1.2-6.6L2.5 9.5l6.6-.9L12 2.5z" />
        </svg>
      ))}
    </div>
  );
}

/**
 * PRD §13 — no fake reviews. Renders nothing until real, attributed
 * testimonials are added to config/site.ts and `enabled` is set to true.
 */
export function Testimonials() {
  if (!testimonials.enabled || testimonials.items.length === 0) return null;

  return (
    <Section id="testimonials" tone="muted">
      <Container>
        <SectionHeading eyebrow="Customers" title="Trusted by real estate teams" />
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {testimonials.items.map((t) => (
            <figure
              key={`${t.name}-${t.company}`}
              className="flex h-full flex-col rounded-card border border-ink-200/70 bg-white p-6"
            >
              {t.rating !== null && <Stars rating={t.rating} />}
              <blockquote className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-ink-700">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-ink-100 pt-5">
                {t.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={t.image}
                    alt=""
                    width={40}
                    height={40}
                    loading="lazy"
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700">
                    {t.name.charAt(0)}
                  </span>
                )}
                <span>
                  <span className="block text-sm font-semibold text-ink-950">{t.name}</span>
                  <span className="block text-xs text-ink-500">
                    {t.role}
                    {t.role && t.company ? ', ' : ''}
                    {t.company}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </Section>
  );
}
