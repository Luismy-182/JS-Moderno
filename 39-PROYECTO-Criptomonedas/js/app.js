const criptomonedasSelect = document.querySelector('#criptomonedas');

const monedaSelect=document.querySelector('#moneda');
const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');

//objeto vacio del formulario
const objBusqueda={
    moneda:'',
    criptomoneda:''
}

document.addEventListener('DOMContentLoaded', ()=>{
    consultarCriptomonedas();
   
    formulario.addEventListener('submit', submitFormulario);
    criptomonedasSelect.addEventListener('change', leerValor);
    monedaSelect.addEventListener('change', leerValor);


});


function consultarCriptomonedas(){


    const url = `https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD`;

    fetch(url)
        .then(respuesta=> respuesta.json())
        .then(resultado => selectCriptomonedas(resultado.Data)); //nos da un arreglo con 10 posiciones y el apartadoq ue interesa es coinInfo:
        
        
       // .then(criptomonedas => selectCriptomonedas(criptomonedas))
}


/* código extra que al final hace lo mismo
function obtenerCriptomonedas(criptomonedas){
    return new Promise(function (resolve){
        resolve(criptomonedas);
    })
    
} 

//otro codigo que igual hace lo mismo de arriba
const obtenerCriptomonedas  = criptomonedas => new Promise( resolve => {
    resolve(criptomonedas);
});
*/

function selectCriptomonedas(criptomonedas){
    criptomonedas.forEach(cripto => {
    
        const {FullName, Name}=cripto.CoinInfo;

        const option = document.createElement('option');
        option.value= Name;
        option.textContent = FullName;
        criptomonedasSelect.appendChild(option);
    });

}

function leerValor(e){
    objBusqueda[e.target.name]=e.target.value;
    
    
}

function submitFormulario(e){
    e.preventDefault();

    const {moneda, criptomoneda}=objBusqueda;
    //validar
    if(moneda===''||criptomoneda===''){
        mostrarAlerta('Ambos campos son obligatorios');
        return;
    }

    consultarAPI();

}

function mostrarAlerta(msg){
    const alerta = document.querySelector('.alerta');
    if(!alerta){
        const divAlerta=document.createElement('DIV');
        divAlerta.classList.add('error','alerta');
        divAlerta.textContent=msg;
        formulario.appendChild(divAlerta);
        setTimeout(() => {
           divAlerta.remove();
        }, 3000);
    }

    }



function consultarAPI(){
    const {moneda, criptomoneda}=objBusqueda;
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

    mostrarSpinner();
    fetch (url)
        .then(respuesta => respuesta.json())
        .then(resultado => mostrarCotizacion(resultado.DISPLAY[criptomoneda][moneda]))
       
}


function mostrarCotizacion(cotizacion){

    limpiarHTML(resultado);

    const {PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE}=cotizacion;

    const precio = document.createElement('P');
    precio.classList.add('precio');
    precio.innerHTML=`El precio es: <span>${PRICE}</span>`;

    const precioAlto=document.createElement('P');
    precioAlto.innerHTML=`<p>EL precio más alto del dia ${HIGHDAY}`;

    const precioBajo=document.createElement('P');
    precioBajo.innerHTML=`<p>EL precio más bajo del dia ${LOWDAY}`;


    const ultimasHoras=document.createElement('P');
    ultimasHoras.innerHTML=`<p>Variacion últimas 24Horas <span> ${CHANGEPCT24HOUR}</span>`;

    
    const ultimaActualizacion=document.createElement('P');
    ultimaActualizacion.innerHTML=`<p>Última actualización <span>${LASTUPDATE}</span>`;



    resultado.appendChild(precio);
    resultado.appendChild(precioAlto);
    resultado.appendChild(precioBajo);
    resultado.appendChild(ultimasHoras);
    resultado.appendChild(ultimaActualizacion);





}

function limpiarHTML(seccion){
    while(seccion.firstChild){
        seccion.removeChild(seccion.firstChild)
    }
}


function mostrarSpinner(){
    limpiarHTML(resultado);


    const spinner=document.createElement('DIV');
    spinner.classList.add('spinner');
    spinner.innerHTML=`
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
    `;
    resultado.appendChild(spinner);
}