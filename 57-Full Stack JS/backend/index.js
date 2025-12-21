import express from "express";
import conectarDB from "./config/database.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();
conectarDB();

app.use("/", (req, res)=>{
    res.send('Hola Mundo');
})
const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=>{
    console.log(`servidor funcionando en el puerto ${PORT}`);
});