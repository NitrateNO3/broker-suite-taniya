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
    'BrokrSuite is real estate CRM software for brokers, agents and agencies. Manage property inventory, leads, clients, follow-ups and your team from one app.',
  shortDescription: 'A smarter way to manage your real estate business.',
  // Canonical host — the apex 308-redirects here in Vercel. Drives canonical
  // URLs, Open Graph tags, structured data and sitemap.xml.
  url: 'https://www.brokrsuite.in',
  // Global, English-first audience.
  locale: 'en_US',
} as const;

/**
 * The site's primary call to action. A free trial is not advertised until the
 * offer is confirmed, so every conversion button points at a demo request.
 */
export const demoCta = { label: 'Book a Demo', href: '/book-a-demo/' } as const;

/** Legal entity, exactly as the app's About and Privacy screens state it. */
export const legalEntity = 'QuenchMark';

/** Where free-trial enquiries are sent — separate from the support address. */
export const trialInbox = 'brokrsuiteofficial@gmail.com';

/**
 * Web3Forms access key. Public by design — it ships in the client bundle on
 * every site that uses Web3Forms, so this is an identifier, not a secret.
 * Set NEXT_PUBLIC_WEB3FORMS_KEY to override it without a code change.
 */
export const web3formsKey =
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY || '4cfe3668-2764-4bdc-9c04-e9a8e0d54076';

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
  appStore: 'https://apps.apple.com/in/app/brokrsuite/id6807412019',
  googlePlay: 'https://play.google.com/store/apps/details?id=com.brokrsuite.app',
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

export type ValueProp = { icon: IconName; title: string; body: string; href?: string };

export const valueProps: ValueProp[] = [
  { icon: 'building', title: 'Property Management', body: 'Manage your entire property inventory from one place.', href: '/property-inventory-management/' },
  { icon: 'target', title: 'Lead Management', body: 'Capture, organize and manage your leads efficiently.', href: '/real-estate-lead-management/' },
  { icon: 'users', title: 'Client Management', body: 'Keep client information and interactions organized.' },
  { icon: 'bell', title: 'Follow-Ups', body: 'Never miss an important client follow-up.' },
  { icon: 'team', title: 'Team Management', body: 'Manage agents and sales teams efficiently.', href: '/real-estate-agency-software/' },
  { icon: 'chart', title: 'Business Analytics', body: 'Track your business performance and sales activity.', href: '/real-estate-sales-management/' },
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
  /** The landing page that covers this feature in depth. */
  page?: { href: string; label: string };
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
    page: { href: '/property-inventory-management/', label: 'Property inventory management' },
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
    page: { href: '/real-estate-lead-management/', label: 'Real estate lead management' },
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
    page: { href: '/real-estate-agency-software/', label: 'Software for real estate agencies' },
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
    page: { href: '/real-estate-sales-management/', label: 'Real estate sales management' },
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
    href: '/real-estate-broker-crm/',
    body: 'Manage properties, leads and clients without complicated software.',
    icon: 'user' as IconName,
  },
  {
    title: 'For Real Estate Agencies',
    href: '/real-estate-agency-software/',
    body: "Centralize your team's operations and improve productivity.",
    icon: 'building' as IconName,
  },
  {
    title: 'For Sales Teams',
    href: '/real-estate-sales-management/',
    body: 'Track leads, assignments, follow-ups and conversions.',
    icon: 'team' as IconName,
  },
  {
    title: 'For Property Businesses',
    href: '/property-inventory-management/',
    body: 'Maintain your property inventory and customer pipeline in one place.',
    icon: 'briefcase' as IconName,
  },
];

/* ------------------------------------------------------------------ */
/* How it works — PRD §10                                              */
/* ------------------------------------------------------------------ */

export const steps = [
  { title: 'Create Your Account', body: 'Sign up and set up your business.' },
  { title: 'Add Your Properties & Leads', body: 'Add your properties, leads and client details.' },
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
      cta: { label: 'Book a Demo', href: '/book-a-demo/' },
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
      cta: { label: 'Book a Demo', href: '/book-a-demo/' },
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
      cta: { label: 'Contact Sales', href: '/book-a-demo/' },
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
/* FAQs                                                                */
/* ------------------------------------------------------------------ */

export type Faq = { q: string; a: string };

/** Questions someone evaluating BrokrSuite asks — the homepage FAQ. */
export const buyerFaqs: Faq[] = [
  {
    q: 'What is BrokrSuite?',
    a: 'BrokrSuite is real estate CRM software from QuenchMark. It brings your property inventory, leads, clients, follow-ups, team activity and business analytics into one app, so your listings and your sales pipeline live in the same place.',
  },
  {
    q: 'Who is BrokrSuite for?',
    a: 'Individual brokers and property dealers, real estate agents, agencies running several agents, and sales teams that need to see every lead and follow-up in one place.',
  },
  {
    q: 'Which devices does BrokrSuite run on?',
    a: 'BrokrSuite is a mobile app, available on the App Store for iPhone and on Google Play for Android.',
  },
  {
    q: 'Can I manage my team in BrokrSuite?',
    a: 'Yes. You can add team members, assign leads and properties to them, and track team activity and performance from the dashboard.',
  },
  {
    q: 'How much does BrokrSuite cost?',
    a: 'Pricing is being finalized. There are plans for individual brokers, growing real estate businesses and larger agencies — book a demo and we will take you through the current options.',
  },
  {
    q: 'How do I get started?',
    a: 'Download the app from the App Store or Google Play, or book a demo and we will walk you through BrokrSuite with your own business in mind.',
  },
];

/** In-app support answers — mirrors the app's Help & Support screen. */
export const supportFaqs: Faq[] = [
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
