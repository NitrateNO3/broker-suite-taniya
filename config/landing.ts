import type { AppScreenKey } from '@/components/mockups/AppShot';
import type { Faq } from '@/config/site';

/**
 * SEO landing pages — one primary search intent each (see docs/seo/keyword-map.csv).
 *
 * Every capability named here is one of the six confirmed modules in
 * config/site.ts `features`, or is visible in a genuine screenshot in
 * public/app (Schedule Visit, listing share, Today's Tasks, the leads and
 * revenue tiles). Do not add integrations, automation, AI, security claims or
 * a web dashboard without verifying them in the app first.
 */

export type LandingSlug =
  | 'real-estate-broker-crm'
  | 'real-estate-lead-management'
  | 'property-inventory-management'
  | 'real-estate-agency-software'
  | 'real-estate-sales-management'
  | 'real-estate-crm-app';

export type LandingPage = {
  slug: LandingSlug;
  /** Short name for breadcrumbs and related-page cards. */
  name: string;
  /** <title> before the " | BrokrSuite" suffix. */
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  intro: string;
  screen?: AppScreenKey;
  screenCaption?: string;
  overview: { heading: string; paragraphs: string[] };
  benefits: { heading: string; body?: string; items: { title: string; body: string }[] };
  /** Feature ids from config/site.ts, rendered with their real point lists. */
  featureIds: string[];
  featuresHeading: string;
  workflow: { heading: string; items: { title: string; body: string }[] };
  faqs: Faq[];
  related: LandingSlug[];
  /** ISO date of the last substantive content change — feeds sitemap lastmod. */
  updated: string;
};

