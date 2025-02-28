module.exports = {
  globDirectory: 'out/',
  globPatterns: [
    '**/*.{html,js,css,png,svg,jpg,gif,json,ico}'
  ],
  swSrc: 'src/service-worker.ts',
  swDest: 'out/service-worker.js',
  // Add these patterns to runtime caching
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/public-api\.wordpress\.com\/rest\/v1\.1\/sites/,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'wp-api-cache',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 24 * 60 * 60 // 24 hours
        }
      }
    }
  ]
}; 