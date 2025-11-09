const cliente={
    nombre:'Mike',
    balance:500
};
describe('testing al Cliente', ()=>{
    test('El cliente es premium', () => {
    expect(cliente.balance).toBeGreaterThan(400);;
    });

    test('Es Mike', () => {
      expect(cliente.nombre).toBe('Mike');
    });

    //prueba no no exista otro cliente, true
    test('No es otro cliente',()=>{
        expect(cliente.nombre).not.toBe('Pedro');
    });
    //prueba que no tenga 400 pesos reales, lo cual dara true
    test('no tiene 500',()=>{
        expect(cliente.balance).not.toBe(400);
    });
    
});