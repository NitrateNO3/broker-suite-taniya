import type { ReactNode } from 'react';

export function Container({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto w-full max-w-container px-5 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

type Tone = 'default' | 'muted' | 'ink';

const tones: Record<Tone, string> = {
  default: 'bg-white',
  muted: 'bg-ink-50',
  ink: 'bg-ink-950 text-white',
};

export function Section({
  id,
  tone = 'default',
  /** Reduced top padding, for a section that directly follows a PageHeader. */
  compactTop = false,
  className = '',
  children,
}: {
  id?: string;
  tone?: Tone;
  compactTop?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const top = compactTop ? 'pt-12 sm:pt-14 lg:pt-16' : 'pt-16 sm:pt-20 lg:pt-28';
  return (
    <section id={id} className={`${tones[tone]} scroll-mt-20 ${top} pb-16 sm:pb-20 lg:pb-28 ${className}`}>
      {children}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = 'center',
  tone = 'default',
  as: Heading = 'h2',
}: {
  eyebrow?: string;
  title: ReactNode;
  body?: ReactNode;
  align?: 'center' | 'left';
  tone?: 'default' | 'ink';
  as?: 'h1' | 'h2' | 'h3';
}) {
  const alignment = align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl';
  const titleColor = tone === 'ink' ? 'text-white' : 'text-ink-950';
  const bodyColor = tone === 'ink' ? 'text-ink-300' : 'text-ink-500';

  return (
    <div className={alignment}>
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">{eyebrow}</p>
      )}
      <Heading className={`text-display-sm font-bold ${titleColor}`}>{title}</Heading>
      {body && <p className={`mt-4 text-base leading-relaxed sm:text-lg ${bodyColor}`}>{body}</p>}
    </div>
  );
}
