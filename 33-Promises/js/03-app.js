//promises

const descuento = new Promise((resolve, reject) => {
    const descuento = true;

    if (descuento) {
        resolve('Existe descuento');
    } else {
        reject('No existe descuento');
    }
});

descuento
    .then((exito)=>console.log(exito))
    .catch(error=>console.log(error));
    

