//tendremos 2 objetos, uno para la interfaz y alertas, y otro para la funcionalidad
//constructores del objeto seguro

function Seguro(marca, year, tipo){
    this.marca=marca;
    this.year=year;
    this.tipo=tipo;
}


//ocupamos function porque debemos acceder a los datos del objeto
Seguro.prototype.cotizarSeguro=function (){
    /* 
        1 = Americano 1.15
        2 = Asiatico 1.05
        3 = Europeo 1.35
     */

    let cantidad;
    const base = 2000;

    switch(this.marca){
        case '1':
            cantidad = base *1.15;
            break;
        case '2':
            cantidad = base *1.05;
            break;
        case '3':
            cantidad = base * 1.35;
            break;
        default:
            break;
    }
    /*Por cada año vamos a reducir un 3% el costo o precio*/
    //leer el año

    const diferencia = new Date().getFullYear()-this.year;
    //cada año que la diferencia es mayor, el costo va a reducirse un 3%
    cantidad-= ((diferencia * 3)*cantidad) / 100;
    /*
        si el seguro es básico se multiplica por un 30% más 
        si el seguro es completo se multiplica por un 50% más
    */

        if(this.tipo==='basico'){
            cantidad*=1.30;

        }else{
            cantidad*=1.50;
        }

        return cantidad;
}




//creando el objeto UI
function UI() {}

//agregando una nueva funcion al super objeto UI
UI.prototype.llenarOpciones = () => {
    //como no tiene parametros podríamos usar un arrow function
    const max= new Date().getFullYear();
    //de 2025 a 2005
    const min = max-20;

    //seleccionamos nuestro elemento que mostrara los años
    const selectYear=document.querySelector('#year');
    //mientras i sea 2025 e i sea mayor al 2005, resta de 1 en 1
    for(let i = max; i>min; i--){
        let option = document.createElement('option');
        option.value=i;
        option.textContent=i;
        selectYear.appendChild(option);
    }
}

//muestra alaertas
UI.prototype.mostrarMensaje = (mensaje, tipo)=>{
    const div = document.createElement('DIV');
    if(tipo==='error'){
        div.classList='error';
    }else{
        div.classList='correcto';
    }

    div.classList.add('mensaje', 'mt-10');
    div.textContent=mensaje;

    //insertar en HTML
    const formulario= document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div, document.querySelector('#resultado'));
    
    setTimeout(() => {
        div.remove();
    }, 3000);

}

UI.prototype.mostrarResultado=(total, seguro)=>{
    //destructuring a seguro
    const {marca, year, tipo}=seguro;

    //switch para convertir la marca en un tipo de marca de auto

    switch(marca){
        case '1': textoMarca='Americano';
            break;
        case '2': textoMarca='Asiatico';
            break;
        case '3': textoMarca='Europeo';
            break;
        default: ;
        break;
    }


    //creamos el resultado 
    const div= document.createElement('div');
    div.classList='mt-10';
    //scripting con innerHTML
    div.innerHTML=`
        <p class="header">Tu resumen </p>
        <p class="font-bold">Marca: <span class='font-normal'>  ${textoMarca}  </span></p>
        <p class="font-bold">Año: <span class='font-normal'>  ${year}  </span></p>
        <p class="font-bold">Tipo: <span class='font-normal'>  ${tipo}  </span></p>
        <p class="font-bold">Total: <span class='font-normal'> $ ${total}  </span></p>
    `;

    const resultadoDiv=document.querySelector('#resultado');
    
    //Mostrar un spinner 
    const spinner = document.querySelector('#cargando'); 
    spinner.style.display='block';

    setTimeout(() => {
        spinner.style.display='none';
        resultadoDiv.appendChild(div);
    }, 3000);



    
}


//creamos la instancia de la funcion
const ui= new UI();
//arrancamos las funciones en cuanto el dom este listo
document.addEventListener('DOMContentLoaded', ()=>{
    ui.llenarOpciones();
});



//lejos de los prototypes creamos los selector querys
eventListeners();
function eventListeners(){
    const formulario= document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro);
}


function cotizarSeguro(e){
    e.preventDefault();
    //leer la marca seleccionada
    const marca = document.querySelector('#marca').value;
    //leer el año
    const year = document.querySelector('#year').value;
    //leer el tipo de cobertura
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    if(marca===''||year===''||tipo===''){

        ui.mostrarMensaje('Todos los campos deben ser obligatorios', 'error');
      
        return;
    }

    ui.mostrarMensaje('Cotizando...', 'exito');


    //ocultando cotizaciones previas

    const resultados = document.querySelector('#resultado div');
    if(resultados != null){
        resultados.remove();
    }

    //instaciamos seguro y le damos los argumentos al objeto
    const seguro= new Seguro(marca, year, tipo);
    const total = seguro.cotizarSeguro();
    
    //utilizando el prototype que va a cotizar 
    
    ui.mostrarResultado(total, seguro);



    
}