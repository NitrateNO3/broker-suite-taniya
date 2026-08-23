import { site, stores } from '@/config/site';

type Tone = 'light' | 'dark';

/**
 * App Store / Google Play badges (PRD §24).
 * Both links come from config/site.ts. Until a real store URL exists the badge
 * renders as a non-interactive "Coming soon" chip — never a dead or fake link.
 */

const shell =
  'inline-flex h-[3.25rem] items-center gap-3 rounded-xl px-4 transition-colors duration-150 ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2';

function toneClasses(tone: Tone, live: boolean) {
  if (tone === 'dark') {
    return live
      ? `${shell} bg-white text-ink-950 hover:bg-ink-100 focus-visible:ring-offset-ink-950`
      : `${shell} cursor-default bg-white/5 text-ink-400 ring-1 ring-inset ring-white/15`;
  }
  return live
    ? `${shell} bg-ink-950 text-white hover:bg-ink-800`
    : `${shell} cursor-default bg-white text-ink-400 ring-1 ring-inset ring-ink-200`;
}

function Badge({
  href,
  tone,
  icon,
  small,
  large,
}: {
  href: string | null;
  tone: Tone;
  icon: React.ReactNode;
  small: string;
  large: string;
}) {
  const live = Boolean(href);
  const label = live ? `${small} ${large}` : `${large} — coming soon`;

  const content = (
    <>
      <span aria-hidden="true" className="shrink-0">
        {icon}
      </span>
      <span className="flex flex-col items-start leading-none">
        <span className="text-[0.625rem] font-medium uppercase tracking-wide opacity-80">
          {live ? small : 'Coming soon'}
        </span>
        <span className="mt-1 text-[0.9375rem] font-semibold tracking-[-0.01em]">{large}</span>
      </span>
    </>
  );

  if (!live) {
    return (
      <span className={toneClasses(tone, false)} role="img" aria-label={label} title={`${site.name} ${label}`}>
        {content}
      </span>
    );
  }

  return (
    <a
      href={href!}
      target="_blank"
      rel="noopener noreferrer"
      className={toneClasses(tone, true)}
      aria-label={label}
      data-analytics={large === 'App Store' ? 'app-store-click' : 'google-play-click'}
    >
      {content}
    </a>
  );
}

const AppleIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
    <path d="M16.36 12.72c-.02-2.3 1.88-3.4 1.96-3.46-1.07-1.56-2.73-1.78-3.32-1.8-1.41-.14-2.76.83-3.48.83-.72 0-1.83-.81-3-.79-1.55.02-2.98.9-3.77 2.28-1.61 2.79-.41 6.92 1.15 9.18.76 1.11 1.67 2.35 2.86 2.3 1.15-.05 1.58-.74 2.97-.74 1.38 0 1.78.74 3 .72 1.24-.02 2.02-1.12 2.78-2.24.88-1.28 1.24-2.53 1.26-2.6-.03-.01-2.4-.92-2.41-3.68zM14.1 5.9c.63-.77 1.06-1.83.94-2.9-.91.04-2.01.61-2.67 1.37-.59.68-1.1 1.76-.96 2.8 1.01.08 2.05-.51 2.69-1.27z" />
  </svg>
);

const PlayIcon = (
  <svg viewBox="0 0 24 24" className="h-7 w-7">
    <path d="M3.6 2.4a1.3 1.3 0 0 0-.6 1.1v17a1.3 1.3 0 0 0 .6 1.1l.1.06 9.5-9.6v-.12L3.7 2.34l-.1.06z" fill="#00D2FF" />
    <path d="M16.4 15.4l-3.2-3.24v-.12l3.2-3.24.08.05 3.8 2.18c1.08.62 1.08 1.63 0 2.25l-3.8 2.17-.08.05z" fill="#FFCE00" />
    <path d="M16.48 15.35L13.2 12.1 3.6 21.7a1.05 1.05 0 0 0 1.34.04l11.54-6.39z" fill="#FF3A44" />
    <path d="M16.48 8.85L4.94 2.46A1.05 1.05 0 0 0 3.6 2.5l9.6 9.6 3.28-3.25z" fill="#00E676" />
  </svg>
);

export function StoreButtons({
  tone = 'light',
  className = '',
}: {
  tone?: Tone;
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <Badge href={stores.appStore} tone={tone} icon={AppleIcon} small="Download on the" large="App Store" />
      <Badge href={stores.googlePlay} tone={tone} icon={PlayIcon} small="Get it on" large="Google Play" />
    </div>
  );
}

/** True when at least one store listing is live — used to show/hide download CTAs. */
export const anyStoreLive = Boolean(stores.appStore || stores.googlePlay);
