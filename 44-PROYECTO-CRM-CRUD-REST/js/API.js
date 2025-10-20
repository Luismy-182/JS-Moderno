const url = `http://localhost:4000/clientes`;
export const nuevoCliente = async cliente => {
    try {
        await fetch(url, {
            method: 'POST',
            body: JSON.stringify(cliente),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        //si se inserto el cliente redirije
        window.location.href = 'index.html';
    } catch (error) {
        console.log(error);
    }
}
//obtiene todos los clientes del json
export const obtenerClientes = async () => {
    try {
        const respuesta = await fetch(url);
        const clientes = await respuesta.json();
        return clientes;
    } catch (error) {
        console.log(error);
    }
}

export const eliminarCliente= async id=>{
    try {
        await fetch(`${url}/${id}`,{
            method:'DELETE'
        })
    } catch (error) {
        console.log(error);
        
    }
}

//obtiene un cliente por su id
export const obtenerCliente=async (id)=>{
    try {
        const respuesta = await fetch (`${url}/${id}`);
        const resultado = await respuesta.json();
        return resultado;
        
    } catch (error) {
        console.log(error);
        
    }
}

//update
export async function actualizarCliente(cliente){
    try {
        await fetch(`${url}/${cliente.id}`,{
            method: 'PUT',
            body:JSON.stringify(cliente),
            headers:{
                'Content-Type':'application/json'
            }
        });
        window.location.href='index.html';
    } catch (error) {
        console.log(error);
        
    }
}