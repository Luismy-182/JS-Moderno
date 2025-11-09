//Constructor pattern (clases abstractas que heredan)
class Persona{
    constructor (nombre, correo){
        this.nombre=nombre;
        this.correo=correo;
    }
}

class Cliente extends Persona{
    constructor(nombre, correo, empresa){
        super(nombre, correo);
        this.empresa=empresa;
    }
}

const cliente = new Cliente('Mike', 'Correo1@correo.com','BBVA');
console.log(cliente);

//tambien puedes instanciar Persona
const persona = new Persona('Evelin','Correo3@correo.com');
console.log(persona);
