import { Router } from 'express';
import { listaPacientes, pacientePorId, crearPaciente, actualizarPaciente, eliminarPaciente } from '../controllers/pacientesControllers';
import { validarPaciente } from '../middlewares/pacientesMiddlewares';
const router = Router();


router.get('/', listaPacientes);

router.get('/:id', pacientePorId);

router.post('/', validarPaciente, crearPaciente);

router.put('/:id', validarPaciente, actualizarPaciente);

router.delete('/:id', eliminarPaciente);

export default router;
