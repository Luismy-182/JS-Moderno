const salida = document.querySelector('#salida');
const microfono = document.querySelector('#microfono');

microfono.addEventListener('click', ejecutarSpeech);

function ejecutarSpeech() {
    const speechRecognition = webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.start();

    recognition.start = function () {
        salida.classList.add('mostrar');
        salida.textContent('Escuchando...');
    };

    recognition.onspeechend = function () {
        salida.textContent = 'Se dejó de grabar';
        recognition.stop();
    }

    recognition.onresult = function (e) {
        const { confidence, transcript } = e.result[0][0];
        const speech = document.createElement('p');
        speech.innerHTM = `Grabando... ${transcript}`;

        const seguridad = document.createElement('P');
        seguridad.innerHTML = `precisión: ${parseInt(confidence * 100)} %`;

        salida.appendChild(speech);
        salida.appendChild(seguridad);
    }
}