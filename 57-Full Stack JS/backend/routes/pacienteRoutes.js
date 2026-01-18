import express from "express";
import { agregarPaciente, obtenerPacientes, obtenerPaciente, actualizarPaciente,eliminarPaciente } from "../controllers/pacienteController.js";
import checkAuth from '../middleware/authMiddleware.js';

const router = express.Router();
//le pasamos el middleware, el cual contiene datos de los veterinarios para hacerlo disponible a lso pacientes
router.route('/')
    .post(checkAuth, agregarPaciente)
    .get(checkAuth, obtenerPacientes);

router
    .route('/:id')
    .get(checkAuth, obtenerPaciente)
    .put(checkAuth, actualizarPaciente)
    .delete(checkAuth, eliminarPaciente);

export default router;