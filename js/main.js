"use strict";

// Make sure sw are supported
var parser = new UAParser();
var result = parser.getResult();
console.log('%c Browser Type ', 'background: blue; color: #bada55', result.browser);
console.log('%c Mobile Type ', 'background: red; color: #bada55', result.device);
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/../sw_cached_pages.js').then(function (reg) {
      console.log('sw reg')
      return console.log('Service Worker: Registered (Pages)');
    }).catch(function (err) {
      return console.log("Service Worker: Error: ".concat(err));
    });
  });
} else {
  console.log('%c Does Not support ServiceWorker! ', 'background: #222; color: #bada55', navigator);
}
