import express from "express";
import conectarDB from "./config/database.js";
import dotenv from "dotenv";
import VeterinarioRoutes from './routes/veterinarioRoutes.js';

const app = express();
app.use(express.json());
dotenv.config();
conectarDB();

app.use("/api/veterinarios",VeterinarioRoutes); //le pasa el routing a veterinarioRouter

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=>{
    console.log(`servidor funcionando en el puerto ${PORT}`);
});