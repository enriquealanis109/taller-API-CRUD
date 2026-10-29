import type { Cita } from "../interfaces/cita.interface";
import type { Request, Response } from "express";
import { citas } from "../data/cita.data";

let siguienteId: number = 1;

export function listarCitas(req: Request, res: Response) {
// #swagger.tags = ['Citas']
// #swagger.summary = 'Listar citas'
// #swagger.description = 'Devuelve todas las citas médicas registradas'
    res.status(200).json(citas);
}

export function crearCita(req: Request, res: Response) {
// #swagger.tags = ['Citas']
// #swagger.summary = 'Crear una cita'
// #swagger.description = 'Registra una cita con paciente, médico, fecha y estado. El servidor genera el ID'

/*
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          required: ["pacienteId", "medicoId", "fechaHora", "estado"],
          properties: {
            pacienteId: {
              type: "integer",
              example: 1
            },
            medicoId: {
              type: "integer",
              example: 2
            },
            fechaHora: {
              type: "string",
              example: "2026-11-02T10:30:00"
            },
            estado: {
              type: "string",
              enum: ["pendiente", "atendido"],
              example: "pendiente"
            }
          }
        }
      }
    }
  }
*/
const { pacienteId, medicoId, fechaHora, estado } = req.body;

    const nuevaCita: Cita = {
        id: siguienteId,
        pacienteId,
        medicoId,
        fechaHora,
        estado
    };

    citas.push(nuevaCita); 
    siguienteId++;

    res.status(201).json(nuevaCita);
}

export function buscarCitaPorId(req: Request, res: Response) {
// #swagger.tags = ['Citas']
// #swagger.summary = 'Buscar una cita por ID'
// #swagger.description = 'Devuelve una cita específica. Responde 404 si no existe'
    const idBuscando = Number(req.params.id);

    const citaEncontrada = citas.find(
        (cita) => cita.id === idBuscando
    );

    if (!citaEncontrada) {
        res.status(404).json({
            mensaje: "Cita no encontrada."
        });
        return;
    }

    res.status(200).json(citaEncontrada);
}

export function actualizarCita(req: Request, res: Response) {
// #swagger.tags = ['Citas']
// #swagger.summary = 'Actualizar una cita'
// #swagger.description = 'Actualiza los datos de una cita existente conservando su ID'

/*
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          required: ["pacienteId", "medicoId", "fechaHora", "estado"],
          properties: {
            pacienteId: {
              type: "integer",
              example: 1
            },
            medicoId: {
              type: "integer",
              example: 2
            },
            fechaHora: {
              type: "string",
              example: "2026-11-02T10:30:00"
            },
            estado: {
              type: "string",
              enum: ["pendiente", "atendido"],
              example: "pendiente"
            }
          }
        }
      }
    }
  }
*/
const idBuscando = Number(req.params.id);

    const citaEncontrada = citas.find(
        (cita) => cita.id === idBuscando
    );

    if (!citaEncontrada) {
        res.status(404).json({
            mensaje: "Cita no encontrada."
        });
        return;
    }

    const { pacienteId, medicoId, fechaHora, estado } = req.body;

    citaEncontrada.pacienteId = pacienteId;
    citaEncontrada.medicoId = medicoId;
    citaEncontrada.fechaHora = fechaHora;
    citaEncontrada.estado = estado;

    res.status(200).json(citaEncontrada);
}

export function eliminarCita(req: Request, res: Response) {
// #swagger.tags = ['Citas']
// #swagger.summary = 'Eliminar una cita'
// #swagger.description = 'Elimina del arreglo la cita indicada por su ID.'
    const idBuscando = Number(req.params.id);

    const posicion = citas.findIndex(
        (cita) => cita.id === idBuscando
    );

    if (posicion === -1) {
        res.status(404).json({
            mensaje: "Cita no encontrada."
        });
        return;
    }

    citas.splice(posicion, 1);

    res.status(200).json({
        mensaje: "Cita eliminada correctamente."
    });
}