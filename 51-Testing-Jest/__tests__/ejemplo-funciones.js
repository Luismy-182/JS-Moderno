function suma(a, b) {
    return a + b;

}

function restar(a, b) {
    return a - b;
}

describe('Test a las funciones de suma y resta',()=>{
    test('suma de 20 y 30', () => {
      expect( suma(20,30) ).toBe(50);
    });
    //es 5
    test('Resta de 10 y 5', () => {
        expect( restar(10,5) ).toBe(5);
    });
    //que la suma de 10 y 10 no sea 10 xD
    test('Que la suma 10 y 10 no sea 10', () => {
      expect(suma(10,10)).not.toBe(10);
    });
    //que la resta de 10 y 5 no sea otro valor
    test('que la resta de 10 y 5 sea otro valor que 4', () => {
      expect(restar(10,5)).not.toBe(4);
    });
    
    
});