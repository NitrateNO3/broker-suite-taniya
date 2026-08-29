import { LogoMark } from '@/components/Logo';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Section';

/* Verbatim from the app's own About screen — nothing here is a claim the
   product does not already make about itself. */
const assurances = [
  'Isolated multi-tenant workspaces',
  'Direct WhatsApp inquiries',
  'Watermarked property media',
  'Role-based access control',
];

export function Hero() {
  return (
    <section
      className="relative isolate flex min-h-[calc(100svh-4rem)] flex-col justify-center overflow-hidden border-b border-ink-100 bg-white lg:min-h-[calc(100svh-4.5rem)]"
    >
      {/* --- Backdrop, back to front. All decorative, all motion-safe. --- */}

      {/* Faint grid, faded out towards the edges. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-30 opacity-60 [mask-image:radial-gradient(70%_60%_at_50%_35%,black,transparent)]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(15,17,23,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,17,23,0.05) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />

      {/* Two slow colour washes, drifting against each other to give the
          section depth without anything visibly "animating". */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -z-20 h-[38rem] w-[38rem] -translate-x-[65%] rounded-full bg-[radial-gradient(circle,theme(colors.brand.200),transparent_65%)] opacity-50 blur-3xl motion-safe:animate-drift"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 left-1/2 -z-20 h-[34rem] w-[34rem] translate-x-[-10%] rounded-full bg-[radial-gradient(circle,theme(colors.brand.100),transparent_65%)] opacity-60 blur-3xl motion-safe:animate-drift-slow"
      />

      {/* The house mark, oversized and ghosted — brand presence with no
          invented product imagery. */}
      <LogoMark
        decorative
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 text-ink-950 opacity-[0.028]"
      />

      {/* --- Content --- */}
      <Container className="relative py-16 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          {/* text-balance keeps "business," from being orphaned on its own line. */}
          <h1 className="text-display-lg font-bold text-ink-950 [text-wrap:balance] motion-safe:animate-fade-up">
            Your complete real estate business,{' '}
            <span className="text-brand-600">in one suite.</span>
          </h1>

          <p
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink-500 sm:text-lg motion-safe:animate-fade-up"
            style={{ animationDelay: '60ms' }}
          >
            Manage properties, leads, clients, follow-ups and your entire real estate workflow from one
            powerful platform.
          </p>

          <div
            className="mt-9 flex flex-col justify-center gap-3 sm:flex-row motion-safe:animate-fade-up"
            style={{ animationDelay: '120ms' }}
          >
            <Button href="/help/" size="lg" className="sm:w-auto" data-analytics="get-started-click">
              Get Started
            </Button>
            <Button href="/how-it-works/" size="lg" variant="secondary" className="sm:w-auto">
              See how it works
            </Button>
          </div>
        </div>

        {/* Outside the 3xl text column: at that width the fourth item wraps
            onto a line of its own. */}
        <ul
          className="mt-12 flex flex-col items-center gap-x-8 gap-y-2.5 sm:flex-row sm:flex-wrap sm:justify-center motion-safe:animate-fade-up"
          style={{ animationDelay: '180ms' }}
        >
          {assurances.map((item) => (
            <li key={item} className="inline-flex items-center gap-2 text-sm text-ink-500">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                aria-hidden="true"
                className="h-3.5 w-3.5 shrink-0 text-brand-500"
              >
                <path d="M4 12.5l5 5 11-11" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      </Container>

      {/* Scroll cue — the page is a full viewport tall now, so say so. */}
      <a
        href="#overview"
        className="absolute inset-x-0 bottom-6 mx-auto hidden w-fit items-center gap-2 rounded-full px-3 py-2 text-xs font-medium text-ink-400 transition-colors hover:text-ink-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 sm:flex"
      >
        Explore the platform
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden="true"
          className="h-4 w-4 motion-safe:animate-bob"
        >
          <path d="M12 5v14M6 13l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </section>
  );
}
