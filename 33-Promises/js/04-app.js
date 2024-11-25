const paises = [];

const nuevoPais = function (pais) {
     return new Promise(function (resolve){
            setTimeout(() => {
            paises.push(pais);
            resolve('EL resultado del resolve') 
        }, 3000);
    })
}





nuevoPais('alemania')

    .then(resultado =>{
        console.log(resultado);
        console.log(paises);
        return nuevoPais('francia');
    })

    .then(resultado =>{
        console.log(resultado);
        console.log(paises);
        return nuevoPais('Inglaterra');
    })

    .then(resultado =>{
        console.log(resultado);
        console.log(paises);
        return nuevoPais('Tu puta madre');
        
        
    })

    .then((resultado) => {
        console.log(resultado);
        console.log(paises);
        
        
    });





/********************Otro ejemplo *********************************************/
/*********Se dice que los promises son los callback*******/

    const genero=[];


    const nuevoGenero= tipo=>{
        return new Promise(resolve =>{
           setTimeout( () =>{
            genero.push(tipo);
            resolve('resultado del resolve');
           }, 3000)  
        });
    }



    nuevoGenero('Metal') 
    .then(resultado=>{
        console.log(genero);
        console.log(resultado);
        return nuevoGenero('Rock')
    })
    .then(resultado=>{
        console.log(genero);
        console.log(resultado);
        return nuevoGenero('TRash- Metal')
    })
    .then(resultado=>{
        console.log(genero);
        console.log(resultado);
        return nuevoGenero('Hardcore')
    })
    .then(resultado=>{
        console.log(genero);
        console.log(resultado);
        return nuevoGenero('Punk - rock')
    });