/**
 * Navigation. "Solutions", "How It Works" and "FAQ" are homepage sections in
 * the PRD rather than standalone pages, so they resolve to anchors — every
 * link here points at something that actually exists.
 */
export const mainNav = [
  { label: 'Home', href: '/' },
  { label: 'Features', href: '/features/' },
  { label: 'Solutions', href: '/#solutions' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Pricing', href: '/pricing/' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Contact', href: '/contact/' },
] as const;

export const footerNav = [
  {
    heading: 'Product',
    links: [
      { label: 'Features', href: '/features/' },
      { label: 'Pricing', href: '/pricing/' },
      { label: 'Solutions', href: '/#solutions' },
      { label: 'Download App', href: '/#download' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about/' },
      { label: 'Contact', href: '/contact/' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'FAQ', href: '/#faq' },
      { label: 'Privacy Policy', href: '/privacy/' },
      { label: 'Terms & Conditions', href: '/terms/' },
      { label: 'Cookie Policy', href: '/cookies/' },
      { label: 'Refund Policy', href: '/refund/' },
    ],
  },
] as const;
