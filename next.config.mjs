/** @type {import('next').NextConfig} */
const nextConfig = {
  // Resized, modern-format variants per device (served by Vercel's image optimizer).
  images: { formats: ['image/avif', 'image/webp'] },
  trailingSlash: true,
  reactStrictMode: true,
  async redirects() {
    return [
      // The trial page became a demo page while the trial offer is unconfirmed.
      { source: '/free-trial', destination: '/book-a-demo/', permanent: true },
    ];
  },
};

export default nextConfig;
