function descargarClientes(){
   return  new Promise ((resolve, reject)=>{
        const error = true;

        setTimeout(() => {
            if(!error){
                resolve ('se obtuvieron los clientes');

            }else{
                reject('Error con los clientes');

            }
        }, 3000);
    })
}


//async Await
async function ejecutar(){
    try {
        console.log('obteniendo clientes....');
        const respuesta = await descargarClientes();
        console.log(respuesta);

        console.log(2+2);
        
    } catch (error) {
        console.log(error);
        
    }
}

ejecutar();