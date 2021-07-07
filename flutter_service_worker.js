'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "version.json": "7cb21ac60865d4f97c1bd924a528137d",
"index.html": "c8fd488d4070ef244c8ca2101d100ce1",
"/": "c8fd488d4070ef244c8ca2101d100ce1",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"assets/fonts/MaterialIcons-Regular.otf": "4e6447691c9509f7acdbf8a931a85ca1",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/AssetManifest.json": "d158a781ce681438f221a47a425171db",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/packages/fluttertoast/assets/toastify.css": "a85675050054f179444bc5ad70ffc635",
"assets/packages/fluttertoast/assets/toastify.js": "e7006a0a033d834ef9414d48db3be6fc",
"assets/assets/veronicagreco.jpg": "8f3f5c4b95ff06eb72b69d2bf0093d4d",
"assets/assets/logoutn.png": "bff52d1a82ac553a5ab32439a77b3310",
"assets/assets/renacimiento.jpg": "8e7b9a2adbe4a651d2acbffc57c64cc3",
"assets/assets/botticelli.jpg": "7597de09b0798b957875da54d8b78bf9",
"assets/assets/cristo.jpg": "6f6809d720b0eb44cf31f5b3c520c883",
"assets/assets/miguelangel.jpg": "2a43dc0118da40691f5b91fd7d8a286b",
"assets/assets/venusurbino.jpg": "8b020727c8711f22dcc0371e58316149",
"assets/assets/feliz.gif": "9d510226165f674ce03708a3a434ca7e",
"assets/assets/madonna.jpg": "39c3f572873d27e452295e43cd33364c",
"assets/assets/pergamino.jpg": "8dbd10ec2062c8ebf1248163be0f2251",
"assets/assets/adanevadurero.jpg": "22aac1a00ef7268e120e62e9d9407c44",
"assets/assets/renacimientomusica.mp3": "1291a89c9e2d517c1e74995b69d5c18b",
"assets/assets/fondo1.jpg": "c92619e9642ff12545ac118d104b6b6d",
"assets/assets/elviejo.jpg": "448c011aa5fbddb74454c570a65e06a7",
"assets/assets/rafael.jpg": "f2b0e1ce317052a8cbc111d044d06858",
"assets/assets/torrebabelbruegel.jpg": "dad0d5c45844dba98eeaa0b3fa0993e6",
"assets/assets/dali.jpg": "2a589cf1919bf1766af8f0efc8ef078f",
"assets/assets/durero.jpg": "b6db31d2902f0dd7428d35ec244e5747",
"assets/assets/feliz1.gif": "9d63d734c7cd09ca2e60bfbf80075951",
"assets/assets/mona.jpg": "72ca9458fc53f9f347f1a9cffae0b063",
"assets/assets/greco.jpg": "75197d28e7776ec225ab1ab1ba367625",
"assets/assets/perga.jpg": "a2d0912a84e0520266e3f0926ff4d042",
"assets/assets/dados.png": "aac7aebebedb5de9621b6dd4d2a92b05",
"assets/assets/tizziano.jpg": "e8c303d33e328f89d53ab7202c8f114e",
"assets/assets/gale.jpg": "2f5ea31c8eb835789be8f2d414323d6e",
"assets/assets/roma.jpg": "d784671286aeca25d009963dba11ece5",
"assets/assets/tablero.png": "218d4fa0d0a2d88784566772f5df4e8f",
"assets/assets/venus.jpg": "b979ebfcab6a0dfc1f84f13402fd8839",
"assets/assets/virgenleonardo.jpg": "54f7fea2e3ca79457c868c9daa68444a",
"assets/assets/goya.jpg": "c7f6b2c26e45c53ec022dfcf13addcae",
"assets/assets/rueda.mp3": "eeec3977e7192ba02c8e5979f2e9e67b",
"assets/assets/leonardo1.jpg": "a09bf3141528ea11b906ac1e254db70a",
"assets/assets/templarios.mp3": "2373668fd079746052dcb4d3ed9e92ee",
"assets/assets/emojitriste.gif": "ff548ee0e2d34294512cca32bc470fb4",
"assets/assets/creacion.jpg": "dec8e0443599cbd922e9dc18189c105d",
"assets/assets/vistagreco.jpg": "7f2c7fad557a25d9c23efd156f3a8dd8",
"assets/NOTICES": "42bb51ec2fc5d34fb1d6c5c0793c219b",
"main.dart.js": "05ac2e22bd625d61420567448d765b30",
"manifest.json": "024a257bd31a8dcd968ecbddaa981826",
"favicon.png": "5dcef449791fa27946b3d35ad8803796"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
