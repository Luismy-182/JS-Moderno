const password='123456';
describe('Valida que el password no este vacio y sean 5 caracteres', ()=>{
    test('Que el password tenga 5 caracteres',()=>{
        expect( password ).toHaveLength(6);
    });

    test('Password no vacío', () => {
      expect(password).not.toHaveLength(0);
    })
    
});


