function suma(a, b) {
    return a + b;

}

function restar(a, b) {
    return a - b;
}


let resultado = suma(5, 4);
let esperado = 0;

//como en jest
expected(esperado).toBe(resultado)

resultado = restar(5, 3);
esperado = 2;
expected(esperado).toEqual(resultado)
function expected(esperado) {
    return {
        toBe(resultado) {
            if (resultado !== esperado) {
                console.log(`El ${resultado} es diferente a lo esperado; No paso la prueba`);
            } else {
                console.log(`Esperado ${esperado} La prueba paso correctamente`);

            }
        },
        toEqual(resultado) {
            if (resultado !== esperado) {
                console.log(`El ${resultado} no es Igual a lo esperado; No paso la prueba`);
            } else {
                console.log(`Esperado ${esperado} La prueba paso correctamente`);

            }
        }
    }
}
