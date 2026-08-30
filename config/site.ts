import type { AppScreenKey } from '@/components/mockups/AppShot';

/**
 * Single source of truth for everything that changes without a redesign.
 * PRD §30 — pricing, store URLs, contact details, testimonials, statistics,
 * social links and feature content all live here, not in components.
 *
 * Anything the PRD forbids faking (§13, §14, §31) is gated behind an
 * `enabled` flag or a null URL and simply does not render until it is real.
 */

export const site = {
  name: 'BrokrSuite',
  tagline: 'Real Estate CRM',
  description:
    'Manage properties, leads, clients and your real estate business with BrokrSuite — a modern CRM platform built for real estate professionals.',
  shortDescription: 'A smarter way to manage your real estate business.',
  // Update to the production domain before deploying — used for canonical URLs,
  // Open Graph tags and sitemap.xml.
  url: 'https://brokrsuite.in',
  locale: 'en_IN',
} as const;

/** Legal entity, exactly as the app's About and Privacy screens state it. */
export const legalEntity = 'QuenchMark';

export const contact: { email: string; phone: string; address: string } = {
  email: 'support@brokrsuite.in',
  phone: '',           // e.g. '+91 98765 43210' — hidden while empty
  address: '',         // e.g. 'Sector 62, Noida, India' — hidden while empty
};

export type SocialKey = 'instagram' | 'linkedin' | 'facebook' | 'x';

export const social: Record<SocialKey, string> = {
  instagram: '',
  linkedin: '',
  facebook: '',
  x: '',
};

/**
 * App store listings. Buttons render in a disabled "Coming soon" state until
 * a real URL is set (PRD §5, §24, §31 — no fake store links).
 */
export const stores: { appStore: string | null; googlePlay: string | null } = {
  appStore: null,
  googlePlay: null,
};

/**
 * Contact form endpoint. Accepts any service that takes a JSON POST
 * (Formspree, Resend, your own API route, etc.).
 * While unset the form tells the visitor it is not connected and offers the
 * email fallback — it never fakes a success state (PRD §25).
 */
export const contactEndpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ?? '';

/* ------------------------------------------------------------------ */
/* Value propositions — PRD §6                                         */
/* ------------------------------------------------------------------ */

export type ValueProp = { icon: IconName; title: string; body: string };

export const valueProps: ValueProp[] = [
  { icon: 'building', title: 'Property Management', body: 'Manage your entire property inventory from one place.' },
  { icon: 'target', title: 'Lead Management', body: 'Capture, organize and manage your leads efficiently.' },
  { icon: 'users', title: 'Client Management', body: 'Keep client information and interactions organized.' },
  { icon: 'bell', title: 'Follow-Ups', body: 'Never miss an important client follow-up.' },
  { icon: 'team', title: 'Team Management', body: 'Manage agents and sales teams efficiently.' },
  { icon: 'chart', title: 'Business Analytics', body: 'Track your business performance and sales activity.' },
];

/* ------------------------------------------------------------------ */
/* Problems — PRD §7                                                   */
/* ------------------------------------------------------------------ */

export const problems: string[] = [
  'Property information scattered across WhatsApp and spreadsheets',
  'Leads getting lost',
  'Missed follow-ups',
  'Difficult team coordination',
  'No centralized client database',
  'Lack of visibility into sales performance',
];

/* ------------------------------------------------------------------ */
/* Features — PRD §8                                                   */
/* ------------------------------------------------------------------ */

export type Feature = {
  id: string;
  eyebrow: string;
  title: string;
  summary: string;
  points: string[];
  icon: IconName;
  /**
   * The real app screen that shows this feature. Only set where a genuine
   * screenshot exists — features without one render as text, rather than
   * borrowing an unrelated screen or a drawn stand-in.
   */
  screen?: AppScreenKey;
};

