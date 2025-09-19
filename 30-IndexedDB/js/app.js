let DB;
document.addEventListener('DOMContentLoaded', () => {
    crmDB();

    setTimeout(()=>{
        crearCliente();
    }, 6000)
});

function crmDB() {
    //indexDB.open crea una nueva conexión y recibe un nombre y una versión
    let crmDB = window.indexedDB.open('crm', 1);

    //si hay error, (el error puede ser que el navegador no soporte IndexDB)
    //onerror es un metodo que existe en indexDB
    crmDB.onerror = function () {
        console.log('Hubo un error');
    }

    //si se creo bien
    crmDB.onsuccess = function () {
        DB=crmDB.result;
        console.log('DB Creada correctamente');

    }
    //config de BD (solo se ejecuta una vez)
    crmDB.onupgradeneeded = function (e) {
        const db = e.target.result; //referencia de la bd en la variable db
        //permite crear las columnas el objectStore
        const objectStore = db.createObjectStore('crm', { //se ocupara para interactuar con la BD, ese metodo retorna un objeto (nombralo)
            keyPath: 'crm', //clave principal del objeto IDBObjectStorage identifica de forma unica cada entrada en el almacen de datos
            autoIncrement: true
        });

        //definir columnas
        objectStore.createIndex('nombre', 'nombre', { unique: false }); //nombre columna y keypath como haces referencia para consultar
        objectStore.createIndex('email', 'email', { unique: true }); //opciones unique o false, no pueden repetir los email
        objectStore.createIndex('telefono', 'telefono', { unique: false });

        console.log('columnas creadas Papá :-)');
    }
}


//transacciones
function crearCliente(){
    let transaction = DB.transaction(['crm'], 'readwrite');

    transaction.oncomplete= function (){
        console.log('Transacción completada');
        
    }

    transaction.onerror = function(){
        console.log('Error en transacción');
        
    }

    const objectStore = transaction.objectStore('crm');

    const nuevoCliente = {
        telefono: 5533243707,
        nombre:'Mike',
        email: 'correo@correo.com'
    }

    const peticion = objectStore.add(nuevoCliente); //put//delete
    console.log(peticion);
    
}