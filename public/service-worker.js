/* eslint-disable no-restricted-globals */

import { clientsClaim } from 'https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-core/workbox-core.prod.js';
import { ExpirationPlugin } from 'https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-expiration/workbox-expiration.prod.js';
import { precacheAndRoute, createHandlerBoundToURL } from 'https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-precaching/workbox-precaching.prod.js';
import { registerRoute } from 'https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-routing/workbox-routing.prod.js';
import { StaleWhileRevalidate } from 'https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-strategies/workbox-strategies.prod.js';



clientsClaim();


precacheAndRoute(self.__WB_MANIFEST);


const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$');
registerRoute(
  // Return false to exempt requests from being fulfilled by index.html.
  ({ request, url }) => {
    // If this isn't a navigation, skip.
    if (request.mode !== 'navigate') {
      return false;
    } // If this is a URL that starts with /_, skip.

    if (url.pathname.startsWith('/_')) {
      return false;
    } // If this looks like a URL for a resource, because it contains // a file extension, skip.

    if (url.pathname.match(fileExtensionRegexp)) {
      return false;
    } // Return true to signal that we want to use the handler.

    return true;
  },
  createHandlerBoundToURL(process.env.PUBLIC_URL + '/index.html')
);


registerRoute(
  // Add in any other file extensions or routing criteria as needed.
  ({ url }) => url.origin === self.location.origin && url.pathname.endsWith('.png'), // Customize this strategy as needed, e.g., by changing to CacheFirst.
  new StaleWhileRevalidate({
    cacheName: 'images',
    plugins: [
      // Ensure that once this runtime cache reaches a maximum size the
      // least-recently used images are removed.
      new ExpirationPlugin({ maxEntries: 50 }),
    ],
  })
);

// This allows the web app to trigger skipWaiting via
// registration.waiting.postMessage({type: 'SKIP_WAITING'})
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Any other custom service worker logic can go here.

const MESSAGE_TYPES = {
  CHECK_ONLINE_STATUS: "CHECK_ONLINE_STATUS",
  ONLINE_STATUS: "ONLINE_STATUS",
};

// Handle incoming messages
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === MESSAGE_TYPES.CHECK_ONLINE_STATUS) {
    const isOnline = navigator.onLine;

    if (event.source && typeof event.source.postMessage === "function") {
      event.source.postMessage({
        type: MESSAGE_TYPES.ONLINE_STATUS,
        payload: isOnline,
      });
    } else {
      console.error("No valid source to post a message.");
    }
  } else {
    console.warn("Unhandled message type:", event.data?.type);
  }
});

// Fallback for offline requests
self.addEventListener("fetch", (event) => {
  if (!navigator.onLine) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        console.log("Offline fetch response:", response); 
        return (
          response ||
          new Response("You are offline. Content is unavailable.", {
            status: 503,
            statusText: "Service Unavailable",
            headers: { "Content-Type": "text/plain" },
          })
        );
      })
    );
  } else {
    // Optional: Dynamic caching for online requests
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const responseClone = response.clone();
          caches.open("offline-cache-v1").then((cache) => {
            cache.put(event.request, responseClone);
          });
          return response;
        })
        .catch((error) => {
          console.error("Fetch failed:", error);
          return new Response("Network error occurred.", {
            status: 408,
            statusText: "Request Timeout",
          });
        })
    );
  }
});

// Activate event: Clear old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== "offline-cache-v1")
          .map((cacheName) => caches.delete(cacheName))
      );
    }).then(() => console.log("Old caches cleared."))
  );
});
