import { Request, Response, NextFunction } from 'express';

export const validarMedico = (req: Request, res: Response, next: NextFunction): void => {
  const { matricula, nombreCompleto, especialidad, aniosExperiencia } = req.body;

  if (!matricula || typeof matricula !== 'string' || matricula.trim() === '') {
    res.status(400).json({ error: 'La matrícula es obligatoria y debe ser un texto.' });
    return;
  }

  if (!nombreCompleto || typeof nombreCompleto !== 'string' || nombreCompleto.trim() === '') {
    res.status(400).json({ error: 'El nombre completo es obligatorio y debe ser un texto.' });
    return;
  }

  if (!especialidad || typeof especialidad !== 'string' || especialidad.trim() === '') {
    res.status(400).json({ error: 'La especialidad es obligatoria y debe ser un texto.' });
    return;
  }

  if (aniosExperiencia === undefined || typeof aniosExperiencia !== 'number' || aniosExperiencia < 0) {
    res.status(400).json({ error: 'Los años de experiencia deben ser un número positivo mayor o igual a 0.' });
    return;
  }

  next();
};