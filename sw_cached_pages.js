"use strict";

var cacheName = 'v1';
var cacheAssets = ['index.html', 'about.html', '/css/style.css', '/js/main.js']; // Call Install Event

self.addEventListener('install', function (e) {
  console.log('Service Worker: Installed');
  e.waitUntil(caches.open(cacheName).then(function (cache) {
    console.log('Service Worker: Caching Files');
    cache.addAll(cacheAssets);
  }).then(function () {
    return self.skipWaiting();
  }));
}); // Call Activate Event

self.addEventListener('activate', function (e) {
  console.log('Service Worker: Activated'); // Remove unwanted caches

  e.waitUntil(caches.keys().then(function (cacheNames) {
    return Promise.all(cacheNames.map(function (cache) {
      if (cache !== cacheName) {
        console.log('Service Worker: Clearing Old Cache');
        return caches.delete(cache);
      }
    }));
  }));
}); // Call Fetch Event

self.addEventListener('fetch', function (e) {
  console.log('Service Worker: Fetching', e.request.url);
  e.respondWith(fetch(e.request).catch(function () {
    console.log('*File fetched from cache*');
    return caches.match(e.request);
  }));
});
