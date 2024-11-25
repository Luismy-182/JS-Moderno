


export const nombre='mike';

export const ahorro = 200;

export function mostrarInformacion(nombre, ahorro){
    return `Cliente: ${nombre} - Ahorro: ${ahorro}`; 
}

export function tieneSaldo (ahorro){
    if(ahorro>0){
        console.log('tiene saldo paps');
        
    }else{
        console.log( 'no tiene saldo paps');
        
    }
}




export class Cliente {
    constructor(nombre, ahorro){
        this.nombre=nombre;
        this.ahorro=ahorro;
    }

    mostrarInformacion(){
        return `Cliente: ${nombre} - Ahorro: ${ahorro}`; 
    }
}


