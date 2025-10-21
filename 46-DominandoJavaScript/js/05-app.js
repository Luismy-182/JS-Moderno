function persona(el1, el2){
    console.log(`Mi Nombre es ${this.nombre} y escucho ${el1}${el2}`);
}

const informacion ={
    nombre:'juan'
}

const musicafavorita=['Heavy metal',' rock'];

persona.call(informacion, musicafavorita[0], musicafavorita[1]);

persona.apply(informacion, musicafavorita);

const nuevaFN= persona.bind(informacion, musicafavorita[0],musicafavorita[1]);
nuevaFN();  