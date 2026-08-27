import { StoreButtons } from '@/components/StoreButtons';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Section';

export function CTA() {
  return (
    <section className="bg-white pb-16 pt-16 sm:pb-20 sm:pt-20 lg:pb-24 lg:pt-24">
      <Container>
        <div className="relative overflow-hidden rounded-card-lg bg-ink-950 px-6 py-14 text-center sm:px-12 sm:py-16 lg:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(40rem_20rem_at_50%_-20%,rgba(99,102,241,0.35),transparent_70%)]"
          />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-display-md font-bold text-white">
              Ready to simplify your real estate business?
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-300 sm:text-lg">
              Bring your properties, leads, clients and team together with BrokrSuite.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href="/contact/" size="lg" variant="inverse" data-analytics="get-started-click">
                Get Started
              </Button>
              <Button
                href="/#download"
                size="lg"
                className="bg-white/10 text-white ring-1 ring-inset ring-white/20 hover:bg-white/15 focus-visible:ring-offset-ink-950"
              >
                Download App
              </Button>
            </div>
            <StoreButtons tone="dark" className="mt-10 justify-center" />
          </div>
        </div>
      </Container>
    </section>
  );
}
