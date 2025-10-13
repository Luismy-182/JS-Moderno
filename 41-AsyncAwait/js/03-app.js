function descargarClientes() {
    return new Promise((resolve, reject) => {
        const error = false;

        setTimeout(() => {
            if (!error) {
                resolve('El listado de clientes se descargo correctamente...');
            } else {
                reject('Error en conexión');
            }
        }, 3000);
    })
}


//async await

const ejecutar = async () => {
    try {
        const respuesta = await descargarClientes();
        console.log(respuesta);

    } catch (error) {
        console.log(error);

    }
}

ejecutar();
