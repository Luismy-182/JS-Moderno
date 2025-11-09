const carrito = ['p1', 'p2','p3'];

describe('Testing al carrito de compras', ()=>{
    test('probar que el array tenga 3 elementos', ()=>{
        expect(carrito).toHaveLength(3);
    });
    test('QUe no este vacío', ()=>{
        expect(carrito).not.toHaveLength(0);
    });
})