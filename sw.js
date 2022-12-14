const cache_name = "slate-cache"


const files_to_cache = [
    "/shotboard"
]

self.addEventListener('install', e => {

    e.waitUntil(caches.open(cache_name).then(cache => cache.addAll(files_to_cache)))
    console.log("INSTALL")
})

self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'navigate') {
        return;
    }

    const fetch_request = event.request.clone()

    event.respondWith(
        fetch(fetch_request)
            .then(response => {
                caches.open(cache_name)
                    .then(cache => cache.put(event.request.url, response.clone()))
                return response
            })
            .catch(() => {
                return caches.match(event.request.url)
                    .then(cache => {return cache})
            })
    )
})