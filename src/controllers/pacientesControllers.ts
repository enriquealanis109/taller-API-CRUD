// Operaciones CRUD (GET, POST, PUT & DELETE) completas.
import {Request, Response} from 'express';
import pacientes from "../data/pacientesData";
import Paciente from "../interfaces/pacientesInterface";

//GET, listar todos
export const listaPacientes = (req: Request, res: Response) => {
    res.status(200).json ({
        ok: true,
        mensaje: `Todos los pacientes en el sistema.`,
        data: pacientes
    });
}

//GET, buscar por ID
export const pacientePorId = (req: Request<{ id: string }>, res: Response) => {
    const id = Number(req.params.id);
    const paciente = pacientes.find(p => p.id === id);
    if (!paciente){
        res.status(404).json({
            ok: false,
            mensaje: `Paciente con ID ${id} no fue encontrado.`
        }); return;
    }
    res.status(200).json({
        ok: true,
        data: paciente
    });
}

//POST, crear un nuevo registro con validación
export const crearPaciente = (req: Request, res: Response) => {
    const newId = pacientes.length ? Math.max(...pacientes.map(p => p.id ?? 0)) + 1 : 1;
    const nuevoPaciente: Paciente = {
        id: newId,
        dni: req.body.dni,
        nombre: req.body.nombre,
        edad: req.body.edad,
        telefono: req.body.telefono,
        obraSocial: req.body.obraSocial,
    };
    pacientes.push(nuevoPaciente);
    res.status(201).json({
        ok: true,
        mensaje: `Paciente creado con ID ${newId}`,
        data: nuevoPaciente,    
    });
};

//PUT, actualizar un paciente por ID.
export const actualizarPaciente = (req: Request<{ id: string }>, res: Response) => {
    const id = Number(req.params.id);
    const indice = pacientes.findIndex(p => p.id === id);
    if (indice === -1){
        res.status(404).json({
            ok: false,
            mensaje: `Paciente con ID ${id} no encontrado`
        }); return;
    }
    const datosActualizados: Paciente = {
        id,
        dni: req.body.dni,
        nombre: req.body.nombre,
        edad: req.body.edad,
        telefono: req.body.telefono,
        obraSocial: req.body.obraSocial
    };
    pacientes[indice] = datosActualizados;
    res.status(200).json({
        ok: true,
        mensaje: `Datos del paciente con ID ${id} actualizados`,
        data: datosActualizados
    });
}

//DELETE, eliminar un registro.
export const eliminarPaciente = (req: Request<{ id: string }>, res: Response) => { 
    const id = Number(req.params.id);
    const indice = pacientes.findIndex(p => p.id === id);
    if (indice === -1){
        res.status(404).json({
            ok: false,
            mensaje: `Paciente con ID ${id} no encontrado.`
        }); return;
    }
    pacientes.splice(indice, 1);
    res.status(200).json({
        ok: true,
        mensaje: `El paciente con ID ${id} fue eliminado correctamente.`
    });
}