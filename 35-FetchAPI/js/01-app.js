const cargarTxtBtn=document.querySelector('#cargarTxt');
cargarTxtBtn.addEventListener('click', obtenerDatos);


function obtenerDatos(){


    url = 'data/datos.txt';

    fetch(url)
    .then(respuesta => {
        console.log(respuesta);

        return respuesta.text();
        
    })
    .then(datos =>{
        console.log(datos);
        
    })
    



    .catch(error=>{
        console.log(error);
        
    })
}