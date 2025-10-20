import { obtenerCliente,actualizarCliente } from "./API.js";
import { alertas, validar } from "./funciones.js";
(function () {
    //valores de los inputs
    const nombreInput = document.querySelector('#nombre');
    const emailIntput = document.querySelector('#email');
    const empresaInput = document.querySelector('#empresa');
    const telefonoInput = document.querySelector('#telefono');
    const idInput = document.querySelector('#id');
    document.addEventListener('DOMContentLoaded', async function () {
        const parametrosURL = new URLSearchParams(window.location.search);
        const idCliente = parametrosURL.get('id');
        const cliente = await obtenerCliente(idCliente);

        mostrarCliente(cliente);

        const submitFormulario = document.querySelector('#formulario');
        submitFormulario.addEventListener('submit', validarCliente);
    });

    function mostrarCliente(cliente) {
        //con el objeto que obtuvimos de fetch llenamos los input del formulario
        const { nombre, empresa, email, telefono, id } = cliente;
        nombreInput.value = nombre;
        emailIntput.value = email;
        empresaInput.value = empresa;
        telefonoInput.value = telefono;
        idInput.value = id;
    }

    function validarCliente(e) {
        e.preventDefault();
        const cliente = {
            nombre: nombreInput.value,
            email: emailIntput.value,
            telefono: telefonoInput.value,
            empresa: empresaInput.value,
            id: idInput.value
        }
        console.log(cliente);

        if (validar(cliente)) {
            alertas('Todos los campos son obligatorios');
            return;
        }
        actualizarCliente(cliente);
    }
})();