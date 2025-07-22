const resultado=document.querySelector('#resultado');

//acaracteristicas del auto
const marca=document.querySelector('#marca');
const year=document.querySelector('#year');
const minimo=document.querySelector('#minimo');
const maximo=document.querySelector('#maximo');
const puertas=document.querySelector('#puertas');
const transmision=document.querySelector('#transmision');
const color=document.querySelector('#color');

//objeto a mapear 
let datosBusqueda={
    marca:'',
    year:'',
    minimo:'',
    maximo:'',
    puertas:'',
    transmision:'',
    color:'',
}

//definiendo fechas 
const max= new Date().getFullYear();
const min=max-10;

document.addEventListener('DOMContentLoaded', function (){
    mostrarAutos(autos);
    llenarYear();
});

//autos es el parametro donde entrarán los autos que se filtraron 
function mostrarAutos(autos){
    limpiarHTML();
    autos.forEach(auto =>{
    const {marca, modelo,year, precio, puertas,color, transmision}=auto;
    const autoHTML=document.createElement('P');
    autoHTML.textContent=`
    ${marca} - ${modelo} - ${year} - ${precio} - ${puertas} - ${color} - ${transmision}
    `;    
    resultado.appendChild(autoHTML);
    });
}

function llenarYear(){
    for(let i=max;i>=min;i-- ){
        const yearSelect=document.createElement('option');
        yearSelect.textContent=i;
        year.appendChild(yearSelect);
    }
}


marca.addEventListener('change', e =>{
    datosBusqueda.marca=e.target.value;
    filtrarAuto();
});

year.addEventListener('change', e =>{
    datosBusqueda.year=parseInt(e.target.value);
    filtrarAuto();
});

minimo.addEventListener('change', e =>{
    datosBusqueda.minimo=e.target.value;
    filtrarAuto();
});

maximo.addEventListener('change', e =>{
    datosBusqueda.maximo=e.target.value;
    filtrarAuto();
});

puertas.addEventListener('change', e =>{
    datosBusqueda.puertas=parseInt(e.target.value);
    filtrarAuto();
});
transmision.addEventListener('change', e =>{
    datosBusqueda.transmision=e.target.value;
    filtrarAuto();
});
color.addEventListener('change', e =>{
    datosBusqueda.color=e.target.value;
    filtrarAuto();
});



function filtrarAuto(){
    const resultados = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);
    
    if(resultados.length){
    mostrarAutos(resultados);
    }else{
        sinResultados();
    }
   
}

function sinResultados(){
    limpiarHTML();

    const alerta=document.createElement('DIV');
    alerta.textContent='No existen coincidencias';
    alerta.classList.add('error', 'alerta');
    resultado.appendChild(alerta);
}

function filtrarMarca(auto){
    //destructuring
    const {marca}=datosBusqueda
    //verificamos si el select tiene algun valor
    if(marca){

        //llena el objeto datosBusqueda, en su apartado marca
        return auto.marca===marca;
    }else{
        return auto;
    }
}

function filtrarYear(auto){
    const {year}=datosBusqueda;

    if(year){
        return auto.year===year;

    }else{
        return auto;
    }
}


function filtrarMinimo(auto){
    const {minimo}=datosBusqueda;

    if(minimo){
        return auto.precio>=minimo;

    }else{
        return auto;
    }
}

function filtrarMaximo(auto){
    const {maximo}=datosBusqueda;

    if(maximo){
        return auto.precio<=maximo;

    }else{
        return auto;
    }
}

function filtrarPuertas(auto){
    const {puertas}=datosBusqueda;

    if(puertas){
        return auto.puertas===puertas;

    }else{
        return auto;
    }
}

function filtrarTransmision(auto){
    const {transmision}=datosBusqueda;

    if(transmision){
        return auto.transmision===transmision;

    }else{
        return auto;
    }
}
function filtrarColor(auto){
    const {color}=datosBusqueda;

    if(color){
        return auto.color===color;

    }else{
        return auto;
    }
}


function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);

    }
}