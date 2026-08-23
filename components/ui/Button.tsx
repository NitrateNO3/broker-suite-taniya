import Link from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'inverse';
type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors duration-150 ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 ' +
  'disabled:cursor-not-allowed disabled:opacity-50';

const variants: Record<Variant, string> = {
  primary: 'bg-brand-600 text-white shadow-sm hover:bg-brand-700 active:bg-brand-800',
  secondary:
    'bg-white text-ink-800 ring-1 ring-inset ring-ink-200 shadow-xs hover:bg-ink-50 hover:ring-ink-300 active:bg-ink-100',
  ghost: 'text-ink-700 hover:bg-ink-100 active:bg-ink-200',
  inverse:
    'bg-white text-ink-950 shadow-sm hover:bg-ink-100 active:bg-ink-200 focus-visible:ring-offset-ink-950',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3.5 text-sm',
  md: 'h-11 px-5 text-[0.9375rem]',
  lg: 'h-[3.25rem] px-7 text-base',
};

type ButtonProps = {
  variant?: Variant;
  size?: Size;
  href?: string;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<'button'>, 'className' | 'children'>;

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    const external = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:');
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
