import { Request, Response, NextFunction } from 'express';
import { Consultorio } from '../interfaces/consultoriosInterfaces';

export const validarConsultorio = (req: Request, res: Response, next: NextFunction): void => {
  const { numeroSala, piso, activo, tipoAtencion } = req.body as Partial<Consultorio>;

  if (!numeroSala || typeof numeroSala !== 'string' || !numeroSala) {
    res.status(400).json({ ok: false, error: 'El campo "numeroSala" es obligatorio y debe ser texto.' });
    return;
  }

  if (piso === undefined || piso === null || typeof piso !== 'number' || piso <= 0) {
    res.status(400).json({ ok: false, error: 'El campo "piso" es obligatorio y debe ser un número positivo.' });
    return;
  }

  if (activo === undefined || activo === null || typeof activo !== 'boolean') {
    res.status(400).json({ ok: false, error: 'El campo "activo" es obligatorio y debe ser booleano.' });
    return;
  }

  if (!tipoAtencion || typeof tipoAtencion !== 'string' || !tipoAtencion) {
    res.status(400).json({ ok: false, error: 'El campo "tipoAtencion" es obligatorio y debe ser texto.' });
    return;
  }

  next();
};