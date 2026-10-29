import { Router } from 'express';
import {
  traerTodosLosConsultorios, 
  traerUnConsultorio,
  crearConsultorio, 
  actualizarConsultorio, 
  eliminarConsultorio 
} from '../controllers/consultoriosControllers';
import { validarConsultorio } from '../middlewares/consultoriosMiddlewares';

const router = Router();

router.get('/', traerTodosLosConsultorios);
router.get('/:id', traerUnConsultorio);
router.post('/', validarConsultorio, crearConsultorio);
router.put('/:id', validarConsultorio, actualizarConsultorio);
router.delete('/:id', eliminarConsultorio);

export default router;