const cliente={
    nombre:'Mike',
    balance:500,
    tipo:'Supreme'
};

describe('Testing al cliente',() =>{
    test('Es mike',()=>{
        expect(cliente).toMatchSnapshot();
    });
});