const url = 'https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,JPY,EUR'


document.addEventListener('DOMContentLoaded', obtenerDatos);

function obtenerDatos(){

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado=> console.log(resultado))
        .catch(error=>console.log(error))
}


async function obtenerDatos() {
    try {
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        console.log(resultado);
        
    } catch (error) {
        console.log(error);
        
    }
}