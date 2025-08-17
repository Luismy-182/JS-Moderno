const pacienteInput = document.querySelector('#paciente');
const propietarioInput = document.querySelector('#propietario');
const emailInput = document.querySelector('#email');
const fechaInput = document.querySelector('#fecha');
const sintomasInput = document.querySelector('#sintomas');
const formulario = document.querySelector('#formulario-cita');
const contenedorCitas = document.querySelector('#citas');
const formularioSubmit=document.querySelector('#formulario-cita input[type="submit"]');
let editando = false;
//eventos
pacienteInput.addEventListener('change', datosCita);
propietarioInput.addEventListener('change', datosCita);
emailInput.addEventListener('change', datosCita);
fechaInput.addEventListener('change', datosCita);
sintomasInput.addEventListener('change', datosCita);
formulario.addEventListener('submit', submitCita);


//Obj de cita

const citaObj = {
    id: generarId(), //recuerda generarlo tambien al resetar
    paciente: '',
    propietario: '',
    email: '',
    fecha: '',
    sintomas: ''
}
//clases
//imprime alertas por medio de una clase
class Notificacion {
    //constructor que tomara un objeto y destructura en automatico
    constructor({ tipo, texto }) {
        this.tipo = tipo;
        this.texto = texto;
        this.mostrar();
    }
    //metodo que muestra los mensajes
    mostrar() {
        //crea notificación
        const alerta = document.createElement('DIV');

        alerta.classList.add('text-center', 'w-full', 'p-3', 'text-white', 'my-5', 'alert', 'uppercase', 'font-bold', 'text-sm');


        //agrega una clase si es tipo error
        this.tipo === 'error' ? alerta.classList.add('bg-red-500') : alerta.classList.add('bg-green-500');
        //mensaje
        alerta.textContent = this.texto;
        //si ya existe la alerta la elimina previamente
        const alertaPrevia = document.querySelector('.alert');
        alertaPrevia?.remove(); //optiona CHanning
        //inserta en el DOM
        formulario.parentElement.insertBefore(alerta, formulario);

        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }

}

class AdminCitas {
    constructor() {
        this.citas = [];
        console.log(this.citas);

    }
    agregar(cita) {
        this.citas = [...this.citas, cita];
        console.log(this.citas);
        this.mostrar();
    }
    mostrar() {
        //limpiarHTML
        while (contenedorCitas.firstChild) {
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }

        if(this.citas.length===0){
            contenedorCitas.innerHTML='<p class="text-xl mt-5 mb-10 text-center">No Hay Pacientes</p>'
            return;
        }

        this.citas.forEach(cita => {
            const divCita = document.createElement('div');
            divCita.classList.add('mx-5', 'my-10', 'bg-white', 'shadow-md', 'px-5', 'py-10', 'rounded-xl', 'p-3');

            const paciente = document.createElement('p');
            paciente.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            paciente.innerHTML = `<span class="font-bold uppercase">Paciente: </span> ${cita.paciente}`;

            const propietario = document.createElement('p');
            propietario.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            propietario.innerHTML = `<span class="font-bold uppercase">Propietario: </span> ${cita.propietario}`;

            const email = document.createElement('p');
            email.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            email.innerHTML = `<span class="font-bold uppercase">E-mail: </span> ${cita.email}`;

            const fecha = document.createElement('p');
            fecha.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            fecha.innerHTML = `<span class="font-bold uppercase">Fecha: </span> ${cita.fecha}`;

            const sintomas = document.createElement('p');
            sintomas.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            sintomas.innerHTML = `<span class="font-bold uppercase">Síntomas: </span> ${cita.sintomas}`;
            //botones de editar y eliminar
            const btnEditar = document.createElement('button');
            btnEditar.classList.add('py-2', 'px-10', 'bg-indigo-600', 'hover:bg-indigo-700', 'text-white', 'font-bold', 'uppercase', 'rounded-lg', 'flex', 'items-center', 'gap-2');
            btnEditar.innerHTML = 'Editar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>'
            btnEditar.onclick = () => {
                const clone = structuredClone(cita);
                cargarEdicion(clone);
            }

            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('py-2', 'px-10', 'bg-red-600', 'hover:bg-red-700', 'text-white', 'font-bold', 'uppercase', 'rounded-lg', 'flex', 'items-center', 'gap-2');
            btnEliminar.innerHTML = 'Eliminar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
            btnEliminar.onclick = ()=> {
                this.eliminar(cita.id);
            }
            const contenedorBotones = document.createElement('DIV');
            contenedorBotones.classList.add('flex', 'justify-between', 'mt-10');

            contenedorBotones.appendChild(btnEditar);
            contenedorBotones.appendChild(btnEliminar);

            // Agregar al HTML
            divCita.appendChild(paciente);
            divCita.appendChild(propietario);
            divCita.appendChild(email);
            divCita.appendChild(fecha);
            divCita.appendChild(sintomas);
            divCita.appendChild(contenedorBotones);
            contenedorCitas.appendChild(divCita);
        });
    }
    editar(citaActualizada) {
        this.citas=this.citas.map(cita => cita.id === citaActualizada.id ? citaActualizada : cita);
        this.mostrar();
    }

    eliminar(id){
        this.citas=this.citas.filter(cita => cita.id !== id);
        this.mostrar();
    }

}
const citas = new AdminCitas();

function datosCita(e) {
    citaObj[e.target.name] = e.target.value;
    console.log(citaObj);

}

function submitCita(e) {
    e.preventDefault();
    if (Object.values(citaObj).some(valor => valor.trim() === '')) {
        //instancia una clase y manda el objeto con el mensaje
        const notificacion = new Notificacion({
            tipo: 'error',
            texto: 'Todos los campos obligatorios'
        });
        return;
    }
    //si pasa la validacion


    //para saber si edito o creo algo nuevo
    if (editando) {
        citas.editar({ ...citaObj }); //crea una copia del objeto anterior y envia el objeto a edicion, así no pierdes la referencia y no te duplica los valores
        new Notificacion({
            tipo: 'exito',
            texto: 'Guardado correctamente'
        });
    } else {
        citas.agregar({ ...citaObj }); //crea una copia del objeto anterior y agrega el nuevo obj, así no pierdes la referencia y no te duplica los valores
        new Notificacion({
            tipo: 'exito',
            texto: 'Paciente registrado'
        });

    }
    formulario.reset();
    reiniciarObjCita();
    editando=false;
    formularioSubmit.value='Registrar Paciente';


}

function reiniciarObjCita() {
    //forma 1
    // citaObj.id = generarId();
    // citaObj.paciente = '';
    // citaObj.propietario = '';
    // citaObj.email = '';
    // citaObj.fecha = '';
    // citaObj.sintomas = '';

    //forma 2
    Object.assign(citaObj, {
        id: generarId(),//genera otro al reiniciar el objeto para que ninguno tenga el mismo id
        paciente: '',
        propietario: '',
        email: '',
        fecha: '',
        sintomas: '',
    });
}

function generarId() {
    return Math.random().toString(36).substring(2) + Date.now();
}

function cargarEdicion(cita) {
    
    //se crea el objeto con todas las propiedades de citaObj, y se envia Valores
    Object.assign(citaObj, cita);
    //se asigna los valores del objeto que viene del foreach a los inputs del formulario
    pacienteInput.value = cita.paciente;
    propietarioInput.value = cita.propietario;
    emailInput.value = cita.email;
    fechaInput.value = cita.fecha;
    sintomasInput.value = cita.sintomas;

    editando = true;
    formularioSubmit.value='Guardar Cambios';
}