class InputHTML{
    constructor (type, nombre){
        this.type=type;
        this.nombre=nombre;
    }
    crearInput(){
        return `<input type="${this.type}" name="${this.nombre}" id="${this.nombre}"`;
    }
}

class HtmlFactory{
    crearElemento(tipo, nombre){
        switch(tipo){
            case 'text':
                return new InputHTML('text', nombre);
            case 'tel':
                return new InputHTML('tel',nombre);
            case 'email':
                return new InputHTML('email',nombre);
            default:
                return;
        }
    }
}

const elemento=new HtmlFactory();
const inputText=elemento.crearElemento('text', 'nombre-cliente');
console.log(inputText.crearInput());

const elemento2=new HtmlFactory();
const inputText2=elemento2.crearElemento('tel', 'numero-telefono');
console.log(inputText2.crearInput());

const elemento3=new HtmlFactory();
const inputText3=elemento3.crearElemento('email', 'email-cliente');
console.log(inputText3.crearInput());
