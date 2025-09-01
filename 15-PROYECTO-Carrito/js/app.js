const carrito = document.querySelector('#carrito');
const contenedorCarrito=document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn=document.querySelector('#vaciar-carrito');
const listaCursos=document.querySelector('#lista-cursos');
let articulosCarrito=[];
//ejecutar funcion de eventListeners
cargarEventListeners();


function cargarEventListeners(){
    //agregar cursos al carrito
    listaCursos.addEventListener('click', agregarCurso);
    //eliminar elementos del carrito
    carrito.addEventListener('click', eliminarCurso);
    //vaciar carrito
    vaciarCarritoBtn.addEventListener('click',limpiarCarrito);
}

function agregarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        //vamos al elemento padre que contendra todos los atributos del card
        const cursoSeleccionado= e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
        
    }
    
}


function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        
        cursoId=e.target.getAttribute('data-id');
        articulosCarrito=articulosCarrito.filter(curso => curso.id !==cursoId);
        carritoHTML(); 
       

    }
    
}


//boton limpiar carrito
function limpiarCarrito(e){
    e.preventDefault();
    //reiniciamos el arreglo
    articulosCarrito=[];
    limpiarHTML();
}

//leer el contenido del card que clicamos
function leerDatosCurso(cursoSeleccionado){

    //creamos el objeto del curso
    const infoCurso={
        imagen:cursoSeleccionado.querySelector('img').src,
        titulo:cursoSeleccionado.querySelector('h4').textContent, 
        precio:cursoSeleccionado.querySelector('.precio span').textContent,
        id:cursoSeleccionado.querySelector('a').getAttribute('data-id'),
        cantidad:1,
    }
    
 
    //revisamos si un articulo ya existe en el carrito (arreglo)
    const existe= articulosCarrito.some(curso => curso.id===infoCurso.id);
    if(existe){
        articulosCarrito.map(curso=>{

            if(curso.id===infoCurso.id){
                curso.cantidad++;
                return curso;//returna el curso con la cantidad alterada
            }else{ 
                //si el id no es el mismo con el del carrito aun asi retorna
                return curso;
            }
        
        })
    }else{
        
        articulosCarrito=[...articulosCarrito, infoCurso];
    }


    
    carritoHTML();//llamamos al carrito y su inyeccion
}


function carritoHTML(){
    limpiarHTML();
    articulosCarrito.forEach(curso =>{
        const {imagen, titulo, precio,id,cantidad}=curso;
        const row = document.createElement('tr');
        row.innerHTML=`
        <td><img src="${imagen}" with="100"></td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td><a href="#" class="borrar-curso" data-id="${id}">X</a></td>
        `;

       
     //agregar el html al tbody del carrito
        contenedorCarrito.appendChild(row);
     
        
    });

}

function limpiarHTML(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}