import express from 'express';
import {registrar, perfil, confirmar, autenticar, olvidePassword, comprobarToken, nuevoPassword} from '../controllers/veterinarioController.js';
import checkAuth from '../middleware/authMiddleware.js';

const router = express.Router();

//toma el relevo del router /api/veterinarios
router.post('/', registrar);
router.get('/perfil', checkAuth, perfil);
router.get('/confirmar-cuenta/:token', confirmar);
router.post('/login', autenticar);
router.post('/olvide-password', olvidePassword);
router.get('/olvide-password/:token', comprobarToken);
router.post('/olvide-password/:token', nuevoPassword);


export default router;