if(!self.define){let e,s={};const n=(n,i)=>(n=new URL(n+".js",i).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(i,a)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let t={};const r=e=>n(e,c),o={module:{uri:c},exports:t,require:r};s[c]=Promise.all(i.map((e=>o[e]||r(e)))).then((e=>(a(...e),t)))}}define(["./workbox-3c9d0171"],(function(e){"use strict";importScripts("/worker-07b3999886d7d025.js"),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/KjGHVNCMWHw5CkF0rhwWE/_buildManifest.js",revision:"b92739078b1718c22157588b5c987c31"},{url:"/_next/static/KjGHVNCMWHw5CkF0rhwWE/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/192-d830bf360c8ff170.js",revision:"KjGHVNCMWHw5CkF0rhwWE"},{url:"/_next/static/chunks/496-242963d986e0e9ff.js",revision:"KjGHVNCMWHw5CkF0rhwWE"},{url:"/_next/static/chunks/5bb8e170-b5dee04b4e03f254.js",revision:"KjGHVNCMWHw5CkF0rhwWE"},{url:"/_next/static/chunks/727-e53a22396e5effd0.js",revision:"KjGHVNCMWHw5CkF0rhwWE"},{url:"/_next/static/chunks/9048db3c-4e9fa93e280ef75b.js",revision:"KjGHVNCMWHw5CkF0rhwWE"},{url:"/_next/static/chunks/907-209105362c41a4f9.js",revision:"KjGHVNCMWHw5CkF0rhwWE"},{url:"/_next/static/chunks/94-6c283927c78bc091.js",revision:"KjGHVNCMWHw5CkF0rhwWE"},{url:"/_next/static/chunks/app/_not-found/page-297dd1344024a6b4.js",revision:"KjGHVNCMWHw5CkF0rhwWE"},{url:"/_next/static/chunks/app/forms/tree-survey-form/page-e7a3b2909573ea6c.js",revision:"KjGHVNCMWHw5CkF0rhwWE"},{url:"/_next/static/chunks/app/layout-6c7c978e18486af1.js",revision:"KjGHVNCMWHw5CkF0rhwWE"},{url:"/_next/static/chunks/app/page-b034b2f6335440cb.js",revision:"KjGHVNCMWHw5CkF0rhwWE"},{url:"/_next/static/chunks/app/survey-list/page-0bf25f470b3c3f56.js",revision:"KjGHVNCMWHw5CkF0rhwWE"},{url:"/_next/static/chunks/framework-180cc137bfad14b0.js",revision:"KjGHVNCMWHw5CkF0rhwWE"},{url:"/_next/static/chunks/main-app-6d931e9cb75b33b5.js",revision:"KjGHVNCMWHw5CkF0rhwWE"},{url:"/_next/static/chunks/main-c851042ca20afd1b.js",revision:"KjGHVNCMWHw5CkF0rhwWE"},{url:"/_next/static/chunks/pages/_app-88bfdd990fbfa239.js",revision:"KjGHVNCMWHw5CkF0rhwWE"},{url:"/_next/static/chunks/pages/_error-740f732e466af7da.js",revision:"KjGHVNCMWHw5CkF0rhwWE"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-180da8a82f64c319.js",revision:"KjGHVNCMWHw5CkF0rhwWE"},{url:"/_next/static/css/1260609ccc794399.css",revision:"1260609ccc794399"},{url:"/_next/static/media/roboto-mono-cyrillic-ext-wght-normal.c4c16fff.woff2",revision:"c4c16fff"},{url:"/_next/static/media/roboto-mono-cyrillic-wght-normal.7e038d40.woff2",revision:"7e038d40"},{url:"/_next/static/media/roboto-mono-greek-wght-normal.184f26cc.woff2",revision:"184f26cc"},{url:"/_next/static/media/roboto-mono-latin-ext-wght-normal.bf193e12.woff2",revision:"bf193e12"},{url:"/_next/static/media/roboto-mono-latin-wght-normal.6ddf6fbb.woff2",revision:"6ddf6fbb"},{url:"/_next/static/media/roboto-mono-vietnamese-wght-normal.e20319cf.woff2",revision:"e20319cf"},{url:"/icons/icon-128.png",revision:"fb03c5fbbece8e33bbdd57adc1d490bf"},{url:"/icons/icon-144.png",revision:"a19063e311fabc4dbc9e5a362e7805ba"},{url:"/icons/icon-152.png",revision:"de28936a393fb72c984092fbaa1d1b11"},{url:"/icons/icon-16.png",revision:"bf67c661c67a901b2e336a3ae49582f5"},{url:"/icons/icon-180.png",revision:"4211b31817b718e52fba21a9a39a5461"},{url:"/icons/icon-192.png",revision:"2b76380b31282cfb80fd953a477c90fc"},{url:"/icons/icon-256.png",revision:"e664b665c9ce49780d2f54d3b41f367d"},{url:"/icons/icon-48.png",revision:"8f9bd1c25fcb3a04ee82fdee096b009b"},{url:"/icons/icon-512.png",revision:"0b7b1b597f8248f02315808f423ae86a"},{url:"/icons/icon-64.png",revision:"d341cc35f658aa6d7664a19c36e5f7cc"},{url:"/icons/icon-72.png",revision:"940885e5ba085e9e0cfbc4ab2eaff4a4"},{url:"/icons/icon-96.png",revision:"841372c7d4f428bed49296de496e68ea"},{url:"/manifest.json",revision:"c97a1662602f4611a7fb988a633288f4"},{url:"/worker-07b3999886d7d025.js",revision:"cf5106001593a93131d26ed1819b1dda"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e,url:{pathname:s}})=>!(!e||s.startsWith("/api/auth/callback")||!s.startsWith("/api/"))),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:n})=>"1"===e.headers.get("RSC")&&"1"===e.headers.get("Next-Router-Prefetch")&&n&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:n})=>"1"===e.headers.get("RSC")&&n&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:{pathname:e},sameOrigin:s})=>s&&!e.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
