//notificaciones Push
const notificacionBTN=document.querySelector('#notificar');

notificacionBTN.addEventListener('click', ()=>{
    Notification
    .requestPermission()
    .then(resultado =>{
        console.log('Resultado del promise: ', resultado);
    });
});

const verNotificacion = document.querySelector('#verNotificacion');
verNotificacion.addEventListener('click', ()=>{
    if(Notification.permission ==='granted'){
        const notificacion = new Notification('Título de notificación',{
            icon: 'img/ccj.png',
            body:'Código con Mike'
            });

        notificacion.onclick = function (){
            window.open('https://miguelangelsuarez.com/');
        }
    }
});