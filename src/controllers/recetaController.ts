import { Request, Response } from "express";
import { recetas } from "../data/recetaData";
import { Receta } from "../interfaces/recetaInterface";

//Contador para el id de las nuevas recetas
let nuevoId = recetas.length + 1;

//GET - Obtener recetas
export const obtenerRecetas = (req: Request, res: Response) => {
  /* #swagger.tags = ['Recetas']
     #swagger.description = 'Endpoint para obtener todas las recetas'
  */
  res.status(200).json({
    ok: true,
    data: recetas,
  });
};

//Get por ID
export const obtenerRecetasId = (req: Request, res: Response) => {
  /* #swagger.tags = ['Recetas']
     #swagger.description = 'Endpoint para obtener una receta por su ID'
     #swagger.parameters['id'] = {
       description: 'ID de la receta',
       type: 'integer',
       required: true,
       example: 1
     }
  */
  const id = Number(req.params.id);
  if (!id || id <= 0) {
    res.status(400).json({
      ok: false,
      mensaje: "El id debe ser un número mayor a 0",
    });
    return;
  }
  const receta = recetas.find((r) => r.id === id);

  if (!receta) {
    res.status(404).json({
      ok: false,
      mensaje: "Receta no encontrada",
    });
    return;
  }

  res.status(200).json({
    ok: true,
    data: receta,
  });
};

//POST Crear una nueva receta
export const crearReceta = (req: Request, res: Response) => {
  /* #swagger.tags = ['Recetas']
     #swagger.description = 'Endpoint para crear una receta nueva'
     #swagger.parameters['body'] = {
       in: 'body',
       description: 'Datos de la receta a crear',
       required: true,
       schema: {
         citaId: 1,
         medicamentos: "Paracetamol 500mg",
         indicaciones: "Tomar cada 8 horas",
         fechaEmision: "2026-10-29"
       }
     }
  */
  const { citaId, medicamentos, indicaciones, fechaEmision } = req.body;

  const nuevaReceta: Receta = {
    id: nuevoId,
    citaId: citaId,
    medicamentos: medicamentos,
    indicaciones: indicaciones,
    fechaEmision: fechaEmision,
  };

  nuevoId++;
  recetas.push(nuevaReceta);

  res.status(201).json({
    ok: true,
    mensaje: "Receta creada",
    data: nuevaReceta,
  });
};

//PUT actualizar una existente
export const actualizarReceta = (req: Request, res: Response) => {
  /* #swagger.tags = ['Recetas']
     #swagger.description = 'Endpoint para actualizar una receta existente'
     #swagger.parameters['id'] = {
       description: 'ID de la receta',
       type: 'integer',
       required: true,
       example: 1
     }
     #swagger.parameters['body'] = {
       in: 'body',
       description: 'Datos nuevos de la receta',
       required: true,
       schema: {
         citaId: 1,
         medicamentos: "Paracetamol 500mg",
         indicaciones: "Tomar cada 8 horas",
         fechaEmision: "2026-10-29"
       }
     }
  */
  const id = Number(req.params.id);
  if (!id || id <= 0) {
    res.status(400).json({
      ok: false,
      mensaje: "El id debe ser un número mayor a 0",
    });
    return;
  }
  const receta = recetas.find((r) => r.id === id);
  if (!receta) {
    res.status(404).json({
      ok: false,
      mensaje: "Receta no encontrada",
    });
    return;
  }
  const { citaId, medicamentos, indicaciones, fechaEmision } = req.body;

  receta.citaId = citaId;
  receta.medicamentos = medicamentos;
  receta.indicaciones = indicaciones;
  receta.fechaEmision = fechaEmision;

  res.status(200).json({
    ok: true,
    mensaje: "Receta actualizada",
    data: receta,
  });
};

//Delete
export const eliminarReceta = (req: Request, res: Response) => {
  /* #swagger.tags = ['Recetas']
     #swagger.description = 'Endpoint para eliminar una receta por su ID'
     #swagger.parameters['id'] = {
       description: 'ID de la receta',
       type: 'integer',
       required: true,
       example: 1
     }
  */
  const id = Number(req.params.id);
  if (!id || id <= 0) {
    res.status(400).json({
      ok: false,
      mensaje: "El id debe ser un número mayor a 0",
    });
    return;
  }
  const indice = recetas.findIndex((r) => r.id === id);

  if (indice === -1) {
    res.status(404).json({
      ok: false,
      mensaje: "Receta no encontrada",
    });
    return;
  }

  recetas.splice(indice, 1);

  res.status(200).json({
    ok: true,
    mensaje: "Receta eliminada",
  });
};