export const features: Feature[] = [
  {
    id: 'property-management',
    eyebrow: 'Feature 01',
    title: 'Property Management',
    summary: 'Your full inventory in one organized, searchable place.',
    points: [
      'Add and edit properties',
      'Upload property images',
      'Capture full property details',
      'Track property status',
      'Categorize properties',
      'Search and filter properties',
    ],
    icon: 'building',
    screen: 'explore',
  },
  {
    id: 'lead-management',
    eyebrow: 'Feature 02',
    title: 'Lead Management',
    summary: 'Every enquiry captured, assigned and tracked to a decision.',
    points: [
      'Add leads with full contact information',
      'Lead status and lead source',
      'Assigned agent',
      'Follow-up date',
      'Notes on every lead',
      'Complete lead history',
    ],
    icon: 'target',
  },
  {
    id: 'client-management',
    eyebrow: 'Feature 03',
    title: 'Client Management',
    summary: 'Know what every client wants before you pick up the phone.',
    points: [
      'Client details',
      'Requirements',
      'Preferred locations',
      'Budget',
      'Property preferences',
      'Communication history',
    ],
    icon: 'users',
  },
  {
    id: 'follow-up-management',
    eyebrow: 'Feature 04',
    title: 'Follow-Up Management',
    summary: 'Never lose a lead because of a missed follow-up.',
    points: [
      'Follow-up reminders',
      'Upcoming follow-ups',
      'Completed follow-ups',
      'Lead activity timeline',
    ],
    icon: 'bell',
  },
  {
    id: 'team-management',
    eyebrow: 'Feature 05',
    title: 'Team Management',
    summary: 'Built for agencies running more than one agent.',
    points: [
      'Add team members',
      'Assign leads',
      'Assign properties',
      'Track team activity',
      'Monitor performance',
    ],
    icon: 'team',
  },
  {
    id: 'dashboard-analytics',
    eyebrow: 'Feature 06',
    title: 'Dashboard & Analytics',
    summary: 'The state of your business, on one screen.',
    points: [
      'Total properties',
      'Active leads',
      'Closed deals',
      'Follow-ups',
      'Team performance',
      'Sales pipeline',
    ],
    icon: 'chart',
    screen: 'dashboard',
  },
];

/* ------------------------------------------------------------------ */
/* Solutions — PRD §9                                                  */
/* ------------------------------------------------------------------ */

export const solutions = [
  {
    title: 'For Individual Brokers',
    body: 'Manage properties, leads and clients without complicated software.',
    icon: 'user' as IconName,
  },
  {
    title: 'For Real Estate Agencies',
    body: "Centralize your team's operations and improve productivity.",
    icon: 'building' as IconName,
  },
  {
    title: 'For Sales Teams',
    body: 'Track leads, assignments, follow-ups and conversions.',
    icon: 'team' as IconName,
  },
  {
    title: 'For Property Businesses',
    body: 'Maintain your property inventory and customer pipeline in one place.',
    icon: 'briefcase' as IconName,
  },
];

/* ------------------------------------------------------------------ */
/* How it works — PRD §10                                              */
/* ------------------------------------------------------------------ */

export const steps = [
  { title: 'Create Your Account', body: 'Sign up and set up your business.' },
  { title: 'Add Your Properties & Leads', body: 'Import or add your property and customer information.' },
  { title: 'Manage Your Business', body: 'Track leads, clients, properties and follow-ups.' },
  { title: 'Close More Deals', body: 'Use organized data and follow-ups to improve your sales process.' },
];

/* ------------------------------------------------------------------ */
/* Pricing — PRD §12. Prices are not finalized, so `enabled` is false   */
/* and the section renders a "contact us" panel instead of numbers.     */
/* Set enabled: true and fill in `price` when pricing is confirmed.     */
/* ------------------------------------------------------------------ */

export type Plan = {
  id: string;
  name: string;
  audience: string;
  price: string | null;
  period: string;
  featured: boolean;
  limits: { users: string; properties: string; leads: string; support: string };
  features: string[];
  cta: { label: string; href: string };
};

