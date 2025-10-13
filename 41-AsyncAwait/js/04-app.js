function descargarNuevosClientes(){
    return new Promise( resolve =>{
        console.log('descargando clientes.....');
        setTimeout(() => {
            resolve('Los clientes fueron descargados correctamente....')
        }, 5000);
    });
}


const descargarNuevosPedidos = ()=> {
    return new Promise(resolve =>{
    console.log('descargando pedidos.....');
    
    setTimeout(() => {
        resolve('Los pedidos se descargaron correctamente...')
    }, 5000);
});
}


const app = async ()=>{
    try{
    const clientes= await descargarNuevosClientes();
    console.log(clientes);
    
    const pedidos= await descargarNuevosPedidos();
    console.log(pedidos);
    
    }catch(error){
        console.log(error);
        
    }
}

app();