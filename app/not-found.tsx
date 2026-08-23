import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Section';

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-600">404</p>
      <h1 className="mt-4 text-display-md font-bold text-ink-950">This page doesn&apos;t exist</h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-ink-500">
        The page you were looking for may have moved. Head back to the homepage, or browse what BrokerSuite
        can do.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button href="/" size="lg">
          Back to home
        </Button>
        <Button href="/features/" size="lg" variant="secondary">
          Explore features
        </Button>
      </div>
    </Container>
  );
}
