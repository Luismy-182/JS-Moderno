const cargarJSONArrayBtn=document.querySelector('#cargarJSONArray');
cargarJSONArrayBtn.addEventListener('click', obtenerDatos);



function obtenerDatos(){
    const url = 'data/empleados.json';


    fetch(url)
        .then(respuesta =>respuesta.json() )
        .then(resultado=> mostrarHTML(resultado) )
}



//scripting{
function mostrarHTML(empleados){
    const contenido=document.querySelector('.contenido')

    let html='';

    empleados.forEach(empleado => {
        const {id, nombre, empresa, trabajo }=empleado;

        html+=`
    <p>Empleado: ${nombre}</P>
    <p>id: ${id}</P>
    <p>Empresa: ${empresa}</P>
    <p>trabajo: ${trabajo}</P>
    `;
        
    });

    contenido.innerHTML=html;
}


