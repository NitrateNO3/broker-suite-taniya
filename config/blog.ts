import type { LandingSlug } from '@/config/landing';

/**
 * Blog posts. Body blocks are rendered by components/Prose.tsx; inline text
 * supports [label](/path) links and **bold**.
 *
 * Editorial rules (docs/seo/CONTENT-STRATEGY.md): no statistics without a cited
 * source, no claims about competitors without a dated source, and product
 * statements only from the confirmed feature set.
 */

export type Block =
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] };

export type Post = {
  slug: string;
  title: string;
  /** <title> before the suffix, when it should differ from the H1. */
  seoTitle?: string;
  description: string;
  published: string;
  updated: string;
  readingMinutes: number;
  /** The landing page this article supports — linked prominently at the end. */
  supports: LandingSlug;
  body: Block[];
};

export const posts: Post[] = [
  {
    slug: 'how-to-manage-real-estate-leads',
    title: 'How to Manage Real Estate Leads Effectively',
    description:
      'A practical system for managing real estate leads: capture every enquiry, qualify it, assign an owner, follow up on schedule and track every lead to a decision.',
    published: '2026-11-07',
    updated: '2026-11-07',
    readingMinutes: 7,
    supports: 'real-estate-lead-management',
    body: [
      {
        type: 'p',
        text: 'Most brokers do not lose deals because they lack leads. They lose them because an enquiry was never called back, was called back too late, or slipped between two agents who each assumed the other had it. Managing real estate leads well is less about volume and more about having a simple, repeatable system that every lead goes through.',
      },
      {
        type: 'p',
        text: 'This guide sets out that system in five stages: capture, qualify, assign, follow up and track. It works whether you are an independent broker or an agency with a team of agents.',
      },
      { type: 'h2', text: '1. Capture every enquiry in one place' },
      {
        type: 'p',
        text: 'Leads arrive from many directions — property portals, your website, referrals, signboards, walk-ins, phone calls and messages. The first rule is that every one of them ends up in the same place, recorded the same way, as soon as it arrives.',
      },
      {
        type: 'p',
        text: 'For each new lead, record at minimum:',
      },
      {
        type: 'ul',
        items: [
          '**Contact details** — name, phone number and email.',
          '**Source** — where the lead came from, so you can see later which channels produce clients.',
          '**What they want** — buying or renting, property type, preferred locations and budget.',
          '**Date of first contact** — so you can measure how quickly you respond.',
        ],
      },
      {
        type: 'p',
        text: 'A notebook or a chat history cannot do this reliably, because it cannot be searched, sorted or shared. A spreadsheet is better, but it quickly becomes out of date when several people are using it.',
      },
      { type: 'h2', text: '2. Qualify before you invest time' },
      {
        type: 'p',
        text: 'Not every enquiry is a buyer ready to act. Qualifying a lead means finding out, early, how serious and how ready they are, so you can spend your time where it is most likely to pay off. Useful questions include:',
      },
      {
        type: 'ul',
        items: [
          'What is the budget, and is finance arranged or being arranged?',
          'What is the timeline — this month, this quarter, or just looking?',
          'Which locations and property types are a must, and which are flexible?',
          'Who else is involved in the decision?',
        ],
      },
      {
        type: 'p',
        text: 'Record the answers on the lead, and reflect them in its status. A simple set of statuses — for example new, contacted, qualified, visit scheduled, negotiating, closed and lost — is enough to show at a glance where every lead stands.',
      },
      { type: 'h2', text: '3. Give every lead one owner' },
      {
        type: 'p',
        text: 'In a team, the most common reason a lead goes cold is that nobody is clearly responsible for it. Assign every lead to exactly one agent as soon as it is captured. That agent owns the next step, and everyone else can see who to ask.',
      },
      {
        type: 'p',
        text: 'Clear ownership also protects the business. When an agent is on leave or moves on, their leads — and the history attached to them — stay with the agency and can be reassigned rather than lost.',
      },
      { type: 'h2', text: '4. Follow up on a schedule, not from memory' },
      {
        type: 'p',
        text: 'Follow-up is where most leads are won or lost. The fix is simple: every open lead should always have a next follow-up date. When you finish a conversation, set the date for the next one before you move on.',
      },
      {
        type: 'p',
        text: 'Then start each day with the list of follow-ups that are due. Work through it before anything else, and record the outcome of each conversation in the lead’s notes. Over time the notes become a complete history, so whoever picks up the lead next knows exactly what has been said and promised.',
      },
      {
        type: 'p',
        text: 'A few habits make follow-up far more effective:',
      },
      {
        type: 'ul',
        items: [
          '**Respond to new enquiries quickly.** Interest is highest just after someone reaches out.',
          '**Bring something new each time** — a fresh listing, a price change, an answer to an earlier question.',
          '**Match listings to the client’s stated requirements** rather than sending everything you have.',
          '**Close the loop.** If a lead is no longer looking, mark it lost and record why, instead of leaving it open.',
        ],
      },
      { type: 'h2', text: '5. Track every lead to a decision' },
      {
        type: 'p',
        text: 'A lead is only finished when it is closed or deliberately marked as lost. Reviewing your leads regularly — weekly works well — shows you where things are stuck. Look for leads with no follow-up date, leads that have sat in the same status for too long, and agents with more open leads than they can realistically work.',
      },
      {
        type: 'p',
        text: 'Over a few months, the lead sources and statuses you have recorded also tell you which channels bring in clients who actually close, so you can put more effort into those.',
      },
      { type: 'h2', text: 'Putting the system into practice' },
      {
        type: 'p',
        text: 'You can run this system on paper or in a spreadsheet, but it becomes much easier with real estate lead management software that is built around it. In [BrokrSuite](/real-estate-lead-management/), every lead records its contact information, source, status, assigned agent, follow-up date, notes and complete history, and follow-up reminders show what is due today, what is coming up and what is done.',
      },
      {
        type: 'p',
        text: 'Because leads sit alongside your [property inventory](/property-inventory-management/) and client records in the same app, matching an enquiry to the right listing takes seconds rather than a search through your phone.',
      },
      { type: 'h2', text: 'A quick checklist' },
      {
        type: 'ol',
        items: [
          'Every lead is recorded in one place, with its source.',
          'Every lead is qualified and has a status.',
          'Every lead has exactly one owner.',
          'Every open lead has a next follow-up date.',
          'Every lead ends as closed or lost — never just forgotten.',
        ],
      },
    ],
  },

  {
    slug: 'property-inventory-management-guide',
    title: 'Property Inventory Management for Real Estate: A Complete Guide',
    seoTitle: 'Property Inventory Management: A Complete Guide',
    description:
      'What inventory means in real estate, why brokers and agencies struggle with it, and a step-by-step way to keep property listings organized, current and easy to share.',
    published: '2026-11-07',
    updated: '2026-11-07',
    readingMinutes: 8,
    supports: 'property-inventory-management',
    body: [
      {
        type: 'p',
        text: 'Ask a broker what they have available in a particular area and budget, and the speed and accuracy of the answer says a great deal about their business. That answer depends on one thing: how well they manage their property inventory.',
      },
      {
        type: 'p',
        text: 'This guide explains what inventory means in real estate, why it is so often managed badly, and how to build a process that keeps every listing organized, current and ready to share.',
      },
      { type: 'h2', text: 'What is inventory in real estate?' },
      {
        type: 'p',
        text: 'For a broker or agency, inventory is the set of properties you can currently offer to buyers or tenants: homes, apartments, villas, plots, offices and shops, for sale or for rent. Each item in that inventory has details that clients care about — location, price, size and configuration, amenities, photos and availability.',
      },
      {
        type: 'p',
        text: 'Property inventory management is the practice of recording all of that information consistently, keeping it up to date as things change, and being able to find the right property for a client quickly.',
      },
      {
        type: 'p',
        text: 'It is worth separating this from “property management” in the landlord sense, which is about running rented buildings: collecting rent, screening tenants and handling maintenance. Inventory management for brokers is about the listings you market and sell.',
      },
      { type: 'h2', text: 'Why inventory gets out of control' },
      {
        type: 'p',
        text: 'Inventory problems are rarely about effort. They come from where the information lives:',
      },
      {
        type: 'ul',
        items: [
          '**Scattered sources.** Details arrive from owners by phone and message, photos sit in a phone gallery, and prices are noted in a spreadsheet.',
          '**Stale status.** A property is sold or rented, but nobody updates the list, so it keeps being offered.',
          '**Inconsistent details.** One listing has a price per square foot, another does not; one has photos, another has a single blurry image.',
          '**Private copies.** In an agency, each agent keeps their own version, and none of them is complete.',
        ],
      },
      {
        type: 'p',
        text: 'The result is slower answers for clients, embarrassing moments when a “available” property turns out to be gone, and deals missed because the right listing could not be found in time.',
      },
      { type: 'h2', text: 'What every listing record should contain' },
      {
        type: 'p',
        text: 'Consistency is what makes an inventory searchable. Decide on a standard record and use it for every property:',
      },
      {
        type: 'ul',
        items: [
          '**Category and type** — residential or commercial; house, villa, apartment, bungalow, plot, office.',
          '**Transaction** — for sale or for rent.',
          '**Location** — city, locality and address details.',
          '**Price** — asking price, and price per square foot where relevant.',
          '**Configuration** — bedrooms, bathrooms and area.',
          '**Amenities** — parking, security, lift, power backup and so on.',
          '**Photos** — a proper gallery, not a single image.',
          '**Description** — a short, accurate summary.',
          '**Status** — available, under offer, sold or rented.',
          '**Owner or advisor contact** — who to speak to about the property.',
        ],
      },
      { type: 'h2', text: 'A step-by-step process' },
      { type: 'h3', text: 'Step 1: Centralize' },
      {
        type: 'p',
        text: 'Move every current listing into one system that the whole team uses. This is the hardest step and the most valuable. Start with the properties you are actively marketing, then add the rest.',
      },
      { type: 'h3', text: 'Step 2: Standardize' },
      {
        type: 'p',
        text: 'Fill in the standard record for each property. Where information is missing — a price per square foot, decent photos — make a note to get it from the owner.',
      },
      { type: 'h3', text: 'Step 3: Categorize' },
      {
        type: 'p',
        text: 'Group properties by category and type so they can be filtered. When a client asks for a three-bedroom apartment in a particular area, you should be able to narrow the list in a few taps.',
      },
      { type: 'h3', text: 'Step 4: Keep status current' },
      {
        type: 'p',
        text: 'Make updating status part of closing a deal. The moment a property is sold, rented or withdrawn, change its status. A short weekly review catches anything that slipped.',
      },
      { type: 'h3', text: 'Step 5: Connect inventory to clients' },
      {
        type: 'p',
        text: 'Inventory is only valuable when it meets demand. Record each client’s budget, preferred locations and property preferences, and use them to match clients to listings — then schedule visits directly from the property you are offering.',
      },
      { type: 'h2', text: 'Using software for inventory management' },
      {
        type: 'p',
        text: 'Spreadsheets can hold a small inventory, but they struggle with photos, cannot easily be filtered on a phone during a client call, and drift out of date when several people edit them. Real estate inventory management software solves those problems by keeping every listing, with its photos and status, in one shared place.',
      },
      {
        type: 'p',
        text: 'In [BrokrSuite](/property-inventory-management/), you can add and edit properties, upload images, capture full details, track status, categorize properties and search and filter them. Each listing shows its gallery, price, configuration, price per square foot, amenities and description, and you can share it or schedule a visit from the same screen. Because inventory sits alongside [lead management](/real-estate-lead-management/) and client records, matching a buyer to a property happens in one place.',
      },
      { type: 'h2', text: 'Checklist: a healthy property inventory' },
      {
        type: 'ol',
        items: [
          'All current listings live in one shared system.',
          'Every listing uses the same standard record.',
          'Every listing has photos and an accurate price.',
          'Status is updated the moment a property changes hands.',
          'Client requirements are recorded so listings can be matched to them.',
        ],
      },
    ],
  },

  {
    slug: 'why-real-estate-agencies-need-crm',
    title: 'Why Real Estate Agencies Need CRM Software',
    description:
      'The problems agencies hit as they grow — scattered listings, lost leads, unclear ownership and no visibility — and how a real estate CRM solves each of them.',
    published: '2026-11-07',
    updated: '2026-11-07',
    readingMinutes: 6,
    supports: 'real-estate-agency-software',
    body: [
      {
        type: 'p',
        text: 'A single broker can run a successful business from a phone, a notebook and a good memory. An agency cannot. Once there are several agents, the informal systems that worked for one person start to break, and the cost shows up as lost leads, duplicated effort and decisions made without the facts.',
      },
      {
        type: 'p',
        text: 'This is the point at which agencies turn to CRM — customer relationship management — software. Here are the problems it solves, and what to look for.',
      },
      { type: 'h2', text: 'Problem 1: Everyone has their own version of the business' },
      {
        type: 'p',
        text: 'Without a shared system, each agent keeps their own listings, contacts and follow-up list. Nobody has the full picture, and when an agent leaves, their pipeline leaves with them.',
      },
      {
        type: 'p',
        text: '**How a CRM helps:** properties, leads and clients live in one shared record that belongs to the agency. Notes and history stay attached to the client, not to an individual’s phone.',
      },
      { type: 'h2', text: 'Problem 2: Leads fall through the cracks' },
      {
        type: 'p',
        text: 'Enquiries come in through many channels and many people. Some are never followed up; others are contacted twice by different agents.',
      },
      {
        type: 'p',
        text: '**How a CRM helps:** every lead is recorded with its source and status and assigned to one agent, with a follow-up date so the next step is never left to memory.',
      },
      { type: 'h2', text: 'Problem 3: Nobody knows who owns what' },
      {
        type: 'p',
        text: 'When responsibility is informal, it is unclear who is handling a particular client or property — which leads both to gaps and to friction between agents.',
      },
      {
        type: 'p',
        text: '**How a CRM helps:** leads and properties are explicitly assigned to team members, so ownership is visible to everyone.',
      },
      { type: 'h2', text: 'Problem 4: Inventory is out of date' },
      {
        type: 'p',
        text: 'Listings are spread across spreadsheets and galleries, and their status is not always current, so agents offer properties that are no longer available.',
      },
      {
        type: 'p',
        text: '**How a CRM helps:** one shared inventory with photos, details and status that every agent searches. When a property is sold or rented, it changes for everyone at once. Our [guide to property inventory management](/blog/property-inventory-management-guide/) covers this in depth.',
      },
      { type: 'h2', text: 'Problem 5: Managers are working blind' },
      {
        type: 'p',
        text: 'Without data, an agency owner cannot easily answer basic questions: how many active leads do we have, what is due this week, which agents are closing, and where are deals getting stuck?',
      },
      {
        type: 'p',
        text: '**How a CRM helps:** a dashboard built from the work the team records — active leads, follow-ups, closed deals and team performance — gives managers an up-to-date view without anyone compiling a report.',
      },
      { type: 'h2', text: 'What to look for in a real estate CRM' },
      {
        type: 'p',
        text: 'General-purpose CRMs are built around sales pipelines for any industry. Real estate agencies are usually better served by a CRM designed for property, because the job is not just managing contacts — it is matching people to listings. Look for:',
      },
      {
        type: 'ul',
        items: [
          '**Property inventory and leads in one system**, so you can match clients to listings.',
          '**Client requirements** — budget, preferred locations and property preferences.',
          '**Follow-up reminders** with upcoming and completed follow-ups.',
          '**Team management** — adding members and assigning leads and properties.',
          '**A dashboard** that shows leads, deals, follow-ups and team performance.',
          '**Mobile access**, because agents spend much of their day away from a desk.',
        ],
      },
      { type: 'h2', text: 'How BrokrSuite fits' },
      {
        type: 'p',
        text: '[BrokrSuite](/real-estate-agency-software/) is real estate CRM software built around those needs. It combines property inventory, lead management, client management, follow-ups, team management and business analytics in one app for iPhone and Android, so an agency’s whole team works from the same record.',
      },
      {
        type: 'p',
        text: 'If you are weighing up whether your agency is ready for a CRM, the simplest test is this: if one of your agents left tomorrow, how much of their pipeline would you be able to recover? If the honest answer is “not much”, it is time.',
      },
    ],
  },
];

export const postPath = (slug: string) => `/blog/${slug}/`;
