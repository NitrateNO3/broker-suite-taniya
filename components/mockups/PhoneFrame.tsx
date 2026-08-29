import type { ReactNode } from 'react';

/**
 * Device shell for the app screenshots. The screenshots carry their own
 * status bar and home indicator, so the frame adds nothing but the bezel —
 * it never draws invented chrome on top of a real screen.
 */
export function PhoneFrame({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative w-full max-w-[280px] rounded-[2.25rem] bg-ink-900 p-2 shadow-xl ring-1 ring-ink-800 ${className}`}
    >
      <div className="overflow-hidden rounded-[1.75rem] bg-ink-50">{children}</div>
    </div>
  );
}
