//tendremos 2 objetos, uno para la interfaz y alertas, y otro para la funcionalidad
//constructores del objeto seguro

function Seguro(marca, year, tipo){
    this.marca=marca;
    this.year=year;
    this.tipo=tipo;
}


Seguro.prototype.cotizarSeguro(){
    /* 
        1 = Americano 1.15
        2 = Asiatico 1.05
        3 = Europeo 1.35
     */


    
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

    //instaciamos seguro y le damos los argumentos al objeto
    const seguro= new Seguro(marca, year, tipo);
    //recuerda no estamos usando object literal, usamos prototypes
    console.log(seguro);

    
}