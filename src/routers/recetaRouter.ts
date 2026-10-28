import { Router } from "express";
import {
  obtenerRecetas,
  obtenerRecetasId,
  crearReceta,
  actualizarReceta,
  eliminarReceta,
} from "../controllers/recetaController";
import { validarReceta } from "../middlewares/recetaMiddleware";

const router = Router();

router.get("/", obtenerRecetas);
router.get("/:id", obtenerRecetasId);
router.post("/", validarReceta, crearReceta);
router.put("/:id", validarReceta, actualizarReceta);
router.delete("/:id", eliminarReceta);

export default router;
