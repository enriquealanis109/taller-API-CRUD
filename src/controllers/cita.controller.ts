import type { Cita } from "../interfaces/cita.interface";
import type { Request, Response } from "express";
import { citas } from "../data/cita.data";

let siguienteId: number = 1;

export function listarCitas(req: Request, res: Response) {
    res.status(200).json(citas);
}

export function crearCita(req: Request, res: Response) {
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