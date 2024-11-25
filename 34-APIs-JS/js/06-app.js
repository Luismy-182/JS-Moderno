const salida=document.querySelector('#salida');
const microfono=document.querySelector('#microfono');


microfono.addEventListener('click', ejecutarSpeechAPI);

function ejecutarSpeechAPI(){
    const SpeechRecognition = webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.start();

   
    recognition.onstart = function(){
      salida.classList.add('mostrar') ;
      salida.textContent='Escuchando...' ;

    };

    recognition.onspeechend = function(){
        salida.textContent='Se dejo de grabar rey :D';
        recognition.stop();
    }


    recognition.onresult= (e)=>{
        setTimeout(() => {
            
        
            console.log(e.results[0][0]);

            const {confidence, transcript}=e.results[0][0];

            const speech = document.createElement('P');
            speech.innerHTML=`Grabando: ${transcript}`;

            const seguridad = document.createElement('p');
            seguridad.innerHTML=`seguridad ${parseInt( confidence * 100)} %`

            
            salida.appendChild(speech);
            salida.appendChild(seguridad);

        }, 1000);
    }
}
