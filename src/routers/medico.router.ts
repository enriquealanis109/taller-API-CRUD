import { Router } from 'express';
import {
  obtenerMedicos,
  obtenerMedicoPorId,
  crearMedico,
  actualizarMedico,
  eliminarMedico
} from '../controllers/medico.controller';
import { validarMedico } from '../middlewares/medico.middleware';

const router = Router();

// Rutas GET
router.get('/', obtenerMedicos);
router.get('/:id', obtenerMedicoPorId);

// Rutas POST y PUT (protegidas con el middleware de validación)
router.post('/', validarMedico, crearMedico);
router.put('/:id', validarMedico, actualizarMedico);

// Ruta DELETE
router.delete('/:id', eliminarMedico);

export default router;