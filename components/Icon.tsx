import type { IconName } from '@/config/site';

/**
 * Small hand-picked icon set (1.5px stroke, 24px grid) so the site ships no
 * icon-library dependency — PRD §27 "no unnecessary libraries".
 */
const paths: Record<IconName, React.ReactNode> = {
  building: (
    <>
      <path d="M3 21h18M5 21V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v16M13 21V10a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v11" />
      <path d="M8 8h2M8 12h2M8 16h2M16 13h1M16 17h1" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 4V2M12 22v-2M4 12H2M22 12h-2" />
    </>
  ),
  users: (
    <>
      <path d="M16 20v-1.5a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4V20" />
      <circle cx="9.5" cy="7.5" r="3.5" />
      <path d="M21 20v-1.5a4 4 0 0 0-3-3.87M15.5 4.13a3.5 3.5 0 0 1 0 6.74" />
    </>
  ),
  bell: (
    <>
      <path d="M18 8.5a6 6 0 1 0-12 0c0 5-2.5 6.5-2.5 6.5h17S18 13.5 18 8.5z" />
      <path d="M13.7 19a2 2 0 0 1-3.4 0" />
    </>
  ),
  team: (
    <>
      <circle cx="12" cy="6" r="3" />
      <circle cx="5" cy="17" r="2.5" />
      <circle cx="19" cy="17" r="2.5" />
      <path d="M12 9v3M12 12L6.8 15M12 12l5.2 3" />
    </>
  ),
  chart: (
    <>
      <path d="M3 20h18" />
      <path d="M6.5 20v-6M12 20V6M17.5 20v-9" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="3.75" />
      <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7.5" width="18" height="12.5" rx="2" />
      <path d="M8.5 7.5V5.75A1.75 1.75 0 0 1 10.25 4h3.5a1.75 1.75 0 0 1 1.75 1.75V7.5M3 12.5h18" />
    </>
  ),
  check: <path d="M4.5 12.5l5 5 10-11" />,
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M20 20l-4.3-4.3" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7.5 3v5.6c0 4.4-3 8.2-7.5 9.4-4.5-1.2-7.5-5-7.5-9.4V6L12 3z" />
      <path d="M9.2 12l2 2 3.6-3.8" />
    </>
  ),
  sparkle: <path d="M12 3l1.9 5.6L19.5 10l-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.4L12 3z" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 6.5l8.5 6 8.5-6" />
    </>
  ),
  message: <path d="M21 12a8 8 0 0 1-8 8H4l2.1-2.9A8 8 0 1 1 21 12z" />,
};

export function Icon({
  name,
  className = 'h-5 w-5',
  strokeWidth = 1.6,
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
