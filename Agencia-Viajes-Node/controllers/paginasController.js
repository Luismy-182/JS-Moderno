import { Viaje } from '../models/Viaje.js';
import { Testimonial } from '../models/Testimonial.js';


const paginaInicio = async (req, res) => {
    /* Logica del controlador */
    const clase = 'home'//solo esta disponible en el index
    //consultar solo 3 viajes y enviarlos al index
    const promiseDB = [];
    promiseDB.push(Viaje.findAll({ limit: 3 }));
    promiseDB.push(Testimonial.findAll({ limit: 3 }));


    try {
        // const viajes = await Viaje.findAll({limit:3})
        // const testimoniales=await Testimonial.findAll({limit:3});
        //abusado mi cochi, no siempre necesitas un await tras otro await, si no tienen nada que ver consulta ambos al mismo tiempo, porque si tarda tu consulta 10s por cada uno tendras que esperar 20seg por antes de mopstrar la vista, usa Pomise.all()

        const resultado=await Promise.all(promiseDB);
        res.render('inicio', {
            pagina: 'Inicio',
            clase,
            viajes:resultado[0],
            testimoniales:resultado[1]
        })
    } catch (error) {
        console.log(error);

    }
}
const paginaNosotros = (req, res) => {
    /* Logica del controlador */




    res.render('nosotros', {
        pagina: 'Nosotros'
    });
}

const paginaViajes = async (req, res) => {

    //consultado la bd desde Sequelize
    const viajes = await Viaje.findAll();
    console.log(viajes);

    res.render('viajes', {
        pagina: 'Próximos viajes',
        viajes
    });

}

/* controlador muestra el viaje seleccionado con urls amigables */
const paginaDetalleViaje = async (req, res) => {
    //recibimos el slug del router
    const { slug } = req.params //destructuring al reque.params del router

    try {
        const resultado = await Viaje.findOne({ where: { slug } });

        res.render('viaje', {
            pagina: 'Información Viaje',
            resultado
        });
    } catch (error) {
        console.log(error);

    }

}

const paginaTestimoniales = async (req, res) => {
    /* Logica del controlador */
    //mostrando los testimoniales en el get
    try {
        const testimoniales = await Testimonial.findAll();
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
        });
    } catch (error) {
        console.log(error);

    }



}


export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}