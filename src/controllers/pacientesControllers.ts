// Operaciones CRUD (GET, POST, PUT & DELETE) completas.
import { Request, Response } from 'express';
import pacientes from "../data/pacientesData";
import Paciente from "../interfaces/pacientesInterface";

// GET, listar todos
export const listaPacientes = (req: Request, res: Response) => {
    // #swagger.tags = ['Pacientes']
    // #swagger.description = 'Obtener todos los pacientes'
    res.status(200).json({
        ok: true,
        mensaje: `Todos los pacientes en el sistema.`,
        data: pacientes
    });
};

// GET, buscar por ID
export const pacientePorId = (req: Request<{ id: string }>, res: Response) => {
    // #swagger.tags = ['Pacientes']
    // #swagger.description = 'Obtener un paciente por su ID'
    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID del paciente',
        required: true,
        type: 'number'
    } */
    const id = Number(req.params.id);
    if (isNaN(id) || id <= 0) {
        res.status(400).json({
            ok: false,
            mensaje: `❌ El ID debe ser un número válido.`
        });
        return;
    }
    const paciente = pacientes.find(p => p.id === id);
    if (!paciente) {
        res.status(404).json({
            ok: false,
            mensaje: `Paciente con ID ${id} no fue encontrado.`
        });
        return;
    }
    res.status(200).json({
        ok: true,
        data: paciente
    });
};

// POST, crear un nuevo registro con validación
export const crearPaciente = (req: Request, res: Response) => {
    // #swagger.tags = ['Pacientes']
    // #swagger.description = 'Crear un nuevo paciente'
    /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Datos del paciente',
        required: true,
        schema: {
            dni: 12345678,
            nombre: "Juan Perez",
            edad: 30,
            telefono: 123456789,
            obraSocial: true
        }
    } */
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

// PUT, actualizar un paciente por ID.
export const actualizarPaciente = (req: Request<{ id: string }>, res: Response) => {
    // #swagger.tags = ['Pacientes']
    // #swagger.description = 'Actualizar un paciente por ID'
    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID del paciente',
        required: true,
        type: 'number'
    } */
    /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Datos actualizados del paciente',
        required: true,
        schema: {
            dni: 12345678,
            nombre: "Juan Perez",
            edad: 31,
            telefono: 123456789,
            obraSocial: false
        }
    } */
    const id = Number(req.params.id);
    if (isNaN(id) || id <= 0) {
        res.status(400).json({
            ok: false,
            mensaje: `❌ El ID debe ser un número válido.`
        });
        return;
    }
    const indice = pacientes.findIndex(p => p.id === id);
    if (indice === -1) {
        res.status(404).json({
            ok: false,
            mensaje: `Paciente con ID ${id} no encontrado`
        });
        return;
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
};

// DELETE, eliminar un registro.
export const eliminarPaciente = (req: Request<{ id: string }>, res: Response) => { 
    // #swagger.tags = ['Pacientes']
    // #swagger.description = 'Eliminar un paciente por ID'
    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID del paciente',
        required: true,
        type: 'number'
    } */
    const id = Number(req.params.id);
    if (isNaN(id) || id <= 0) {
        res.status(400).json({
            ok: false,
            mensaje: `❌ El ID debe ser un número válido.`
        });
        return;
    }
    const indice = pacientes.findIndex(p => p.id === id);
    if (indice === -1) {
        res.status(404).json({
            ok: false,
            mensaje: `Paciente con ID ${id} no encontrado.`
        });
        return;
    }
    pacientes.splice(indice, 1);
    res.status(200).json({
        ok: true,
        mensaje: `El paciente con ID ${id} fue eliminado correctamente.`
    });
};
