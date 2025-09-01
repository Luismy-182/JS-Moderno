const formulario = document.querySelector('#formulario');
const listarTweets=document.querySelector('#lista-tweets');
let tweets=[];

formulario.addEventListener('submit', agregarTweet);


//localStorage cuando el dom este listo
document.addEventListener('DOMContentLoaded', e=>{

    //si encuentra en localstorage el json, lo vulver arreglo, si no crea uno vacio para evitar errores
    tweets = JSON.parse(localStorage.getItem('tweets')) || []

    //crear el html 
    imprimirHTML();
});

function agregarTweet(e){
    e.preventDefault();

    
    //obteniendo el valor del textarea
    const tweet=document.querySelector('#tweet').value;
    
    if(tweet===''){
        alertas('No puede estar vacio');
        return;
    }
    //creamos un objeto con los datos del form
    const tweetObj={
        id:Date.now(),
        tweet
    }
    
    //añadir el objeto al arreglo de tweets
    tweets=[...tweets, tweetObj];

    //imprimir el tweet
    imprimirHTML();    

    //reseteamos al sumbit
    formulario.reset();
}

function alertas(alerta){
    const mensaje=document.createElement('P');
    mensaje.classList.add('error');
    mensaje.textContent=alerta;
    //inyectando
    const contenido=document.querySelector('#formulario');
    contenido.appendChild(mensaje);

    //programando que desaparezca en 3segundos
    setTimeout(() => {
        mensaje.remove();
    }, 3000);
}

function imprimirHTML(){
    limpiarHTML();
    tweets.forEach( tweets=>{
        
    const {id, tweet}=tweets //destructuring diferente a la llave

    //bton borrar
    const btnEliminar= document.createElement('a');
    btnEliminar.classList='borrar-tweet';
    btnEliminar.innerText='X';

    //añadir la funcion de eliminar
    btnEliminar.onclick = ()=>{
        borrarTweet(id);
    }

    //creando el elemento a imprimir
    const li = document.createElement('LI');
    li.innerText=tweet;
    
    //inyectando
    listarTweets.append(btnEliminar);
    listarTweets.appendChild(li);
    
    });

    //guardamos en LocalStorage
    sincronizarStorage();

    
}

function limpiarHTML(){
    while(listarTweets.firstChild){
        listarTweets.removeChild(listarTweets.firstChild);
    }
}

function sincronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

function borrarTweet(id){
    tweets=tweets.filter(tweet =>tweet.id !==id);
    imprimirHTML();
}