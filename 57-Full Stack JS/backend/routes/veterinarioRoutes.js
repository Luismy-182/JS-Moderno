import express from 'express';
import {registrar, perfil} from '../controllers/veterinarioController.js';

const router = express.Router();

//toma el relevo del router /api/veterinarios
router.post('/', registrar);
router.get('/perfil', perfil);

export default router;