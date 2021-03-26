import {precacheAndRoute} from 'workbox-precaching';
import {registerRoute} from 'workbox-routing';
import {CacheFirst} from 'workbox-strategies';
import {ExpirationPlugin} from 'workbox-expiration';

precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
    new RegExp('https:\/\/pluralsight\-pwa\-scratch\.firebaseio\.com\/.*\.json'),
    new CacheFirst({
      cacheName: "api-cache",
      plugins: [
        new ExpirationPlugin({
          maxEntries: 50,
          purgeOnQuotaError: true,
          maxAgeSeconds: 10 * 86400 // 10 days
        })
      ]
    })
);
