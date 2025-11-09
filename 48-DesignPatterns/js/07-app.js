//Name spaces
const restaurantApp = {}
restaurantApp.platillos = [
    {
        platillo: 'pizza',
        precio: 25
    },
    {
        platillo: 'tacos',
        precio: 54
    },
    {
        platillo: 'papas',
        precio: 21
    },
];
restaurantApp.funciones={
    mostrarMenu:(platillos)=>{
        console.log('Bienvenidos al menú');
        
        platillos.forEach( (platillo, index) => {
            console.log(`${index} ${platillo.platillo} $${platillo.precio}`);
        });
    },
    ordenar:id=>{
        console.log(`Tu platillo ${restaurantApp.platillos[id].platillo} se esta preparando`);
        
    },
    agregarPlatillo:(platillo, precio)=>{
        const nuevo={
            platillo, precio
        };
        restaurantApp.platillos.push(nuevo);
    }


}


restaurantApp.funciones.ordenar(2);
restaurantApp.funciones.agregarPlatillo('cagada', 50);
const {platillos}=restaurantApp;
restaurantApp.funciones.mostrarMenu(platillos);