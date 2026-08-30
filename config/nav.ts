/**
 * Navigation. "Solutions" and "FAQ" are homepage sections rather than
 * standalone pages, so they resolve to anchors — every link here points at
 * something that actually exists.
 */
export type NavLink = { label: string; href: string; danger?: boolean };
export type NavItem = NavLink & { children?: readonly NavLink[] };

export const mainNav: readonly NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Features', href: '/features/' },
  { label: 'Solutions', href: '/#solutions' },
  { label: 'How It Works', href: '/how-it-works/' },
  { label: 'Pricing', href: '/pricing/' },
  {
    label: 'Help',
    href: '/help/',
    children: [
      { label: 'Help & Support', href: '/help/' },
      { label: 'FAQ', href: '/#faq' },
      { label: 'About', href: '/about/' },
      { label: 'Privacy Policy', href: '/privacy/' },
      { label: 'Delete Account', href: '/delete-account/', danger: true },
    ],
  },
] as const;

export const footerNav = [
  {
    heading: 'Product',
    links: [
      { label: 'Features', href: '/features/' },
      { label: 'How It Works', href: '/how-it-works/' },
      { label: 'Pricing', href: '/pricing/' },
      { label: 'Download App', href: '/#download' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about/' },
      { label: 'Solutions', href: '/#solutions' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Help & Support', href: '/help/' },
      { label: 'FAQ', href: '/#faq' },
      { label: 'Privacy Policy', href: '/privacy/' },
      { label: 'Delete Account', href: '/delete-account/', danger: true },
    ],
  },
] as const;
