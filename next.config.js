/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  /* config options here */

  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
}
module.exports = {
  i18n: {
    locales: ['en', 'de', 'fr', 'it', 'es'],
    defaultLocale: 'en',
  },
}
// module.exports = {
//   i18n: {
//     locales: ['en', 'de', 'fr', 'it', 'es'],
//     defaultLocale: 'en',
//   },
// }

module.exports = nextConfig
const withImages = require('next-images')
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: `font-src * 'unsafe-inline';connect-src *;`,
  },
  // { key: 'Cache-Control', value: 'public, max-age=31536000, must-revalidate' },
]

module.exports = withImages({
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: securityHeaders,
      },
      // {
      //   // This doesn't work for 'Cache-Control' key (works for others though):
      //   source: '/_next/image(.*)',
      //   headers: [
      //     {
      //       key: 'Cache-Control',
      //       // Instead of this value:
      //       value:
      //         'public, max-age=180, s-maxage=180, stale-while-revalidate=180',
      //       // Cache-Control response header is `public, max-age=60` in production
      //       // and `public, max-age=0, must-revalidate` in development
      //     },
      //   ],
      // },
    ]
  },
  // images: {
  //   domains: ['mykiki-data.s3.eu-central-1.amazonaws.com'],
  //   deviceSizes: [390, 448, 640, 768, 1024, 1280, 1536],
  //   formats: ['image/avif', 'image/webp'],
  //   minimumCacheTTL: 600,
  // },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    })

    config.resolve.fallback = { fs: false, path: false }
    return config
  },
  i18n: {
    locales: ['en', 'de', 'fr', 'it', 'es'],
    defaultLocale: 'en',
  },
  webpackDevMiddleware: (config) => {
    return config
  },

  future: {
    webpack5: true,
  },
})
