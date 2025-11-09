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



//test con funciones asincronas
async function sumaAsync(a, b) {
    return Promise.resolve(suma(a, b));
}

test(`SUma 10+20 y el resultado debe ser 30`, async()=>{
    const resultado= await sumaAsync(10,20);
    const esperado=31;
    expected(esperado).toBe(resultado);
})

//test a la fn asyncrona
async function test(mensaje, callback) {
    try {
        //llamara a una funcion x
        await callback();
        console.log(`EL test: ${mensaje} se ejecuto correctamente`);
    } catch (error) {
        console.log('Error papi :o');
        console.log(error);
    }
}

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