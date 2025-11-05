/** @type {import('next').NextConfig} */
const nextConfig = {
  // App directory is now stable in Next.js 14
  
  async headers() {
    return [
      {
        // Cache scrollytelling video assets for 1 year (immutable)
        source: '/story/:path*.(webm|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache UI assets (SVG) for 1 week
        source: '/story/ui/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=604800, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig
