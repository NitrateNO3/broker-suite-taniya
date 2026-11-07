/**
 * Navigation. "FAQ" is a homepage section rather than a standalone page, so it
 * resolves to an anchor — every link here points at something that actually
 * exists.
 *
 * Desktop dropdowns render their links only while open, so every page in a
 * dropdown must also be linked from the footer to stay crawlable.
 */
export type NavLink = { label: string; href: string; danger?: boolean };
export type NavItem = NavLink & { children?: readonly NavLink[] };

/** The SEO landing pages, in the order they are offered to visitors. */
export const solutionLinks: readonly NavLink[] = [
  { label: 'CRM for Brokers & Agents', href: '/real-estate-broker-crm/' },
  { label: 'Real Estate Agency Software', href: '/real-estate-agency-software/' },
  { label: 'Lead Management', href: '/real-estate-lead-management/' },
  { label: 'Property Inventory Management', href: '/property-inventory-management/' },
  { label: 'Sales Management', href: '/real-estate-sales-management/' },
  { label: 'Real Estate CRM App', href: '/real-estate-crm-app/' },
];

export const mainNav: readonly NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Features', href: '/features/' },
  { label: 'Solutions', href: '/#solutions', children: solutionLinks },
  { label: 'How It Works', href: '/how-it-works/' },
  { label: 'Pricing', href: '/pricing/' },
  {
    label: 'Help',
    href: '/help/',
    children: [
      { label: 'Help & Support', href: '/help/' },
      { label: 'Blog', href: '/blog/' },
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
      { label: 'Download App', href: '/real-estate-crm-app/' },
      { label: 'Book a Demo', href: '/book-a-demo/' },
    ],
  },
  {
    heading: 'Solutions',
    links: solutionLinks.filter((link) => link.href !== '/real-estate-crm-app/'),
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about/' },
      { label: 'Blog', href: '/blog/' },
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
