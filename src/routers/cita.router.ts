import { Router } from "express";

import {
    listarCitas,
    buscarCitaPorId,
    crearCita,
    actualizarCita,
    eliminarCita
} from "../controllers/cita.controller";

import { validarCita } from "../middlewares/cita.middleware";

const route = Router();

route.get("/", listarCitas);
route.get("/:id", buscarCitaPorId);
route.post("/", validarCita, crearCita);
route.put("/:id", validarCita, actualizarCita);
route.delete("/:id", eliminarCita);

export default route;