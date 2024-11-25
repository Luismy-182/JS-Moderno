window.addEventListener('online', actualizarEstado);
window.addEventListener('offline', actualizarEstado);

function actualizarEstado() {
    if(navigator.onLine){
        console.log('Conectado Papi');
        
    }else{
        console.log('Sin coneccion Rey :(');
    }
}
