
const nombresLigues =['Tania', 'Juanita', 'Laurita', 'Ana Maria', 'Michelle', 'Evelin santos'];


//agregando otra nena
function nuevaNena(nombre, callback){
    setTimeout(() => {
        nombresLigues.push(nombre);
        callback();
    }, 3000);
}


function nenas(){
    nombresLigues.forEach(nenas=>{

        setTimeout(() => {
            console.log(nenas);
        }, 2000);
       
         
    });
}

nenas();
nuevaNena('Alma', nenas);





const artista=['Blink-182','Hawthorne', 'Nofx','Rancid'];


function artistas (){
    artista.forEach( artista => {

        setTimeout(() => {
            console.log(artista);    
        }, 3000);
        
    });
};


function nuevoArtista(nombre, callback){
    setTimeout(() => {
        
    artista.push(nombre);
    callback();
    }, 4000);
}

artistas();
nuevoArtista('Silverstein', artistas);