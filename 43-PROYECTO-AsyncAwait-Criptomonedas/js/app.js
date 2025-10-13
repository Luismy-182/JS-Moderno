"use strict";
const criptomonedasSelect = document.querySelector('#criptomonedas');
const formulario = document.querySelector('#formulario');
const monedaSelect = document.querySelector('#moneda');
const objBusqueda = {
    moneda: '',
    criptomoneda: ''
}
document.addEventListener('DOMContentLoaded', () => {
    consultarCriptomonedas();
    formulario.addEventListener('submit', submitFormulario);
    criptomonedasSelect.addEventListener('change', leerValor);
    monedaSelect.addEventListener('change', leerValor);
});



async function consultarCriptomonedas() {
    const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`;
    try {
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        selectCriptomonedas(resultado.Data);

    } catch (error) {
        console.log(error);
        
    }
   
}

//creando un promise en lugar de una función ordinaria es lo mismo si no lo creas
const obtenerCriptomonedas = criptomonedas => new Promise(resolve => {
    resolve(criptomonedas);
    console.log(criptomonedas);

});

function selectCriptomonedas(criptomonedas) {
    criptomonedas.forEach(cripto => {
        const { FullName, Name } = cripto.CoinInfo;
        const option = document.createElement('option');
        option.value = Name;
        option.textContent = FullName;
        criptomonedasSelect.appendChild(option)
    });
}
function leerValor(e) {
    objBusqueda[e.target.name] = e.target.value;
    console.log(objBusqueda);
}

function submitFormulario(e) {
    e.preventDefault();
    //validar
    const { moneda, criptomoneda } = objBusqueda;

    if (moneda === '' || criptomoneda === '') {
        mostrarAlerta('campos obligatorios');
        return;
    }

    //consultar API
    consultarAPI();
}

function mostrarAlerta(msg) {
    const existeError = document.querySelector('.error');
    if (!existeError) {
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('error');
        //mensaje de error
        divMensaje.textContent = msg;
        formulario.appendChild(divMensaje);

        setTimeout(() => {
            divMensaje.remove();
        }, 3000)
    }

}

async function consultarAPI() {
    const { moneda, criptomoneda } = objBusqueda

    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

    mostrarSpinner();
    try {
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        mostrarCotizacionHTML(resultado.DISPLAY[criptomoneda][moneda]);
    } catch (error) {
        console.log(error);
        
    }

}

function mostrarCotizacionHTML(cotizacion) {
    limpiarHTML();
    const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE } = cotizacion

    const precio = document.createElement('P');
    precio.classList.add('precio');
    precio.innerHTML = `EL precio es: <span>${PRICE}`;

    const precioAlto = document.createElement('P');
    precioAlto.innerHTML = `EL precio más alto del día es: <span>${HIGHDAY}`;

    const precioBajo = document.createElement('P');
    precioBajo.innerHTML = `EL precio más bajo del día es: <span>${LOWDAY}`;

    const ultimasHoras = document.createElement('P');
    ultimasHoras.innerHTML = `variación últimas 24 HRS: <span>${CHANGEPCT24HOUR}%`;

    const ultimaActualizacion = document.createElement('P');
    ultimaActualizacion.innerHTML = `Última Actualización: <span>${LASTUPDATE}`;

    resultado.appendChild(precio);
    resultado.appendChild(precioAlto);
    resultado.appendChild(precioBajo);
    resultado.appendChild(ultimasHoras);
    resultado.appendChild(ultimaActualizacion);

    
}

function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function mostrarSpinner() {
    limpiarHTML();
    const spinner = document.createElement('DIV');
    spinner.classList.add('spinner');

    spinner.innerHTML = `

        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
  
    `;
    resultado.appendChild(spinner);
}