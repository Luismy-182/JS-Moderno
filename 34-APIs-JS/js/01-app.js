const notificarBtn = document.querySelector('#notificar');

notificarBtn.addEventListener('click', ()=>{
    Notification 
        .requestPermission()
        .then(resultado =>{
            console.log('El resultado es ', resultado);
            
        });

});

const verNotificacion = document.querySelector('#verNotificacion');

verNotificacion.addEventListener('click', () =>{
    if (Notification.permission ==='granted') {
        const notificacion = new Notification ('Esta es una notificacion', {
            icon: 'img/ccj.png',
            body: 'Código con Mike, APrendiendo Js para conseguir un trabajo'
        });
        
        notificacion.onclick= function (){
            window.open('https://www.miguelangelsuarez.com')
        }
    }
    
})