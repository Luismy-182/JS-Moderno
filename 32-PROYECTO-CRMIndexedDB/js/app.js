(function () {
    let DB;

    document.addEventListener('DOMContentLoaded', ()=>{
        crearDB();
    });

    //crea la base de datos INdexDB
    function crearDB(){
        const crearDB =window.indexedDB.open('crm', 2);

        crearDB.onerror=()=>{
            console.log('Tenemos un error');
            
        }

        crearDB.onerror= function (){
            console.log('hubo un error');
            
        };

        crearDB.onsuccess= ()=>{
            DB=crearDB.result;
        };

        crearDB.onupgradeneeded = e =>{
            const db = e.target.result;

            const objectStore=db.createObjectStore('crm', {
                keyPath: 'id', 
                autoIncrement:true
            });


            objectStore.createIndex('nombre', 'nombre', { unique:false });
            objectStore.createIndex('email', 'email', { unique:true });
            objectStore.createIndex('telefono', 'telefono', { unique:false });
            objectStore.createIndex('empresa', 'empresa', { unique:false });
            objectStore.createIndex('id', 'id', { unique:true });
            
            console.log('bd y db Lista para la accion');
            
        }
    }
})()