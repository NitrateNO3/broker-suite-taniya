import Image from 'next/image';

/**
 * Real screenshots exported from the BrokrSuite app. Each entry is an actual
 * product screen — nothing here is a rendering or a placeholder, so a screen
 * may only be referenced where the app genuinely shows it.
 */
export const appScreens = {
  splash: {
    src: '/app/splash.webp',
    alt: 'BrokrSuite app splash screen — the BrokrSuite logo over a house, with the line "Your Real Estate Partner, Built for the Future."',
    label: 'Opening the app',
    blurb:
      'The app opens on the BrokrSuite mark while it loads — the same lockup you see across the product.',
  },
  onboarding: {
    src: '/app/onboarding.webp',
    alt: 'BrokrSuite app onboarding screen — "Perfect Place", with the tagline "Find the Perfect Property That Fits Your Lifestyle" and a Get Started button.',
    label: 'Welcome',
    blurb:
      'First run introduces what the app is for and hands you a single Get Started button, rather than an account wall.',
  },
  login: {
    src: '/app/login.webp',
    alt: 'BrokrSuite app sign-in screen — username and password fields, a Login button, and Google and Apple sign-in options.',
    label: 'Signing in',
    blurb:
      'Sign in with a username and password, or continue with a Google or Apple account. Password recovery is on the same screen.',
  },
  explore: {
    src: '/app/explore.webp',
    alt: 'BrokrSuite app property search — location set to Mumbai, a search field, House, Villa, Apartment and Bungalow category filters, and Recommended and Nearby Properties listings.',
    label: 'Browsing properties',
    blurb:
      'Set your location, then search or narrow the list by category — House, Villa, Apartment, Bungalow and more. Listings are grouped into Recommended and Nearby Properties, and anything can be saved with the heart.',
  },
  'property-detail': {
    src: '/app/property-detail.webp',
    alt: 'BrokrSuite app property detail screen — a commercial listing at ₹1.60 Cr in Sector 57, Gurugram, with photos, bedroom and bathroom counts, price per square foot, amenities and a Schedule Visit button.',
    label: 'Viewing a property',
    blurb:
      'A listing carries its photo gallery, asking price, configuration, price per square foot, locality, amenities and full description. From here you can schedule a visit, share the listing, or open a WhatsApp inquiry with the assigned agent.',
  },
  dashboard: {
    src: '/app/dashboard.webp',
    alt: 'BrokrSuite app dashboard — a week calendar strip, total leads and revenue tiles, a "Today’s Tasks" list, recent leads and a property summary.',
    label: 'Working your day',
    blurb:
      'The agent dashboard opens on the week ahead, with total leads and revenue, the tasks due today, your most recent leads and a summary of your properties.',
  },
} as const;

export type AppScreenKey = keyof typeof appScreens;

/** The screens in the order a new user actually meets them. */
export const screenOrder: AppScreenKey[] = [
  'splash',
  'onboarding',
  'login',
  'explore',
  'property-detail',
  'dashboard',
];

/** One app screenshot, sized to the exported 562×1281 asset. */
export function AppShot({
  screen,
  priority = false,
  /** Ornamental use (a thumbnail in a composition): drop it from the a11y tree
      rather than reading a long screen description no one asked for. */
  decorative = false,
  sizes = '(min-width: 640px) 256px, 240px',
}: {
  screen: AppScreenKey;
  priority?: boolean;
  decorative?: boolean;
  sizes?: string;
}) {
  const { src, alt } = appScreens[screen];
  return (
    <Image
      src={src}
      alt={decorative ? '' : alt}
      aria-hidden={decorative || undefined}
      width={562}
      height={1281}
      priority={priority}
      sizes={sizes}
      className="block h-auto w-full"
    />
  );
}
