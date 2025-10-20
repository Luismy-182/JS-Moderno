const suma= (a,b)=> a+b;
const multiplica= (a,b)=> a*b;

const sumarOMultiplicar = fn => fn (10,20);

console.log(sumarOMultiplicar(suma));
console.log(sumarOMultiplicar(multiplica));


