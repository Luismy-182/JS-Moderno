document.addEventListener('visibilitychange',()=>{
    if(document.visibilityState ==='visible'){
        console.log('reproducir video');
        
    }else{
        console.log('pausar el video si no esta viendolo');
        
    }
})