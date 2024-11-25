import {nombre, ahorro, mostrarInformacion, tieneSaldo, Cliente} from './cliente.js';
import {Empresa} from './empresa.js'

console.log(nombre);


console.log(ahorro);


console.log(mostrarInformacion(nombre, ahorro));


tieneSaldo(ahorro);



const cliente = new Cliente(nombre, ahorro);


console.log(cliente.mostrarInformacion());



//importar empresa

const empresa =new Empresa('codigo con Mike', 100, 'Aprendizaje en Línea');

console.log(empresa.mostrarInformacion());



