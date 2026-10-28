import { Request, Response, NextFunction } from "express";

export const validarReceta = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  //Si no se manda nada en el body
  if (!req.body) {
    res.status(400).json({
      ok: false,
      mensaje: "Debe enviar los datos de la receta",
    });
    return;
  }
  /* Sacamos los campos del body */
  const { citaId, medicamentos, indicaciones, fechaEmision } = req.body;

  /* citaId debe ser numero y mayor a 0 */
  if (typeof citaId !== "number" || citaId <= 0) {
    res.status(400).json({
      ok: false,
      mensaje: "citaId debe ser un número mayor a 0",
    });
    return;
  }

  // medicamento debe ser texto y no estar vacio
  if (typeof medicamentos !== "string" || medicamentos === "") {
    res.status(400).json({
      ok: false,
      mensaje: "El medicamento es obligatorio y debe ser texto",
    });
    return;
  }

  //indicaciones
  if (typeof indicaciones !== "string" || indicaciones === "") {
    res.status(400).json({
      ok: false,
      mensaje: "Las indicaciones son obligatorias y debe ser texto",
    });
    return;
  }

  //fecha de emision debe ser texto
  if (typeof fechaEmision !== "string" || fechaEmision === "") {
    res.status(400).json({
      ok: false,
      mensaje: "La fecha de emisión es obligatoria y debe ser texto",
    });
    return;
  }

  next();
};
