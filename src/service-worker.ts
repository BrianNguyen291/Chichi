import { clientsClaim } from 'workbox-core';
import { createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching';
import { NavigationRoute, registerRoute } from 'workbox-routing';

// Enable clientsClaim
clientsClaim();

// Precache all assets defined by Webpack's workbox injectManifest
precacheAndRoute(self.__WB_MANIFEST);

// Create a handler for navigation requests
const handler = createHandlerBoundToURL('/index.html');

// Create a new navigation route that matches all localized blog paths
const navigationRoute = new NavigationRoute(handler, {
  allowlist: [
    // Match localized blog routes with any query parameters
    new RegExp('^/(vi|en|zh-Hant|zh-Hans)/blog'),
    // Match all localized routes (optional)
    new RegExp('^/(vi|en|zh-Hant|zh-Hans)/'),
  ],
  denylist: [
    // Exclude API routes and static assets
    new RegExp('/_next/'),
    new RegExp('/api/'),
    new RegExp('/[^/]+\\.[^/]+$'),
  ],
});

// Register the navigation route
registerRoute(navigationRoute); 