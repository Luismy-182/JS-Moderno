import { Testimonial } from "../models/Testimonial.js";
const guardarTestimonial = async (req, res) => {
    //POST
    const { nombre, correo, mensaje } = req.body;
    //validacion backend
    const errores = [];

    if (nombre.trim() === '') {
        errores.push({ mensaje: 'El nombre esta vacío' })
    }
    if (correo.trim() === '') {
        errores.push({ mensaje: 'El correo esta vacío' })
    }
    if (mensaje.trim() === '') {
        errores.push({ mensaje: 'El mensaje esta vacío' })
    }

    if (errores.length > 0) {
        const testimoniales = await Testimonial.findAll();

        //mostramos los errores en la vista
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
        })
    } else {

        //insertando en la bd
        try {

            await Testimonial.create({
                nombre,
                correo,
                mensaje,
            });
            res.redirect('/testimoniales');//redirije despues de insertar, si no se queda cargando
        } catch (error) {
            console.log(error);

        }
    }
}


export {
    guardarTestimonial
}