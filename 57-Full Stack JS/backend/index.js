import express from "express";
import conectarDB from "./config/database.js";
import dotenv from "dotenv";
import cors from "cors";
import VeterinarioRoutes from './routes/veterinarioRoutes.js';
import PacienteRoutes from './routes/pacienteRoutes.js';

const app = express();
app.use(express.json());
dotenv.config();
conectarDB();
//agregar al arreglo de dominios permitidos
const dominiosPermitidos=[process.env.FRONTEND_URL];
const corsOptions={
    origin: function (origin, callback){
        if(dominiosPermitidos.indexOf(origin)!== -1){
            callback(null,true);
        }else{
            callback(new Error('No permitido por Cors'));
        }
    },
};

app.use(cors(corsOptions));

app.use("/api/veterinarios",VeterinarioRoutes); //le pasa el routing a veterinarioRouter
app.use("/api/pacientes",PacienteRoutes); //le pasa el routing a pacientes

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=>{
    console.log(`servidor funcionando en el puerto ${PORT}`);
});
