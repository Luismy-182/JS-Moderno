const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');


window.addEventListener('load', ()=>{
    formulario.addEventListener('submit', buscarClima);
})


function buscarClima(e){
    e.preventDefault();

    //validar
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if(ciudad===''  || pais===''){
        //hubo error
        mostrarError('Ambos campos son obligatorios rey');
        return;
    }


    //consultar la Api

    consultarAPI(ciudad, pais)
}   


function mostrarError(mensaje){
    console.log(mensaje);
    const alerta = document.querySelector('.bg-red-100');
    if(!alerta){
    const alerta = document.createElement('DIV');
    alerta.classList.add('bg-red-100','border-red-400','text-red-700', 'px-4','py-3','rounded','max-w-md','mx-auto','mt-6','text-center');

    alerta.innerHTML=`
    <strong class="font-bold">Error!</strong>
    <span class="block">${mensaje}</span>
    `;

    container.appendChild(alerta);

        setTimeout(() => {
        alerta.remove();
        }, 3000);
    }
}



function consultarAPI(ciudad, pais){
    const appId= '3b3a85fab8552156c5a76212cd180482'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

    spinner();//llama al spinner

    fetch(url)
    .then(respuesta => respuesta.json())
    .then(datos=>{
        if(datos.cod==="404"){
            mostrarError('Ciudad no encontrada rey :P');
            return;
        }

        mostrarClima(datos);
    })
}


function mostrarClima(datos){

    limpiarHTML();
    const {name, main:{temp, temp_max, temp_min}}=datos;


    const centigrados=kelvinACentigrados(temp);
    const max=kelvinACentigrados(temp_max);
    const min=kelvinACentigrados(temp_min);


    const nombreCiudad= document.createElement('P');
    nombreCiudad.textContent=`Clima en ${name}`
    nombreCiudad.classList.add('font-bold', 'text-2xl');




    const actual = document.createElement('P');
    actual.innerHTML=`${centigrados} &#8451;`;
    actual.classList.add('font-bold', 'text-6xl');

    const tempMaxima = document.createElement('P');
    tempMaxima.innerHTML=`Max: ${max} &#8451;`;
    tempMaxima.classList.add('text-xl');

    const tempMinima = document.createElement('P');
    tempMinima.innerHTML=`Min: ${min} &#8451;`;
    tempMinima.classList.add('text-xl');

    const resultadoDiv= document.createElement('Div');
    resultadoDiv.classList.add('text-center', 'text-while','text-white');
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMaxima);
    resultadoDiv.appendChild(tempMinima);

    resultado.appendChild(resultadoDiv);
}


const kelvinACentigrados = (grados)=> parseInt(grados - 273.15);



function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    }
}


function spinner(){
    limpiarHTML();
    const divSpinner= document.createElement('div');
    divSpinner.classList.add('sk-chase');

    divSpinner.innerHTML=`
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    `;
    resultado.appendChild(divSpinner);
}