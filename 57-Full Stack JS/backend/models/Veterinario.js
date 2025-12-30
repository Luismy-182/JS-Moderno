import mongoose from "mongoose";

const veterinarioSchema = mongoose.Schema({
    nombre:{
        type:String, //tipo cadena
        required:true, //obligatorio
        trim:true //elimina espacios al final
    },
    password:{
        type:String, //tipo cadena
        required:true, //obligatorio
    },
    email:{
        type:String, //tipo cadena
        required:true, //obligatorio
        unique:true,
        trim:true,
    },
    telefono:{
        type:String, //tipo cadena
        default:null, //no obligatorio
        trim:true,
    },
    web:{
        type:String, //tipo cadena
        default:null, //no obligatorio
    },
    token:{
        type:String, //tipo cadena
    },
    confirmado:{
        type:Boolean, //tipo cadena
        default:false, //no siempre en false
    }
});

const Veterinario = mongoose.model("Veterinario", veterinarioSchema);
export default Veterinario;