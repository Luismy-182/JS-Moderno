//Mixin pattern
class Persona{
    constructor (nombre, correo){
        this.nombre=nombre;
        this.correo=correo;
    }
}

class Cliente{
    constructor (nombre, correo){
        this.nombre=nombre;
        this.correo=correo;
    }
}



const funcionesPersona={
    mostrarInformacion(){
        console.log(`Nombre Persona: ${this.nombre} Email : ${this.correo}`);
        
    },
    mostrarNombre(){
        console.log(`Mi nombre es ${this.nombre}`);
        
    }
}

//Object assign asigna las funciones de un objeto en otra clase
Object.assign(Persona.prototype, funcionesPersona);
Object.assign(Cliente.prototype, funcionesPersona);

const persona = new Persona('Juan', 'correo@correo.com');
persona.mostrarInformacion();

const cliente=new Cliente('Evelyn','eve@eve.com');
cliente.mostrarNombre();
