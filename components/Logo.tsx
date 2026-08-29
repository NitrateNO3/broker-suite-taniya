import { site } from '@/config/site';

type LogoProps = {
  /** 'dark' = for light backgrounds, 'light' = for dark backgrounds. */
  variant?: 'dark' | 'light';
  /** Show the "REAL ESTATE CRM" descriptor beneath the wordmark. */
  withTagline?: boolean;
  /** 'stacked' reproduces the supplied lockup; 'horizontal' fits a nav bar. */
  orientation?: 'horizontal' | 'stacked';
  /** Set when an ancestor (e.g. a labelled link) already names the lockup. */
  decorative?: boolean;
  className?: string;
};

/**
 * The BrokrSuite lockup: open house mark + letterspaced BROKRSUITE wordmark.
 * Both are vector outlines traced from the supplied logo, so the lockup needs
 * no webfont and stays exact at any size. Everything inherits `currentColor`
 * — the logo is monochrome, and simply flips between ink and white.
 */
export function Logo({
  variant = 'dark',
  withTagline = false,
  orientation = 'horizontal',
  decorative = false,
  className = '',
}: LogoProps) {
  const color = variant === 'light' ? 'text-white' : 'text-ink-950';
  const taglineColor = variant === 'light' ? 'text-ink-400' : 'text-ink-500';
  const stacked = orientation === 'stacked';

  return (
    <span
      className={`inline-flex ${stacked ? 'flex-col items-center gap-3' : 'flex-row items-center gap-2.5'} ${color} ${className}`}
      {...(decorative ? { 'aria-hidden': true as const } : { role: 'img', 'aria-label': site.name })}
    >
      {/* The mark and wordmark are two halves of one lockup: the wrapper
          carries the single accessible name, the parts stay silent. */}
      <LogoMark decorative className={stacked ? 'h-12 w-12' : 'h-7 w-7 shrink-0'} />
      <span className={`flex flex-col ${stacked ? 'items-center' : 'items-start'}`}>
        <Wordmark decorative className={stacked ? 'h-3.5' : 'h-[0.6875rem]'} />
        {withTagline && (
          <span
            className={`mt-1.5 text-[0.5625rem] font-medium uppercase tracking-[0.18em] ${taglineColor}`}
          >
            {site.tagline}
          </span>
        )}
      </span>
    </span>
  );
}

/**
 * The house mark on its own — favicon, app icons and tight spaces.
 * Drawn as a stroked centreline so the silhouette stays true at any scale.
 */
export function LogoMark({
  className = '',
  /** Purely ornamental use (e.g. a background watermark): hide it from AT. */
  decorative = false,
}: {
  className?: string;
  decorative?: boolean;
}) {
  return (
    <svg
      viewBox="0 -5.5 223 223"
      className={className}
      fill="none"
      {...(decorative
        ? { 'aria-hidden': true as const, focusable: 'false' as const }
        : { role: 'img', 'aria-label': `${site.name} logo` })}
    >
      <path
        d="M13 212V104.7L111.5 17.4L210 104.7V212"
        stroke="currentColor"
        strokeWidth="26"
        strokeLinejoin="miter"
      />
      <path d="M93.5 212V121.5a18 18 0 0 1 36 0V212Z" fill="currentColor" />
    </svg>
  );
}

