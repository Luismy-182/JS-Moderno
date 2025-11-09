//class pattern
class Persona{
    constructor (nombre, correo){
        this.nombre=nombre;
        this.correo=correo;
    }
}


const persona = new Persona('Mike', 'correo@correo.com');

console.log(persona);
