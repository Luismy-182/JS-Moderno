const aplicarDescuento= new Promise( (resolve, reject)=>{
    const descuento = true;

    if (descuento){
        resolve('Descuento Aplicado');
    }else{
        reject('No se pudo aplicar');
    }
}); //fin del promise


aplicarDescuento
                 .then(resultado => descuento(resultado))
                 .catch(error => console.log(error))   

function descuento (mensaje){
    console.log(mensaje);
    
}
//tenemos 3 valores posibles en el promise...
/* fullfilled - se cumplio el promise
    rejected  - el promise fallo
    pending    - No se cumplio y tampoco fue rechazado, algo esta mal declarado en tu promise  
*/

/*el cuerpo de un promise se compone por 2 argumentos que toma, y se aplican con un if
    si hay una condicion ejecuta 2 acciones 
    resolve('si sale con exito escribir un texto);
    reject('si falla entonces ocupas el reject'); 
*/


/*Tenemos 2 posibles valores en la salida de promise
    .then - que significa que si se cumple y podrias llamar a otro metodo o ejecutar una accion
    .catch - significa que si falla puedes mostrar el error con un parametro y un log
    */


