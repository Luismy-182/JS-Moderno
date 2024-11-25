//anteriormente vimos un metodo de sscrolling llamado .getCLienteRectBuinding, que permitia decirnos cuando un elemento estaba visible
//podemos usar una api propia del nav llamada intersection Observer, esta estara objesrvando como cazador asta que aparesca un elemento en nuestra pantalla



document.addEventListener('DOMContentLoaded', ()=>{
    const observer = new IntersectionObserver(entries =>{


        if(entries[0].isIntersecting) {
            console.log('Ya esta visible rey :D', observer, entries[0]);
            return;
        }else{
            console.log('ya no esta visible rey');
            
        }
    });

    observer.observe(document.querySelector('.premium'));
})
