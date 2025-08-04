//variables y selectores
const formulario = document.querySelector('#agregar-gasto');
const gastoListado=document.querySelector('#gastos ul');


let presupuesto;//servira para instanciar clases



//eventos

eventListeners();

function eventListeners(){
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);
    formulario.addEventListener('submit', agregarGasto);
}

//clases, tenemos 2 una para controlas el presupuesto y otra para interfaz de usuario

class Presupuesto{
    constructor (presupuesto){
        this.presupuesto=Number(presupuesto);
        this.restante=Number(presupuesto);
        this.gastos=[];
    }

    nuevoGasto(gasto){
        //agregando el gasto al arreglo de los gastos
        this.gastos=[...this.gastos, gasto];        
    }
}


class UI{
    insertarPresupuesto(ObjPresupuesto){
        const {presupuesto, restante}=ObjPresupuesto;
        //insertar valores en el html sin crear variables
        document.querySelector('#total').textContent=presupuesto;
        document.querySelector('#restante').textContent=restante;

    }

    alertas(tipo, mensaje){
    const alertas=document.createElement('DIV');
    //clases genericas
    alertas.classList.add('text-center', 'alert');
    //si es de tipo error
    if(tipo==='error'){
        alertas.classList='alert-danger';
    }else{
        alertas.classList='alert-success';
    }
    
    //insertamos el mensaje
    alertas.textContent=mensaje;
    document.querySelector('.primario').insertBefore(alertas, formulario); //inyectado rapido

    //quitando la alerta
        setTimeout(() => {
            alertas.remove();
        }, 3000);
    }

    //metodo para agregar los gastos a la lista
    agregarListadoGastos(gastos){
    //iterar sobre los gastos
    gastos.forEach(gasto => {
        //destructuring
        const {cantidad, nombre, id}=gasto;
        //creación de Li
        const nuevoGasto=document.createElement('li');
        nuevoGasto.className='list-group-item d-flex justify-content-between aling-items-center';
        nuevoGasto.dataset.id=id;
        //Agregar el HTML del gasto
        nuevoGasto.innerHTML=`${nombre}, <span class="badge badge-primary badge-pill">${cantidad} </span>`;
        //boton para borrar el gasto
        const btnBorrar=document.createElement('button');
        btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto');
        nuevoGasto.appendChild(btnBorrar);
        //inyectar all HTML
        gastoListado.appendChild(nuevoGasto)

    });
        
    }   

}
//instanciando de forma global la clase UI
const ui = new UI();

//funciones




function preguntarPresupuesto(){
    const presupuestoUsuario=prompt('cual es tu presupuesto?');
    

    if(presupuestoUsuario===''||presupuestoUsuario===null || isNaN(presupuestoUsuario)|| presupuestoUsuario<=0){
        window.location.reload(); //recarga la misma pagina
    }

    //presupuesto validado enviadando a clase Presupuesto
    presupuesto = new Presupuesto(presupuestoUsuario);

    //enviando el objeto completo de clase presupuesto a clase UI
    ui.insertarPresupuesto(presupuesto);
    
}




function agregarGasto(e){
    e.preventDefault();

    const nombre= document.querySelector('#gasto').value;
    const cantidad= Number( document.querySelector('#cantidad').value);

    if(nombre==='' || cantidad===''){
        ui.alertas('error', 'Los campos no pueden estar vacíos');
        return;
    }else if( isNaN(cantidad)||cantidad <= 0){
        ui.alertas('error', 'Inserta una cantidad valida');
        return;
    }

    //genera un objeto con el gasto. Object literal enhacement

    const gasto={nombre, cantidad, id:Date.now()}
    presupuesto.nuevoGasto(gasto);

    ui.alertas('exito','Correcto, gasto agregado');
    
    //resetear formulario
    formulario.reset();

    //destructuring al objeto de presupuesto
    const {gastos}= presupuesto;
    //imprimir lista de gastos
    ui.agregarListadoGastos(gastos);

}



