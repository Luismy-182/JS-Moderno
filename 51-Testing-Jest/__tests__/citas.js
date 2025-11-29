import Citas from '../js/classes/Citas';

describe('Probando la clase de citas', () => {
    id = Date.now();
    const citas = new Citas();
    test('Agregar una nueva cita', () => {

        const citaObj = {
            id,
            mascota: 'Hook',
            propietario: 'Juan',
            telefono: '39812938',
            fecha: '23/11/25',
            hora: '7:40pm',
            sintomas: 'SOlo duerme'
        }

        citas.agregarCita(citaObj);
        expect(citas).toMatchSnapshot();

    });

    test('Actualizar cita', () => {

        const citaObj = {
            id,
            mascota: 'Donald BB',
            propietario: 'Miguel',
            telefono: '5533243707',
            fecha: '23/11/25',
            hora: '7:40pm',
            sintomas: 'SOlo come XD'
        }

        citas.editarCita(citaObj);
        expect(citas).toMatchSnapshot();
    });

    //eLIMINA
    test('Eliminar Cita',()=>{
        citas.eliminarCita(id);
        expect(citas).toMatchSnapshot();
    })

})