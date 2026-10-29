import { Router } from 'express';
import { 
  obtenerConsultorios, 
  crearConsultorio, 
  actualizarConsultorio, 
  eliminarConsultorio 
} from '../controllers/consultorio.controller';
import { validarConsultorio } from '../middlewares/consultorio.middleware';

const router = Router();

router.get('/', obtenerConsultorios);
router.post('/', validarConsultorio, crearConsultorio);
router.put('/:id', validarConsultorio, actualizarConsultorio);
router.delete('/:id', eliminarConsultorio);

export default router;