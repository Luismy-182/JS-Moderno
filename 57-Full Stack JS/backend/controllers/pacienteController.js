import Paciente from "../models/Paciente.js";

const agregarPaciente = async (req, res) => {
    const paciente = new Paciente(req.body);
    //agregando el veterinario id al paciente, gracias al middleware que le creamos
    paciente.veterinario = req.veterinario._id
    try {
        const pacienteAlmacenado = await paciente.save();
        res.json(pacienteAlmacenado);
    } catch (error) {
        console.log(error);

    }



}
const obtenerPacientes = async (req, res) => {
    const pacientes = await Paciente.find()
        .where("veterinario")
        .equals(req.veterinario);

    res.json(pacientes);
}

const obtenerPaciente = async (req, res) => {
    const { id } = req.params;
    //sale error por un salto de línea, limpiando con .trim
    const paciente = await Paciente.findById(id.trim());

    if (!paciente) {
        return res.status(404).json({ msg: "No encontrado" });
    }
    //siempre que compares los id de mkongoo conviertelos a toString, si no no funciona aunque sean iguales
    if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
        return res.json({ msg: "Accion no valida" });
    }

    res.json(paciente);


}

const actualizarPaciente = async (req, res) => {
    const { id } = req.params;
    //sale error por un salto de línea, limpiando con .trim
    const paciente = await Paciente.findById(id.trim());

    if (!paciente) {
        return res.status(404).json({ msg: "No encontrado" });
    }
    //siempre que compares los id de mkongoo conviertelos a toString, si no no funciona aunque sean iguales
    if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
        return res.json({ msg: "Accion no valida" });
    }


    //actualizar paciente
    //actualizar paciente mediante put= el verbo más utilizado
   
    paciente.nombre = req.body.nombre || paciente.nombre;
    paciente.propietario = req.body.propietario || paciente.propietario;
    paciente.email = req.body.email || paciente.email;
    paciente.fecha = req.body.fecha || paciente.fecha;
    paciente.sintomas = req.body.sintomas || paciente.sintomas;

    try {
        const pacienteActualizado = await paciente.save();
        res.json(pacienteActualizado);



    } catch (error) {
        console.log(error);

    }


}
const eliminarPaciente = async (req, res) => {
    const { id } = req.params;
    //sale error por un salto de línea, limpiando con .trim
    const paciente = await Paciente.findById(id.trim());

    if (!paciente) {
        return res.status(404).json({ msg: "No encontrado" });
    }
    //siempre que compares los id de mkongoo conviertelos a toString, si no no funciona aunque sean iguales
    if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
        return res.json({ msg: "Accion no valida" });
    }


    try {
        await paciente.deleteOne();
        res.json({msg:'paciente Eliminado'})
    } catch (error) {
        console.log(error);
        
    }
}

export {
    agregarPaciente,
    obtenerPacientes,
    obtenerPaciente,
    actualizarPaciente,
    eliminarPaciente
}