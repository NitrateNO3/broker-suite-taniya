import type { ReactNode } from 'react';

/**
 * Device shell for app screenshots. Purely presentational CSS — no image
 * payload — so it stays sharp at any size and costs nothing to load.
 */
export function PhoneFrame({
  children,
  className = '',
  label,
}: {
  children: ReactNode;
  className?: string;
  label: string;
}) {
  return (
    <div
      className={`relative w-full max-w-[280px] rounded-[2.25rem] bg-ink-900 p-2 shadow-xl ring-1 ring-ink-800 ${className}`}
      role="img"
      aria-label={label}
    >
      <div className="relative overflow-hidden rounded-[1.75rem] bg-ink-50">
        {/* Status bar */}
        <div className="flex items-center justify-between bg-white px-5 pb-1 pt-3">
          <span className="text-[0.625rem] font-semibold text-ink-900">9:41</span>
          <div className="flex items-center gap-1" aria-hidden="true">
            <span className="h-1.5 w-1.5 rounded-full bg-ink-300" />
            <span className="h-1.5 w-1.5 rounded-full bg-ink-300" />
            <span className="h-2 w-3.5 rounded-sm bg-ink-300" />
          </div>
        </div>
        <div className="h-[430px] overflow-hidden">{children}</div>
      </div>
      {/* Home indicator */}
      <div className="absolute bottom-3 left-1/2 h-1 w-24 -translate-x-1/2 rounded-full bg-white/25" aria-hidden="true" />
    </div>
  );
}
