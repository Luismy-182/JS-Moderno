import nodemailer from "nodemailer";
const emailOlvidePassword = async (datos) => {

    // Variables y credenciales
    var transport = nodemailer.createTransport({
        host:process.env.EMAIL_HOST,
        port:process.env.EMAIL_PORT,
        auth: {
            user:process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    });


    //destructuring a datos
    console.log(datos);
    
    const {email, nombre, token}=datos;
    //enviar email
    const info=await transport.sendMail({
        from: "APV - Adiministrador de Pacientes de Veterinaria",
        to: email, 
        subject:'Restablece tu password en APV',
        text:'Restablece tu password en APV',
        html: `<p> Hola: ${nombre}, restablece tu password en APV.</p>
        <p>Restablece tu password siguiendo el siguiente enlace: 
        <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Restablecer password</a>

        <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
        `,
    });

    console.log("Mensaje enviado: %", info.messageId);
    
}


export default emailOlvidePassword;