//sintaxis common.js no es propia de js (antes de modulos de js)
//const express = require('express');

//forma moderna con modules de js
import  express  from "express";
import router from './routes/index.js';
import db from './config/database.js';


const app=express();

//conectamos a la bd
db.authenticate()
    .then( ()=> console.log('Base de datos conectada'))
    .catch( (error)=>console.log(error) );

//define el puerto como apache
const port =process.env.PORT   || 4000;
app.set('view engine','pug');
//console.log al middleware en req
/* req lo que mandamos como usuario o recibimos como backend, res lo que dice Express, o enviamos de respuesta como backend */
app.use( (req, res, next)=>{
    const year=new Date();
    res.locals.actualYear=year.getFullYear(); //envia el año actual a todos los vervos
    res.locals.nombresitio='Agencia de viajes';

    next(); //obliga a dar el siguiente salto al siguiente middleware
});
//agregando la carpeta public con img 
app.use(express.static('public'));

//agregando bodyparser para leer datos por post
app.use(express.urlencoded({extended:true}));

//agregando el router
app.use('/',router); //conecta con tu instancia de express.Router

app.listen(port, ()=>{
    console.log(`puerto funcionando en ${port}`);
});


