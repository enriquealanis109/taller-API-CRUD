import type { Request, Response, NextFunction } from "express";

export function validarCita(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { pacienteId, medicoId, fechaHora, estado } = req.body ?? {};

    if (
        typeof pacienteId !== "number" ||
        !Number.isInteger(pacienteId) ||
        pacienteId <=0
    ) {
        res.status(400).json({
            mensaje: "El pacienteId debe ser un número entero positivo"
        });
        return;
    }

    if (
        typeof medicoId !== "number" ||
        !Number.isInteger(medicoId) ||
        medicoId <= 0
    ) {
        res.status(400).json({
            mensaje: "El medicoId debe ser un número entero positivo"
        });
        return;
    }

    if (typeof fechaHora !== "string" || fechaHora.trim() === "") {
        res.status(400).json({
            mensaje: "La fechaHora es obligatoria y debe ser texto"
        });
        return;
    }

    if (estado !== "pendiente" && estado !== "atendido") {
        res.status(400).json({
            mensaje: "El estado debe ser pendiente o atendido"
        })
        return; 
    }

    next();
}