export const landingPages: Record<LandingSlug, LandingPage> = {
  'real-estate-broker-crm': {
    slug: 'real-estate-broker-crm',
    name: 'CRM for Brokers & Agents',
    title: 'CRM for Real Estate Brokers & Agents',
    description:
      'BrokrSuite is a CRM for real estate brokers, agents and property dealers. Keep listings, leads, clients and follow-ups in one app on iPhone and Android.',
    eyebrow: 'For brokers & agents',
    h1: 'The CRM for real estate brokers and agents',
    intro:
      'Your listings, your buyers and your next call — in one app on your phone. BrokrSuite gives independent brokers, agents and property dealers a single place to run the day instead of a spreadsheet, a notebook and a dozen chat threads.',
    screen: 'dashboard',
    screenCaption:
      'The BrokrSuite dashboard: the week ahead, total leads and revenue, today’s tasks and your most recent leads.',
    overview: {
      heading: 'Built around how a broker actually works',
      paragraphs: [
        'A broker’s business is two lists that have to meet: the properties you can offer and the people looking for one. Most brokers keep those lists in different places — listings in a spreadsheet or a phone gallery, enquiries in call logs and chats, reminders in their head. Deals slip through the gap between them.',
        'BrokrSuite puts both lists in the same app. Every property carries its photos, price, configuration, location and status. Every lead carries its contact details, source, status, notes and follow-up date. Every client record keeps their budget, preferred locations and requirements, so you can match them to the right listing before you pick up the phone.',
        'Because it runs on your phone, it goes where you go: a site visit, a client meeting, the car between appointments.',
      ],
    },
    benefits: {
      heading: 'What changes when your business lives in one app',
      items: [
        {
          title: 'No more lost enquiries',
          body: 'Every lead is logged with its source and status the moment it comes in, so nothing depends on remembering who called.',
        },
        {
          title: 'Follow-ups that actually happen',
          body: 'Set a follow-up date on any lead and see what is due today, what is coming up and what is done.',
        },
        {
          title: 'Listings ready to share',
          body: 'Each property has its gallery, price, amenities and description in one place, ready to share with a client or open for a site visit.',
        },
        {
          title: 'A clear view of your week',
          body: 'The dashboard opens on your calendar, today’s tasks, your recent leads and a summary of your properties.',
        },
      ],
    },
    featureIds: ['property-management', 'lead-management', 'client-management', 'follow-up-management'],
    featuresHeading: 'Everything an individual broker needs',
    workflow: {
      heading: 'A typical day in BrokrSuite',
      items: [
        { title: 'Check the dashboard', body: 'See today’s tasks, the week ahead and your newest leads.' },
        { title: 'Log a new enquiry', body: 'Add the lead with contact details, source and a follow-up date.' },
        { title: 'Match a property', body: 'Search and filter your inventory against the client’s budget and location.' },
        { title: 'Schedule the visit', body: 'Book the site visit from the listing and record the outcome afterwards.' },
      ],
    },
    faqs: [
      {
        q: 'Is BrokrSuite suitable for an individual broker?',
        a: 'Yes. BrokrSuite works for a single broker managing their own listings and clients, and scales to agencies with several agents when you add team members.',
      },
      {
        q: 'Is BrokrSuite a CRM for property dealers too?',
        a: 'Yes. Property dealers, brokers and agents all do the same core job — matching properties to buyers and tenants — and BrokrSuite is built around exactly that workflow.',
      },
      {
        q: 'Can I manage both properties and leads in the same CRM?',
        a: 'Yes. Property inventory and lead management are both core BrokrSuite modules, alongside client records, follow-ups, team management and analytics.',
      },
      {
        q: 'Do I need a computer to use BrokrSuite?',
        a: 'No. BrokrSuite is a mobile app for iPhone and Android, so you can run your business from your phone.',
      },
    ],
    related: ['real-estate-lead-management', 'property-inventory-management', 'real-estate-crm-app'],
    updated: '2026-11-07',
  },

  'real-estate-lead-management': {
    slug: 'real-estate-lead-management',
    name: 'Lead Management',
    title: 'Real Estate Lead Management Software',
    description:
      'Track every property enquiry from first contact to closed deal. BrokrSuite logs lead source, status, assigned agent, notes and follow-up dates in one app.',
    eyebrow: 'Lead management',
    h1: 'Real estate lead management software',
    intro:
      'Every enquiry captured, assigned and tracked to a decision. BrokrSuite gives each lead a status, a source, an owner and a next step — so your pipeline is something you can see, not something you have to remember.',
    screen: 'dashboard',
    screenCaption: 'Total leads and recent leads sit on the BrokrSuite dashboard, next to today’s tasks.',
    overview: {
      heading: 'Why real estate leads go cold',
      paragraphs: [
        'Property enquiries arrive from everywhere — portals, referrals, signboards, walk-ins, calls and messages. When they are tracked in a notebook or a chat history, the same things go wrong: a lead is never called back, two agents call the same person, or a promising buyer goes quiet because nobody followed up.',
        'Real estate lead management software fixes this by giving every enquiry a record and a next step. In BrokrSuite, each lead holds the person’s contact information, where the lead came from, its current status, the agent responsible, notes from every conversation and the date of the next follow-up.',
        'With the full history on one screen, anyone picking up the lead knows exactly where it stands.',
      ],
    },
    benefits: {
      heading: 'Lead tracking that keeps deals moving',
      items: [
        {
          title: 'Know where every lead came from',
          body: 'Record the lead source on each enquiry to see which channels bring in the buyers and tenants you actually close.',
        },
        {
          title: 'One owner per lead',
          body: 'Assign each lead to an agent so responsibility is clear and nobody doubles up.',
        },
        {
          title: 'A next step on every record',
          body: 'Follow-up dates and reminders make sure each lead gets its next call on time.',
        },
        {
          title: 'The whole conversation in one place',
          body: 'Notes and complete lead history mean context is never lost when a lead changes hands.',
        },
      ],
    },
    featureIds: ['lead-management', 'follow-up-management', 'client-management'],
    featuresHeading: 'Lead and follow-up tools in BrokrSuite',
    workflow: {
      heading: 'From enquiry to decision',
      items: [
        { title: 'Capture', body: 'Add the lead with contact details and the source it came from.' },
        { title: 'Assign', body: 'Give the lead to the right agent on your team.' },
        { title: 'Follow up', body: 'Set the next follow-up date and get reminded when it is due.' },
        { title: 'Update the status', body: 'Move the lead forward and keep notes on every conversation until it closes.' },
      ],
    },
    faqs: [
      {
        q: 'What is real estate lead management software?',
        a: 'It is software that records every property enquiry, tracks its status and source, assigns it to an agent and schedules follow-ups, so leads are worked consistently instead of from memory.',
      },
      {
        q: 'Can I assign leads to different agents?',
        a: 'Yes. Each lead in BrokrSuite has an assigned agent, and team management lets you assign leads across your team.',
      },
      {
        q: 'Does BrokrSuite remind me to follow up?',
        a: 'Yes. You can set a follow-up date on any lead, and BrokrSuite shows follow-up reminders along with upcoming and completed follow-ups.',
      },
      {
        q: 'Does BrokrSuite generate leads?',
        a: 'No. BrokrSuite is for managing the leads you already receive — capturing, assigning, tracking and following them up. It is not a lead-generation or advertising service.',
      },
    ],
    related: ['real-estate-sales-management', 'real-estate-broker-crm', 'real-estate-agency-software'],
    updated: '2026-11-07',
  },

  'property-inventory-management': {
    slug: 'property-inventory-management',
    name: 'Property Inventory Management',
    title: 'Property Inventory Management Software',
    description:
      'Real estate inventory management software for brokers and agencies. Add listings with photos, details and status, then search, filter and share them from one app.',
    eyebrow: 'Property inventory',
    h1: 'Property inventory management software for real estate',
    intro:
      'Your full inventory in one organized, searchable place. Add every property with its photos, price, configuration, location and status — then find the right one for a client in seconds.',
    screen: 'property-detail',
    screenCaption:
      'A BrokrSuite listing: photo gallery, status and price, configuration, price per square foot, amenities and a Schedule Visit button.',
    overview: {
      heading: 'What property inventory management means for a brokerage',
      paragraphs: [
        'In real estate, your inventory is every property you can currently offer — homes, apartments, villas, plots and commercial space, for sale or for rent. For most brokerages that inventory is spread across spreadsheets, phone galleries and messages from owners, which makes it hard to answer the simplest client question: what do you have that fits my budget?',
        'BrokrSuite keeps the whole inventory in one place. Each listing carries its photos, category, price, configuration, location, amenities, description and current status. You can categorize properties, search and filter them, edit details as they change and see at a glance what is still available.',
        'This is inventory management for brokers and agencies — the listings you market — not landlord software for rent collection or maintenance.',
      ],
    },
    benefits: {
      heading: 'Why a single inventory matters',
      items: [
        {
          title: 'Answer client questions instantly',
          body: 'Search and filter by category to find matching properties while the client is still on the phone.',
        },
        {
          title: 'Status you can trust',
          body: 'Track each property’s status so your team never offers something that has already gone.',
        },
        {
          title: 'Listings that sell themselves',
          body: 'Photo galleries, price per square foot, amenities and full descriptions, ready to share with a client.',
        },
        {
          title: 'From listing to site visit',
          body: 'Schedule a visit straight from the property page.',
        },
      ],
    },
    featureIds: ['property-management', 'team-management', 'dashboard-analytics'],
    featuresHeading: 'Inventory tools in BrokrSuite',
    workflow: {
      heading: 'How a property moves through BrokrSuite',
      items: [
        { title: 'Add the property', body: 'Enter details, upload images and choose its category.' },
        { title: 'Keep it current', body: 'Edit price, details and status as the listing changes.' },
        { title: 'Match and share', body: 'Search the inventory for a client and share the listing.' },
        { title: 'Book the visit', body: 'Schedule a site visit from the listing itself.' },
      ],
    },
    faqs: [
      {
        q: 'What is inventory in real estate?',
        a: 'Inventory is the set of properties a broker or agency can currently offer to buyers or tenants. Managing it well means knowing exactly what is available, at what price and in what condition.',
      },
      {
        q: 'Can I upload photos for each property?',
        a: 'Yes. Each BrokrSuite listing has a photo gallery alongside its price, configuration, location, amenities and description.',
      },
      {
        q: 'Is BrokrSuite landlord or rental property management software?',
        a: 'No. BrokrSuite manages the listings a broker or agency markets, together with leads and clients. It does not handle rent collection, tenant screening or maintenance requests.',
      },
      {
        q: 'Can I assign properties to agents?',
        a: 'Yes. Team management in BrokrSuite lets you assign properties as well as leads to members of your team.',
      },
    ],
    related: ['real-estate-broker-crm', 'real-estate-agency-software', 'real-estate-crm-app'],
    updated: '2026-11-07',
  },

  'real-estate-agency-software': {
    slug: 'real-estate-agency-software',
    name: 'Real Estate Agency Software',
    title: 'Real Estate Agency Software for Teams',
    description:
      'Real estate agency software that brings agents, listings, leads and clients into one app. Assign work, track team activity and monitor performance with BrokrSuite.',
    eyebrow: 'For agencies',
    h1: 'Real estate agency software for growing teams',
    intro:
      'Built for agencies running more than one agent. BrokrSuite gives your whole team one shared system for properties, leads and clients — and gives you a clear view of who is working on what.',
    screen: 'explore',
    screenCaption:
      'Agents search the shared inventory by location and category, with recommended and nearby properties grouped for them.',
    overview: {
      heading: 'The coordination problem every agency hits',
      paragraphs: [
        'An agency with several agents has a coordination problem that a solo broker does not. Listings and enquiries arrive through different people, and without a shared system each agent ends up with their own private version of the business: their own spreadsheet, their own contacts, their own follow-up list. When an agent is out — or leaves — their pipeline goes with them.',
        'BrokrSuite gives the agency one shared record. Properties, leads and clients live in the same system, and work is assigned rather than claimed. You can add team members, assign leads and properties to them, and track team activity and performance from the dashboard.',
        'The result is a business that does not depend on any one person’s memory or phone.',
      ],
    },
    benefits: {
      heading: 'What an agency gets from one shared system',
      items: [
        {
          title: 'Clear ownership',
          body: 'Every lead and property can be assigned to an agent, so responsibility is never ambiguous.',
        },
        {
          title: 'Visibility for managers',
          body: 'Track team activity and monitor performance without chasing agents for updates.',
        },
        {
          title: 'Continuity when people change',
          body: 'Client history and notes stay with the agency, not in an individual’s phone.',
        },
        {
          title: 'One inventory for everyone',
          body: 'Every agent searches the same up-to-date listings instead of their own copy.',
        },
      ],
    },
    featureIds: ['team-management', 'lead-management', 'property-management', 'dashboard-analytics'],
    featuresHeading: 'Agency tools in BrokrSuite',
    workflow: {
      heading: 'Rolling BrokrSuite out across an agency',
      items: [
        { title: 'Add your team', body: 'Invite your agents as team members.' },
        { title: 'Centralize listings', body: 'Bring your property inventory into one shared place.' },
        { title: 'Assign the work', body: 'Allocate leads and properties to the right agents.' },
        { title: 'Track performance', body: 'Watch team activity and results from the dashboard.' },
      ],
    },
    faqs: [
      {
        q: 'What is real estate agency software?',
        a: 'It is software that lets an agency run its listings, leads, clients and agents from one shared system, instead of each agent working from their own spreadsheets and contacts.',
      },
      {
        q: 'Can managers see what each agent is working on?',
        a: 'Yes. BrokrSuite lets you assign leads and properties to agents and track team activity and performance.',
      },
      {
        q: 'Is BrokrSuite only for large agencies?',
        a: 'No. It works for a single broker and grows with you as you add team members.',
      },
      {
        q: 'How do we get our agency started?',
        a: 'Book a demo and we will walk through BrokrSuite with your agency’s setup in mind, then help you set up your properties, leads and team.',
      },
    ],
    related: ['real-estate-sales-management', 'real-estate-lead-management', 'property-inventory-management'],
    updated: '2026-11-07',
  },

  'real-estate-sales-management': {
    slug: 'real-estate-sales-management',
    name: 'Sales Management',
    title: 'Real Estate Sales Management Software',
    description:
      'See your real estate sales pipeline in one place. BrokrSuite tracks leads, follow-ups, closed deals and team performance on a single dashboard.',
    eyebrow: 'Sales management',
    h1: 'Real estate sales management software',
    intro:
      'The state of your business, on one screen. BrokrSuite connects your leads, follow-ups and team activity to the numbers that matter — so you can manage sales on facts instead of gut feel.',
    screen: 'dashboard',
    screenCaption: 'The dashboard brings total leads, revenue, today’s tasks and a property summary together.',
    overview: {
      heading: 'Managing a sales pipeline you can actually see',
      paragraphs: [
        'Real estate sales are long, uneven and spread across many people. A buyer may take weeks of calls and several site visits to decide, and in a team those conversations are split across agents. Without a single view of the pipeline it is hard to answer basic questions: how many active leads do we have, what is due today, and who is closing deals?',
        'BrokrSuite gives you that view. The dashboard brings together total properties, active leads, closed deals, follow-ups, team performance and the sales pipeline, alongside today’s tasks and your most recent leads.',
        'Because the numbers come from the same records your team works in every day, they stay current without anyone compiling a report.',
      ],
    },
    benefits: {
      heading: 'Sales management that runs on real activity',
      items: [
        {
          title: 'One view of the pipeline',
          body: 'Active leads, follow-ups and closed deals in one place rather than scattered across agents.',
        },
        {
          title: 'Today’s priorities first',
          body: 'Today’s tasks and due follow-ups surface on the dashboard, so the most important calls happen first.',
        },
        {
          title: 'Team performance in context',
          body: 'Monitor team performance alongside the leads and deals behind it.',
        },
        {
          title: 'Numbers without spreadsheets',
          body: 'Figures update from the work itself, not from a weekly report someone has to build.',
        },
      ],
    },
    featureIds: ['dashboard-analytics', 'follow-up-management', 'team-management'],
    featuresHeading: 'Sales and analytics tools in BrokrSuite',
    workflow: {
      heading: 'A weekly sales rhythm with BrokrSuite',
      items: [
        { title: 'Review the dashboard', body: 'Check active leads, closed deals and the pipeline.' },
        { title: 'Work today’s list', body: 'Clear today’s tasks and due follow-ups.' },
        { title: 'Rebalance the team', body: 'Reassign leads where an agent is overloaded.' },
        { title: 'Track the result', body: 'Watch team performance and closed deals over time.' },
      ],
    },
    faqs: [
      {
        q: 'What does real estate sales management software do?',
        a: 'It gives brokers and agency managers a single view of their sales pipeline — leads, follow-ups, deals and team performance — built from the day-to-day work recorded in the system.',
      },
      {
        q: 'Which numbers does the BrokrSuite dashboard show?',
        a: 'The dashboard covers total properties, active leads, closed deals, follow-ups, team performance and the sales pipeline, along with total leads, revenue, today’s tasks and recent leads.',
      },
      {
        q: 'Can I track individual agents’ performance?',
        a: 'Yes. Team management in BrokrSuite includes tracking team activity and monitoring performance.',
      },
      {
        q: 'Do I have to build reports manually?',
        a: 'No. The dashboard is built from the leads, follow-ups and deals your team records in BrokrSuite.',
      },
    ],
    related: ['real-estate-lead-management', 'real-estate-agency-software', 'real-estate-broker-crm'],
    updated: '2026-11-07',
  },

  'real-estate-crm-app': {
    slug: 'real-estate-crm-app',
    name: 'Real Estate CRM App',
    title: 'Real Estate CRM App for iPhone & Android',
    description:
      'BrokrSuite is a real estate CRM app for iPhone and Android. Manage listings, leads, clients, follow-ups and your team from your phone, on the App Store or Google Play.',
    eyebrow: 'Mobile app',
    h1: 'The real estate CRM app for iPhone and Android',
    intro:
      'Your real estate CRM, wherever you go. BrokrSuite is a mobile app, so your listings, leads and follow-ups are with you on a site visit, in a client meeting or between appointments.',
    screen: 'explore',
    screenCaption:
      'Browsing properties in the BrokrSuite app: location, search, category filters, and recommended and nearby listings.',
    overview: {
      heading: 'Why a real estate CRM belongs on your phone',
      paragraphs: [
        'Real estate is not a desk job. The moments that matter — a buyer asking what else is available, a seller calling with a price change, a follow-up that needs to happen before the end of the day — rarely happen in front of a computer.',
        'BrokrSuite is built as a mobile app for exactly that reason. Sign in with a username and password or with your Google or Apple account, and the full business is in your pocket: browse and search the inventory, open a listing with its photos and details, schedule a visit, log a new lead and see today’s tasks on the dashboard.',
        'The app is available on the App Store for iPhone and on Google Play for Android.',
      ],
    },
    benefits: {
      heading: 'What you can do from the app',
      items: [
        {
          title: 'Browse and search listings',
          body: 'Set a location, search, and filter by category such as house, villa, apartment or bungalow.',
        },
        {
          title: 'Open a full listing',
          body: 'Photos, price, configuration, price per square foot, amenities and description on one screen.',
        },
        {
          title: 'Schedule visits and share',
          body: 'Book a site visit or share the listing straight from the property page.',
        },
        {
          title: 'Run your day from the dashboard',
          body: 'Your week, total leads, revenue, today’s tasks and recent leads at a glance.',
        },
      ],
    },
    featureIds: ['property-management', 'lead-management', 'follow-up-management', 'dashboard-analytics'],
    featuresHeading: 'Everything in the BrokrSuite app',
    workflow: {
      heading: 'Getting started with the app',
      items: [
        { title: 'Download', body: 'Get BrokrSuite from the App Store or Google Play.' },
        { title: 'Sign in', body: 'Use a username and password, or continue with Google or Apple.' },
        { title: 'Add your business', body: 'Add your properties, leads and client details.' },
        { title: 'Work from anywhere', body: 'Track leads, follow-ups and listings from your phone.' },
      ],
    },
    faqs: [
      {
        q: 'Is BrokrSuite available on iPhone and Android?',
        a: 'Yes. BrokrSuite is on the App Store for iPhone and on Google Play for Android.',
      },
      {
        q: 'Is the BrokrSuite app free to download?',
        a: 'Yes, the app is free to download from both stores. Business plans are being finalized — book a demo for current pricing.',
      },
      {
        q: 'How do I sign in to the app?',
        a: 'Sign in with a username and password, or continue with your Google or Apple account. Password recovery is available on the sign-in screen.',
      },
      {
        q: 'Can I manage leads from the app?',
        a: 'Yes. Lead management, client records, follow-ups, property inventory, team management and analytics are all part of the BrokrSuite app.',
      },
    ],
    related: ['real-estate-broker-crm', 'property-inventory-management', 'real-estate-lead-management'],
    updated: '2026-11-07',
  },
};

export const landingSlugs = Object.keys(landingPages) as LandingSlug[];

export const landingPath = (slug: LandingSlug) => `/${slug}/`;
