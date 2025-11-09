
// self.onload=()=>{
//     console.log('Ventana Lista');
    
// }; self es igual a window.

self.nombre = "Monitor de 20P";

const producto={
    precio:30,
    disponible:true,
    mostrarInfo: function(){
        return `El producto: ${self.nombre}`
    }
}
console.log(producto.mostrarInfo());
