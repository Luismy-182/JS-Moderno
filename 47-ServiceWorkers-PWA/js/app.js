if('serviceWorker' in navigator){
    navigator.serviceWorker.register('./sw.js')
    .then(registrado => console.log('Se registro el sw correctamente...', registrado))
    .catch( error => console.log('Fallo la instalación...', error));
    
}else{
    console.log('Service Worker no soportado en tu navegador');
    
}