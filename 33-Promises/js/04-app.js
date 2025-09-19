//De Callback Hell a Promises
const paises = [];

const nuevoPais = pais => new Promise((resolve, reject) => {
    setTimeout(() => {
        paises.push(pais);
        resolve('Agregado correctamente');
    }, 3000);
});

nuevoPais('México')
    .then(resultado => {
        console.log(resultado);
        console.log(paises);
        return nuevoPais('Peru');
    })
    .then(resultado => {
        console.log(resultado);
        console.log(paises);
        return nuevoPais('Inglaterra')
    })
    .then(resultado => {
        console.log(resultado);
        console.log(paises);
        return nuevoPais('USA')
    })
    .then(resultado => {
        console.log(resultado);
        console.log(paises);
    })