/** The BROKRSUITE wordmark as outlines — no webfont, no faux-tracking. */
export function Wordmark({
  className = '',
  decorative = false,
}: {
  className?: string;
  decorative?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 962 102"
      className={`w-auto ${className}`}
      {...(decorative
        ? { 'aria-hidden': true as const, focusable: 'false' as const }
        : { role: 'img', 'aria-label': site.name })}
    >
      <path fill="currentColor" d="M69.8 74.4Q69.8 81.9 65.9 88.0Q62.0 94.1 54.7 97.6Q47.3 101.1 37.2 101.1H0.0V1.3H35.8Q46.0 1.3 53.2 4.7Q60.3 8.0 63.9 13.8Q67.5 19.5 67.5 26.6Q67.5 35.5 62.7 41.3Q57.9 47.1 50.0 49.7Q55.4 50.6 60.0 54.2Q64.5 57.7 67.1 63.0Q69.8 68.3 69.8 74.4ZM13.0 44.4H35.0Q44.1 44.4 49.1 40.1Q54.2 35.8 54.2 28.2Q54.2 20.6 49.1 16.3Q44.1 12.0 34.7 12.0H13.0ZM56.7 73.1Q56.7 64.8 51.0 60.0Q45.3 55.2 35.7 55.2H13.0V90.4H36.1Q45.8 90.4 51.3 85.8Q56.7 81.2 56.7 73.1Z M157.5 101.1 133.8 60.3H118.0V101.1H105.0V1.3H137.2Q148.5 1.3 156.3 5.2Q164.1 9.0 168.0 15.6Q171.9 22.2 171.9 30.7Q171.9 41.0 165.9 48.9Q160.0 56.7 148.1 59.3L173.2 101.1ZM118.0 49.9H137.2Q147.8 49.9 153.1 44.6Q158.4 39.4 158.4 30.7Q158.4 21.8 153.2 16.9Q147.9 12.0 137.2 12.0H118.0Z M204.3 51.1Q204.3 36.5 211.0 24.9Q217.7 13.2 229.1 6.7Q240.6 0.1 254.5 0.1Q268.5 0.1 280.0 6.7Q291.4 13.2 298.0 24.8Q304.6 36.4 304.6 51.1Q304.6 65.9 298.0 77.5Q291.4 89.1 280.0 95.6Q268.5 102.1 254.5 102.1Q240.6 102.1 229.1 95.6Q217.7 89.1 211.0 77.4Q204.3 65.8 204.3 51.1ZM291.3 51.1Q291.3 39.1 286.5 30.2Q281.7 21.2 273.4 16.3Q265.1 11.5 254.5 11.5Q243.9 11.5 235.6 16.3Q227.3 21.2 222.5 30.2Q217.7 39.1 217.7 51.1Q217.7 63.0 222.5 72.1Q227.3 81.1 235.6 86.0Q244.0 90.8 254.5 90.8Q264.9 90.8 273.3 86.0Q281.7 81.1 286.5 72.1Q291.3 63.0 291.3 51.1Z M393.1 101.1 352.0 55.6V101.1H339.0V1.3H352.0V47.6L393.3 1.3H409.7L364.5 51.3L410.2 101.1Z M494.5 101.1 470.7 60.3H455.0V101.1H441.9V1.3H474.2Q485.5 1.3 493.3 5.2Q501.1 9.0 505.0 15.6Q508.8 22.2 508.8 30.7Q508.8 41.0 502.9 48.9Q496.9 56.7 485.0 59.3L510.1 101.1ZM455.0 49.9H474.2Q484.8 49.9 490.1 44.6Q495.4 39.4 495.4 30.7Q495.4 21.8 490.1 16.9Q484.9 12.0 474.2 12.0H455.0Z M543.3 74.5H557.2Q557.9 81.5 563.0 86.3Q568.1 91.1 577.8 91.1Q587.1 91.1 592.5 86.5Q597.9 81.8 597.9 74.5Q597.9 68.8 594.7 65.2Q591.6 61.6 586.9 59.7Q582.1 57.9 574.1 55.7Q564.2 53.2 558.3 50.6Q552.3 48.0 548.1 42.5Q543.9 37.0 543.9 27.7Q543.9 19.5 548.0 13.2Q552.2 6.9 559.7 3.4Q567.2 0.0 577.0 0.0Q591.0 0.0 600.0 7.0Q608.9 14.0 610.1 25.6H595.7Q595.0 19.9 589.7 15.5Q584.4 11.2 575.7 11.2Q567.5 11.2 562.4 15.4Q557.2 19.6 557.2 27.2Q557.2 32.7 560.3 36.1Q563.4 39.5 567.9 41.3Q572.4 43.1 580.6 45.4Q590.4 48.1 596.5 50.8Q602.5 53.4 606.8 59.0Q611.1 64.5 611.1 73.9Q611.1 81.2 607.2 87.7Q603.3 94.1 595.7 98.1Q588.1 102.1 577.8 102.1Q567.9 102.1 560.1 98.6Q552.3 95.1 547.9 88.9Q543.5 82.7 543.3 74.5Z M660.2 1.3V64.5Q660.2 77.8 666.7 84.2Q673.2 90.7 684.8 90.7Q696.3 90.7 702.8 84.2Q709.3 77.8 709.3 64.5V1.3H722.3V64.3Q722.3 76.8 717.3 85.3Q712.3 93.8 703.8 98.0Q695.3 102.1 684.7 102.1Q674.1 102.1 665.5 98.0Q657.0 93.8 652.1 85.3Q647.1 76.8 647.1 64.3V1.3Z M774.3 1.3V101.1H761.3V1.3Z M875.1 1.3V11.9H847.9V101.1H834.9V11.9H807.5V1.3Z M921.3 11.9V45.3H957.7V56.0H921.3V90.4H962.0V101.1H908.3V1.1H962.0V11.9Z" />
    </svg>
  );
}
