/*bases de datos con index.db*/
let DB;

document.addEventListener('DOMContentLoaded', ()=>{
    crmBD();

    setTimeout(() => {
        crearCliente();
    }, 5000);
});


function crmBD(){
    //crear bd
    let crmDB=window.indexedDB.open('crm', 1);

    //error?
    crmDB.onerror= ()=>{
        console.log('error al crearla bd');
        
    }
    //exito
    crmDB.onsuccess= ()=>{
        console.log('database creada rey');

        DB=crmDB.result;
        
    }

    //configuracion de la BD

    crmDB.onupgradeneeded=function (e){
        const db= e.target.result;

        const objectStore = db.createObjectStore('crm', {
            keyPath:'crm',
            autoIncrement: true
        });




        //definir las columnas 
        objectStore.createIndex('nombre', 'nombre', {unique: false});
        objectStore.createIndex('email', 'email', {unique: true});
        objectStore.createIndex('telefono', 'telefono', {unique: false});



        console.log('columnas creadas');
        

        
    }

}


function crearCliente(){
    let transaction = DB.transaction(['crm'], 'readwrite');

    transaction.oncomplete= function (){
        console.log('TRansaccion completada');
    }


    transaction.onerror=function (){
        console.log('hubo un error en la transaccion');
        
    }

    const objectStore=transaction.objectStore('crm');

    const nuevoCliente={
        telefono:213123615,
        nombre:'Mike',
        email:'correo@correo.com'
    }



    const peticion = objectStore.add(nuevoCliente);
    console.log('peticion');
    
}