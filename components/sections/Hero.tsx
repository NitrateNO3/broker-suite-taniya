import { AppScreen } from '@/components/mockups/AppScreen';
import { PhoneFrame } from '@/components/mockups/PhoneFrame';
import { StoreButtons } from '@/components/StoreButtons';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Section';

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-ink-100 bg-white">
      {/* Restrained backdrop: one soft brand wash + a faint grid, nothing more. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60rem_36rem_at_72%_-10%,theme(colors.brand.50),transparent_65%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.55] [mask-image:radial-gradient(48rem_28rem_at_50%_0%,black,transparent)]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(15,17,23,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,17,23,0.045) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />

      <Container className="relative py-14 sm:py-20 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6 xl:col-span-6">
            <p className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700 ring-1 ring-inset ring-brand-100 motion-safe:animate-fade-up">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden="true" />
              Real Estate CRM &amp; Property Management
            </p>

            <h1
              className="mt-5 text-display-lg font-bold text-ink-950 motion-safe:animate-fade-up"
              style={{ animationDelay: '60ms' }}
            >
              Your complete real estate business,{' '}
              <span className="text-brand-600 lg:block">in one suite.</span>
            </h1>

            <p
              className="mt-5 max-w-xl text-base leading-relaxed text-ink-500 sm:text-lg motion-safe:animate-fade-up"
              style={{ animationDelay: '120ms' }}
            >
              Manage properties, leads, clients, follow-ups and your entire real estate workflow from one
              powerful platform.
            </p>

            <div
              className="mt-8 flex flex-col gap-3 sm:flex-row motion-safe:animate-fade-up"
              style={{ animationDelay: '180ms' }}
            >
              <Button href="/contact/" size="lg" className="sm:w-auto" data-analytics="get-started-click">
                Get Started
              </Button>
              <Button href="#download" size="lg" variant="secondary" className="sm:w-auto">
                Download App
              </Button>
            </div>

            <div className="mt-10 motion-safe:animate-fade-up" style={{ animationDelay: '240ms' }}>
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-ink-400">
                Available on mobile
              </p>
              <StoreButtons className="mt-3" />
            </div>
          </div>

          {/* Hero visual — the phone, flanked by two summary cards so the
              composition reads as a business tool. Cards sit beside the device
              rather than over it, so nothing on screen is ever obscured. */}
          <div className="lg:col-span-6 xl:col-span-6">
            <div className="flex items-center justify-center gap-5 sm:gap-6 lg:justify-end">
              <div
                className="hidden w-[13.5rem] shrink-0 flex-col gap-4 sm:flex"
                aria-hidden="true"
              >
                <div
                  className="rounded-card bg-white p-4 shadow-lg ring-1 ring-ink-100 motion-safe:animate-fade-up"
                  style={{ animationDelay: '320ms' }}
                >
                  <p className="text-[0.6875rem] font-semibold uppercase tracking-wide text-ink-400">
                    Follow-ups today
                  </p>
                  <p className="mt-1.5 text-3xl font-bold leading-none text-ink-950">3</p>
                  <div className="mt-3.5 space-y-2">
                    {['Call Priya Menon', 'Send docs to Ankit'].map((t) => (
                      <div key={t} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                        <span className="truncate text-xs text-ink-600">{t}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className="rounded-card bg-ink-950 p-4 shadow-lg motion-safe:animate-fade-up"
                  style={{ animationDelay: '380ms' }}
                >
                  <p className="text-[0.6875rem] font-semibold uppercase tracking-wide text-ink-400">
                    New leads this week
                  </p>
                  <p className="mt-1.5 text-3xl font-bold leading-none text-white">14</p>
                  <div className="mt-3.5 flex h-12 items-end gap-1.5">
                    {[40, 62, 48, 75, 90].map((h, i) => (
                      <span
                        key={i}
                        className={`flex-1 rounded-sm ${i === 4 ? 'bg-brand-400' : 'bg-white/20'}`}
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="shrink-0 motion-safe:animate-fade-up" style={{ animationDelay: '200ms' }}>
                <PhoneFrame label="BrokerSuite mobile app showing the business dashboard with total properties, active leads, closed deals, follow-ups and the sales pipeline">
                  <AppScreen variant="dashboard" />
                </PhoneFrame>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
