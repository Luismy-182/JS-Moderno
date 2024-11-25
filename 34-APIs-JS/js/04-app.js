const abrirbtn=document.querySelector('#abrir-pantalla-completa');
const salirbtn=document.querySelector('#salir-pantalla-completa');


abrirbtn.addEventListener('click', abrirPantallaCompleta);
salirbtn.addEventListener('click', salirPantallaCompleta);


function abrirPantallaCompleta(){
   document.documentElement.requestFullscreen();
    
    
}


function salirPantallaCompleta(){
        
            document.exitFullscreen();
        
       
    
   
}