import { Request, Response } from 'express';
import { medicos } from '../data/medico.data';
import { Medico } from '../interfaces/medico.interface';

// 1. Obtener todos los médicos (GET)
export const obtenerMedicos = (req: Request, res: Response): void => {
  // #swagger.tags = ['Medicos']
  // #swagger.description = 'Obtiene la lista completa de médicos'
  res.status(200).json(medicos);
};

// 2. Obtener un médico por ID (GET)
export const obtenerMedicoPorId = (req: Request, res: Response): void => {
  /* #swagger.tags = ['Medicos']
     #swagger.description = 'Obtiene un médico por su ID'
     #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID numérico del médico',
        required: true,
        type: 'integer',
        example: 1
     }
  */
  const id = Number(req.params.id);

  // Validación de ID numérico
  if (isNaN(id)) {
    res.status(400).json({ error: 'El ID debe ser un número válido.' });
    return;
  }

  const medico = medicos.find((m) => m.id === id);

  if (!medico) {
    res.status(404).json({ error: `Médico con ID ${id} no encontrado.` });
    return;
  }

  res.status(200).json(medico);
};

// 3. Crear nuevo médico (POST)
export const crearMedico = (req: Request, res: Response): void => {
  /* #swagger.tags = ['Medicos']
     #swagger.description = 'Crea un nuevo médico'
     #swagger.parameters['body'] = {
        in: 'body',
        description: 'Datos del nuevo médico a registrar',
        required: true,
        schema: {
          matricula: 'MED-1005',
          nombreCompleto: 'Dr. Fernando Torres',
          especialidad: 'Neurología',
          aniosExperiencia: 10
        }
     }
  */
  const { matricula, nombreCompleto, especialidad, aniosExperiencia } = req.body;

  // Generar ID autoincremental
  const nuevoId = medicos.length > 0 ? Math.max(...medicos.map((m) => m.id || 0)) + 1 : 1;

  const nuevoMedico: Medico = {
    id: nuevoId,
    matricula,
    nombreCompleto,
    especialidad,
    aniosExperiencia
  };

  medicos.push(nuevoMedico);
  res.status(201).json({ mensaje: 'Médico registrado exitosamente.', medico: nuevoMedico });
};

// 4. Actualizar médico existente (PUT)
export const actualizarMedico = (req: Request, res: Response): void => {
  /* #swagger.tags = ['Medicos']
     #swagger.description = 'Actualiza los datos de un médico existente'
     #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID numérico del médico a actualizar',
        required: true,
        type: 'integer',
        example: 1
     }
     #swagger.parameters['body'] = {
        in: 'body',
        description: 'Nuevos datos del médico',
        required: true,
        schema: {
          matricula: 'MED-1001',
          nombreCompleto: 'Dr. Roberto Gómez Editado',
          especialidad: 'Cardiología Avanzada',
          aniosExperiencia: 13
        }
     }
  */
  const id = Number(req.params.id);

  // Validación de ID numérico
  if (isNaN(id)) {
    res.status(400).json({ error: 'El ID debe ser un número válido.' });
    return;
  }

  const index = medicos.findIndex((m) => m.id === id);

  if (index === -1) {
    res.status(404).json({ error: `Médico con ID ${id} no encontrado para actualizar.` });
    return;
  }

  const { matricula, nombreCompleto, especialidad, aniosExperiencia } = req.body;

  medicos[index] = {
    id,
    matricula,
    nombreCompleto,
    especialidad,
    aniosExperiencia
  };

  res.status(200).json({ mensaje: 'Médico actualizado exitosamente.', medico: medicos[index] });
};

// 5. Eliminar médico (DELETE)
export const eliminarMedico = (req: Request, res: Response): void => {
  /* #swagger.tags = ['Medicos']
     #swagger.description = 'Elimina un médico del sistema'
     #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID numérico del médico a eliminar',
        required: true,
        type: 'integer',
        example: 1
     }
  */
  const id = Number(req.params.id);

  // Validación de ID numérico
  if (isNaN(id)) {
    res.status(400).json({ error: 'El ID debe ser un número válido.' });
    return;
  }

  const index = medicos.findIndex((m) => m.id === id);

  if (index === -1) {
    res.status(404).json({ error: `Médico con ID ${id} no encontrado para eliminar.` });
    return;
  }

  const medicoEliminado = medicos.splice(index, 1);
  res.status(200).json({ mensaje: 'Médico eliminado exitosamente.', medico: medicoEliminado[0] });
};