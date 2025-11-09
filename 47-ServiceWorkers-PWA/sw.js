
const nombreCache='apv-v2';
const archivos=[
    '/index.html',
    '/error.html',
    '/css/bootstrap.css',
    '/css/styles.css',
    '/js/app.js',
    '/js/apv.js'
];

//instalar el servicio del service worker (solo se ejecuta una vez)
self.addEventListener('install', e =>{
    console.log('Se instalo el service worker',e);
    
    //esperar a la descarga de la cache
    e.waitUntil( //espera hasta que
        caches.open(nombreCache)
        .then(cache =>{
            console.log('cacheando..');
            cache.addAll(archivos);
            
        })
    );
});

//Activar el service worker
self.addEventListener('activate', e =>{
    console.log('Service Worker Activado');
    //espera hasta 
    e.waitUntil(
        caches.keys()

        .then( keys =>{
            return Promise.all(
                keys.filter( key => key !== nombreCache)
                .map(key  => caches.delete(key)) //borra los archivos en cache de v anteriores
            )
        })
    )
})


//evento fetch para descargar archivos estaticos
self.addEventListener('fetch', e =>{
    
    e.respondWith(
        caches.match(e.request)
        .then(respuestaCache =>{
            return respuestaCache;
        } )
        .catch( () => caches.match('/error.html'))
    )
})

