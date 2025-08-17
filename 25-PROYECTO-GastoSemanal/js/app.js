//variables y selectores
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');


let presupuesto;//servira para instanciar clases



//eventos

eventListeners();

function eventListeners() {
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);
    formulario.addEventListener('submit', agregarGasto);
}

//clases, tenemos 2 una para controlas el presupuesto y otra para interfaz de usuario

class Presupuesto {
    constructor(presupuesto) {
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }

    nuevoGasto(gasto) {
        //agregando el gasto al arreglo de los gastos
        this.gastos = [...this.gastos, gasto];
        this.calcularRestante();
    }

    calcularRestante() {
        const gastado = this.gastos.reduce((total, gasto) => total + gasto.cantidad, 0);
        this.restante = this.presupuesto - gastado;
        console.log(this.restante);

    }

    eliminarGasto(id) {
        this.gastos = this.gastos.filter(gasto => {
            return gasto.id !== id;
        });
        this.calcularRestante();
    }
}


class UI {
    insertarPresupuesto(ObjPresupuesto) {
        const { presupuesto, restante } = ObjPresupuesto;
        //insertar valores en el html sin crear variables
        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;

    }

    alertas(tipo, mensaje) {
        const alertas = document.createElement('DIV');
        //clases genericas
        alertas.classList.add('text-center', 'alert');
        //si es de tipo error
        if (tipo === 'error') {
            alertas.classList = 'alert-danger';
        } else {
            alertas.classList = 'alert-success';
        }

        //insertamos el mensaje
        alertas.textContent = mensaje;
        document.querySelector('.primario').insertBefore(alertas, formulario); //inyectado rapido

        //quitando la alerta
        setTimeout(() => {
            alertas.remove();
        }, 3000);
    }

    //metodo para agregar los gastos a la lista
    mostrarGastos(gastos) {

        //limpiando el HTML previo
        this.limpiarHTML(gastoListado);

        //iterar sobre los gastos
        gastos.forEach(gasto => {
            //destructuring
            const { cantidad, nombre, id } = gasto;
            //creación de Li
            const nuevoGasto = document.createElement('li');
            nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center';
            nuevoGasto.dataset.id = id;
            //Agregar el HTML del gasto
            nuevoGasto.innerHTML = `${nombre}, <span class="badge badge-primary badge-pill">$ ${cantidad} </span>`;
            //boton para borrar el gasto
            const btnBorrar = document.createElement('button');
            btnBorrar.onclick = () => {
                eliminarGasto(id);
            }
            btnBorrar.innerHTML = 'Borrar &times;';
            btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto');
            nuevoGasto.appendChild(btnBorrar);
            //inyectar all HTML
            gastoListado.appendChild(nuevoGasto)

        });
    }

    //metodo para limpiar HTML
    limpiarHTML(referencia) {
        while (referencia.firstChild) {
            referencia.removeChild(referencia.firstChild);
        }
    }

    //actualizar restante
    actualizarRestante(restante) {
        document.querySelector('#restante').textContent = restante;
    }

    comprobarPresupuesto(presupuestoObj) {
        const { presupuesto, restante } = presupuestoObj;
        const restanteDiv = document.querySelector('.restante');

        //comprobar 25%
        if ((presupuesto / 4) > restante) {
            restanteDiv.classList.remove('alert-sucess', 'alert-warning');
            restanteDiv.classList.add('alert-danger');

        }else if ((presupuesto / 2) > restante) {
            restanteDiv.classList.remove('alert-sucess');
            restanteDiv.classList.add('alert-warning');
        }else{
            restanteDiv.classList.remove('alert-danger', 'alert-warning');
        }


        //si el total es cero o menor
        if (restante <= 0) {
            ui.alertas('error', 'El presupuesto se ha agotado');
            formulario.querySelector('button[type="submit"]').disabled = true;
        }
    }

}
//instanciando de forma global la clase UI
const ui = new UI();

//funciones

function preguntarPresupuesto() {
    const presupuestoUsuario = prompt('cual es tu presupuesto?');


    if (presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0) {
        window.location.reload(); //recarga la misma pagina
    }

    //presupuesto validado enviadando a clase Presupuesto
    presupuesto = new Presupuesto(presupuestoUsuario);

    //enviando el objeto completo de clase presupuesto a clase UI
    ui.insertarPresupuesto(presupuesto);

}




function agregarGasto(e) {
    e.preventDefault();

    const nombre = document.querySelector('#gasto').value;
    const cantidad = Number(document.querySelector('#cantidad').value);

    if (nombre === '' || cantidad === '') {
        ui.alertas('error', 'Los campos no pueden estar vacíos');
        return;
    } else if (isNaN(cantidad) || cantidad <= 0) {
        ui.alertas('error', 'Inserta una cantidad valida');
        return;
    }

    //genera un objeto con el gasto. Object literal enhacement

    const gasto = { nombre, cantidad, id: Date.now() }
    presupuesto.nuevoGasto(gasto);

    ui.alertas('exito', 'Correcto, gasto agregado');

    //resetear formulario
    formulario.reset();

    //destructuring al objeto de presupuesto
    const { gastos, restante } = presupuesto;
    //imprimir lista de gastos
    ui.mostrarGastos(gastos);
    ui.actualizarRestante(restante);
    ui.comprobarPresupuesto(presupuesto);

}

function eliminarGasto(id) {
    //elimina del objeto
    presupuesto.eliminarGasto(id);

    //elimina los gastos del html
    const { gastos, restante } = presupuesto;
    ui.mostrarGastos(gastos);
    ui.actualizarRestante(restante);
    ui.comprobarPresupuesto(presupuesto);
}
