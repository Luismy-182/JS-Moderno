//tendremos 2 objetos, uno para la interfaz y alertas, y otro para la funcionalidad
//constructores del objeto seguro

function seguro(marca, year, tipo){
    this.marca=marca;
    this.year=year;
    this.tipo=tipo;
}

//creando el objeto UI
function UI() {}

//agregando una nueva funcion al super objeto UI
UI.prototype.llenarOpciones= ()=>{
   
    
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
//creamos la instancia de la funcion
const ui=new UI();
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
        console.log('no pasa validacion');
    }else{
        console.log('si pasa validacion');
    }
    
}