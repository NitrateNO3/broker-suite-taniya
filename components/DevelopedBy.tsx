import Image from 'next/image';

/**
 * Build credit. The monogram is black artwork, so it sits on a light tile to
 * stay legible against the dark footer.
 */
export function DevelopedBy({ className = '' }: { className?: string }) {
  return (
    <a
      href="https://quenchmark.org/"
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center gap-3 rounded-2xl bg-white/[0.06] px-3 py-2.5 ring-1 ring-inset ring-white/10 transition-colors hover:bg-white/[0.1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 ${className}`}
    >
      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
        <Image
          src="/quenchmark.png"
          alt=""
          aria-hidden="true"
          width={192}
          height={192}
          className="h-7 w-7 object-contain"
        />
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-ink-400">
          Developed by
        </span>
        <span className="mt-1.5 text-[0.9375rem] font-bold text-white">QuenchMark</span>
      </span>
    </a>
  );
}
