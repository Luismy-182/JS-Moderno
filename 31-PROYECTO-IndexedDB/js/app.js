
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

// Contenedor para las citas
const contenedorCitas = document.querySelector('#citas');

// Formulario nuevas citas
const formulario = document.querySelector('#nueva-cita')
formulario.addEventListener('submit', nuevaCita);

// Heading
const heading = document.querySelector('#administra');


let editando = false;


// Eventos
eventListeners();
function eventListeners() {
    mascotaInput.addEventListener('change', datosCita);
    propietarioInput.addEventListener('change', datosCita);
    telefonoInput.addEventListener('change', datosCita);
    fechaInput.addEventListener('change', datosCita);
    horaInput.addEventListener('change', datosCita);
    sintomasInput.addEventListener('change', datosCita);
}

const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora:'',
    sintomas: ''
}


function datosCita(e) {
    //  console.log(e.target.name) // Obtener el Input
     citaObj[e.target.name] = e.target.value;
}

// CLasses
class Citas {
    constructor() {
        this.citas = []
    }
    agregarCita(cita) {
        this.citas = [...this.citas, cita];
    }
    editarCita(citaActualizada) {
        this.citas = this.citas.map( cita => cita.id === citaActualizada.id ? citaActualizada : cita)
    }

    eliminarCita(id) {
        this.citas = this.citas.filter( cita => cita.id !== id);
    }
}

class UI {

    constructor({citas}) {
        this.textoHeading(citas);
    }

    imprimirAlerta(mensaje, tipo) {
        // Crea el div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');
        
        // Si es de tipo error agrega una clase
        if(tipo === 'error') {
             divMensaje.classList.add('alert-danger');
        } else {
             divMensaje.classList.add('alert-success');
        }

        // Mensaje de error
        divMensaje.textContent = mensaje;

        // Insertar en el DOM
        document.querySelector('#contenido').insertBefore( divMensaje , document.querySelector('.agregar-cita'));

        // Quitar el alert despues de 3 segundos
        setTimeout( () => {
            divMensaje.remove();
        }, 3000);
   }

   imprimirCitas() { // Se puede aplicar destructuring desde la función...
       
        this.limpiarHTML();

        this.textoHeading(citas);

       //leer el contenido de la BD
       const objectStore=DB.transaction('citas').objectStore('citas');

       objectStore.openCursor().onsuccess=(e)=>{
        

        const cursor=e.target.result;


        if(cursor){
            //introduceme aquiasssssssssssssssssss

            const {mascota, propietario, telefono, fecha, hora, sintomas, id } = cursor.value;

            // Reiniciar el objeto
            citaObj.mascota = mascota;
            citaObj.propietario = propietario;
            citaObj.telefono = telefono;
            citaObj.fecha = fecha
            citaObj.hora = hora;
            citaObj.sintomas = sintomas;
            citaObj.id = id;
        
            // Llenar los Inputs
            mascotaInput.value = mascota;
            propietarioInput.value = propietario;
            telefonoInput.value = telefono;
            fechaInput.value = fecha;
            horaInput.value = hora;
            sintomasInput.value = sintomas;
        
            formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';
        
            editando = true;
        
        }

       }
   }

   textoHeading(citas) {
        if(citas.length > 0 ) {
            heading.textContent = 'Administra tus Citas '
        } else {
            heading.textContent = 'No hay Citas, comienza creando una'
        }
    }

   limpiarHTML() {
        while(contenedorCitas.firstChild) {
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
   }
}


const administrarCitas = new Citas();
console.log(administrarCitas);
const ui = new UI(administrarCitas);

function nuevaCita(e) {
    e.preventDefault();

    const {mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

    // Validar
    if( mascota === '' || propietario === '' || telefono === '' || fecha === ''  || hora === '' || sintomas === '' ) {
        ui.imprimirAlerta('Todos los mensajes son Obligatorios', 'error')

        return;
    }

    if(editando) {
        // Estamos editando
        administrarCitas.editarCita( {...citaObj} );

        ui.imprimirAlerta('Guardado Correctamente');

        formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita';

        editando = false;

    } else {
        // Nuevo Registrando

        // Generar un ID único
        citaObj.id = Date.now();
        
        // Añade la nueva cita
        administrarCitas.agregarCita({...citaObj});


              //insertando en la indexBD
              const transaction=DB.transaction (['citas'], 'readwrite');

              //habilitar el objectstore
              const objectStore= transaction.objectStore('citas');
              //insertart en la BD
              objectStore.add(citaObj);
      
      
              transaction.oncomplete= ()=>{
                  console.log('cita Agregada');

                    DB=crearDB.result;



                    //mostrar citas al cargar y indexdb este lista
                    ui.imprimirCitas();
      
              }







        // Mostrar mensaje de que todo esta bien...
        ui.imprimirAlerta('Se agregó correctamente')
    }


    // Imprimir el HTML de citas
    ui.imprimirCitas(administrarCitas);

    // Reinicia el objeto para evitar futuros problemas de validación
    reiniciarObjeto();

    // Reiniciar Formulario
    formulario.reset();

}

function reiniciarObjeto() {
    // Reiniciar el objeto
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}


function eliminarCita(id) {
    administrarCitas.eliminarCita(id);

    ui.imprimirCitas(administrarCitas)
}

function cargarEdicion(cita) {

    const {mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

    // Reiniciar el objeto
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    // Llenar los Inputs
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';

    editando = true;

}









  



let DB;



window.onload=()=>{
    crearDB();
}
//crear Bd

function crearDB(){

    const crearDB= window.indexedDB.open('citas', 1);

//si hay error
crearDB.onerror= ()=>{
    console.log('error');

}

crearDB.onsuccess= ()=>{
    console.log('Base de datos creada');
    DB=crearDB.result;
}


//definir el Schnema

crearDB.onupgradeneeded = (e)=>{
    const db=e.target.result;


    const objectStore=db.createObjectStore('citas',{
        keyPath:'id',
        autoIncrement:true
    });

    //Definir todas las columnas

    objectStore.createIndex('mascota', 'mascota',{unique:false});
    objectStore.createIndex('propietario', 'propietario',{unique:false});
    objectStore.createIndex('telefono', 'telefono',{unique:false});
    objectStore.createIndex('fecha', 'fecha',{unique:false});
    objectStore.createIndex('hora', 'hora',{unique:false});
    objectStore.createIndex('sintomas', 'sintomas',{unique:false});
    objectStore.createIndex('id', 'id',{unique:true});



    console.log('DB creada  y lista');



}


}