const obtenerCliente=()=>{
    const nombre = "Juan";

    function muestraNombre(){
        console.log(nombre);
        
    }
    return muestraNombre;
}

const cliente = obtenerCliente();
cliente();

//gracias al return accediste al nombre desde el exterior
