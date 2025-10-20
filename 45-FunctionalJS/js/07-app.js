//funciones que retornan una función
const obtenerCliente= ()=> ()=> console.log('Miguel');
const fn = obtenerCliente();
fn();




