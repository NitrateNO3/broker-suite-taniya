import { AppShot } from '@/components/mockups/AppShot';

/**
 * The hero's product shot: the app's own welcome screen on a phone, tilted in
 * a lit panel, with two further real screens floating alongside it.
 *
 * Everything on screen here is an actual exported screenshot — the panel adds
 * light and perspective, never invented UI.
 */
export function PhoneShowcase() {
  return (
    <div className="relative mx-auto w-full max-w-[22rem] sm:max-w-[26rem] lg:max-w-[30rem]">
      <div className="relative aspect-[5/6] overflow-hidden rounded-[2rem] bg-[radial-gradient(120%_90%_at_50%_0%,#1B2340_0%,#0C1022_55%,#080B16_100%)] ring-1 ring-inset ring-white/10">
        {/* --- Light. Decorative, and still on prefers-reduced-motion. --- */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.55),transparent_62%)] blur-2xl motion-safe:animate-drift"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-14%] top-[22%] h-[18rem] w-[18rem] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.38),transparent_62%)] blur-2xl motion-safe:animate-drift-slow"
        />
        {/* Halo ring behind the device */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[19rem] w-[19rem] -translate-x-1/2 -translate-y-[54%] rounded-full border border-white/15"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[13rem] w-[13rem] -translate-x-1/2 -translate-y-[54%] rounded-full border border-white/10"
        />

        {/* --- The device, tilted in perspective --- */}
        <div className="absolute inset-0 flex items-center justify-center [perspective:1400px]">
          <div
            className="relative w-[43%] [transform:rotateX(8deg)_rotateY(-22deg)_rotateZ(-3deg)] [transform-style:preserve-3d]"
          >
            <div className="overflow-hidden rounded-[1.6rem] bg-ink-950 p-1.5 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.75)] ring-1 ring-white/15">
              <div className="overflow-hidden rounded-[1.25rem]">
                <AppShot screen="splash" priority sizes="(min-width: 1024px) 260px, 60vw" />
              </div>
            </div>
            {/* Edge highlight, so the device reads as glass rather than a flat rectangle */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-[1.6rem] bg-[linear-gradient(115deg,rgba(255,255,255,0.22),transparent_38%)]"
            />
          </div>
        </div>

        {/* --- Two further real screens, floating --- */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[4%] top-[30%] w-[16%] rotate-[-10deg] overflow-hidden rounded-xl ring-1 ring-white/20 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.7)]"
        >
          <AppShot screen="explore" decorative sizes="120px" />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[3%] top-[50%] w-[17%] rotate-[9deg] overflow-hidden rounded-xl ring-1 ring-white/20 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.7)]"
        >
          <AppShot screen="property-detail" decorative sizes="130px" />
        </div>

        {/* Accent chip, echoing the app's brand colour */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[11%] right-[22%] flex items-center gap-2 rounded-xl bg-brand-600/90 px-3 py-2.5 shadow-lg ring-1 ring-white/25 backdrop-blur-sm"
        >
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
            <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" className="h-3 w-3">
              <path d="M4 12.5l5 5 11-11" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="h-1.5 w-10 rounded-full bg-white/70" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
        </div>

        {/* Floor reflection */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-[linear-gradient(to_top,rgba(124,58,237,0.18),transparent)]"
        />
      </div>
    </div>
  );
}
