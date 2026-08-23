import type { ReactNode } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Container, Section } from '@/components/ui/Section';

/**
 * Shared shell for the legal pages so they stay visually identical.
 *
 * The copy in these pages is a starting template written to be accurate to how
 * this site and app work — it is NOT legal advice. Have it reviewed by a
 * qualified adviser, and confirm every claim matches your actual practices,
 * before publishing.
 */
export function LegalPage({
  title,
  updated,
  intro,
  children,
}: {
  title: string;
  updated: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <>
      <PageHeader eyebrow="Legal" title={title} body={intro} />
      <Section compactTop>
        <Container>
          <div className="max-w-3xl">
            <p className="mb-8 text-sm text-ink-400">Last updated: {updated}</p>
            <div className="legal-prose">{children}</div>
          </div>
        </Container>
      </Section>
    </>
  );
}
