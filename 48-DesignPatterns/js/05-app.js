//module pattern
//con em6
// const mostrarCliente=nombre=>{
//     console.log(nombre);
// }

// export default mostrarCliente;


//previo a EM6
const modulo1=(function(){
    const nombre ='Mike';

    function hola(){
        console.log('Hola');
        
    }

    return {
        nombre, hola
    }
})();