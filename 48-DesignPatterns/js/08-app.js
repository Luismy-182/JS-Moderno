function Vendedor(nombre){
    this.nombre=nombre;
    this.sala=null
}

Vendedor.prototype={
    oferta:(articulo, precio)=>{
        console.log(`Tenemos el siguiente ${articulo}, iniciamos con un precio de ${precio}`);
    },
    vendido:comprador=>{
        console.log(`vendido a ${comprador}`);
    }
}
function Comprador(nombre){
    this.nombre=nombre;
    this.sala=null;
}

Comprador.prototype={
    oferta:(cantidad, comprador)=>{
        console.log(`${comprador.nombre}: ${cantidad}`);
    }
}

function Subasta(){
    let compradores=[];
    return {
        registrar:usuario=>{
            compradores[usuario.nombre]=usuario;
            usuario.sala=this;
        }
    }
}

//crearObjetos
const juan=new Comprador('Juanin');
const mike = new Comprador('Mike');
const vendedor = new Vendedor('Vendedor de carros');
const subasta = new Subasta();

//Registrando en la sala
subasta.registrar(juan);
subasta.registrar(mike);
subasta.registrar(vendedor);



//oferta de subasta
vendedor.oferta('mustang 98', 350);

juan.oferta(350, juan);
mike.oferta(353, mike);
juan.oferta(358, juan);
mike.oferta(5000, mike);

vendedor.vendido('Mike');

