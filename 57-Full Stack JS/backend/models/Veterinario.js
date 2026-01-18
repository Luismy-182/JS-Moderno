import mongoose from "mongoose";
import generarId from "../helpers/generarId.js";
import bcrypt from "bcrypt";

const veterinarioSchema = mongoose.Schema({
    nombre: {
        type: String, //tipo cadena
        required: true, //obligatorio
        trim: true //elimina espacios al final
    },
    password: {
        type: String, //tipo cadena
        required: true, //obligatorio
    },
    email: {
        type: String, //tipo cadena
        required: true, //obligatorio
        unique: true,
        trim: true,
    },
    telefono: {
        type: String, //tipo cadena
        default: null, //no obligatorio
        trim: true,
    },
    web: {
        type: String, //tipo cadena
        default: null, //no obligatorio
    },
    token: {
        type: String, //tipo cadena
        default: generarId()
    },
    confirmado: {
        type: Boolean, //tipo cadena
        default: false, //no siempre en false
    }
});
veterinarioSchema.pre("save", async function(next) {
    //hasheando password
    if (!this.isModified("password")) {
        return;
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

});


veterinarioSchema.methods.comprobarPassword = async function(passwordFormulario){
    return await bcrypt.compare(passwordFormulario, this.password);
}
const Veterinario = mongoose.model("Veterinario", veterinarioSchema);
export default Veterinario;