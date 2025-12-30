import Veterinario from "../models/Veterinario.js";
const registrar = async (req, res) => {
    try{
    //res.send({url:'Desde API veterinarios, metodo registrar'});
    const {nombre, email,password}=req.body;
    const veterinario=new Veterinario(req.body);
    const veterinarioGuardado= await veterinario.save();
    res.json({msg:"Guardado exitosamente"});
    }catch(error){
        console.log(error);
    }
}


const perfil = (req, res) => {
    res.json({url:'Desde API veterinarios, metodo pefil'});
}


export {
    registrar,
    perfil
}