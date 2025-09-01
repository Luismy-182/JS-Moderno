// class Cliente{
//     #nombre; 

//     constructor(nombre, saldo){
//         this.#nombre=nombre;
//         this.saldo=saldo;
//     }

//     mostrarInformacion(){
//         return `Cliente: ${this.#nombre}, tu saldo es ${saldo}`;
//     }

//     getNombre(){
//         return `el nombre es ${this.#nombre}`;
//     }
// }

// const juan = new Cliente ('juan', 200);


//accediendo a la propiedad:


class Cliente{
    #nombre;

    setNombre(nombre){
        this.#nombre=nombre;
    }

    getNombre(){
        return this.#nombre;
    }

}


const juan = new Cliente ();
juan.setNombre('juan');
console.log(juan.getNombre());
