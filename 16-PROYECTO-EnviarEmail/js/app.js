document.addEventListener('DOMContentLoaded',() =>{
    //seleccionar elementos de la interfaz 
    const inputEmail=document.querySelector('#email');
    const inputAsunto=document.querySelector('#asunto');
    const inputMensaje=document.querySelector('#mensaje');
    const formulario=document.querySelector('#formulario');
    const btnSubmit=document.querySelector('#formulario button[type="submit"]');
    const btnReset=document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');
    const inputCC=document.querySelector('#cc');


 
    
    const email ={
        email:'',
        cc:'',
        asunto:'',
        mensaje:''
    }

    //asignar eventos
    // inputEmail.addEventListener('blur', (e)=>{
    //     console.log(e.target.value);
    // });
    inputEmail.addEventListener('blur', validar);
    inputAsunto.addEventListener('blur',validar);
    inputMensaje.addEventListener('blur',validar);
    formulario.addEventListener('submit', enviarEmail);
    

    function enviarEmail(e){
        e.preventDefault();
        spinner.classList.remove('hidden');
        spinner.classList.add('flex');
        setTimeout(() => {
            spinner.classList.add('hidden');
            spinner.classList.remove('flex');
            resetFormulario();

            //creando una alerta
            const alerta=document.createElement('P');
            alerta.classList.add('bg-green-500','text-white','font-bold','text-sm','p-2','text-center');
            alerta.textContent='Exito, se envio el email';
            formulario.appendChild(alerta);

        setTimeout(()=>{
            alerta.remove();
        },3000);

        }, 3000);
        
    }


    //resetar el formulairo
    btnReset.addEventListener('click', e =>{
        e.preventDefault();

        if(confirm('Estas seguro?')){
        //reiniciamos el objeto
        formulario.reset();
        resetFormulario();
        }    
    });


    //verifica que cc si contiene algo sea un email valido
    inputCC.addEventListener('blur', e =>{
        
       if(e.target.id==='cc' && !validarEmail(e.target.value)){
        mostrarAlerta('No es un email valido', e.target.parentElement);

        //si el input esta totalmente vacio, limpia el objeto
        if(e.target.value===''){
            email.cc='';
            comprobarEmail();
            limpiarAlerta(e.target.parentElement);
            return;
        }
        //si no paso la E.R email 
        if(!validarEmail(e.target.value)){
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled=true;
            email.cc='';
            return;
        }
    }
      limpiarAlerta(e.target.parentElement);
      sincronizarObjeto(e);
      comprobarEmail();
    });


    function sincronizarObjeto(e){
    //sincronizando el email y quitando espacios laterales y haciendolo todo minusculas
        email[e.target.name]=e.target.value.trim().toLowerCase();
        console.log(email);
    }

    function validar(e){
        if(e.target.value.trim() === ''){                        
            mostrarAlerta(`El campo ${e.target.id} no puede estar vacío`, e.target.parentElement );
            email[e.target.name]='';
            comprobarEmail();
            return;
        }
        //mandamos la referencia
        limpiarAlerta(e.target.parentElement);
        //validar email

        if( e.target.id==='email' && !validarEmail(e.target.value) ){
            mostrarAlerta('No es un email valido', e.target.parentElement);
            email[e.target.name]='';
            comprobarEmail();
            return;
        }

        //sincronizando el email y quitando espacios laterales y haciendolo todo minusculas
        sincronizarObjeto(e);
        
        //comprobar el objeto de email
        comprobarEmail();
        

    }

    //mostrar alertas personalizadas
    function mostrarAlerta(mensaje, referencia){
        //limpiando la alerta
        limpiarAlerta(referencia);
        //generamos alerta con HTML
        const alerta = document.createElement('P');
        alerta.textContent = mensaje;
        alerta.classList.add('bg-red-600', 'text-white', 'p-2' , 'text-center');
        //inyectamos alerta
        referencia.appendChild(alerta);
      
    }

    function limpiarAlerta(referencia){
        const error=referencia.querySelector('.bg-red-600');
        if(error){
        error.remove();
       }
    }


    function validarEmail(email){
        //expresion regular
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
        const resultado= regex.test(email);
        return resultado;
    }
    
    
    function comprobarEmail(){
        //console.log(email);
        
        if (email.email==='' || email.asunto==='' || email.mensaje===''){
          
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled=true;
            return;


        }
      
        btnSubmit.classList.remove('opacity-50');
        btnSubmit.disabled=false;
    }


    function resetFormulario(){
        email.email='';
        email.cc='';
        email.asunto='';
        email.mensaje=''; 
        comprobarEmail();
    }


});