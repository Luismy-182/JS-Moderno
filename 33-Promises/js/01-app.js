//Callbacks
const paises = ['México', 'Francia', 'Portugal', 'Brazil'];

function mostrarPaises() {
    setTimeout(() => {
        paises.forEach(pais => console.log(pais));
    }, 2000);
}

function agregarPais(pais, callback) {
    setTimeout(() => {
        paises.push(pais);
        console.log('------refrescando-------');
        callback();
    }, 2000);
}

mostrarPaises();
agregarPais('Inglaterra', mostrarPaises);