export const pricing = {
  enabled: false,
  currency: '₹',
  note: 'Pricing is being finalized. Contact us for current plans and a walkthrough of the platform.',
  plans: [
    {
      id: 'starter',
      name: 'Starter',
      audience: 'For individual brokers.',
      price: null,
      period: '/month',
      featured: false,
      limits: { users: '1 user', properties: 'Property limit — TBC', leads: 'Lead limit — TBC', support: 'Email support' },
      features: ['Property management', 'Lead management', 'Client management', 'Follow-up reminders', 'Mobile app access'],
      cta: { label: 'Get Started', href: '/help/' },
    },
    {
      id: 'professional',
      name: 'Professional',
      audience: 'For growing real estate businesses.',
      price: null,
      period: '/month',
      featured: true,
      limits: { users: 'Multiple users', properties: 'Property limit — TBC', leads: 'Lead limit — TBC', support: 'Priority email support' },
      features: [
        'Everything in Starter',
        'Team management',
        'Lead assignment',
        'Property assignment',
        'Dashboard & analytics',
      ],
      cta: { label: 'Get Started', href: '/help/' },
    },
    {
      id: 'business',
      name: 'Business',
      audience: 'For agencies and larger teams.',
      price: null,
      period: '/month',
      featured: false,
      limits: { users: 'Team limit — TBC', properties: 'Property limit — TBC', leads: 'Lead limit — TBC', support: 'Dedicated support' },
      features: [
        'Everything in Professional',
        'Full team activity tracking',
        'Performance monitoring',
        'Sales pipeline reporting',
        'Onboarding assistance',
      ],
      cta: { label: 'Contact Sales', href: '/help/' },
    },
  ] satisfies Plan[],
};

/* ------------------------------------------------------------------ */
/* Statistics — PRD §14. Disabled: publishing unverified numbers is     */
/* explicitly forbidden. Set enabled: true once the figures are real.   */
/* ------------------------------------------------------------------ */

export const stats = {
  enabled: false,
  items: [
    { value: '', label: 'Properties Managed' },
    { value: '', label: 'Leads Managed' },
    { value: '', label: 'Agents' },
    { value: '', label: 'Accessibility' },
  ],
};

/* ------------------------------------------------------------------ */
/* Testimonials — PRD §13. Disabled: no fake reviews ship.             */
/* Add real, attributed quotes and set enabled: true.                  */
/* ------------------------------------------------------------------ */

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  image: string | null;
  rating: number | null;
};

export const testimonials = {
  enabled: false,
  items: [] as Testimonial[],
};

/* ------------------------------------------------------------------ */
/* FAQ — PRD §15                                                       */
/* ------------------------------------------------------------------ */

export const faqs = [
  {
    q: 'How do I contact a property agent?',
    a: 'On any property details page, tap the WhatsApp Inquiry button to open a direct chat with the assigned verified agent with prefilled property details.',
  },
  {
    q: 'Are my saved properties saved permanently?',
    a: 'Yes! Your favourites and saved properties are stored locally and will remain available even after restarting or updating the app.',
  },
  {
    q: 'How do I list a new property as an agent?',
    a: 'If you have an Agent account, tap the "+" button in the center of the bottom navigation bar to submit new listings with photos and specifications.',
  },
  {
    q: 'How can I delete my account and data?',
    a: 'You can permanently delete your account anytime from Profile \u2192 Delete My Account. All your credentials and session data will be permanently wiped.',
  },
];

/* ------------------------------------------------------------------ */

export type IconName =
  | 'building'
  | 'target'
  | 'users'
  | 'bell'
  | 'team'
  | 'chart'
  | 'user'
  | 'briefcase'
  | 'check'
  | 'search'
  | 'shield'
  | 'sparkle'
  | 'mail'
  | 'message';
