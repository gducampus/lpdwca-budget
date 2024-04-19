self.addEventListener('install', evt => {
    caches.open('cache2').then(
        cache => {
          cache.addAll([
              'sw.js',
              'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css'
          ])
        }
    )
})

self.addEventListener('activate', evt => {

})

self.addEventListener('fetch', evt =>{
    // if(!navigator.onLine){
    //     evt.respondWith(new Response('Pas de connection internet '))
    // }
    if (!(evt.request.url.indexOf('http') === 0)) return;
        evt.respondWith(
            caches.match(evt.request).then(
                rep=>{
                    if(rep){
                        return rep;
                    }
                    return fetch(evt.request).then(
                        newResponse=> {
                            caches.open('cache2').then(
                                cache => cache.put(evt.request, newResponse)
                            );
                            return newResponse.clone();
                        }
                    )
                }
            )

        )

})