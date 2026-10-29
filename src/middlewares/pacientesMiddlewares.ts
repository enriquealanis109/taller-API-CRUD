import {Request, Response, NextFunction} from 'express';

export const validarPaciente = (req: Request, res: Response, next: NextFunction) => {
    const {dni, nombre, edad, telefono, obraSocial} = req.body;

    // Cadenas de texto NO vacios.
    if (
        dni === undefined ||
        nombre === undefined ||
        edad === undefined ||
        telefono === undefined ||
        obraSocial === undefined
    ) {
        res.status(400).json({
            ok: false,
            mensaje: `❌ Todos los datos del paciente son obligatorios.
            Porfavor, vuelva a intentarlo.`
        }); return;
    }

    // nombre debe ser un 'string' y no estar vacío.
    if (typeof nombre !== "string" || nombre.trim() === "") {
        res.status(400).json({
            ok: false,
            mensaje: `❌ El nombre tiene que ser un texto no vacío.
            Porfavor, vuelva a intentarlo`
        }); return;
    }
    // dni, edad y teléfono deben ser tipo 'number' y números positivos.
    if (typeof dni !== "number" || dni <= 0
        || typeof edad !== "number" || edad <= 0
        || typeof telefono !== "number" || telefono <= 0){
        res.status(400).json({
            ok: false,
            mensaje: `❌ El DNI, edad y el teléfono deben tener solamente números.
            Porfavor, vuelve a intentarlo.`
        }); return;
    }
    // obraSocial debe ser tipo "boolean".
    if (typeof obraSocial !== "boolean"){
        res.status(400).json({
            ok: false,
            mensaje: `❌ La obra social debe booleana (V o F).`
        }); return;
    }
    next();
}