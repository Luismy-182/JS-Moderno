(function(){

    let DB;
    const formulario=document.querySelector('#formulario');
    document.addEventListener('DOMContentLoaded', ()=>{
        conectarDB();
        formulario.addEventListener('submit', validarCliente);
    });



    function conectarDB(){
        const abrirConexion=window.indexedDB.open('crm', 2);


        abrirConexion.onerror = function (){
            console.log('Tenemos un error rey');
            
        }

        abrirConexion.onsuccess = ()=>{
            DB=abrirConexion.result;
        }

      
    }


    function validarCliente(e){
        e.preventDefault();


        //leer todos los inputs

        const nombre = document.querySelector('#nombre').value;
        const email = document.querySelector('#email').value;
        const telefono = document.querySelector('#telefono').value;
        const empresa = document.querySelector('#empresa').value;


   


        if(nombre==='' || email==='' || telefono==='' || empresa==='' ){
            imprimirAlerta('Todos los campos son obligatorios papi', 'error');

            return;
        }

        //crear objeto con la informacion

        const cliente={
            nombre, 
            email,
            telefono,
            empresa
        }

        cliente.id=Date.now();


        crearNuevoCliente(cliente);
        
    }

    function crearNuevoCliente(cliente) {
        const transaction = DB.transaction(['crm'], 'readwrite');
        const objectStore=transaction.objectStore('crm');

        objectStore.add(cliente);


        transaction.onerror= ()=>{
            imprimirAlerta('error en la BD','error');

        }


        transaction.oncomplete = ()=>{
            imprimirAlerta('se agrego correctamente el cliente');

            setTimeout(() => {
                window.location.href='index.html';
            }, 3000);
        }
    }



    function imprimirAlerta(mensaje, tipo){

        const alerta=document.querySelector('.alerta');
        if(!alerta){
            const divMensaje = document.createElement('DIV');
            divMensaje.classList.add('px-4', 'py-3', 'rounded', 'max-w-lg', 'mx-auto', 'mt-6','text-center', 'border');
    
            if(tipo==='error'){
                divMensaje.classList.add('bg-red-100','border-red-400', 'text-red-700','alerta');
    
            }else{
                divMensaje.classList.add('bg-green-100','border-green-400', 'text-green-700')
            }
    
            divMensaje.textContent.textContent=mensaje;
    
            formulario.appendChild(divMensaje);
    
            setTimeout(() => {
                divMensaje.remove();
            }, 3000);
        }
       
    }


})();