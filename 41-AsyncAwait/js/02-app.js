function descargarClientes(){
    return new Promise ( (resolve, reject) =>{
        const error = true;

        setTimeout(() => {
            if(!error){
                resolve('El listado de clientes se descargo correctamente...');
            }else{
                reject('Error en conexión');
            }
        }, 3000);
    }) 
}


//async await

async function ejecutar(){
    try {
        const respuesta= await descargarClientes();
        console.log(respuesta);
        
    } catch (error) {
        console.log(error);
        
    }
}

ejecutar();
